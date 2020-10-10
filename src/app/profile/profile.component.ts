import { Component, OnInit } from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { User } from '../models/user.model';
import { GameService } from '../services/game.service';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myHeroes: SubHero[];
  public currentUser: User;
  public currentHero: SubHero;
  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService, private gameService: GameService) { }



  ngOnInit(): void {
    this.getMyHeroes();
    this.currentUser = this.tokenStorage.getUser();
  }

  public exit(){
    this.tokenStorage.signOut();
  }

  private getMyHeroes(){
    this.profileService.getMyHeroes().subscribe(
      res=>{
        if(res != null){
          this.currentHero = res[0];
          this.myHeroes = res;
        }
      }
    );
  }
  public selectHero(heroId:number){
    this.profileService.getCurrentSub(heroId, this.currentUser.id).subscribe(
      res=>{
        if(res != null){
          this.currentHero = res;
        }
      }
    );

  }
  public play(){

    this.gameService.currentHero.next(this.currentHero);
  }

}
