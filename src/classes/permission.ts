import { Entity } from '@/interfaces/entity';

class Permission implements Entity {
  constructor(public id: number, public name: string) {
    this.id = id;
    this.name = name;
  }
}

export default Permission;
