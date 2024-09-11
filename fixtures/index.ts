import { mergeTests } from '@playwright/test';
import { test as sharedAssertionStepTest } from './shared-assertion-test';
import { test as userNavigationTest } from './user-navigation-test';
import { test as broserActionTest } from './browser-action-test';
import { test as authenticationTest } from './authentication-test';

const test = mergeTests(
  sharedAssertionStepTest,
  userNavigationTest,
  broserActionTest,
  authenticationTest
);

export { test, test as it };
export { expect } from './custom-matchers';
