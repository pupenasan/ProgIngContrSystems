# PREACT

https://preactjs.com/

# Getting Started

Preact упакований для використання безпосередньо у браузері, і не потребує жодної збірки чи інструментів:

```html
<script type="module">
  import { h, Component, render } from 'https://esm.sh/preact';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>
```

Основним недоліком розробки таким чином є відсутність JSX, який вимагає етапу збірки. Ергономічна та продуктивна альтернатива JSX описана в наступному розділі.

### Alternatives to JSX

Написання необроблених викликів `h` або `createElement` може бути виснажливим. Перевага JSX полягає в тому, що він виглядає схожим на HTML, що полегшує його розуміння багатьом розробникам. Однак для JSX потрібен етап збірки, тому ми настійно рекомендуємо альтернативу під назвою [HTM](https://github.com/developit/htm).

[HTM](https://github.com/developit/htm) — це JSX-подібний синтаксис, який працює в стандартному JavaScript. Замість того, щоб вимагати крок збірки, він використовує власний синтаксис JavaScript [Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates), який було додано в 2015 році та підтримується в [усіх сучасних браузерах](https://caniuse.com/#feat=template-literals). Це все більш популярний спосіб написання додатків Preact, оскільки потрібно зрозуміти менше рухомих частин, ніж традиційне налаштування інструментів для інтерфейсу.

```html
<script type="module">
  import { h, Component, render } from 'https://esm.sh/preact';
  import htm from 'https://esm.sh/htm';

  // Initialize htm with Preact
  const html = htm.bind(h);

  function App (props) {
    return html`<h1>Hello ${props.name}!</h1>`;
  }

  render(html`<${App} name="World" />`, document.body);
</script>
```

> **Порада:** HTM також надає зручну версію Preact для одного імпорту:
>
> ```
> import { html, render } from 'https://esm.sh/htm/preact/standalone'
> ```

Щоб дізнатися більше про HTM, ознайомтеся з [документацією](https://github.com/developit/htm).

## Створіть програму Preact на основі Vite

[Vite](https://vitejs.dev) за останні кілька років став неймовірно популярним інструментом для створення додатків у багатьох фреймворках, і Preact не є винятком. Його створено на основі таких популярних інструментів, як модулі ES, Rollup і ESBuild. Vite, через наш ініціалізатор або їхній шаблон Preact, не потребує конфігурації чи попередніх знань, щоб розпочати роботу, і ця простота робить його дуже популярним способом використання Preact.

Щоб швидко розпочати роботу з Vite, ви можете скористатися нашим ініціалізатором `create-preact`. Це програма з інтерактивним інтерфейсом командного рядка (CLI), яку можна запускати в терміналі на вашому комп’ютері. Використовуючи його, ви можете створити нову програму, виконавши наступне:

```bash
npm init preact
```

Це допоможе вам створити нову програму Preact і надасть вам деякі параметри, такі як TypeScript, маршрутизація (через `preact-iso`) і підтримка ESLint.

> **Порада.** Жодне з цих рішень не має бути остаточним. Ви завжди можете додати або видалити їх зі свого проекту пізніше, якщо передумаєте.

### Готуємося до розроблення

Тепер ми готові почати розробку нашої пограми. Щоб запустити сервер розробки, виконайте таку команду всередині новоствореної папки проекту:

```bash
# Go into the generated project folder
cd my-preact-app

# Start a development server
npm run dev
```

Щойно сервер запуститься, він надрукує URL-адресу локальної розробки, щоб відкрити її у вашому браузері. Тепер ви готові почати кодувати свою програму!

### Створення збірки

Настає час, коли вам потрібно десь розгорнути свою програму. Vite постачається зі зручною командою `build`, яка створить високооптимізовану робочу збірку.

```bash
npm run build
```

> Щоб отримати повний список усіх доступних команд і їх параметрів, перегляньте [документацію Vite CLI](https://vitejs.dev/guide/cli.html).

## Інтеграція в існуючий конвеєр

Якщо у вас уже є налаштований конвеєр інструментів, дуже ймовірно, що він включає групувальник (bundler). Найпопулярнішими варіантами є [webpack](https://webpack.js.org/), [rollup](https://rollupjs.org) або [parcel](https://parceljs.org/). Preact працює одразу з усіма ними. Зміни не потрібні!

### Setting up JSX

Щоб транспілювати JSX, вам потрібен плагін Babel, який перетворює його на дійсний код JavaScript. Той, який ми всі використовуємо, це [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx). Після встановлення вам потрібно вказати функцію для JSX, яку слід використовувати:

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", {
      "pragma": "h",
      "pragmaFrag": "Fragment",
    }]
  ]
}
```

> [Babel](https://babeljs.io/) містить найкращу документацію. Ми настійно рекомендуємо перевірити його, щоб отримати запитання щодо Babel і того, як його налаштувати.

### Aliasing React to Preact

У якийсь момент ви, ймовірно, захочете скористатися величезною екосистемою React. Бібліотеки та компоненти, спочатку написані для React, бездоганно працюють із нашим рівнем сумісності. Щоб використовувати його, нам потрібно вказати всі імпортовані файли `react` і `react-dom` на Preact. Цей крок називається *псевдонімом (aliasing).*

> **Note:** If you're using Vite, Preact CLI, or WMR, these aliases are automatically handled for you by default.

#### Aliasing in webpack

To alias any package in webpack, you need to add the `resolve.alias` section to your config. Depending on the configuration you're using, this section may already be present, but missing the aliases for Preact.

```js
const config = {
   //...snip
  "resolve": {
    "alias": {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  }
}
```

#### Aliasing in Node

When we are on a Node.JS server our webpack aliases won't work, this is seen in Next/... here we will have to use an alias in our `package.json`.

```json
{
  "dependencies": {
    "react": "npm:@preact/compat",
    "react-dom": "npm:@preact/compat",
  }
}
```

Now Node will correctly use Preact in place of React.

#### Aliasing in Parcel

Parcel uses the standard `package.json` file to read configuration options under an `alias` key.

```json
{
  "alias": {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime"
  },
}
```

#### Aliasing in Rollup

To alias within Rollup, you'll need to install [@rollup/plugin-alias](https://github.com/rollup/plugins/tree/master/packages/alias). The plugin will need to be placed before your [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)

```js
import alias from '@rollup/plugin-alias';

module.exports = {
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
      ]
    })
  ]
};
```

#### Aliasing in Jest

[Jest](https://jestjs.io/) allows the rewriting of module paths similar to bundlers. These rewrites are configured using regular expressions in your Jest configuration:

```json
{
  "moduleNameMapper": {
    "^react$": "preact/compat",
    "^react-dom/test-utils$": "preact/test-utils",
    "^react-dom$": "preact/compat",
    "^react/jsx-runtime$": "preact/jsx-runtime"
  }
}
```

#### Aliasing in Snowpack

To alias in [Snowpack](https://www.snowpack.dev/), you'll need to add a package import alias to the `snowpack.config.mjs` file.

```js
// snowpack.config.mjs
export default {
  alias: {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
  }
}
```

## TypeScript preact/compat configuration

Вашому проекту може знадобитися підтримка ширшої екосистеми React. Щоб змусити вашу програму скомпілюватися, вам може знадобитися вимкнути перевірку типів у ваших `node_modules` і додати шляхи до таких типів. Таким чином, ваш псевдонім працюватиме належним чином, коли бібліотеки імпортують React.

```json
{
  "compilerOptions": {
    ...
    "skipLibCheck": true,
    "baseUrl": "./",
    "paths": {
      "react": ["./node_modules/preact/compat/"],
      "react-dom": ["./node_modules/preact/compat/"]
    }
  }
}
```

# Tutorial

## Virtual DOM

Можливо, ви чули, як люди називають «віртуальний DOM», і задавалися питанням: що робить його «віртуальним»? Чим "віртуальний" DOM відрізняється від справжнього DOM, який ми використовуємо під час програмування для браузера?

Віртуальний DOM — це простий опис деревовидної структури за допомогою об’єктів:

```js
let vdom = {
  type: 'p',         // a <p> element
  props: {
    class: 'big',    // with class="big"
    children: [
      'Hello World!' // and the text "Hello World!"
    ]
  }
}
```

Такі бібліотеки, як Preact, надають спосіб створення цих описів, які потім можна порівняти з деревом DOM браузера. У міру порівняння кожної частини дерева DOM-дерево браузера оновлюється відповідно до структури, описаної віртуальним DOM-деревом.

Це корисний інструмент, оскільки він дозволяє нам створювати інтерфейс користувача *декларативно*, а не *імперативно*. Замість того, щоб описувати *як* оновити DOM у відповідь на такі речі, як введення з клавіатури чи миші, нам потрібно лише описати, *як* має виглядати DOM після отримання цього введення. Це означає, що ми можемо неодноразово надавати Preact описи деревовидних структур, і він оновлюватиме дерево DOM браузера відповідно до кожного нового опису – незалежно від його поточної структури.

У цьому розділі ми дізнаємося, як створювати віртуальні дерева DOM і як наказати Preact оновлювати DOM відповідно до цих дерев.

### Створення віртуальних дерев DOM

Існує кілька способів створення віртуальних дерев DOM:

- `createElement()`: функція, надана Preact
- [JSX](https://en.wikipedia.org/wiki/JSX_(JavaScript)): HTML-подібний синтаксис, який можна скомпілювати до JavaScript
- [HTM](https://github.com/developit/htm): HTML-подібний синтаксис, який можна писати безпосередньо в JavaScript

Корисно почати з найпростішого підходу, який полягав би у прямому виклику функції `createElement()` Preact:

```jsx
import { createElement, render } from 'preact';

let vdom = createElement(
  'p',              // a <p> element
  { class: 'big' }, // with class="big"
  'Hello World!'    // and the text "Hello World!"
);

render(vdom, document.body);
```

Наведений вище код створює віртуальний DOM "опис" елемента абзацу. Першим аргументом для createElement є ім’я елемента HTML. Другим аргументом є "props" елемента - об'єкт, що містить атрибути (або властивості), які потрібно встановити для елемента. Будь-які додаткові аргументи є дочірніми для елемента, які можуть бути рядками (наприклад, `'Hello World!'`) або віртуальними елементами DOM з додаткових викликів `createElement()`.

Останній рядок повідомляє Preact створити справжнє дерево DOM, яке відповідає нашому «опису» Virtual DOM, і вставити це дерево DOM у `<body>` веб-сторінки.

### Тепер з більшою кількістю JSX!

Ми можемо переписати попередній приклад за допомогою [JSX](https://en.wikipedia.org/wiki/JSX_(JavaScript)), не змінюючи його функціональність. JSX дозволяє нам описувати наш елемент абзацу за допомогою HTML-подібного синтаксису, який може допомогти зберегти читабельність речей, коли ми описуємо складніші дерева. Недоліком JSX є те, що наш код більше не пишеться на JavaScript і має бути скомпільований таким інструментом, як [Babel](https://babeljs.io). Компілятори виконують роботу з перетворення наведеного нижче прикладу JSX у точний код `createElement()`, який ми бачили в попередньому прикладі.

```jsx
import { createElement, render } from 'preact';

let vdom = 
    <p class="big">
        Hello World!
    </p>;

render(vdom, document.body);
```

Тепер він набагато більше схожий на HTML!

Є ще одна річ, яку слід пам’ятати про JSX: код всередині елемента JSX (у кутових дужках) є спеціальним синтаксисом, а не JavaScript. Щоб використовувати синтаксис JavaScript, як-от числа чи змінні, спочатку потрібно «вискочити» з JSX за допомогою `{expression}` - подібно до полів у шаблоні. У наведеному нижче прикладі показано два вирази: один для встановлення  `class`  випадкового рядка, а інший для обчислення числа.

```jsx
let maybeBig = Math.random() > .5 ? 'big' : 'small';

let vdom = <p class={maybeBig}>Hello {40 + 2}!</p>;
                 // ^---JS---^       ^--JS--^
```

Якби ми мали `render(vdom, document.body)`, було б показано текст "Hello 42!" .

### Ще раз із HTM

[HTM](https://github.com/developit/htm) — це альтернатива JSX, яка використовує стандартні шаблони з тегами JavaScript, усуваючи потребу в компіляторі. Якщо ви не стикалися з шаблонами з тегами, це особливий тип рядкового літералу, який може містити поля `${expression}`:

```js
let str = `Quantity: ${40 + 2} units`;  // "Quantity: 42 units"
```

HTM використовує `${expression}` замість синтаксису `{expression}` з JSX, що може зробити зрозумілішим, які частини вашого коду є елементами HTM/JSX, а які — простим JavaScript:

```js
import { html } from 'htm/preact';

let maybeBig = Math.random() > .5 ? 'big' : 'small';

let vdom = html`<p class=${maybeBig}>Hello ${40 + 2}!</p>`;
                        // ^--JS--^          ^-JS-^
```

Усі ці приклади дають однаковий результат: віртуальне дерево DOM, яке можна надати Preact для створення або оновлення існуючого дерева DOM.

------

### Обхідний шлях: компоненти

Пізніше в цьому підручнику ми детальніше розповімо про компоненти, але наразі важливо знати, що такі елементи HTML, як `<p>`, є лише одним із *двох* типів елементів Virtual DOM. Інший тип — це Component, який є елементом Virtual DOM, де типом є функція, а не рядок, як-от `p`.

Компоненти є будівельними блоками додатків Virtual DOM. Наразі ми створимо дуже простий компонент, перемістивши наш JSX у функцію:

```jsx
import { createElement } from 'preact';

export default function App() {
    return (
        <p class="big">Hello World!</p>
    )
}

render(<App />, document.getElementById("app"));
```

Під час передачі компонента в `render()` важливо дозволити Preact створити екземпляр, а не викликати ваш компонент напряму, що призведе до несподіваних збоїв:

```jsx
const App = () => <div>foo</div>;

// DON'T: Invoking components directly breaks hooks and update ordering:
render(App(), rootElement); // ERROR
render(App, rootElement); // ERROR

// DO: Passing components using createElement() or JSX allows Preact to render correctly:
render(createElement(App), rootElement); // success
render(<App />, rootElement); // success
```

### Спробуй це!

У правій частині [цієї сторінки](https://preactjs.com/tutorial/01-vdom) вгорі ви побачите код із нашого попереднього прикладу. Під ним є поле з результатом виконання цього коду. Ви можете відредагувати код і побачити, як ваші зміни впливають (або порушують!) на результат.

Щоб перевірити те, чого ви навчилися в цьому розділі, спробуйте додати тексту ще більше шикарності! Зробіть слово `World` виділяючим, обернувши його тегами HTML: `<em>` і `</em>`.

Потім зробіть весь текст фіолетовим, додавши атрибут `style`. Опис `style` є спеціальним і дозволяє встановити значення об’єкта з однією або кількома властивостями CSS для елемента. Щоб передати об’єкт як значення властивості, вам потрібно буде використати `{expression}`, наприклад `style={{ property: 'value' }}`.

## Події

Події — це те, як ми робимо додатки інтерактивними, реагуючи на введення, як-от клавіатура та миша, і реагуючи на зміни, як-от завантаження зображення. Події в Preact працюють так само, як і в DOM – будь-який тип події чи поведінку, які ви можете знайти на [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events ) можна використовувати в Preact. Як приклад, ось як зазвичай реєструються обробники подій за допомогою імперативного DOM API:

```js
function clicked() {
  console.log('clicked')
}
const myButton = document.getElementById('my-button')
myButton.addEventListener('click', clicked)
```

Відмінність Preact від DOM API полягає в тому, як реєструються обробники подій. У Preact обробники подій реєструються декларативно як властивості елемента, так само як `style` і `class`. Загалом, будь-який проп, ім’я якого починається з «on», є обробником події. Значення властивості обробника події — це функція обробника, яка буде викликана, коли відбудеться ця подія.

Наприклад, ми можемо прослухати подію «click» на кнопці, додавши властивість `onClick` із значенням нашої функції обробки:

```jsx
function clicked() {
  console.log('clicked')
}
<button onClick={clicked}>
```

Імена обробників подій чутливі до регістру, як і всі імена властивостей. Однак Preact визначить, коли ви реєструєте стандартний тип події для елемента (клацання, зміна, переміщення дотиком тощо), і використає правильний регістр за кадром. Ось чому `<button onClick={..}>` працює, навіть якщо подією є `"click"` (нижній регістр).

------

### Спробуй це!

Щоб завершити цю главу, спробуйте додати власний обробник кліків до JSX для елемента кнопки праворуч. У вашому обробнику зареєструйте повідомлення за допомогою `console.log()`, як ми зробили вище.

Після виконання коду натисніть кнопку, щоб викликати обробник подій і перейти до наступного розділу.

## Components

Як ми згадували в першій частині цього посібника, ключовим будівельним блоком у додатках Virtual DOM є компонент. Компонент — це самостійна частина програми, яку можна відобразити як частину дерева віртуальної DOM, як і елемент HTML. Ви можете думати про компонент як про виклик функції: обидва є механізмами, які дозволяють повторне використання коду та опосередкованість.

Для ілюстрації створимо простий компонент під назвою `MyButton`, який повертає віртуальне дерево DOM, що описує елемент HTML `<button>`:

```jsx
function MyButton(props) {
  return <button class="my-button">{props.text}</button>
}
```

Ми можемо використовувати цей компонент у програмі, посилаючись на нього в JSX:

```js
let vdom = <MyButton text="Click Me!" />

// remember createElement? here's what the line above compiles to:
let vdom = createElement(MyButton, { text: "Click Me!" })
```

Усюди, де ви використовуєте JSX для опису дерев HTML, ви також можете описати дерева компонентів. Різниця полягає в тому, що компонент описується в JSX за допомогою імені, що починається з верхнього регістру, який відповідає імені компонента (змінна JavaScript).

Коли Preact візуалізує дерево Virtual DOM, описане вашим JSX, кожна функція компонента, яку він зустріне, буде викликана в цьому місці дерева. Як приклад, ми можемо відобразити наш компонент `MyButton` у тілі веб-сторінки, передавши елемент JSX, що описує цей компонент, до `render()`:

```jsx
import { render } from 'preact';

render(<MyButton text="Click me!" />, document.body)
```

### Вкладені компоненти

Компоненти можуть посилатися на інші компоненти у віртуальному дереві DOM, яке вони повертають. Це створює дерево компонентів:

```jsx
function MediaPlayer() {
  return (
    <div>
      <MyButton text="Play" />
      <MyButton text="Stop" />
    </div>
  )
}

render(<MediaPlayer />, document.body)
```

Ми можемо використовувати цю техніку для візуалізації різних дерев компонентів для різних сценаріїв. Давайте зробимо так, щоб `MediaPlayer` показував кнопку «Play», коли звук не відтворюється, і кнопку «Stop», коли відтворюється звук:

```jsx
function MediaPlayer(props) {
  return (
    <div>
      {props.playing ? (
        <MyButton text="Stop" />
      ) : (
        <MyButton text="Play" />
      )}
    </div>
  )
}

render(<MediaPlayer playing={false} />, document.body)
// renders <button>Play</button>

render(<MediaPlayer playing={true} />, document.body)
// renders <button>Stop</button>
```

> **Пам’ятайте:** дужки `{curly}` в JSX дозволяють повернутися до звичайного JavaScript. Тут ми використовуємо [тернарний](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) вираз, щоб показати різні кнопки на основі значення `playing` опора

### Діти компонента

Компоненти також можуть бути вкладеними, як елементи HTML. Однією з причин, чому компоненти є потужним примітивом, є те, що вони дозволяють нам застосовувати спеціальну логіку, щоб керувати тим, як елементи віртуальної DOM, вкладені в компонент, повинні відтворюватися.

Те, як це працює, оманливо просте: будь-які віртуальні елементи DOM, вкладені в компонент у JSX, передаються цьому компоненту як спеціальний проп `children` . Компонент може вибрати, де розмістити своїх дочірніх компонентів, посилаючись на них у JSX за допомогою виразу `{children}`. Або компоненти можуть просто повернути значення `children`, і Preact відобразить ці елементи Virtual DOM саме там, де цей компонент було розміщено в дереві Virtual DOM.

```jsx
<Foo>
  <a />
  <b />
</Foo>

function Foo(props) {
  return props.children  // [<a />, <b />]
}
```

Повертаючись до попереднього прикладу, наш компонент `MyButton` очікував властивість `text`, яка була вставлена в елемент `<button>` як текст відображення. Що, якби ми хотіли відобразити зображення замість тексту?

Давайте перепишемо `MyButton`, щоб дозволити вкладення за допомогою властивості `children`:

```jsx
function MyButton(props) {
  return <button class="my-button">{props.children}</button>
}

function App() {
  return (
    <MyButton>
      <img src="icon.png" />
      Click Me!
    </MyButton>
  )
}

render(<App />, document.body)
```

Тепер, коли ми побачили кілька прикладів компонентів, які рендерять інші компоненти, сподіваюся, стало зрозуміло, як вкладені компоненти дозволяють нам збирати складні програми з багатьох менших окремих частин.

------

### Типи компонентів

Поки що ми бачили Компоненти, які є функціями. Функціональні компоненти приймають `props` як вхідні дані та повертають віртуальне дерево DOM як вихідні дані. Компоненти також можна записати як класи JavaScript, які створюються Preact і надають метод `render()`, який працює так само, як функціональний компонент.

Компоненти класу створюються шляхом розширення базового класу `Component` Preact. У наведеному нижче прикладі зверніть увагу на те, як `render()` приймає `props` як вхідні дані та повертає віртуальне дерево DOM як вихідні дані - як і компонент функції!

```jsx
import { Component } from 'preact';

class MyButton extends Component {
  render(props) {
    return <button class="my-button">{props.children}</button>
  }
}

render(<MyButton>Click Me!</MyButton>, document.body)
```

Причина, чому ми можемо використовувати клас для визначення компонента, полягає в тому, щоб відстежувати *життєвий цикл* нашого компонента. Кожного разу, коли Preact стикається з компонентом під час візуалізації дерева Virtual DOM, він створюватиме новий екземпляр нашого класу (`new MyButton()`).

Однак, якщо ви пам’ятаєте першу главу, Preact можна неодноразово давати нові дерева Virtual DOM. Кожного разу, коли ми надаємо Preact нове дерево, воно порівнюється з попереднім деревом, щоб визначити, що змінилося між двома, і ці зміни застосовуються до сторінки.

Коли компонент визначено за допомогою класу, будь-які *оновлення* цього компонента в дереві повторно використовуватимуть той самий екземпляр класу. Це означає, що можна зберігати дані всередині компонента класу, які будуть доступні під час наступного виклику його методу `render()`.

Компоненти класу також можуть реалізовувати низку [методів життєвого циклу](https://preactjs.com/guide/v10/components#lifecycle-methods), які Preact викличе у відповідь на зміни у дереві Virtual DOM:

```jsx
class MyButton extends Component {
  componentDidMount() {
    console.log('Hello from a new <MyButton> component!')
  }
  componentDidUpdate() {
    console.log('A <MyButton> component was updated!')
  }
  render(props) {
    return <button class="my-button">{props.children}</button>
  }
}

render(<MyButton>Click Me!</MyButton>, document.body)
// logs: "Hello from a new <MyButton> component!"

render(<MyButton>Click Me!</MyButton>, document.body)
// logs: "A <MyButton> component was updated!"
```

Життєвий цикл компонентів класу робить їх корисним інструментом для побудови частин програми, які реагують на зміни, а не суворо відображають `props` на дерева. Вони також надають можливість зберігати інформацію окремо в кожному місці, де вони розміщені у віртуальному дереві DOM. У наступному розділі ми побачимо, як компоненти можуть оновлювати свій розділ дерева щоразу, коли вони хочуть його змінити.

------

### Спробуй це!

Щоб потренуватися, давайте поєднаємо те, що ми дізналися про компоненти, з нашими навичками проведення подій з попередніх двох розділів!

Створіть компонент `MyButton`, який приймає властивості `style`, `children` і `onClick`, і повертає елемент HTML `<button>` із застосуванням цих властивостей.

## State

Now that we know how to create HTML elements and components, and how to pass props and event handlers to both using JSX, it's time to learn how to update the Virtual DOM tree.

As we alluded to in the previous chapter, both function and class components can have **state** - data stored by a component that is used to change its Virtual DOM tree. When a component updates its state, Preact re-renders that component using the updated state value. For function components, this means Preact will re-invoke the function, whereas for class components it will only re-invoke the class' `render()` method. Let's look at an example of each.

### State in class components

Class components have a `state` property, which is an object that holds data the component can use when its `render()` method is called. A component can call `this.setState()` to update its `state` property and request that it be re-rendered by Preact.

```jsx
class MyButton extends Component {
  state = { clicked: false }

  handleClick = () => {
    this.setState({ clicked: true })
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.clicked ? 'Clicked' : 'No clicks yet'}
      </button>
    )
  }
}
```

Clicking the button calls `this.setState()`, which causes Preact to call the class' `render()` method again. Now that `this.state.clicked` is `true`, the `render()` method returns a Virtual DOM tree containing the text "Clicked" instead of "No clicks yet", causing Preact to update the button's text in the DOM.

### State in function components using hooks

Function components can have state too! While they don't have a `this.state` property like class components, a tiny add-on module is included with Preact that provides functions for storing and working with state inside function components, called "hooks".

Hooks are special functions that can be called from within a function component. They're special because they **remember information across renders**, a bit like properties and methods on a class. For example, the `useState` hook returns an Array containing a value and a "setter" function that can be called to update that value. When a component is invoked (re-rendered) multiple times, any `useState()` calls it makes will return the exact same Array each time.

> ℹ️ ***How do hooks actually work?\***
>
> Behind the scenes, hook functions like `setState` work by storing data in a sequence of "slots" associated with each component in the Virtual DOM tree. Calling a hook function uses up one slot, and increments an internal "slot number" counter so the next call uses the next slot. Preact resets this counter before invoking each component, so each hook call gets associated with the same slot when a component is rendered multiple times.
>
> ```js
> function User() {
>   const [name, setName] = useState("Bob")    // slot 0
>   const [age, setAge] = useState(42)         // slot 1
>   const [online, setOnline] = useState(true) // slot 2
> }
> ```
>
> This is called call site ordering, and it's the reason why hooks must always be called in the same order within a component, and cannot be called conditionally or within loops.

Let's see an example of the `useState` hook in action:

```jsx
import { useState } from 'preact/hooks'

const MyButton = () => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
  }

  return (
    <button onClick={handleClick}>
      {clicked ? 'Clicked' : 'No clicks yet'}
    </button>
  )
}
```

Clicking the button calls `setClicked(true)`, which updates the state field created by our `useState()` call, which in turn causes Preact to re-render this component. When the component is rendered (invoked) a second time, the value of the `clicked` state field will be `true`, and the returned Virtual DOM will have the text "Clicked" instead of "No clicks yet". This will cause Preact to update the button's text in the DOM.

------

### Try it!

Let's try creating a counter, starting from the code we wrote in the previous chapter. We'll need to store a `count` number in state, and increment its value by `1` when a button is clicked.

Since we used a function component in the previous chapter, it may be easiest to use hooks, though you can pick whichever method of storing state you prefer.

## Refs

As we learned in the first chapter, the DOM provides an imperative API, which lets us make changes by calling functions on elements. One example where we might need to access the imperative DOM API from a Preact component would be to automatically move focus to an input element.

The `autoFocus` prop (or `autofocus` attribute) can be used to focus an input the first time it is rendered, however there are situations where we want to move focus to an input at a specific time, or in response to a specific event.

For these cases where we need to interact directly with DOM elements, we can use a feature called "refs". A ref is a plain JavaScript object with a `current` property that point to any value. JavaScript objects are passed by reference, which means that any function with access to a ref object can get or set its value using the `current` property. Preact does not track changes to ref objects, so they can be used to store information during rendering, which can then be accessed later by any function with access to the ref object.

We can see what direct usage of the ref feature looks like without rendering anything:

```js
import { createRef } from 'preact'

// create a ref:
const ref = createRef('initial value')
// { current: 'initial value' }

// read a ref's current value:
ref.current === 'initial value'

// update a ref's current value:
ref.current = 'new value'

// pass refs around:
console.log(ref) // { current: 'new value' }
```

What makes refs useful in Preact is that a ref object can be passed to a Virtual DOM element during rendering, and Preact will set the ref's value (its `current` property) to the corresponding HTML element. Once set, we can use the ref's current value to access and modify the HTML element:

```jsx
import { createRef } from 'preact';

// create a ref:
const input = createRef()

// pass the ref as a prop on a Virtual DOM element:
render(<input ref={input} />, document.body)

// access the associated DOM element:
input.current // an HTML <input> element
input.current.focus() // focus the input!
```

Using `createRef()` globally isn't recommended, since multiple renders will overwrite the ref's current value. Instead, it's best to store refs as class properties:

```jsx
import { createRef, Component } from 'preact';

export default class App extends Component {
  input = createRef()

  // this function runs after <App> is rendered
  componentDidMount() {
    // access the associated DOM element:
    this.input.current.focus();
  }

  render() {
    return <input ref={this.input} />
  }
}
```

For function components, a `useRef()` hook provides a convenient way to create a ref and access that same ref on subsequent renders. The following example also shows how to use the `useEffect()` hook to invoke a callback after our component is rendered, in which our ref's current value will then be set to the HTML input element:

```jsx
import { useRef, useEffect } from 'preact/hooks';

export default function App() {
  // create or retrieve our ref:  (hook slot 0)
  const input = useRef()

  // the callback here will run after <App> is rendered:
  useEffect(() => {
    // access the associated DOM element:
    input.current.focus()
  }, [])

  return <input ref={input} />
}
```

Remember, refs aren't limited to storing only DOM elements. They can be used to store information between renders of a component without setting state that would cause additional rendering. We'll see some uses for that in a later chapter.

### Try it!

Now let's put this to practice by creating a button that, when clicked, focuses an input field by accessing it using a ref.

## Context

As an application grows larger, its Virtual DOM tree often becomes deeply nested and composed of many different components. Components at various locations within the tree sometimes need to access common data - typically pieces of application state like authentication, user profile info, caches, storage, etc. While it's possible to pass all of that information down through the tree as component props, doing so means every component needs to have some awareness of all of that state - even if all it does is forward it on through the tree.

Context is a feature that lets us pass values down through the tree *automatically*, without components needing to be aware of anything. This is done using a Provider/Consumer approach:

- `<Provider>` sets the context's value within a subtree
- `<Consumer>` gets the context value set by the nearest parent Provider

To start off, let's look at a simple example with only one component. In this case, we're providing a "Username" context value *and* consuming that value:

```jsx
import { createContext } from 'preact'

const Username = createContext()

export default function App() {
  return (
    // provide the username value to our subtree:
    <Username.Provider value="Bob">
      <div>
        <p>
          <Username.Consumer>
            {username => (
              // access the current username from context:
              <span>{username}</span>
            )}
          </Username.Consumer>
        </p>
      </div>
    </Username.Provider>
  )
}
```

In actual usage, context is rarely provided and consumed within the same component - component state is usually the best solution for that.

### Usage with hooks

The context `<Consumer>` API is sufficient for most use-cases, but can be a bit tedious to write since it relies on nested functions for scope. Function components can choose to instead use Preact's `useContext()` hook, which returns the value of a `Context` at the component's location in the Virtual DOM tree.

Here's the previous example again, this time split into two components and using `useContext()` to get the context's current value:

```jsx
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const Username = createContext()

export default function App() {
  return (
    <Username.Provider value="Bob">
      <div>
        <p>
          <User />
        </p>
      </div>
    </Username.Provider>
  )
}

function User() {
  // access the current username from context:
  const username = useContext(Username) // "Bob"
  return <span>{username}</span>
}
```

If you can imagine a case where `User` needs to access the value of multiple Contexts, the simpler `useContext()` API remains much easier to follow.

### Realistic usage

A more realistic usage of context would be to store an application's authentication state (whether the user is logged in or not).

To do this, we can create a context to hold the information, which we'll call `AuthContext`. The value for AuthContext will be an object with a `user` property containing our signed-in user, along with a `setUser` method to modify that state.

```jsx
import { createContext } from 'preact'
import { useState, useMemo, useContext } from 'preact/hooks'

const AuthContext = createContext()

export default function App() {
  const [user, setUser] = useState(null)

  const auth = useMemo(() => {
    return { user, setUser }
  }, [user])

  return (
    <AuthContext.Provider value={auth}>
      <div class="app">
        {auth.user && <p>Welcome {auth.user.name}!</p>}
        <Login />
      </div>
    </AuthContext.Provider>
  )
}

function Login() {
  const { user, setUser } = useContext(AuthContext)

  if (user) return (
    <div class="logged-in">
      Logged in as {user.name}.
      <button onClick={() => setUser(null)}>
        Log Out
      </button>
    </div>
  )

  return (
    <div class="logged-out">
      <button onClick={() => setUser({ name: 'Bob' })}>
        Log In
      </button>
    </div>
  )
}
```

### Nested context

Context has a hidden superpower that becomes quite useful in large applications: context providers can be nested to "override" their value within a Virtual DOM subtree. Imagine a web-based email app, where various parts of the user interface are shown based on URL paths:

> - `/inbox`: show the inbox
> - `/inbox/compose`: show inbox and a new message
> - `/settings`: show settings
> - `/settings/forwarding`: show forwarding settings

We can create a `<Route path="..">` component that renders a Virtual DOM tree only when the current path matches a given path segment. To simplify defining nested Routes, each matched Route can override the "current path" context value within its subtree to exclude the part of the path that was matched.

```jsx
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const Path = createContext(location.pathname)

function Route(props) {
  const path = useContext(Path) // the current path
  const isMatch = path.startsWith(props.path)
  const innerPath = path.substring(props.path.length)
  return isMatch && (
    <Path.Provider value={innerPath}>
      {props.children}
    </Path.Provider>
  )
}
```

Now we can use this new `Route` component to define the email app's interface. Notice how the `Inbox` component doesn't need to know its own path in order to define `<Route path"..">` matching for its children:

```jsx
export default function App() {
  return (
    <div class="app">
      <Route path="/inbox">
        <Inbox />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
    </div>
  )
}

function Inbox() {
  return (
    <div class="inbox">
      <div class="messages"> ... </div>
      <Route path="/compose">
        <Compose />
      </Route>
    </div>
  )
}

function Settings() {
  return (
    <div class="settings">
      <h1>Settings</h1>
      <Route path="/forwarding">
        <Forwarding />
      </Route>
    </div>
  )
}
```

### The default context value

Nested context is a powerful feature, and we often use it without realizing. For example, in the very first illustrative example of this chapter, we used `<Provider value="Bob">` to define a `Username` context value within the tree.

However, this was actually overriding the default value of the `Username` context. All contexts have a default value, which is whatever value was passed as the first argument to `createContext()`. In the example, we didn't pass any arguments to `createContext`, so the default value was `undefined`.

Here's what the first example would have looked like using the default context value instead of a Provider:

```jsx
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

const Username = createContext('Bob')

export default function App() {
  const username = useContext(Username) // returns "Bob"

  return <span>{username}</span>
}
```

### Try it!

As an exercise, let's create a *synchronized* version of the counter we created in the previous chapter. To do this, you'll want to use the `useMemo()` technique from the authentication example in this chapter. Alternatively, you could also define *two* contexts: one to share the `count` value, and another to share an `increment` function that updates the value.

## Side Effects

Side effects are bits of code that run when changes happen in the Virtual DOM tree. They don't follow the standard approach of accepting `props` and returning a new Virtual DOM tree, and often reach out of the tree to mutate state or invoke imperative code, like calling into DOM APIs. Side effects are also often used as a way to trigger data fetching.

### Effects: side effects in function components

We've already seen one example of side effects in action in a previous chapter, when learning about refs and the `useRef()` hook. Once our ref was populated with a `current` property pointing to a DOM element, we needed a way to "trigger" code that would then interact with that element.

In order to trigger code after rendering, we used a `useEffect()` hook, which is the most common way to create a side effect from a function component:

```jsx
import { useRef, useEffect } from 'preact/hooks';

export default function App() {
  const input = useRef()

  // the callback here will run after <App> is rendered:
  useEffect(() => {
    // access the associated DOM element:
    input.current.focus()
  }, [])

  return <input ref={input} />
}
```

Notice the empty array being passed as a second argument to `useEffect()`. Effect callbacks run when any value in that "dependencies" array changes from one render to the next. For example, the first time a component is rendered, all effect callbacks run because there are no previous "dependencies" array values to compare to.

We can add values to the "dependencies" array to trigger an effect callback based on conditions, rather than just when a component is first rendered. This is typically used to run code in response to data changes, or when a component is removed from the page ("unmounted").

Let's see an example:

```js
import { useEffect, useState } from 'preact/hooks';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('<App> was just rendered for the first time')
  }, [])

  useEffect(() => {
    console.log('count value was changed to: ', count)
  }, [count])
  //  ^ run this any time `count` changes, and on the first render

  return <button onClick={() => setCount(count+1)}>{count}</button>
}
```

### Lifecycle methods: class component side effects

Class components can also define side effects, by implementing any of the available [lifecycle methods](https://preactjs.com/guide/v10/components#lifecycle-methods) provided by Preact. Here are a few of the most commonly used lifecycle methods:

| Lifecycle method            | When it runs:                             |
| --------------------------- | ----------------------------------------- |
| `componentWillMount`        | just before a component is first rendered |
| `componentDidMount`         | after a component is first rendered       |
| `componentWillReceiveProps` | before a component is re-rendered         |
| `componentDidUpdate`        | after a component is re-rendered          |

One of the most common examples of side effect usage in a class component is to fetch data when a component is first rendered, then store that data in state. The following example shows a component that requests user information from a JSON API after the first time it gets rendered, then shows that information.

```jsx
import { Component } from 'preact';

export default class App extends Component {
  // this gets called after the component is first rendered:
  componentDidMount() {
    // get JSON user info, store in `state.user`:
    fetch('/api/user')
      .then(response => response.json())
      .then(user => {
        this.setState({ user })
      })
  }

  render(props, state) {
    const { user } = state;

    // if we haven't received data yet, show a loading indicator:
    if (!user) return <div>Loading...</div>

    // we have data! show the username we got back from the API:
    return (
      <div>
        <h2>Hello, {user.username}!</h2>
      </div>
    )
  }
}
```

### Try it!

We'll keep this exercise simple: change the code sample on the right to log every time `count` changes, rather than only when `<App>` is first rendered.

## Keys

In chapter one, we saw how Preact uses a Virtual DOM to calculate what changed between two trees described by our JSX, then applies those changes to the HTML DOM to update pages. This works well for most scenarios, but occasionally requires that Preact "guesses" how the shape of the tree has changed between two renders.

The most common scenario where Preact's guess is likely to be different than our intent is when comparing lists. Consider a simple to-do list component:

```jsx
export default function TodoList() {
  const [todos, setTodos] = useState(['wake up', 'make bed'])

  function wakeUp() {
    setTodos(['make bed'])
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
      <button onClick={wakeUp}>I'm Awake!</button>
    </div>
  )
}
```

The first time this component is rendered, two `<li>` list items will be drawn. After clicking the **"I'm Awake!"** button, our `todos` state Array is updated to contain only the second item, `"make bed"`.

Here's what Preact "sees" for the first and second renders:

| First Render                                                 | Second Render                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `<div>  <ul>    <li>wake up</li>    <li>make bed</li>  </ul>  <button>I'm Awake!</button> </div>` | `<div>  <ul>    <li>make bed</li>   </ul>  <button>I'm Awake!</button> </div>` |

Notice a problem? While it's clear to us that the *first* list item ("wake up") was removed, Preact doesn't know that. All Preact sees is that there were two items, and now there is one. When applying this update, it will actually remove the second item (`<li>make bed</li>`), then update the text of the first item from `wake up` to `make bed`.

The result is technically correct – a single item with the text "make bed" – the way we arrived at that result was suboptimal. Imagine if there were 1000 list items and we removed the first item: instead of removing a single `<li>`, Preact would update the text of the first 999 other items and remove the last one.

### The **key** to list rendering

In situations like the previous example, items are changing *order*. We need a way to help Preact know which items are which, so it can detect when each item is added, removed or replaced. To do this, we can add a `key` prop to each item.

The `key` prop is an identifier for a given element. Instead of comparing the *order* of elements between two trees, elements with a `key` prop are compared by finding the previous element with that same `key` prop value. A `key` can be any type of value, as long as it is "stable" between renders: repeated renders of the same item should have the exact same `key` prop value.

Let's add keys to the previous example. Since our todo list is a simple Array of strings that don't change, we can use those strings as keys:

```jsx
export default function TodoList() {
  const [todos, setTodos] = useState(['wake up', 'make bed'])

  function wakeUp() {
    setTodos(['make bed'])
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo}>{todo}</li>
          //  ^^^^^^^^^^ adding a key prop
        ))}
      </ul>
      <button onClick={wakeUp}>I'm Awake!</button>
    </div>
  )
}
```

The first time we render this new version of the `<TodoList>` component, two `<li>` items will be drawn. When clicking the "I'm Awake!" button, our `todos` state Array is updated to contain only the second item, `"make bed"`.

Here's what Preact sees now that we've added `key` to the list items:

| First Render                                                 | Second Render                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `<div>  <ul>    <li key="wake up">wake up</li>    <li key="make bed">make bed</li>  </ul>  <button>I'm Awake!</button> </div>` | `<div>  <ul>     <li key="make bed">make bed</li>  </ul>  <button>I'm Awake!</button> </div>` |

This time, Preact can see that the first item was removed, because the second tree is missing an item with `key="wake up"`. It will remove the first item, and leave the second item untouched.

### When **not** to use keys

One of the most common pitfalls developers encounter with keys is accidentally choosing keys that are *unstable* between renders. In our example, imagine if we had used the index argument from `map()` as our `key` value rather than the `item` string itself:

```
items.map((item, index) => <li key={index}>{item}</li>
```

This would result in Preact seeing the following trees on the first and second render:

| First Render                                                 | Second Render                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `<div>  <ul>    <li key={0}>wake up</li>    <li key={1}>make bed</li>  </ul>  <button>I'm Awake!</button> </div>` | `<div>  <ul>     <li key={0}>make bed</li>  </ul>  <button>I'm Awake!</button> </div>` |

The problem is that `index` doesn't actually identify a ***value*** in our list, it identifies a ***position***. Rendering this way actually *forces* Preact to match items in-order, which is what it would have done if no keys were present. Using index keys can even force expensive or broken output when applied to list items with differing type, since keys cannot match elements with differing type.

> 🚙 **Analogy Time!** Imagine you leave your car with a valet car park.
>
> When you return to pick up your car, you tell the valet you drive a grey SUV. Unfortunately, over half of the parked cars are grey SUV's, and you end up with someone else's car. The next grey SUV owner gets the wrong one, and so on.
>
> If you instead tell the valet you drive a grey SUV with the license plate "PR3ACT", you can be sure that your own car will be returned.

As a general rule of thumb, never use an Array or loop index as a `key`. Use the list item value itself, or generate a unique ID for items and use that:

```jsx
const todos = [
  { id: 1, text: 'wake up' },
  { id: 2, text: 'make bed' }
]

export default function ToDos() {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

Remember: if you genuinely can't find a stable key, it's better to omit the `key` prop entirely than to use an index as a key.

### Try it!

For this chapter's exercise, we'll combine what we learned about keys with our knowledge of side effects from the previous chapter.

Use an effect to call the provided `getTodos()` function after `<TodoList>` is first rendered. Note that this function returns a Promise, which you can obtain the value of by calling `.then(value => { })`. Once you have the Promise's value, store it in the `todos` useState hook by calling its associated `setTodos` method.

Finally, update the JSX to render each item from `todos` as an `<li>` containing that todo item's `.text` property value.

## Error Handling

JavaScript is a flexible interpreted language, which means it's possible (and even easy) to encounter errors at runtime. Whether the result of an unexpected scenario or a mistake in code we've written, it's important to be able to monitor errors and implement some form of recovery or graceful error handling.

In Preact, the way we do this is to capture errors and save them as state. This lets a component intercept an unexpected or broken render and switch to rendering something different as a fallback.

### Turning errors into state

Two APIs are available for capturing errors and turning them into state: `componentDidCatch` and `getDerivedStateFromError`. They're functionally similar, and both are methods you can implement on a class component:

**componentDidCatch** gets passed an `Error` argument, and can decide what to do in response to that Error on a case-by-case basis. It can call `this.setState()` to render a fallback or alternative tree, which will "catch" the error and mark it as handled. Or, the method could simply log the error somewhere and allow it to continue unhandled (to crash).

**getDerivedStateFromError** is a static method that gets passed an `Error`, and returns a state update object, which is applied to the component via `setState()`. Since this method always produces a state change that results in its component being re-rendered, it always marks errors as handled.

The following example shows how to use either method to capture errors and show a graceful error message instead of crashing:

```jsx
import { Component } from 'preact'

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error: error.message }
  }

  componentDidCatch(error) {
    console.error(error)
    this.setState({ error: error.message })
  }

  render() {
    if (this.state.error) {
      return <p>Oh no! We ran into an error: {this.state.error}</p>
    }
    return this.props.children
  }
}
```

The component above is a relatively common example of how error handling is implemented in Preact applications, often referred to as an *Error Boundary*.

### Nesting and error bubbling

Errors encountered when Preact is rendering your Virtual DOM tree "bubble up", much like DOM events. Starting from the component that encountered the error, each parent component in the tree is given an opportunity to handle the error.

As a result, Error Boundaries can be nested if implemented using `componentDidCatch`. When a component's `componentDidCatch()` method *doesn't* call `setState()`, the error will continue to bubble up the Virtual DOM tree until it reaches an component with a `componentDidCatch` method that *does* call `setState()`.

### Try it!

To test our error handling knowledge, let's add error handling to a simple App component. One of the components deep within App can throw an error in some scenario, and we want to catch this so we can show a friendly message telling the user that we've run into an unexpected error.