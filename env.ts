import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  CI: z.union([z.string(), z.boolean()]).default(false),
  BASE_URL: z.string().url(),
  CART_API_URL: z.string().url(),
  USER_EMAIL: z.string().email(),
  USER_PASSWORD: z.string()
});

const env = envSchema.parse(process.env);

export { env };
