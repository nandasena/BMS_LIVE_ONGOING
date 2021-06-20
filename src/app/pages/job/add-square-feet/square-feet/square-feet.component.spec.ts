import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareFeetComponent } from './square-feet.component';

describe('SquareFeetComponent', () => {
  let component: SquareFeetComponent;
  let fixture: ComponentFixture<SquareFeetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareFeetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareFeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
