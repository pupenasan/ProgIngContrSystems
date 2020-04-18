[JavaScript in Visual Studio Code](https://code.visualstudio.com/docs/languages/javascript)

# JavaScript у Visual Studio Code



Visual Studio Code включає вбудований JavaScript IntelliSense, налагодження, форматування, навігацію по коду, рефракторинг та багато інших додаткових мовних функцій.

![Working with JavaScript in Visual Studio Code](https://code.visualstudio.com/assets/docs/languages/javascript/overview.png)

Більшість цих функцій просто виходять з коробки, тоді як деякі можуть потребувати базової конфігурації, щоб отримати найкращий досвід. На цій сторінці підсумовані функції JavaScript, з якими постачається код VS. Розширення з [VS Code Marketplace](https://marketplace.visualstudio.com) можуть розширити або змінити більшість цих вбудованих функцій. Більш детальний посібник про те, як ці функції працюють і які можна налаштувати, див. У розділі [Working with JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript)

## IntelliSense

IntelliSense показує вам інтелектуальне завершення коду, наведену інформацію та підписи, щоб ви могли швидше та правильніше писати код.

<video src="https://code.visualstudio.com/docs/languages/javascript/intellisense.mp4" placeholder="images/javascript/intellisense-placeholder.png" autoplay="autoplay" loop="" controls="controls" muted="muted">
    Sorry, your browser doesn't support HTML 5 video.
</video>

Код VS забезпечує IntelliSense у ваших проектах JavaScript; для багатьох бібліотек npm, таких як `React`,` lodash` та `express`; а також для інших платформ, таких як  `node`, без сервера або IoT.

Див. "Робота з JavaScript" для отримання інформації про JavaScript IntelliSense VS Code, як його налаштувати та допомогти у вирішенні поширених проблем IntelliSense.

## JavaScript projects (jsconfig.json)

Файл [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) означує проект JavaScript у коді VS. Хоча файли `jsconfig.json` не є обов'язковими, вам потрібно створити файли у таких випадках:

- Якщо не всі файли JavaScript у вашій робочій області слід вважати частиною одного проекту JavaScript. Файли "jsconfig.json" дозволяють виключити показ деяких файлів у IntelliSense.
- Щоб забезпечити, що підмножина файлів JavaScript у вашій робочій області розглядається як єдиний проект. Це корисно, якщо ви працюєте зі застарілим кодом, який використовує неявні глобальні залежності, а не імпорт для залежностей.
- Якщо ваша робоча область містить більше одного контексту проекту, наприклад,  front-end та back-end код JavaScript. Для робочих просторів для багатьох проектів створіть `jsconfig.json` у кореневій папці кожного проекту.
- Ви використовуєте компілятор TypeScript для компіляції вихідного коду JavaScript на нижчому рівні.

Щоб означити базовий проект JavaScript, додайте `jsconfig.json` у корені робочої області:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```

> **Tip:** To check if a JavaScript file is part of JavaScript project, just open the file in VS Code  and run the **JavaScript: Go to Project Configuration** command. This command opens the `jsconfig.json` that the JavaScript file belongs to. A notification is shown if the file is not part of any `jsconfig.json` project.

## Інші функції

**Snippets** - VS Code  включає основні JavaScript [фрагменти](https://code.visualstudio.com/docs/editor/userdefinedsnippets), які пропонуються під час введення;

**JSDoc support** - VS Code розуміє багато стандартних анотацій [JSDoc](http://jsdoc.app) і використовує ці примітки для надання багатих [IntelliSense](https://code.visualstudio.com/docs/languages/javascript#_intellisense). Ви можете навіть використовувати інформацію про тип із коментарів JSDoc до [type check your JavaScript](https://code.visualstudio.com/docs/languages/javascript#_type-checking).

**Hover Information** - Наведіть курсор на символ JavaScript, щоб швидко переглянути інформацію про його тип та відповідну документацію. Ctrl+K Ctrl+I - показує інформацію в конкретній позиції курсору.

**Signature Help** - Під час написання викликів функцій JavaScript VS Code показує інформацію про функцію підпису та виділяє параметр, який ви зараз виконуєте. Довідка щодо підпису відображається автоматично, коли ви вводите кнопку `(` або `,` у межах виклику функції. Натисніть Ctrl + Shift + Пробіл, щоб вручну запустити допомогу підпису вручну.

![Signature help for some DOM methods](https://code.visualstudio.com/assets/docs/languages/javascript/signature-help.png)

**Auto imports** - Автоматичний імпорт прискорює кодування, пропонуючи доступні змінні в межах вашого проекту та його залежностей. Вибираючи одну з цих пропозицій, VS Code автоматично додає імпорт для неї у верхню частину файлу. Просто почніть вводити, щоб побачити [пропозиції](https://code.visualstudio.com/docs/languages/javascript#_intellisense) для всіх наявних символів JavaScript у вашому поточному проекті. Пропозиції щодо автоматичного імпорту показують, куди вони будуть імпортовані:

![Global symbols are shown in the suggestion list](https://code.visualstudio.com/assets/docs/languages/javascript/auto-import-before.png)

**Formatting** -  Вбудований формат JavaScript VS Code надає основне форматування коду з розумними за замовчуванням (можна відключити).

**JSX and auto closing tags** - All of VS Code's JavaScript features also work with [JSX](https://reactjs.org/docs/introducing-jsx.html):

**Unused variables and unreachable code**

**Organize Imports**

**Code suggestions** Код VS автоматично пропонує деякі поширені спрощення коду, такі як перетворення ланцюга ".then" закликає обіцяти використовувати "async" і "wait"

**References CodeLens** The JavaScript references CodeLens displays an inline count of reference for classes, methods, properties, and exported objects:

**Type checking** - You can leverage some of TypeScript's advanced type checking and  error reporting functionality in regular JavaScript files too. This is a great way to catch common programming mistakes. These type checks also  enable some exciting Quick Fixes for JavaScript, including **Add missing import** and **Add missing property**.

**Debugging** - VS Code comes with great debugging support for JavaScript. Set  breakpoints, inspect objects, navigate the call stack, and execute code  in the Debug Console. See the [Debugging topic](https://code.visualstudio.com/docs/editor/debugging) to learn more.

**Debug client side** - You can debug your client-side code using a browser debugger such as [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), [Debugger for Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) or [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug).

**Debug server side** - Debug Node.js in VS Code using the built-in debugger. Setup is easy and there is a [Node.js debugging tutorial](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial#_debugging-your-express-application) to help you.

