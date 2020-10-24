import { Component, OnInit } from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-game-top-panel',
  templateUrl: './game-top-panel.component.html',
  styleUrls: ['./game-top-panel.component.scss']
})
export class GameTopPanelComponent implements OnInit {

  public currentHero: SubHero;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.currentHero.subscribe(
      res=>{
        if(res != null)
          this.currentHero = res;
      }
    );
  }

}
