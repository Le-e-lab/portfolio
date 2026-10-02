#!/usr/bin/env bash
# Rasterise public/icon.svg into the icon sizes the site ships.
#
# Favicons get hand-edited by accident, so the SVG in public/ is the only
# source of truth and every PNG below is generated from it.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=public/icon.svg

command -v rsvg-convert >/dev/null || { echo "rsvg-convert required" >&2; exit 1; }

# size:output — the favicon set, plus apple-touch-icon for iOS home screens.
for pair in 16:public/favicon-16x16.png 32:public/favicon-32x32.png \
            192:public/favicon-192.png 512:public/favicon-512.png \
            180:public/apple-touch-icon.png; do
  size="${pair%%:*}"
  out="${pair##*:}"
  rsvg-convert -w "$size" -h "$size" --background-color=none "$SRC" -o "$out"
  echo "  $out  ${size}x${size}"
done

# .ico for /favicon.ico, which is what browsers probe when no <link rel="icon">
# is present and what /favicon.ico requests always resolve to. An ICO may embed
# PNG payloads directly, so no encoder dependency is needed.
node scripts/build-ico.mjs src/app/favicon.ico public/favicon-16x16.png public/favicon-32x32.png
echo "  src/app/favicon.ico  (16+32)"
