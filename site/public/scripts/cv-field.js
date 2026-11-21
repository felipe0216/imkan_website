// CV field on /careers/: the browser cannot check a file's size or type on its own, so this sets the field's
// validity message, which the kit's form check (system.js, forms) shows under the field on submit.
// The server checks again (extension, file signature, 5 MB: api/function_app.py); this only saves a wasted upload.
const MAX = 5 * 1024 * 1024;
const OK = /\.(pdf|docx?)$/i;

for (const input of document.querySelectorAll('input[type="file"][data-cv]')) {
  const err = document.getElementById(input.id + '-err');
  const missing = err ? err.textContent.trim() : '';
  const check = () => {
    const f = input.files && input.files[0];
    let msg = '';
    if (f && !OK.test(f.name)) msg = 'Please upload a PDF or Word document (.pdf, .doc, .docx).';
    else if (f && f.size > MAX) msg = 'CV must be 5 MB or smaller.';
    input.setCustomValidity(msg);
    // the kit keeps the first written reason; give it the one that applies now
    if (err) err.dataset.text = msg || missing;
  };
  input.addEventListener('change', check);
  input.form?.addEventListener('submit', check, { capture: true });
}
