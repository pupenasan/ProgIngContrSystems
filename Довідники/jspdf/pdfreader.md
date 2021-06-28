# pdfreader

https://github.com/adrienjoly/npm-pdfreader

## Installation, tests and CLI usage (make sure node v8 or v10)

```bash
npm install pdfreader
cd node_modules/pdfreader
npm test
node parse.js test/sample.pdf
```

## Читання сирого PDF

Цей модуль надає клас `PdfReader`, який слід створити.

Ваш екземпляр має два методи аналізу PDF. Вони повертають однакові результати і відрізняються лише вхідними даними: `PdfReader.parseFileItems` (як показано нижче) для імені файлу та ` PdfReader.parseBuffer` (див .: "Читання необробленого PDF-файлу з PDF-файлу, що вже є в пам'яті (буфер)") з даних що ви не хочете посилатися з файлової системи.

Який би метод ви не вибрали, він запитує функцію зворотного виклику, яка викликається кожного разу, коли екземпляр знаходить те, що він позначає як елемент PDF.

Об'єкт елемента може збігатися з одним із таких об'єктів:

- `null`, коли парсинг закінчений, або сталася помилка.
- Метадані файлу `{file:{path:string}}`,  коли файл PDF відкривається, і завжди є першим елементом.
- Метадані сторінки, `{page:integer, width:float, height:float}`, коли аналізується нова сторінка, вказується номер сторінки, починаючи з 1. Це в основному діє як повернення каретки для координат текстових елементів підлягати обробці.
- Елементи тексту, `{text: string, x: float, y: float, w: float, ...}`, які ви можете уявити як прості об'єкти із властивістю text та плаваючі 2D координати AABB на сторінці.

Ваша функція зворотного виклику повинна обробити ці елементи у вибрану вами структуру даних, а також обробляти будь-які помилки.

Наприклад:

```js
new PdfReader().parseFileItems("sample.pdf", function (err, item) {
  if (err) callback(err);
  else if (!item) callback();
  else if (item.text) console.log(item.text);
});
```

### Читання сирого PDF з PDF що є в пам'яті (буфер)

Як і вище, але читання з буфера в пам'яті, а не з файлу, на який посилається шлях. Наприклад:

```js
var fs = require("fs");
fs.readFile("sample.pdf", (err, pdfBuffer) => {
  // pdfBuffer contains the file content
  new PdfReader().parseBuffer(pdfBuffer, function (err, item) {
    if (err) callback(err);
    else if (!item) callback();
    else if (item.text) console.log(item.text);
  });
});
```

### Приклад: читання з буферу з online PDF

```js
const https = require("https");
const pdfreader = require("pdfreader");

async function bufferize(url) {
  var hn = url.substring(url.search("//") + 2);
  hn = hn.substring(0, hn.search("/"));
  var pt = url.substring(url.search("//") + 2);
  pt = pt.substring(pt.search("/"));
  const options = { hostname: hn, port: 443, path: pt, method: "GET" };
  return new Promise(function (resolve, reject) {
    var buff = new Buffer.alloc(0);
    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        buff = Buffer.concat([buff, d]);
      });
      res.on("end", () => {
        resolve(buff);
      });
    });
    req.on("error", (e) => {
      console.error("https request error: " + e);
    });
    req.end();
  });
}

/*
if second param is set then a space ' ' inserted whenever text
chunks are separated by more than xwidth
this helps in situations where words appear separated but
this is because of x coords (there are no spaces between words)

each page is a different array element
*/
async function readlines(buffer, xwidth) {
  return new Promise((resolve, reject) => {
    var pdftxt = new Array();
    var pg = 0;
    new pdfreader.PdfReader().parseBuffer(buffer, function (err, item) {
      if (err) console.log("pdf reader error: " + err);
      else if (!item) {
        pdftxt.forEach(function (a, idx) {
          pdftxt[idx].forEach(function (v, i) {
            pdftxt[idx][i].splice(1, 2);
          });
        });
        resolve(pdftxt);
      } else if (item && item.page) {
        pg = item.page - 1;
        pdftxt[pg] = [];
      } else if (item.text) {
        var t = 0;
        var sp = "";
        pdftxt[pg].forEach(function (val, idx) {
          if (val[1] == item.y) {
            if (xwidth && item.x - val[2] > xwidth) {
              sp += " ";
            } else {
              sp = "";
            }
            pdftxt[pg][idx][0] += sp + item.text;
            t = 1;
          }
        });
        if (t == 0) {
          pdftxt[pg].push([item.text, item.y, item.x]);
        }
      }
    });
  });
}

(async () => {
  var url =
    "https://www.w3.org/TR/2011/NOTE-WCAG20-TECHS-20111213/working-examples/PDF2/bookmarks.pdf";
  var buffer = await bufferize(url);
  var lines = await readlines(buffer);
  lines = await JSON.parse(JSON.stringify(lines));
  console.log(lines);
})();
```

### Приклад: парсинг рядків тексту з файлу PDF

[![example cv resume parse convert pdf to text](https://github.com/adrienjoly/npm-pdfreader-example/raw/master/parseRows.png)](https://github.com/adrienjoly/npm-pdfreader-example/raw/master/parseRows.png)

Ось код, необхідний для перетворення цього PDF-файлу в текст:

```js
var pdfreader = require("pdfreader");

var rows = {}; // indexed by y-position

function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) => console.log((rows[y] || []).join("")));
}

new pdfreader.PdfReader().parseFileItems(
  "CV_ErhanYasar.pdf",
  function (err, item) {
    if (!item || item.page) {
      // end of file, or page
      printRows();
      console.log("PAGE:", item.page);
      rows = {}; // clear rows for next page
    } else if (item.text) {
      // accumulate text items into rows object, per line
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
  }
);
```

Форк цього прикладу тут: [parsing a CV/résumé](https://github.com/adrienjoly/npm-pdfreader-example).

### Приклад: парсинг таблиці файлу PDF

[![example cv resume parse convert pdf table to text](https://github.com/adrienjoly/npm-pdfreader-example/raw/master/parseTable.png)](https://github.com/adrienjoly/npm-pdfreader-example/raw/master/parseTable.png)

Ось код, необхідний для перетворення цього PDF-файлу в текстову таблицю:

```js
var pdfreader = require("pdfreader");

const nbCols = 2;
const cellPadding = 40; // each cell is padded to fit 40 characters
const columnQuantitizer = (item) => parseFloat(item.x) >= 20;

const padColumns = (array, nb) =>
  Array.apply(null, { length: nb }).map((val, i) => array[i] || []);
// .. because map() skips undefined elements

const mergeCells = (cells) =>
  (cells || [])
    .map((cell) => cell.text)
    .join("") // merge cells
    .substr(0, cellPadding)
    .padEnd(cellPadding, " "); // padding

const renderMatrix = (matrix) =>
  (matrix || [])
    .map((row, y) => padColumns(row, nbCols).map(mergeCells).join(" | "))
    .join("\n");

var table = new pdfreader.TableParser();

new pdfreader.PdfReader().parseFileItems(filename, function (err, item) {
  if (!item || item.page) {
    // end of file, or page
    console.log(renderMatrix(table.getMatrix()));
    console.log("PAGE:", item.page);
    table = new pdfreader.TableParser(); // new/clear table for next page
  } else if (item.text) {
    // accumulate text items into rows object, per line
    table.processItem(item, columnQuantitizer(item));
  }
});
```

Форк цього прикладу тут [parsing a CV/résumé](https://github.com/adrienjoly/npm-pdfreader-example).

## Приклад: відкриття PDF file з паролем

```js
new PdfReader({ password: "YOUR_PASSWORD" }).parseFileItems(
  "sample-with-password.pdf",
  function (err, item) {
    if (err) callback(err);
    else if (!item) callback();
    else if (item.text) console.log(item.text);
  }
);
```

## Вилучення даних на основі правил 

Клас Rule може використовуватися для визначення та обробки правил вилучення даних під час синтаксичного аналізу документа PDF.

Екземпляри правил надають "акумулятори": методи, що визначають стратегію вилучення даних, яка застосовуватиметься для кожного правила.

Приклад:

```js
var processItem = Rule.makeItemProcessor([
  Rule.on(/^Hello \"(.*)\"$/)
    .extractRegexpValues()
    .then(displayValue),
  Rule.on(/^Value\:/)
    .parseNextItemValue()
    .then(displayValue),
  Rule.on(/^c1$/).parseTable(3).then(displayTable),
  Rule.on(/^Values\:/)
    .accumulateAfterHeading()
    .then(displayValue),
]);
new PdfReader().parseFileItems("sample.pdf", function (err, item) {
  processItem(item);
});
```

## Troubleshooting & FAQ

### Чи можна проаналізувати документ PDF із веб-програми? 

Рішення існують, але цей модуль не може запускатися безпосередньо веб-браузером. Якщо ви дійсно хочете використовувати цей модуль, вам доведеться інтегрувати його у свій сервер, щоб файли PDF можна було читати з вашого сервера.

### `Cannot read property 'userAgent' of undefined` error from an express-based node.js app

Дмитро дізнався, що, можливо, вам доведеться виконати ці інструкції перед включенням модуля `pdfreader`:

```js
global.navigator = {
  userAgent: "node",
};

window.navigator = {
  userAgent: "node",
};
```

Source: [express - TypeError: Cannot read property 'userAgent' of undefined error on node.js app run - Stack Overflow](https://stackoverflow.com/questions/49208414/typeerror-cannot-read-property-useragent-of-undefined-error-on-node-js-app-ru)