(() => {
  // Broad regions only. This is a description of the contact request, not a diagnosis.
  // State is kept in memory: no network calls, storage, or analytics.
  const regions = [
    { id: 'neck', label: 'Collo', views: ['front', 'back'], paths: ['M153 87H187V106L192 117L170 126L148 117L153 106Z'] },
    { id: 'shoulders', label: 'Spalle', views: ['front', 'back'], paths: ['M152 102L150 130L130 144L110 151L111 132L120 114Z'], mirror: true },
    { id: 'arms', label: 'Braccia e mani', views: ['front', 'back'], paths: ['M111 147L130 143L125 183L119 220L106 257L100 283L92 298L76 298L71 285L76 265L84 240L93 198L102 159Z'], mirror: true },
    { id: 'torso', label: 'Torace e addome', views: ['front'], paths: ['M150 125Q170 136 190 125L210 147L204 209L199 239Q170 252 141 239L136 209L130 147Z'] },
    { id: 'back', label: 'Schiena', views: ['back'], paths: ['M150 125Q170 136 190 125L210 147L204 209L199 239Q170 252 141 239L136 209L130 147Z'] },
    { id: 'hips', label: 'Bacino e anche', views: ['front', 'back'], paths: ['M141 238Q170 250 199 238L211 277L209 310L176 325L170 340L164 325L131 310L129 277Z'] },
    { id: 'thighs', label: 'Cosce', views: ['front', 'back'], paths: ['M130 309L165 323L168 375L139 375Z'], mirror: true },
    { id: 'knees', label: 'Ginocchia', views: ['front', 'back'], paths: ['M139 374H168L167 409H139Z'], mirror: true },
    { id: 'legs', label: 'Gambe e caviglie', views: ['front', 'back'], paths: ['M139 407H167L165 474L167 510L137 514L140 472Z'], mirror: true },
    { id: 'feet', label: 'Piedi', views: ['front', 'back'], paths: ['M138 508H166L171 532L163 540H130L124 531Z'], mirror: true }
  ];
  const silhouette = 'M153 88L153 103C138 108 120 110 113 122C102 142 97 178 91 202L77 259C73 271 70 285 76 292C83 299 94 293 99 281L117 227L129 181L137 234C133 257 127 280 129 309L139 397L142 467L138 513C132 521 125 528 133 534L163 534C173 530 166 517 165 505L168 424L170 338L172 424L175 505C174 517 169 530 178 534L207 534C215 528 208 521 202 513L198 467L201 397L211 309C213 280 207 257 203 234L211 181L223 227L241 281C246 293 257 299 264 292C270 285 267 271 263 259L249 202C243 178 238 142 227 122C220 110 202 108 187 103L187 88Z';
  const selected = new Set();
  let currentView = 'front';
  const options = document.getElementById('region-options');
  const status = document.getElementById('selection-status');
  const hint = document.getElementById('body-hint');
  const clear = document.getElementById('clear-regions');
  const activity = document.getElementById('activity');
  const dialog = document.getElementById('request-dialog');

  function svgMarkup(view) {
    const shapes = regions.filter(r => r.views.includes(view)).map(r => {
      const paths = r.paths.map(d => `<path d="${d}"/>`).join('');
      return `<g class="body-zone" data-region="${r.id}" role="button" tabindex="0" aria-label="${r.label}" aria-pressed="false">${paths}${r.mirror ? `<g transform="translate(340 0) scale(-1 1)">${paths}</g>` : ''}</g>`;
    }).join('');
    const detail = view === 'front'
      ? '<path d="M151 157Q170 165 189 157M170 168V224M167 225h6M150 278L170 293L190 278"/><path d="M159 55h3M178 55h3M166 69q4 3 8 0"/>'
      : '<path d="M170 129V242" stroke-dasharray="2 6"/><path d="M149 145Q137 173 153 191M191 145Q203 173 187 191M148 270Q158 283 170 275Q182 283 192 270M170 36V69"/>';
    return `<svg class="body-illustration" viewBox="0 0 340 565" role="group" aria-label="Corpo umano, vista ${view === 'front' ? 'frontale' : 'posteriore'}. Seleziona le macroaree.">
      <defs><linearGradient id="body-metal-${view}" x1="0" x2="1"><stop stop-color="#c2c2bc"/><stop offset=".35" stop-color="#f0f0eb"/><stop offset=".75" stop-color="#e1e1da"/><stop offset="1" stop-color="#bdbdb7"/></linearGradient><clipPath id="body-clip-${view}"><path d="${silhouette}"/></clipPath></defs>
      <ellipse cx="170" cy="53" rx="27" ry="34" fill="url(#body-metal-${view})" stroke="#b5b5ae" stroke-width="1"/>
      <path d="${silhouette}" fill="url(#body-metal-${view})" stroke="#b5b5ae" stroke-width="1"/>
      <g clip-path="url(#body-clip-${view})">${shapes}</g><g class="anatomy-detail" aria-hidden="true">${detail}</g>
    </svg>`;
  }

  for (const view of ['front', 'back']) document.getElementById('body-' + view).innerHTML = svgMarkup(view);
  for (const region of regions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'region-option';
    button.dataset.region = region.id;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = region.label;
    options.append(button);
  }

  function setView(view) {
    currentView = view;
    for (const v of ['front', 'back']) document.getElementById('body-' + v).hidden = v !== view;
    document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    hint.textContent = view === 'front' ? 'Vista frontale · seleziona una zona' : 'Vista posteriore · seleziona una zona';
  }
  function renderSelection(announcement) {
    document.querySelectorAll('[data-region]').forEach(el => el.setAttribute('aria-pressed', String(selected.has(el.dataset.region))));
    clear.disabled = selected.size === 0;
    const count = selected.size ? `${selected.size} ${selected.size === 1 ? 'zona selezionata' : 'zone selezionate'}` : 'Nessuna zona selezionata';
    status.textContent = announcement ? `${announcement}. ${count}.` : count;
  }
  function toggleRegion(id, fromList) {
    const region = regions.find(r => r.id === id);
    if (selected.has(id)) selected.delete(id); else selected.add(id);
    if (fromList && !region.views.includes(currentView)) setView(region.views[0]);
    const text = `${selected.has(id) ? 'Zona selezionata' : 'Zona rimossa'}: ${region.label}`;
    renderSelection(text);
    hint.textContent = text;
  }

  document.querySelectorAll('[data-region]').forEach(el => {
    el.addEventListener('click', () => toggleRegion(el.dataset.region, el.classList.contains('region-option')));
    if (el.classList.contains('body-zone')) {
      el.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleRegion(el.dataset.region, false); }
      });
      const describe = () => {
        const r = regions.find(r => r.id === el.dataset.region);
        hint.textContent = r.label + (selected.has(r.id) ? ' · selezione attiva' : ' · seleziona');
      };
      el.addEventListener('pointerenter', describe);
      el.addEventListener('focus', describe);
    }
  });
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
  clear.addEventListener('click', () => {
    selected.clear();
    renderSelection();
    hint.textContent = 'Seleziona una zona sulla figura';
  });
  document.getElementById('request').addEventListener('click', () => {
    const list = document.getElementById('request-regions');
    list.replaceChildren();
    for (const region of regions.filter(r => selected.has(r.id))) {
      const item = document.createElement('li');
      item.textContent = region.label;
      list.append(item);
    }
    list.hidden = selected.size === 0;
    document.getElementById('request-no-regions').hidden = selected.size !== 0;
    document.getElementById('request-activity').textContent = activity.value.trim() || 'Da raccontare insieme durante il contatto.';
    dialog.showModal();
  });
  renderSelection();
})();
