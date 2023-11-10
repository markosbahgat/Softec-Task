import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IOrder } from '../models/order.model';
import { ProductsService } from './products.service';
import { IProduct } from '../models';

/**
 * Service responsible for managing orders.
 */

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private jsonUrl = '../../assets/static/orders.json';
  private selectedProduct: BehaviorSubject<IProduct | null> =
    new BehaviorSubject<IProduct | null>(null);

  private isProductPopUpOpened: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private productsService: ProductsService
  ) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.jsonUrl);
  }
  addOrder(order: IOrder) {
    const newOrder: Partial<IOrder> = {
      OrderId: Math.random() * 1000,
      PaymentType: order.PaymentType,
      Products: order.Products,
      OrderDate: new Date().toISOString(),
      UserId: localStorage.getItem('userId') as string,
    };
  }
  getSelectedProduct() {
    return this.selectedProduct.value;
  }
  getPopUpState(): Observable<any> {
    return this.isProductPopUpOpened.asObservable();
  }
  toggleProductPopUp() {
    this.isProductPopUpOpened.next(!this.isProductPopUpOpened.value);
  }
  selectProduct(product: IProduct) {
    this.toggleProductPopUp();
    this.selectedProduct.next(product);
  }
  getOrderProducts(products: { ProductId: number; Quantity: number }[]) {
    products.map((item) => {
      return {
        ...this.productsService.getProducts().subscribe((state) => {
          return {
            ...(state.find(
              (product) => product.ProductId === item.ProductId
            ) as IProduct),
            Quantity: item.Quantity,
          };
        }),
      };
    });
  }
  getOrder(id: number): Observable<IOrder> {
    return this.http
      .get<IOrder[]>(this.jsonUrl)
      .pipe(
        map((orders) => orders.find((order) => order.OrderId === id))
      ) as Observable<IOrder>;
  }
}
