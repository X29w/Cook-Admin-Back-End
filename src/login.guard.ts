import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UnloginFilter } from './unlogin.filter';

interface JwtUserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector; // 注入反射器

  @Inject(JwtService)
  private jwtService: JwtService; // 注入JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requset: Request = context.switchToHttp().getRequest();

    const requiredLogin = this.reflector.getAllAndOverride<boolean>('login', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredLogin) {
      return true;
    }
    const authorization = requset.headers.authorization;

    if (!authorization) {
      throw new UnloginFilter();
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      requset.user = {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('登录过期了');
    }
  }
}
