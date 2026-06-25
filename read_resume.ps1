$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0 # wdAlertsNone
$pdfPath = "C:\Users\bb\OneDrive - KEPSA\mov\JAJA\PATRICK FOLDER\PATRICK KARANJA RESUME.pdf"
try {
    $doc = $word.Documents.Open($pdfPath, $false, $true)
    $text = $doc.Content.Text
    $text | Out-File -FilePath "c:\Users\bb\Documents\GitHub\PATRICK-KARANJA-PORTFOLIO\resume_text.txt" -Encoding utf8
    $doc.Close()
    Write-Host "Success! PDF text written to resume_text.txt"
} catch {
    Write-Host "Error converting: $_"
} finally {
    $word.Quit()
}
