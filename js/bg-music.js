// ============================================================
// BACKGROUND LOFI MUSIC PLAYER v2.0 (Liền Mạch · Random · Tinh Tế)
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
    this.currentIndex = 0;
    this.unplayedIndices = [];
    this.isMutedByUser = localStorage.getItem('vqtd_music_muted') === 'true';

    this.init();
  }

  get currentTrackName() {
    return this.currentSong ? this.currentSong.title : 'Lofi Thiền Định';
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

    // Lưu vị trí phát
    this.audio.addEventListener('timeupdate', () => {
      if (this.currentSong && Math.floor(this.audio.currentTime) % 2 === 0) {
        sessionStorage.setItem('vqtd_music_time', this.audio.currentTime.toString());
        sessionStorage.setItem('vqtd_music_song_id', this.currentSong.id.toString());
      }
    });

    this.resetQueue();

    // Khôi phục bài hát từ session
    const savedSongId = parseInt(sessionStorage.getItem('vqtd_music_song_id') || '0');
    const savedTime = parseFloat(sessionStorage.getItem('vqtd_music_time') || '0');

    const restoredSong = SONG_LIST.find(s => s.id === savedSongId);
    if (restoredSong) {
      this.currentSong = restoredSong;
      this.currentIndex = SONG_LIST.findIndex(s => s.id === savedSongId);
      this.audio.src = encodeURI(this.currentSong.file);
      if (savedTime > 0) {
        this.audio.currentTime = savedTime;
      }
    } else {
      this.selectRandomSong();
    }

    // Tự động phát khi người dùng tương tác lần đầu
    if (!this.isMutedByUser) {
      this.setupAutoPlayGesture();
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
    this.currentIndex = this.unplayedIndices.pop();
    this.currentSong = SONG_LIST[this.currentIndex];
    this.audio.src = encodeURI(this.currentSong.file);
  }

  playRandomNext() {
    this.selectRandomSong();
    sessionStorage.removeItem('vqtd_music_time');
    this.play();
  }

  nextTrack() {
    this.currentIndex = (this.currentIndex + 1) % SONG_LIST.length;
    this.currentSong = SONG_LIST[this.currentIndex];
    this.audio.src = encodeURI(this.currentSong.file);
    sessionStorage.removeItem('vqtd_music_time');
    this.play();
    if (typeof showToast === 'function') {
      showToast('Đang phát: ' + this.currentSong.title);
    }
  }

  prevTrack() {
    this.currentIndex = (this.currentIndex - 1 + SONG_LIST.length) % SONG_LIST.length;
    this.currentSong = SONG_LIST[this.currentIndex];
    this.audio.src = encodeURI(this.currentSong.file);
    sessionStorage.removeItem('vqtd_music_time');
    this.play();
    if (typeof showToast === 'function') {
      showToast('Đang phát: ' + this.currentSong.title);
    }
  }

  setVolume(vol) {
    this.audio.volume = Math.max(0, Math.min(1, vol));
    localStorage.setItem('vqtd_music_vol', this.audio.volume.toString());
  }

  setupAutoPlayGesture() {
    const tryPlay = () => {
      if (this.isPlaying || this.isMutedByUser) return;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUI();
        removeListeners();
      }).catch(() => {});
    };

    const removeListeners = () => {
      window.removeEventListener('click', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };

    window.addEventListener('click', tryPlay, { once: true, passive: true });
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    window.addEventListener('keydown', tryPlay, { once: true, passive: true });

    // Thử phát ngay nếu trình duyệt cho phép
    tryPlay();
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
      if (typeof showToast === 'function') showToast('Đang phát: ' + (this.currentSong?.title || 'Lofi'));
    }
  }

  updateUI() {
    const playBtn = document.getElementById('musicToggleBtn');
    const titleEl = document.getElementById('musicTrackTitle');

    if (playBtn) {
      playBtn.textContent = this.isPlaying ? '⏸' : '▶';
      playBtn.title = this.isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc';
    }
    if (titleEl && this.currentSong) {
      titleEl.textContent = this.currentSong.title;
    }
  }
}

const bgMusic = new BackgroundMusicPlayer();
