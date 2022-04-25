import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend.model';
import { User } from '../models/user.model';
import { UserFriend } from '../models/userFriend.model';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-firends-dialog',
  templateUrl: './firends-dialog.component.html',
  styleUrls: ['./firends-dialog.component.scss']
})
export class FirendsDialogComponent implements OnInit {
  public user: any;
  public friendRequest: UserFriend[] = [];
  public friendResponse: UserFriend[] = [];
  public currentUser: User;
  public friends: Friend[] = [];

  constructor(private profileService: ProfileService, 
              private tokenStorageService: TokenStorageService) { }


  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.getFriends();
    this.getFriendRequests();
    this.getFriendResponse();
  }

  public searchFriendByUsername(name: string): void{
    this.profileService.getUserByUsername(name).subscribe(
      res => {
        if (res != null) {
          this.user = res;
        }
      },
      err=>{
        console.log(err.error.message);
        
      }
    );
  }

  public sendRequest(userId: number): void{
    let searchedUser = new User();
    searchedUser.id = userId;
    this.profileService.sendRequest(searchedUser).subscribe(
      res => {
        this.friendRequest.push(res);
        this.user = null;
      }
    );
  }

  public getFriendRequests(): void{
    this.profileService.getFriendRequests().subscribe(
      res => {
        if (res != null) {
          this.friendRequest = res;
        }
      }
    );
  }

  public getFriendResponse(): void{
    this.profileService.getFriendResponse().subscribe(
      res => {
        if (res != null) {
          this.friendResponse = res;
        }

      }
    );
  }

  public acceptFriend(friendRequest): void{
    this.profileService.accpetFriend(friendRequest).subscribe(
      res=>{
        if(res != null){
          this.friends.push(res);
          this.friendResponse = this.friendResponse.filter(x=>x.user.id != res.id);
        }
      }
    );
  }

  public deniedRequest(friendRequset:UserFriend): void{
    this.profileService.deniedRequest(friendRequset).subscribe(
        ()=>{
         this.getFriendRequests();
         this.getFriendResponse();
        }
    );
  }

  private getFriends(): void{
    this.profileService.getFriends().subscribe(
      res => {
        if (res != null) {
          this.friends = res;
        }
      }
    );
  }

  public deleteFriend(friend: Friend): void{
    this.profileService.deleteFriend(friend.id, this.currentUser.id).subscribe(
      res=>{
          this.friends = this.friends.filter(x=>x.id != friend.id);
      }
    );
  }
}
