import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DamageSkill } from "../models/damageSkill.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class SkillService{
    constructor(private http: HttpClient){}

    public createDamageSkill(damageSkill: DamageSkill){
        return this.http.post(API_URL + "skills/createDamageSkill", damageSkill);
    }
    public getSkills(){
        return this.http.get(API_URL + "skills");
    }
}