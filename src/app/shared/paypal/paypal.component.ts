import { Component } from "@angular/core";
import {
	ICreateOrderRequest,
	IPayPalConfig,
	NgxPayPalModule,
} from "ngx-paypal";
import { environment } from "../../../environments/environment";
import { CartService } from "../../services/cart.service";
import { map, Subscription } from "rxjs";
import { CartItemClass } from "../../models/cart-item.class";

@Component({
	selector: "app-paypal",
	standalone: true,
	imports: [NgxPayPalModule],
	templateUrl: "./paypal.component.html",
	styleUrl: "./paypal.component.scss",
})
export class PaypalComponent {
	// @Input() totalCart!: number;
	totalCart!: number;

	itemsPayPal: any[] = [];
	subscription: Subscription = new Subscription();

	public payPalConfig?: IPayPalConfig;

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		// this.initConfig();
		// this.itemCartPaypal();
    this.calcTotalCart();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

  calcTotalCart(){
    const sub = this.cartService.getProductsCart()
    .pipe(map(items =>{
      return items.reduce((acc, curr)=> acc + (curr.productPrice * curr.productQuantity), 0)
    }))
    .subscribe(val =>{
      this.totalCart = val;
      console.log(this.totalCart);
    });
    this.subscription.add(sub);
  }

  // itemCartPaypal() {
  //   const sub = this.cartService.getProductsCart().subscribe({
  //     next: (items) => {
  //       this.itemsPayPal = [];
        
  //       items.forEach((it: { productName: string; productQuantity: number; productPrice: number; }) => {
  //         let totalvalue = it.productPrice * it.productQuantity;
  //         this.itemsPayPal.push({
  //           name: it.productName,
  //           quantity: "1",
  //           category: "PHYSICAL_GOODS",
  //           unit_amount: {
  //             currency_code: "EUR",
  //             value: totalvalue.toFixed(2).toString(), 
  //           },
  //         });
  //       });
  //       console.log('Items for PayPal:', this.itemsPayPal);  
  //     },
  //     error: (err) => {
  //       console.error('Error fetching cart items', err);  
  //     },
  //     complete: () => {
  //       console.log('Subscription completed');  
  //     }
  //   });
  //   this.subscription.add(sub);
  // }

	// private initConfig(): void {
	// 	this.payPalConfig = {
	// 		currency: "EUR",
	// 		clientId: "AfktmEh4POVXSts-YandkJnNc9zmG-Crtnerb70H18DhBzOeepsN4QaZD5AfDnnSZ9FpqC5FwqiYPumU",
	// 		createOrderOnClient: (data) =>
	// 			<ICreateOrderRequest>{
	// 				intent: "CAPTURE",
	// 				purchase_units: [
	// 					{
	// 						amount: {
	// 							currency_code: "EUR",
	// 							value: "20",
	// 							// value: this.totalCart.toFixed(2).toString(),
	// 							breakdown: {
	// 								item_total: {
	// 									currency_code: "EUR",
	// 									value: "20",
	// 									// value: this.totalCart.toFixed(2).toString(),
	// 								},
	// 							},
	// 						},
	// 						// items: this.itemsPayPal,
	// 						items: [
	// 							{
	// 								name: "Enterprise Subscription",
	// 								quantity: "1",
	// 								category: "DIGITAL_GOODS",
	// 								unit_amount: {
	// 									currency_code: "EUR",
	// 									value: "20",
	// 								},
	// 							},
	// 						],
	// 					},
	// 				],
	// 			},
	// 		advanced: {
	// 			commit: "true",
	// 		},
	// 		style: {
	// 			label: "paypal",
	// 			layout: "vertical",
	// 		},
	// 		onApprove: (data, actions) => {
	// 			console.log(
	// 				"onApprove - transaction was approved, but not authorized",
	// 				data,
	// 				actions
	// 			);
	// 			actions.order.get().then((details: any) => {
	// 				console.log(
	// 					"onApprove - you can get full order details inside onApprove: ",
	// 					details
	// 				);
	// 			});
	// 		},
	// 		onClientAuthorization: (data) => {
	// 			console.log(
	// 				"onClientAuthorization - you should probably inform your server about completed transaction at this point",
	// 				data
	// 			);
	// 			// this.showSuccess = true;
	// 		},
	// 		onCancel: (data, actions) => {
	// 			console.log("OnCancel", data, actions);
	// 			// this.showCancel = true;
	// 		},
	// 		onError: (err) => {
	// 			console.log("OnError", err);
	// 			// this.showError = true;
	// 		},
	// 		onClick: (data, actions) => {
	// 			console.log("onClick", data, actions);
	// 			// this.resetStatus();
	// 		},
	// 	};
	// }
}
