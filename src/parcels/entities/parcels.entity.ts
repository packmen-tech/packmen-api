import { Box } from 'src/boxes/entities/box.entity';
import { ParcelToTask } from 'src/tasks/entities/parcelToTask.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum ParcelSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true })
  code: string;

  @Column({ length: 200 })
  carrier: string;

  @Column({ type: 'enum', enum: ParcelSize })
  size: ParcelSize;

  @Column({ length: 200 })
  addressFrom: string;

  @Column({ length: 200 })
  addressTo: string;

  @Column()
  priority: number;

  @Column()
  isFragile: boolean;

  @ManyToOne(() => Box, (box) => box.parcels, { nullable: true })
  box: Box | null;

  @ManyToOne(() => ParcelToTask, (parcelToTask) => parcelToTask.parcel)
  tasks: ParcelToTask[];
}
