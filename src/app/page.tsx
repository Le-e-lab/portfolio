import { getAllWork } from "@/lib/work";
import { Hero } from "@/components/home/hero";
import { WorkList } from "@/components/home/work-list";

export default function HomePage() {
  // Read on the server, passed down as plain props. Keeps fs out of the client bundle.
  const work = getAllWork();

  return (
    <>
      <Hero />
      <WorkList work={work} />
    </>
  );
}