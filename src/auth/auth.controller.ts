import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from './Guards';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

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
  /*async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const successMessage = 'loginSuccess';
      const user = req.user;

      await this.authService.create({
        _id: user.user.googleId,
        name:user.user.name,
        email: user.user.email,
        picture: user.user.profilePicture
      })

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
  }*/

}