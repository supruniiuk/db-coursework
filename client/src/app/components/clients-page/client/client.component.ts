import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client: UserInfo;
  roles: FormGroup;

  userRoles;

  btnDisable: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.roles = new FormGroup({
      client: new FormControl(false),
      driver: new FormControl(false),
      dispatcher: new FormControl(false),
    });

    let href = location.pathname;
    let id = href.split('/')[2];
    this.getClient(id);
    this.getClientOrder(id);
  }

  getClient(id) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.client = res;
        this.getUserRoles(this.client.user_id);
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
        this.userService.setUserRole(this.client.user_id, role).subscribe(
          () => {
            console.log('SUCCESS add');
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.userService.deleteUserRole(this.client.user_id, role).subscribe(
          () => {
            console.log('SUCCESS delete');
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    console.log(newRoles);
  }

  getClientOrder(id) {}
}
