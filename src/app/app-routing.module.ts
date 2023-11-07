import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModule } from './customer/customer.module';

const routes: Routes = [
  {
    path: '',
    component: CustomerModule,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
