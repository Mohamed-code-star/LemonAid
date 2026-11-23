const $ = selector => document.querySelector(selector);
const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const messages = ['Empty glass. Sad.', 'A little splash!', 'Getting there…', 'Almost…', 'Perfect. Cheers!'];

// Volume control
var music = document.getElementById('background-music');
var musicButton = document.getElementById('music-button');
var volumeSlider = document.getElementById('volume-slider');

if (music && musicButton && volumeSlider) {
  music.volume = volumeSlider.value / 100;

  musicButton.addEventListener('click', function () {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
  });

  music.addEventListener('play', function () {
    musicButton.textContent = 'Pause music';
  });

  music.addEventListener('pause', function () {
    musicButton.textContent = 'Play music';
  });

  // Change the volume when the slider moves.
  volumeSlider.addEventListener('input', function () {
    music.volume = volumeSlider.value / 100;
  });
}

// Change the cursor when the mouse button is pressed.
function changeCursor() {
  document.body.classList.add('mouse-clicking');
}

// Return to the normal cursor when the mouse button is released.
function resetCursor() {
  document.body.classList.remove('mouse-clicking');
}

document.addEventListener('mousedown', changeCursor);
document.addEventListener('mouseup', resetCursor);
document.addEventListener('mouseleave', resetCursor);
window.addEventListener('blur', resetCursor);

function seeds(x, y, count = 8, extra = '') {
  if (calm) return;

  for (let i = 0; i < count; i++) {
    const seed = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    seed.setAttribute('class', `icon icon-sm seed ${extra}`);
    seed.innerHTML = '<use href="#lemon"></use>';
    seed.style.cssText = `left:${x}px;top:${y}px;--dx:${(Math.random() - 0.5) * 260}px;--dy:${(Math.random() - 0.5) * 200}px;--r:${(Math.random() - 0.5) * 400}deg`;
    seed.addEventListener('animationend', () => seed.remove());
    document.body.append(seed);
  }
}

function flipCard(card) {
  const flipped = card.classList.toggle('is-flipped');
  card.setAttribute('aria-pressed', flipped);
}

document.addEventListener('click', event => {
  const squish = event.target.closest('[data-squish]');
  if (squish) {
    squish.classList.remove('squish');
    void squish.offsetWidth;
    squish.classList.add('squish');
  }

  const spawner = event.target.closest('[data-seeds]');
  if (spawner) {
    const rect = spawner.getBoundingClientRect();
    seeds(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  const card = event.target.closest('.stand-card');
  if (card) flipCard(card);
});

document.addEventListener('keydown', event => {
  const card = event.target.closest('.stand-card');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    flipCard(card);
  }
});

const track = $('.marquee-track');
if (track) track.innerHTML += track.innerHTML;

const pour = $('#pour-button');
if (pour) {
  const glass = $('.glass');
  const message = $('#pour-message');
  let level = 0;

  function setLevel(value) {
    level = value;
    glass.style.setProperty('--level', level / 4);
    glass.classList.toggle('full', level === 4);
    pour.disabled = level === 4;
    message.textContent = messages[level];
  }

  pour.addEventListener('click', () => {
    setLevel(level + 1);
    if (level === 4) {
      const rect = glass.getBoundingClientRect();
      seeds(rect.left + rect.width / 2, rect.top, 14);
    }
  });

  $('#drink-button').addEventListener('click', () => setLevel(0));
}

const surprise = $('#surprise-button');
if (surprise) {
  surprise.addEventListener('click', () => {
    const cards = document.querySelectorAll('.stand-card');
    cards.forEach(card => {
      card.classList.remove('is-flipped');
      card.setAttribute('aria-pressed', 'false');
    });

    const card = cards[Math.floor(Math.random() * cards.length)];
    if (card) {
      card.classList.add('is-flipped');
      card.setAttribute('aria-pressed', 'true');
      card.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
    }
  });
}

const blow = $('#let-it-blow');
if (blow) {
  blow.addEventListener('click', () => {
    for (let i = 0; i < 14; i++) {
      setTimeout(() => seeds(-30, Math.random() * window.innerHeight, 1, 'gust'), i * 90);
    }
  });
}

const cupButton = $('#cup-button');
if (cupButton) {
  let cups = 0;
  cupButton.addEventListener('click', () => {
    $('#cups').textContent = ++cups;
  });
}

const page = document.documentElement;
const darkButton = $('#dark-toggle');

function lightsOut(on) {
  page.classList.toggle('lights-out', on);
  darkButton.textContent = on ? 'Light' : 'Dark';
  localStorage.setItem('lights-out', on);
}

lightsOut(localStorage.getItem('lights-out') === 'true');
darkButton.addEventListener('click', () => {
  lightsOut(!page.classList.contains('lights-out'));
});

// Scroll-to-top button
var scrollTopButton = document.getElementById('scroll-to-top');

if (scrollTopButton) {
  // Show the button after the page has been scrolled down.
  function updateScrollButton() {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add('is-visible');
    } else {
      scrollTopButton.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateScrollButton);
  updateScrollButton();

  // Go back to the top when the button is clicked.
  scrollTopButton.addEventListener('click', function () {
    window.scrollTo(0, 0);
  });
}
