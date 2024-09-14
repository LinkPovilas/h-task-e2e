import { randomFakeUser } from 'resources/test-user-data';
import { it } from 'fixtures/fixtures';
import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { WebHostingDuration } from 'page-objects/web-hosting-plan/web-hosting-period-card';
import { PaymentMethod } from 'page-objects/payment/payment-method-list';
import { Country } from 'data/ui/country';

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

  it.describe('selecting web hosting duration', () => {
    [WebHostingPlan.PREMIUM].forEach((plan) => {
      [WebHostingDuration.TWENTY_FOUR_MONTHS].forEach((duration) => {
        it(`should allow to initiate ${duration} ${WebHostingPlan[plan]} plan order`, async ({
          goToWebHostingCartPage,
          ensureWebHostingPlanIsSelected,
          chooseWebHostingDuration,
          enterCreateAccountDetails,
          enterCustomerDetails,
          ensureDefaultPaymentMethodIsSelected,
          selectPaymentMethod,
          submitOrder
        }) => {
          const { email, password, phoneNumber } = randomFakeUser();

          await goToWebHostingCartPage(plan);
          await ensureWebHostingPlanIsSelected(plan);
          await chooseWebHostingDuration(duration);
          await ensureDefaultPaymentMethodIsSelected();
          await enterCreateAccountDetails({ email, password });
          await selectPaymentMethod(PaymentMethod.PAYPAL);
          await enterCustomerDetails({
            phoneNumberPrefixOrCountry: Country.LITHUANIA,
            country: Country.LITHUANIA,
            phoneNumber
          });
          await submitOrder();
        });
      });
    });
  });
});
