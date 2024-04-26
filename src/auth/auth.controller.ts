import { Controller, Get, HttpCode, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
//import { GoogleAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req()req){
    try{
      const user = req.user
      return user

    }catch(error){
      console.log(error)
    }
    }
  

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(@Req() req, @Res() res) {
    try {
      const successMessage = 'RedirectSuccess';
      const user = req.user;

      if (!user || !user.id) {
        throw new Error('User not found');
      }
      await this.authService.createUser({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        created_at: undefined,
        updated_at: undefined,
      });
      const script = `<script>window.opener.postMessage(${JSON.stringify({
        message: successMessage,
      })}, '*');window.close();</script>`;
      // Enviando uma mensagem para a janela pai, se houver, e fechando a janela atual
    //substittuir por res.redirect('endpoint da aplicação')
      res.send(successMessage + script);
    } catch (error) {
      const nosuccessMessage = 'RedirectNoSuccess';
      // Lidando com erros e enviando uma resposta de erro para o cliente
      console.error(error);
      res.status(500).send(nosuccessMessage);
    }
  }

  @Put('update/:id')
  async updateUser(@Req() req, @Res() res) {
    try {
      const successMessage = 'updateSuccess';
      const user = req.user;
      if (!user) {
        throw new Error('User not found');
      }
      const updateUser = await this.authService.updateUser(
        user.id,
        req.body,
      );
      res.send(successMessage);
    } catch (error) {
      const nosuccessMessage = 'updateNoSuccess';
      console.error(error);
      res.status(500).send(nosuccessMessage);
    }
  }
}
