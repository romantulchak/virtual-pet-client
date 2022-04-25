import { Inventory } from './inventory.model';
import { Item } from './item.model';

export class Sword extends Item{
  public id: number;
  public attack: number;
  public allowShield: boolean;
  public inventory: Inventory;
  public iconPath: string;
  public name: string;
}
