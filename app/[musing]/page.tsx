import { redis } from "@/lib/upstash";
import { format } from "date-fns";

export default async function MusingPage({
  params,
}: {
  params: { musing: string };
}) {
  async function getMusings(value: string) {
    const keys = await redis.keys(value);
    return await redis.mget(...keys);
  }

  const musings = (await getMusings(params.musing)) as Array<any>;

  return (
    <div className="max-w-2xl">
      {musings.map((musing, i) => (
        <div key={i} className="">
          <div className="mb-8">
            <h1 className="font-medium mb-2">{musing.title}</h1>
            <p className="text-sm text-[#BBBBBB]">
              {format(new Date(musing.createdAt as string), "MMMM d yyyy")}
            </p>
          </div>
          <p className="text-[#7b7b7b]">{musing.musing}</p>
        </div>
      ))}
    </div>
  );
}
