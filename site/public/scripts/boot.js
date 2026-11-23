// The kit's head lines (motion.md, moments.md, scenes.md), as one file so the CSP allows scripts from 'self' only (D-029).
// Loaded synchronously in <head>, before the body is parsed, exactly where the inline lines were.
(function (html) {
  html.classList.add('m-enter', 'mo-js', 'sc-js');
  setTimeout(function () { html.classList.add('m-enter-done'); }, 700);
  setTimeout(function () { html.classList.add('mo-safe', 'sc-safe'); }, 2500);
})(document.documentElement);

// D-035: light or dark mode. The visitor's own choice (the nav button, remembered on this browser) wins; without one,
// the device setting decides, and a change of that setting follows live. Set here, before the body is drawn, so the
// page never flashes the other mode.
(function (html) {
  var KEY = 'imkan-theme';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var saved = function () { try { var v = localStorage.getItem(KEY); return v === 'dark' || v === 'light' ? v : null; } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: the choice lasts this page */ } };
  var apply = function (mode) {
    html.setAttribute('data-theme', mode);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#1b111d' : '#efece5');
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', String(mode === 'dark'));
  };
  apply(saved() || (media && media.matches ? 'dark' : 'light'));
  if (media) {
    var follow = function () { if (!saved()) apply(media.matches ? 'dark' : 'light'); };
    if (media.addEventListener) media.addEventListener('change', follow); else if (media.addListener) media.addListener(follow);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!b) return;
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    save(next);
    apply(next);
  });
  document.addEventListener('DOMContentLoaded', function () { apply(html.getAttribute('data-theme') || 'light'); });
})(document.documentElement);
