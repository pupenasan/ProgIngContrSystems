let fs = require('fs');
let path = require('path');

const { exec, execSync } = require("child_process");
const fsafile = 'fsa3.json';// шлях до файлу з розпарсеними даними по схемі автоматизації 

function pdftopng(pdffile, pagenmb = 0, rezolution = 96, fn) {
  let pagelist = '';
  if (pagenmb !== 0) {
    pagelist = `-sPageList=${pagenmb}`;
  }
  let pngfile = path.dirname(pdffile) + '/' + path.basename (pdffile,'.pdf');
  let cmd = `gswin64c.exe -o ${pngfile}%d.png -r${rezolution} ${pagelist} -dPrinted=false -sDEVICE=png16m ${pdffile}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      fn(error);
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      fn(stderr);
      return
    }
    fn (null, stdout);
  });
}

function getfrompng(namesource, namedest, resx, resy, x, y, w, h) {
  let cmd = `magick -depth 8 -size ${resx}x${resy} -extract ${w}x${h}+${x}+${y} ${namesource}.png ${namedest}.png`;
  execSync (cmd);
  console.log(cmd);
}

function getloops(pdffile, pages, resolution=115) {
  const k = 115/96; //1.2 коефіцієнт збільшення роздільної здатності відносно класичного в PDF 96
  let pngfile = path.dirname(pdffile) + '/' + path.basename (pdffile,'.pdf');
  let elmspath = path.dirname(pdffile);
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    let resx = (page.info.w_px * k).toFixed(); //роздільна здатність з урахуванням збереження в png
    let resy = (page.info.h_px * k).toFixed();
    let k1 = k * (page.info.w_px / page.info.w_p); //пікселів на одиницю

    let dx = 2, dy = 1;
    for (loopname in page.loops.funct) {
      let xmin = page.info.w_p, xmax = 0, ymin = page.info.h_p, ymax = 0;
      for (elm of page.loops.funct[loopname]) {
        xmin = elm.x < xmin ? elm.x : xmin;
        ymin = elm.y < ymin ? elm.y : ymin;
        xmax = elm.x > xmax ? elm.x : xmax;
        ymax = elm.y > ymax ? elm.y : ymax;
      }
      x1 = ((xmin - dx) * k1).toFixed();
      x2 = ((xmax + dx * 2) * k1).toFixed();
      y1 = ((ymin - dy) * k1).toFixed();
      y2 = ((ymax + dy * 2) * k1).toFixed();
      if (!fs.existsSync(`${elmspath}/elms`)) {
        fs.mkdirSync(`${elmspath}/elms`)
      }
      getfrompng(`${pngfile + +(i + 1)}`, `${elmspath}/elms/${loopname}`, resx, resy, x1, y1, x2 - x1, y2 - y1);
    }
  }
}

//pdftopng('fsa', 'fsa', 0, 96 * k)
//getloops();

module.exports = {
  pdftopng , getloops
}