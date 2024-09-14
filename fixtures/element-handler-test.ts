import { expect } from '@playwright/test';
import { test as base } from './page-object-test';

interface ElementHandlerFixture {
  acceptcookieConsentBanner: void;
}

export const test = base.extend<ElementHandlerFixture>({
  acceptcookieConsentBanner: [
    async ({ page, cookieConsentBanner }, use) => {
      await page.addLocatorHandler(
        cookieConsentBanner.header,
        async () => {
          await cookieConsentBanner.clickAccept();
          await expect(cookieConsentBanner.header).not.toBeVisible();
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
