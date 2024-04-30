import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'meat',
})
export class Meat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '肉类名',
  })
  name: string;

  @Column({
    comment: '肉类价格',
  })
  price: number;

  @Column({
    comment: '肉类图片',
  })
  image: string;

  @Column({
    comment: '肉类描述',
  })
  description: string;

  @Column({
    comment: '肉类保质期至',
  })
  shelfLife: Date;

  @Column({
    comment: '肉类是否过期',
    default: false,
  })
  isExpired: boolean;
}
