import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { GoogleStrategy } from './GoogleStrategy';
import { PassportModule } from '@nestjs/passport';
import { authService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';
import { auth } from 'google-auth-library';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy, authService,
    {
      provide: 'AUTH_SERVICE',
      useClass: authService,
    },
  ],
  exports: [AuthModule, authService],
})
export class AuthModule {}
