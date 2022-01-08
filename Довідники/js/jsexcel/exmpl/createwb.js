//https://www.npmjs.com/package/exceljs#access-worksheets
//https://coderoad.ru/55132760/%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D0%B0%D0%B9%D0%BB%D0%B0-excel-%D0%B8-%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C-%D0%B2-%D0%BD%D0%B5%D0%B3%D0%BE-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-ExcelJS

const Excel = require('exceljs');
async function exTest(){
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  worksheet.columns = [
    {header: 'Id', key: 'id', width: 10},
    {header: 'Name', key: 'name', width: 32}, 
    {header: 'D.O.B.', key: 'dob', width: 15,}
  ];

  worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
  worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});

  // save under export.xlsx
  await workbook.xlsx.writeFile('export.xlsx');

  // load a copy of export.xlsx
  const newWorkbook = new Excel.Workbook();
  await newWorkbook.xlsx.readFile('export.xlsx');

  const newworksheet = newWorkbook.getWorksheet('My Sheet');
  newworksheet.addRow(
    {id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)}
  );

  await newWorkbook.xlsx.writeFile('export2.xlsx');

  console.log("File is written");
  };

exTest();
