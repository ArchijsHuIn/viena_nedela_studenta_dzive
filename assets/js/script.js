const modeButton = document.getElementById('modeToggle');
const dayLinks = document.querySelectorAll('[data-page-link]');
const pageName = document.body.dataset.page;

const savedMode = localStorage.getItem('color-mode');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setMode(isDark) {
  document.body.classList.toggle('dark', isDark);

  if (modeButton) {
    modeButton.setAttribute('aria-pressed', String(isDark));
    modeButton.textContent = isDark ? 'Gaišais režīms' : 'Tumšais režīms';
  }

  localStorage.setItem('color-mode', isDark ? 'dark' : 'light');
}

setMode(savedMode ? savedMode === 'dark' : prefersDark);

if (modeButton) {
  modeButton.addEventListener('click', () => {
    setMode(!document.body.classList.contains('dark'));
  });
}

dayLinks.forEach((link) => {
  if (link.dataset.pageLink === pageName) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});
