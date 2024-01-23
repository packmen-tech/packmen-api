import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Box } from 'src/boxes/entities/box.entity';
import { Task } from './task.entity';

export enum BoxTaskAction {
  ON_LOAD = 'on-load',
  OFF_LOAD = 'off-load'
}

@Entity()
export class BoxToTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  done: boolean;

  @Column()
  action: BoxTaskAction;

  @ManyToOne(() => Task, (task) => task.boxes)
  public task: Task;

  @ManyToOne(() => Box, (box) => box.tasks)
  public box: Box;
}
