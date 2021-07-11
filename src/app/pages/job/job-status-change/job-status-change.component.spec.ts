import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusChangeComponent } from './job-status-change.component';

describe('JobStatusChangeComponent', () => {
  let component: JobStatusChangeComponent;
  let fixture: ComponentFixture<JobStatusChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobStatusChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
