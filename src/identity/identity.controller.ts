import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards
} from '@nestjs/common';
import {IdentityService} from "./identity.service";

import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {JwtIdentityGuard} from "./jwt-identity-guard";

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
    getMe() {
        return 'hello my profile'
    }
}
