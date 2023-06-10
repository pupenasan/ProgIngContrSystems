https://www.mongodb.com/docs/manual/reference/method/db.collection.update/

# Метод db.collection.update

`db.collection.update(query, update, options)`

Змінює існуючий документ або документи в колекції. Метод може змінювати певні поля наявного документа або документів або повністю замінювати існуючий документ, залежно від [update parameter.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-parameter) За замовчуванням `db.collection.update()` метод оновлює **окремий** документ. Додайте опцію [multi: true](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-multi-parameter), щоб оновити всі документи, які відповідають запиту критерії.

## Syntax

Метод  `db.collection.update()` має такий вигляд:

```js
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>,
     collation: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>, // Added in MongoDB 4.2
     let: <document> // Added in MongoDB 5.0
   }
)
```

### Параметри

Метод `db.collection.update()` приймає такі параметри:

[query](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-query)  (document)  - Критерії відбору для оновлення. Ті самі [селектори запитів](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors), що й у [`find()`](https:/ /www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) метод доступний. Коли ви виконуєте [`update()`](https: //www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) з `upsert: true` і запит не відповідає жодному існуючому документу, MongoDB відмовить щоб вставити новий документ, якщо запит визначає умови в полі `_id` за допомогою [крапкової нотації.](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation)

[update](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-parameter)  (document or pipeline) - Зміни, які необхідно застосувати.

[upsert](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert)  (boolean)  - Optional. Якщо `true`, [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) або: Створює новий документ, якщо жоден документ не відповідає запиту. Щоб отримати докладніші відомості, перегляньте [поведінка upsert.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-behavior) Оновлює один документ, який відповідає `query`. Якщо і `upsert`, і `multi` є істинними та жоден документ не відповідає запиту, операція оновлення вставляє лише один документ. Щоб уникнути кількох [upserts](https://www.mongodb.com/docs/ manual/reference/glossary/#std-term-upsert), переконайтеся, що поля `query` [унікально проіндексовані](https://www.mongodb.com/docs/manual/core/index-unique/ #std-label-index-type-unique). Перегляньте приклад [Upsert with Unique Index](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-with-unique-indexes). на `false`, що *не* вставляє новий документ, якщо не знайдено відповідності.

[multi](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-multi)  (boolean) - Optional. Якщо встановлено значення `true`, оновлюється кілька документів, які відповідають критеріям `query`. Якщо встановлено значення `false`, оновлюється один документ. Значенням за замовчуванням є `false`. Для отримання додаткової інформації див. [Приклади оновлення кількох документів.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-multi-parameter)

[writeConcern](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-wc)  (document)  Optional. Документ, який виражає [write concern](https://www.mongodb.com/docs/manual/reference/write-concern/). Не використовуйте параметр запису за замовчуванням `w:1`. Не встановлюйте явно параметр запису для операції, якщо вона виконується в транзакції. Щоб використовувати функцію запису з транзакціями, див. [Трансакції та проблема запису.](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions-write-concern) Для прикладу використання ` writeConcern`, див. [Перевизначити значення за умовчанням щодо запису.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-example-update-write-concern)

[collation](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-collation)  (document)  Optional. [Collation](https://www.mongodb.com/docs/manual/reference/collation/) дозволяє користувачам вказувати правила порівняння рядків для певної мови, наприклад правила для літер і наголосів. Для прикладу використання `collation `, див. [Укажіть сортування.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-example-update-collation)

[arrayFilters](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-array-filters)  (array)  Optional. Масив документів фільтрів, які визначають, які елементи масиву потрібно змінити для операції оновлення поля масиву. У [документі оновлення](https://www.mongodb.com/docs/manual/reference/method/db.collection. update/#std-label-update-parameter), використовуйте [`$[]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--), щоб визначити ідентифікатор для оновлення лише тих елементів масиву, які відповідають відповідному документу фільтра в `arrayFilters`.

[hint](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-hint)  (Document or string)  Optional. Документ або рядок, який визначає [індекс](https://www.mongodb.com/docs/manual/indexes/) для підтримки [предиката запиту.](https://www.mongodb.com/docs /manual/reference/method/db.collection.update/#std-label-update-query) Параметр може приймати документ із специфікацією індексу або рядок назви індексу. Якщо вказати індекс, якого не існує, під час операції виникають помилки. Для прикладу див. [Вкажіть `підказку` для операцій оновлення.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-ex-update-hint). )*Нове у версії 4.2*.

[let](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-db.collection.update-let-syntax)  (document) Optional. Визначає документ зі списком змінних. Це дозволяє покращити читабельність команд, відокремлюючи змінні від тексту запиту. Синтаксис документа такий:`{ <ім’я_змінної_1>: <вираз_1>, ..., <ім’я_змінної_n>: <вираз_n> }`Змінна встановлена на значення, яке повертає вираз, і його не можна змінити згодом. Щоб отримати доступ до значення змінної в команді, використовуйте префікс подвійного знака долара (`$$`) разом із назвою змінної у формі `$$<назва_змінної>`. . Наприклад: `$$targetTotal`.



NoteTo use a variable to filter results, you must access the variable within the [`$expr`](https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr) operator.For a complete example using `let` and variables, see [Use Variables in `let`.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-db.collection.update-let-example)*New in version 5.0*.

### Returns

The method returns a [WriteResult](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-writeresults-update) document that contains the status of the operation.

## Access Control

On deployments running with [`authorization`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-security.authorization), the user must have access that includes the following privileges:

- [`update`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-update) action on the specified collection(s).
- [`find`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-find) action on the specified collection(s).
- [`insert`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-insert) action on the specified collection(s) if the operation results in an upsert.

The built-in role [`readWrite`](https://www.mongodb.com/docs/manual/reference/built-in-roles/#mongodb-authrole-readWrite) provides the required privileges.

## Behavior

### Using `$expr` in an Update with `Upsert`

Attempting to use the [$expr](https://www.mongodb.com/docs/manual/reference/operator/query/expr/) operator with the upsert flag set to `true` will generate an error.

### Sharded Collections

To use `db.collection.update()`with `multi: false` on a sharded collection, you must include an exact match on the `_id` field or target a single shard (such as by including the shard key).

When the `db.collection.update()`performs update operations (and not document replacement operations), `db.collection.update()`can target multiple shards.

[`findAndModify()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify)

#### Replace Document Operations on a Sharded Collection

Starting in MongoDB 4.2, replace document operations attempt to target a single shard, first by using the query filter. If the operation cannot target a single shard by the query filter, it then attempts to target by the replacement document.

In earlier versions, the operation attempts to target using the replacement document.

#### `upsert` on a Sharded Collection

For a `db.collection.update()`operation that includes [upsert: true](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert) and is on a sharded collection, you must include the full shard key in the `filter`:

- For an update operation.
- For a replace document operation (starting in MongoDB 4.2).

However, starting in version 4.4, documents in a sharded collection can be [missing the shard key fields](https://www.mongodb.com/docs/manual/core/sharding-shard-key/#std-label-shard-key-missing). To target a document that is missing the shard key, you can use the `null` equality match **in conjunction with** another filter condition (such as on the `_id` field). For example:

```
{ _id: <value>, <shardkeyfield>: null } // _id of the document missing shard key
```

#### Shard Key Modification

Starting in MongoDB 4.2, you can update a document's shard key value unless the shard key field is the immutable `_id` field. In MongoDB 4.2 and earlier, a document's shard key field value is immutable.

To modify the **existing** shard key value with [`db.collection.update()`:](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update)

- You **must** run on a [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos). Do **not** issue the operation directly on the shard.
- You **must** run either in a [transaction](https://www.mongodb.com/docs/manual/core/transactions/) or as a [retryable write.](https://www.mongodb.com/docs/manual/core/retryable-writes/)
- You **must** specify `multi: false`.
- You **must** include an equality [query filter](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-query) on the full shard key.

Since a missing key value is returned as part of a null equality match, to avoid updating a null-valued key, include additional query conditions (such as on the `_id` field) as appropriate.

See also [`upsert` on a Sharded Collection.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-method-update-sharded-upsert)

#### Missing Shard Key

Starting in version 4.4, documents in a sharded collection can be [missing the shard key fields](https://www.mongodb.com/docs/manual/core/sharding-shard-key/#std-label-shard-key-missing). To use `db.collection.update()`to set the document's **missing** shard key, you **must** run on a [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos). Do **not** issue the operation directly on the shard.

In addition, the following requirements also apply:

| Task                         | Requirements                                                 |
| ---------------------------- | ------------------------------------------------------------ |
| To set to `null`             | Can specify `multi: true`.Requires equality filter on the full shard key if `upsert: true`. |
| To set to a non-`null` value | **Must** be performed either inside a [transaction](https://www.mongodb.com/docs/manual/core/transactions/) or as a [retryable write.](https://www.mongodb.com/docs/manual/core/retryable-writes/)**Must** specify `multi: false`.Requires equality filter on the full shard key if either:`upsert: true`, orif using a replacement document and the new shard key value belongs to a different shard. |

Since a missing key value is returned as part of a null equality match, to avoid updating a null-valued key, include additional query conditions (such as on the `_id` field) as appropriate.

See also:

- [`upsert` on a Sharded Collection](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-method-update-sharded-upsert)
- [Missing Shard Key Fields](https://www.mongodb.com/docs/manual/core/sharding-shard-key/#std-label-shard-key-missing)

### Transactions

`db.collection.update()`can be used inside [multi-document transactions.](https://www.mongodb.com/docs/manual/core/transactions/)

## Important

In most cases, multi-document transaction incurs a greater performance cost over single document writes, and the availability of multi-document transactions should not be a replacement for effective schema design. For many scenarios, the [denormalized data model (embedded documents and arrays)](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding) will continue to be optimal for your data and use cases. That is, for many scenarios, modeling your data appropriately will minimize the need for multi-document transactions.

For additional transactions usage considerations (such as runtime limit and oplog size limit), see also [Production Considerations.](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

#### Upsert within Transactions

Starting in MongoDB 4.4, you can create collections and indexes inside a [multi-document transaction](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions-create-collections-indexes) if the transaction is **not** a cross-shard write transaction.

Specifically, in MongoDB 4.4 and greater, `db.collection.update()`with `upsert: true` can be run on an existing collection or a non-existing collection. If run on a non-existing collection, the operation creates the collection.

In MongoDB 4.2 and earlier, the operation must be run on an existing collection.

### See also: 

[Create Collections and Indexes In a Transaction](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions-create-collections-indexes)

#### Write Concerns and Transactions

Do not explicitly set the write concern for the operation if run in a transaction. To use write concern with transactions, see [Transactions and Write Concern.](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions-write-concern)

## Examples

The following tabs showcase a variety of common [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operations.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), create a `books` collection which contains the following documents. This command first removes all previously existing documents from the `books` collection:

```
db.books.remove({});

db.books.insertMany([
  {
    "_id" : 1,
    "item" : "TBD",
    "stock" : 0,
    "info" : { "publisher" : "1111", "pages" : 430 },
    "tags" : [ "technology", "computer" ],
    "ratings" : [ { "by" : "ijk", "rating" : 4 }, { "by" : "lmn", "rating" : 5 } ],
    "reorder" : false
   },
   {
    "_id" : 2,
    "item" : "XYZ123",
    "stock" : 15,
    "info" : { "publisher" : "5555", "pages" : 150 },
    "tags" : [ ],
    "ratings" : [ { "by" : "xyz", "rating" : 5 } ],
    "reorder" : false
   }
]);
```

### Use Update Operator Expressions (`$inc` and `$set`)

If the `<update>` document contains [update operator](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators) modifiers, such as those using the [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) modifier, then:

- The `<update>` document must contain *only* [update operator](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators) expressions.
- The `db.collection.update()`method updates only the corresponding fields in the document.
  - To update an embedded document or an array as a whole, specify the replacement value for the field.
  - To update particular fields in an embedded document or in an array, use [dot notation](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation) to specify the field.

```
db.books.update(
   { _id: 1 },
   {
     $inc: { stock: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)
```

In this operation:

- The `<query>` parameter of `{ _id: 1 }` specifies which document to update,
- the [`$inc`](https://www.mongodb.com/docs/manual/reference/operator/update/inc/#mongodb-update-up.-inc) operator increments the `stock` field, and
- the [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) operator replaces the value of the
  - `item` field,
  - `publisher` field in the `info` embedded document,
  - `tags` field, and
  - second element in the `ratings` array.

The updated document is the following:

```
{
  "_id" : 1,
  "item" : "ABC123",
  "stock" : 5,
  "info" : { "publisher" : "2222", "pages" : 430 },
  "tags" : [ "software" ],
  "ratings" : [ { "by" : "ijk", "rating" : 4 }, { "by" : "xyz", "rating" : 3 } ],
  "reorder" : false
}
```

This operation corresponds to the following SQL statement:

```
UPDATE books
SET    stock = stock + 5
       item = "ABC123"
       publisher = 2222
       pages = 430
       tags = "software"
       rating_authors = "ijk,xyz"
       rating_values = "4,3"
WHERE  _id = 1
```

If the `query` parameter had matched multiple documents, this operation would only update one matching document. To update multiple documents, you must set the `multi` option to `true`.

### Insert a New Document if No Match Exists (`Upsert`)

When you specify the option [upsert: true:](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert)

- If document(s) match the query criteria, `db.collection.update()`performs an update.
- If no document matches the query criteria, `db.collection.update()`inserts a *single* document.

If multiple, identical [upserts](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-upsert) are issued at roughly the same time, it is possible for [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) used with [upsert: true](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert) to create duplicate documents. See [Upsert with Unique Index](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-with-unique-indexes) for more information.

If you specify `upsert: true` on a sharded collection, you must include the full shard key in the `filter`. For additional `db.collection.update()`behavior on a sharded collection, see [Sharded Collections.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-sharded-collection)

The following tabs showcase a variety of uses of the `upsert` modifier with [`update()`.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update)

#### Upsert with Replacement Document

If no document matches the query criteria and the `<update>` parameter is a replacement document (i.e., contains only field and value pairs), the update inserts a new document with the fields and values of the replacement document.

- If you specify an `_id` field in either the query parameter or replacement document, MongoDB uses that `_id` field in the inserted document.
- If you do not specify an `_id` field in either the query parameter or replacement document, MongoDB generates adds the `_id` field with a randomly generated [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) value.

You cannot specify different `_id` field values in the query parameter and replacement document. If you do, the operation errors.

For example, the following update sets the [upsert](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-parameter) option to `true`:

```
db.books.update(
   { item: "ZZZ135" },  // Query parameter
   { $set:
      {
         item: "ZZZ135", stock: 5, tags: [ "database" ]  // Replacement document
      }
   },
   { upsert: true }  // Options
)
```

If no document matches the `<query>` parameter, the update operation inserts a document with *only* the replacement document. Because no `_id` field was specified in the replacement document or query document, the operation creates a new unique `ObjectId` for the new document's `_id` field. You can see the `upsert` reflected in the [WriteResult](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-writeresults-update) of the operation:

```
WriteResult({
  "nMatched" : 0,
  "nUpserted" : 1,
  "nModified" : 0,
  "_id" : ObjectId("5da78973835b2f1c75347a83")
 })
```

The operation inserts the following document into the `books` collection (your [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) value will differ):

```
{
  "_id" : ObjectId("5da78973835b2f1c75347a83"),
  "item" : "ZZZ135",
  "stock" : 5,
  "tags" : [ "database" ]
}
```



#### Upsert with Unique Index

When using the [upsert: true](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-upsert) option with the [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) method, **and not** using a [unique index](https://www.mongodb.com/docs/manual/core/index-unique/#std-label-index-type-unique) on the query field(s), multiple instances of a [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operation with similar query field(s) could result in duplicate documents being inserted in certain circumstances.

Consider an example where no document with the name `Andy` exists and multiple clients issue the following command at roughly the same time:

```
db.people.update(
   { name: "Andy" },
   { $inc: { score: 1 } },
   {
     upsert: true,
     multi: true
   }
)
```

If all [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operations finish the query phase before any client successfully inserts data, **and** there is no [unique index](https://www.mongodb.com/docs/manual/core/index-unique/#std-label-index-type-unique) on the `name` field, each [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operation may result in an insert, creating multiple documents with `name: Andy`.

To ensure that only one such document is created, and the other [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operations update this new document instead, create a [unique index](https://www.mongodb.com/docs/manual/core/index-unique/#std-label-index-type-unique) on the `name` field. This guarantees that only one document with `name: Andy` is permitted in the collection.

With this unique index in place, the multiple [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operations now exhibit the following behavior:

- Exactly one [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operation will successfully insert a new document.
- All other [`update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#mongodb-method-db.collection.update) operations will update the newly-inserted document, incrementing the `score` value.

### Update with Aggregation Pipeline

Starting in MongoDB 4.2, the `db.collection.update()`method can accept an [aggregation pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/) `[ <stage1>, <stage2>, ... ]` that specifies the modifications to perform. The pipeline can consist of the following stages:

- [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields) and its alias [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set)
- [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) and its alias [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)
- [`$replaceRoot`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceRoot/#mongodb-pipeline-pipe.-replaceRoot) and its alias [`$replaceWith`.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceWith/#mongodb-pipeline-pipe.-replaceWith)

Using the aggregation pipeline allows for a more expressive update statement, such as expressing conditional updates based on current field values or updating one field using the value of another field(s).

#### Modify a Field Using the Values of the Other Fields in the Document

Create a `members` collection with the following documents:

```
db.members.insertMany( [
   { "_id" : 1, "member" : "abc123", "status" : "A", "points" : 2, "misc1" : "note to self: confirm status", "misc2" : "Need to activate", "lastUpdate" : ISODate("2019-01-01T00:00:00Z") },
   { "_id" : 2, "member" : "xyz123", "status" : "A", "points" : 60, "misc1" : "reminder: ping me at 100pts", "misc2" : "Some random comment", "lastUpdate" : ISODate("2019-01-01T00:00:00Z") }
] )
```

Assume that instead of separate `misc1` and `misc2` fields, you want to gather these into a new `comments` field. The following update operation uses an aggregation pipeline to:

- add the new `comments` field and set the `lastUpdate` field.
- remove the `misc1` and `misc2` fields for all documents in the collection.

```
db.members.update(
   { },
   [
      { $set: { status: "Modified", comments: [ "$misc1", "$misc2" ], lastUpdate: "$$NOW" } },
      { $unset: [ "misc1", "misc2" ] }
   ],
   { multi: true }
)
```

The `$set` and `$unset` used in the pipeline refers to the aggregation stages [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) and [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset) respectively, and not the update operators [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) and [`$unset`.](https://www.mongodb.com/docs/manual/reference/operator/update/unset/#mongodb-update-up.-unset)

- First Stage

  The [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) stage:creates a new array field `comments` whose elements are the current content of the `misc1` and `misc2` fields andsets the field `lastUpdate` to the value of the aggregation variable [`NOW`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.NOW). The aggregation variable [`NOW`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.NOW) resolves to the current datetime value and remains the same throughout the pipeline. To access aggregation variables, prefix the variable with double dollar signs `$$` and enclose in quotes.

- Second Stage

  The [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset) stage removes the `misc1` and `misc2` fields.

After the command, the collection contains the following documents:

```
{ "_id" : 1, "member" : "abc123", "status" : "Modified", "points" : 2, "lastUpdate" : ISODate("2020-01-23T05:11:45.784Z"), "comments" : [ "note to self: confirm status", "Need to activate" ] }
{ "_id" : 2, "member" : "xyz123", "status" : "Modified", "points" : 60, "lastUpdate" : ISODate("2020-01-23T05:11:45.784Z"), "comments" : [ "reminder: ping me at 100pts", "Some random comment" ] }
```

#### Perform Conditional Updates Based on Current Field Values

Create a `students3` collection with the following documents:

```
db.students3.insertMany( [
   { "_id" : 1, "tests" : [ 95, 92, 90 ], "lastUpdate" : ISODate("2019-01-01T00:00:00Z") },
   { "_id" : 2, "tests" : [ 94, 88, 90 ], "lastUpdate" : ISODate("2019-01-01T00:00:00Z") },
   { "_id" : 3, "tests" : [ 70, 75, 82 ], "lastUpdate" : ISODate("2019-01-01T00:00:00Z") }
] )
```

Using an aggregation pipeline, you can update the documents with the calculated grade average and letter grade.

```
db.students3.update(
   { },
   [
     { $set: { average : { $trunc: [ { $avg: "$tests" }, 0 ] }, lastUpdate: "$$NOW" } },
     { $set: { grade: { $switch: {
                           branches: [
                               { case: { $gte: [ "$average", 90 ] }, then: "A" },
                               { case: { $gte: [ "$average", 80 ] }, then: "B" },
                               { case: { $gte: [ "$average", 70 ] }, then: "C" },
                               { case: { $gte: [ "$average", 60 ] }, then: "D" }
                           ],
                           default: "F"
     } } } }
   ],
   { multi: true }
)
```

The `$set` used in the pipeline refers to the aggregation stage [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set), and not the update operators [`$set`.](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set)

- First Stage

  The [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) stage:calculates a new field `average` based on the average of the `tests` field. See [`$avg`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg) for more information on the `$avg` aggregation operator and [`$trunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/trunc/#mongodb-expression-exp.-trunc) for more information on the  `$trunc` truncate aggregation operator.sets the field `lastUpdate` to the value of the aggregation variable [`NOW`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.NOW). The aggregation variable [`NOW`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.NOW) resolves to the current datetime value and remains the same throughout the pipeline. To access aggregation variables, prefix the variable with double dollar signs `$$` and enclose in quotes.

- Second Stage

  The [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) stage calculates a new field `grade` based on the `average` field calculated in the previous stage. See [`$switch`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/switch/#mongodb-expression-exp.-switch) for more information on the `$switch` aggregation operator.

After the command, the collection contains the following documents:

```
{ "_id" : 1, "tests" : [ 95, 92, 90 ], "lastUpdate" : ISODate("2020-01-24T17:29:35.340Z"), "average" : 92, "grade" : "A" }
{ "_id" : 2, "tests" : [ 94, 88, 90 ], "lastUpdate" : ISODate("2020-01-24T17:29:35.340Z"), "average" : 90, "grade" : "A" }
{ "_id" : 3, "tests" : [ 70, 75, 82 ], "lastUpdate" : ISODate("2020-01-24T17:29:35.340Z"), "average" : 75, "grade" : "C" }
```

### Specify `arrayFilters` for Array Update Operations

In the update document, use the [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) filtered positional operator to define an identifier, which you then reference in the array filter documents. You cannot have an array filter document for an identifier if the identifier is not included in the update document.

The `<identifier>` must begin with a lowercase letter and contain only alphanumeric characters.

You can include the same identifier multiple times in the update document; however, for each distinct identifier (`$[identifier]`) in the update document, you must specify **exactly one** corresponding array filter document. That is, you cannot specify multiple array filter documents for the same identifier. For example, if the update statement includes the identifier `x` (possibly multiple times), you cannot specify the following for `arrayFilters` that includes 2 separate filter documents for `x`:

```
// INVALID

[
  { "x.a": { $gt: 85 } },
  { "x.b": { $gt: 80 } }
]
```

However, you can specify compound conditions on the same identifier in a single filter document, such as in the following examples:

```
// Example 1
[
  { $or: [{"x.a": {$gt: 85}}, {"x.b": {$gt: 80}}] }
]
// Example 2
[
  { $and: [{"x.a": {$gt: 85}}, {"x.b": {$gt: 80}}] }
]
// Example 3
[
  { "x.a": { $gt: 85 }, "x.b": { $gt: 80 } }
]
```

`arrayFilters` is not available for updates that use an aggregation pipeline.

#### Update Elements Match `arrayFilters` Criteria

To update all array elements which match a specified criteria, use the [arrayFilters](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-array-filters) parameter.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), create a `students` collection with the following documents:

```
db.students.insertMany( [
   { "_id" : 1, "grades" : [ 95, 92, 90 ] },
   { "_id" : 2, "grades" : [ 98, 100, 102 ] },
   { "_id" : 3, "grades" : [ 95, 110, 100 ] }
] )
```

To update all elements that are greater than or equal to `100` in the `grades` array, use the filtered positional operator [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) with the `arrayFilters` option:

```
db.students.update(
   { grades: { $gte: 100 } },
   { $set: { "grades.$[element]" : 100 } },
   {
     multi: true,
     arrayFilters: [ { "element": { $gte: 100 } } ]
   }
)
```

After the operation, the collection contains the following documents:

```
{ "_id" : 1, "grades" : [ 95, 92, 90 ] }
{ "_id" : 2, "grades" : [ 98, 100, 100 ] }
{ "_id" : 3, "grades" : [ 95, 100, 100 ] }
```

#### Update Specific Elements of an Array of Documents

You can also use the [arrayFilters](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-array-filters) parameter to update specific document fields within an array of documents.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), create a `students2` collection with the following documents:

```
db.students2.insertMany( [
  {
    "_id" : 1,
    "grades" : [
       { "grade" : 80, "mean" : 75, "std" : 6 },
       { "grade" : 85, "mean" : 90, "std" : 4 },
       { "grade" : 85, "mean" : 85, "std" : 6 }
    ]
  },
  {
     "_id" : 2,
     "grades" : [
        { "grade" : 90, "mean" : 75, "std" : 6 },
        { "grade" : 87, "mean" : 90, "std" : 3 },
        { "grade" : 85, "mean" : 85, "std" : 4 }
     ]
  }
] )
```

To modify the value of the `mean` field for all elements in the `grades` array where the grade is greater than or equal to `85`, use the filtered positional operator [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) with the `arrayFilters`:

```
db.students2.update(
   { },
   { $set: { "grades.$[elem].mean" : 100 } },
   {
     multi: true,
     arrayFilters: [ { "elem.grade": { $gte: 85 } } ]
   }
)
```

After the operation, the collection has the following documents:

```
{
   "_id" : 1,
   "grades" : [
      { "grade" : 80, "mean" : 75, "std" : 6 },
      { "grade" : 85, "mean" : 100, "std" : 4 },
      { "grade" : 85, "mean" : 100, "std" : 6 }
   ]
}
{
   "_id" : 2,
   "grades" : [
      { "grade" : 90, "mean" : 100, "std" : 6 },
      { "grade" : 87, "mean" : 100, "std" : 3 },
      { "grade" : 85, "mean" : 100, "std" : 4 }
   ]
}
```



### Specify `hint` for Update Operations

*New in version 4.2*.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), create a `newMembers` collection with the following documents:

```
db.newMembers.insertMany( [
   { "_id" : 1, "member" : "abc123", "status" : "P", "points" :  0,  "misc1" : null, "misc2" : null },
   { "_id" : 2, "member" : "xyz123", "status" : "A", "points" : 60,  "misc1" : "reminder: ping me at 100pts", "misc2" : "Some random comment" },
   { "_id" : 3, "member" : "lmn123", "status" : "P", "points" :  0,  "misc1" : null, "misc2" : null },
   { "_id" : 4, "member" : "pqr123", "status" : "D", "points" : 20,  "misc1" : "Deactivated", "misc2" : null },
   { "_id" : 5, "member" : "ijk123", "status" : "P", "points" :  0,  "misc1" : null, "misc2" : null },
   { "_id" : 6, "member" : "cde123", "status" : "A", "points" : 86,  "misc1" : "reminder: ping me at 100pts", "misc2" : "Some random comment" }
] )
```

Create the following indexes on the collection:

```
db.newMembers.createIndex( { status: 1 } )
db.newMembers.createIndex( { points: 1 } )
```

The following update operation explicitly [hints](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-update-hint) to use the index `{status: 1 }`:

If you specify an index that does not exist, the operation errors.

```
db.newMembers.update(
   { points: { $lte: 20 }, status: "P" },     // Query parameter
   { $set: { misc1: "Need to activate" } },   // Update document
   { multi: true, hint: { status: 1 } }       // Options
)
```

The update command returns the following:

```
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
```

To see the index used, run [`explain`](https://www.mongodb.com/docs/manual/reference/command/explain/#mongodb-dbcommand-dbcmd.explain) on the operation:

```
db.newMembers.explain().update(
   { "points": { $lte: 20 }, "status": "P" },
   { $set: { "misc1": "Need to activate" } },
   { multi: true, hint: { status: 1 } }
)
```

The [`db.collection.explain().update()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.explain/#mongodb-method-db.collection.explain) does not modify the documents.

### Use Variables in `let`

*New in version 5.0*.

To define variables that you can access elsewhere in the command, use the [let](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-db.collection.update-let-syntax) option.

To filter results using a variable, you must access the variable within the [`$expr`](https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr) operator.

Create a collection `cakeFlavors`:

```
db.cakeFlavors.insertMany( [
   { _id: 1, flavor: "chocolate" },
   { _id: 2, flavor: "strawberry" },
   { _id: 3, flavor: "cherry" }
] )
```

The following example defines `targetFlavor` and `newFlavor` variables in `let` and uses the variables to change the cake flavor from cherry to orange:

```
db.cakeFlavors.update(
   { $expr: { $eq: [ "$flavor", "$$targetFlavor" ] } },
   [ { $set: { flavor: "$$newFlavor" } } ],
   { let : { targetFlavor: "cherry", newFlavor: "orange" } }
)
```



### Override Default Write Concern

The following operation to a replica set specifies a [write concern](https://www.mongodb.com/docs/manual/reference/write-concern/) of `w: 2` with a `wtimeout` of 5000 milliseconds. This operation either returns after the write propagates to both the primary and one secondary, or times out after 5 seconds.

```
db.books.update(
   { stock: { $lte: 10 } },
   { $set: { reorder: true } },
   {
     multi: true,
     writeConcern: { w: 2, wtimeout: 5000 }
   }
)
```



### Specify Collation

Specifies the [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation)  to use for the operation.

[Collation](https://www.mongodb.com/docs/manual/reference/collation/) allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.

The collation option has the following syntax:

```
collation: {
   locale: <string>,
   caseLevel: <boolean>,
   caseFirst: <string>,
   strength: <int>,
   numericOrdering: <boolean>,
   alternate: <string>,
   maxVariable: <string>,
   backwards: <boolean>
}
```

When specifying collation, the `locale` field is mandatory; all other collation fields are optional. For descriptions of the fields, see [Collation Document.](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation-document-fields)

If the collation is unspecified but the collection has a default collation (see [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection)), the operation uses the collation specified for the collection.

If no collation is specified for the collection or for the operations, MongoDB uses the simple binary comparison used in prior versions for string comparisons.

You cannot specify multiple collations for an operation. For example, you cannot specify different collations per field, or if performing a find with a sort, you cannot use one collation for the find and another for the sort.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), create a collection named `myColl` with the following documents:

```
db.myColl.insertMany( [
    { _id: 1, category: "café", status: "A" },
    { _id: 2, category: "cafe", status: "a" },
    { _id: 3, category: "cafE", status: "a" }
] )
```

The following operation includes the [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) option and sets `multi` to `true` to update all matching documents:

```
db.myColl.update(
   { category: "cafe" },
   { $set: { status: "Updated" } },
   {
     collation: { locale: "fr", strength: 1 },
     multi: true
   }
)
```

The [write result](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-writeresults-update) of the operation returns the following document, indicating that all three documents in the collection were updated:

```
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
```

After the operation, the collection contains the following documents:

```
{ "_id" : 1, "category" : "café", "status" : "Updated" }
{ "_id" : 2, "category" : "cafe", "status" : "Updated" }
{ "_id" : 3, "category" : "cafE", "status" : "Updated" }
```



## WriteResult

### Successful Results

The `db.collection.update()`method returns a [`WriteResult()`](https://www.mongodb.com/docs/manual/reference/method/WriteResult/#mongodb-method-WriteResult) object that contains the status of the operation. Upon success, the [`WriteResult()`](https://www.mongodb.com/docs/manual/reference/method/WriteResult/#mongodb-method-WriteResult) object contains the number of documents that matched the query condition, the number of documents inserted by the update, and the number of documents modified:

```
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### Write Concern Errors

If the `db.collection.update()`method encounters write concern errors, the results include the [`WriteResult.writeConcernError`](https://www.mongodb.com/docs/manual/reference/method/WriteResult/#mongodb-data-WriteResult.writeConcernError) field:

*Changed in version 4.4*.

```
WriteResult({
   "nMatched" : 1,
   "nUpserted" : 0,
   "nModified" : 1,
   "writeConcernError": {
     "code" : 64,
     "errmsg" : "waiting for replication timed out",
     "errInfo" : {
       "wtimeout" : true,
       "writeConcern" : {
         "w" : "majority",
         "wtimeout" : 100,
         "provenance" : "getLastErrorDefaults"
       }
   }
})
```

The following table explains the possible values of `WriteResult.writeConcernError.provenance`:

| Provenance             | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `clientSupplied`       | The write concern was specified in the application.          |
| `customDefault`        | The write concern originated from a custom defined default value. See [`setDefaultRWConcern`.](https://www.mongodb.com/docs/manual/reference/command/setDefaultRWConcern/#mongodb-dbcommand-dbcmd.setDefaultRWConcern) |
| `getLastErrorDefaults` | The write concern originated from the replica set's [`settings.getLastErrorDefaults`](https://www.mongodb.com/docs/manual/reference/replica-configuration/#mongodb-rsconf-rsconf.settings.getLastErrorDefaults) field. |
| `implicitDefault`      | The write concern originated from the server in absence of all other write concern specifications. |

### Errors Unrelated to Write Concern

If the `db.collection.update()`method encounters a non-write concern error, the results include the [`WriteResult.writeError`](https://www.mongodb.com/docs/manual/reference/method/WriteResult/#mongodb-data-WriteResult.writeError) field:

```
WriteResult({
   "nMatched" : 0,
   "nUpserted" : 0,
   "nModified" : 0,
   "writeError" : {
      "code" : 7,
      "errmsg" : "could not contact primary for replica set shard-a"
   }
})
```