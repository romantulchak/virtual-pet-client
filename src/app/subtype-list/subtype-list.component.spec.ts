import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeListComponent } from './subtype-list.component';

describe('SubtypeListComponent', () => {
  let component: SubtypeListComponent;
  let fixture: ComponentFixture<SubtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
