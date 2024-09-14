import { PageObject } from 'page-objects/page-object';

export enum PaymentMethod {
  CREDIT_CARD,
  PAYPAL,
  GOOGLE_PAY,
  ALIPAY,
  COINGATE
}

export class PaymentMethodList extends PageObject {
  get creditCardMethod() {
    return this.page.getByRole('heading', { name: 'Credit Card' });
  }

  get paypalMethod() {
    return this.page.getByRole('heading', { name: 'PayPal' });
  }

  async clickCreditCardMethod() {
    await this.creditCardMethod.click();
  }

  async clickPaypalMethod() {
    await this.paypalMethod.click();
  }

  async selectPaymentMethod(paymentMethod?: PaymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.PAYPAL:
        return this.clickPaypalMethod();
      case PaymentMethod.CREDIT_CARD:
      default:
        return this.clickCreditCardMethod();
    }
  }
}
