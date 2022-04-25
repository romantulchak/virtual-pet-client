import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DamageSkillDTO } from '../dto/skill/damage-skill.dto';
import { DefenceSkillDTO } from '../dto/skill/defence-skill.dto';

@Component({
  selector: 'app-skill-shop',
  templateUrl: './skill-shop.component.html',
  styleUrls: ['./skill-shop.component.scss']
})
export class SkillShopComponent implements OnInit {
  @Input() skill: DamageSkillDTO | DefenceSkillDTO;
  @Input() currentHeroMoney: number;
  @Output() buySkillEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    
  }

  public buySkill(skill): void{
    this.buySkillEvent.emit(skill);
  }
}
