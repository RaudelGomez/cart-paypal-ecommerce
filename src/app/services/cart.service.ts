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
    let productFoundInCartItem = this.cartItems.findIndex(item => (item.productId === product.id));
    if(productFoundInCartItem === -1){
      let cartItem = new CartItemClass(product.id, product.name, product.price)
      this.cartItems.push(cartItem);
    }else{
      this.cartItems[productFoundInCartItem].productQuantity++
    }
    this.cartItems$.next(this.cartItems);
  }

  getProductsCart(): Observable<CartItemClass[]>{
    return this.cartItems$.asObservable();
  }

  emptyCart(){
    this.cartItems = [];
    this.cartItems$.next(this.cartItems);
  }

  deleteOneItemFromCart(productId: string){
    let itemFound = this.cartItems.findIndex(item => item.productId === productId);
    if(itemFound >= 0){
      if(this.cartItems[itemFound].productQuantity > 1){
        this.cartItems[itemFound].productQuantity--
      }else{
        this.cartItems.splice(itemFound, 1);
      }
      this.cartItems$.next(this.cartItems);
    }
  }
}
