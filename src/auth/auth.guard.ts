// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class GoogleAuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   // async canActivate(context: ExecutionContext): Promise<boolean> {
//   //   try {
//   //     const request = context.switchToHttp().getRequest();
//   //     const token = this.extractTokenFromHeader(request);

//   //     await this.jwtService.verifyAsync(token, {
//   //       secret: 'secretKey',
//   //     });

//   //     return true;
//   //   } catch (error) {
//   //     console.error(error);
//   //     throw new UnauthorizedException('Usuário não autenticado');
//   //   }
//   // }

//   // // private extractTokenFromHeader(request: Request): string | undefined {
//   // //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
//   // //   return type === 'Bearer' ? token : undefined;
//   // // }
// }
