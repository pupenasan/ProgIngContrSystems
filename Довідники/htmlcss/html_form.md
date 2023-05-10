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

## Елемент `form` 

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
| formnovalidate | атрибут `<input>`  що означує,  що елемент `<input>` не повинен перевірятися під час надсилання. Цей атрибут замінює атрибут `novalidate` елемента `<form>`. Атрибут `formnovalidate` працює з такими типами введення: submit. | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_formnovalidate) | `<input type="submit"     formnovalidate="formnovalidate" value="Submit without validation">` |

 

[Деталі](https://www.w3schools.com/tags/tag_form.asp)



## Елемент `label` 

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

## Елемент `input` 

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

### Атрибут Name для `input`

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
| value            | означує початкове значення для поля введення                 | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_value) | `<input type="text"   id="fname" name="fname" value="John">` |
| readonly         | вказує, що поле введення є лише для читання.                 | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_readonly) | `<input type="text"   id="fname" name="fname" value="John" readonly>` |
| disabled         | вказує, що поле введення має бути вимкнене. Вимкнене поле введення непридатне для використання та на нього не можна натискати. Значення вимкненого поля введення не буде надіслано під час надсилання форми! | [Посилання](https://www.w3schools.com/html/tryit.asp?filename=tryhtml_input_attributes_disabled) | `<input type="text"   id="fname" name="fname" value="John" disabled>` |
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

## Елемент `select` 

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

## Елемент `textarea`

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

## Елемент `button`

Елемент `<button>` означує кнопку, яку можна натиснути:

```
<button type="button"  onclick="alert('Hello World!')">Click Me!</button>
```

<button type="button"  onclick="alert('Hello World!')">Click Me!</button>

**Примітка:** завжди вказуйте атрибут `type` для елемента кнопки. Різні браузери можуть використовувати різні типи за замовчуванням для елемента кнопки.

[Деталі](https://www.w3schools.com/tags/tag_button.asp)

## Елементи `fieldset` і `legend`

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

## Елемент `datalist`

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



## Елемент `output`

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

## HTML `optgroup` Tag

[Деталі](https://www.w3schools.com/tags/tag_optgroup.asp)

## HTML `option` Tag

[Деталі](https://www.w3schools.com/tags/tag_option.asp)

