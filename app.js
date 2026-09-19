/* mikedzikowski.com — small behaviours only.
   Everything here is progressive enhancement: the page is complete without JS. */

(function () {
  'use strict';

  /* ── theme ──────────────────────────────────────────────
     Dark is the intended look. The toggle persists a choice
     and nothing else reads from the system preference, so the
     page looks the same to everyone until they ask otherwise. */

  var root = document.documentElement;
  var btn = document.getElementById('theme');

  function apply(mode) {
    root.setAttribute('data-theme', mode);
    if (btn) {
      btn.setAttribute('aria-label',
        mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) { /* private mode */ }
  apply(stored === 'light' ? 'light' : 'dark');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ── current year ─────────────────────────────────────── */

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ── active tab follows the section in view ───────────── */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var targets = tabs
    .map(function (t) {
      var el = document.querySelector(t.getAttribute('href'));
      return el ? { tab: t, el: el } : null;
    })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var hit = targets.filter(function (t) { return t.el === entry.target; })[0];
        if (!hit) return;
        tabs.forEach(function (t) { t.classList.remove('is-on'); });
        hit.tab.classList.add('is-on');
      });
    }, { rootMargin: '-15% 0px -70% 0px' });

    targets.forEach(function (t) { io.observe(t.el); });
  }

  /* ── live repository count ──────────────────────────────
     The page ships with the real number baked in. This only
     refreshes it, so a rate-limited or offline visitor still
     sees accurate content rather than a spinner or a zero. */

  fetch('https://api.github.com/users/mikedzikowski', {
    headers: { Accept: 'application/vnd.github+json' }
  })
    .then(function (r) {
      if (!r.ok) throw new Error('GitHub API responded ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var n = data && data.public_repos;
      if (typeof n !== 'number' || n <= 0) return;
      document.querySelectorAll('[data-gh="repos"]').forEach(function (el) {
        el.textContent = String(n);
      });
    })
    .catch(function () { /* keep the baked-in value */ });
})();
