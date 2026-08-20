import { cacheLife } from "next/cache";

export default async function getRandomPage() {
  "use cache";

  cacheLife({
    stale: 5, // 5 seconds until considered stale
    revalidate: 10, // 10 seconds until revalidated
    expire: 86400, // 1 day until expired
  });

  /* cacheLife({
    stale: 3600, // 1 hour until considered stale
    revalidate: 7200, // 2 hours until revalidated
    expire: 86400, // 1 day until expired
  }); */

  console.log("getRandomPage");
  const random = Math.random();
  const now = Date.now();
  const date = new Date();
  const uuid = crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return (
    <div className="p-4">
      <p>Random: {random}</p>
      <p>Now: {now}</p>
      <p>Date: {date.getTime()}</p>
      <p>UUID: {uuid}</p>
      <p>Bytes: {bytes}</p>
    </div>
  );
}
