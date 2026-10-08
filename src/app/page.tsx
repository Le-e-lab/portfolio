import type { Metadata } from "next";
import { getAllWork } from "@/lib/work";
import { getActivity } from "@/lib/github";
import { Hero } from "@/components/home/hero";
import { WorkList } from "@/components/home/work-list";
import { ActivitySection } from "@/components/home/activity-section";
import { ServicesSection } from "@/components/home/services-section";
import { StackSection } from "@/components/home/stack-section";
import { AboutSection } from "@/components/home/about-section";
import { OffTheClock } from "@/components/home/off-the-clock";
import { ContactSection } from "@/components/home/contact-section";

// Here, not in the layout, so the 404 page does not inherit a canonical to home.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  // Read on the server, passed down as plain props. Keeps fs out of the client bundle.
  const work = getAllWork();
  const activity = getActivity();

  return (
    <>
      <Hero />
      <WorkList work={work} />
      <ActivitySection {...activity} />
      <ServicesSection />
      <StackSection />
      <AboutSection />
      <OffTheClock />
      <ContactSection />
    </>
  );
}
