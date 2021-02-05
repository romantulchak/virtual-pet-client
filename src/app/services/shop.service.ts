import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Shop } from "../models/shop.model";
import { Skill } from "../models/skill.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class ShopService {
    constructor(private http: HttpClient) {}

    public getShop():Observable<Shop>{
        return this.http.get<Shop>(API_URL + 'shop');
    }
    public addSkillToShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/addSkillToShop", skill);
    }
    
    public removeSkillFromShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/removeSkillFromShop", skill);
    }
}