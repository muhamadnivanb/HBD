const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const hero = document.querySelector('.hero');
const revealItems = document.querySelectorAll('.reveal');

if (music && musicBtn) {
  let isPlaying = false;

  const updateMusicButton = () => {
    musicBtn.textContent = isPlaying ? '♫ Musik: Nyala' : '♫ Musik: Mati';
    musicBtn.setAttribute('aria-label', isPlaying ? 'Jeda musik' : 'Putar musik');
  };

  const startMusic = async () => {
    try {
      await music.play();
    } catch {
      musicBtn.textContent = '♫ Klik untuk nyalakan musik';
      musicBtn.setAttribute('aria-label', 'Klik untuk menyalakan musik');
    }
  };

  music.volume = 0.45;
  music.addEventListener('play', () => {
    isPlaying = true;
    updateMusicButton();
  });
  music.addEventListener('pause', () => {
    isPlaying = false;
    updateMusicButton();
  });

  music.addEventListener('error', () => {
    isPlaying = false;
    musicBtn.disabled = true;
    musicBtn.textContent = '♫ Musik: Tidak tersedia';
    musicBtn.setAttribute('aria-label', 'Musik tidak tersedia');
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.target !== musicBtn && music.paused) {
      startMusic();
    }
  }, { once: true });

  document.addEventListener('keydown', (event) => {
    if (event.target !== musicBtn && music.paused) {
      startMusic();
    }
  }, { once: true });

  musicBtn.addEventListener('click', async () => {
    if (!music.currentSrc && !music.querySelector('source[src]')) {
      musicBtn.textContent = '♫ Musik: Tidak tersedia';
      return;
    }

    try {
      if (music.paused) {
        await music.play();
      } else {
        music.pause();
      }
    } catch (error) {
      console.warn('Audio tidak bisa diputar otomatis:', error);
      isPlaying = false;
      musicBtn.textContent = '♫ Musik: Gagal diputar';
      musicBtn.setAttribute('aria-label', 'Musik gagal diputar');
    }
  });

  updateMusicButton();
  startMusic();
}

if (hero) {
  const petalCount = 16;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';

    const left = Math.random() * 100;
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * 10;
    const size = 8 + Math.random() * 18;
    const opacity = 0.35 + Math.random() * 0.5;
    const drift = (Math.random() - 0.5) * 120;

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.5}px`;
    petal.style.opacity = opacity;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty('--drift', `${drift}px`);

    hero.appendChild(petal);
  }
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const primaryButtons = document.querySelectorAll('.primary-btn');
primaryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector('#letter');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.memory-stack').forEach((stack) => {
  const cards = [...stack.querySelectorAll('.stack-card')];
  let currentIndex = 0;

  stack.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.stack-card');

    if (!clickedCard || clickedCard !== cards[currentIndex]) {
      return;
    }

    if (currentIndex === cards.length - 1) {
      cards.forEach((card, index) => {
        card.hidden = index !== 0;
        card.disabled = false;
      });
      currentIndex = 0;
      return;
    }

    clickedCard.disabled = true;
    currentIndex += 1;
    cards[currentIndex].hidden = false;
  });
});
