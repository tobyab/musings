import Image from "next/image";
import Link from "next/link";
import { Redis } from "@upstash/redis";
import { format } from "date-fns";
import { redis } from "@/lib/upstash";

export default async function Home() {
  async function getMusings() {
    const keys = await redis.keys("*");
    const values = await redis.mget(...keys);

    return keys.map((key, i) => ({ key, data: values[i] }));
  }

  const musings = (await getMusings()) as Array<any>;
  console.log(musings, "asdasdasdasdasd");

  return (
    <div className="grid justify-center place-items-center break-words">
      <div className="mt-32 max-w-2xl">
        asduhfiausdhfuyadhsfauisdfhasdfhoasdfloasdhfladosfhiaaskdfgasjdhfjahsdfyashdbfkuyasdhfasydfgaskdhfsudhflayfiuaosdfhliadfsylhaisydfyasdflasdfhy
        {musings.map((musing, i) => (
          <Link href={`/${musing.key}`} key={i}>
            <div className="flex justify-between">
              <h1>{musing.data.title}</h1>
              <p>
                {format(
                  new Date(musing.data.createdAt as string),
                  "MMMM d yyyy",
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
