import { Skill } from "./skill.model";

export class DefenceSkill extends Skill {
    public id: number;
    public health: number;
    public defence: number;
    public timeOfAction: number;
}