import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { CartItemClass } from '../../models/cart-item.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cardItems: CartItemClass[] = [];
  subscription!: Subscription;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.loadCartItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  loadCartItems(){
    this.subscription = this.cartService.getProductsCart().subscribe((products: CartItemClass[]) =>{
      this.cardItems = products;
    })
  }
}
