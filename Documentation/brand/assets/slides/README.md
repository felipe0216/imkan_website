# Imkan PowerPoint templates

PowerPoint templates in the three brand looks. Each is a real template: one slide master, twelve named layouts, the brand colours as theme colours and Funnel as the theme fonts, so new slides, charts, tables and shapes come out on brand on their own.

| Look | What it looks like | Template | Example deck |
|---|---|---|---|
| Light | Bone background, plum-black text, plum accent and plum K | `imkan-slides-light.potx` | `imkan-slides-light-sample.pptx` |
| Dark | Plum-black background, bone text, gold accent and gold K | `imkan-slides-dark.potx` | `imkan-slides-dark-sample.pptx` |
| Light with gold | Bone background, plum-black text, gold K; gold appears only as a fill (never as text on bone) | `imkan-slides-light-gold.potx` | `imkan-slides-light-gold-sample.pptx` |

`preview/` has every example slide as a 1920x1080 PNG; `preview.png` shows all three looks side by side.

## Using a template

1. Install the fonts once (below). Without them PowerPoint still shows the embedded Funnel, but you cannot type in it everywhere.
2. Double-click a `.potx`. PowerPoint opens a new, untitled deck from it (the template itself is not changed).
3. Add slides with **Home > New slide** and pick a layout. Type into the placeholders; keep their fonts and colours.
4. Footer text (for example "Confidential") and slide numbers: **Insert > Header & Footer**, then **Apply to all**.
5. If a slide drifts from its layout: **Home > Reset**.
6. To move a finished deck to another look: **Design > Themes > Browse for themes**, then pick the other `.potx`. The layouts share names, so slides keep their content.
7. To share outside the team: **File > Export > PDF**.

Optional: to see the templates under **File > New > Personal**, copy the three `.potx` files to `Documents\Custom Office Templates`.

## Layouts

| Layout | Use it for |
|---|---|
| Title | The first slide: the logo, a large title, a subtitle (client, date). No slide number |
| Section | Dividing a long deck: a number, the section title, the K large on the right, on the surface colour |
| Title and content | Most slides: one title, one list |
| Two columns | Two related lists side by side |
| Comparison | Two columns with a heading over each (options, before and after) |
| Statement | One large line and who said it |
| Big number | One figure with its label, and context on the right. In the gold look the figure sits on a gold panel |
| Picture and text | Text on the left, a full-height picture on the right half (click the icon to add a photo) |
| Agenda | A numbered list |
| Title only | Tables, charts and diagrams |
| Closing | The last slide: the logo, a closing line, contact details |
| Blank | Anything else; keeps the footer |

Every content slide has the small IMKAN logo bottom left, the footer text next to it and the slide number bottom right. Titles sit at the same place on every content layout.

## Fonts

Headings use **Funnel Display**, text uses **Funnel Sans**: the website's fonts. They are free (SIL Open Font License, `../fonts/OFL.txt`) and are embedded in full in every file, so people without them still see the right type.

To install them (once per computer): open `Documentation/brand/assets/fonts/`, select the six `.ttf` files, right-click, **Install** (or **Install for all users**). On a Mac, double-click each file and choose **Install Font**. Google Slides has both fonts built in.

The files are the official static builds from the designers' repository (github.com/Dicotype/Funnel, commit `f9509ce`, the same one Google Fonts uses).

## Colours

| Slot | Light | Dark | Light with gold |
|---|---|---|---|
| Background | `#EFECE5` bone | `#1B111D` plum-black | `#EFECE5` bone |
| Text | `#1B111D` plum-black | `#EFECE5` bone | `#1B111D` plum-black |
| Muted text | `#4C4150` | `#CBBCCF` | `#4C4150` |
| Surface (section and closing slides, picture ground) | `#E3DED3` | `#271D29` | `#E3DED3` |
| Accent 1 | `#5E1654` plum | `#FFC233` gold | `#FFC233` gold |
| Accent 2 to 6 (charts) | gold, `#4C4150`, `#CBBCCF`, `#979092`, `#271D29` | `#CBBCCF`, `#979092`, bone, plum, `#4C4150` | plum-black, `#4C4150`, `#CBBCCF`, `#979092`, plum |
| Links | plum | gold | plum-black |

All are the website's own colours (`site/public/styles/tokens.css`). In the light looks a gold chart series has low contrast against bone, so give it data labels.

Tables use one of PowerPoint's built-in styles, which follow the theme colours: **Light Style 2, Accent 1** in light and dark (a plum or gold header row) and **Light Style 1, Accent 1** in light with gold (a bold header and pale gold bands, because bone text on gold is unreadable). PowerPoint does not draw custom table styles, so a fully custom one is not possible. New shapes take the accent fill with readable text on it.

## Rebuilding

The files are built by `build-slides.ps1`, which drives PowerPoint itself (Windows, PowerPoint 365, the fonts installed). It reads the logos from `../logos/svg` and the example illustration from `site/public/images/work`.

```powershell
powershell -ExecutionPolicy Bypass -File Documentation\brand\assets\slides\build-slides.ps1
```

`-Only light,dark` builds some looks only. Edit the script, not the files, so the three looks stay in step.
