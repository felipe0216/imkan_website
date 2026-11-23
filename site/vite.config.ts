import { defineConfig, type Plugin } from 'vite';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SKIP = new Set(['node_modules', 'dist', 'public', 'partials', 'tests', 'test-results', 'playwright-report', '.taste-skill', 'shots']);

/** Every index.html under the site root is a page (ADR 0002): /, /careers/, /work/<slug>/ ... */
function findPages(dir: string, pages: Record<string, string> = {}): Record<string, string> {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!SKIP.has(name)) findPages(full, pages);
    } else if (name === 'index.html') {
      const key = relative(root, dir).replace(/\\/g, '/') || 'home';
      pages[key] = full;
    }
  }
  return pages;
}

/**
 * Shared partials without a dependency: `<!-- @include partials/nav.html -->`
 * is replaced by that file's contents (paths relative to the site root).
 * Partials may include other partials.
 */
function htmlPartials(): Plugin {
  const pattern = /<!--\s*@include\s+([\w./-]+)\s*-->/g;
  const expand = (html: string, depth = 0): string => {
    if (depth > 5) throw new Error('htmlPartials: includes nested too deeply');
    return html.replace(pattern, (_match, file: string) => {
      const path = resolve(root, file);
      if (!path.startsWith(resolve(root, 'partials'))) {
        throw new Error(`htmlPartials: only files in partials/ can be included (${file})`);
      }
      return expand(readFileSync(path, 'utf8'), depth + 1);
    });
  };
  return {
    name: 'imkan-html-partials',
    transformIndexHtml: { order: 'pre', handler: (html) => expand(html) },
    handleHotUpdate({ file, server }) {
      if (file.includes(`${join(root, 'partials')}`)) server.ws.send({ type: 'full-reload' });
    },
  };
}

export default defineConfig({
  root,
  appType: 'mpa',
  plugins: [htmlPartials()],
  server: {
    port: 5173,
    strictPort: true,
    // Azure Functions host from `func start` in ../api
    proxy: { '/api': 'http://localhost:7071' },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // public/assets is the design-taste-frontend kit, served as is; Vite's own output goes elsewhere.
    assetsDir: '_build',
    modulePreload: { polyfill: false },
    rollupOptions: { input: findPages(root) },
  },
});
