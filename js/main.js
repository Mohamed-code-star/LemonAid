const $ = s => document.querySelector(s);
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const msgs = ['Empty glass. Sad.', 'A little splash!', 'Getting there…', 'Almost…', 'Perfect. Cheers!'];
let cups = 0;

function seeds(x, y, n = 8, extra = '') {
  if (calm) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'icon icon-sm seed ' + extra);
    s.innerHTML = '<use href="#lemon"/>';
    s.style.cssText = `left:${x}px;top:${y}px;--dx:${(Math.random() - 0.5) * 260}px;--dy:${(Math.random() - 0.5) * 200}px;--r:${(Math.random() - 0.5) * 400}deg`;
    s.addEventListener('animationend', () => s.remove());
    document.body.append(s);
  }
}

document.addEventListener('click', e => {
  const squish = e.target.closest('[data-squish]');
  if (squish) {
    squish.classList.remove('squish');
    void squish.offsetWidth;
    squish.classList.add('squish');
  }
  const spawner = e.target.closest('[data-seeds]');
  if (spawner) {
    const r = spawner.getBoundingClientRect();
    seeds(r.left + r.width / 2, r.top + r.height / 2);
  }
  const card = e.target.closest('.stand-card');
  if (card) card.classList.toggle('is-flipped');
  if (e.target.closest('#cup-btn')) $('#cups').textContent = ++cups;
});

document.addEventListener('keydown', e => {
  const card = e.target.closest?.('.stand-card');
  if (card && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    card.classList.toggle('is-flipped');
  }
});

const track = $('.marquee-track');
if (track) track.innerHTML += track.innerHTML;

const pour = $('#pour');
if (pour) {
  const glass = $('.glass'), msg = $('#pour-msg');
  let level = 0;
  const set = n => {
    level = n;
    glass.style.setProperty('--level', n / 4);
    glass.classList.toggle('full', n === 4);
    pour.disabled = n === 4;
    msg.textContent = msgs[n];
  };
  pour.addEventListener('click', () => {
    set(level + 1);
    if (level === 4) {
      const r = glass.getBoundingClientRect();
      seeds(r.left + r.width / 2, r.top, 14);
    }
  });
  $('#drink').addEventListener('click', () => set(0));
}

// surpriseee honestly dissappointing
$('#surpriseee')?.addEventListener('click', () => {
  const cards = document.querySelectorAll('.stand-card');
  cards.forEach(card => card.classList.remove('is-flipped'));
  const pick = cards[Math.floor(Math.random() * cards.length)];
  pick.classList.add('is-flipped');
  pick.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// LET IT BLOWWW fizzy stuff
$('#letitblow')?.addEventListener('click', () => {
  for (let i = 0; i < 14; i++) {
    setTimeout(() => seeds(-30, Math.random() * innerHeight, 1, 'gust'), i * 90);
  }
});

// darkkkkk modeee for MY EYES
const darkk = $('#darkk');
const page = document.documentElement;

function lightsOut(on) {
  page.classList.toggle('lights-out', on);
  darkk.textContent = on ? 'Light' : 'Dark';
  localStorage.setItem('lights-out', on);
}

lightsOut(localStorage.getItem('lights-out') === 'true');
darkk.addEventListener('click', () => lightsOut(!page.classList.contains('lights-out')));
