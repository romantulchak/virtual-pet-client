import { Component, OnInit } from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { ProfileService } from '../services/profile.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public myHeroes: SubHero[];

  constructor(private tokenStorage: TokenStorageService, private profileService: ProfileService) { }



  ngOnInit(): void {
    this.getMyHeroes();
  }

  public exit(){
    this.tokenStorage.signOut();
  }

  private getMyHeroes(){
    this.profileService.getMyHeroes().subscribe(
      res=>{
        if(res != null){
          console.log(res);

          this.myHeroes = res;
        }
      }
    );
  }
}
