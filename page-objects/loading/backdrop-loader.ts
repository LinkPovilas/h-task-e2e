import { PageObject } from 'page-objects/page-object';

export class BackdropLoader extends PageObject {
  get circularSpinner() {
    return this.page.locator('svg.h-circular');
  }
}
