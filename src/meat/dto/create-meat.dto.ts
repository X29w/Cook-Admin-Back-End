import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMeatDto {
  @IsNotEmpty({
    message: '请填写肉类名',
  })
  name: string;

  @IsNotEmpty({
    message: '请填写肉类价格',
  })
  price: number;

  image: string;

  @MaxLength(200, {
    message: '肉类描述不能超过200字',
  })
  description: string;

  @IsNotEmpty({
    message: '请填写肉类保质期到期时间',
  })
  shelfLife: Date;
}
