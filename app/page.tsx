import Link from "next/link";
import { format } from "date-fns";
import { redis } from "@/lib/upstash";

async function getMusings() {
  const keys = await redis.keys("musing:*");
  const values = await redis.mget(...keys);

  const musings: Array<any> = keys.map((key, i) => ({ key, data: values[i] }));
  musings.sort((a, b) => new Date(a.data.createdAt).getTime() - new Date(b.data.createdAt).getTime());

  return musings;
}

export default async function Home() {
  const musings = (await getMusings()) as Array<any>;

  return (
    <div className=" justify-center place-items-center h-screen break-words w-full flex space-x-4">
      <div className="w-full sm:flex sm:space-x-8 sm:space-y-0 space-y-8">
        <div className="space-y-4 max-w-sm">
          <h2 className="font-medium mb-4">Updates</h2>
          {musings
            .map((musing, i) => (
              <Link href={`/${musing.key.replace("musing:", "")}`} key={i}>
                <div className="flex justify-between space-x-4 my-2">
                  <h2 className="font-">{musing.data.title}</h2>
                  <p className="text-sm text-[#BBBBBB] self-center">
                    {format(
                      new Date(musing.data.createdAt as string),
                      "MMMM d yyyy",
                    )}
                  </p>
                </div>
              </Link>
            ))
            .reverse()}
        </div>
        <div className="sm:max-w-sm">
          <h2 className="font-medium mb-4">What is this?</h2>
          <p className="text-[#7b7b7b]">
            I&apos;m trying to document my life better. I built a Shortcut on my
            phone which allows me to just jot my thoughts down; and those
            thoughts get put here. You&apos;ll get my random musings, progress
            on my projects and all sorts of other shenanigans.{" "}
            <Link
              href="https://github.com/tobyab/musings"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Here&apos;s the code
            </Link>
            , if you&apos;re interested :)
          </p>
        </div>
      </div>
    </div>
  );
}
