import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetvenuesComponent } from './getvenues.component';

describe('GetvenuesComponent', () => {
  let component: GetvenuesComponent;
  let fixture: ComponentFixture<GetvenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetvenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetvenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
