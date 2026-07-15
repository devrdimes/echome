export const stripeConfig = {
  plans: {
    free: {
      name: "Free",
      description: "Basic AI insights and weekly reflection.",
      priceId: "",
      features: ["1 Report / Month", "Weekly Reflection", "Basic Traits"],
    },
    pro: {
      name: "Pro",
      description: "Deep personality analysis and daily coaching.",
      priceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
      priceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY!,
      features: ["5 Reports / Month", "Daily Reflection", "Advanced Traits", "Habit Coaching"],
    },
    ultimate: {
      name: "Ultimate",
      description: "Unlimited AI simulations and future mapping.",
      priceIdMonthly: process.env.STRIPE_PRICE_ULTIMATE_MONTHLY!,
      features: ["Unlimited Reports", "Future Simulator", "Priority AI Queue", "Export Data"],
    },
  },
};
