import { Component, OnInit } from '@angular/core';
import { Armor } from '../models/armor.model';
import { Item } from '../models/item.model';
import { Shop } from '../models/shop.model';
import { Skill } from '../models/skill.model';
import { Sword } from '../models/sword.model';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  public shop: Shop;
  public isItems: boolean = true;
  public isSkills: boolean = false;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getShop();
  }

  private getShop(){
    this.shopService.getShop().subscribe(
      res=>{
        
        res.allItems = this.allItems(res.itemArmors, res.itemSwords);
        res.allSkills = this.allSkills(res.damageSkills, res.defenceSkills);
        this.shop = res;
        console.log(res);
        
      }
    );
  }
  private allItems(armors: Item[], swords: Item[]): Item[]{
    return armors.concat(swords);
  }
  private allSkills(damageSkills: Skill[], defenceSkill: Skill[]): Skill[]{
    return damageSkills.concat(defenceSkill);
  }

  public showAllSkills(){
    this.isItems = false;
    this.isSkills = true;
  }
  public showAllItems(){
    this.isItems = true;
    this.isSkills = false;
  }
}
