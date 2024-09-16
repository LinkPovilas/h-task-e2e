import { CreateCartData } from 'data/api/schemas/create-cart-schema';
import { test as base } from './api-request-test';
import { expect } from '@playwright/test';
import { CreateCartPayload } from 'data/api/interfaces/create-cart-interface';
import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';
import { urlPath } from 'data/ui/url-path';

interface NavigationFixture {
  goToHomePage: () => Promise<void>;
  goToWebHostingCartPage: (subscriptionPlan: WebHostingPlan) => Promise<void>;
}

const webHostingPlanSlugs = new Map<WebHostingPlan, string>([
  [WebHostingPlan.PREMIUM, 'hosting:hostinger_premium'],
  [WebHostingPlan.BUSINESS, 'hosting:hostinger_business'],
  [WebHostingPlan.CLOUD_STARTUP, 'hosting:cloud_economy']
]);

export const test = base.extend<NavigationFixture>({
  goToHomePage: async ({ page }, use) => {
    await use(async () => {
      await page.goto(urlPath.homePage);
    });
  },
  goToWebHostingCartPage: async ({ page, createCart }, use) => {
    await use(async (subscriptionPlan: WebHostingPlan) => {
      const slug = webHostingPlanSlugs.get(subscriptionPlan)!;
      const payload: CreateCartPayload = {
        products: [
          {
            slug,
            period: {
              value: 4,
              unit: 'year'
            }
          }
        ]
      };

      const response = await createCart(payload);
      expect(response.ok()).toBeTruthy();
      const createCartData = (await response.json()) as CreateCartData;
      const redirectUrl = createCartData.data.cart.cart_url;
      expect(redirectUrl).toBeTruthy();
      await page.goto(redirectUrl);
    });
  }
});
