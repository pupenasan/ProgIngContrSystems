# HummusJS

https://github.com/galkahana/HummusJS

https://github.com/galkahana/HummusJS/wiki

## Вступ

Hummus - це модуль NodeJS для створення, аналізу та модифікації PDF-файлів та потоків. Встановіть, просто натиснувши `npm install hummus`.

Модуль має наступний набір функцій:

1. Створіть нові файли PDF, змініть існуючі.
2. Відображення зображень JPG, PNG та TIFF. 1 BIT-тіфи та відтінки сірого можуть бути використані як зображення та кольорові карти для вигадливого відображення. Підтримуються прозорі зображення PNG.
3. Показувати текст за допомогою шрифтів True Type, Open Type та Type 1 (це ttf, otf, pfb / pfm, dfont, ttc).
4. Намалюйте примітиви.
5. Визначте багаторазову графіку за допомогою XObject Forms.
6. Вставте інші PDF-файли у свій PDF за допомогою *багатьох* варіантів, як це зробити. Починаючи від простого додавання сторінок з іншого PDF-файлу, через створення зміщуваного вмісту зі сторінок іншого PDF-файлу, до копіювання основних будівельних блоків іншого PDF-файлу. І нормально об’єднувати та чергувати вміст із декількох PDF-файлів. нема проблем.
7. Розбір PDF-файлів
   1. Отримайте основну інформацію про файл PDF та його сторінки.
   2. Прочитайте значення форми. див. [тут](http://pdfhummus.com/post/154893591116/parsing-pdf-digital-form-values).
   3. Прочитайте весь текст із файлу PDF. див. [тут](http://pdfhummus.com/post/156548561656/extracting-text-from-pdf-files).
   4. Отримайте доступ до конструкцій PDF нижчого рівня, щоб дозволити вам прочитати що-небудь усередині файлу PDF.
8. Змінюючи PDF-файл, ви можете додавати до нього нові сторінки з новим вмістом або розміщувати вміст поверх існуючого вмісту сторінки. І багато іншого - наприклад, [це](http://pdfhummus.com/post/161128437261/a-good-day-to-everyone-today-we-will-discuss-a) пояснює, як заповнювати форми PDF із змінами .
9. Ви можете писати як у файл, так і в потік. Зокрема, ви можете писати безпосередньо в потік відповідей, заощаджуючи необхідність підтримувати файли для динамічно створюваних PDF-файлів. Ви можете реалізувати власні власні потоки
10. Ви також можете читати JPG, TIFFS, PDF з реалізацій користувацьких потоків. спочатку бібліотека підтримує файли, але вам не потрібно дотримуватися лише цього (на жаль, шрифти, на даний момент все ще повинні бути файли).
11. На додаток до функцій високого рівня, модуль забезпечує потужний доступ до будівельних блоків PDF низького рівня як для читання, так і для запису, тому по суті ви можете робити що завгодно PDF.

Початок роботи - [Як обслуговувати динамічно створений pdf](https://github.com/galkahana/HummusJS/wiki/How-to-serve-dynamically-created-pdf).
Документація та довідкова інформація - [Можливості](https://github.com/galkahana/HummusJS/wiki/Features).

Хумус також дуже швидкий, використовуючи унікальну модель одноразового записування.
Він побудований поверх бібліотеки [PDFHummus](https://github.com/galkahana/PDF-Writer), потужної, швидкої та безкоштовної бібліотеки PDF XPlatform C ++.
Це абсолютно безкоштовно. Apache 2 - це ліцензія, тому ви можете безпечно використовувати її як для комерційних, так і для некомерційних цілей.

Будь-які пропозиції щодо доповнень вітаються. Внесок також вітається (як у JS, так і на C ++).

## Можливості

Модуль хумус забезпечує такі функції:

1. [Основи створення PDF](https://github.com/galkahana/HummusJS/wiki/Basic-pdf-creation) - створити PDF у файлі або потоці, додати сторінки
2. [Показати примітиви](https://github.com/galkahana/HummusJS/wiki/Show-primitive) - малювати лінії, прямокутники, трикутники та кола на сторінці
3. [Показати текст](https://github.com/galkahana/HummusJS/wiki/Show-text) - розмістіть текст на сторінці. Ви також можете розміщувати гліфи відповідно до їх ідентифікаторів, якщо вам потрібно.
4. [Показати зображення](https://github.com/galkahana/HummusJS/wiki/Show-images) - розміщення зображень типів JPG та TIFF (PDF пояснено нижче)
5. [Використовуйте оператори креслення PDF](https://github.com/galkahana/HummusJS/wiki/Use-the-pdf-drawing-operators) - На додаток до функцій верхнього рівня, ви також можете використовувати повний список операторів PDF, щоб намалювати що-небудь.
6. [Багаторазові форми](https://github.com/galkahana/HummusJS/wiki/Reusable-forms) - створюйте графіку один раз, відображайте багато разів.
7. [Вбудовування PDF](https://github.com/galkahana/HummusJS/wiki/Embedding-pdf) - об’єднати вміст PDF у сторінки, використовувати сторінки PDF як форми, копіювати елементи PDF з іншого PDF ... робіт.
8. [Потоки](https://github.com/galkahana/HummusJS/wiki/Streams) - модуль періодично повертає спеціальні об’єкти потоку, щоб ви могли або писати, або читати з них. Цей уривок пояснює, як ними користуватися.
9. [Parsing](https://github.com/galkahana/HummusJS/wiki/Parsing) - як проаналізувати PDF за допомогою модуля.
10. [Модифікація](https://github.com/galkahana/HummusJS/wiki/Modification) - як змінити існуючий PDF.
11. [Спеціальні потоки](https://github.com/galkahana/HummusJS/wiki/Custom-streams) - більше інформації про читання та запис із користувацьких потоків.
12. [Розширюваність](https://github.com/galkahana/HummusJS/wiki/Extensibility) - деякі примітки щодо можливостей розширюваності бібліотеки.

На додаток до того, що тут пояснено, є ще розширені функції, про які я ще не встиг написати (наприклад, можливість розміщувати гліфи за ідентифікатором замість використання тексту), а потім є ще багато можливостей, або виставляючи більше бібліотеку PDFHummus C ++ або за допомогою існуючих будівельних блоків. Тож, якщо його там немає, запитай мене. Можливо, є хитрість;)

# Parsing

https://github.com/galkahana/HummusJS/wiki/Parsing

Hummus дозволяє читати та аналізувати існуючий файл PDF. Можливості аналізатора забезпечують інформацію про PDF-файл верхнього рівня, інформацію про вікна сторінок та доступ до об’єктів нижчого рівня PDF-файлу. Це не найсильніша частина модуля. Значення - ви маєте доступ до всього. І деякі обмеження високого рівня, але не набагато. Наприклад, якщо ви шукаєте запити до зображень, тексту чи подібних методів високого рівня, їх там немає. Ви можете побудувати їх за допомогою синтаксичного аналізатора, і це займе у вас певний шлях (наприклад, ви можете отримати хороший декодер декодованого потоку вмісту, а також легкий доступ та просте читання об’єктів для словників, рядків, чисел тощо), але вам доведеться зрозуміти деякі PDF-файли. Я хотів би зробити тут внески.

Синтаксичний аналіз дуже важливий не тільки для читання сценаріїв, але і для вдосконаленого копіювання та модифікації сценаріїв. У цих випадках ви будете використовувати парсер, щоб дізнатись про джерело чи існуючий PDF, щоб визначити, що копіювати чи маніпулювати.

Є приклад того, як використовувати парсер [тут](https://github.com/galkahana/HummusJS/blob/master/tests/PDFParser.js) із синтаксичним аналізом високого та низького рівня.

Наступний уривок пояснює парсер. Там частини - створення аналізатора і методів високого рівня, потім методів сторінок, а потім методів об'єктів низького рівня.

## Створення об'єкта парсера та функцій високого рівня

ГАРАЗД. По-перше, ви можете отримати об'єкт PDFReader (це власне ім'я об'єкта синтаксичного аналізатора) під час модифікації файлу або копіювання з нього за допомогою контексту копіювання. Як це зробити, пояснюється у відповідних розділах документації. Але ви також можете створити парсер для звичайного файлу PDF. Ви робите це через головний модуль хумусу:

```js
var hummus = require('hummus');
var pdfReader = hummus.createReader('./TestMaterials/XObjectContent.PDF');
```

метод `createReader` повертає об'єкт синтаксичного аналізу за умови, що PDF в порядку. ну, принаймні, які частини йому спочатку потрібно прочитати.

Об'єкт читача може забезпечити такі високі рівні:

- `getPDFLevel()` - отримати версію PDF, наприклад 1.3
- `getPagesCount()` - get the pages count
- `getTrailer()` -  it's a PDFDictionary. explained below. отримати об’єкт трейлера PDF (для отримання інформації). це PDFD Dictionary. пояснюється нижче.
- `getPageObjectID(inPageIndex)` - отримати ідентифікатор об’єкта словника сторінок для даного індексу сторінки. 
- `parsePage(inPageIndex)` -  повертає інформаційний об'єкт сторінки типу PDFPageInput. може дати вам різні boxes сторінки та її словник. Дивись нижче.
- `parsePageDictionary(inPageIndex)` - повертає об’єкт словника сторінки типу PDFDictionary. подробиці використання див. нижче. 
- `getObjectsCount()` - отримати загальну кількість об’єкта PDF у файлі PDF
- `isEncrypted()` - is the file encrypted? kind of important.  Cause if it is the library won't be able to parse too much of it (it  doesn't know encrypted files) or modify it.
- `getXrefSize()` - if you know what an Xref table is in a PDF, then this one will provide it's size
- `getXrefEntry(inObjectID)` - get an xref entry. returns an object with `objectPosition`, `revision` and `type`, for an input object ID. type can be hummus.eXrefEntryExisting,  hummus.eXrefEntryDelete or hummus.eXrefEntryStreamObject, according to  the possible xref values.
- `getXrefPosition()` - get the file position of the xref table (the last one, for modified files)
- `getParserStream()` - get the read stream for the parser. It is of type ByteReaderStreamWithPosition. If you wish to read from it directly, check [this](https://github.com/galkahana/HummusJS/wiki/Streams#bytereaderwithposition) for details.

## Page info objects

Якщо ви використовували `parsePage` для отримання інформаційного об'єкта сторінки, ви отримаєте об'єкт, який може надати інформацію про різні вікна сторінки. Якщо значення boxes успадковуються шляхом виведення з інших boxes , воно поверне виведене значення. Доступні наступні методи:

```js
getMediaBox()
getCropBox()
getTrimBox()
getBleedBox()
getArtBox()
```

кожен метод повертає масив з 4 чисел, забезпечуючи поле ліворуч, знизу, праворуч, зверху.

На додаток до отримання boxes, ви можете отримати об'єкт page dictionary за допомогою `getDictionary`. Об’єкти словника пояснюються нижче.

Обертання сторінки можна отримати за допомогою `getRotate`. Значення, як правило, становлять 0,90 180 270 або нульові.

## Low level objects

На додаток до об'єктів високого рівня, парсер може читати низькі рівні. Думаю, це в основному поточне використання. Синтаксичний аналізатор може читати всі типи об'єктів низького рівня та надавати простий інтерфейс для їх значень.

Зчитуються такі типи об’єктів:

```js
hummus.ePDFObjectBoolean
hummus.ePDFObjectLiteralString
hummus.ePDFObjectHexString
hummus.ePDFObjectNull
hummus.ePDFObjectName
hummus.ePDFObjectInteger
hummus.ePDFObjectReal
hummus.ePDFObjectArray
hummus.ePDFObjectDictionary
hummus.ePDFObjectIndirectObjectReference
hummus.ePDFObjectStream
hummus.ePDFObjectSymbol
```

Будь-який аналізований об'єкт є похідним від PDFObject і має метод-член під назвою `getType`, який може отримати ваш тип.

До аналізованих об’єктів можна дістатися або ітерацією об’єктів, або аналізацією непрямих об’єктів за їх ідентифікатором, використовуючи метод PDFReader `parseNewObject(inObjectID)`, який отримує ідентифікатор об’єкта і повертає об’єкт. Об'єкт спочатку використовується за допомогою методів PDFObject, які пояснюються в наступному розділі

### PDFObject

PDFObject є батьківським класом для всіх інших об'єктів. Коли ви викликаєте `parseNewObject` або отримуєте об'єкт за допомогою будь-якого іншого методу, тоді саме цей тип ви побачите. Ви можете отримати фактичний тип за допомогою методу `getType`. Потім ви можете змінити об'єкт на дійсний об'єкт типу (щоб ви могли використовувати його метод переміщення) за допомогою одного з наступних методів PDFObject:

```js
toPDFIndirectObjectReference()
toPDFArray()
toPDFDictionary()
toPDFStream()
toPDFBoolean()
toPDFLiteralString()
toPDFHexString()
toPDFNull()
toPDFName()
toPDFInteger()
toPDFReal()
toPDFSymbol()
```

Кожен із цих методів перетворює PDFObject на фактичний об’єкт. Наприклад, виклик toPDFName () поверне об'єкт PDFName, який тепер можна використовувати за допомогою методів, щоб отримати значення імені. Якщо ви очікуєте певного типу, ви можете просто викликати відповідний метод перетворення типу і продовжувати використовувати об'єкт з його фактичними методами. Кожен із типів буде пояснено нижче. (і не забудьте перевірити приклад, щоб все це мало сенс).

На додаток до методів перетворення існують прості засоби отримання значень Javascript, які добре підходять для швидкого отримання значень javascript з PDFObject для відомих типів:

```js
toNumber()
toString()
```

`toNumber()` поверне значення числа javascript для реальних та цілочисельних аналізованих об'єктів. Це поверне null для будь-чого іншого. `toString ()` повертає еквівалентне значення рядка для імен, буквених та шістнадцяткових рядків, дійсних та цілих чисел, символів та логічних значень ('true' для істинних значень та 'false' для хибних значень).

У наступних розділах буде розглянуто кожен тип об’єкта. Пам’ятайте - ви дістаєтеся до них за допомогою методів toXXXXXX. Не намагайтеся просто викликати їх методи безпосередньо, коли вони все ще є PDFObject. Як у програмуванні V8 - спочатку перетворіть, а потім використовуйте. гаразд?

### PDFInteger and PDFReal

Both PDFReal and PDFInteger objects have a single property named `value` that returns their number value. Hurrah. it'll be a javascript number.

### PDFLiteralString, PDFHexString, PDFName and PDFSymbol

Усі ці об'єкти мають єдину властивість `value`, яка повертає значення рядка, яке вони містять.

### PDFBoolean

PDFBoolean has a single property named `value` returning a javascript boolean value equal to what it holds

### PDFNull

PDFNull object represents a null PDF value. It has a single property named 'value' always returning javascript null.

### PDFIndirectObjectReference

PDFIndirectObjectReference represents an indirect object reference. It has two methods - `getObjectID` and `getObjectVersion` - to get the PDF object ID and version (in accordance).

### PDFArray

PDFArray - це масив об’єктів PDF. Він має три методи:

- `toJSArray()` -  повертає масив javascript, що містить об'єкти PDFArray
- `getLength()` -  повертає кількість елементів у масиві
- `queryObject(inIndex)` - повертає PDFObject за вказаним індексом.

`queryObject(inIndex)` повертає прямий об'єкт у призначеному індексі. Якщо це PDFIndirectObjectReference, він поверне цей об’єкт, а не об’єкт, на який посилається. Якщо ви хочете отримати об'єкт, на який посилаються, використовуйте замість цього метод PDFReader `queryArrayObject`, наприклад:

```js
var anObject = pdfReader.queryArrayObject(inArray,inIndex)
```

Він буде поводитися як масив queryObject, але для випадку PDFIndirectObjectReference, і в цьому випадку він поверне об'єкт, на який посилається.

### PDFDictionary

PDFD Dictionary - це об’єкт відображення, що відображає значення імен (об’єкти PDFName) на об’єкти (PDFObject). Він має такі методи:

- `toJSObject()` -  повернути об'єкт javascript, де значення імен (ключі) словника служать іменами властивостей, а значення (PDFObjects) служать значеннями.
- `exists(inName)` - передає значення рядка, яке є ім'ям можливого об'єкта, щоб перевірити, чи існує таке у словнику.
- `queryObject(inName)` - передайте ім'я рядка, щоб повернути об'єкт (PDFObject) зі словника

подібно до масивів,  `queryObject` для словників повертає прямий об'єкт. Отже, якщо ви хочете отримати фактичний об’єкт, на який посилаються, у випадку, коли на нього посилаються зі словника за допомогою PDFIndirectObjectReference, викличіть PDFReader `queryDictionaryObject (inDictionary, inName)`, який працює однаково, але для посилань повертає фактичний об'єкт, на який посилається.

### PDFStreamInput

The PDFStreamInput (not called PDFStream, cause there's an object in  the "writer" part that's called that way) is a stream in the PDF. A  stream is constructed of a dictionary and a flow of bytes, which meaning is defined in the dictionary. the stream object has the following  methods:

- `getDictionary()` - will return a dictionary object (PDFDictionary) that is the stream dictionary
- `getStreamContentStart()` - return the byte position in the  read stream where the content of the stream starts. Using it, the stream length property and the decoders you should be able to read the stream.

HOWEVER, there is a convenience method in the parser to get a  ByteReader object that will allow you to read from the stream as if it  were plain text...because it does the decoding for you. it will also  stop the reading when the stream ends. So basically if you want to read  the stream use this method:

```js
var readStream = pdfReader.startReadingFromStream(inPDFStreamInput);
while(readStream.notEnded()
{
  var readData = readStream.read(10000);
  // do something with the data
}
```

the PDFReader `startReadingFromStream` receives a  PDFStreamInput object as a parameter and returns a ByteReader stream  that you can read from. Although it's fairly clear from the example how  reading works, you can still read more about it if you are not satisfied in [Streams](https://github.com/galkahana/HummusJS/wiki/Streams).