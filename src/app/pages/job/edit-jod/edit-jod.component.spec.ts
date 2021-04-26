import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJodComponent } from './edit-jod.component';

describe('EditJodComponent', () => {
  let component: EditJodComponent;
  let fixture: ComponentFixture<EditJodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
