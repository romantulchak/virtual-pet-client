import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sword } from '../models/sword.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn:'root'
})
export class ItemService{

  constructor(private http: HttpClient){  }

  public createSword(sword: Sword){
    return this.http.post(API_URL + 'items/createSword', sword);
  }
}
