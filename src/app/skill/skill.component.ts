import { Component, OnInit } from '@angular/core';
import { DamageSkill } from '../models/damageSkill.model';
import { Skill } from '../models/skill.model';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  public damageSkill: DamageSkill = new DamageSkill();
  public skills: any[] = [];
  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public createDamageSkill(){
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
        console.log(this.skills);
        
      }
    );
  }

}
