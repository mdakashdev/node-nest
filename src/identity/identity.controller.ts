import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";

@Controller('identity')
export class IdentityController {
    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return registerData;
    }
}
