import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vegetable } from './entities/vegetable.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class VegetableService {
  @InjectRepository(Vegetable)
  private readonly vegetableRepository: Repository<Vegetable>;

  //#region 新增蔬菜
  async create(createVegetableDto: CreateVegetableDto) {
    const exist = await this.vegetableRepository.findOne({
      where: {
        name: createVegetableDto.name,
      },
    });
    if (exist) {
      throw new HttpException('蔬菜已存在', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.vegetableRepository.save(createVegetableDto);
      return '新增成功';
    } catch (error) {
      throw new HttpException('新增失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 获取蔬菜列表
  async findAll(current: number, pageSize: number, name: string) {
    const skipCount = (current - 1) * pageSize;
    const condition: Record<string, any> = {};
    if (name) {
      condition.name = Like(`%${name}%`);
    }
    const [vegetables, totalCount] =
      await this.vegetableRepository.findAndCount({
        select: ['id', 'name', 'price', 'description', 'image', 'shelfLife'],
        skip: skipCount,
        take: pageSize,
        where: condition,
      });
    return {
      vegetables,
      totalCount,
    };
  }
  //#endregion

  //#region 获取蔬菜详情
  async findOne(id: number) {
    return await this.existById(id);
  }
  //#endregion

  //#region 更新蔬菜
  async update(id: number, updateVegetableDto: UpdateVegetableDto) {
    await this.existById(id);
    try {
      await this.vegetableRepository.update(id, updateVegetableDto);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 删除蔬菜
  async remove(id: number) {
    await this.existById(id);
    try {
      await this.vegetableRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 按照ID查看是否存在
  async existById(id: number) {
    const exist = await this.vegetableRepository.findOne({
      where: {
        id,
      },
    });
    if (!exist) {
      throw new HttpException('蔬菜不存在', HttpStatus.BAD_REQUEST);
    }
    return exist;
  }
  //#endregion
}
