import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { RequestService } from './shared/services/request.service';
import { CreateOrderComponent } from './components/orders-page/create-order/create-order.component';
import { OrderComponent } from './components/orders-page/order/order.component';
import { OrdersAdminPageComponent } from './components/orders-admin-page/orders-admin-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { UserComponent } from './components/users-page/user/user.component';
import { CarsComponent } from './components/cars/cars.component';
import { CreateCarComponent } from './components/cars/create-car/create-car.component';
import { UpdateOrderDispatcherComponent } from './components/orders-page/update-order-dispatcher/update-order-dispatcher.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    OrdersPageComponent,
    LoginPageComponent,
    OrderComponent,
    CreateOrderComponent,
    OrdersAdminPageComponent,
    UsersPageComponent,
    UserComponent,
    CarsComponent,
    CreateCarComponent,
    UpdateOrderDispatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthService, AuthGuard, RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
