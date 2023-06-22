import { MainEntity } from 'src/utils/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends MainEntity {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
