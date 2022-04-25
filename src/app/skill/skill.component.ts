import { Component, OnInit } from '@angular/core';
import { SkillDTO } from '../dto/skill/skill.dto';
import { DamageSkill } from '../models/damageSkill.model';
import { Skill } from '../models/skill.model';
import { ShopService } from '../services/shop.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit{
  public damageSkill: DamageSkill = new DamageSkill();
  public skills: any[] = [];
  public currentPage: number = 0;
  private file: File;
  private temporaryImage: any;

  constructor(private skillService: SkillService,
              private shopServcie: ShopService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public createDamageSkill(): void{
    this.skillService.uploadImage(this.file).subscribe(
      res=>{
        this.skillService.createDamageSkill(this.damageSkill).subscribe(
          res=>{
            this.skills.unshift(res);
          }
        );
      }
    );
  }

  public removeSkill(skill: SkillDTO): void{
    console.log(skill);
    this.skillService.deleteSkill(skill.id, skill.skillCategory).subscribe(
      res=>{
        this.skills = this.skills.filter(x=>x.id != skill.id && x.skillCategory == skill.skillCategory);
      }
    );
  }

  public addSkillToShop(damageSkill: DamageSkill): void{
    this.shopServcie.addSkillToShop(damageSkill).subscribe(
      res=>{
          damageSkill.inShop = true;
      }
    );
  }

  public setFile(event): void{
    this.file = event.target.files[0];
  }

  public removeSkillFromShop(skill: Skill): void{
    this.shopServcie.removeSkillFromShop(skill).subscribe(
      res=>{
      }
    );
  }

  private getSkills(): void{
    this.skillService.getSkills(this.currentPage).subscribe(
      res=>{
        if(res != null){
          this.skills = res;
        }
      }
    );
  }

}
