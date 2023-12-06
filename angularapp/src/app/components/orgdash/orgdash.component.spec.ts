import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgdashComponent } from './orgdash.component';

describe('OrgdashComponent', () => {
  let component: OrgdashComponent;
  let fixture: ComponentFixture<OrgdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
