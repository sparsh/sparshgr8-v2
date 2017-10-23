import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealperComponent } from './healper.component';

describe('HealperComponent', () => {
  let component: HealperComponent;
  let fixture: ComponentFixture<HealperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
