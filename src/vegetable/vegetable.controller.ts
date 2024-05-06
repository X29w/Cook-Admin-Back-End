import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Post,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { VegetableService } from './vegetable.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { generateParseIntPipe } from 'src/utils';

@Controller('vegetable')
export class VegetableController {
  @Inject(VegetableService)
  private readonly vegetableService: VegetableService;

  //#region 增加蔬菜
  @Post('create')
  async create(@Body() createVegetableDto: CreateVegetableDto) {
    return await this.vegetableService.create(createVegetableDto);
  }
  //#endregion

  //#region 获取蔬菜列表
  @Get('list')
  async findAll(
    @Query('current', new DefaultValuePipe(1), generateParseIntPipe('current'))
    current: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('name') name: string,
  ) {
    return await this.vegetableService.findAll(current, pageSize, name);
  }
  //#endregion

  //#region 获取蔬菜详情
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.vegetableService.findOne(id);
  }
  //#endregion

  //#region 更新蔬菜
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVegetableDto: UpdateVegetableDto,
  ) {
    return await this.vegetableService.update(id, updateVegetableDto);
  }
  //#endregion

  //#region 删除蔬菜
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.vegetableService.remove(id);
  }
  //#endregion
}
