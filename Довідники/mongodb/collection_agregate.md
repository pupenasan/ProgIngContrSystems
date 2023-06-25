# db.collection.aggregate() 

```
db.collection.aggregate(pipeline, options)
```

Обчислює сукупні значення для даних у колекції або a  [view.](https://www.mongodb.com/docs/manual/core/views/)

| Parameter  | Type     | Description                                                  |
| ---------- | -------- | ------------------------------------------------------------ |
| `pipeline` | array    | Послідовність операцій або етапів агрегування даних. Перегляньте [оператори конвеєра агрегації](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/), щоб отримати докладніші відомості. Метод все одно може приймати етапи конвеєра як окремі аргументи, а не як елементи в масиві; однак, якщо ви не вкажете `pipeline` як масив, ви не зможете вказати параметр `options`. |
| `options`  | document | Опційно. Додаткові параметри, які [`aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) передає в [ `aggregate`](https://www.mongodb.com/docs/manual/reference/command/aggregate/#mongodb-dbcommand-dbcmd.aggregate). Доступно, лише якщо ви вкажете "конвеєр" як масив. |

Документ  `options`  може містити такі поля та значення:

`explain` (boolean) - Optional. Specifies to return the information on the processing of the pipeline. See [Return Information on Aggregation Pipeline Operation](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#std-label-example-aggregate-method-explain-option) for an example.Not available in [multi-document transactions.](https://www.mongodb.com/docs/manual/core/transactions/)

`allowDiskUse` (boolean) - Optional. Enables writing to temporary files. When set to `true`, aggregation operations can write data to the `_tmp` subdirectory in the [`dbPath`](https://www.mongodb.com/docs/manual/reference/configuration-options/#mongodb-setting-storage.dbPath) directory. See [Interaction with `allowDiskUseByDefault`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#std-label-example-aggregate-method-external-sort) for an example.Starting in MongoDB 4.2, the [profiler log messages](https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/) and [diagnostic log messages](https://www.mongodb.com/docs/manual/reference/log-messages/) includes a `usedDisk` indicator if any aggregation stage wrote data to temporary files due to [memory restrictions.](https://www.mongodb.com/docs/manual/core/aggregation-pipeline-limits/#std-label-agg-memory-restrictions)

`cursor` (document) - Optional. Specifies the *initial* batch size for the cursor. The value of the `cursor` field is a document with the field `batchSize`. See [Specify an Initial Batch Size](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#std-label-example-aggregate-method-initial-batch-size) for syntax and example.

`maxTimeMS` (non-negative integer) - Optional. Specifies a time limit in milliseconds for processing operations on a cursor. If you do not specify a value for maxTimeMS, operations will not time out. A value of `0` explicitly specifies the default unbounded behavior.MongoDB terminates operations that exceed their allotted time limit using the same mechanism as [`db.killOp()`](https://www.mongodb.com/docs/manual/reference/method/db.killOp/#mongodb-method-db.killOp). MongoDB only terminates an operation at one of its designated [interrupt points.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-interrupt-point)

`bypassDocumentValidation` (boolean) - Optional. Applicable only if you specify the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) aggregation stages.Enables [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) to bypass document validation during the operation. This lets you insert documents that do not meet the validation requirements.

`readConcern` (document) - Optional. Specifies the [read concern.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-read-concern)Starting in MongoDB 3.6, the readConcern option has the following syntax: `readConcern: { level: <value> }`Possible read concern levels are:[`"local"`](https://www.mongodb.com/docs/manual/reference/read-concern-local/#mongodb-readconcern-readconcern.-local-). This is the default read concern level for read operations against the primary and secondaries.[`"available"`](https://www.mongodb.com/docs/manual/reference/read-concern-available/#mongodb-readconcern-readconcern.-available-). Available for read operations against the primary and secondaries. [`"available"`](https://www.mongodb.com/docs/manual/reference/read-concern-available/#mongodb-readconcern-readconcern.-available-) behaves the same as [`"local"`](https://www.mongodb.com/docs/manual/reference/read-concern-local/#mongodb-readconcern-readconcern.-local-) against the primary and non-sharded secondaries. The query returns the instance's most recent data.[`"majority"`](https://www.mongodb.com/docs/manual/reference/read-concern-majority/#mongodb-readconcern-readconcern.-majority-). Available for replica sets that use [WiredTiger storage engine.](https://www.mongodb.com/docs/manual/core/wiredtiger/#std-label-storage-wiredtiger)[`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-). Available for read operations on the [`primary`](https://www.mongodb.com/docs/manual/reference/replica-states/#mongodb-replstate-replstate.PRIMARY) only.For more formation on the read concern levels, see [Read Concern Levels.](https://www.mongodb.com/docs/manual/reference/read-concern/#std-label-read-concern-levels)Starting in MongoDB 4.2, the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) stage cannot be used in conjunction with read concern [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-). That is, if you specify [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-) read concern for [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate), you cannot include the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) stage in the pipeline.The [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage cannot be used in conjunction with read concern [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-). That is, if you specify [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-) read concern for [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate), you cannot include the [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage in the pipeline.

[collation](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#std-label-method-collection-aggregate-collation) (document) - Optional. Specifies the [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation)  to use for the operation.[Collation](https://www.mongodb.com/docs/manual/reference/collation/) allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.The collation option has the following syntax:`collation: {   locale: <string>,   caseLevel: <boolean>,   caseFirst: <string>,   strength: <int>,   numericOrdering: <boolean>,   alternate: <string>,   maxVariable: <string>,   backwards: <boolean>}`. When specifying collation, the `locale` field is mandatory; all other collation fields are optional. For descriptions of the fields, see [Collation Document.](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation-document-fields)If the collation is unspecified but the collection has a default collation (see [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection)), the operation uses the collation specified for the collection.If no collation is specified for the collection or for the operations, MongoDB uses the simple binary comparison used in prior versions for string comparisons.You cannot specify multiple collations for an operation. For example, you cannot specify different collations per field, or if performing a find with a sort, you cannot use one collation for the find and another for the sort.

`hint` (string or document) - Optional. The index to use for the aggregation. The index is on the initial collection/view against which the aggregation is run.Specify the index either by the index name or by the index specification document.NoteThe `hint` does not apply to [`$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) and [`$graphLookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/#mongodb-pipeline-pipe.-graphLookup) stages.

`comment` (string) - Optional. Users can specify an arbitrary string to help trace the operation through the database profiler, currentOp, and logs.

`writeConcern` (document) - Optional. A document that expresses the [write concern](https://www.mongodb.com/docs/manual/reference/write-concern/) to use with the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage.Omit to use the default write concern with the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage.

`let` (document) - Optional.Specifies a document with a list of variables. This allows you to improve command readability by separating the variables from the query text.The document syntax is:`{ <variable_name_1>: <expression_1>,  ...,  <variable_name_n>: <expression_n> }`The variable is set to the value returned by the expression, and cannot be changed afterwards.To access the value of a variable in the command, use the double dollar sign prefix (`$$`) together with your variable name in the form `$$<variable_name>`. For example: `$$targetTotal`.

### Error Handling 

If an error occurs, the [`aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) helper throws an exception.

### Cursor Behavior 

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), if the cursor returned from the [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) is not assigned to a variable using the `var` keyword, then [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) automatically iterates the cursor up to 20 times. See [Iterate a Cursor in `mongosh`](https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/) for handling cursors in [`mongosh`.](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

Cursors returned from aggregation only supports cursor methods that operate on evaluated cursors (i.e. cursors whose first batch has been retrieved), such as the following methods:

### Sessions 

For cursors created inside a session, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) outside the session.

Similarly, for cursors created outside of a session, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) inside a session.

#### Session Idle Timeout 

MongoDB drivers and [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) associate all operations with a [server session](https://www.mongodb.com/docs/manual/reference/server-sessions/), with the exception of unacknowledged write operations. For operations not explicitly associated with a session (i.e. using [`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/#mongodb-method-Mongo.startSession)), MongoDB drivers and `mongosh` create an implicit session and associate it with the operation.

If a session is idle for longer than 30 minutes, the MongoDB server marks that session as expired and may close it at any time. When the MongoDB server closes the session, it also kills any in-progress operations and open cursors associated with the session. This includes cursors configured with [`noCursorTimeout()`](https://www.mongodb.com/docs/manual/reference/method/cursor.noCursorTimeout/#mongodb-method-cursor.noCursorTimeout) or a [`maxTimeMS()`](https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/#mongodb-method-cursor.maxTimeMS) greater than 30 minutes.

For operations that return a cursor, if the cursor may be idle for longer than 30 minutes, issue the operation within an explicit session using [`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/#mongodb-method-Mongo.startSession) and periodically refresh the session using the [`refreshSessions`](https://www.mongodb.com/docs/manual/reference/command/refreshSessions/#mongodb-dbcommand-dbcmd.refreshSessions) command. See [Session Idle Timeout](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Session-Idle-Timeout) for more information.

### Transactions 

[`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) can be used inside [multi-document transactions.](https://www.mongodb.com/docs/manual/core/transactions/)

However, the following stages are not allowed within transactions:

- [`$collStats`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/collStats/#mongodb-pipeline-pipe.-collStats)
- [`$currentOp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/currentOp/#mongodb-pipeline-pipe.-currentOp)
- [`$indexStats`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexStats/#mongodb-pipeline-pipe.-indexStats)
- [`$listLocalSessions`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listLocalSessions/#mongodb-pipeline-pipe.-listLocalSessions)
- [`$listSessions`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/listSessions/#mongodb-pipeline-pipe.-listSessions)
- [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out)
- [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge)
- [`$planCacheStats`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/planCacheStats/#mongodb-pipeline-pipe.-planCacheStats)

You also cannot specify the `explain` option.

- For cursors created outside of a transaction, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) inside the transaction.
- For cursors created in a transaction, you cannot call [`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) outside the transaction.

In most cases, multi-document transaction incurs a greater performance cost over single document writes, and the availability of multi-document transactions should not be a replacement for effective schema design. For many scenarios, the [denormalized data model (embedded documents and arrays)](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding) will continue to be optimal for your data and use cases. That is, for many scenarios, modeling your data appropriately will minimize the need for multi-document transactions.

For additional transactions usage considerations (such as runtime limit and oplog size limit), see also [Production Considerations.](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/)

### Client Disconnection 

For [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) operation that do not include the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stages:

Starting in MongoDB 4.2, if the client that issued [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) disconnects before the operation completes, MongoDB marks [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) for termination using [`killOp`.](https://www.mongodb.com/docs/manual/reference/command/killOp/#mongodb-dbcommand-dbcmd.killOp)

## Приклади

У наведених нижче прикладах використовується колекція `orders`, яка містить такі документи:

```js
{ _id: 1, cust_id: "abc1", ord_date: ISODate("2012-11-02T17:04:11.102Z"), status: "A", amount: 50 }
{ _id: 2, cust_id: "xyz1", ord_date: ISODate("2013-10-01T17:04:11.102Z"), status: "A", amount: 100 }
{ _id: 3, cust_id: "xyz1", ord_date: ISODate("2013-10-12T17:04:11.102Z"), status: "D", amount: 25 }
{ _id: 4, cust_id: "xyz1", ord_date: ISODate("2013-10-11T17:04:11.102Z"), status: "D", amount: 125 }
{ _id: 5, cust_id: "abc1", ord_date: ISODate("2013-11-12T17:04:11.102Z"), status: "A", amount: 25 }
```

### Групування та обчислення суми

Наступна операція агрегування вибирає документи зі статусом `status == "A"`, групує відповідні документи за полем `cust_id` і обчислює `total` для кожного поля `cust_id` із суми поля `amount` і сортує результати за полем `total` в порядку спадання:

```js
db.orders.aggregate([
                     { $match: { status: "A" } },
                     { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
                     { $sort: { total: -1 } }
                   ])
```

Операція повертає курсор із такими документами:

```js
{ "_id" : "xyz1", "total" : 100 }
{ "_id" : "abc1", "total" : 75 }
```

[`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) автоматично повторює повернутий курсор, щоб надрукувати результати. Перегляньте [Ітерація курсору в `mongosh`](https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/) для обробки курсорів вручну в [`mongosh`.](https:// www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

### Повернення інформації про роботу конвеєра агрегації 

У наступному прикладі використовується [`db.collection.explain()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.explain/#mongodb-method-db.collection.explain ), щоб переглянути детальну інформацію щодо плану виконання конвеєра агрегації.

```js
db.orders.explain().aggregate([
   { $match: { status: "A" } },
   { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
   { $sort: { total: -1 } }
])
```

Операція повертає документ із детальною інформацією про обробку конвеєра агрегації. Наприклад, документ може показувати, серед інших деталей, який індекс, якщо такий є, використаної операції. [[1\]](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#footnote-agg-index-filters) Якщо колекція `orders` є сегментованою колекцією , документ також показуватиме розподіл праці між шардами та операцією злиття, а для цільових запитів — цільові шарди.

Передбачувані читачі вихідного документа `explain` — це люди, а не машини, і вихідний формат може змінюватися між випусками.

Ви можете переглянути докладніші пояснювальні виводи, передавши режими пояснення `executionStats` або `allPlansExecution` до [`db.collection.explain()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.explain/#mongodb-method-db.collection.explain) метод.

### Взаємодія з `allowDiskUseByDefault` 

Починаючи з MongoDB 6.0, етапи конвеєра, які вимагають більше 100 мегабайт пам’яті для виконання, записують тимчасові файли на диск за замовчуванням. У попередніх версіях MongoDB ви повинні передати `{ allowDiskUse: true }` окремим командам `find` і `aggregate`, щоб увімкнути цю поведінку.

Окремі команди `find` і `aggregate` можуть замінити параметр [`allowDiskUseByDefault`](https://www.mongodb.com/docs/manual/reference/parameters/#mongodb-parameter-param.allowDiskUseByDefault) одним із:

- Використання `{ allowDiskUse: true }`, щоб дозволити записувати тимчасові файли на диск, коли `allowDiskUseByDefault` має значення `false`
- Використання `{ allowDiskUse: false }` для заборони запису тимчасових файлів на диск, якщо `allowDiskUseByDefault` має значення `true`

Починаючи з MongoDB 4.2, [повідомлення журналу профайлера](https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/) і [повідомлення журналу діагностики](https://www. mongodb.com/docs/manual/reference/log-messages/) містить індикатор `usedDisk`, якщо будь-який етап агрегації записував дані до тимчасових файлів через [обмеження пам’яті.](https://www.mongodb.com/docs/ manual/core/aggregation-pipeline-limits/#std-label-agg-memory-restrictions)

### Вкажіть початковий розмір партії

Щоб указати початковий розмір пакету для курсора, використовуйте такий синтаксис для параметра `cursor`:

```
cursor: { batchSize: <int> }
```

Наприклад, наступна операція агрегування вказує *початковий* розмір пакета `0` для курсора:

```
db.orders.aggregate(
                     [
                       { $match: { status: "A" } },
                       { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
                       { $sort: { total: -1 } },
                       { $limit: 2 }
                     ],
                     {
                       cursor: { batchSize: 0 }
                     }
                   )
```

`batchSize`, який має значення `0`, означає порожній перший пакет і корисний для швидкого повернення курсору або повідомлення про помилку без виконання значної роботи на стороні сервера. Укажіть наступні розміри пакетів для операцій [OP_GET_MORE](https://www.mongodb.com/docs/manual/legacy-opcodes/#std-label-wire-op-get-more), як і з іншими курсорами MongoDB.

[`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) автоматично повторює повернутий курсор, щоб надрукувати результати. Перегляньте [Ітерація курсору в `mongosh`](https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/) для обробки курсорів вручну в [`mongosh`.](https:// www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

### Вказівка сортування

[Collation](https://www.mongodb.com/docs/manual/reference/collation/) дозволяє користувачам вказувати правила порівняння рядків для певної мови, наприклад правила для літер і знаків наголосу.

Колекція `myColl` містить такі документи:

```js
{ _id: 1, category: "café", status: "A" }
{ _id: 2, category: "cafe", status: "a" }
{ _id: 3, category: "cafE", status: "a" }
```

Наступна операція агрегування включає параметр [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation):

```js
db.myColl.aggregate(
   [ { $match: { status: "A" } }, { $group: { _id: "$category", count: { $sum: 1 } } } ],
   { collation: { locale: "fr", strength: 1 } }
);
```

Якщо виконується агрегування, яке включає кілька переглядів, наприклад [`$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup ) або [`$graphLookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/graphLookup/#mongodb-pipeline-pipe.-graphLookup), перегляди повинні мати однакові [collation .](https://www.mongodb.com/docs/manual/reference/collation/)

Опис полів зіставлення див. у [Collation Document.](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation-document-fields)

### Hint an Index 

Створіть колекцію `foodColl` з такими документами:

```js
db.foodColl.insertMany( [
   { _id: 1, category: "cake", type: "chocolate", qty: 10 },
   { _id: 2, category: "cake", type: "ice cream", qty: 25 },
   { _id: 3, category: "pie", type: "boston cream", qty: 20 },
   { _id: 4, category: "pie", type: "blueberry", qty: 15 }
] )
```

Створіть такі індекси:

```js
db.foodColl.createIndex( { qty: 1, type: 1 } );
db.foodColl.createIndex( { qty: 1, category: 1 } );
```

Наступна операція агрегації включає опцію `hint` для примусового використання вказаного індексу:

```js
db.foodColl.aggregate(
   [ { $sort: { qty: 1 }}, { $match: { category: "cake", qty: 10  } }, { $sort: { type: -1 } } ],
   { hint: { qty: 1, category: 1 } }
)
```

### Override `readConcern` 

Use the `readConcern` option to specify the read concern for the operation.

You cannot use the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or the [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage in conjunction with read concern [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-). That is, if you specify [`"linearizable"`](https://www.mongodb.com/docs/manual/reference/read-concern-linearizable/#mongodb-readconcern-readconcern.-linearizable-) read concern for [`db.collection.aggregate()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate), you cannot include either stages in the pipeline.

The following operation on a replica set specifies a [Read Concern](https://www.mongodb.com/docs/manual/reference/read-concern/) of [`"majority"`](https://www.mongodb.com/docs/manual/reference/read-concern-majority/#mongodb-readconcern-readconcern.-majority-) to read the most recent copy of the data confirmed as having been written to a majority of the nodes.

- To ensure that a single thread can read its own writes, use [`"majority"`](https://www.mongodb.com/docs/manual/reference/read-concern-majority/#mongodb-readconcern-readconcern.-majority-) read concern and [`"majority"`](https://www.mongodb.com/docs/manual/reference/write-concern/#mongodb-writeconcern-writeconcern.-majority-) write concern against the primary of the replica set.
- Starting in MongoDB 4.2, you can specify [read concern](https://www.mongodb.com/docs/manual/reference/read-concern/) level [`"majority"`](https://www.mongodb.com/docs/manual/reference/read-concern-majority/#mongodb-readconcern-readconcern.-majority-) for an aggregation that includes an [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) stage.
- Regardless of the [read concern](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-read-concern) level, the most recent data on a node may not reflect the most recent version of the data in the system.

```
db.restaurants.aggregate(
   [ { $match: { rating: { $lt: 5 } } } ],
   { readConcern: { level: "majority" } }
)
```

### Specify a Comment 

A collection named `movies` contains documents formatted as such:

```
{
  "_id" : ObjectId("599b3b54b8ffff5d1cd323d8"),
  "title" : "Jaws",
  "year" : 1975,
  "imdb" : "tt0073195"
}
```

The following aggregation operation finds movies created in 1995 and includes the `comment` option to provide tracking information in the `logs`, the `db.system.profile` collection, and `db.currentOp`.

```
db.movies.aggregate( [ { $match: { year : 1995 } } ], { comment : "match_all_movies_from_1995" } ).pretty()
```

On a system with profiling enabled, you can then query the `system.profile` collection to see all recent similar aggregations, as shown below:

```
db.system.profile.find( { "command.aggregate": "movies", "command.comment" : "match_all_movies_from_1995" } ).sort( { ts : -1 } ).pretty()
```

This will return a set of profiler results in the following format:

```
{
  "op" : "command",
  "ns" : "video.movies",
  "command" : {
    "aggregate" : "movies",
    "pipeline" : [
      {
        "$match" : {
          "year" : 1995
        }
      }
    ],
    "comment" : "match_all_movies_from_1995",
    "cursor" : {

    },
    "$db" : "video"
  },
  ...
}
```

An application can encode any arbitrary information in the comment in order to more easily trace or identify specific operations through the system. For instance, an application might attach a string comment incorporating its process ID, thread ID, client hostname, and the user who issued the command.

### Use Variables in `let` 

*New in version 5.0*.

To define variables that you can access elsewhere in the command, use the [let](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/#std-label-db.collection.aggregate-let-option) option.

To filter results using a variable in a pipeline [`$match`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) stage, you must access the variable within the [`$expr`](https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr) operator.

Create a collection `cakeSales` containing sales for cake flavors:

```
db.cakeSales.insertMany( [
   { _id: 1, flavor: "chocolate", salesTotal: 1580 },
   { _id: 2, flavor: "strawberry", salesTotal: 4350 },
   { _id: 3, flavor: "cherry", salesTotal: 2150 }
] )
```

The following example:

- retrieves the cake that has a `salesTotal` greater than 3000, which is the cake with an `_id` of 2
- defines a `targetTotal` variable in `let`, which is referenced in `$gt` as `$$targetTotal`

```
db.cakeSales.aggregate(
   [
      { $match: {
         $expr: { $gt: [ "$salesTotal", "$$targetTotal" ] }
      } }
   ],
   { let: { targetTotal: 3000 } }
)
```