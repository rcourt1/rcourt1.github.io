/* ================================================================
   TAB SWITCHING
   ================================================================ */
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabPanels  = document.querySelectorAll('.tab-panel');
const indicator  = document.getElementById('tabIndicator');

function moveIndicator(btn) {
  indicator.style.left  = btn.offsetLeft + 'px';
  indicator.style.width = btn.offsetWidth + 'px';
}

function switchTab(targetId, activeBtn) {
  const currentPanel = document.querySelector('.tab-panel.active');
  const nextPanel    = document.getElementById(targetId);

  if (currentPanel === nextPanel) return;

  tabBtns.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });

  tabPanels.forEach(p => p.classList.remove('active'));

  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-selected', 'true');
  moveIndicator(activeBtn);

  /* Force panel animation restart */
  nextPanel.style.animation = 'none';
  nextPanel.offsetHeight;
  nextPanel.style.animation = '';
  nextPanel.classList.add('active');

  /* Trigger reveal animations for newly visible elements */
  revealInPanel(nextPanel);
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab, btn));
});

/* ================================================================
   INDICATOR POSITION — set on load and on resize
   ================================================================ */
function initIndicator() {
  const active = document.querySelector('.tab-btn.active');
  if (active) moveIndicator(active);
}

window.addEventListener('load', initIndicator);
window.addEventListener('resize', initIndicator);

/* ================================================================
   STICKY NAV SHADOW
   ================================================================ */
const hero    = document.querySelector('.hero');
const tabsNav = document.getElementById('tabsNav');

const heroObserver = new IntersectionObserver(
  ([entry]) => tabsNav.classList.toggle('stuck', !entry.isIntersecting),
  { threshold: 0 }
);

heroObserver.observe(hero);

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
const REVEAL_SELECTORS = [
  '.highlight-card',
  '.skill-group',
  '.project-card',
  '.timeline-item',
];

/* Mark all reveal targets */
document.querySelectorAll(REVEAL_SELECTORS.join(', ')).forEach(el => {
  el.classList.add('reveal');
});

/* Reveal elements inside a specific panel */
function revealInPanel(panel) {
  panel.querySelectorAll('.reveal:not(.revealed)').forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), i * 70);
  });
}

/* IntersectionObserver for the initial (Summary) panel */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('#summary .reveal').forEach(el => {
  revealObserver.observe(el);
});
