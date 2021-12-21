import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Car, CarService } from 'src/app/shared/services/car.service';
import { UserTokenInfo } from '../orders-page/orders-page.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[];
  userInfo: UserTokenInfo;

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

  deleteCar(id) {}
}
