import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {
  driver: UserInfo;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let href = location.pathname;
    let id = href.split('/')[2];
    this.getDriver(id);
    this.getDriverOrder(id);
  }

  getDriver(id) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.driver = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDriverOrder(id) {}
}
