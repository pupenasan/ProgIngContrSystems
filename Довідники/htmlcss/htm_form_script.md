[До розділу](README.md)

# Робота з формами в JS

Це стара версія розділу і потребує перероблення

### Навігація: форми і елементи

Форми в документі входять в спеціальну колекцію `document.forms`.

Це так звана «іменована» колекція: ми можемо використовувати для отримання форми як її ім'я, так і порядковий номер в документі.

```javascript
document.forms.my - форма з імене "my" (name="my")
document.forms[0] - перша форма в документі
```

Коли ми вже отримали форму, будь-який елемент доступний в іменованій колекції `form.elements`. наприклад:

```html
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>
<script>
  // отримуємо форму
  let form = document.forms.my; // <form name="my"> element
  // отримуємо елемент
  let elem = form.elements.one; // <input name="one"> element
  alert(elem.value); // 1
</script>
```

Може бути кілька елементів з одним і тим же ім'ям, це часто буває з кнопками-перемикачами `radio`.

В цьому випадку `form.elements[name]` є колекцією, наприклад:

```html
<form>
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form>
<script>
let form = document.forms[0];
let ageElems = form.elements.age;
alert(ageElems[0]); // [object HTMLInputElement]
</script>
```

Ці навігаційні властивості не залежать від структури тегів всередині форми. Всі елементи управління форми, як би глибоко вони не знаходилися в формі, доступні в колекції `form.elements`.

#### `<Fieldset>` як "підформа"

Форма може містити один або кілька елементів `<fieldset>` всередині себе. Вони також підтримують властивість `elements`, в якому присутні елементи управління всередині них. Наприклад:                      

```html
<body>
  <form id="form">
    <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
  </form>
  <script>
    alert(form.elements.login); // <input name="login">
    let fieldset = form.elements.userFields;
    alert(fieldset); // HTMLFieldSetElement
    // мы можем достать элемент по имени как из формы, так и из fieldset с ним
    alert(fieldset.elements.login == form.elements.login); // true
  </script>
</body>
```

Скорочена форма запису: `form.name`

Є більш короткий запис: ми можемо отримати доступ до елементу через `form[index/name]`.

Іншими словами, замість `form.elements.login` ми можемо написати ` form.login`.

Це також працює, але є невелика проблема: якщо ми отримуємо елемент, а потім міняємо його властивість `name`, то він все ще буде доступний під старим іменем (також, як і під новим). У цьому легше розібратися на прикладі:                      

```html
<form id="form">
  <input name="login">
</form>
<script>
  alert(form.elements.login == form.login); // true, ведь это одинаковые <input>
  form.login.name = "username"; // изменяем свойство name у элемента input
  // form.elements обновили свои имена:
  alert(form.elements.login); // undefined
  alert(form.elements.username); // input
  // а в form мы можем использовать оба имени: новое и старое
  alert(form.username == form.login); // true
</script>
```

Зазвичай це не викликає проблем, так як ми рідко міняємо імена у елементів форми.

### Зворотне посилання: element.form

Для будь-якого елементу форма доступна через `element.form`. Так що форма посилається на всі елементи, а ці елементи посилаються на форму. Ось ілюстрація:              

```html
<form id="form">
  <input type="text" name="login">
</form>
<script>
  // form -> element
  let login = form.login;
  // element -> form
  alert(login.form); // HTMLFormElement
</script>
```

### Елементи форми

Розглянемо елементи управління, які використовуються в формах.

#### input и textarea

До значень цих полів можна отримати доступ через властивість `input.value` (рядок) або ` input.checked` (логічне значення) для чекбоксів. Ось так:

```javascript
input.value = "Новое значение";
textarea.value = "Новый текст";
input.checked = true; // для чекбоксов и переключателей
```

Використовуйте `textarea.value` замість ` textarea.innerHTML`

Звернемо увагу: хоч елемент `<textarea> ... </textarea>` і зберігає своє значення як вкладений HTML, нам не слід використовувати `textarea.innerHTML` для доступу до нього.

Там зберігається тільки той HTML, який був спочатку на сторінці, а не поточне значення.

#### select и option

Елемент `<select>` має 3 важливі властивості:

1. `select.options` – колекція з піделементів  `<option>`,
2. `select.value` –  значення обраного в даний момент  `<option>`,
3. `select.selectedIndex` – номер обраного `<option>`.

Вони дають три різні способи встановити значення в `<select>`:

1. Знайти відповідний елемент `<option>` і встановити в `option.selected` значення `true`.
2. Встановити в `select.value` значення потрібного `<option>`.
3. Встановити в `select.selectedIndex` номер потрібного `<option>`.

Перший спосіб найбільш зрозумілий, але `(2)` і `(3)` є більш зручними при роботі. Ось ці способи на прикладі:

```html
<select id="select">
  <option value="apple">Яблоко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>
<script>
  // все три строки делают одно и то же
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

На відміну від більшості інших елементів управління, `<select>` дозволяє нам вибрати кілька варіантів одночасно, якщо у нього стоїть атрибут `multiple`. Цю можливість використовують рідко, але в цьому випадку для роботи зі значеннями необхідно використовувати перший спосіб, тобто ставити або видаляти властивість `selected` у піделементи` <option> `. Їх колекцію можна отримати як `select.options`, наприклад:                                            

```html
<select id="select" multiple>
  <option value="blues" selected>Блюз</option>
  <option value="rock" selected>Рок</option>
  <option value="classic">Классика</option>
</select>
<script>
  // получаем все выбранные значения из select с multiple
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);
  alert(selected); // blues,rock
</script>
```

Повний опис елемента `<select>` є в специфікації https://html.spec.whatwg.org/multipage/forms.html#the-select-element.

#### new Option

Елемент `<option>` рідко використовується сам по собі, але і тут є дещо цікаве. В [специфікації](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) є гарний короткий синтаксис для створення елемента `<option>`:

```javascript
option = new Option(text, value, defaultSelected, selected);
```

Параметри:

- `text` – текст всередині`<option>`,
- `value` – значення,
- `defaultSelected` – якщо`true`, то ставитьс HTML-атрибут `selected`,
- `selected` – якшо`true`, то елемент `<option>` буде вибраним.

Тут може бути невелика плутанина з `defaultSelected` і ` selected`. Все просто: `defaultSelected` задає HTML-атрибут, його можна отримати як `option.getAttribute ('selected') `, а `selected` - вибрано значення чи ні, саме його важливо поставити правильно. Втім, зазвичай ставлять обидва цих значення в `true` або не ставлять зовсім (тобто` false`). Наприклад:

```javascript
let option = new Option("Текст", "value");
// создаст <option value="value">Текст</option>
```

Той же елемент, але обраний:

```javascript
let option = new Option("Текст", "value", true, true);
```

Елементи `<option>` мають властивості:

- `option.selected` Чи вибрана опція.
- `option.index` Номер опції серед інших в списку `<select> `.
- `option.text` Вміст опції (то, що бачить відвідувач).

## Фокусування: focus/blur

<https://learn.javascript.ru/focus-blur>

Елемент отримує фокус, коли користувач клацає по ньому або використовує клавішу Tab. Також існує HTML-атрибут `autofocus`, який встановлює фокус на елемент, коли сторінка завантажується. Є й інші способи отримання фокусу, про них - далі.

Фокусування зазвичай означає: «приготуйся до введення даних на цьому елементі», це хороший момент, щоб ініціалізувати або завантажити що-небудь.

Момент втрати фокусу ( «blur») може бути важливіше. Це момент, коли користувач клацає кудись ще або натискає Tab, щоб переключитися на наступне поле форми. Є інші причини втрати фокусу, про них - далі.

Втрата фокусу зазвичай означає «дані введені», і ми можемо виконати перевірку введених даних або навіть відправити ці дані на сервер і так далі.

У роботі з подіями фокусування є важливі особливості. Ми постараємося розібрати їх далі.

### Подія focus/blur

Подія `focus` викликається в момент фокусування, а ` blur` - коли елемент втрачає фокус.

Використовуємо їх для валідації (перевірки) введених даних.

У прикладі нижче:

- Обробник `blur` перевіряє, чи введений email, і якщо ні - показує помилку.
- Обробник `focus` приховує це повідомлення про помилку (в момент втрати фокусу перевірка повториться):            

```html
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>
Ваш email: <input type="email" id="input">

<div id="error"></div>
<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // не email
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Сучасний HTML дозволяє робити валідацію за допомогою атрибутів `required`,` pattern` і т.д. Іноді - це все, що нам потрібно. JavaScript можна використовувати, коли ми хочемо більше гнучкості. А ще ми могли б відправляти змінений значення на сервер, якщо воно правильне.

### Методы focus/blur

Методи `elem.focus()` і `elem.blur()` встановлюють/знімають фокус. Наприклад, заборонимо відвідувачеві перемикатися з поля введення, якщо введене значення не минуло валідацію:                             

```html
<style>
  .error {
    background: red;
  }
</style>
Ваш email: <input type="email" id="input">
<input type="text" style="width:280px" placeholder="введите неверный email и кликните сюда">
<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // не email
      // показать ошибку
      this.classList.add("error");
      // ...и вернуть фокус обратно
      input.focus();
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Це спрацює у всіх браузерах, крім Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)). Якщо ми що-небудь введемо і натиснемо Tab або кликнемо в інше місце, тоді `onblur` поверне фокус назад.

Відзначимо, що ми не можемо «скасувати втрату фокусу», викликавши `event.preventDefault()` в обробнику `onblur` тому, що` onblur` спрацьовує *після* втрати фокусу елементом.

#### Втрата фокусу, викликана JavaScript

Втрата фокусу може статися з безлічі причин. Одна з них - коли відвідувач клацає кудись ще. Але і JavaScript може бути причиною, наприклад:

- `alert` переводить фокус на себе - елемент втрачає фокус (подія ` blur`), а коли `alert` закривається - елемент отримує фокус назад (подія` focus`).
- Якщо елемент видалити з DOM, фокус також буде втрачено. Якщо елемент додати назад, то фокус не повернеться.

Через ці особливості обробники `focus/blur` можуть спрацювати тоді, коли це не потрібно. Використовуючи ці події, потрібно бути обережним. Якщо ми хочемо відстежити втрату фокусу, яку ініціював користувач, тоді нам слід уникати її самим.

### Включаємо фокусування на будь-якому елементі: tabindex

Багато елементів за замовчуванням не підтримують фокусування. Які саме - залежить від браузера, але одне завжди вірно: підтримка `focus/blur` гарантована для елементів, з якими відвідувач може взаємодіяти:` <button> `,` <input> `,` <select> `,` <a> `і т.д.

З іншого боку, елементи форматування `<div>`, `<span>`, `<table>` - за замовчуванням не можуть отримати фокус. Метод `elem.focus()` не працює для них, і події `focus/blur` ніколи не спрацьовують.

Це можна змінити HTML-атрибутом `tabindex`. Будь-який елемент підтримує фокусування, якщо має `tabindex`. Значення цього атрибута - порядковий номер елемента, коли клавіша Tab (або щось аналогічне) використовується для перемикання між елементами.

Тобто: якщо у нас два елементи, перший має `tabindex="1"`, а другий `tabindex="2"`, то перебуваючи в першому елементі і натиснувши Tab - ми перемістимося в другій.

Порядок перебору такий: спочатку йдуть елементи зі значеннями `tabindex` від ` 1` і вище, в порядку `tabindex`, а потім елементи без ` tabindex` (наприклад, звичайний `<input>`). При співпадаючих `tabindex` елементи перебираються в тому порядку, в якому йдуть в документі.

Є два спеціальних значення:

- `tabindex="0"` ставить елемент в один ряд з елементами без `tabindex`. Тобто, при перемиканні такі елементи будуть після елементів з `tabindex ≥ 1`. Зазвичай використовується, щоб включити фокусування на елементі, але не змінювати порядок перемикання. Щоб елемент міг брати участь в формі нарівні зі звичайними `<input>`.

- `tabindex="-1"` дозволяє фокусуватися на елементі тільки програмно. Клавіша Tab проігнорує такий елемент, але метод `elem.focus()` діятиме.

Наприклад, список нижче. Натисніть перший пункт у списку і натисніть Tab:

```html
Кликните первый пункт в списке и нажмите Tab. Продолжайте следить за порядком. Обратите внимание, что много последовательных нажатий Tab могут вывести фокус из iframe с примером.
<ul>
  <li tabindex="1">Один</li>
  <li tabindex="0">Ноль</li>
  <li tabindex="2">Два</li>
  <li tabindex="-1">Минус один</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

Порядок такий: `1-2-0`. Зазвичай `<li>` не підтримує фокусування, але `tabindex` включає його, а також події і стилізацію псевдоклас `:focus`. Властивість `elem.tabIndex` теж працює. Ми можемо додати `tabindex` з JavaScript, використовуючи властивість `elem.tabIndex`. Це дасть той же ефект.

### Події focusin/focusout

Події `focus` і` blur` не спливають. Наприклад, ми не можемо використовувати `onfocus` на` <form> `, щоб підсвітити його:

```html
<!-- добавить класс при фокусировке на форме -->
<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

Приклад вище не працює, тому що коли користувач переміщує фокус на `<input>`, подія `focus` спрацьовує тільки на цьому елементі. Ця подія не спливає. Отже, `form.onfocus` ніколи не спрацьовує. Ця проблема має два рішення. Перше: кумедна особливість - `focus/blur` не спливає, але передаються вниз на фазі перехоплення. Це спрацює:

```html
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>
<style> .focused { outline: 1px solid red; } </style>
<script>
  // установить обработчик на фазе перехвата (последний аргумент true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
</script>
```

Друге рішення: події `focusin` і ` focusout` - такі ж, як і `focus/blur`, але вони спливають. Зауважте, що ці події повинні використовуватися з `elem.addEventListener`, але не з ` on<event> `. Другий робочий варіант:

```html
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>
<style> .focused { outline: 1px solid red; } </style>
<script>
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
</script>
```

## Події: change, input, cut, copy, paste

<https://learn.javascript.ru/events-change-input>

Давайте розглянемо різні події, супутні оновленню даних.

### Подія: change   

Подія `change` спрацьовує після закінчення зміни елемента. Для текстових `<input>` це означає, що подія відбувається при втраті фокуса. Поки ми друкуємо в текстовому полі в прикладі нижче, подія не відбувається. Але коли ми переміщаємо фокус в інше місце, наприклад, натискаючи на кнопку, то відбудеться подія `change`: 

```html
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Для інших елементів: `select`,` input type=checkbox/radio` подія запускається відразу після зміни значення:   

```html
<select onchange="alert(this.value)">
  <option value="">Выберите что-нибудь</option>
  <option value="1">Вариант 1</option>
  <option value="2">Вариант 2</option>
  <option value="3">Вариант 3</option>
</select>
```

### Подія: input

Подія `input` спрацьовує кожного разу при зміні значення. На відміну від подій клавіатури, воно працює при будь-яких змінах значень, навіть якщо вони не пов'язані з клавіатурними діями: вставка за допомогою миші або розпізнавання мови при диктовку тексту. Наприклад:

```html
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Якщо ми хочемо обробляти кожну зміну в `<input>`, то ця подія є найкращим вибором. З іншого боку, подія `input` не відбувається при введенні з клавіатури або інших діях, якщо при цьому не змінюється значення в текстовому полі, тобто натискання клавіш ⇦, ⇨ і подібних при фокусі на текстовому полі не викличуть цю подію.

#### Не можна нічого передбачити в `oninput` 

Подія `input` відбувається після зміни значення. Тому ми не можемо використовувати `event.preventDefault()` там - буде вже занадто пізно, ніякого ефекту не буде.

### Подія: cut, copy, paste

Ці події відбуваються під час вирізання/копіювання/вставки даних. Вони відносяться до класу [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) і забезпечують доступ до копійованих/вставлених даних. Ми також можемо використовувати `event.preventDefault()` для запобігання дії за умовчанням, і в підсумку нічого не скопіюється/не вставиться. Наприклад, код, наведений нижче, запобігає всі подібні події і показує, що ми намагаємося вирізати/копіювати/вставити:    

```html
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Технічно, ми можемо скопіювати/вставити все. Наприклад, ми можемо скопіювати файл з файлової системи і вставити його. Існує список методів [в специфікації](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) для роботи з різними типами даних, читання/запису в буфер обміну. Але зверніть увагу, що буфер обміну працює глобально, на рівні ОС. Більшість браузерів в цілях безпеки дозволяють доступ на читання/запис в буфер обміну тільки в рамках певних дій користувача, наприклад, в обробниках подій `onclick`. Також забороняється генерувати «призначені для користувача» події буфера обміну за допомогою `dispatchEvent` у всіх браузерах, крім Firefox.

## Відправка форми: подія і метод submit

При відправці форми спрацьовує подія `submit`, вона зазвичай використовується для перевірки (валідації) форми перед її відправкою на сервер або для запобігання відправки і обробки її за допомогою JavaScript. Метод `form.submit()` дозволяє ініціювати надсилання форми з JavaScript. Ми можемо використовувати його для динамічного створення та відправки наших власних форм на сервер. Давайте подивимося на них докладніше.

### Подія: submit

Є два основних способи відправити форму:

1. Перший - натиснути кнопку `<input type="submit">` або `<input type="image">`.
2. Другий - натиснути Enter, перебуваючи на якомусь полі.

Обидва дії згенерують подію `submit` на формі. Обробник може перевірити дані, і якщо є помилки, показати їх і викликати `event.preventDefault()`, тоді форма не буде відправлена на сервер.

У прикладі нижче:

1. У полі введення і натисніть Enter.
2. Натисніть `<input type="submit">`.

Обидва дії показують `alert` і форма не відправиться завдяки ` return false`:

```html
<form onsubmit="alert('submit!');return false">
  Первый пример: нажмите Enter: 
    <input type="text" value="Текст"><br>
  Второй пример: нажмите на кнопку "Отправить": 
    <input type="submit" value="Отправить">
</form>
```

#### Взаємозв'язок між `submit` і `click`. 

При відправці форми після натискання Enter в текстовому полі, генерується подія `click` на кнопці `<input type="submit"> `. Це досить забавно, з огляду на що ніякого кліка не було. Приклад:

```html
<form onsubmit="alert('submit!');return false">
 <input type="text" size="30" value="Установите фокус здесь и нажмите Enter">
 <input type="submit" value="Отправить" onclick="alert('click')">
</form>
```

### Метод: submit

Щоб відправити форму на сервер вручну, ми можемо викликати метод `form.submit()`. При цьому подія `submit` не генерується. Передбачається, що якщо програміст викликає метод `form.submit()`, то він вже виконав всю відповідну обробку. Іноді це використовують для генерації форми і відправки її вручну, наприклад так:

```javascript
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';
form.innerHTML = '<input name="q" value="test">';
// перед отправкой формы, её нужно вставить в документ
document.body.append(form);
form.submit();
```

## Спливаючі форми

