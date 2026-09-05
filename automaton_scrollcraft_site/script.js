(() => {
  const root = document.documentElement;
  const overture = document.querySelector('.overture');
  const movement = document.querySelector('.movement');
  const annotations = [...document.querySelectorAll('.annotation')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const sectionProgress = (section) => {
    const rect = section.getBoundingClientRect();
    return clamp(-rect.top / (rect.height - window.innerHeight));
  };

  let ticking = false;
  const paint = () => {
    const heroP = sectionProgress(overture);
    const movementP = sectionProgress(movement);

    root.style.setProperty('--hero-p', heroP.toFixed(4));
    root.style.setProperty('--closed-o', clamp(1 - (heroP - .22) / .2).toFixed(3));
    root.style.setProperty('--open-o', clamp((heroP - .27) / .24).toFixed(3));
    root.style.setProperty('--reveal-o', clamp((heroP - .58) / .16).toFixed(3));
    root.style.setProperty('--movement-p', movementP.toFixed(4));

    annotations[0]?.classList.toggle('active', movementP > .24 && movementP < .57);
    annotations[1]?.classList.toggle('active', movementP > .47 && movementP < .80);
    annotations[2]?.classList.toggle('active', movementP > .70);
    ticking = false;
  };

  const requestPaint = () => {
    if (!ticking) {
      requestAnimationFrame(paint);
      ticking = true;
    }
  };
  addEventListener('scroll', requestPaint, { passive: true });
  addEventListener('resize', requestPaint);
  paint();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .16 });
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
    observer.observe(element);
  });

  const waveform = document.getElementById('waveform');
  const barCount = 72;
  for (let i = 0; i < barCount; i += 1) {
    const bar = document.createElement('i');
    const contour = Math.sin((i / (barCount - 1)) * Math.PI);
    const rhythm = .35 + .65 * Math.abs(Math.sin(i * 1.73));
    bar.style.setProperty('--height', Math.round(8 + contour * rhythm * 62));
    bar.style.setProperty('--speed', i % 9);
    bar.style.setProperty('--delay', i);
    waveform.appendChild(bar);
  }

  const soundToggle = document.getElementById('soundToggle');
  const soundLabel = soundToggle.querySelector('.sound-label');
  let audioContext;
  let master;
  let stopTimer;
  let playing = false;

  const stopSound = () => {
    if (!playing) return;
    const now = audioContext?.currentTime || 0;
    master?.gain.cancelScheduledValues(now);
    master?.gain.setValueAtTime(master.gain.value, now);
    master?.gain.exponentialRampToValueAtTime(.0001, now + .35);
    playing = false;
    clearTimeout(stopTimer);
    waveform.classList.remove('playing');
    soundToggle.setAttribute('aria-pressed', 'false');
    soundLabel.textContent = 'Hear the movement';
  };

  const playSound = async () => {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    await audioContext.resume();
    master = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();
    master.gain.value = .42;
    master.connect(compressor).connect(audioContext.destination);

    const notes = [523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33, 523.25, 392, 493.88, 523.25];
    const start = audioContext.currentTime + .08;
    notes.forEach((frequency, index) => {
      const at = start + index * .78;
      [1, 2.01, 3.98].forEach((partial, partialIndex) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = partialIndex === 0 ? 'sine' : 'triangle';
        oscillator.frequency.value = frequency * partial;
        gain.gain.setValueAtTime(.0001, at);
        gain.gain.exponentialRampToValueAtTime(.2 / (partialIndex + 1), at + .018);
        gain.gain.exponentialRampToValueAtTime(.0001, at + 1.9 - partialIndex * .28);
        oscillator.connect(gain).connect(master);
        oscillator.start(at);
        oscillator.stop(at + 2);
      });
    });

    playing = true;
    waveform.classList.add('playing');
    soundToggle.setAttribute('aria-pressed', 'true');
    soundLabel.textContent = 'Return to silence';
    stopTimer = setTimeout(stopSound, 10800);
  };

  soundToggle.addEventListener('click', () => playing ? stopSound() : playSound());
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopSound(); });
  reducedMotion.addEventListener?.('change', requestPaint);

  // Re-apply deep links after the large hero images have established layout.
  if (location.hash) {
    addEventListener('load', () => {
      setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 80);
    });
  }

})();
