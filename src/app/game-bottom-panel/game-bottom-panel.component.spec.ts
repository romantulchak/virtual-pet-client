import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBottomPanelComponent } from './game-bottom-panel.component';

describe('GameBottomPanelComponent', () => {
  let component: GameBottomPanelComponent;
  let fixture: ComponentFixture<GameBottomPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBottomPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
