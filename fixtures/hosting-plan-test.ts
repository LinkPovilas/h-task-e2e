import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { test as base } from './page-object-test';
import { expect } from '@playwright/test';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import {
  CardDetails,
  CustomerDetails
} from 'page-objects/payment/payment-overview-form';
import { UserCredentials } from 'page-objects/authentication/create-account-form';
import { route } from 'data/api/route';
import { noticeMessage, webHostingPlanMessages } from 'data/ui/messages';

interface SubscriptionPlanPurchaseFixture {
  chooseWebHostingPlan: (plan: WebHostingPlan) => Promise<void>;
  ensureWebHostingPlanIsSelected: (plan: WebHostingPlan) => Promise<void>;
  chooseWebHostingDuration: (duration: WebHostingDuration) => Promise<void>;
  enterCreateAccountDetails: (
    userCredentials: UserCredentials
  ) => Promise<void>;
  enterCustomerDetails: (customerDetails: CustomerDetails) => Promise<void>;
  enterCardDetails: (cardDetails: CardDetails) => Promise<void>;
  submitOrder: () => Promise<void>;
}

export const test = base.extend<SubscriptionPlanPurchaseFixture>({
  chooseWebHostingPlan: async (
    { webHostingPriceCard: pricingCard, page },
    use
  ) => {
    await use(async (plan: WebHostingPlan) => {
      await pricingCard.clickChoosePlan(plan);
      await expect(
        page.getByText(noticeMessage.completeYourOrder)
      ).toBeVisible();
    });
  },
  ensureWebHostingPlanIsSelected: async ({ page }, use) => {
    await use(async (plan: WebHostingPlan) => {
      const message = webHostingPlanMessages.get(plan)!;
      await expect(
        page.getByRole('heading', { name: message, exact: true })
      ).toBeVisible();
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
  submitOrder: async ({ page, paymentOverviewForm, backdropLoader }, use) => {
    await use(async () => {
      const responsePromise = page.waitForResponse(`**${route.createOrder()}`);
      await paymentOverviewForm.clickSubmitSecurePayment();
      const response = await responsePromise;
      expect(response.ok(), 'should create order').toBeTruthy();
      await expect(backdropLoader.circularSpinner).toBeVisible();
    });
  }
});
