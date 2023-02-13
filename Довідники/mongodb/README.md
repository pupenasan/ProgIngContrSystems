# MongoDB

https://www.mongodb.com/try/download/community

Версія спільноти нашої розподіленої бази даних пропонує гнучку модель даних документів разом із підтримкою спеціальних запитів, вторинного індексування та агрегацій у реальному часі, щоб забезпечити ефективні способи доступу та аналізу ваших даних.

База даних також пропонується як повністю керована служба з [MongoDB Atlas](https://www.mongodb.com/atlas/database). Отримайте доступ до розширених функцій, таких як автоматичне масштабування, безсерверні екземпляри (у попередньому перегляді), повнотекстовий пошук і розподіл даних між регіонами та хмарами. Розгорніть за лічені хвилини в AWS, Google Cloud і/або Azure без завантажень.

https://www.mongodb.com/docs/manual/

## Вступ до MongoDB

Запис у MongoDB — це документ, який є структурою даних, що складається з пар полів і значень. Документи MongoDB схожі на об’єкти JSON. Значення полів можуть містити інші документи, масиви та масиви документів.

![A MongoDB document.](https://www.mongodb.com/docs/manual/images/crud-annotated-document.bakedsvg.svg)

Перевагами використання документів є:

- Документи відповідають рідним типам даних у багатьох мовах програмування.
- Вбудовані документи та масиви зменшують потребу у дорогих об'єднаннях.
- Динамічна схема підтримує плавний поліморфізм.

MongoDB зберігає документи в [колекціях](https://www.mongodb.com/docs/manual/core/databases-and-collections/#std-label-collections). Колекції аналогічні таблицям у реляційних базах даних.

Окрім колекцій, MongoDB підтримує:

- Лише для читання [Views](https://www.mongodb.com/docs/manual/core/views/) (Починаючи з MongoDB 3.4)
- [Матеріалізовані перегляди на вимогу](https://www.mongodb.com/docs/manual/core/materialized-views/) (Починаючи з MongoDB 4.2).

MongoDB забезпечує високу продуктивність збереження даних. Зокрема,

- Підтримка вбудованих моделей даних зменшує активність вводу-виводу в системі бази даних.
- Індекси підтримують швидші запити та можуть містити ключі з вбудованих документів і масивів.

The MongoDB Query API supports [read and write operations (CRUD)](https://www.mongodb.com/docs/manual/crud/) as well as:

- [Data Aggregation](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Text Search](https://www.mongodb.com/docs/manual/text-search/) and [Geospatial Queries.](https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/)

MongoDB's replication facility, called [replica set](https://www.mongodb.com/docs/manual/replication/), provides:

- *automatic* failover
- data redundancy.

A [replica set](https://www.mongodb.com/docs/manual/replication/) is a group of MongoDB servers that maintain the same data set, providing redundancy and increasing data availability.

MongoDB provides horizontal scalability as part of its *core* functionality:

- [Sharding](https://www.mongodb.com/docs/manual/sharding/#std-label-sharding-introduction) distributes data across a cluster of machines.
- Starting in 3.4, MongoDB supports creating [zones](https://www.mongodb.com/docs/manual/core/zone-sharding/#std-label-zone-sharding) of data based on the [shard key](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-shard-key). In a balanced cluster, MongoDB directs reads and writes covered by a zone only to those shards inside the zone. See the [Zones](https://www.mongodb.com/docs/manual/core/zone-sharding/#std-label-zone-sharding) manual page for more information.

MongoDB supports [multiple storage engines:](https://www.mongodb.com/docs/manual/core/storage-engines/)

- [WiredTiger Storage Engine](https://www.mongodb.com/docs/manual/core/wiredtiger/) (including support for [Encryption at Rest)](https://www.mongodb.com/docs/manual/core/security-encryption-at-rest/)
- [In-Memory Storage Engine.](https://www.mongodb.com/docs/manual/core/inmemory/)

In addition, MongoDB provides pluggable storage engine API that allows third parties to develop storage engines for MongoDB.

## Databases and Collections

MongoDB зберігає записи даних як [документи](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-document) ([BSON documents](https://www.mongodb.com/docs/manual/core/document/#std-label-bson-document-format)), які зібрані разом у [колекції](https://www.mongodb.com/docs/manual/reference/glossary/#std -термінозбірник). [База даних](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-database) зберігає одну або кілька колекцій документів. Щоб вибрати базу даних для використання, у [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) видайте оператор `use <db>`, як у наступному прикладі:

```
use myDB
```

Якщо база даних не існує, MongoDB створює базу даних, коли ви вперше зберігаєте дані для цієї бази даних. Таким чином, ви можете перейти до неіснуючої бази даних і виконати наступну операцію в [`mongosh`:](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

```
use myNewDB

db.myNewCollection1.insertOne( { x: 1 } )
```

Операція [`insertOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne) створює як базу даних ` myNewDB` і колекція `myNewCollection1`, якщо вони ще не існують. Переконайтеся, що назви бази даних і колекції відповідають MongoDB [Обмеження імен.](https://www.mongodb.com/docs/manual/reference/limits/#std-label-restrictions-on-db-names)

MongoDB зберігає документи в колекціях. Колекції аналогічні таблицям у реляційних базах даних.

![A collection of MongoDB documents.](https://www.mongodb.com/docs/manual/images/crud-annotated-collection.bakedsvg.svg)

Якщо колекція не існує, MongoDB створює колекцію, коли ви вперше зберігаєте дані для цієї колекції.

```
db.myNewCollection2.insertOne( { x: 1 } )
db.myNewCollection3.createIndex( { y: 1 } )
```

І [`insertOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne), і [`createIndex ()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/#mongodb-method-db.collection.createIndex) операції створюють відповідну колекцію, якщо вони ще не існують. Переконайтеся, що назва колекції відповідає MongoDB [Обмеження імен.](https://www.mongodb.com/docs/manual/reference/limits/#std-label-restrictions-on-db-names)

MongoDB надає метод [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) для явного створення колекції з різними параметрами, такими як встановлення максимального розміру або правил перевірки документації. Якщо ви не вказуєте ці параметри, вам не потрібно явно створювати колекцію, оскільки MongoDB створює нові колекції, коли ви вперше зберігаєте дані для колекцій. Щоб змінити ці параметри колекції, перегляньте [`collMod`.](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod)

За замовчуванням колекція не вимагає, щоб її документи мали однакову схему; тобто документи в одній колекції не обов’язково мають однаковий набір полів, а тип даних для поля може відрізнятися для різних документів у колекції.

Однак, починаючи з MongoDB 3.2, ви можете застосувати [правила перевірки документів](https://www.mongodb.com/docs/manual/core/schema-validation/) для колекції під час операцій оновлення та вставки. Перегляньте [Перевірка схеми](https://www.mongodb.com/docs/manual/core/schema-validation/), щоб отримати докладнішу інформацію.

Щоб змінити структуру документів у колекції, наприклад додати нові поля, видалити існуючі поля або змінити значення полів на новий тип, оновіть документи до нової структури.

Колекціям призначається незмінний UUID. UUID колекції залишається незмінним для всіх членів набору реплік і фрагментів у сегментованому кластері.

Щоб отримати UUID для колекції, запустіть команду [listCollections](https://www.mongodb.com/docs/manual/reference/command/listCollections/) або [`db.getCollectionInfos()`](https ://www.mongodb.com/docs/manual/reference/method/db.getCollectionInfos/#mongodb-method-db.getCollectionInfos).

# Documents

MongoDB зберігає записи даних як документи BSON. BSON — це двійкове представлення документів [JSON](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-JSON), хоча воно містить більше типів даних, ніж JSON. Специфікацію BSON див. на [bsonspec.org](http://bsonspec.org/). Дивіться також [Типи BSON.](https://www.mongodb.com/docs/manual/reference/bson-types/)

![A MongoDB document.](https://www.mongodb.com/docs/manual/images/crud-annotated-document.bakedsvg.svg)

MongoDB documents are composed of field-and-value pairs and have the following structure:

```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```

The value of a field can be any of the BSON [data types](https://www.mongodb.com/docs/manual/reference/bson-types/), including other documents, arrays, and arrays of documents. For example, the following document contains values of varying types:

```
var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
```

The above fields have the following data types:

- `_id` holds an [ObjectId.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid)
- `name` holds an *embedded document* that contains the fields `first` and `last`.
- `birth` and `death` hold values of the *Date* type.
- `contribs` holds an *array of strings*.
- `views` holds a value of the *NumberLong* type.



### Field Names[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#field-names)

Field names are strings.

[Documents](https://www.mongodb.com/docs/manual/core/document/) have the following restrictions on field names:

- The field name `_id` is reserved for use as a primary key; its value must be unique in the collection, is immutable, and may be of any type other than an array. If the `_id` contains subfields, the subfield names cannot begin with a (`$`) symbol.

- Field names **cannot** contain the `null` character.
- The server permits storage of field names that contain dots (`.`) and dollar signs (`$`).
- MongodB 5.0 adds improved support for the use of (`$`) and (`.`) in field names. There are some restrictions. See [Field Name Considerations](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/#std-label-crud-concepts-dot-dollar-considerations) for more details.

BSON documents may have more than one field with the same name. Most [MongoDB interfaces](https://www.mongodb.com/docs/drivers/), however, represent MongoDB with a structure (e.g. a hash table) that does not support duplicate field names. If you need to manipulate documents that have more than one field with the same name, see the [driver documentation](https://www.mongodb.com/docs/drivers/) for your driver.

Some documents created by internal MongoDB processes may have duplicate fields, but *no* MongoDB process will *ever* add duplicate fields to an existing user document.

### Field Value Limit[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#field-value-limit)

- MongoDB 2.6 through MongoDB versions with [featureCompatibilityVersion](https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#std-label-view-fcv) (fCV) set to `"4.0"` or earlier

  For [indexed collections](https://www.mongodb.com/docs/manual/indexes/), the values for the indexed fields have a [Maximum Index Key Length](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Index-Key-Limit). See [Maximum Index Key Length](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Index-Key-Limit) for details.



## Dot Notation[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#dot-notation)

MongoDB uses the *dot notation* to access the elements of an array and to access the fields of an embedded document.

### Arrays[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#arrays)

To specify or access an element of an array by the zero-based index position, concatenate the array name with the dot (`.`) and zero-based index position, and enclose in quotes:

```
"<array>.<index>"
```

For example, given the following field in a document:

```
{
   ...
   contribs: [ "Turing machine", "Turing test", "Turingery" ],
   ...
}
```

To specify the third element in the `contribs` array, use the dot notation `"contribs.2"`.

For examples querying arrays, see:

- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)



## Tip

### See also: 

- [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-all/#mongodb-update-up.---) all positional operator for update operations,
- [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) filtered positional operator for update operations,
- [`$`](https://www.mongodb.com/docs/manual/reference/operator/update/positional/#mongodb-update-up.-) positional operator for update operations,
- [`$`](https://www.mongodb.com/docs/manual/reference/operator/projection/positional/#mongodb-projection-proj.-) projection operator when array index position is unknown
- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/#std-label-read-operations-arrays) for dot notation examples with arrays.



### Embedded Documents[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#embedded-documents)

To specify or access a field of an embedded document with dot notation, concatenate the embedded document name with the dot (`.`) and the field name, and enclose in quotes:

```
"<embedded document>.<field>"
```

For example, given the following field in a document:

```
{
   ...
   name: { first: "Alan", last: "Turing" },
   contact: { phone: { type: "cell", number: "111-222-3333" } },
   ...
}
```

- To specify the field named `last` in the `name` field, use the dot notation `"name.last"`.
- To specify the `number` in the `phone` document in the `contact` field, use the dot notation `"contact.phone.number"`.

For examples querying embedded documents, see:

- [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

## Document Limitations[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#document-limitations)

Documents have the following attributes:

### Document Size Limit[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#document-size-limit)

The maximum BSON document size is 16 megabytes.

The maximum document size helps ensure that a single document cannot use excessive amount of RAM or, during transmission, excessive amount of bandwidth. To store documents larger than the maximum size, MongoDB provides the GridFS API. See [`mongofiles`](https://www.mongodb.com/docs/database-tools/mongofiles/#mongodb-binary-bin.mongofiles) and the documentation for your [driver](https://www.mongodb.com/docs/drivers/) for more information about GridFS.

### Document Field Order[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#document-field-order)

Unlike JavaScript objects, the fields in a BSON document are ordered.

#### Field Order in Queries[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#field-order-in-queries)

For queries, the field order behavior is as follows:

- When comparing documents, field ordering is significant. For example, when comparing documents with fields `a` and `b` in a query:
  - `{a: 1, b: 1}` is equal to `{a: 1, b: 1}`
  - `{a: 1, b: 1}` is not equal to `{b: 1, a: 1}`
- For efficient query execution, the query engine may reorder fields during query processing. Among other cases, reordering fields may occur when processing these projection operators: [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project), [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields), [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set), and [`$unset`.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)
  - Field reordering may occur in intermediate results as well as the final results returned by a query.
  - Because some operations may reorder fields, you should not rely on specific field ordering in the results returned by a query that uses the projection operators listed earlier.

#### Field Order in Write Operations[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#field-order-in-write-operations)

For write operations, MongoDB preserves the order of the document fields *except* for the following cases:

- The `_id` field is always the first field in the document.
- Updates that include [`renaming`](https://www.mongodb.com/docs/manual/reference/operator/update/rename/#mongodb-update-up.-rename) of field names may result in the reordering of fields in the document.



### The `_id` Field[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#the-_id-field)

In MongoDB, each document stored in a collection requires a unique [_id](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id) field that acts as a [primary key](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary-key). If an inserted document omits the `_id` field, the MongoDB driver automatically generates an [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) for the `_id` field.

This also applies to documents inserted through update operations with [upsert: true.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-parameter)

The `_id` field has the following behavior and constraints:

- By default, MongoDB creates a unique index on the `_id` field during the creation of a collection.
- The `_id` field is always the first field in the documents. If the server receives a document that does not have the `_id` field first, then the server will move the field to the beginning.

- _ If the `_id` contains subfields, the subfield names cannot begin

  with a (`$`) symbol.

- The `_id` field may contain values of any [BSON data type](https://www.mongodb.com/docs/manual/reference/bson-types/), other than an array, regex, or undefined.

  

- ## Warning

  To ensure functioning replication, do not store values that are of the BSON regular expression type in the `_id` field.

The following are common options for storing values for `_id`:

- Use an [ObjectId.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid)

- Use a natural unique identifier, if available. This saves space and avoids an additional index.

- Generate an auto-incrementing number.

- Generate a UUID in your application code. For a more efficient storage of the UUID values in the collection and in the `_id` index, store the UUID as a value of the BSON `BinData` type.

  Index keys that are of the `BinData` type are more efficiently stored in the index if:

  - the binary subtype value is in the range of 0-7 or 128-135, and
  - the length of the byte array is: 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, or 32.

- Use your driver's BSON UUID facility to generate UUIDs. Be aware that driver implementations may implement UUID serialization and deserialization logic differently, which may not be fully compatible with other drivers. See your [driver documentation](https://api.mongodb.com/)

-  for information concerning UUID interoperability.



## Note

Most MongoDB driver clients will include the `_id` field and generate an `ObjectId` before sending the insert operation to MongoDB; however, if the client sends a document without an `_id` field, the [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) will add the `_id` field and generate the `ObjectId`.

## Other Uses of the Document Structure[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#other-uses-of-the-document-structure)

In addition to defining data records, MongoDB uses the document structure throughout, including but not limited to: [query filters](https://www.mongodb.com/docs/manual/core/document/#std-label-document-query-filter), [update specifications documents](https://www.mongodb.com/docs/manual/core/document/#std-label-document-update-specification), and [index specification documents](https://www.mongodb.com/docs/manual/core/document/#std-label-document-index-specification)



### Query Filter Documents[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#query-filter-documents)

Query filter documents specify the conditions that determine which records to select for read, update, and delete operations.

You can use `<field>:<value>` expressions to specify the equality condition and [query operator](https://www.mongodb.com/docs/manual/reference/operator/query/) expressions.

```
{
  <field1>: <value1>,
  <field2>: { <operator>: <value> },
  ...
}
```

For examples, see:

- [Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
- [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)
- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)



### Update Specification Documents[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#update-specification-documents)

Update specification documents use [update operators](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators) to specify the data modifications to perform on specific fields during an update operation.

```
{
  <operator1>: { <field1>: <value1>, ... },
  <operator2>: { <field2>: <value2>, ... },
  ...
}
```

For examples, see [Update specifications.](https://www.mongodb.com/docs/manual/tutorial/update-documents/#std-label-update-documents-modifiers)



### Index Specification Documents[![img](https://www.mongodb.com/docs/manual/assets/link.svg)](https://www.mongodb.com/docs/manual/core/document/#index-specification-documents)

Index specification documents define the field to index and the index type:

```
{ <field1>: <type1>, <field2>: <type2>, ...  }
```