const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (new URLSearchParams(location.search).get('corners') === 'soft') document.documentElement.dataset.corners = 'soft';

const header = document.querySelector('.float-nav');
const toggle = document.querySelector('.mobile-menu');
const menu = document.getElementById('menu');
function closeMenu() {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Apri il menu');
}
function collapseNav(collapse) {
  if (collapse && (menu.contains(document.activeElement) || toggle === document.activeElement)) return;
  header.classList.toggle('collapsed', collapse);
  menu.inert = collapse;
  toggle.inert = collapse;
  if (collapse) closeMenu();
}
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { closeMenu(); a.blur(); }));
header.addEventListener('focusin', () => collapseNav(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.float-nav')) closeMenu(); });

let lastY = window.scrollY;
let direction = 0;
let travel = 0;
let scheduled = false;
function updateNavigation() {
  const y = Math.max(0, window.scrollY);
  const delta = y - lastY;
  const nextDirection = Math.sign(delta);
  if (nextDirection && nextDirection !== direction) { travel = 0; direction = nextDirection; }
  travel += Math.abs(delta);
  if (y < 65) collapseNav(false);
  else if (travel > 18 && !menu.classList.contains('open')) collapseNav(direction > 0 && y > 120);
  lastY = y;
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', () => { closeMenu(); collapseNav(false); });

// Illustrative placeholder catalogue, not a confirmed clinical offer.
const serviceContent = {
  sport: { title: 'Riabilitazione sportiva.', description: 'Un percorso orientato alle attività sportive che vuoi recuperare. Condividiamo obiettivi, esercizi e valutazioni utili a seguire l’evoluzione delle tue capacità.' },
  movement: { title: 'Dolore e movimento.', description: 'Partiamo da come il dolore incide sulla tua vita. Valutiamo come adattare le attività e costruiamo strumenti di gestione attraverso un percorso condiviso e individuale.' },
  recovery: { title: 'Dopo un intervento.', description: 'Dalla valutazione iniziale definiamo obiettivi e passi del recupero, tenendo conto dell’intervento, delle indicazioni cliniche e delle attività a cui desideri tornare.' },
  mobility: { title: 'Mobilità quotidiana.', description: 'Servizio segnaposto: un percorso dedicato ai movimenti della vita quotidiana, da definire con il professionista.' },
  strength: { title: 'Forza e controllo.', description: 'Servizio segnaposto: attività per esplorare forza e controllo del movimento, da definire con il professionista.' },
  assessment: { title: 'Valutazioni funzionali.', description: 'Quando indicato, test di forza, equilibrio e salto aiutano a comprendere le capacità attuali e a seguire i cambiamenti nel tempo, insieme alla tua esperienza.' }
};
const serviceDialog = document.getElementById('service-dialog');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = serviceContent[button.dataset.service];
  document.getElementById('service-title').textContent = service.title;
  document.getElementById('service-description').textContent = service.description;
  serviceDialog.showModal();
}));
document.getElementById('service-contact')?.addEventListener('click', () => serviceDialog.close());
const requestDialog = document.getElementById('request-dialog');
document.getElementById('close-dialog')?.addEventListener('click', () => requestDialog.close());
document.querySelectorAll('.dialog-close').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));

const track = document.getElementById('gallery-track');
if (track) {
const prev = document.getElementById('gallery-prev');
const next = document.getElementById('gallery-next');
const progress = document.querySelector('.gallery-progress span');
function moveGallery(direction) {
  const card = track.querySelector('.service-card');
  const distance = card.offsetWidth + parseFloat(getComputedStyle(track).gap);
  track.scrollBy({ left: direction * distance, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
function updateGallery() {
  const max = track.scrollWidth - track.clientWidth;
  const ratio = max > 0 ? Math.max(0, Math.min(1, track.scrollLeft / max)) : 0;
  const visible = Math.min(1, track.clientWidth / track.scrollWidth);
  progress.style.width = (visible * 100) + '%';
  progress.style.transform = `translateX(${ratio * (1 - visible) / visible * 100}%)`;
  prev.disabled = track.scrollLeft <= 3;
  next.disabled = track.scrollLeft >= max - 3;
}
prev.addEventListener('click', () => moveGallery(-1));
next.addEventListener('click', () => moveGallery(1));
track.addEventListener('scroll', updateGallery, { passive: true });
window.addEventListener('resize', updateGallery);
track.addEventListener('keydown', e => {
  if (e.target !== track) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); moveGallery(e.key === 'ArrowRight' ? 1 : -1); }
});
let drag = null;
track.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('button')) return;
  drag = { x: e.clientX, scroll: track.scrollLeft, moved: false };
  track.setPointerCapture(e.pointerId);
});
track.addEventListener('pointermove', e => {
  if (!drag) return;
  const delta = e.clientX - drag.x;
  if (Math.abs(delta) > 5) { drag.moved = true; track.classList.add('dragging'); }
  if (drag.moved) track.scrollLeft = drag.scroll - delta;
});
function endDrag() { drag = null; track.classList.remove('dragging'); }
track.addEventListener('pointerup', endDrag);
track.addEventListener('pointercancel', endDrag);
track.addEventListener('lostpointercapture', endDrag);
updateGallery();

}

// Manual narrative: no automatic progression or scroll capture.
const visitTabs = [...document.querySelectorAll('.visit-tabs [role="tab"]')];
if (visitTabs.length) {
  const panels = [...document.querySelectorAll('.visit-panel')];
  const previous = document.getElementById('visit-prev');
  const following = document.getElementById('visit-next');
  let step = 0;
  function showStep(index, focusTab = false) {
    step = Math.max(0, Math.min(visitTabs.length - 1, index));
    visitTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === step));
      tab.tabIndex = i === step ? 0 : -1;
      panels[i].hidden = i !== step;
    });
    previous.disabled = step === 0;
    following.disabled = step === visitTabs.length - 1;
    document.getElementById('visit-status').textContent = `${step + 1} di ${visitTabs.length} · ${visitTabs[step].textContent.slice(2)}`;
    if (focusTab) visitTabs[step].focus({ preventScroll: true });
  }
  visitTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showStep(index));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (step + 1) % visitTabs.length;
      if (event.key === 'ArrowLeft') target = (step - 1 + visitTabs.length) % visitTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = visitTabs.length - 1;
      if (target !== undefined) { event.preventDefault(); showStep(target, true); }
    });
  });
  previous.addEventListener('click', () => { showStep(step - 1); if (previous.disabled) visitTabs[step].focus({preventScroll:true}); });
  following.addEventListener('click', () => { showStep(step + 1); if (following.disabled) visitTabs[step].focus({preventScroll:true}); });
}
