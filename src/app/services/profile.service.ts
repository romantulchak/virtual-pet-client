import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubType } from '../models/subType.model';
import { catchError, retry } from 'rxjs/operators';
import { SubRequest } from '../models/subRequest.model';
import { SubHero } from '../models/subHero.model';
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  constructor(private httpClient: HttpClient){}

  public currentHero: BehaviorSubject<SubHero> = new BehaviorSubject(null);

  public getMyHeroes():Observable<SubHero[]>{
    return this.httpClient.get<SubHero[]>(API_URL + 'profile/getSubsForUser');
  }
  public getSubTypes(): Observable<SubType[]>{
    return this.httpClient.get<SubType[]>(API_URL + 'profile/getSubTypes').pipe(retry(3));
  }
  public createSub(subRequest: SubRequest){
    return this.httpClient.post(API_URL + 'profile/createSub', subRequest);
  }
  public getCurrentSub(subId: number, userId: number):Observable<SubHero>{
    let params = new HttpParams();
    params = params.append('subId', subId.toString()).append('userId', userId.toString());
    return this.httpClient.get<SubHero>(API_URL + 'profile/getInfoAboutSub', {params: params});
  }
  public deleteSub(heroId: number){
    return this.httpClient.delete(API_URL + 'profile/deleteSubForUser/' + heroId);
  }
}
