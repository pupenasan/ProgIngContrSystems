# Time Series

https://www.mongodb.com/docs/manual/core/timeseries-collections/

Дані часових рядів – це послідовність точок даних, уявлення про які отримано шляхом аналізу змін із часом. Дані часових рядів зазвичай складаються з таких компонентів:

- **Час**, коли була записана точка даних.
- **Метадані** (іноді їх називають джерелом), які є міткою або тегом, які унікально ідентифікують серію та рідко змінюються.
- **Вимірювання** (іноді їх називають показниками або значеннями), які є точками даних, що відстежуються з кроком у часі. Зазвичай це пари ключ-значення, які змінюються з часом.

У цій таблиці наведено приклади даних часових рядів:

| **Приклад**       | **Вимірювання**      | **Метадані**                        |
| ----------------- | -------------------- | ----------------------------------- |
| Фондові дані      | Ціна акцій           | Біржовий тикер, біржа               |
| Дані про погоду   | Температура          | Ідентифікатор датчика, розташування |
| Відвідувачі сайту | Кількість переглядів | URL                                 |

Для ефективного зберігання даних часових рядів MongoDB надає колекції часових рядів.

## Time Series Collections

*Нове у версії 5.0*.

Time Series Collections (Колекції часових рядів) ефективно зберігають дані часових рядів. У колекціях часових рядів записи організовані таким чином, що дані з одного джерела зберігаються поряд з іншими точками даних із подібного моменту часу.

### Переваги

Порівняно зі звичайними колекціями, зберігання даних часових рядів у колекціях часових рядів покращує ефективність запитів і зменшує використання диска для даних часових рядів і [вторинних індексів.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index)

Колекції часових рядів використовують базовий формат зберігання стовпців і зберігають дані в часовому порядку з автоматично створеним [кластерним індексом](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections). Колонковий формат зберігання забезпечує такі переваги:

- Знижена складність роботи з даними часових рядів
- Покращена ефективність запитів

- Зменшене використання диска
- Зменшено введення/виведення для операцій читання
- Збільшене використання кешу WiredTiger

### Поведінка

Колекції часових рядів поводяться як звичайні колекції. Ви можете вставляти та запитувати дані, як зазвичай. MongoDB розглядає колекції часових рядів як доступні для запису нематеріалізовані [перегляди](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page), що підтримуються внутрішньою колекцією. Коли ви вставляєте дані, внутрішня колекція автоматично організовує дані часових рядів у оптимізований формат зберігання.

Коли ви запитуєте колекції часових рядів, ви працюєте з одним документом на вимірювання. Запити до колекцій часових рядів використовують переваги оптимізованого формату внутрішньої пам’яті та швидше повертають результати.

Коли ви створюєте колекцію часових рядів, MongoDB автоматично створює внутрішній [кластерний індекс](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections) для часу поле. Внутрішній індекс забезпечує кілька переваг продуктивності, включаючи покращену ефективність запитів і зменшення використання диска. Щоб дізнатися більше про переваги продуктивності кластерних індексів, перегляньте [Кластеризовані колекції.](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections) Внутрішній індекс колекції часових рядів не відображається [`listIndexes`.](https://www.mongodb.com/docs/manual/reference/command/listIndexes/#mongodb-dbcommand-dbcmd.listIndexes)

Щоб покращити продуктивність запитів, ви можете вручну [додати вторинні індекси](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-secondary-index/#std-label-timeseries-add-secondary-index ) у полях вимірювання або будь-якому полі вашої колекції часових рядів.

# Створення та запит колекції часових рядів

 [Створення та запит колекції часових рядів.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/#std-label-timeseries-create -запит-процедури)

На цій сторінці показано, як створити та запитати колекцію часових рядів із прикладами коду.

## Створіть колекцію часових рядів

Перш ніж ви зможете вставити дані в колекцію часових рядів, ви повинні явно створити колекцію за допомогою [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection)  або команда [`create`](https://www.mongodb.com/docs/manual/reference/command/create/#mongodb-dbcommand-dbcmd.create) :

```js
db.createCollection(
    "weather",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "metadata",
          granularity: "hours"
       }
    }
)
```

Ви можете створювати колекції часових рядів лише в системі з [featureCompatibilityVersion](https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#std-label-view-fcv) 5.0 або вищою.

Поля обєкту `timeseries` 

Створюючи колекцію часових рядів, укажіть такі параметри:

| Field                    | Type   | Description                                                  |
| ------------------------ | ------ | ------------------------------------------------------------ |
| `timeseries.timeField`   | string | Вимагається. Ім’я поля, яке містить дату в кожному документі часового ряду. Документи в колекції часових рядів повинні мати дійсну дату BSON як значення для `timeField`. |
| `timeseries.metaField`   | string | Опційно. Назва поля, яке містить метадані в кожному документі часового ряду. Метадані у вказаному полі мають бути даними, які використовуються для позначення унікальної серії документів. Метадані мають рідко, якщо взагалі змінюватися. Ім’я вказаного поля не може бути `_id` або таким самим, як `timeseries.timeField`. Поле може бути будь-якого типу. |
| `timeseries.granularity` | string | Опційно. Можливі значення:`"seconds"``"minutes"``"hours"` За замовчуванням MongoDB встановлює `granularity` на `"seconds"` для високочастотного прийому даних. Установіть параметр `granularity` вручну, щоб покращити продуктивність шляхом оптимізації внутрішнього зберігання даних у колекції часових рядів. Щоб вибрати значення для «деталізації», виберіть найбільш близький до інтервалу часу між послідовними вхідними вимірюваннями. <br />Якщо ви вказуєте `timeseries.metaField`, враховуйте інтервал часу між послідовними вхідними вимірюваннями, які мають однакове унікальне значення для поля `metaField` . Вимірювання часто мають однакове унікальне значення для поля `metaField`, якщо вони надходять з того самого джерела. <br />Якщо ви не вказуєте `timeseries.metaField`, враховуйте проміжок часу між усіма вимірюваннями, які вставлено в колекцію. |
| `expireAfterSeconds`     | number | Додатково. Увімкніть автоматичне видалення документів у [колекції часових рядів](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-time-series-collection), вказавши кількість секунд після термін дії яких документів закінчується. MongoDB автоматично видаляє прострочені документи. Див. [Налаштування автоматичного видалення колекцій часових рядів (TTL)](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-automatic-removal/#std-label-manual-timeseries-automatic- видалення) для отримання додаткової інформації. |

Інші параметри, дозволені з параметром `timeseries`:

- `storageEngine`
- `indexOptionDefaults`
- `collation`
- `writeConcern`
- `comment`

## Вставте вимірювання в колекцію часових рядів

Кожен документ, який ви вставляєте, має містити одне вимірювання. Щоб вставити кілька документів одночасно, виконайте таку команду:

```js
db.weather.insertMany( [
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T04:00:00.000Z"),
      "temp": 11
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T08:00:00.000Z"),
      "temp": 11
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T12:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T16:00:00.000Z"),
      "temp": 16
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-18T20:00:00.000Z"),
      "temp": 15
   }, {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T00:00:00.000Z"),
      "temp": 13
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T04:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T08:00:00.000Z"),
      "temp": 11
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T12:00:00.000Z"),
      "temp": 12
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T16:00:00.000Z"),
      "temp": 17
   },
   {
      "metadata": { "sensorId": 5578, "type": "temperature" },
      "timestamp": ISODate("2021-05-19T20:00:00.000Z"),
      "temp": 12
   }
] )
```

Щоб вставити один документ, скористайтеся [`db.collection.insertOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) .

Щоб дізнатися, як оптимізувати вставки для великих операцій, див [Optimize Inserts.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-best-practices/#std-label-tsc-best-practice-optimize-inserts)

## Запит колекції часових рядів

Ви можете запитувати колекцію часових рядів так само, як і стандартну колекцію MongoDB.

Щоб повернути один документ із колекції часових рядів, виконайте:

```js
db.weather.findOne({
   "timestamp": ISODate("2021-05-18T00:00:00.000Z")
})
```

Приклад результату:

```js
{
   timestamp: ISODate("2021-05-18T00:00:00.000Z"),
   metadata: { sensorId: 5578, type: 'temperature' },
   temp: 12,
   _id: ObjectId("62f11bbf1e52f124b84479ad")
}
```

## Виконайте агрегації для колекції часових рядів

Для додаткових функцій запиту використовуйте [конвеєр агрегації](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline), наприклад:

```js
db.weather.aggregate( [
   {
      $project: {
         date: {
            $dateToParts: { date: "$timestamp" }
         },
         temp: 1
      }
   },
   {
      $group: {
         _id: {
            date: {
               year: "$date.year",
               month: "$date.month",
               day: "$date.day"
            }
         },
         avgTmp: { $avg: "$temp" }
      }
   }
] )
```

Приклад конвеєра агрегації групує всі документи за датою вимірювання, а потім повертає середнє значення всіх вимірювань температури за цей день:

```js
 {
  "_id" : {
    "date" : {
      "year" : 2021,
      "month" : 5,
      "day" : 18
    }
  },
  "avgTmp" : 12.714285714285714
}
{
  "_id" : {
    "date" : {
      "year" : 2021,
      "month" : 5,
      "day" : 19
    }
  },
  "avgTmp" : 13
}
```

# Перелік колекцій часових рядів у базі даних

Ви можете вивести список колекцій у базу даних і відфільтрувати результати за різними властивостями, включаючи тип колекції. Ви можете використовувати цю функцію, щоб отримати список усіх колекцій часових рядів у базі даних.

Щоб отримати список усіх колекцій часових рядів у базі даних, скористайтеся командою [`listCollections`](https://www.mongodb.com/docs/manual/reference/command/listCollections/#mongodb-dbcommand-dbcmd.listCollections) із фільтр для `{ type: "timeseries" }`:

```js
db.runCommand( {
   listCollections: 1,
   filter: { type: "timeseries" }
} )
```

Для колекцій часових рядів вихідні дані включають:

- `type: 'timeseries'`
- `options: { timeseries: { ... } }`

Наприклад:

```js
{
  cursor: {
    id: Long("0"),
    ns: 'test.$cmd.listCollections',
    firstBatch: [
      {
        name: 'weather',
        type: 'timeseries',
        options: {
          timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'hours',
            bucketMaxSpanSeconds: 2592000
          }
        },
        info: { readOnly: false }
      }
    ]
  },
  ok: 1
}
```

# Налаштувати автоматичне видалення колекцій часових рядів (TTL)

Коли ви створюєте [time series collection](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection), ви можете налаштувати автоматичне видалення документів старше вказаної кількості секунд за допомогою параметра `expireAfterSeconds`:

```js
db.createCollection(
    "weather24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "metadata",
          granularity: "hours"
       },
       expireAfterSeconds: 86400
    }
)
```

Граничним значенням терміну дії є значення поля `timeField` плюс указана кількість секунд. Розгляньте наступний документ у колекції `weather24h`:

```js
{
   "metadata": {"sensorId": 5578, "type": "temperature"},
   "timestamp": ISODate("2021-05-18T10:00:00.000Z"),
   "temp": 12
}
```

Термін дії документа закінчується в базі даних 2021-05-19T10:00:00.000Z. Після закінчення терміну дії всіх документів у сегменті фонове завдання, яке видаляє прострочені контейнери, видаляє сегмент під час наступного запуску. Див. [Timing of Delete Operations](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-automatic-removal/#std-label-timeseries-collection-delete-operations-timing) для отримання додаткової інформації .

## Увімкнути автоматичне видалення для колекції

Щоб увімкнути автоматичне видалення документів для наявної [колекції часових рядів](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection), видайте таке Команда [`collMod`](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod):

```js
db.runCommand({
   collMod: "weather24h",
   expireAfterSeconds: 604801
})
```

## Зміна параметру `expireAfterSeconds` 

Щоб змінити значення параметра `expireAfterSeconds`, виконайте таку команду [`collMod`](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod):

```js
db.runCommand({
   collMod: "weather24h",
   expireAfterSeconds: 604801
})
```

## Отримати поточне значення `expireAfterSeconds`

Щоб отримати поточне значення `expireAfterSeconds`, скористайтеся командою [`listCollections`](https://www.mongodb.com/docs/manual/reference/command/listCollections/#mongodb-dbcommand-dbcmd.listCollections) :

```
db.runCommand( { listCollections: 1 } )
```

The result document contains a document for the time series collection which contains the `options.expireAfterSeconds` field.

```
{
    cursor: {
       id: <number>,
       ns: 'test.$cmd.listCollections',
       firstBatch: [
         {
            name: <string>,
            type: 'timeseries',
            options: {
               expireAfterSeconds: <number>,
               timeseries: { ... }
            },
            ...
         },
         ...
       ]
    }
 }
```

## Вимкнути автоматичне видалення

Щоб вимкнути автоматичне видалення, скористайтеся командою  [`collMod`](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod), щоб встановити для `expireAfterSeconds` значення ` вимкнено`:

```js
db.runCommand({
    collMod: "weather24h",
    expireAfterSeconds: "off"
})
```

## Час виконання операцій видалення

MongoDB не гарантує, що прострочені дані будуть видалені одразу після закінчення терміну дії. Після закінчення терміну дії всіх документів у сегменті (bucket) фонове завдання, яке видаляє прострочені контейнери, видаляє сегмент (bucket) під час наступного запуску. Максимальний проміжок часу, який може охоплювати один сегмент, керується `granularity` колекції часових рядів:

| `granularity`         | Охоплений проміжок часу |
| --------------------- | ----------------------- |
| `"seconds"` (default) | one hour                |
| `"minutes"`           | 24 hours                |
| `"hours"`             | 30 days                 |

Фонове завдання, яке видаляє прострочені сегменти, виконується кожні 60 секунд. Таким чином, документи можуть залишатися в колекції протягом періоду між закінченням терміну дії документа, закінченням терміну дії всіх інших документів у сегменті та виконанням фонового завдання.

Оскільки тривалість операції видалення залежить від робочого навантаження вашого екземпляра mongodb, застарілі дані можуть існувати протягом деякого часу, що перевищує 60-секундний період між запусками фонового завдання.

# Перевірка та зміна granularity (деталізації) для даних часових рядів

Коли ви створюєте [колекцію часових рядів](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection), установіть значення деталізації, яке найближча відповідність часовому проміжку між послідовними вхідними вимірюваннями, які мають однакове унікальне значення для поля `metaField`:

```js
db.createCollection(
    "weather24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "metadata",
          granularity: "minutes"
       },
       expireAfterSeconds: 86400
    }
)
```

Налаштування параметра `granularity` точно покращує продуктивність шляхом оптимізації внутрішнього зберігання даних у колекції часових рядів. Щоб точно встановити параметр, виберіть значення `granularity` (деталізації), яке є найближчим до швидкості прийому для унікального джерела даних, як зазначено значенням для поля `metaField`.

Наприклад, якщо ваші дані `metaField` ідентифікують датчики погоди, і ви отримуєте дані з кожного окремого датчика кожні 5 хвилин, вам слід вибрати `"minutes"`. Навіть якщо у вас є тисячі датчиків і дані, що надходять від різних датчиків, відрізняються лише за секунди, `granularity`  все одно має ґрунтуватися на швидкості прийому для одного датчика, який унікально ідентифікується його метаданими.

У наведеній нижче таблиці ви можете побачити максимальний проміжок часу даних, які зберігаються разом для кожного значення `granularity`.

| `granularity`         | Охоплений проміжок часу |
| --------------------- | ----------------------- |
| `"seconds"` (default) | one hour                |
| `"minutes"`           | 24 hours                |
| `"hours"`             | 30 days                 |

Див. також [Timing of Automatic Removal](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-automatic-removal/#std-label-timeseries-collection-delete-operations-timing)

Щоб отримати поточне значення `granularity`, скористайтеся командою [`listCollections`](https://www.mongodb.com/docs/manual/reference/command/listCollections/#mongodb-dbcommand-dbcmd.listCollections):

```js
db.runCommand( { listCollections: 1 } )
```

Документ результату містить документ для колекції часових рядів, який містить поле `options.timeseries.granularity`.

```js
{
    cursor: {
       id: <number>,
       ns: 'test.$cmd.listCollections',
       firstBatch: [
         {
            name: <string>,
            type: 'timeseries',
            options: {
               expireAfterSeconds: <number>,
               timeseries: {
                  timeField: <string>,
                  metaField: <string>,
                  granularity: <string>,
                  bucketMaxSpanSeconds: <number>
               }
            },
            ...
         },
         ...
       ]
    }
 }
```

Щоб змінити значення параметра `granularity`, виконайте таку команду [`collMod`](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod):

```
db.runCommand({
   collMod: "weather24h",
   timeseries: { granularity: "hours" }
})
```

Після встановлення `granularity` її можна збільшити лише на один рівень за раз. Від `"seconds"` до `"minutes"` або від `"minutes"` до `"hours"`. Інші зміни не допускаються. Якщо вам потрібно змінити параметр `granularity` з `"seconds"` на `"hours"`, спочатку збільште параметр `granularity` до `"minutes"`, а потім до `"hours"`. Ви не можете змінити `granularity` сегментованої колекції часових рядів.

# Додавання вторинних індексів до колекцій часових рядів

Щоб покращити ефективність запитів для [колекцій часових рядів](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-time-series-collection), додайте один або кілька [вторинних індексів]( https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index) для підтримки типових шаблонів запитів часових рядів. Зокрема, ми рекомендуємо вам створити один або кілька [складених індексів](https://www.mongodb.com/docs/manual/core/index-compound/#std-label-index-type-compound) у зазначених полях як `timeField` і `metaField`. Якщо значення поля для поля `metaField` є документом, ви можете створити вторинні індекси для полів у цьому документі.

Підтримуються не всі типи індексів. Перелік непідтримуваних типів індексів див. у розділі [Limitations for Secondary Indexes on Time Series Collections.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-limitations/#std-label-timeseries-limitations-secondary-indexes)

Наприклад, ця команда створює [складений індекс](https://www.mongodb.com/docs/manual/core/index-compound/#std-label-index-type-compound) на `metadata.sensorId` і поля `timestamp`:

```js
db.weather24h.createIndex( { "metadata.sensorId": 1, "timestamp": 1 } )
```

Див також [`db.collection.createIndex()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/#mongodb-method-db.collection.createIndex)

## Використовуйте вторинних індексів для покращення продуктивності сортування

Колекції часових рядів можуть використовувати індекси для покращення продуктивності сортування на `timeField` і `metaField`.

Наприклад, наступна колекція `sensorData` містить вимірювання датчиків погоди:

```js
db.sensorData.insertMany( [ {
     "metadata": {
         "sensorId": 5578,
         "location": {
             type: "Point",
             coordinates: [-77.40711, 39.03335]
         }
     },
     "timestamp": ISODate("2022-01-15T00:00:00.000Z"),
     "currentConditions": {
         "windDirecton": 127.0,
         "tempF": 71.0,
         "windSpeed": 2.0,
         "cloudCover": null,
         "precip": 0.1,
         "humidity": 94.0,
     }
   },
   {
     "metadata": {
         "sensorId": 5578,
         "location": {
             type: "Point",
             coordinates: [-77.40711, 39.03335]
         }
     },
     "timestamp": ISODate("2022-01-15T00:01:00.000Z"),
     "currentConditions": {
         "windDirecton": 128.0,
         "tempF": 69.8,
         "windSpeed": 2.2,
         "cloudCover": null,
         "precip": 0.1,
         "humidity": 94.3,
     }
   },
   {
     "metadata": {
         "sensorId": 5579,
         "location": {
             type: "Point",
             coordinates: [-80.19773, 25.77481]
         }
     },
     "timestamp": ISODate("2022-01-15T00:01:00.000Z"),
     "currentConditions": {
         "windDirecton": 115.0,
         "tempF": 88.0,
         "windSpeed": 1.0,
         "cloudCover": null,
         "precip": 0.0,
         "humidity": 99.0,
     }
    }
  ]
)
```

Колекції часових рядів автоматично створюють кластерний індекс. Кластерний індекс може автоматично використовуватися планувальником запитів для покращення продуктивності сортування в деяких ситуаціях. Додаткову інформацію про кластеризовані індекси див. [clustered index.](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.clusteredIndex)

Наступна операція сортування в полі позначки часу використовує кластеризований індекс для підвищення продуктивності:

```js
db.sensorData.find().sort( { "timestamp": 1 } )
```

Щоб підтвердити, що операція сортування використовувала кластеризований індекс, запустіть операцію знову з параметром `.explain( "executionStats" )`:

```js
db.sensorData.find().sort( { "timestamp": 1 } ).explain( "executionStats" )
```

`winningPlan.queryPlan.inputStage.stage` — це `COLLSCAN`, а етап `_internalBoundedSort` присутній у вихідних даних плану пояснення. Поле `interalBoundedSort` вказує, що використовувався кластерний індекс. Щоб отримати додаткові відомості про вихід плану пояснення, перегляньте  [explain results.](https://www.mongodb.com/docs/manual/reference/explain-results/#std-label-explain-results)

Вторинні індекси в колекціях часових рядів можуть покращити продуктивність операцій сортування та збільшити кількість сценаріїв, у яких можна використовувати індекси.

Операції сортування в колекціях часових рядів можуть використовувати вторинні індекси на `timeField`. За певних умов операції сортування також можуть використовувати складені вторинні індекси на `metaField` і `timeField`.

Етапи конвеєра агрегації (Aggregation Pipeline Stages) [`$match`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) і  [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) визначають, які індекси може використовувати колекція часових рядів. У наведеному нижче списку описано сценарії, коли можна використовувати індекс:

- Sort on `{ <timeField:> ±1 }` uses the clustered index
- Sort on `{ <timeField>: ±1 }` uses a secondary index on `<timeField>`
- Sort on `{ <metaField>: ±1, timeField: ±1 }` uses a secondary index on `{ <metaField>: ±1, timeField: ±1 }`
- Sort on `{ <timeField>: ±1 }` uses a secondary index on `{ metaField: ±1, timeField: ±1 }` when there is a point predicate on `<metaField>`

Створіть вторинний індекс у полі `timestamp`:

```js
db.sensorData.createIndex( { "timestamp": 1 } )
```

Наступна операція сортування в полі `timestamp` використовує вторинний індекс для підвищення продуктивності:

```js
db.sensorData.aggregate( [
  { $match: { "timestamp" : { $gte: ISODate("2022-01-15T00:00:00.000Z") } } },
  { $sort: { "timestamp": 1 } }
] )
```

Щоб підтвердити, що операція сортування використовувала вторинний індекс, запустіть операцію знову з параметром `.explain( "executionStats" )`:

```js
db.sensorData.explain( "executionStats" ).aggregate( [
  { $match: { "timestamp": { $gte: ISODate("2022-01-15T00:00:00.000Z") } } },
  { $sort: { "timestamp": 1 } }
] )
```

### "Last Point" Queries on Time Series Collections

Запит «останньої точки» отримує останні вимірювання для кожного унікального значення метаданих. Наприклад, ви можете отримати останні показники температури з усіх датчиків. Підвищте продуктивність запитів останньої точки, створивши будь-який із наведених нижче індексів:

```js
{ "metadata.sensorId": 1,  "timestamp": 1 }
{ "metadata.sensorId": 1,  "timestamp": -1 }
{ "metadata.sensorId": -1, "timestamp": 1 }
{ "metadata.sensorId": -1, "timestamp": -1 }
```

Запити останньої точки є найефективнішими, коли використовують [оптимізацію DISTINCT_SCAN](https://www.mongodb.com/docs/manual/reference/explain-results/#std-label-explain-results). Ця оптимізація доступна лише тоді, коли індекс у `timeField` спадає.

Наступна команда створює складений вторинний індекс для `metaField` (за зростанням) і `timeField` (за спаданням):

```js
db.sensorData.createIndex( { "metadata.sensorId": 1,  "timestamp": -1 } )
```

У наведеному нижче прикладі запиту останньої точки використовується спадаючий складений вторинний індекс `timeField`, створений вище:

```js
db.sensorData.aggregate( [
   {
      $sort: { "metadata.sensorId": 1, "timestamp": -1 }
   },
   {
      $group: {
         _id: "$metadata.sensorId",
         ts: { $first: "$timestamp" },
         temperatureF: { $first: "$currentConditions.tempF" }
      }
   }
] )
```

Щоб підтвердити, що останній запит точки використовував вторинний індекс, запустіть операцію знову за допомогою `.explain( "executionStats" )`:

```js
db.getCollection( 'sensorData' ).explain( "executionStats" ).aggregate( [
   {
      $sort: { "metadata.sensorId": 1, "timestamp": -1 }
   },
   {
      $group: {
         _id: "$metadata.sensorId",
         ts: { $first: "$timestamp" },
         temperatureF: { $first: "$currentConditions.tempF" }
      }
   }
] )
```

`winningPlan.queryPlan.inputStage.stage` має значення `DISTINCT_SCAN`, що вказує на використання індексу. Додаткову інформацію про вихід плану пояснення див  [Explain Results.](https://www.mongodb.com/docs/manual/reference/explain-results/#std-label-explain-results)

### Укажіть підказки індексу для колекцій часових рядів

Підказки індексів змушують MongoDB використовувати певний індекс для запиту. Деякі операції над колекціями часових рядів можуть використовувати переваги індексу, лише якщо цей індекс указано в підказці.

Наприклад, наступний запит змушує MongoDB використовувати індекс `timestamp_1_metadata.sensorId_1`:

```js
db.sensorData.find( { "metadata.sensorId": 5578 } ).hint( "timestamp_1_metadata.sensorId_1" )
```

On a time series collection, you can specify hints using either the index name or the index key pattern. To get the names of the indexes on a collection, use the [`db.collection.getIndexes()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.getIndexes/#mongodb-method-db.collection.getIndexes) method.

## Time Series Secondary Indexes in MongoDB 6.0

Starting in MongoDB 6.0, you can:

- Add a [compound index](https://www.mongodb.com/docs/manual/core/index-compound/) on the `timeField`, `metaField`, or measurement fields.
- Use the [`$or`](https://www.mongodb.com/docs/manual/reference/operator/query/or/#mongodb-query-op.-or), [`$in`](https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in), and [`$geoWithin`](https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/#mongodb-query-op.-geoWithin) operators with [partial indexes](https://www.mongodb.com/docs/manual/core/index-partial/) on a time series collection.
- Add [partial](https://www.mongodb.com/docs/manual/core/index-partial/) on the `metaField`.
- Add a [secondary index](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index) to any field or subfield.
- Use the `metaField` with [2dsphere](https://www.mongodb.com/docs/manual/core/2dsphere/) indexes.

If there are [secondary indexes](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index) on [time series collections](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection) and you need to downgrade the Feature Compatibility Version (FCV), you must first drop any secondary indexes that are incompatible with the downgraded FCV. See [`setFeatureCompatibilityVersion`.](https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#mongodb-dbcommand-dbcmd.setFeatureCompatibilityVersion)

# Migrate Data into a Time Series Collection

To migrate data from an existing collection into a [time series collection:](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection)

1. [Create a New Time Series Collection](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-migrate-data-into-timeseries-collection/#std-label-migrate-timeseries-new-collection)
2. [Transform Data (Optional)](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-migrate-data-into-timeseries-collection/#std-label-migrate-timeseries-transform)
3. [Migrate Data into a Time Series Collection](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-migrate-data-into-timeseries-collection/#std-label-migrate-timeseries-migrate-data)

## Create a New Time Series Collection

To create a new [time series collection](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection), issue the following command in the [`mongosh`:](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

```js
db.createCollection(
    "weathernew", {
      timeseries: {
         timeField: "ts",
         metaField: "metaData",
         granularity: "hours"
       }
     }
)
```

For more information on the preceeding command, see [Create a Time Series Collection.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/#std-label-manual-timeseries-collection-create)

## Transform Data (Optional)

Time series collections support [secondary indexes](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-secondary-index/#std-label-timeseries-add-secondary-index) on the field specified as the `metaField`. If the data model of your time series data does not have a designated field for your metadata, you can transform your data to create one. To transform the data in your existing collection, use [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) or [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) to create a temporary collection with your time series data.

Consider a collection with weather data of the following format:

```js
 {
    "_id" : ObjectId("5553a998e4b02cf7151190b8"),
    "st" : "x+47600-047900",
    "ts" : ISODate("1984-03-05T13:00:00Z"),
    "position" : {
      "type" : "Point",
      "coordinates" : [ -47.9, 47.6 ]
    },
    "elevation" : 9999,
    "callLetters" : "VCSZ",
    "qualityControlProcess" : "V020",
    "dataSource" : "4",
    "type" : "FM-13",
    "airTemperature" : { "value" : -3.1, "quality" : "1" },
    "dewPoint" : { "value" : 999.9, "quality" : "9" },
    "pressure" : { "value" : 1015.3, "quality" : "1" },
    "wind" : {
      "direction" : { "angle" : 999, "quality" : "9" },
      "type" : "9",
      "speed" : { "rate" : 999.9, "quality" : "9" }
    },
    "visibility" : {
      "distance" : { "value" : 999999, "quality" : "9" },
      "variability" : { "value" : "N", "quality" : "9" }
    },
    "skyCondition" : {
      "ceilingHeight" : { "value" : 99999, "quality" : "9", "determination" : "9" },
      "cavok" : "N"
    },
    "sections" : [ "AG1" ],
    "precipitationEstimatedObservation" : { "discrepancy" : "2", "estimatedWaterDepth" : 999 }
}
```

To transform this data, we issue the following command:

```js
db.weather_data.aggregate([
  {
     $addFields: {
       metaData: {
         "st": "$st",
         "position": "$position",
         "elevation": "$elevation",
         "callLetters": "$callLetters",
         "qualityControlProcess": "$qualityControlProcess",
         "type": "$type"
       }
     },
  }, {
     $project: {
        _id: 1,
        ts: 1,
        metaData: 1,
        dataSource: 1,
        airTemperature: 1,
        dewPoint: 1,
        pressure: 1,
        wind: 1,
        visibility: 1,
        skyCondition: 1,
        sections: 1,
        precipitationEstimatedObservation: 1
     }
  }, {
     $out: "temporarytimeseries"
  }
])
```

After you run this command, you have an intermediary `temporarytimeseries` collection:

```js
db.temporarytimeseries.findOne()
{
   "_id" : ObjectId("5553a998e4b02cf7151190b8"),
   "ts" : ISODate("1984-03-05T13:00:00Z"),
   "dataSource" : "4",
   "airTemperature" : { "value" : -3.1, "quality" : "1" },
   "dewPoint" : { "value" : 999.9, "quality" : "9" },
   "pressure" : { "value" : 1015.3, "quality" : "1" },
   "wind" : {
     "direction" : { "angle" : 999, "quality" : "9" },
     "type" : "9",
     "speed" : { "rate" : 999.9, "quality" : "9" }
   },
   "visibility" : {
     "distance" : { "value" : 999999, "quality" : "9" },
     "variability" : { "value" : "N", "quality" : "9" }
   },
   "skyCondition" : {
     "ceilingHeight" : { "value" : 99999, "quality" : "9", "determination" : "9" },
     "cavok" : "N"
   },
   "sections" : [ "AG1" ],
   "precipitationEstimatedObservation" : { "discrepancy" : "2", "estimatedWaterDepth" : 999 },
   "metaData" : {
     "st" : "x+47600-047900",
     "position" : {
       "type" : "Point",
       "coordinates" : [ -47.9, 47.6 ]
     },
     "elevation" : 9999,
     "callLetters" : "VCSZ",
     "qualityControlProcess" : "V020",
     "type" : "FM-13"
   }
}
```

## Migrate Data into a Time Series Collection

To migrate your data from an existing collection that is not of type `timeseries` into a [time series collection](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection), use [`mongodump`](https://www.mongodb.com/docs/database-tools/mongodump/#mongodb-binary-bin.mongodump) and [`mongorestore`.](https://www.mongodb.com/docs/database-tools/mongorestore/#mongodb-binary-bin.mongorestore)

When migrating or backfilling into a time series collection you should always insert the documents in order, from oldest to newest. In this case [`mongodump`](https://www.mongodb.com/docs/database-tools/mongodump/#mongodb-binary-bin.mongodump) exports documents in natural order and the `--maintainInsertionOrder` option for [`mongorestore`](https://www.mongodb.com/docs/database-tools/mongorestore/#mongodb-binary-bin.mongorestore) guarantees the same insertion order for documents.

For example, to export the `temporarytimeseries` collection, issue the following command:

```
mongodump
    --uri="mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/weather" \
    --collection=temporarytimeseries --out=timeseries
```

The command returns the following output:

```
2021-06-01T16:48:39.980+0200  writing weather.temporarytimeseries to timeseries/weather/temporarytimeseries.bson
2021-06-01T16:48:40.056+0200  done dumping weather.temporarytimeseries (10000 documents)
```

To import `timeseries/weather/temporarytimeseries.bson` into the new collection `weathernew`, issue the following command:

```
mongorestore
    --uri="mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/weather" \
    --collection=weathernew --noIndexRestore \
    --maintainInsertionOrder \
    timeseries/weather/temporarytimeseries.bson
```

The command returns the following output:

```
2021-06-01T16:50:56.639+0200  checking for collection data in timeseries/weather/temporarytimeseries.bson
2021-06-01T16:50:56.640+0200  restoring to existing collection weather.weathernew without dropping
2021-06-01T16:50:56.640+0200  reading metadata for weather.weathernew from timeseries/weather/temporarytimeseries.metadata.json
2021-06-01T16:50:56.640+0200  restoring weather.weathernew from timeseries/weather/temporarytimeseries.bson
2021-06-01T16:51:01.229+0200  no indexes to restore
2021-06-01T16:51:01.229+0200  finished restoring weather.weathernew (10000 documents, 0 failures)
2021-06-01T16:51:01.229+0200  10000 document(s) restored successfully. 0 document(s) failed to restore.
```

Ensure that you run the preceeding command with the [`--noIndexRestore`](https://www.mongodb.com/docs/database-tools/mongorestore/#std-option-mongorestore.--noIndexRestore) option. [`mongorestore`](https://www.mongodb.com/docs/database-tools/mongorestore/#mongodb-binary-bin.mongorestore) cannot create indexes on time series collections.

If your original collection had secondary indexes, manually recreate them now.

[Add Secondary Indexes to Time Series Collections](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-secondary-index/#std-label-timeseries-add-secondary-index)

# Build Materialized Views on Top of Time Series Data

Матеріалізовані перегляди даних часових рядів корисні для:

- архівування
- аналітики
- полегшення доступу до даних для команд, які не мають доступу до вихідних даних

Щоб створити [матеріалізований перегляд на вимогу](https://www.mongodb.com/docs/manual/core/materialized-views/), скористайтеся [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) етап конвеєра агрегації для перетворення та зберігання ваших даних:

```js
db.weather.aggregate([
  {
     $project: {
        date: {
           $dateToParts: { date: "$timestamp" }
        },
        temp: 1
     }
  },
  {
     $group: {
        _id: {
           date: {
              year: "$date.year",
              month: "$date.month",
              day: "$date.day"
           }
        },
        avgTmp: { $avg: "$temp" }
     }
  }, {
     $merge: { into: "dailytemperatureaverages", whenMatched: "replace" }
  }
])
```

Попередній конвеєр створить або оновить колекцію `dailytemperatureaverages` усіма середніми добовими температурами на основі колекції `weather`.

Неможливо нативно запланувати оновлення цих матеріалізованих представлень.

For more information on materialized views, see [On-Demand Materialized Views.](https://www.mongodb.com/docs/manual/core/materialized-views/)

# Розділення колекції часових рядів

*Нове у версії 5.1*.

Використовуйте цей підручник, щоб розділити нову або наявну колекцію часових рядів.

Перш ніж завершити цей посібник, перегляньте [sharding limitations](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-limitations/#std-label-time-series-limitations-sharding) для часових рядів колекції.

Ви не можете [reshard](https://www.mongodb.com/docs/manual/core/sharding-reshard-a-collection/#std-label-sharding-resharding) сегментовану колекцію часових рядів. Однак ви можете [refine its shard key.](https://www.mongodb.com/docs/manual/core/sharding-refine-a-shard-key/#std-label-shard-key-refine)

Щоб розділити колекцію часових рядів, потрібно [розгорнути сегментований кластер](https://www.mongodb.com/docs/manual/tutorial/deploy-shard-cluster/#std-label-sharding-procedure-setup), щоб розміщення бази даних, яка містить вашу колекцію часових рядів.

## Procedures

### Shard a New Time Series Collection

1

#### Connect to your sharded cluster.

Connect [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) to the [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) for your sharded cluster. Specify the `host` and `port` on which the `mongos` is running:

```
mongosh --host <hostname> --port <port>
```

2

#### Confirm that sharding is enabled on your database.

Run [`sh.status()`](https://www.mongodb.com/docs/manual/reference/method/sh.status/#mongodb-method-sh.status) to confirm that sharding is enabled on your database:

```
sh.status()
```

The command returns the sharding information:

```
--- Sharding Status ---
   sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
...
```

3

#### Create the collection.

Use the [`shardCollection()`](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection) method with the [timeseries](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#std-label-method-sharded-time-series-collection-options) option.

For example:

```
sh.shardCollection(
   "test.weather",
   { "metadata.sensorId": 1 },
   {
      timeseries: {
         timeField: "timestamp",
         metaField: "metadata",
         granularity: "hours"
      }
   }
)
```

In this example, [`sh.shardCollection()`:](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection)

- Shards a new time series collection named `weather` on the `test` database.
- Specifies the `metadata.sensorId` field as the [shard key.](https://www.mongodb.com/docs/manual/core/sharding-shard-key/#std-label-shard-key)
- Specifies a `granularity` of hours.

The following document contains the appropriate metadata for the collection:

```
db.weather.insertOne( {
   "metadata": { "sensorId": 5578, "type": "temperature" },
   "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
   "temp": 12
} )
```

### Shard an Existing Time Series Collection

1

#### Connect to your sharded cluster.

Connect [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) to the [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) for your sharded cluster. Specify the `host` and `port` on which the `mongos` is running:

```
mongosh --host <hostname> --port <port>
```

2

#### Confirm that sharding is enabled on your database.

Run [`sh.status()`](https://www.mongodb.com/docs/manual/reference/method/sh.status/#mongodb-method-sh.status) to confirm that sharding is enabled on your database:

```
sh.status()
```

The command returns the sharding information:

```
--- Sharding Status ---
   sharding version: {
      "_id" : 1,
      "minCompatibleVersion" : 5,
      "currentVersion" : 6,
...
```

3

#### Shard the collection.

Use the [`shardCollection()`](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection) method to shard the collection.

Consider a time series collection with the following properties:

```
db.createCollection(
   "deliverySensor",
   {
      timeseries: {
         timeField: "timestamp",
         metaField: "metadata",
         granularity: "minutes"
      }
   }
)
```

A sample document from the collection resembles:

```
db.deliverySensor.insertOne( {
   "metadata": { "location": "USA", "vehicle": "truck" },
   "timestamp": ISODate("2021-08-21T00:00:10.000Z"),
   "speed": 50
} )
```

To shard the collection, run the following command:

```
sh.shardCollection( "test.deliverySensor", { "metadata.location": 1 } )
```

In this example, [`sh.shardCollection()`:](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection)

- Shards an existing time series collection named `deliverySensor` on the `test` database.
- Specifies the `metadata.location` field as the [shard key](https://www.mongodb.com/docs/manual/core/sharding-shard-key/#std-label-shard-key). `location` is a sub-field of the collection's `metaField`.

When the collection you specify to [`sh.shardCollection()`](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection) is a time series collection, you do not need to specify the [timeseries](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#std-label-method-sharded-time-series-collection-options) option.

## Additional Information

- [Time Series Collections](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection)
- [`sh.shardCollection()`](https://www.mongodb.com/docs/manual/reference/method/sh.shardCollection/#mongodb-method-sh.shardCollection)
- [`shardCollection`](https://www.mongodb.com/docs/manual/reference/command/shardCollection/#mongodb-dbcommand-dbcmd.shardCollection)

# Найкращі методи збору часових рядів

На цій сторінці описано найкращі методи покращення продуктивності та використання даних для колекцій часових рядів.

## Оптимізація запису

Щоб оптимізувати продуктивність вставки для колекцій часових рядів, виконайте наведені нижче дії.

### Batch Documents by Metadata

При вставці кількох документів:

- Щоб уникнути зворотних переходів у мережу, використовуйте виклик одного [`insertMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#mongodb-method-db.collection.insertMany) на відміну від кількох [`insertOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) .
- Якщо можливо, замовте або створіть пакети (batches), щоб містити кілька вимірювань на серію (як визначено метаданими).

Наприклад, якщо у вас є два датчики, `sensor A` і `sensor B`, партія, що містить кілька вимірювань від одного датчика, несе вартість однієї вставки, а не однієї вставки на вимірювання.

Наступна операція вставляє шість документів, але потребує лише двох вставок (одна на партію), оскільки документи впорядковуються датчиком:

```js
db.temperatures.insertMany( [
   {
      "metadata": {
         "sensor": "sensorA"
      },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      temperature: 10
   },
   {
      "metadata": {
         "sensor": "sensorA"
      },
      "timestamp": ISODate("2021-05-19T00:00:00.000Z"),
      temperature: 12
   },
   {
      "metadata": {
         "sensor": "sensorA"
      },
      "timestamp": ISODate("2021-05-20T00:00:00.000Z"),
      temperature: 13
   },
   {
      "metadata": {
         "sensor": "sensorB"
      },
      "timestamp": ISODate("2021-05-18T00:00:00.000Z"),
      temperature: 20
   },
   {
      "metadata": {
         "sensor": "sensorB"
      },
      "timestamp": ISODate("2021-05-19T00:00:00.000Z"),
      temperature: 25
   },
   {
      "metadata": {
         "sensor": "sensorB"
      },
      "timestamp": ISODate("2021-05-20T00:00:00.000Z"),
      temperature: 26
   }
] )
```

### Use Consistent Field Order in Documents

Використання узгодженого порядку полів у ваших документах покращує продуктивність вставки.

Наприклад, вставлення цих документів забезпечує оптимальну продуктивність вставки:

```js
{
   _id: ObjectId("6250a0ef02a1877734a9df57"),
   timestamp: 2020-01-23T00:00:00.441Z,
   name: 'sensor1',
   range: 1
},
{
   _id: ObjectId("6560a0ef02a1877734a9df66")
   timestamp: 2020-01-23T01:00:00.441Z,
   name: 'sensor1',
   range: 5
}
```

Навпаки, ці документи *не* досягають оптимальної продуктивності вставки, оскільки їх порядок полів відрізняється:

```js
{
   range: 1,
   _id: ObjectId("6250a0ef02a1877734a9df57"),
   name: 'sensor1',
   timestamp: 2020-01-23T00:00:00.441Z
},
{
   _id: ObjectId("6560a0ef02a1877734a9df66")
   name: 'sensor1',
   timestamp: 2020-01-23T01:00:00.441Z,
   range: 5
}
```

### Збільште кількість клієнтів

Збільшення кількості клієнтів, які записують дані у ваші колекції, може покращити продуктивність.

Щоб записувати дані за допомогою кількох клієнтів, потрібно вимкнути повторний запис. Повторні записи для колекцій часових рядів не поєднують записи від кількох клієнтів.

Щоб дізнатися більше про повторні записи та як їх вимкнути, див  [retryable writes.](https://www.mongodb.com/docs/manual/core/retryable-writes/#std-label-retryable-writes)

## Оптимізація стиснення

Щоб оптимізувати стиснення даних для колекцій часових рядів, виконайте наведені нижче дії.

### Пропустити поля, що містять порожні об’єкти та масиви з документів

Щоб оптимізувати стиснення, якщо ваші дані містять порожні об’єкти або масиви, пропустіть порожні поля з ваших документів.

Для прикладу розглянемо такі документи:

```js
{
 time: 2020-01-23T00:00:00.441Z,
 coordinates: [1.0, 2.0]
},
{
   time: 2020-01-23T00:00:10.441Z,
   coordinates: []
},
{
   time: 2020-01-23T00:00:20.441Z,
   coordinates: [3.0, 5.0]
}
```

Чергування полів `coordinates` із заповненими значеннями та порожнім масивом призводить до зміни схеми для компресора. Зміна схеми призводить до того, що другий і третій документи в послідовності залишаються нестиснутими.

Навпаки, наступні документи, де порожній масив пропущений, отримують перевагу оптимального стиснення:

```
{
   time: 2020-01-23T00:00:00.441Z,
   coordinates: [1.0, 2.0]
},
{
   time: 2020-01-23T00:00:10.441Z
},
{
   time: 2020-01-23T00:00:20.441Z,
   coordinates: [3.0, 5.0]
}
```

### Округліть числові дані до кількох десяткових знаків

Округліть числові дані до точності, необхідної для вашої програми. Округлення числових даних до меншої кількості знаків після коми покращує коефіцієнт стиснення.

# Стиснення часових рядів

На цій сторінці описано, як MongoDB стискає дані в колекціях часових рядів і як можна оптимізувати стиснення.

## Алгоритм стиснення за замовчуванням

Колекції часових рядів використовують [zstd](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-zstd) стиснення, яке відрізняється від глобального алгоритму стиснення за замовчуванням, [snappy.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-snappy)

## Стиснення стовпців

Починаючи з MongoDB 5.2, колекції часових рядів використовують **стиснення стовпців**. Стиснення стовпців додає низку інновацій, які разом значно покращують практичне стиснення, зменшують загальний обсяг даних на диску та покращують продуктивність читання.

Ці покращення додатково зменшують розмір даних на диску під час стиснення за допомогою `zstd`, а також значно зменшують простір, який використовується в кеші WiredTiger.

Введені типи стиснення:

- Дельта-кодування
- Стиснення об'єктів
- Стиснення масиву (починаючи з MongoDB 6.0)
- Кодування довжини циклу (RLE)

### Delta Encoding (Delta Compression)

Delta Encoding takes advantage of the data in your time series collection having time-series characteristics. Instead of storing absolute values, Delta Encoding assumes that the measurements will not change rapidly between each other. This approach reduces the amount of information required by only storing the difference between measurements.

### Delta of Delta Encoding (Delta of Delta Compression)

With data that increases monotonically, Delta of Delta Encoding can further minimize the size of the number stored by calculating a delta of the delta itself.

### Object and Array Compression

Column compression ensures that if you are using objects and arrays in your documents, you receive the same compression benefits had those embedded fields existed at the root level of your document.

To learn how to optimize compression, see [Optimize Compression.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-best-practices/#std-label-tsc-best-practice-optimize-compression)

# Time Series Collection Limitations

## Непідтримувані функції

Наступні функції не підтримуються для колекцій часових рядів:

- [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/)
- [Change streams](https://www.mongodb.com/docs/manual/changeStreams/#std-label-changeStreams)
- [Client-Side Field Level Encryption](https://www.mongodb.com/docs/manual/core/csfle/#std-label-manual-csfle-feature)
- [Database Triggers](https://www.mongodb.com/docs/realm/triggers/database-triggers/)
- [GraphQL API](https://www.mongodb.com/docs/realm/graphql/)
- [Schema validation rules](https://www.mongodb.com/docs/manual/core/schema-validation/#std-label-schema-validation-overview)
- [`reIndex`](https://www.mongodb.com/docs/manual/reference/command/reIndex/#mongodb-dbcommand-dbcmd.reIndex)
- [`renameCollection`](https://www.mongodb.com/docs/manual/reference/command/renameCollection/#mongodb-dbcommand-dbcmd.renameCollection)

[Atlas Device Sync](https://www.mongodb.com/docs/realm/sync/) підтримується, лише якщо колекції часових рядів асиметрично синхронізовані. Детальніше див [Enable Atlas Device Sync.](https://www.mongodb.com/docs/realm/sync/configure/enable-sync/)

## Aggregation $out and $ merge

Ви не можете використовувати [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) або [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) етапи конвеєра агрегації, щоб додати дані з іншої колекції до колекції часових рядів.

## Оновлення та видалення

Починаючи з MongoDB 5.1, ви можете виконувати деякі операції видалення та оновлення.

Команди видалення мають відповідати таким вимогам:

- Ви можете зіставити лише значення поля [metaField](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-procedures/#std-label-time-series-fields).
- Ваша команда видалення не повинна обмежувати кількість документів, які потрібно видалити. Установіть `justOne: false` або скористайтеся  [`deleteMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/#mongodb-method-db.collection.deleteMany).

Команди оновлення мають відповідати таким вимогам:

- Ви можете зіставити лише значення поля `metaField`.
- Ви можете змінити лише значення поля `metaField`.
- Ваш документ оновлення може містити лише вирази [update operator](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators).
- Ваша команда оновлення не повинна обмежувати кількість документів, які потрібно оновити. Встановіть `multi: true` або використовуйте  [`updateMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany).
- Ваша команда оновлення не має встановлювати [upsert: true.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert)

У MongoDB 5.0 колекції часових рядів підтримують лише операції вставки та запити на читання. Оновлення та операції видалення вручну призводять до помилки.

Щоб автоматично видалити старі дані, [налаштуйте автоматичне видалення (TTL).](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-automatic-removal/#std-label-set-up- автоматичне видалення)

Щоб видалити всі документи з колекції, скористайтеся [`drop()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.drop/#mongodb-method-db.collection .drop) метод видалення колекції.

## Вторинні індекси часових рядів

У MongoDB 6.0 покращено підтримку вторинних індексів.

### Time Series Secondary Indexes with MongoDB 6.0 and Later

Starting in MongoDB 6.0, you can add a [secondary index](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index) to any field.

These index types are not supported:

- [Text indexes](https://www.mongodb.com/docs/manual/core/index-text/#std-label-index-feature-text)
- [2d indexes](https://www.mongodb.com/docs/manual/core/2d/#std-label-2d-index)
- [Unique indexes](https://www.mongodb.com/docs/manual/core/index-unique/#std-label-index-type-unique)

The [TTL](https://www.mongodb.com/docs/manual/core/index-ttl/#std-label-index-feature-ttl) index property is not supported. For TTL deletion, use [expireAfterSeconds.](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.expireAfterSeconds)

You can only use the [multikey index](https://www.mongodb.com/docs/manual/core/index-multikey/#std-label-index-type-multikey) type on the `metaField`.

These index properties are partially supported. You can create:

- [partial indexes](https://www.mongodb.com/docs/manual/core/index-partial/#std-label-index-type-partial) on every field except `metaField` and `timeField`.
- [sparse indexes](https://www.mongodb.com/docs/manual/core/index-sparse/#std-label-index-type-sparse) on the `metaField`.

For improvements to time series secondary indexes available starting in MongoDB 6.0, see [Time Series Secondary Indexes in MongoDB 6.0.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-secondary-index/#std-label-timeseries-add-secondary-index-mongodb-6.0)

If there are [secondary indexes](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-secondary-index) on [time series collections](https://www.mongodb.com/docs/manual/core/timeseries-collections/#std-label-manual-timeseries-collection) and you need to downgrade the Feature Compatibility Version (FCV), you must first drop any secondary indexes that are incompatible with the downgraded FCV. See [`setFeatureCompatibilityVersion`.](https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#mongodb-dbcommand-dbcmd.setFeatureCompatibilityVersion)

### Time Series Secondary Indexes with MongoDB 5.0 and Earlier

In MongoDB 5.0 and earlier:

- The `metaField` can have secondary indexes.
- The `timeField`  can have secondary indexes.
- If the `metaField` is a document, you can add secondary indexes on fields inside the document.

[Indexes](https://www.mongodb.com/docs/manual/indexes/#std-label-indexes)

## Capped Collections

You cannot create a time series collection as a [capped collection.](https://www.mongodb.com/docs/manual/core/capped-collections/#std-label-manual-capped-collection)

## Modification of Collection Type

You can only set the collection type when you create a collection:

- An existing collection cannot be converted into a time series collection.
- A time series collection cannot be converted into a different collection type.

To move data from an existing collection to a time series collection, [migrate data into a time series collection.](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-migrate-data-into-timeseries-collection/#std-label-migrate-data-into-a-timeseries-collection)

## Modification of `timeField` and `metaField`

You can only set a collection's `timeField` and `metaField` parameters when you create the collection. You cannot modify these parameters later.



## Modification of `granularity`

After you set the `granularity`, you can only increase it one level at a time. The `granularity` can change from `"seconds"` to `"minutes"` or from `"minutes"` to `"hours"`. Other changes are not allowed.

To change the `granularity` from `"seconds"` to `"hours"`, first increase the `granularity` to `"minutes"` and then to `"hours"`.



## Sharding

Starting in MongoDB 5.1 (and 5.0.6), you can create sharded time series collections.

In versions earlier than MongoDB 5.0.6, you cannot shard time series collections.

### Sharding Administration Commands

Starting in MongoDB 5.2 (and 5.1.2, 5.0.6), you can run [sharding administration commands](https://www.mongodb.com/docs/manual/reference/command/nav-sharding/#std-label-db-commands-sharding) (such as [`moveChunk`](https://www.mongodb.com/docs/manual/reference/command/moveChunk/#mongodb-dbcommand-dbcmd.moveChunk)) on the `system.buckets` collection.

In versions earlier than MongoDB 5.0.6, you cannot run sharding administration commands for sharded time series collections.

### Shard Key Fields

When sharding time series collections, you can only specify the following fields in the shard key:

- The `metaField`
- Sub-fields of `metaField`
- The `timeField`

You may specify combinations of these fields in the shard key. No other fields, including `_id`, are allowed in the shard key pattern.

When you specify the shard key:

- `metaField` can be either a:
  - [Hashed shard key](https://www.mongodb.com/docs/manual/core/hashed-sharding/#std-label-sharding-hashed-sharding)
  - [Ranged shard key](https://www.mongodb.com/docs/manual/core/ranged-sharding/#std-label-sharding-ranged)
- `timeField` must be:
  - A [ranged shard key](https://www.mongodb.com/docs/manual/core/ranged-sharding/#std-label-sharding-ranged)
  - At the end of the shard key pattern

Avoid specifying **only** the `timeField` as the shard key. Since the `timeField` [increases monotonically](https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/#std-label-shard-key-monotonic), it may result in all writes appearing on a single chunk within the cluster. Ideally, data is evenly distributed across chunks.

To learn how to best choose a shard key, see:

- [Choose a Shard Key](https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/#std-label-sharding-shard-key-requirements)
- [MongoDB Blog: On Selecting a Shard Key for MongoDB.](https://www.mongodb.com/blog/post/on-selecting-a-shard-key-for-mongodb?tck=docs_server)

### Resharding

You cannot reshard sharded time series collections.

## Transactions

You cannot write to time series collections in [transactions.](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions)

Reads from time series collections are supported in transactions.

## View Limitations

Time series collections are writable non-materialized views. Limitations for views apply to time series collections.

- You cannot create a view from a time series bucket collection namespace (namely, a collection prefixed with `system.buckets`).