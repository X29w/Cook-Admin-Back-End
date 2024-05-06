import { Module } from '@nestjs/common';
import { FruitService } from './fruit.service';
import { FruitController } from './fruit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])],
  controllers: [FruitController],
  providers: [FruitService],
})
export class FruitModule {}
