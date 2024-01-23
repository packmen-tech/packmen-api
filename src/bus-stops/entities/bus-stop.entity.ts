import { Box } from 'src/boxes/entities/box.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { GeoLocation } from 'src/types';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusStop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, unique: true })
  name: string;

  @Column({ type: 'json' })
  geoLocation: GeoLocation;

  @OneToMany(() => Box, (box) => box.location)
  boxes: Box[];

  @OneToMany(() => Task, (task) => task.location)
  tasks: Task[];
}
