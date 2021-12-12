const mdtools = require ('./mdtools.js');
var pdf2table = require('pdf2table');
var fs = require('fs');

fs.readFile('./1.pdf', function (err, buffer) {
  if (err) return console.log(err);

  pdf2table.parse(buffer, function (err, rows, rowsdebug) {
    if (err) return console.log(err);
    //console.log(rows);
    const newrows = [];
    let previdx = 0;
    for (row of rows) {
      let idx = parseInt(row[0]);  
      if (parseInt(row[0])>0 && row.length ) {
        if (idx === previdx) {
          for (let i=1; i< row.length ; i++ ){
            //console.log (row);
            if (newrows [idx-1][i] != row [i]) {
              ;//newrows [idx-1][i] += row [i];
            } 
          }
        } else {
          newrows [idx-1] = [];
          for (let i=0; i< row.length ; i++ ){
            newrows [idx-1][i] = row [i];
          }          
        }
        previdx = idx;
      }

    }
    const tab = {header: ['HEADER'], rows: newrows };
    //const mdtable = mdtools.createmdtable (tab); 
    //fs.writeFileSync('1.md', mdtable);
    fs.writeFileSync('1.json', JSON.stringify(rows))
    fs.writeFileSync('2.json', JSON.stringify(newrows))

  });
});