import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubHero } from '../models/subHero.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnChanges {
  public bossHealth: number;
  @Input() currentHero: any;
  @Input() hero: any;
  @Input() myHeroes: SubHero[];
  @Input() heroCharacteristics;
  @Output() remove = new EventEmitter<SubHero>();
  @Output() openInventory = new EventEmitter<SubHero>();
  @Output() selectHero = new EventEmitter<SubHero>();
  @Output() openSkills = new EventEmitter<SubHero>();

  constructor() { }

  ngOnChanges(): void {
  }

  public removeHero(hero: SubHero): void{
    this.remove.emit(hero);
  }

  public inventory(hero: SubHero): void{
    this.openInventory.emit(hero);
  }

  public select(hero: SubHero): void{
    this.selectHero.emit(hero);
  }

  public skills(hero: SubHero): void{
    this.openSkills.emit(hero);
  }
}
