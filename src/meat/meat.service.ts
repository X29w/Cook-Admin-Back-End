import { Injectable } from '@nestjs/common';
import { CreateMeatDto } from './dto/create-meat.dto';
import { UpdateMeatDto } from './dto/update-meat.dto';

@Injectable()
export class MeatService {
  create(createMeatDto: CreateMeatDto) {
    return 'This action adds a new meat';
  }

  findAll() {
    return `This action returns all meat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meat`;
  }

  update(id: number, updateMeatDto: UpdateMeatDto) {
    return `This action updates a #${id} meat`;
  }

  remove(id: number) {
    return `This action removes a #${id} meat`;
  }
}
