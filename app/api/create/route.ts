import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: "https://usw1-fitting-swine-33716.upstash.io",
  token: process.env.UPSTASH_TOKEN as string,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { musing, title } = await req.json();

  await redis.set(nanoid(), {
    musing: musing,
    title: title,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ status: 200, body: "Success" });
}
