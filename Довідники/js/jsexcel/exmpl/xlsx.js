const xlsx = require('xlsx');
const wb = xlsx.readFile('test.xlsx');
const wss = wb.Sheets;
const ws = wss['My Sheet'];
console.log (ws['!images']);


xlsx.writeFile(wb, 'test1.xlsx');

//xlsx.utils.