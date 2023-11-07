import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProductsComponent } from './features/products/products.component';
import { LoginComponent } from './features/login/login.component';
import { OrderCardComponent } from './core/components/order-card/order-card.component';
import { ProductCardComponent } from './core/components/product-card/product-card.component';
import { UserCardComponent } from './core/components/user-card/user-card.component';
import { HomeComponent } from './features/home/home.component';
import { OrderDetailsComponent } from './features/order-details/order-details.component';
import { OrdersComponent } from './features/orders/orders.component';
import { UsersComponent } from './features/users/users.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { CartComponent } from './features/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
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
    CartComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
