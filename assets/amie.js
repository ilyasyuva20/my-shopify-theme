function initAmieSliders() {
  document.querySelectorAll('[data-amie-slider]').forEach((slider) => {
    if (slider.dataset.amieInit === 'true') return;
    slider.dataset.amieInit = 'true';

    const slides = [...slider.querySelectorAll('[data-amie-slide]')];
    const dots = [...slider.querySelectorAll('[data-amie-dot]')];
    const prevBtn = slider.querySelector('[data-amie-prev]');
    const nextBtn = slider.querySelector('[data-amie-next]');

    if (slides.length === 0) return;

    let current = 0;
    let autoInterval = null;

    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.hidden = i !== current;
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
      });
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

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        show(Number(dot.dataset.amieDot));
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        show(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        show(current + 1);
      });
    }

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    startAuto();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAmieSliders);
} else {
  initAmieSliders();
}

document.addEventListener('shopify:section:load', initAmieSliders);
