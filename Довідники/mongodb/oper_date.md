# Нові оператори конвеєра агрегації: `$dateAdd`, `$dateDiff` і `$dateTrunc`

У версії 5.0 MongoDB додав такі оператори конвеєра агрегації:

- [$dateAdd](https://docs.mongodb.com/manual/reference/operator/aggregation/dateAdd/): додає вказану кількість часу до об’єкта Date
- [$dateDiff](https://docs.mongodb.com/manual/reference/operator/aggregation/dateDiff/): повертає різницю в часі між двома датами
- [$dateTrunc](https://docs.mongodb.com/manual/reference/operator/aggregation/dateTrunc/): повертає дату, яка була скорочена до вказаної одиниці

Ці нові оператори роблять роботу з даними часових рядів ще простішою. Відвідайте офіційну документацію MongoDB щодо [операторів конвеєра агрегації](https://docs.mongodb.com/manual/reference/operator/aggregation/), щоб дізнатися більше про всі доступні оператори.

# $dateAdd (aggregation) 

- `$dateAdd` 

*Нове у версії 5.0*. Збільшує об’єкт [Date](https://www.mongodb.com/docs/manual/reference/method/Date/) на вказану кількість одиниць часу. [`$dateAdd`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateAdd/#mongodb-expression-exp.-dateAdd) вираз має такий синтаксис:

```js
{$dateAdd: {      
    startDate: <Expression>,      
    unit: <Expression>,      
    amount: <Expression>,
    timezone: <tzExpression>   
}}
```

Повертає [Date](https://www.mongodb.com/docs/manual/reference/method/Date/). `startDate` може бути будь-яким виразом, який розв’язує тип дати, позначки часу або ObjectId. Незалежно від того, який тип даних використовується як вхід, поверненим значенням буде об’єкт [Date](https://www.mongodb.com/docs/manual/reference/method/Date/).

- `startDate` - Дата початку операції додавання в UTC. `startDate` може бути будь-яким [виразом](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions), який перетворюється на [Date]( https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-date), [Timestamp](https://www.mongodb.com/docs /manual/reference/bson-types/#std-label-document-bson-type-timestamp), або [ObjectID](https://www.mongodb.com/docs/manual/reference/bson-types/ #std-label-document-bson-type-object-id)
- `unit` - одиниця , яка використовується для вимірювання "кількості" часу, доданого до "дати початку". Одиниця вимірювання — це [вираз](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions), який перетворюється на один із таких рядків:
  - `year`
  - `quarter`
  - `week`
  - `month` 
  - `day` 
  - `hour` 
  - `minute` 
  - `second` 
  - `millisecond`
- `amount` - Кількість `units`, доданих до `startDate`. `amount` — це [вираз](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions), який розв’язується до цілого чи довгого числа. `amount`  також може перетворюватися на цілий десятковий або подвійний, якщо це значення можна перетворити на довгий без втрати точності.
- `timezone` -  Optional.  The timezone to carry out the operation. `<tzExpression>` must be a valid [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a string formatted as either an [Olson Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) or a [UTC Offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets). If no `timezone` is provided, the result is displayed in `UTC`. Приклад:

| Format                    | Examples                                                     |
| ------------------------- | ------------------------------------------------------------ |
| Olson Timezone Identifier | `"America/New_York""Europe/London""GMT"`                     |
| UTC Offset                | `+/-[hh]:[mm], e.g. "+04:45"+/-[hh][mm], e.g. "-0530"+/-[hh], e.g. "+03"` |
|                           |                                                              |

- `startOfWeek` - Optional. Used when the unit is equal to `week`. Defaults to `Sunday`. The `startOfWeek` parameter is an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a case insensitive string:`monday` (or `mon`)`tuesday` (or `tue`)`wednesday` (or `wed`)`thursday` (or `thu`)`friday` (or `fri`)`saturday` (or `sat`)`sunday` (or `sun`)

## Поведінка

### Вимірювання часу

MongoDB стежить за переважним використанням бази даних і працює з часом у UTC. Вираз `dateAdd` завжди приймає `startDate` у UTC і повертає результат у UTC. Якщо вказано `timezone`, обчислення буде виконано з використанням зазначеного `timezone`. Часовий пояс особливо важливий, коли обчислення передбачає перехід на літній час (DST).

Якщо `unit` є `month` або більшим, операція коригується з урахуванням останнього дня місяця. Додавання одного `month` в останній день жовтня, наприклад, демонструє коригування «останнього дня місяця».

```js
{
   $dateAdd:
      {
         startDate: ISODate("2020-10-31T12:10:05Z"),
         unit: "month",
         amount: 1
      }
}
```

Зверніть увагу, що повернута дата, `ISODate("2020-11-30T12:10:05Z")`, є 30-м, а не 31-м, оскільки листопад має менше днів, ніж жовтень.

### Часовий пояс

У разі використання ідентифікатора часового поясу Олсона в полі `<timezone>` MongoDB застосовує зсув літнього часу, якщо він застосовний для вказаного часового поясу.

Наприклад, розглянемо колекцію «продажів» із таким документом:

```js
{
   "_id" : 1,
   "item" : "abc",
   "price" : 20,
   "quantity" : 5,
   "date" : ISODate("2017-05-20T10:24:51.303Z")
}
```

Наступна агрегація ілюструє, як MongoDB обробляє зсув літнього часу для ідентифікатора часового поясу Olson. У прикладі використовуються [`$hour`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/hour/#mongodb-expression-exp.-hour) і [`$minute`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minute/#mongodb-expression-exp.-minute) оператори для повернення відповідних частин поля `date`:

```js
db.sales.aggregate([
{
   $project: {
      "nycHour": {
         $hour: { date: "$date", timezone: "-05:00" }
       },
       "nycMinute": {
          $minute: { date: "$date", timezone: "-05:00" }
       },
       "gmtHour": {
          $hour: { date: "$date", timezone: "GMT" }
       },
       "gmtMinute": {
          $minute: { date: "$date", timezone: "GMT" } },
       "nycOlsonHour": {
          $hour: { date: "$date", timezone: "America/New_York" }
       },
       "nycOlsonMinute": {
          $minute: { date: "$date", timezone: "America/New_York" }
       }
   }
}])
```

Операція повертає такий результат:

```js
{
   "_id": 1,
   "nycHour" : 5,
   "nycMinute" : 24,
   "gmtHour" : 10,
   "gmtMinute" : 24,
   "nycOlsonHour" : 6,
   "nycOlsonMinute" : 24
}
```

## Приклади

### Додайте майбутню дату

Розглянемо колекцію замовлень клієнтів із такими документами:

```js
db.shipping.insertMany(
  [
     { custId: 456, purchaseDate: ISODate("2020-12-31") },
     { custId: 457, purchaseDate: ISODate("2021-02-28") },
     { custId: 458, purchaseDate: ISODate("2021-02-26") }
  ]
)
```

Звичайний час доставки становить 3 дні. Ви можете використовувати `$dateAdd` у конвеєрі агрегації, щоб установити `expectedDeliveryDate` на 3 дні в майбутньому.

```js
db.shipping.aggregate(
   [
      {
         $project:
            {
               expectedDeliveryDate:
                  {
                     $dateAdd:
                        {
                           startDate: "$purchaseDate",
                           unit: "day",
                           amount: 3
                        }
                  }
            }
       },
       {
          $merge: "shipping"
       }
    ]
 )
```

Після додавання 3 днів до `purchaseDate` за допомогою `$dateAdd` у [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline- pipe.-project), етап [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) оновлює оригінальні документи з `expectedDeliveryDate`.

Отримані документи виглядають так:

```js
{
   "_id" : ObjectId("603dd4b2044b995ad331c0b2"),
   "custId" : 456,
   "purchaseDate" : ISODate("2020-12-31T00:00:00Z"),
   "expectedDeliveryDate" : ISODate("2021-01-03T00:00:00Z")
}
{
   "_id" : ObjectId("603dd4b2044b995ad331c0b3"),
   "custId" : 457,
   "purchaseDate" : ISODate("2021-02-28T00:00:00Z"),
   "expectedDeliveryDate" : ISODate("2021-03-03T00:00:00Z")
}
{
    "_id" : ObjectId("603dd4b2044b995ad331c0b4"),
   "custId" : 458,
   "purchaseDate" : ISODate("2021-02-26T00:00:00Z"),
   "expectedDeliveryDate" : ISODate("2021-03-01T00:00:00Z")
}
```

### Фільтрувати за діапазоном дат

Оновіть колекцію `shipping` з останнього прикладу за допомогою цього коду, щоб додати дати доставки до документів:

```js
db.shipping.updateOne(
   { custId: 456 },
   { $set: { deliveryDate: ISODate( "2021-01-10" ) } }
)

db.shipping.updateOne(
  { custId: 457 },
  { $set: { deliveryDate:  ISODate( "2021-03-01" ) } }
)

db.shipping.updateOne(
   { custId: 458 },
   { $set: { deliveryDate:  ISODate( "2021-03-02" ) } }
)
```

Ви хочете знайти відправлення із запізненням. Щоб створити фільтр, який відповідає документам у діапазоні дат, визначених початковою точкою (`$purchaseDate`) і періодом часу, визначеним `$dateAdd`.

```js
db.shipping.aggregate(
   [
      {
         $match:
            {
               $expr:
                  {
                     $gt:
                        [ "$deliveryDate",
                          {
                             $dateAdd:
                                {
                                   startDate: "$purchaseDate",
                                   unit: "day",
                                   amount: 5
                                }
                           }
                        ]
                  }
            }
       },
       {
          $project:
             {
                _id: 0,
                custId: 1,
                purchased:
                   {
                       $dateToString:
                          {
                             format: "%Y-%m-%d",
                             date: "$purchaseDate"
                          }
                   },
                delivery:
                   {
                      $dateToString:
                         {
                            format: "%Y-%m-%d",
                            date: "$deliveryDate"
                         }
                   }
             }
       }
   ]
)
```

Етап [`$match`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) використовує [`$gt`](https ://www.mongodb.com/docs/manual/reference/operator/aggregation/gt/#mongodb-expression-exp.-gt) і `$dateAdd` у виразі ([`$expr`](https:/ /www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr)), щоб порівняти фактичну `deliveryDate` з очікуваною датою. Документи з датою доставки понад 5 днів після `purchaseDate` передаються до етапу [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb- трубопровод-труба.-проект) .

Етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) використовує [`$dateToString`]( https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/#mongodb-expression-exp.-dateToString) вираз для перетворення дат у більш зручний для читання формат. Без перетворення MongoDB повертатиме дату у форматі [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate).

У цьому прикладі повертається лише один запис:

```js
{ "custId" : 456, "purchased" : "2020-12-31", "delivery" : "2021-01-10" }
```

### Налаштувати на літній час

Усі дати зберігаються внутрішньо за часом UTC. Якщо вказано `timezone`, `$dateAdd` використовує місцевий час для виконання обчислень. Результати відображаються в UTC.

У вас є клієнти в кількох часових поясах, і ви хочете побачити, як літній час може вплинути на ваші розрахункові періоди, якщо виставляти рахунок за `day` або `hour`.

Створіть цю колекцію часу підключення:

```js
db.billing.insertMany(
   [
      {
         location: "America/New_York",
         login: ISODate("2021-03-13T10:00:00-0500"),
         logout: ISODate("2021-03-14T18:00:00-0500")
      },
      {
         location: "America/Mexico_City",
         login: ISODate("2021-03-13T10:00:00-00:00"),
         logout: ISODate("2021-03-14T08:00:00-0500")
      }
   ]
)
```

Спочатку додайте 1 день, потім додайте 24 години до дат входу `login` в кожен документ.

```js
db.billing.aggregate(
   [
      {
         $project:
            {
               _id: 0,
               location: 1,
               start:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date: "$login"
                        }
                  },
               days:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date:
                              {
                                 $dateAdd:
                                    {
                                       startDate: "$login",
                                       unit: "day",
                                       amount: 1,
                                       timezone: "$location"
                                    }
                              }
                        }
                  },
               hours:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date:
                              {
                                 $dateAdd:
                                 {
                                    startDate: "$login",
                                    unit: "hour",
                                    amount: 24,
                                    timezone: "$location"
                                 }
                              }
                        }
                  },
               startTZInfo:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date: "$login",
                           timezone: "$location"
                        }
                  },
               daysTZInfo:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date:
                              {
                                 $dateAdd:
                                    {
                                       startDate: "$login",
                                       unit: "day",
                                       amount: 1,
                                       timezone: "$location"
                                    }
                              },
                           timezone: "$location"
                        }
                  },
               hoursTZInfo:
                  {
                     $dateToString:
                        {
                           format: "%Y-%m-%d %H:%M",
                           date:
                              {
                                 $dateAdd:
                                    {
                                       startDate: "$login",
                                       unit: "hour",
                                       amount: 24,
                                       timezone: "$location"
                                    }
                              },
                           timezone: "$location"
                        }
                  },
            }
      }
   ]
).pretty()
```

Вираз [`$dateToString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/#mongodb-expression-exp.-dateToString) переформатує вихід для зручності читання. Результати узагальнені тут:

| Field             | New York         | Mexico City      |
| ----------------- | ---------------- | ---------------- |
| Start             | 2021-03-13 15:00 | 2021-03-13 10:00 |
| Start, TZ Info    | 2021-03-13 10:00 | 2021-03-13 04:00 |
| 1 Day             | 2021-03-14 14:00 | 2021-03-14 10:00 |
| 1 Day, TZ Info    | 2021-03-14 10:00 | 2021-03-14 04:00 |
| 24 Hours          | 2021-03-14 15:00 | 2021-03-14 10:00 |
| 24 Hours, TZ Info | 2021-03-14 11:00 | 2021-03-14 04:00 |

На діаграмі виділено кілька моментів:

- Неформатовані дати повертаються в UTC. `$login` для Нью-Йорка – це UTC -5, однак рядки `start`, `days` і `hours` відображають час у UTC.
- 14 березня починається літній час у Нью-Йорку, але не в Мексиці. Розрахований час коригується, коли місцезнаходження переходить на літній час і переходить від одного «дня» до наступного.
- Літній час змінює тривалість «дня», а не «години». Немає переходу на літній час для «годин». Існує лише коригування літнього часу, коли «одиниця вимірювання» є «день» або більше, а обчислення перетинає зміну годинника в указаному «часовому поясі».

# $dateDiff (aggregation) 

`$dateDiff` 

*Нове у версії 5.0*. Повертає різницю між двома датами. [`$dateDiff`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateDiff/#mongodb-expression-exp .-dateDiff) вираз має такий синтаксис:

```js
{   $dateDiff: 
 {      
     startDate: <Expression>,      
     endDate: <Expression>,      
     unit: <Expression>,      
     timezone: <tzExpression>,      
     startOfWeek: <String>   
 }}
```

Віднімає `startDate` від `endDate`. Повертає ціле число у вказаних `unit`.

| Field       | Required/Optional | Description                                                  |
| ----------- | ----------------- | ------------------------------------------------------------ |
| `startDate` | Required          | The start of the time period. The `startDate` can be any [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a [Date](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-date), a [Timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp), or an [ObjectID.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-object-id) |
| `endDate`   | Required          | The end of the time period. The `endDate` can be any [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a [Date](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-date), a [Timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp), or an [ObjectID.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-object-id) |
| `unit`      | Required          | The time measurement `unit` between the `startDate` and `endDate`. It is an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a string:`year``quarter``week``month``day``hour``minute``second``millisecond` |
| `timezone`  | Optional          | The timezone to carry out the operation. `<tzExpression>` must be a valid [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a string formatted as either an [Olson Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |

 or a [UTC Offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets)

. If no `timezone` is provided, the result is displayed in `UTC`.

| Format                    | Examples                                 |
| ------------------------- | ---------------------------------------- |
| Olson Timezone Identifier | `"America/New_York""Europe/London""GMT"` |



| UTC Offset | `+/-[hh]:[mm], e.g. "+04:45"+/-[hh][mm], e.g. "-0530"+/-[hh], e.g. "+03"` |
| ---------- | ------------------------------------------------------------ |
|            |                                                              |

| `startOfWeek` | Optional | Used when the unit is equal to `week`. Defaults to `Sunday`. The `startOfWeek` parameter is an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a case insensitive string:`monday` (or `mon`)`tuesday` (or `tue`)`wednesday` (or `wed`)`thursday` (or `thu`)`friday` (or `fri`)`saturday` (or `sat`)`sunday` (or `sun`) |
| ------------- | -------- | ------------------------------------------------------------ |
|               |          |                                                              |



```js
{
  $expr:{
    $gt:[
      "$timestamp",
      {$dateAdd: 
      {
        startDate: new Date(),
        unit: 'second',
        amount: -10
      }}
      ]
  }
}
```



# $dateTrunc (aggregation) 

- `$dateTrunc` 

*New in version 5.0*.

Truncates a date.

[`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) syntax:

```
{
   $dateTrunc: {
      date: <Expression>,
      unit: <Expression>,
      binSize: <Expression>,
      timezone: <tzExpression>,
      startOfWeek: <Expression>
   }
}
```

| Field                                                        | Required / Optional | Description                                                  |
| ------------------------------------------------------------ | ------------------- | ------------------------------------------------------------ |
| [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date) | Required            | The date to truncate, specified in UTC. The [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date) can be any [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that resolves to a [Date](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-date), a [Timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp), or an [ObjectID.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-object-id) |
| [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) | Required            | The unit of time, specified as an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that must resolve to one of these strings:`year``quarter``week``month``day``hour``minute``second`Together, [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) specify the time period used in the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation. |
| [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) | Optional            | The numeric time value, specified as an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that must resolve to a positive non-zero number. Defaults to 1.Together, [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) specify the time period used in the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation. |
| [timezone](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-timezone) | Optional            | The timezone for the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation, specified as an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that must resolve to a string that contains one of these values:[Olson Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |

[UTC Offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets)

If no [timezone](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-timezone) is provided, the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation is performed in UTC.FormatExamplesOlson Timezone Identifier`America/New_York``Europe/London``GMT`UTC Offset`+/-[hh]:[mm]` (example, `+04:45`)`+/-[hh][mm]` (example, `-0530`)`+/-[hh]` (example, `+03`)

|                                                              |          |                                                              |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) | Optional | The start of the week. Used when [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is `week`. Defaults to `Sunday`.[startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) that must resolve to one of these case insensitive strings:`monday` (or `mon`)`tuesday` (or `tue`)`wednesday` (or `wed`)`thursday` (or `thu`)`friday` (or `fri`)`saturday` (or `sat`)`sunday` (or `sun`) |

## Behavior 

[`$dateTrunc`:](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc)

- Returns `null` if:
  - any of the input fields except [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is missing or set to `null`, or
  - if [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is `week` and [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is missing or set to `null`.
- Uses the [proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar)

 for dates preceding the year 1583.

Accounts for Daylight Savings Time, but does not account for [leap seconds.](https://en.wikipedia.org/wiki/Leap_second)

### `binSize` and `unit` Fields 

Together, [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) specify the time period used in the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation.

For example:

- If [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) is `1` and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is `hours`, the time period is one hour. For the [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date) `2021-03-20T11:30:05Z`, [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns `2021-03-20T11:00:00Z`.
- If [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) is `2` and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is `hours`, the time period is two hours. For the [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date) `2021-03-20T11:30:05Z`, [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns `2021-03-20T10:00:00Z`.

[`$dateTrunc`:](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc)

- Divides the time for the [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) calculation into [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) time periods in the specified time [unit.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit)

  The time periods start at a reference date, which is determind by [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit). If [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is:

  - A string other than `week`, [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) uses a reference date of `2000-01-01T00:00:00.00Z`. For example, if [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) is `10` and [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is `year`, example time periods are:
    - `2000-01-01T00:00:00.00Z`
    - `2010-01-01T00:00:00.00Z`
    - `2020-01-01T00:00:00.00Z`
  - Equal to `week`, [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) uses a reference date that is set to the earliest first day of the week that is greater than or equal to `2000-01-01`. The first day is set using [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) (the default is Sunday).

- Returns the lower boundary of the time period that the [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date) is in. The boundary is returned as an [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate). If the [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) field is `1`, [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) sets the least significant parts (as determined by [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit)) of the returned [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) to `0` and keeps the rest of the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) the same.

If [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is:

- `year`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of January 1 for the year in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

- `quarter`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the first day of the calendar quarter in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

  The quarters are:

  - January to March
  - April to June
  - July to September
  - October to December

- `month`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the first day of the month in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

- `week`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) day in [date](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date). The default for [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is Sunday.

- `day`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the day in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

- `hour`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the hour in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

- `minute`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for the start of the minute in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

- `second`: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) returns the [ISODate](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ISODate) for start of the second in [date.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-date)

### `unit` and `startOfWeek` Fields 

If [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) is:

- A string other than `week`, [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is ignored.
- Equal to `week` and [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) is:
  - Specified: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) uses [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) as the first day of the week for the calculation.
  - Omitted: [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) uses Sunday as the start of the week for the calculation.

## Examples 

Create a `cakeSales` collection that contains cake sales in the states of California (`CA`) and Washington (`WA`):

```
db.cakeSales.insertMany( [
   { _id: 0, type: "chocolate", orderDate: new Date("2020-05-18T14:10:30Z"),
     state: "CA", price: 13, quantity: 120 },
   { _id: 1, type: "chocolate", orderDate: new Date("2021-03-20T11:30:05Z"),
     state: "WA", price: 14, quantity: 140 },
   { _id: 2, type: "vanilla", orderDate: new Date("2021-01-11T06:31:15Z"),
     state: "CA", price: 12, quantity: 145 },
   { _id: 3, type: "vanilla", orderDate: new Date("2020-02-08T13:13:23Z"),
     state: "WA", price: 13, quantity: 104 },
   { _id: 4, type: "strawberry", orderDate: new Date("2019-05-18T16:09:01Z"),
     state: "CA", price: 41, quantity: 162 },
   { _id: 5, type: "strawberry", orderDate: new Date("2019-01-08T06:12:03Z"),
     state: "WA", price: 43, quantity: 134 }
] )
```

The `cakeSales` collection is used in the following examples.

### Truncate Order Dates in a `$project` Pipeline Stage 

This example uses [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) in a [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage to truncate the cake sales `orderDate` values to two weeks:

```
db.cakeSales.aggregate( [
   {
      $project: {
         _id: 1,
         orderDate: 1,
         truncatedOrderDate: {
            $dateTrunc: {
               date: "$orderDate", unit: "week", binSize: 2,
               timezone: "America/Los_Angeles", startOfWeek: "Monday"
            }
         }
      }
   }
] )
```

In the example:

- `$project` includes the `_id`, `orderDate`, and `truncatedOrderDate` fields in the output.
- `$dateTrunc` truncates the `orderDate` field to a `2` [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) `week` [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) time period in the `America/Los_Angeles` [timezone](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-timezone) with [startOfWeek](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-startOfWeek) set to `Monday`.

In this example output, the truncated `orderDate` is shown in the `truncatedOrderDate` field:

```
[
   {
      _id: 0,
      orderDate: ISODate("2020-05-18T14:10:30.000Z"),
      truncatedOrderDate: ISODate("2020-05-11T07:00:00.000Z")
   },
   {
      _id: 1,
      orderDate: ISODate("2021-03-20T11:30:05.000Z"),
      truncatedOrderDate: ISODate("2021-03-15T07:00:00.000Z")
   },
   {
      _id: 2,
      orderDate: ISODate("2021-01-11T06:31:15.000Z"),
      truncatedOrderDate: ISODate("2021-01-04T08:00:00.000Z")
   },
   {
      _id: 3,
      orderDate: ISODate("2020-02-08T13:13:23.000Z"),
      truncatedOrderDate: ISODate("2020-02-03T08:00:00.000Z")
   },
   {
      _id: 4,
      orderDate: ISODate("2019-05-18T16:09:01.000Z"),
      truncatedOrderDate: ISODate("2019-05-13T07:00:00.000Z")
   },
   {
      _id: 5,
      orderDate: ISODate("2019-01-08T06:12:03.000Z"),
      truncatedOrderDate: ISODate("2019-01-07T08:00:00.000Z")
   }
]
```

### Truncate Order Dates and Obtain Quantity Sum in a `$group` Pipeline Stage 

This example uses [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) in a [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) stage to truncate the cake sales `orderDate` values to six months and return the sum of the `quantity` values:

```
db.cakeSales.aggregate( [
   {
      $group: {
         _id: {
            truncatedOrderDate: {
               $dateTrunc: {
                  date: "$orderDate", unit: "month", binSize: 6
               }
            }
         },
         sumQuantity: { $sum: "$quantity" }
      }
   }
] )
```

In the example:

- `$group` has the `_id` field set to the `truncatedOrderDate` field to group the `cakeSales` documents, and returns the sum of the `quantity` values for each group using [`$sum`.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum)
- `$dateTrunc` truncates the `orderDate` field to a `6` [binSize](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-binSize) `month` [unit](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#std-label-dateTrunc-unit) time period.

In this example output, the truncated `orderDate` is shown in the `truncatedOrderDate` field and the `quantity` sum is shown in the `sumQuantity` field:

```
[
   {
      _id: { truncatedOrderDate: ISODate("2020-01-01T00:00:00.000Z") },
      sumQuantity: 224
   },
   {
      _id: { truncatedOrderDate: ISODate("2021-01-01T00:00:00.000Z") },
      sumQuantity: 285
   },
   {
      _id: { truncatedOrderDate: ISODate("2019-01-01T00:00:00.000Z") },
      sumQuantity: 296
   }
]
```

# Приклад $dateTrunc 

Розглянемо вихідний приклад біржових даних:

```js
{
    date: ISODate("2020-01-03T05:00:00.000Z"),
    symbol: 'AAPL',
    volume: 146322800,
    open: 74.287498,
    adjClose: 73.486023,
    high: 75.144997,
    low: 74.125,
    close: 74.357498
  } 
```

У цьому прикладі колекція `dowJonesTickerData` використовує `date` як timeField і `symbol` як metaField.

Припустімо, ми хочемо обчислити середню ціну акції на момент закриття за місяць для кожної акції в колекції. Ми можемо використати [`$dateTrunc`](https://docs.mongodb.com/manual/reference/operator/aggregation/dateTrunc/), щоб скоротити дати до відповідного місяця. Тоді ми можемо використати [`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/), щоб спочатку згрупувати документи за місяцями та символами, а по-друге, обчислити середнє для кожної групи.

```js
db.dowJonesTickerData.aggregate([{
    $group: {
        _id: {
            firstDayOfMonth: {
                $dateTrunc: {
                    date: "$date",
                    unit: "month"
                }
            },
            symbol: "$symbol"
        },
        avgMonthClose: {
            $avg: "$close"
        }
    }
}])
```

Результатом виконання вищезазначеного агрегування є набір документів. Кожен документ містить середню ціну закриття за місяць для певної акції. Нижче наведено приклади документів, які були отримані в результаті запуску вищевказаного агрегування.

```js
{
    _id: {
      firstDayOfMonth: ISODate("2020-06-01T00:00:00.000Z"),
      symbol: 'GOOG'
    },
    avgMonthClose: 1431.0477184545455
  },
  {
    _id: {
      firstDayOfMonth: ISODate("2021-07-01T00:00:00.000Z"),
      symbol: 'MDB'
    },
    avgMonthClose: 352.7314293333333
  },
  {
    _id: {
      firstDayOfMonth: ISODate("2021-06-01T00:00:00.000Z"),
      symbol: 'MSFT'
    },
    avgMonthClose: 259.01818086363636
  }
```