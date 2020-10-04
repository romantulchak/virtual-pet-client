import { User } from './user.model';
import { Inventory } from './inventory.model';
import { Sub } from './sub.model';

export class SubHero extends Sub{
    public id: number;
    public name: string;
    public money: number;
    public inventory: Inventory;
    public user: User;
    public moneyUpLevel: number;
    public moneyUpPrice: number;
    public moneyMultiplier: number;

}
