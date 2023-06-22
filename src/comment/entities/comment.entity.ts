import { User } from 'src/user/entities/user.entity';
import { MainEntity } from 'src/utils/MainEntity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Comment extends MainEntity {
  @Column()
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
