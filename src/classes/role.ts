import { Entity } from '@/interfaces/entity';
import Permission from './permission';

class Role implements Entity {
  constructor(
    public id: number = 0,
    public name: string = '',
    public permissions: Permission[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}

export default Role;
