const CREATURES = [
  { name: 'Lumim', title: 'Faísca da origem', c1: '#77ffe3', c2: '#dcff75', crest: 'polygon(50% 0,63% 42%,100% 25%,74% 59%,91% 100%,50% 75%,10% 100%,25% 59%,0 25%,37% 42%)', tail: '-15deg' },
  { name: 'Musguri', title: 'Guardião do orvalho', c1: '#6ee79c', c2: '#b7ff6e', crest: 'polygon(0 100%,10% 20%,32% 70%,50% 0,66% 70%,92% 15%,100% 100%)', tail: '10deg' },
  { name: 'Coralume', title: 'Cantor das marés', c1: '#4ed6e8', c2: '#ff91c4', crest: 'polygon(5% 100%,10% 28%,30% 63%,43% 0,60% 60%,88% 16%,96% 100%)', tail: '-28deg' },
  { name: 'Brumelo', title: 'Pastor das nuvens', c1: '#b7b9ff', c2: '#70e5ff', crest: 'polygon(0 70%,20% 20%,37% 57%,55% 0,72% 55%,100% 19%,90% 100%,5% 100%)', tail: '18deg' },
  { name: 'Florigon', title: 'Alma do jardim', c1: '#ff91b5', c2: '#ffe46d', crest: 'polygon(50% 0,62% 35%,100% 16%,73% 52%,100% 81%,62% 70%,50% 100%,37% 70%,0 81%,27% 52%,0 16%,38% 35%)', tail: '-5deg' },
  { name: 'Vulpar', title: 'Raposa estelar', c1: '#ff9a55', c2: '#ffef7c', crest: 'polygon(0 100%,7% 0,50% 52%,93% 0,100% 100%)', tail: '33deg' },
  { name: 'Noctari', title: 'Vigia do eclipse', c1: '#635ae8', c2: '#d988ff', crest: 'polygon(0 78%,18% 0,48% 48%,80% 0,100% 78%,50% 100%)', tail: '-38deg' },
  { name: 'Cervéon', title: 'Príncipe celeste', c1: '#52c9c0', c2: '#dcff8b', crest: 'polygon(0 100%,15% 8%,35% 58%,50% 0,66% 58%,87% 8%,100% 100%)', tail: '14deg' },
  { name: 'Astralga', title: 'Navegante cósmico', c1: '#497be8', c2: '#6dffda', crest: 'polygon(0 78%,25% 45%,14% 0,50% 34%,86% 0,75% 45%,100% 78%,50% 100%)', tail: '-15deg', aura: .55 },
  { name: 'Solarion', title: 'Herdeiro dos sóis', c1: '#ffbd4d', c2: '#ff6d61', crest: 'polygon(50% 0,63% 34%,91% 8%,78% 43%,100% 55%,70% 68%,80% 100%,50% 77%,19% 100%,30% 68%,0 55%,22% 43%,9% 8%,37% 34%)', tail: '28deg', aura: .7 },
  { name: 'Nebulume', title: 'Sonho da galáxia', c1: '#cb71ff', c2: '#5dffec', crest: 'polygon(0 100%,8% 30%,32% 57%,50% 0,68% 57%,92% 30%,100% 100%)', tail: '-30deg', aura: .85 },
  { name: 'EVOA', title: 'Coração do universo', c1: '#f0ff8a', c2: '#7d68ff', crest: 'polygon(50% 0,61% 35%,87% 10%,74% 43%,100% 50%,72% 63%,90% 95%,57% 76%,50% 100%,40% 76%,9% 95%,28% 63%,0 50%,26% 43%,13% 10%,39% 35%)', tail: '20deg', aura: 1 }
];

const BIOMES = [
  { min: 0, name: 'Ilha do Primeiro Orvalho', a: '#153f5c', b: '#101a3e' },
  { min: 3, name: 'Bosque das Nuvens Baixas', a: '#174d4b', b: '#172344' },
  { min: 6, name: 'Santuário do Eclipse', a: '#35205c', b: '#111b42' },
  { min: 9, name: 'Jardim da Aurora Cósmica', a: '#553349', b: '#17224b' }
];

const MAP_POSITIONS = [
  { x: 15, y: 16, s: .88, d: -1.2 },
  { x: 47, y: 10, s: 1.02, d: -3.8 },
  { x: 80, y: 18, s: .91, d: -2.1 },
  { x: 29, y: 34, s: 1.04, d: -4.6 },
  { x: 64, y: 34, s: .86, d: -.7 },
  { x: 89, y: 43, s: .95, d: -5.4 },
  { x: 11, y: 51, s: .94, d: -2.9 },
  { x: 43, y: 55, s: 1.09, d: -1.7 },
  { x: 73, y: 58, s: .98, d: -4.2 },
  { x: 21, y: 76, s: .91, d: -5.8 },
  { x: 54, y: 79, s: 1.03, d: -.3 },
  { x: 84, y: 78, s: .88, d: -3.3 }
];

const STORAGE_KEY = 'evoa-save-v1';
const STARTING_BOARD = [0, 0, 0, null, null, null, null, null, null, null, null, null];
const defaultState = {
  board: STARTING_BOARD,
  positions: MAP_POSITIONS.map(({ x, y }) => ({ x, y })),
  lumen: 18,
  fusions: 0,
  discovered: [0],
  highest: 0,
  selected: null,
  sound: true,
  tutorialSeen: false,
  lastPulse: Date.now(),
  mission: { target: 4, progress: 0, reward: 25, level: 1 }
};

let state = loadState();
let toastTimer;
let dragSession = null;
let suppressClickUntil = 0;
const root = document.querySelector('#app');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Array.isArray(saved.board) || saved.board.length !== 12) return structuredClone(defaultState);
    const base = structuredClone(defaultState);
    const positions = Array.isArray(saved.positions) && saved.positions.length === 12
      ? saved.positions.map((position, index) => ({
          x: Number.isFinite(position?.x) ? Math.min(93, Math.max(7, position.x)) : base.positions[index].x,
          y: Number.isFinite(position?.y) ? Math.min(89, Math.max(8, position.y)) : base.positions[index].y
        }))
      : base.positions;
    return { ...base, ...saved, positions, selected: null };
  } catch { return structuredClone(defaultState); }
}

function hasMerge() {
  const occupied = state.board.filter(v => v !== null);
  return new Set(occupied).size !== occupied.length;
}

function applyVitalPulse(showMessage = false) {
  if (state.lumen >= 30) {
    state.lastPulse = Date.now();
    return false;
  }
  const elapsed = Date.now() - (state.lastPulse || Date.now());
  const pulses = Math.floor(elapsed / 30000);
  if (pulses < 1) return false;
  const before = state.lumen;
  state.lumen = Math.min(30, state.lumen + pulses * 3);
  state.lastPulse += pulses * 30000;
  saveState();
  if (showMessage && state.lumen > before) setTimeout(() => toast('A ilha respirou: <strong>+3 Lúmen</strong>'), 50);
  return state.lumen > before;
}

function saveState() {
  const clean = { ...state, selected: null };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
}

function beingHTML(tier) {
  const c = CREATURES[tier];
  return `<div class="being" style="--c1:${c.c1};--c2:${c.c2};--crest:${c.crest};--tail:${c.tail};--aura:${c.aura || 0}">
    <div class="aura"></div><div class="crest"></div><div class="tail"></div><div class="body"></div><div class="glint"></div><div class="mark"></div>
  </div>`;
}

function starsHTML() {
  return `<div class="stars">${Array.from({length: 18}, (_, i) => `<i class="star" style="left:${(i * 47) % 97}%;top:${(i * 31) % 91}%;animation-delay:-${(i % 7) * .45}s"></i>`).join('')}</div>`;
}

function currentBiome() {
  return [...BIOMES].reverse().find(b => state.highest >= b.min);
}

function render() {
  applyVitalPulse(false);
  const biome = currentBiome();
  const empty = state.board.filter(v => v === null).length;
  const lockedGarden = empty === 0 && !hasMerge();
  root.innerHTML = `<main class="world" style="--biome-a:${biome.a};--biome-b:${biome.b}">
    ${starsHTML()}
    <div class="app">
      <header class="topbar">
        <div><div class="eyebrow">Jardim das origens</div><h1>EV<span>O</span>A</h1></div>
        <button class="icon-button" data-action="sound" aria-label="Som">${state.sound ? '♪' : '⌁'}</button>
      </header>

      <section class="resource-row">
        <div class="resource"><span class="resource-icon">✦</span><div><small>Lúmen</small><strong>${state.lumen}</strong></div></div>
        <div class="resource"><span class="resource-icon">◈</span><div><small>Descobertas</small><strong>${state.discovered.length}/${CREATURES.length}</strong></div></div>
      </section>

      <section class="mission">
        <div class="mission-copy"><span>Missão ${state.mission.level}</span><b>Faça ${state.mission.target} fusões</b><div class="progress"><i style="width:${Math.min(100, state.mission.progress / state.mission.target * 100)}%"></i></div></div>
        <div class="mission-reward">+${state.mission.reward} ✦</div>
      </section>

      <section class="island space-map-card">
        <div class="island-head"><div>${biome.name}</div><div class="hint">arraste para unir</div></div>
        <div class="cosmic-map" role="grid" aria-label="Mapa orbital de criaturas">
          <div class="nebula nebula-one"></div><div class="nebula nebula-two"></div>
          <div class="moon moon-one"></div><div class="moon moon-two"></div>
          <svg class="orbit-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6 24 C25 2 50 2 72 14 S99 38 83 55 S48 57 31 72 S19 94 54 92 S91 87 94 66" />
            <path class="orbit-secondary" d="M3 55 C21 41 38 42 50 54 S70 75 97 72" />
            <circle cx="47" cy="47" r="31" />
          </svg>
          <div class="map-core"><i></i><span>ORIGEM</span></div>
          ${state.board.map((tier, i) => { const p = { ...MAP_POSITIONS[i], ...(state.positions?.[i] || {}) }; return `<button class="orbit-slot ${state.selected === i ? 'selected' : ''} ${state.selected !== null && tier !== null && tier === state.board[state.selected] && i !== state.selected ? 'merge-target' : ''}" style="--x:${p.x}%;--y:${p.y}%;--scale:${p.s};--delay:${p.d}s" data-cell="${i}" aria-label="${tier === null ? 'Portal vazio' : CREATURES[tier].name}">
            ${tier === null ? '<span class="empty-rift"><i></i></span>' : `<span class="tier-pill">${tier + 1}</span><div class="creature">${beingHTML(tier)}<div class="creature-name">${CREATURES[tier].name}</div></div>`}
          </button>`; }).join('')}
          <div class="map-caption"><span class="live-dot"></span><span data-drag-hint> arraste seres iguais</span></div>
        </div>
        <div class="actions">
          <button class="summon" data-action="summon" ${(!lockedGarden && empty === 0) || (empty > 0 && state.lumen < 3) ? 'disabled' : ''}>
            <span class="orb">${lockedGarden ? '↻' : '◉'}</span><span class="summon-copy"><b>${lockedGarden ? 'Renovar um casulo' : 'Despertar vida'}</b><small>${lockedGarden ? 'Libera gratuitamente a forma mais simples' : empty === 0 ? 'Jardim lotado — faça uma fusão' : `Custa 3 Lúmen <span id="pulse-timer"></span>`}</small></span>
          </button>
        </div>
      </section>

      <nav class="nav">
        <button data-action="bestiary"><span>◈</span>Bestiário</button>
        <button data-action="help"><span>?</span>Como jogar</button>
        <button data-action="stats"><span>⌁</span>Jornada</button>
      </nav>
    </div>
    <div class="toast" id="toast"></div>
  </main>`;

  bindCreatureControls();
  root.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', () => action(btn.dataset.action)));
  if (!state.tutorialSeen) requestAnimationFrame(() => showTutorial(true));
}

function bindCreatureControls() {
  root.querySelectorAll('[data-cell]').forEach(btn => {
    const index = Number(btn.dataset.cell);
    btn.addEventListener('click', () => {
      if (Date.now() < suppressClickUntil) return;
      selectCell(index);
    });
    btn.addEventListener('pointerdown', event => startCreatureDrag(event, index));
  });
}

function startCreatureDrag(event, index) {
  if (dragSession || state.board[index] === null || (event.button !== undefined && event.button !== 0)) return;
  const element = event.currentTarget;
  dragSession = {
    pointerId: event.pointerId,
    index,
    tier: state.board[index],
    element,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
    target: null,
    nearby: null
  };
  element.setPointerCapture?.(event.pointerId);
  element.classList.add('drag-armed');
  element.addEventListener('pointermove', moveCreature);
  element.addEventListener('pointerup', endCreatureDrag);
  element.addEventListener('pointercancel', cancelCreatureDrag);
}

function moveCreature(event) {
  if (!dragSession || event.pointerId !== dragSession.pointerId) return;
  const dx = event.clientX - dragSession.startX;
  const dy = event.clientY - dragSession.startY;
  if (!dragSession.moved && Math.hypot(dx, dy) < 7) return;
  event.preventDefault();

  if (!dragSession.moved) {
    dragSession.moved = true;
    state.selected = null;
    root.querySelectorAll('.orbit-slot.selected').forEach(el => el.classList.remove('selected'));
    dragSession.element.classList.add('dragging');
    sound('tap');
    navigator.vibrate?.(8);
  }

  dragSession.element.style.setProperty('--drag-x', `${dx}px`);
  dragSession.element.style.setProperty('--drag-y', `${dy}px`);
  const nearby = findNearbySlot(event.clientX, event.clientY, dragSession.index);
  root.querySelectorAll('.drop-ready,.drop-invalid').forEach(el => el.classList.remove('drop-ready','drop-invalid'));
  dragSession.nearby = nearby;
  dragSession.target = null;

  const hint = root.querySelector('[data-drag-hint]');
  if (nearby !== null) {
    const sameTier = state.board[nearby] === dragSession.tier;
    const canEvolve = dragSession.tier < CREATURES.length - 1;
    const targetEl = root.querySelector(`[data-cell="${nearby}"]`);
    if (sameTier && canEvolve) {
      dragSession.target = nearby;
      targetEl?.classList.add('drop-ready');
      if (hint) hint.textContent = ' solte para criar uma nova espécie';
    } else {
      targetEl?.classList.add('drop-invalid');
      if (hint) hint.textContent = ' solte aqui para apenas posicionar';
    }
  } else if (hint) hint.textContent = ' solte para fixar nesta posição';
}

function findNearbySlot(x, y, sourceIndex) {
  let closest = null;
  let shortest = Infinity;
  root.querySelectorAll('.orbit-slot').forEach(slot => {
    const index = Number(slot.dataset.cell);
    if (index === sourceIndex || state.board[index] === null) return;
    const rect = slot.getBoundingClientRect();
    const distance = Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2));
    if (distance < Math.max(52, rect.width * .68) && distance < shortest) {
      closest = index;
      shortest = distance;
    }
  });
  return closest;
}

function endCreatureDrag(event) {
  if (!dragSession || event.pointerId !== dragSession.pointerId) return;
  const { moved, index, target, nearby } = dragSession;
  if (!moved) return cleanupDrag(false);
  event.preventDefault();
  suppressClickUntil = Date.now() + 450;
  const dropX = event.clientX;
  const dropY = event.clientY;
  cleanupDrag(false);
  if (target !== null) {
    navigator.vibrate?.([18, 25, 34]);
    mergeCells(index, target);
  } else placeCreature(index, dropX, dropY, nearby !== null);
}

function placeCreature(index, clientX, clientY, nearDifferentCreature) {
  const map = root.querySelector('.cosmic-map');
  if (!map) return render();
  const rect = map.getBoundingClientRect();
  const x = Math.min(93, Math.max(7, (clientX - rect.left) / rect.width * 100));
  const y = Math.min(89, Math.max(8, (clientY - rect.top) / rect.height * 100));
  state.positions ||= MAP_POSITIONS.map(position => ({ x: position.x, y: position.y }));
  state.positions[index] = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  state.selected = null;
  saveState();
  sound('place');
  navigator.vibrate?.(12);
  render();
  const placed = root.querySelector(`[data-cell="${index}"]`);
  placed?.classList.add('just-placed');
  setTimeout(() => placed?.classList.remove('just-placed'), 380);
  if (nearDifferentCreature) setTimeout(() => toast('Posição salva. Seres diferentes ficam próximos, mas não se fundem.'), 80);
}

function cancelCreatureDrag(event) {
  if (!dragSession || event.pointerId !== dragSession.pointerId) return;
  suppressClickUntil = Date.now() + 300;
  cleanupDrag(true);
}

function cleanupDrag(snapBack) {
  if (!dragSession) return;
  const { element, pointerId } = dragSession;
  try { element.releasePointerCapture?.(pointerId); } catch {}
  element.removeEventListener('pointermove', moveCreature);
  element.removeEventListener('pointerup', endCreatureDrag);
  element.removeEventListener('pointercancel', cancelCreatureDrag);
  element.classList.remove('drag-armed','dragging');
  if (snapBack) element.classList.add('snap-back');
  if (snapBack) void element.offsetWidth;
  element.style.setProperty('--drag-x', '0px');
  element.style.setProperty('--drag-y', '0px');
  root.querySelectorAll('.drop-ready,.drop-invalid').forEach(el => el.classList.remove('drop-ready','drop-invalid'));
  const hint = root.querySelector('[data-drag-hint]');
  if (hint) hint.textContent = ' arraste seres iguais';
  if (snapBack) setTimeout(() => element.classList.remove('snap-back'), 260);
  dragSession = null;
}

function action(name) {
  if (name === 'summon') summon();
  if (name === 'sound') { state.sound = !state.sound; saveState(); render(); }
  if (name === 'bestiary') showBestiary();
  if (name === 'stats') showStats();
  if (name === 'help') showTutorial(false);
}

function summon() {
  const empty = state.board.map((v, i) => v === null ? i : -1).filter(i => i >= 0);
  if (!empty.length && !hasMerge()) {
    const lowest = Math.min(...state.board);
    const slot = state.board.indexOf(lowest);
    state.board[slot] = null;
    state.selected = null;
    saveState();
    render();
    return toast(`O jardim devolveu um <strong>${CREATURES[lowest].name}</strong> à origem.`);
  }
  if (!empty.length) return toast('Seu jardim está cheio. Una duas criaturas iguais.');
  if (state.lumen < 3) return toast('Você precisa de mais Lúmen. Faça fusões.');
  state.lumen -= 3;
  const slot = empty[Math.floor(Math.random() * empty.length)];
  const roll = Math.random();
  state.board[slot] = state.highest >= 4 && roll > .86 ? 1 : 0;
  state.selected = null;
  sound('summon');
  saveState();
  render();
  animateBirth(slot);
}

function selectCell(index) {
  const tier = state.board[index];
  if (tier === null) {
    state.selected = null;
    render();
    return;
  }
  if (state.selected === null) {
    state.selected = index;
    sound('tap');
    render();
    return;
  }
  if (state.selected === index) {
    state.selected = null;
    render();
    return;
  }
  const firstTier = state.board[state.selected];
  if (firstTier !== tier) {
    state.selected = index;
    sound('tap');
    render();
    return;
  }
  if (tier >= CREATURES.length - 1) {
    state.selected = null;
    toast('EVOA já alcançou a forma suprema!');
    render();
    return;
  }

  mergeCells(state.selected, index);
}

function mergeCells(source, index) {
  if (source === index || state.board[source] === null || state.board[index] === null || state.board[source] !== state.board[index]) return;
  const tier = state.board[index];
  if (tier >= CREATURES.length - 1) return toast('EVOA já alcançou a forma suprema!');
  const nextTier = tier + 1;
  state.board[source] = null;
  state.board[index] = nextTier;
  state.selected = null;
  state.fusions += 1;
  state.lumen += 2 + nextTier;
  state.mission.progress += 1;
  const isNew = !state.discovered.includes(nextTier);
  if (isNew) state.discovered.push(nextTier);
  state.highest = Math.max(state.highest, nextTier);

  let missionMessage = '';
  if (state.mission.progress >= state.mission.target) {
    state.lumen += state.mission.reward;
    missionMessage = `Missão concluída! <strong>+${state.mission.reward} Lúmen</strong>`;
    state.mission = {
      level: state.mission.level + 1,
      target: Math.min(15, state.mission.target + 2),
      progress: 0,
      reward: state.mission.reward + 10
    };
  }

  sound('merge', nextTier);
  saveState();
  render();
  particles(index, nextTier);
  animateBirth(index);
  if (missionMessage) setTimeout(() => toast(missionMessage), 60);
  if (isNew) setTimeout(() => toast(`Nova espécie: <strong>${CREATURES[nextTier].name}</strong> — ${CREATURES[nextTier].title}`), 450);
}

function animateBirth(index) {
  const el = root.querySelector(`[data-cell="${index}"]`);
  el?.classList.add('just-born');
  setTimeout(() => el?.classList.remove('just-born'), 600);
}

function particles(index, tier) {
  const el = root.querySelector(`[data-cell="${index}"]`);
  if (!el) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('i');
    p.className = 'particle';
    p.textContent = i % 3 ? '✦' : '●';
    p.style.color = CREATURES[tier].c2;
    p.style.left = `${r.left + r.width / 2}px`;
    p.style.top = `${r.top + r.height / 2}px`;
    const angle = (Math.PI * 2 / 12) * i;
    const distance = 35 + Math.random() * 45;
    p.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }
}

function toast(html) {
  clearTimeout(toastTimer);
  const el = root.querySelector('#toast');
  if (!el) return;
  el.innerHTML = html;
  el.classList.add('show');
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function showBestiary() {
  modal(`<div class="sheet-head"><div><div class="eyebrow">Arquivo vivo</div><h2>Bestiário</h2></div><button class="icon-button" data-close>×</button></div>
    <p>Cada espécie nasce da união de duas formas iguais. Seu objetivo é despertar EVOA.</p>
    <div class="bestiary">${CREATURES.map((c,i) => `<div class="entry ${state.discovered.includes(i) ? '' : 'locked'}">${beingHTML(i)}<b>${state.discovered.includes(i) ? c.name : '???'}</b><small>Nível ${i+1}</small></div>`).join('')}</div>`);
}

function showStats() {
  const highest = CREATURES[state.highest];
  modal(`<div class="sheet-head"><div><div class="eyebrow">Memória do jardim</div><h2>Sua jornada</h2></div><button class="icon-button" data-close>×</button></div>
    <div class="stat-list">
      <div class="stat"><small>Total de fusões</small><strong>${state.fusions}</strong></div>
      <div class="stat"><small>Espécies</small><strong>${state.discovered.length}</strong></div>
      <div class="stat"><small>Forma mais alta</small><strong>${highest.name}</strong></div>
      <div class="stat"><small>Missão atual</small><strong>${state.mission.level}</strong></div>
    </div>
    <p>O jogo salva automaticamente neste aparelho. Funciona também instalado como aplicativo.</p>
    <button class="danger-btn" data-reset>Recomeçar o universo</button>`);
  document.querySelector('[data-reset]').addEventListener('click', () => {
    if (confirm('Apagar todo o progresso e recomeçar?')) {
      state = structuredClone(defaultState); saveState(); closeModal(); render();
    }
  });
}

function showTutorial(firstTime) {
  modal(`<div class="sheet-head"><div><div class="eyebrow">Bem-vindo ao EVOA</div><h2>Desperte o impossível</h2></div>${firstTime ? '' : '<button class="icon-button" data-close>×</button>'}</div>
    <p>Uma tempestade apagou quase toda a vida das ilhas celestes. Seu jardim guarda as últimas faíscas.</p>
    <div class="tutorial-step"><i>1</i><div><b>Desperte criaturas</b><span>Use 3 Lúmen para abrir um novo casulo.</span></div></div>
    <div class="tutorial-step"><i>2</i><div><b>Organize e combine</b><span>Solte em qualquer lugar para reposicionar. Solte sobre uma criatura igual para fazer o merge. Dois toques também funcionam.</span></div></div>
    <div class="tutorial-step"><i>3</i><div><b>Descubra o Bestiário</b><span>Cada fusão revela uma espécie inédita e transforma o cenário.</span></div></div>
    <button class="primary-btn" data-start>${firstTime ? 'Entrar no jardim' : 'Continuar jogando'}</button>`);
  document.querySelector('[data-start]').addEventListener('click', () => {
    state.tutorialSeen = true; saveState(); closeModal();
  });
}

function modal(content) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<section class="sheet">${content}</section>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  overlay.querySelector('[data-close]')?.addEventListener('click', closeModal);
}

function closeModal() { document.querySelector('.overlay')?.remove(); }

let audioCtx;
function sound(type, tier = 0) {
  if (!state.sound) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = type === 'merge' ? 'sine' : 'triangle';
    const base = type === 'summon' ? 280 : type === 'merge' ? 360 + tier * 35 : type === 'place' ? 165 : 210;
    osc.frequency.setValueAtTime(base, now);
    if (type === 'merge') osc.frequency.exponentialRampToValueAtTime(base * 1.8, now + .22);
    gain.gain.setValueAtTime(.07, now);
    gain.gain.exponentialRampToValueAtTime(.001, now + (type === 'merge' ? .34 : .1));
    osc.start(now); osc.stop(now + .36);
  } catch {}
}

render();
setInterval(() => {
  if (applyVitalPulse(true)) return render();
  const timer = document.querySelector('#pulse-timer');
  if (timer && state.lumen < 30) {
    const seconds = Math.max(0, 30 - Math.floor((Date.now() - state.lastPulse) / 1000));
    timer.textContent = `• +3 em 0:${String(seconds).padStart(2, '0')}`;
  } else if (timer) timer.textContent = '';
}, 1000);
if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
