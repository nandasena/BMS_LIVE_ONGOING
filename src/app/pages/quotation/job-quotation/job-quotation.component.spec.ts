import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobQuotationComponent } from './job-quotation.component';

describe('JobQuotationComponent', () => {
  let component: JobQuotationComponent;
  let fixture: ComponentFixture<JobQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
