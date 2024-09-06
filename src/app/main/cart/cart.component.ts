import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cardItems = [1,2,3]
}
