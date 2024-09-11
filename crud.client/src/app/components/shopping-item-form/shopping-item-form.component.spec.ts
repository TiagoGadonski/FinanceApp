import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemFormComponent } from './shopping-item-form.component';

describe('ShoppingItemFormComponent', () => {
  let component: ShoppingItemFormComponent;
  let fixture: ComponentFixture<ShoppingItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingItemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
