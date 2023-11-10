import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../core/models/product.model';

/**
 * Service responsible for managing products.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private jsonUrl = '../../../assets/static/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.jsonUrl);
  }
}
