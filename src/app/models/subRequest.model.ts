import { User } from './user.model';

export class SubRequest{
  public id: number;
  public name: string;
  public user: User;

  constructor(id?: number, name?: string, user?: User){
    this.id = id;
    this.name = name;
    this.user = user;
  }
}
