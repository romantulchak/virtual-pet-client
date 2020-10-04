import { Injectable } from "@angular/core";
import { User } from '../models/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn:'root'
})
export class TokenStorageService{
    constructor(){}

    public signOut(){
        window.localStorage.clear();
        window.location.reload();
    }

    public saveToken(token:string){
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }
    public getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }
    public saveUser(user:User){
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    public getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY));
    }
}
