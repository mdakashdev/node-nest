import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {IdentityService} from "./identity.service";

@Controller('identity')
export class IdentityController {
    constructor(
        private readonly iService: IdentityService
    ) {}

    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return this.iService.register(registerData);
    }
}
