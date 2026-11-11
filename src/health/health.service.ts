import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getStatus() {
        return {
            success: true,
            message: 'Coder API is running',
            timestamp: new Date().toISOString()
        }
    }
}
