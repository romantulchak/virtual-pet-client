import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-shop',
  templateUrl: './skill-shop.component.html',
  styleUrls: ['./skill-shop.component.scss']
})
export class SkillShopComponent implements OnInit {

  @Input() skill: any;
  constructor() { }

  ngOnInit(): void {
  }

}
