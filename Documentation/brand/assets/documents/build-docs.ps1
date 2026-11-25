# Builds the Imkan Word templates (item 5 of the brand assets, DECISION_TRACKER 2026-11-24) by driving Word itself,
# so the files carry real styles, a table style, theme colours and fonts, headers and footers. No npm or Python packages.
#
# Per look (light, dark, light-gold) it writes into this folder:
#   imkan-letterhead-<look>.dotx / imkan-report-<look>.dotx      the templates (A4, Funnel fonts embedded)
#   imkan-letterhead-<look>-sample.docx / .pdf, imkan-report-<look>-sample.docx / .pdf   filled in, as a how-to
#
# Felipe's choices (2026-11-24): white pages in every look; the dark look is a plum-black report cover and a plum-black band
# on the letter's first page, white pages inside; a letterhead and a report template per look.
# Needs: Windows, Word 365 (16.0), and the Funnel fonts installed (../fonts, see ../slides/README.md).
# usage: powershell -ExecutionPolicy Bypass -File Documentation\brand\assets\documents\build-docs.ps1 [-Only light,dark]
param([string[]]$Only = @('light', 'dark', 'light-gold'))
$ErrorActionPreference = 'Stop'
$LOG = $env:IMKAN_BUILD_LOG
function Step([string]$m) { if ($LOG) { Add-Content $LOG ((Get-Date -Format 'HH:mm:ss') + ' ' + $m) } }

$HERE = Split-Path -Parent $MyInvocation.MyCommand.Path
$LOGO_DIR = (Resolve-Path (Join-Path $HERE '..\logos\svg')).Path

Add-Type -AssemblyName System.Drawing
$installed = (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name
foreach ($fontName in 'Funnel Display', 'Funnel Sans') { if ($installed -notcontains $fontName) { throw "Font '$fontName' is not installed. See ../slides/README.md, Fonts." } }

# ---- the site's colours (site/public/styles/tokens.css), nothing new ----
$HEX = @{ bone = 'EFECE5'; surface = 'E3DED3'; ink = '1B111D'; muted = '4C4150'; plum = '5E1654'; gold = 'FFC233'
          frame = '271D29'; lilac = 'CBBCCF'; grey = '979092'; white = 'FFFFFF' }
function C([string]$name) { $h = $HEX[$name]; [int]('0x' + $h.Substring(4, 2)) * 65536 + [int]('0x' + $h.Substring(2, 2)) * 256 + [int]('0x' + $h.Substring(0, 2)) }

# Per look: the cover / letter band, the logo for white pages and for the cover, and the inside accents.
# Gold is never text on white (contrast 1.6:1): it appears in the logo, the dark cover and as a fill with plum-black text.
$LOOK_DEF = [ordered]@{
  'light'      = @{ title = 'Light'; coverBg = 'bone'; coverInk = 'ink'; coverMuted = 'muted'; coverLogo = 'light'; pageLogo = 'light'
                    band = $false; h2 = 'plum'; link = 'plum'; quote = 'plum'; tableHead = 'surface'; tableRule = 'plum'; bullet = 'plum' }
  'dark'       = @{ title = 'Dark'; coverBg = 'ink'; coverInk = 'bone'; coverMuted = 'lilac'; coverLogo = 'dark'; pageLogo = 'light-gold'
                    band = $true; h2 = 'ink'; link = 'plum'; quote = 'muted'; tableHead = 'lilac'; tableRule = 'ink'; bullet = 'ink' }
  'light-gold' = @{ title = 'Light with gold'; coverBg = 'bone'; coverInk = 'ink'; coverMuted = 'muted'; coverLogo = 'light-gold'; pageLogo = 'light-gold'
                    band = $false; h2 = 'ink'; link = 'ink'; quote = 'muted'; tableHead = 'gold'; tableRule = 'ink'; bullet = 'ink' }
}
# theme colours (Word's colour picker and charts): text, background, then six accents
$THEME_ACC = @{ 'light' = @('plum', 'gold', 'muted', 'lilac', 'grey', 'frame'); 'dark' = @('ink', 'gold', 'plum', 'muted', 'lilac', 'grey')
                'light-gold' = @('gold', 'ink', 'muted', 'lilac', 'grey', 'plum') }

# ---- Word constants ----
$WD_TRUE = -1; $WD_FALSE = 0; $MISSING = [Type]::Missing
$PAGE_W = 595.3; $PAGE_H = 841.9; $SIDE = 62  # A4, 2.2 cm side margins
$LOCKUP_RATIO = 347.4 / 104                   # the logo's own box (kit viewBox -2 -2 347.4 104)
$ST = @{ normal = -1; h1 = -2; h2 = -3; h3 = -4; title = -63; subtitle = -75; quote = -181; caption = -35; bullet = -49; number = -50
         hyperlink = -86; header = -32; footer = -33; toc1 = -20; toc2 = -21; toc3 = -22; tableNormal = -106 }

function Set-Font($font, [string]$face, [double]$size, [string]$color, [bool]$bold = $false) {
  $font.Name = $face; $font.Size = [single]$size; $font.Color = C $color; $font.Bold = $(if ($bold) { $WD_TRUE } else { $WD_FALSE })
}
function Set-Para($pf, [double]$before, [double]$after, [double]$lines = 1.0, [bool]$keepNext = $false) {
  $pf.SpaceBefore = [single]$before; $pf.SpaceAfter = [single]$after
  $pf.LineSpacingRule = 5; $pf.LineSpacing = [single](12 * $lines)  # 5: multiple, in points of 12 per line
  $pf.KeepWithNext = $(if ($keepNext) { $WD_TRUE } else { $WD_FALSE })
}

# styles shared by both templates
function Set-Styles($doc, [string]$look) { Step 'Set-Styles';
  $def = $LOOK_DEF[$look]
  $theme = $doc.DocumentTheme
  $slots = @('ink', 'white', 'muted', 'surface') + $THEME_ACC[$look] + @($def.link, 'muted')
  for ($i = 0; $i -lt 12; $i++) { $theme.ThemeColorScheme.Colors($i + 1).RGB = C $slots[$i] }
  $theme.ThemeFontScheme.MajorFont.Item(1).Name = 'Funnel Display'
  $theme.ThemeFontScheme.MinorFont.Item(1).Name = 'Funnel Sans'

  $s = $doc.Styles.Item($ST.normal); Set-Font $s.Font 'Funnel Sans' 10.5 'ink'; Set-Para $s.ParagraphFormat 0 8 1.4
  $s.ParagraphFormat.WidowControl = $WD_TRUE
  $s = $doc.Styles.Item($ST.title); Set-Font $s.Font 'Funnel Display' 34 'ink'; Set-Para $s.ParagraphFormat 0 10 1.0
  $s.Font.Spacing = -1; $s.ParagraphFormat.Borders.Enable = $WD_FALSE
  $s = $doc.Styles.Item($ST.subtitle); Set-Font $s.Font 'Funnel Sans' 15 'muted'; Set-Para $s.ParagraphFormat 0 12 1.25
  $s.Font.Italic = $WD_FALSE; $s.Font.Spacing = 0
  $s = $doc.Styles.Item($ST.h1); Set-Font $s.Font 'Funnel Display' 22 'ink'; Set-Para $s.ParagraphFormat 24 8 1.05 $true
  $s.Font.Spacing = -0.5; $s.ParagraphFormat.PageBreakBefore = $WD_FALSE
  $s = $doc.Styles.Item($ST.h2); Set-Font $s.Font 'Funnel Display' 15 $def.h2; Set-Para $s.ParagraphFormat 18 6 1.1 $true
  $s = $doc.Styles.Item($ST.h3); Set-Font $s.Font 'Funnel Sans' 11 'ink' $true; Set-Para $s.ParagraphFormat 12 4 1.2 $true
  $s.Font.Italic = $WD_FALSE
  $s = $doc.Styles.Item($ST.quote); Set-Font $s.Font 'Funnel Display' 16 $def.quote; Set-Para $s.ParagraphFormat 14 14 1.2
  $s.Font.Italic = $WD_FALSE; $s.ParagraphFormat.LeftIndent = 0; $s.ParagraphFormat.RightIndent = 0; $s.ParagraphFormat.Alignment = 0
  $s = $doc.Styles.Item($ST.caption); Set-Font $s.Font 'Funnel Sans' 8.5 'muted'; Set-Para $s.ParagraphFormat 4 12 1.2
  $s.Font.Italic = $WD_FALSE
  $s = $doc.Styles.Item($ST.hyperlink); $s.Font.Color = C $def.link; $s.Font.Underline = 1
  foreach ($k in 'header', 'footer') { $s = $doc.Styles.Item($ST[$k]); Set-Font $s.Font 'Funnel Sans' 8.5 'muted'; Set-Para $s.ParagraphFormat 0 0 1.0 }
  foreach ($k in 'toc1', 'toc2', 'toc3') { $s = $doc.Styles.Item($ST[$k]); $s.Font.Name = 'Funnel Sans'; $s.Font.Color = C 'ink'; $s.Font.Size = 10.5 }
  $doc.Styles.Item($ST.toc1).Font.Bold = $WD_TRUE; $doc.Styles.Item($ST.toc1).ParagraphFormat.SpaceBefore = 6

  # lists: Word's own List Bullet / List Number styles, in the brand font, bullets in the look's colour
  foreach ($k in 'bullet', 'number') {
    $s = $doc.Styles.Item($ST[$k]); Set-Font $s.Font 'Funnel Sans' 10.5 'ink'; Set-Para $s.ParagraphFormat 0 4 1.4
  }
  $lt = $doc.Styles.Item($ST.bullet).ListTemplate
  if ($lt) { $lvl = $lt.ListLevels.Item(1); $lvl.Font.Color = C $def.bullet; $lvl.NumberPosition = 0; $lvl.TextPosition = 16; $lvl.TabPosition = 16; $doc.Styles.Item($ST.bullet).LinkToListTemplate($lt, 1) }
  $lt = $doc.Styles.Item($ST.number).ListTemplate
  if ($lt) { $lvl = $lt.ListLevels.Item(1); $lvl.Font.Color = C $def.bullet; $lvl.NumberPosition = 0; $lvl.TextPosition = 18; $lvl.TabPosition = 18; $doc.Styles.Item($ST.number).LinkToListTemplate($lt, 1) }

  # the table style: a tinted header row with a rule under it, hairlines between rows, no side or inner vertical lines.
  # Header text stays plum-black: Word lets the Normal style's colour override a table style's, so the fills are chosen
  # to read with plum-black text (surface, lilac, gold) rather than relying on a light text colour.
  $ts = $doc.Styles.Add('Imkan table', 3)
  $ts.Font.Name = 'Funnel Sans'; $ts.Font.Size = 9.5; $ts.Font.Color = C 'ink'
  $ts.ParagraphFormat.SpaceAfter = 0; $ts.ParagraphFormat.SpaceBefore = 0; $ts.ParagraphFormat.LineSpacingRule = 0
  $ts.Table.TopPadding = 4; $ts.Table.BottomPadding = 4; $ts.Table.LeftPadding = 6; $ts.Table.RightPadding = 6
  foreach ($b in -1, -3, -5) { $bd = $ts.Table.Borders.Item($b); $bd.LineStyle = 1; $bd.LineWidth = 4; $bd.Color = C 'grey' }
  foreach ($b in -2, -4, -6) { $ts.Table.Borders.Item($b).LineStyle = 0 }
  $hr = $ts.Table.Condition(0)  # first row
  $hr.Shading.BackgroundPatternColor = C $def.tableHead; $hr.Font.Bold = $WD_TRUE
  $rule = $hr.Borders.Item(-3); $rule.LineStyle = 1; $rule.LineWidth = 12; $rule.Color = C $def.tableRule  # 1.5 pt
  $ts
}

# the logo as a floating picture (in a header) at page coordinates
function Add-Logo($container, $anchor, [string]$which, [double]$left, [double]$top, [double]$height) {
  $file = Join-Path $LOGO_DIR "imkan-logo-$which.svg"
  $pic = $container.Shapes.AddPicture($file, $WD_FALSE, $WD_TRUE, [single]$left, [single]$top, [single]($height * $LOCKUP_RATIO), [single]$height, $anchor)
  $pic.RelativeHorizontalPosition = 1; $pic.RelativeVerticalPosition = 1; $pic.Left = [single]$left; $pic.Top = [single]$top
  $pic.WrapFormat.Type = 3; $pic.AlternativeText = 'IMKAN logo'; $pic.LockAspectRatio = $WD_TRUE; $pic
}
function Add-Ground($container, $anchor, [double]$height, [string]$color) {
  $r = $container.Shapes.AddShape(1, 0, 0, [single]$PAGE_W, [single]$height, $anchor)
  $r.RelativeHorizontalPosition = 1; $r.RelativeVerticalPosition = 1; $r.Left = 0; $r.Top = 0
  $r.Fill.ForeColor.RGB = C $color; $r.Line.Visible = $WD_FALSE; $r.WrapFormat.Type = 5; $r.ZOrder(5)  # behind text
  $r.AlternativeText = ''; try { $r.Title = 'Background' } catch { }; $r
}
# A prompt users type over. The text is typed first and wrapped in a content control at the end (a new control captures the
# cursor); fix-prompts.vbs then turns each one into Word's grey placeholder, which PowerShell cannot set (it cannot skip the
# method's optional arguments).
$script:PROMPTS = @()
function Add-Prompt($sel, [string]$prompt, [int]$type = 1) {
  if ($sel.StoryType -ne 1) { throw 'the cursor is not in the document body' }
  $start = $sel.Start; $sel.TypeText($prompt); $name = 'imkanPrompt' + $script:PROMPTS.Count
  $null = $sel.Document.Bookmarks.Add($name, $sel.Document.Range($start, $sel.End))
  $script:PROMPTS += @{ mark = $name; text = $prompt; type = $type }
}
function Convert-Prompts($doc) { Step 'Convert-Prompts';
  if ($script:PROMPTS.Count -eq 0) { return }
  # park the cursor on an empty last paragraph, outside every prompt, or Word refuses to add the controls
  $cur = $doc.Application.Selection; $null = $cur.EndKey(6); $cur.TypeParagraph(); $cur.Style = $doc.Styles.Item($ST.normal)
  foreach ($p in $script:PROMPTS) {
    $bm = $doc.Bookmarks.Item($p.mark); $r = $bm.Range; $bm.Delete()
    if ($r.Text -ne $p.text) { throw "prompt '$($p.text)' moved: found '$($r.Text)'" }
    $cc = $doc.ContentControls.Add($p.type, $r); $cc.Title = $p.text; $cc.Tag = 'imkan-prompt'
    if ($p.type -eq 6) { $cc.DateDisplayFormat = 'd MMMM yyyy' }
  }
  $script:PROMPTS = @()
}
function Type-Line($sel, [string]$text, $style) { if ($null -ne $style) { $sel.Style = $sel.Document.Styles.Item($style) }; if ($text) { $sel.TypeText($text) }; $sel.TypeParagraph() }

# page 2 onwards: the small logo top left, the document title top right (from the Title style), imkan.ai and the page number below
function Set-RunningHeadFoot($doc, [string]$look, [bool]$titleRight) { Step 'Set-RunningHeadFoot';
  $def = $LOOK_DEF[$look]; $sec = $doc.Sections.Item(1)
  $hd = $sec.Headers.Item(1); $hr = $hd.Range
  $hr.Text = ''; $hr.ParagraphFormat.TabStops.ClearAll(); $null = $hr.ParagraphFormat.TabStops.Add([single]($PAGE_W - 2 * $SIDE), 2)
  $null = Add-Logo $hd $hr $def.pageLogo $SIDE 34 16
  if ($titleRight) { $hr.InsertAfter("`t"); $end = $hd.Range; $end.Collapse(0); $null = $doc.Fields.Add($end, -1, 'STYLEREF "Title"', $WD_FALSE) }
  $ft = $sec.Footers.Item(1).Range
  $ft.Text = "imkan.ai`tPage {P} of {N}"; $ft.ParagraphFormat.TabStops.ClearAll(); $null = $ft.ParagraphFormat.TabStops.Add([single]($PAGE_W - 2 * $SIDE), 2)
  # fields replace the tokens from the end backwards: once a field is in, the story's text no longer maps to positions
  foreach ($tok in @(@('{N}', 'NUMPAGES'), @('{P}', 'PAGE'))) {
    $story = $sec.Footers.Item(1).Range; $at = $story.Text.IndexOf($tok[0])
    $r = $story.Duplicate; $r.SetRange($story.Start + $at, $story.Start + $at + 3); $r.Text = ''
    $null = $doc.Fields.Add($r, -1, $tok[1], $WD_FALSE)
  }
}

# document properties only answer late-bound calls from PowerShell
function Set-DocProp($doc, [string]$name, [string]$value) {
  $prop = [System.__ComObject].InvokeMember('Item', 'GetProperty', $null, $doc.BuiltInDocumentProperties, @($name))
  [void][System.__ComObject].InvokeMember('Value', 'SetProperty', $null, $prop, @($value))
}
function New-Doc($word) { Step 'New-Doc';
  $doc = $word.Documents.Add()
  $ps = $doc.PageSetup; $ps.PaperSize = 7; $ps.LeftMargin = $SIDE; $ps.RightMargin = $SIDE
  $ps.HeaderDistance = 30; $ps.FooterDistance = 30; $ps.BottomMargin = 72; $ps.DifferentFirstPageHeaderFooter = $WD_TRUE
  $doc.EmbedTrueTypeFonts = $WD_TRUE; $doc.SaveSubsetFonts = $WD_FALSE; $doc.DoNotEmbedSystemFonts = $WD_TRUE
  $doc
}

# ---- letterhead: logo and contact line on the first page, legal details in its footer ----
function Build-Letterhead($word, [string]$look, [bool]$sample) { Step 'Build-Letterhead';
  $def = $LOOK_DEF[$look]
  $doc = New-Doc $word; $doc.PageSetup.TopMargin = 150
  $null = Set-Styles $doc $look
  $sec = $doc.Sections.Item(1)
  $fh = $sec.Headers.Item(2); $fr = $fh.Range
  $contactColor = $(if ($def.band) { 'lilac' } else { 'muted' })
  # contact line, right-aligned beside the logo (text first: setting a header's text deletes its shapes)
  $fr.Text = "imkan.ai`rinfo@imkan.ai"; $fr.ParagraphFormat.Alignment = 2; $fr.Font.Color = C $contactColor; $fr.Font.Size = 9
  $fr.ParagraphFormat.SpaceBefore = 0; $fr.ParagraphFormat.SpaceAfter = 0; $fr.Paragraphs.Item(1).SpaceBefore = 22
  $anchor = $sec.Headers.Item(2).Range.Paragraphs.Item(1).Range
  if ($def.band) { $null = Add-Ground $fh $anchor 112 'ink' }
  $null = Add-Logo $fh $anchor $(if ($def.band) { 'dark' } else { $def.pageLogo }) $SIDE 40 34
  # first-page footer: the legal details, as Felipe gave them (2026-11-25): legal name, CR number, registered address.
  # No VAT number: Felipe has none on file; add it here if one is issued (CLAUDE.md: never invent company facts)
  $legal = "Imkan dot AI  $([char]0x00B7)  CR 7053412040"  # middle dot as a code: PowerShell 5.1 reads this file as ANSI
  $address = '8392 Prince Turki Bin Abdulaziz Al Awwal, 5246 King Saud University district, Riyadh, 12371, Saudi Arabia'
  $sec.Footers.Item(2).Range.Text = "$legal`r$address"
  Set-RunningHeadFoot $doc $look $false

  $sel = $word.Selection; $sel.HomeKey(6) | Out-Null
  $sel.Style = $doc.Styles.Item($ST.normal)
  if (-not $sample) {
    Add-Prompt $sel 'Date' 6; $sel.TypeParagraph(); $sel.TypeParagraph()
    Add-Prompt $sel 'Recipient name, organisation and address'; $sel.TypeParagraph(); $sel.TypeParagraph()
    $sel.Font.Bold = $WD_TRUE; Add-Prompt $sel 'Subject'; $sel.Font.Bold = $WD_FALSE; $sel.TypeParagraph()
    Add-Prompt $sel 'Greeting'; $sel.TypeParagraph()
    Add-Prompt $sel 'Letter text'; $sel.TypeParagraph(); $sel.TypeParagraph()
    Add-Prompt $sel 'Sign-off, name and title'
  } else {
    $sel.TypeText((Get-Date -Format 'd MMMM yyyy')); $sel.TypeParagraph(); $sel.TypeParagraph()
    $sel.TypeText("Recipient name`vOrganisation`vCity"); $sel.TypeParagraph(); $sel.TypeParagraph()
    $sel.Font.Bold = $WD_TRUE; $sel.TypeText("Using the Imkan.ai letterhead, $($def.title.ToLower()) look"); $sel.Font.Bold = $WD_FALSE; $sel.TypeParagraph()
    $sel.TypeText('Hello,'); $sel.TypeParagraph()
    foreach ($t in @(
      'This letterhead is for letters, quotations and other one-page documents. Open the template, then type over each grey prompt: the date, the recipient, the subject, the text and the sign-off.',
      'The first page carries the logo, the contact line and the company details at the foot. From the second page on, a small logo sits at the top and the page number at the bottom, so long letters stay on brand.',
      'Text uses Funnel Sans and headings Funnel Display, the website''s fonts. They are embedded in the file, and the fonts folder has them to install.')) { $sel.TypeText($t); $sel.TypeParagraph() }
    $sel.TypeParagraph(); $sel.TypeText("Name`vTitle, Imkan.ai")
  }
  Convert-Prompts $doc
  $doc
}

# ---- report: a cover page in the look, contents, then the body styles ----
function Build-Report($word, [string]$look, [bool]$sample) { Step 'Build-Report';
  $def = $LOOK_DEF[$look]
  $doc = New-Doc $word; $doc.PageSetup.TopMargin = 90
  $table = Set-Styles $doc $look
  $sec = $doc.Sections.Item(1)
  # the cover lives on the first page: its ground and logo in the first-page header, no first-page footer
  $fh = $sec.Headers.Item(2); $fr = $fh.Range
  $null = Add-Ground $fh $fr $PAGE_H $def.coverBg
  $null = Add-Logo $fh $fr $def.coverLogo $SIDE 62 40
  $sec.Footers.Item(2).Range.Text = ''
  Set-RunningHeadFoot $doc $look $true

  $sel = $word.Selection; $sel.HomeKey(6) | Out-Null
  # cover text: pushed down the page, in the cover's own colours
  $sel.Style = $doc.Styles.Item($ST.title); $sel.ParagraphFormat.SpaceBefore = 250; $sel.Font.Color = C $def.coverInk
  if ($sample) { $sel.TypeText('Possibility? Engineered!') } else { Add-Prompt $sel 'Document title' }
  $sel.TypeParagraph()
  $sel.Style = $doc.Styles.Item($ST.subtitle); $sel.Font.Color = C $def.coverMuted
  if ($sample) { $sel.TypeText("Imkan.ai report template, $($def.title.ToLower()) look") } else { Add-Prompt $sel 'Subtitle' }
  $sel.TypeParagraph()
  $sel.Style = $doc.Styles.Item($ST.normal); $sel.ParagraphFormat.SpaceBefore = 150; $sel.Font.Color = C $def.coverInk
  if ($sample) { $sel.TypeText('Prepared for Client name') } else { Add-Prompt $sel 'Prepared for' }
  $sel.TypeParagraph(); $sel.ParagraphFormat.SpaceBefore = 0; $sel.Font.Color = C $def.coverMuted
  if ($sample) { $sel.TypeText((Get-Date -Format 'MMMM yyyy')) } else { Add-Prompt $sel 'Date' 6 }
  $sel.TypeParagraph(); $sel.Font.Color = C 'ink'
  $sel.InsertBreak(7)  # page break

  # contents
  $sel.Style = $doc.Styles.Item($ST.normal); $sel.Font.Name = 'Funnel Display'; $sel.Font.Size = 22; $sel.TypeText('Contents'); $sel.TypeParagraph()
  $sel.Style = $doc.Styles.Item($ST.normal)
  $toc = $doc.TablesOfContents.Add($sel.Range, $WD_TRUE, 1, 3); $sel.EndKey(6) | Out-Null
  $sel.InsertBreak(7)

  if (-not $sample) {
    $sel.Style = $doc.Styles.Item($ST.h1); Add-Prompt $sel 'Heading 1'; $sel.TypeParagraph()
    $sel.Style = $doc.Styles.Item($ST.normal); Add-Prompt $sel 'Start typing. Use Heading 1 to 3 from the Styles gallery so the contents page can list them.'
  } else {
    Type-Line $sel 'Using this template' $ST.h1
    Type-Line $sel 'This report template is for proposals, reports and other documents of more than a page. The cover takes the title, the subtitle, the client and the date. Every heading styled Heading 1 to 3 appears on the contents page: right-click it and choose Update field after editing.' $ST.normal
    Type-Line $sel 'Styles' $ST.h2
    Type-Line $sel 'Use the Styles gallery on the Home tab rather than formatting text by hand. Then every document looks alike and a change of look is one step.' $ST.normal
    foreach ($t in 'Title and Subtitle for the cover', 'Heading 1, 2 and 3 for sections', 'Normal for running text', 'List Bullet and List Number for lists', 'Quote for a line that should stand out', 'Caption under tables and figures') { Type-Line $sel $t $ST.bullet }
    Type-Line $sel 'A quote' $ST.h3
    Type-Line $sel 'Engineering Without Friction.' $ST.quote
    Type-Line $sel 'Steps' $ST.h2
    foreach ($t in 'Open the template with a double-click; Word starts a new document from it', 'Type over the grey prompts on the cover', 'Write the body with the styles above', 'Update the contents page, then export to PDF with File, Export') { Type-Line $sel $t $ST.number }
    Type-Line $sel 'Tables' $ST.h2
    Type-Line $sel 'New tables take the Imkan table style: a tinted header row with a rule under it, and thin lines between rows.' $ST.normal
    $doc.Paragraphs.Item($doc.Paragraphs.Count - 1).KeepWithNext = $WD_TRUE  # the line above stays with its table
    $rows = @(@('Style', 'Use it for'), @('Heading 1', 'A new section; it starts the contents entry'), @('Heading 2', 'A part of a section'), @('Quote', 'One line that should stand out'), @('Caption', 'The line under a table or a figure'))
    $tbl = $doc.Tables.Add($sel.Range, $rows.Count, 2)
    $tbl.Style = 'Imkan table'
    for ($r = 1; $r -le $rows.Count; $r++) { for ($c = 1; $c -le 2; $c++) { $tbl.Cell($r, $c).Range.Text = $rows[$r - 1][$c - 1] } }
    $tbl.PreferredWidthType = 2; $tbl.PreferredWidth = 100  # full text width
    $tbl.Columns.Item(1).PreferredWidthType = 2; $tbl.Columns.Item(1).PreferredWidth = 30
    $tbl.Columns.Item(2).PreferredWidthType = 2; $tbl.Columns.Item(2).PreferredWidth = 70
    for ($r = 1; $r -lt $rows.Count; $r++) { $tbl.Rows.Item($r).Range.ParagraphFormat.KeepWithNext = $WD_TRUE }  # one block
    $tbl.Rows.AllowBreakAcrossPages = $WD_FALSE
    $tbl.Rows.Item(1).HeadingFormat = $WD_TRUE
    $sel.EndKey(6) | Out-Null
    Type-Line $sel 'Table 1. The styles in this template.' $ST.caption
    Type-Line $sel 'Proven Impact' $ST.h1
    Type-Line $sel '15+ production-grade AI and data solutions. Delivering measurable results across banking, logistics, healthcare, and beyond.' $ST.normal
    $toc.Update()
  }
  Convert-Prompts $doc
  $doc.SetDefaultTableStyle('Imkan table', $WD_FALSE)
  $doc
}

# ---- run ----
$word = New-Object -ComObject Word.Application
$word.Visible = $false; $word.DisplayAlerts = 0
# never write to the user's Normal.dotm: styles go into each document only (SetDefaultTableStyle with SetInTemplate = False),
# and Normal is marked saved before Word quits
try {
  foreach ($item in $Only) {
    $look = [string]$item
    if (-not $LOOK_DEF.Contains($look)) { throw "unknown look $look" }
    Write-Host "== $look"
    foreach ($kind in 'letterhead', 'report') {
      foreach ($sample in $false, $true) {
        $doc = if ($kind -eq 'letterhead') { Build-Letterhead $word $look $sample } else { Build-Report $word $look $sample }
        if ($kind -eq 'letterhead') { $doc.SetDefaultTableStyle('Imkan table', $WD_FALSE) }
        Step "built $kind sample=$sample"
        Set-DocProp $doc 'Title' "Imkan.ai $kind, $($LOOK_DEF[$look].title.ToLower())"
        Step "built $kind sample=$sample"
        Set-DocProp $doc 'Author' 'Imkan.ai'
        $base = Join-Path $HERE "imkan-$kind-$look"
        if ($sample) {
          $doc.Fields.Update() | Out-Null
          $doc.SaveAs2("$base-sample.docx", 16)
          $doc.ExportAsFixedFormat("$base-sample.pdf", 17, $WD_FALSE, 0, 0, 1, 1, 0, $WD_TRUE, $WD_TRUE, 1, $WD_TRUE, $WD_TRUE, $WD_FALSE)
          Write-Host ("   {0} sample: {1} pages" -f $kind, $doc.ComputeStatistics(2))
        } else {
          Step 'saving dotx'; $doc.SaveAs2("$base.dotx", 14); Step 'saved'
        }
        $doc.Close($WD_FALSE)
        if (-not $sample) { & cscript //nologo (Join-Path $HERE 'fix-prompts.vbs') "$base.dotx"; if ($LASTEXITCODE) { throw "fix-prompts failed on $base.dotx" } }
      }
    }
  }
} catch { Write-Host $_.ScriptStackTrace; throw } finally { try { $word.NormalTemplate.Saved = $WD_TRUE } catch { }; $noSave = $WD_FALSE; $word.Quit([ref]$noSave); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($word) }
