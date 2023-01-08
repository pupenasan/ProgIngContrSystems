# Google Sheets

Google Apps Script дозволяє робити нові та цікаві речі з Google Таблицями. Ви можете використовувати Apps Script, щоб додати [спеціальні меню](https://developers.google.com/apps-script/guides/menus), [діалогові вікна та бічні панелі](https://developers.google.com/apps- скрипт/посібники/діалоги) до Google Таблиць. Це також дозволяє писати [спеціальні функції](https://developers.google.com/apps-script/guides/sheets/functions) для Таблиць, а також інтегрувати Таблиці з іншими [службами Google](https://developers .google.com/apps-script/guides/services), як-от Календар, Диск і Gmail.

Більшість сценаріїв, розроблених для Google Таблиць, керують масивами для взаємодії з клітинками, рядками та стовпцями в електронній таблиці. Якщо ви не знайомі з масивами в JavaScript, Codecademy пропонує [чудовий навчальний модуль для масивів](https://www.codecademy.com/learn/introduction-to-javascript/modules/learn-javascript-arrays). (Зауважте, що цей курс не був розроблений Google і не пов’язаний з ним.)

Щоб отримати короткий вступ до використання Apps Script із Google Таблицями, перегляньте 5-хвилинний короткий посібник для [Макроси, меню та спеціальні функції](https://developers.google.com/apps-script/quickstart/macros).

## Розпочати

https://developers.google.com/apps-script/guides/sheets

Apps Script містить спеціальні API, які дозволяють програмно створювати, читати та редагувати Google Таблиці. Apps Script може взаємодіяти з Google Sheets двома широкими способами: будь-який сценарій може створювати або змінювати електронну таблицю, якщо користувач сценарію має відповідні дозволи для електронної таблиці, і сценарій також можна [прив’язувати](https://developers.google.com /apps-script/guides/bound) до електронної таблиці, що надає сценарію спеціальні можливості для зміни інтерфейсу користувача або відповіді на відкриття електронної таблиці. Щоб створити пов’язаний сценарій, виберіть **Розширення** > **Сценарій додатків** у Google Таблицях.

[Spreadsheet service](https://developers.google.com/apps-script/reference/spreadsheet) розглядає Таблиці Google (Google Sheets) як сітку, що працює з двовимірними масивами. Щоб отримати дані з електронної таблиці (spreadsheet), ви повинні отримати доступ до електронної таблиці, де зберігаються дані, отримати діапазон у електронній таблиці, який містить дані, а потім отримати значення клітинок. Apps Script полегшує доступ до даних, читаючи структуровані дані в електронній таблиці та створюючи для них об’єкти JavaScript

### Читання даних

Припустімо, у вас є список назв продуктів і номерів продуктів, які ви зберігаєте в електронній таблиці, як показано на зображенні нижче.

![img](media/spreadsheet_basics1.png)

У прикладі нижче показано, як отримати та зареєструвати назви та номери продуктів.

```js
function logProductInfo() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    Logger.log('Product name: ' + data[i][0]);
    Logger.log('Product number: ' + data[i][1]);
  }
}
```

Щоб переглянути зареєстровані дані, у верхній частині редактора сценаріїв натисніть **Журнал виконання**.

### Запис даних

Щоб зберегти дані, як-от назву та номер нового продукту, до електронної таблиці, додайте наступний код у кінець сценарію.

```js
function addProduct() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(['Cotton Sweatshirt XL', 'css004']);
}
```

Наведений вище код додає новий рядок унизу електронної таблиці із зазначеними значеннями. Якщо ви запустите цю функцію, ви побачите новий рядок, доданий до електронної таблиці.

## Спеціальні меню та інтерфейси користувача 

Ви можете налаштувати Google Таблиці, додавши спеціальні меню, діалогові вікна та бічні панелі. Щоб дізнатися про основи створення меню, перегляньте [посібник із меню](https://developers.google.com/apps-script/guides/menus). Щоб дізнатися про налаштування вмісту діалогового вікна, перегляньте [посібник із служби HTML](https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_or_forms_user_interface).

Ви також можете приєднати функцію сценарію до зображення або креслення в електронній таблиці; функція буде виконана, коли користувач клацне зображення або малюнок. Щоб дізнатися більше, перегляньте [Зображення та малюнки в Google Таблицях](https://developers.google.com/apps-script/guides/menus#clickable_images_and_drawings_in_google_sheets).

Якщо ви плануєте опублікувати свій спеціальний інтерфейс як частину [надбудови](https://developers.google.com/apps-script/guides/sheets#add-ons_for_google_sheets), дотримуйтеся [посібника зі стилю]( https://developers.google.com/workspace/add-ons/guides/editor-style) для узгодженості зі стилем і макетом редактора Google Таблиць.

## Підключення до Google Forms 

Apps Script allows you to connect Google Forms with Google Sheets through [Forms](https://developers.google.com/apps-script/reference/forms) and [Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet) services. This feature can automatically create a Google Form based on data in a spreadsheet. Apps Script also enables you to use [triggers](https://developers.google.com/apps-script/guides/sheets#triggers), such as `onFormSubmit` to perform a specific action after a user responds to the form. To learn more about connecting Google Sheets to Google Forms, try the [Managing Responses for Google Forms](https://developers.google.com/apps-script/quickstart/forms) 5-minute quickstart.

Apps Script дозволяє підключати Google Forms до Google Sheets через [Forms](https://developers.google.com/apps-script/reference/forms) і [Spreadsheet](https://developers.google.com/apps) -сервіси скриптів/довідників/електронних таблиць). Ця функція може автоматично створювати форму Google на основі даних у електронній таблиці. Apps Script також дає змогу використовувати [тригери](https://developers.google.com/apps-script/guides/sheets#triggers), як-от `onFormSubmit`, для виконання певної дії після того, як користувач відповість на форму. Щоб дізнатися більше про підключення Google Таблиць до Google Форм, спробуйте 5-хвилинний короткий посібник [Керування відповідями для Google Форм](https://developers.google.com/apps-script/quickstart/forms).

## Форматування

Клас [`Range`](https://developers.google.com/apps-script/reference/spreadsheet/range) має такі методи, як [`setBackground(color)`](https://developers.google.com/ apps-script/reference/spreadsheet/range#setBackground(String)), щоб отримати доступ і змінити формат клітинки або діапазону клітинок. У наступному прикладі показано, як можна встановити стиль шрифту для діапазону:

```js
function formatMySpreadsheet() {
  // Set the font style of the cells in the range of B2:C2 to be italic.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var cell = sheet.getRange('B2:C2');
  cell.setFontStyle('italic');
}
```

## Перевірка даних

Apps Script дає вам доступ до існуючих правил перевірки даних у Google Таблицях або створює нові правила. Наприклад, у наведеному нижче прикладі показано, як встановити правило перевірки даних, яке дозволяє лише числа від 1 до 100 у клітинці.

```js
function validateMySpreadsheet() {
  // Set a rule for the cell B4 to be a number between 1 and 100.
  var cell = SpreadsheetApp.getActive().getRange('B4');
  var rule = SpreadsheetApp.newDataValidation()
     .requireNumberBetween(1, 100)
     .setAllowInvalid(false)
     .setHelpText('Number must be between 1 and 100.')
     .build();
  cell.setDataValidation(rule);
}
```

Докладніше про роботу з правилами перевірки даних див [`SpreadsheetApp.newDataValidation()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#newDataValidation()), [`DataValidationBuilder`](https://developers.google.com/apps-script/reference/spreadsheet/data-validation-builder), and [`Range.setDataValidation(rule)`](https://developers.google.com/apps-script/reference/spreadsheet/range#setDataValidation(DataValidation))

## Діаграми

Apps Script дозволяє вставляти в електронну таблицю діаграми, які представляють дані в певному діапазоні. У наведеному нижче прикладі створюється вбудована гістограма, припускаючи, що у вас є дані для діаграми в клітинках «A1:B15».

```js
function newChart() {
  // Generate a chart representing the data in the range of A1:B15.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  var chart = sheet.newChart()
     .setChartType(Charts.ChartType.BAR)
     .addRange(sheet.getRange('A1:B15'))
     .setPosition(5, 5, 0, 0)
     .build();

  sheet.insertChart(chart);
}
```

Щоб дізнатися більше про вбудовування діаграми в електронну таблицю, перегляньте [`EmbeddedChart`](https://developers.google.com/apps-script/reference/spreadsheet/embedded-chart) і спеціальні конструктори діаграм, як-от [`EmbeddedPieChartBuilder `](https://developers.google.com/apps-script/reference/spreadsheet/embedded-pie-chart-builder).

## Спеціальні функції в Google Таблицях 

[Спеціальна функція](https://developers.google.com/apps-script/guides/sheets/functions) подібна до вбудованої функції електронної таблиці, як-от  `=SUM(A1:A5)` , за винятком того, що ви визначаєте поведінка функцій із скриптом додатків. Наприклад, ви можете створити спеціальну функцію `in2mm()`, яка перетворює значення з дюймів на міліметри, а потім використати формулу в електронній таблиці, ввівши `=in2mm(A1)` або `=in2mm(10)`  у клітина.

Щоб дізнатися більше про користувацькі функції, спробуйте 5-хвилинний короткий посібник [Меню та користувацькі функції](https://developers.google.com/apps-script/quickstart/custom-functions) або подивіться додаткову інформацію deep [посібник із спеціальних функцій](https://developers.google.com/apps-script/guides/sheets/functions).

## Макроси

Макроси – це ще один спосіб виконання коду Apps Script з інтерфейсу Google Таблиць. На відміну від спеціальних функцій, ви активуєте їх за допомогою комбінації клавіш або через меню Google Таблиць. Щоб отримати додаткові відомості, перегляньте [Макроси Google Таблиць](https://developers.google.com/apps-script/guides/sheets/macros).

## Додатки для Google Таблиць

[Add-ons](https://developers.google.com/workspace/add-ons/overview) — це спеціально упаковані проекти сценарію додатків, які запускаються в Google Таблицях і можуть бути встановлені з магазину доповнень Google Таблиць. Якщо ви розробили сценарій для Google Таблиць і хочете поділитися ним зі світом, Apps Script дозволяє [публікувати](https://developers.google.com/workspace/add-ons/how-tos/editor-publish -огляд) ваш сценарій як доповнення, щоб інші користувачі могли встановити його з магазину доповнень.

## Тригери

Сценарії, [прив’язані](https://developers.google.com/apps-script/guides/bound) до файлу Google Таблиць, можуть використовувати [прості тригери](https://developers.google.com/apps-script /guides/triggers), як-от функції `onOpen()` і `onEdit()`, щоб автоматично реагувати, коли користувач, який має доступ до редагування електронної таблиці, відкриває або редагує електронну таблицю.

Як і прості тригери, [тригери, які можна встановити](https://developers.google.com/apps-script/guides/triggers/installable) дозволяють Google Таблицям автоматично запускати функцію, коли відбувається певна подія. Однак тригери, які можна встановити, пропонують більшу гнучкість, ніж прості тригери, і підтримують такі події: відкриття, редагування, зміна, надсилання форми та керування часом (годинник).

https://developers.google.com/sheets/api/guides/concepts



