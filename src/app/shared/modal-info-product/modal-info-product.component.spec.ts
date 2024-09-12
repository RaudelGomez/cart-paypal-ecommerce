import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoProductComponent } from './modal-info-product.component';

describe('ModalInfoProductComponent', () => {
  let component: ModalInfoProductComponent;
  let fixture: ComponentFixture<ModalInfoProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInfoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
