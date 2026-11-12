import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true
      }),
      HealthModule,
      PrismaModule,
      AuthModule,
      IdentityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
