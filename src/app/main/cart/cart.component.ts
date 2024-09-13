import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { CartItemClass } from '../../models/cart-item.class';
import { map, Subscription } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ModalMessageComponent } from '../../shared/modal-message/modal-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalShowService } from '../../services/modal-show.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cardItems: CartItemClass[] = [];
  subscription: Subscription = new Subscription();
  total: number = 0;
  totalItems!: number;
  itemsPayPal: any[] = [];
  $modalCart!: boolean;
  readonly dialog = inject(MatDialog);

  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;

  constructor(private cartService: CartService, private modalShowService: ModalShowService){
    
  }
  
  openDialog(details: any) {
    const dialog = this.dialog.open(ModalMessageComponent);
    dialog.componentInstance.data = details.purchase_units;
    dialog.componentInstance.id = details.id;
  }

  ngOnInit(): void {
    this.cartService.getCartDataBase();
    this.loadCartItems();
    this.calcTotalCart();
    this.calcTotalItems();
    this.itemCartPaypal();
    this.getModalCart();
  }

  ngAfterViewInit(): void {
    window.paypal.Buttons({
      createOrder: (data: any, actions: any)=>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "EUR",
                value: this.total.toFixed(2).toString(),
                breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: this.total.toFixed(2).toString(),
                  },
                },
              },
              items: this.itemsPayPal,
            },
          ],
        })
      },
      onApprove: (data: any, actions: { order: { get: () => Promise<any>; }; }) => {
          // console.log(
          //   "onApprove - transaction was approved, but not authorized",
          //   data,
          //   actions
          // );
          this.openDialog(data);
          actions.order.get().then((details: any) => {
            // console.log(
            //   "onApprove - you can get full order details inside onApprove: ",
            //   details
            // );
            this.openDialog(details);
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
          // console.log("OnCancel", data, actions);
          // this.showCancel = true;
        },
        onError: (err: any) => {
          // console.log("OnError", err);
          // this.showError = true;
        },
        onClick: (data: any, actions: any) => {
          // console.log("onClick", data, actions);
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
          // console.log('Items for PayPal:', this.itemsPayPal);  
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

  getModalCart(){
    const sub = this.modalShowService.getShowCartModalvalue().subscribe(
      val => this.$modalCart = val
    )
    this.subscription.add(sub);
  }

  closeModal(){
    this.modalShowService.changeShowModalCart();
  }

}
