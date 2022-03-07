import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './Guards/admin.guard';
import { UserGuard } from './Guards/user.guard';
import { PublicPageComponent } from './Public/public-page/public-page.component';
import { ResetPageComponent } from './Public/reset-page/reset-page.component';
import { DashboardComponent } from './Secure/dashboard/dashboard.component';
import { OrdersHistoryComponent } from './Secure/orders-history/orders-history.component';
import { OrdersComponent } from './Secure/orders/orders.component';
import { ProductsComponent } from './Secure/products/products.component';
import { ProfileComponent } from './Secure/profile/profile.component';
import { SecureLayoutComponent } from './Secure/secure-layout/secure-layout.component';
import { StatisticsComponent } from './Secure/statistics/statistics.component';
import { UsersComponent } from './Secure/users/users.component';

const routes: Routes = [
  { path: 'login', component: PublicPageComponent },
  { path: 'reset/:token', component: ResetPageComponent },
  { path: '', component: SecureLayoutComponent, 
    children: [
    { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [UserGuard]},
    { path: 'orders', component: OrdersComponent, canActivate: [UserGuard] },
    { path: 'order-history', component: OrdersHistoryComponent, canActivate: [UserGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [UserGuard] },
    { path: 'statistics', component: StatisticsComponent, canActivate: [UserGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [UserGuard] }
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
