import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PublicPageComponent } from './Public/public-page/public-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SecureLayoutComponent } from './Secure/secure-layout/secure-layout.component';
import { DashboardComponent } from './Secure/dashboard/dashboard.component';
import { StatisticsComponent } from './Secure/statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrdersComponent } from './Secure/orders/orders.component';
import { OrdersHistoryComponent } from './Secure/orders-history/orders-history.component';
import { ProductsComponent } from './Secure/products/products.component';
import { UsersComponent } from './Secure/users/users.component';
import { ProfileComponent } from './Secure/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './Secure/users/add-user/add-user.component';
import { AddProductComponent } from './Secure/products/add-product/add-product.component';
import { EditProductComponent } from './Secure/products/edit-product/edit-product.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { CurrencyComponent } from './Secure/products/currency/currency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from './Services/user.service';
import { MatTableModule,} from '@angular/material/table';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ItemsTableComponent } from './Secure/orders-history/items-table/items-table.component';
import { LastOrdersComponent } from './Secure/orders/last-orders/last-orders.component';
import {CookieService} from 'ngx-cookie-service';
import { ResetPageComponent } from './Public/reset-page/reset-page.component';
import { NotifierModule } from 'angular-notifier';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDeleteComponent } from './Secure/orders-history/confirm-delete/confirm-delete.component';
import { MatPaginatorModule } from '@angular/material/paginator';


registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    SecureLayoutComponent,
    DashboardComponent,
    StatisticsComponent,
    OrdersComponent,
    OrdersHistoryComponent,
    ProductsComponent,
    UsersComponent,
    ProfileComponent,
    AddUserComponent,
    AddProductComponent,
    EditProductComponent,
    CurrencyComponent,
    ItemsTableComponent,
    LastOrdersComponent,
    ResetPageComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    })
  ],
  exports: [MatInputModule, MatPaginatorModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' },
     UserService,
     CookieService
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
