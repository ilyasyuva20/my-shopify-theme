document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-amie-slider]').forEach((slider) => {
    const slides = [...slider.querySelectorAll('[data-amie-slide]')];
    const dots = [...slider.querySelectorAll('[data-amie-dot]')];
    const prevBtn = slider.querySelector('[data-amie-prev]');
    const nextBtn = slider.querySelector('[data-amie-next]');
    let current = 0;
    let autoInterval = null;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== current; });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    };

    const startAuto = () => {
      if (slides.length > 1 && !autoInterval) {
        autoInterval = window.setInterval(() => show(current + 1), 5000);
      }
    };

    const stopAuto = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    };

    dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.amieDot))));
    if (prevBtn) prevBtn.addEventListener('click', () => show(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => show(current + 1));

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
  });
});
