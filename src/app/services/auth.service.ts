import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = environment.API_URL;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private http: HttpClient){}

    public login(data: any):Observable<any>{
        return this.http.post(API_URL + 'auth/signin', {username: data.username, password: data.password}, httpOptions);
    }
    public registration(user: User):Observable<any>{
        return this.http.post(API_URL + 'auth/signup', user, httpOptions);
    }

}