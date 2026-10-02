import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createSolidPNG(width, height, r, g, b, a = 255) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9);
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);

    const crc = crc32(Buffer.concat([Buffer.from(type), data]));
    buf.writeUInt32BE(crc >>> 0, 8 + len);
    return buf;
  }

  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isInner = dist < (width * 0.45);
      
      if (isInner) {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      } else {
        rawData[pxOffset] = Math.max(15, r - 30);
        rawData[pxOffset + 1] = Math.max(23, g - 40);
        rawData[pxOffset + 2] = Math.max(42, b - 50);
        rawData[pxOffset + 3] = a;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  let c = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
  }
  return (c ^ (-1)) >>> 0;
}

const outDir = path.join(__dirname, '../public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), createSolidPNG(192, 192, 37, 99, 235));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), createSolidPNG(512, 512, 37, 99, 235));
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), createSolidPNG(512, 512, 37, 99, 235));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createSolidPNG(180, 180, 37, 99, 235));

console.log('PNG Icons successfully generated in public/ folder!');
