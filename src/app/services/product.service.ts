import { Injectable } from '@angular/core';
import { ProductClass } from '../models/product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:ProductClass[] = [
    new ProductClass(1, 'shop1.jpg', 'JersusalemSandals', 'Israel', 'Jerusalem flat sandals', 'Jared classic leather sandal handcrafted in Jerusalem. Featuring adjustable velcro straps to provide comfort, style and support for years to come. Vegetable-tanned natural leather Leather sole molds to your feet Comfortable polyurethane outsole Durable textured grip sole Light and flexible Hand-Crafted in East Jerusalem', 150, 'sandals1.jpg'),
    new ProductClass(2, 'shop2.jpg', 'SimonDShane', 'Greece', 'Roman Gladiator', 'Gladiator-inspired strappy sandals with multiple faux leather crossover straps Flat sole with a slight heel elevation for added comfort Adjustable ankle strap with a buckle fastening for a secure fit Open toe design allowing for breathability during warmer months Stylish metallic embellishments adorning the straps for a touch of glamour Embrace the timeless appeal of these Fran Gladiator Strap Flat Sandals from Dorothy Perkins. The strappy design exudes a bohemian flair, making them an ideal choice for casual outings, family gatherings, or brunch dates with friends. Pair them with a flowy sundress or denim shorts for a chic and effortless look that strikes the perfect balance between comfort and style. With their versatile design, these sandals can seamlessly transition from day to evening, allowing you to embrace the warmer months with confidence and flair.', 120.50, 'sandals2.jpg'),
    new ProductClass(3, 'shop3.jpg','ModeMan', 'Italy', 'Gladiator Sandals', 'New Fashion Boys Males Punk Gothic Mens Casual Climbing Hunting Outdoor Fishing Fur Lining Winter Snow.', 99.50, 'sandals3.jpg'),
    new ProductClass(4, 'shop4.jpg', 'Zeus', 'Greece', 'Strappy Sandals', 'The David men toe loop sandal is a contemporary take on minimalism. Slip your feet into this open-back flip flop with its sleek silhouette and free yourself from life complexities. Sturdy arch strap and toe loop provide support. Vegetable tanned leather upper sole shapes to your foot with each step. Water-resistant sandals soften and acquire patina over time, perfect for office strides. Our master Artisans create each Jerusalem Sandal with a customized touch, providing unparalleled quality.', 60.50, 'sandals4.jpg')
  ]

  constructor() { }

  get getProducts(): ProductClass[]{
    return this.products;
  }
}
