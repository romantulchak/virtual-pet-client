import { ItemCategory } from "./enums/itemCategory.enum";
import { ItemType } from "./enums/itemType.enum";
import { Uniqueness } from "./enums/uniqueness.enum";

export abstract class Item {
    public id: number;
    public uniqueness: string;
    public iconPath: string;
    public name: string;
    public eItemType: ItemType;
    public eItemCategory: ItemCategory;

}