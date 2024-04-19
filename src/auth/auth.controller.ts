import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(@Req() req, @Res() res) {
    const successMessage = 'loginSuccess';
    const user = req.user;
  }

  @Get('google/redirect')
  handleRedirect(@Req() req, @Res() res) {
    const successMessage = 'RedirectSuccess';
    const nosucessMessage = 'RedirectNoSuccess';

    const user = req.user;
    if (req && req.user) {
      res.redirect (`http://localhost:3000?message=${successMessage}`);
    } else {
      res.redirect(`http://localhost:3000?message=${nosucessMessage}`);
    }
  }

  // @UseGuards(GoogleAuthGuard)
  // async googleAuth(){
  //   return 'Redirecionando para o Google...';
  // }

  // @Get('google/callback')
  // @UseGuards(GoogleAuthGuard)
  // async handleRedirect(@Req() Req, @Res() res) {
  //   try{
  //     const successMessage = 'loginSuccess';
  //     const user = Req.user;

  //     await this.authService.createUser({
  //       id: user.user.googleId,
  //       name: user.user.name,
  //       email: user.user.email,
  //       picture: user.user.profilePicture
  //     });
  //   }catch(error){
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }
  
  // @Get('google')
  // async googleAuthRedirect(@Req() req, @Res() res) {
  //   try {
  //     const successMessage = 'loginSuccess';
  //     const user = req.user;

  //     await this.authService.createUser({
  //       id: user.user.googleId,
  //       name: user.user.name,
  //       email: user.user.email,
  //       picture: user.user.profilePicture
  //     });

  //     res.send(
  //       `<script>window.opener.postMessage(${JSON.stringify({
  //         message: successMessage,
  //         user,
  //       })}, '*');</script>`,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }

}