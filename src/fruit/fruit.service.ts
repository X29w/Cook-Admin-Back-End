import { Injectable } from '@nestjs/common';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';

@Injectable()
export class FruitService {
  create(createFruitDto: CreateFruitDto) {
    return 'This action adds a new fruit';
  }

  findAll() {
    return `This action returns all fruit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fruit`;
  }

  update(id: number, updateFruitDto: UpdateFruitDto) {
    return `This action updates a #${id} fruit`;
  }

  remove(id: number) {
    return `This action removes a #${id} fruit`;
  }
}
