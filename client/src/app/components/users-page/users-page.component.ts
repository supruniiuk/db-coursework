import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  role: string = '';

  errorMessage;
  users: UserInfo[] = [];
  page = 1;
  pages = 0;
  count = 0;
  deleteUser: UserInfo = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let pathname = location.pathname;
    this.role = pathname.split('/')[1];
    this.role = this.role.substring(0, this.role.length - 1);
    this.getUsers(this.page, this.role);
  }

  getUsers(page, role) {
    this.userService.getUsers(page, role).subscribe(
      (res: any) => {
        this.count = res.count;
        this.pages = Math.ceil(this.count / 10);
        this.users = res.users;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  deleteUserById(id) {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.users = this.users.filter((user) => user.user_id != id);
        this.count -= 1;
        console.log('success');
      },
      (err) => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
