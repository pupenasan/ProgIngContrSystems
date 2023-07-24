https://github.com/mwilliamson/mammoth.js

# Mammoth .docx to HTML converter

Mammoth призначений для конвертації документів .docx, наприклад, створених Microsoft Word, Google Docs і LibreOffice, і їх перетворення в HTML. Mammoth прагне створювати простий і чистий HTML, використовуючи семантичну інформацію в документі та ігноруючи інші деталі. Наприклад, Mammoth перетворює будь-який абзац зі стилем `Heading 1` на елементи `h1`, а не намагається точно скопіювати стиль (шрифт, розмір тексту, колір тощо) заголовка.

Існує велика невідповідність між структурою, яку використовує .docx, і структурою HTML, що означає, що перетворення навряд чи буде ідеальним для більш складних документів. Mammoth працює найкраще, якщо ви використовуєте лише стилі для семантичної розмітки свого документа.

Наразі підтримуються такі функції:

- Заголовки.
- Списки.
- Настроюване відображення ваших власних стилів docx у HTML. Наприклад, ви можете перетворити `WarningHeading` на `h1.warning`, забезпечивши відповідне відображення стилю.
- Таблиці. Форматування самої таблиці, як-от межі, наразі ігнорується, але форматування тексту обробляється так само, як і в решті документа.
- Виноски та кінцеві виноски.
- Зображення.
- Жирний шрифт, курсив, підкреслення, закреслення, верхній і нижній індекси.
- Посилання.
- Розриви рядків.
- Текстові поля. Вміст текстового поля розглядається як окремий абзац, який з’являється після абзацу, що містить текстове поле.
- Коментарі.

## Installation

```
npm install mammoth
```

## Usage

### CLI

Ви можете конвертувати файли docx, передавши шлях до файлу docx і вихідного файлу. Наприклад:

```
mammoth document.docx output.html
```

Якщо файл виводу не вказано, натомість вивід буде записаний у stdout.

Результатом є фрагмент HTML, а не повний документ HTML, закодований за допомогою UTF-8. Оскільки кодування явно не встановлено у фрагменті, відкриття вихідного файлу у веб-браузері може призвести до того, що символи Юнікоду відтворюватимуться неправильно, якщо браузер за замовчуванням не використовує UTF-8.

#### Images

За замовчуванням зображення включено у вихідний HTML. Якщо вихідний каталог указано `--output-dir`, зображення записуються в окремі файли. Наприклад:

```
mammoth document.docx --output-dir=output-dir
```

Існуючі файли будуть перезаписані, якщо вони є.

#### Styles

Користувацьку карту стилів можна прочитати з файлу за допомогою `--style-map`. Наприклад:

```
mammoth document.docx output.html --style-map=custom-style-map
```

Where `custom-style-map` looks something like:

```
p[style-name='Aside Heading'] => div.aside > h2:fresh
p[style-name='Aside Text'] => div.aside > p:fresh
```

A description of the syntax for style maps can be found in the section ["Writing style maps"](https://github.com/mwilliamson/mammoth.js#writing-style-maps).

#### Markdown

Підтримка Markdown застаріла. Рекомендується генерувати HTML і використовувати окрему бібліотеку для перетворення HTML у Markdown, що, ймовірно, дасть кращі результати.

Використання `--output-format=markdown` призведе до створення Markdown. Наприклад:

```
mammoth document.docx --output-format=markdown
```

### Library

У node.js і браузері mammoth можна вимагати звичайним способом:

```
var mammoth = require("mammoth");
```

Alternatively, you may use the standalone JavaScript file `mammoth.browser.js`, which includes both mammoth and its dependencies. This uses any loaded module system. For instance, when using CommonJS:

```
var mammoth = require("mammoth/mammoth.browser");
```

If no module system is found, `mammoth` is set as a window global.

The file can be generated using `make setup` during development.

#### Basic conversion

To convert an existing .docx file to HTML, use `mammoth.convertToHtml`:

```js
var mammoth = require("mammoth");

mammoth.convertToHtml({path: "path/to/document.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
    })
    .catch(function(error) {
        console.error(error);
    });
```

Note that `mammoth.convertToHtml` returns a [promise](http://promises-aplus.github.io/promises-spec/).

Ви також можете витягнути необроблений текст документа за допомогою `mammoth.extractRawText`. Це проігнорує все форматування в документі. Після кожного абзацу йдуть два нові рядки.

```js
mammoth.extractRawText({path: "path/to/document.docx"})
    .then(function(result){
        var text = result.value; // The raw text
        var messages = result.messages;
    })
    .catch(function(error) {
        console.error(error);
    });
```

#### Custom style map

За замовчуванням Mammoth відображає деякі поширені стилі .docx на елементи HTML. Наприклад, абзац із назвою стилю `Heading 1` перетворюється на елемент `h1`. Ви можете передати спеціальну карту для стилів, передавши об’єкт параметрів із властивістю `styleMap` як другий аргумент у `convertToHtml`. Опис синтаксису карт стилів можна знайти в розділі  ["Writing style maps"](https://github.com/mwilliamson/mammoth.js#writing-style-maps). Наприклад, якщо абзаци з назвою стилю `Назва розділу` повинні бути перетворені на елементи `h1`, а абзаци з назвою стилю `Subsection Title` мають бути перетворені на елементи `h2`:

```js
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

Щоб легше підтримувати карти стилів, що зберігаються в текстових файлах, `styleMap` також може бути рядком. Кожен рядок розглядається як окреме відображення стилю, ігноруючи порожні рядки та рядки, що починаються з `#`:

```js
var options = {
    styleMap: "p[style-name='Section Title'] => h1:fresh\n" +
        "p[style-name='Subsection Title'] => h2:fresh"
};
```

Визначені користувачем зіставлення стилів використовуються натомість зіставленням стилів за замовчуванням. Щоб повністю припинити використання зіставлення стилів за замовчуванням, встановіть `options.includeDefaultStyleMap` на `false`:

```js
var options = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ],
    includeDefaultStyleMap: false
};
```

#### Custom image handlers

За замовчуванням зображення перетворюються на елементи `<img>` з вбудованим джерелом в атрибут `src`. Цю поведінку можна змінити, установивши параметр `convertImage` на [image converter](https://github.com/mwilliamson/mammoth.js#image-converters) .

Наприклад, наступне буде повторювати поведінку за замовчуванням:

```js
var options = {
    convertImage: mammoth.images.imgElement(function(image) {
        return image.read("base64").then(function(imageBuffer) {
            return {
                src: "data:" + image.contentType + ";base64," + imageBuffer
            };
        });
    })
};
```

#### Bold

За замовчуванням жирний текст обернено тегами `<strong>`. Цю поведінку можна змінити, додавши відображення стилю для `b`. Наприклад, щоб обернути жирним шрифтом теги `<em>`:

```js
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "b => em"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

#### Italic

By default, italic text is wrapped in `<em>` tags. This behaviour can be changed by adding a style mapping for `i`. For instance, to wrap italic text in `<strong>` tags:

```
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "i => strong"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

#### Underline

By default, the underlining of any text is ignored since underlining can be confused with links in HTML documents. This behaviour can be changed by adding a style mapping for `u`. For instance, suppose that a source document uses underlining for emphasis. The following will wrap any explicitly underlined source text in `<em>` tags:

```
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "u => em"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

#### Strikethrough

By default, strikethrough text is wrapped in `<s>` tags. This behaviour can be changed by adding a style mapping for `strike`. For instance, to wrap strikethrough text in `<del>` tags:

```
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "strike => del"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

#### Comments

By default, comments are ignored. To include comments in the generated HTML, add a style mapping for `comment-reference`. For instance:

```
var mammoth = require("mammoth");

var options = {
    styleMap: [
        "comment-reference => sup"
    ]
};
mammoth.convertToHtml({path: "path/to/document.docx"}, options);
```

Comments will be appended to the end of the document, with links to the comments wrapped using the specified style mapping.

### API

#### `mammoth.convertToHtml(input, options)`

Converts the source document to HTML.

- `input`: an object describing the source document. On node.js, the following inputs are supported:

  - `{path: path}`, where `path` is the path to the .docx file.
  - `{buffer: buffer}`, where `buffer` is a node.js Buffer containing a .docx file.

  In the browser, the following inputs are supported:

  - `{arrayBuffer: arrayBuffer}`, where `arrayBuffer` is an array buffer containing a .docx file.

- `options` (optional): options for the conversion. May have the following properties:

  - `styleMap`: controls the mapping of Word styles to HTML. If `options.styleMap` is a string, each line is treated as a separate style mapping, ignoring blank lines and lines starting with `#`: If `options.styleMap` is an array, each element is expected to be a string representing a single style mapping. See ["Writing style maps"](https://github.com/mwilliamson/mammoth.js#writing-style-maps) for a reference to the syntax for style maps.
  - `includeEmbeddedStyleMap`: by default, if the document contains an embedded style map, then it is combined with the default style map. To ignore any embedded style maps, set `options.includeEmbeddedStyleMap` to `false`.
  - `includeDefaultStyleMap`: by default, the style map passed in `styleMap` is combined with the default style map. To stop using the default style map altogether, set `options.includeDefaultStyleMap` to `false`.
  - `convertImage`: by default, images are converted to `<img>` elements with the source included inline in the `src` attribute. Set this option to an [image converter](https://github.com/mwilliamson/mammoth.js#image-converters) to override the default behaviour.
  - `ignoreEmptyParagraphs`:  за замовчуванням порожні абзаци ігноруються. Встановіть для цього параметра значення `false`, щоб зберегти порожні абзаци у виводі.
  - `idPrefix`: рядок, який додається до будь-яких згенерованих ідентифікаторів, таких як ті, що використовуються закладками, виносками та кінцевими примітками. За замовчуванням порожній рядок.
  - `transformDocument`: якщо встановлено, ця функція застосовується до документа, зчитаного з файлу docx перед перетворенням у HTML. API для перетворення документів слід вважати нестабільним. Перегляньте [перетворення документів](https://github.com/mwilliamson/mammoth.js#document-transforms).

- Returns a promise containing a result. This result has the following properties:

  - `value`: the generated HTML
  - `messages`: any messages, such as errors and warnings, generated during the conversion

#### `mammoth.convertToMarkdown(input, options)`

Markdown support is deprecated. Generating HTML and using a separate library to convert the HTML to Markdown is recommended, and is likely to produce better results.

Converts the source document to Markdown. This behaves the same as `convertToHtml`, except that the `value` property of the result contains Markdown rather than HTML.

#### `mammoth.extractRawText(input)`

Витягніть необроблений текст документа. Це проігнорує все форматування в документі. Після кожного абзацу йдуть два нові рядки.

- `input`: об'єкт, що описує вихідний документ. У node.js підтримуються такі введення:

   - `{path: path}`, де `path` – це шлях до файлу .docx.
   - `{buffer: buffer}`, де `buffer` - це буфер node.js, що містить файл .docx.

   У браузері підтримуються такі введення:

   - `{arrayBuffer: arrayBuffer}`, де `arrayBuffer` — це буфер масиву, що містить файл .docx.

- Повертає обіцянку, що містить результат. Цей результат має такі властивості:

   - `value`: необроблений текст
   - `messages`: будь-які повідомлення, такі як помилки та попередження

#### `mammoth.embedStyleMap(input, styleMap)`

Враховуючи наявний файл docx, `embedStyleMap` створить новий файл docx із вбудованою переданою картою стилів. Коли Mammoth зчитує новий файл docx, він використовуватиме вбудовану карту стилів.

- `input`: an object describing the source document. On node.js, the following inputs are supported:

  - `{path: path}`, where `path` is the path to the .docx file.
  - `{buffer: buffer}`, where `buffer` is a node.js Buffer containing a .docx file.

  In the browser, the following inputs are supported:

  - `{arrayBuffer: arrayBuffer}`, where `arrayBuffer` is an array buffer containing a .docx file.

- `styleMap`: the style map to embed.

- Returns a promise. Call `toArrayBuffer()` on the value inside the promise to get an `ArrayBuffer` representing the new document. Call `toBuffer()` on the value inside the promise to get a `Buffer` representing the new document.

For instance:

```
mammoth.embedStyleMap({path: sourcePath}, "p[style-name='Section Title'] => h1:fresh")
    .then(function(docx) {
        fs.writeFile(destinationPath, docx.toBuffer(), callback);
    });
```

#### Messages

Кожне повідомлення має такі властивості:

- `type`: рядок, що представляє тип повідомлення, наприклад `"warning"` або `"error"`
- `message`: рядок, що містить фактичне повідомлення
- `error` (необов'язкова): викликана виняткова ситуація, яка спричинила це повідомлення, якщо така є

#### Image converters

Конвертер зображень можна створити, викликавши `mammoth.images.imgElement(func)`. Це створює елемент `<img>` для кожного зображення в оригінальному docx. `func` має бути функцією, яка має один аргумент `image`. Цей аргумент є елементом зображення, який перетворюється, і має такі властивості:

- `contentType`: the content type of the image, such as `image/png`.
- `readAsArrayBuffer()`: read the image file as an `ArrayBuffer`. Returns a promise of an `ArrayBuffer`.
- `readAsBuffer()`: read the image file as a `Buffer`. Returns a promise of a `Buffer`. This is not supported in browsers unless a `Buffer` polyfill has been used.
- `readAsBase64String()`: read the image file as a base64-encoded string. Returns a promise of a `string`.
- `read([encoding])` (deprecated): read the image file with the specified encoding. If an encoding is specified, a promise of a `string` is returned. If no encoding is specified, a promise of a `Buffer` is returned.

`func` should return an object (or a promise of an object) of attributes for the `<img>` element. At a minimum, this should include the `src` attribute. If any alt text is found for the image, this will be automatically added to the element's attributes.

For instance, the following replicates the default image conversion:

```js
mammoth.images.imgElement(function(image) {
    return image.readAsBase64String().then(function(imageBuffer) {
        return {
            src: "data:" + image.contentType + ";base64," + imageBuffer
        };
    });
})
```

`mammoth.images.dataUri` is the default image converter.

### Document transforms

**API для перетворення документа слід вважати нестабільним і може змінюватися між будь-якими версіями. Якщо ви покладаєтеся на таку поведінку, вам слід закріпити певну версію mammoth.js і ретельно перевірити перед оновленням.**

Mammoth дозволяє трансформувати документ перед його перетворенням. Наприклад, припустімо, що цей документ не має семантичної розмітки, але ви знаєте, що будь-який абзац, вирівняний по центру, має бути заголовком. Ви можете використовувати аргумент `transformDocument`, щоб належним чином змінити документ:

```js
function transformElement(element) {
    if (element.children) {
        var children = _.map(element.children, transformElement);
        element = {...element, children: children};
    }

    if (element.type === "paragraph") {
        element = transformParagraph(element);
    }

    return element;
}

function transformParagraph(element) {
    if (element.alignment === "center" && !element.styleId) {
        return {...element, styleId: "Heading2"};
    } else {
        return element;
    }
}

var options = {
    transformDocument: transformElement
};
```

Сказане вище можна написати більш стисло за допомогою помічника `mammoth.transforms.paragraph`:

```js
function transformParagraph(element) {
    if (element.alignment === "center" && !element.styleId) {
        return {...element, styleId: "Heading2"};
    } else {
        return element;
    }
}

var options = {
    transformDocument: mammoth.transforms.paragraph(transformParagraph)
};
```

Або якщо ви хочете абзаци, які були явно налаштовані на використання моноширинних шрифтів для представлення коду:

```js
const monospaceFonts = ["consolas", "courier", "courier new"];

function transformParagraph(paragraph) {
    var runs = mammoth.transforms.getDescendantsOfType(paragraph, "run");
    var isMatch = runs.length > 0 && runs.every(function(run) {
        return run.font && monospaceFonts.indexOf(run.font.toLowerCase()) !== -1;
    });
    if (isMatch) {
        return {
            ...paragraph,
            styleId: "code",
            styleName: "Code"
        };
    } else {
        return paragraph;
    }
}

var options = {
    transformDocument: mammoth.transforms.paragraph(transformParagraph),
    styleMap: [
        "p[style-name='Code'] => pre:separator('\n')"
    ]
};
```

#### `mammoth.transforms.paragraph(transformParagraph)`

Returns a function that can be used as the `transformDocument` option. This will apply the function `transformParagraph` to each paragraph element. `transformParagraph` should return the new paragraph.

#### `mammoth.transforms.run(transformRun)`

Returns a function that can be used as the `transformDocument` option. This will apply the function `transformRun` to each run element. `transformRun` should return the new run.

#### `mammoth.transforms.getDescendants(element)`

Gets all descendants of an element.

#### `mammoth.transforms.getDescendantsOfType(element, type)`

Gets all descendants of a particular type of an element. For instance, to get all runs within an element `paragraph`:

```
var runs = mammoth.transforms.getDescendantsOfType(paragraph, "run");
```

## Writing style maps

A style map is made up of a number of style mappings separated by new lines. Blank lines and lines starting with `#` are ignored.

A style mapping has two parts:

- On the left, before the arrow, is the document element matcher.
- On the right, after the arrow, is the HTML path.

When converting each paragraph, Mammoth finds the first style mapping where the document element matcher matches the current paragraph. Mammoth then ensures the HTML path is satisfied.

### Freshness

When writing style mappings, it's helpful to understand Mammoth's notion of freshness. When generating, Mammoth will only close an HTML element when necessary. Otherwise, elements are reused.

For instance, suppose one of the specified style mappings is `p[style-name='Heading 1'] => h1`. If Mammoth encounters a .docx paragraph with the style name `Heading 1`, the .docx paragraph is converted to a `h1` element with the same text. If the next .docx paragraph also has the style name `Heading 1`, then the text of that paragraph will be appended to the *existing* `h1` element, rather than creating a new `h1` element.

In most cases, you'll probably want to generate a new `h1` element instead. You can specify this by using the `:fresh` modifier:

```
p[style-name='Heading 1'] => h1:fresh
```

The two consecutive `Heading 1` .docx paragraphs will then be converted to two separate `h1` elements.

Reusing elements is useful in generating more complicated HTML structures. For instance, suppose your .docx contains asides. Each aside might have a heading and some body text, which should be contained within a single `div.aside` element. In this case, style mappings similar to `p[style-name='Aside Heading'] => div.aside > h2:fresh` and `p[style-name='Aside Text'] => div.aside > p:fresh` might be helpful.

### Document element matchers

#### Paragraphs, runs and tables

Match any paragraph:

```
p
```

Match any run:

```
r
```

Match any table:

```
table
```

To match a paragraph, run or table with a specific style, you can reference the style by name. This is the style name that is displayed in Microsoft Word or LibreOffice. For instance, to match a paragraph with the style name `Heading 1`:

```
p[style-name='Heading 1']
```

You can also match a style name by prefix. For instance, to match a paragraph where the style name starts with `Heading`:

```
p[style-name^='Heading']
```

Styles can also be referenced by style ID. This is the ID used internally in the .docx file. To match a paragraph or run with a specific style ID, append a dot followed by the style ID. For instance, to match a paragraph with the style ID `Heading1`:

```
p.Heading1
```

#### Bold

Match explicitly bold text:

```
b
```

Note that this matches text that has had bold explicitly applied to it. It will not match any text that is bold because of its paragraph or run style.

#### Italic

Match explicitly italic text:

```
i
```

Note that this matches text that has had italic explicitly applied to it. It will not match any text that is italic because of its paragraph or run style.

#### Underline

Match explicitly underlined text:

```
u
```

Note that this matches text that has had underline explicitly applied to it. It will not match any text that is underlined because of its paragraph or run style.

#### Strikethough

Match explicitly struckthrough text:

```
strike
```

Note that this matches text that has had strikethrough explicitly applied to it. It will not match any text that is struckthrough because of its paragraph or run style.

#### All caps

Match explicitly all caps text:

```
all-caps
```

Note that this matches text that has had all caps explicitly applied to it. It will not match any text that is all caps because of its paragraph or run style.

#### Small caps

Match explicitly small caps text:

```
small-caps
```

Note that this matches text that has had small caps explicitly applied to it. It will not match any text that is small caps because of its paragraph or run style.

#### Ignoring document elements

Use `!` to ignore a document element. For instance, to ignore any paragraph with the style `Comment`:

```
p[style-name='Comment'] => !
```

### HTML paths

#### Single elements

The simplest HTML path is to specify a single element. For instance, to specify an `h1` element:

```
h1
```

To give an element a CSS class, append a dot followed by the name of the class:

```
h1.section-title
```

To require that an element is fresh, use `:fresh`:

```
h1:fresh
```

Modifiers must be used in the correct order:

```
h1.section-title:fresh
```

#### Separators

To specify a separator to place between the contents of paragraphs that are collapsed together, use `:separator('SEPARATOR STRING')`.

For instance, suppose a document contains a block of code where each line of code is a paragraph with the style `Code Block`. We can write a style mapping to map such paragraphs to `<pre>` elements:

```
p[style-name='Code Block'] => pre
```

Since `pre` isn't marked as `:fresh`, consecutive `pre` elements will be collapsed together. However, this results in the code all being on one line. We can use `:separator` to insert a newline between each line of code:

```
p[style-name='Code Block'] => pre:separator('\n')
```

#### Nested elements

Use `>` to specify nested elements. For instance, to specify `h2` within `div.aside`:

```
div.aside > h2
```

You can nest elements to any depth.

## Acknowledgements

Thanks to the following people for their contributions to Mammoth:

- [Craig Leinoff](https://github.com/Offlein):
  - Document transforms
- [John McLear](https://github.com/JohnMcLear):
  - Underline support
- [Chris Price](https://github.com/studiochris):
  - node.js `Buffer` support
  - UTF8 BOM handling
- [Stoo Goff](https://github.com/stoogoff)
  - Markdown support
- [Andreas Lubbe](https://github.com/alubbe)
  - Internal hyperlink support
- [Jacob Wang](https://github.com/jaceyshome)
  - Supporting styles defined without names