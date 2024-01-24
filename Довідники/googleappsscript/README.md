# Google Apps Script 

## Вступ до Google Apps Script

Google Apps Script – це платформа швидкої розробки застосунків, яка дозволяє швидко та легко створювати бізнес-застосування, які інтегруються з Google Workspace. Ви пишете код на сучасному JavaScript і маєте доступ до вбудованих бібліотек для застосунків Google Workspace, як-от Gmail, Календар, Диск тощо. Непотрібно нічого встановлювати — доступний редактор коду прямо у браузері, а сценарії запускаються на серверах Google.

Apps Script є універсальним, зокрема на ньому модна:

- додавати [спеціальні меню](https://developers.google.com/apps-script/guides/menus), [діалогові вікна та бічні панелі](https://developers.google.com/apps-script/guides/dialogs) у Google Docs, Sheets та Forms.
- писати [спеціальні функції](https://developers.google.com/apps-script/execution_custom_functions) і [макроси](https://developers.google.com/apps-script/guides/sheets/macros) для Google Sheets
- публікувати [веб-застосунки](https://developers.google.com/apps-script/execution_web_apps) — окремі або вбудовані в Google Sites.
- взаємодіяти з іншими [сервісами Google](https://developers.google.com/apps-script/guides/services), включаючи AdSense, Analytics, Календар, Диск, Gmail і Карти.
- створювати [застосунки](https://developers.google.com/apps-script/add-ons/overview) і опублікуйте їх у Google Workspace Marketplace.

Можна спробувати наступні приклади:

- [Швидкий старт автоматизації](https://developers.google.com/apps-script/quickstart/automation): створіть і запустіть просту автоматизовану систему, яка створює документ Google і надсилає вам посилання на нього електронною поштою.
- [Швидкий запуск спеціальної функції](https://developers.google.com/apps-script/quickstart/custom-functions): створіть спеціальну функцію, яка обчислює розпродажну ціну товарів зі знижкою.
- [Швидкий старт Google Chat bot](https://developers.google.com/apps-script/quickstart/chat-bot): створіть простого чат-бота, якому можна надсилати повідомлення та який відповідає, повторюючи ваші повідомлення.

## Вбудовані сервіси Google   

Google Apps Script надає понад 30 [вбудованих сервісів](https://developers.google.com/apps-script/guides/services) для взаємодії з даними користувача, іншими системами Google і зовнішніми системами. Ці служби надаються як глобальні об’єкти, схожі на стандартний об’єкт JavaScript [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). Наприклад, подібно до того, як `Math` пропонує такі методи, як `random()`, і такі константи, як `PI`, Apps Script's [Spreadsheet service](https://developers.google.com/apps-script/reference/spreadsheet) пропонує методи як [`openById(id)`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#openById(String)), класи (дочірні об’єкти), як [`Range`]( https://developers.google.com/apps-script/reference/spreadsheet/range) і переліки на зразок [`DataValidationCriteria`](https://developers.google.com/apps-script/reference/spreadsheet/data- критерії перевірки).

Довідкова документація для служб, які керують продуктами Google Workspace, зібрана в розділі [«Сервіси Google Workspace»](https://developers.google.com/apps-script/guides/services) під заголовком «Довідка» на бічній панелі. Допоміжні служби (для таких речей, як створення інтерфейсів користувача, розбір XML або запис даних журналу) зібрані в розділі «Служби сценаріїв».

### Сучасні можливості JavaScript

Apps Script підтримує два середовища виконання JavaScript: сучасне середовище виконання [**V8**](https://v8.dev/) і старе середовище на основі [**інтерпретатора JavaScript Rhino**](https://developer. mozilla.org/en-US/docs/Mozilla/Projects/Rhino).

[Средовище виконання V8](https://developers.google.com/apps-script/guides/v8-runtime) підтримує сучасний синтаксис і функції [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript). Середовище виконання Rhino базується на старішому стандарті [JavaScript 1.6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.6), а також деякі функції з [1.7](https: //developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.7) і [1.8](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/1.8 ). Ви можете [вільно вибрати, яке середовище виконання](https://developers.google.com/apps-script/guides/v8-runtime#enabling_the_v8_runtime) використовувати зі своїм сценарієм, але настійно рекомендується середовище виконання V8.

Кожне середовище виконання підтримує класи та об’єкти JavaScript, які доступні для вашого сценарію на додаток до вбудованих і [розширених служб Google](https://developers.google.com/apps-script/guides/services/advanced). Ваші сценарії можуть використовувати такі звичайні об’єкти, як [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`Date`](https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference /Global_Objects/RegExp), [і так далі](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), а також [`Math`](https://developer .mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) і [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/ Global_Objects/Object) глобальні об’єкти.

Оскільки код Apps Script працює на серверах Google (за винятком сторінок [HTML-сервісу](https://developers.google.com/apps-script/guides/html), JavaScript у веб-переглядачі такі функції, як маніпулювання DOM або [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) API, недоступні в Apps Script.

### Використання автозаповнення

Редактор сценаріїв надає функцію «допоміжного вмісту», яку частіше називають «автозаповненням», яка розкриває глобальні об’єкти, а також методи та переліки, дійсні в поточному контексті сценарію. Пропозиції автозавершення з’являються автоматично щоразу, коли ви вводите крапку після виклику глобального об’єкта, enum або методу, який повертає клас Apps Script. Наприклад:

- Якщо ви введете повне ім’я глобального об’єкта або виберете його з автозаповнення, а потім введете `.` (крапка), ви побачите всі методи та переліки для цього класу.
- Якщо ви введете кілька символів, ви побачите всі дійсні пропозиції, які починаються з цих символів.

### Розуміння глобальних об'єктів

Кожна служба надає принаймні один глобальний об’єкт (верхнього рівня); наприклад, доступ до [служби Gmail](https://developers.google.com/apps-script/reference/gmail) доступний лише з [`GmailApp`](https://developers.google.com/apps- script/reference/gmail/gmail-app). Деякі служби надають кілька глобальних об’єктів; наприклад, [Base service](https://developers.google.com/apps-script/reference/base) включає чотири глобальні об’єкти: [`Browser`](https://developers.google.com/apps- script/reference/base/browser), [`Logger`](https://developers.google.com/apps-script/reference/base/logger), [`MimeType`](https://developers.google. com/apps-script/reference/base/mime-type) і [`Session`](https://developers.google.com/apps-script/reference/base/session).

### Методи виклику

Глобальні об’єкти майже всіх вбудованих або [розширених служб](https://developers.google.com/apps-script/guides/services/advanced) містять методи, які повертають дані або клас Apps Script. Скрипти викликають методи в такому форматі:

```js
GlobalObjectName.methodName(argument1, argument2, ..., argumentN);
```

Наприклад, сценарій може надіслати електронний лист, викликавши [`sendEmail(recipient, subject, body)`](https://developers.google.com/apps-script/reference/gmail/gmail-app#sendEmail(String ,String,String)) метод служби Gmail ось так:

```js
GmailApp.sendEmail('claire@example.com', 'Subject line', 'This is the body.');
```

Якщо метод повертає інший клас Apps Script, ви можете ланцюгувати виклики методів в одному рядку. (Типи результатів відображаються як в автозавершенні, так і в довідковій документації методу.) Наприклад, метод [`DocumentApp.create()`](https://developers.google.com/apps-script/reference/document/document -app#create(String)) повертає [`Документ`](https://developers.google.com/apps-script/reference/document/document); таким чином, наступні дві частини коду еквівалентні:

```js
var doc = DocumentApp.create('New document');
var body = doc.getBody();
body.appendParagraph('New paragraph.');

// Same result as above.
DocumentApp.create('New document').getBody().appendParagraph('New paragraph.');
```

### Доступ до дочірніх класів

Кожна служба включає один або кілька дочірніх класів, до яких не можна отримати доступ із верхнього рівня, як це робить глобальний об’єкт. Ви не можете використовувати ключове слово `new` для створення цих класів, як це можна зробити зі стандартними класами JavaScript, наприклад [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects /Дата); ви можете отримати доступ до дочірнього класу, лише викликавши метод, який повертає його. Якщо ви не впевнені, як отримати доступ до певного класу, відвідайте кореневу сторінку для довідкової документації служби та знайдіть метод, який повертає потрібний вам клас.

### Робота з інтерфейсами

Деякі служби включають спеціальні класи, які в довідковій документації позначаються як «інтерфейси». Це загальні класи, які використовуються як типи повернення для методів, які не можуть заздалегідь визначити точний тип; наприклад, [служба документів](https://developers.google.com/apps-script/reference/document) метод [`Body.getChild(childIndex)`](https://developers.google.com/apps -script/reference/document/body#getChild(Integer)) повертає загальний об’єкт [`Element`](https://developers.google.com/apps-script/reference/document/element). `Element` – це інтерфейс, який представляє інший клас, можливо, [`Paragraph`](https://developers.google.com/apps-script/reference/document/paragraph) або [`Table`](https:/ /developers.google.com/apps-script/reference/document/table). Інтерфейсні об’єкти рідко бувають корисними самі по собі; замість цього зазвичай потрібно викликати такий метод, як [`Element.asParagraph()`](https://developers.google.com/apps-script/reference/document/element#asParagraph()), щоб повернути об’єкт до точний клас.

### Робота з переліками

Більшість служб включає кілька переліків (перерахованих типів) іменованих значень. Наприклад, [сервіс Drive](https://developers.google.com/apps-script/reference/drive) використовує переліки [`Access`](https://developers.google.com/apps-script/ reference/drive/access) і [`Permission`](https://developers.google.com/apps-script/reference/drive/permission), щоб визначити, які користувачі мають доступ до файлу чи папки. Майже у всіх випадках ви отримуєте доступ до цих переліків із глобального об’єкта. Наприклад, виклик методу [`Folder.setSharing(accessType, permissionType)`](https://developers.google.com/apps-script/reference/drive/folder#setSharing(Access,Permission)) виглядає так це:

```js
// Creates a folder that anyone on the Internet can read from and write to. (Domain administrators can
// prohibit this setting for Google Workspace users.)
var folder = DriveApp.createFolder('Shared Folder');
folder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
```

## Авторизація в Google Services                  

Apps Script вимагає авторизації користувача для доступу до особистих даних із [вбудованих служб Google](https://developers.google.com/apps-script/guides/services) або [розширених служб Google](https://developers.google .com/apps-script/guides/services/advanced).

### Granting access rights

  ![img](https://developers.google.com/static/apps-script/images/new-auth-1.png)  ![img](https://developers.google.com/static/apps-script/images/new-auth-2.png)

Apps Script автоматично визначає області авторизації (наприклад, доступ до файлів Google Таблиць або Gmail) на основі сканування коду. Закоментований код все ще може генерувати запит на авторизацію. Якщо сценарій потребує авторизації, під час його запуску ви побачите одне з діалогових вікон авторизації.

Сценарії, які ви раніше авторизували, також запитують додаткову авторизацію, якщо зміна коду додає нові служби. Сценарії можуть не запитувати авторизацію, якщо ви отримуєте доступ до сценарію як до веб-програми, яка працює під [особою користувача власника сценарію](https://developers.google.com/apps-script/execution_web_apps#permissions).

**Попередження.** Веб-програми та інші сценарії, які використовують конфіденційні області, підлягають перевірці Google. Користувачі, які намагаються авторизувати такі програми, можуть побачити екран із застереженням про те, що програма *неперевірена* Google. Перегляньте [Перевірка клієнта OAuth](https://developers.google.com/apps-script/guides/client-verification), щоб дізнатися більше.

### Скасування прав доступу

Щоб скасувати доступ сценарію до ваших даних, виконайте такі дії:

1. Відвідайте сторінку [дозволи](https://security.google.com/settings/security/permissions) для свого облікового запису Google. (Щоб перейти на цю сторінку в майбутньому, відвідайте [Google.com](https://www.google.com), а потім натисніть зображення свого облікового запису у верхньому правому куті екрана. Потім натисніть **Мій обліковий запис **, потім **Підключені програми та сайти** у розділі «Вхід і безпека», а потім **Керувати програмами**.)
2. Клацніть ім’я сценарію, авторизацію якого потрібно відкликати, потім натисніть **Видалити** праворуч, а потім натисніть **ОК** у діалоговому вікні, що з’явиться.

### Дозволи та типи скриптів

Ідентифікатор користувача, з яким виконується сценарій, і, отже, дані, до яких він може отримати доступ, відрізняються залежно від сценарію, у якому виконується сценарій, як показано в таблиці нижче.

| Type of script                                               | Script runs as...                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Standalone](https://developers.google.com/apps-script/execution_script_editor),[add-on](https://developers.google.com/workspace/add-ons/overview), or[   bound to Docs, Sheets, Slides, or Forms](https://developers.google.com/apps-script/guides/bound) | User at the keyboard                                         |
| [   Custom function in a spreadsheet](https://developers.google.com/apps-script/execution_custom_functions) | [   Anonymous user](https://developers.google.com/apps-script/execution_custom_functions#permissions); however, [quota limits ](https://developers.google.com/apps-script/guides/services/quotas)count against user at the keyboard |
| [Web app](https://developers.google.com/apps-script/execution_web_apps) or [Google Sites gadget](https://developers.google.com/apps-script/execution_gadgets) | User at the keyboard or script owner, dependent on [options selected](https://developers.google.com/apps-script/execution_web_apps#permissions) when deploying the app |
| [   Installable trigger](https://developers.google.com/apps-script/understanding_triggers#Installable) | User who created the trigger                                 |

### Області ручної авторизації для Sheets, Docs, Slidesі Forms

Якщо ви створюєте [надбудову](https://developers.google.com/workspace/add-ons/overview) або інший сценарій, який використовує [службу електронних таблиць](https://developers.google.com /apps-script/reference/spreadsheet), [служба документів](https://developers.google.com/apps-script/reference/document), [служба слайдів](https://developers.google.com/apps -script/reference/slides) або [сервіс Forms](https://developers.google.com/apps-script/reference/forms), ви можете змусити діалогове вікно авторизації запитувати лише доступ до файлів, у яких надбудова або сценарій використовується, а не всі електронні таблиці, документи або форми користувача. Для цього додайте таку анотацію [JsDoc](https://jsdoc.app/) у коментар на рівні файлу:

```js
/**
 * @OnlyCurrentDoc
*/
```

Протилежна анотація, `@NotOnlyCurrentDoc`, доступна, якщо ваш сценарій містить [бібліотеку](https://developers.google.com/apps-script/guides/libraries), яка оголошує `@OnlyCurrentDoc`, але головний сценарій насправді вимагає доступу до більш ніж поточного файлу.

### Життєвий цикл авторизації для надбудов

[Додатки](https://developers.google.com/workspace/add-ons/overview) для Google Таблиць, Документів, Презентацій і Форм зазвичай використовують ту саму модель авторизації, що й сценарії [прив’язані](https: //developers.google.com/apps-script/guides/bound) до документа. Проте за певних обставин їхні функції `onOpen(e)` і `onEdit(e)` працюють у режимі без авторизації, що створює деякі додаткові ускладнення. Щоб дізнатися більше, перегляньте [посібник із життєвого циклу авторизації надбудови](https://developers.google.com/workspace/add-ons/concepts/addon-authorization#editor_add-on_authorization).

### Обмеження користувачів програми OAuth

Програми, які використовують OAuth для доступу до даних користувача Google, зокрема проекти Apps Script, підпадають під обмеження авторизації. Щоб отримати докладнішу інформацію, перегляньте [Обмеження користувачів програми OAuth](https://support.google.com/cloud/answer/9028764).

## Зовнішній APIs

Google Apps Script може взаємодіяти з API з усього Інтернету. Цей посібник показує, як працювати з різними типами API у ваших сценаріях.

### Підключення до публічних API

Ви можете використовувати службу [`UrlFetch`](https://developers.google.com/apps-script/reference/url-fetch), щоб надсилати запити API безпосередньо.

У наведеному нижче прикладі використовується [API GitHub](https://developer.github.com/v3/search/#search-repositories) для пошуку сховищ зі 100 або більше зірочками, у яких згадується "Apps Script". Цей запит API не потребує авторизації чи ключа API.

```js
var query = '"Apps Script" stars:">=100"';
var url = 'https://api.github.com/search/repositories'
  + '?sort=stars'
  + '&q=' + encodeURIComponent(query);

var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
Logger.log(response);
```

### Створення запитів до служб за допомогою OAuth

API, які діють від імені користувача, зазвичай потребують авторизації, часто з використанням [протоколу OAuth](http://oauth.net/). Apps Script не підтримує вбудовану підтримку протоколу, але є бібліотеки з відкритим кодом, які можна використовувати для виконання потоку OAuth і надсилання облікових даних із вашими запитами:

- [OAuth1 для Apps Script](https://github.com/googlesamples/apps-script-oauth1): сумісний із OAuth 1.0 і 1.0a.
- [OAuth2 для Apps Script](https://github.com/googlesamples/apps-script-oauth2): сумісний з OAuth2.

### Робота з JSON

Робота з об’єктами JSON подібна до роботи з XML, за винятком того, що аналізувати або кодувати об’єкт JSON набагато легше.

Якщо запитуваний API повертає необроблену відповідь JSON для запиту, доступ до рядкової відповіді JSON можна отримати за допомогою методу [`HTTPResponse.getContentText()`](https://developers.google.com/apps-script/reference/url-fetch/http-response#getContentText()). Після того, як цей рядок буде отримано, просто викличте `JSON.parse()` для рядка, щоб отримати власне представлення об’єкта.

```js
// Make request to API and get response before this point.
var json = response.getContentText();
var data = JSON.parse(json);
Logger.log(data.title);
```

Так само, щоб створити рядкове представлення об’єкта JavaScript для того, щоб зробити запит, використовуйте `JSON.stringify()`.

```js
var data = {
  'entry': {
    'group': {
      'title': 'Dog Skateboarding',
      'description': 'My dog gets some serious air'
    },
    'keywords': 'dog, skateboard'
  }
}
var payload = JSON.stringify(data);
// Make request to API with payload after this point.
```

### Парсинг XML

Якщо зовнішній API повертає необроблену XML-відповідь на запит, ви можете отримати доступ до XML-відповіді за допомогою методу [`HTTPResponse.getContentText()`](https://developers.google.com/apps-script/reference/url- fetch/http-response#getContentText()).

```js
// Make request to API and get response before this point.
var xml = response.getContentText();
var doc = XmlService.parse(xml);
```

Роблячи XML-запити до API, створіть XML для надсилання за допомогою методів [`XmlService`](https://developers.google.com/apps-script/reference/xml-service/xml-service).

```js
var root = XmlService.createElement('entry')
    .setAttribute('keywords', 'dog, skateboard');
var group = XmlService.createElement('group')
    .setAttribute('title', 'Dog Skateboarding');
    .setAttribute('description', 'My dog gets some serious air');
root.addContent(group);
var document = XmlService.createDocument(root);
var payload = XmlService.getPrettyFormat().format(document);
// Make request to API with payload after this point.
```

## Standalone Scripts

Окремий сценарій – це будь-який сценарій, який не [прив’язаний до файлу Google Таблиць, Документів, Презентацій або Форм](https://developers.google.com/apps-script/guides/bound) або [Google Sites](https ://developers.google.com/apps-script/guides/web). Ці сценарії відображаються серед ваших файлів на Диску Google.

Найпростіший спосіб створити окремий сценарій — відвідати [`script.google.com`](https://script.google.com) і у верхньому лівому куті натиснути «Додати» **Новий проект**.

Ви також можете створювати автономні сценарії з Диска Google. Перейдіть на [Диск Google](https://drive.google.com) і натисніть **Створити > Більше > Сценарій Google Apps**.

Щоб запустити функцію з редактора сценаріїв, угорі виберіть назву функції, яку потрібно виконати, і натисніть **Виконати**.

Багато автономних сценаріїв є службовими сценаріями — наприклад, для [пошуку на вашому Диску Google старих файлів, ім’я яких містить «без назви»](https://developers.google.com/apps-script/reference/drive/drive-app#searchFiles (Рядок)), щоб ви могли їх видалити.

Окремий сценарій також можна розгорнути як [веб-програму](https://developers.google.com/apps-script/guides/web) або налаштувати на автоматичний запуск із [тригера, який можна встановити](https://developers .google.com/apps-script/guides/triggers/installable).

Нарешті, тепер можна [додатки](https://developers.google.com/workspace/add-ons/overview) [опублікувати](https://developers.google.com/workspace/add -ons/how-tos/publish-addons) із автономних сценаріїв.

## Container-bound Scripts

Сценарій прив’язується до файлу Google Таблиць, Документів, Презентацій або Форм, якщо його створено з цього документа, а не як [автономний сценарій](https://developers.google.com/apps-script/guides/standalone). Файл, до якого прикріплено пов’язаний сценарій, називається «контейнер». Прив’язані сценарії зазвичай поводяться як окремі сценарії, за винятком того, що вони не відображаються на Диску Google, їх не можна від’єднати від файлу, до якого вони прив’язані, і вони отримують кілька спеціальних привілеїв щодо батьківського файлу.

Зауважте, що сценарії також можна прив’язувати до Google Sites, але ці сценарії майже завжди розгортаються як [веб-програми](https://developers.google.com/apps-script/guides/web). Сценарії, прив’язані до Таблиць, Документів, Презентацій або Форм, також можуть стати веб-програмами, хоча це нечасто.

**Примітка.** Зв’язані сценарії — це фактично неопубліковані [add-ons](https://developers.google.com/workspace/add-ons/concepts/types#editor_add-ons), які працюють лише для файлу, до якого вони прив’язані.

### Create a bound script

To create a bound script in Google Docs, Sheets, or Slides, open a document in Docs, a spreadsheet in Sheets, or a presentation in Slides and click **Extensions** > **Apps Script**. To reopen the script in the future, do the same thing or open the script from the [Apps Script dashboard](https://script.google.com/home).

To create a bound script in Google Forms, open a form and click More more_vert > **Script editor**. To reopen the script in the future, do the same thing or open the script from the [Apps Script dashboard](https://script.google.com/home).

**Note:** The [`clasp`](https://developers.google.com/apps-script/guides/clasp) tool can't create bound scripts, but it can clone and edit them.

### Special methods

Bound scripts can call a few methods that standalone scripts cannot:

- [`getActiveSpreadsheet()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveSpreadsheet()), [`getActiveDocument()`](https://developers.google.com/apps-script/reference/document/document-app#getActiveDocument()), [`getActivePresentation()`](https://developers.google.com/apps-script/reference/slides/slides-app#getactivepresentation), and [`getActiveForm()`](https://developers.google.com/apps-script/reference/forms/form-app#getActiveForm()) allow bound scripts to refer to their parent file without referring to the file's ID.
- [`getUi`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getUi()) lets bound scripts access the user interface for their parent file to add [custom menus, dialogs, and sidebars](https://developers.google.com/apps-script/guides/bound#custom_menus_dialogs_and_sidebars).
- In Google Sheets, [`getActiveSheet()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveSheet()), [`getActiveRange()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveRange()), and [`getActiveCell()`](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getActiveCell()) let the script determine the user's current sheet, selected range of cells, or selected individual cell. [`setActiveSheet(sheet)`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#setActiveSheet(Sheet)) and [`setActiveRange(range)`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#setActiveRange(Range)) let the script change those selections.
- In Google Docs, [`getCursor()`](https://developers.google.com/apps-script/reference/document/document#getCursor()) and [`getSelection()`](https://developers.google.com/apps-script/reference/document/document#getSelection()) let the script determine the position of the user's cursor or selected text. [`setCursor(position)`](https://developers.google.com/apps-script/reference/document/document#setCursor(Position)) and [`setSelection(range)`](https://developers.google.com/apps-script/reference/document/document#setSelection(Range)) let the script change those locations.

For more information, see the [guide to extending Google Sheets](https://developers.google.com/apps-script/guides/sheets) or the [guide to extending Google Docs](https://developers.google.com/apps-script/guides/docs).

**Note:** These methods are only available to bound scripts run from the script editor, menu items, dialogs, sidebars, or triggers. When a bound script is run as a web app or via the [Apps Script API](https://developers.google.com/apps-script/api/how-tos/execute), these methods are not available.

### Custom menus, dialogs, and sidebars

Bound scripts can customize Google Sheets, Docs, and Forms by adding [custom menus](https://developers.google.com/apps-script/guides/menus) and [dialog boxes or sidebars](https://developers.google.com/apps-script/guides/dialogs).  Keep in mind, however, that a script can only interact with the user interface for the current instance of an open file. That is, a script bound to one document cannot affect the user interface of another document.

Add-ons can also add custom menus, dialogs and sidebars. It is recommended to develop add-ons using [standalone scripts](https://developers.google.com/apps-script/guides/standalone).

### Add-ons

[Add-ons](https://developers.google.com/workspace/add-ons/overview) run inside Gmail, Google Sheets, Docs, Slides, and Forms. If you've developed a bound or [standalone](https://developers.google.com/apps-script/guides/standalone) script and want to share it with the world, Apps Script lets you [publish](https://developers.google.com/workspace/add-ons/how-tos/editor-publish-overview) your script as an add-on so other users can install it from the add-on store.

### Triggers

Bound scripts can use [simple triggers](https://developers.google.com/apps-script/guides/triggers) like the special `onOpen()` function, which runs automatically whenever a file is opened by a user who has edit access. Like all types of scripts, they can also use [installable triggers](https://developers.google.com/apps-script/guides/triggers/installable).

### Custom functions

A [custom function](https://developers.google.com/apps-script/guides/sheets/functions) is a function in a script bound to Google Sheets that you call directly from a cell using the syntax `=myFunctionName()`. Custom functions are thus similar to the hundreds of [built-in functions](https://support.google.com/drive/topic/1361471) in Sheets like [`AVERAGE`](https://support.google.com/drive/answer/3093615) or [`SUM`](https://support.google.com/drive/answer/3093669) except that you define the custom function's behavior.

### Access to bound scripts

Only users who have permission to edit a container can run its bound script. Collaborators who have only view access cannot open the script editor, although if they make a copy of the parent file, they become the owner of the copy and will be able to see and run a copy of the script.

All container-bound scripts use the same owner, viewer, and editor access list defined for the container file. The container owner takes ownership of a new script project regardless of who created it.

https://sheetsnerd.com/api-google-sheets-google-apps-script/#set-up-the-api-in-google-apps-script

https://gist.github.com/nyancodeid/abc7f2c3ce47eda753dee8a2b63070ab

http://asu.in.ua/viewtopic.php?f=94&t=199

http://asu.in.ua/viewtopic.php?f=94&t=215

