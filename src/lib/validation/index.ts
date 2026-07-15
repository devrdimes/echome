import { z } from "zod";

export const reflectionSchema = z.object({
  body: z.string().min(10, "Reflection must be at least 10 characters").max(5000),
  mood: z.enum(["VERY_LOW", "LOW", "NEUTRAL", "HIGH", "VERY_HIGH"]).default("NEUTRAL"),
});

export const habitSchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().optional(),
  cadence: z.enum(["daily", "weekly"]).default("daily"),
});
