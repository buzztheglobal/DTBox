// // File: backend/utils/googleSheetsExporter.js
// const { google } = require('googleapis');
// // const keys = require('../google-credentials.json'); // Download from Google Cloud Console

// const auth = new google.auth.JWT(
//   keys.client_email,
//   null,
//   keys.private_key,
//   ['https://www.googleapis.com/auth/spreadsheets']
// );

// async function exportPollToSheet(pollId, rows) {
//   const sheets = google.sheets({ version: 'v4', auth });
//   const sheetTitle = `Poll_${pollId}`;
//   const values = [['Option', 'Timestamp'], ...rows.map(r => [r.selected_option, r.submitted_at])];

//   const spreadsheet = await sheets.spreadsheets.create({
//     resource: {
//       properties: { title: sheetTitle },
//       sheets: [{ properties: { title: 'Responses' } }]
//     }
//   });

//   const spreadsheetId = spreadsheet.data.spreadsheetId;

//   await sheets.spreadsheets.values.update({
//     spreadsheetId,
//     range: 'Responses!A1',
//     valueInputOption: 'RAW',
//     resource: { values }
//   });

//   return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
// }

// // Dummy implementation for now
// module.exports = async function exportPollToSheet(pollId, rows) {
//   console.log(`📝 Exporting poll ${pollId} to Google Sheet...`);
//   return `https://sheets.google.com/fake-url-for-poll-${pollId}`;
// };
