import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'fruit',
})
export class Fruit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '水果名',
  })
  name: string;

  @Column({
    comment: '水果价格',
  })
  price: number;

  @Column({
    comment: '水果图片',
  })
  image: string;

  @Column({
    comment: '水果描述',
  })
  description: string;

  @Column({
    comment: '水果保质期至',
  })
  shelfLife: Date;
}
