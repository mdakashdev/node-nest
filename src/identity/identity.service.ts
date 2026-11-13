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

@Injectable()
export class IdentityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
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
                password: data.password
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
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role,
        })

        // exclude password
        const {password, ...safeUser} = user;

        //7. Return Response
        return {
            success: true,
            message: "login successful",
            data: {
                user: safeUser,
                accessToken
            },
        }
    }
}
