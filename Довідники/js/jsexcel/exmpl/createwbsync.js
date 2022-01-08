//https://www.npmjs.com/package/exceljs#access-worksheets
//https://coderoad.ru/55132760/%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D0%B0-excel-%D0%B8-%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%B2-%D0%BD%D0%B5%D0%B3%D0%BE-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-ExcelJS

const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
//const workbook = createAndFillWorkbook();
const worksheet = workbook.addWorksheet('My Sheet');

//https://www.npmjs.com/package/exceljs#columns
// Add column headers and define column keys and widths
// Note: these column structures are a workbook-building convenience only,
// apart from the column width, they will not be fully persisted.
worksheet.columns = [
  {header: 'Id', key: 'id', width: 10},
  {header: 'Name', key: 'name', width: 32}, 
  {header: 'D.O.B.', key: 'dob', width: 15, outlineLevel: 1}
];
// Access an individual columns by key, letter and 1-based column number
const idCol = worksheet.getColumn('id');
const nameCol = worksheet.getColumn('B');
const dobCol = worksheet.getColumn(3);
console.log (idCol.number);//1
console.log (nameCol.number);//2
console.log (dobCol.number);//3

//https://www.npmjs.com/package/exceljs#add-rows
worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});

//https://www.npmjs.com/package/exceljs#rows

//Use the second parameter of the addWorksheet function to specify options for the worksheet.
//workbook.xlsx.writeFile('test.xlsx');