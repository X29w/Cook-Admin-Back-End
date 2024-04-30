import { Module } from '@nestjs/common';
import { FruitService } from './fruit.service';
import { FruitController } from './fruit.controller';

@Module({
  controllers: [FruitController],
  providers: [FruitService],
})
export class FruitModule {}
