import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';

@NgModule({
  declarations: [CartComponent, CartProductComponent],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
