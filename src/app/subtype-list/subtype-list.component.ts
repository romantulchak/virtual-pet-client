import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SubtypeDTO } from '../dto/subtype.dto';
import { SubTypeService } from '../services/subType.service';

@Component({
  selector: 'app-subtype-list',
  templateUrl: './subtype-list.component.html',
  styleUrls: ['./subtype-list.component.scss']
})
export class SubtypeListComponent implements OnInit {

  public subtypeEditGroup: FormGroup;
  public dataSource: MatTableDataSource<AbstractControl>; 
  public displayedColumns: string[] = ['id','icon', 'name', 'attack', 'defence', 'actions'];
  private subtypes: SubtypeDTO[];

  constructor(private subtypeService: SubTypeService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getSubtypes();
  }

  public saveChanges(index: number): void{
    (this.subtypeEditGroup.get('rows') as FormArray).controls[index].get('isEditable').patchValue(true);
  }

  public cancelChanges(index: number): void{
    (this.subtypeEditGroup.get('rows') as FormArray).controls[index].get('isEditable').patchValue(true);
  }

  public edit(index: number): void{
    (this.subtypeEditGroup.get('rows') as FormArray).controls[index].get('isEditable').patchValue(false);
  }

  private getSubtypes(): void{
    this.subtypeService.getSubtypes().subscribe(
      res=>{
        this.subtypes = res;
        this.initEditGroup();
      }
    );
  }

  private initEditGroup(): void{
    this.subtypeEditGroup = this.formBuilder.group({
      rows: this.formBuilder.array(this.subtypes.map(subtype => this.formBuilder.group({
        id: this.formBuilder.control(subtype.id),
        name: this.formBuilder.control(subtype.name),
        attack: this.formBuilder.control(subtype.attack),
        defence: this.formBuilder.control(subtype.defence),
        iconPath: this.formBuilder.control(subtype.iconPath),
        isEditable: this.formBuilder.control(true)
      })))
    });
    this.dataSource = new MatTableDataSource((this.subtypeEditGroup.get('rows') as FormArray).controls);
  }

}
