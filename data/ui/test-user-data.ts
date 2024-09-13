import { faker } from '@faker-js/faker';

export const randomFakeUser = () => ({
  email: faker.internet.email({ provider: 'h.dev' }),
  password: faker.internet.password({ length: 8 }),
  phoneNumber: '0000000'
});

// MMYY + 1 year
const cardExpirationDate = () => `11${(new Date().getFullYear() % 100) + 1}`;

export const testCardData = () => ({
  name: 'Test User',
  cardNumber: '4242424242424242',
  expirationDate: cardExpirationDate(),
  cvc: '010'
});
