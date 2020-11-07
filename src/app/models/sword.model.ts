import { Inventory } from './inventory.model';

export class Sword{
  public id: number;
  public attack: number;
  public allowShield: boolean;
  public inventory: Inventory;
  public iconPath: string;
  public uniqueness: number;
  public name: string;

}
