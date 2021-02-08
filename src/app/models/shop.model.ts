import { Armor } from "./armor.model";
import { DamageSkill } from "./damageSkill.model";
import { DefenceSkill } from "./defenceSkill.model";
import { Item } from "./item.model";
import { Skill } from "./skill.model";
import { Sword } from "./sword.model";

export class Shop{
    public id: number;
    public damageSkills: DamageSkill[];
    public defenceSkills: DefenceSkill[];
    public itemSwords: Sword[];
    public itemArmors: Armor[];
    public allSkills: any[];
    public allItems: any[];
    public isBought: boolean;
}