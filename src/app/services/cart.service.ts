import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItemClass } from '../models/cart-item.class';
import { ProductClass } from '../models/product.class';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItemClass[] = [];
  cartItems$: BehaviorSubject<CartItemClass[]> = new BehaviorSubject<CartItemClass[]> ([])
  
  constructor() { }

  addProductCart(product: ProductClass): void{
    this.cartItems.findIndex(item => console.log(item))
    let cartItem = new CartItemClass(product.id, product.name, product.price)
    this.cartItems.push(cartItem);
    this.cartItems$.next(this.cartItems);
  }

  getProductsCart(): Observable<CartItemClass[]>{
    return this.cartItems$.asObservable();
  }
}
