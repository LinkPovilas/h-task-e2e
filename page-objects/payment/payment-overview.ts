import { Page } from '@playwright/test';
import { PageObject } from 'page-objects/page-object';
import { CartEstimateDetailsForm } from './cart-estimate-details-form';
import { CardPaymentForm } from './card-payment-form';

export class PaymentOverview extends PageObject {
  constructor(
    page: Page,
    readonly cartEstimateDetailsForm: CartEstimateDetailsForm,
    readonly cardPaymentForm: CardPaymentForm
  ) {
    super(page);
  }

  get submitSecurePaymentButton() {
    return this.page.getByRole('button', { name: 'Submit secure payment' });
  }

  async clickSubmitSecurePayment() {
    await this.submitSecurePaymentButton.click();
  }
}
