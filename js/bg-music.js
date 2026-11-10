// ============================================================
// BACKGROUND LOFI MUSIC PLAYER (Tự động phát ngẫu nhiên & Chuyển bài)
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
    // Tự động chuyển sang bài random khác khi bài hiện tại kết thúc
    this.audio.addEventListener('ended', () => {
      this.playRandomNext();
    });

    // Cập nhật trạng thái khi nhạc đang chạy hoặc dừng
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI();
    });

    // Khởi tạo hàng đợi bài hát ngẫu nhiên
    this.resetQueue();

    // Chọn 1 bài hát ngẫu nhiên ngay khi khởi động
    this.selectRandomSong();

    // Render widget phát nhạc lên giao diện
    this.renderWidget();

    // Thử phát nhạc (nếu trình duyệt cho phép) hoặc chờ tương tác đầu tiên của người dùng
    this.attemptAutoPlay();
  }

  resetQueue() {
    this.unplayedIndices = SONG_LIST.map((_, i) => i);
    // Shuffle mảng
    for (let i = this.unplayedIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.unplayedIndices[i], this.unplayedIndices[j]] = [this.unplayedIndices[j], this.unplayedIndices[i]];
    }
  }

  selectRandomSong() {
    if (this.unplayedIndices.length === 0) {
      this.resetQueue();
      // Nếu bài đầu tiên trùng bài vừa phát thì đổi chỗ
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
    this.play();
  }

  attemptAutoPlay() {
    if (this.isMutedByUser) {
      this.updateUI();
      return;
    }

    const startPlay = () => {
      if (this.isPlaying || this.isMutedByUser) return;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUI();
        this.cleanupInteractionListeners();
      }).catch(() => {
        // Trình duyệt chặn autoplay có tiếng -> chờ tương tác
      });
    };

    // Thử phát ngay
    startPlay();

    // Lắng nghe tương tác đầu tiên (click, chạm, nhấn phím) nếu autoplay bị chặn
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
    if (this.isMutedByUser) {
      this.isMutedByUser = false;
      localStorage.setItem('vqtd_music_muted', 'false');
    }
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI();
    }).catch(err => {
      console.warn("Không thể phát nhạc:", err);
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
    } else {
      this.play();
    }
  }

  setVolume(vol) {
    this.audio.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('vqtd_music_vol', this.audio.volume.toString());
  }

  renderWidget() {
    // Chèn widget điều khiển nhạc ở góc trái dưới màn hình
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
      <button class="music-next-btn" onclick="bgMusic.playRandomNext()" title="Đổi bài khác ngẫu nhiên">
        ⏭️
      </button>
    `;
    document.body.appendChild(widget);

    // CSS cho Music Widget
    const style = document.createElement('style');
    style.textContent = `
      .bg-music-widget {
        position: fixed;
        bottom: 74px;
        left: 18px;
        z-index: 90;
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
          left: 12px;
          padding: 4px 6px 4px 5px;
        }
        .music-info {
          max-width: 105px;
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

// Khởi tạo singleton phát nhạc nền
const bgMusic = new BackgroundMusicPlayer();
