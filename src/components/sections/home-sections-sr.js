import { Suspense } from "react";
import { ResponsiveSec5 } from "./home-sections";
import { fetchSec5Data } from "@/actions/data";
import { SecFiveSkeleton } from "../skeletons/home-skeletons";

export async function HomeSec5() {
  return (
    <Suspense fallback={<SecFiveSkeleton />}>
      <Section5Content />
    </Suspense>
  );
}

async function Section5Content() {
  const section5Data = await fetchSec5Data();

  return <ResponsiveSec5 data={section5Data} />;
}
