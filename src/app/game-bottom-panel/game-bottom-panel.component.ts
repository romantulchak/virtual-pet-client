import { Component, Input, OnInit } from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { GameService } from '../services/game.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-game-bottom-panel',
  templateUrl: './game-bottom-panel.component.html',
  styleUrls: ['./game-bottom-panel.component.scss']
})
export class GameBottomPanelComponent implements OnInit {


  @Input() currentHero: SubHero;

  constructor(private gameService: GameService, private profileService: ProfileService) { }

  ngOnInit(): void {
  }
  public play() {
    this.gameService.currentHero.next(this.currentHero);
  }
  public getFriends() {
    this.profileService.getFriends().subscribe(
      res => {
        if (res != null) {
          console.log(res);

        }
      }
    );
  }
}
