import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { FruitService } from './fruit.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { generateParseIntPipe } from 'src/utils';

@Controller('fruit')
export class FruitController {
  @Inject(FruitService)
  private readonly fruitService: FruitService;

  //#region 新增水果
  @Post()
  create(@Body() createFruitDto: CreateFruitDto) {
    return this.fruitService.create(createFruitDto);
  }
  //#endregion

  //#region 查询水果列表
  @Get()
  findAll(
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
    return this.fruitService.findAll(current, pageSize, name);
  }
  //#endregion

  //#region 查询水果详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitService.findOne(+id);
  }
  //#endregion

  //#region 更新水果
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFruitDto: UpdateFruitDto) {
    return this.fruitService.update(+id, updateFruitDto);
  }
  //#endregion

  //#region 删除水果
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitService.remove(+id);
  }
  //#endregion
}
