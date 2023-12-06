import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTwentyComponent } from './payment-twenty.component';

describe('PaymentTwentyComponent', () => {
  let component: PaymentTwentyComponent;
  let fixture: ComponentFixture<PaymentTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTwentyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
