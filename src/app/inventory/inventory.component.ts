import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
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

  constructor(private inventorySerivce: InventoryService,private profileService: ProfileService,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  public items: any = new Array(30);

  public sub: SubHero;

  public menuTopLeftPosition = {x: "0", y:"0"};
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  ngOnInit(): void {

    this.getSub();
    this.getItems();
  }

  private getSub(){
    this.profileService.getCurrentSub(this.data?.sub.id, this.data?.userId).subscribe(
      res=>{
        if(res != null){
          this.sub = res;
        }
      }
    );
  }

  public onRightClick(event: MouseEvent, item){
    event.preventDefault();
    this.menuTopLeftPosition.x = event.clientX + 'px'; 
    this.menuTopLeftPosition.y = event.clientY + 'px'; 
    console.log(item);
    
    this.matMenuTrigger.menuData = {item: item};
    this.matMenuTrigger.openMenu();
  }

  private getItems(){
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

  public setItem(item: any){
    let setItemRequest = new SetItemRequest(this.sub.id, item.eItemCategory, item.id, item.eItemType);
    this.inventorySerivce.setItem(setItemRequest).subscribe(
      res=>{      
        this.sub = res;
        this.profileService.currentHero.next(this.sub);
        this.getItems();

      }
    );
  }

  public withdrawWeapon(bodyPosition: string, itemId: number){
    let setItemRequest = new SetItemRequest(this.sub.id, bodyPosition, itemId, 'WEAPON');
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
  public withdrawArmor(bodyPosition: string, itemId: number){
    let setItemRequest = new SetItemRequest(this.sub.id, bodyPosition, itemId, 'ARMOR');
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

  public sellItem(item){
    this.inventorySerivce.sellItem(item, this.sub.id).subscribe(
      res=>{
        this.getSub();
        this.getItems();
   
        this.profileService.currentHero.next(res);
      }
    );
  }
}
