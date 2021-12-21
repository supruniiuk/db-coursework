import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';

export interface CarType {
  type_id: number;
  type_name: string;
  description: string;
}

export interface CarResponse {
  count: number;
  cars: Car[];
}

export interface Car {
  car_id: number;
  driver_id: number;
  license_number: string;
  model: string;
  color: string;
  type_id: number;
  air_conditioning: boolean;
  terminal: boolean;
  empty_trunk: boolean;
  animals: boolean;
  added_date: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  route = 'cars/';
  constructor(public requestService: RequestService) {}

  getCars(params = ''): Observable<CarResponse> {
    return this.requestService.get<CarResponse>(this.route + params);
  }

  getCarById(id): Observable<Car> {
    return this.requestService.get<Car>(this.route + id);
  }

  getAllCarTypes(): Observable<CarType[]> {
    return this.requestService.get<CarType[]>(this.route + `types`);
  }

  getCarTypeById(id): Observable<CarType> {
    return this.requestService.get<CarType>(this.route + `types/` + String(id));
  }

  createCar(car): Observable<any> {
    return this.requestService.create<any>(this.route, car);
  }
}
