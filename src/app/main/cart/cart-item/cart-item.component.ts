import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CartItemClass } from '../../../models/cart-item.class';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItemClass;

}
