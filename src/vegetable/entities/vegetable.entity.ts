import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'vegetable',
})
export class Vegetable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '蔬菜名',
  })
  name: string;

  @Column({
    comment: '蔬菜价格',
  })
  price: number;

  @Column({
    comment: '蔬菜图片',
  })
  image: string;

  @Column({
    comment: '蔬菜描述',
  })
  description: string;

  @Column({
    comment: '蔬菜保质期至',
  })
  shelfLife: Date;

  @Column({
    comment: '蔬菜是否过期',
    default: false,
  })
  isExpired: boolean;
}
