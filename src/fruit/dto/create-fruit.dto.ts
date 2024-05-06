import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFruitDto {
  @IsNotEmpty({
    message: '请填写水果名',
  })
  name: string;

  @IsNotEmpty({
    message: '请填写水果价格',
  })
  price: number;

  image: string;

  @MaxLength(200, {
    message: '水果描述不能超过200字',
  })
  description: string;

  @IsNotEmpty({
    message: '请填写水果保质期到期时间',
  })
  shelfLife: Date;
}
