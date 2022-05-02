import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubType } from '../models/subType.model';
import { retry } from 'rxjs/operators';
import { SubRequest } from '../models/subRequest.model';
import { SubHero } from '../models/subHero.model';
import { User } from '../models/user.model';
import { Friend } from '../models/friend.model';
import { UserFriend } from '../models/userFriend.model';
import { MoneyCurrencyDTO } from '../dto/money-currency.dto';

const API_URL = `${environment.API_URL}/profile`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  public currentHero: BehaviorSubject<SubHero> = new BehaviorSubject(null);

  public getMyHeroes(): Observable<SubHero[]> {
    return this.httpClient.get<SubHero[]>(`${API_URL}/subs-for-user`);
  }

  public getSubTypes(): Observable<SubType[]> {
    return this.httpClient.get<SubType[]>(`${API_URL}/sub-types`).pipe(retry(3));
  }

  public createSub(subRequest: SubRequest) {
    return this.httpClient.post(`${API_URL}/create-sub`, subRequest);
  }

  public getCurrentSub(subId: number, userId: number): Observable<SubHero> {
    let params = new HttpParams();
    params = params.append('subId', subId.toString()).append('userId', userId.toString());
    return this.httpClient.get<SubHero>(`${API_URL}/info-about-sub`, { params: params });
  }

  public deleteSub(heroId: number):Observable<any> {
    return this.httpClient.delete(`${API_URL}/delete-sub/${heroId}`);
  }

  public getFriends(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${API_URL}/friends`);
  }

  public getUserByUsername(username: string): Observable<any> {
    return this.httpClient.get<User>(`${API_URL}/user-by/${username}`);
  }

  public sendRequest(user: User): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/send-friend-request`, user);
  }

  public getFriendRequests(): Observable<UserFriend[]> {
    return this.httpClient.get<UserFriend[]>(`${API_URL}/friend-requests`);
  }

  public getFriendResponse(): Observable<UserFriend[]> {
    return this.httpClient.get<UserFriend[]>(`${API_URL}/friend-response`);
  }
  
  public accpetFriend(friendRequest:UserFriend):Observable<Friend>{
    return this.httpClient.post<Friend>(`${API_URL}/accept-friend`, friendRequest);
  }

  public deniedRequest(friendRequest:UserFriend): Observable<any>{
    let params = new HttpParams();
    params = params.append('friendRequestId', friendRequest.id.toString())
    return this.httpClient.delete<any>(`${API_URL}/denied-friend-request`, {params: params});
  }

  public deleteFriend(friendId: number, userId: number): Observable<any>{
    let params = new HttpParams();
    params = params.append("userId", userId.toString())
                   .append("friendId", friendId.toString());
    return this.httpClient.delete<any>(`${API_URL}/delete-friend`, {params: params});
  }

  public getSubMoneyCurrency(id: number, name: string): Observable<MoneyCurrencyDTO>{
    let params = new HttpParams();
    params = params.append("id", id.toString())
                    .append("name", name);
    return this.httpClient.get<MoneyCurrencyDTO>(`${API_URL}/sub-money-currency`, {params: params});
  }

  public setSelectedSub(index: number): void{
    localStorage.setItem('selectedSub', index.toString());
  }

  public getSelectedSubIndex(): number{
    let index = localStorage.getItem('selectedSub');
    return index ? Number.parseInt(index) : 0;
  }
}
