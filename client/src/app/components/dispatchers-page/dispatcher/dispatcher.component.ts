import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css'],
})
export class DispatcherComponent implements OnInit {
  dispatcher: UserInfo;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let href = location.pathname;
    let id = href.split('/')[2];
    this.getDispatcher(id);
    this.getDispatcherOrder(id);
  }

  getDispatcher(id) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.dispatcher = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getDispatcherOrder(id) {}
}
