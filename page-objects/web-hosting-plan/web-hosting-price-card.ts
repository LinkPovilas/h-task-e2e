import { PageObject } from 'page-objects/page-object';

export enum WebHostingPlan {
  PREMIUM,
  BUSINESS,
  CLOUD_STARTUP
}

export class WebHostingPriceCard extends PageObject {
  get choosePlanButton() {
    return this.page.getByRole('button', { name: 'Choose plan' });
  }

  async clickChoosePlan(plan: WebHostingPlan) {
    await this.choosePlanButton.nth(plan).click();
  }
}
