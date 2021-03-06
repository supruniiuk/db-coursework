import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Car, CarService, CarType } from 'src/app/shared/services/car.service';
import {
  Order,
  OrderService,
  OrderStatus,
} from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order: Order;
  car_type: CarType;
  role: string = '';
  reject = false;
  orderStatuses: OrderStatus[] = [];
  car: Car;

  finish: boolean = false;
  path: string;
  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getOrderStatuses();

    let href = location.pathname;
    let id = href.split('/')[2];
    this.path = href.split('/')[3];
    this.role = this.authService.getDecodedAccessToken().role;

    this.getOrder(id);
  }

  getOrder(id) {
    this.orderService.getOrderById(id).subscribe(
      (res) => {
        this.order = res;
        this.getCarType(this.order.car_type_id);
        this.getCar(this.order.car_id);
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

  getCar(id) {
    this.carService.getCarById(id).subscribe(
      (res) => {
        this.car = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStatusName() {
    return this.orderStatuses.find(
      (status) => status.status_id == this.order.order_status_id
    ).status_name;
  }

  getOrderStatuses() {
    this.orderService.getOrderStatuses().subscribe(
      (res) => {
        this.orderStatuses = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  rejectOrder() {
    let update = {
      payment: 0,
      approved: false,
    };
    this.orderService
      .updateOrderByDispatcher(this.order.order_id, update)
      .subscribe(
        (res) => {
          this.reject = true;
          this.order.approved = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
