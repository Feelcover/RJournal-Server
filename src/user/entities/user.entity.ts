import { MainEntity } from 'src/utils/MainEntity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends MainEntity {

  @Column()
  fullName: string;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;
}
