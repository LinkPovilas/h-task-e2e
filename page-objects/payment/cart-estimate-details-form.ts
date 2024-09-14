import { PageObject } from 'page-objects/page-object';

export interface CustomerDetails {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  regionOrProvince?: string;
  city?: string;
  streetAddress?: string;
  zipCode?: string;
}

export class CartEstimateDetailsForm extends PageObject {
  get phoneNumberField() {
    return this.page.locator('#phone-number-input').getByRole('textbox');
  }

  async enterPhoneNumber(phoneNumber: string) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async enterCustomerDetails({ phoneNumber }: CustomerDetails) {
    await this.enterPhoneNumber(phoneNumber);
  }
}
