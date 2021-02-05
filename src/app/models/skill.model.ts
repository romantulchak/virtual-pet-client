export abstract class Skill {
    
    public type: string;
    public name: string;
    public ESkillCategory:string;
    public price: number;
    public skillDescription: string;
    public maxCooldown:number;
    public skillImage: string;
    public inShop: boolean = false;
}