import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { redis } from "@/lib/upstash";

export const runtime = "edge";

export async function POST(req: Request) {
  const { musing, title } = await req.json();
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Missing or invalid Authorization header", {
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== process.env.TOKEN) {
    return NextResponse.json({ status: 401, body: "Authenticate!" });
  } else {
    await redis.set(nanoid(5), {
      musing: musing,
      title: title,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: 200, body: "Success" });
  }
}
