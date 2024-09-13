import { PageObject } from 'page-objects/page-object';

export interface UserCredentials {
  email: string;
  password: string;
}

export class CreateAccountForm extends PageObject {
  get header() {
    return this.page.getByRole('heading', { name: 'Create your account' });
  }

  get logInLink() {
    return this.page.getByRole('link', { name: 'Log in' });
  }

  get emailAddressField() {
    return this.page.locator('#create-account input[type="text"]');
  }

  get passwordField() {
    return this.page.locator('#create-account input[type="password"]');
  }

  async clickLogInLink() {
    await this.logInLink.click();
  }

  async enterEmailAddress(emailAddress: string) {
    await this.emailAddressField.fill(emailAddress);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async enterCredentials({ email, password }: UserCredentials) {
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
  }
}
