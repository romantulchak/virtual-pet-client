import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Armor } from '../models/armor.model';
import { Item } from '../models/item.model';
import { Shop } from '../models/shop.model';
import { Skill } from '../models/skill.model';
import { SubHero } from '../models/subHero.model';
import { Sword } from '../models/sword.model';
import { ProfileService } from '../services/profile.service';
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
  constructor(@Inject(MAT_DIALOG_DATA) public currentHero: SubHero, private shopService: ShopService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getShop(); 
  }

  private getShop(){
    this.shopService.getShop(this.currentHero.id).subscribe(
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

  public buyItem(item){
    delete item.isBought;
    
    this.shopService.buyItem(item, this.currentHero.id).subscribe(
      res=>{
        item.isBought = true;
        this.currentHero.currency.money -= item.price;
        this.profileService.currentHero.next(this.currentHero);
      }
    );
  }
  public buySkill(skill){
    this.shopService.buySkill(skill, this.currentHero.id).subscribe(
      res=>{
        skill.isBought = true;
        this.currentHero = res;
        this.profileService.currentHero.next(this.currentHero);
      }
    );
  }
}
