import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  searches: defineTable({
    state: v.optional(v.string()),
    city: v.string(),
    country: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    searchedAt: v.number(),
  }).index("by_state", ["state"]),
  
  weatherData: defineTable({
    state: v.optional(v.string()),
    city: v.string(),
    country: v.optional(v.string()),
    temperature: v.number(),
    condition: v.string(),
    description: v.string(),
    humidity: v.number(),
    windSpeed: v.number(),
    icon: v.string(),
    localTime: v.string(),
    forecast: v.array(v.object({
      date: v.string(),
      temperature: v.number(),
      condition: v.string(),
      icon: v.string(),
    })),
    lastUpdated: v.number(),
  }).index("by_state_city", ["state", "city"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
