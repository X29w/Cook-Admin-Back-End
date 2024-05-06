import { Controller, Post, Body, Get, Query, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserInfo } from 'src/custom.decorator';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(EmailService)
  private readonly emailService: EmailService;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  //#region 注册用户
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  //#endregion

  //#region 获得验证码
  @Get('/getCaptcha')
  async getCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`captcha_${address}`, code, 5 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    return `发送成功${code}`;
  }
  //#endregion

  //#region 用户登录
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const vo = await this.userService.login(loginUserDto);
    vo.accessToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
        name: vo.userInfo.name,
        email: vo.userInfo.email,
        phone: vo.userInfo.phone,
      },
      {
        expiresIn:
          this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME') || '30m',
      },
    );

    vo.refreshToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
      },
      {
        expiresIn:
          this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME') || '7d',
      },
    );
    return vo;
  }
  //#endregion

  //#region 查看用户信息
  @Get('/getUserInfo')
  async getUserInfo(@UserInfo('id') id: number) {
    return await this.userService.getUserInfo(id);
  }
  //#endregion

  //#region 修改用户信息
  @Post('/updateUserInfo')
  async updateUserInfo(@UserInfo('id') id: number, @Body() body: any) {
    return await this.userService.updateUserInfo(id, body);
  }
  //#endregion
}
