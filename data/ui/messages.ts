import { WebHostingPlan } from 'page-objects/web-hosting-plan/web-hosting-price-card';

export const noticeMessage = {
  completeYourOrder: 'You’re almost there! Complete your order'
} as const;

export const webHostingPlanMessages = new Map<WebHostingPlan, string>([
  [WebHostingPlan.PREMIUM, 'Premium Web Hosting'],
  [WebHostingPlan.BUSINESS, 'Business Web Hosting'],
  [WebHostingPlan.CLOUD_STARTUP, 'Cloud Startup']
]);
