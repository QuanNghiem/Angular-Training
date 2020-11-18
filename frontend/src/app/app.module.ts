import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import { AppComponent } from './app.component';

import { PurchasePipe } from './_helper/purchase.pipe';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { ErrorInterceptor } from './_helper/error.interceptor';

import { UserService } from './_service/user.service';
import { EventService } from './_service/event.service';

import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ShowUsersComponent } from './component/show-users/show-users.component';

import { AddEventComponent } from './component/add-event/add-event.component';
import { DisplayEventComponent } from './component/display-event/display-event.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { EventSaleComponent } from './component/event-sale/event-sale.component';
import { PhonePipe } from './_helper/phone.pipe';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddEventComponent,
    DisplayEventComponent,
    HeaderComponent,
    ShowUsersComponent,
    HomeComponent,
    RegisterComponent,
    EventDetailsComponent,
    OrderHistoryComponent,
    EventSaleComponent,
    PurchasePipe,
    PhonePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    UserService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
