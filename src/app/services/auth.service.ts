import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Jwt } from "../models/jwt.model";

const API_URL = `${environment.API_URL}/auth`;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private http: HttpClient){}

    public login(data: any):Observable<Jwt>{
        return this.http.post<Jwt>(`${API_URL}/sign-in`, {username: data.username, password: data.password});
    }
    public registration(user: User):Observable<void>{
        return this.http.post<void>(`${API_URL}/sign-up`, user);
    }
    public refreshToken():Observable<any>{
        return this.http.get(`${API_URL}/refresh-token`);
    }

}