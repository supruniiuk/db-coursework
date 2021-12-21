import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Car, CarService, CarType } from 'src/app/shared/services/car.service';
import { UserTokenInfo } from '../orders-page/orders-page.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[];
  userInfo: UserTokenInfo;
  carTypes: CarType[];
  page = 1;
  pages = 0;
  count = 0;
  deleteCarObj: Car = null;

  constructor(
    public authService: AuthService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getDecodedAccessToken();
    this.getCarTypes();
    this.getCars(this.page);
  }

  getCars(page) {
    this.carService
      .getCars(`?userId=${this.userInfo.id}&page=${page}`)
      .subscribe(
        (res: any) => {
          this.cars = res.cars;
          this.count = res.count;
          this.pages = Math.ceil(this.count / 10);
        },
        (err) => {
          console.log(err);
        }
      );
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

  getType(id) {
    let type = this.carTypes.filter((type) => type.type_id === id);
    return type[0].type_name;
  }

  deleteCar(id) {
    this.carService.deleteCarById(id).subscribe(
      () => {
        console.log('Successfully deleted!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
