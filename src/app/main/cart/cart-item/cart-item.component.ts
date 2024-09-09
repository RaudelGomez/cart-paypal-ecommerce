import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CartItemClass } from '../../../models/cart-item.class';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItemClass;

  constructor(private cartService: CartService){}

  deleteOneProduct(productId: string){
    this.cartService.deleteOneItemFromCart(productId);
  }

}
