import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,

    private readonly jwtService: JwtService,

  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { google_id, names, emails, photos } = profile;

    const user = {
      id: google_id,
      email: emails[0].value,
      name: names,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };

    const token = this.jwtService.sign(user);

    try {
      done(null, {
        success: true,
        user,
        token,
      });
    } catch (err) {
      done(err, {
        success: false,
        user: null,
        token: null,
      });
    }
  }
}