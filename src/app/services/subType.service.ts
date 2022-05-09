import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SubtypeDTO } from "../dto/subtype.dto";
import { SubType } from "../models/subType.model";

const API_URL = `${environment.API_URL}/sub`;

@Injectable({
    providedIn:'root'
})
export class SubTypeService{

    constructor(private http:HttpClient){}

    public createSubType(subType: SubType, image: File):Observable<void>{
        let formData = new FormData();
        formData.append('subType', JSON.stringify(subType));
        formData.append('image', image);
        return this.http.post<void>(`${API_URL}/create-sub-type`, formData).pipe(
            take(1)
        );
    }

    public getSubtypes(): Observable<SubtypeDTO[]>{
        return this.http.get<SubtypeDTO[]>(`${API_URL}/subtypes`).pipe(
            take(1)
        );
    }

}