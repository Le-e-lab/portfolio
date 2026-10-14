# Asset prompts for Gemini

Prompts for the images the site still owes. Each section names the slot it
fills, the size it needs and how to finish the file.

## Before you start

- **Gemini image generation makes stills, not animations.** For motion, make
  the still first, then use **Veo** (Gemini app → Video) with the still as the
  first frame. Veo gives a 10-second 1280×720 MP4.
- **Loop and compress every clip** before it goes in the repo:

  ```bash
  ffmpeg -i clip.mp4 -t 4 -vf "scale=720:-2,fps=24" -an -c:v libvpx-vp9 -b:v 0 -crf 38 out.webm
  ffmpeg -i clip.mp4 -t 4 -vf "scale=720:-2,fps=24" -an -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart out.mp4
  ```

  Keep each loop **under 600 KB**. Ship WebM/MP4, not GIF: a GIF is 5–10× larger.
- **Stills** export to WebP: `cwebp -q 82 in.png -o out.webp`.
- **Keep it in the site palette.** Background near-black `#0b0a09`, accent
  orange-red `#ff4d2e`, warm off-white `#f0ede6`. No neon, no glow, no
  gradients. Paste this tail onto every prompt:

  > Dark near-black background (#0b0a09), single orange-red accent (#ff4d2e),
  > warm off-white highlights. Flat studio lighting, no glow, no lens flare,
  > no gradients, no text, no watermark.

- **Don't copy other people's IP.** No Dragon Ball characters, no Mercedes or
  Ferrari liveries, no Lewis Hamilton likeness. Use the *feeling* (energy
  aura, speed, a number 44 nod) without the trademark. The prompts below already
  avoid it.
- **Every image needs alt text before it ships.** Tell Claude what is in the
  picture and it goes into `src/lib/images.manifest.ts`.

---

## 1. Mascot: "Pit"

Pit already lives on the site: he waves beside your name once per visit,
idles in the corner after a quiet minute and waves back when touched, and
idles on the 404 page. You design him in Gemini, animate him in Veo, and
hand the raw files over. No drawing or 3D skills needed.

### Step 0: redesign or keep?

**Redesigning means remaking every clip.** The site swaps between his idle
and wave clips, so if the wave shows the new Pit and the idle shows the old
one, he visibly changes into a different robot. A redesign is a set: base
still, `pit-idle` and `pit-wave` at minimum, all from the same new still.
If you only want new moves, skip to Step 3 and use your current Pit still.

### Step 1: design him (Gemini, stills only)

Start from the base prompt, then change **one thing per message** and say
"keep everything else the same". Changing several things at once makes
Gemini redraw him from scratch.

**The idea: Pit is a mini racing driver.** His name already fits (pit
lane, pit crew). His head *is* a racing helmet and the visor is his face, so
the helmet's eyes replace the robot's. He stands on his own two feet in a
little race suit, which keeps every placement on the site working: a kart or
car-shaped Pit would need new crops everywhere and reads too close to
Pixar's *Cars*.

**Two rules every style below follows, because of how the site shows him:**

- **Mostly light colours.** The site blends him into the page with
  `lighten`, so anything close to black (black tyres, a black suit) turns
  see-through and the text behind shows through it. Keep the suit and helmet
  off-white or orange-red; a dark visor is fine, that's his face.
- **No real team, sponsor or driver.** No team colours, no real sponsor
  logos, no real driver's helmet design or number. Pick **your own number**
  (a birthday, a lucky number) and use it everywhere.

**Shared start of every prompt (1:1):**

> Full-body 3D character of a tiny racing driver mascot, about two heads
> tall: an oversized rounded racing helmet for a head, the dark visor is his
> face with two flat white dot eyes showing through, a small chunky race suit,
> stubby arms and legs, racing gloves and boots. Race number [YOUR NUMBER] on
> his chest. Standing front three-quarter view, neutral friendly pose,
> centred with empty space around him. Plain flat near-black background
> (#0b0a09). Flat studio lighting, no glow, no gradients, no other text, no
> real team or sponsor logos.

Then add **one** of these style endings. Each is a different look; try all
four and compare them side by side.

**A. Collectible vinyl toy** *(my pick)*
> Styled as a designer vinyl collectible figure: smooth matte vinyl, visible
> part seams at the neck and shoulders, slightly glossy helmet, off-white suit
> with orange-red (#ff4d2e) side panels and stitching.

Why: it looks like a real object you could hold rather than generic AI
"Pixar clay", and the seams and gloss read well even at 120px.

**B. Wind-tunnel clay model**
> Styled as an F1 wind-tunnel scale model: the whole body sculpted in matte
> light-grey modelling clay with crisp tool marks, orange-red (#ff4d2e) tape
> strips marking panel lines, small white measurement stickers. A
> work-in-progress engineering prototype.

Why: the most unusual of the four, and it's an engineer's nod (aero teams
really do test clay models). Risk: grey can look dull on a dark page.

**C. Personal helmet art**
> Off-white suit, and the helmet carries a custom hand-painted design like a
> driver's personal helmet art: orange-red (#ff4d2e) and warm off-white
> (#f0ede6) bold geometric shapes, a thin stripe across the top, glossy
> clear-coat finish.

Why: drivers design their own helmets, so this is the most "yours". Tell
Gemini what to put on it (a shape, your initials, a pattern) and it becomes
your own livery.

**D. Wind-up tin toy**
> Styled as a vintage wind-up tin toy: printed lithographed tin with slightly
> worn edges, visible rivets, a small metal wind-up key in his back,
> off-white body with orange-red (#ff4d2e) printed details.

Why: charming, and the wind-up key gives free animation ideas (he winds up,
then zooms). Risk: printed tin can come out busy; ask for "simple, few
details" if it does.

**Once you have a favourite, change one thing per message:**

- Head: "helmet 20% bigger" (big heads read better when he's small)
- Eyes: "eyes as two short horizontal lines" / "eyes as small arcs, smiling"
- Pose: "one hand on his hip, confident"
- Details: "a small orange-red antenna on top of the helmet, like a radio
  aerial", "a little skipping rope looped over one shoulder"

**Pick him by looking at him small.** Shrink the image to thumb size. If you
can't read his face and his pose at that size, keep going.

### Step 2: lock him in

Once you like one, ask for a character sheet in the same chat so later
images stay consistent:

> Same character as the image above, character turnaround sheet: front, side,
> back, three-quarter. Same proportions, materials and colours, plain
> near-black background, no text.

Save the chosen base still as `pit-base.png`. Every Veo clip starts from it.

### Step 3: animate him (Veo)

In Veo, upload `pit-base.png` as the **first frame**, then the prompt. The
site needs every clip to follow these rules, or I can't cut it to fit:

- **Same framing as the still.** Full body, centred, camera locked. No zoom,
  pan or cut.
- **Start and end on his rest pose.** The site swaps clips mid-play; matching
  first and last frames is what makes the swap invisible.
- **Plain background, nothing else in frame.** No props flying off-screen,
  no shadows on a floor, no text.

Add this tail to every Veo prompt:

> Camera locked, no camera movement. Plain flat near-black background. He
> starts and ends standing in the same neutral pose as the first frame.

| File | Where it shows | Prompt |
| --- | --- | --- |
| `pit-idle` (**needed**) | corner after a quiet minute, 404 page | He breathes gently, blinks twice, antenna sways a little, looks straight at the camera. Seamless loop. |
| `pit-wave` (**needed**) | hero "hey", touch reaction | He raises his right arm high and gives a big, happy wave toward the camera, then lowers it. |
| `pit-poke` (nice to have) | when someone touches him | He flinches as if tapped, eyes go wide, a small hop, then he laughs and gives a quick wave. |
| `pit-race` | later | He drops into a crouch as if on a start grid, revs with his fists, bursts forward one step and stops. |
| `pit-train` | later | He skips rope at a steady rhythm, small hop each turn. Seamless loop. |
| `pit-eat` | later | He holds a small bowl and chopsticks, takes a bite, eyes squint happily. |
| `pit-lost` | 404 page | He holds a paper map upside down, looks left, looks right, shrugs. |

Make each clip a few times and keep the best. A take where he drifts
sideways or the camera moves won't fit the site.

### Step 4: hand over

Drop the raw Veo MP4s in `images/` (it's gitignored) named as in the table,
e.g. `images/pit-poke.mp4`, and tell Claude. Claude crops, grades the
background to the page colour, compresses and wires them in.

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
