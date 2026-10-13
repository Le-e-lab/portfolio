# Asset prompts for Gemini

Prompts for the images the site still owes. Each section names the slot it
fills, the size it needs and how to finish the file.

## Before you start

- **Gemini image generation makes stills, not animations.** For motion, make
  the still first, then use **Veo** (Gemini app → Video) with the still as the
  first frame. Veo gives an 8-second MP4.
- **Loop and compress every clip** before it goes in the repo:

  ```bash
  ffmpeg -i clip.mp4 -t 4 -vf "scale=720:-2,fps=24" -an -c:v libvpx-vp9 -b:v 0 -crf 38 out.webm
  ffmpeg -i clip.mp4 -t 4 -vf "scale=720:-2,fps=24" -an -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart out.mp4
  ```

  Keep each loop **under 600 KB**. Ship WebM/MP4, not GIF: a GIF is 5–10× larger.
- **Stills** export to WebP: `cwebp -q 82 in.png -o out.webp`.
- **Keep it in the site palette.** Background near-black `#0b0b0a`, accent
  orange-red `#ff4f2b`, warm off-white `#efede6`. No neon, no glow, no
  gradients. Paste this tail onto every prompt:

  > Dark near-black background (#0b0b0a), single orange-red accent (#ff4f2b),
  > warm off-white highlights. Flat studio lighting, no glow, no lens flare,
  > no gradients, no text, no watermark.

- **Don't copy other people's IP.** No Dragon Ball characters, no Mercedes or
  Ferrari liveries, no Lewis Hamilton likeness. Use the *feeling* (energy
  aura, speed, a number 44 nod) without the trademark. The prompts below already
  avoid it.
- **Every image needs alt text before it ships.** Tell Claude what is in the
  picture and it goes into `src/lib/images.manifest.ts`.

---

## 1. Mascot: "Pit", a small 3D robot

Why a robot: it's a full-stack dev site, so a built thing fits, and it can wear
your interests as props without becoming a fan-art collage. Pit sits in
*Off the clock*, on the 404 page and as a small reaction next to the contact
form. It stays out of the hero, where the ID card already does that job.

**Base character (Gemini still, 1:1, 1024×1024):**

> 3D character render of a small, chunky robot mascot, about two heads tall.
> Matte off-white plastic body with orange-red (#ff4f2b) panel accents, a
> rounded-rectangle visor face with two flat white dot eyes,
> short stubby arms and legs, a tiny antenna. Soft clay-like Pixar-style
> materials, subtle bevels, slight subsurface. Standing front three-quarter
> view, neutral friendly pose, centred with space around it. Dark near-black
> background (#0b0b0a). Flat studio lighting, no glow, no gradients, no text.

Regenerate until you like one, then **reuse that exact image as the reference**
for every pose below ("same character as the reference image").

**Poses (Veo, first frame = base still, 4 s loop):**

| File | Prompt |
| --- | --- |
| `pit-idle` | Same robot breathing gently, visor eyes blink once, antenna sways slightly. Camera locked, seamless loop. |
| `pit-wave` | Same robot raises its right arm and waves twice, then returns to rest. Camera locked. |
| `pit-race` | Same robot wearing a plain orange-red racing helmet with a small white "44", crouched as if on a start line, then bursts forward a step. Camera locked. |
| `pit-train` | Same robot skipping rope at a steady rhythm, rope blurring, small hop each turn. Camera locked, seamless loop. |
| `pit-power` | Same robot clenches its fists and powers up: a soft off-white energy outline flickers around its body, antenna trembles. No fire, no glow bloom. Camera locked. |
| `pit-eat` | Same robot holding a small bowl and chopsticks, takes a bite, eyes squint happily. Camera locked. |
| `pit-lost` (404) | Same robot holding a paper map upside down, looks left, looks right, shrugs. Camera locked. |

---

## 2. Off the clock: one loop per interest

Each block gets one square loop, **1:1, 720×720**, and it plays only on screen,
muted and inline.

**01 · Formula 1**
> Low, close 3D shot of a generic open-wheel race car's front wing and tyre
> on a dark track at night, sparks skimming off the floor, motion-blurred
> track lines. No team branding, no logos, orange-red accent on the nose.
> + palette tail

**02 · Calisthenics** (fills `about-gym`, 4:5. Use a real photo of yourself if you can, it beats AI here.)
> Silhouette of a man doing slow, controlled push-ups on a concrete floor,
> a skipping rope coiled beside him, side view, rim-lit in warm off-white.
> + palette tail

**03 · Food** (four stills, `food-1`…`food-4`, 1:1, 1000×1000. Swap in dishes you have actually eaten.)
> Top-down studio photo of [dish] on a matte black ceramic plate, single
> orange-red garnish, nothing else in frame. + palette tail

**04 · Anime**
> Stylised 3D render of a clenched fist with crackling off-white energy
> streaks and floating rock debris rising around it, low angle, dramatic.
> Original design, not any existing character. + palette tail

**05 · Side projects (GDSC platform)**
> Isometric 3D model of a small open laptop showing an abstract course-card
> grid, with tiny floating calendar and chat-bubble shapes orbiting slowly.
> + palette tail

---

## 3. About section stills (photos beat AI here)

These four slots are photos of *you*. AI faces of you will look off, and
recruiters notice. Use real photos where possible:

| Slot | Ratio / min size | Shot |
| --- | --- | --- |
| `about-headshot` | 4:5, 1200×1500 | Plain headshot, dark top, window light |
| `about-workspace` | 3:2, 1800×1200 | Your actual desk/setup |
| `about-gym` | 4:5, 1200×1500 | Mid-set, skipping or push-ups |
| `about-candid` | 1:1, 1200×1200 | Anything unposed |

Drop finished files in `src/assets/images/` and send Claude the alt text.
Video loops need a small `<video>` slot added to the site first. Ask for it
when the first clip is ready.
