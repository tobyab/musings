import Image from "next/image";
import Link from "next/link";
import { Redis } from "@upstash/redis";
import { format } from "date-fns";

const redis = new Redis({
  url: "https://usw1-fitting-swine-33716.upstash.io",
  token: process.env.UPSTASH_TOKEN as string,
});

export default async function Home() {
  async function getMusings() {
    const keys = await redis.keys("*");
    return await redis.mget(...keys);
  }

  const musings = (await getMusings()) as Array<{
    title: string;
    musing: string;
    createdAt: String;
  }>;

  console.log(musings);

  return (
    <div className="max-w-2xl bg-blue-400 place-items-center ">
      {musings.map((musing, i) => (
        <Link href={`/${encodeURIComponent(musing.title)}`}>
          <div key={i} className="flex justify-between  bg-red-400 w-full">
            <h1>{musing.title}</h1>
            <p>{format(new Date(musing.createdAt as string), "MMMM d yyyy")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
