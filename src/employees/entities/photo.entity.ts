import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column } from 'typeorm';
@Entity('photo')
export class Photo extends AbstractEntity<Photo> {
  @Column({ length: 100 })
  name: string;
  @Column('text')
  description: string;
  @Column()
  filename: string;
  @Column('double precision')
  views: number;
  @Column()
  isPublished: boolean;
}
