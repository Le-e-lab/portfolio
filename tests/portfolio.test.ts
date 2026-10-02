import assert from "node:assert/strict";
import { test } from "node:test";

import { getAllWork, getWork, getWorkSlugs } from "@/lib/work";
import { heatLevel } from "@/lib/heat";
import { IMAGE_SLOTS, type ImageSlotDef } from "@/lib/images.manifest";

/**
 * These cover the pure logic that has actually broken before. No framework,
 * no mocks: node:test plus tsx, both already in the repo.
 */

test("every case study parses and frontmatter validates", () => {
  const slugs = getWorkSlugs();
  assert.equal(slugs.length, 5, "expected five case studies");
  for (const slug of slugs) {
    const entry = getWork(slug);
    assert.ok(entry, `${slug} should resolve`);
    assert.equal(entry!.meta.slug, slug, "slug must match filename");
    assert.ok(entry!.meta.stack.length > 0, `${slug} needs a stack`);
    assert.ok(entry!.meta.summary.length > 0, `${slug} needs a summary`);
  }
});

/**
 * Regression guard. MDX compiles the case study body verbatim, so an owner
 * marker written as prose rendered as literal visitor-facing text. It shipped
 * 8 times on KreditZW and 6 on Job-Agent before this was caught.
 *
 * The marker is allowed to live in the source, but only inside an MDX comment.
 * So strip every comment and assert the remaining prose is clean. That is the
 * invariant that stops a marker leaking into a rendered page.
 */
test("no owner marker sits in prose rather than an MDX comment", () => {
  for (const slug of getWorkSlugs()) {
    const { content } = getWork(slug)!;
    // Keep the comment bodies, drop the comment syntax, and check that what is
    // left has no marker.
    const prose = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");

    assert.ok(
      !prose.includes("[[FILL"),
      `${slug} has [[FILL in prose. Wrap owner prompts in {/* ... */}.`,
    );
    assert.ok(
      !prose.includes("TODO(owner)"),
      `${slug} has TODO(owner) in prose. Wrap owner prompts in {/* ... */}.`,
    );
    assert.ok(
      !content.includes("<!--"),
      `${slug} uses an HTML comment. MDX v3 rejects <!-- -->, use {/* */}.`,
    );
    // An unterminated comment would swallow the rest of the page.
    assert.equal(
      (content.match(/\{\/\*/g) || []).length,
      (content.match(/\*\/\}/g) || []).length,
      `${slug} has an unbalanced MDX comment`,
    );
  }
});

/** An unwritten case study used to render three bare headings. */
test("no case study renders a heading with no content under it", () => {
  for (const slug of getWorkSlugs()) {
    const content = getWork(slug)!.content;
    assert.ok(
      !/\n##\s+[^\n]*\n\s*##/s.test(content),
      `${slug} has an empty section. write.ts drops headings with no prose.`,
    );
  }
});

test("every case study has all three sections written", () => {
  for (const { slug } of getAllWork()) {
    const content = getWork(slug)!.content;
    for (const heading of ["## Problem", "## Process", "## Result"]) {
      assert.ok(content.includes(heading), `${slug} is missing ${heading}`);
    }
  }
});

test("links are absolute URLs or the array is empty", () => {
  for (const { slug, links } of getAllWork()) {
    for (const link of links) {
      assert.ok(
        /^https?:\/\//.test(link.url),
        `${slug} link "${link.label}" must be an absolute URL, got ${link.url}`,
      );
    }
  }
});

test("heatLevel buckets and guards against a zero max", () => {
  assert.equal(heatLevel(0, 100), 0, "no activity is level 0");
  assert.equal(heatLevel(5, 0), 0, "a zero max must not divide by zero");
  assert.equal(heatLevel(-1, 100), 0, "negative counts are level 0");

  assert.equal(heatLevel(25, 100), 1, "0.25 is inclusive at the low edge");
  assert.equal(heatLevel(26, 100), 2);
  assert.equal(heatLevel(50, 100), 2, "0.5 is inclusive");
  assert.equal(heatLevel(51, 100), 3);
  assert.equal(heatLevel(75, 100), 3, "0.75 is inclusive");
  assert.equal(heatLevel(76, 100), 4);
});

/**
 * images.check.ts is deliberately not tested here: it imports src/lib/images.ts,
 * which imports .webp files, and plain Node cannot load that extension. Only
 * webpack can. The invariants it guards are checked against the manifest, which
 * has no image imports.
 */
test("every image slot has usable alt text and a caption", () => {
  // Cast to the declared type: the literal object narrows to a union of exact
  // shapes, where `caption` only exists on the slots that declare it.
  const slots = Object.entries(IMAGE_SLOTS) as [string, ImageSlotDef][];
  for (const [id, slot] of slots) {
    assert.ok(slot.alt.trim().length > 0, `${id} has empty alt text`);
    assert.match(slot.ratio, /^\d+ \/ \d+$/, `${id} has a malformed ratio`);
    assert.ok(slot.minWidth > 0 && slot.minHeight > 0, `${id} has no minimum size`);
    // Caption is optional in the type; where it exists it must carry text.
    if (slot.caption !== undefined) {
      assert.ok(slot.caption.trim().length > 0, `${id} has an empty caption`);
      assert.ok(
        !/^Fig\.\s*\d+:\s*$/.test(slot.caption),
        `${id} caption is a bare label with no description`,
      );
    }
  }
});

test("the slots strictImages still gates on are the owner-owed ones", () => {
  const owed = Object.values(IMAGE_SLOTS)
    .filter((s) => s.required && s.alt.includes("[[FILL"))
    .map((s) => s.id)
    .sort();
  assert.deepEqual(
    owed,
    [
      "about-candid",
      "about-gym",
      "about-headshot",
      "about-workspace",
      "food-1",
      "food-2",
      "food-3",
      "food-4",
    ],
    "the four About and four food photos are still owed. Update this when they land.",
  );
});
