import { z } from 'zod';

const createCartSchema = z.object({
  data: z.object({
    cart: z.object({
      cart_url: z.string()
    })
  })
});

type CreateCartData = z.infer<typeof createCartSchema>;

export { createCartSchema, CreateCartData };
