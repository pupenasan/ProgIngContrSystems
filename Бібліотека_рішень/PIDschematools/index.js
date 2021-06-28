let fs = require('fs');
let getfrompdf = require (`./getfrompdf.js`);
let topng = require (`./topng.js`);

let resolution = 115;
let fsapdf = 'exmpl/fsa.pdf';
let fsajson = 'exmpl/fsa.json';

console.log ('Розбираю схему...');
getfrompdf(fsapdf, (err,pagesinfo)=> {
  if (err) {
    console.log (err);
    return
  } else {
    fs.writeFileSync(fsajson, JSON.stringify(pagesinfo));
    console.log ('Створюю файли png...');
    topng.pdftopng (fsapdf,0, resolution, (err, stdout) => {
      if (err) {
        console.log (err);
        return;  
      } else {
        console.log (stdout);
        console.log ('Вибираю функції...');
        topng.getloops (fsapdf, pagesinfo, resolution);          
      }
    });
  }
})
