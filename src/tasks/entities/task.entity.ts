import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BoxToTask } from './boxToTask.entity';
import { ParcelToTask } from './parcelToTask.entity';

export enum TaskType {
  BOX = 'box',
  PARCEL = 'parcel',
  BYCICLE = 'bycicle',
  MOVE = 'move'
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TaskType })
  type: TaskType;

  @Column()
  title: string;

  @Column()
  time: Date;

  @ManyToOne(() => BusStop, (busStop) => busStop.tasks)
  location: BusStop;

  @Column()
  done: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  operator: User;

  @OneToMany(() => BoxToTask, (boxToTask) => boxToTask.task)
  boxes: BoxToTask[];

  @OneToMany(() => ParcelToTask, (parcelToTask) => parcelToTask.task)
  parcels: ParcelToTask[];
}
