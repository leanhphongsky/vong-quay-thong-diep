/**
 * Sacred Celestial Animation Engine (GSAP 3 + AOS)
 * Provides 120Hz cinematic physics, magnetic micro-interactions,
 * horological astrolabe spin interpolation, and Animate-On-Scroll reveals.
 */

(function (global) {
  'use strict';

  const AppAnimations = {
    /**
     * Khởi tạo toàn bộ animation engine: AOS và GSAP defaults
     */
    init: function () {
      if (typeof global.gsap !== 'undefined') {
        document.documentElement.classList.add('gsap-ready');
        console.log('🌟 Celestial GSAP Engine Ready at 120Hz');
      }

      this.initAOS();
      this.setupMagneticButtons();
      this.setupButtonBounces();
      this.playPageEntrance();
    },

    /**
     * ── 1. KHỞI TẠO AOS (Animate On Scroll) ──
     */
    initAOS: function () {
      if (typeof global.AOS !== 'undefined') {
        global.AOS.init({
          duration: 650,
          easing: 'ease-out-cubic',
          once: true,
          offset: 40,
          delay: 0,
          disableMutationObserver: false
        });
      }
    },

    refreshAOS: function () {
      if (typeof global.AOS !== 'undefined') {
        global.AOS.refresh();
      }
    },

    /**
     * ── 2. HIỆU ỨNG ENTRANCE CHO TOÀN BỘ TRANG (GSAP STAGGER) ──
     */
    playPageEntrance: function () {
      if (typeof global.gsap === 'undefined') return;

      const tl = global.gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Clear props so layout is completely unconstrained
          global.gsap.set(['.top-bar', '.hero-header', '#wheelDiscWrap', '#spinBtnWrapper', '#alreadySpunBox', '.morphic-navbar-dock', '.music-bar'], {
            clearProps: 'opacity,transform'
          });
        }
      });

      // 1. Top bar nhẹ nhàng trượt xuống
      tl.from('.top-bar', {
        y: -30,
        opacity: 0,
        duration: 0.65
      });

      // 2. Hero header & Eyebrow pill
      tl.from(['.hero-header .eyebrow-pill', '.hero-header .hero-title', '.hero-header .hero-subtitle', '.zen-breathe-guide'], {
        y: 18,
        opacity: 0,
        stagger: 0.07,
        duration: 0.55
      }, '-=0.35');

      // 3. Vòng quay thiên văn bung nở với lực đàn hồi
      tl.from('#wheelDiscWrap', {
        scale: 0.8,
        opacity: 0,
        rotation: -20,
        duration: 1.0,
        ease: 'elastic.out(1, 0.75)'
      }, '-=0.25');

      // 4. Nút bấm CTA Quay hoặc Thẻ hôm nay
      tl.from(['#spinBtnWrapper', '#alreadySpunBox'], {
        scale: 0.88,
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.6)'
      }, '-=0.5');

      // 5. Thanh dock điều hướng & trình phát nhạc đáy trang
      tl.from(['.morphic-navbar-dock', '.music-bar'], {
        y: 35,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power3.out'
      }, '-=0.45');

      // 6. Thanh thống kê inline
      tl.from('.stats-inline-strip', {
        opacity: 0,
        y: 10,
        duration: 0.45
      }, '-=0.35');
    },

    /**
     * ── 3. QUAY VÒNG THIÊN VĂN BẰNG GSAP PHYSICS INTERPOLATION ──
     */
    spinWheelWithGSAP: function (options) {
      const {
        startAngle = 0,
        targetAngle,
        duration = 5.8,
        onUpdate,
        onTick,
        onComplete
      } = options;

      if (typeof global.gsap === 'undefined') {
        if (onComplete) onComplete(targetAngle);
        return;
      }

      const spinState = { angle: startAngle };
      let lastSegIndex = -1;
      const segAngle = (Math.PI * 2) / 12;

      // Hiệu ứng kim chỉ la bàn rung lắc nhẹ ở tốc độ cao
      const pointerPin = document.getElementById('wheelPointerPin');

      const tween = global.gsap.to(spinState, {
        angle: targetAngle,
        duration: duration,
        ease: 'power4.out',
        onUpdate: function () {
          const currentAngle = spinState.angle;
          if (onUpdate) onUpdate(currentAngle);

          // Phát hiện bước qua phân đoạn
          const currentSeg = Math.floor((currentAngle % (Math.PI * 2)) / segAngle);
          if (currentSeg !== lastSegIndex) {
            lastSegIndex = currentSeg;
            if (onTick) onTick(tween.progress());

            // Nhịp kim chỉ hồi chuyển bằng GSAP micro-kick
            if (pointerPin) {
              global.gsap.fromTo(pointerPin,
                { rotation: -14, y: -2, xPercent: -50 },
                { rotation: 0, y: 0, xPercent: -50, duration: 0.12, ease: 'back.out(2)' }
              );
            }
          }
        },
        onComplete: function () {
          // Khi dừng: kim chỉ nảy nhẹ đàn hồi tinh tế
          if (pointerPin) {
            global.gsap.fromTo(pointerPin,
              { rotation: 7, xPercent: -50 },
              { rotation: 0, xPercent: -50, duration: 0.6, ease: 'elastic.out(1.2, 0.5)' }
            );
          }
          if (onComplete) onComplete(targetAngle % (Math.PI * 2));
        }
      });

      return tween;
    },

    /**
     * ── 4. CHUYỂN TAB MƯỢT MÀ BẰNG GSAP CINEMATIC CROSSFADE ──
     */
    animateViewTransition: function (outgoingView, incomingView, onHalfway) {
      if (typeof global.gsap === 'undefined' || !global.gsap) {
        if (outgoingView) outgoingView.classList.remove('active');
        if (incomingView) incomingView.classList.add('active');
        if (onHalfway) onHalfway();
        return;
      }

      if (outgoingView === incomingView) return;

      if (outgoingView) {
        global.gsap.to(outgoingView, {
          opacity: 0,
          y: -10,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
            outgoingView.classList.remove('active');
            global.gsap.set(outgoingView, { clearProps: 'opacity,transform' });

            if (incomingView) {
              incomingView.classList.add('active');
              global.gsap.fromTo(incomingView,
                { opacity: 0, y: 14 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.32,
                  ease: 'power3.out',
                  clearProps: 'opacity,transform',
                  onComplete: () => {
                    AppAnimations.refreshAOS();
                  }
                }
              );
            }
            if (onHalfway) onHalfway();
          }
        });
      } else if (incomingView) {
        incomingView.classList.add('active');
        global.gsap.fromTo(incomingView,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            onComplete: () => {
              AppAnimations.refreshAOS();
            }
          }
        );
        if (onHalfway) onHalfway();
      }
    },

    /**
     * ── 5. MỞ / ĐÓNG MODAL VỚI GSAP 3D SPRING PERSPECTIVE ──
     */
    openModal: function (modalEl, cardSelector = '.modal-card') {
      if (!modalEl) return;
      modalEl.classList.add('show');
      document.body.style.overflow = 'hidden';

      if (typeof global.gsap === 'undefined') return;

      const card = modalEl.querySelector(cardSelector);
      if (card) {
        global.gsap.fromTo(card,
          { scale: 0.88, y: 30, opacity: 0, rotationX: 5, transformPerspective: 900 },
          { scale: 1, y: 0, opacity: 1, rotationX: 0, duration: 0.42, ease: 'back.out(1.5)', clearProps: 'transformPerspective' }
        );
      }
      global.gsap.fromTo(modalEl, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' });
    },

    closeModal: function (modalEl, cardSelector = '.modal-card', onClosed) {
      if (!modalEl) return;

      if (typeof global.gsap === 'undefined') {
        modalEl.classList.remove('show');
        document.body.style.overflow = '';
        if (onClosed) onClosed();
        return;
      }

      const card = modalEl.querySelector(cardSelector);
      const tl = global.gsap.timeline({
        onComplete: function () {
          modalEl.classList.remove('show');
          document.body.style.overflow = '';
          global.gsap.set([modalEl, card], { clearProps: 'opacity,transform' });
          if (onClosed) onClosed();
        }
      });

      if (card) {
        tl.to(card, { scale: 0.93, y: 16, opacity: 0, duration: 0.2, ease: 'power2.in' });
      }
      tl.to(modalEl, { opacity: 0, duration: 0.18 }, '-=0.12');
    },

    /**
     * ── 6. DRAWER BOTTOM SHEET GSAP SLIDE & STAGGER ──
     */
    openDrawer: function (backdropEl, sheetSelector = '.drawer-sheet') {
      if (!backdropEl) return;
      backdropEl.classList.add('show');
      document.body.style.overflow = 'hidden';

      if (typeof global.gsap === 'undefined') return;

      const sheet = backdropEl.querySelector(sheetSelector);
      if (sheet) {
        global.gsap.fromTo(sheet,
          { y: '100%' },
          { y: '0%', duration: 0.42, ease: 'power3.out' }
        );

        const sections = sheet.querySelectorAll('.sheet-section');
        if (sections.length > 0) {
          global.gsap.fromTo(sections,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, delay: 0.12, ease: 'power2.out', clearProps: 'opacity,transform' }
          );
        }
      }
      global.gsap.fromTo(backdropEl, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    },

    closeDrawer: function (backdropEl, sheetSelector = '.drawer-sheet', onClosed) {
      if (!backdropEl) return;

      if (typeof global.gsap === 'undefined') {
        backdropEl.classList.remove('show');
        document.body.style.overflow = '';
        if (onClosed) onClosed();
        return;
      }

      const sheet = backdropEl.querySelector(sheetSelector);
      const tl = global.gsap.timeline({
        onComplete: function () {
          backdropEl.classList.remove('show');
          document.body.style.overflow = '';
          global.gsap.set([backdropEl, sheet], { clearProps: 'opacity,transform' });
          if (onClosed) onClosed();
        }
      });

      if (sheet) {
        tl.to(sheet, { y: '100%', duration: 0.28, ease: 'power3.in' });
      }
      tl.to(backdropEl, { opacity: 0, duration: 0.22 }, '-=0.08');
    },

    /**
     * ── 7. CAPSULE INDICATOR ELASTIC SLIDE (Kokonut UI Dock) ──
     */
    slideIndicator: function (indicatorEl, targetButtonEl) {
      if (!indicatorEl || !targetButtonEl) return;

      const targetX = targetButtonEl.offsetLeft;
      const targetW = targetButtonEl.offsetWidth;

      if (typeof global.gsap === 'undefined') {
        indicatorEl.style.transform = `translateX(${targetX}px)`;
        indicatorEl.style.width = `${targetW}px`;
        indicatorEl.style.opacity = '1';
        return;
      }

      global.gsap.to(indicatorEl, {
        x: targetX,
        width: targetW,
        opacity: 1,
        duration: 0.42,
        ease: 'elastic.out(1, 0.8)'
      });
    },

    /**
     * ── 8. PHÁ VỠ ẤN SÁP & MỞ LÁ THƯ KHAI SÁNG ──
     */
    crackWaxSeal: function (waxCardEl, letterCardEl, onComplete) {
      if (typeof global.gsap === 'undefined') {
        if (waxCardEl) waxCardEl.style.display = 'none';
        if (letterCardEl) letterCardEl.classList.add('show');
        if (onComplete) onComplete();
        return;
      }

      const sealBtn = waxCardEl ? waxCardEl.querySelector('.wax-seal-btn') : null;
      const tl = global.gsap.timeline();

      if (sealBtn) {
        tl.to(sealBtn, {
          scale: 1.3,
          rotation: 12,
          filter: 'brightness(1.4)',
          duration: 0.2,
          ease: 'power2.out'
        });
        tl.to(waxCardEl, {
          opacity: 0,
          scale: 0.92,
          duration: 0.26,
          ease: 'power2.in',
          onComplete: () => {
            if (waxCardEl) waxCardEl.style.display = 'none';
            if (letterCardEl) {
              letterCardEl.classList.add('show');
              global.gsap.fromTo(letterCardEl,
                { opacity: 0, scale: 0.88, y: 25, rotationX: -10, transformPerspective: 800 },
                { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.65, ease: 'back.out(1.6)', clearProps: 'transformPerspective' }
              );
            }
            if (onComplete) onComplete();
          }
        });
      }
    },

    /**
     * ── 9. MAGNETIC BUTTON MICRO-INTERACTION ──
     */
    setupMagneticButtons: function () {
      if (typeof window === 'undefined' || !window.matchMedia('(hover: hover)').matches) return;
      if (typeof global.gsap === 'undefined') return;

      const magneticElements = document.querySelectorAll('.btn-cta-spin, .btn-gold, .brand-link');
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', function (e) {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
          global.gsap.to(el, { x, y, duration: 0.25, ease: 'power2.out' });
        });

        el.addEventListener('mouseleave', function () {
          global.gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1.1, 0.45)' });
        });
      });
    },

    /**
     * ── 10. BUTTON CLICK BOUNCE ──
     */
    setupButtonBounces: function () {
      if (typeof global.gsap === 'undefined') return;
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn, .energy-pill, .cat-filter-btn');
        if (btn) {
          global.gsap.fromTo(btn,
            { scale: 0.94 },
            { scale: 1, duration: 0.25, ease: 'back.out(2)' }
          );
        }
      });
    },

    /**
     * ── 11. ZEN BREATHE INTERACTIVE TIMELINE ──
     */
    triggerBreatheCycle: function (orbEl, textEl, onFinish) {
      if (typeof global.gsap === 'undefined') return;

      const tl = global.gsap.timeline({
        onComplete: function () {
          if (textEl) textEl.textContent = 'Nhịp thở lắng đọng, tâm an tịnh';
          if (onFinish) onFinish();
        }
      });

      // Giai đoạn 1: Hít vào (4s)
      tl.call(() => { if (textEl) textEl.textContent = 'Hít sâu vào... cảm nhận sự bình an (4s)'; });
      tl.to(orbEl, { scale: 2.2, opacity: 1, duration: 4, ease: 'power1.inOut' });

      // Giai đoạn 2: Giữ hơi thở (3s)
      tl.call(() => { if (textEl) textEl.textContent = 'Giữ nhẹ hơi thở... tĩnh lặng tâm hồn (3s)'; });
      tl.to(orbEl, { scale: 2.35, duration: 3, ease: 'none' });

      // Giai đoạn 3: Thở ra (4s)
      tl.call(() => { if (textEl) textEl.textContent = 'Thở chậm ra... buông bỏ mọi âu lo (4s)'; });
      tl.to(orbEl, { scale: 1, opacity: 0.6, duration: 4, ease: 'power1.inOut' });
    }
  };

  global.AppAnimations = AppAnimations;
})(window);
