import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Get recent searches
export const getRecentSearches = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("searches")
      .order("desc")
      .take(8);
  },
});

// Save a search
export const saveSearch = mutation({
  args: {
    state: v.string(),
    city: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("searches", {
      state: args.state,
      city: args.city,
      searchedAt: Date.now(),
    });
  },
});

// Get cached weather data
export const getCachedWeather = query({
  args: { state: v.string(), city: v.string() },
  handler: async (ctx, args) => {
    const weather = await ctx.db
      .query("weatherData")
      .withIndex("by_state_city", (q) => q.eq("state", args.state).eq("city", args.city))
      .first();
    
    // Return cached data if it's less than 10 minutes old
    if (weather && Date.now() - weather.lastUpdated < 10 * 60 * 1000) {
      return weather;
    }
    
    return null;
  },
});

// Cache weather data
export const cacheWeatherData = mutation({
  args: {
    state: v.string(),
    city: v.string(),
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
  },
  handler: async (ctx, args) => {
    // Remove old cache entry
    const existing = await ctx.db
      .query("weatherData")
      .withIndex("by_state_city", (q) => q.eq("state", args.state).eq("city", args.city))
      .first();
    
    if (existing) {
      await ctx.db.delete(existing._id);
    }
    
    // Insert new cache entry
    await ctx.db.insert("weatherData", {
      ...args,
      lastUpdated: Date.now(),
    });
  },
});

// Fetch weather data from API (placeholder for now)
export const fetchWeatherData = action({
  args: { state: v.string(), city: v.string() },
  handler: async (ctx, args) => {
    // Example data for Indian cities with realistic weather patterns
    const weatherConditions = ["Clear", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorm", "Haze"];
    const icons = ["01d", "02d", "03d", "10d", "11d", "50d"];
    
    const exampleData = {
      state: args.state,
      city: args.city,
      temperature: Math.floor(Math.random() * 20) + 25, // 25-45°C typical for India
      condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      description: "Typical Indian weather",
      humidity: Math.floor(Math.random() * 40) + 50, // 50-90% humidity
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      icon: icons[Math.floor(Math.random() * icons.length)],
      localTime: new Date().toLocaleTimeString('en-IN'),
      forecast: Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
        temperature: Math.floor(Math.random() * 18) + 26,
        condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
        icon: icons[Math.floor(Math.random() * icons.length)],
      })),
    };
    
    // Cache the data
    await ctx.runMutation(api.weather.cacheWeatherData, exampleData);
    
    return exampleData;
  },
});
