import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BossSub } from '../models/bossSub.model';
import { Skill } from '../models/skill.model';
import { Sub } from '../models/sub.model';
import { SubHero } from '../models/subHero.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnChanges {


  @Input() currentHero: any;
  @Input() hero: any;
  @Input() myHeroes: SubHero[];
  @Input() heroCharacteristics;
  @Output() remove = new EventEmitter<SubHero>();
  @Output() openInventory = new EventEmitter<SubHero>();
  @Output() selectHero = new EventEmitter<SubHero>();

  @Output() openSkills = new EventEmitter<SubHero>();

  public bossHealth: number;
  constructor() { }

  ngOnChanges(): void {  

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
  public skills(hero: SubHero){
    this.openSkills.emit(hero);
  }
}
