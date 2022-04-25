import { Component, OnInit } from '@angular/core';
import { Sword } from '../models/sword.model';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public sword: Sword = new Sword();

  public uniqueness = [
    {
      name:"common",
      value: 0,
    },
    {
    name:"uncommon",
    value: 1,
    },
    {
      name:"rare",
      value: 2,
    },
    {
      name:"mythical",
      value: 3,
    },
    {
    name:"legendary",
    value: 4,
    }
];

public itemCategories = [
  {
    name:"sword",
    value: 0,
  },
  {
  name:"legs",
  value: 1,
  },
  {
    name:"shoulders",
    value: 2,
  },
  {
    name:"body",
    value: 3,
  },
  {
  name:"hands",
  value: 4,
  },
  {
    name: "shield",
    value: 5
  }
];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  public createSword(): void{
    this.sword.iconPath = "";
    this.itemService.createSword(this.sword).subscribe(
      res=>{
      }
    );
  }

}
