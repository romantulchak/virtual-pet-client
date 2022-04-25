import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Howl } from 'howler'
import { HeroSkillsComponent } from '../hero-skills/hero-skills.component';
import { InventoryComponent } from '../inventory/inventory.component';
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
  public isMusicAllow: boolean = false;

  private sound = new Howl({
    src: ['../../assets/musics/Caravan Palace Lone Digger.mp3'],
    loop: true,
    volume: 0.020,
    autoplay: false
  });

  constructor(private tokenStorage: TokenStorageService, private dialog: MatDialog, private profileService: ProfileService, private gameService: GameService) { }

  ngOnInit(): void {
    let allowMusic = localStorage.getItem('allowMusic');
    if (allowMusic != null && allowMusic == 'true') {
      // this.playMusic();
    } else {

      this.isMusicAllow = false;
    }
    this.getMyHeroes();
    this.currentUser = this.tokenStorage.getUser();
    this.updateHero();
  }

  public setMusic(option?: number): void{
    switch (option) {
      case 1:
        localStorage.setItem('allowMusic', 'true')
        break;
    }
  }

  public playMusic(): void{
    this.sound.play();
  }

  public exit(): void{
    this.tokenStorage.signOut();
  }

  public selectHero(hero: SubHero): void{
    this.profileService.getCurrentSub(hero.id, this.currentUser.id).subscribe(
      res => {
        if (res != null) {
          this.currentHero = res;
          this.profileService.currentHero.next(res);
        }
      }
    );
  }


  public removeHero(sub: SubHero): void{
    this.profileService.deleteSub(sub.id).subscribe(
      res => {
          this.myHeroes = this.myHeroes.filter(x => x.id != sub.id);
          this.currentHero = this.myHeroes[0];
          this.profileService.currentHero.next(this.currentHero);
      }
    );
  }

  public openInventory(sub: SubHero): void{
    this.dialog.open(InventoryComponent, { panelClass: 'inventory__dialog', width: '500px', data: { sub: sub, userId: this.currentUser.id } });
  }

  public openSkills(sub: SubHero): void{
    this.dialog.open(HeroSkillsComponent, {
      panelClass: 'hero__skils_dialog',
      data: sub
    })
  }

  private updateHero(): void{
    this.profileService.currentHero.subscribe(
      res => {
        if (res != null)
          this.currentHero = res;
      }
    );
  }

  private getMyHeroes(): void{
    this.profileService.getMyHeroes().subscribe(
      res => {
        if (res != null) {
          if (res.length == 5) {
            this.currentHero = res[2];
          } else {
            this.currentHero = res[0];
          }
          this.myHeroes = res;
          this.profileService.currentHero.next(this.currentHero);
        }
      }
    );
  }
}
