import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';

export interface Order {
  order_id: number;
  client_id: number;
  origin_address: string;
  destination_address: string;
  number_of_people: number;
  empty_trunk: boolean;
  animals: boolean;
  terminal: boolean;
  air_condition: boolean;
  car_type_id: number;
  creation_date: string;
  client_comment: string;
  client_grade: number;
  driver_id: number;
  waiting_time: string;
  driver_comment: string;
  driver_grade: number;
  approved: boolean;
  order_status_id: number;
  total_payment: number;

  type_name: string;
  client_name?: string;
  client_surname?: string;
}

export interface OrdersResponse {
  count: number;
  orders: Order[];
}

export interface OrderStatus {
  status_id: number;
  status_name: string;
}
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  route = 'orders/';
  constructor(public requestService: RequestService) {}

  createOrder(order: Order): Observable<any> {
    return this.requestService.create<any>(this.route, order);
  }

  getOrders(params): Observable<OrdersResponse> {
    return this.requestService.get<OrdersResponse>(this.route + params);
  }

  getOrderById(id: number): Observable<Order> {
    return this.requestService.get<Order>(this.route + String(id));
  }

  updateOrderByDispatcher(id, body): Observable<any> {
    return this.requestService.update<any>(
      this.route + 'dispatcher/' + String(id),
      body
    );
  }

  takeOrderDriver(id, body): Observable<any> {
    return this.requestService.update<any>(
      this.route + 'driver/' + String(id),
      body
    );
  }

  gradeOrderDriver(id, body): Observable<any> {
    return this.requestService.update<any>(
      this.route + 'grade/driver/' + String(id),
      body
    );
  }

  getOrderStatuses(): Observable<OrderStatus[]> {
    return this.requestService.get<OrderStatus[]>(this.route + 'statuses');
  }
}
