import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role, RoleType } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  findAll() {
    return this.roleRepository.find();
  }

  findById(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  findByRole(role: RoleType) {
    return this.roleRepository.findOne({ where: { role } });
  }
}
