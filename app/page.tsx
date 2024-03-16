import Link from "next/link";
import { format } from "date-fns";
import { redis } from "@/lib/upstash";

export default async function Home() {
  async function getMusings() {
    const keys = await redis.keys("*");
    const values = await redis.mget(...keys);

    return keys.map((key, i) => ({ key, data: values[i] }));
  }
  const musings = (await getMusings()) as Array<any>;

  return (
    <div className=" justify-center place-items-center h-screen break-words w-full flex space-x-4">
      <div className="w-full sm:flex sm:space-x-8 sm:space-y-0 space-y-8">
        <div className="space-y-4 max-w-sm">
          <h2 className="font-medium mb-4">Updates</h2>
          {musings.map((musing, i) => (
            <Link href={`/${musing.key}`} key={i}>
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
          ))}
        </div>
        <div className="sm:max-w-sm">
          <h2 className="font-medium mb-4">What is this?</h2>
          <p className="text-[#7b7b7b]">
            I&apos;m trying to document my life better. I built a Shortcut on my
            phone which allows me to just jot my thoughts down. This is the
            result of that! You&apos;ll get my random thoughts, progress on my
            projects and all sorts of other shenanigans.
          </p>
        </div>
      </div>
    </div>
  );
}
