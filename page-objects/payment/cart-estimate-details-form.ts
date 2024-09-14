import { PageObject } from 'page-objects/page-object';

export interface CustomerDetails {
  firstName?: string;
  lastName?: string;
  phoneNumberPrefixOrCountry?: string;
  phoneNumber: string;
  country?: string;
  regionOrProvince?: string;
  city?: string;
  streetAddress?: string;
  zipCode?: string;
}

export class CartEstimateDetailsForm extends PageObject {
  get phoneNumberPrefixField() {
    return this.page.locator('#phone-number-cc').getByRole('textbox');
  }

  get phoneNumberField() {
    return this.page.locator('#phone-number-input').getByRole('textbox');
  }

  get countrySelectionField() {
    return this.page.locator('#country-select').getByRole('textbox');
  }

  async selectPhoneNumberPrefixByText(input: string) {
    await this.phoneNumberPrefixField.click();
    await this.phoneNumberPrefixField.fill(input);
    await this.page.getByText(input).click();
  }

  async enterPhoneNumber(phoneNumber: string) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async selectCountryByText(input: string) {
    await this.countrySelectionField.click();
    await this.countrySelectionField.fill(input);
    await this.page.getByText(input).click();
  }

  async enterCustomerDetails({
    phoneNumberPrefixOrCountry,
    country,
    phoneNumber
  }: CustomerDetails) {
    if (phoneNumberPrefixOrCountry) {
      await this.selectPhoneNumberPrefixByText(phoneNumberPrefixOrCountry);
    }

    if (country) {
      await this.selectCountryByText(country);
    }

    await this.enterPhoneNumber(phoneNumber);
  }
}
