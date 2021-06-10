import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_USERS } from '../mock-data/mock-users';
import { User } from '../shared/models/user.model';

export class UserData implements InMemoryDbService {
  users: User[] = MOCK_USERS;

  createDb() {
    const users = this.users.slice();
    return { users };
  }
}
