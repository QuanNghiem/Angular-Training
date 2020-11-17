import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AddEventComponent } from './component/add-event/add-event.component';
import { DisplayEventComponent } from './component/display-event/display-event.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './_helper/error.interceptor';
import { UserService } from './_service/user.service';
import { EventService } from './_service/event.service';
import { AuthInterceptor } from './_helper/auth.interceptor';
import { HeaderComponent } from './component/header/header.component';
import { ShowUsersComponent } from './component/show-users/show-users.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'addEvent', component: AddEventComponent, canActivate: [AuthGuard] },
//   { path: 'displayEvent', component: DisplayEventComponent },
//   { path: '**', component: LoginComponent }
// ];

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
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
