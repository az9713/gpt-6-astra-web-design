(() => {
  'use strict';
  const frames = [...document.querySelectorAll('iframe')];
  const viewport = document.querySelector('#viewport');
  const slider = document.querySelector('#progress');
  const output = document.querySelector('#progress-value');
  const status = document.querySelector('#status');
  const buttons = [...document.querySelectorAll('[data-scene]')];
  let scene = 'opening';
  const ready = new Set();
  const chapters = {
    opening: [{section:'.overture',pin:'.hero-sticky'},{section:'.theatre',pin:'.pinned'}],
    mechanism: [{section:'.movement',pin:'.movement-sticky'},{section:'.aperture',pin:'.pinned'}],
    craft: [{section:'.making'},{section:'.material-journey',pin:'.pinned'}],
    listening: [{section:'.listening'},{section:'.recital'}]
  };
  function matchScene() {
    output.value = `${slider.value}%`;
    if (ready.size !== frames.length) return;
    try {
      const p = Number(slider.value) / 100;
      frames.forEach((frame, i) => {
        const win = frame.contentWindow;
        const spec = chapters[scene][i];
        const section = win.document.querySelector(spec.section);
        const pin = spec.pin && section.querySelector(spec.pin);
        const y = section.getBoundingClientRect().top + win.scrollY;
        const span = Math.max(0, section.offsetHeight - (pin ? pin.offsetHeight : win.innerHeight));
        win.scrollTo({top:y + p * span,behavior:'instant'});
      });
      status.textContent = `Matched ${scene === 'craft' ? 'making / materials' : scene} at ${slider.value}%. You can still scroll either frame independently.`;
    } catch {
      status.textContent = 'Scene controls need the same local server for both sites. Open this folder through localhost, or use the full-size links.';
    }
  }
  function fit() {
    const [w,h] = viewport.value === 'phone' ? [390,844] : [1200,800];
    frames.forEach(frame => {
      const stage = frame.parentElement;
      stage.style.maxWidth = viewport.value === 'phone' ? '390px' : 'none';
      stage.style.marginInline = 'auto';
      const scale = stage.clientWidth / w;
      frame.style.width = `${w}px`;
      frame.style.height = `${h}px`;
      frame.style.transform = `scale(${scale})`;
      stage.style.height = `${h * scale + 2}px`;
    });
  }
  frames.forEach(frame => frame.addEventListener('load', () => {ready.add(frame);fit();matchScene();}));
  viewport.addEventListener('change', () => {fit();requestAnimationFrame(() => requestAnimationFrame(matchScene));});
  buttons.forEach(button => button.addEventListener('click', () => {
    scene = button.dataset.scene;
    slider.value = '0';
    buttons.forEach(b => b.setAttribute('aria-pressed',String(b === button)));
    matchScene();
  }));
  slider.addEventListener('input',matchScene);
  new ResizeObserver(fit).observe(document.querySelector('.comparison'));
  fit();
})();
