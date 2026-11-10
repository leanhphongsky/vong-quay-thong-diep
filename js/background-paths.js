/**
 * Background Paths Engine — Ported from Kokonut UI (@dorianbaffier)
 * Vanilla JavaScript High-Performance Canvas Implementation
 * Features:
 * - Fluid ribbon wave calculation across 3 depth layers
 * - Smooth entrance stroke stagger
 * - Cursor proximity deflection (parting lines)
 * - Auto theme color adaptation (Light & Dark modes)
 * - DevicePixelRatio crisp rendering
 */

(function (global) {
  const SAMPLES = 64;
  const OVERSCAN = 0.06;
  const DRAW_MS = 1400;
  const DRAW_STAGGER_MS = 40;
  const PART_RADIUS = 150;
  const PART_PUSH = 56;

  const LAYERS = [
    { width: 1, opacity: 0.18, phase: 0.6, pace: 0.7, part: 0.45 },
    { width: 1.3, opacity: 0.28, phase: 0.3, pace: 0.85, part: 0.75 },
    { width: 1.6, opacity: 0.42, phase: 0, pace: 1, part: 1 },
  ];

  const EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

  function lineY(s, u, layer, frame, shape, band) {
    const t = frame.time * layer.pace;
    const x = u * frame.width;
    const center =
      frame.height * 0.5 +
      shape.slope * (x - frame.width / 2) +
      band *
        0.1 *
        Math.sin(Math.PI * 2 * (0.75 * u + 0.1) + layer.phase + t * 0.35);
    const turn = 0.22 + 0.09 * Math.sin(t * 0.21 + layer.phase);
    const breathe = 0.3 * Math.sin(t * 0.5 + s * 4 + layer.phase);
    const twist = Math.cos(
      Math.PI * (u - turn) + s * (0.6 + breathe) + layer.phase
    );
    return center + s * shape.spread * band * twist;
  }

  function part(x, y, frame, strength) {
    const { pointer } = frame;
    if (pointer.amount < 0.001) {
      return y;
    }
    const dx = x - pointer.x;
    const dy = y - pointer.y;
    const falloff = Math.exp(-(dx * dx + dy * dy) / (PART_RADIUS * PART_RADIUS));
    const side = dy / (Math.abs(dy) + 24);
    return y + side * falloff * PART_PUSH * strength * pointer.amount;
  }

  function drawLines(ctx, frame, shape, color) {
    const { width, height } = frame;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const band = Math.min(height, width * 1.15);
    const perLayer = Math.max(1, Math.round(shape.count / LAYERS.length));
    const xs = new Float32Array(SAMPLES + 1);
    const ys = new Float32Array(SAMPLES + 1);

    LAYERS.forEach((layer, layerIndex) => {
      ctx.lineWidth = layer.width;
      for (let i = 0; i < perLayer; i++) {
        const drawn = frame.drawn[layerIndex * perLayer + i] !== undefined ? frame.drawn[layerIndex * perLayer + i] : 1;
        if (drawn <= 0) {
          continue;
        }
        const s = perLayer === 1 ? 0 : i / (perLayer - 1) - 0.5;
        const last = Math.max(1, Math.ceil(SAMPLES * drawn));
        for (let k = 0; k <= last; k++) {
          const u = -OVERSCAN + (k / SAMPLES) * (1 + OVERSCAN * 2);
          const x = u * width;
          const y = lineY(s, u, layer, frame, shape, band);
          xs[k] = x;
          ys[k] = shape.interactive ? part(x, y, frame, layer.part) : y;
        }

        ctx.globalAlpha = layer.opacity * (0.45 + 0.55 * (1 - Math.abs(s) * 2));
        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (let k = 1; k < last; k++) {
          const mx = (xs[k] + xs[k + 1]) / 2;
          const my = (ys[k] + ys[k + 1]) / 2;
          ctx.quadraticCurveTo(xs[k], ys[k], mx, my);
        }
        ctx.lineTo(xs[last], ys[last]);
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
  }

  function initBackgroundPaths(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const count = options.count || 42;
    const spread = options.spread !== undefined ? options.spread : 1;
    const angle = options.angle !== undefined ? options.angle : -8;
    const speed = options.speed !== undefined ? options.speed : 1;
    const interactive = options.interactive !== undefined ? options.interactive : true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shape = {
      count,
      spread,
      slope: Math.tan((angle * Math.PI) / 180),
      interactive: interactive && !reduceMotion,
    };

    const perLayer = Math.max(1, Math.round(count / LAYERS.length));
    const total = perLayer * LAYERS.length;
    const frame = {
      width: 0,
      height: 0,
      time: 40, // Bắt đầu ở giữa chu kỳ chuyển động để không trùng lặp
      drawn: new Array(total).fill(reduceMotion ? 1 : 0),
      pointer: { x: 0, y: 0, amount: 0, on: false },
    };

    function getCurrentColor() {
      const isDark = document.documentElement.classList.contains("dark");
      // Tự động tinh chỉnh màu phù hợp cho Sáng và Tối:
      // Chế độ sáng: Màu vàng hổ phách ấm (Amber Gold / Peach Bronze)
      // Chế độ tối: Màu vàng ánh kim vũ trụ tỏa sáng rực rỡ (Celestial Starlight Gold)
      return isDark ? "#F8C662" : "#D97706";
    }

    let color = getCurrentColor();
    let start = 0;
    let last = 0;
    let raf = 0;
    let visible = true;

    const paint = () => drawLines(ctx, frame, shape, color);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      frame.width = width;
      frame.height = height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };

    const loop = (now) => {
      raf = 0;
      if (!start) {
        start = now;
        last = now;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      frame.time += dt * speed;

      const elapsed = now - start;
      for (let i = 0; i < frame.drawn.length; i++) {
        if (frame.drawn[i] < 1) {
          const local = (elapsed - (i % perLayer) * DRAW_STAGGER_MS) / DRAW_MS;
          frame.drawn[i] = EASE_OUT(Math.min(Math.max(local, 0), 1));
        }
      }

      const { pointer } = frame;
      pointer.amount += ((pointer.on ? 1 : 0) - pointer.amount) * 0.08;
      paint();

      const settling =
        frame.drawn.some((d) => d < 1) ||
        (pointer.amount > 0.001 && !pointer.on) ||
        pointer.on;

      if (visible && (speed > 0 || settling)) {
        raf = requestAnimationFrame(loop);
      }
    };

    const play = () => {
      if (!raf && visible && !reduceMotion) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Lắng nghe di chuột toàn màn hình để rẽ các đường nét mượt mà
    const onMove = (event) => {
      if (!shape.interactive) return;
      frame.pointer.x = event.clientX;
      frame.pointer.y = event.clientY;
      frame.pointer.on = true;
      play();
    };

    const onLeave = () => {
      frame.pointer.on = false;
      play();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Lắng nghe thay đổi theme để chuyển màu ngay lập tức
    const observer = new MutationObserver(() => {
      const nextColor = getCurrentColor();
      if (nextColor !== color) {
        color = nextColor;
        paint();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden;
      if (visible) play();
    });

    play();

    return {
      destroy: () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        observer.disconnect();
      },
      setColor: (newColor) => {
        color = newColor;
        paint();
      }
    };
  }

  global.initBackgroundPaths = initBackgroundPaths;
})(window);
