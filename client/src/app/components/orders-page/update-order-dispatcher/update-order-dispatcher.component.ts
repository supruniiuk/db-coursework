import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-update-order-dispatcher',
  templateUrl: './update-order-dispatcher.component.html',
  styleUrls: ['./update-order-dispatcher.component.css'],
})
export class UpdateOrderDispatcherComponent implements OnInit {
  order: Order;
  payment: number;
  role: string = '';

  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getDecodedAccessToken().role;

    let href = location.pathname;
    let id = href.split('/')[2];
    this.getOrder(id);
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

  setPayment(event) {
    this.payment = event.target.value;
  }

  approveOrder() {
    let update = {
      payment: +this.payment,
      approved: true,
    };
    this.orderService
      .updateOrderByDispatcher(this.order.order_id, update)
      .subscribe(
        (res) => {
          console.log('success');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
