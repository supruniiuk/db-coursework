import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-update-order-dispatcher',
  templateUrl: './update-order-dispatcher.component.html'
})
export class UpdateOrderDispatcherComponent implements OnInit {
  order: Order;
  payment: number;
  role: string = '';

  close: boolean = false;
  path: string = '';

  constructor(
    public authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getDecodedAccessToken().role;
    let href = location.pathname;
    let id = href.split('/')[2];
    this.path = href.split('/')[3];
    this.getOrder(id);
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

  setPayment(event) {
    this.payment = event.target.value;
  }

  approveOrder() {
    let update = {
      payment: (+this.payment).toFixed(2),
      approved: true,
    };
    this.orderService
      .updateOrderByDispatcher(this.order.order_id, update)
      .subscribe(
        (res) => {
          this.close = true;
        },
        (err) => {
          console.log(err);
        }
      );
    location.reload()
  }
}
