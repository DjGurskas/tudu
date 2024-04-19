import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext){
    const activate = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate
  }

  handleRequest(err, user, info) {
  // Verifica se ocorreu um erro ou se o usuário não foi autenticado
    if (err || !user) {
  // Lança uma exceção não autorizada se ocorrer um erro ou se o usuário não for autenticado
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
