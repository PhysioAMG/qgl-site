/* Apparition douce des blocs au défilement. Désactivée si le visiteur a demandé de réduire les animations.
   Les blocs déjà visibles au chargement ne sont pas animés ; sans ce script, tout reste affiché normalement. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = 'main h2, main .card, main .post, main .callout, main figure, main table, main .gallery, main .feel > a, main .motifs > div, main .actions';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  var vh = window.innerHeight || document.documentElement.clientHeight;
  els.forEach(function (el) {
    if (el.parentElement && el.parentElement.closest('.reveal')) return;
    if (el.getBoundingClientRect().top < vh) return;
    el.classList.add('reveal');
    io.observe(el);
  });
})();
