import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusDropdownComponent } from './job-status-dropdown.component';

describe('JobStatusDropdownComponent', () => {
  let component: JobStatusDropdownComponent;
  let fixture: ComponentFixture<JobStatusDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatusDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
