import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

//#region 登录鉴权装饰器
export const RequiredLogin = () => SetMetadata('login', true);
//#endregion

//#region 自定义参数装饰器
export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      return null;
    }
    return data ? request.user[data] : request.user;
  },
);
//#endregion
