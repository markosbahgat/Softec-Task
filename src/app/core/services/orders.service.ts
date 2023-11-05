import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private jsonUrl = '../../assets/static/orders.json';
  constructor(private http: HttpClient) {}

  getData(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.jsonUrl);
  }
}
