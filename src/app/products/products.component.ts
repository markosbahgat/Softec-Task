import { Component } from '@angular/core';
import { IProduct } from 'app/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  providers: [ProductsService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
