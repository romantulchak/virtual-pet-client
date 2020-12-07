import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BossSub } from '../models/bossSub.model';
import { Sub } from '../models/sub.model';
import { SubHero } from '../models/subHero.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {


  @Input() currentHero: any;
  @Input() hero: any;
  @Input() myHeroes: SubHero[];

  @Output() remove = new EventEmitter<SubHero>();
  @Output() openInventory = new EventEmitter<SubHero>();
  @Output() selectHero = new EventEmitter<SubHero>();

  public bossHealth: number;
  constructor() { }

  ngOnInit(): void {
  }

  public removeHero(hero: SubHero) {
    this.remove.emit(hero);
  }

  public inventory(hero: SubHero) {
    this.openInventory.emit(hero);
  }
  public select(hero: SubHero) {
    this.selectHero.emit(hero);
  }

}
