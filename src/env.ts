import {z} from 'zod'

export const envSchema = z.object({
  ONESIGNAL_APP_ID: z.string().min(1),
  PRODUCTS_API_URL: z.string().min(1),
})

export const env = envSchema.parse({
  ONESIGNAL_APP_ID: process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID,
  PRODUCTS_API_URL: process.env.EXPO_PUBLIC_PRODUCTS_API_URL,
})
