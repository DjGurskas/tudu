import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from './Guards';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { authService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: authService) {}
  

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(){
    return 'Redirecionando para o Google...';
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(){
    return 'OK'
  }
  
  @Get('google')
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const successMessage = 'loginSuccess';
      const user = req.user;

      await this.authService.validateUser({
        googleId: user.user.googleId,
        name: user.user.name,
        email: user.user.email,
        picture: user.user.profilePicture
      });

      res.send(
        `<script>window.opener.postMessage(${JSON.stringify({
          message: successMessage,
          user,
        })}, '*');</script>`,
      );
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

}