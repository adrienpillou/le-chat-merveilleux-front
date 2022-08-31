import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcToolComponent } from './calc-tool.component';

describe('CalcToolComponent', () => {
  let component: CalcToolComponent;
  let fixture: ComponentFixture<CalcToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
