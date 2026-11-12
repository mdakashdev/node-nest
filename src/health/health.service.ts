import { Injectable } from '@nestjs/common';
import { CheckHealthDto } from './dto/check-health.dto';
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class HealthService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    getStatus() {
        return {
            success: true,
            message: 'Coder API is running'
        }
    }

    async getDatabaseStatus() {
        const userCount = await this.prisma.user.count();

        return {
            success: true,
            message: 'Database connected successfully',
            data: {
                database: 'PostgreSQL',
                userCount
            }
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
