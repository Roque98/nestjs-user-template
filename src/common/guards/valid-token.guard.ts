import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class ValidTokenGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const request = context.switchToHttp().getRequest<Request>();
    const authToken = request.headers.authorization.split(" ")[1];
    
    try {
      const userDecoded = verify(authToken, this.configService.jwt.seed);
      request.body.user = userDecoded;
      return true;
    } catch(error){
      throw new UnauthorizedException(`El token enviado no es valido`)
    }
    
  }
}
