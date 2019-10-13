import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSelfieListComponent } from './business-selfie-list.component';

describe('BusinessSelfieListComponent', () => {
  let component: BusinessSelfieListComponent;
  let fixture: ComponentFixture<BusinessSelfieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSelfieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSelfieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
