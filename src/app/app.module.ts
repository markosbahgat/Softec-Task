import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {
  FooterComponent,
  LayoutComponent,
  NavbarComponent,
  GlobalErrorHandler,
} from 'app/core';

import { HomeComponent } from 'app/pages';

import { StoreModule } from '@ngrx/store';
import { cartReducer } from './reducers';
import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    StoreModule.forRoot({ cart: cartReducer }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
