import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from 'app/core';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
