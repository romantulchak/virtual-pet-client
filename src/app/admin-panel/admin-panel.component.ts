import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public items = [
  {
    name: 'Subs',
    icon: '../../assets/images/admin/nav-icons/knight.png',
    children: [
      {
        name: 'Create Sub type',
        link: 'create-sub-type'
      },
      {
        name: 'List of sub types',
        link: 'sub-types'
      }
    ]
  },

  {
    name: 'Bosses',
    icon: '../../assets/images/admin/nav-icons/monster.png',
    children: [
      {
        name: 'Create Sub type',
        link: 'create-sub-type'
      }
    ]
  },

]

  constructor() { }

  ngOnInit(): void {
  }

}
