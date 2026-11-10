// ============================================================
// STORY GENERATOR — Tạo ảnh Story 9:16 (1080x1920) chuẩn Instagram/TikTok/Zalo
// ============================================================

async function generateStoryCard({ message, userName = 'Bạn', dateStr, note = '' }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // 1. Background Gradient Sang Trọng
  const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
  bgGrad.addColorStop(0, '#121426');
  bgGrad.addColorStop(0.3, '#1E223D');
  bgGrad.addColorStop(0.7, '#2D274A');
  bgGrad.addColorStop(1, '#1A1829');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Tinh vân và bụi sao phát sáng (Celestial Glow)
  ctx.save();
  const aura = ctx.createRadialGradient(540, 750, 50, 540, 750, 600);
  aura.addColorStop(0, 'rgba(233, 196, 106, 0.25)');
  aura.addColorStop(0.5, 'rgba(224, 122, 95, 0.12)');
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aura;
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.restore();

  // 3. Viền Khung Vàng Hoàng Kim Đôi
  ctx.save();
  ctx.strokeStyle = '#E9C46A';
  ctx.lineWidth = 4;
  ctx.strokeRect(60, 60, 960, 1800);

  ctx.strokeStyle = 'rgba(233, 196, 106, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(76, 76, 928, 1768);

  // Hoa văn 4 góc
  const corners = [
    [60, 60], [1020, 60], [60, 1860], [1020, 1860]
  ];
  ctx.fillStyle = '#E9C46A';
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 4. Header: Logo & Tên Trang Web
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E9C46A';
  ctx.font = 'bold 36px "Playfair Display", serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('VÒNG QUAY THÔNG ĐIỆP', 540, 160);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.font = '500 24px "Nunito", sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('MỖI NGÀY MỘT THÔNG ĐIỆP TỪ VŨ TRỤ', 540, 205);

  // Đường kẻ trang trí vàng
  ctx.strokeStyle = 'rgba(233, 196, 106, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(380, 235);
  ctx.lineTo(700, 235);
  ctx.stroke();

  // Biểu tượng ngôi sao nhỏ giữa vạch kẻ
  ctx.fillStyle = '#E9C46A';
  ctx.font = '20px serif';
  ctx.fillText('✦', 540, 242);
  ctx.restore();

  // 5. Ngày nhận thông điệp & Lời đề tặng
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F4A47A';
  ctx.font = '600 26px "Nunito", sans-serif';
  const displayDate = dateStr || new Date().toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
  ctx.fillText(`📅 ${displayDate}`, 540, 310);
  ctx.restore();

  // 6. Vẽ Ảnh Thông Điệp vào trung tâm
  const imgPath = `images/${String(message.id).padStart(2, '0')}.png`;
  await new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.save();
      const imgW = 680;
      const imgH = 900;
      const imgX = (1080 - imgW) / 2;
      const imgY = 370;

      // Bóng mờ sang trọng cho ảnh
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 35;
      ctx.shadowOffsetY = 15;

      // Bo góc ảnh (Rounded Rect)
      const r = 24;
      ctx.beginPath();
      ctx.moveTo(imgX + r, imgY);
      ctx.lineTo(imgX + imgW - r, imgY);
      ctx.quadraticCurveTo(imgX + imgW, imgY, imgX + imgW, imgY + r);
      ctx.lineTo(imgX + imgW, imgY + imgH - r);
      ctx.quadraticCurveTo(imgX + imgW, imgY + imgH, imgX + imgW - r, imgY + imgH);
      ctx.lineTo(imgX + r, imgY + imgH);
      ctx.quadraticCurveTo(imgX, imgY + imgH, imgX, imgY + imgH - r);
      ctx.lineTo(imgX, imgY + r);
      ctx.quadraticCurveTo(imgX, imgY, imgX + r, imgY);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      ctx.restore();
      resolve();
    };
    img.onerror = () => resolve(); // Nếu không tải được ảnh thì vẫn vẽ tiếp phần chữ
    img.src = imgPath;
  });

  // 7. Tên Thông Điệp
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 50px "Playfair Display", serif';
  ctx.shadowColor = 'rgba(233, 196, 106, 0.6)';
  ctx.shadowBlur = 20;
  ctx.fillText(message.name.toUpperCase(), 540, 1370);
  ctx.restore();

  // 8. Trích dẫn câu nói (Wrap Text)
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
  ctx.font = '32px "Nunito", sans-serif';

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        context.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line.trim(), x, currentY);
    return currentY;
  }

  const endDescY = wrapText(ctx, `"${message.desc}"`, 540, 1450, 840, 48);
  ctx.restore();

  // 9. Gợi ý hành động hoặc Ghi chú cá nhân
  ctx.save();
  ctx.textAlign = 'center';
  if (message.action) {
    ctx.fillStyle = '#E9C46A';
    ctx.font = 'bold 24px "Nunito", sans-serif';
    ctx.fillText('✨ HÀNH ĐỘNG HÔM NAY', 540, endDescY + 65);

    ctx.fillStyle = 'rgba(244, 164, 122, 0.95)';
    ctx.font = 'italic 26px "Nunito", sans-serif';
    wrapText(ctx, message.action, 540, endDescY + 105, 820, 38);
  }
  ctx.restore();

  // 10. Footer / Chữ ký
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = '500 22px "Nunito", sans-serif';
  ctx.fillText(`Lá thư từ vũ trụ gửi đến ${userName} · vong-quay-thong-diep.vercel.app`, 540, 1820);
  ctx.restore();

  return canvas.toDataURL('image/png');
}
