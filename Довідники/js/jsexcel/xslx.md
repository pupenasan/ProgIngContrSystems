# [SheetJS js-xlsx](http://sheetjs.com)

https://github.com/SheetJS/sheetjs

## Parsing Workbooks

For parsing, the first step is to read the file.  This involves acquiring the data and feeding it into the library.  Here are a few common scenarios:

**nodejs read a file** 

`readFile` is only available in server environments. Browsers have no API for reading arbitrary files given a path, so another strategy must be used.

```js
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');
/* DO SOMETHING WITH workbook HERE */
```

### Streaming Read

**Why is there no Streaming Read API?** 

Найпоширеніші та найцікавіші формати (XLS, XLSX/M, XLSB, ODS) - це, зрештою, ZIP або CFB контейнери файлів. Жоден формат не розміщує структуру каталогів на початку файлу: ZIP-файли розміщують записи Центральної Директорії в кінці логічного файлу, тоді як CFB-файли можуть розміщувати інформацію про зберігання де завгодно у файлі! Як результат, щоб правильно обробляти ці формати, функція потокового передавання повинна буферизувати весь файл перед початком роботи. Це відповідає очікуванням потокового передавання, тому ми не надаємо жодного API для читання потокового передавання.

Маючи справу з Readable Streams, найпростіший підхід - це буферизувати потік і обробити все це в кінці. Це можна зробити за допомогою тимчасового файлу або шляхом явного об'єднання потоку:

**Explicitly concatenating streams**

```js
var fs = require('fs');
var XLSX = require('xlsx');
function process_RS(stream/*:ReadStream*/, cb/*:(wb:Workbook)=>void*/)/*:void*/{
  var buffers = [];
  stream.on('data', function(data) { buffers.push(data); });
  stream.on('end', function() {
    var buffer = Buffer.concat(buffers);
    var workbook = XLSX.read(buffer, {type:"buffer"});

    /* DO SOMETHING WITH workbook IN THE CALLBACK */
    cb(workbook);
  });
}
```

More robust solutions are available using modules like `concat-stream`.

**Writing to filesystem first**

This example uses [`tempfile`](https://npm.im/tempfile) to generate file names:

```js
var fs = require('fs'), tempfile = require('tempfile');
var XLSX = require('xlsx');
function process_RS(stream/*:ReadStream*/, cb/*:(wb:Workbook)=>void*/)/*:void*/{
  var fname = tempfile('.sheetjs');
  console.log(fname);
  var ostream = fs.createWriteStream(fname);
  stream.pipe(ostream);
  ostream.on('finish', function() {
    var workbook = XLSX.readFile(fname);
    fs.unlinkSync(fname);

    /* DO SOMETHING WITH workbook IN THE CALLBACK */
    cb(workbook);
  });
}
```

## Working with the Workbook

**Reading a specific cell** 

This example extracts the value stored in cell A1 from the first worksheet:

```js
var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

/* Get the value */
var desired_value = (desired_cell ? desired_cell.v : undefined);
```

**Adding a new worksheet to a workbook**

У цьому прикладі використовується [`XLSX.utils.aoa_to_sheet`](https://github.com/SheetJS/sheetjs#array-of-arrays-input)  для створення аркуша та ` XLSX.utils.book_append_sheet` для додавання аркуша до робочої книги:

```js
var ws_name = "SheetJS";

/* make worksheet */
var ws_data = [
  [ "S", "h", "e", "e", "t", "J", "S" ],
  [  1 ,  2 ,  3 ,  4 ,  5 ]
];
var ws = XLSX.utils.aoa_to_sheet(ws_data);

/* Add the worksheet to the workbook */
XLSX.utils.book_append_sheet(wb, ws, ws_name);
```

**Creating a new workbook from scratch**

Об'єкт книги містить масив імен `SheetNames` та об'єкт ` Sheets`, що відображає імена аркушів на об'єкти аркуша. Функція утиліти `XLSX.utils.book_new` створює новий об'єкт книги:

```js
/* create a new blank workbook */
var wb = XLSX.utils.book_new();
```

Нова книжка порожня і не містить аркушів. Функції запису помилятимуться, якщо книга порожня.

### Parsing and Writing Examples

The node version installs a command line tool `xlsx` which can read spreadsheet files and output the contents in various formats.  The source is available at `xlsx.njs` in the bin directory.

Some helper functions in `XLSX.utils` generate different views of the sheets:

- `XLSX.utils.sheet_to_csv` generates CSV
- `XLSX.utils.sheet_to_txt` generates UTF16 Formatted Text
- `XLSX.utils.sheet_to_html` generates HTML
- `XLSX.utils.sheet_to_json` generates an array of objects
- `XLSX.utils.sheet_to_formulae` generates a list of formulae

## Writing Workbooks

Для запису першим кроком є створення вихідних даних. Допоміжні функції `write` та ` writeFile` створюватимуть дані у різних форматах, придатних для розповсюдження. Другим кроком є фактичний обмін даними з кінцевою точкою. Припускаючи, що `workbook` є об'єктом workbook :

**nodejs write a file**

`XLSX.writeFile` uses `fs.writeFileSync` in server environments:

```js
if(typeof require !== 'undefined') XLSX = require('xlsx');
/* output format determined by filename */
XLSX.writeFile(workbook, 'out.xlsb');
/* at this point, out.xlsb is a file that you can distribute */
```

### Streaming Write

Функції потокового запису доступні в об'єкті `XLSX.stream`. Вони приймають ті самі аргументи, що і звичайні функції запису, але повертають Readable Stream. Вони доступні лише в NodeJS.

- `XLSX.stream.to_csv` is the streaming version of `XLSX.utils.sheet_to_csv`.
- `XLSX.stream.to_html` is the streaming version of `XLSX.utils.sheet_to_html`.
- `XLSX.stream.to_json` is the streaming version of `XLSX.utils.sheet_to_json`.

**nodejs convert to CSV and write file**

```js
var output_file_name = "out.csv";
var stream = XLSX.stream.to_csv(worksheet);
stream.pipe(fs.createWriteStream(output_file_name));
```

**nodejs write JSON stream to screen**

```js
/* to_json returns an object-mode stream */
var stream = XLSX.stream.to_json(worksheet, {raw:true});

/* the following stream converts JS objects to text via JSON.stringify */
var conv = new Transform({writableObjectMode:true});
conv._transform = function(obj, e, cb){ cb(null, JSON.stringify(obj) + "\n"); };

stream.pipe(conv); conv.pipe(process.stdout);
```

## Interface

`XLSX` - це відкрита змінна у браузері та експортована змінна вузла

### Parsing functions

`XLSX.read(data, read_opts)` спроба парсити `data`.

`XLSX.readFile(filename, read_opts)` спроба прочитати `filename` і парсити.

Parse options are described in the [Parsing Options](https://github.com/SheetJS/sheetjs#parsing-options) section.

### Writing functions

```
XLSX.write(wb, write_opts)` attempts to write the workbook `wb
```

`XLSX.writeFile(wb, filename, write_opts)` attempts to write `wb` to `filename`. In browser-based environments, it will attempt to force a client-side download.

`XLSX.writeFileAsync(filename, wb, o, cb)` attempts to write `wb` to `filename`. If `o` is omitted, the writer will use the third argument as the callback.

`XLSX.stream` contains a set of streaming write functions.

Write options are described in the [Writing Options](https://github.com/SheetJS/sheetjs#writing-options) section.

### Utilities

Utilities are available in the `XLSX.utils` object and are described in the [Utility Functions](https://github.com/SheetJS/sheetjs#utility-functions) section:

**Importing:**

- `aoa_to_sheet` converts an array of arrays of JS data to a worksheet.
- `json_to_sheet` converts an array of JS objects to a worksheet.
- `table_to_sheet` converts a DOM TABLE element to a worksheet.
- `sheet_add_aoa` adds an array of arrays of JS data to an existing worksheet.
- `sheet_add_json` adds an array of JS objects to an existing worksheet.

**Exporting:**

- `sheet_to_json` converts a worksheet object to an array of JSON objects.
- `sheet_to_csv` generates delimiter-separated-values output.
- `sheet_to_txt` generates UTF16 formatted text.
- `sheet_to_html` generates HTML output.
- `sheet_to_formulae` generates a list of the formulae (with value fallbacks).

**Cell and cell address manipulation:**

- `format_cell` generates the text value for a cell (using number formats).
- `encode_row / decode_row` converts between 0-indexed rows and 1-indexed rows.
- `encode_col / decode_col` converts between 0-indexed columns and column names.
- `encode_cell / decode_cell` converts cell addresses.
- `encode_range / decode_range` converts cell ranges.

## Common Spreadsheet Format

js-xlsx conforms to the Common Spreadsheet Format (CSF):

### Загальні структури

Об'єкти адреси комірки зберігаються як `{c: C, r: R}`, де `C` та ` R` - 0-індексовані номери стовпців та рядків, відповідно. Наприклад, адреса комірки `B5` представлена об'єктом ` {c: 1, r: 4} `.

Об'єкти діапазону комірок зберігаються як `{s: S, e: E}`, де `S` - перша комірка, а ` E` - остання комірка в діапазоні. Діапазони включені. Наприклад, діапазон `A3:B7` представлений об'єктом` {s: {c: 0, r: 2}, e: {c: 1, r: 6}} `. Службові функції виконують обхід ходу великих рядків діапазону аркуша (Utility functions perform a row-major order walk traversal of a sheet range:):

```js
for(var R = range.s.r; R <= range.e.r; ++R) {
  for(var C = range.s.c; C <= range.e.c; ++C) {
    var cell_address = {c:C, r:R};
    /* if an A1-style address is needed, encode the address */
    var cell_ref = XLSX.utils.encode_cell(cell_address);
  }
}
```

### Cell Object

Об'єкти комірки - це звичайні об'єкти JS з ключами та значеннями, що відповідають умовам:

| Key  | Description                                                  |
| ---- | ------------------------------------------------------------ |
| `v`  | raw value (see Data Types section for more info)             |
| `w`  | formatted text (if applicable)                               |
| `t`  | type: `b` Boolean, `e` Error, `n` Number, `d` Date, `s` Text, `z` Stub |
| `f`  | cell formula encoded as an A1-style string (if applicable)   |
| `F`  | range of enclosing array if formula is array formula (if applicable) |
| `r`  | rich text encoding (if applicable)                           |
| `h`  | HTML rendering of the rich text (if applicable)              |
| `c`  | comments associated with the cell                            |
| `z`  | number format string associated with the cell (if requested) |
| `l`  | cell hyperlink object (`.Target` holds link, `.Tooltip` is tooltip) |
| `s`  | the style/theme of the cell (if applicable)                  |

Вбудовані утиліти для експорту (наприклад, експортер CSV) використовуватимуть текст `w`, якщо він доступний. Щоб змінити значення, не забудьте видалити `cell.w` (або встановити для нього` undefined`) перед спробою експортувати. Утиліти регенерують текст `w` із формату числа (` cell.z`) та вихідного значення, якщо це можливо.

Фактична формула масиву зберігається в полі `f` першої комірки в діапазоні масиву. Інші комірки в діапазоні опускають поле `f`.

#### Data Types

Вихідне значення зберігається у властивості `v` значення, інтерпретоване на основі властивості типу ` t`. Це розділення дозволяє представляти числа, а також числовий текст. Є 6 дійсних типів комірок:

| Type | Description                                                  |
| ---- | ------------------------------------------------------------ |
| `b`  | Boolean: value interpreted as JS `boolean`                   |
| `e`  | Error: value is a numeric code and `w` property stores common name ** |
| `n`  | Number: value is a JS `number` **                            |
| `d`  | Date: value is a JS `Date` object or string to be parsed as Date ** |
| `s`  | Text: value interpreted as JS `string` and written as text ** |
| `z`  | Stub: blank stub cell that is ignored by data processing utilities ** |

Type `n` is the Number type. This includes all forms of data that Excel stores as numbers, such as dates/times and Boolean fields.  Excel exclusively uses data that can be fit in an IEEE754 floating point number, just like JS Number, so the `v` field holds the raw number.  The `w` field holds formatted text.  Dates are stored as numbers by default and converted with `XLSX.SSF.parse_date_code`.

Type `d` is the Date type, generated only when the option `cellDates` is passed. Since JSON does not have a natural Date type, parsers are generally expected to store ISO 8601 Date strings like you would get from `date.toISOString()`.  On the other hand, writers and exporters should be able to handle date strings and JS Date objects.  Note that Excel disregards timezone modifiers and treats all dates in the local timezone.  The library does not correct for this error.

Type `s` is the String type.  Values are explicitly stored as text.  Excel will interpret these cells as "number stored as text".  Generated Excel files automatically suppress that class of error, but other formats may elicit errors.

Type `z` represents blank stub cells.  They are generated in cases where cells have no assigned value but hold comments or other metadata. They are ignored by the core library data processing utility functions.  By default these cells are not generated; the parser `sheetStubs` option must be set to `true`.

### Sheet Objects

Кожний ключ, який не починається з  `!` відображається на комірку (використовується `A-1` нотація)

`sheet[address]` повертає об'єкт комірки за вказаною адресою.

**Спеціальні ключі для аркуша (доступно як `sheet[key]`, кожен починається з `!`):**

- `sheet['!ref']`:  Діапазон на основі A-1, що представляє діапазон аркушів. Функції, які працюють з аркушами, повинні використовувати цей параметр для визначення діапазону. Клітини, призначені поза діапазоном, не обробляються. Зокрема, при написанні аркуша від руки комірки поза діапазоном не включаються

  Функції, що обробляють аркуші, повинні перевірити наявність поля `!Ref`. Якщо `!Ref` опущено або не є дійсним діапазоном, функції можуть вважати аркуш порожнім або намагатися вгадати діапазон. Стандартні утиліти, що постачаються з цією бібліотекою, розглядають аркуші як порожні (наприклад, вихід CSV є порожнім рядком).

  При читанні робочого аркуша із встановленою властивістю `sheetRows` параметр ref використовуватиме обмежений діапазон. Початковий діапазон встановлений на `ws['!Fullref']`

- `sheet['!margins']`:  Об'єкт, що представляє поля сторінки. Значення за замовчуванням відповідають "звичайному" стилю Excel. Excel також має попередньо встановлений "широкий" та "вузький", але вони зберігаються як вихідні вимірювання. Основні властивості перелічені нижче:

**Page margin details** 

| key      | description            | "normal" | "wide" | "narrow" |
| -------- | ---------------------- | -------- | ------ | -------- |
| `left`   | left margin (inches)   | `0.7`    | `1.0`  | `0.25`   |
| `right`  | right margin (inches)  | `0.7`    | `1.0`  | `0.25`   |
| `top`    | top margin (inches)    | `0.75`   | `1.0`  | `0.75`   |
| `bottom` | bottom margin (inches) | `0.75`   | `1.0`  | `0.75`   |
| `header` | header margin (inches) | `0.3`    | `0.5`  | `0.3`    |
| `footer` | footer margin (inches) | `0.3`    | `0.5`  | `0.3`    |

#### Worksheet Object

Окрім ключів базового sheet, worksheets також додають:

- `ws['!cols']`: масив об'єктів властивостей стовпців. Ширина стовпців фактично зберігається у файлах унормованим чином, вимірюється як "Максимальна ширина цифр" (найбільша ширина відтворених цифр 0-9 у пікселях). При синтаксичному аналізі об'єкти стовпців зберігають ширину пікселів у полі `wpx`, ширину символів у полі` wch` та максимальну ширину цифр у полі `MDW`.
- `ws['!rows']`: масив об'єктів властивостей рядків, як це пояснюється далі в документах. Кожен об’єкт рядка кодує властивості, включаючи висоту та видимість рядка.
- `ws['!merges']`: масив об'єктів діапазону, що відповідають об'єднаним коміркам на аркуші. Формати звичайного тексту не підтримують клітинки об’єднання. Експорт CSV запише всі комірки в діапазоні злиття, якщо вони існують, тому переконайтеся, що встановлено лише першу комірку (верхній лівий) у діапазоні.
- `ws['!outline']`: налаштувати поведінку контурів. Параметри за замовчуванням за замовчуванням у Excel 2019:

| key     | Excel feature                                 | default |
| ------- | --------------------------------------------- | ------- |
| `above` | Uncheck "Summary rows below detail"           | `false` |
| `left`  | Uncheck "Summary rows to the right of detail" | `false` |

- `ws['!protect']`: object of write sheet protection properties.  The `password` key specifies the password for formats that support password-protected sheets (XLSX/XLSB/XLS).  The writer uses the XOR obfuscation method.  The following keys control the sheet protection -- set to `false` to enable a feature when sheet is locked or set to `true` to disable a feature:

**Worksheet Protection Details** 

| key                   | feature (true=disabled / false=enabled) | default  |
| --------------------- | --------------------------------------- | -------- |
| `selectLockedCells`   | Select locked cells                     | enabled  |
| `selectUnlockedCells` | Select unlocked cells                   | enabled  |
| `formatCells`         | Format cells                            | disabled |
| `formatColumns`       | Format columns                          | disabled |
| `formatRows`          | Format rows                             | disabled |
| `insertColumns`       | Insert columns                          | disabled |
| `insertRows`          | Insert rows                             | disabled |
| `insertHyperlinks`    | Insert hyperlinks                       | disabled |
| `deleteColumns`       | Delete columns                          | disabled |
| `deleteRows`          | Delete rows                             | disabled |
| `sort`                | Sort                                    | disabled |
| `autoFilter`          | Filter                                  | disabled |
| `pivotTables`         | Use PivotTable reports                  | disabled |
| `objects`             | Edit objects                            | enabled  |
| `scenarios`           | Edit scenarios                          | enabled  |

- `ws['!autofilter']`: AutoFilter object following the schema:

```
type AutoFilter = {
  ref:string; // A-1 based range representing the AutoFilter table range
}
```

### Workbook Object

`workbook.SheetNames` is an ordered list of the sheets in the workbook

`wb.Sheets[sheetname]` returns an object representing the worksheet.

`wb.Props` is an object storing the standard properties.  `wb.Custprops` stores custom properties.  Since the XLS standard properties deviate from the XLSX standard, XLS parsing stores core properties in both places.

`wb.Workbook` stores [workbook-level attributes](https://github.com/SheetJS/sheetjs#workbook-level-attributes).

#### Workbook File Properties

The various file formats use different internal names for file properties.  The workbook `Props` object normalizes the names:

**File Properties**

For example, to set the workbook title property:

```js
if(!wb.Props) wb.Props = {};
wb.Props.Title = "Insert Title Here";
```

Custom properties are added in the workbook `Custprops` object:

```js
if(!wb.Custprops) wb.Custprops = {};
wb.Custprops["Custom Property"] = "Custom Value";
```

Writers will process the `Props` key of the options object:

```js
/* force the Author to be "SheetJS" */
XLSX.write(wb, {Props:{Author:"SheetJS"}});
```

### Workbook-Level Attributes

`wb.Workbook` stores workbook-level attributes.

#### Defined Names

`wb.Workbook.Names` is an array of defined name objects which have the keys:

**Defined Name Properties**

| Key       | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `Sheet`   | Name scope.  Sheet Index (0 = first sheet) or `null` (Workbook) |
| `Name`    | Case-sensitive name.  Standard rules apply **                |
| `Ref`     | A1-style Reference (`"Sheet1!$A$1:$D$20"`)                   |
| `Comment` | Comment (only applicable for XLS/XLSX/XLSB)                  |

Excel allows two sheet-scoped defined names to share the same name.  However, a sheet-scoped name cannot collide with a workbook-scope name.  Workbook writers may not enforce this constraint.

#### Workbook Views

`wb.Workbook.Views` is an array of workbook view objects which have the keys:

| Key   | Description                    |
| ----- | ------------------------------ |
| `RTL` | If true, display right-to-left |

#### Miscellaneous Workbook Properties

`wb.Workbook.WBProps` holds other workbook properties:

| Key             | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `CodeName`      | [VBA Project Workbook Code Name](https://github.com/SheetJS/sheetjs#vba-and-macros) |
| `date1904`      | epoch: 0/false for 1900 system, 1/true for 1904              |
| `filterPrivacy` | Warn or strip personally identifying info on save            |

### Document Features

Even for basic features like date storage, the official Excel formats store the same content in different ways.  The parsers are expected to convert from the underlying file format representation to the Common Spreadsheet Format.  Writers are expected to convert from CSF back to the underlying file format.

#### Formulae

The A1-style formula string is stored in the `f` field.  Even though different file formats store the formulae in different ways, the formats are translated. Even though some formats store formulae with a leading equal sign, CSF formulae do not start with `=`.

**Representation of A1=1, A2=2, A3=A1+A2**

```js
{
  "!ref": "A1:A3",
  A1: { t:'n', v:1 },
  A2: { t:'n', v:2 },
  A3: { t:'n', v:3, f:'A1+A2' }
}
```

Shared formulae are decompressed and each cell has the formula corresponding to its cell.  Writers generally do not attempt to generate shared formulae.

Cells with formula entries but no value will be serialized in a way that Excel and other spreadsheet tools will recognize.  This library will not automatically compute formula results!  For example, to compute `BESSELJ` in a worksheet:

**Formula without known value** 

```js
{
  "!ref": "A1:A3",
  A1: { t:'n', v:3.14159 },
  A2: { t:'n', v:2 },
  A3: { t:'n', f:'BESSELJ(A1,A2)' }
}
```

**Array Formulae**

Array formulae are stored in the top-left cell of the array block.  All cells of an array formula have a `F` field corresponding to the range.  A single-cell formula can be distinguished from a plain formula by the presence of `F` field.

**Array Formula examples** 

Utilities and writers are expected to check for the presence of a `F` field and ignore any possible formula element `f` in cells other than the starting cell. They are not expected to perform validation of the formulae!

#### Column Properties

The `!cols` array in each worksheet, if present, is a collection of `ColInfo` objects which have the following properties:

```js
type ColInfo = {
  /* visibility */
  hidden?: boolean; // if true, the column is hidden

  /* column width is specified in one of the following ways: */
  wpx?:    number;  // width in screen pixels
  width?:  number;  // width in Excel's "Max Digit Width", width*256 is integral
  wch?:    number;  // width in characters

  /* other fields for preserving features from files */
  MDW?:    number;  // Excel's "Max Digit Width" unit, always integral
};
```

#### Row Properties

The `!rows` array in each worksheet, if present, is a collection of `RowInfo` objects which have the following properties:

```js
type RowInfo = {
  /* visibility */
  hidden?: boolean; // if true, the row is hidden

  /* row height is specified in one of the following ways: */
  hpx?:    number;  // height in screen pixels
  hpt?:    number;  // height in points

  level?:  number;  // 0-indexed outline / group level
};
```

Note: Excel UI displays the base outline level as `1` and the max level as `8`. The `level` field stores the base outline as `0` and the max level as `7`.

#### Number Formats

The `cell.w` formatted text for each cell is produced from `cell.v` and `cell.z` format.  If the format is not specified, the Excel `General` format is used. The format can either be specified as a string or as an index into the format table.  Parsers are expected to populate `workbook.SSF` with the number format table.  Writers are expected to serialize the table.

Custom tools should ensure that the local table has each used format string somewhere in the table.  Excel convention mandates that the custom formats start at index 164.  The following example creates a custom format from scratch:

**New worksheet with custom format**

```js
var wb = {
  SheetNames: ["Sheet1"],
  Sheets: {
    Sheet1: {
      "!ref":"A1:C1",
      A1: { t:"n", v:10000 },                    // <-- General format
      B1: { t:"n", v:10000, z: "0%" },           // <-- Builtin format
      C1: { t:"n", v:10000, z: "\"T\"\ #0.00" }  // <-- Custom format
    }
  }
}
```

The rules are slightly different from how Excel displays custom number formats. In particular, literal characters must be wrapped in double quotes or preceded by a backslash. For more info, see the Excel documentation article `Create or delete a custom number format` or ECMA-376 18.8.31 (Number Formats)

**Default Number Formats**

Format 14 (`m/d/yy`) is localized by Excel: even though the file specifies that number format, it will be drawn differently based on system settings.  It makes sense when the producer and consumer of files are in the same locale, but that is not always the case over the Internet.  To get around this ambiguity, parse functions accept the `dateNF` option to override the interpretation of that specific format string.

#### Hyperlinks

Hyperlinks are stored in the `l` key of cell objects.  The `Target` field of the hyperlink object is the target of the link, including the URI fragment. Tooltips are stored in the `Tooltip` field and are displayed when you move your mouse over the text.

For example, the following snippet creates a link from cell `A3` to http://sheetjs.com with the tip `"Find us @ SheetJS.com!"`:

```
ws['A3'].l = { Target:"http://sheetjs.com", Tooltip:"Find us @ SheetJS.com!" };
```

Note that Excel does not automatically style hyperlinks -- they will generally be displayed as normal text.

Links where the target is a cell or range or defined name in the same workbook ("Internal Links") are marked with a leading hash character:

```
ws['A2'].l = { Target:"#E2" }; /* link to cell E2 */
```

#### Cell Comments

Cell comments are objects stored in the `c` array of cell objects.  The actual contents of the comment are split into blocks based on the comment author.  The `a` field of each comment object is the author of the comment and the `t` field is the plain text representation.

For example, the following snippet appends a cell comment into cell `A1`:

```
if(!ws.A1.c) ws.A1.c = [];
ws.A1.c.push({a:"SheetJS", t:"I'm a little comment, short and stout!"});
```

Note: XLSB enforces a 54 character limit on the Author name.  Names longer than 54 characters may cause issues with other formats.

To mark a comment as normally hidden, set the `hidden` property:

```
if(!ws.A1.c) ws.A1.c = [];
ws.A1.c.push({a:"SheetJS", t:"This comment is visible"});

if(!ws.A2.c) ws.A2.c = [];
ws.A2.c.hidden = true;
ws.A2.c.push({a:"SheetJS", t:"This comment will be hidden"});
```

#### Sheet Visibility

Excel enables hiding sheets in the lower tab bar.  The sheet data is stored in the file but the UI does not readily make it available.  Standard hidden sheets are revealed in the "Unhide" menu.  Excel also has "very hidden" sheets which cannot be revealed in the menu.  It is only accessible in the VB Editor!

The visibility setting is stored in the `Hidden` property of sheet props array.

**More details**

| Value | Definition  |
| ----- | ----------- |
| 0     | Visible     |
| 1     | Hidden      |
| 2     | Very Hidden |

With https://rawgit.com/SheetJS/test_files/master/sheet_visibility.xlsx:

```
> wb.Workbook.Sheets.map(function(x) { return [x.name, x.Hidden] })
[ [ 'Visible', 0 ], [ 'Hidden', 1 ], [ 'VeryHidden', 2 ] ]
```

Non-Excel formats do not support the Very Hidden state.  The best way to test if a sheet is visible is to check if the `Hidden` property is logical truth:

```
> wb.Workbook.Sheets.map(function(x) { return [x.name, !x.Hidden] })
[ [ 'Visible', true ], [ 'Hidden', false ], [ 'VeryHidden', false ] ]
```

## Parsing Options

Експортовані функції `read` та ` readFile` приймають аргумент options:

| Option Name   | Default | Description                                          |
| ------------- | ------- | ---------------------------------------------------- |
| `type`        |         | Input data encoding (see Input Type below)           |
| `raw`         | false   | If true, plain text parsing will not parse values ** |
| `codepage`    |         | If specified, use code page when appropriate **      |
| `cellFormula` | true    | Save formulae to the .f field                        |
| `cellHTML`    | true    | Parse rich text and save HTML to the `.h` field      |
| `cellNF`      | false   | Save number format string to the `.z` field          |
| `cellStyles`  | false   | Save style/theme info to the `.s` field              |
| `cellText`    | true    | Generated formatted text to the `.w` field           |
| `cellDates`   | false   | Store dates as type `d` (default is `n`)             |
| `dateNF`      |         | If specified, use the string for date code 14 **     |
| `sheetStubs`  | false   | Create cell objects of type `z` for stub cells       |
| `sheetRows`   | 0       | If >0, read the first `sheetRows` rows **            |
| `bookDeps`    | false   | If true, parse calculation chains                    |
| `bookFiles`   | false   | If true, add raw files to book object **             |
| `bookProps`   | false   | If true, only parse enough to get book metadata **   |
| `bookSheets`  | false   | If true, only parse enough to get the sheet names    |
| `bookVBA`     | false   | If true, copy VBA blob to `vbaraw` field **          |
| `password`    | ""      | If defined and file is encrypted, use password **    |
| `WTF`         | false   | If true, throw errors on unexpected file features ** |
| `sheets`      |         | If specified, only parse specified sheets **         |
| `PRN`         | false   | If true, allow parsing of PRN files **               |
| `xlfn`        | false   | If true, preserve `_xlfn.` prefixes in formulae **   |

- Even if `cellNF` is false, formatted text will be generated and saved to `.w`

- In some cases, sheets may be parsed even if `bookSheets` is false.

- Excel aggressively tries to interpret values from CSV and other plain text. This leads to surprising behavior! The `raw` option suppresses value parsing.

- `bookSheets` and `bookProps` combine to give both sets of information

- `Deps` will be an empty object if `bookDeps` is false

- ```
  bookFiles
  ```

   behavior depends on file type:

  - `keys` array (paths in the ZIP) for ZIP-based formats
  - `files` hash (mapping paths to objects representing the files) for ZIP
  - `cfb` object for formats using CFB containers

- `sheetRows-1` rows will be generated when looking at the JSON object output (since the header row is counted as a row when parsing the data)

- By default all worksheets are parsed.  

  ```
  sheets
  ```

   restricts based on input type:

  - number: zero-based index of worksheet to parse (`0` is first worksheet)
  - string: name of worksheet to parse (case insensitive)
  - array of numbers and strings to select multiple worksheets.

- `bookVBA` merely exposes the raw VBA CFB object.  It does not parse the data. XLSM and XLSB store the VBA CFB object in `xl/vbaProject.bin`. BIFF8 XLS mixes the VBA entries alongside the core Workbook entry, so the library generates a new XLSB-compatible blob from the XLS CFB container.

- `codepage` is applied to BIFF2 - BIFF5 files without `CodePage` records and to CSV files without BOM in `type:"binary"`.  BIFF8 XLS always defaults to 1200.

- `PRN` affects parsing of text files without a common delimiter character.

- Currently only XOR encryption is supported.  Unsupported error will be thrown for files employing other encryption methods.

- Newer Excel functions are serialized with the `_xlfn.` prefix, hidden from the user. SheetJS will strip `_xlfn.` normally. The `xlfn` option preserves them.

- WTF is mainly for development.  By default, the parser will suppress read errors on single worksheets, allowing you to read from the worksheets that do parse properly. Setting `WTF:true` forces those errors to be thrown.

### Input Type

Strings can be interpreted in multiple ways.  The `type` parameter for `read` tells the library how to parse the data argument:

| `type`     | expected input                                             |
| ---------- | ---------------------------------------------------------- |
| `"base64"` | string: Base64 encoding of the file                        |
| `"binary"` | string: binary string (byte `n` is `data.charCodeAt(n)`)   |
| `"string"` | string: JS string (characters interpreted as UTF8)         |
| `"buffer"` | nodejs Buffer                                              |
| `"array"`  | array: array of 8-bit unsigned int (byte `n` is `data[n]`) |
| `"file"`   | string: path of file that will be read (nodejs only)       |

## Writing Options

Експортовані функції `write` та ` writeFile` приймають аргумент options:

| Option Name   | Default  | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| `type`        |          | Кодування даних виходу (див. Тип даних виходу див нижче) |
| `cellDates`   | `false`  | Зберігає дані як тип `d` (за замовчуванням ` n`)         |
| `bookSST`     | `false`  | Згенерувати Shared String Table **                       |
| `bookType`    | `"xlsx"` | тип Workbook (see below for supported formats)           |
| `sheet`       | `""`     | Name of Worksheet for single-sheet formats **            |
| `compression` | `false`  | Use ZIP compression for ZIP-based formats **             |
| `Props`       |          | Override workbook properties when writing **             |
| `themeXLSX`   |          | Override theme XML when writing XLSX/XLSB/XLSM **        |
| `ignoreEC`    | `true`   | Suppress "number as text" errors **                      |

- `bookSST` є повільнішим і вимагає більше пам'яті, але має кращу сумісність зі старими версіями iOS Numbers
- Неопрацьовані дані - це єдине, що гарантовано буде збережено. Функції, не описані в цьому README, не можуть бути серіалізованими.
- `cellDates` only applies to XLSX output and is not guaranteed to work with third-party readers.  Excel itself does not usually write cells with type `d` so non-Excel tools may ignore the data or error in the presence of dates.
- `Props` is an object mirroring the workbook `Props` field.  See the table from the [Workbook File Properties](https://github.com/SheetJS/sheetjs#workbook-file-properties) section.
- if specified, the string from `themeXLSX` will be saved as the primary theme for XLSX/XLSB/XLSM files (to `xl/theme/theme1.xml` in the ZIP)
- Due to a bug in the program, some features like "Text to Columns" will crash Excel on worksheets where error conditions are ignored.  The writer will mark files to ignore the error by default.  Set `ignoreEC` to `false` to suppress.

### Supported Output Formats

For broad compatibility with third-party tools, this library supports many output formats.  The specific file type is controlled with `bookType` option:

| `bookType` | file ext | container | sheets | Description                     |
| ---------- | -------- | --------- | ------ | ------------------------------- |
| `xlsx`     | `.xlsx`  | ZIP       | multi  | Excel 2007+ XML Format          |
| `xlsm`     | `.xlsm`  | ZIP       | multi  | Excel 2007+ Macro XML Format    |
| `xlsb`     | `.xlsb`  | ZIP       | multi  | Excel 2007+ Binary Format       |
| `biff8`    | `.xls`   | CFB       | multi  | Excel 97-2004 Workbook Format   |
| `biff5`    | `.xls`   | CFB       | multi  | Excel 5.0/95 Workbook Format    |
| `biff2`    | `.xls`   | none      | single | Excel 2.0 Worksheet Format      |
| `xlml`     | `.xls`   | none      | multi  | Excel 2003-2004 (SpreadsheetML) |
| `ods`      | `.ods`   | ZIP       | multi  | OpenDocument Spreadsheet        |
| `fods`     | `.fods`  | none      | multi  | Flat OpenDocument Spreadsheet   |
| `csv`      | `.csv`   | none      | single | Comma Separated Values          |
| `txt`      | `.txt`   | none      | single | UTF-16 Unicode Text (TXT)       |
| `sylk`     | `.sylk`  | none      | single | Symbolic Link (SYLK)            |
| `html`     | `.html`  | none      | single | HTML Document                   |
| `dif`      | `.dif`   | none      | single | Data Interchange Format (DIF)   |
| `dbf`      | `.dbf`   | none      | single | dBASE II + VFP Extensions (DBF) |
| `rtf`      | `.rtf`   | none      | single | Rich Text Format (RTF)          |
| `prn`      | `.prn`   | none      | single | Lotus Formatted Text            |
| `eth`      | `.eth`   | none      | single | Ethercalc Record Format (ETH)   |

- `compression` only applies to formats with ZIP containers.
- Formats that only support a single sheet require a `sheet` option specifying the worksheet.  If the string is empty, the first worksheet is used.
- `writeFile` will automatically guess the output file format based on the file extension if `bookType` is not specified.  It will choose the first format in the aforementioned table that matches the extension.

### Output Type

The `type` argument for `write` mirrors the `type` argument for `read`:

| `type`     | output                                                   |
| ---------- | -------------------------------------------------------- |
| `"base64"` | string: Base64 encoding of the file                      |
| `"binary"` | string: binary string (byte `n` is `data.charCodeAt(n)`) |
| `"string"` | string: JS string (characters interpreted as UTF8)       |
| `"buffer"` | nodejs Buffer                                            |
| `"array"`  | ArrayBuffer, fallback array of 8-bit unsigned int        |
| `"file"`   | string: path of file that will be created (nodejs only)  |

## Utility Functions

The `sheet_to_*` functions accept a worksheet and an optional options object.

The `*_to_sheet` functions accept a data object and an optional options object.

The examples are based on the following worksheet:

```
XXX| A | B | C | D | E | F | G |
---+---+---+---+---+---+---+---+
 1 | S | h | e | e | t | J | S |
 2 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
 3 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
```

### Array of Arrays Input

`XLSX.utils.aoa_to_sheet` приймає масив масивів значень JS і повертає аркуш, що нагадує вхідні дані. Числа, логічні значення та рядки зберігаються як відповідні стилі. Дати зберігаються як дата або цифри. Діри в масиві та явні значення "невизначені" пропускаються. Значення `null` можуть бути стертими. Усі інші значення зберігаються у вигляді рядків. Функція приймає аргумент options:

| Option Name  | Default | Description                                       |
| ------------ | ------- | ------------------------------------------------- |
| `dateNF`     | FMT 14  | Use specified date format in string output        |
| `cellDates`  | false   | Store dates as type `d` (default is `n`)          |
| `sheetStubs` | false   | Create cell objects of type `z` for `null` values |

**Examples**

```js
To generate the example sheet:
var ws = XLSX.utils.aoa_to_sheet([
  "SheetJS".split(""),
  [1,2,3,4,5,6,7],
  [2,3,4,5,6,7,8]
])
```

`XLSX.utils.sheet_add_aoa` takes an array of arrays of JS values and updates an existing worksheet object.  It follows the same process as `aoa_to_sheet` and accepts an options argument:

| Option Name  | Default | Description                                       |
| ------------ | ------- | ------------------------------------------------- |
| `dateNF`     | FMT 14  | Use specified date format in string output        |
| `cellDates`  | false   | Store dates as type `d` (default is `n`)          |
| `sheetStubs` | false   | Create cell objects of type `z` for `null` values |
| `origin`     |         | Use specified cell as starting point (see below)  |

`origin` is expected to be one of:

| `origin`      | Description                                              |
| ------------- | -------------------------------------------------------- |
| (cell object) | Use specified cell (cell object)                         |
| (string)      | Use specified cell (A1-style cell)                       |
| (number >= 0) | Start from the first column at specified row (0-indexed) |
| -1            | Append to bottom of worksheet starting on first column   |
| (default)     | Start from cell A1                                       |

**Examples**

Consider the worksheet:

```
XXX| A | B | C | D | E | F | G |
---+---+---+---+---+---+---+---+
 1 | S | h | e | e | t | J | S |
 2 | 1 | 2 |   |   | 5 | 6 | 7 |
 3 | 2 | 3 |   |   | 6 | 7 | 8 |
 4 | 3 | 4 |   |   | 7 | 8 | 9 |
 5 | 4 | 5 | 6 | 7 | 8 | 9 | 0 |
```

This worksheet can be built up in the order `A1:G1, A2:B4, E2:G4, A5:G5`:

```
/* Initial row */
var ws = XLSX.utils.aoa_to_sheet([ "SheetJS".split("") ]);

/* Write data starting at A2 */
XLSX.utils.sheet_add_aoa(ws, [[1,2], [2,3], [3,4]], {origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_aoa(ws, [[5,6,7], [6,7,8], [7,8,9]], {origin:{r:1, c:4}});

/* Append row */
XLSX.utils.sheet_add_aoa(ws, [[4,5,6,7,8,9,0]], {origin: -1});
```

### Array of Objects Input

`XLSX.utils.json_to_sheet` приймає масив об'єктів і повертає аркуш із автоматично згенерованими "заголовками" на основі ключів об'єктів. Порядок стовпців за замовчуванням визначається першим появою поля за допомогою `Object.keys`, але може бути замінений за допомогою аргументу options:

| Option Name  | Default | Description                                        |
| ------------ | ------- | -------------------------------------------------- |
| `header`     |         | Use specified column order (default `Object.keys`) |
| `dateNF`     | FMT 14  | Use specified date format in string output         |
| `cellDates`  | false   | Store dates as type `d` (default is `n`)           |
| `skipHeader` | false   | If true, do not include header row in output       |

**Examples**

`XLSX.utils.sheet_add_json` takes an array of objects and updates an existing worksheet object.  It follows the same process as `json_to_sheet` and accepts an options argument:

| Option Name  | Default | Description                                        |
| ------------ | ------- | -------------------------------------------------- |
| `header`     |         | Use specified column order (default `Object.keys`) |
| `dateNF`     | FMT 14  | Use specified date format in string output         |
| `cellDates`  | false   | Store dates as type `d` (default is `n`)           |
| `skipHeader` | false   | If true, do not include header row in output       |
| `origin`     |         | Use specified cell as starting point (see below)   |

`origin` is expected to be one of:

| `origin`      | Description                                              |
| ------------- | -------------------------------------------------------- |
| (cell object) | Use specified cell (cell object)                         |
| (string)      | Use specified cell (A1-style cell)                       |
| (number >= 0) | Start from the first column at specified row (0-indexed) |
| -1            | Append to bottom of worksheet starting on first column   |
| (default)     | Start from cell A1                                       |

**Examples**

Consider the worksheet:

```
XXX| A | B | C | D | E | F | G |
---+---+---+---+---+---+---+---+
 1 | S | h | e | e | t | J | S |
 2 | 1 | 2 |   |   | 5 | 6 | 7 |
 3 | 2 | 3 |   |   | 6 | 7 | 8 |
 4 | 3 | 4 |   |   | 7 | 8 | 9 |
 5 | 4 | 5 | 6 | 7 | 8 | 9 | 0 |
```

This worksheet can be built up in the order `A1:G1, A2:B4, E2:G4, A5:G5`:

```js
/* Initial row */
var ws = XLSX.utils.json_to_sheet([
  { A: "S", B: "h", C: "e", D: "e", E: "t", F: "J", G: "S" }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true});

/* Write data starting at A2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 1, B: 2 }, { A: 2, B: 3 }, { A: 3, B: 4 }
], {skipHeader: true, origin: "A2"});

/* Write data starting at E2 */
XLSX.utils.sheet_add_json(ws, [
  { A: 5, B: 6, C: 7 }, { A: 6, B: 7, C: 8 }, { A: 7, B: 8, C: 9 }
], {skipHeader: true, origin: { r: 1, c: 4 }, header: [ "A", "B", "C" ]});

/* Append row */
XLSX.utils.sheet_add_json(ws, [
  { A: 4, B: 5, C: 6, D: 7, E: 8, F: 9, G: 0 }
], {header: ["A", "B", "C", "D", "E", "F", "G"], skipHeader: true, origin: -1});
```

### Delimiter-Separated Output

As an alternative to the `writeFile` CSV type, `XLSX.utils.sheet_to_csv` also produces CSV output.  The function takes an options argument:

| Option Name   | Default | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| `FS`          | `","`   | "Field Separator"  delimiter between fields        |
| `RS`          | `"\n"`  | "Record Separator" delimiter between rows          |
| `dateNF`      | FMT 14  | Use specified date format in string output         |
| `strip`       | false   | Remove trailing field separators in each record ** |
| `blankrows`   | true    | Include blank lines in the CSV output              |
| `skipHidden`  | false   | Skips hidden rows/columns in the CSV output        |
| `forceQuotes` | false   | Force quotes around fields                         |

- `strip` will remove trailing commas from each line under default `FS/RS`
- `blankrows` must be set to `false` to skip blank lines.
- Fields containing the record or field separator will automatically be wrapped in double quotes; `forceQuotes` forces all cells to be wrapped in quotes.

For the example sheet:

```
> console.log(XLSX.utils.sheet_to_csv(ws));
S,h,e,e,t,J,S
1,2,3,4,5,6,7
2,3,4,5,6,7,8
> console.log(XLSX.utils.sheet_to_csv(ws, {FS:"\t"}));
S	h	e	e	t	J	S
1	2	3	4	5	6	7
2	3	4	5	6	7	8
> console.log(XLSX.utils.sheet_to_csv(ws,{FS:":",RS:"|"}));
S:h:e:e:t:J:S|1:2:3:4:5:6:7|2:3:4:5:6:7:8|
```

#### UTF-16 Unicode Text

The `txt` output type uses the tab character as the field separator.  If the `codepage` library is available (included in full distribution but not core), the output will be encoded in `CP1200` and the BOM will be prepended.

`XLSX.utils.sheet_to_txt` takes the same arguments as `sheet_to_csv`.

### JSON

`XLSX.utils.sheet_to_json` генерує різні типи об'єктів JS. Функція приймає аргумент options:

| Option Name | Default | Description                                                  |
| ----------- | ------- | ------------------------------------------------------------ |
| `raw`       | `true`  | Використовуйте необроблені значення (true) або відформатовані рядки (false) |
| `range`     | from WS | Діапазон заміни (див. Таблицю нижче)                         |
| `header`    |         | Керує вихідним форматом (див. Таблицю нижче)                 |
| `dateNF`    | FMT 14  | Використовуйте вказаний формат дати у вихідному рядку        |
| `defval`    |         | Використовуйте вказане значення замість null або undefined   |
| `blankrows` | **      | Включає порожні рядки у дані виходу **                       |

- `raw`  стосується лише комірок, які мають поле коду формату (`.z`) або поле форматованого тексту (` .w`).
- Якщо вказано `header`, перший рядок вважається рядком даних; якщо `header` не вказано, перший рядок є рядком заголовка і не рахується даними.
- When `header` is not specified, the conversion will automatically disambiguate header entries by affixing `_` and a count starting at `1`.  For example, if three columns have header `foo` the output fields are `foo`, `foo_1`, `foo_2`
- `null` values are returned when `raw` is true but are skipped when false.
- If `defval` is not specified, null and undefined values are skipped normally. If specified, all null and undefined points will be filled with `defval`
- When `header` is `1`, the default is to generate blank rows.  `blankrows` must be set to `false` to skip blank rows.
- When `header` is not `1`, the default is to skip blank rows.  `blankrows` must be true to generate blank rows

`range` is expected to be one of:

| `range`   | Description                                                  |
| --------- | ------------------------------------------------------------ |
| (number)  | Використовуйте діапазон робочого аркуша, але встановіть для початкового рядка значення |
| (string)  | Використовувати вказаний діапазон (рядок обмеженого діапазону в стилі A1) |
| (default) | Використовуйте діапазон робочих аркушів (`ws['!ref']`)       |

`header` is expected to be one of:

| `header`         | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `1`              | Створити масив масивів ("2D Array")                     |
| `"A"             | Ключами об'єкта рядка є літеральні мітки стовпців       |
| array of strings | Використовуйте вказані рядки як ключі в об’єктах рядків |
| (default)        | Прочитайте та роз'єднайте перший рядок як ключі         |

If header is not `1`, the row object will contain the non-enumerable property `__rowNum__` that represents the row of the sheet corresponding to the entry.

**Examples** 

Для прикладу аркуша:

```js
> XLSX.utils.sheet_to_json(ws);
[ { S: 1, h: 2, e: 3, e_1: 4, t: 5, J: 6, S_1: 7 },
  { S: 2, h: 3, e: 4, e_1: 5, t: 6, J: 7, S_1: 8 } ]

> XLSX.utils.sheet_to_json(ws, {header:"A"});
[ { A: 'S', B: 'h', C: 'e', D: 'e', E: 't', F: 'J', G: 'S' },
  { A: '1', B: '2', C: '3', D: '4', E: '5', F: '6', G: '7' },
  { A: '2', B: '3', C: '4', D: '5', E: '6', F: '7', G: '8' } ]

> XLSX.utils.sheet_to_json(ws, {header:["A","E","I","O","U","6","9"]});
[ { '6': 'J', '9': 'S', A: 'S', E: 'h', I: 'e', O: 'e', U: 't' },
  { '6': '6', '9': '7', A: '1', E: '2', I: '3', O: '4', U: '5' },
  { '6': '7', '9': '8', A: '2', E: '3', I: '4', O: '5', U: '6' } ]

> XLSX.utils.sheet_to_json(ws, {header:1});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ '1', '2', '3', '4', '5', '6', '7' ],
  [ '2', '3', '4', '5', '6', '7', '8' ] ]
```

Example showing the effect of `raw`:

```js
> ws['A2'].w = "3";                          // set A2 formatted string value

> XLSX.utils.sheet_to_json(ws, {header:1, raw:false});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ '3', '2', '3', '4', '5', '6', '7' ],     // <-- A2 uses the formatted string
  [ '2', '3', '4', '5', '6', '7', '8' ] ]

> XLSX.utils.sheet_to_json(ws, {header:1});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ 1, 2, 3, 4, 5, 6, 7 ],                   // <-- A2 uses the raw value
  [ 2, 3, 4, 5, 6, 7, 8 ] ]
```

