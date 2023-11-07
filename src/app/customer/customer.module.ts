import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ProductsComponent } from '../features/products/products.component';
import { OrdersComponent } from '../features/orders/orders.component';
import { UsersComponent } from '../features/users/users.component';
import { ProductCardComponent } from '../core/components/product-card/product-card.component';
import { OrderCardComponent } from '../core/components/order-card/order-card.component';
import { UserCardComponent } from '../core/components/user-card/user-card.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { HomeComponent } from '../features/home/home.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { OrderDetailsComponent } from '../features/order-details/order-details.component';
import { LoginComponent } from '../features/login/login.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    ProductCardComponent,
    OrderCardComponent,
    UserCardComponent,
    LayoutComponent,
    HomeComponent,
    FooterComponent,
    OrderDetailsComponent,
    LoginComponent,
  ],
  imports: [CommonModule, CustomerRoutingModule],
})
export class CustomerModule {}
