// Boot-sequence readout in hero corner — mirrors the brand's terminal-boot motif.
// Skips entirely if the user prefers reduced motion.

const lines = [
  "> INIT.SYSTEM",
  "> LOADING MODULES...",
  "> AI CORE           [OK]",
  "> DATA PIPELINE     [OK]",
  "> TOOLCHAIN         [OK]",
  "> SCORPION AI TOOLING",
  "> READY."
];

function typeBootLog(){
  const el = document.getElementById('bootLog');
  if(!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    el.textContent = lines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step(){
    if(lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    if(charIndex <= currentLine.length){
      output = lines.slice(0, lineIndex).join('\n') +
               (lineIndex > 0 ? '\n' : '') +
               currentLine.slice(0, charIndex);
      el.textContent = output;
      charIndex++;
      setTimeout(step, 18);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }
  step();
}

document.addEventListener('DOMContentLoaded', typeBootLog);

// Scroll-reveal for cards/sections tagged .reveal
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
