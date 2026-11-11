import { Controller, Get } from '@nestjs/common';
import { HealthService } from "./health.service";

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
}
