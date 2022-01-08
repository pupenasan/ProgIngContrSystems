const fs = require('fs');
const pdfjs = require("pdfjs-dist/legacy/build/pdf");

getItems('1.pdf');
//const doc = pdfjs.getDocument('1.pdf');
//const page = doc.getPage(1);


async function getContent(src) {
  const doc = await pdfjs.getDocument(src).promise // note the use of the property promise
  const page = await doc.getPage(1)
  return await page.getTextContent()
}

async function getItems(src) {
  // Perform checks
  const content = await getContent(src)
  /**
   * Expect content.items to have the following structure
   * [{
   *  str: '1',
   *  dir: 'ltr',
   *  width: 4.7715440000000005,
   *  height: 9.106,
   *  transform: [ 9.106, 0, 0, 9.106, 53.396, 663.101 ],
   *  fontName: 'g_d0_f2'
   * }, ...]
   */

  // you can do the following on content.items
  //console.log(content);
  fs.writeFileSync('1.json', JSON.stringify(content));
  return content.items.map((item) => item.str)
  // This is a new array of strings from the str property
  // Expected output: ['1', '06/02/2013', '$1,500.00', 'job 1, check 1', 'yes', 'deposit',...]
}