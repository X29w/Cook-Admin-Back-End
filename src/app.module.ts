import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VegetableModule } from './vegetable/vegetable.module';
import { UserModule } from './user/user.module';
import { FruitModule } from './fruit/fruit.module';
import { MeatModule } from './meat/meat.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { User } from './user/entities/user.entity';
import { Fruit } from './fruit/entities/fruit.entity';
import { Vegetable } from './vegetable/entities/vegetable.entity';
import { Meat } from './meat/entities/meat.entity';
import * as path from 'path';

console.log('===================', path.join(__dirname, '.env'));

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASS'),
        database: configService.get('MYSQL_DATABASE'),
        synchronize: true,
        logging: true,
        entities: [User, Fruit, Vegetable, Meat],
        poolSize: 10,
        connectorPackage: 'mysql2',
        extra: {
          authPlugin: 'sha256_password',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env'),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
    VegetableModule,
    UserModule,
    FruitModule,
    MeatModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
