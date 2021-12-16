import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  client: UserInfo;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let href = location.pathname;
    let id = href.split('/')[2];
    this.getClient(id);
    this.getClientOrder(id)
  }

  getClient(id) {
    this.userService.getUserById(id).subscribe(
      (res: any) => {
        this.client = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getClientOrder(id){

  }
}
