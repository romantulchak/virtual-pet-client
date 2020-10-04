import { Role } from './role.model';
import { SubHero } from './subHero.model';

export class User{
    public id: number;
    public username: string;
    public email: string;
    public password: string;
    public numberOfSubs: number;
    public subs: SubHero[];
    public roles: Role[];
}
