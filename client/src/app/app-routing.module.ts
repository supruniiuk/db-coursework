import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { ClientComponent } from './components/clients-page/client/client.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';
import { DispatchersPageComponent } from './components/dispatchers-page/dispatchers-page.component';
import { DriverComponent } from './components/drivers-page/driver/driver.component';
import { DriversPageComponent } from './components/drivers-page/drivers-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';

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
        component: ClientsPageComponent,
        children: [{ path: 'clients/:id', component: ClientComponent }],
      },
      {
        path: 'drivers',
        component: DriversPageComponent,
        children: [{ path: 'drivers/:id', component: DriverComponent }],
      },
      {
        path: 'dispatchers',
        component: DispatchersPageComponent,
        children: [
          { path: 'dispatchers/:id', component: DispatchersPageComponent },
        ],
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
        children: [{ path: 'orders/:id', component: OrderComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}