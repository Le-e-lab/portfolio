import { getAllWork } from "@/lib/work";
import { getActivity } from "@/lib/github";
import { Hero } from "@/components/home/hero";
import { WorkList } from "@/components/home/work-list";
import { ActivitySection } from "@/components/home/activity-section";

export default function HomePage() {
  // Read on the server, passed down as plain props. Keeps fs out of the client bundle.
  const work = getAllWork();
  const activity = getActivity();

  return (
    <>
      <Hero />
      <WorkList work={work} />
      <ActivitySection {...activity} />
    </>
  );
}
