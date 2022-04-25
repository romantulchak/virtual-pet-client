import { ItemCategory } from "./enums/itemCategory.enum";
import { ItemType } from "./enums/itemType.enum";

export abstract class Item {
    public id: number;
    public uniqueness: string;
    public iconPath: string;
    public name: string;
    public eItemType: ItemType;
    public eItemCategory: ItemCategory;
}
