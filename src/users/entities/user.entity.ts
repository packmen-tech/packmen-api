import { Role } from 'src/roles/entities/role.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 128 })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Task, (task) => task.operator)
  tasks: Task[];
}
