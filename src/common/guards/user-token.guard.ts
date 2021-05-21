import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { Token } from './token.interface';

@Injectable()
export class UserTokenGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    try {
      const request = context.switchToHttp().getRequest<any>();
      const authToken = request.headers.authorization.split(" ")[1];
      const userDecoded = verify(authToken, this.configService.jwt.seed) as Token;

      if(!userDecoded.active){
        throw new UnauthorizedException(`La cuenta ya no esta activa`)
      }

      request.user = userDecoded;

      return true;
    } catch(error){      
      throw new UnauthorizedException(error)
    }
  }
  
}
