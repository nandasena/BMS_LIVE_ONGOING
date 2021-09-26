import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceQuitationListComponent } from './invoice-quitation-list.component';

describe('InvoiceQuitationListComponent', () => {
  let component: InvoiceQuitationListComponent;
  let fixture: ComponentFixture<InvoiceQuitationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceQuitationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceQuitationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
