import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SuperEntity } from '../../commons/entities/super.entity';

@Entity()
export class Recruit extends SuperEntity<Recruit> {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ default: true })
  isRecruit: boolean;

  @Column({ nullable: true })
  recruitPlaceholder: string;
}