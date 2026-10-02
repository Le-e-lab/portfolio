#!/usr/bin/env bash
# Publish the static export to the branch GitHub Pages serves.
#
# Pages for this repo reads the gh-pages branch (that is why it can already
# serve lesley.runs-on.dev via public/CNAME), so the deploy is a push to that
# branch rather than a Pages-API call. Doing it in a scratch directory keeps
# the generated site out of the working tree and out of main's history.
#
# Requires GH_TOKEN with contents:write. Locally, use a fine-grained token.
set -euo pipefail

: "${GH_TOKEN:?GH_TOKEN is required to push to gh-pages}"
: "${NEXT_PUBLIC_SITE_URL:=https://lesley.runs-on.dev}"

echo "==> building static export for $NEXT_PUBLIC_SITE_URL"
pnpm run build:pages

# out/.nojekyll stops the Pages Jekyll build from discarding _next/.
if [ ! -f out/.nojekyll ]; then
  echo "!! out/.nojekyll missing; Pages would strip _next/" >&2
  exit 1
fi

REPO="${GITHUB_REPOSITORY:-$(git config --get remote.origin.url | sed -E 's#.*github.com[:/]([^/]+/[^.]+)(.git)?#\1#')}"
BRANCH="${PAGES_BRANCH:-gh-pages}"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "==> staging $(find out -type f | wc -l) files"
cp -r out/. "$STAGE/"

cd "$STAGE"
git init -q
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
git commit -qm "deploy: static export [skip ci]"

# gh-pages is a generated artifact branch, so rewriting it is the point.
echo "==> pushing to $REPO ($BRANCH)"
git push --force -q "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "HEAD:${BRANCH}"

echo "==> live at ${NEXT_PUBLIC_SITE_URL}"
