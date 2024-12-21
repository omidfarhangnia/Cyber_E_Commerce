import {
  HomeSec1,
  HomeSec2,
  HomeSec3,
  HomeSec4,
} from "@/components/sections/home-sections";
import HomeSectionFive from "@/components/sections/home/HomeSectionFive";
import { SecFiveSkeleton } from "@/components/skeletons/home-skeletons";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      {/* <HomeSec1 /> */}
      {/* <HomeSec2 /> */}
      {/* <HomeSec3 /> */}
      {/* <HomeSec4 /> */}
      <Suspense fallback={<SecFiveSkeleton />}>
        <HomeSectionFive />
      </Suspense>
    </div>
  );
}
