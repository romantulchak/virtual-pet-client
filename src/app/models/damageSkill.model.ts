import { Skill } from "./skill.model";

export class DamageSkill extends Skill{
  
    public id: number;
    public damage:number;
    public criticalChance: number;
    public inShop: boolean = false;
    
    constructor(){
        super();
        this.type = "damageSkill";
    }
}