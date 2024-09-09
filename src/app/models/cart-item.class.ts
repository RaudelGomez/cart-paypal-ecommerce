export class CartItemClass {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productQuantity: number;

  constructor(id: string, productId: string, productName: string, productPrice: number, productQuantity?: number){
    this.id = id ? id : '';
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity ? productQuantity : 1;
  }

}
