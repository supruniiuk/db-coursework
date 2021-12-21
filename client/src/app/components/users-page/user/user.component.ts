import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  OrderService,
  StatisticsResponse,
} from 'src/app/shared/services/orders.service';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  role: string = '';
  user: UserInfo;
  roles: FormGroup;
  statistics: StatisticsResponse;
  loginUserRole: string = '';

  userRoles;

  btnDisable: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    let pathname = location.pathname;
    this.role = pathname.split('/')[1];
    this.role = this.role.substring(0, this.role.length - 1);

    this.loginUserRole = this.authService.getDecodedAccessToken().role;
    this.roles = new FormGroup({
      client: new FormControl(false),
      driver: new FormControl(false),
      dispatcher: new FormControl(false),
    });

    let href = location.pathname;
    let id = href.split('/')[2];
    this.getUser(id);
  }

  getUser(id) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.user = res;
        this.getUserRoles(this.user.user_id);
        this.getStatistics(this.user.user_id, this.role);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStatistics(id, role) {
    this.orderService.getStatistics(`?userId=${id}&userRole=${role}`).subscribe(
      (res: any) => {
        this.statistics = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserRoles(id) {
    this.userService.getUserRoles(id).subscribe(
      (res: any) => {
        this.userRoles = res;
        this.roles = new FormGroup({
          client: new FormControl(res.client),
          driver: new FormControl(res.driver),
          dispatcher: new FormControl(res.dispatcher),
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNewRoles() {
    let pickedRoles = this.roles.value;
    let newRoles = {};
    for (let role in pickedRoles) {
      if (this.userRoles[role] != pickedRoles[role]) {
        newRoles[role] = pickedRoles[role];
      }
    }

    return newRoles;
  }

  checkUpdate() {
    let newRoles = this.getNewRoles();

    if (Object.keys(newRoles).length === 0) {
      this.btnDisable = true;
    } else {
      this.btnDisable = false;
    }
  }

  submit() {
    let newRoles = this.getNewRoles();

    for (let role in newRoles) {
      if (newRoles[role]) {
        this.userService.setUserRole(this.user.user_id, role).subscribe(
          () => {
            this.userRoles[role] = newRoles[role];
            this.checkUpdate();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.userService.deleteUserRole(this.user.user_id, role).subscribe(
          () => {
            this.userRoles[role] = newRoles[role];
            this.checkUpdate();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  getUserOrder(id) {}
}
