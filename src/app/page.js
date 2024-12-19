import {
  HomeSec1,
  HomeSec2,
  HomeSec3,
  HomeSec4,
} from "@/components/sections/home-sections";
import { sql } from "@vercel/postgres";

export default async function Home() {
  return (
    <div>
      {/* <HomeSec1 /> */}
      {/* <HomeSec2 /> */}
      {/* <HomeSec3 /> */}
      <HomeSec4 />
    </div>
  );
}
