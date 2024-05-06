import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FruitService {
  @InjectRepository(Fruit)
  private readonly fruitRepository: Repository<Fruit>;

  //#region 新增水果
  async create(createFruitDto: CreateFruitDto) {
    const existFruit = await this.fruitRepository.findOne({
      where: {
        name: createFruitDto.name,
      },
    });

    if (existFruit) {
      throw new HttpException('水果已存在', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.fruitRepository.save(createFruitDto);
      return '新增成功';
    } catch (error) {
      throw new HttpException('新增失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 查询水果列表
  async findAll(current: number, pageSize: number, name: string) {
    const skipCount = (current - 1) * pageSize;
    const condition: Record<string, any> = {};
    if (name) {
      condition.name = Like(`%${name}%`);
    }
    const [fruits, totalCount] = await this.fruitRepository.findAndCount({
      select: ['id', 'name', 'price', 'description', 'image', 'shelfLife'],
      skip: skipCount,
      take: pageSize,
      where: condition,
    });
    return {
      fruits,
      totalCount,
    };
  }
  //#endregion

  //#region 查询单个水果
  async findOne(id: number) {
    return await this.existById(id);
  }
  //#endregion

  //#region 更新水果
  async update(id: number, updateFruitDto: UpdateFruitDto) {
    await this.existById(id);
    try {
      await this.fruitRepository.update(id, updateFruitDto);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 删除水果
  async remove(id: number) {
    await this.existById(id);
    try {
      await this.fruitRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 按照ID查看是否存在
  async existById(id: number) {
    const exist = await this.fruitRepository.findOne({
      where: {
        id,
      },
    });
    if (!exist) {
      throw new HttpException('水果不存在', HttpStatus.BAD_REQUEST);
    }
    return exist;
  }
  //#endregion
}
