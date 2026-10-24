(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');
  /* mobile drawer: one breakpoint (768px) lives in CSS, JS only toggles state */
  var t = document.getElementById('mob-toggle');
  var d = document.getElementById('mob-drawer');
  var o = document.getElementById('mob-overlay');
  var c = document.getElementById('drawer-close');
  function openDrawer() {
    d.classList.add('is-open'); o.classList.add('is-open');
    d.removeAttribute('aria-hidden');
    t.setAttribute('aria-expanded', 'true'); t.setAttribute('aria-label', 'Close navigation menu');
    root.style.overflow = 'hidden';
  }
  function closeDrawer() {
    d.classList.remove('is-open'); o.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
    t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-label', 'Open navigation menu');
    root.style.overflow = '';
  }
  if (t && d && o) {
    d.setAttribute('aria-hidden', 'true');
    t.addEventListener('click', function () { if (t.getAttribute('aria-expanded') === 'true') { closeDrawer(); } else { openDrawer(); } });
    if (c) { c.addEventListener('click', closeDrawer); }
    o.addEventListener('click', closeDrawer);
    var links = d.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) { links[i].addEventListener('click', closeDrawer); }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); } });
  }
  /* collapsible groups in the drawer */
  var gb = document.querySelectorAll('.mob-group-btn');
  for (var g = 0; g < gb.length; g++) {
    gb[g].addEventListener('click', function () {
      var list = document.getElementById(this.getAttribute('aria-controls'));
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (list) { list.classList.toggle('is-open', !open); }
    });
  }
  /* FAQ accordion (max-height toggle) */
  var qs = document.querySelectorAll('.faq-q');
  for (var q = 0; q < qs.length; q++) {
    qs[q].addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var open = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', open ? 'false' : 'true');
      item.classList.toggle('open', !open);
    });
  }
  /* floating call button hides near the footer and the final call band */
  var fc = document.getElementById('float-call');
  var targets = document.querySelectorAll('.site-footer, .final-cta');
  if (fc && 'IntersectionObserver' in window && targets.length) {
    var visible = 0;
    var io = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) { visible += entries[k].isIntersecting ? 1 : -1; }
      fc.classList.toggle('is-hidden', visible > 0);
    });
    for (var j = 0; j < targets.length; j++) { io.observe(targets[j]); }
  }
})();
