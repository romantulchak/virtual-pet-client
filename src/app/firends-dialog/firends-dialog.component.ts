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

  constructor(private profileService: ProfileService, private tokenStorageService: TokenStorageService) { }
  public user: any;
  public friendRequest: UserFriend[] = [];
  public friendResponse: UserFriend[] = [];
  public currentUser: User;
  public friends: Friend[] = [];
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.getFriends();
    this.getFriendRequests();
    this.getFriendResponse();
  }

  public searchFriendByUsername(name: string) {
    this.profileService.getUserByUsername(name).subscribe(
      res => {
        if (res != null) {
          console.log(res);

          this.user = res;
        }
      },
      err=>{
        console.log(err.error.message);
        
      }
    );
  }

  public sendRequest(userId: number) {
    let searchedUser = new User();
    searchedUser.id = userId;
    this.profileService.sendRequest(searchedUser).subscribe(
      res => {
        this.friendRequest.push(res);
        this.user = null;
      }
    );
  }

  public getFriendRequests() {
    this.profileService.getFriendRequests().subscribe(
      res => {
        if (res != null) {
          console.log(res);

          this.friendRequest = res;
        }

      }
    );
  }
  public getFriendResponse() {
    this.profileService.getFriendResponse().subscribe(
      res => {
        if (res != null) {
          console.log(res);

          this.friendResponse = res;
        }

      }
    );
  }
  private getFriends() {
    this.profileService.getFriends().subscribe(
      res => {
        if (res != null) {
          this.friends = res;
        }
      }
    );
  }
  public acceptFriend(friendRequest){
    this.profileService.accpetFriend(friendRequest).subscribe(
      res=>{
        if(res != null){
          this.friends.push(res);
          this.friendResponse = this.friendResponse.filter(x=>x.user.id != res.id);
        }
      }
    );
  }
  public deniedRequest(friendRequset:UserFriend){
    this.profileService.deniedRequest(friendRequset).subscribe(
        res=>{
         this.getFriendRequests();
         this.getFriendResponse();
          
        }
    );
  }
}
