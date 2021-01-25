import { Component, OnInit } from '@angular/core';
import { SubType } from '../models/subType.model';
import { SubTypeService } from '../services/subType.service';

@Component({
  selector: 'app-sub-type',
  templateUrl: './sub-type.component.html',
  styleUrls: ['./sub-type.component.scss']
})
export class SubTypeComponent implements OnInit {
  
  public subType: SubType = new SubType();
  private file: File = null;
  constructor(private subTypeService: SubTypeService) { }

  ngOnInit(): void {
    
  }
  public changeFile(event){
    this.file = event.target.files[0];
  }
  public uploadImage(){
    this.subTypeService.uploadFile(this.file).subscribe(
      res=>{
        this.createSubType();
      }
    );
  }


  private createSubType(){
    this.subTypeService.createSubType(this.subType).subscribe(
      res=>{
        console.log("Sub Type was created");
      }
    );
  }
}
