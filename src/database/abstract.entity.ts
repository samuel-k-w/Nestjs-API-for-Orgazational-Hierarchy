import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('Abstract Entity')
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
