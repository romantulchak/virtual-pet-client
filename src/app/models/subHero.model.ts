import { User } from './user.model';
import { Inventory } from './inventory.model';
import { Sub } from './sub.model';
import { SubAttack } from './subAttack.model';
import { Currency } from './currency.model';
import { SubItems } from './subItems.model';
import { DamageSkill } from './damageSkill.model';

export class SubHero extends Sub {
  public id: number;
  public name: string;
  public inventory: Inventory;
  public user: User;
  public moneyUpLevel: number;
  public moneyUpPrice: number;
  public moneyMultiplier: number;
  public subAttack: SubAttack;
  public currency: Currency;
  public dressedItems: SubItems;
  public damageSkills: DamageSkill[];
}
