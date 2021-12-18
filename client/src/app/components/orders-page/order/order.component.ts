import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CarService, CarType } from 'src/app/shared/services/car.service';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order: Order;
  car_type: CarType;
  role: string = '';

  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    let href = location.pathname;
    let id = href.split('/')[2];
    this.role = this.authService.getDecodedAccessToken().role;

    this.getOrder(id);
  }

  getOrder(id) {
    this.orderService.getOrderById(id).subscribe(
      (res) => {
        this.order = res;
        this.getCarType(this.order.car_type_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCarType(id) {
    this.carService.getCarTypeById(id).subscribe(
      (res) => {
        this.car_type = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
