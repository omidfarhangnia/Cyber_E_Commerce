import { Suspense } from "react";
import { ResponsiveSec4, ResponsiveSec5 } from "./home-sections";
import { fetchSec4Data, fetchSec5Data } from "@/actions/data";
import { Sec4Skeleton, Sec5Skeleton } from "../../skeletons/home-skeletons";

export async function HomeSec4() {
  return (
    <Suspense fallback={<Sec4Skeleton />}>
      <Section4Content />
    </Suspense>
  );
}

async function Section4Content() {
  const section5Data = await fetchSec4Data();
  return <ResponsiveSec4 data={section5Data} />;
}

export async function HomeSec5() {
  return (
    <Suspense fallback={<Sec5Skeleton />}>
      <Section5Content />
    </Suspense>
  );
}

async function Section5Content() {
  const section5Data = await fetchSec5Data();
  return <ResponsiveSec5 data={section5Data} />;
}
