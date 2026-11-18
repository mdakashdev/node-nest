import {
    Injectable,
    ConflictException,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcryptjs'

import {RegisterDto} from "./dto/register.dto";
import {PrismaService} from "../prisma/prisma.service";
import {LoginDto} from "./dto/login.dto";
import {ConfigService} from "@nestjs/config";
import {RefreshTokenDto} from "./dto/refresh-token.dto"

@Injectable()
export class IdentityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async register(data: RegisterDto) {

        //1. Check Existing User
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        //2. Throw Exception
        if (existingUser) {
            throw new ConflictException("Email already exists")
        }

        //3. Hash Password
        const hashedPassword = await bcrypt.hash(data.password, 12);

        //4. Create User
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        });

        //5. Generate Token
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        //6. Exclude Password
        const {password, ...userData} = user;

        //7. Return Response
        return {
            success: true,
            message: "Registration successful",
            data: {
                user: userData
            },
            accessToken
        }
    }

    async login(data: LoginDto) {

        //1. Find User
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        //2. if not user then through Unauthorized Exception
        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }

        //3. compare password client and user
        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.password
        )

        //4. if not match password, through Unauthorized Exception
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password')
        }

        //5. generate access token
        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
            },
            {
                secret: this.configService.getOrThrow<string>(
                    'ACCESS_TOKEN_SECRET',
                ),
                expiresIn: '15m',
            },
        )

        //6. generate refresh token
        const refreshToken = await this.jwtService.signAsync(
            {
                sub: user.id
            },
            {
                secret: this.configService.getOrThrow<string>(
                    'REFRESH_TOKEN_SECRET',
                ),
                expiresIn: '7d',
            },
        )

        //7. Hash refresh token
        const refreshTokenHash = await bcrypt.hash(
            refreshToken,
            10
        )

        //8. save refresh token
        await this.prisma.user.update({
            where: { id: user.id},
            data: {
                refreshTokenHash
            }
        })

        // exclude password
        const {password, refreshTokenHash: _, ...safeUser} = user;

        //9. Return Response
        return {
            success: true,
            message: "login successful",
            accessToken,
            refreshToken,
            data: {
                user: safeUser,
            },
        }
    }

    async getMe(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            success: true,
            data: user
        }
    }


    async refresh(data: RefreshTokenDto) {
        // 1. Verify refresh token
        let payload;

        try {
            payload = await this.jwtService.verifyAsync(
                data.refreshToken,
                {
                    secret: this.configService.getOrThrow<string>(
                        'REFRESH_TOKEN_SECRET',
                    ),
                },
            );
        } catch {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        // 2. Find user
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user || !user.isActive || !user.refreshTokenHash) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // 3. Compare refresh token with stored hash
        const isRefreshTokenValid = await bcrypt.compare(
            data.refreshToken,
            user.refreshTokenHash,
        );

        if (!isRefreshTokenValid) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // 4. Generate new access token
        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
                role: user.role,
            },
            {
                secret: this.configService.getOrThrow<string>(
                    'ACCESS_TOKEN_SECRET',
                ),
                expiresIn: '15m',
            },
        );

        return {
            success: true,
            message: 'Access token refreshed successfully',
            accessToken,
        };
    }

}
