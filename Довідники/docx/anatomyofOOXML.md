# Anatomy of a  WordProcessingML  File

http://officeopenxml.com/anatomyofOOXML.php

# Структура пакета

Файл WordprocessingML або docx — це файл zip (пакет), що містить кілька «parts(частин)» — зазвичай XML-файли з кодуванням UTF-8 або UTF-16, хоча суворо визначені, частина — це потік байтів. Пакет також може містити інші мультимедійні файли, наприклад зображення та відео. Структуру організовано відповідно до [конвенцій щодо відкритого пакування](http://officeopenxml.com/whatIsOOXML.php).

Ви можете переглянути файлову структуру та файли, просто перейменувавши будь-який файл docx у файл zip і розархівувавши файл.

  ![WordprocessingML file structure](media/zipFile1.gif)

# Content Types

Кожен пакет повинен мати `[Content_Types].xml`, який знаходиться в корені пакета. Цей файл містить список усіх типів вмісту частин (parts) у пакеті. Кожна частина та її тип має бути вказано в `[Content_Types].xml`. Нижче наведено тип вмісту для основної частини документа:

```xml
<Override  PartName="/word/document.xml" 
          ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>    
```

Важливо пам’ятати про це, додаючи нові частини до пакету.

# Залежності (Relationships)

Кожен пакет містить частину залежності(Relationships), яка визначає зв’язки між іншими частинами та ресурсами поза пакетом. Це відокремлює зв’язки від вмісту та дозволяє легко змінювати зв’язки без зміни джерел, які посилаються на цілі.

![package relationships part](media/zipFile2.gif)

Для пакета OOXML у папці `_rels` завжди є частина залежностей (`.rels`), яка визначає початкові частини пакета або залежності пакета. Наприклад, наступне визначає ідентичність початкової частини для вмісту:

```xml
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"    Target="word/document.xml"/>.
```

Також зазвичай існують зв’язки в межах .rels для app.xml і core.xml.

На додаток до частини зв’язків для пакета, кожна частина, яка є джерелом одного або кількох зв’язків, матиме власну частину зв’язків. Кожна така частина зв’язку міститься у підпапці `_rels` цієї частини та отримує назву шляхом додавання «.rels» до назви частини. Зазвичай частина основного вмісту (document.xml) має власну частину заелжностей. Він міститиме залежності з іншими частинами вмісту, такими як styles.xml, themes,xml і footer.xml, а також URI для зовнішніх посилань.

![document relationships part](media/zipFile3.gif)

Залежності можуть бути явними або неявними. Для явних залежностей посилання на ресурс здійснюється за допомогою атрибута Id елемента `<Relationship>`. Тобто ідентифікатор у джерелі безпосередньо відображається на ідентифікатор елемента зв’язку з явним посиланням на ціль.

Наприклад, документ може містити таке гіперпосилання:

```xml
<w:hyperlink r:id="rId4">
```

`r:id="rId4"` посилається на наступну залежність у частині залежностей для документа (document.xml.rels).

```xml
<Relationship Id="rId4" Type="http://. . ./hyperlink" Target="http://www.google.com/" TargetMode="External"/>
```

Для неявної залежності такого прямого посилання на ідентифікатор `<Relationship>` немає. Натомість розуміється посилання. Наприклад, документ може містити посилання на виноску, як показано нижче.

```xml
<w:footnoteReference r:id="2">
```

У цьому випадку посилання на виноску з `w:id="2"` мається на увазі в частині Footnotes , яка існує, коли є виноски. У частині Footnotes ми побачимо наступне.

```xml
<w:footnote w:id="2">
```

# Частини, специфічні для документів WordprocessingML

Нижче наведено список можливих частин пакета WordprocessingML, які стосуються документів WordprocessingML. Майте на увазі, що документ може містити лише кілька з цих частин. Наприклад, якщо в документі немає виносок, частина виносок не буде включена в пакет.

| Part                  | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| Comments              | Містить коментарі до документа. Може бути частина коментарів для основного документа та одна для глосарію, якщо глосарій є. |
| Document Settings     | Визначає параметри для документа, зокрема такі речі, як приховування орфографічних і граматичних помилок, відстеження редакцій, захист від запису тощо. Може бути частина налаштувань документа для основного документа та одна для глосарію, якщо глосарій є. |
| Endnotes              | Містить кінцеві примітки для документа. Може бути частина кінцевих приміток для основного документа та одна для глосарію, якщо глосарій є. |
| Font Table            | Вказує інформацію про шрифти, які використовуються в документі. Програма використовуватиме інформацію в частині, щоб визначити, які шрифти використовувати для відображення документа, коли вказані шрифти недоступні в системі. Може бути таблиця шрифтів для основного документа та одна для глосарію, якщо глосарій є. |
| Footer                | Містить інформацію для [нижнього колонтитула](http://officeopenxml.com/WPfooters.php). Зауважте, що кожен [розділ](http://officeopenxml.com/WPsection.php) документа може містити нижній колонтитул для першої сторінки, непарних і парних сторінок. Тому може бути кілька частин нижнього колонтитула, залежно від кількості розділів у мережі документа та типів нижніх колонтитулів для розділів. |
| Footnotes             | Містить виноски до документа. Можуть бути частина виносок для основного документа та одна для глосарію, якщо глосарій є. |
| Glossary              | Це додаткове місце зберігання документів, яке може містити вміст, який передається разом із документом, але не видно з вмісту основного документа. Призначений для зберігання необов'язкових фрагментів документів. Дозволяється тільки один. |
| Header                | Містить інформацію для [заголовка](http://officeopenxml.com/WPheaders.php). Зверніть увагу, що кожен [розділ](http://officeopenxml.com/WPsection.php) документа може містити заголовок для першої сторінки, непарних і парних сторінок. Тому може бути кілька частин заголовка, залежно від кількості розділів у мережі документа та типів заголовків для розділів. |
| Main Document         | Містить тіло документа.                                      |
| Numbering Definitions | Містить визначення для [структури кожного визначення нумерації](http://officeopenxml.com/WPnumbering.php) у документі. Може бути частина нумерації визначень для основного документа та одна для глосарію, якщо глосарій є. |
| Style Definitions     | Містить визначення для набору [стилів](http://officeopenxml.com/WPstyles.php), які використовуються в документі. Може бути частина визначень стилів для основного документа та одна для глосарію, якщо глосарій є. |
| Web Settings          | Містить визначення веб-параметрів, які використовуються в документі. Ці параметри визначають дві категорії: параметри, пов’язані з документами HTML (тобто визначення набору фреймів), які можна використовувати в документах WordprocessingML, і параметри, які впливають на те, як документ обробляється під час збереження у форматі HTML. Може бути частина веб-налаштувань для основного документа та одна для глосарію, якщо глосарій є. |

# Parts Shared by Other OOXML Documents

There are a number of part types that may appear in any OOXML  package.  Below are some of the more relevant parts for WordprocessingML documents.

| Part                                                       | Description                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Embedded package                                           | Contains a complete package, either internal or external to  the referencing package.  For example, a WordprocessingML document might contain a spreadsheet or presentation document. |
| Extended File Properties (often found at docProps/app.xml) | Contains properties specific to an OOXML document--properties such as the template used, the number of pages and words, and the  application name and version. |
| File Properties, Core                                      | Core file properties enable the user to discover and set  common properties within a package--properties such as creator name,  creation date, title. [Dublin Core](http://dublincore.org/) properties (a set of metadate terms used to describe resources) are used whenever possible. |
| Font                                                       | Contains a font embedded directly into the document. Fonts  can be stored as either bitmapped font in which each glyph is stored as a raster image, or in a format conforming to ISO/IEC 14496-22:2007. |
| Image                                                      | Documents often contain images.  An image can be stored in a  package as a zip item.  The item must be identified by an image part  relationship and the appropriate content type. |
| Theme                                                      | DrawingML is a shared language across the OOXML document  types. It includes a theme part that is included in WordprocessingML  documents when the document uses a theme. The theme part contains  information about a document's theme, that is, such information as the  color scheme, font and format schemes. |