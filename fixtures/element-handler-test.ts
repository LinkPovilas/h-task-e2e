import { expect } from '@playwright/test';
import { test as base } from './page-object-test';

interface ElementHandlerFixture {
  acceptCookieConsent: void;
}

export const test = base.extend<ElementHandlerFixture>({
  acceptCookieConsent: [
    async ({ page, cookieConsent }, use) => {
      await page.addLocatorHandler(
        cookieConsent.header,
        async () => {
          await cookieConsent.clickAccept();
          await expect(cookieConsent.header).not.toBeVisible();
        },
        {
          times: 1
        }
      );
      await use();
    },
    { auto: true }
  ]
});
