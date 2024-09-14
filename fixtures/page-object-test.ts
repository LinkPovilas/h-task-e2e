import { test as base } from '@playwright/test';
import { CreateAccountForm } from 'page-objects/authentication/create-account-form';
import { CookieConsentBanner } from 'page-objects/consent/cookie-consent-banner';
import { PaymentOverview } from 'page-objects/payment/payment-overview';
import { WebHostingPriceCard } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingPeriodCard } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import { BackdropLoader } from 'page-objects/loading/backdrop-loader';
import { CartEstimateDetailsForm } from 'page-objects/payment/cart-estimate-details-form';
import { CardPaymentForm } from 'page-objects/payment/card-payment-form';
import { PaymentMethodList } from 'page-objects/payment/payment-method-list';

interface PageObjectFixture {
  cookieConsentBanner: CookieConsentBanner;
  webHostingPriceCard: WebHostingPriceCard;
  webHostingPeriodCard: WebHostingPeriodCard;
  createAccountForm: CreateAccountForm;
  paymentMethodList: PaymentMethodList;
  cartEstimateDetailsForm: CartEstimateDetailsForm;
  cardPaymentForm: CardPaymentForm;
  paymentOverview: PaymentOverview;
  backdropLoader: BackdropLoader;
}

export const test = base.extend<PageObjectFixture>({
  cookieConsentBanner: async ({ page }, use) => {
    await use(new CookieConsentBanner(page));
  },
  webHostingPriceCard: async ({ page }, use) => {
    await use(new WebHostingPriceCard(page));
  },
  webHostingPeriodCard: async ({ page }, use) => {
    await use(new WebHostingPeriodCard(page));
  },
  createAccountForm: async ({ page }, use) => {
    await use(new CreateAccountForm(page));
  },
  paymentMethodList: async ({ page }, use) => {
    await use(new PaymentMethodList(page));
  },
  cartEstimateDetailsForm: async ({ page }, use) => {
    await use(new CartEstimateDetailsForm(page));
  },
  cardPaymentForm: async ({ page }, use) => {
    await use(new CardPaymentForm(page));
  },
  paymentOverview: async (
    { page, cartEstimateDetailsForm, cardPaymentForm },
    use
  ) => {
    await use(
      new PaymentOverview(page, cartEstimateDetailsForm, cardPaymentForm)
    );
  },
  backdropLoader: async ({ page }, use) => {
    await use(new BackdropLoader(page));
  }
});
