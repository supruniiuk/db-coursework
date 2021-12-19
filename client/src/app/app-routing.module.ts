import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CreateCarComponent } from './components/cars/create-car/create-car.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateOrderComponent } from './components/orders-page/create-order/create-order.component';
import { OrderComponent } from './components/orders-page/order/order.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { UpdateOrderClientComponent } from './components/orders-page/update-order-client/update-order-client.component';
import { UpdateOrderDispatcherComponent } from './components/orders-page/update-order-dispatcher/update-order-dispatcher.component';
import { UpdateOrderDriverComponent } from './components/orders-page/update-order-driver/update-order-driver.component';
import { UserComponent } from './components/users-page/user/user.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: LoginPageComponent },
      {
        path: 'clients',
        component: UsersPageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin', 'dispatcher'] },
      },
      {
        path: 'clients/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin', 'dispatcher'] },
      },
      {
        path: 'drivers',
        component: UsersPageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin', 'dispatcher'] },
      },
      {
        path: 'drivers/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin', 'dispatcher'] },
      },
      {
        path: 'dispatchers',
        component: UsersPageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'dispatchers/:id',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['admin', 'dispatcher', 'client', 'driver'] },
        children: [
          {
            path: 'create',
            component: CreateOrderComponent,
            children: [],
            canActivate: [AuthGuard],
            data: { allowedRoles: ['client'] },
          },
        ],
      },
      {
        path: 'orders/:id',
        component: OrderComponent,
        children: [
          {
            path: 'approve',
            component: UpdateOrderDispatcherComponent,
            canActivate: [AuthGuard],
            data: { allowedRoles: ['dispatcher'] },
          },
          {
            path: 'take',
            component: UpdateOrderDriverComponent,
            canActivate: [AuthGuard],
            data: { allowedRoles: ['driver'] },
          },
          {
            path: 'grade',
            component: UpdateOrderClientComponent,
            canActivate: [AuthGuard],
            data: { allowedRoles: ['client'] },
          }
        ],
      },

      {
        path: 'cars',
        component: CarsComponent,
        canActivate: [AuthGuard],
        data: { allowedRoles: ['driver'] },
        children: [{ path: 'create', component: CreateCarComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
