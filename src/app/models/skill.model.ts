export abstract class Skill {
    public type: string;
    public name: string;
    public category:string;
    public price: number;
    public description: string;
    public maxCooldown:number;
    public skillImage: string;
    public inShop: boolean = false;
    public isBought: boolean;
}