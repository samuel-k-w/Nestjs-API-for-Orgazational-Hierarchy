import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  reportsTo?: string;

  @Column({ nullable: false, unique: true })
  leaderId: string;

  constructor(entity: Partial<Position>) {
    Object.assign(this, entity);
  }
}
