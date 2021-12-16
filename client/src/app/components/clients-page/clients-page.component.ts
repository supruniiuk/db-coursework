import { Component, OnInit } from '@angular/core';
import { Client, ClientsService, UsersResponse } from './clients.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css'],
})
export class ClientsPageComponent implements OnInit {
  clients: Client[] = [];
  page = 1;
  pages = 0;
  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.getClients(this.page);
  }

  getClients(page) {
    this.clientService.getClients(page).subscribe((res: any) => {
      this.pages = Math.ceil(res.count / 10);
      this.clients = res.users;
      console.log(this.pages);
    }),
      (err) => {
        console.log(err);
      };
  }
}
