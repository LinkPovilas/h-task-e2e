import { test as base } from '@playwright/test';
import { CreateAccountForm } from 'page-objects/authentication/create-account-form';
import { CookieConsent } from 'page-objects/consent/cookie-consent';
import { PaymentOverviewForm } from 'page-objects/cart/payment-overview-form';
import { WebHostingPriceCard } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingPeriodCard } from 'page-objects/web-hosting-plan/web-hosting-period-card';

interface PageObjectFixture {
  cookieConsent: CookieConsent;
  webHostingPriceCard: WebHostingPriceCard;
  webHostingPeriodCard: WebHostingPeriodCard;
  createAccountForm: CreateAccountForm;
  paymentOverviewForm: PaymentOverviewForm;
}

export const test = base.extend<PageObjectFixture>({
  cookieConsent: async ({ page }, use) => {
    await use(new CookieConsent(page));
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
  }
});
