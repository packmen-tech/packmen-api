import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleType {
  ROOT = 'root',
  ADMIN = 'admin',
  OPERATOR = 'operator'
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role: RoleType;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
