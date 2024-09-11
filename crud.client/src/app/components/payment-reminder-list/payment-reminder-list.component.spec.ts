import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReminderListComponent } from './payment-reminder-list.component';

describe('PaymentReminderListComponent', () => {
  let component: PaymentReminderListComponent;
  let fixture: ComponentFixture<PaymentReminderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentReminderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentReminderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
