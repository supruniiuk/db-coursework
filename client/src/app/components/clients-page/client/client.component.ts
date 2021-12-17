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

  getClientOrder(id) {}
}
