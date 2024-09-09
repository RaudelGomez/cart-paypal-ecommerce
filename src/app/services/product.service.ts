import { inject, Injectable } from '@angular/core';
import { ProductClass } from '../models/product.class';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // productss:ProductClass[] = [
  //   new ProductClass('1', 'shop1.jpg', 'JersusalemSandals', 'Israel', 'Jerusalem flat sandals', 'Jared classic leather sandal handcrafted in Jerusalem.' , 150, 'sandals1.jpg'),
  //   new ProductClass('2', 'shop2.jpg', 'SimonDShane', 'Greece', 'Roman Gladiator', 'Gladiator-inspired strappy sandals with multiple faux leather crossover straps Flat sole with a slight heel elevation for added comfort Adjustable ankle strap with a buckle fastening for a secure fit Open toe design allowing for breathability during warmer months Stylish metallic embellishments adorning the straps for a touch of glamour Embrace the timeless appeal of these Fran Gladiator Strap Flat Sandals from Dorothy Perkins. The strappy design exudes a bohemian flair, making them an ideal choice for casual outings, family gatherings, or brunch dates with friends. Pair them with a flowy sundress or denim shorts for a chic and effortless look that strikes the perfect balance between comfort and style. With their versatile design, these sandals can seamlessly transition from day to evening, allowing you to embrace the warmer months with confidence and flair.', 120.50, 'sandals2.jpg'),
  //   new ProductClass('3', 'shop3.jpg','ModeMan', 'Italy', 'Gladiator Sandals', 'New Fashion Boys Males Punk Gothic Mens Casual Climbing Hunting Outdoor Fishing Fur Lining Winter Snow.', 99.50, 'sandals3.jpg'),
  //   new ProductClass('4', 'shop4.jpg', 'Zeus', 'Greece', 'Strappy Sandals', 'The David men toe loop sandal is a contemporary take on minimalism. Slip your feet into this open-back flip flop with its sleek silhouette and free yourself from life complexities. Sturdy arch strap and toe loop provide support. Vegetable tanned leather upper sole shapes to your foot with each step. Water-resistant sandals soften and acquire patina over time, perfect for office strides. Our master Artisans create each Jerusalem Sandal with a customized touch, providing unparalleled quality.', 60.50, 'sandals4.jpg')
  // ]

  firestore: Firestore = inject(Firestore);

  products$:BehaviorSubject<ProductClass[]> = new BehaviorSubject<ProductClass[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.getProductsDataBase(); 
  }

  async getproductsRef(){
    return collection(this.firestore, 'products')
  }

  async getProductsDataBase() {
    collectionData(await this.getproductsRef(), {idField: 'id'})
    .pipe(
      map((items: any[]) => {
        return items.map(item => this.toJSON(item)); 
      })
    ).subscribe(products=>{
      this.products$.next(products);
    })
  }

  getProducts(): Observable<ProductClass[]>{
    return this.products$.asObservable();
  }

  private toJSON(item: any): ProductClass {
    return {
      id: item.id,
      shopPic: item.shopPic,
      nameShop: item.nameShop,
      city: item.city,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
    };
  }
}
