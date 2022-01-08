
function createmdtable (tab = {header: ['HEADER'], rows : [['row']]}) {
  let mdtabheader = ' | ';
  let mdtabline = ' | ';
  let mdtabbody = '';
  let collen = [];
  //довжини стовпчиків
  for (i=0; i< tab.header.length; i++ ) {
    col = tab.header[i];
    collen [i] = col.length;
  }
  for (j=0; j< tab.rows.length; j++) {
    for (i=0; i< tab.rows[j].length; i++ ) {
      col = tab.rows[j][i]; 
      if (!collen [i]) collen [i] = col.length; 
      collen [i] = col.length > collen [i] ? col.length : collen [i] ;      
    }
  }

  for (i=0; i<collen.length; i++ ) {
    let col = tab.header[i] || ' ';
    mdtabheader += col.padEnd(collen [i]) + ' | ';
    mdtabline += '-'.repeat(collen [i]) + ' | ';
  }  
  for (j=0; j<tab.rows.length; j++) {
    let row = tab.rows[j];
    let mdrow = ' | ';
    for (i=0; i<collen.length; i++) {   
      col = row[i] || ' ';
      mdrow += col.padEnd(collen [i]) + ' | ';
    }
    mdtabbody += mdrow + '\n';
  }
  let mdtext = mdtabheader + '\n' + mdtabline + '\n' + mdtabbody; 

  return mdtext; 
}

module.exports = {
  createmdtable
};