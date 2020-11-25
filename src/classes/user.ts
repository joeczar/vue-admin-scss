import { Entity } from '@/interfaces/entity';
import Role from './role';

class User implements Entity {
  constructor(
    public id: number = 0,
    public first_name: string = '',
    public last_name: string = '',
    public email: string = '',
    public role: Role = new Role(),
    public permissions: string[] = [],
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.role = role;
    this.permissions = permissions;
  }
}

export default User;
