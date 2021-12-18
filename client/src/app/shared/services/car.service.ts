import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';

export interface CarType {
  type_id: number;
  type_name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  route = 'cars/';
  constructor(public requestService: RequestService) {}

  /*getUsers(page, role): Observable<UsersResponse[]> {
    return this.requestService.get<UsersResponse[]>(
      this.route + `role/${role}` + `?page=${page}`
    );
  }
*/
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
