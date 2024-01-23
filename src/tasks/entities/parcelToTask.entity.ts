import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';
import { Parcel } from 'src/parcels/entities/parcels.entity';
import { Box } from 'src/boxes/entities/box.entity';

@Entity()
export class ParcelToTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  done: boolean;

  @ManyToOne(() => Task, (task) => task.parcels)
  public task: Task;

  @ManyToOne(() => Parcel, (parcel) => parcel.tasks)
  public parcel: Parcel;

  @ManyToOne(() => Box, (box) => box.fromTasks)
  public fromBox: Box;

  @ManyToOne(() => Box, (box) => box.toTasks)
  public toBox: Box;
}
