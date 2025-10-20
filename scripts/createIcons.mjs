import { createWriteStream } from 'fs';
import { createCanvas } from 'canvas';

function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(1, '#1e40af');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Medical Cross
  ctx.fillStyle = 'white';
  const crossSize = size * 0.55;
  const barWidth = size * 0.16;
  const centerX = size / 2;
  const centerY = size / 2;

  // Vertical bar
  ctx.fillRect(centerX - barWidth / 2, centerY - crossSize / 2, barWidth, crossSize);
  // Horizontal bar
  ctx.fillRect(centerX - crossSize / 2, centerY - barWidth / 2, crossSize, barWidth);

  // IPP Text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.16}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('IPP', centerX, size * 0.82);

  // CNAS Badge
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(size * 0.78, size * 0.22, size * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.063}px Arial`;
  ctx.fillText('DZ', size * 0.78, size * 0.22);

  // Save
  const out = createWriteStream(filename);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log(`Created ${filename}`));
}

createIcon(192, 'public/icons/icon-192x192.png');
createIcon(512, 'public/icons/icon-512x512.png');
createIcon(180, 'public/icons/apple-touch-icon.png');
