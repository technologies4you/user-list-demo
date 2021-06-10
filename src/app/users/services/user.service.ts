import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = MOCK_USERS;

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }
}
