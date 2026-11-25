# Imkan business cards

Print-ready business cards in the three looks. Front: the logo centred. Back: name and title top left, the K small top right, phone, email and imkan.ai at the foot.

| Look | Front | Back |
|---|---|---|
| Light | Bone, plum K | Plum-black text, title in plum, plum K |
| Dark | Plum-black, gold K, bone text | Bone text, title in gold, gold K |
| Light with gold | Bone, gold K | Plum-black text throughout, gold K (gold is never text on bone) |

`template/` holds the cards with prompts ("Full name", "Job title", "Mobile number", "name@imkan.ai"). `preview.png` shows them cut to size.

## Making a person's cards

This repository is public, so people's phones and emails never go into it.

1. Put each person's details, as they gave them (never guessed), in `local/people.json` on your computer. That folder is git-ignored:
   ```json
   [
     { "slug": "full-name", "name": "Full name", "title": "Job title", "phone": "+966 5x xxx xxxx", "email": "name@imkan.ai" }
   ]
   ```
2. Run `node Documentation/brand/assets/cards/build-cards.mjs`.
3. Their cards appear in `local/<slug>/`: one PDF per look, page 1 the front, page 2 the back. Send those to the printer; keep a copy somewhere shared and private (not this repository).

## For the printer

- Trim 85 x 55 mm, with 3 mm bleed on every side: the PDF page is 91 x 61 mm. Text stays at least 4 mm inside the trim.
- Two pages: front, then back. Ask for double-sided printing.
- Colours are RGB, from the website. Most print shops convert them; ask for a proof, and for the dark look check that the plum-black does not print as plain black and the gold stays warm.
- Fonts are embedded in the PDF.
- Suggested paper: a heavy uncoated or matt stock (350 to 400 gsm) suits the bone and plum looks.

## Rebuilding

The cards are laid out in HTML with the site's fonts and the logo pack and printed to PDF by Edge (or Chrome; pass its path). Nothing to install.
