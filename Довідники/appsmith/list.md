# List

https://docs.appsmith.com/reference/widgets/list

Віджет «List » дає змогу переглядати структурований набір даних (масив об’єктів) і відображати дані в розділах, які повторюються вертикально, без написання коду. Кожен елемент списку може містити інші віджети для відображення даних або фіксації введених користувачем даних.

<iframe style="width:100%;height:auto;aspect-ratio:16/9;border-radius:0.5rem;overflow:hidden" src="https://youtube.com/embed/0ePiZlWmp7Q?autoplay=1" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/0ePiZlWmp7Q?autoplay=1><img src=https://img.youtube.com/vi/0ePiZlWmp7Q/maxresdefault.jpg alt='How to use List Widget'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="How to use List Widget" loading="lazy" allow="autoplay; picture-in-picture" frameborder="0"></iframe>

*How to use List Widget*

## Список компонентів

Як правило, віджет «List » — це набір інших віджетів, які можна вбудувати для відображення даних або фіксації введених користувачем даних. Коли ви перетягуєте віджет «Список» на полотно, у нього за замовчуванням вбудовано віджети «Image » та «Text ». Ви можете додати більше віджетів відповідно до ваших вимог до контейнера першого елемента списку. Коли ви підключаєте набір даних до списку та прив’язуєте дані до кожного віджета в першому елементі списку, віджети в наступних елементах списку автоматично оновлюються значеннями з набору даних.

## Показати дані в елементах списку

Властивість **Items** приймає дані як масив об’єктів і може зв’язати ваш набір даних із віджетом List. Ви можете прив’язувати статичні або динамічні дані, створені за допомогою виконання запиту або функції JS.

### Статичне відображення даних

Ви можете відобразити статичні дані JSON у властивості **Items** для створення елементів списку.

**Приклад:** перегляньте фрагмент JSON нижче; колекція книг має такі деталі, як `bookId`, `bookName` і `price`.

```json
[
  {
    "bookId": "001",
    "bookName": "Artificial Intelligence for Business Leaders",
    "bookImage": "https://m.media-amazon.com/images/I/511Y1LSr0JL.jpg",
    "price": "INR 599"
  },
  {
    "bookId": "002",
    "bookName": "Bootstrap 4 Quick Start",
    "bookImage": "https://images-na.ssl-images-amazon.com/images/I/41GTBaVKAyL._SX404_BO1,204,203,200_.jpg",
    "price": "INR 439.90”
 }
]
```

Додайте три віджети «Текст» і один віджет «Зображення» в перший елемент списку, щоб відобразити дані у віджеті «Список».

Виконайте наведені нижче кроки, щоб прив’язати кожне поле JSON до віджетів, вбудованих у List :

- Виберіть віджет «Image » та додайте `{{currentItem.bookImage}}` у властивості **Image**. Властивість **currentItem** посилається на дані для певного елемента. Усі елементи списку заповнюються на основі відповідних даних в об’єкті JSON.
- Тепер ви можете побачити зображення в елементі списку, оскільки віджет зображення відображає зображення, доступне за URL-адресою, наданою в JSON.

Так само ви можете прив’язати `bookName`, `bookId` і `price` до текстових віджетів у першому елементі списку.

### Динамічне відображення даних

Якщо ви хочете прив’язати відповідь із запиту або функції JS, ви можете використовувати синтаксис moustache `{{ }}`. Використовуйте формат `{{QUERY_NAME.data}}`, щоб зв’язати дані, які повертає запит. Наприклад, якщо ви виконуєте запит `GetAllEmployees`, зв’яжіть відповідь у властивості **Items**, як показано нижче:

```javascript
{{GetAllEmployees.data}}
```

Щоб дізнатися, як зв’язати дані з функцій JS, див.  [Display Data from JS function](https://docs.appsmith.com/core-concepts/writing-code/workflows#display-data-from-async-js-function)

Щоб відобразити дані в окремих віджетах на картках елементів списку, використовуйте властивість **currentItem**, щоб зв’язати відповідне значення з полів об’єкта у віджеті, як показано нижче.

```javascript
{{currentItem.<attribute_or_column_name>}}
```

де `currentItem` для першого елемента списку відображає 0-й об’єкт у наборі даних. Це можна використовувати будь-де у віджеті, розміщеному всередині віджета «List ».

### Унікальний ідентифікатор елемента списку

Віджет «List » має унікально ідентифікувати кожен елемент, щоб оновлювати, змінювати порядок, додавати чи видаляти їх. Подібно до концепції `Primary Key`  в базі даних або `key` в React, ідентифікатор слід вибрати зі спадного списку властивостей **Data identifier**, значення якого є унікальними в наборі даних, наданому для віджета List.

У попередньому прикладі ідентифікатор `bookId` має унікальне значення в наборі даних.

Якщо в даних немає такого унікального ідентифікатора, ви можете об’єднати кілька ідентифікаторів, щоб сформувати унікальний шаблон, увімкнувши режим JS у властивості.

**Приклад:**

```text
{{currentItem.bookName + "_" + currentItem.author}}
```

Завжди встановлюйте властивість **Data Identifier** дійсний унікальний ідентифікатор, щоб підвищити продуктивність.

## Пагінація на стороні сервера

Списки часто потрібні для відображення великих наборів даних із запитів, але браузери лише іноді можуть завантажувати всі дані в базі даних або можуть робити це повільно. Ви можете використовувати розбивку сторінок на стороні сервера, коли клієнт отримує лише підмножину даних із великих наборів даних. Це дозволяє визначити ліміт даних, який виклик запиту може відобразити, таким чином дозволяючи розбивати дані на сторінки та визначати межі розбиття на сторінки.

Виконайте наведені нижче кроки, щоб розбивати відповіді на сторінки та запитувати менші фрагменти даних за раз:

1. Увімкніть властивість **Server Side Pagination** для списку.
2. Викличте запит у обробнику подій **onPageChange**.
3. Установіть пропозиції `LIMIT` і `OFFSET` у запиті за допомогою властивостей **pageSize** і **pageNo** списку, як показано нижче:

```javascript
SELECT * FROM users LIMIT {{ <listName>.pageSize }} OFFSET {{ (<listName>.pageNo - 1) * <listName>.pageSize }}
```

## Доступ до елементів списку

Ви можете посилатися на значення кожного поля всередині набору даних масиву, пов’язаного зі списком для вибраного елемента списку, використовуючи **selectedItem**, як показано нижче:

```javascript
{{<listName>.selectedItem.<fieldName>}}
```

**Приклад**. У попередньому прикладі, якщо ви хочете відобразити назву книги вибраного елемента у текстовому віджеті, зв’яжіть його у властивості **Текст** текстового віджета, як показано нижче.

```javascript
{{<listName>.selectedItem.bookName}}
```

Ви можете отримати доступ до віджетів-сестерів у картці елементів списку за допомогою властивості **currentView**.

**Приклад**. Якщо у вас є віджет «Input » та віджет «Button » у списку та ви хочете використовувати властивість **Text** для введення, щоб відображати сповіщення про натискання кнопки. У події *onClick* віджета кнопки ви можете отримати доступ до значення віджета введення, як показано нижче

```javascript
{{showAlert(currentView.<inputName>.text)}}
```

Властивість **currentView** завжди слід використовувати для доступу до однорідних даних замість того, щоб безпосередньо посилатися на них. Наприклад: `{ {Input1.text} }` може здатися, що працює в режимі редагування програми, але не працюватиме, коли її розгортають.

**currentItemsView** допомагає переглядати дані та стан віджетів, присутніх у всіх елементах віджета List, і являє собою *масив* *об’єктів*, у якому стан кожного віджета представлено як об’єкт. *Масив* *об’єктів* обмежується кількістю елементів, видимих на сторінці, а не кількістю присутніх елементів списку. Якщо в даних списку є 300 об’єктів, але віджет «List » показує 5 елементів на сторінці, тоді властивість **currentItemsView** показує *масив* лише з 5 *об’єктів*.

**Приклад**. Нижче наведено приклад оціненого значення для всіх елементів списку.

```js
[
  {
    "Image1": {
      "image": "https://assets.appsmith.com/widgets/default.png",
      "isVisible": true
    },
    "Text2": {
      "isVisible": true,
      "text": "Blue"
    },
    "Text3": {
      "isVisible": true,
      "text": "001"
    }
  },
  {
    "Image1": {
      "image": "https://assets.appsmith.com/widgets/default.png",
      "isVisible": true
    },
    "Text2": {
      "isVisible": true,
      "text": "Green"
    },
    "Text3": {
      "isVisible": true,
      "text": "002"
    }
  },
  {
    "Image1": {
      "image": "https://assets.appsmith.com/widgets/default.png",
      "isVisible": true
    },
    "Text2": {
      "isVisible": true,
      "text": "Red"
    },
    "Text3": {
      "isVisible": true,
      "text": "003"
    }
  }
]
```

## Nested lists

You can nest lists within a List widget up to three levels. The **level_\*** property can be used to access the parent List item's data and widget  properties where * represents the level number (from 1 through 3).

Suppose there is a parent list - `parentList`, and a child list - `childList1`. The widgets present in the inner list `childList1` can access the values of an attribute/field in the dataset using the **currentItem** property of the outer list `parentList` as shown below:

```javascript
{{level_1.currentItem.fieldName}}
```

You can use the **currentView** and **currentIndex** properties similarly.

Suppose there is another List widget `childList2` inside `childList1`. The innermost list, `childList2` can access two levels - **level_1** and **level_2**. Here, **level_1** represents the data and state of the topmost list widget, `parentList` and **level_2** represents `childList1`.

The parent list widgets don't have access to it's child list widgets. In the preceding example, the widgets in `childList1` can't use `level_2` or `level_3` to access the data in it child lists. Similarly, `childList1` can only access `level_1` and not `level_2`, but `childList2` can access both `level_1` and `level_2`.

## Properties

Properties allow you to customize the widget, connect it to other widgets and trigger events on user actions.

### Widget properties

| Property                   | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| **Items**                  | Enables you to bind static or dynamic data as an array of objects to the widget. |
| **Data Identifier**        | Like `keys` in React, you need to select a data identifier from your dataset, which helps uniquely identify each item. This helps the List widget identify  which items are added, have changed, or are removed. You can also  combine two columns or data identifiers by enabling the `JS` mode. |
| **Server-side Pagination** | Enables you to implement [server side pagination](https://docs.appsmith.com/reference/widgets/list#server-side-pagination) on the List widget |
| **Total Records**          | This field displays the number of records in the source data for a list.  This value is used to calculate the number of pages to be displayed when using server-side pagination. Note that this field is only visible when **Server Side Pagination** is enabled. |
| **Default Selected Item**  | This field allows you to specify which item should be selected by default when a user first opens the List widget. To set the **Default Selected Item**, simply enter a valid data identifier for the item you want to select. |
| **Visible**                | Controls widget's visibility on the page. When turned off: The widget is visible when the app is published. It appears translucent when in Edit mode. |
| **Animate Loading**        | When turned off, the widget loads without any skeletal animation. You can  use a toggle switch to turn it on/off. You can also turn it off/on using javascript by enabling the JS label next to it. |

### Internal properties

These properties are available only to the widgets placed inside the List  widget and enable you to configure the widget's properties based on the  position/order of the item.

| Property         | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| **currentItem**  | Represents the data for a particular item.                   |
| **currentIndex** | Represents the index of the particular item.                 |
| **currentView**  | Represents the data and state of the widgets present in the current list item.  This property can be used to access all sibling widgets present inside a List item card. |
| **level_\***     | This property is only available for nested lists where * represents the level number (from 1 through 3, where 1 refers to   the  outermost list). This property can be used to access the **currentItem**, **currentView** and **currentIndex** properties of the parent lists. Eg: {{level_1.currentItem.name}} |

### Reference properties

These properties can be referenced in other widgets, queries, or JS functions using the dot operator.

| Property              | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **backgroundColor**   | Represents the widget's Background Color setting as a CSS color value (string). |
| **itemSpacing**       | Reflects the vertical spacing between each item. The value can range between 0 and 16. *(number)*. |
| **isVisible**         | Reflects the state of the widget's **Visible** setting.      |
| **currentItemsView**  | Contains an *array* of *objects*  where each object represents a widget within the list items and holds information about the widgets' state. |
| **listData**          | Contains an *array* of *objects* that each represent a list item and its data. |
| **pageNo**            | Contains a *number* representing which page of the List is currently displayed. |
| **pageSize**          | Contains a *number* representing the number of list items that can fit on one page of the List widget. |
| **selectedItem**      | Contains an *object* representing the data of the selected list item. |
| **triggeredItem**     | Contains an *object* representing the data of the list item that's selected when you click  the list item card or when you interact with an widget (such as a  button) inside the list item |
| **selectedItemView**  | Contains an *object* representing the state of the widgets inside a list item when it's selected. |
| **triggeredItemView** | Contains an *object* representing the state of the widgets inside a list item that's  selected when you click the list item card or when you interact with a  widget (such as a button) inside the list item |

### Style properties

You can make some formatting changes to enhance the look and feel of the widget by using styles.

| Property             | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Background Color** | Sets the background color of the widget. Accepts  CSS [`color` ](https://developer.mozilla.org/en-US/docs/Web/CSS/color)values. |
| **Item Spacing**     | Adds padding to the list cells. It accepts Pixels(px) as a unit for the gap width between list item cards. Accepts *number* values. |
| **Border Radius**    | Rounds the corners of the widget's outer edge. With JS enabled, this accepts valid CSS [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) values. |
| **Box Shadow**       | Casts a drop shadow from the widget's frame. With JS enabled, this accepts valid CSS [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values. |

## Events

When the event is triggered, these event handlers can run queries, JS code, or other [supported actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions).

| Event            | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| **onItemClick**  | Sets an action when the user clicks on one of the list items. |
| **onPageChange** | Sets the action to run when the List's page changes.         |