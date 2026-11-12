import {
    Injectable,
    ConflictException
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcryptjs'

import {RegisterDto} from "./dto/register.dto";
import {PrismaService} from "../prisma/prisma.service";

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
}
