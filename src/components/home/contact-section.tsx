import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { siteConfig } from "@/config/site.config";

/**
 * Close on the one action that matters. Email is the primary
 * target, phone is secondary, and every link that has no URL in site.config is
 * omitted rather than rendered as a dead "#".
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line bg-surface-2 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="07" label="Contact" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <Reveal delay={0.05}>
              <h2 className="max-w-[20ch] text-[clamp(2rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
                Let&rsquo;s talk about what you&rsquo;re building.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-[0.95rem] leading-[1.75] text-muted">
                {siteConfig.responseTime}. {siteConfig.availability}. Based in{" "}
                {siteConfig.location}.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="press inline-flex min-h-[44px] items-center rounded-[2px] border border-accent bg-accent px-5 font-mono text-[11px] tracking-[0.12em] text-bg uppercase transition-opacity duration-200 hover:opacity-85"
                >
                  Email me
                </a>
                <CopyEmailButton variant="outline" />
                <Link
                  href={siteConfig.cvPath}
                  className="press inline-flex min-h-[44px] items-center border border-line px-4 font-mono text-[11px] tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:border-muted hover:text-ink"
                >
                  CV
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <dl className="space-y-px border border-line bg-line">
              <Row
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <Row
                label="Phone"
                value={siteConfig.phone}
                href={`tel:${siteConfig.phone}`}
              />
              <Row
                label="Location"
                value={`${siteConfig.location} · ${siteConfig.timezone}`}
              />
              <Row
                label="GitHub"
                value={`@${siteConfig.githubUsername}`}
                href={`https://github.com/${siteConfig.githubUsername}`}
                external
              />
              {/* Rendered only once site.config has real URLs. The social cap is
                  row at four links and forbids dead anchors. */}
              {siteConfig.linkedinUrl && (
                <Row
                  label="LinkedIn"
                  value="Profile"
                  href={siteConfig.linkedinUrl}
                  external
                />
              )}
              {siteConfig.designProfileUrl && (
                <Row
                  label={siteConfig.designProfileLabel}
                  value="Design work"
                  href={siteConfig.designProfileUrl}
                  external
                />
              )}
              {siteConfig.bookingUrl && (
                <Row
                  label="Booking"
                  value="Pick a slot"
                  href={siteConfig.bookingUrl}
                  external
                />
              )}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.24}>
          <p className="mt-12 border-t border-line pt-6 text-sm text-muted">
            [[FILL]] Booking link, if you want one. A Calendly or Cal.com URL
            here removes a round of email.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </dt>
      <dd
        className={
          href
            ? "draw-underline mt-1.5 inline-block break-all text-sm text-ink"
            : "mt-1.5 text-sm text-muted"
        }
      >
        {value}
      </dd>
    </>
  );

  return (
    <div className="bg-surface-2 px-4 py-4">
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="press block"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </div>
  );
}
