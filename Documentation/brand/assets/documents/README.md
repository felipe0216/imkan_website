# Imkan Word templates

Word templates in the three brand looks: a **letterhead** (letters, quotations, one-page documents) and a **report** (proposals, reports, anything longer) for each. They are real templates, with named styles, a table style, theme colours and fonts, and headers and footers, so documents come out on brand without formatting by hand. A4, white pages.

| Look | What it looks like | Letterhead | Report |
|---|---|---|---|
| Light | Plum K logo; report cover in bone; plum second-level headings, bullets and quote; table headers on the bone-grey surface with a plum rule | `imkan-letterhead-light.dotx` | `imkan-report-light.dotx` |
| Dark | Letter: a plum-black band across the top with the gold K logo. Report: a plum-black cover with the gold K and a bone title. Inside pages white, gold K in the header, lilac table headers | `imkan-letterhead-dark.dotx` | `imkan-report-dark.dotx` |
| Light with gold | Gold K logo; report cover in bone; plum-black headings; gold table headers with plum-black text. Gold never appears as text on white | `imkan-letterhead-light-gold.dotx` | `imkan-report-light-gold.dotx` |

Each has a filled-in example, as Word and PDF (`*-sample.docx`, `*-sample.pdf`). `preview/` has every example page as a PNG; `preview.png` shows all three looks.

## Bilingual letterhead (English and Arabic)

`imkan-letterhead-bilingual-<look>.dotx`, in the same three looks, with a filled-in example (`-sample.docx`, `-sample.pdf`). The first page has the logo in the middle, the English name and CR number on the left and the Arabic ones on the right (flush right, right to left); the footer has the registered address in English on the left and in Arabic on the right, with `imkan.ai` and `info@imkan.ai` between them. Later pages match the English letterhead.

- Arabic text uses **IBM Plex Sans Arabic** (`../fonts`, install it like Funnel). For an Arabic paragraph in the letter, choose the **Imkan Arabic** style.
- The wording sits in `bilingual-text.json`. The Arabic company name is the brand name إمكان, as in the logo (Felipe). The Arabic address is a translation waiting for review (wording-changes.md, rows 131 and 132).

## Using a template

1. Install the fonts once: `../fonts/`, select the six `.ttf` files, right-click, **Install** (Mac: double-click each, **Install Font**). Without them Word shows the embedded Funnel, but typing may fall back to another font.
2. Double-click a `.dotx`. Word opens a new, untitled document from it; the template itself is not changed.
3. Click each grey prompt and type over it (date, recipient, subject and so on; on the report: title, subtitle, client, date).
4. Write with the **Styles** gallery on the Home tab: Heading 1 to 3, Normal, List Bullet, List Number, Quote, Caption. Do not format by hand.
5. Report: after editing, right-click the contents page and choose **Update field**, **Update entire table**.
6. Share: **File > Export > Create PDF/XPS**.

Optional: to see the templates under **File > New > Personal**, copy the `.dotx` files to `Documents\Custom Office Templates`.

## What is on each page

- **Letterhead, first page:** the logo top left, `imkan.ai` and `info@imkan.ai` top right, the company's legal details at the foot.
- **Bilingual letterhead, first page:** see above.
- **Report, first page:** the cover (logo, title, subtitle, prepared for, date), then a contents page.
- **Every later page:** a small logo top left (and the report's title top right, taken from the cover), `imkan.ai` and "Page 2 of 4" at the foot.

**Legal line:** the letterhead footer gives the legal name and CR number ("Imkan dot AI · CR 7053412040") and the registered address, as Felipe supplied them. There is no VAT number on file; if one is issued, add it to `$legal` in `build-docs.ps1` and rebuild.

## Styles

| Style | Font | Notes |
|---|---|---|
| Title | Funnel Display 34 pt | the report cover |
| Subtitle | Funnel Sans 15 pt, muted | |
| Heading 1 | Funnel Display 22 pt | listed on the contents page |
| Heading 2 | Funnel Display 15 pt | plum in the light look, plum-black in the others |
| Heading 3 | Funnel Sans 11 pt bold | |
| Normal | Funnel Sans 10.5 pt, line spacing 1.4 | |
| List Bullet, List Number | Funnel Sans 10.5 pt | markers plum (light) or plum-black |
| Quote | Funnel Display 16 pt | plum (light) or muted |
| Caption | Funnel Sans 8.5 pt, muted | under tables and figures |
| Imkan table | Funnel Sans 9.5 pt | the default for new tables |

Colours are the website's own (`site/public/styles/tokens.css`): plum-black `#1B111D`, muted `#4C4150`, surface `#E3DED3`, bone `#EFECE5`, plum `#5E1654`, gold `#FFC233`, lilac `#CBBCCF`. Table header text stays plum-black because Word lets the Normal style's colour override a table style's; the header fills are chosen to read with it.

## Rebuilding

`build-docs.ps1` builds everything by driving Word itself (Windows, Word 365, the fonts installed); `fix-prompts.vbs` is called by it to turn the prompts into Word's grey placeholders, a call PowerShell cannot make. It reads the logos from `../logos/svg`. It never writes to your `Normal.dotm`.

```powershell
powershell -ExecutionPolicy Bypass -File Documentation\brand\assets\documents\build-docs.ps1
```

`-Only light,dark` builds some looks only; `-Kinds letterhead,report,bilingual` some templates only. Edit the script, not the files, so the looks stay in step. The page previews are made from the PDFs with Windows' own PDF renderer (not part of the build).
