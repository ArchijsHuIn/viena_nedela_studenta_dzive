const modeButton = document.getElementById('modeToggle');
const dayButtons = document.querySelectorAll('.day-button');
const daySections = document.querySelectorAll('.section-card[data-day]');
const activeDayText = document.getElementById('activeDayText');

const savedMode = localStorage.getItem('color-mode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setMode(isDark) {
  document.body.classList.toggle('dark', isDark);
  modeButton.setAttribute('aria-pressed', String(isDark));
  modeButton.textContent = isDark ? 'Gaišais režīms' : 'Tumšais režīms';
  localStorage.setItem('color-mode', isDark ? 'dark' : 'light');
}

function setActiveDay(targetId) {
  dayButtons.forEach((button) => {
    const isActive = button.dataset.target === targetId;
    button.classList.toggle('active', isActive);
    button.toggleAttribute('aria-current', isActive);

    if (isActive && activeDayText) {
      activeDayText.textContent = button.getAttribute('aria-label');
    }
  });
}

setMode(savedMode ? savedMode === 'dark' : prefersDark);

modeButton.addEventListener('click', () => {
  setMode(!document.body.classList.contains('dark'));
});

dayButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);

    if (!target) {
      return;
    }

    setActiveDay(button.dataset.target);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveDay(entry.target.id);
      }
    });
  },
  {
    threshold: 0.45,
    rootMargin: '-120px 0px -35% 0px'
  }
);

daySections.forEach((section) => observer.observe(section));
