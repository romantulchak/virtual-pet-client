import { HttpClient, HttpParams } from "@angular/common/http";
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

    public getShop(subId: number):Observable<Shop>{
        let params = new HttpParams();
        params = params.append("subId", subId.toString());
        return this.http.get<Shop>(API_URL + 'shop', {params: params});
    }
    public addSkillToShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/addSkillToShop", skill);
    }
    
    public removeSkillFromShop(skill: Skill): Observable<any>{
        return this.http.put<any>(API_URL + "shop/removeSkillFromShop", skill);
    }

    public buyItem(item: any, subId: number): Observable<any>{
        return this.http.post<any>(API_URL + "shop/buyItem/" + subId, item);
    }

    public buySkill(id: number, subId: number):Observable<void>{
        return this.http.post<void>(`${API_URL}shop/buySkill/${subId}`, id);
    }
}