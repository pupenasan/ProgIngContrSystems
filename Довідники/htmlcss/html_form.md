[До розділу](README.md)

# Робота з формами

https://www.w3schools.com/html/html_forms.asp

Тег `<form>` встановлює форму на веб-сторінці. Форма призначена для обміну даними між користувачем і сервером. Область застосування форм не обмежена відправкою даних на сервер, за допомогою клієнтських скриптів можна отримати доступ до будь-якого елементу форми, змінювати його і застосовувати на власний розсуд. Документ може містити будь-яку кількість форм, але одночасно на сервер може бути відправлена тільки одна форма. З цієї причини дані форм повинні бути незалежні один від одного.

```html
<form action="/formprocess">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Надіслати">
</form>
<p>Якщо натиснути кнопку «Надіслати», дані форми будуть надіслані за url "/formprocess".</p> 
```

<form action="/formprocess">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Надіслати">
</form>
<p>Якщо натиснути кнопку «Надіслати», дані форми будуть надіслані на сторінку під назвою "/formprocess".</p> 

Приклад подібної форми можна перевірити [тут](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_submit)

## Елемент `<form>` 

Елемент HTML `<form>` використовується для створення HTML-форми для введення користувачами:

```html
 <form>
 .
 *form elements*
 .
 </form>
```

Елемент `<form>` є контейнером для різних типів елементів введення, таких як: текстові поля, прапорці, перемикачі, кнопки надсилання тощо.

### Атрибути форми

| Ім'я атрибуту                                                | Призначення                                                  | Демо                                                         | Приклад                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| action                                                       | означує дію, яка буде виконана під час надсилання форми. Зазвичай дані форми надсилаються у файл на сервері, коли користувач натискає кнопку відправки. Якщо атрибут `action` опущено, дію встановлюється для поточної сторінки. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_attributes_submit) | `<form action="/action_page.php">`                           |
| target                                                       | означує, де відображати відповідь, отриману після надсилання форми. Атрибут `target` може мати одне з наведених нижче значень. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_target) | `<form action="/action_page.php" target="_blank"> `          |
| method                                                       | означує метод HTTP, який буде використовуватися під час надсилання даних форми (див нижче). | [Посилання get](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_get)<br />[Посилання post](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_post) | `<form action="/action_page.php" method="get"> `             |
| autocomplete                                                 | означує, увімкнути чи вимкнути автозаповнення у формі. Коли автозаповнення ввімкнено, браузер автоматично доповнює значення на основі значень, які користувач ввів раніше. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_autocomplete) | `<form action="/action_page.php" autocomplete="on"> `        |
| novalidate                                                   | Атрибут `novalidate` є логічним атрибутом. Якщо він присутній, він означує, що дані форми (вхідні дані) не повинні перевірятися під час надсилання. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_form_novalidate) | `<form action="/action_page.php" novalidate> `               |
| [accept-charset](https://www.w3schools.com/tags/att_form_accept_charset.asp) | означує кодування символів, які використовуються для надсилання форми | [Посилання](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_form_accept_charset) | `<form action="/action_page.php" accept-charset="utf-8">`    |
| [enctype](https://www.w3schools.com/tags/att_form_enctype.asp) | означує, як мають бути закодовані дані форми під час надсилання їх на сервер (лише для method="post") | [Посилання](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_form_enctype) | `<form action="/action_page_binary.asp" method="post" enctype="multipart/form-data">` |
| [name](https://www.w3schools.com/tags/att_form_name.asp)     | означує назву форми                                          | [Посилання](https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_form_name) | `<form     action="/action_page.php"    method="get" name="myForm">` |
| [rel](https://www.w3schools.com/tags/att_form_rel.asp)       | означує зв’язок між пов’язаним ресурсом і поточним документом | [Посилання]()                                                | `<form rel="*value*">`                                       |

#### Target

Атрибут `target` означує, де відображати відповідь, отриману після надсилання форми. Атрибут `target` може мати одне з таких значень:

| Value       | Description                                        |
| ----------- | -------------------------------------------------- |
| `_blank`    | Відповідь буде показано в новому вікні або вкладці |
| `_self`     | Відповідь відображається в поточному вікні         |
| `_parent`   | Відповідь відображається в батьківському фреймі    |
| `_top`      | Відповідь відображається у всьому тілі вікна       |
| `framename` | Відповідь відображається в іменованому iframe      |

Значення за замовчуванням – `_self`, що означає, що відповідь відкриється в поточному вікні. Тут надісланий результат відкриється в новій вкладці браузера:

```html
<form action="/action_page.php" target="_blank"> 
```

#### Method

Атрибут `method` означує метод HTTP, який буде використовуватися під час надсилання даних форми. Дані форми можна надіслати як змінні URL-адреси (з `method="get"`) або як пост-транзакцію HTTP (з `method="post"`). Метод HTTP за замовчуванням під час надсилання даних форми — GET.

```html
<form action="/action_page.php" method="get"> 
```

```html
<form action="/action_page.php" method="post"> 
```

**Примітки щодо GET:**

- Додає дані форми до URL-адреси в парах ім’я/значення
- НІКОЛИ не використовуйте GET для надсилання конфіденційних даних! (надіслані дані форми видно в URL!)
- Довжина URL-адреси обмежена (2048 символів)
- Корисно для надсилання форм, коли користувач хоче додати результат до закладок
- GET добре підходить для незахищених даних, таких як рядки запиту в Google

**Примітки щодо POST:**

- Додає дані форми в тіло HTTP-запиту (надіслані дані форми не відображаються в URL-адресі)
- POST не має обмежень за розміром і може використовуватися для надсилання великих обсягів даних.
- Надсилання форм за допомогою POST не можна додавати в закладки

**Порада:** завжди використовуйте POST, якщо дані форми містять конфіденційну або особисту інформацію!

### Спеціальні атрибути елементів форми

| Ім'я атрибуту  | Призначення                                                  | Демо                                                         | Приклад                                                      |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| form           | Поле введення, розташоване поза формою HTML (але все ще є частиною форми), має мати атрибут `form` введення означує форму, до якої належить цей елемент `<input>`. Значення цього атрибута має дорівнювати атрибуту `id` елемента `<form>`, якому він належить. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_form) | `<form action="/action_page.php" id="form1"> <input type="submit" value="Submit"> </form> <input type="text" id="lname" name="lname" form="form1">` |
| formaction     | атрибут `<input>` що  означує URL-адресу файлу, який оброблятиме вхідні дані після надсилання форми. Цей атрибут замінює атрибут `action` елемента `<form>`. Атрибут `formaction` працює з такими типами введення: submit і image. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formaction) | `<input type="submit" formaction="/action_page2.php" value="Submit as Admin">` |
| formenctype    | атрибут `<input>`  що означує, як мають бути закодовані дані форми під час надсилання (лише для форм із method="post"). Цей атрибут замінює атрибут `enctype` елемента `<form>`. Атрибут `formenctype` працює з такими типами введення: submit і image. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formenctype) | `<input type="submit"     formenctype="multipart/form-data" value="Submit as     Multipart/form-data">` |
| formmethod     | атрибут `<input>`  що означує, метод HTTP для надсилання даних форми до URL-адреси дії. Цей атрибут перевизначає атрибут методу елемента `<form>`. Атрибут `formmethod` працює з такими типами введення: submit і image. Дані форми можна надіслати як змінні URL-адреси (method="get") або як транзакцію HTTP post (method="post"). | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formmethod) | `<input type="submit" formmethod="post" value="Submit using POST">` |
| formtarget     | атрибут `<input>`  що означує, назву або ключове слово, яке вказує, де відображати відповідь, отриману після надсилання форми. Цей атрибут замінює цільовий атрибут елемента `<form>`. Атрибут `formtarget` працює з такими типами введення: submit та image. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formtarget) | `<input type="submit" formtarget="_blank" value="Submit to a new window/tab">` |
| formnovalidate | атрибут `<input>`  що означує,  що елемент `<input>` не повинен перевірятися під час надсилання. Цей атрибут замінює атрибут `novalidate` елемента `<form>`. Атрибут `formnovalidate` працює з такими типами введення: submit. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formnovalidate) | ` <input type="submit"     formnovalidate="formnovalidate" value="Submit without validation">` |

 

[Деталі](https://www.w3schools.com/tags/tag_form.asp)



## Елемент `<label>` 

Зверніть увагу на використання елемента `<label>` у прикладі.

```html
 <form>
     <label for="fname">First name:</label><br>
     <input   type="text" id="fname" name="fname"><br>
     <label for="lname">Last   name:</label><br>
     <input type="text" id="lname" name="lname">
</form> 
```

Тег `<label>` означує мітку для багатьох елементів форми. Елемент `<label>` корисний для користувачів програм зчитування з екрана, оскільки програма зчитування з екрана вголос читатиме мітку, коли користувач фокусується на елементі введення. Елемент `<label>` також допомагає користувачам, яким важко клацати дуже маленькі області (наприклад, перемикачі або прапорці), тому що коли користувач клацає текст в елементі `<label>`, він перемикає перемикач/прапорець .

Атрибут `for` тегу `<label>` має дорівнювати атрибуту `id` елемента `<input>`, щоб зв’язати їх разом.

[Деталі](https://www.w3schools.com/tags/tag_label.asp)

## Елемент `<input>` 

Елемент HTML `<input>` є найбільш використовуваним елементом форми. Елемент `<input>` може відображатися різними способами, залежно від атрибута `type`. Ось кілька прикладів:

| Type             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| `text`           | Відображає однорядкове поле введення тексту. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_text) |
| `radio`          | Відображає перемикач (для вибору одного з багатьох варіантів) [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_radio) |
| `checkbox`       | Відображає прапорець (для вибору нуля або більше з багатьох варіантів) [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_checkbox2) |
| `submit`         | Відображає кнопку надсилання (для надсилання форми) [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_submit) |
| `button`         | Відображає кнопку, яку можна натиснути [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_button) |
| `color`          | використовується для полів введення, які мають містити колір. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_color) |
| `date`           | використовується для полів введення, які мають містити дату. [Приклад1](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_date), [Приклад з обмеженнями на введення](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_date_max_min) |
| `datetime-local` | визначає поле введення дати й часу без часового поясу. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_datetime-local) |
| `email`          | використовується для полів введення, які повинні містити адресу електронної пошти. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_email) |
| `file`           | означує поле вибору файлу та кнопку «Огляд» для завантаження файлів. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_file) |
| `hidden`         | означує приховане поле введення (не видиме для користувача). Приховане поле дозволяє веб-розробникам включати дані, які користувачі не можуть побачити або змінити під час надсилання форми. У прихованому полі часто зберігається запис бази даних, який потрібно оновити під час надсилання форми [приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_hidden). |
| `image`          | означає зображення як кнопку для надсилання. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_image) |
| `month`          | дозволяє користувачеві вибрати місяць і рік. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_month) |
| `number`         | означує числове поле введення. Ви також можете встановити обмеження на те, які числа приймаються. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_number) |
| `password`       | Для введення паролю [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_password) |
| `range`          | означує елемент керування для введення числа, точне значення якого не є важливим (наприклад, повзунок). Діапазон за замовчуванням від 0 до 100. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_range) |
| `reset`          | означує кнопку скидання, яка скидає всі значення форми до значень за замовчуванням: [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_reset) |
| `search`         | використовується для полів пошуку (поле пошуку поводиться як звичайне текстове поле). [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_search) |
| `tel`            | використовується для полів введення, які повинні містити номер телефону.[Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_tel) |
| `time`           | дозволяє користувачеві вибрати час (без часового поясу). [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_time) |
| `url`            | використовується для полів введення, які мають містити URL-адресу. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_url) |
| `week`           | дозволяє користувачеві вибрати тиждень і рік. [Приклад](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_week) |

[Деталі по елементу](https://www.w3schools.com/tags/tag_input.asp)

### Атрибут Name для `<input>`

Зауважте, що кожне поле введення повинно мати атрибут `name` для надсилання. Якщо атрибут `name` пропущено, значення поля введення не надсилатиметься взагалі. У цьому прикладі не надсилатиметься значення поля введення «First name»:

```html
 <form action="/action_page.php">
 <label for="fname">First   name:</label><br>
 <input type="text" id="fname" value="John"><br><br>
   <input type="submit" value="Submit">
</form> 
```

 <form action="/action_page.php">
 <label for="fname">First   name:</label><br>
 <input type="text" id="fname" value="John"><br><br>
   <input type="submit" value="Submit">
</form> 

### Type Text

`<input type="text">` означує однорядкове поле для введення тексту.

Приклад форми з полями для введення тексту:

```html
 <form>
     <label for="fname">First name:</label><br>
     <input   type="text" id="fname" name="fname"><br>
     <label for="lname">Last   name:</label><br>
     <input type="text" id="lname" name="lname">
</form> 
```

### Type Radio Buttons

Тип `<input type="radio">` означує перемикач. Перемикачі дозволяють користувачеві вибрати ОДИН із обмеженої кількості варіантів.

```html
<p>Choose your favorite Web language:</p>
<form>
  <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript">
  <label for="javascript">JavaScript</label>
</form> 
```

Наведений код матиме викгляд:

<p>Choose your favorite Web language:</p> <form>  <input type="radio" id="html" name="fav_language"    value="HTML">  <label for="html">HTML</label><br>  <input    type="radio" id="css" name="fav_language" value="CSS">  <label    for="css">CSS</label><br>  <input type="radio" id="javascript"    name="fav_language" value="JavaScript">  <label for="javascript">JavaScript</label></form>  

### Type Checkboxes

Тип `<input type="checkbox">` визначає **прапорці**. Прапорці дозволяють користувачеві вибрати НУЛЬ або БІЛЬШЕ варіантів з обмеженої кількості варіантів. Форма з прапорцями:

```html
 <form>
 <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
   <label for="vehicle1"> I have a bike</label><br>
 <input   type="checkbox" id="vehicle2" name="vehicle2" value="Car">
 <label for="vehicle2">   I have a car</label><br>
 <input type="checkbox"   id="vehicle3" name="vehicle3"   value="Boat">
 <label for="vehicle3"> I have a boat</label>
 </form> 
```

 <form>
 <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
   <label for="vehicle1"> I have a bike</label><br>
 <input   type="checkbox" id="vehicle2" name="vehicle2" value="Car">
 <label for="vehicle2">   I have a car</label><br>
 <input type="checkbox"   id="vehicle3" name="vehicle3"   value="Boat">
 <label for="vehicle3"> I have a boat</label>
 </form> 

### Type Submit Button

Тип `<input type="submit">` визначає кнопку для надсилання даних форми обробнику форми. Обробник форми зазвичай є файлом на сервері зі сценарієм для обробки вхідних даних. Обробник форми вказується в атрибуті `action` форми. Форма з кнопкою відправки:

```html
 <form action="/action_page.php">
 <label for="fname">First   name:</label><br>
 <input type="text" id="fname" name="fname"   value="John"><br>
 <label for="lname">Last name:</label><br>
   <input type="text" id="lname" name="lname" value="Doe"><br><br>
   <input type="submit" value="Submit">
</form> 
```

 <form action="/action_page.php">
 <label for="fname">First   name:</label><br>
 <input type="text" id="fname" name="fname"   value="John"><br>
 <label for="lname">Last name:</label><br>
   <input type="text" id="lname" name="lname" value="Doe"><br><br>
   <input type="submit" value="Submit">
</form> 

### Type Number

`<input type="number">` означує **числове** поле введення. Ви також можете встановити обмеження на те, які цифри приймаються. У наступному прикладі показано числове поле введення, куди можна ввести значення від 1 до 5:

```html
 <form>
 <label for="quantity">Quantity (between 1 and   5):</label>
 <input type="number" id="quantity" name="quantity"   min="1" max="5">
</form> 
```

 <form>
 <label for="quantity">Quantity (between 1 and   5):</label>
 <input type="number" id="quantity" name="quantity"   min="1" max="5">
</form> 

### Спеціальні атрибути input

| Ім'я атрибуту    | Призначення                                                  | Демо                                                         | Приклад                                                      |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| value            | означує початкове значення для поля введення                 | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_value) | ` <input type="text"   id="fname" name="fname" value="John">` |
| readonly         | вказує, що поле введення є лише для читання.                 | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_readonly) | ` <input type="text"   id="fname" name="fname" value="John" readonly>` |
| disabled         | вказує, що поле введення має бути вимкнене. Вимкнене поле введення непридатне для використання та на нього не можна натискати. Значення вимкненого поля введення не буде надіслано під час надсилання форми! | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_disabled) | ` <input type="text"   id="fname" name="fname" value="John" disabled>` |
| size             | означує видиму ширину поля введення в символах. Значення за замовчуванням для `size` — 20. Атрибут `size` працює з такими типами введення: text, search, tel, url, email,  і password. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_size) | `<input   type="text" id="fname" name="fname" size="50">`    |
| maxlength        | означує максимальну кількість символів, дозволену в полі введення. Якщо встановлено `maxlength`, поле введення не прийматиме більше ніж указану кількість символів. Однак цей атрибут не забезпечує зворотного зв’язку. Отже, якщо ви хочете попередити користувача, ви повинні написати код JavaScript. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_maxlength) | `<input   type="text" id="fname" name="fname" size="50">`    |
| min and max      | Атрибути означують мінімальне та максимальне значення для поля введення. Атрибути `min` і `max` працюють із такими типами введення: number, range, date, datetime-local, month, time і week. Використовуйте атрибути max і min разом, щоб створити діапазон допустимих значень. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_max_min) | `<input type="date" id="datemin" name="datemin"   min="2000-01-02">` `<input type="number" id="quantity"   name="quantity" min="1" max="5">` |
| multiple         | Атрибут input `multiple` вказує, що користувачеві дозволено вводити більше одного значення в поле введення. Атрибут `multiple` працює з такими типами введення: email та file. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_multiple) | `<input   type="file" id="files" name="files" multiple>`     |
| pattern          | означує регулярний вираз, за яким перевіряється значення поля введення під час надсилання форми. Атрибут `pattern` працює з такими типами введення:  text,  date, search, url, tel, email і password. Використовуйте глобальний атрибут [title](https://www.w3schools.com/tags/att_global_title.asp), щоб описати шаблон, щоб допомогти користувачеві. Дізнайтеся більше про [регулярні вирази](https://www.w3schools.com/js/js_regexp.asp) у нашому посібнику з JavaScript. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_pattern) | `<input type="text" id="country_code" name="country_code"   pattern="[A-Za-z]{3}" title="Three letter country code">` |
| placeholder      | означує коротку підказку, яка описує очікуване значення поля введення (приклад значення або короткий опис очікуваного формату). Коротка підказка відображається в полі введення перед тим, як користувач введе значення. Атрибут `placeholder` працює з такими типами введення: text, search, url, tel, email і password | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_placeholder) | `<input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">` |
| required         | означує, що поле введення має бути заповнене перед надсиланням форми. Атрибут `required` працює з такими типами введення: text, search, url, tel, email, password, date pickers, number, checkbox, radio та file. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_required) | `<input type="text" id="username" name="username" required>` |
| step             | означує допустимі інтервали чисел для поля введення. Приклад: якщо step="3", дозволені числа можуть бути -3, 0, 3, 6 тощо. Цей атрибут можна використовувати разом із атрибутами max і min для створення діапазону допустимих значень. Атрибут `step` працює з такими типами введення: number, range, date, datetime-local, month, time та week | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_step) | `<input   type="number" id="points" name="points" step="3">` |
| autofocus        | вказує, що поле введення має автоматично отримувати фокус під час завантаження сторінки. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_autofocus) | `<input   type="text" id="fname" name="fname" autofocus>`    |
| height and width | означують висоту та ширину елемента `<input type="image">`. Завжди вказуйте як атрибути висоти, так і ширини для зображень. Якщо встановлено висоту та ширину, місце, необхідне для зображення, резервується під час завантаження сторінки. Без цих атрибутів браузер не знає розміру зображення та не може зарезервувати для нього відповідний простір. В результаті макет сторінки буде змінюватися під час завантаження (під час завантаження зображень). | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_height_width) | `<input type="image" src="img_submit.gif" alt="Submit" width="48" height="48">` |
| list             | відноситься до елемента `<datalist>`, який містить попередньо означені параметри для елемента `<input>` | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_datalist) | `<input list="browsers"> <datalist id="browsers"> <option value="Internet Explorer"> <option value="Firefox"> <option value="Chrome"> </datalist>` |
| autocomplete     | означує, увімкнути чи вимкнути автозаповнення для форми чи поля введення. Автозаповнення дозволяє браузеру передбачити значення. Коли користувач починає вводити текст у поле, браузер має відобразити варіанти заповнення поля на основі раніше введених значень. Атрибут `autocomplete` працює з `<form>` і такими типами `<input>`: text, search, url, tel, email, password, datepickers, range і color. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_autocomplete) | `<form action="/action_page.php" autocomplete="on">` `<input type="email" id="email" name="email" autocomplete="off">` |
|                  |                                                              |                                                              |                                                              |

Ось список деяких поширених обмежень щодо введення:

| Attribute | Description                                                  |
| --------- | ------------------------------------------------------------ |
| checked   | Вказує, що поле введення має бути попередньо вибрано під час завантаження сторінки (для type="checkbox" або type="radio") |
| disabled  | Вказує, що поле введення має бути вимкнене                   |
| max       | Specifies the maximum value for an input field               |
| maxlength | Specifies the maximum number of character for an input field |
| min       | Specifies the minimum value for an input field               |
| pattern   | Specifies a regular expression to check the input value against |
| readonly  | Specifies that an input field is read only (cannot be changed) |
| required  | Specifies that an input field is required (must be filled out) |
| size      | Specifies the width (in characters) of an input field        |
| step      | Specifies the legal number intervals for an input field      |
| value     | Specifies the default value for an input field               |

У наступному прикладі показано числове поле введення, куди можна ввести значення від 0 до 100 із кроком 10. Значення за замовчуванням — 30:

```html
<form>
    <label for="quantity">Quantity:</label>
    <input   type="number" id="quantity" name="quantity" min="0" max="100" step="10"   value="30">
</form> 
```



 <form>
 <label for="quantity">Quantity:</label>
 <input   type="number" id="quantity" name="quantity" min="0" max="100" step="10"   value="30">
</form> 

## Елемент `<select>` 

Елемент `<select>` означує розкривний список:

```html
<label for="cars">Choose a car:</label>
<select id="cars" name="cars">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select> 
```

<select id="cars" name="cars">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select> 

Елемент `<option>` означує параметр, який можна вибрати. За замовчуванням вибрано перший пункт у розкривному списку. Щоб визначити попередньо вибрану опцію, додайте до неї атрибут `selected`:

```html
 <option value="fiat" selected>Fiat</option> 
```

Використовуйте атрибут `size`, щоб вказати кількість видимих значень:

```html
<label for="cars">Choose a car:</label>
<select id="cars" name="cars" size="3">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select> 
```

<select id="cars" name="cars" size="3">
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select>

Використовуйте атрибут `multiple`, щоб дозволити користувачеві вибрати більше одного значення:

```html
<label for="cars">Choose a car:</label>
<select id="cars" name="cars" size="4" multiple>
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select> 
```

<select id="cars" name="cars" size="4" multiple>
<option value="volvo">Volvo</option>
<option value="saab">Saab</option>
<option value="fiat">Fiat</option>
<option value="audi">Audi</option>
</select> 

[Деталі](https://www.w3schools.com/tags/tag_select.asp)

## Елемент `<textarea>`

Елемент `<textarea>` означує багаторядкове поле введення (текстова область). Атрибут `rows` визначає видиму кількість рядків у текстовій області. Атрибут `cols` визначає видиму ширину текстової області.

```html
<textarea name="message" rows="10" cols="30">
	The cat was playing in the garden.
</textarea>
```

 <textarea name="message" rows="10" cols="30">
	The cat was playing in the garden.
</textarea>

You can also define the size of the text area by using CSS:

```
<textarea name="message"   style="width:200px; height:200px;">
	The cat was playing in the garden.
</textarea> 
```

 <textarea name="message"   style="width:200px; height:200px;">
The cat was playing in the garden.
</textarea> 

[Деталі](https://www.w3schools.com/tags/tag_textarea.asp)

## Елемент `<button>`

Елемент `<button>` означує кнопку, яку можна натиснути:

```
<button type="button"  onclick="alert('Hello World!')">Click Me!</button>
```

<button type="button"  onclick="alert('Hello World!')">Click Me!</button>

**Примітка:** завжди вказуйте атрибут `type` для елемента кнопки. Різні браузери можуть використовувати різні типи за замовчуванням для елемента кнопки.

[Деталі](https://www.w3schools.com/tags/tag_button.asp)

## Елементи `<fieldset>` і `<legend>`

Елемент `<fieldset>` використовується для групування пов’язаних даних у формі. Елемент `<legend>` означує заголовок для елемента `<fieldset>`.

```html
<form action="/action_page.php">
    <fieldset>
        <legend>Personalia:</legend>
        <label for="fname">First   name:</label><br>
        <input type="text" id="fname" name="fname"   value="John"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname" value="Doe"><br><br>
        <input type="submit" value="Submit">
    </fieldset>
</form>  
```

<form action="/action_page.php">
    <fieldset>
        <legend>Personalia:</legend>
        <label for="fname">First   name:</label><br>
        <input type="text" id="fname" name="fname"   value="John"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname" value="Doe"><br><br>
        <input type="submit" value="Submit">
    </fieldset>
</form>  

[Деталі filedset](https://www.w3schools.com/tags/tag_fieldset.asp)

[Деталі legend](https://www.w3schools.com/tags/tag_legend.asp)

## Елемент `<datalist>`

Елемент `<datalist>` означує список попередньо означених параметрів для елемента `<input>`. Під час введення даних користувачі бачитимуть розкривний список із попередньо означеними параметрами. Атрибут `list` елемента `<input>` має посилатися на атрибут `id` елемента `<datalist>`.

```html
<form action="/action_page.php">
    <input list="browsers">
    <datalist id="browsers">
        <option value="Internet Explorer">
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="Safari">
    </datalist> 
</form> 
```

<form action="/action_page.php">
    <input list="browsers1">
    <datalist id="browsers1">
        <option value="Internet Explorer">
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="Safari">
    </datalist> 
</form> 

[Деталі](https://www.w3schools.com/tags/tag_datalist.asp)

## Елемент `<output>`

Елемент `<output>` представляє результат обчислення (наприклад, обчислення, виконаного сценарієм). Виконайте обчислення та покажіть результат в елементі `<output>`:

```html
<form action="/action_page.php" oninput="x.value=parseInt(a.value)+parseInt(b.value)">
	0
	<input type="range"  id="a" name="a" value="50">
	100 +
	<input type="number" id="b" name="b" value="50">
	=
	<output name="x" for="a b"></output>
	<br><br>
	<input type="submit">
</form> 
```

<form action="/action_page.php" oninput="x.value=parseInt(a.value)+parseInt(b.value)">
	0
	<input type="range"  id="a" name="a" value="50">
	100 +
	<input type="number" id="b" name="b" value="50">
	=
	<output name="x" for="a b"></output>
	<br><br>
	<input type="submit">
</form> 

[Деталі](https://www.w3schools.com/tags/tag_output.asp)

## HTML `<optgroup>` Tag

[Деталі](https://www.w3schools.com/tags/tag_optgroup.asp)

## HTML `<option>` Tag

[Деталі](https://www.w3schools.com/tags/tag_option.asp)

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

