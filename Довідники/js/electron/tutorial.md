# Передумови

Electron — це платформа для створення настільних програм за допомогою JavaScript, HTML і CSS. Вбудовуючи [Chromium](https://www.chromium.org/) і [Node.js](https://nodejs.org/) в один бінарний файл, Electron дозволяє створювати кросплатформні програми, які працюють у Windows, macOS і Linux з єдиною кодовою базою JavaScript.

Цей підручник допоможе вам розробити настільну програму за допомогою Electron і розповсюдити її серед кінцевих користувачів.

## Цілі

Цей підручник розпочнеться з того, що проведе вас через процес збирання мінімальної програми Electron з нуля, а потім навчить вас, як упакувати та розповсюдити її користувачам за допомогою Electron Forge.

Якщо ви віддаєте перевагу розпочинати проект із однокомандного шаблону, радимо розпочати з команди [`create-electron-app`](https://www.electronforge.io/) Electron Forge.

## Припущення

Electron — це рідна оболонка для веб-програм, яка працює в середовищі Node.js. Таким чином, у цьому підручнику передбачається, що ви загалом знайомі з основами веб-розробки Node і інтерфейсу. Якщо вам потрібно прочитати довідку, перш ніж продовжити, ми рекомендуємо такі ресурси:

- [Початок роботи з Інтернетом (веб-документи MDN)](https://developer.mozilla.org/en-US/docs/Learn/)
- [Знайомство з Node.js](https://nodejs.dev/en/learn/)

## Необхідні інструменти

### Редактор коду

Для написання коду вам знадобиться текстовий редактор. Ми рекомендуємо використовувати [Visual Studio Code](https://code.visualstudio.com/), хоча ви можете вибрати будь-який із них.

### Командний рядок

У цьому посібнику ми проситимемо вас використовувати різні інтерфейси командного рядка (CLI). Ви можете ввести ці команди в системний термінал за замовчуванням:

- Windows: командний рядок або PowerShell
- macOS: термінал
- Linux: залежить від дистрибутива (наприклад, GNOME Terminal, Konsole)

Більшість редакторів коду також постачаються з вбудованим терміналом, яким ви також можете користуватися.

### Git and GitHub

Git — це поширена система контролю версій для вихідного коду, а GitHub — платформа для спільної розробки, побудована на її основі. Хоча ні те, ні інше не є суворо необхідним для створення програми Electron, ми використовуватимемо випуски GitHub для налаштування автоматичних оновлень пізніше в підручнику. Тому ми вимагатимемо від вас:

- [Create a GitHub account](https://github.com/join)
- [Install Git](https://github.com/git-guides/install-git)

Якщо ви не знаєте, як працює Git, радимо прочитати GitHub [посібники Git](https://github.com/git-guides/). Ви також можете використовувати програму [GitHub Desktop](https://desktop.github.com/), якщо ви віддаєте перевагу використанню візуального інтерфейсу замість командного рядка.

Ми рекомендуємо вам створити локальне сховище Git і опублікувати його на GitHub перед початком уроку, а також фіксувати свій код після кожного кроку. GitHub Desktop встановить останню версію Git у вашій системі, якщо вона ще не встановлена.

### Node.js and npm

Щоб розпочати розробку програми Electron, вам потрібно встановити середовище виконання [Node.js](https://nodejs.org/en/download/) і доданий до нього менеджер пакетів npm у вашу систему. Ми рекомендуємо вам використовувати останню версію довгострокової підтримки (LTS).

Порада

Установіть Node.js за допомогою попередньо створених інсталяторів для вашої платформи. Інакше ви можете зіткнутися з проблемами несумісності з різними інструментами розробки. Якщо ви користуєтеся macOS, рекомендуємо використовувати менеджер пакетів, наприклад [Homebrew](https://brew.sh/) або [nvm](https://github.com/nvm-sh/nvm), щоб уникнути будь-яких дозволів каталогу питань.

Щоб перевірити, чи правильно встановлено Node.js, ви можете використовувати прапорець `-v` під час виконання команд `node` і `npm`. Вони повинні роздрукувати встановлені версії.

```sh
$ node -v
v16.14.2
$ npm -v
8.7.0
```

Незважаючи на те, що Node.js потрібно інсталювати локально для розробки проекту Electron, Electron **не використовує інсталяцію Node.js у вашій системі для запуску свого коду**. Натомість він постачається разом із власним середовищем виконання Node.js. Це означає, що вашим кінцевим користувачам не потрібно самостійно встановлювати Node.js як передумову для запуску програми.

Щоб перевірити, яка версія Node.js працює у вашій програмі, ви можете отримати доступ до глобальної змінної [`process.versions`](https://nodejs.org/api/process.html#processversions) у головному процесі або попередньому завантаженні. сценарій. Ви також можете посилатися на https://releases.electronjs.org/releases.json.

# Створення вашої першої програми

## Цілі навчання

У цій частині підручника ви дізнаєтеся, як налаштувати свій проект Electron і написати мінімальну початкову програму. До кінця цього розділу ви зможете запустити робочу програму Electron у режимі розробки зі свого терміналу.

## Налаштування вашого проекту

Уникайте WSL

Якщо ви користуєтеся комп’ютером Windows, не використовуйте [Підсистему Windows для Linux](https://learn.microsoft.com/en-us/windows/wsl/about#what-is-wsl-2) (WSL) дотримуючись цього посібника, оскільки ви зіткнетеся з проблемами під час спроби запустити програму.

### Ініціалізація вашого проекту npm

Програми Electron створюються за допомогою npm із файлом package.json як точкою входу. Почніть із створення папки та ініціалізації в ній пакета npm за допомогою `npm init`.

- npm
- Yarn

```sh
mkdir my-electron-app && cd my-electron-app
npm init
```

Ця команда запропонує вам налаштувати деякі поля у файлі package.json. У цьому підручнику слід дотримуватися кількох правил:

- *entry point* має бути `main.js` (незабаром ви створите цей файл).
- *автор*, *ліцензія* та *опис* можуть бути будь-якими значеннями, але вони будуть необхідні для [упакування](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging) пізніше.

Потім встановіть Electron у **devDependencies** вашого додатка, який є списком зовнішніх залежностей пакетів лише для розробки, які не потрібні для виробництва.

Чому Electron є devDependency?

Це може здатися нерозумним, оскільки ваш робочий код використовує Electron API. Однак запаковані програми постачатимуться разом із двійковим файлом Electron, усуваючи потребу вказувати його як виробничу залежність.

- npm

```sh
npm install electron --save-dev
```

Ваш файл package.json має виглядати приблизно так після ініціалізації пакета та встановлення Electron. Тепер ви також повинні мати папку `node_modules`, що містить виконуваний файл Electron, а також файл `package-lock.json`, який визначає точні версії залежностей для встановлення.

package.json

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "MIT",
  "devDependencies": {
    "electron": "23.1.3"
  }
}
```

Розширені кроки встановлення Electron

Якщо не вдається встановити Electron безпосередньо, зверніться до нашої документації [Розширене встановлення](https://www.electronjs.org/docs/latest/tutorial/installation), щоб отримати інструкції щодо дзеркал завантаження, проксі-серверів і кроків з усунення несправностей.

### Додавання .gitignore

Файл [`.gitignore`](https://git-scm.com/docs/gitignore) визначає, які файли та каталоги слід уникати відстеження за допомогою Git. Вам слід розмістити копію [шаблону gitignore Node.js GitHub](https://github.com/github/gitignore/blob/main/Node.gitignore) у кореневу папку вашого проекту, щоб уникнути фіксації папки `node_modules` вашого проекту.

## Running an Electron app

Подальше читання

Прочитайте документацію [модель процесу Electron](https://www.electronjs.org/docs/latest/tutorial/process-model), щоб краще зрозуміти, як працюють разом численні процеси Electron.

Сценарій [`main`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main), який ви визначили в package.json, є точкою входу будь-якої програми Electron. Цей сценарій керує **основним процесом**, який виконується в середовищі Node.js і відповідає за контроль життєвого циклу вашої програми, відображення власних інтерфейсів, виконання привілейованих операцій і керування процесами візуалізації (про це пізніше).

Перш ніж створити свою першу програму Electron, ви спершу використаєте тривіальний сценарій, щоб переконатися, що ваша головна точка входу процесу налаштована правильно. Створіть файл `main.js` у кореневій папці вашого проекту за допомогою одного рядка коду:

main.js

```js
console.log('Hello from Electron 👋')
```

Оскільки основним процесом Electron є середовище виконання Node.js, ви можете виконати довільний код Node.js за допомогою команди `electron` (ви навіть можете використовувати її як [REPL](https://www.electronjs.org/docs/latest/tutorial/repl)). Щоб виконати цей сценарій, додайте `electron .` до команди `start` у полі [`scripts`](https://docs.npmjs.com/cli/v7/using-npm/scripts) вашого package.json . Ця команда накаже виконуваному файлу Electron шукати головний сценарій у поточному каталозі та запускати його в режимі розробника.

package.json

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Doe",
  "license": "MIT",
  "devDependencies": {
    "electron": "23.1.3"
  }
}
```

- npm

```sh
npm run start
```

Ваш термінал має вивести `Hello from Electron 👋`. Вітаємо, ви виконали свій перший рядок коду в Electron! Далі ви дізнаєтеся, як створювати інтерфейси користувача за допомогою HTML і завантажувати їх у нативне вікно.

## Завантаження веб-сторінки у BrowserWindow

У Electron кожне вікно відображає веб-сторінку, яку можна завантажити з локального файлу HTML або з віддаленої веб-адреси. У цьому прикладі ви завантажуватимете локальний файл. Почніть із створення веб-сторінки barebone у файлі `index.html` у кореневій папці вашого проекту:

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
  </body>
</html>
```

Тепер, коли у вас є веб-сторінка, ви можете завантажити її у Electron [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window). Замініть вміст вашого файлу `main.js` таким кодом. Ми пояснимо кожен виділений блок окремо.

main.js

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
```

### Importing modules

main.js (Line 1)

```js
const { app, BrowserWindow } = require('electron')
```

У першому рядку ми імпортуємо два модулі Electron із синтаксисом модуля CommonJS:

- [app](https://www.electronjs.org/docs/latest/api/app), який контролює життєвий цикл подій вашої програми.
- [BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window), який створює вікна програм і керує ними.

Правила використання великих літер модуля

Можливо, ви помітили різницю у використанні великих літер між модулями **a**pp і **B**rowser**W**indow. Тут Electron дотримується типових угод JavaScript, де модулі PascalCase є конструкторами класів, що створюються (наприклад, BrowserWindow, Tray, Notification), тоді як модулі camelCase не створюються (наприклад, app, ipcRenderer, webContents).

Введені псевдоніми імпорту

Для кращої перевірки типу під час написання коду TypeScript ви можете вибрати імпорт основних модулів процесу з `electron/main`.

```js
const { app, BrowserWindow } = require('electron/main')
```

For more information, see the [Process Model docs](https://www.electronjs.org/docs/latest/tutorial/process-model#process-specific-module-aliases-typescript).

ES Modules in Electron

[ECMAScript modules](https://nodejs.org/api/esm.html) (i.e. using `import` to load a module) are currently not directly supported in Electron. You can find more information about the state of ESM in Electron in [electron/electron#21457](https://github.com/electron/electron/issues/21457).

### Writing a reusable function to instantiate windows

The `createWindow()` function loads your web page into a new BrowserWindow instance:

main.js (Lines 3-10)

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}
```

### Calling your function when the app is ready

main.js (Lines 12-14)

```js
app.whenReady().then(() => {
  createWindow()
})
```

Багато основних модулів Electron є Node.js [випромінювачами подій](https://nodejs.org/api/events.html#events), які дотримуються асинхронної керованої подіями архітектури Node. Модуль програми є одним із таких випромінювачів.

В Electron BrowserWindows можна створити лише після запуску події [`ready`](https://www.electronjs.org/docs/latest/api/app#event-ready) модуля програми. Ви можете дочекатися цієї події, скориставшись [`app.whenReady()`](https://www.electronjs.org/docs/latest/api/app#appwhenready) API та викликавши `createWindow()`, коли він обіцяє виконується.

інформація

Зазвичай ви слухаєте події Node.js за допомогою функції `.on` емітера.

```diff
+ app.on('ready', () => {
- app.whenReady().then(() => {
  createWindow()
})
```

Однак Electron надає `app.whenReady()` як помічник спеціально для події `ready`, щоб уникнути тонких пасток із прямим прослуховуванням цієї події зокрема. Див. [electron/electron#21972](https://github.com/electron/electron/pull/21972) для отримання додаткової інформації.

На цьому етапі виконання команди `start` вашої програми Electron має успішно відкрити вікно, яке відображає вашу веб-сторінку!

Кожна веб-сторінка, яку ваша програма відображає у вікні, працюватиме в окремому процесі, який називається процесом **рендерера** (або просто *рендерера*). Процеси рендерера мають доступ до тих самих JavaScript API та інструментів, які ви використовуєте для типової зовнішньої веб-розробки, як-от використання [webpack](https://webpack.js.org) для об’єднання та мінімізації вашого коду або [React](https ://reactjs.org), щоб створити ваш інтерфейс користувача.

## Керування життєвим циклом вікна програми

Вікна програм поводяться по-різному в кожній операційній системі. Замість того, щоб застосовувати ці угоди за замовчуванням, Electron дає вам можливість реалізувати їх у коді програми, якщо ви хочете їх дотримуватися. Ви можете реалізувати базові угоди щодо вікон, прослуховуючи події, які випромінюють модулі програми та BrowserWindow.

Процес керування потоком

Перевірка змінної Node [`process.platform`](https://nodejs.org/api/process.html#process_process_platform) може допомогти вам виконувати код умовно на певних платформах. Зверніть увагу, що існує лише три можливі платформи, на яких може працювати Electron: `win32` (Windows), `linux` (Linux) і `darwin` (macOS).

### Закрийте програму, коли всі вікна закриті (Windows і Linux)

У Windows і Linux закриття всіх вікон зазвичай призведе до повного завершення програми. Щоб застосувати цей шаблон у своїй програмі Electron, прослухайте [`window-all-closed`] модуля програми (https://www.electronjs.org/docs/latest/api/app#event-window-all-closed) події та виклик [`app.quit()`](https://www.electronjs.org/docs/latest/api/app#appquit), щоб вийти з вашої програми, якщо користувач не в macOS.

```js
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

### Open a window if none are open (macOS)

In contrast, macOS apps generally continue running even without any windows open. Activating the app when no windows are available should open a new one.

To implement this feature, listen for the app module's [`activate`](https://www.electronjs.org/docs/latest/api/app#event-activate-macos) event, and call your existing `createWindow()` method if no BrowserWindows are open.

Because windows cannot be created before the `ready` event, you should only listen for `activate` events after your app is initialized. Do this by only listening for activate events inside your existing `whenReady()` callback.

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

## Final starter code

[docs/fiddles/tutorial-first-app (27.0.0)](https://github.com/electron/electron/tree/v27.0.0/docs/fiddles/tutorial-first-app)

- main.js

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </body>
  <script src="./renderer.js"></script>
</html>
```



## Optional: Debugging from VS Code

If you want to debug your application using VS Code, you need to attach VS Code to both the main and renderer processes. Here is a sample configuration for you to run. Create a launch.json configuration in a new `.vscode` folder in your project:

.vscode/launch.json

```json
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Main + renderer",
      "configurations": ["Main", "Renderer"],
      "stopAll": true
    }
  ],
  "configurations": [
    {
      "name": "Renderer",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": [".", "--remote-debugging-port=9222"],
      "outputCapture": "std",
      "console": "integratedTerminal"
    }
  ]
}
```

The "Main + renderer" option will appear when you select "Run and Debug" from the sidebar, allowing you to set breakpoints and inspect all the variables among other things in both the main and renderer processes.

What we have done in the `launch.json` file is to create 3 configurations:

- `Main` is used to start the main process and also expose port 9222 for remote debugging (`--remote-debugging-port=9222`). This is the port that we will use to attach the debugger for the `Renderer`. Because the main process is a Node.js process, the type is set to `node`.
- `Renderer` is used to debug the renderer process. Because the main process is the one that creates the process, we have to "attach" to it (`"request": "attach"`) instead of creating a new one. The renderer process is a web one, so the debugger we have to use is `chrome`.
- `Main + renderer` is a [compound task](https://code.visualstudio.com/Docs/editor/tasks#_compound-tasks) that executes the previous ones simultaneously.



caution

Because we are attaching to a process in `Renderer`, it is possible that the first lines of your code will be skipped as the debugger will not have had enough time to connect before they are being executed. You can work around this by refreshing the page or setting a timeout before executing the code in development mode.



Further reading

If you want to dig deeper in the debugging area, the following guides provide more information:

- [Application Debugging](https://www.electronjs.org/docs/latest/tutorial/application-debugging)
- [DevTools Extensions](https://www.electronjs.org/docs/latest/tutorial/devtools-extension)

## Summary

Electron applications are set up using npm packages. The Electron executable should be installed in your project's `devDependencies` and can be run in development mode using a script in your package.json file.

The executable runs the JavaScript entry point found in the `main` property of your package.json. This file controls Electron's **main process**, which runs an instance of Node.js and is responsible for your app's lifecycle, displaying native interfaces, performing privileged operations, and managing renderer processes.

**Renderer processes** (or renderers for short) are responsible for displaying graphical content. You can load a web page into a renderer by pointing it to either a web address or a local HTML file. Renderers behave very similarly to regular web pages and have access to the same web APIs.

In the next section of the tutorial, we will be learning how to augment the renderer process with privileged APIs and how to communicate between processes.