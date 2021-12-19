import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Order,
  OrderService,
  OrderStatus,
} from 'src/app/shared/services/orders.service';

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

  close: boolean = false;
  gradeClose: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    let href = location.pathname;
    this.path = href.split('/')[3];
    this.id = +href.split('/')[2];

    this.driverUpdate = new FormGroup({
      waiting_time: new FormControl('', [Validators.required]),
      order_status: new FormControl(null, [Validators.required]),
    });

    this.gradeOrder = new FormGroup({
      driver_grade: new FormControl(null, [Validators.required]),
      driver_comment: new FormControl('', [Validators.required]),
      order_status: new FormControl(null, [Validators.required]),
    });

    this.getOrder(this.id);
    this.getOrderStatuses();
  }

  submit() {
    console.log(this.driverUpdate.value);
   if (this.driverUpdate.valid) {
      const formData = { ...this.driverUpdate.value };
      formData.order_status = +formData.order_status;
      console.log(formData);
      this.takeOrder(formData);
    }
  }

  takeOrder(data) {
    this.orderService.takeOrderDriver(this.id, data).subscribe(
      () => {
        console.log('success');
        this.close = true;
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
        if (this.path == 'take') {
          this.orderStatuses = res;
          if (!this.order.waiting_time) {
            this.orderStatuses = this.orderStatuses.filter(
              (status) => status.status_name == 'executing'
            );
          }
        }
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
        console.log('ORDER', this.order);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  grade() {
    console.log(this.gradeOrder.value);
   /* if (this.gradeOrder.valid) {
      const formData = { ...this.gradeOrder.value };
      console.log(formData);
      this.orderService.gradeOrderDriver(this.id, formData).subscribe(
        () => {
          console.log('success');
          this.gradeClose = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }*/
  }
}
