import { Injectable } from '@nestjs/common';
import { CheckHealthDto } from './dto/check-health.dto';


@Injectable()
export class HealthService {
    getStatus() {
        return {
            success: true,
            message: 'Coder API is running',
            timestamp: new Date().toISOString()
        }
    }

    checkService(dto: CheckHealthDto) {
        return {
            success: true,
            message: 'Service information received',
            data: {
                serviceName: dto.serviceName,
                environment: dto.environment,
            },
        };
    }
}
