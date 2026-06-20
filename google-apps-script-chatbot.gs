const SPREADSHEET_ID = '1Q7_egqbZaSkvpUrBJbBSJswCC1Ey5DwpkDccll43xio';
const SHEET_NAME = 'Sheet1';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      ok: true,
      message: 'Champlain chatbot webhook is live'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.name || '',
      body.email || '',
      body.phone || '',
      body.message || '',
      body.transcript || '',
      body.pageUrl || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
