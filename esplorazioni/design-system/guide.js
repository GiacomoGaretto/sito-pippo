// Standalone examples: no requests, storage or clinical interpretation.
const regions = [...document.querySelectorAll('.region')];
function setRegion(button, selected) {
  button.setAttribute('aria-pressed', String(selected));
  button.querySelector('span').textContent = selected ? '✓' : '+';
}
regions.forEach(button => button.addEventListener('click', () => setRegion(button, button.getAttribute('aria-pressed') !== 'true')));
document.querySelector('#sample-reset').addEventListener('click', () => {
  regions.forEach(button => setRegion(button, false));
  document.querySelector('#activity-demo').value = '';
  document.querySelector('#action-feedback').textContent = 'Selezione e campo di esempio azzerati.';
});
document.querySelector('#sample-action').addEventListener('click', () => {
  document.querySelector('#action-feedback').textContent = 'Nel sito “Parliamone” apre la pagina dedicata al contatto. Qui puoi provare gli stati dei controlli.';
});
const nav = document.querySelector('#demo-nav');
const toggle = document.querySelector('#toggle-nav');
const links = document.querySelector('#demo-links');
const compact = matchMedia('(max-width:1000px)');
function renderNav(collapsed) {
  nav.classList.toggle('is-collapsed', collapsed);
  links.inert = collapsed || compact.matches;
  toggle.setAttribute('aria-expanded', String(!collapsed));
  toggle.textContent = collapsed ? 'Simula scroll verso l’alto' : 'Simula scroll verso il basso';
  document.querySelector('#motion-status').textContent = compact.matches ? 'Campione compatto: prova lo scroll nel sito completo.' : collapsed ? 'Navbar collassata' : 'Navbar espansa';
  toggle.disabled = compact.matches;
}
toggle.addEventListener('click', () => renderNav(!nav.classList.contains('is-collapsed')));
compact.addEventListener('change', () => renderNav(compact.matches));
renderNav(compact.matches);
function luminance(hex) {
  const c = hex.match(/.{2}/g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return c[0]*.2126+c[1]*.7152+c[2]*.0722;
}
document.querySelectorAll('[data-contrast]').forEach(el => {
  const [a,b] = el.dataset.contrast.split(',').map(luminance);
  el.textContent = ((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2).replace('.',',')+' : 1';
});
const sections = [...document.querySelectorAll('main section[id]')];
const indexLinks = [...document.querySelectorAll('aside nav a')];
let scheduled = false;
function updateIndex() {
  let current = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top <= 160) current = section;
  indexLinks.forEach(link => link.hash === '#'+current.id ? link.setAttribute('aria-current','location') : link.removeAttribute('aria-current'));
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateIndex); } }, {passive:true});
updateIndex();
