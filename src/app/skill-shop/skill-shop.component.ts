import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-skill-shop',
  templateUrl: './skill-shop.component.html',
  styleUrls: ['./skill-shop.component.scss']
})
export class SkillShopComponent implements OnInit {

  @Input() skill: any;
  @Output() buySkillEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  public buySkill(skill){
    this.buySkillEvent.emit(skill);
  }

}
