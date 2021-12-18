import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarService, CarType } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent implements OnInit {
  newCar: FormGroup;
  carTypes: CarType[];
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.newCar = new FormGroup({
      license_number: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      type_id: new FormControl('', [Validators.required]),
      air_conditioning: new FormControl(false, [Validators.required]),
      terminal: new FormControl(false, [Validators.required]),
      empty_trunk: new FormControl(false, [Validators.required]),
      animals: new FormControl(false, [Validators.required]),
    });

    this.getCarTypes();
  }

  submit() {
    console.log(this.newCar.value);
   if (this.newCar.valid) {
      const formData = { ...this.newCar.value };
      console.log(formData);
      this.createCar(formData);
    }
  }

  getCarTypes() {
    this.carService.getAllCarTypes().subscribe(
      (res) => {
        this.carTypes = res;
        console.log(this.carTypes);
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createCar(car) {
    this.carService.createCar(car).subscribe(
      () => {
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
