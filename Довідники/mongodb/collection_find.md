# Метод db.collection.find

https://www.mongodb.com/docs/manual/reference/method/db.collection.find/

`db.collection.find(query, projection, options)`

Вибирає документи в колекції або поданні та повертає  [cursor](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-cursor) до вибраних документів.

| Parameter                                                    | Type     | Description                                                  |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| [query](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-query) | document | Опціонально. Означує фільтр вибору за допомогою [операторів запиту](QueryandProjectionOperators.md). Щоб повернути всі документи в колекції, пропустіть цей параметр або передайте порожній документ (`{}`). |
| [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-projection) | document | Опціонально. Означує поля для повернення в документах, які відповідають фільтру запиту. Щоб повернути всі поля у відповідних документах, пропустіть цей параметр. Детально див нижче |
| [options](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-options) | document | Опціонально. Означує додаткові параметри для запиту. Ці параметри змінюють поведінку запиту та спосіб повернення результатів. Щоб переглянути доступні параметри, перегляньте [FindOptions.](https://mongodb.github.io/node-mongodb-native/4.0//interfaces/findoptions.html) |

## Projection

Параметр `projection` означує, які поля повертаються у відповідних документах. Параметр `projection` приймає документ такої форми:

```
{ <field1>: <value>, <field2>: <value> ... }
```

| Projection                          | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| `<field>: <1 or true>`              | Означує включення поля. Ненульові цілі числа також розглядаються як  `true`. |
| `<field>: <0 or false>`             | Означує виключення поля.                                     |
| `"<field>.$": <1 or true>`          | За допомогою оператора проекції масиву [`$`](https://www.mongodb.com/docs/manual/reference/operator/projection/positional/#mongodb-projection-proj.-) ви можете вказати проекція для повернення **першого** елемента, який відповідає умові запиту в полі масиву; напр. `"arrayField.$" : 1`. (Недоступно для [views](https://www.mongodb.com/docs/manual/core/views/).) Ненульові цілі числа також розглядаються як `true`. |
| `<field>: <array projection>`       | Using the array projection operators [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/projection/elemMatch/#mongodb-projection-proj.-elemMatch), [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/projection/slice/#mongodb-projection-proj.-slice), specifies the array element(s) to include, thereby excluding those elements that do not meet the expressions. (Not available for [views](https://www.mongodb.com/docs/manual/core/views/).) |
| `<field>: <$meta expression>`       | Using the [`$meta`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/meta/#mongodb-expression-exp.-meta) operator expression, specifies the inclusion of available [`per-document metadata`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/meta/#mongodb-expression-exp.-meta). (Not available for [views](https://www.mongodb.com/docs/manual/core/views/).) |
| `<field>: <aggregation expression>` | Specifies the value of the projected field.Starting in MongoDB 4.4, with the use of [aggregation expressions and syntax](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions), including the use of literals and aggregation variables, you can project new fields or project existing fields with new values. For example,If you specify a non-numeric, non-boolean literal (such as a literal string or an array or an operator expression) for the projection value, the field is projected with the new value; e.g.:`{ field: [ 1, 2, 3, "$someExistingField" ] }``{ field: "New String Value" }``{ field: { status: "Active", total: { $sum: "$existingArray" } } }`To project a literal value for a field, use the [`$literal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) aggregation expression; e.g.:`{ field: { $literal: 5 } }``{ field: { $literal: true } }``{ field: { $literal: { fieldWithValue0: 0, fieldWithValue1: 1 } } }`In versions 4.2 and earlier, any specification value (with the exception of the [previously unsupported document value](https://www.mongodb.com/docs/manual/release-notes/4.4/#std-label-4.4-projection)) is treated as either `true` or `false` to indicate the inclusion or exclusion of the field.*New in version 4.4*. |

#### Специфікація вбудованого поля

Для полів у вбудованих документах ви можете вказати поле за допомогою:

- [нотація з точкою](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation-embedded-fields); e.g. `"field.nestedfield": <value>`
- вкладена форма; наприклад `{ field: { nestedfield: <value> } }` (*Starting in MongoDB 4.4*)

#### `_id` Field Projection

Поле `_id` включено до повернених документів за замовчуванням, якщо ви явно не вкажете `_id: 0` у проекції, щоб приховати поле.

#### Включення чи виключення

Проекція (`projection`) *не може* містити *як* специфікації включення, так і виключення, за винятком поля `_id`:

- У `projection`, які *явно включають* поля, поле `_id` є єдиним полем, яке можна *явно виключити*.
- У `projection`, які *явно виключають* поля, поле `_id` є єдиним полем, яке можна *явно включити*; однак поле `_id` включено за замовчуванням.

Див. [Приклади проекцій.](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection-examples)

### Обробка курсору

Виконання [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) у [ `mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) автоматично повторює курсор, щоб відобразити до перших 20 документів. Введіть `it`, щоб продовжити ітерацію. Щоб отримати доступ до повернених документів за допомогою драйвера, скористайтеся відповідним механізмом обробки курсору для [мови драйвера.](https://www.mongodb.com/docs/drivers/)

Див також:

- [Iterate the Returned Cursor](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-crud-read-cursor)
- [Modify the Cursor Behavior](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-modify-cursor)
- [Available `mongosh` Cursor Methods](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-cursor-methods)

### Read Concern

Щоб указати [read concern](https://www.mongodb.com/docs/manual/reference/read-concern/) для [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find), використовуйте метод  [`cursor.readConcern()`](https://www.mongodb.com/docs/manual/reference/method/cursor.readConcern/#mongodb-method-cursor.readConcern) 

### Брекетинг типу

MongoDB розглядає деякі типи даних як еквівалентні для порівняння. Наприклад, числові типи піддаються перетворенню перед порівнянням. Однак для більшості типів даних [оператори порівняння](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/) виконують порівняння лише в документах, де [тип BSON](https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/#std-label-bson-types-comparison-order) цільового поля відповідає типу операнда запиту. Розглянемо таку колекцію:

```js
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
{ "_id": "oranges", "qty": { "in stock": 8, "ordered": 12 } }
{ "_id": "avocados", "qty": "fourteen" }
```

Наступний запит використовує [`$gt`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt), щоб повернути документи, де значення "кількість" більше за "4".

```
db.collection.find( { qty: { $gt: 4 } } )
```

Запит повертає такі документи:

```
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
```

Документ із `_id`, що дорівнює `"avocados"`, не повертається, оскільки його значення `qty` має тип `string`, тоді як [`$gt`](https://www.mongodb.com/docs/manual /reference/operator/query/gt/#mongodb-query-op.-gt) операнд має тип `integer`. Документ із значенням `_id`, що дорівнює `"oranges"`, не повертається, оскільки його значення `qty` має тип `object`. Щоб застосувати типи даних у колекції, використовуйте [Перевірку схеми.](https://www.mongodb.com/docs/manual/core/schema-validation/)

### Sessions

Для курсорів, створених у сеансі, ви не можете викликати [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) поза сеансом. Так само для курсорів, створених поза сеансом, ви не можете викликати [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) всередині сесії.

#### Час простою сеансу

Драйвери MongoDB і [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) пов’язують усі операції з [сеансом сервера](https://www. mongodb.com/docs/manual/reference/server-sessions/), за винятком непідтверджених операцій запису. Для операцій, явно не пов’язаних із сеансом (тобто використання [`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/#mongodb-method-Mongo. startSession)), драйвери MongoDB і `mongosh` створюють неявний сеанс і пов’язують його з операцією.

Якщо сеанс неактивний більше 30 хвилин, сервер MongoDB позначає цей сеанс як завершений і може закрити його в будь-який час. Коли сервер MongoDB закриває сеанс, він також припиняє всі поточні операції та відкриває курсори, пов’язані з сеансом. Це включає курсори, налаштовані за допомогою [`noCursorTimeout()`](https://www.mongodb.com/docs/manual/reference/method/cursor.noCursorTimeout/#mongodb-method-cursor.noCursorTimeout) або [`maxTimeMS( )`](https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/#mongodb-method-cursor.maxTimeMS) понад 30 хвилин. Для операцій, які можуть бути неактивними довше 30 хвилин, пов’яжіть операцію з явним сеансом за допомогою [`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo. startSession/#mongodb-method-Mongo.startSession) і періодично оновлювати сеанс за допомогою [`refreshSessions`](https://www.mongodb.com/docs/manual/reference/command/refreshSessions/#mongodb-dbcommand-dbcmd .refreshSessions). Для отримання додаткової інформації див. [Тайм-аут простою сеансу](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Session-Idle-Timeout).

### Transactions

[`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) can be used inside [multi-document transactions.](https://www.mongodb.com/docs/manual/core/transactions/)

- For cursors created outside of a transaction, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) inside the transaction.
- For cursors created in a transaction, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) outside the transaction.

In most cases, multi-document transaction incurs a greater performance cost over single document writes, and the availability of multi-document transactions should not be a replacement for effective schema design. For many scenarios, the [denormalized data model (embedded documents and arrays)](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding) will continue to be optimal for your data and use cases. That is, for many scenarios, modeling your data appropriately will minimize the need for multi-document transactions.

For additional transactions usage considerations (such as runtime limit and oplog size limit), see also [Production Considerations.](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

### Транзакції

[`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) можна використовувати всередині [багатодокументних транзакцій.](https://www.mongodb.com/docs/manual/core/transactions/)

- Для курсорів, створених поза транзакцією, ви не можете викликати [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) всередині транзакції .
- Для курсорів, створених у транзакції, ви не можете викликати [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) поза транзакцією.

У більшості випадків транзакції з кількома документами спричиняють більшу вартість продуктивності порівняно з записом одного документа, і доступність транзакцій з кількома документами не повинна замінювати ефективний дизайн схеми. Для багатьох сценаріїв [денормалізована модель даних (вбудовані документи та масиви)](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding) залишатиметься оптимальним для ваших даних і випадків використання. Тобто для багатьох сценаріїв належне моделювання ваших даних зведе до мінімуму потребу в багатодокументних транзакціях.

Додаткові зауваження щодо використання транзакцій (наприклад, обмеження часу виконання та обмеження розміру oplog) також див.

### Відключення клієнта

Починаючи з MongoDB 4.2, якщо клієнт, який видав [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method -db.collection.find) від’єднується до завершення операції, MongoDB позначає [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find /#mongodb-method-db.collection.find) для завершення за допомогою [`killOp`.](https://www.mongodb.com/docs/manual/reference/command/killOp/#mongodb-dbcommand-dbcmd.killOp )

## Приклади

У прикладах у цьому розділі використовуються документи з [колекції bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/), де документи зазвичай мають такий вигляд:

```js
{
    "_id" : <value>,
    "name" : { "first" : <string>, "last" : <string> },       // embedded document
    "birth" : <ISODate>,
    "death" : <ISODate>,
    "contribs" : [ <string>, ... ],                           // Array of Strings
    "awards" : [
        { "award" : <string>, year: <number>, by: <string> }  // Array of embedded documents
        ...
    ]
}
```

Щоб створити та заповнити колекцію `bios`, див [The `bios` Example Collection.](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

### Знайти всі документи в колекції

Метод [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) без параметрів повертає всі документи з колекції та повертає всі поля для документів. Наприклад, наступна операція повертає всі документи в [колекцію bios:](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

```
db.bios.find()
```

### Знайдіть документи, які відповідають критеріям запиту

#### Запит на рівність

- Наступна операція повертає документи в [колекцію bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/), де `_id` дорівнює `5`:

```
db.bios.find( { _id: 5 } )
```

Наступна операція повертає документи в [колекцію bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/), де поле `last` у вбудованому документі `name` дорівнює ` "Hopper"`:

```
db.bios.find( { "name.last": "Hopper" } )
```

Щоб отримати доступ до полів у вбудованому документі, використовуйте [крапковий запис](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation-embedded-fields) (`"<вбудований документ>.<поле>"`).

#### Query Using Operators

To find documents that match a set of selection criteria, call [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) with the `<criteria>` parameter.

MongoDB provides various [query operators](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors) to specify the criteria.

- The following operation uses the [`$in`](https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in) operator to return documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where `_id` equals either `5` or `ObjectId("507c35dd8fada716c89d0013")`:

  ```
  db.bios.find(
     { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] } }
  )
  ```

The following operation uses the [`$gt`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) operator returns all the documents from the `bios` collection where `birth` is greater than `new Date('1950-01-01')`:

```
db.bios.find( { birth: { $gt: new Date('1950-01-01') } } )
```

The following operation uses the [`$regex`](https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex) operator to return documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where `name.last` field starts with the letter `N` (or is `"LIKE N%"`)

```
db.bios.find(
   { "name.last": { $regex: /^N/ } }
)
```

For a list of the query operators, see [Query Selectors.](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors)

#### Query for Ranges

Combine comparison operators to specify ranges for a field. The following operation returns from the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) documents where `birth` is between `new Date('1940-01-01')` and `new Date('1960-01-01')` (exclusive):

```
db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )
```

For a list of the query operators, see [Query Selectors.](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors)

#### Query for Multiple Conditions

The following operation returns all the documents from the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where `birth` field is [`greater than`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) `new Date('1950-01-01')` and `death` field does not exists:

```
db.bios.find( {
   birth: { $gt: new Date('1920-01-01') },
   death: { $exists: false }
} )
```

For a list of the query operators, see [Query Selectors.](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors)

### Query Embedded Documents

The following examples query the `name` embedded field in the [bios collection.](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

#### Query Exact Matches on Embedded Documents

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the embedded document `name` is *exactly* `{ first: "Yukihiro", last: "Matsumoto" }`, including the order:

```
db.bios.find(
    { name: { first: "Yukihiro", last: "Matsumoto" } }
)
```

The `name` field must match the embedded document exactly. The query does **not** match documents with the following `name` fields:

```
{
   first: "Yukihiro",
   aka: "Matz",
   last: "Matsumoto"
}

{
   last: "Matsumoto",
   first: "Yukihiro"
}
```

#### Query Fields of an Embedded Document

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the embedded document `name` contains a field `first` with the value `"Yukihiro"` and a field `last` with the value `"Matsumoto"`. The query uses [dot notation](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-dot-notation) to access fields in an embedded document:

```
db.bios.find(
   {
     "name.first": "Yukihiro",
     "name.last": "Matsumoto"
   }
)
```

The query matches the document where the `name` field contains an embedded document with the field `first` with the value `"Yukihiro"` and a field `last` with the value `"Matsumoto"`. For instance, the query would match documents with `name` fields that held either of the following values:

```
{
  first: "Yukihiro",
  aka: "Matz",
  last: "Matsumoto"
}

{
  last: "Matsumoto",
  first: "Yukihiro"
}
```

For more information and examples, see also [Query on Embedded/Nested Documents.](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)

### Query Arrays

#### Query for an Array Element

The following examples query the `contribs` array in the [bios collection.](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

- The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the array field `contribs` contains the element `"UNIX"`:

  ```
  db.bios.find( { contribs: "UNIX" } )
  ```

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the array field `contribs` contains the element `"ALGOL"` or `"Lisp"`:

```
db.bios.find( { contribs: { $in: [ "ALGOL", "Lisp" ]} } )
```

The following operation use the [`$all`](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all) query operator to return documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the array field `contribs` contains both the elements `"ALGOL"` and `"Lisp"`:

```
db.bios.find( { contribs: { $all: [ "ALGOL", "Lisp" ] } } )
```

For more examples, see [`$all`](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all).  See also [`$elemMatch`.](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch)

The following operation uses the [`$size`](https://www.mongodb.com/docs/manual/reference/operator/query/size/#mongodb-query-op.-size) operator to return documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the array size of `contribs` is 4:

```
db.bios.find( { contribs: { $size: 4 } } )
```

For more information and examples of querying an array, see:

- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

For a list of array specific query operators, see [Array.](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-operator-query-array)

#### Query an Array of Documents

The following examples query the `awards` array in the [bios collection.](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

- The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the `awards` array contains an element with `award` field equals `"Turing Award"`:

  ```
  db.bios.find(
     { "awards.award": "Turing Award" }
  )
  ```

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) where the `awards` array contains at least one element with both the `award` field equals `"Turing Award"` and the `year` field greater than 1980:

```
db.bios.find(
   { awards: { $elemMatch: { award: "Turing Award", year: { $gt: 1980 } } } }
)
```

- Use the [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch) operator to specify multiple criteria on an array element.

For more information and examples of querying an array, see:

- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

For a list of array specific query operators, see [Array.](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-operator-query-array)

### Projections

Параметр [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection) означує, які поля повертати. Параметр містить специфікації включення або виключення, але не обидва, якщо виключення не стосується поля `_id`.

Якщо поле `_id` явно не виключено в документі проекції `_id: 0`, повертається поле `_id`.

#### Означення полів для повернення

Наступна операція знаходить усі документи в [колекції bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) і повертає лише поле `name`, поле `contribs` і Поле `_id`:

```js
db.bios.find( { }, { name: 1, contribs: 1 } )
```

Якщо поле `_id` явно не виключено в документі проекції `_id: 0`, повертається поле `_id`.

#### Явне виключення полів

Наступна операція запитує [колекцію bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) і повертає всі поля *окрім* поля `first` в `name` вбудований документ і поле `birth`:

```
db.bios.find(
   { contribs: 'OOP' },
   { 'name.first': 0, birth: 0 }
)
```

#### Явне виключення поля `_id`

Якщо поле `_id` явно не виключено в документі проекції `_id: 0`, повертається поле `_id`.

Наступна операція знаходить документи в [колекції bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) і повертає лише поля `name` і `contribs`:

```
db.bios.find(
   { },
   { name: 1, contribs: 1, _id: 0 }
)
```

#### Про масиви та вбудовані документи

Наступна операція запитує [колекцію bios](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) і повертає поле `last` у вбудованому документі `name` і перше два елементи в масиві contribs:

```
db.bios.find(
   { },
   { _id: 0, 'name.last': 1, contribs: { $slice: 2 } } )
```

Починаючи з MongoDB 4.4, ви також можете вказати вбудовані поля за допомогою вкладеної форми, наприклад.

```
db.bios.find(
   { },
   { _id: 0, name: { last: 1 }, contribs: { $slice: 2 } }
)
```

#### Використовуйте вираз агрегації

Починаючи з MongoDB 4.4, [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection. знайти) проекція може приймати [вирази агрегування та синтаксис.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) З використанням виразів агрегування і синтаксису, ви можете проектувати нові поля або проектувати існуючі поля з новими значеннями. Наприклад, наступна операція використовує агрегаційні вирази для заміни значення полів `name` і `awards`, а також для включення нових полів `reportDate`, `reportBy` і `reportNumber`.

```js
db.bios.find(
   { },
   {
     _id: 0,
     name: {
        $concat: [
           { $ifNull: [ "$name.aka", "$name.first" ] },
           " ",
           "$name.last"
        ]
     },
     birth: 1,
     contribs: 1,
     awards: { $cond: { if: { $isArray: "$awards" }, then: { $size: "$awards" }, else: 0 } },
     reportDate: { $dateToString: {  date: new Date(), format: "%Y-%m-%d" } },
     reportBy: "hellouser123",
     reportNumber: { $literal: 1 }
   }
)
```

Щоб встановити для поля `reportRun` значення `1` Операція повертає такі документи:

```
{ "birth" : ISODate("1924-12-03T05:00:00Z"), "contribs" : [ "Fortran", "ALGOL", "Backus-Naur Form", "FP" ], "name" : "John Backus", "awards" : 4, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1927-09-04T04:00:00Z"), "contribs" : [ "Lisp", "Artificial Intelligence", "ALGOL" ], "name" : "John McCarthy", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1906-12-09T05:00:00Z"), "contribs" : [ "UNIVAC", "compiler", "FLOW-MATIC", "COBOL" ], "name" : "Grace Hopper", "awards" : 4, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1926-08-27T04:00:00Z"), "contribs" : [ "OOP", "Simula" ], "name" : "Kristen Nygaard", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1931-10-12T04:00:00Z"), "contribs" : [ "OOP", "Simula" ], "name" : "Ole-Johan Dahl", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1956-01-31T05:00:00Z"), "contribs" : [ "Python" ], "name" : "Guido van Rossum", "awards" : 2, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1941-09-09T04:00:00Z"), "contribs" : [ "UNIX", "C" ], "name" : "Dennis Ritchie", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1965-04-14T04:00:00Z"), "contribs" : [ "Ruby" ], "name" : "Matz Matsumoto", "awards" : 1, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1955-05-19T04:00:00Z"), "contribs" : [ "Java" ], "name" : "James Gosling", "awards" : 2, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "contribs" : [ "Scala" ], "name" : "Martin Odersky", "awards" : 0, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
```

### Iterate the Returned Cursor

The [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method returns a [cursor](https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors) to the results.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), if the returned cursor is not assigned to a variable using the `var` keyword, the cursor is automatically iterated to access up to the first 20 documents that match the query. You can set the `DBQuery.shellBatchSize` variable to change the number of automatically iterated documents.

To manually iterate over the results, assign the returned cursor to a variable with the `var` keyword, as shown in the following sections.

#### With Variable Name

The following example uses the variable `myCursor` to iterate over the cursor and print the matching documents:

```
var myCursor = db.bios.find( );

myCursor
```

#### With `next()` Method

The following example uses the cursor method [`next()`](https://www.mongodb.com/docs/manual/reference/method/cursor.next/#mongodb-method-cursor.next) to access the documents:

```
var myCursor = db.bios.find( );

var myDocument = myCursor.hasNext() ? myCursor.next() : null;

if (myDocument) {
    var myName = myDocument.name;
    print (tojson(myName));
}
```

To print, you can also use the `printjson()` method instead of `print(tojson())`:

```
if (myDocument) {
   var myName = myDocument.name;
   printjson(myName);
}
```

#### With `forEach()` Method

The following example uses the cursor method [`forEach()`](https://www.mongodb.com/docs/manual/reference/method/cursor.forEach/#mongodb-method-cursor.forEach) to iterate the cursor and access the documents:

```
var myCursor = db.bios.find( );

myCursor.forEach(printjson);
```

### Modify the Cursor Behavior

[`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) and the [drivers](https://www.mongodb.com/docs/drivers/) provide several cursor methods that call on the *cursor* returned by the [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method to modify its behavior.

#### Order Documents in the Result Set

The [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) method orders the documents in the result set. The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) sorted in ascending order by the `name` field:

```
db.bios.find().sort( { name: 1 } )
```

[`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) corresponds to the `ORDER BY` statement in SQL.

#### Limit the Number of Documents to Return

The [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) method limits the number of documents in the result set. The following operation returns at most `5` documents in the [bios collection:](https://www.mongodb.com/docs/manual/reference/bios-example-collection/)

```
db.bios.find().limit( 5 )
```

[`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) corresponds to the `LIMIT` statement in SQL.

#### Set the Starting Point of the Result Set

The [`skip()`](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#mongodb-method-cursor.skip) method controls the starting point of the results set. The following operation skips the first `5` documents in the [bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/) and returns all remaining documents:

```
db.bios.find().skip( 5 )
```

#### Specify Collation

[Collation](https://www.mongodb.com/docs/manual/reference/collation/) allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.

The [`collation()`](https://www.mongodb.com/docs/manual/reference/method/cursor.collation/#mongodb-method-cursor.collation) method specifies the [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) for the [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) operation.

```
db.bios.find( { "name.last": "hopper" } ).collation( { locale: "en_US", strength: 1 } )
```

#### Combine Cursor Methods

The following statements chain cursor methods [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) and [`sort()`:](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort)

```
db.bios.find().sort( { name: 1 } ).limit( 5 )
db.bios.find().limit( 5 ).sort( { name: 1 } )
```

The two statements are equivalent; i.e. the order in which you chain the [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) and the [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) methods is not significant. Both statements return the first five documents, as determined by the ascending sort order on 'name'.

### Use Variables in `let` Option

You can specify query options to modify query behavior and indicate how results are returned.

For example, to define variables that you can access elsewhere in the `find` method, use the `let` option. To filter results using a variable, you must access the variable within the [`$expr`](https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr) operator.

Create a collection `cakeFlavors`:

```
db.cakeFlavors.insertMany( [
   { _id: 1, flavor: "chocolate" },
   { _id: 2, flavor: "strawberry" },
   { _id: 3, flavor: "cherry" }
] )
```

The following example defines a `targetFlavor` variable in `let` and uses the variable to retrieve the chocolate cake flavor:

```
db.cakeFlavors.find(
   { $expr: { $eq: [ "$flavor", "$$targetFlavor" ] } },
   { _id: 0 },
   { let : { targetFlavor: "chocolate" }
} )
```

Output:

```
[ { flavor: 'chocolate' } ]
```

To see all available query options, see [FindOptions.](https://mongodb.github.io/node-mongodb-native/4.0//interfaces/findoptions.html)