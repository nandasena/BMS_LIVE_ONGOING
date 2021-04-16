import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseProfitComponent } from './item-wise-profit.component';

describe('ItemWiseProfitComponent', () => {
  let component: ItemWiseProfitComponent;
  let fixture: ComponentFixture<ItemWiseProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemWiseProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
