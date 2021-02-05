import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirendsDialogComponent } from '../firends-dialog/firends-dialog.component';
import { SubHero } from '../models/subHero.model';
import { GameService } from '../services/game.service';
import { ProfileService } from '../services/profile.service';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-game-bottom-panel',
  templateUrl: './game-bottom-panel.component.html',
  styleUrls: ['./game-bottom-panel.component.scss']
})
export class GameBottomPanelComponent implements OnInit {


  @Input() currentHero: SubHero;

  constructor(private gameService: GameService, private profileService: ProfileService, private dialog: MatDialog) { }

  ngOnInit(): void {
   
  }
  public play() {
    this.gameService.currentHero.next(this.currentHero);
  }

  public friendsDialog() {
    this.dialog.open(FirendsDialogComponent, {
      panelClass: 'friends__dialog'
    });
  }
  public shopDialog(){
    this.dialog.open(ShopComponent, {
      panelClass: 'shop__dialog'
    })
  }
}
