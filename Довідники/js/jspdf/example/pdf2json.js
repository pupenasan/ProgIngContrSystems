let fs = require('fs');
let PDFParser = require('pdf2json');
let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => { console.error(errData.parserError) });
pdfParser.on("pdfParser_dataReady", pdfData => {
  fs.writeFileSync("1.json", JSON.stringify(pdfData));

  let pages = pdfData.formImage.Pages;
  let wpage = pdfData.formImage.Width;// ширина сторінок в одиницях сторінки
  let hpage = []; //висота сторінок в одиницях сторінки page unit = (96px/inch * 1inch / 4) = *24px*
  let pages1 = [];
  for (let page of pages) {

  }

});

pdfParser.loadPDF("1.pdf");