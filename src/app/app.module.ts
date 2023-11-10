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

import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    FooterComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, HttpClientModule],
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
