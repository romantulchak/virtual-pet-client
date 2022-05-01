export class SkillDTO{
    public id: number;
    public name: string;
    public category: string;
    public price: number;
    public description: string;
    public cooldown: Date;
    public maxCooldown: number;
    public icon: string;
    public isBought: boolean;
    public skillCategory: string;
}