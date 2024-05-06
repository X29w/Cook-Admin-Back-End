import { Module } from '@nestjs/common';
import { MeatService } from './meat.service';
import { MeatController } from './meat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meat } from './entities/meat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meat])],
  controllers: [MeatController],
  providers: [MeatService],
})
export class MeatModule {}
