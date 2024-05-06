import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { MeatService } from './meat.service';
import { CreateMeatDto } from './dto/create-meat.dto';
import { UpdateMeatDto } from './dto/update-meat.dto';
import { generateParseIntPipe } from 'src/utils';

@Controller('meat')
export class MeatController {
  @Inject(MeatService)
  private readonly meatService: MeatService;

  //#region 新增肉类
  @Post()
  create(@Body() createMeatDto: CreateMeatDto) {
    return this.meatService.create(createMeatDto);
  }
  //#endregion

  //#region 查询肉类列表
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
    return this.meatService.findAll(current, pageSize, name);
  }
  //#endregion

  //#region 查询肉类详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meatService.findOne(+id);
  }
  //#endregion

  //#region 更新肉类
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeatDto: UpdateMeatDto) {
    return this.meatService.update(+id, updateMeatDto);
  }
  //#endregion

  //#region 删除肉类
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meatService.remove(+id);
  }
  //#endregion
}
