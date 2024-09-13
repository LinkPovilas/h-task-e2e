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

export interface CardDetails {
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

enum CardFrameIndex {
  CARD_NUMBER,
  CARD_EXPIRATION_DATE,
  CARD_CVC
}

export class PaymentOverviewForm extends PageObject {
  private readonly cardFrameLocator = this.page.frameLocator(
    '.processout-field-cc-iframe'
  );

  get phoneNumberField() {
    return this.page.locator('#phone-number-input').getByRole('textbox');
  }

  get nameOnCardField() {
    return this.page.getByPlaceholder('Name on card');
  }

  get cardNumberField() {
    return this.cardFrameLocator
      .first()
      .getByLabel('Credit or debit card number');
  }

  get cardExpirationDateField() {
    return this.cardFrameLocator
      .nth(CardFrameIndex.CARD_EXPIRATION_DATE)
      .getByLabel('Credit or debit card expiration date');
  }

  get cardVerificationCodeField() {
    return this.cardFrameLocator
      .nth(CardFrameIndex.CARD_CVC)
      .getByLabel('Credit or debit card CVC');
  }

  get submitSecurePaymentButton() {
    return this.page.getByRole('button', { name: 'Submit secure payment' });
  }

  async enterPhoneNumber(phoneNumber: string) {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async enterNameOnCard(name: string) {
    await this.nameOnCardField.fill(name);
  }

  async enterCardNumber(cardNumber: string) {
    await this.cardNumberField.fill(cardNumber);
  }

  async enterCardExpirationDate(expirationDate: string) {
    await this.cardExpirationDateField.pressSequentially(expirationDate);
  }

  async enterCardVerificationCode(cvc: string) {
    await this.cardVerificationCodeField.fill(cvc);
  }

  async clickSubmitSecurePayment() {
    await this.submitSecurePaymentButton.click();
  }

  async enterCustomerDetails({ phoneNumber }: CustomerDetails) {
    await this.enterPhoneNumber(phoneNumber);
  }

  async enterCardDetails({
    name,
    cardNumber,
    expirationDate,
    cvc
  }: CardDetails) {
    await this.enterNameOnCard(name);
    await this.enterCardNumber(cardNumber);
    await this.enterCardExpirationDate(expirationDate);
    await this.enterCardVerificationCode(cvc);
  }
}
