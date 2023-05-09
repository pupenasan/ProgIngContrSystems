# Chart

https://docs.appsmith.com/reference/widgets/chart

При спілкуванні з більшою аудиторією корисно візуальне представлення даних. Він більш читабельний і дає краще розуміння проблем/досягнень. Під час вибору сегмента даних можна детальніше переглянути певну інформацію.

Віджет **Діаграма** — це візуальне представлення даних. Це дозволяє візуалізувати вузькі місця в процесах. Маючи під рукою першопричину, ви можете змінити методи для прийняття прорахованих рішень.

## Відображення даних

Щоб відобразити дані у віджеті «Chart», ви можете використовувати властивість **Series Data**, щоб надати дані в такій структурі:

```js
[
  {
    "x": "Product1",
    "y": 20000
  },..
]
```

У цьому форматі **`x`** позначає **мітку**, а **`y`** позначає **значення**.

Appsmith пропонує кілька вбудованих діаграм для представлення ваших даних. За допомогою властивості **Chart Type** ви можете вибрати один із наведених нижче типів для візуалізації даних:

- Line Chart, 
- Bar Chart, 
- Pie Chart, 
- Column Chart, 
- Area Chart, and  
- [Custom Chart](https://docs.appsmith.com/reference/widgets/chart#custom-charts)

Ви можете відображати динамічні дані із запитів або функцій JS, прив’язавши відповідь до властивості **Series Data**.

**Приклад**: припустімо, що у вас є база даних із даними користувачів, яка містить стовпець із зазначенням статі кожного користувача. Ви хочете отримати кількість чоловіків і жінок у базі даних і створити діаграму для відображення результатів.

1) Отримайте дані з [sample database ](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/connecting-to-databases#sample-databases) `users` використовуючи запит SELECT `fetchUserData`. 

```sql
SELECT gender, COUNT(*) as count
FROM users
GROUP BY gender;
```

Цей SQL-запит підраховує кількість користувачів у базі даних, згрупованих за їх статтю, і відображає результат із підрахунком для кожної статі.

2) Далі давайте за допомогою JavaScript **перетворимо дані**, додавши їх до властивості **Series Data**.

```js
{ {fetchUserData.data.map( p => ({x: p.gender, y: p.count}))} }
```

Код використовує функцію `map()` для перетворення кожного елемента в масиві `fetchUserData.data` в об’єкт із ключами `x` і `y`.

Якщо запит завершується невдачею, а дані за замовчуванням не вказано, діаграма не відображається та виглядає порожньою.

### Побудова декількох рядів даних

Якщо ви хочете відобразити кілька рядів даних на діаграмі, це можна зробити за допомогою властивості **Add Series**. Ця функція дозволяє заповнювати діаграму різними наборами даних і налаштовувати різні аспекти її вигляду, наприклад кольори та мітки, щоб створити візуально привабливу та інформативну діаграму.

Наприклад, припустімо, що у вас є дані про кількість чоловіків і жінок, які проголосували щороку, ви можете використати властивість **Chart Series**, щоб відобразити обидва набори даних на одній діаграмі. Це дозволить вам порівняти кількість виборців чоловіків і жінок за певний час.

У наступному розділі демонструються різні типи вбудованих діаграм для візуалізації даних:

- Line Chart
- Bar Chart
- Column Chart
- Area Chart
- Pie Chart

Лінійна діаграма відображає дані як ряд точок, з’єднаних лінією. Це корисний інструмент для представлення даних, які змінюються з часом, як-от курс акцій або температурні коливання.

Додавши кілька серій, ви можете порівняти зв’язки між різними наборами даних у часі, як у прикладі політичних виборів.

![img](https://docs.appsmith.com/img/line-voter.png)

## Спеціальні діаграми

Appsmith пропонує інтеграцію з [FusionCharts](https://www.fusioncharts.com/dev/chart-guide/list-of-charts/) і пропонує широкий спектр типів діаграм, які можна використовувати для створення власних діаграм. Вибравши **Chart Type > Custom Chart**, ви можете налаштувати FusionCharts за допомогою властивості **Custom Fusion Chart**.

Appsmith інтегровано з [**FusionCharts**](https://www.fusioncharts.com) і придбало **ліцензію на повторне розповсюдження**. З цією ліцензією ви можете використовувати FusionCharts на **хмарі** та **локальній** платформі Appsmith. Використання ліцензії дозволено, якщо те, що ви створюєте на Appsmith, не використовується для конкуренції з FusionCharts.

Зауважте, що ліцензія **не** включає дозвіл на використання **Fusion Maps**. Якщо ви хочете використовувати цей продукт, вам може знадобитися окрема ліцензія.

### Відображення даних custom chart

У властивості **Custom Fusion Chart** вам потрібно вказати «type» для типу діаграми та «dataSource» для даних, щоб створити власну FusionChart. Нижче наведено приклад конфігурації властивості Custom Fusion Chart:

```json
{
  "type": "",
  "dataSource": {
    "chart": {},
    "data": []
  }
}
```

#### Type

Тип використовується для визначення типу діаграми, розпізнаного FusionCharts. FusionCharts пропонує широкий вибір варіантів діаграм із понад 100 варіантами на вибір. Щоб дізнатися більше про ці діаграми, перегляньте офіційну документацію [документації FusionCharts](https://www.fusioncharts.com/dev/chart-guide/list-of-charts/).

```json
//example
"type": "column2d"
```

Це створює двовимірну стовпчасту діаграму. Значення властивості `type` чутливе до регістру.

#### Datasource

Джерело даних визначає параметри налаштування та точки даних для створення діаграми. Він містить два атрибути: **chart** і **data**.

- **Chart**:

Атрибут `chart` — це об’єкт, який можна використовувати для налаштування загального вигляду діаграми. Він містить такі параметри, як `title`, `x-axis` chart   і  `y-axis labels`, `width`  та `height` діаграми тощо. Ось деякі найчастіше використовувані властивості об’єкта `chart`:

```json
//example
 "chart": {
      "caption": "Monthly Revenue for the year 2021",  //Sets the main title of the chart.
      "xAxisName": "Month",  // Sets the label for the x-axis.
      "yAxisName": "Revenue",  // Sets the label for the y-axis.
      "theme": "fusion"  //Sets the color scheme for the chart.
    },..
```

- **Data**: 

Атрибут «data» представляє дані у форматі масиву з парами «ключ-значення», наприклад  `[{“label”: “string value”, “value”: “string value”}]`. Тут ви вказуєте фактичні дані, які потрібно відобразити на діаграмі.

Ось приклад того, як встановити масив "data" у властивості "dataSource":

```json
 "data": [
      {
        "label": "Jan",
        "value": 42000
      },
      {
        "label": "Feb",
        "value": 810000
      },..
```

#### Приклади

Ось кілька прикладів налаштованих діаграм, які можна використовувати як довідник для створення власних налаштованих діаграм.

- 2D column 
- Pareto 3D
- Pie 3D
- Stacked Column 3D
- Dual axis

Припустімо, ви хочете створити спеціальну діаграму FusionChart для відображення щомісячних даних про доходи Harry's SuperMart. Для цього можна використовувати двовимірну стовпчасту діаграму.

Ви можете вставити конфігурацію безпосередньо або скористатися запитом для отримання необхідної конфігурації. Щоб побудувати двовимірну стовпчасту діаграму, ви можете скористатися наведеною нижче конфігурацією:

```json
{
  "type": "column2d",
  "dataSource": {
    "chart": {
      "caption": "Monthly Revenue for the year 2021",
      "xAxisName": "Month",
      "yAxisName": "Revenue",
      "theme": "fusion"
    },
    "data": [
      {
        "label": "Jan",
        "value": 42000
      },
      {
        "label": "Feb",
        "value": 810000
      },
      {
        "label": "Mar",
        "value": 72000
      },
      {
        "label": "Apr",
        "value": 55000
      },
      {
        "label": "May",
        "value": 91000
      }
    ]
  }
}
```

У попередньому фрагменті коду ви побачите, що ви побудували стовпчасту діаграму, щоб продемонструвати структуру щомісячного доходу за минулий рік, скажімо, за 2021 рік.

Якщо у вас є кілька дочірніх компаній, які працюють під тією самою назвою компанії, і ви хочете відобразити діаграму місячних доходів спеціально для Harry's SuperMart, ви можете використати властивість `subCaption`, щоб указати назву компанії.

```text
 “subCaption”: "Harry's SuperMart"
```

Щоб відформатувати значення доходу на діаграмі, ви можете вибрати ряд (`y-axis`), щоб відобразити  `$`  як префікс. Ви можете використовувати `numberPrefix` і додати знак долара ($).

```text
 “numberPrefix": "$"
```

У вас є місячний цільовий дохід, скажімо, 70 000 доларів США, і ви хочете нанести його на діаграму. Ви можете використовувати `trendlines`, щоб додати цю деталь до свого графіка.

```text
"trendlines": [
    {
      "line": [
        {
          "startValue": "700000",
          "valueOnRight": "1",
          "displayvalue": "Monthly Target"
        }
      ]
    }
  ]
```

`trendlines` це вертикальні або горизонтальні лінії, які допомагають користувачам зрозуміти виділену точку даних. Наприклад, місячна ціль.

## Властивості

Властивості дозволяють редагувати віджет, з’єднувати його з іншими віджетами та налаштовувати дії користувача.

### Властивості віджетів

Ці властивості присутні на панелі властивостей віджета. У наведеній нижче таблиці перераховано всі властивості віджетів.

| Property                     | Data type | Description                                                  |
| ---------------------------- | --------- | ------------------------------------------------------------ |
| **Series Title**             | String    | Sets the title of the current Chart series.                  |
| **Series Color**             | String    | Sets the color of the current Chart series.                  |
| **Series Data**              | Array     | Sets the data of the current Chart series.                   |
| **Title**                    | String    | Sets the text that appears at the top of the chart as a title. |
| **Chart Type**               | String    | Sets the type of Chart used to display data. Choose one of the charts from  the available options, or create a custom chart (available from  FusionCharts). |
| **Visible**                  | Boolean   | Controls widget's visibility on the page. When turned off: The widget won't be  visible when the app is published. It appears translucent when in Edit  mode. |
| **Animate Loading**          | Boolean   | When turned off, the widget loads without any skeletal animation. You can  use a toggle switch to turn it on/off. You can also turn it off/on using javascript by enabling the JS label next to it. |
| **Allow Scroll**             | Boolean   | Allows you to enable a scroll bar to scroll the contents of the chart. |
| **x-axis Label**             | String    | Sets the text which appears as a label for the x-axis.       |
| **y-axis Label**             | String    | Sets the text which appears as a label for the y-axis.       |
| **x-axis Label Orientation** | String    | Sets the size/rotation behavior for the x-axis label text. Chose from Auto, Slant, Rotate, or Stagger. |
| **Adaptive Axis**            | Boolean   | Determines the scaling behavior of the y-axis. OFF: The y-axis begins at zero and  spans to an upper limit based on the data points; ON: The y-axis  starting and ending values are both determined based upon the data  points. |

### Reference properties

These properties can be referenced in other widgets, queries, or JS functions using the dot operator. For instance, to get the xAxisName, you can use `Chart1.xAxisName`.

| Property              | Data type | Description                                                  |
| --------------------- | --------- | ------------------------------------------------------------ |
| **isVisible**         | Boolean   | This property indicates whether the widget is visible or not. |
| **selectedDataPoint** | Object    | Contains an object which represents the data point that the user has most recently clicked `(object containing: x, y, seriesTitle)._ Default _undefined.` |
| **xAxisName**         | String    | Stores the text of the x-axis Label setting of the chart.    |
| **yAxisName**         | String    | Stores the text of the y-axis Label setting of the chart.    |
| **chartData**         | Object    | Stores all the data needed to display the chart.             |

### Style properties

| Property          | Data type | Description                                                  |
| ----------------- | --------- | ------------------------------------------------------------ |
| **Border Radius** | String    | Rounds the corners of the widget's outer edge. With JS enabled, this accepts valid CSS [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) values. |
| **Box Shadow**    | String    | Casts a drop shadow from the frame of the widget. With JS enabled, this accepts valid CSS [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values. |

## Events

These are functions that are called when event listeners are triggered in the widget. [Use actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to execute tasks based on user events.

| Event                | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **onDataPointClick** | Specifies an action to be performed when a user clicks on a data point in the chart. |

#### Line chart

Лінійна діаграма представляє дані шляхом з’єднання окремих точок даних у лінію. Він демонструє зв’язок між двома наборами значень і те, де один залежить від іншого. Він показує, як значення змінюється з часом або як різні значення змінюються з часом відносно одне одного.

Наприклад, ви працюєте над відстеженням дефектів у проекті та хочете передати дані, щоб візуалізувати виявлені, закриті та активні помилки, над якими працює команда для вашого спринту. Ви можете згрупувати виявлені дефекти в цих категоріях і використати лінійну діаграму, щоб показати помилки, які виникли протягом 5-денного вікна.

Давайте використаємо лінійну діаграму, щоб візуалізувати дані.

Як ви бачите у відео, ви можете використовувати заголовок властивості `Chart Series`, щоб надати дані та деталі, пов’язані з ідентифікацією точок даних.

- `Series Title` - назва серії. У попередньому прикладі це ***Total Bugs***.
- `Series Data` - зберігає точки даних для загальної кількості помилок.
- `X-axis Label` - для визначення заголовка для осі Х.
- `Y-axis Label` - щоб визначити заголовок для осі Y.

Щоб отримати порівняльне дослідження, ви можете додати дані для кожної категорії: виявлені помилки, активні помилки та закриті помилки. Щоб додати більше серій, натисніть кнопку `+Add Series` і вставте дані в `Series Data`, як показано у відео нижче.