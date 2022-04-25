import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-shop',
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.scss']
})
export class ItemShopComponent implements OnInit {

  @Input() item: any;
  @Output() buyItemEnvet = new EventEmitter<Item>(null);

  constructor() { }

  ngOnInit(): void {
  }

  public buyItem(item): void{
    this.buyItemEnvet.emit(item);
  }
}
