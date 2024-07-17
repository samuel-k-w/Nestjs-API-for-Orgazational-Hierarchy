import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true, default: 'no user id' })
  userId: string;

  @Column({ nullable: true, unique: true, default: 'no photo id' })
  photoId: string;

  @Column({ nullable: true, unique: true, default: 'no position id' })
  positionId: string;

  constructor(employee: Partial<Employee>) {
    Object.assign(this, employee);
  }
}
