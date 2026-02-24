(function () {
  var blobA = document.querySelector('[data-blob="a"]');
  var blobB = document.querySelector('[data-blob="b"]');
  var blobC = document.querySelector('[data-blob="c"]');
  var parallaxUp = document.querySelector('[data-parallax="up"]');
  var parallaxDown = document.querySelector('[data-parallax="down"]');
  var bgLogo = document.querySelector('[data-bg-logo]');

  var heroCopy = document.querySelector('.hero-copy');
  var featuredTitle = document.querySelector('#featured h2');
  var featuredSub = document.querySelector('#featured .section-sub');
  var navCenterLogo = document.querySelector('.nav-center-logo');

  var revealTargets = document.querySelectorAll('.reveal, .drink-card');
  var scrollY = window.scrollY || window.pageYOffset || 0;
  var startTime = performance.now();
  var prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealTargets.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function updateFromScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
  }

  function render(now) {
    var y = scrollY;
    var t = (now - startTime) / 1000;

    var ax = Math.sin(t * 0.45) * 36;
    var ay = Math.cos(t * 0.34) * 28;
    var bx = Math.cos(t * 0.41) * 34;
    var by = Math.sin(t * 0.52) * 24;
    var cx = Math.sin(t * 0.32 + 1.2) * 30;
    var cy = Math.cos(t * 0.28 + 0.5) * 34;

    if (blobA) blobA.style.transform = 'translate3d(' + (ax + y * 0.01) + 'px,' + (ay + y * 0.02) + 'px,0)';
    if (blobB) blobB.style.transform = 'translate3d(' + (bx - y * 0.012) + 'px,' + (by + y * 0.01) + 'px,0)';
    if (blobC) blobC.style.transform = 'translate3d(' + (cx + y * 0.006) + 'px,' + (cy - y * 0.01) + 'px,0)';

    if (parallaxUp) parallaxUp.style.transform = 'translateY(0px)';
    if (parallaxDown) parallaxDown.style.transform = 'translateY(' + (Math.cos(t * 1.05) * 10 + y * 0.015) + 'px)';

    if (heroCopy) heroCopy.style.transform = 'translateY(' + (Math.sin(t * 0.9 + 0.3) * 3.5) + 'px)';
    if (featuredTitle) featuredTitle.style.transform = 'translateY(' + (Math.sin(t * 0.7 + 1.1) * 2.2) + 'px)';
    if (featuredSub) featuredSub.style.transform = 'translateY(' + (Math.cos(t * 0.65 + 0.5) * 1.8) + 'px)';
    if (navCenterLogo) navCenterLogo.style.transform = 'translateY(' + (Math.sin(t * 1.2) * 1.2) + 'px)';

    if (bgLogo) {
      var logoScale = 1 + Math.sin(t * 0.52) * 0.02;
      var logoRotate = Math.sin(t * 0.25) * 4 + y * 0.01;
      var logoX = -50 + Math.sin(t * 0.24) * 1.8;
      var logoY = -50 + Math.cos(t * 0.29) * 2.4;
      bgLogo.style.transform =
        'translate3d(' + logoX + '%,' + logoY + '%,0) rotate(' + logoRotate + 'deg) scale(' + logoScale + ')';
    }

    window.requestAnimationFrame(render);
  }

  window.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();
  window.requestAnimationFrame(render);
})();


