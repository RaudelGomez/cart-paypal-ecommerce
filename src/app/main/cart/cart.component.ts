import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { CartItemClass } from '../../models/cart-item.class';
import { map, Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PaypalComponent } from '../../shared/paypal/paypal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, MatButtonModule, MatIconModule, PaypalComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cardItems: CartItemClass[] = [];
  subscription: Subscription = new Subscription();
  total!: number;
  totalItems!: number;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getCartDataBase();
    this.loadCartItems();
    this.calcTotalCart();
    this.calcTotalItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  async loadCartItems(){
    const sub = this.cartService.getCart.subscribe((products: CartItemClass[]) =>{
      this.cardItems = products;
    });
    this.subscription.add(sub);
  }

  emptyCart(){
    this.cartService.emptyCart();
  }

  calcTotalCart(){
    const sub = this.cartService.getProductsCart()
    .pipe(map(items =>{
      return items.reduce((acc, curr)=> acc + (curr.productPrice * curr.productQuantity), 0)
    }))
    .subscribe(val =>{
      this.total = val;
    });
    this.subscription.add(sub);
  }

  calcTotalItems(){
    const sub = this.cartService.getProductsCart()
    .pipe(map(items =>{
      return items.reduce((acc, curr)=> acc +  curr.productQuantity, 0)
    }))
    .subscribe(val =>{
      this.totalItems = val;
    });
    this.subscription.add(sub);
  }
}
