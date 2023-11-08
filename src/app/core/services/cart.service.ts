import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private products: BehaviorSubject<IProduct[]> = new BehaviorSubject<
    IProduct[]
  >(JSON.parse(localStorage.getItem('cartProducts') || '[]'));
  private totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
    console.log(this.products.value);
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
  ngOnInit(): void {
    this.totalPrice.next(
      this.products.value.reduce((a, item) => a + item.ProductPrice, 0)
    );
  }
  removeFromCart(id: number) {
    this.setState(
      this.products.value.filter((item: IProduct) => item.ProductId !== id)
    );
  }
}
