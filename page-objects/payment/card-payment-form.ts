import { PageObject } from 'page-objects/page-object';

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

export class CardPaymentForm extends PageObject {
  private readonly cardFrameLocator = this.page.frameLocator(
    '.processout-field-cc-iframe'
  );

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
