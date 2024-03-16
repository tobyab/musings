import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

const redis = new Redis({
  url: 'https://usw1-fitting-swine-33716.upstash.io',
  token: process.env.UPSTASH_TOKEN as string,
})

export async function POST(req: Request) {
    const { body } = await req.json();

    console.log(body)

    await redis.set(nanoid(), body)
}