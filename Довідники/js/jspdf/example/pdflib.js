const { PDFDocument,
  StandardFonts,
  NonFullScreenPageMode,
  ReadingDirection,
  PrintScaling,
  Duplex,
  PDFName } = require('pdf-lib');
const fs = require('fs');
//pdfview();
parsepdf();
//createpdf();
//getembedpages();
async function getembedpages() {
  const existingPdfBytes = fs.readFileSync('1.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

}

async function pdfview() {
  const existingPdfBytes = fs.readFileSync('1.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Set all available viewer preferences on the PDFDocument:
  const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences()
  viewerPrefs.setHideToolbar(true)
  viewerPrefs.setHideMenubar(true)
  viewerPrefs.setHideWindowUI(true)
  viewerPrefs.setFitWindow(true)
  viewerPrefs.setCenterWindow(true)
  viewerPrefs.setDisplayDocTitle(true)

  viewerPrefs.setReadingDirection(ReadingDirection.L2R)
  viewerPrefs.setPrintScaling(PrintScaling.None)
  viewerPrefs.setDuplex(Duplex.DuplexFlipLongEdge)
  viewerPrefs.setPickTrayByPDFSize(true)

  // We can set the default print range to only the first page
  viewerPrefs.setPrintPageRange({ start: 1, end: 1 })

  // Or we can supply noncontiguous ranges (e.g. pages 1, 3, and 5-7)
  viewerPrefs.setPrintPageRange([
    { start: 0, end: 0 },
    { start: 2, end: 2 },
    { start: 4, end: 6 },
  ])

  viewerPrefs.setNumCopies(2)

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync('1.pdf', pdfBytes);
}

async function parsepdf() {
  const existingPdfBytes = fs.readFileSync('1.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const fistpage = pages[0];
  const pagesize = fistpage.getSize();
  const pagemedia = fistpage.getMediaBox();
  console.log(pagesize);
  console.log(pagemedia);
}

async function createpdf() {
  // Create a new PDFDocument https://pdf-lib.js.org/docs/api/classes/pdfdocument#static-create
  const pdfDoc = await PDFDocument.create();
  // Embed the Times Roman font 
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  // Add a blank page to the document
  const page = await pdfDoc.addPage();
  // Get the width and height of the page
  const { width, height } = await page.getSize();
  // Draw a string of text toward the top of the page
  const fontSize = 30;
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('2.pdf', pdfBytes);
}