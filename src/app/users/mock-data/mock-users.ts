import { User } from '../shared/models/user.model';
import { FIRST_NAMES } from './first-names';
import { LAST_NAMES } from './last-names';

export const MOCK_USERS: User[] = [...createMockUsers()];

function createMockUsers(): User[] {
  const users: User[] = [];

  for (let index = 0; index < 50; index++) {
    const id = index + 1;
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const email = firstName
      .concat('.')
      .concat(lastName)
      .concat('@domain.testing');
    const area = Math.floor(100 + Math.random() * 900).toString();
    const exchange = Math.floor(100 + Math.random() * 900).toString();
    const subscriber = Math.floor(1000 + Math.random() * 9000).toString();
    users.push({
      id,
      firstName,
      lastName,
      email,
      telephone: { area, exchange, subscriber },
    });
  }

  return users;
}

function getRandomFirstName(): string {
  return FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
}

function getRandomLastName(): string {
  return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
}
