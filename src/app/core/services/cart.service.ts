import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { IOrder } from '../models';

/**
 * Service responsible for managing the cart of products.
 */

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private products: BehaviorSubject<IProduct[]> = new BehaviorSubject<
    IProduct[]
  >(JSON.parse(localStorage.getItem('cartProducts') || '[]'));
  private totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(
    (
      JSON.parse(localStorage.getItem('cartProducts') || '[]') as IProduct[]
    ).reduce((a, b) => a + b.ProductPrice, 0)
  );

  products$ = this.products.asObservable();
  totalPrice$ = this.totalPrice.asObservable();

  getCartProducts(): Observable<any> {
    return this.products.asObservable();
  }

  getTotalPrice(): Observable<any> {
    return this.totalPrice.asObservable();
  }

  setState(newState: any): void {
    this.products.next(newState);
    newState.forEach((item: IProduct) => {
      this.totalPrice.next(
        this.totalPrice.value + item.ProductPrice * item.Quantity
      );
    });
    localStorage.setItem('cartProducts', JSON.stringify(newState));
  }
  addToCart(item: IProduct) {
    let products: IProduct[] = JSON.parse(
      localStorage.getItem('cartProducts') || '[]'
    );
    products.push(item);

    this.setState(products);
  }
  changeQuantity(id: number, quantity: number) {
    let products: IProduct[] = JSON.parse(
      localStorage.getItem('cartProducts') || '[]'
    );
    const newProducts = products.map((item: IProduct) => {
      if (item.ProductId === id) {
        return { ...item, Quantity: quantity };
      }
      return item;
    });
    this.setState(newProducts);
  }

  removeFromCart(id: number) {
    const targetProduct = this.products.value.find(
      (item: IProduct) => item.ProductId === id
    ) as IProduct;
    this.setState(
      this.products.value.filter((item: IProduct) => item.ProductId !== id)
    );
    this.totalPrice.next(
      this.totalPrice.value -
        targetProduct.ProductPrice * targetProduct.Quantity
    );
  }
}
