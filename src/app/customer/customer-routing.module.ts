import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('../features/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
  },
  {
    path: 'order/:id',
    loadChildren: () =>
      import('../features/order-details/order-details.component').then(
        (c) => c.OrderDetailsComponent
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../features/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../features/users/users.component').then((c) => c.UsersComponent),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../features/login/login.component').then((c) => c.LoginComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
