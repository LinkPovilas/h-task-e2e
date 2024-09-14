import { PageObject } from 'page-objects/page-object';

export enum WebHostingDuration {
  ONE_MONTH = '1 month',
  TWELVE_MONTHS = '12 months',
  TWENTY_FOUR_MONTHS = '24 months',
  FOURTY_EIGHT_MONTHS = '48 months'
}

export class WebHostingPeriodCard extends PageObject {
  async selectDuration(duration: WebHostingDuration) {
    await this.page.getByText(duration).click();
  }
}
