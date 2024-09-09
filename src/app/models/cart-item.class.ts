export class CartItemClass {
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;

  constructor(productId: string, productName: string, productPrice: number, productQuantity?: number){
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity ? productQuantity : 1;
  }

}
