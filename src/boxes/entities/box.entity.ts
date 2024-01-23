import { BusStop } from 'src/bus-stops/entities/bus-stop.entity';
import { Parcel } from 'src/parcels/entities/parcels.entity';
import { BoxToTask } from 'src/tasks/entities/boxToTask.entity';
import { ParcelToTask } from 'src/tasks/entities/parcelToTask.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum BoxSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

@Entity()
export class Box {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BoxSize })
  size: BoxSize;

  @ManyToOne(() => BusStop, (busStop) => busStop.boxes, { nullable: true })
  location: BusStop;

  @OneToMany(() => Parcel, (parcel) => parcel.box)
  parcels: Parcel[];

  @ManyToOne(() => BoxToTask, (boxToTask) => boxToTask.box)
  tasks: BoxToTask[];

  @ManyToOne(() => ParcelToTask, (parcelToTask) => parcelToTask.fromBox)
  fromTasks: ParcelToTask[];

  @ManyToOne(() => ParcelToTask, (parcelToTask) => parcelToTask.toBox)
  toTasks: ParcelToTask[];
}
