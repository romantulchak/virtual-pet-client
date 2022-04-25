import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillDTO } from '../dto/skill/skill.dto';
import { Item } from '../models/item.model';
import { Shop } from '../models/shop.model';
import { Skill } from '../models/skill.model';
import { SubHero } from '../models/subHero.model';
import { ProfileService } from '../services/profile.service';
import { ShopService } from '../services/shop.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public shop: Shop;
  public isItems: boolean = false;
  public isSkills: boolean = true;
  public currentPage: number = 0;
  public skills: SkillDTO[];

  constructor(@Inject(MAT_DIALOG_DATA) public currentHero: SubHero,
              private shopService: ShopService,
              private profileService: ProfileService,
              private skillService: SkillService) { }

  ngOnInit(): void {
    this.showAllSkills();
  }

  public showAllSkills(): void{
    this.isItems = false;
    this.isSkills = true;
    this.skillService.getSkillsInShopForSub(this.currentHero.id, this.currentPage).subscribe(
      res=>{
        this.skills = res;
        console.log(res);
      }
    );
  }

  public showAllItems(): void{
    this.isItems = true;
    this.isSkills = false;
  }

  public buyItem(item): void{
    delete item.isBought;
    this.shopService.buyItem(item, this.currentHero.id).subscribe(
      res=>{
        item.isBought = true;
        this.currentHero.currency.money -= item.price;
        this.profileService.currentHero.next(this.currentHero);
      }
    );
  }

  public buySkill(skill: SkillDTO): void{
    this.shopService.buySkill(skill.id, this.currentHero.id).subscribe(
      res=>{
        skill.isBought = true;
        this.skills = this.skills.filter(s => s.id != skill.id)
        this.currentHero.currency.money -= skill.price;
        this.profileService.currentHero.next(this.currentHero);
      }
    );
  }

  private allItems(armors: Item[], swords: Item[]): Item[]{
    return armors.concat(swords);
  }
  private allSkills(damageSkills: Skill[], defenceSkill: Skill[]): Skill[]{
    return damageSkills.concat(defenceSkill);
  }
}
