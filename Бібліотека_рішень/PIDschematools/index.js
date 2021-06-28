let fs = require('fs');
let getfrompdf = require (`./getfrompdf.js`);
let fsapdf = 'exmpl/fsa.pdf';
let fsajson = 'exmpl/fsa.json';

getfrompdf(fsapdf, (err,pagesinfo)=> {
  if (err) {
    console.log (err)
  } else {
    fs.writeFileSync(fsajson, JSON.stringify(pagesinfo));
    //console.log (pagesinfo)
  }
})