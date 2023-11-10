import { Injectable } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
    this.products.value.reduce((a, b) => {
      if (b.Quantity !== undefined) {
        return a + b.ProductPrice * b.Quantity;
      } else return a + b.ProductPrice * 1;
    }, 0)
  );

  products$ = this.products.asObservable();
  totalPrice$ = this.totalPrice.asObservable();

  getCartProducts(): Observable<any> {
    return this.products.asObservable();
  }

  getTotalPrice(): Observable<any> {
    console.log(this.totalPrice.value);
    return this.totalPrice.asObservable();
  }

  setState(newState: IProduct[]): void {
    this.products.next(newState);
    this.totalPrice.next(0);
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
    if (products.find((product) => product.ProductId === item.ProductId)) {
      this.changeQuantity(item.ProductId, item.Quantity + 1);
    } else {
      products.push(item);
    }

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
    this.setState(
      this.products.value.filter((item: IProduct) => item.ProductId !== id)
    );
  }
}
