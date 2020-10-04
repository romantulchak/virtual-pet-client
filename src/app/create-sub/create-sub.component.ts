import { Component, OnInit } from '@angular/core';
import { SubHero } from '../models/subHero.model';
import { SubRequest } from '../models/subRequest.model';
import { SubType } from '../models/subType.model';
import { User } from '../models/user.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.scss']
})
export class CreateSubComponent implements OnInit {

  constructor(private profileService: ProfileService) { }
  public subTypes: SubType[];
  public sub: SubRequest = new SubRequest();
  public subTypeId: number;
  ngOnInit(): void {
    this.getSubTypes();
  }
  public createSub(){
    this.sub.subId = this.subTypeId;
    this.profileService.createSub(this.sub).subscribe(
      res=>{
        console.log(res);

      }
    );
  }
  private getSubTypes(){
    this.profileService.getSubTypes().subscribe(
      res=>{
        console.log(res);

        if(res != null)
          this.subTypes = res;
      }
    );
  }
}
