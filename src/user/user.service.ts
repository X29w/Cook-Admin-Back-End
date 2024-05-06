import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVO } from './vo/login-user.vo';
import { UserInfoVo } from './vo/user-info.vo';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  //#region 用户注册
  async create(createUserDto: CreateUserDto) {
    const captcha = await this.redisService.get(
      `captcha_${createUserDto.email}`,
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== createUserDto.captcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new HttpException('用户', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();

    if (createUserDto.phone) {
      newUser.phone = createUserDto.phone;
    }
    newUser.email = createUserDto.email;
    newUser.password = md5(createUserDto.password);
    newUser.name = createUserDto.name;

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      return '注册失败';
    }
  }
  //#endregion

  //#region 用户登录
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        name: loginUserDto.name,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user && user.password !== md5(loginUserDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const vo = new LoginUserVO();
    vo.userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
    };
    return vo;
  }
  //#endregion

  //#region 查看用户信息
  async getUserInfo(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    const vo = new UserInfoVo();
    vo.id = user.id;
    vo.name = user.name;
    vo.email = user.email;
    vo.phone = user.phone;
    vo.createdAt = user.createdAt;
    return vo;
  }
  //#endregion

  //#region 修改用户信息
  async updateUserInfo(userId: number, updateUserDto: UpdateUserDto) {
    const captcha = await this.redisService.get(
      `update_user_captcha_${updateUserDto.email}`,
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (updateUserDto.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.phone) {
      user.phone = updateUserDto.phone;
    }

    try {
      await this.userRepository.save(user);
      return '修改成功';
    } catch (error) {
      return '修改失败';
    }
  }
  //#endregion
}
