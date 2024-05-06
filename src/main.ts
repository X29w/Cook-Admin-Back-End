import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
