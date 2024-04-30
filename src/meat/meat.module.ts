import { Module } from '@nestjs/common';
import { MeatService } from './meat.service';
import { MeatController } from './meat.controller';

@Module({
  controllers: [MeatController],
  providers: [MeatService],
})
export class MeatModule {}
