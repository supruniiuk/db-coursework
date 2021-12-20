import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-update-order-client',
  templateUrl: './update-order-client.component.html',
  styleUrls: ['./update-order-client.component.css'],
})
export class UpdateOrderClientComponent implements OnInit {
  gradeOrder: FormGroup;
  path: string;
  id: number;
  order: Order;

  gradeClose: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    let href = location.pathname;
    this.path = href.split('/')[3];
    this.id = +href.split('/')[2];

    this.gradeOrder = new FormGroup({
      client_grade: new FormControl(null, [Validators.required]),
      client_comment: new FormControl('', [Validators.required]),
    });

    this.getOrder(this.id);
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

      this.orderService.gradeOrderClient(this.id, formData).subscribe(
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
