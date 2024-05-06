import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMeatDto } from './dto/create-meat.dto';
import { UpdateMeatDto } from './dto/update-meat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meat } from './entities/meat.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MeatService {
  @InjectRepository(Meat)
  private readonly meatRepository: Repository<Meat>;

  //#region 新增肉类
  async create(createMeatDto: CreateMeatDto) {
    const exist = await this.meatRepository.findOne({
      where: {
        name: createMeatDto.name,
      },
    });

    if (exist) {
      throw new HttpException('肉类已存在', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.meatRepository.save(createMeatDto);
      return '新增成功';
    } catch (error) {
      throw new HttpException('新增失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 查询肉类列表
  async findAll(current: number, pageSize: number, name: string) {
    const skipCount = (current - 1) * pageSize;
    const condition: Record<string, any> = {};
    if (name) {
      condition.name = Like(`%${name}%`);
    }
    const [meats, totalCount] = await this.meatRepository.findAndCount({
      select: ['id', 'name', 'price', 'description', 'image', 'shelfLife'],
      skip: skipCount,
      take: pageSize,
      where: condition,
    });
    return {
      meats,
      totalCount,
    };
  }
  //#endregion

  //#region 查询单个肉类
  async findOne(id: number) {
    return await this.existById(id);
  }
  //#endregion

  //#region 更新肉类
  async update(id: number, updateMeatDto: UpdateMeatDto) {
    await this.existById(id);
    try {
      await this.meatRepository.update(id, updateMeatDto);
      return '更新成功';
    } catch (error) {
      throw new HttpException('更新失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 删除肉类
  async remove(id: number) {
    await this.existById(id);
    try {
      await this.meatRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException('删除失败', HttpStatus.BAD_REQUEST);
    }
  }
  //#endregion

  //#region 按照ID查看是否存在
  async existById(id: number) {
    const exist = await this.meatRepository.findOne({
      where: {
        id,
      },
    });
    if (!exist) {
      throw new HttpException('肉类不存在', HttpStatus.BAD_REQUEST);
    }
    return exist;
  }
  //#endregion
}
