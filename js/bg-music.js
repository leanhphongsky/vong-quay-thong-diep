// ============================================================
// BACKGROUND LOFI MUSIC PLAYER v3.0 (Liền Mạch · Lời Thiền Định · Chill Tab)
// ============================================================

const SONG_LIST = [
  {
    id: 1,
    title: 'Lofi 1 · Khởi Đầu Tĩnh Lặng',
    mood: 'Tĩnh Lặng',
    file: 'songs/Lofi 1.m4a',
    lyrics: [
      { time: 0, text: '✦ Giai điệu tĩnh lặng mở ra một ngày mới...' },
      { time: 8, text: 'Hít một hơi thật sâu, cảm nhận lồng ngực căng tràn sự sống' },
      { time: 18, text: 'Thả lỏng đôi vai, để những muộn phiền hôm qua tan biến' },
      { time: 30, text: 'Mỗi sớm mai thức dậy là một món quà thuần khiết' },
      { time: 42, text: 'Bạn không cần phải vội vã, vạn vật đều đang đúng thời điểm' },
      { time: 55, text: 'Tĩnh lặng không phải là trống rỗng, mà là nơi trí tuệ bắt đầu' },
      { time: 68, text: 'Lắng nghe tiếng thở, bạn đang trọn vẹn ở giây phút này' },
      { time: 82, text: 'Bình an là sự lựa chọn, và hôm nay tôi chọn bình an' },
      { time: 94, text: '✦ Mỉm cười an nhiên bước vào dòng chảy cuộc sống ✦' }
    ]
  },
  {
    id: 2,
    title: 'Lofi 2 · Chữa Lành Tâm Hồn',
    mood: 'Chữa Lành',
    file: 'songs/Lofi 2.m4a',
    lyrics: [
      { time: 0, text: '✦ Giai điệu dịu êm vỗ về những mỏi mệt...' },
      { time: 6, text: 'Đã bao lâu rồi bạn chưa tự ôm lấy chính mình?' },
      { time: 14, text: 'Những vết sẹo hôm nay là minh chứng cho sự kiên cường' },
      { time: 24, text: 'Cho phép bản thân được nghỉ ngơi, bạn đã làm rất tốt rồi' },
      { time: 33, text: 'Tha thứ cho những điều chưa trọn vẹn trong quá khứ' },
      { time: 42, text: 'Yêu thương bản thân chính là cội nguồn của mọi sự chữa lành' },
      { time: 50, text: 'Trái tim bạn xứng đáng được ngập tràn trong ánh sáng ấm áp' },
      { time: 58, text: '✦ Bình yên trở lại, dịu dàng như một cái ôm ✦' }
    ]
  },
  {
    id: 3,
    title: 'Lofi 3 · Bình An Nội Tại',
    mood: 'Bình An',
    file: 'songs/Lofi 3.m4a',
    lyrics: [
      { time: 0, text: '✦ Âm thanh đưa tâm trí trở về trạng thái nguyên bản...' },
      { time: 14, text: 'Giữa dòng đời tấp nập, hãy giữ một khoảng trời tĩnh tại' },
      { time: 28, text: 'Nhìn vào bên trong, nơi không có phán xét hay tranh đua' },
      { time: 44, text: 'Vững vàng như ngọn núi, mềm mại như dòng nước trôi' },
      { time: 62, text: 'Không điều gì bên ngoài có thể làm lung lay sự tĩnh tại nơi bạn' },
      { time: 80, text: 'Buông bỏ những mong cầu không cần thiết để tâm hồn nhẹ bẫng' },
      { time: 100, text: 'Nhận diện hiện tại: Tôi đang có mặt ở đây, bây giờ' },
      { time: 120, text: 'Hít vào an tịnh, thở ra mỉm cười thanh thản' },
      { time: 142, text: 'Niềm vui đích thực bắt đầu từ sự tự do trong tâm trí' },
      { time: 165, text: 'Bình an là tài sản quý giá nhất bạn có thể trao tặng cho mình' },
      { time: 190, text: '✦ Giữ lấy ánh sáng nội tâm dẫn lối qua mọi thăng trầm ✦' }
    ]
  },
  {
    id: 4,
    title: 'Lofi 4 · Dòng Chảy Vũ Trụ',
    mood: 'Thuận Dòng',
    file: 'songs/Lofi 4.mp3',
    lyrics: [
      { time: 0, text: '✦ Hòa mình vào nhịp đập bao la của vũ trụ...' },
      { time: 14, text: 'Mọi cuộc gặp gỡ, mọi sự kiện đều mang một thông điệp riêng' },
      { time: 30, text: 'Đừng cố ép dòng sông phải chảy ngược hướng' },
      { time: 48, text: 'Học cách buông tay và tin tưởng vào hành trình của cuộc đời' },
      { time: 68, text: 'Khi bạn thuận dòng, vũ trụ sẽ mở ra những cánh cửa bất ngờ' },
      { time: 88, text: 'Những thử thách chỉ là khúc ngoặt tôi luyện bản lĩnh của bạn' },
      { time: 110, text: 'Giữ một tâm thế rộng mở đón nhận mọi đổi thay' },
      { time: 132, text: 'Bạn là một phần tuyệt đẹp của bức tranh tổng thể vĩ đại' },
      { time: 154, text: 'Mọi điều xảy ra đều đang dẫn bạn đến nơi bạn cần thuộc về' },
      { time: 178, text: 'Hãy bước đi với lòng biết ơn và sự tin tưởng thuần khiết' },
      { time: 200, text: '✦ Vạn sự tùy duyên, tâm an vạn sự an ✦' }
    ]
  },
  {
    id: 5,
    title: 'Lofi 5 · Nắng Sớm An Nhiên',
    mood: 'An Nhiên',
    file: 'songs/Lofi 5.m4a',
    lyrics: [
      { time: 0, text: '✦ Từng tia nắng vàng chiếu rọi qua khung cửa sổ...' },
      { time: 8, text: 'Cảm ơn một ngày mới để ta tiếp tục yêu và được yêu' },
      { time: 18, text: 'Hương thơm của tách trà ấm, giọt sương mai đọng trên lá' },
      { time: 30, text: 'Mang năng lượng tươi sáng vào từng ánh mắt, nụ cười' },
      { time: 44, text: 'Ngày hôm nay là một trang giấy mới toanh chờ bạn viết nên' },
      { time: 58, text: 'Gửi lời chúc bình an đến tất cả những người bạn gặp gỡ' },
      { time: 72, text: 'Hạnh phúc giản đơn luôn hiện diện ngay quanh ta' },
      { time: 86, text: '✦ Đón nhận ngày mới với trọn vẹn niềm hân hoan ✦' }
    ]
  },
  {
    id: 6,
    title: 'Lofi 6 · Hoàng Hôn Tĩnh Tại',
    mood: 'Tĩnh Tại',
    file: 'songs/Lofi 6.m4a',
    lyrics: [
      { time: 0, text: '✦ Ráng chiều buông xuống, nhuộm ấm cả không gian...' },
      { time: 8, text: 'Một ngày dài trôi qua, đã đến lúc tâm trí được nghỉ ngơi' },
      { time: 18, text: 'Cảm ơn bản thân vì đã nỗ lực hết mình trong hôm nay' },
      { time: 30, text: 'Hoàng hôn là minh chứng rằng sự kết thúc cũng có thể rất đẹp' },
      { time: 44, text: 'Gác lại công việc, gác lại những toan tính đời thường' },
      { time: 58, text: 'Trở về với không gian yên ấm, tĩnh lặng của chính mình' },
      { time: 70, text: 'Lòng nhẹ nhõm biết ơn tất cả những trải nghiệm đã qua' },
      { time: 80, text: '✦ Chúc tâm hồn bạn có một buổi tối thật an lành ✦' }
    ]
  },
  {
    id: 7,
    title: 'Lofi 7 · Tiếng Chuông Gió',
    mood: 'Thanh Khiết',
    file: 'songs/Lofi 7.m4a',
    lyrics: [
      { time: 0, text: '✦ Tiếng chuông gió ngân nga trong làn gió nhẹ...' },
      { time: 8, text: 'Âm thanh trong veo đánh thức sự tỉnh thức nơi tâm hồn' },
      { time: 20, text: 'Gió thổi qua cuốn đi lớp bụi mờ của những lắng lo' },
      { time: 34, text: 'Giữ tâm trí trong trẻo như giọt sương mai đầu cành' },
      { time: 48, text: 'Lắng nghe thanh âm của thiên nhiên để tìm lại chính mình' },
      { time: 62, text: 'Mỗi tiếng chuông là lời nhắc nhở: Hãy quay về với hiện tại' },
      { time: 76, text: 'Bình yên không ở đâu xa, bình yên nằm ngay trong tâm bạn' },
      { time: 88, text: '✦ Tiếng chuông ngân vang, tâm hồn thanh tịnh và rộng mở ✦' }
    ]
  },
  {
    id: 8,
    title: 'Lofi 8 · Giấc Mơ Tinh Vân',
    mood: 'Bay Bổng',
    file: 'songs/Lofi 8.m4a',
    lyrics: [
      { time: 0, text: '✦ Trôi dạt giữa những dải ngân hà lấp lánh...' },
      { time: 10, text: 'Nhìn lên bầu trời đêm, thấy mình thật tự do và rộng mở' },
      { time: 22, text: 'Cho phép tâm trí bay bổng qua những vì sao xa' },
      { time: 36, text: 'Ước mơ là hạt mầm nuôi dưỡng hy vọng và tương lai' },
      { time: 50, text: 'Hãy can đảm mơ những giấc mơ lớn và sống thật tử tế' },
      { time: 64, text: 'Trong vũ trụ bao la, bạn là một thực thể độc nhất vô nhị' },
      { time: 78, text: 'Thư thái thả lỏng, để giấc mơ dẫn lối vào bình yên' },
      { time: 92, text: '✦ Những vì sao luôn tỏa sáng lặng thầm bên bạn ✦' }
    ]
  },
  {
    id: 9,
    title: 'Lofi 9 · Trở Về Với Mình',
    mood: 'Tỉnh Thức',
    file: 'songs/Lofi 9.m4a',
    lyrics: [
      { time: 0, text: '✦ Nốt nhạc đưa ta trở về ngôi nhà bình yên nhất...' },
      { time: 8, text: 'Dù đi đâu thật xa, nơi cần trở về nhất vẫn là chính mình' },
      { time: 18, text: 'Lắng nghe nhịp tim đều đặn, nguồn sống quý giá từng giây' },
      { time: 30, text: 'Chấp nhận bản thân với tất cả những ưu và khuyết điểm' },
      { time: 44, text: 'Không cần phải cố gắng trở thành ai khác ngoài phiên bản chân thật' },
      { time: 58, text: 'Nụ cười này, hơi thở này, cuộc đời này là của bạn' },
      { time: 70, text: 'Trọn vẹn với giây phút hiện tại, đó là sự giàu có lớn nhất' },
      { time: 80, text: '✦ Bình an trong lòng là bình an cho cả thế giới ✦' }
    ]
  }
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

  get currentSongLyrics() {
    return (this.currentSong && Array.isArray(this.currentSong.lyrics)) ? this.currentSong.lyrics : [];
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
      if (typeof window.onMusicPlayStateChange === 'function') {
        window.onMusicPlayStateChange(true);
      }
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      sessionStorage.setItem('vqtd_music_playing', 'false');
      this.updateUI();
      if (typeof window.onMusicPlayStateChange === 'function') {
        window.onMusicPlayStateChange(false);
      }
    });

    // Lưu vị trí phát và bắn event đồng bộ Lyrics
    this.audio.addEventListener('timeupdate', () => {
      const cur = this.audio.currentTime || 0;
      const dur = this.audio.duration || 0;

      if (this.currentSong && Math.floor(cur) % 2 === 0) {
        sessionStorage.setItem('vqtd_music_time', cur.toString());
        sessionStorage.setItem('vqtd_music_song_id', this.currentSong.id.toString());
      }

      if (typeof window.onMusicTimeUpdate === 'function') {
        window.onMusicTimeUpdate(cur, dur);
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
    this.notifySongChange();
  }

  switchTrack(newIndex) {
    this.currentIndex = (newIndex + SONG_LIST.length) % SONG_LIST.length;
    this.currentSong = SONG_LIST[this.currentIndex];
    sessionStorage.removeItem('vqtd_music_time');
    sessionStorage.setItem('vqtd_music_song_id', this.currentSong.id.toString());

    // 1. Cập nhật UI ngay tức khắc trong 0ms (Tên bài, lời bài hát, đĩa quay, thẻ playlist)
    this.updateUI();
    if (typeof window.onMusicSongChange === 'function') {
      window.onMusicSongChange(this.currentSong);
    }

    if (typeof showToast === 'function') {
      showToast('Đang phát: ' + this.currentSong.title);
    }

    // 2. Tải và phát audio an toàn không bị pending promise
    try {
      this.audio.pause();
    } catch (e) {}

    this.audio.currentTime = 0;
    this.audio.src = encodeURI(this.currentSong.file);
    this.audio.load();

    this.isPlaying = true;
    this.isMutedByUser = false;
    localStorage.setItem('vqtd_music_muted', 'false');
    this.updateUI();

    const p = this.audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        this.isPlaying = true;
        this.updateUI();
        if (typeof window.onMusicPlayStateChange === 'function') {
          window.onMusicPlayStateChange(true);
        }
      }).catch(err => {
        if (err.name !== 'AbortError') {
          console.warn("Lỗi phát audio:", err);
        }
      });
    }
  }

  playRandomNext() {
    if (this.unplayedIndices.length === 0) {
      this.resetQueue();
      if (this.currentSong && SONG_LIST[this.unplayedIndices[0]].id === this.currentSong.id && this.unplayedIndices.length > 1) {
        [this.unplayedIndices[0], this.unplayedIndices[1]] = [this.unplayedIndices[1], this.unplayedIndices[0]];
      }
    }
    const nextIdx = this.unplayedIndices.pop();
    this.switchTrack(nextIdx);
  }

  playSongById(id) {
    const idx = SONG_LIST.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.switchTrack(idx);
    }
  }

  nextTrack() {
    this.switchTrack(this.currentIndex + 1);
  }

  prevTrack() {
    this.switchTrack(this.currentIndex - 1);
  }

  seekTo(seconds) {
    if (isNaN(seconds)) return;
    const dur = this.audio.duration || 0;
    const target = Math.max(0, dur ? Math.min(dur, seconds) : seconds);
    this.audio.currentTime = target;
  }

  seekBy(deltaSeconds) {
    this.seekTo((this.audio.currentTime || 0) + deltaSeconds);
  }

  notifySongChange() {
    this.updateUI();
    if (typeof window.onMusicSongChange === 'function') {
      window.onMusicSongChange(this.currentSong);
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
      if (typeof window.onMusicPlayStateChange === 'function') {
        window.onMusicPlayStateChange(true);
      }
    }).catch(err => {
      console.warn("Lỗi phát nhạc:", err);
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI();
    if (typeof window.onMusicPlayStateChange === 'function') {
      window.onMusicPlayStateChange(false);
    }
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

  getCurrentLyric(time) {
    const lyrics = this.currentSongLyrics;
    if (!lyrics.length) return null;
    const curTime = typeof time === 'number' ? time : (this.audio.currentTime || 0);
    let active = lyrics[0];
    for (let i = 0; i < lyrics.length; i++) {
      if (curTime >= lyrics[i].time) {
        active = lyrics[i];
      } else {
        break;
      }
    }
    return active;
  }

  getCurrentLyricIndex(time) {
    const lyrics = this.currentSongLyrics;
    if (!lyrics.length) return -1;
    const curTime = typeof time === 'number' ? time : (this.audio.currentTime || 0);
    let idx = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (curTime >= lyrics[i].time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }

  updateUI() {
    const playBtn = document.getElementById('musicToggleBtn');
    const heroBtn = document.getElementById('chillHeroPlayBtn');
    const titleEl = document.getElementById('musicTrackTitle');
    const miniLyric = document.getElementById('musicMiniLyric');
    const vinyl = document.getElementById('vinylDisc');

    if (playBtn) {
      if (window.Icons && typeof window.Icons.get === 'function') {
        playBtn.innerHTML = Icons.get(this.isPlaying ? 'pause' : 'play', 'svg-icon-sm');
      } else {
        playBtn.textContent = this.isPlaying ? '⏸' : '▶';
      }
      playBtn.title = this.isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc';
    }

    if (heroBtn) {
      if (window.Icons && typeof window.Icons.get === 'function') {
        heroBtn.innerHTML = Icons.get(this.isPlaying ? 'pause' : 'play', 'svg-icon-lg');
      } else {
        heroBtn.textContent = this.isPlaying ? '⏸' : '▶';
      }
    }

    if (titleEl && this.currentSong) {
      titleEl.textContent = this.currentSong.title;
    }

    if (vinyl) {
      if (this.isPlaying) {
        vinyl.classList.add('spinning');
      } else {
        vinyl.classList.remove('spinning');
      }
    }

    const currentLyric = this.getCurrentLyric();
    if (miniLyric && currentLyric) {
      miniLyric.textContent = '♪ ' + currentLyric.text.replace(/^✦\s*/, '');
    }
  }
}

const bgMusic = new BackgroundMusicPlayer();
