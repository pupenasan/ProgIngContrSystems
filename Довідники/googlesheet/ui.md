# Class Ui                      

https://developers.google.com/apps-script/reference/base/ui.html

Екземпляр середовища інтерфейсу користувача для Google App, який дозволяє сценарію додавати такі функції, як меню, діалогові вікна та бічні панелі. Сценарій може взаємодіяти лише з інтерфейсом користувача для поточного екземпляра відкритого редактора, і лише якщо сценарій [прив’язаний до контейнера](https://developers.google.com/apps-script/scripts_containers) до редактора.

```js
// Відобразити діалогове вікно із заголовком, повідомленням, полем введення 
// та кнопками «Так» і «Ні». 
// Користувач також може закрити діалогове вікно, натиснувши кнопку 
// закриття в рядку заголовка. 
var ui = SpreadsheetApp.getUi();
var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

// Process the user's response.
if (response.getSelectedButton() == ui.Button.YES) {
  Logger.log('The user\'s name is %s.', response.getResponseText());
} else if (response.getSelectedButton() == ui.Button.NO) {
  Logger.log('The user didn\'t want to provide a name.');
} else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
}
```

### Properties

| Property    | Type        | Description                                                  |
| ----------- | ----------- | ------------------------------------------------------------ |
| `Button`    | `Button`    | Перелік, що представляє заздалегідь визначені локалізовані діалогові кнопки, які повертає [alert](https://developers.google.com/apps-script/reference/base/ui.html#alert(String)) або `PromptResponse.getSelectedButton()` щоб вказати, яку кнопку в діалоговому вікні натиснув користувач. |
| `ButtonSet` | `ButtonSet` | Перелік, що представляє заздалегідь визначені локалізовані набори однієї чи кількох діалогових кнопок, які можна додати до [сповіщення](https://developers.google.com/apps-script/reference/base/ui.html#alert(String,ButtonSet) )) або [підказка](https://developers.google.com/apps-script/reference/base/ui.html#prompt(String,ButtonSet)). |

### Methods

| Method                                     | Return type      | Brief description                                            |
| ------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| `alert(prompt)`                            | `Button`         | Відкриває діалогове вікно в редакторі користувача з заданим повідомленням і кнопкою «ОК». |
| `alert(prompt, buttons)`                   | `Button`         | Відкриває діалогове вікно в редакторі користувача з заданим повідомленням і набором кнопок. |
| `alert(title, prompt, buttons)`            | `Button`         | Відкриває діалогове вікно в редакторі користувача з указаним заголовком, повідомленням і набором кнопок. |
| `createAddonMenu()`                        | `Menu`           | Створює конструктор, який можна використовувати для вставлення підменю в меню додатків редактора. |
| `createMenu(caption)`                      | `Menu`           | Створює конструктор, який можна використовувати для додавання меню до інтерфейсу користувача редактора. |
| `prompt(prompt)`                           | `PromptResponse` | Відкриває діалогове вікно введення в редакторі користувача з заданим повідомленням і кнопкою «ОК». |
| `prompt(prompt, buttons)`                  | `PromptResponse` | Відкриває діалогове вікно введення в редакторі користувача з заданим повідомленням і набором кнопок. |
| `prompt(title, prompt, buttons)`           | `PromptResponse` | Відкриває діалогове вікно введення в редакторі користувача з указаним заголовком, повідомленням і набором кнопок. |
| `showModalDialog(userInterface, title)`    | `void`           | Відкриває модальне діалогове вікно в редакторі користувача з настроюваним вмістом на стороні клієнта. |
| `showModelessDialog(userInterface, title)` | `void`           | Відкриває немодальне діалогове вікно в редакторі користувача зі спеціальним вмістом на стороні клієнта. |
| `showSidebar(userInterface)`               | `void`           | Відкриває бічну панель у редакторі користувача з настроюваним вмістом на стороні клієнта. |

## Detailed documentation

### `alert(prompt)`

Opens a dialog box in the user's editor with the given message and an "OK" button. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display "Hello, world" in a dialog box with an "OK" button. The user can also close the
// dialog by clicking the close button in its title bar.
SpreadsheetApp.getUi().alert('Hello, world');
```

Parameters

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `prompt` | `String` | The message to display in the dialog box. |

Return

`Button` — The button the user clicked.

------

### `alert(prompt, buttons)`

Opens a dialog box in the user's editor with the given message and set of buttons. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display a dialog box with a message and "Yes" and "No" buttons. The user can also close the
// dialog by clicking the close button in its title bar.
var ui = SpreadsheetApp.getUi();
var response = ui.alert('Are you sure you want to continue?', ui.ButtonSet.YES_NO);

// Process the user's response.
if (response == ui.Button.YES) {
  Logger.log('The user clicked "Yes."');
} else {
  Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.');
}
```

Parameters

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `prompt`  | `String`    | The message to display in the dialog box.    |
| `buttons` | `ButtonSet` | The button set to display in the dialog box. |

Return

`Button` — The button the user clicked.

------

### `alert(title, prompt, buttons)`

Opens a dialog box in the user's editor with the given title, message, and set of buttons. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display a dialog box with a title, message, and "Yes" and "No" buttons. The user can also
// close the dialog by clicking the close button in its title bar.
var ui = SpreadsheetApp.getUi();
var response = ui.alert('Confirm', 'Are you sure you want to continue?', ui.ButtonSet.YES_NO);

// Process the user's response.
if (response == ui.Button.YES) {
  Logger.log('The user clicked "Yes."');
} else {
  Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.');
}
```

Parameters

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `title`   | `String`    | The title to display above the dialog box.   |
| `prompt`  | `String`    | The message to display in the dialog box.    |
| `buttons` | `ButtonSet` | The button set to display in the dialog box. |

Return

`Button` — The button the user clicked.

------

### `createAddonMenu()`

Створює конструктор, який можна використовувати для вставлення підменю в меню додатків редактора. Фактично меню не буде оновлено, доки не буде викликано `Menu.addToUi()`. Якщо сценарій працює як надбудова, назва підменю збігається з назвою надбудови у веб-магазині; якщо сценарій [прив’язано](https://developers.google.com/apps-script/scripts_containers) безпосередньо до документа, назва підменю збігається з назвою сценарію. Щоб отримати додаткові відомості, перегляньте [посібник із меню](https://developers.google.com/apps-script/guides/menus).

```js
// Додайте пункт до меню Add-on у підменю, назва якого встановлюється автоматично. 
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createAddonMenu()
      .addItem('Show', 'showSidebar')
      .addToUi();
}
```

Повертає `Menu` - нове побудоване меню

------

### `createMenu(caption)`

Creates a builder that can be used to add a menu to the editor's user interface. The menu isn't actually be added until `Menu.addToUi()` is called. For more information, see the [guide to menus](https://developers.google.com/apps-script/guides/menus). The label for a top-level menu should be in headline case (all major words capitalized), although the label for a sub-menu should be in sentence case (only the first word capitalized). If the script is published as an [add-on](https://developers.google.com/gsuite/add-ons/overview), the `caption` parameter is ignored and the menu is added as a sub-menu of the Add-ons menu, equivalent to `createAddonMenu()`.

```
// Add a custom menu to the active document, including a separator and a sub-menu.
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('My Menu')
      .addItem('My menu item', 'myFunction')
      .addSeparator()
      .addSubMenu(SpreadsheetApp.getUi().createMenu('My sub-menu')
          .addItem('One sub-menu item', 'mySecondFunction')
          .addItem('Another sub-menu item', 'myThirdFunction'))
      .addToUi();
}
```

Parameters

| Name      | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `caption` | `String` | The label for the menu, with all major words capitalized for a top-level menu,    or only the first word capitalized for a sub-menu. |

Return

`Menu` — The new menu builder.

------

### `prompt(prompt)`

Opens an input dialog box in the user's editor with the given message and an "OK" button. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display a dialog box with a message, input field, and an "OK" button. The user can also
// close the dialog by clicking the close button in its title bar.
var ui = SpreadsheetApp.getUi();
var response = ui.prompt('Enter your name:');

// Process the user's response.
if (response.getSelectedButton() == ui.Button.OK) {
  Logger.log('The user\'s name is %s.', response.getResponseText());
} else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
}
```

Parameters

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `prompt` | `String` | The message to display in the dialog box. |

Return

`PromptResponse` — A representation of the user's response.

------

### `prompt(prompt, buttons)`

Opens an input dialog box in the user's editor with the given message and set of buttons. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display a dialog box with a message, input field, and "Yes" and "No" buttons. The user can
// also close the dialog by clicking the close button in its title bar.
var ui = SpreadsheetApp.getUi();
var response = ui.prompt('May I know your name?', ui.ButtonSet.YES_NO);

// Process the user's response.
if (response.getSelectedButton() == ui.Button.YES) {
  Logger.log('The user\'s name is %s.', response.getResponseText());
} else if (response.getSelectedButton() == ui.Button.NO) {
  Logger.log('The user didn\'t want to provide a name.');
} else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
}
```

Parameters

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `prompt`  | `String`    | The message to display in the dialog box.    |
| `buttons` | `ButtonSet` | The button set to display in the dialog box. |

Return

`PromptResponse` — A representation of the user's response.

------

### `prompt(title, prompt, buttons)`

Opens an input dialog box in the user's editor with the given title, message, and set of buttons. This method suspends the server-side script while the dialog is open. The script resumes after the user dismisses the dialog, but `Jdbc` connections and `LockService` locks don't persist across the suspension. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
// Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
// user can also close the dialog by clicking the close button in its title bar.
var ui = SpreadsheetApp.getUi();
var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

// Process the user's response.
if (response.getSelectedButton() == ui.Button.YES) {
  Logger.log('The user\'s name is %s.', response.getResponseText());
} else if (response.getSelectedButton() == ui.Button.NO) {
  Logger.log('The user didn\'t want to provide a name.');
} else {
  Logger.log('The user clicked the close button in the dialog\'s title bar.');
}
```

Parameters

| Name      | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `title`   | `String`    | The title to display above the dialog box.   |
| `prompt`  | `String`    | The message to display in the dialog box.    |
| `buttons` | `ButtonSet` | The button set to display in the dialog box. |

Return

`PromptResponse` — A representation of the user's response.

------

### `showModalDialog(userInterface, title)`

Opens a modal dialog box in the user's editor with custom client-side content. This method does *not* suspend the server-side script while the dialog is open. To communicate with the server-side script, the client-side component must make asynchronous callbacks using the [`google.script`](https://developers.google.com/apps-script/guides/html/communication) API for `HtmlService`. To close the dialog programmatically, call [ `google.script.host.close()`](https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_or_forms_user_interface) on the client side of an `HtmlService` web app. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

Modal dialogs prevent the user from interacting with anything other than the dialog. By contrast, [modeless dialogs](https://developers.google.com/apps-script/reference/base/ui.html#showModelessDialog(Object,String)) and [sidebars](https://developers.google.com/apps-script/reference/base/ui.html#showSidebar(Object)) let the user interact with the editor. In almost all cases, a modal dialog or sidebar is a better choice than a modeless dialog.

```
// Display a modal dialog box with custom HtmlService content.
var htmlOutput = HtmlService
    .createHtmlOutput('<p>A change of speed, a change of style...</p>')
    .setWidth(250)
    .setHeight(300);
SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'My add-on');
```

Parameters

| Name            | Type     | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| `userInterface` | `Object` | An `HtmlOutput`    representing the interface to display.    |
| `title`         | `String` | The title of the dialog; overrides any title set by calling `setTitle()` on    the `userInterface` object. |

Authorization

Scripts that use this method require authorization with one or more of the following [scopes](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes):

- `https://www.googleapis.com/auth/script.container.ui`

------

### `showModelessDialog(userInterface, title)`

Opens a modeless dialog box in the user's editor with custom client-side content. This method does *not* suspend the server-side script while the dialog is open. To communicate with the server-side script, the client-side component must make asynchronous callbacks using the [`google.script`](https://developers.google.com/apps-script/guides/html/communication) API for `HtmlService`. To close the dialog programmatically, call [ `google.script.host.close()`](https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_or_forms_user_interface) on the client side of an `HtmlService` web app. For more information, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

Modeless dialogs let the user interact with the editor behind the dialog. By contrast, [modal dialogs](https://developers.google.com/apps-script/reference/base/ui.html#showModalDialog(Object,String)) do not. In almost all cases, a modal dialog or [sidebar](https://developers.google.com/apps-script/reference/base/ui.html#showSidebar(Object)) is a better choice than a modeless dialog.

```
// Display a modeless dialog box with custom HtmlService content.
var htmlOutput = HtmlService
    .createHtmlOutput('<p>A change of speed, a change of style...</p>')
    .setWidth(250)
    .setHeight(300);
SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'My add-on');
```

Parameters

| Name            | Type     | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| `userInterface` | `Object` | An `HtmlOutput`    representing the interface to display.    |
| `title`         | `String` | The title of the dialog; overrides any title set by calling `setTitle()` on    the `userInterface` object. |

Authorization

Scripts that use this method require authorization with one or more of the following [scopes](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes):

- `https://www.googleapis.com/auth/script.container.ui`

------

### `showSidebar(userInterface)`

Відкриває бічну панель у редакторі користувача з настроюваним вмістом на стороні клієнта. Цей метод *не* призупиняє серверний сценарій, поки відкрита бічна панель. Щоб зв’язатися зі сценарієм на стороні сервера, компонент на стороні клієнта має здійснювати асинхронні зворотні виклики за допомогою [`google.script`](https://developers.google.com/apps-script/guides/html/communication) API для `HtmlService`. Щоб закрити бічну панель програмно, викличте [ `google.script.host.close()`](https://developers.google.com/apps-script/guides/html#serve_html_as_a_google_docs_sheets_or_forms_user_interface) на стороні клієнта `HtmlService` веб-програма. Щоб дізнатися більше, перегляньте [посібник із діалогових вікон і бічних панелей](https://developers.google.com/apps-script/guides/dialogs).

Бічна панель відображається в правій частині редактора для користувачів, чиє середовище використовує мову з написанням зліва направо, і в лівій частині редактора для мов з написанням справа наліво. Усі бічні панелі, які показуються сценаріями, мають ширину 300 пікселів.

```js
// Display a sidebar with custom HtmlService content.
var htmlOutput = HtmlService
    .createHtmlOutput('<p>A change of speed, a change of style...</p>')
    .setTitle('My add-on');
SpreadsheetApp.getUi().showSidebar(htmlOutput);
```

Parameters

| Name            | Type     | Description                                               |
| --------------- | -------- | --------------------------------------------------------- |
| `userInterface` | `Object` | An `HtmlOutput`    representing the interface to display. |

Authorization

Scripts that use this method require authorization with one or more of the following [scopes](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes):

- `https://www.googleapis.com/auth/script.container.ui`