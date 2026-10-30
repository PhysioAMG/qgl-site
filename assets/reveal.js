/* Fondu des photos quand elles arrivent à l'écran (opacité seulement, sans déplacement).
   Les textes, encadrés d'urgence, coordonnées et boutons ne sont jamais concernés.
   Désactivé si le visiteur a demandé de réduire les animations ; sans ce script, tout s'affiche normalement. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = Array.prototype.slice.call(document.querySelectorAll('main figure img, main .gallery img'));
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
  /* Un élément qui reçoit le focus clavier est affiché immédiatement. */
  document.addEventListener('focusin', function (ev) {
    var t = ev.target; if (!t || !t.querySelectorAll) return;
    if (t.classList && t.classList.contains('reveal')) t.classList.add('is-in');
    Array.prototype.forEach.call(t.querySelectorAll('.reveal'), function (el) { el.classList.add('is-in'); });
  });
  /* Sécurité : au retour arrière depuis le cache du navigateur, tout est affiché. */
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) els.forEach(function (el) { el.classList.add('is-in'); });
  });
})();
