# Builds the Imkan PowerPoint templates (item 4 of the brand assets, DECISION_TRACKER 2026-11-24) by driving PowerPoint itself,
# so the files carry a real slide master, named layouts, theme colours and theme fonts. No npm or Python packages.
#
# Per look (light, dark, light-gold) it writes into this folder:
#   imkan-slides-<look>.potx         the template (one empty title slide, Funnel fonts embedded)
#   imkan-slides-<look>-sample.pptx  every layout filled in, as a how-to
#   preview/<look>-NN.png            each sample slide at 1920x1080, for review
#
# Needs: Windows, PowerPoint 365 (16.0), and the Funnel fonts installed (../fonts, see README.md).
# usage: powershell -ExecutionPolicy Bypass -File Documentation\brand\assets\slides\build-slides.ps1 [-Only light,dark]
param([string[]]$Only = @('light', 'dark', 'light-gold'))
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem

$HERE = Split-Path -Parent $MyInvocation.MyCommand.Path
$LOGOS = Join-Path $HERE '..\logos\svg' | Resolve-Path
$WORK = Join-Path $HERE '..\..\..\..\site\public\images\work' | Resolve-Path
$PREVIEW = Join-Path $HERE 'preview'
New-Item -ItemType Directory -Force $PREVIEW | Out-Null

# fail early if the fonts are missing: PowerPoint would silently substitute them and embed nothing
Add-Type -AssemblyName System.Drawing
$installed = (New-Object System.Drawing.Text.InstalledFontCollection).Families.Name
foreach ($f in 'Funnel Display', 'Funnel Sans') { if ($installed -notcontains $f) { throw "Font '$f' is not installed. See README.md, Fonts." } }

# ---- colours: the site's tokens (site/public/styles/tokens.css), nothing new ----
$T = @{ bone = 'EFECE5'; surface = 'E3DED3'; ink = '1B111D'; muted = '4C4150'; plum = '5E1654'; gold = 'FFC233'
        frame = '271D29'; lilac = 'CBBCCF'; grey = '979092' }
# Theme slots. tx2 is always the muted text colour and bg2 the surface (cards, section grounds), in every look.
# The dark look keeps dark1 = plum-black and swaps the colour map (bg1 = dk1, tx1 = lt1), as Office's own dark themes do,
# so charts, tables and SmartArt pick up light text on their own.
# PowerPoint's built-in table styles (by their fixed ids)
$TBL = @{ light1 = '{3B4B98B0-60AC-42C2-AFA5-B58CD77FA1E5}'; light2 = '{69012ECD-51FC-41F1-AA8D-1B2483CD663E}' }
$LOOKS = [ordered]@{
  'light'      = @{ title = 'Light'; dk1 = $T.ink; lt1 = $T.bone; dk2 = $T.muted; lt2 = $T.surface; dark = $false
                    acc = @($T.plum, $T.gold, $T.muted, $T.lilac, $T.grey, $T.frame); hl = $T.plum; fhl = $T.muted
                    eyebrow = 5; onAccent = $T.bone; illus = 'ink'; table = $TBL.light2 }
  'dark'       = @{ title = 'Dark'; dk1 = $T.ink; lt1 = $T.bone; dk2 = $T.frame; lt2 = $T.lilac; dark = $true
                    acc = @($T.gold, $T.lilac, $T.grey, $T.bone, $T.plum, $T.muted); hl = $T.gold; fhl = $T.lilac
                    eyebrow = 5; onAccent = $T.ink; illus = 'band'; table = $TBL.light2 }
  'light-gold' = @{ title = 'Light with gold'; dk1 = $T.ink; lt1 = $T.bone; dk2 = $T.muted; lt2 = $T.surface; dark = $false
                    acc = @($T.gold, $T.ink, $T.muted, $T.lilac, $T.grey, $T.plum); hl = $T.ink; fhl = $T.muted
                    eyebrow = 13; onAccent = $T.ink; illus = 'ink'; table = $TBL.light1 }
}
# eyebrow: the theme colour of small accent text (5 = accent 1, 13 = text 1). Gold is never used as text on a light ground.
# onAccent: text colour on an accent fill (plum takes bone, gold takes plum-black).

# ---- Office constants ----
$TRUE_ = -1; $FALSE_ = 0
$PH = @{ title = 1; body = 2; subtitle = 4; number = 13; footer = 15; date = 16; picture = 18 }
$TC = @{ accent1 = 5; text1 = 13; bg1 = 14; text2 = 15; bg2 = 16 }
$ANCHOR = @{ top = 1; middle = 3; bottom = 4 }
$ALIGN = @{ left = 1; center = 2; right = 3 }

function BGR([string]$hex) { [int]('0x' + $hex.Substring(4, 2)) * 65536 + [int]('0x' + $hex.Substring(2, 2)) * 256 + [int]('0x' + $hex.Substring(0, 2)) }

# ---- geometry, in points (16:9, 960 x 540). 48 pt side margins (0.67 in) ----
$W = 960; $H = 540; $M = 48; $CW = $W - 2 * $M
$TITLE = @{ x = $M; y = 30; w = $CW; h = 78 }        # content titles: same box on every content layout, text sits on its bottom
$BODY = @{ x = $M; y = 128; w = $CW; h = 348 }       # ends at 476, 18 pt above the footer row
$FOOT = @{ y = 494; h = 20 }                         # footer row: logo, footer text, slide number
$LOGO_H = 16; $LOGO_W = [math]::Round(16 * 347.4 / 104, 2)  # the lockup's own box (kit viewBox -2 -2 347.4 104)

# Formats a text frame. Only what is passed is set, so layout placeholders keep the master's level styles otherwise.
function Set-Frame($shape, [hashtable]$o) {
  $tf = $shape.TextFrame2
  $tf.MarginLeft = 0; $tf.MarginRight = 0; $tf.MarginTop = 0; $tf.MarginBottom = 0; $tf.WordWrap = $TRUE_
  if ($o.anchor) { $tf.VerticalAnchor = [int]$ANCHOR[[string]$o.anchor] }
  $tf.AutoSize = if ($o.ContainsKey('fit')) { [int]$o.fit } else { 2 }  # 2: shrink text on overflow (what PowerPoint's own templates do)
  if ($o.ContainsKey('text')) { $tf.TextRange.Text = [string]$o.text }
  $r = $tf.TextRange
  if ($o.font) { $r.Font.Name = [string]$o.font }
  if ($o.size) { $r.Font.Size = [single]$o.size }
  if ($o.ContainsKey('bold')) { $r.Font.Bold = $(if ($o.bold) { $TRUE_ } else { $FALSE_ }) }
  if ($o.ContainsKey('spacing')) { $r.Font.Spacing = [single]$o.spacing }
  if ($o.color) { $r.Font.Fill.ForeColor.ObjectThemeColor = [int]$TC[[string]$o.color] }
  if ($o.align) { $r.ParagraphFormat.Alignment = [int]$ALIGN[[string]$o.align] }
  if ($o.lines) { $r.ParagraphFormat.LineRuleWithin = $TRUE_; $r.ParagraphFormat.SpaceWithin = [single]$o.lines }
  if ($o.nobullet) { $r.ParagraphFormat.Bullet.Visible = $FALSE_; $r.ParagraphFormat.LeftIndent = 0; $r.ParagraphFormat.FirstLineIndent = 0 }
}
function Place($shape, [hashtable]$b) { $shape.Left = [single]$b.x; $shape.Top = [single]$b.y; $shape.Width = [single]$b.w; $shape.Height = [single]$b.h }  # COM refuses wrapped numbers
function Find-PH($container, [int]$type) { foreach ($s in $container.Shapes) { if ($s.Type -eq 14 -and $s.PlaceholderFormat.Type -eq $type) { return $s } }; $null }
function Add-PH($layout, [string]$kind, [hashtable]$b, [string]$name) {
  $s = $layout.Shapes.AddPlaceholder($PH[$kind], [single]$b.x, [single]$b.y, [single]$b.w, [single]$b.h); if ($name) { $s.Name = $name }; $s
}
function Add-Svg($container, [string]$file, [double]$x, [double]$y, [double]$w, [double]$h, [string]$alt, [bool]$decorative = $false) {
  $s = $container.Shapes.AddPicture($file, $FALSE_, $TRUE_, [single]$x, [single]$y, [single]$w, [single]$h)
  $s.AlternativeText = $alt
  if ($decorative) { try { $s.Decorative = $TRUE_ } catch { } }
  $s
}

function Build-Template($pp, [string]$look) {
  $L = $LOOKS[$look]
  $p = $pp.Presentations.Add($FALSE_)
  $p.PageSetup.SlideWidth = $W; $p.PageSetup.SlideHeight = $H
  $mst = $p.SlideMaster

  # theme colours and fonts
  $cs = $mst.Theme.ThemeColorScheme
  $slots = @($L.dk1, $L.lt1, $L.dk2, $L.lt2) + $L.acc + @($L.hl, $L.fhl)
  for ($i = 0; $i -lt 12; $i++) { $cs.Colors($i + 1).RGB = BGR $slots[$i] }
  $mst.Theme.ThemeFontScheme.MajorFont.Item(1).Name = 'Funnel Display'
  $mst.Theme.ThemeFontScheme.MinorFont.Item(1).Name = 'Funnel Sans'

  # master: background, title, body levels, footer row
  $mst.Background.Fill.Solid(); $mst.Background.Fill.ForeColor.ObjectThemeColor = $TC.bg1
  $mt = Find-PH $mst $PH.title; Place $mt $TITLE
  Set-Frame $mt @{ font = '+mj-lt'; size = 32; spacing = -1; color = 'text1'; anchor = 'bottom'; lines = 0.95; bold = $false }
  $mb = Find-PH $mst $PH.body; Place $mb $BODY
  Set-Frame $mb @{ anchor = 'top' }
  $sizes = 20, 18, 16, 14, 14; $indent = 0, 22, 44, 66, 88
  $pars = $mb.TextFrame2.TextRange.Paragraphs()
  for ($i = 1; $i -le [math]::Min(5, $pars.Count); $i++) {
    $q = $mb.TextFrame2.TextRange.Paragraphs($i)
    $q.Font.Name = '+mn-lt'; $q.Font.Size = $sizes[$i - 1]; $q.Font.Fill.ForeColor.ObjectThemeColor = $TC.text1
    $f = $q.ParagraphFormat
    $f.LineRuleWithin = $TRUE_; $f.SpaceWithin = 1.1; $f.SpaceAfter = 8; $f.SpaceBefore = 0
    $b = $f.Bullet; $b.Visible = $TRUE_; $b.Type = 1; $b.UseTextFont = $FALSE_; $b.Font.Name = 'Arial'
    $b.Character = $(if ($i -eq 1) { 8226 } else { 8211 })  # level 1 a dot, deeper levels an en dash
    $b.RelativeSize = 1; $b.UseTextColor = $FALSE_; $b.Font.Fill.ForeColor.ObjectThemeColor = $(if ($i -eq 1) { $L.eyebrow } else { $TC.text2 })
    $f.LeftIndent = $indent[$i - 1] + 20; $f.FirstLineIndent = -20
  }
  foreach ($kind in 'footer', 'number', 'date') {
    $s = Find-PH $mst $PH[$kind]
    Set-Frame $s @{ font = '+mn-lt'; size = 10; color = 'text2'; anchor = 'middle'; fit = 0 }
  }
  Place (Find-PH $mst $PH.footer) @{ x = $M + $LOGO_W + 18; y = $FOOT.y; w = 420; h = $FOOT.h }
  Place (Find-PH $mst $PH.number) @{ x = $W - $M - 100; y = $FOOT.y; w = 100; h = $FOOT.h }
  Place (Find-PH $mst $PH.date) @{ x = $W - $M - 260; y = $FOOT.y; w = 150; h = $FOOT.h }
  (Find-PH $mst $PH.footer).TextFrame2.TextRange.ParagraphFormat.Alignment = $ALIGN.left
  (Find-PH $mst $PH.number).TextFrame2.TextRange.ParagraphFormat.Alignment = $ALIGN.right
  $mst.HeadersFooters.SlideNumber.Visible = $TRUE_
  $mst.HeadersFooters.Footer.Visible = $TRUE_; $mst.HeadersFooters.Footer.Text = ''
  $mst.HeadersFooters.DateAndTime.Visible = $FALSE_

  $lockup = Join-Path $LOGOS "imkan-logo-$look.svg"
  $mark = Join-Path $LOGOS "imkan-mark-$look.svg"
  $old = @(); foreach ($x in $mst.CustomLayouts) { $old += $x }

  # A layout starts from PowerPoint's blank custom layout (title, date, footer, number), trimmed to what it needs.
  function New-Layout([string]$name, [bool]$wantTitle, [bool]$smallLogo = $true, [bool]$number = $true, [bool]$footer = $true) {
    $x = $mst.CustomLayouts.Add($mst.CustomLayouts.Count + 1); $x.Name = $name
    foreach ($s in @($x.Shapes | ForEach-Object { $_ })) {
      $t = $s.PlaceholderFormat.Type
      if ($t -eq $PH.date -or ($t -eq $PH.title -and -not $wantTitle) -or ($t -eq $PH.number -and -not $number) -or ($t -eq $PH.footer -and -not $footer)) { $s.Delete() }
    }
    $tt = Find-PH $x $PH.title; if ($tt) { Place $tt $TITLE }
    $ft = Find-PH $x $PH.footer; if ($ft) { Place $ft @{ x = $M + $(if ($smallLogo) { $LOGO_W + 18 } else { 0 }); y = $FOOT.y; w = 420; h = $FOOT.h } }
    $nm = Find-PH $x $PH.number; if ($nm) { Place $nm @{ x = $W - $M - 100; y = $FOOT.y; w = 100; h = $FOOT.h } }
    if ($smallLogo) { $null = Add-Svg $x $lockup $M ($FOOT.y + 2) $LOGO_W $LOGO_H 'IMKAN logo' }
    $x
  }
  function Ground-Surface($x) { $x.FollowMasterBackground = $FALSE_; $x.Background.Fill.Solid(); $x.Background.Fill.ForeColor.ObjectThemeColor = $TC.bg2 }

  # 1. Title: the full logo top left, a large title, a subtitle. No slide number.
  $x = New-Layout 'Title' $true $false $false $true
  $null = Add-Svg $x $lockup $M $M ([math]::Round(40 * 347.4 / 104, 2)) 40 'IMKAN logo'
  $t = Find-PH $x $PH.title; Place $t @{ x = $M; y = 170; w = 780; h = 210 }
  Set-Frame $t @{ size = 60; spacing = -2; anchor = 'bottom'; lines = 0.92; text = 'Presentation title' }
  $s = Add-PH $x 'subtitle' @{ x = $M; y = 398; w = 700; h = 64 } 'Subtitle'
  Set-Frame $s @{ font = '+mn-lt'; size = 20; color = 'text2'; anchor = 'top'; align = 'left'; nobullet = $true; lines = 1.1; text = 'Subtitle, client or date' }

  # 2. Section: surface ground, a number, the title, the K large on the right
  $x = New-Layout 'Section' $true $false $true $true
  Ground-Surface $x
  $null = Add-Svg $x $mark 612 116 300 300 'IMKAN K mark' $true
  $s = Add-PH $x 'body' @{ x = $M; y = 168; w = 420; h = 28 } 'Section number'
  Set-Frame $s @{ font = '+mn-lt'; size = 16; bold = $true; color = $(if ($L.eyebrow -eq 5) { 'accent1' } else { 'text1' }); anchor = 'bottom'; nobullet = $true; fit = 0; text = '01' }
  $t = Find-PH $x $PH.title; Place $t @{ x = $M; y = 206; w = 520; h = 210 }
  Set-Frame $t @{ size = 44; spacing = -1.4; anchor = 'top'; lines = 0.95; text = 'Section title' }

  # 3. Title and content
  $x = New-Layout 'Title and content' $true
  $null = Add-PH $x 'body' $BODY 'Content'

  # 4. Two columns
  $x = New-Layout 'Two columns' $true
  $colW = ($CW - 24) / 2
  $null = Add-PH $x 'body' @{ x = $M; y = $BODY.y; w = $colW; h = $BODY.h } 'Left column'
  $null = Add-PH $x 'body' @{ x = $M + $colW + 24; y = $BODY.y; w = $colW; h = $BODY.h } 'Right column'

  # 5. Comparison: a heading over each column
  $x = New-Layout 'Comparison' $true
  foreach ($c in 0, 1) {
    $cx = $M + $c * ($colW + 24)
    $s = Add-PH $x 'body' @{ x = $cx; y = $BODY.y; w = $colW; h = 30 } $(if ($c) { 'Right heading' } else { 'Left heading' })
    Set-Frame $s @{ font = '+mn-lt'; size = 18; bold = $true; color = $(if ($L.eyebrow -eq 5) { 'accent1' } else { 'text1' }); anchor = 'bottom'; nobullet = $true; fit = 0; text = 'Heading' }
    $null = Add-PH $x 'body' @{ x = $cx; y = $BODY.y + 44; w = $colW; h = $BODY.h - 44 } $(if ($c) { 'Right column' } else { 'Left column' })
  }

  # 6. Statement: one large line, and who said it
  $x = New-Layout 'Statement' $false
  $s = Add-PH $x 'body' @{ x = $M; y = 96; w = 800; h = 292 } 'Statement'
  Set-Frame $s @{ font = '+mj-lt'; size = 44; spacing = -1.4; color = 'text1'; anchor = 'bottom'; nobullet = $true; lines = 1.0; text = 'One short statement' }
  $s = Add-PH $x 'body' @{ x = $M; y = 410; w = 600; h = 30 } 'Attribution'
  Set-Frame $s @{ font = '+mn-lt'; size = 16; color = 'text2'; anchor = 'top'; nobullet = $true; fit = 0; text = 'Name, role' }

  # 7. Big number: the figure, its label, context on the right. Light-gold sets the figure on a gold panel,
  #    because gold text on bone is unreadable (contrast 1.4:1).
  $x = New-Layout 'Big number' $true
  $nx = $M; $ny = $BODY.y; $nw = 500
  if ($look -eq 'light-gold') {
    $panel = $x.Shapes.AddShape(5, $M, $BODY.y, $nw, $BODY.h)  # rounded rectangle
    $panel.Adjustments.Item(1) = 0.06; $panel.Line.Visible = $FALSE_
    $panel.Fill.Solid(); $panel.Fill.ForeColor.ObjectThemeColor = $TC.accent1; $panel.Name = 'Gold panel'
    try { $panel.Decorative = $TRUE_ } catch { }
    $nx = $M + 32; $nw = 500 - 64; $ny = $BODY.y + 24
  }
  $numColor = $(if ($L.eyebrow -eq 5) { 'accent1' } else { 'text1' })
  $s = Add-PH $x 'body' @{ x = $nx; y = $ny; w = $nw; h = 170 } 'Figure'
  Set-Frame $s @{ font = '+mj-lt'; size = 120; spacing = -4; color = $numColor; anchor = 'bottom'; nobullet = $true; lines = 0.9; text = '00' }
  $s = Add-PH $x 'body' @{ x = $nx; y = $ny + 182; w = $nw; h = 100 } 'Figure label'
  Set-Frame $s @{ font = '+mn-lt'; size = 20; color = 'text1'; anchor = 'top'; nobullet = $true; lines = 1.1; text = 'What the figure counts' }
  $null = Add-PH $x 'body' @{ x = $M + 500 + 40; y = $BODY.y; w = $CW - 540; h = $BODY.h } 'Context'

  # 8. Picture and text: a full-height picture on the right half
  $x = New-Layout 'Picture and text' $true $true $true $true
  Place (Find-PH $x $PH.title) @{ x = $M; y = $TITLE.y; w = 392; h = $TITLE.h }
  $null = Add-PH $x 'body' @{ x = $M; y = $BODY.y; w = 392; h = $BODY.h } 'Content'
  $pic = Add-PH $x 'picture' @{ x = 480; y = 0; w = 480; h = 540 } 'Picture'
  $pic.Fill.Solid(); $pic.Fill.ForeColor.ObjectThemeColor = $TC.bg2; $pic.Line.Visible = $FALSE_
  Set-Frame $pic @{ font = '+mn-lt'; size = 14; color = 'text2'; anchor = 'middle'; align = 'center'; nobullet = $true; fit = 0 }
  $nm = Find-PH $x $PH.number; Place $nm @{ x = 480 - $M - 60; y = $FOOT.y; w = 60; h = $FOOT.h }
  Place (Find-PH $x $PH.footer) @{ x = $M + $LOGO_W + 18; y = $FOOT.y; w = 240; h = $FOOT.h }

  # 9. Agenda: a numbered list
  $x = New-Layout 'Agenda' $true
  $s = Add-PH $x 'body' $BODY 'Agenda items'
  $r = $s.TextFrame2.TextRange; $r.Text = 'Agenda item'
  $r.Font.Size = 24; $r.ParagraphFormat.SpaceAfter = 14; $r.ParagraphFormat.LeftIndent = 40; $r.ParagraphFormat.FirstLineIndent = -40
  $bl = $r.ParagraphFormat.Bullet; $bl.Visible = $TRUE_; $bl.Type = 2; $bl.Style = 3; $bl.UseTextFont = $TRUE_
  $bl.UseTextColor = $FALSE_; $bl.Font.Fill.ForeColor.ObjectThemeColor = $L.eyebrow

  # 10. Title only: for tables, charts and anything composed by hand
  $null = New-Layout 'Title only' $true

  # 11. Closing: surface ground, the logo, a closing line, contact details
  $x = New-Layout 'Closing' $true $false $false $true
  Ground-Surface $x
  $null = Add-Svg $x $lockup $M $M ([math]::Round(40 * 347.4 / 104, 2)) 40 'IMKAN logo'
  $t = Find-PH $x $PH.title; Place $t @{ x = $M; y = 170; w = 780; h = 160 }
  Set-Frame $t @{ size = 60; spacing = -2; anchor = 'bottom'; lines = 0.92; text = 'Closing line' }
  $s = Add-PH $x 'body' @{ x = $M; y = 352; w = 600; h = 110 } 'Contact'
  Set-Frame $s @{ font = '+mn-lt'; size = 18; color = 'text2'; anchor = 'top'; nobullet = $true; lines = 1.25; text = "Name, title`remail | phone`rimkan.ai" }
  $s.TextFrame2.TextRange.ParagraphFormat.SpaceAfter = 0

  # 12. Blank: the footer row only
  $null = New-Layout 'Blank' $false

  foreach ($o in $old) { $o.Delete() }
  $p
}

# ---- package edits PowerPoint's object model cannot make ----
function Edit-Package([string]$file, [string]$look) {
  $L = $LOOKS[$look]
  $zip = [System.IO.Compression.ZipFile]::Open($file, 'Update')
  $utf8 = New-Object System.Text.UTF8Encoding($false)
  function Get-Part($n) { $e = $zip.GetEntry($n); $sr = New-Object System.IO.StreamReader($e.Open(), $utf8); $t = $sr.ReadToEnd(); $sr.Close(); $t }
  function Set-Part($n, $t) { $zip.GetEntry($n).Delete(); $e = $zip.CreateEntry($n); $sw = New-Object System.IO.StreamWriter($e.Open(), $utf8); $sw.Write($t); $sw.Close() }
  try {
    # theme: names, and the default shape (accent fill, readable text on it, no outline)
    $th = Get-Part 'ppt/theme/theme1.xml'
    $th = $th -replace '(<a:theme [^>]*name=")[^"]*"', "`${1}Imkan $($L.title)`""
    $th = $th -replace '(<a:clrScheme name=")[^"]*"', "`${1}Imkan $($L.title)`""
    $th = $th -replace '(<a:fontScheme name=")[^"]*"', '${1}Imkan Funnel"'
    $sp = '<a:spDef><a:spPr><a:solidFill><a:schemeClr val="accent1"/></a:solidFill><a:ln><a:noFill/></a:ln></a:spPr>' +
      '<a:bodyPr rtlCol="0" anchor="ctr"/><a:lstStyle><a:defPPr algn="ctr"><a:defRPr><a:solidFill><a:srgbClr val="' + $L.onAccent + '"/></a:solidFill></a:defRPr></a:defPPr></a:lstStyle>' +
      '<a:style><a:lnRef idx="0"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="1"><a:schemeClr val="accent1"/></a:fillRef>' +
      '<a:effectRef idx="0"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:srgbClr val="' + $L.onAccent + '"/></a:fontRef></a:style></a:spDef>'
    if ($th -match '<a:objectDefaults\s*/>') { $th = $th -replace '<a:objectDefaults\s*/>', "<a:objectDefaults>$sp</a:objectDefaults>" }
    elseif ($th -match '<a:objectDefaults>') { $th = $th -replace '<a:objectDefaults>(?:(?!</a:objectDefaults>)[\s\S])*</a:objectDefaults>', "<a:objectDefaults>$sp</a:objectDefaults>" }
    else { throw 'theme1.xml has no objectDefaults' }
    Set-Part 'ppt/theme/theme1.xml' $th

    # dark look: swap the colour map so text 1 is bone and background 1 is plum-black
    if ($L.dark) {
      $mx = Get-Part 'ppt/slideMasters/slideMaster1.xml'
      $map = '<p:clrMap bg1="dk1" tx1="lt1" bg2="dk2" tx2="lt2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>'
      if ($mx -notmatch '<p:clrMap [^>]*/>') { throw 'slideMaster1.xml has no clrMap' }
      Set-Part 'ppt/slideMasters/slideMaster1.xml' ($mx -replace '<p:clrMap [^>]*/>', $map)
    }

    # the default table style. PowerPoint draws only its own built-in styles (a custom one in tableStyles.xml is listed but drawn
    # as a plain grid, tested 2026-11-24), so each look names the built-in one that reads right with its accent:
    # Light Style 2 - Accent 1 is an accent header row with background-coloured text (plum on bone, gold on plum-black);
    # light-gold uses Light Style 1 - Accent 1 (bold header, pale gold bands), because bone text on gold is unreadable.
    $ts = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + "`r`n" +
      '<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="' + $L.table + '"/>'
    Set-Part 'ppt/tableStyles.xml' $ts

    # embed the whole fonts, not only the characters already typed, so anyone can edit the deck in Funnel
    $px = Get-Part 'ppt/presentation.xml'
    $px = $px -replace ' saveSubsetFonts="1"', '' -replace ' embedTrueTypeFonts="1"', ''
    Set-Part 'ppt/presentation.xml' ($px -replace '<p:presentation ', '<p:presentation embedTrueTypeFonts="1" ')
  } finally { $zip.Dispose() }
}

# ---- the sample deck: every layout used once, the wording from the live site or about the template itself ----
function Get-Layout($p, [string]$name) { foreach ($x in $p.SlideMaster.CustomLayouts) { if ($x.Name -eq $name) { return $x } }; throw "no layout $name" }
function Fill($slide, [string]$name, $text) {
  foreach ($s in $slide.Shapes) {
    if ($s.Type -eq 14 -and ($s.Name -eq $name -or ($name -eq 'Title' -and $s.PlaceholderFormat.Type -in 1, 3))) {
      $s.TextFrame2.TextRange.Text = ($text -join "`r"); return $s
    }
  }
  throw "slide $($slide.SlideIndex) has no placeholder '$name'"
}
function Add-Sample($p, [string]$look) {
  $L = $LOOKS[$look]
  function New-Slide([string]$layout) { $p.Slides.AddSlide($p.Slides.Count + 1, (Get-Layout $p $layout)) }
  # PowerPoint names a slide's placeholders after the layout's ("Content", "Left column"...) only sometimes, so match by position order
  function Fill-Body($slide, [int]$i, $text) {
    $bodies = @($slide.Shapes | Where-Object { $_.Type -eq 14 -and $_.PlaceholderFormat.Type -eq 2 } | Sort-Object Left, Top)
    $bodies[$i].TextFrame2.TextRange.Text = ($text -join "`r"); $bodies[$i]
  }
  function Indent($shape, [int[]]$paras) { foreach ($k in $paras) { $shape.TextFrame2.TextRange.Paragraphs($k).ParagraphFormat.IndentLevel = 2 } }

  $s = New-Slide 'Title'; $null = Fill $s 'Title' 'Possibility? Engineered!'
  ($s.Shapes | Where-Object { $_.Type -eq 14 -and $_.PlaceholderFormat.Type -eq 4 }).TextFrame2.TextRange.Text = "Imkan.ai slide template, $($L.title.ToLower()) look"

  $s = New-Slide 'Agenda'; $null = Fill $s 'Title' 'Using this template'
  $null = Fill-Body $s 0 @('Pick a layout from Home, New slide', 'Type into the placeholders and keep their fonts and colours', 'Use Home, Reset if a slide drifts from its layout', 'Add the footer text and slide numbers from Insert, Header and footer')

  $s = New-Slide 'Section'; $null = Fill $s 'Title' 'Layouts'; $null = Fill-Body $s 0 '01'

  $s = New-Slide 'Title and content'; $null = Fill $s 'Title' 'Title and content'
  $b = Fill-Body $s 0 @('The everyday layout: one title and one message', 'Keep a slide to one idea; split it if it needs two', 'Second level points use a dash', 'Titles sit at the same place on every content slide')
  Indent $b 3

  $s = New-Slide 'Two columns'; $null = Fill $s 'Title' 'Two columns'
  $null = Fill-Body $s 0 @('Two related lists side by side', 'Each column takes its own bullets')
  $null = Fill-Body $s 1 @('Columns are the same width', 'Text shrinks to fit when a column overflows, but shorter is better')

  $s = New-Slide 'Comparison'; $null = Fill $s 'Title' 'Comparison'
  $bodies = @($s.Shapes | Where-Object { $_.Type -eq 14 -and $_.PlaceholderFormat.Type -eq 2 } | Sort-Object Left, Top)
  $bodies[0].TextFrame2.TextRange.Text = 'Before'; $bodies[1].TextFrame2.TextRange.Text = "Options, trade-offs or a before and after`rOne heading per column"
  $bodies[2].TextFrame2.TextRange.Text = 'After'; $bodies[3].TextFrame2.TextRange.Text = "The headings take the accent colour`rKeep both columns to a similar length"

  $s = New-Slide 'Statement'
  $null = Fill-Body $s 0 'Engineering Without Friction.'; $null = Fill-Body $s 1 'Imkan.ai'

  $s = New-Slide 'Big number'; $null = Fill $s 'Title' 'Proven Impact'
  $null = Fill-Body $s 0 '15+'; $null = Fill-Body $s 1 'production-grade AI and data solutions.'
  $null = Fill-Body $s 2 @('Delivering measurable results across banking, logistics, healthcare, and beyond.')

  $s = New-Slide 'Picture and text'; $null = Fill $s 'Title' 'Picture and text'
  $null = Fill-Body $s 0 @('Click the picture icon to add a photo; PowerPoint crops it to fill the right half', 'Here, an illustration from the website')
  $picPh = $s.Shapes | Where-Object { $_.Type -eq 14 -and $_.PlaceholderFormat.Type -eq 18 }
  $img = Join-Path $WORK "banking-fraud-detection-in-real-time-$($L.illus).svg"
  # the illustration is 3:2 and should not be cropped: it sits centred on a surface panel where the photo would go
  $picPh.Delete()
  $gr = $s.Shapes.AddShape(1, 480, 0, 480, 540); $gr.Line.Visible = $FALSE_; $gr.Fill.Solid(); $gr.Fill.ForeColor.ObjectThemeColor = $TC.bg2
  $gr.Name = 'Picture ground'; try { $gr.Decorative = $TRUE_ } catch { }
  $iw = 400; $ih = $iw * 320 / 480
  $null = Add-Svg $s $img (480 + (480 - $iw) / 2) ((540 - $ih) / 2) $iw $ih 'Line illustration of a real-time fraud detection pipeline'

  $s = New-Slide 'Title only'; $null = Fill $s 'Title' 'Tables take the brand style'
  $rows = @(@('Layout', 'Use it for'), @('Title', 'The first slide'), @('Section', 'Dividing a long deck into parts'), @('Title and content', 'Most slides'),
    @('Big number', 'One figure that carries the message'), @('Title only', 'Tables, charts and diagrams'), @('Closing', 'The last slide, with contact details'))
  $tb = $s.Shapes.AddTable($rows.Count, 2, $M, 128, $CW, 40 * $rows.Count)
  $tb.Table.ApplyStyle($L.table, $true)
  $tb.Table.Columns(1).Width = 300; $tb.Table.Columns(2).Width = $CW - 300
  for ($r = 1; $r -le $rows.Count; $r++) { for ($c = 1; $c -le 2; $c++) {
    $cell = $tb.Table.Cell($r, $c).Shape.TextFrame2; $cell.TextRange.Text = $rows[$r - 1][$c - 1]; $cell.TextRange.Font.Size = 16
    $cell.MarginLeft = 12; $cell.MarginRight = 12; $cell.VerticalAnchor = 3 } }
  $tb.Name = 'Layouts table'

  $s = New-Slide 'Title only'; $null = Fill $s 'Title' 'The colours in this look'
  $sw = @(@('Background', $L.lt1, $L.dk1), @('Text', $L.dk1, $L.lt1), @('Muted text', $L.dk2, $L.lt2), @('Surface', $L.lt2, $L.dk2), @('Accent 1', $L.acc[0], ''), @('Accent 2', $L.acc[1], ''))
  if ($L.dark) { $sw = @(@('Background', $L.dk1, ''), @('Text', $L.lt1, ''), @('Muted text', $L.lt2, ''), @('Surface', $L.dk2, ''), @('Accent 1', $L.acc[0], ''), @('Accent 2', $L.acc[1], '')) }
  $bw = ($CW - 5 * 16) / 6
  for ($i = 0; $i -lt 6; $i++) {
    $bx = $M + $i * ($bw + 16)
    $chip = $s.Shapes.AddShape(5, $bx, 140, $bw, 150); $chip.Adjustments.Item(1) = 0.08
    $chip.Fill.Solid(); $chip.Fill.ForeColor.RGB = BGR $sw[$i][1]; $chip.Line.Visible = $TRUE_; $chip.Line.Weight = 0.75
    $chip.Line.ForeColor.ObjectThemeColor = $TC.text2; $chip.Line.Transparency = 0.6; $chip.TextFrame2.TextRange.Text = ''
    $chip.Name = "Swatch $($sw[$i][0])"
    $lb = $s.Shapes.AddTextbox(1, $bx, 304, $bw, 60)
    Set-Frame $lb @{ font = '+mn-lt'; size = 14; color = 'text1'; anchor = 'top'; fit = 0; text = "$($sw[$i][0])`r#$($sw[$i][1])" }
    $lb.TextFrame2.TextRange.Paragraphs(2).Font.Fill.ForeColor.ObjectThemeColor = $TC.text2
    $lb.TextFrame2.TextRange.ParagraphFormat.SpaceAfter = 2
  }

  $s = New-Slide 'Closing'; $null = Fill $s 'Title' 'Get in Touch'
  $null = Fill-Body $s 0 @('Name, title', 'email | phone', 'imkan.ai')

  foreach ($sl in $p.Slides) {
    $hf = $sl.HeadersFooters; $hf.Footer.Visible = $TRUE_; $hf.Footer.Text = 'Imkan.ai'
    try { $hf.SlideNumber.Visible = $TRUE_ } catch { }
  }
}

# ---- run ----
$pp = New-Object -ComObject PowerPoint.Application
$wasOpen = $pp.Presentations.Count
try {
  foreach ($item in $Only) {
    $look = [string]$item
    if (-not $LOOKS.Contains($look)) { throw "unknown look $look" }
    Write-Host "== $look"
    $raw = Join-Path $env:TEMP "imkan-slides-$look-raw.pptx"
    $p = Build-Template $pp $look
    $p.SaveAs($raw, 24); $p.Close()
    Edit-Package $raw $look

    # template: one empty title slide, fonts embedded
    $p = $pp.Presentations.Open($raw, $FALSE_, $FALSE_, $FALSE_)
    $null = $p.Slides.AddSlide(1, (Get-Layout $p 'Title'))
    $potx = Join-Path $HERE "imkan-slides-$look.potx"
    $p.SaveAs($potx, 26, $TRUE_); $p.Close()

    # sample deck from the same file
    $p = $pp.Presentations.Open($raw, $FALSE_, $FALSE_, $FALSE_)
    Add-Sample $p $look
    $sample = Join-Path $HERE "imkan-slides-$look-sample.pptx"
    $p.SaveAs($sample, 24, $TRUE_)
    Get-ChildItem $PREVIEW -Filter "$look-*.png" | Remove-Item
    foreach ($sl in $p.Slides) { $sl.Export((Join-Path $PREVIEW ('{0}-{1:D2}.png' -f $look, $sl.SlideIndex)), 'PNG', 1920, 1080) }
    Write-Host ("   {0} layouts, {1} sample slides" -f $p.SlideMaster.CustomLayouts.Count, $p.Slides.Count)
    $p.Close()
    Remove-Item $raw
  }
} catch { Write-Host $_.ScriptStackTrace; throw } finally {
  if ($pp.Presentations.Count -eq 0 -and $wasOpen -eq 0) { $pp.Quit() }
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($pp)
}
