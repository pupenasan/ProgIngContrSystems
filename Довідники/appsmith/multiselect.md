# Multiselect

https://docs.appsmith.com/reference/widgets/multiselect

## Показати статичні параметри

Щоб відобразити статичні параметри у віджеті Multiselect, можна скористатися властивістю **Options**.

Параметри мають бути вказані як масив об’єктів, де кожен об’єкт має дві властивості: `label` і `value`. Властивість `label` представляє текст, який відображається користувачеві, тоді як властивість `value` — це фактичні дані, які зберігаються та використовуються у вашій програмі. Наприклад:

```json
[
  {
    "label": "Blue",
    "value": "BLUE"
  },
  {
    "label": "Green",
    "value": "GREEN"
  },
  {
    "label": "Red",
    "value": "RED"
  }
]
```

### Встановити значення за замовчуванням

Властивість **Default Selected Values** у віджеті дозволяє вказати початкове значення для віджета під час його першого відображення. Це корисно для попереднього заповнення віджета або забезпечення вибору певних параметрів за замовчуванням. Щоб використовувати цю властивість, установіть для неї значення потрібного параметра у **Options property**.

Наприклад, якщо ви хочете, щоб вибрані значення за замовчуванням були `RED` і `GREEN`, ви можете встановити для властивості **Default Selected Values** значення:

```json
[
  "GREEN",
  "RED"
]
```

## Параметри відображення динамічно

Ви можете динамічно генерувати параметри, отримуючи дані із запитів або функцій JS, прив’язавши відповідь до властивості **Options**.

**Приклад 1:** припустімо, що ви хочете використовувати віджет Multiselect, щоб дозволити користувачам вибирати одну або кілька країн із бази даних із динамічним набором варіантів.

1) Отримати дані з [sample database](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/connecting-to-databases#sample-databases) `users` за допомогою запиту SELECT `fetchData` для отримання різних значень країни як `label` і `value`:

```sql
SELECT DISTINCT country as label, country as value FROM users;
```

2) У властивості Multiselect **Options** відобразіть дані за допомогою:

```js
{{fetchData.data}}
```

З такою конфігурацією віджет Multiselect відображає список унікальних значень країни безпосередньо з запиту. Рекомендується отримувати дані у структурованому форматі безпосередньо із запиту, оскільки це спрощує налаштування під час відображення параметрів у віджеті Multiselect.

**Приклад 2:** якщо дані, отримані із запиту, не мають потрібного формату, ви можете використати JavaScript, щоб перетворити їх перед передачею у віджет Multiselect.

1) Використовуйте таблицю `users` у зразку бази даних і отримайте унікальні значення країни за допомогою наступного SQL-запиту `getdata`:

```sql
SELECT DISTINCT country FROM users;
```

Цей запит отримує унікальні значення країни з таблиці `users`. Отримані дані мають форму масиву об’єктів, де кожен об’єкт має `key` країни.

2) Використовуйте JavaScript, щоб **перетворити дані**, додавши їх до властивості **Options**.

```js
getdata.data.map( p => ({label: p.country, value: p.country}))
```

Код перетворює кожен елемент у масиві `getdata` за допомогою функції `map()`, щоб створити новий об’єкт із властивостями `label` і `value`, для яких встановлено значення країни для кожного об’єкта в масиві.

## Доступ до вибраних параметрів

Якщо ви хочете отримати вибрані значення з віджета Multiselect і зв’язати їх з іншими віджетами або функціями JavaScript, ви можете скористатися такими властивостями:

- **selectedOptionValues**: ця властивість повертає значення вибраних параметрів у віджеті Multiselect.

- **selectedOptionLabels**: ця властивість повертає мітку вибраних параметрів у віджеті Multiselect.

Обидві властивості, `selectedOptionValues` і `selectedOptionLabels`, оновлюються автоматично, коли користувач вибирає або скасовує вибір нової опції у віджеті Multiselect.

**Приклад**: припустімо, ви хочете відфільтрувати дані таблиці на основі вибраних користувачем країн із віджета Multiselect.

1) Створіть новий запит під назвою `filterdata` і додайте оператор SQL, щоб вибрати всі дані з таблиці `users`, де стовпець `country` відповідає вибраним параметрам у віджеті Multiselect.

```sql
SELECT *
FROM users
WHERE country IN ({{"'" + MultiSelect.selectedOptionLabels.join("', '") + "'"}})
LIMIT 10;
```

У разі використання динамічного зв’язування із запитами, які містять ключові слова SQL, як-от `SELECT`, `WHERE`, `AND` та інші ключові слова, [prepared statement](https://docs.appsmith.com/learning-and-resources/how-to-guides/how-to-use-prepared-statements#when-not-to-use-prepared-statements-in-appsmith)  не можна використовувати. Тому рекомендується вимкнути оператор prepared у запиті `filterdata` для віджета Multiselect.

1) Відобразіть дані, прив’язавши відповідь на запит до властивості **Table Data** віджета Table `tblUserData`, як показано нижче:

```js
{{filterdata.data}}
```

2) Установіть подію `onOptionChange` віджета Multiselect для виконання запиту `filterdata`. Це оновлює відображені дані в режимі реального часу, коли користувач вибирає або скасовує параметри.

![Display images on table row selection](https://docs.appsmith.com/img/multi-select-access.gif)Доступ до вибраних параметрів

## Властивості

Властивості дозволяють редагувати віджет, з’єднувати його з іншими віджетами та налаштовувати дії користувача.

### Властивості віджетів

Ці властивості дозволяють редагувати віджет. Усі ці властивості присутні на панелі властивостей віджета.

| Property                  | Data type | Description                                                  |
| ------------------------- | --------- | ------------------------------------------------------------ |
| **Options**               | Array     | Sets the labels and values for different items/options in the list of the  Multiselect widget. Options must be specified as an array of objects  with a label and value property. |
| **Default Value**         | Array     | Sets a default option that is captured as user input unless it is changed by the user. Multiple values can be provided as CSV or an array of strings for a Multiselect dropdown. |
| **Placeholder**           | String    | Sets the Placeholder of the Multiselect widget.              |
| **Required**              | Boolean   | When turned on, it makes a user input required and disables any form submission until input is made. |
| **Visible**               | Boolean   | Control widget's visibility on the page. When turned off, the widget isn't visible when the app is published |
| **Disabled**              | Boolean   | Disables input/selection to the widget. The widget is visible to the user but user input/selection is not allowed. |
| **Tooltip**               | String    | It sets a tooltip for the widget. You can add hints or extra information about the required input from the user. |
| **Animate Loading**       | Boolean   | Allows you to control a widget’s animation on the page load. |
| **Server Side Filtering** | Boolean   | Enables server-side filtering via an API / Query request. Use this property  when your Select option data is being bound to an API / Query. |
| **Allow Select All**      | Boolean   | Controls the visibility of `select all` option in the dropdown. |
| **Height**                | String    | It configures how a widget’s height reacts to content changes. It has three possible configurations: **Fixed**: The height of the widget remains as set using drag and resize. **Auto Height**: The height of the widget reacts to content changes.   **Auto Height with limits**: Same as Auto height, with a configurable option to set the minimum and  maximum number of rows that can be occupied by the widget. |
| **Text**                  | String    | Sets the Placeholder of the Multiselect widget.              |
| **Position**              | String    | Sets the label position of the widget.                       |
| **Alignment**             | String    | Sets the label alignment of the widget.                      |
| **Allow Searching**       | Boolean   | Makes the dropdown list filterable.                          |
| **Width**                 | Number    | Sets the label width of the widget as the number of columns. |

### Довідкові властивості

На ці властивості можна посилатися в інших віджетах, запитах або функціях JS за допомогою оператора крапки. Наприклад, ви можете використовувати `MultiSelect1.isVisible`, щоб отримати статус видимості.

| Reference Property       | Data type | Description                                                  |
| ------------------------ | --------- | ------------------------------------------------------------ |
| **filterText**           | String    | The filter text for Server side filtering                    |
| **isVisible**            | Boolean   | This property indicates whether the widget is visible or not. |
| **isDisabled**           | Boolean   | This property indicates whether the widget is disabled or not. |
| **options**              | Array     | This property shows the values of all the options.           |
| **selectedOptionLabels** | Array     | An array of Labels of the options are displayed in a Multiselect dropdown. This label changes if the default values of the dropdown change or the  user changes an option selection |
| **selectedOptionValues** | Array     | An array of values of the options are displayed in a Multiselect dropdown. This value changes if the default values of the dropdown change or the  user changes an option selection |
| **isDirty**              | Boolean   | Indicates whether the Multiselect widget has been used by the end user during their session. |
| **isValid**              | Boolean   | This property indicates whether the widget is valid or not.  |

### Властивості стилю

Властивості стилю дозволяють змінювати зовнішній вигляд віджета. Усі ці властивості присутні на панелі властивостей віджета.

| Property          | Data type | Description                                            |
| ----------------- | --------- | ------------------------------------------------------ |
| **Font Color**    | String    | Allows you to set text color for the label.            |
| **Font Size**     | String    | Allows you to set the size of the label.               |
| **Emphasis**      | String    | Allows you to choose a font style (bold or italic).    |
| **Border Radius** | String    | Allows you to define curved corners.                   |
| **Box Shadow**    | String    | Allows you to choose from the available shadow styles. |

### Події

Коли подія запускається, ці обробники подій можуть запускати запити, код JS або інші підтримувані [actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions)

| Events              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| **onOptionChange**  | Sets the action to be run when the user selects/unselects an option. |
| **onDropdownOpen**  | Sets the action to be run when the user opens the dropdown.  |
| **onDropdownClose** | Sets the action to be run when the user opens the dropdown.  |
| **onFilterUpdate**  | Triggers an action on change of `filterText`                 |