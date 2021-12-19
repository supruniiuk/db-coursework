import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarService } from 'src/app/shared/services/car.service';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

export interface UserTokenInfo {
  id: number;
  role: string;
  email: string;
  exp: number;
  iat: number;
}

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  orders: Order[];
  userInfo: UserTokenInfo;

  page = 1;
  pages = 0;
  count = 0;
  role: string = '';

  carNum: number = 0;
  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getDecodedAccessToken();
    this.role = this.userInfo.role;
    this.getOrders(this.page);

    if (this.role === 'driver') {
      this.getCarsDriver();
    }
  }

  getOrders(page) {
    this.orderService
      .getOrders(
        `?userId=${this.userInfo.id}&userRole=${this.userInfo.role}&page=${page}`
      )
      .subscribe(
        (res) => {
          this.orders = res.orders;
          this.count = res.count;
          this.pages = Math.ceil(this.count / 10);
          console.log('success', this.orders);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCarsDriver() {
    this.carService.getCars(`?userId=${this.userInfo.id}`).subscribe(
      (res: any) => {
        this.carNum = res.count;
        console.log(this.carNum);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
