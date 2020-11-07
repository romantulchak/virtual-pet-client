import { SubHero } from './subHero.model';
import { Sword } from './sword.model';

export class Inventory{
    public id: number;
    public subHero: SubHero;
    public maxInventorySize: number;
    public swords: Sword[];
}
