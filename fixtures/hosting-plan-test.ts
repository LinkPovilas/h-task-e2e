import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { test as base } from './page-object-test';
import { expect } from '@playwright/test';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import {
  CardDetails,
  CustomerDetails
} from 'page-objects/cart/payment-overview-form';
import { UserCredentials } from 'page-objects/authentication/create-account-form';

interface SubscriptionPlanPurchaseFixture {
  chooseWebHostingPlan: (plan: WebHostingPlan) => Promise<void>;
  ensureWebHostingPlanIsSelected: (plan: WebHostingPlan) => Promise<void>;
  chooseWebHostingDuration: (duration: WebHostingDuration) => Promise<void>;
  enterCreateAccountDetails: (
    userCredentials: UserCredentials
  ) => Promise<void>;
  enterCustomerDetails: (customerDetails: CustomerDetails) => Promise<void>;
  enterCardDetails: (cardDetails: CardDetails) => Promise<void>;
  clickSubmitSecurePayment: () => Promise<void>;
}

const webHostingPlanMessages = new Map<WebHostingPlan, string>([
  [WebHostingPlan.PREMIUM, 'Selected plan: Premium Web Hosting'],
  [WebHostingPlan.BUSINESS, 'Selected plan: Business Web Hosting'],
  [WebHostingPlan.CLOUD_STARTUP, 'Selected plan: Cloud Startup']
]);

export const test = base.extend<SubscriptionPlanPurchaseFixture>({
  chooseWebHostingPlan: async (
    { webHostingPriceCard: pricingCard, page },
    use
  ) => {
    await use(async (plan: WebHostingPlan) => {
      await pricingCard.clickChoosePlan(plan);
      await expect(
        page.getByText('You’re almost there! Complete your order')
      ).toBeVisible();
    });
  },
  ensureWebHostingPlanIsSelected: async ({ page }, use) => {
    await use(async (plan: WebHostingPlan) => {
      const message = webHostingPlanMessages.get(plan)!;
      await expect(page.getByText(message)).toHaveCount(1);
    });
  },
  chooseWebHostingDuration: async (
    { webHostingPeriodCard: subscriptionPeriodCard },
    use
  ) => {
    await use(async (duration: WebHostingDuration) => {
      await subscriptionPeriodCard.selectDuration(duration);
    });
  },
  enterCreateAccountDetails: async ({ createAccountForm }, use) => {
    await use(async (userCredentials: UserCredentials) => {
      await createAccountForm.enterCredentials(userCredentials);
    });
  },
  enterCustomerDetails: async ({ paymentOverviewForm }, use) => {
    await use(async (customerDetails: CustomerDetails) => {
      await paymentOverviewForm.enterCustomerDetails(customerDetails);
    });
  },
  enterCardDetails: async ({ paymentOverviewForm }, use) => {
    await use(async (cardDetails: CardDetails) => {
      await paymentOverviewForm.enterCardDetails(cardDetails);
    });
  },
  clickSubmitSecurePayment: async ({ paymentOverviewForm }, use) => {
    await use(async () => {
      await paymentOverviewForm.clickSubmitSecurePayment();
    });
  }
});
