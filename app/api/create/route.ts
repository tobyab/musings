import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: 'https://usw1-fitting-swine-33716.upstash.io',
  token: process.env.UPSTASH_TOKEN as string,
})

export async function POST(req: Request) {
    const { musing } = await req.json();

    console.log(musing, "m-m-m-musingggg")

    await redis.set(nanoid(), musing)

    return NextResponse.json({ status: 200, body: "Success" })
}
