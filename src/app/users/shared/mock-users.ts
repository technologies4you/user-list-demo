import { User } from './user.model';

export const MOCK_USERS: User[] = [...createMockUsers()];

function createMockUsers(): User[] {
  const id = createRandomId();
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  const email = firstName
    .concat('.')
    .concat(lastName)
    .concat('@domain.testing');
  const phone = Math.floor(1000 + Math.random() * 9000)
    .toString()
    .concat('-')
    .concat(Math.floor(10000 + Math.random() * 90000).toString())
    .concat('-')
    .concat(Math.floor(1000 + Math.random() * 9000).toString());

  const users: User[] = [];

  for (let index = 0; index < 50; index++) {
    users.push({ id, firstName, lastName, email, phone });
  }

  return users;
}

const now = new Date();
const date = now.getDate();

function createRandomId(): string {
  return (date + now.getTime()).toString();
}

const firstNames = [
  'Adam',
  'Betsy',
  'Cara',
  'Doug',
  'Eric',
  'Felicia',
  'Gary',
  'Heather',
  'Izzy',
  'James',
  'Kim',
  'Larry',
  'Mike',
  'Nancy',
  'Ollie',
  'Paul',
  'Quincy',
  'Robin',
  'Sam',
  'Timothy',
];

function getRandomFirstName(): string {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

const lastNames = [
  'Anderson',
  'Brown',
  'Clark',
  'Davis',
  'Garcia',
  'Hall',
  'Jones',
  'Lee',
  'Miller',
  'Newton',
  'Perez',
  'Robinson',
  'Smith',
  'Taylor',
];

function getRandomLastName(): string {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}
