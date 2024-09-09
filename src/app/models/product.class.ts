export class ProductClass {
  id: string;
  shopPic: string;
  nameShop: string;
  city: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  constructor(id: string, shopPic: string, nameShop: string,  city: string, name: string, description: string, price: number, imageUrl: string){
    this.id = id;
    this.shopPic = shopPic;
    this.nameShop = nameShop;
    this.city = city;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl
  }
}
