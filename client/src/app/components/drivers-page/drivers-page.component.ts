import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-drivers-page',
  templateUrl: './drivers-page.component.html',
  styleUrls: ['./drivers-page.component.css'],
})
export class DriversPageComponent implements OnInit {
  drivers: UserInfo[] = [];
  page = 1;
  pages = 0;
  count = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getDrivers(this.page);
  }

  getDrivers(page) {
    this.userService.getUsers(page, 'driver').subscribe(
      (res: any) => {
        this.count = res.count;
        this.pages = Math.ceil(this.count / 10);
        this.drivers = res.users;
        console.log(this.pages);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteDriverById(id) {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.drivers = this.drivers.filter((driver) => driver.user_id != id);

        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
