import { Component, OnInit } from '@angular/core';
import { SubRequest } from '../models/subRequest.model';
import { SubType } from '../models/subType.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-create-sub',
  templateUrl: './create-sub.component.html',
  styleUrls: ['./create-sub.component.scss']
})
export class CreateSubComponent implements OnInit {

  public subTypes: SubType[];
  public sub: SubRequest = new SubRequest();
  public subTypeId: number;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getSubTypes();
  }

  public createSub(): void{
    this.sub.id = this.subTypeId;
    this.profileService.createSub(this.sub).subscribe(
      res=>{
        console.log("Sub successfully created");

      }
    );
  }

  private getSubTypes(): void{
    this.profileService.getSubTypes().subscribe(
      res=>{
        console.log(res);
        
        if(res != null)
          this.subTypes = res;
      }
    );
  }
}
