import { faker } from '@faker-js/faker';

export const randomFakeUser = () => ({
  email: faker.internet.email({ provider: 'hmail.dev' }),
  password: faker.internet.password({ length: 8 }),
  phoneNumber: '0000000'
});

// 11 + current year in YY format + 1 year
const cardExpirationDate = () => `11${(new Date().getFullYear() % 100) + 1}`;

export const testCardData = () => ({
  name: faker.person.fullName(),
  cardNumber: '4242424242424242',
  expirationDate: cardExpirationDate(),
  cvc: faker.string.numeric({ length: 3, allowLeadingZeros: true })
});
