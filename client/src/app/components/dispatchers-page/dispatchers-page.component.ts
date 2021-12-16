import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dispatchers-page',
  templateUrl: './dispatchers-page.component.html',
  styleUrls: ['./dispatchers-page.component.css'],
})
export class DispatchersPageComponent implements OnInit {
  dispatchers: UserInfo[] = [];
  page = 1;
  pages = 0;
  count = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getDispatchers(this.page);
  }

  getDispatchers(page) {
    this.userService.getUsers(page, 'dispatcher').subscribe(
      (res: any) => {
        this.count = res.count;
        this.pages = Math.ceil(this.count / 10);
        this.dispatchers = res.users;
        console.log(this.pages);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteDispatcherById(id) {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.dispatchers = this.dispatchers.filter(
          (dispatcher) => dispatcher.user_id != id
        );
        console.log('success');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
