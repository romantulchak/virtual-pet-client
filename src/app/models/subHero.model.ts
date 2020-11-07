import { User } from './user.model';
import { Inventory } from './inventory.model';
import { Sub } from './sub.model';
import { SubAttack } from './subAttack.model';
import { Currency } from './currency.model';
import { SubItems } from './subItems.model';

export class SubHero extends Sub{
    public id: number;
    public name: string;
    public money: number;
    public inventory: Inventory;
    public user: User;
    public moneyUpLevel: number;
    public moneyUpPrice: number;
    public moneyMultiplier: number;
    public subAttack: SubAttack;
    public health: number;
    public currency: Currency;
    dressedItems: SubItems;
}
