import { Component, OnInit } from '@angular/core';
import { DamageSkill } from '../models/damageSkill.model';
import { SkillCategoryEnum } from '../models/enums/skillCategory.enum';
import { Skill } from '../models/skill.model';
import { ShopService } from '../services/shop.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  public damageSkill: DamageSkill = new DamageSkill();
  public skills: any[] = [];
  constructor(private skillService: SkillService, private shopServcie: ShopService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public createDamageSkill(){
    this.changeDamageSkill(this.damageSkill);
    this.skillService.createDamageSkill(this.damageSkill).subscribe(
      res=>{
        this.skills.push(this.damageSkill);
      }
    );
  }

  private getSkills(){
    this.skillService.getSkills().subscribe(
      res=>{
        if(res != null){
          this.skills = res;
        }
      }
    );
  }
  public removeSkill(skill: any){
    console.log(skill);
    this.skillService.deleteSkill(skill.id, skill.skillCategory).subscribe(
      res=>{
        this.skills = this.skills.filter(x=>x.id != skill.id && x.skillCategory == skill.skillCategory);
      }
    );
  }
  public addSkillToShop(damageSkill: DamageSkill){
    this.changeDamageSkill(damageSkill);
    this.shopServcie.addSkillToShop(damageSkill).subscribe(
      res=>{
          damageSkill.inShop = true;
      }
    );
  }

  public removeSkillFromShop(skill: Skill){
    this.changeDamageSkill(skill);
    console.log(skill);
    
    this.shopServcie.removeSkillFromShop(skill).subscribe(
      res=>{        
      }
    );
    
  }

  private changeDamageSkill(skill):void{
    delete skill.inShop; 
    switch(skill.skillCategory){
      case SkillCategoryEnum.PHYS_DAMAGE:
        skill.type = "damageSkill";
      break;
      case SkillCategoryEnum.DEFENCE:
        skill.type = "defenceSkill";
        break;
    }
  }

}
