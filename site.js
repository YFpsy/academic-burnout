
for (const switcher of document.querySelectorAll('[data-switcher]')) {
  const controls = switcher.querySelector('.switch');
  const buttons = [...controls.querySelectorAll('button')];
  const panels = [...switcher.querySelectorAll('[data-panel]')];
  const show = view => {
    for (const panel of panels) panel.hidden = panel.dataset.panel !== view;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.show === view));
  };
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-show]');
    if (button) show(button.dataset.show);
  });
  show('chart');
  controls.hidden = false;
}

const matrix = document.querySelector('.heat-figure');
matrix.addEventListener('click', event => {
  const selected = event.target.closest('[data-pair]');
  if (!selected) return;
  for (const button of matrix.querySelectorAll('[data-pair]')) {
    button.setAttribute('aria-pressed', String(button === selected));
  }
  matrix.querySelector('.cell-reading').textContent = selected.dataset.pair;
});

const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('nav a')];
const sections = links.map(link => document.getElementById(link.hash.slice(1)));
let scheduled = false;
function refresh() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0) + ')';
  const active = sections.findLastIndex(section => section.getBoundingClientRect().top < 155);
  links.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
function scheduleRefresh() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(refresh);
  }
}
addEventListener('scroll', scheduleRefresh, {passive:true});
addEventListener('resize', scheduleRefresh);
document.querySelector('main').addEventListener('click', scheduleRefresh);
refresh();

