import {
  HomeSec1,
  HomeSec2,
  HomeSec3,
} from "@/components/sections/home/home-sections";
import {
  HomeSec4,
  HomeSec5,
} from "@/components/sections/home/home-sections-sr";

export default async function Home() {
  return (
    <div>
      <HomeSec1 />
      <HomeSec2 />
      <HomeSec3 />
      <HomeSec4 />
      <HomeSec5 />
    </div>
  );
}
