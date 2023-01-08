# Розширення Google Docs

https://developers.google.com/apps-script/guides/docs

Сценарій Google Apps дозволяє програмно створювати та змінювати Документи Google, а також налаштовувати інтерфейс користувача за допомогою нових меню, діалогових вікон і бічних панелей.

## Основи

Apps Script може взаємодіяти з Google Docs двома широкими способами: будь-який сценарій може створювати або змінювати документ, якщо користувач сценарію має відповідні дозволи для документа, і сценарій також можна [прив’язати](https://developers.google.com/apps-script/scripts_containers) до документа, що надає сценарію спеціальні можливості для зміни інтерфейсу користувача або відповіді, коли документ відкривається. Щоб створити прив’язаний до контейнера сценарій із Документів Google, натисніть **Розширення** > **Apps Script**.

У будь-якому випадку взаємодіяти з документом Google через  [Document Service](https://developers.google.com/apps-script/reference/document) просто, як показано в наведеному нижче прикладі.

```js
function createDoc() {
  var doc = DocumentApp.create('Sample Document');
  var body = doc.getBody();
  var rowsData = [['Plants', 'Animals'], ['Ficus', 'Goat'], ['Basil', 'Cat'], ['Moss', 'Frog']];
  body.insertParagraph(0, doc.getName())
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);
  table = body.appendTable(rowsData);
  table.getRow(0).editAsText().setBold(true);
}
```

Наведений вище сценарій створює новий документ на Диску Google користувача, потім вставляє абзац, який містить той самий текст, що й назва документа, стилізує цей абзац як заголовок і додає таблицю на основі значень у двовимірному масиві. Сценарій міг би так само легко внести ці зміни в існуючий документ, замінивши виклик на  [`DocumentApp.create()`](https://developers.google.com/apps-script/reference/document/document-app#create(String))  за допомогою  [`DocumentApp.openById()`](https://developers.google.com/apps-script/reference/document/document-app#openById(String))  або [`openByUrl()`](https://developers.google.com/apps-script/reference/document/document-app#openByUrl(String)). Для сценаріїв, створених усередині документа (прив’язаного до контейнера), використовуйте [`DocumentApp.getActiveDocument()`](https://developers.google.com/apps-script/reference/document/document-app#getActiveDocument()).

## Structure of a document

From Apps Script's perspective, a Google Doc is structured much like an HTML document—that is, a Google Doc is composed of elements (like a [`Paragraph`](https://developers.google.com/apps-script/reference/document/paragraph) or [`Table`](https://developers.google.com/apps-script/reference/document/table)) that often contain other elements. Most scripts that modify a Google Doc begin with a call to [`getBody()`](https://developers.google.com/apps-script/reference/document/document#getBody()), because the [`Body`](https://developers.google.com/apps-script/reference/document/body) is a master element that contains all other elements except for the [`HeaderSection`](https://developers.google.com/apps-script/reference/document/header-section), [`FooterSection`](https://developers.google.com/apps-script/reference/document/footer-section), and any [`Footnotes`](https://developers.google.com/apps-script/reference/document/footnote).

However, there are rules about which types of elements can contain other types. Furthermore, the Document Service in Apps Script can only insert certain types of elements. The tree below shows which elements can be contained by a certain type of element.

Elements shown in bold can be inserted; non-bold elements can only be manipulated in place.

```yaml
    Document
        Body
            ListItem
                Equation
                    EquationFunction
                        EquationFunction...
                        EquationFunctionArgumentSeparator
                        EquationSymbol
                        Text
                    EquationSymbol
                    Text
                Footnote
                HorizontalRule
                InlineDrawing
                InlineImage
                PageBreak
                Text
            Paragraph
                Equation
                    EquationFunction
                        EquationFunction...
                        EquationFunctionArgumentSeparator
                        EquationSymbol
                        Text
                    EquationSymbol
                    Text
                Footnote
                HorizontalRule
                InlineDrawing
                InlineImage
                PageBreak
                Text
            Table
                TableRow
                    TableCell
                        Paragraph...
                        ListItem...
                        Table...
            TableOfContents
                Paragraph...
                ListItem...
                Table...
        HeaderSection
            ListItem
                HorizontalRule
                InlineDrawing
                InlineImage
                Text
                UnsupportedElement (page number, etc.)
            Paragraph
                HorizontalRule
                InlineDrawing
                InlineImage
                Text
                UnsupportedElement (page number, etc.)
            Table
                TableRow
                    TableCell
                        Paragraph...
                        ListItem...
                        Table...
        FooterSection
            ListItem
                HorizontalRule
                InlineDrawing
                InlineImage
                Text
                UnsupportedElement (page number, etc.)
            Paragraph
                HorizontalRule
                InlineDrawing
                InlineImage
                Text
                UnsupportedElement (page number, etc.)
            Table
                TableRow
                    TableCell
                        Paragraph...
                        ListItem...
                        Table...
        FootnoteSection
            ListItem
                HorizontalRule
                Text
            Paragraph
                HorizontalRule
                Text
```

## Заміна тексту

Apps Script часто використовується для заміни тексту в документах Google. Припустімо, у вас є електронна таблиця, повна інформації про клієнта, і ви хочете створити персоналізований документ Google для кожного клієнта. (Цей тип операції часто називають злиттям пошти.)

Існує багато способів замінити текст, але найпростішим є показаний метод [`replaceText()`](https://developers.google.com/apps-script/reference/document/body#replaceText (String,String)) . у прикладі нижче. `replaceText` підтримує більшість функцій [regular expression](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp). Перша функція нижче додає кілька рядків тексту-заповнювача до документа Google; у реальному світі ви, швидше за все, самостійно введете заповнювачі в документ. Друга функція замінює заповнювачі властивостями, визначеними в об’єкті `client`.

Зауважте, що обидві ці функції використовують метод[`getActiveDocument()`](https://developers.google.com/apps-script/reference/document/document-app#getActiveDocument()), який застосовується лише до створених сценаріїв у Google Doc; в автономному сценарії замість цього використовуйте [`DocumentApp.create()`](https://developers.google.com/apps-script/reference/document/document-app#create(String)), [`openById()`](https://developers.google.com/apps-script/reference/document/document-app#openById(String)), or [`openByUrl()`](https://developers.google.com/apps-script/reference/document/document-app#openByUrl(String)) 

```js
function createPlaceholders() {
  var body = DocumentApp.getActiveDocument().getBody();
  body.appendParagraph('{name}');
  body.appendParagraph('{address}');
  body.appendParagraph('{city} {state} {zip}');
}
```

## Настроювані меню та інтерфейс користувача

Ви можете налаштувати Документи Google, додавши меню, діалогові вікна та бічні панелі. Однак пам’ятайте, що сценарій може взаємодіяти лише з інтерфейсом користувача для поточного екземпляра відкритого документа, і лише якщо сценарій [прив’язаний](https://developers.google.com/apps-script/scripts_containers) до документа.

Подивіться, як додати [спеціальні меню](https://developers.google.com/apps-script/guides/menus) і [діалоги](https://developers.google.com/apps-script/guides/dialogs) до ваших Google Документів. Щоб дізнатися більше про створення спеціальних інтерфейсів для діалогового вікна чи бічної панелі, перегляньте [посібник із служби HTML](https://developers.google.com/apps-script/guides/html-service#serve_html_as_a_google_docs_sheets_or_forms_user_interface). Якщо ви плануєте опублікувати свій спеціальний інтерфейс як частину [надбудови](https://developers.google.com/workspace/add-ons/overview), дотримуйтеся [посібника зі стилю](https:// developers.google.com/workspace/add-ons/guides/editor-style) для узгодженості зі стилем і макетом редактора Google Документів.

## Додатки для Документів Google

[Add-ons](https://developers.google.com/workspace/add-ons/overview) працюють у Документах Google і їх можна встановити з магазину додатків Документів Google. Якщо ви розробили сценарій для Google Docs і хочете поділитися ним зі світом, Apps Script дозволяє [публікувати](https://developers.google.com/workspace/add-ons/how-tos/editor-publish -огляд) ваш сценарій як доповнення, щоб інші користувачі могли встановити його з магазину доповнень.

Щоб дізнатися, як створити доповнення для Документів Google, перегляньте [quickstart for building Docs add-ons](https://developers.google.com/workspace/add-ons/editors/docs/quickstart/translate).

## Тригери

Сценарії, [прив’язані](https://developers.google.com/apps-script/scripts_containers) до Google Doc, можуть використовувати [простий тригер](https://developers.google.com/apps-script/understanding_triggers) , щоб відповісти на [подію](https://developers.google.com/apps-script/understanding_events) документа `onOpen`, яка виникає кожного разу, коли користувач із правами редагування документа відкриває його в Документах Google.

Щоб налаштувати тригер, просто напишіть функцію під назвою `onOpen()`. Приклад цього тригера див. у розділі [Користувацькі меню в Google Workspace](https://developers.google.com/apps-script/guides/menus). Хоча простий тригер корисний для додавання меню, він не може використовувати жодні служби Apps Script, які потребують авторизації.