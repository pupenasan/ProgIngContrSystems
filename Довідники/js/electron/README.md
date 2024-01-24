# Що таке Електрон?

Electron — це платформа для створення настільних програм за допомогою JavaScript, HTML і CSS. Вставляючи [Chromium](https://www.chromium.org/) і [Node.js](https://nodejs.org/) у двійковий файл, Electron дозволяє підтримувати одну кодову базу JavaScript і створювати кросплатформні програми, які працюють у Windows, macOS і Linux — досвід розробки не потрібен.

## Починаємо

Ми рекомендуємо вам почати з [навчального посібника](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites), який допоможе вам розробити програму Electron і розповсюдити її серед користувачів. [Приклади](https://www.electronjs.org/docs/latest/tutorial/examples) і [документація API](https://www.electronjs.org/docs/latest/api/app) також хороші місця, де можна переглядати та відкривати для себе нові речі.

## Запуск прикладів за допомогою Electron Fiddle

[Electron Fiddle](https://electronjs.org/fiddle) — це програма ізольованого середовища, написана на Electron і підтримується розробниками Electron. Ми наполегливо рекомендуємо встановити його як навчальний інструмент, щоб експериментувати з API Electron або прототипувати функції під час розробки.

Fiddle також чудово інтегрується з нашою документацією. Переглядаючи приклади в наших посібниках, ви часто побачите кнопку «Відкрити в Electron Fiddle» під блоком коду. Якщо у вас встановлено Fiddle, ця кнопка відкриє посилання `fiddle.electronjs.org`, яке автоматично завантажить приклад у Fiddle, без копіювання.

[docs/fiddles/quick-start (27.0.0)](https://github.com/electron/electron/tree/v27.0.0/docs/fiddles/quick-start)

- main.js
- preload.js
- index.html

```js
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
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

## Що міститься в документах?

Уся офіційна документація доступна на бічній панелі. Це різні категорії та те, що ви можете очікувати від кожної з них:

- **Tutorial**: An end-to-end guide on how to create and publish your first Electron application.
- **Processes in Electron**: In-depth reference on Electron processes and how to work with them.
- **Best Practices**: Important checklists to keep in mind when developing an Electron app.
- **Examples**: Quick references to add features to your Electron app.
- **Development**: Miscellaneous development guides.
- **Distribution**: Learn how to distribute your app to end users.
- **Testing And Debugging**: How to debug JavaScript, write tests, and other tools used to create quality Electron applications.
- **References**: Useful links to better understand how the Electron project works and is organized.
- **Contributing**: Compiling Electron and making contributions can be daunting. We try to make it easier in this section.

## Отримання допомоги

Ви десь застрягли? Ось кілька посилань на місця, які варто подивитися:

- Якщо вам потрібна допомога з розробкою програми, наш [сервер спільноти Discord](https://discord.gg/electronjs) є чудовим місцем, щоб отримати поради від інших розробників програм Electron.
- Якщо ви підозрюєте, що ви зіткнулися з помилкою пакета `electron`, будь ласка, перевірте [систему відстеження проблем GitHub](https://github.com/electron/electron/issues), щоб перевірити, чи існуючі проблеми відповідають вашій проблемі. . Якщо ні, не соромтеся заповнити наш шаблон звіту про помилку та надіслати нову проблему.