import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DamageSkillDTO } from "../dto/skill/damage-skill.dto";
import { DefenceSkillDTO } from "../dto/skill/defence-skill.dto";
import { DamageSkill } from "../models/damageSkill.model";

const API_URL = `${environment.API_URL}/skills`;

@Injectable({
    providedIn:'root'
})
export class SkillService{

    constructor(private http: HttpClient){}

    public createDamageSkill(damageSkill: DamageSkill):Observable<DamageSkill>{
        return this.http.post<DamageSkill>(`${API_URL}/create-damage-skill`, damageSkill);
    }
    public getSkills(page: number):Observable<any>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        return this.http.get(API_URL, {params: params});
    }
    public deleteSkill(skillId: number, skillCategory: string):Observable<any>{
        return this.http.delete(`${API_URL}/${skillId}/${skillCategory}`);
    }
    public uploadImage(file: File):Observable<any>{
        let formData = new FormData();
        formData.append("file", file);
        return this.http.post(`${API_URL}/upload-skill-image`, formData);
    }

    public getSkillsInShopForSub(subId: number, page: number): Observable<DamageSkillDTO[] | DefenceSkillDTO[]>{
        let params = new HttpParams();
        params = params.append('page', page.toString());
        return this.http.get<DamageSkillDTO[] | DefenceSkillDTO[]>(`${API_URL}/shop-skills/${subId}`, {params: params});
    }
}