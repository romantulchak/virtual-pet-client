import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Item } from '../models/item.model';
import { SubHero } from '../models/subHero.model';
import { SetItemRequest } from '../request/setItemRequest.model';
import { InventoryService } from '../services/inventory.service';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public items: any = new Array(30);
  public sub: SubHero;
  public menuTopLeftPosition = {x: "0", y:"0"};
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;
  private readonly WEAPON = 'WEAPON';
  private readonly ARMOR = 'ARMOR';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private inventorySerivce: InventoryService,
  private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getSub();
    this.getItems();
  }

  public onRightClick(event: MouseEvent, item): void{
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    this.matMenuTrigger.menuData = {item: item};
    this.matMenuTrigger.openMenu();
  }

  public setItem(item: any): void{
    let setItemRequest = new SetItemRequest(this.sub.id, item.itemCategory, item.id, item.itemType);
    this.inventorySerivce.setItem(setItemRequest).subscribe(
      res=>{
        this.sub = res;
        this.profileService.currentHero.next(this.sub);
        this.getItems();

      }
    );
  }

  public withdrawWeapon(bodyPosition: string, itemId: number): void{
    let setItemRequest = new SetItemRequest(this.sub.id, bodyPosition, itemId, this.WEAPON);
    this.inventorySerivce.withdrawWeapon(setItemRequest).subscribe(
      res=>{
        if(res != null){
          this.sub = res;
          this.getItems();
          this.profileService.currentHero.next(this.sub);
        }
      }
    );
  }

  public withdrawArmor(bodyPosition: string, itemId: number): void{
    let setItemRequest = new SetItemRequest(this.sub.id, bodyPosition, itemId, this.ARMOR);
    this.inventorySerivce.withdrawArmor(setItemRequest).subscribe(
      res=>{
        if(res != null){
          this.sub = res;
          this.getItems();
          this.profileService.currentHero.next(this.sub);
        }
      }
    );
  }

  public sellItem(item: Item): void{
    this.inventorySerivce.sellItem(item, this.sub.id).subscribe(
      res=>{
        this.getSub();
        this.getItems();
        this.profileService.currentHero.next(res);
      }
    );
  }

  public putOnTakeOff(item: Item): void{
  }

  public withdrawItem(item: Item){
  }

  private getSub(): void{
    this.profileService.getCurrentSub(this.data?.sub.id, this.data?.userId).subscribe(
      res=>{
        if(res != null){
          this.sub = res;
        }
      }
    );
  }

  private getItems(): void{
    this.inventorySerivce.getItemsInInventory(this.data.sub.id).subscribe(
      res=>{
        if(res != null){
          this.items = new Array(30);
          res.forEach(element => {
              this.items.splice(0, 0, element);
            });
        }
      }
    );
  }
}
