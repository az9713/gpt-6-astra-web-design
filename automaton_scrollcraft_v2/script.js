(() => {
  'use strict';
  const root = document.documentElement;
  const theatre = document.querySelector('.theatre');
  const aperture = document.querySelector('.aperture');
  const materials = document.querySelector('.material-journey');
  const recital = document.querySelector('.recital');
  const motionButton = document.querySelector('.motion-button');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const chapterLinks = [...document.querySelectorAll('.chapter-nav a')];
  const materialButtons = [...document.querySelectorAll('[data-material]')];
  const clamp = v => Math.max(0, Math.min(1, v));
  const ramp = (v, a, b) => clamp((v - a) / (b - a));
  const ease = v => v * v * (3 - 2 * v);
  const set = (name, value) => root.style.setProperty(name, String(value));
  let reduced = media.matches;
  let userMotionChoice = false;
  let scheduled = false;
  let sections = [];
  let lastStage = '';
  let lastMaterial = -1;
  let lastChapter = '';

  function measure() {
    sections = [theatre, aperture, materials, recital].map(el => ({
      el, top: el.getBoundingClientRect().top + scrollY,
      span: Math.max(1, el.offsetHeight - (el.querySelector('.pinned')?.offsetHeight ?? innerHeight)),
      height: el.offsetHeight
    }));
    schedule();
  }
  function paint() {
    scheduled = false;
    if (!sections.length) return;
    const y = scrollY;
    const [t, a, m] = sections.map(s => clamp((y - s.top) / s.span));
    const r = clamp((y + innerHeight - sections[3].top) / (sections[3].height + innerHeight));
    if (!reduced) {
      const curtain = ease(ramp(t, .01, .32));
      const opening = ease(ramp(t, .35, .72));
      set('--t', t.toFixed(5));
      set('--curtain', curtain.toFixed(5));
      set('--opening', opening.toFixed(5));
      set('--open-opacity', ramp(t, .32, .39).toFixed(4));
      set('--shell-opacity', (1 - ramp(t, .72, .84)).toFixed(4));
      set('--hero-opacity', (1 - ramp(t, .17, .33)).toFixed(4));
      set('--letter-opacity', (.78 - ramp(t, .6, .82) * .61).toFixed(4));
      set('--bloom-opacity', ramp(t, .76, .9).toFixed(4));
      set('--lens', a.toFixed(5));
      set('--lens-radius', `${17 + ease(ramp(a, .07, .55)) * 135}vmin`);
      set('--lens-scale', (1 + ramp(a, .52, 1) * .12).toFixed(4));
      set('--lens-title', (1 - ramp(a, .12, .31)).toFixed(4));
      set('--mechanism-opacity', ramp(a, .49, .62).toFixed(4));
      document.querySelector('.label-pin').classList.toggle('visible', a > .67 && a < .87);
      document.querySelector('.label-comb').classList.toggle('visible', a >= .87);
      set('--journey', m.toFixed(6));
      set('--material-shift', `${-m * 60}px`);
      set('--recital', r.toFixed(5));
      theatre.dataset.progress = t.toFixed(3);
      aperture.dataset.progress = a.toFixed(3);
      materials.dataset.progress = m.toFixed(3);
      const materialIndex = Math.min(2, Math.round(m * 2));
      if (materialIndex !== lastMaterial) {
        document.getElementById('material-count').textContent = `0${materialIndex + 1} / 03`;
        materialButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === materialIndex)));
        lastMaterial = materialIndex;
      }
      document.getElementById('wind-number').textContent = String(Math.round(t * 100)).padStart(2, '0');
      const caption = t < .3 ? 'Scroll slowly. Raise the curtain.' : t < .73 ? 'Keep scrolling. Release the wings.' : 'The private theatre is open.';
      if (caption !== lastStage) {
        document.getElementById('stage-caption').textContent = caption;
        lastStage = caption;
      }
    }
    const current = [...sections].reverse().find(s => y + innerHeight * .45 >= s.top) || sections[0];
    if (current.el.id !== lastChapter) {
      chapterLinks.forEach(link => {
        if (link.hash === `#${current.el.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      lastChapter = current.el.id;
    }
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(paint); }
  }
  function applyMotion() {
    root.classList.toggle('reduced', reduced);
    motionButton.setAttribute('aria-pressed', String(reduced));
    motionButton.textContent = reduced ? 'Enable full motion' : 'Reduce motion';
    measure();
  }
  motionButton.addEventListener('click', () => {
    const visible = sections.findLast?.(s => s.top <= scrollY + innerHeight * .4)?.el || theatre;
    reduced = !reduced;
    userMotionChoice = true;
    applyMotion();
    visible.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  media.addEventListener('change', event => {
    if (!userMotionChoice) { reduced = event.matches; applyMotion(); }
  });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure);
  if ('ResizeObserver' in window) {
    const sizes = new ResizeObserver(measure);
    [theatre, aperture, materials, recital].forEach(el => sizes.observe(el));
  }
  applyMotion();

  // Every scene is tied directly to scroll position, so reversing the scroll
  // reverses the composition. Native scrolling is never intercepted.
  document.querySelector('.theatre-stage').addEventListener('pointermove', event => {
    if (reduced || event.pointerType !== 'mouse') return;
    set('--px', ((event.clientX / innerWidth - .5) * 2).toFixed(3));
    set('--py', ((event.clientY / innerHeight - .5) * 2).toFixed(3));
  }, { passive: true });
  document.querySelector('.theatre-stage').addEventListener('pointerleave', () => { set('--px', 0); set('--py', 0); });
  materialButtons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.material);
    if (reduced) document.querySelectorAll('.material-panel')[index].scrollIntoView();
    else scrollTo({ top: sections[2].top + sections[2].span * index / 2, behavior: 'smooth' });
  }));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const sound = document.getElementById('sound');
  const label = sound.querySelector('.sound-label');
  const symbol = sound.querySelector('.play-symbol');
  const score = document.querySelector('.score');
  const elapsed = document.getElementById('elapsed');
  for (let i = 0; i < 42; i++) {
    const bar = document.createElement('i');
    bar.style.setProperty('--height', 5 + Math.abs(Math.sin(i * 1.7)) * 32 * Math.sin(i / 42 * Math.PI));
    bar.style.setProperty('--delay', i);
    score.appendChild(bar);
  }
  let audio;
  let bus;
  let nodes = [];
  let playing = false;
  let starting = false;
  let startedAt = 0;
  let clock;
  function stop() {
    clearInterval(clock);
    nodes.forEach(osc => { try { osc.stop(); } catch {} });
    nodes = [];
    bus?.disconnect();
    playing = false;
    sound.setAttribute('aria-pressed', 'false');
    label.textContent = 'Play the nocturne';
    symbol.textContent = '▷';
    score.classList.remove('playing');
    elapsed.textContent = '00:00 / 00:12';
  }
  async function play() {
    if (starting) return;
    starting = true;
    try {
      const AudioEngine = window.AudioContext || window.webkitAudioContext;
      if (!AudioEngine) throw new Error('Audio unavailable');
      audio ||= new AudioEngine();
      await audio.resume();
      if (document.hidden) return;
      bus = audio.createGain();
      bus.gain.value = .22;
      bus.connect(audio.destination);
      const phrase = [659.25, 783.99, 987.77, 880, 783.99, 659.25, 587.33, 783.99, 659.25, 523.25, 493.88, 523.25, 659.25, 783.99, 659.25, 523.25];
      startedAt = audio.currentTime;
      phrase.forEach((frequency, i) => {
        [1, 2.003, 4.04].forEach((partial, k) => {
          const osc = audio.createOscillator();
          const envelope = audio.createGain();
          const time = startedAt + .03 + i * .61;
          osc.type = 'sine';
          osc.frequency.value = frequency * partial;
          envelope.gain.setValueAtTime(.0001, time);
          envelope.gain.exponentialRampToValueAtTime(.38 / (1 + k * 2), time + .009);
          envelope.gain.exponentialRampToValueAtTime(.0001, time + 2.3 - k * .45);
          osc.connect(envelope).connect(bus);
          osc.start(time);
          osc.stop(time + 2.4);
          nodes.push(osc);
        });
      });
      playing = true;
      sound.setAttribute('aria-pressed', 'true');
      label.textContent = 'Return to silence';
      symbol.textContent = 'Ⅱ';
      score.classList.add('playing');
      clock = setInterval(() => {
        const seconds = Math.floor(audio.currentTime - startedAt);
        if (seconds >= 12) stop();
        else elapsed.textContent = `00:${String(seconds).padStart(2, '0')} / 00:12`;
      }, 150);
    } catch {
      stop();
      label.textContent = 'Audio unavailable';
      sound.disabled = true;
    } finally { starting = false; }
  }
  sound.addEventListener('click', () => playing ? stop() : play());
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  addEventListener('pagehide', stop);
})();
