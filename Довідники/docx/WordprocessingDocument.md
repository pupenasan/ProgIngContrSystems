http://officeopenxml.com/WPdocument.php

# WordprocessingML Content Overview

http://officeopenxml.com/WPcontentOverview.php

Документ WordprocessingML — це пакет, що містить кілька різних частин, переважно файлів XML. Однак більшу частину фактичного вмісту можна знайти в основній частині документа. І цей вміст здебільшого складається з абзаців і таблиць.

### Paragraphs

Абзац (`<w:p>`) є основною одиницею вмісту на рівні блоку. Тобто це поділ контенту, який починається з нового рядка. Зазвичай складається з двох частин. Спочатку оголошується форматування (або властивості) абзацу, а потім вміст.

Форматування можна оголошувати безпосередньо («цей абзац має бути відцентрованим») або його можна оголошувати опосередковано, посилаючись на стиль («цей абзац має використовувати стиль X, який розміщує абзаци по центру»). Або це може бути комбінація обох. Форматування абзацу входить до `<w:pPr>`.

Вміст абзацу міститься в одному або кількох **runs** (`<w:r>`). runs – це неблоковий вміст; вони визначають області тексту, які не обов'язково починаються з нового рядка. Подібно до абзаців, вони складаються з визначення форматування/властивостей, після чого йде вміст. Форматування вказується в `<w:rPr>` і може бути прямим форматуванням, непрямим форматуванням через посилання на стиль або обома.

run можна розділити на менші runs або об’єднати, якщо вони мають однакові властивості. Так, наприклад, якщо речення містить одне слово, виділене напівжирним шрифтом, то речення має бути розбито на кілька runs, щоб врахувати напівжирні та ненапівжирні компоненти речення.

Вміст run складається здебільшого з текстових елементів (`<w:t>`), які самі по собі містять фактичні символьні дані, які складають прочитаний вміст. run також може містити розриви, вкладки, символи, зображення та поля. Нижче наведено зразок дуже простого парагафа.

```xml
<w:p>
    <w:pPr>
        <w:jc w:val="center">
            <w:pPr>
                <w:r>
                    <w:rPr>
                        <w:b/>
                    </w:rPr>
                    <w:t>This is text.</w:t>
                </w:r>
                </w:p>
```

У наведеному вище прикладі та майже в усіх зразках XML, які ви побачите на цьому сайті, виключено необов’язкову інформацію, яку можна додати для відстеження сеансів редагування. Така інформація, як правило, у формі атрибутів, захаращує XML, який ви побачите, дивлячись на базові XML-документи Word. Це опущено тут для ясності. Приклад показано нижче.

```xml
<w:p w:rsidR="00D57EDE" w:rsidRDefault="00D57EDE">
. . .
</w:p>
```

### Tables

Таблиці — ще один тип вмісту на рівні блоку. Таблиця складається з рядків і стовпців. Специфікація таблиці (`<w:tbl>`) може бути розбита на три частини. Подібно до абзаців і runs, спочатку є властивості, а для таблиць вони визначені в `<w:tblPr>`.

Проте, на відміну від абзаців і рядків, вміст таблиці поділяється на рядки, і жодні два рядки не повинні мати однакову кількість стовпців. Це додає рівень складності до визначення таблиці. WordprocessingML вирішує цю проблему, визначаючи «сітку» для таблиці в `<w:tblGrid>`. Це визначення сітки таблиці є другою частиною визначення таблиці.

# Wordprocessing - Sample Document

Нижче у правому стовпці наведено вміст файлу document.xml для зразка документа, показаного в лівому стовпці.

Оголошення кореневого елемента та простору імен:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:ve="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"> 
```

Наступний фрагмент

![wp-docSamp-part1](E:\san\AKIT\ДИСЦИП\Програмна інженерія\GitVersion\Довідники\docx\media\wp-docSamp-part1.gif)

матиме вигляд

```xml
<w:body>
    <w:p>
        <w:pPr>
            <w:pStyle w:val="Heading1"/>
        </w:pPr>
        <w:r><w:t>Introduction</w:t></w:r>
    </w:p>
    <w:p>
        <w:r><w:t xml:space="preserve">My children love many nursery rhymes and childhood songs</w:t></w:r>
    </w:p>
    <w:p>
        <w:pPr>
            <w:pStyle w:val="Heading1"/>
        </w:pPr>
        <w:r><w:t>Favorites</w:t></w:r>
    </w:p>
    <w:p>
        <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
        <w:r><w:t>Humpty Dumpty</w:t></w:r>
    </w:p>
    <w:p>
        <w:r><w:t xml:space="preserve">None are more beloved than </w:t></w:r>
        <w:r><w:rPr><w:b/></w:rPr><w:t>Humpty Dumpty</w:t></w:r>
        <w:r><w:t xml:space="preserve">.</w:t></w:r>
    </w:p>
    <w:p>
        <w:pPr>
            <w:spacing w:before="120" w:after="120"/>
            <w:ind w:left="720" w:right="720"/>
        	<w:rPr><w:sz w:val="18"/></w:rPr>
        </w:pPr>
        <w:r>
            <w:rPr><w:sz w:val="18"/></w:rPr>
            <w:t xml:space="preserve">Humpty Dumpty sat on a wall. </w:t>
        </w:r>
. . .
</w:p>

```



![wp-docSamp-part2](E:\san\AKIT\ДИСЦИП\Програмна інженерія\GitVersion\Довідники\docx\media\wp-docSamp-part2.gif)

матиме вигляд

```xml

<w:p>
<w:pPr>
<w:pStyle w:val="Heading2"/>
</w:pPr>
<w:r><w:t>Others</w:t></w:r>
</w:p>
<w:p>
<w:r><w:t>My kids also like the following.</w:t></w:r>
</w:p>
<w:p>
<w:pPr>
<w:pStyle w:val="ListParagraph"/>
<w:numPr>
<w:ilvl w:val="0"/>
<w:numId w:val="1"/>
</w:numPr><w:ind w:left="1080"/>
</w:pPr>
<w:r><w:t>Dr. Seuss' "The Foot Book"</w:t></w:r>
</w:p>
<w:p>
<w:pPr>
<w:pStyle w:val="ListParagraph"/>
<w:numPr>
<w:ilvl w:val="0"/>
<w:numId w:val="1"/>
</w:numPr>
<w:ind w:left="1080"/>
</w:pPr>
<w:r><w:t>All things Sesame Street</w:t></w:r>
</w:p>
<w:p>
<w:pPr>
<w:pStyle w:val="ListParagraph"/>
<w:numPr>
<w:ilvl w:val="1"/>
<w:numId w:val="2"/>
</w:numPr>
<w:ind w:left="1800"/>
</w:pPr>
<w:r><w:t>Elmo's Song</w:t></w:r>
</w:p>
<w:p>
<w:pPr>
<w:pStyle w:val="ListParagraph"/>
<w:numPr>
<w:ilvl w:val="1"/>
<w:numId w:val="2"/>
</w:numPr>
<w:ind w:left="1800"/>
</w:pPr>
<w:r><w:t xml:space="preserve">Abby Cadabby </w:t></w:r>
</w:p>

```



![wp-docSamp-part3](E:\san\AKIT\ДИСЦИП\Програмна інженерія\GitVersion\Довідники\docx\media\wp-docSamp-part3.gif)

матиме вигляд

```xml

<w:p>
<w:pPr>
<w:pStyle w:val="Heading1"/>
</w:pPr>
<w:r><w:t>Curious George</w:t></w:r>
</w:p>
<w:p>
<w:r><w:t>This is a table of related pleasures.</w:t></w:r>
</w:p>
<w:tbl>
<w:tblPr>
<w:tblStyle w:val="TableGrid"/>
<w:tblW w:w="0" w:type="auto"/>
<w:tblLook w:val="04A0"/>
</w:tblPr>
<w:tblGrid>
<w:gridCol w:w="2448"/>
<w:gridCol w:w="2880"/>
<w:gridCol w:w="1800"/>
</w:tblGrid>
<w:tr>
<w:tc>
<w:tcPr>
<w:tcW w:w="2448" w:type="dxa"/>
<w:shd w:val="clear" w:color="auto" w:fill="D6E3BC" w:themeFill="accent3" w:themeFillTint="66"/>
</w:tcPr>
<w:p>
<w:pPr>
<w:jc w:val="center"/>
<w:rPr>
<w:b/>
</w:rPr>
</w:pPr>
<w:r>
<w:rPr>
<w:b/>
</w:rPr>
<w:t>Characters</w:t>
</w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="2880" w:type="dxa"/>
<w:shd w:val="clear" w:color="auto" w:fill="D6E3BC" w:themeFill="accent3" w:themeFillTint="66"/>
</w:tcPr>
<w:p>
<w:pPr>
<w:jc w:val="center"/>
<w:rPr>
<w:b/>
</w:rPr>
</w:pPr>
<w:r>
<w:rPr>
<w:b/>
</w:rPr>
<w:t>Stories</w:t>
</w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="1800" w:type="dxa"/>
<w:shd w:val="clear" w:color="auto" w:fill="D6E3BC" w:themeFill="accent3" w:themeFillTint="66"/>
</w:tcPr>
<w:p >
<w:pPr>
<w:jc w:val="center"/>
<w:rPr>
<w:b/>
</w:rPr>
</w:pPr>
<w:r>
<w:rPr>
<w:b/>
</w:rPr>
<w:t>Times Read</w:t>
</w:r>
</w:p>
</w:tc>
</w:tr>
<w:tr>
<w:tc>
<w:tcPr>
<w:tcW w:w="2448" w:type="dxa"/>
</w:tcPr>
<w:p>
<w:r><w:t>George</w:t></w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="2880" w:type="dxa"/>
</w:tcPr>
<w:p>
<w:r><w:t>George Goes to Zoo</w:t></w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="1800" w:type="dxa"/>
<w:vMerge w:val="restart"/>
<w:vAlign w:val="center"/>
</w:tcPr>
<w:p>
<w:pPr>
<w:jc w:val="center"/>
</w:pPr>
<w:r><w:t>Indeterminate</w:t></w:r>
</w:p>
</w:tc>
</w:tr>
<w:tr>
<w:tc>
<w:tcPr>
<w:tcW w:w="2448" w:type="dxa"/>
</w:tcPr>
<w:p>
<w:r><w:t>Man with yellow hat</w:t></w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="2880" w:type="dxa"/>
</w:tcPr>
<w:p>
<w:r><w:t>George Rides a Bike</w:t></w:r>
</w:p>
</w:tc>
<w:tc>
<w:tcPr>
<w:tcW w:w="1800" w:type="dxa"/>
<w:vMerge/>
</w:tcPr>
<w:p/>
</w:tc>
</w:tr>
</w:tbl>

```

Section properties and closing tags

```xml
<w:sectPr>
<w:footerReference w:type="default" r:id="rId7"/>
<w:pgSz w:w="12240" w:h="15840"/>
<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
<w:cols w:space="720"/>
<w:docGrid w:linePitch="360"/>
</w:sectPr>
</w:body>
</w:document>
```



# Wordprocessing Document

The `<w:document>` element is the root element of the main content part.

```xml
<w:document>
<w:body>
<w:p/>
</w:body>
</w:document>
```

**Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference §§ 17.2.3.

## Elements:

The `<w:document>` element can contain the elements below.

### background

Specifies the background for every page of the document. The  background can be either an DrawingML object or a sold color. If it is a DrawingML     object, then the background element contains a drawing element. If a solid color     is used, then background is an empty element, with the color specified in the following attributes.

| Attribute  | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| color      | Specifies the color. Possible values are either hex-encoded RGB values (in RRGGBB format) or auto. E.g.,                `<w:background w:color="2C34FF"/>` |
| themeColor | Specifies the base theme color (which is specified in the Theme part). E.g.,                `<w:background w:themeColor="accent5"/>` |
| themeShade | Specifies the shade value applied to the theme color (in hex encoding of values 0-255). E.g.,                `<w:background w:themeColor="accent2" w:themeShade="BF"/>` |
| themeTint  | Specifies the tint value applied to the theme color (in hex encoding of values 0-255). E.g.,                `<w:background w:themeColor="accent2" w:themeTint="99"/>` |

**Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference § 17.2.1.

### body

Specifies the contents of the body of the document. It has no  attributes. It can contain a number of elements, most related to  tracking     changes and adding customer XML. The core elements are listed below.

#### Elements:

| Element | Description                                                  |
| ------- | ------------------------------------------------------------ |
| p       | Specifies a paragraph of content. See [Paragraphs](http://officeopenxml.com/WPparagraph.php).        **Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference § 17.3.1.22. |
| sectPr  | Specifies the section properties for the final section. See [Sections](http://officeopenxml.com/WPsection.php).        **Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference § 17.6.17. |
| tbl     | Specifies a table. See [Tables](http://officeopenxml.com/WPtable.php).        **Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference § 17.4.38. |

**Reference:**  ECMA-376, 3rd Edition (June, 2011), Fundamentals and Markup Language Reference § 17.2.2.

## Attributes

`<w:document>` has a single attribute:

### conformance

Specifies the conformance class to which the document conforms. Possible values are:

- strict - the document conforms to Office Open XML Strict
- transitional - the document conforms to Office Open XML Transitional. This is the default value.

### Related HTML element:

```xml
<html>
<head>
...
</head>
<body>
...
</body>
</html>
```

