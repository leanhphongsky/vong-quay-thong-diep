// ============================================================
// SOUND ENGINE — Web Audio API Synthesizer (Thiền định & Tương tác)
// Không cần tải file audio nặng, tạo âm thanh tự nhiên trực tiếp
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

  // Tiếng kim khẩy nhẹ qua từng nấc của vòng quay
  playTick(pitchRatio = 1.0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (now - this.lastTickTime < 0.03) return; // Tránh rè khi quay quá nhanh
    this.lastTickTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 * pitchRatio, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // Âm chuông xoay Tây Tạng / Chuông ngân thanh tịnh (432Hz + overtones) khi trúng thông điệp
  playSingingBowl() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [432, 864, 1296, 1728]; // Chuỗi hài âm thiền định
    const gains = [0.25, 0.12, 0.06, 0.03];

    try {
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        // Dao động nhẹ tần số tạo cảm giác chuông ngân
        osc.frequency.linearRampToValueAtTime(freq * 0.998, now + 3.5);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.5);
      });
    } catch (_) {}
  }

  // Tiếng bóc con dấu sáp cổ điển
  playWaxCrack() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (_) {}
  }
}

const sounds = new SoundEngine();
