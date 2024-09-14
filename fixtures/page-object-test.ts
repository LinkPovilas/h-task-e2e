import { test as base } from '@playwright/test';
import { CreateAccountForm } from 'page-objects/authentication/create-account-form';
import { CookieConsentBanner } from 'page-objects/consent/cookie-consent-banner';
import { PaymentOverviewForm } from 'page-objects/payment/payment-overview-form';
import { WebHostingPriceCard } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingPeriodCard } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import { BackdropLoader } from 'page-objects/loading/backdrop-loader';

interface PageObjectFixture {
  cookieConsentBanner: CookieConsentBanner;
  webHostingPriceCard: WebHostingPriceCard;
  webHostingPeriodCard: WebHostingPeriodCard;
  createAccountForm: CreateAccountForm;
  paymentOverviewForm: PaymentOverviewForm;
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
  paymentOverviewForm: async ({ page }, use) => {
    await use(new PaymentOverviewForm(page));
  },
  backdropLoader: async ({ page }, use) => {
    await use(new BackdropLoader(page));
  }
});
