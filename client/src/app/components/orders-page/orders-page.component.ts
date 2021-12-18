import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getDecodedAccessToken();
    this.role = this.userInfo.role;
    this.getOrders(this.page);

    console.log(this.userInfo.email);
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
}
