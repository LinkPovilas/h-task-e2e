import { mergeTests } from '@playwright/test';
import { test as naviagtionTest } from './navigation-test';
import { test as planPurchaseTest } from './hosting-plan-test';
import { test as elementHandlerTest } from './element-handler-test';

const test = mergeTests(naviagtionTest, planPurchaseTest, elementHandlerTest);

export { test, test as it };
export { expect } from '@playwright/test';
