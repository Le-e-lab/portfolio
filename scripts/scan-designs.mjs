// Scans public/images/design/ and regenerates public/design-projects.json.
// Drop exported designs (from Canva, Figma, etc.) into:
//   public/images/design/<category>/<name>.png|jpg|jpeg|webp
// Folder name = category ("logo", "brand-identity", "poster" ...), filename = title (dashes → spaces).
// ponytail: file-drop workflow instead of a Canva API integration — Canva's API needs an app
// + OAuth review; for a personal portfolio, exporting images is the lean path. If you later
// want true sync, a scheduled GitHub Action could re-export via Canva Connect API.
import { readdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const root = process.argv[2] || '.';
const imgDir = join(root, 'public', 'images', 'design');
const outFile = join(root, 'public', 'design-projects.json');

const EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const EXT_RE = new RegExp(`\\${[...EXTS].join('|\\')}$`, 'i');

const projects = [];
if (existsSync(imgDir)) {
  const categories = readdirSync(imgDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const cat of categories) {
    const catDir = join(imgDir, cat);
    const files = readdirSync(catDir).filter(f => EXT_RE.test(f));
    for (const f of files) {
      const title = basename(f, extname(f)).replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      projects.push({
        title,
        category: cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        description: '',
        image: `/portfolio/images/design/${cat}/${f}`,
        featured: false,
      });
    }
  }
}

const existing = existsSync(outFile) ? JSON.parse(readFileSync(outFile)) : null;
// Carry over description/featured onto the new scan by matching BASENAME,
// so moving files between folders doesn't lose metadata.
if (existing?.projects) {
  for (const old of existing.projects) {
    const oldBase = basename(old.image).toLowerCase();
    const match = projects.find(p => basename(p.image).toLowerCase() === oldBase);
    if (match) { if (old.description) match.description = old.description; match.featured = old.featured; }
  }
}

writeFileSync(outFile, JSON.stringify({ projects: projects }, null, 2) + '\n');
console.log(`Scanned ${projects.length} design projects → ${outFile}`);