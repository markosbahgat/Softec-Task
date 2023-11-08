import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IOrder } from '../models/order.model';
import { ProductsService } from './products.service';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private jsonUrl = '../../assets/static/orders.json';

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
