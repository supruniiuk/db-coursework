import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Car, CarService } from 'src/app/shared/services/car.service';
import {
  Order,
  OrderService,
  OrderStatus,
} from 'src/app/shared/services/orders.service';
import { UserInfo } from 'src/app/shared/services/user.service';
import { UserTokenInfo } from '../orders-page.component';

@Component({
  selector: 'app-update-order-driver',
  templateUrl: './update-order-driver.component.html',
  styleUrls: ['./update-order-driver.component.css'],
})
export class UpdateOrderDriverComponent implements OnInit {
  driverUpdate: FormGroup;
  gradeOrder: FormGroup;
  orderStatuses: OrderStatus[] = [];
  path: string;
  id: number;
  order: Order;
  cars: Car[];

  close: boolean = false;
  gradeClose: boolean = false;
  userInfo: UserTokenInfo;
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    let href = location.pathname;
    this.path = href.split('/')[3];
    this.id = +href.split('/')[2];
    this.userInfo = this.authService.getDecodedAccessToken();

    this.driverUpdate = new FormGroup({
      waiting_time: new FormControl('', [Validators.required]),
      order_status: new FormControl(null, [Validators.required]),
      car_id: new FormControl(null, [Validators.required]),
    });

    this.gradeOrder = new FormGroup({
      driver_grade: new FormControl(null, [Validators.required]),
      driver_comment: new FormControl('', [Validators.required]),
      order_status: new FormControl(null, [Validators.required]),
    });

    this.getCars();
    this.getOrder(this.id);
    this.getOrderStatuses();
  }

  submit() {
    if (this.driverUpdate.valid) {
      const formData = { ...this.driverUpdate.value };
      formData.order_status = +formData.order_status;
      formData.car_id = +formData.car_id;
      this.takeOrder(formData);
    }
  }

  takeOrder(data) {
    this.orderService.takeOrderDriver(this.id, data).subscribe(
      () => {
        this.close = true;
        this.getOrder(this.id);
      },
      (err) => {
        console.log(err);
      }
    );
    this.driverUpdate.reset();
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

  getCars() {
    this.carService.getCars(`?userId=${this.userInfo.id}`).subscribe(
      (res: any) => {
        this.cars = res.cars;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOrder(id) {
    this.orderService.getOrderById(id).subscribe(
      (res) => {
        this.order = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  grade() {
    if (this.gradeOrder.valid) {
      const formData = { ...this.gradeOrder.value };
      formData.grade = +formData.grade;
      this.orderService.gradeOrderDriver(this.id, formData).subscribe(
        () => {
          this.gradeClose = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
