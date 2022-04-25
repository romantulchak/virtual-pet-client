import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubHero } from '../models/subHero.model';

@Component({
  selector: 'app-hero-skills',
  templateUrl: './hero-skills.component.html',
  styleUrls: ['./hero-skills.component.scss']
})
export class HeroSkillsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public sub: SubHero) { }

  ngOnInit(): void {
  }

}
