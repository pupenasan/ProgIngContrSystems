let fs = require('fs');
let getfrompdf = require (`./getfrompdf.js`);
let topng = require (`./topng.js`);

let resolution = 115;
let fsapdf = 'exmpl/fsa.pdf';
let fsajson = 'exmpl/fsa.json';

/*
getfrompdf(fsapdf, (err,pagesinfo)=> {
  console.log ('Розбираю схему...');
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
*/

let  pagesinfo = JSON.parse (fs.readFileSync(fsajson,'utf-8'));
let elmnames = [
'EBA10_GK001',
'EBA10_CG302',
'EBA10_CG301',
'EBA10_AA101'
]
//console.log (pagesinfo);
topng.getloop (fsapdf, pagesinfo, elmnames, 'exmpl/acttr/EBA10_AA101', resolution);
