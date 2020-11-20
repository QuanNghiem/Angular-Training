import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { AppComponent } from './app.component';

import { PurchasePipe } from './_helper/purchase.pipe';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { ErrorInterceptor } from './_helper/error.interceptor';

import { UserService } from './_service/user.service';
import { EventService } from './_service/event.service';

import { DeleteDashboardComponent } from './component/DeleteComponents/delete-dashboard/delete-dashboard.component';
import { AddEventComponent } from './component/EventComponents/add-event/add-event.component';
import { DisplayEventComponent } from './component/EventComponents/display-event/display-event.component';
import { EventDetailsComponent } from './component/EventComponents/event-details/event-details.component';
import { EventSaleComponent } from './component/EventComponents/event-sale/event-sale.component';
import { HeaderComponent } from './component/SharedComponents/header/header.component';
import { HomeComponent } from './component/SharedComponents/home/home.component';
import { LoginComponent } from './component/UserComponents/login/login.component';
import { OrderHistoryComponent } from './component/UserComponents/order-history/order-history.component';
import { RegisterComponent } from './component/UserComponents/register/register.component';
import { ShowUsersComponent } from './component/UserComponents/show-users/show-users.component';
import { DeleteUsersComponent } from './component/DeleteComponents/delete-users/delete-users.component';
import { DeleteEventsComponent } from './component/DeleteComponents/delete-events/delete-events.component';

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
    DeleteDashboardComponent,
    DeleteUsersComponent,
    DeleteEventsComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DialogModule,
    ButtonModule,
    TabViewModule,
    BrowserAnimationsModule,
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
