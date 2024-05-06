import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateVegetableDto {
  @IsNotEmpty({
    message: '请填写蔬菜名',
  })
  name: string;

  @IsNotEmpty({
    message: '请填写蔬菜价格',
  })
  price: number;

  image: string;

  @MaxLength(200, {
    message: '蔬菜描述不能超过200字',
  })
  description: string;

  @IsNotEmpty({
    message: '请填写蔬菜保质期到期时间',
  })
  shelfLife: Date;
}
