// ============================================================
// SOUND ENGINE — Web Audio API Synthesizer (Thiền định & Tương tác Dịu Êm)
// Âm thanh hữu cơ (Organic Acoustic Taps, Solfeggio 528Hz Chime & Singing Bowl)
// Không chói gắt, không rè, mang lại cảm giác bình an thư giãn
// ============================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('vqtd_muted') === 'true';
    this.lastTickTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('vqtd_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Tiếng chạm nút hữu cơ, nhẹ nhàng, thanh thoát (Soft Organic Wooden Tap)
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // Tiếng kim khẩy nhẹ qua từng nấc của vòng quay (Soft Wooden Clockwork Tick)
  playTick(pitchRatio = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (now - this.lastTickTime < 0.028) return; // Chống dội âm khi quay nhanh
    this.lastTickTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 420 * Math.max(0.7, Math.min(1.4, pitchRatio));
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.025);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } catch (_) {}
  }

  // Âm chuông ngân thanh tịnh 528Hz (Solfeggio Miracle Tone + Harmony)
  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Tần số 528Hz (Tình yêu & Phục hồi) + 792Hz (Hài âm thuần khiết)
    const tones = [
      { freq: 528, gain: 0.06, decay: 1.1 },
      { freq: 792, gain: 0.03, decay: 0.9 },
      { freq: 1056, gain: 0.015, decay: 0.7 }
    ];

    try {
      tones.forEach(t => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(t.freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(t.gain, now + 0.03); // Soft attack 30ms
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t.decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + t.decay + 0.05);
      });
    } catch (_) {}
  }

  // Âm chuông xoay Tây Tạng / Chuông ngân thanh tịnh (432Hz + overtones) khi trúng thông điệp
  playSingingBowl() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [432, 864, 1296, 1728]; // Chuỗi hài âm thiền định
    const gains = [0.18, 0.09, 0.045, 0.02];

    try {
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 0.998, now + 3.2);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(gains[idx], now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      });
    } catch (_) {}
  }

  // Thay thế tiếng nứt dấu sáp cũ bằng âm chạm êm ái
  playWaxCrack() {
    this.playClick();
  }
}

const sounds = new SoundEngine();
