' Part of build-docs.ps1: turns each content control tagged "imkan-prompt" into Word's grey prompt (placeholder text), using
' its title as the prompt, then clears its text so the prompt shows. PowerShell cannot make this call: it cannot pass
' "Nothing" for the method's first two arguments. usage: cscript //nologo fix-prompts.vbs <file.dotx>
Option Explicit
Dim w, d, story, cc, n, path
path = WScript.Arguments(0)
Set w = CreateObject("Word.Application")
w.Visible = False
w.DisplayAlerts = 0
Set d = w.Documents.Open(path, False, False, False)
n = 0
For Each story In d.StoryRanges
  Do While Not story Is Nothing
    For Each cc In story.ContentControls
      If cc.Tag = "imkan-prompt" Then
        cc.SetPlaceholderText Nothing, Nothing, cc.Title
        cc.Range.Text = ""
        n = n + 1
      End If
    Next
    Set story = story.NextStoryRange
  Loop
Next
d.Save
d.Close 0
w.Quit 0
WScript.Echo "   prompts: " & n
