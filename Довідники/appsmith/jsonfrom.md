# JSON Form

Віджет форми JSON заощаджує час і зусилля, автоматично генеруючи форми з даних JSON, усуваючи необхідність створення форм вручну.

## Створіть форму JSON

Щоб заповнити віджет «Форма JSON» даними, ви можете використати властивість **Source Data**, яка вимагає, щоб дані були структуровані у форматі JSON:

```json
{
  "name": "John",
  "date_of_birth": "20/02/1990",
  "age": 29, 
  "employee_id": 1001
}
```

Форма JSON автоматично визначає відповідний тип поля для кожного значення. Наприклад, якщо дані JSON містять поле `age`, воно встановлює тип поля на *Number Input*. Крім того, ви можете додавати/налаштовувати типи полів за допомогою властивості **Field Configuration**.

Ви можете відобразити динамічні дані у віджеті JSON Form, прив’язавши відповідь із запиту або функції JS до властивості **Source Data**. Це дозволяє формі динамічно оновлюватись у міру зміни даних у базі даних або API.

**Приклад**: припустімо, що вам потрібна форма основної інформації, яка показує деталі кожного запису у формі, коли ви вибираєте рядок у таблиці. Припустімо, ви отримали дані з  [mock database](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/connecting-to-databases#sample-databases) за допомогою запиту `SELECT fetchUserData `. Ви можете відобразити отримані дані, прив’язавши відповідь на запит до властивості **Table Data** віджета Table `tblUserData`, як показано нижче:

```js
{{fetchUserData.data}}
```

Щоб автоматично генерувати поля у формі JSON, коли вибрано рядок таблиці, додайте наведений нижче код у властивість **Source Data**:

```js
{{tbluserData.selectedRow}}
```

Ви можете натиснути на окремий рядок у таблиці та оновити дані в полях форми.

#### Автоматична генерація форми

Ви можете ввімкнути властивість **Auto Generate Form**, щоб поля форми автоматично генерувалися, коли змінюються вихідні дані, наприклад, коли змінюються ключі в даних JSON або тип даних змінюється, наприклад, із рядка на число .

Однак важливо зазначити, що ввімкнення цієї функції замінює будь-які спеціальні конфігурації, які ви надаєте за допомогою перетворень даних за допомогою JavaScript.

#### Field configuration

У розділі **Field configuration** на панелі властивостей форми JSON ви можете додавати поля або оновлювати налаштування кожного поля, клацнувши значок зубчика ⚙︎ поруч із ним. Ви можете налаштувати кожне поле форми за допомогою властивостей, наприклад, оновити тип поля, налаштувати перевірку та властивості стилю, а також запустити дії за допомогою прослуховувачів подій. Ви можете вибрати будь-який із наведених нижче параметрів у властивості **Field Type**, щоб оновити тип віджета для цього поля у формі JSON:

- Array
- Checkbox
- Currency Input
- Datepicker
- Email Input
- Multiselect
- Multi-line Text Input
- Number Input
- Object
- Password Input
- Phone Number Input
- Radio Group
- Select
- Switch
- Text Input

Кожен тип поля має різні набори подій і конфігурацій, які можна налаштувати. Наприклад, поле введення числа може мати мінімальне та максимальне значення, тоді як поле вибору дати може мати певний формат дати.

Параметри конфігурації для кожного типу поля можуть включати значення за замовчуванням, текст покажчика місця заповнення, правила перевірки тощо. Ці параметри можна налаштувати відповідно до конкретних потреб форми, що створюється

## Надіслати дані форми

Щоб отримати доступ до даних форми, значення, введені у форму JSON, зберігаються у властивості `formData`. Наприклад, якщо у вас є форма JSON із полем імені, ви можете отримати доступ до її значення за допомогою:

```js
{{JSONForm.formData.name}}
```

Щоб надіслати дані форми, ви можете використати подію `onSubmit`. Ця подія дозволяє виконувати дію, коли користувач надсилає форму.

Припустімо, що у вас є база даних із інформацією про користувача  `name`, `gender`, and `email` , і ви хочете вставити дані, зібрані через форму JSON. Для цього ви можете створити запит на вставку SQL і передати дані, як показано:

```sql
INSERT INTO users
  (name, gender, email)
VALUES
  (
    {{JSONForm1.formData.name}},
    {{JSONForm1.formData.gender}},
    {{JSONForm1.formData.email}}
  );
```

Щоб ініціювати цей запит на вставку, ви можете встановити подію `onSubmit` для кнопки **Надіслати** у формі JSON.

## Перевірка форми

Перевірка введених користувачем даних є важливою для забезпечення правильних і відформатованих даних. Appsmith надає такі властивості перевірки, як Valid, Regex і Required for **Fields**.

- Властивість **Valid**, яка перевіряє введені дані на вираз коду,
- Властивість **Regex**, яка перевіряє відповідність введених даних регулярному виразу,
- Властивість **Required**, яка вказує, що поле має бути заповненим.

Коли ввімкнуто **Disabled Invalid Forms**, віджет форми JSON перевіряє властивості перевірки, а кнопка **Submit** автоматично вимикається, якщо перевірки не проходять. Використання цієї властивості гарантує, що всі дані користувача відповідають критеріям, які ви визначили в полях форми.

## Очистити поля форми

Щоб очистити поля форми, можна ввімкнути властивість **Show Reset**. Якщо ввімкнено властивість «Показати скидання», до форми додається кнопка скидання. Натискання цієї кнопки повертає всі поля у формі до стандартних значень. Це корисно, якщо користувач хоче почати заново з нового запису або якщо він ввів неправильну інформацію та потребує очищення форми.

## Властивості

Властивості дозволяють редагувати віджет, з’єднувати його з іншими віджетами та налаштовувати дії користувача.

### Властивості віджета

Ці властивості присутні на панелі властивостей віджета. У наведеній нижче таблиці перераховано всі властивості віджетів.

| Property                  | Data type | Description                                                  |
| ------------------------- | --------- | ------------------------------------------------------------ |
| **Title**                 | String    | Sets the text that appears at the top of the form as a title. |
| **Source Data**           | JSON      | Takes a JSON *object* whose data is used to generate the form layout. |
| **Auto Generate form**    | Boolean   | When enabled, the form layout updates automatically when the field types inside the **Source Data** are changed. |
| **Generate Form**         | Button    | When **Auto Generate Form** is disabled, this button manually regenerates the form layout according to the field types in the **Source Data** object. |
| **Field Configuration**   | List      | Це список згенерованих полів форми. Натисніть значок шестірні, щоб додатково налаштувати будь-яке з цих полів, або значок ока, щоб приховати це поле. Їх також можна змінити, перетягнувши їх, і перейменувати, клацнувши їх імена. |
| **Add New Field**         | Button    | Adds a new field in the form. Fields added this way are known as custom fields. You can delete these fields later. |
| **Disable Invalid Forms** | Boolean   | Disables the submit button when one or more of the form fields are considered invalid. |
| **Animate Loading**       | Boolean   | When turned off, the widget loads without any skeletal animation. You can  use a toggle switch to turn it on/off. You can also turn it off/on using javascript by enabling the JS label next to it. |
| **Fixed Footer**          | Boolean   | Робить нижній колонтитул липким для довгих форм, тому кнопки Submit та Reset завжди видно на довгих формах. |
| **Visible**               | Boolean   | Controls widget's visibility on the page. When turned off: The widget would not  be visible when the app is published. It appears translucent when in  Edit mode. |
| **Hidden Fields in Data** | Boolean   | When turned on, the output data is updated to contain data from hidden  fields. The hidden field values are referenced from the source data. |
| **Scroll Contents**       | Boolean   | Makes the contents of the form scrollable.                   |
| **Show Reset**            | Boolean   | When enabled, shows a reset button in the form allowing users to reset the form at any time. |
| **Submit Button Label**   | String    | Sets the text for the label on the Submit button.            |
| **Reset Button Label**    | String    | Sets the text for the label on the Reset button.             |
| **Height**                | String    | It configures how a widget’s height reacts to content changes. It has three possible configurations: **Fixed**: The height of the widget remains as set using drag and resize. **Auto Height**: The height of the widget reacts to content changes. In JSON form widget, auto height is enabled by default.   **Auto Height with limits**: Same as Auto height, with a configurable option to set the minimum and  maximum number of rows that can be occupied by the widget. |

### Довідкові властивості

На ці властивості можна посилатися в інших віджетах, запитах або функціях JS за допомогою оператора крапки. Наприклад, щоб отримати formData, ви можете використовувати `JSONFrom1.formData`.

| Property       | Data Type | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| **fieldState** | Object    | 8A JSON *object* describing the state of each field in the form. State data includes: **isDisabled**, **isRequired**, **isVisible**, and **isValid**  e.g. `{ "name": {"isVisible": true, ... }, ... }` |
| **formData**   | Object    | Містить *об’єкт* JSON із іменами полів та їх поточними значеннями у формі. |
| **isValid**    | Boolean   | Reflects whether the widget's inputs are considered **Valid**. |
| **sourceData** | Object    | Contains a JSON *object* of the original source data which was bound to the form. |

### Властивості стилів

Властивості стилю дозволяють змінювати зовнішній вигляд віджета.

| Property             | Data type | Description                                                  |
| -------------------- | --------- | ------------------------------------------------------------ |
| **Background Color** | String    | Sets the background color of the widget. Accepts CSS [`color` ](https://developer.mozilla.org/en-US/docs/Web/CSS/color)values. |
| **Border Radius**    | String    | Rounds the corners of the widget's outer edge. With JS enabled, this accepts valid CSS [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) values. |
| **Border Width**     | Number    | Sets the width of the widget's border. Accepts *number* values only, in px. |
| **Box Shadow**       | String    | Casts a drop shadow from the frame of the widget. With JS enabled, this accepts valid CSS [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values. |
| **Border Color**     | String    | Sets the Border color of the widget.                         |
| **Button Color**     | String    | Sets the color of the submit and reset button. Accepts valid CSS [`color` ](https://developer.mozilla.org/en-US/docs/Web/CSS/color)values. |
| **Button Variant**   | String    | Sets the button style type to represent its significance - Primary,  Secondary, or Tertiary. You can use JavaScript to set this field by  writing code that evaluates to the `"PRIMARY", "SECONDARY", or "TERTIARY"`. |
| **Border Radius**    | String    | Rounds the corners of the widget's outer edge. With JS enabled, this accepts valid CSS [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) values. |
| **Box Shadow**       | String    | Casts a drop shadow from the frame of the widget. With JS enabled, this accepts valid CSS [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values. |
| **Icon**             | String    | Sets an icon to be included on the submit and reset button.  |
| **Placement**        | String    | Defines where the button's icon and label appear within the space of the button. **Start:** The icon and label appear at the left-most side of the button; **Center:** The icon and label appear in the center of the button space; **Between:** The icon and label appear at opposite ends of the button's space. You  can use JavaScript to set this field by writing code that evaluates to  the `"START", "CENTER", or "BETWEEN"`. |
| **Position**         | String    | Sets whether the icon appears on the left or right of the button's label text. |

## Events

These are functions that are called when event listeners are triggered in the widget. [Use actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to execute tasks based on user events.

| **Event name** | **Description**                                              |
| -------------- | ------------------------------------------------------------ |
| **onSubmit**   | Sets an action to take place when the user clicks the Submit button on this form. |

## Troubleshooting

Here are some common errors that you may see when using the JSON Form widget:

- [Source data exceeds 50 fields](https://docs.appsmith.com/help-and-support/troubleshooting-guide/widget-errors#source-data-exceeds-50-fields)

If you encounter other issues while working with the widget, see [widget errors](https://docs.appsmith.com/help-and-support/troubleshooting-guide/widget-errors). If the guide doesn't cover your issue, contact the [support team](mailto:support@appsmith.com).