document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-amie-slider]').forEach((slider) => {
    const slides = [...slider.querySelectorAll('[data-amie-slide]')];
    const dots = [...slider.querySelectorAll('[data-amie-dot]')];
    let current = 0;
    const show = (index) => {
      current = index;
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    };
    dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.amieDot))));
    if (slides.length > 1) window.setInterval(() => show((current + 1) % slides.length), 5000);
  });
});
