import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';

export interface UserInfo {
  user_id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  created_on: string;
}

export interface Role {
  role_id: number;
  role_name: string;
}

export interface UsersResponse {
  count: number;
  users: UserInfo[];
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  route = 'users/';
  constructor(public requestService: RequestService) {}

  getUsers(page, role): Observable<UsersResponse[]> {
    return this.requestService.get<UsersResponse[]>(
      this.route + `role/${role}` + `?page=${page}`
    );
  }

  getUserById(id: number): Observable<UsersResponse> {
    return this.requestService.get<UsersResponse>(this.route + String(id));
  }

  deleteUserById(id: number): Observable<null> {
    return this.requestService.delete<null>(this.route + String(id));
  }

  getUserRoles(id): Observable<Role[]> {
    return this.requestService.get<Role[]>(this.route + id + `/roles`);
  }

  setUserRole(id, role): Observable<any> {
    return this.requestService.create<any>(this.route + `role`, {
      user_id: id,
      rolename: role,
    });
  }

  deleteUserRole(id, role): Observable<any> {
    return this.requestService.delete<any>(
      this.route + `role?user_id=${id}&rolename=${role}`
    );
  }
}
