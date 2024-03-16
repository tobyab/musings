import { redis } from "@/lib/upstash";

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
    <div>
      {musings.map((musing, i) => (
        <div key={i} className="">
          <h1>{musing.title}</h1>
          <h1>{musing.musing}</h1>
          <h1>{musing.createdAt}</h1>
        </div>
      ))}
    </div>
  );
}
