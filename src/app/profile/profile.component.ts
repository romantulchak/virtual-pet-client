import { AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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
    this.playMusic();
  }
  public playMusic(){

      let audio = new Audio();
      audio.src = "../../assets/musics/Exist Strategy - Reverence.mp3";
      audio.play();

  }




  public exit(){
    this.tokenStorage.signOut();
  }

  private getMyHeroes(){
    this.profileService.getMyHeroes().subscribe(
      res=>{
        if(res != null){
          if(res.length == 5){
            this.currentHero = res[2];
          }else{
            this.currentHero = res[0];
          }
          this.myHeroes = res;
          console.log(this.currentHero);

          this.profileService.currentHero.next(this.currentHero);
        }
      }
    );
  }
  public selectHero(heroId:number){
    this.profileService.getCurrentSub(heroId, this.currentUser.id).subscribe(
      res=>{
        if(res != null){
          this.currentHero = res;
          this.profileService.currentHero.next(res);
        }
      }
    );

  }
  public play(){
    this.gameService.currentHero.next(this.currentHero);
  }

  public removeHero(sub: SubHero){
    this.profileService.deleteSub(sub.id).subscribe(
      res=>{
        if(res != null){
          console.log(res);
          this.myHeroes = this.myHeroes.filter(x=> x.id != sub.id);
          this.currentHero = this.myHeroes[0];
        }

      }
    );
  }

}
