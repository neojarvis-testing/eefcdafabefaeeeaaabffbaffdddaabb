import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvenueComponent } from './addvenue.component';

describe('AddvenueComponent', () => {
  let component: AddvenueComponent;
  let fixture: ComponentFixture<AddvenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
