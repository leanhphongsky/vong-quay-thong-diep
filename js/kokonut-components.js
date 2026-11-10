/**
 * ============================================================================
 * KOKONUT UI - COMPONENT RUNTIME ENGINE
 * Faithful browser implementation of the Kokonut UI shadcn registry components:
 * 1. MorphicNavbar (Split Nav) - https://kokonutui.com/r/morphic-navbar.json
 * 2. LiquidGlassCard & NowPlaying - https://kokonutui.com/r/liquid-glass-card.json
 * 3. CardFlip (Flick Card) - https://kokonutui.com/r/card-flip.json
 * 4. CardStack (Throw Deck) - https://kokonutui.com/r/card-stack.json
 * 5. AvatarPicker - https://kokonutui.com/r/avatar-picker.json
 * 6. Loader (Orbital Conic Gradient) - https://kokonutui.com/r/loader.json
 * 7. PluckedText (Acoustic Standing Waves) - https://kokonutui.com/r/plucked-text.json
 * 8. MarkerText (Hand-drawn Ink Highlight) - https://kokonutui.com/r/marker-text.json
 * 9. SwitchButton (Sun/Moon Morph + View Transitions) - https://kokonutui.com/r/switch-button.json
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. KOKONUT MORPHIC NAVBAR (Split Nav)
// ----------------------------------------------------------------------------
(function() {
  const SPLIT = 8;
  const HOVER_SPLIT = 2;
  const DRAG_SLOP = 4;
  const PROJECTION = 0.16;
  const VELOCITY_WINDOW = 90;

  const round2 = (v) => Math.round(v * 100) / 100;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const bump = (focus, k) => Math.max(0, 1 - Math.abs(focus - k));

  function splitOffsets(count, focus, hover) {
    const cumulative = [0];
    let total = 0;
    for (let joint = 0; joint < count - 1; joint++) {
      let gap = SPLIT * Math.max(bump(focus, joint), bump(focus, joint + 1));
      const hoverJoint =
        hover !== null &&
        hover !== Math.round(focus) &&
        (joint === hover - 1 || joint === hover);
      if (hoverJoint) {
        gap = Math.max(gap, HOVER_SPLIT);
      }
      total += gap;
      cumulative.push(total);
    }
    return cumulative.map((x) => round2(x - total / 2));
  }

  function capScale(gap) {
    return `scaleX(${round2(clamp(1 - gap / 1.5, 0, 1))})`;
  }

  window.initKokonutMorphicNav = function(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const items = Array.from(container.querySelectorAll('[data-nav-index]'));
    const count = items.length;
    let activeIndex = options.defaultIndex || 0;
    let hoverIndex = null;
    let previewIndex = null;
    let dragState = null;

    // Build caps for each segment
    items.forEach((item, index) => {
      if (index > 0) {
        const leftCap = document.createElement('span');
        leftCap.className = 'kokonut-nav-cap kokonut-nav-cap-left';
        item.appendChild(leftCap);
      }
      if (index < count - 1) {
        const rightCap = document.createElement('span');
        rightCap.className = 'kokonut-nav-cap kokonut-nav-cap-right';
        item.appendChild(rightCap);
      }
    });

    function updateOffsets(instant = false) {
      const focus = dragState?.scrubbing ? dragState.focus : (previewIndex ?? activeIndex);
      const offsets = splitOffsets(count, focus, dragState?.scrubbing ? null : hoverIndex);

      items.forEach((item, i) => {
        const x = offsets[i] || 0;
        const prevX = offsets[i - 1];
        const nextX = offsets[i + 1];

        if (instant) {
          item.style.transition = 'none';
        } else {
          item.style.transition = 'transform 0.32s cubic-bezier(0.23, 1, 0.32, 1)';
        }
        item.style.transform = `translate3d(${x}px, 0, 0)`;

        const leftCapEl = item.querySelector('.kokonut-nav-cap-left');
        if (leftCapEl && prevX !== undefined) {
          leftCapEl.style.transform = capScale(x - prevX);
        }
        const rightCapEl = item.querySelector('.kokonut-nav-cap-right');
        if (rightCapEl && nextX !== undefined) {
          rightCapEl.style.transform = capScale(nextX - x);
        }

        const isCurrent = i === activeIndex;
        const isHigh = i === (previewIndex ?? activeIndex);
        item.classList.toggle('active', isCurrent);
        item.classList.toggle('highlighted', isHigh);
      });
    }

    items.forEach((item, index) => {
      item.addEventListener('pointerenter', () => {
        hoverIndex = index;
        updateOffsets();
      });
      item.addEventListener('pointerleave', () => {
        if (hoverIndex === index) hoverIndex = null;
        updateOffsets();
      });
      item.addEventListener('click', (e) => {
        if (dragState?.scrubbing) {
          e.preventDefault();
          return;
        }
        activeIndex = index;
        updateOffsets();
        if (options.onSelect) options.onSelect(index, item.getAttribute('data-tab'));
      });
    });

    // Pointer scrubbing along the bar
    container.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const rect = container.getBoundingClientRect();
      dragState = {
        pointerId: e.pointerId,
        startX: e.clientX,
        rowLeft: rect.left,
        width: rect.width,
        scrubbing: false,
        focus: activeIndex,
        samples: [{ x: e.clientX, t: e.timeStamp }]
      };
    });

    window.addEventListener('pointermove', (e) => {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      const dx = e.clientX - dragState.startX;
      if (!dragState.scrubbing) {
        if (Math.abs(dx) < DRAG_SLOP) return;
        dragState.scrubbing = true;
        hoverIndex = null;
      }
      dragState.samples.push({ x: e.clientX, t: e.timeStamp });
      if (dragState.samples.length > 12) dragState.samples.shift();

      const itemWidth = dragState.width / count;
      const relX = e.clientX - dragState.rowLeft;
      dragState.focus = clamp(relX / itemWidth - 0.5, 0, count - 1);
      previewIndex = Math.round(dragState.focus);
      updateOffsets();
    });

    const endDrag = (e) => {
      if (!dragState || dragState.pointerId !== e.pointerId) return;
      if (dragState.scrubbing) {
        const targetIdx = clamp(previewIndex ?? activeIndex, 0, count - 1);
        activeIndex = targetIdx;
        if (options.onSelect) {
          options.onSelect(activeIndex, items[activeIndex]?.getAttribute('data-tab'));
        }
      }
      dragState = null;
      previewIndex = null;
      updateOffsets();
    };

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    updateOffsets(true);

    return {
      setActiveIndex: (idx) => {
        activeIndex = idx;
        updateOffsets();
      }
    };
  };
})();

// ----------------------------------------------------------------------------
// 2. KOKONUT LIQUID GLASS & NOW PLAYING (Vinyl Disc + Noise Equalizer)
// ----------------------------------------------------------------------------
(function() {
  function hash(n) {
    const s = Math.sin(n * 127.1) * 43758.5453;
    return s - Math.floor(s);
  }
  function noise(x) {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return hash(i) * (1 - u) + hash(i + 1) * u;
  }
  function barLevel(index, t) {
    return 0.6 * noise(t * 4.3 + index * 17.3) + 0.4 * noise(t * 9.1 + index * 31.7 + 100);
  }

  window.initKokonutNowPlaying = function(containerId, audioEl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const disc = container.querySelector('.kokonut-vinyl-disc');
    const bars = container.querySelectorAll('.kokonut-eq-bar');
    const playBtn = container.querySelector('.kokonut-np-play');
    const timeCurrent = container.querySelector('.kokonut-np-current');
    const timeTotal = container.querySelector('.kokonut-np-total');
    const titleEl = container.querySelector('.kokonut-np-title');
    const artistEl = container.querySelector('.kokonut-np-artist');

    let angle = 0;
    let isPlaying = false;
    let lastTime = performance.now();

    function renderLoop(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        angle = (angle + 200 * dt) % 360; // 33⅓ rpm = 200 deg/s
        if (disc) disc.style.transform = `rotate(${angle.toFixed(2)}deg)`;

        const t = (audioEl ? audioEl.currentTime : now / 1000);
        bars.forEach((bar, idx) => {
          const val = barLevel(idx, t);
          const height = Math.max(14, Math.min(100, val * 100));
          bar.style.height = `${height.toFixed(1)}%`;
        });
      } else {
        bars.forEach((bar) => {
          bar.style.height = '14%';
        });
      }

      if (audioEl && !isNaN(audioEl.duration)) {
        if (timeCurrent) timeCurrent.textContent = formatSec(audioEl.currentTime);
        if (timeTotal) timeTotal.textContent = formatSec(audioEl.duration);
      }

      requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

    function formatSec(s) {
      const sec = Math.max(0, Math.floor(s || 0));
      return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
    }

    if (audioEl) {
      audioEl.addEventListener('play', () => {
        isPlaying = true;
        if (playBtn) playBtn.innerHTML = '⏸';
      });
      audioEl.addEventListener('pause', () => {
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '▶';
      });
    }

    return {
      setTrack: (title, artist) => {
        if (titleEl) titleEl.textContent = title;
        if (artistEl) artistEl.textContent = artist;
      },
      setPlaying: (p) => {
        isPlaying = p;
        if (playBtn) playBtn.innerHTML = p ? '⏸' : '▶';
      }
    };
  };
})();

// ----------------------------------------------------------------------------
// 3. KOKONUT CARD FLIP (3D Flick Card with Light Sweep & Slices)
// ----------------------------------------------------------------------------
(function() {
  const DEG_PER_PX = 0.6;
  const STIFFNESS = 170;
  const DAMPING = 20;
  const PROJECTION = 0.22;
  const FLICK_SPEED = 450;
  const LIFT = 36;
  const THICKNESS = 6;
  const SUBSTEP = 1 / 240;
  const VELOCITY_WINDOW = 80;

  window.initKokonutCardFlip = function(cardContainerId) {
    const root = document.getElementById(cardContainerId);
    if (!root) return;

    const card = root.querySelector('.kokonut-card-flip-inner');
    const shadow = root.querySelector('.kokonut-card-flip-shadow');
    const band = root.querySelector('.kokonut-card-light-band');
    if (!card) return;

    let angle = 0;
    let target = 0;
    let velocity = 0;
    let raf = 0;
    let last = 0;
    let dragging = false;
    let startX = 0;
    let startAngle = 0;
    let samples = [];

    function render() {
      const rad = (angle * Math.PI) / 180;
      const sin = Math.sin(rad);
      const turn = Math.abs(sin);
      const facing = Math.abs(Math.cos(rad));

      card.style.transform = `translateZ(${(turn * LIFT).toFixed(2)}px) rotateY(${angle.toFixed(2)}deg)`;

      if (shadow) {
        const narrow = (0.16 + 0.84 * facing).toFixed(3);
        const soft = (1 - turn * 0.12).toFixed(3);
        shadow.style.transform = `scale(${narrow}, ${soft})`;
        shadow.style.opacity = (1 - turn * 0.45).toFixed(3);
      }

      if (band) {
        const shift = `${(sin * 140).toFixed(1)}%`;
        band.style.opacity = (turn * 0.14).toFixed(3);
        band.style.transform = `translateX(${shift}) rotate(18deg)`;
      }
    }

    function step(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const n = Math.max(1, Math.ceil(dt / SUBSTEP));
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        const force = -STIFFNESS * (angle - target) - DAMPING * velocity;
        velocity += force * h;
        angle += velocity * h;
      }
      if (Math.abs(angle - target) < 0.05 && Math.abs(velocity) < 0.5) {
        angle = target % 360;
        if (angle < 0) angle += 360;
        velocity = 0;
        raf = 0;
        render();
        return;
      }
      render();
      raf = requestAnimationFrame(step);
    }

    function kick() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function toggleFlip() {
      target = target >= 90 ? 0 : 180;
      kick();
    }

    // Drag / Flick handling
    root.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, a, input, textarea')) return;
      dragging = true;
      startX = e.clientX;
      startAngle = angle;
      samples = [{ t: e.timeStamp, a: angle }];
      root.setPointerCapture(e.pointerId);
    });

    root.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      angle = startAngle + dx * DEG_PER_PX;
      samples.push({ t: e.timeStamp, a: angle });
      if (samples.length > 12) samples.shift();
      render();
    });

    const onPointerEnd = (e) => {
      if (!dragging) return;
      dragging = false;
      const lastSample = samples[samples.length - 1];
      const firstSample = samples.find((p) => lastSample.t - p.t <= VELOCITY_WINDOW);
      let v = 0;
      if (firstSample && lastSample.t > firstSample.t) {
        v = ((lastSample.a - firstSample.a) / (lastSample.t - firstSample.t)) * 1000;
      }

      if (Math.abs(e.clientX - startX) < 4) {
        toggleFlip();
        return;
      }

      velocity = v;
      const projected = angle + velocity * PROJECTION;
      target = Math.round(projected / 180) * 180;
      kick();
    };

    root.addEventListener('pointerup', onPointerEnd);
    root.addEventListener('pointercancel', onPointerEnd);

    render();

    return {
      flip: toggleFlip,
      setFlipped: (f) => {
        target = f ? 180 : 0;
        kick();
      }
    };
  };
})();

// ----------------------------------------------------------------------------
// 4. KOKONUT CARD STACK (Throw Deck with Spring Physics)
// ----------------------------------------------------------------------------
(function() {
  const TILTS = [0, -2, 1.5, -1];
  const SLOT_Y = 9;
  const SLOT_SCALE = 0.035;
  const MAX_SLOT = TILTS.length - 1;
  const MAX_DRAG_ROTATION = 18;
  const THROW_VELOCITY = 0.5;
  const THROW_DISTANCE = 0.35;
  const TOP_Z = 1000;

  const HOME = { k: 420, c: 30 };
  const FLIGHT = { k: 150, c: 15 };
  const RETURN = { k: 240, c: 26 };

  function slotPose(depth) {
    const d = Math.min(depth, MAX_SLOT);
    return { x: 0, y: d * SLOT_Y, r: TILTS[d] || 0, s: 1 - d * SLOT_SCALE };
  }

  function springAxis(value, velocity, target, spring, dt) {
    const accel = -spring.k * (value - target) - spring.c * velocity;
    const v = velocity + accel * dt;
    return [value + v * dt, v];
  }

  window.initKokonutCardStack = function(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cardElements = Array.from(container.querySelectorAll('.kokonut-stack-card'));
    const count = cardElements.length;
    if (count === 0) return;

    let order = cardElements.map((_, i) => i);
    let bodies = cardElements.map((_, i) => {
      const pose = slotPose(i);
      return {
        ...pose,
        vx: 0, vy: 0, vr: 0, vs: 0,
        phase: 'rest',
        out: pose,
        dx: 1, dy: 0,
        z: null,
        apexZ: null
      };
    });

    let drag = null;
    let raf = 0;
    let last = performance.now();

    function write(index, depth) {
      const node = cardElements[index];
      const body = bodies[index];
      if (!node || !body) return;
      node.style.transform = `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.r.toFixed(3)}deg) scale(${body.s.toFixed(4)})`;
      node.style.zIndex = String(body.z ?? (count - depth));
    }

    function advance(index, depth, dt) {
      const body = bodies[index];
      if (!body) return false;
      if (body.phase === 'drag') {
        write(index, depth);
        return true;
      }

      let spring = HOME;
      if (body.phase === 'out') spring = FLIGHT;
      else if (body.phase === 'return') spring = RETURN;

      const target = body.phase === 'out' ? body.out : slotPose(depth);
      const steps = Math.max(1, Math.ceil(dt * 240));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        [body.x, body.vx] = springAxis(body.x, body.vx, target.x, spring, h);
        [body.y, body.vy] = springAxis(body.y, body.vy, target.y, spring, h);
        [body.r, body.vr] = springAxis(body.r, body.vr, target.r, spring, h);
        [body.s, body.vs] = springAxis(body.s, body.vs, target.s, spring, h);
      }

      if (body.phase === 'out' && body.vx * body.dx + body.vy * body.dy <= 0) {
        body.phase = 'return';
        body.z = body.apexZ;
      }

      const settled =
        Math.abs(body.x - target.x) < 0.1 &&
        Math.abs(body.y - target.y) < 0.1 &&
        Math.abs(body.vx) + Math.abs(body.vy) < 2;

      if (settled && body.phase !== 'out') {
        body.phase = 'rest';
        body.z = null;
      }

      write(index, depth);
      return !settled;
    }

    function tick(now) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      let active = false;
      order.forEach((index, depth) => {
        if (advance(index, depth, dt)) active = true;
      });
      raf = active ? requestAnimationFrame(tick) : 0;
    }

    function kick() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function throwTop(vx, vy) {
      const topIdx = order[0];
      if (topIdx === undefined) return;
      const body = bodies[topIdx];
      const node = cardElements[topIdx];
      const w = node.offsetWidth || 260;
      const h = node.offsetHeight || 320;
      const speed = Math.hypot(vx, vy) || 1;
      const ux = vx / speed;
      const uy = vy / speed;
      const distance = Math.min(w, h) + 60;

      body.phase = 'out';
      body.dx = ux;
      body.dy = uy;
      body.out = { x: ux * distance, y: uy * distance, r: body.r + ux * 24, s: 1 };
      body.vx = ux * 900;
      body.vy = uy * 900;
      body.z = TOP_Z;
      body.apexZ = 0;

      order = [...order.slice(1), topIdx];
      if (options.onChange) options.onChange(order[0]);
      kick();
    }

    function cycleBack() {
      const lastIdx = order[order.length - 1];
      if (lastIdx === undefined) return;
      const body = bodies[lastIdx];
      body.phase = 'out';
      body.dx = -1;
      body.dy = -0.2;
      body.out = { x: -280, y: -40, r: -16, s: 1 };
      body.vx = -900;
      body.vy = -180;
      body.z = 0;
      body.apexZ = TOP_Z - 1;

      order = [lastIdx, ...order.slice(0, -1)];
      if (options.onChange) options.onChange(order[0]);
      kick();
    }

    cardElements.forEach((card, index) => {
      card.addEventListener('pointerdown', (e) => {
        if (order[0] !== index) return;
        card.setPointerCapture(e.pointerId);
        const rect = card.getBoundingClientRect();
        drag = {
          pointerId: e.pointerId,
          index,
          startX: e.clientX,
          startY: e.clientY,
          baseX: bodies[index].x,
          baseY: bodies[index].y,
          width: rect.width,
          lever: e.clientY - rect.top < rect.height / 2 ? 1 : -1,
          samples: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }]
        };
      });

      card.addEventListener('pointermove', (e) => {
        if (!drag || drag.pointerId !== e.pointerId) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        const body = bodies[drag.index];
        body.phase = 'drag';
        body.x = drag.baseX + dx;
        body.y = drag.baseY + dy;
        body.r = clamp(body.x / drag.width, -1, 1) * MAX_DRAG_ROTATION * drag.lever;
        drag.samples.push({ t: e.timeStamp, x: e.clientX, y: e.clientY });
        if (drag.samples.length > 12) drag.samples.shift();
        kick();
      });

      const onUp = (e) => {
        if (!drag || drag.pointerId !== e.pointerId) return;
        const currentDrag = drag;
        drag = null;
        const body = bodies[currentDrag.index];
        const lastSample = currentDrag.samples[currentDrag.samples.length - 1];
        const firstSample = currentDrag.samples[0];
        const dt = Math.max(1, lastSample.t - firstSample.t);
        const vx = (lastSample.x - firstSample.x) / dt;
        const vy = (lastSample.y - firstSample.y) / dt;
        const dist = Math.hypot(body.x, body.y);

        if (Math.hypot(vx, vy) > THROW_VELOCITY || dist > currentDrag.width * THROW_DISTANCE) {
          throwTop(vx || (body.x > 0 ? 1 : -1), vy || 0);
        } else {
          body.phase = 'rest';
          kick();
        }
      };

      card.addEventListener('pointerup', onUp);
      card.addEventListener('pointercancel', onUp);
    });

    order.forEach((idx, depth) => write(idx, depth));

    return {
      next: () => throwTop(1, 0),
      prev: cycleBack
    };
  };
})();

// ----------------------------------------------------------------------------
// 5. KOKONUT AVATAR PICKER (Deterministic PRNG & SVG Face Generator)
// ----------------------------------------------------------------------------
(function() {
  const BACKGROUNDS = [
    { name: "gray", rgb: [228, 228, 231] },
    { name: "sand", rgb: [233, 226, 214] },
    { name: "sage", rgb: [217, 225, 213] },
    { name: "slate", rgb: [218, 225, 233] },
    { name: "clay", rgb: [235, 221, 214] },
    { name: "mist", rgb: [226, 223, 233] },
  ];
  const SKINS = [
    [246, 233, 222],
    [236, 210, 187],
    [214, 176, 142],
    [176, 128, 96],
    [128, 88, 66],
  ];
  const HAIRS = [
    [39, 39, 42],
    [63, 45, 36],
    [113, 84, 62],
    [161, 161, 170],
    [82, 82, 91],
  ];
  const SHIRTS = [
    [39, 39, 42],
    [82, 82, 91],
    [113, 113, 122],
    [244, 244, 245],
  ];

  function hashString(input) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(list, r) {
    return list[Math.min(list.length - 1, Math.floor(r * list.length))];
  }

  function blobPath(cx, cy, w, top, bottom, square, chin = 1) {
    const k = 0.552 + square * 0.28;
    const kb = k * chin;
    const n = (v) => (Math.round(v * 100) / 100).toFixed(2);
    return [
      `M${n(cx)} ${n(cy - top)}`,
      `C${n(cx + k * w)} ${n(cy - top)} ${n(cx + w)} ${n(cy - k * top)} ${n(cx + w)} ${n(cy)}`,
      `C${n(cx + w)} ${n(cy + kb * bottom)} ${n(cx + kb * w)} ${n(cy + bottom)} ${n(cx)} ${n(cy + bottom)}`,
      `C${n(cx - kb * w)} ${n(cy + bottom)} ${n(cx - w)} ${n(cy + kb * bottom)} ${n(cx - w)} ${n(cy)}`,
      `C${n(cx - w)} ${n(cy - k * top)} ${n(cx - k * w)} ${n(cy - top)} ${n(cx)} ${n(cy - top)}`,
      'Z'
    ].join(' ');
  }

  window.generateKokonutAvatarSvg = function(seed) {
    const r = mulberry32(hashString(seed));
    const bg = pick(BACKGROUNDS, r()).rgb;
    const skin = pick(SKINS, r());
    const hair = pick(HAIRS, r());
    const shirt = pick(SHIRTS, r());

    const headW = 18 + r() * 5;
    const headH = 22 + r() * 4;
    const square = r();
    const chin = 0.75 + r() * 0.25;
    const eyeGap = 7.5 + r() * 3;
    const eyeY = 48 + (-2 + r() * 4);
    const browLift = 4.2 + r() * 2;
    const mouthW = 3.5 + r() * 3;
    const mouthCurve = r() * 4.5;
    const hasGlasses = r() < 0.3;

    const bgStr = `rgb(${bg.join(',')})`;
    const skinStr = `rgb(${skin.join(',')})`;
    const hairStr = `rgb(${hair.join(',')})`;
    const shirtStr = `rgb(${shirt.join(',')})`;

    const headD = blobPath(50, 48, headW, headH * 0.9, headH * 1.1, square, chin);

    return `
      <svg viewBox="0 0 100 100" width="100%" height="100%" style="background:${bgStr};border-radius:inherit;" xmlns="http://www.w3.org/2000/svg">
        <!-- Shoulders / Shirt -->
        <path d="M15 100 C20 78, 30 74, 50 74 C70 74, 80 78, 85 100 Z" fill="${shirtStr}" />
        
        <!-- Head -->
        <path d="${headD}" fill="${skinStr}" />
        
        <!-- Hair back / base -->
        <path d="M${50 - headW - 2} 48 C${50 - headW} 22, ${50 + headW} 22, ${50 + headW + 2} 48 C${50 + headW} 30, ${50 - headW} 30, ${50 - headW - 2} 48 Z" fill="${hairStr}" />
        
        <!-- Eyes -->
        <ellipse cx="${50 - eyeGap}" cy="${eyeY}" rx="2" ry="2.2" fill="#18181b" />
        <ellipse cx="${50 + eyeGap}" cy="${eyeY}" rx="2" ry="2.2" fill="#18181b" />
        
        <!-- Eyebrows -->
        <path d="M${50 - eyeGap - 3} ${eyeY - browLift} Q${50 - eyeGap} ${eyeY - browLift - 1} ${50 - eyeGap + 3} ${eyeY - browLift}" stroke="${hairStr}" stroke-width="1.6" stroke-linecap="round" fill="none" />
        <path d="M${50 + eyeGap - 3} ${eyeY - browLift} Q${50 + eyeGap} ${eyeY - browLift - 1} ${50 + eyeGap + 3} ${eyeY - browLift}" stroke="${hairStr}" stroke-width="1.6" stroke-linecap="round" fill="none" />
        
        <!-- Mouth -->
        <path d="M${50 - mouthW} 62 Q50 ${62 + mouthCurve} ${50 + mouthW} 62" stroke="#18181b" stroke-width="1.8" stroke-linecap="round" fill="none" />
        
        <!-- Glasses (optional) -->
        ${hasGlasses ? `
          <circle cx="${50 - eyeGap}" cy="${eyeY}" r="6" stroke="#18181b" stroke-width="1.5" fill="none" />
          <circle cx="${50 + eyeGap}" cy="${eyeY}" r="6" stroke="#18181b" stroke-width="1.5" fill="none" />
          <line x1="${50 - eyeGap + 6}" y1="${eyeY}" x2="${50 + eyeGap - 6}" y2="${eyeY}" stroke="#18181b" stroke-width="1.5" />
        ` : ''}
      </svg>
    `;
  };
})();

// ----------------------------------------------------------------------------
// 6. KOKONUT LOADER (Orbital Conic Gradient Rings with Radial Mask)
// ----------------------------------------------------------------------------
(function() {
  window.createKokonutLoaderHtml = function(title = "Đang kết nối vũ trụ...", subtitle = "Vui lòng giữ tâm tĩnh lặng") {
    return `
      <div class="kokonut-loader-wrapper">
        <div class="kokonut-loader-orbital" aria-hidden="true">
          <div class="kokonut-ring kokonut-ring-outer"></div>
          <div class="kokonut-ring kokonut-ring-primary"></div>
          <div class="kokonut-ring kokonut-ring-counter"></div>
          <div class="kokonut-ring kokonut-ring-accent"></div>
        </div>
        <div class="kokonut-loader-texts">
          <span class="kokonut-loader-title">${title}</span>
          ${subtitle ? `<span class="kokonut-loader-subtitle">${subtitle}</span>` : ''}
        </div>
      </div>
    `;
  };
})();

// ----------------------------------------------------------------------------
// 7. KOKONUT PLUCKED TEXT (Acoustic Standing Waves & Letter Tilt)
// ----------------------------------------------------------------------------
(function() {
  const MAX_MODES = 24;
  const MAX_MODE_HZ = 22;
  const WAVE_SPEED = 1500;
  const DAMP_BASE = 0.9;
  const DAMP_HIGH = 0.012;
  const STEP = 6;
  const MAX_SWING = 0.6;
  const TILT = 0.85;

  function soften(x, max) {
    return max * Math.tanh(x / max);
  }

  function stepMode(mode, dt) {
    const { q, v, omega, gamma, damped } = mode;
    const decay = Math.exp(-gamma * dt);
    const c = Math.cos(damped * dt);
    const s = Math.sin(damped * dt);
    mode.q = decay * (q * c + ((v + gamma * q) / damped) * s);
    mode.v = decay * (v * c - ((omega * omega * q + gamma * v) / damped) * s);
  }

  window.initKokonutPluckedText = function(elementId, tension = 1) {
    const stage = document.getElementById(elementId);
    if (!stage) return;

    const rawText = stage.textContent.trim();
    stage.innerHTML = `
      <span class="kokonut-pluck-letters"></span>
      <svg class="kokonut-pluck-svg" aria-hidden="true">
        <path class="kokonut-pluck-ghost"></path>
        <path class="kokonut-pluck-path"></path>
      </svg>
    `;

    const lettersEl = stage.querySelector('.kokonut-pluck-letters');
    const svg = stage.querySelector('.kokonut-pluck-svg');
    const path = stage.querySelector('.kokonut-pluck-path');
    const ghost = stage.querySelector('.kokonut-pluck-ghost');

    rawText.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'kokonut-pluck-char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      lettersEl.appendChild(span);
    });
    const probe = document.createElement('span');
    lettersEl.appendChild(probe);

    const letters = Array.from(lettersEl.querySelectorAll('.kokonut-pluck-char'));

    let length = stage.offsetWidth || 300;
    let swing = 24;
    let modes = [];
    let pathBasis = [];
    let letterBasis = [];
    let raf = 0;
    let last = performance.now();
    let grab = null;

    function measure() {
      const svgBox = svg.getBoundingClientRect();
      const lettersLeft = lettersEl.getBoundingClientRect().left - svgBox.left;
      length = svgBox.width || stage.offsetWidth || 300;
      swing = 24 * MAX_SWING;
      const f0 = (WAVE_SPEED * tension) / (2 * Math.max(10, length));
      const count = Math.max(4, Math.min(MAX_MODES, Math.floor(MAX_MODE_HZ / f0)));

      modes = Array.from({ length: count }, (_, index) => {
        const n = index + 1;
        const omega = 2 * Math.PI * f0 * n;
        const gamma = (DAMP_BASE + DAMP_HIGH * n * n) * Math.sqrt(tension);
        return {
          q: 0, v: 0, omega, gamma,
          damped: Math.sqrt(Math.max(omega * omega - gamma * gamma, 1))
        };
      });

      const samples = Math.ceil(length / STEP) + 1;
      pathBasis = Array.from({ length: samples }, (_, i) => {
        const x = Math.min(i * STEP, length);
        return Float64Array.from(modes, (_, idx) => Math.sin(((idx + 1) * Math.PI * x) / length));
      });

      letterBasis = letters.map((letter) => {
        const x = lettersLeft + letter.offsetLeft + letter.offsetWidth / 2;
        const k = (idx) => ((idx + 1) * Math.PI) / length;
        return {
          sin: Float64Array.from(modes, (_, idx) => Math.sin(k(idx) * x)),
          cos: Float64Array.from(modes, (_, idx) => k(idx) * Math.cos(k(idx) * x))
        };
      });
    }

    function sum(basis) {
      let y = 0;
      for (let i = 0; i < modes.length; i++) y += modes[i].q * basis[i];
      return y;
    }

    function draw() {
      let d = '';
      for (let i = 0; i < pathBasis.length; i++) {
        const x = Math.min(i * STEP, length);
        const y = soften(sum(pathBasis[i]), swing);
        d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(2)}`;
      }
      ghost.setAttribute('d', d);
      path.setAttribute('d', d);

      for (let i = 0; i < letters.length; i++) {
        const { sin, cos } = letterBasis[i];
        const raw = sum(sin);
        const y = soften(raw, swing);
        const t = Math.tanh(raw / swing);
        const slope = sum(cos) * (1 - t * t);
        const angle = Math.atan(slope) * TILT;
        letters[i].style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) rotate(${angle.toFixed(4)}rad)`;
      }
    }

    function loop(now) {
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;

      if (!grab) {
        modes.forEach((mode) => stepMode(mode, dt));
      }
      draw();

      const energy = modes.reduce((e, m) => e + m.v * m.v + m.omega * m.omega * m.q * m.q, 0);
      if (energy > 0.02 || grab) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    function kick() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }

    function pluck(x, height) {
      const apex = Math.min(Math.max(x, 1), length - 1);
      modes.forEach((mode, index) => {
        const n = index + 1;
        mode.q = ((2 * height * length * length) / (n * n * Math.PI * Math.PI * apex * (length - apex))) * Math.sin((n * Math.PI * apex) / length);
        mode.v = 0;
      });
      kick();
    }

    stage.addEventListener('pointerenter', (e) => {
      const box = stage.getBoundingClientRect();
      pluck(e.clientX - box.left, 16);
    });

    stage.addEventListener('pointermove', (e) => {
      const box = stage.getBoundingClientRect();
      const relX = e.clientX - box.left;
      pluck(relX, (e.movementY || 1) * 3);
    });

    measure();
    window.addEventListener('resize', measure);
  };
})();

// ----------------------------------------------------------------------------
// 8. KOKONUT MARKER TEXT (Hand-drawn Ink Highlight & Pressure Underline)
// ----------------------------------------------------------------------------
(function() {
  function random(seed) {
    let n = seed;
    return () => {
      n += 1;
      const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
  }

  function wobble(rand, amp) {
    const p1 = rand() * Math.PI * 2;
    const f1 = 1 + rand() * 1.5;
    return (t) => amp * Math.sin(t * f1 * Math.PI + p1);
  }

  window.initKokonutMarkerText = function(selector = '.kokonut-marker-target') {
    const targets = document.querySelectorAll(selector);
    targets.forEach((el, idx) => {
      if (el.dataset.marked) return;
      el.dataset.marked = 'true';

      const text = el.textContent;
      const type = el.getAttribute('data-mark') || 'highlight'; // highlight, underline, circle
      const color = el.getAttribute('data-mark-color') || (type === 'underline' ? '#f97316' : '#facc15');

      const rand = random(idx + 42);
      const wob = wobble(rand, 1.8);

      if (type === 'underline') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'kokonut-marker-svg');
        svg.setAttribute('viewBox', '0 0 100 12');
        svg.setAttribute('preserveAspectRatio', 'none');

        const d = `M 0,${6 + wob(0)} Q 25,${4 + wob(0.25)} 50,${7 + wob(0.5)} T 100,${5 + wob(1)}`;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '4');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('fill', 'none');
        path.setAttribute('class', 'kokonut-marker-path');

        svg.appendChild(path);
        el.style.position = 'relative';
        el.style.display = 'inline-block';
        el.appendChild(svg);
      } else {
        el.classList.add('kokonut-marker-highlight');
        el.style.setProperty('--marker-color', color);
      }
    });
  };
})();

// ----------------------------------------------------------------------------
// 9. KOKONUT SWITCH BUTTON (Sun/Moon Morph & Circular View Transition)
// ----------------------------------------------------------------------------
(function() {
  const EASE_REVEAL = 'cubic-bezier(0.4, 0, 0.2, 1)';

  window.initKokonutSwitchTheme = function(btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    function toggleTheme(e) {
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';

      function apply() {
        root.classList.toggle('dark', nextTheme === 'dark');
        root.style.colorScheme = nextTheme;
        localStorage.setItem('theme', nextTheme);
        const sun = btn.querySelector('.kokonut-switch-sun');
        const moon = btn.querySelector('.kokonut-switch-moon');
        if (sun && moon) {
          sun.style.display = nextTheme === 'dark' ? 'none' : 'block';
          moon.style.display = nextTheme === 'dark' ? 'block' : 'none';
        }
      }

      if (!document.startViewTransition) {
        apply();
        return;
      }

      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(apply);
      transition.ready.then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: EASE_REVEAL,
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    }

    btn.addEventListener('click', toggleTheme);

    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      const sun = btn.querySelector('.kokonut-switch-sun');
      const moon = btn.querySelector('.kokonut-switch-moon');
      if (sun && moon) {
        sun.style.display = 'none';
        moon.style.display = 'block';
      }
    }
  };
})();
