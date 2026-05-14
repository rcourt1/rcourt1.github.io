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

  /* Force animation restart on the incoming panel */
  nextPanel.style.animation = 'none';
  nextPanel.offsetHeight;           /* reflow */
  nextPanel.style.animation = '';
  nextPanel.classList.add('active');
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
