import QRCode from 'qrcode';
import { SITE } from '@/data/content';

let cachedTextures: { frontImage: string; backImage: string; strapImage: string } | null = null;

export async function getCardTextures(forceRefresh = false): Promise<{
  frontImage: string;
  backImage: string;
  strapImage: string;
}> {
  if (cachedTextures && !forceRefresh) {
    return cachedTextures;
  }

  // Ensure fonts are loaded if supported
  try {
    if (document.fonts) {
      await document.fonts.ready;
    }
  } catch {
    // continue
  }

  const frontImage = await generateFrontFace();
  const backImage = await generateBackFace();
  const strapImage = generateStrap();

  cachedTextures = { frontImage, backImage, strapImage };
  return cachedTextures;
}

function generateStrap(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#1D1A26';
  ctx.fillRect(0, 0, 1200, 160);

  // Subtle border lines
  ctx.strokeStyle = 'rgba(237, 235, 230, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 1200, 160);

  // Repeated strap text
  ctx.fillStyle = 'rgba(237, 235, 230, 0.55)';
  ctx.font = '600 36px "Geist Mono Variable", monospace, sans-serif';
  ctx.textBaseline = 'middle';

  const patternText = 'RP   /   RITHICK PRASATH   /   B.TECH CSE \'28   /   ';
  let x = 10;
  while (x < 1200) {
    ctx.fillText(patternText, x, 80);
    x += ctx.measureText(patternText).width;
  }

  return canvas.toDataURL('image/png');
}

async function generateFrontFace(): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Card background: #F2F1EE (Warm paper)
  ctx.fillStyle = '#F2F1EE';
  ctx.fillRect(0, 0, 1024, 1440);

  // Subtle fine luxury grain/border inside card edge
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1024 - 40, 1440 - 40);

  // Top header labels (aligned near slot center y = 83px, keeping clamp slot clear)
  // Left: faint RP monogram
  ctx.fillStyle = 'rgba(22, 19, 28, 0.15)';
  ctx.font = '700 40px "Geist Variable", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('RP', 70, 85);

  // Right: @rp1018 handle matching reference badge
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 32px "Geist Mono Variable", monospace, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('@rp1018', 1024 - 70, 85);
  ctx.textAlign = 'left';

  // Hairline under top header
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 150);
  ctx.lineTo(1024 - 70, 150);
  ctx.stroke();

  // Try to load portrait photo (checks multiple candidate paths)
  let portraitLoaded = false;
  const candidateSources = [
    '/profile/rp-portrait.png',
    '/RP2.png',
    '/rp-portrait.png',
    '/profile/rp-portrait.jpg',
    '/RP.png'
  ];

  for (const src of candidateSources) {
    try {
      const img = new Image();
      // Do not use crossOrigin for same-origin local assets to prevent CORS failure
      img.src = src;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      console.log('[RP Portfolio] Portrait image loaded successfully from:', src);

      // Downsample large camera images for fast canvas processing
      let tw = img.naturalWidth || img.width;
      let th = img.naturalHeight || img.height;
      const maxDim = 1200;
      if (tw > maxDim || th > maxDim) {
        const scale = maxDim / Math.max(tw, th);
        tw = Math.round(tw * scale);
        th = Math.round(th * scale);
      }

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = tw;
      tempCanvas.height = th;
      const tCtx = tempCanvas.getContext('2d');

      if (tCtx) {
        tCtx.drawImage(img, 0, 0, tw, th);

        try {
          const w = tw;
          const h = th;
          const imgData = tCtx.getImageData(0, 0, w, h);
          const data = imgData.data;
          const visited = new Uint8Array(w * h);
          const queue = new Int32Array(w * h);
          let head = 0;
          let tail = 0;

          // Check if pixel is dark background outside sticker
          const isDark = (idx: number): boolean => {
            const p = idx * 4;
            return data[p] < 90 && data[p + 1] < 90 && data[p + 2] < 90;
          };

          // Seed queue with all 4 outer border pixels
          for (let x = 0; x < w; x++) {
            const top = x;
            const btm = (h - 1) * w + x;
            if (isDark(top) && !visited[top]) { visited[top] = 1; queue[tail++] = top; }
            if (isDark(btm) && !visited[btm]) { visited[btm] = 1; queue[tail++] = btm; }
          }
          for (let y = 0; y < h; y++) {
            const lft = y * w;
            const rgt = y * w + (w - 1);
            if (isDark(lft) && !visited[lft]) { visited[lft] = 1; queue[tail++] = lft; }
            if (isDark(rgt) && !visited[rgt]) { visited[rgt] = 1; queue[tail++] = rgt; }
          }

          // Flood-fill BFS: turns exterior black background transparent without touching interior dark jacket/hair
          while (head < tail) {
            const curr = queue[head++];
            const cx = curr % w;
            const cy = (curr / w) | 0;

            // Set alpha to 0
            data[curr * 4 + 3] = 0;

            // 4-way neighbors
            if (cx > 0) {
              const n = curr - 1;
              if (!visited[n] && isDark(n)) { visited[n] = 1; queue[tail++] = n; }
            }
            if (cx < w - 1) {
              const n = curr + 1;
              if (!visited[n] && isDark(n)) { visited[n] = 1; queue[tail++] = n; }
            }
            if (cy > 0) {
              const n = curr - w;
              if (!visited[n] && isDark(n)) { visited[n] = 1; queue[tail++] = n; }
            }
            if (cy < h - 1) {
              const n = curr + w;
              if (!visited[n] && isDark(n)) { visited[n] = 1; queue[tail++] = n; }
            }
          }

          tCtx.putImageData(imgData, 0, 0);
        } catch (procErr) {
          console.warn('[RP Portfolio] Canvas flood-fill notice:', procErr);
        }

        const targetH = 1440 * 0.72; // 72% height
        const aspect = tempCanvas.width / tempCanvas.height;
        const targetW = targetH * aspect;
        const drawX = (1024 - targetW) / 2;
        const drawY = 1440 - targetH - 110;

        // Soft shadow lifts the white sticker outline off the paper card
        ctx.save();
        ctx.shadowColor = 'rgba(22, 19, 28, 0.30)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 12;
        ctx.drawImage(tempCanvas, drawX, drawY, targetW, targetH);
        ctx.restore();
        portraitLoaded = true;
        break;
      }
    } catch (err) {
      console.warn('[RP Portfolio] Candidate error:', src, err);
    }
  }

  if (!portraitLoaded) {
    // Luxury geometric emblem / monogram fallback
    const centerX = 512;
    const centerY = 720;

    ctx.strokeStyle = 'rgba(22, 19, 28, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#16131C';
    ctx.font = '800 180px "Geist Variable", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RP', centerX, centerY);

    ctx.font = '500 32px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillStyle = '#6E6B78';
    ctx.fillText('IDENTITY VERIFIED', centerX, centerY + 140);
  }

  // Bottom-left info
  ctx.textAlign = 'left';
  ctx.fillStyle = '#16131C';
  ctx.font = '600 32px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('RITHICK PRASATH', 70, 1330);

  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 24px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('DEVELOPER & CSE STUDENT', 70, 1370);

  // Bottom-right signature barcode decoration
  ctx.fillStyle = 'rgba(22, 19, 28, 0.25)';
  const barX = 1024 - 240;
  const barY = 1320;
  for (let i = 0; i < 28; i++) {
    const w = (i % 3 === 0) ? 5 : (i % 2 === 0 ? 3 : 2);
    ctx.fillRect(barX + i * 6, barY, w, 44);
  }

  return canvas.toDataURL('image/png');
}

async function generateBackFace(): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background #F2F1EE
  ctx.fillStyle = '#F2F1EE';
  ctx.fillRect(0, 0, 1024, 1440);

  // Subtle border
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 1024 - 40, 1440 - 40);

  // Top header: keep 200px clear for clamp
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 26px "Geist Mono Variable", monospace, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('COMMUNICATION & IDENTITY', 70, 85);

  ctx.strokeStyle = 'rgba(22, 19, 28, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, 150);
  ctx.lineTo(1024 - 70, 150);
  ctx.stroke();

  // Heading: "Let's talk."
  ctx.fillStyle = '#16131C';
  ctx.font = '700 96px "Geist Variable", sans-serif';
  ctx.fillText("Let's talk.", 70, 280);

  // Contact detail rows
  const rows = [
    { label: 'EMAIL', value: SITE.email },
    { label: 'LINKEDIN', value: SITE.linkedin },
    { label: 'GITHUB', value: SITE.github },
    { label: 'RESUME', value: `${SITE.url.replace(/^https?:\/\//, '')}/resume.pdf` },
    { label: 'LOCATION', value: SITE.location },
  ];

  let currentY = 400;
  rows.forEach((row) => {
    // Divider line
    ctx.strokeStyle = 'rgba(22, 19, 28, 0.10)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, currentY);
    ctx.lineTo(1024 - 70, currentY);
    ctx.stroke();

    currentY += 40;

    // Label
    ctx.fillStyle = '#6E6B78';
    ctx.font = '600 24px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText(row.label, 70, currentY);

    // Value
    ctx.fillStyle = '#16131C';
    ctx.font = '500 28px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText(row.value, 260, currentY);

    currentY += 50;
  });

  // Final divider line
  ctx.strokeStyle = 'rgba(22, 19, 28, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(70, currentY);
  ctx.lineTo(1024 - 70, currentY);
  ctx.stroke();

  // Generate QR code of SITE.url
  try {
    const qrCanvas = document.createElement('canvas');
    await QRCode.toCanvas(qrCanvas, SITE.url, {
      width: 280,
      margin: 1,
      color: {
        dark: '#16131C',
        light: '#F2F1EE',
      },
    });

    const qrX = 1024 - 360;
    const qrY = 1440 - 400;

    // QR container frame
    ctx.strokeStyle = 'rgba(22, 19, 28, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX - 10, qrY - 10, 300, 300);

    ctx.drawImage(qrCanvas, qrX, qrY, 280, 280);

    ctx.fillStyle = '#6E6B78';
    ctx.font = '500 20px "Geist Mono Variable", monospace, sans-serif';
    ctx.fillText('SCAN FOR DIGITAL CARD', qrX - 10, qrY + 325);
  } catch (err) {
    console.error('QR code generation error:', err);
  }

  // Bottom notice
  ctx.fillStyle = '#6E6B78';
  ctx.font = '500 22px "Geist Mono Variable", monospace, sans-serif';
  ctx.fillText('RITHICK PRASATH — PORTFOLIO 2026', 70, 1370);

  return canvas.toDataURL('image/png');
}
