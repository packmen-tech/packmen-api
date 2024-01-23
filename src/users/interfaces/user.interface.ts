import { RoleType } from 'src/roles/entities/role.entity';
import { User } from '../entities/user.entity';

export interface PurgedUser extends Pick<User, 'id' | 'email' | 'name'> {
  role: RoleType;
}
