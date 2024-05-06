import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: '请输入用户名',
  })
  name: string;

  @IsNotEmpty({
    message: '请输入邮箱地址',
  })
  @IsEmail(
    {},
    {
      message: '请输入正确的邮箱地址',
    },
  )
  email: string;

  @IsNotEmpty({
    message: '请输入密码',
  })
  @MaxLength(16, {
    message: '密码长度不能超过16位',
  })
  password: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;

  phone: string;
}
