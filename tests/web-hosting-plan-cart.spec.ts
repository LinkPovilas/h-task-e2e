import { randomFakeUser, testCardData } from 'data/ui/test-user-data';
import { it } from 'fixtures/fixtures';
import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';

it.describe('Web hosting plan cart', () => {
  it.describe('selecting web hosting plan from homepage', () => {
    [WebHostingPlan.BUSINESS].forEach((plan) => {
      it(`should allow to add ${WebHostingPlan[plan]} plan into cart`, async ({
        goToHomePage,
        chooseWebHostingPlan,
        ensureWebHostingPlanIsSelected
      }) => {
        await goToHomePage();
        await chooseWebHostingPlan(plan);
        await ensureWebHostingPlanIsSelected(plan);
      });
    });
  });

  it.describe.only('selecting web hosting duration', () => {
    [WebHostingPlan.PREMIUM].forEach((plan) => {
      [WebHostingDuration.TWENTY_FOUR_MONTHS].forEach((duration) => {
        it(`should allow to initiate ${duration} ${WebHostingPlan[plan]} plan order`, async ({
          goToWebHostingCartPage,
          ensureWebHostingPlanIsSelected,
          chooseWebHostingDuration,
          enterCreateAccountDetails,
          enterCustomerDetails,
          enterCardDetails,
          submitOrder
        }) => {
          const { email, password, phoneNumber } = randomFakeUser();

          await goToWebHostingCartPage(plan);
          await ensureWebHostingPlanIsSelected(plan);
          await chooseWebHostingDuration(duration);
          await enterCreateAccountDetails({ email, password });
          await enterCustomerDetails({ phoneNumber });
          await enterCardDetails(testCardData());
          await submitOrder();
        });
      });
    });
  });
});
