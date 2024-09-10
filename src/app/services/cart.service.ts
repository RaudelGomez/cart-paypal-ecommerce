import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItemClass } from '../models/cart-item.class';
import { ProductClass } from '../models/product.class';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // cartItems: CartItemClass[] = [];
  cartItems$: BehaviorSubject<CartItemClass[]> = new BehaviorSubject<CartItemClass[]> ([])
  firestore: Firestore = inject(Firestore);
  currentItemAddCart?: string;
  
  constructor() { }

  ngOnInit(): void {
    this.getCartDataBase(); 
  }

  async getCartRef(){
    return collection(this.firestore, 'cart');
  }

  async getCartDataBase(){
    collectionData(await this.getCartRef(), {idField: 'id'})
    .pipe(
      map((items: any[]) => {
        return items.map(item => this.toJSON(item)); 
      })
    ).subscribe(products=>{
      console.log(products);
      this.cartItems$.next(products);
    })
  }

  // get getCart(): Observable<CartItemClass[]>{
  //   return this.cartItems$.asObservable();
  // }

  private toJSON(item: any): CartItemClass {
    return {
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productPrice: item.productPrice,
      productQuantity: item.productQuantity
    };
  }

  getSingleItemRef(colId:string, docId: string){
    return doc(collection(this.firestore, colId), docId);
  }

  async addProductCart(product: ProductClass){
    try{
      const q = query(collection(this.firestore, "cart"), where("productId", "==", product.id));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        querySnapshot.forEach(async (docSnap) => {
        const docRef = docSnap.ref; 
        const currentData = docSnap.data();
        const currentQuantity = currentData['productQuantity'];
        await updateDoc(docRef, { productQuantity: currentQuantity + 1 });
        });
      }else{
        const docRef = doc(collection(this.firestore, 'cart'));
        const cartItem = new CartItemClass(docRef.id, product.id, product.name, product.price, 1);
        await addDoc(collection(this.firestore, 'cart'), { ...cartItem });
      }
    } catch (error) {
      console.error(error);
    }
  }

  getProductsCart(): Observable<CartItemClass[]>{
    return this.cartItems$.asObservable();
  }

  async emptyCart(){
    try {
      const collectionRef = this.getCartRef();
      const querySnapshot = await getDocs(await collectionRef);
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(doc(this.firestore, 'cart', docSnapshot.id));
        console.log(`Documento con ID ${docSnapshot.id} eliminado.`);
      });
      console.log('Todos los documentos han sido eliminados.');
    } catch (error) {
      console.error('Error al eliminar la colección: ', error);
    }
  }

  async deleteOneItemFromCart(productId: string, idDoc: string){
    try{
      const q = query(collection(this.firestore, "cart"), where("productId", "==", productId));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        querySnapshot.forEach(async (docSnap) => {
        const docRef = docSnap.ref; 
        const currentData = docSnap.data();
        const currentQuantity = currentData['productQuantity'];
        if(currentQuantity > 1){
            await updateDoc(docRef, { productQuantity: currentQuantity - 1 });
          }else{
            await deleteDoc(this.getSingleItemRef('cart', idDoc));
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
