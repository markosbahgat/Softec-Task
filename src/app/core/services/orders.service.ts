import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private jsonUrl = '../../assets/static/orders.json';
  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.jsonUrl);
  }
  getOrder(id: number): Observable<IOrder> {
    return this.http
      .get<IOrder[]>(this.jsonUrl)
      .pipe(
        map((orders) => orders.find((order) => order.OrderId === id))
      ) as Observable<IOrder>;
  }
}
