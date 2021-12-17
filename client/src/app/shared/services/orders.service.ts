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
}

export interface OrdersResponse {
  count: number;
  orders: Order[];
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
}
