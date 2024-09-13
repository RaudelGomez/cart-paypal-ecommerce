import { Component, inject } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ModalInfoProductComponent } from '../shared/modal-info-product/modal-info-product.component';
import { CommonModule } from '@angular/common';
import { ModalShowService } from '../services/modal-show.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ProductListComponent, CartComponent, ModalInfoProductComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  $modalActivate!: boolean;
  subscription: Subscription = new Subscription();

  $modalCart!: boolean;

  constructor(private modalShowService: ModalShowService){}

  ngOnInit(): void {
    this.getModalActivation();
    this.getModalCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  getModalActivation(){
    const sub = this.modalShowService.getChangeModalStatus().subscribe(
      val => this.$modalActivate = val
    )
    this.subscription.add(sub);
  }

  getModalCart(){
    const sub = this.modalShowService.getShowCartModalvalue().subscribe(
      val => this.$modalCart = val
    )
    this.subscription.add(sub);
  }

  closeModal(){
    this.modalShowService.changeModalStatus();
  }
}
