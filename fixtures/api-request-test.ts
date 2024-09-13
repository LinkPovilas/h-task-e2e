import { APIResponse, test as base } from '@playwright/test';
import { CreateCartPayload } from 'data/api/interfaces/create-cart-interface';
import { route } from 'data/api/route';

interface ApiRequestFixture {
  createCart: (data: CreateCartPayload) => Promise<APIResponse>;
  loginWithBasicCredentials: () => Promise<APIResponse>;
}

export const test = base.extend<ApiRequestFixture>({
  createCart: async ({ request }, use) => {
    await use((data: CreateCartPayload) =>
      request.post(route.cart(), {
        headers: {
          authorization: 'Bearer www.hostinger.com'
        },
        data
      })
    );
  }
});
