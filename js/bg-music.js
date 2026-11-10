// ============================================================
// BACKGROUND LOFI MUSIC PLAYER (Tự động phát ngẫu nhiên & Liền mạch)
// ============================================================

const SONG_LIST = [
  { id: 1, title: 'Lofi 1 · Khởi Đầu Tĩnh Lặng', file: 'songs/Lofi 1.m4a' },
  { id: 2, title: 'Lofi 2 · Chữa Lành Tâm Hồn', file: 'songs/Lofi 2.m4a' },
  { id: 3, title: 'Lofi 3 · Bình An Nội Tại',   file: 'songs/Lofi 3.m4a' },
  { id: 4, title: 'Lofi 4 · Dòng Chảy Vũ Trụ',  file: 'songs/Lofi 4.mp3' },
  { id: 5, title: 'Lofi 5 · Nắng Sớm An Nhiên', file: 'songs/Lofi 5.m4a' },
  { id: 6, title: 'Lofi 6 · Hoàng Hôn Tĩnh Tại', file: 'songs/Lofi 6.m4a' },
  { id: 7, title: 'Lofi 7 · Tiếng Chuông Gió',  file: 'songs/Lofi 7.m4a' },
  { id: 8, title: 'Lofi 8 · Giấc Mơ Tinh Vân',  file: 'songs/Lofi 8.m4a' },
  { id: 9, title: 'Lofi 9 · Trở Về Với Mình',   file: 'songs/Lofi 9.m4a' }
];

class BackgroundMusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audio.volume = parseFloat(localStorage.getItem('vqtd_music_vol') || '0.35');
    this.isPlaying = false;
    this.currentSong = null;
    this.unplayedIndices = [];
    this.userInteracted = false;
    this.isMutedByUser = localStorage.getItem('vqtd_music_muted') === 'true';

    this.init();
  }

  init() {
    // Tự động chuyển bài khi hết nhạc
    this.audio.addEventListener('ended', () => {
      this.playRandomNext();
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      sessionStorage.setItem('vqtd_music_playing', 'true');
      this.updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      sessionStorage.setItem('vqtd_music_playing', 'false');
      this.updateUI();
    });

    // Định kỳ lưu vị trí phát để khôi phục nếu trang reload
    this.audio.addEventListener('timeupdate', () => {
      if (this.currentSong && Math.floor(this.audio.currentTime) % 2 === 0) {
        sessionStorage.setItem('vqtd_music_time', this.audio.currentTime.toString());
        sessionStorage.setItem('vqtd_music_song_id', this.currentSong.id.toString());
      }
    });

    this.resetQueue();

    // Khôi phục bài hát từ phiên trước nếu có
    const savedSongId = parseInt(sessionStorage.getItem('vqtd_music_song_id') || '0');
    const savedTime = parseFloat(sessionStorage.getItem('vqtd_music_time') || '0');
    const wasPlaying = sessionStorage.getItem('vqtd_music_playing') === 'true';

    const restoredSong = SONG_LIST.find(s => s.id === savedSongId);
    if (restoredSong) {
      this.currentSong = restoredSong;
      this.audio.src = encodeURI(this.currentSong.file);
      if (savedTime > 0) {
        this.audio.currentTime = savedTime;
      }
    } else {
      this.selectRandomSong();
    }

    this.renderWidget();

    // Nếu người dùng không chủ động tắt, tự động phát
    if (!this.isMutedByUser) {
      this.attemptAutoPlay();
    } else {
      this.updateUI();
    }
  }

  resetQueue() {
    this.unplayedIndices = SONG_LIST.map((_, i) => i);
    for (let i = this.unplayedIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.unplayedIndices[i], this.unplayedIndices[j]] = [this.unplayedIndices[j], this.unplayedIndices[i]];
    }
  }

  selectRandomSong() {
    if (this.unplayedIndices.length === 0) {
      this.resetQueue();
      if (this.currentSong && SONG_LIST[this.unplayedIndices[0]].id === this.currentSong.id && this.unplayedIndices.length > 1) {
        [this.unplayedIndices[0], this.unplayedIndices[1]] = [this.unplayedIndices[1], this.unplayedIndices[0]];
      }
    }
    const nextIdx = this.unplayedIndices.pop();
    this.currentSong = SONG_LIST[nextIdx];
    this.audio.src = encodeURI(this.currentSong.file);
  }

  playRandomNext() {
    this.selectRandomSong();
    sessionStorage.removeItem('vqtd_music_time');
    this.play();
  }

  attemptAutoPlay() {
    const startPlay = () => {
      if (this.isPlaying || this.isMutedByUser) return;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUI();
        this.cleanupInteractionListeners();
      }).catch(() => {
        // Trình duyệt chặn autoplay khi chưa click
      });
    };

    startPlay();

    this.interactionHandler = () => {
      this.userInteracted = true;
      startPlay();
    };

    window.addEventListener('click', this.interactionHandler, { once: true, passive: true });
    window.addEventListener('touchstart', this.interactionHandler, { once: true, passive: true });
    window.addEventListener('keydown', this.interactionHandler, { once: true, passive: true });
  }

  cleanupInteractionListeners() {
    if (this.interactionHandler) {
      window.removeEventListener('click', this.interactionHandler);
      window.removeEventListener('touchstart', this.interactionHandler);
      window.removeEventListener('keydown', this.interactionHandler);
    }
  }

  play() {
    this.isMutedByUser = false;
    localStorage.setItem('vqtd_music_muted', 'false');
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI();
    }).catch(err => {
      console.warn("Lỗi phát nhạc:", err);
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
      this.isMutedByUser = true;
      localStorage.setItem('vqtd_music_muted', 'true');
      if (typeof showToast === 'function') showToast('Đã tạm dừng nhạc nền ⏸️');
    } else {
      this.play();
      if (typeof showToast === 'function') showToast('Đang phát: ' + this.currentSong.title + ' 🎵');
    }
  }

  renderWidget() {
    if (document.getElementById('bgMusicWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'bgMusicWidget';
    widget.className = 'bg-music-widget';
    widget.innerHTML = `
      <div class="music-pill" onclick="bgMusic.togglePlay()" title="Bật/Tắt nhạc nền Lofi">
        <div class="music-disc ${this.isPlaying ? 'spinning' : ''}">
          <span>🎵</span>
        </div>
        <div class="music-info">
          <div class="music-title" id="musicTitleText">${this.currentSong?.title || 'Lofi Thiền Định'}</div>
          <div class="music-status" id="musicStatusText">${this.isPlaying ? 'Đang phát ngẫu nhiên' : 'Tạm dừng (Chạm để nghe)'}</div>
        </div>
      </div>
      <button class="music-next-btn" onclick="bgMusic.playRandomNext()" title="Đổi bài ngẫu nhiên khác">
        ⏭️
      </button>
    `;
    document.body.appendChild(widget);

    const style = document.createElement('style');
    style.textContent = `
      .bg-music-widget {
        position: fixed;
        bottom: 74px;
        left: 16px;
        z-index: 95;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 252, 247, 0.94);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border: 1.5px solid var(--border, #EED8C9);
        border-radius: 100px;
        padding: 5px 8px 5px 6px;
        box-shadow: 0 4px 20px rgba(90, 45, 25, 0.12);
        transition: transform 0.25s ease, box-shadow 0.25s ease;
        user-select: none;
      }
      .bg-music-widget:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(90, 45, 25, 0.18);
        border-color: var(--gold, #E9C46A);
      }
      .music-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding-right: 4px;
      }
      .music-disc {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #E07A5F, #E9C46A);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        box-shadow: 0 2px 8px rgba(224, 122, 95, 0.35);
      }
      .music-disc.spinning {
        animation: spin-disc 6s linear infinite;
      }
      @keyframes spin-disc {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .music-info {
        display: flex;
        flex-direction: column;
        max-width: 140px;
      }
      .music-title {
        font-size: 0.72rem;
        font-weight: 800;
        color: var(--brown-dark, #3D2625);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .music-status {
        font-size: 0.62rem;
        color: var(--brown-light, #A87B64);
        font-weight: 600;
      }
      .music-next-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: rgba(224, 122, 95, 0.12);
        color: var(--peach, #E07A5F);
        font-size: 0.82rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .music-next-btn:hover {
        background: var(--peach, #E07A5F);
        color: white;
        transform: scale(1.1);
      }
      @media (max-width: 480px) {
        .bg-music-widget {
          bottom: 74px;
          left: 10px;
          padding: 4px 6px 4px 5px;
        }
        .music-info {
          max-width: 100px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  updateUI() {
    const disc = document.querySelector('.music-disc');
    const titleEl = document.getElementById('musicTitleText');
    const statusEl = document.getElementById('musicStatusText');

    if (disc) {
      if (this.isPlaying) disc.classList.add('spinning');
      else disc.classList.remove('spinning');
    }
    if (titleEl && this.currentSong) {
      titleEl.textContent = this.currentSong.title;
    }
    if (statusEl) {
      statusEl.textContent = this.isPlaying ? 'Đang phát ngẫu nhiên' : 'Tạm dừng (Chạm để nghe)';
    }
  }
}

const bgMusic = new BackgroundMusicPlayer();
