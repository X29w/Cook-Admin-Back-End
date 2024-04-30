import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FruitService } from './fruit.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';

@Controller('fruit')
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Post()
  create(@Body() createFruitDto: CreateFruitDto) {
    return this.fruitService.create(createFruitDto);
  }

  @Get()
  findAll() {
    return this.fruitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFruitDto: UpdateFruitDto) {
    return this.fruitService.update(+id, updateFruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitService.remove(+id);
  }
}
