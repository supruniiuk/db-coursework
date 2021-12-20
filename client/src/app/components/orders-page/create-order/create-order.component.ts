import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService, CarType } from 'src/app/shared/services/car.service';
import { Order, OrderService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {
  newOrder: FormGroup;
  carTypes: CarType[];
  constructor(
    private carService: CarService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.newOrder = new FormGroup({
      origin_address: new FormControl('', [Validators.required]),
      destination_address: new FormControl('', [Validators.required]),
      number_of_people: new FormControl(null, [Validators.required]),
      empty_trunk: new FormControl(false),
      animals: new FormControl(false),
      terminal: new FormControl(false),
      air_condition: new FormControl(false),
      car_type_id: new FormControl(null, [Validators.required]),
    });

    this.getCarTypes();
  }

  submit() {
    if (this.newOrder.valid) {
      const formData = { ...this.newOrder.value };
      console.log(formData);
      this.createOrder(formData);
    }
  }

  getCarTypes() {
    this.carService.getAllCarTypes().subscribe(
      (res) => {
        this.carTypes = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createOrder(order) {
    this.orderService.createOrder(order).subscribe(
      () => {
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
    this.newOrder.reset();
  }
}
