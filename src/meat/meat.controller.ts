import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeatService } from './meat.service';
import { CreateMeatDto } from './dto/create-meat.dto';
import { UpdateMeatDto } from './dto/update-meat.dto';

@Controller('meat')
export class MeatController {
  constructor(private readonly meatService: MeatService) {}

  @Post()
  create(@Body() createMeatDto: CreateMeatDto) {
    return this.meatService.create(createMeatDto);
  }

  @Get()
  findAll() {
    return this.meatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeatDto: UpdateMeatDto) {
    return this.meatService.update(+id, updateMeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meatService.remove(+id);
  }
}
