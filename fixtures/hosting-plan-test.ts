import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { test as base } from './page-object-test';
import { expect } from '@playwright/test';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import { UserCredentials } from 'page-objects/authentication/create-account-form';
import { noticeMessage, webHostingPlanMessages } from 'data/ui/messages';
import { CustomerDetails } from 'page-objects/payment/cart-estimate-details-form';
import { CardDetails } from 'page-objects/payment/card-payment-form';
import { PaymentMethod } from 'page-objects/payment/payment-method-list';

interface SubscriptionPlanPurchaseFixture {
  chooseWebHostingPlan: (plan: WebHostingPlan) => Promise<void>;
  ensureWebHostingPlanIsSelected: (plan: WebHostingPlan) => Promise<void>;
  chooseWebHostingDuration: (duration: WebHostingDuration) => Promise<void>;
  enterCreateAccountDetails: (
    userCredentials: UserCredentials
  ) => Promise<void>;
  ensureDefaultPaymentMethodIsSelected: () => Promise<void>;
  selectPaymentMethod: (paymentMethod?: PaymentMethod) => Promise<void>;
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
  ensureDefaultPaymentMethodIsSelected: async ({ paymentMethodList }, use) => {
    await use(async () => {
      await expect(paymentMethodList.creditCardMethod).toBeChecked();
    });
  },
  selectPaymentMethod: async ({ paymentMethodList }, use) => {
    await use(async (paymentMethod?: PaymentMethod) => {
      await paymentMethodList.selectPaymentMethod(paymentMethod);
    });
  },
  enterCustomerDetails: async ({ paymentOverview }, use) => {
    await use(async (customerDetails: CustomerDetails) => {
      await paymentOverview.cartEstimateDetailsForm.enterCustomerDetails(
        customerDetails
      );
    });
  },
  enterCardDetails: async ({ paymentOverview }, use) => {
    await use(async (cardDetails: CardDetails) => {
      await paymentOverview.cardPaymentForm.enterCardDetails(cardDetails);
    });
  },
  submitOrder: async ({ paymentOverview, backdropLoader }, use) => {
    await use(async () => {
      await paymentOverview.clickSubmitSecurePayment();
      await expect(backdropLoader.circularSpinner).toBeVisible({
        timeout: 10_000
      });
    });
  }
});
