let fs = require('fs');
let PDFParser = require('pdf2json');
let pdfParser = new PDFParser();
let callback; 

pdfParser.on("pdfParser_dataError", errData => { 
  //console.error(errData.parserError)
  callback (errData.parserError); 
});
//якщо відпарсилось добре - вибрати усі тексти з певною фільтрацією
pdfParser.on("pdfParser_dataReady", pdfData => {
  let pages = pdfData.formImage.Pages; //сторінки PDF
  let wpage = pdfData.formImage.Width;// ширина сторінок в одиницях сторінки
  let hpage = []; //висота сторінок в одиницях сторінки  1 inch = 4.5 page unit
  let pagesinfo1 = []; //елементи по сторінкам
  for (let page of pages) { //перебираємо сторінки pdf
    let pgfields = { xy: {} };
    let texts = page.Texts;
    hpage.push(page.Height)
    for (let text1 of texts) { //перебираємо усі тексти
      let name = text1.R[0].T; // текст елемента  
      name = name.replace(/\W/ig, '');//убрати кирилицю і недруковані символи
      name = name.replace(/^\d\d/ig, '');//убрати перші дві цифри
      if (name && name.length > 4 && name.length <= 10) { //цікавлять тільки записи від 5 до 10 сивмолів
        //створюємо обєкти-координати 
        let x = Math.trunc(text1.x); y = Math.trunc(text1.y); //видялємо дробову частину
        if (!pgfields.xy[x + '_' + y]) { //якщо обєкта ще немає - створюємо
          pgfields.xy[x + '_' + y] = {};
        }
        pgfields.xy[x + '_' + y][name] = text1; //добавляємо новий елемент масиву
        //створюємо обєкти-тексти 
        if (!pgfields[name]) {
          pgfields[name] = []
        }
        pgfields[name].push(text1);
      }
    }
    pagesinfo1.push(pgfields);//добавляємо інформацію про сторінку 
  }

  //упорядкування між функцією і одиниці обладнання а також по кординатам
  let pagesinfo2 = [];
  for (let page of pagesinfo1) {
    let page2 = { funct: {}, equipunit: {} }
    for (let name in page) {
      if (/^\D\D\D\d\d/.test(name)) { //функція - три літери і дві цифри
        page2.funct[name] = page[name];
      } else if (/^\D\D\d\d\d/.test(name)) { //одиниця обладнання - дві літери і три цифри
        page2.equipunit[name] = page[name];
      }
    }
    pagesinfo2.push(page2);
  }

  //пошук споріднених 
  //коли в одному рядку HBK10 CP005 : HBK10 x=55.245 y=50.905 ; CP005 x=56.643 y=50.905 -> dx=1.398 dy=0
  //коли в різних рядках ETM10 AA106 : ETM10 x=23.475 y= 60.826; AA106 x=23.22 y=61.358 -> dx=0.255 dy=0.532
  let pagesinfo3 = []; //набір комлектних назв засобів
  for (let i = 0; i < pagesinfo2.length; i++) {
    let page3 = {};
    let page = pagesinfo2[i];
    for (let name in page.funct) { // перебір по функціям
      for (let funct of page.funct[name]) { // 
        let xr = funct.x, yr = funct.y;
        let x = Math.trunc(xr), y = Math.trunc(yr);
        //умова попадання точки
        let target1 = x + '_' + y;
        let target2 = +(x + 1) + '_' + y;
        let target21 = +(x + 2) + '_' + y;
        let target23 = +(x - 1) + '_' + y;
        let target3 = x + '_' + +(y + 1);

        //пошук по всім таргетам
        if (pagesinfo1[i].xy[target1]) { //якщо зафіксована така кордината
          for (let elm in pagesinfo1[i].xy[target1]) {//перебір усіх лементів по кординаті 
            if (elm !== name) { //якщо елемент не є шуканим
              page3[name + '_' + elm] = { 
                x1: xr, 
                y1: yr, 
                x2: pagesinfo1[i].xy[target1][elm].x, 
                y2: pagesinfo1[i].xy[target1][elm].y }
            }
          }
        }
        if (pagesinfo1[i].xy[target2]) {
          for (let elm in pagesinfo1[i].xy[target2]) {
            if (elm !== name && Math.abs(xr - pagesinfo1[i].xy[target2][elm].x) < 2) { //близько по горизонталі
              page3[name + '_' + elm] = { x1: xr, y1: yr, x2: pagesinfo1[i].xy[target2][elm].x, y2: pagesinfo1[i].xy[target2][elm].y }
            }
          }
        }
        if (pagesinfo1[i].xy[target21]) {
          for (let elm in pagesinfo1[i].xy[target21]) {
            if (elm !== name && Math.abs(xr - pagesinfo1[i].xy[target21][elm].x) < 3) { //близько по горизонталі
              page3[name + '_' + elm] = { x1: xr, y1: yr, x2: pagesinfo1[i].xy[target21][elm].x, y2: pagesinfo1[i].xy[target21][elm].y }
            }
          }
        }
        if (pagesinfo1[i].xy[target23]) {
          for (let elm in pagesinfo1[i].xy[target23]) {
            if (elm !== name && Math.abs(xr - pagesinfo1[i].xy[target23][elm].x) < 3) { //близько по горизонталі
              page3[name + '_' + elm] = { x1: xr, y1: yr, x2: pagesinfo1[i].xy[target23][elm].x, y2: pagesinfo1[i].xy[target23][elm].y }
            }
          }
        }        
        if (pagesinfo1[i].xy[target3]) {
          for (let elm in pagesinfo1[i].xy[target3]) {
            if (elm !== name && (yr - pagesinfo1[i].xy[target3][elm].y) < 1) { //близько по вертикалі
              page3[name + '_' + elm] = { x1: xr, y1: yr, x2: pagesinfo1[i].xy[target3][elm].x, y2: pagesinfo1[i].xy[target3][elm].y }
            }
          }
        }
      }
    }
    let w_i = wpage / 4.5, h_i = hpage[i] / 4.5;
    page3.info = {
      w_p: wpage,
      h_p: hpage[i],
      w_i: w_i,
      h_i: h_i,
      w_mm: w_i * 25.4,
      h_mm: h_i * 25.4,
      w_px: w_i * 96,
      h_px: h_i * 96,
    }
    page3.loops = pagesinfo2[i];
    pagesinfo3.push(page3)
    // 
  }
  callback (null, pagesinfo3);
  //fs.writeFileSync("exmpl/fsa1.json", JSON.stringify(pagesinfo1));
  //fs.writeFileSync("exmpl/fsa3.json", JSON.stringify(pagesinfo3));
});

module.exports = function (fsafile, fn) {
  pdfParser.loadPDF(fsafile);
  callback = fn;
}
