import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://usw1-fitting-swine-33716.upstash.io",
  token: process.env.UPSTASH_TOKEN as string,
});
