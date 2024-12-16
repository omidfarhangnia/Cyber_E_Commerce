import {
  HomeSec1,
  HomeSec2,
  HomeSec3,
} from "@/components/sections/home-sections";
import { sql } from "@vercel/postgres";

async function getData() {
  try {
    const data = await sql`
          SELECT * FROM invoicestwo
      `;

    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <div>
      {/* <HomeSec1 /> */}
      {/* <HomeSec2 /> */}
      {/* <HomeSec3 /> */}
      <div className="bg-blue-500">hello there</div>
      <div className="bg-yellow-300">{JSON.stringify(data)}</div>
    </div>
  );
}
