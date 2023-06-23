import { MainEntity } from 'src/utils/MainEntity';

import { Entity, Column } from 'typeorm';

@Entity()
export class Post extends MainEntity {
  @Column()
  title: string;

  @Column()
  article: string;

  @Column({ nullable: true })
  tags?: string;

  @Column({ default: 0 })
  views: number;
}
