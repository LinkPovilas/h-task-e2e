import { randomFakeUser, testCardData } from 'data/ui/test-user-data';
import { it } from 'fixtures/fixtures';
import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';

it.describe('Web hosting plan cart', () => {
  it.describe('selecting from homepage', () => {
    it.beforeEach(async ({ goToHomePage }) => {
      await goToHomePage();
    });

    [WebHostingPlan.BUSINESS].forEach((plan) => {
      it(`should allow to add ${plan.toString()} plan into cart`, async ({
        chooseWebHostingPlan,
        ensureWebHostingPlanIsSelected
      }) => {
        await chooseWebHostingPlan(plan);
        await ensureWebHostingPlanIsSelected(plan);
      });
    });
  });

  it('should allow to initiate a 24 month Premium plan', async ({
    goToWebHostingCartPage,
    ensureWebHostingPlanIsSelected,
    chooseWebHostingDuration,
    enterCreateAccountDetails,
    enterCustomerDetails,
    enterCardDetails,
    clickSubmitSecurePayment
  }) => {
    const plan = WebHostingPlan.PREMIUM;
    const { email, password, phoneNumber } = randomFakeUser();

    await goToWebHostingCartPage(plan);
    await ensureWebHostingPlanIsSelected(plan);
    await chooseWebHostingDuration(WebHostingDuration.TWENTY_FOUR_MONTHS);
    await enterCreateAccountDetails({ email, password });
    await enterCustomerDetails({ phoneNumber });
    await enterCardDetails(testCardData());
    await clickSubmitSecurePayment();
  });
});
