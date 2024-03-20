import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { GoogleStrategy } from './GoogleStrategy';
import { PassportModule } from '@nestjs/passport';
import { authService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: authService,
    },
  ],
  exports: [],
})
export class AuthModule {}
