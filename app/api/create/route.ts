import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { redis } from "@/lib/upstash";

export const runtime = "edge";

export async function POST(req: Request) {
  const { musing, title } = await req.json();

  await redis.set(nanoid(5), {
    musing: musing,
    title: title,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ status: 200, body: "Success" });
}
