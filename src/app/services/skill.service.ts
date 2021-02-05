import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DamageSkill } from "../models/damageSkill.model";
import { Skill } from "../models/skill.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class SkillService{
    constructor(private http: HttpClient){}

    public createDamageSkill(damageSkill: DamageSkill):Observable<DamageSkill>{
        return this.http.post<DamageSkill>(API_URL + "skills/createDamageSkill", damageSkill);
    }
    public getSkills():Observable<any>{
        return this.http.get(API_URL + "skills");
    }
    public deleteSkill(skillId: number, skillCategory: string):Observable<any>{
        return this.http.delete(API_URL + "skills/" + skillId + "/" + skillCategory);
    }
    public uploadImage(file: File):Observable<any>{
        let f = new FormData();
        f.append("file", file);
        return this.http.post(API_URL + "skills/uploadSkillImage", f);
    }
}