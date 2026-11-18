import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Req
} from '@nestjs/common';

import {Request} from "express";
import {IdentityService} from "./identity.service";

import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtIdentityGuard, JwtPayload} from "./jwt-identity-guard";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('identity')
export class IdentityController {
    constructor(
        private readonly iService: IdentityService
    ) {}

    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return this.iService.register(registerData);
    }
    
    @Post('login')
    login(@Body() loginData: LoginDto) {
        return this.iService.login(loginData);
    }

    @UseGuards(JwtIdentityGuard)
    @Get('me')
    getMe(@Req() req: Request & { user: JwtPayload }) {
        return this.iService.getMe(req.user.sub)
    }

    @Post('refresh')
    refresh(@Body() data: RefreshTokenDto) {
        return this.iService.refresh(data)
    }

}
