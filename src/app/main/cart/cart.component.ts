import { Component, ElementRef, ViewChild } from '@angular/core';
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
  total: number = 0;
  totalItems!: number;
  itemsPayPal: any[] = [];

  //New Method
  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;


  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartService.getCartDataBase();
    this.loadCartItems();
    this.calcTotalCart();
    this.calcTotalItems();
    this.itemCartPaypal();
    window.paypal.Buttons({
      createOrder: (data: any, actions: any)=>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: this.total.toFixed(2).toString(),
                // value: this.totalCart.toFixed(2).toString(),
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: this.total.toFixed(2).toString(),
                    // value: this.totalCart.toFixed(2).toString(),
                  },
                },
              },
              items: this.itemsPayPal,
              // items: [
              //   {
              //     name: "Enterprise Subscription",
              //     quantity: "1",
              //     category: "DIGITAL_GOODS",
              //     unit_amount: {
              //       currency_code: "EUR",
              //       value: "9.99",
              //     },
              //   },
              // ],
            },
          ],
        })
      },
      onApprove: (data: any, actions: { order: { get: () => Promise<any>; }; }) => {
          console.log(
            "onApprove - transaction was approved, but not authorized",
            data,
            actions
          );
          actions.order.get().then((details: any) => {
            console.log(
              "onApprove - you can get full order details inside onApprove: ",
              details
            );
            this.emptyCart(); 
          });
        },
        onClientAuthorization: (data: any) => {
          console.log(
            "onClientAuthorization - you should probably inform your server about completed transaction at this point",
            data
          );
          // this.showSuccess = true; 
        },
        onCancel: (data: any, actions: any) => {
          console.log("OnCancel", data, actions);
          // this.showCancel = true;
        },
        onError: (err: any) => {
          console.log("OnError", err);
          // this.showError = true;
        },
        onClick: (data: any, actions: any) => {
          console.log("onClick", data, actions);
          // this.resetStatus();
        },
    }).render(this.paymentRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }

  itemCartPaypal() {
      const sub = this.cartService.getProductsCart().subscribe({
        next: (items) => {
          this.itemsPayPal = [];
          
          items.forEach((it: { productName: string; productQuantity: number; productPrice: number; }) => {
            let totalvalue = it.productPrice * it.productQuantity;
            this.itemsPayPal.push({
              name: it.productName,
              quantity: "1",
              category: "PHYSICAL_GOODS",
              unit_amount: {
                currency_code: "EUR",
                value: totalvalue.toFixed(2).toString(), 
              },
            });
          });
          console.log('Items for PayPal:', this.itemsPayPal);  
        },
        error: (err) => {
          console.error('Error fetching cart items', err);  
        },
        complete: () => {
          console.log('Subscription completed');
        }
      });
      this.subscription.add(sub);
    }

  async loadCartItems(){
    const sub = this.cartService.getProductsCart().subscribe((products: CartItemClass[]) =>{
      this.cardItems = products;
    });
    this.subscription.add(sub);
  }

  async emptyCart(){
    await this.cartService.emptyCart();
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
