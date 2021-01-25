import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SubType } from "../models/subType.model";

const API_URL = environment.API_URL;
@Injectable({
    providedIn:'root'
})
export class SubTypeService{
    constructor(private http:HttpClient){}

    
    public uploadFile(file: File):Observable<any>{
        let f = new FormData();
         f.append("file", file);
        return this.http.post(API_URL + 'sub/uploadSubTypeImage', f)
    }
    public createSubType(subType: SubType):Observable<any>{
        return this.http.post(API_URL + 'sub/createSubType', subType);
    }
}