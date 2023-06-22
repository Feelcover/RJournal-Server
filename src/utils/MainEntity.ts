import { timestamp } from 'rxjs';
import { Entity, PrimaryGeneratedColumn,  CreateDateColumn,
    UpdateDateColumn, } from 'typeorm';

@Entity()
export abstract class MainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;
}
