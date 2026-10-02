// Pack PNG files into a single .ico. The Vista-era format allows a PNG payload
// per entry, so this needs no image encoder — just a 6-byte directory header,
// a 16-byte entry per image, and the PNG bytes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [, , outPath, ...inputs] = process.argv;
if (!outPath || inputs.length === 0) {
  console.error("usage: node build-ico.mjs <out.ico> <in.png> [in.png ...]");
  process.exit(1);
}

const images = inputs.map((path) => {
  const data = readFileSync(path);
  // Width and height live in the IHDR chunk, at a fixed offset.
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width > 256 || height > 256) {
    throw new Error(`${path} is ${width}x${height}; ICO entries cap at 256`);
  }
  // 0 means 256 in the single-byte size fields.
  return { data, size: width === height ? width : Math.max(width, height) };
});

const HEADER = 6;
const ENTRY = 16;
const tableSize = HEADER + ENTRY * images.length;

const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(images.length, 4);

let offset = tableSize;
const entries = images.map((img) => {
  const entry = Buffer.alloc(ENTRY);
  entry.writeUInt8(img.size === 256 ? 0 : img.size, 0); // width
  entry.writeUInt8(img.size === 256 ? 0 : img.size, 1); // height
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(img.data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += img.data.length;
  return entry;
});

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.concat([header, ...entries, ...images.map((i) => i.data)]));
console.log(`  ${outPath}  ${images.length} entries (${images.map((i) => i.size).join(", ")})`);
