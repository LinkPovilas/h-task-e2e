import { PageObject } from 'page-objects/page-object';

export class CookieConsentBanner extends PageObject {
  get header() {
    return this.page.getByRole('heading', {
      name: 'We care about your privacy'
    });
  }

  async clickAccept() {
    await this.page
      .getByRole('button', { name: 'Accept' })
      .click({ delay: 1000 });
  }
}
