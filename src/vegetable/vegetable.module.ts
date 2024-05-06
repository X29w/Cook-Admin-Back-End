import { Module } from '@nestjs/common';
import { VegetableService } from './vegetable.service';
import { VegetableController } from './vegetable.controller';
import { Vegetable } from './entities/vegetable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vegetable])], // 注册实体,
  controllers: [VegetableController],
  providers: [VegetableService],
})
export class VegetableModule {}
