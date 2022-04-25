import { Component, Input, OnInit } from '@angular/core';
import { BossSub } from '../models/bossSub.model';

@Component({
  selector: 'app-enemy-card',
  templateUrl: './enemy-card.component.html',
  styleUrls: ['./enemy-card.component.scss']
})
export class EnemyCardComponent implements OnInit {
  @Input() currentBoss: BossSub;
  @Input() bossHealth: number;

  constructor() { }

  ngOnInit(): void {
  }
}
