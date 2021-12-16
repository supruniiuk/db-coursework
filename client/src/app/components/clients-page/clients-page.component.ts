import { Component, OnInit } from '@angular/core';
import { UserInfo, UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css'],
})
export class ClientsPageComponent implements OnInit {
  errorMessage
  clients: UserInfo[] = [];
  page = 1;
  pages = 0;
  count = 0;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getClients(this.page);
  }

  getClients(page) {
    this.userService.getUsers(page, 'client').subscribe(
      (res: any) => {
        this.count = res.count;
        this.pages = Math.ceil(this.count / 10);
        this.clients = res.users;
        console.log(this.pages);
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  deleteClientById(id) {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.clients = this.clients.filter((client) => client.user_id != id);
        console.log('success');
      },
      (err) => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
