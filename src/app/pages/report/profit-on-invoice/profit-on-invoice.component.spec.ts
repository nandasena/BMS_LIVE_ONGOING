import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitOnInvoiceComponent } from './profit-on-invoice.component';

describe('ProfitOnInvoiceComponent', () => {
  let component: ProfitOnInvoiceComponent;
  let fixture: ComponentFixture<ProfitOnInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitOnInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitOnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
