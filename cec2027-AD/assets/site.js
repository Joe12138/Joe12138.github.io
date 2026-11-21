/* All content and links work without JavaScript. */
document.documentElement.classList.add('js');

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.section-nav');
const menuLabel = toggle.querySelector('.menu-label');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
  menuLabel.textContent = open ? 'Close' : 'Menu';
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.masthead')) setMenu(false);
});

if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    const current = sections.find(section => visible.has(section.id));
    links.forEach(link => {
      if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// The illustration's independent layers introduce the session's research areas.
document.querySelectorAll('.layer-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const enabled = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(enabled));
    document.querySelectorAll(`.scene-layer-${button.dataset.layer}`).forEach(layer => {
      layer.classList.toggle('layer-hidden', !enabled);
      layer.setAttribute('aria-hidden', String(!enabled));
    });
    document.getElementById('layer-status').textContent = `${button.textContent.trim()} layer ${enabled ? 'shown' : 'hidden'}.`;
  });
});
