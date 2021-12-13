import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';

export interface Client {
  user_id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  created_on: string;
}

export interface UsersResponse{
    count: number;
    users: Client[];
}
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  route = 'users/role/client';
  constructor(public requestService: RequestService) {}

  getClients(page): Observable<UsersResponse[]> {
    return this.requestService.get<UsersResponse[]>(this.route + `?page=${page}`);
  }
}
