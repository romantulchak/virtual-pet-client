import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';
import { SetItemRequest } from '../request/setItemRequest.model';
import { SubResponse } from '../response/subResponse.model';

const API_URL = environment.API_URL;

@Injectable({
  providedIn:'root'
})
export class InventoryService{

  constructor(private http: HttpClient){}

  public getItemsInInventory(subId: number):any{
    return this.http.get(API_URL + 'inventory/getItems/' + subId);
  }
  public setItem(setItemRequset: SetItemRequest):Observable<SubHero>{
    return this.http.put<SubHero>(API_URL + 'inventory/setItem', setItemRequset);
  }
  public withdrawArmor(setItemRequset: SetItemRequest):Observable<SubHero>{
    return this.http.put<SubHero>(API_URL + 'inventory/withdrawArmor', setItemRequset);
  }
  public withdrawWeapon(setItemRequest: SetItemRequest):Observable<SubHero>{
    return this.http.put<SubHero>(API_URL + 'inventory/withdrawWeapon', setItemRequest);
  }
  public sellItem(item, subId: number):Observable<SubHero>{
    return this.http.post<SubHero>(API_URL + 'inventory/sellItem/'+ subId, item);
  }
}
