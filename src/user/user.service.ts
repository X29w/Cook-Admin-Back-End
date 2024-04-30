import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(RedisService)
  private readonly redisService: RedisService;

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
}
