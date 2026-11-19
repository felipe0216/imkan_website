// The kit's head lines (motion.md, moments.md, scenes.md), as one file so the CSP allows scripts from 'self' only (D-029).
// Loaded synchronously in <head>, before the body is parsed, exactly where the inline lines were.
(function (html) {
  html.classList.add('m-enter', 'mo-js', 'sc-js');
  setTimeout(function () { html.classList.add('m-enter-done'); }, 700);
  setTimeout(function () { html.classList.add('mo-safe', 'sc-safe'); }, 2500);
})(document.documentElement);
