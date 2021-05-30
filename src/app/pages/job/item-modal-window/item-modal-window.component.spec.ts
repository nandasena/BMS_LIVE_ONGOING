import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModalWindowComponent } from './item-modal-window.component';

describe('ItemModalWindowComponent', () => {
  let component: ItemModalWindowComponent;
  let fixture: ComponentFixture<ItemModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
