import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SubType } from "../models/subType.model";

const API_URL = `${environment.API_URL}/sub`;

@Injectable({
    providedIn:'root'
})
export class SubTypeService{

    constructor(private http:HttpClient){}

    public uploadFile(file: File):Observable<any>{
        let formData = new FormData();
        formData.append("file", file);
        return this.http.post(`${API_URL}/upload-sub-image`, formData);
    }
    public createSubType(subType: SubType, image: File):Observable<void>{
        let formData = new FormData();
        formData.append('subType', JSON.stringify(subType));
        formData.append('image', image);
        return this.http.post<void>(`${API_URL}/create-sub-type`, formData);
    }
}