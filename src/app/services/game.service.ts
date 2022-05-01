import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MoneyCurrencyDTO } from '../dto/money-currency.dto';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';

const API_URL = `${environment.API_URL}/game`;

@Injectable({
  providedIn:'root'
})
export class GameService{
  public currentHero: BehaviorSubject<SubHero> = new BehaviorSubject<SubHero>(null);

  constructor(private http: HttpClient){
  }

  public upMoneyLevel(subRequest: SubRequest): Observable<MoneyCurrencyDTO>{
    return this.http.put<MoneyCurrencyDTO>(`${API_URL}/up-moeny-level`, subRequest);
  }
  public sendMoney(subRequest: SubRequest, money:number):Observable<void>{
    return this.http.put<void>(`${API_URL}/save-money/${money}`, subRequest);
  }
  public getBoss(subRequset: SubRequest):any{
    return this.http.get(`${API_URL}/boss/${subRequset.id}`);
  }
  public upAttackLevel(subRequest: SubRequest): any{
    return this.http.put(`${API_URL}/up-attack`, subRequest);
  }

}
