import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
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

  async validate(accessToken: string, refreshToken: string, profile: Profile,) {
      console.log(profile)
      console.log(accessToken)
      console.log(refreshToken)
      const user = await this.authService.validateUser({
        email: profile.emails[0].value,
        name: profile.displayName,
      });
      console.log('Validate')
      console.log(user)
      return user || null;

  }

  // async googleAuthRedirect(@Req() req, @Res() res) {
  //   try {
  //     const successMessage = 'loginSuccess';
  //     const user = req.user;

  //     if (!user) {
  //       throw new UnauthorizedException();
  //     } // Redireciona ou retorna uma resposta de sucesso conforme necessário
  //   } catch (error) {
  //     console.log(error);
  //     throw new UnauthorizedException(); // Lança uma exceção de não autorizado em caso de erro
  //   }
  // }

  // async handleRedirect(@Req() req, @Res() res) {
  //   try {
  //     const successMessage = 'loginSuccess';
  //     const user = req.user;

  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //     // Redireciona ou retorna uma resposta de sucesso conforme necessário
  //   } catch (error) {
  //     console.log(error);
  //     throw new UnauthorizedException();
  //   }
  // }
}
