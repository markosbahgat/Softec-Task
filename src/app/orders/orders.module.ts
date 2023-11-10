import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { ProductPopupComponent } from './components/product-popup/product-popup.component';

@NgModule({
  declarations: [OrdersComponent, OrderCardComponent, ProductPopupComponent],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
