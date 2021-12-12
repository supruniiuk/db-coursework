import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { DriversPageComponent } from './components/drivers-page/drivers-page.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { DispatchersPageComponent } from './components/dispatchers-page/dispatchers-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ClientComponent } from './components/clients-page/client/client.component';
import { OrderComponent } from './components/order/order.component';
import { DriverComponent } from './components/drivers-page/driver/driver.component';
import { DispatcherComponent } from './components/dispatchers-page/dispatcher/dispatcher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ClientsPageComponent,
    DriversPageComponent,
    OrdersPageComponent,
    DispatchersPageComponent,
    LoginPageComponent,
    ClientComponent,
    OrderComponent,
    DriverComponent,
    DispatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
