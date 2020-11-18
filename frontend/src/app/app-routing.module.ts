import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './component/add-event/add-event.component';
import { DisplayEventComponent } from './component/display-event/display-event.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { EventSaleComponent } from './component/event-sale/event-sale.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { RegisterComponent } from './component/register/register.component';
import { ShowUsersComponent } from './component/show-users/show-users.component';
import { AuthGuard } from './_helper/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'orderHistory', component: OrderHistoryComponent },
  { path: 'sales/:id', component: EventSaleComponent },
  { path: 'addEvent', component: AddEventComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'displayEvent', component: DisplayEventComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: 'manageUsers', component: ShowUsersComponent, canLoad: [AuthGuard], canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
