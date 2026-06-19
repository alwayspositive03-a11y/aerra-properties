function doPost(e){
var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
sheet.appendRow([
new Date(),
e.parameter.name,
e.parameter.phone,
e.parameter.email,
e.parameter.project,
e.parameter.message
]);
return ContentService.createTextOutput('Success');
}