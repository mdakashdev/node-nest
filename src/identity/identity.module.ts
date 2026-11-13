import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN') as any,
        },
      }),
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService]
})
export class IdentityModule {}
