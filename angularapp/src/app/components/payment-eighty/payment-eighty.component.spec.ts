import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEightyComponent } from './payment-eighty.component';

describe('PaymentEightyComponent', () => {
  let component: PaymentEightyComponent;
  let fixture: ComponentFixture<PaymentEightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentEightyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentEightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
