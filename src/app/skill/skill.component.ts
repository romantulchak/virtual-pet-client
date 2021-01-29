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
  public skills: Skill[];
  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    this.getSkills();
  }

  public createDamageSkill(){
    this.skillService.createDamageSkill(this.damageSkill).subscribe(
      res=>{
        console.log("Damage skill was created");
      }
    );
  }

  private getSkills(){
    this.skillService.getSkills().subscribe(
      res=>{
        if(res != null){
          console.log(res);
          
        }
      }
    );
  }

}
