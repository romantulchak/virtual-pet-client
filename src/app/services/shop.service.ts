import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Skill } from "../models/skill.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class ShopService {
    constructor(private http: HttpClient) {}

    public addSkillToShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/addSkillToShop", skill);
    }
    
    public removeSkillFromShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/removeSkillFromShop", skill);
    }
}