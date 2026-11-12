import {
    Controller,
    Get,
    Post,
    Body
} from '@nestjs/common';
import { HealthService } from "./health.service";
import { CheckHealthDto } from "./dto/check-health.dto";

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthService: HealthService,
    ) {}

    @Get()
    checkHealth() {
        return this.healthService.getStatus();
    }

    @Get('test')
    getTest() {
        return {
            success: true,
            message: 'test another get method'
        }
    }

    @Post('check')
    checkService(@Body() dto: CheckHealthDto) {
        return this.healthService.checkService(dto)
    }

    @Get('database')
    getDatabaseStatus() {
        return this.healthService.getDatabaseStatus()
    }

}
