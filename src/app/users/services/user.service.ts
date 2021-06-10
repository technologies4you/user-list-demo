import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor() {}

  getUsers(useMockData: boolean = true): User[] {
    if (useMockData) {
      return MOCK_USERS;
    }
    return [];
  }
}
