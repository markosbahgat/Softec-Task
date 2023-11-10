import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from './core';

export interface AppState {
  products: IProduct[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private title = 'softec-task';
  private products$: Observable<IProduct[]> = new Observable<IProduct[]>();
  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select('products');
  }
  setProductsFromStorage() {
    const products = JSON.parse(localStorage.getItem('cartProducts') || '[]');
    this.store.dispatch({ type: 'SET_PRODUCTS' });
  }
}
