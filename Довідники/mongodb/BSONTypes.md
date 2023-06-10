# BSON Types 

https://www.mongodb.com/docs/manual/reference/bson-types/

[BSON](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-BSON) — це двійковий формат серіалізації, який використовується для зберігання документів і здійснення віддалених викликів процедур у MongoDB. Специфікацію BSON можна знайти на [bsonspec.org](http://bsonspec.org/)

Кожен тип BSON має цілочисельні та рядкові ідентифікатори, перелічені в наступній таблиці:

| Type                       | Number | Alias                 | Notes                      |
| -------------------------- | ------ | --------------------- | -------------------------- |
| Double                     | 1      | "double"              |                            |
| String                     | 2      | "string"              |                            |
| Object                     | 3      | "object"              |                            |
| Array                      | 4      | "array"               |                            |
| Binary data                | 5      | "binData"             |                            |
| Undefined                  | 6      | "undefined"           | Deprecated.                |
| ObjectId                   | 7      | "objectId"            |                            |
| Boolean                    | 8      | "bool"                |                            |
| Date                       | 9      | "date"                |                            |
| Null                       | 10     | "null"                |                            |
| Regular Expression         | 11     | "regex"               |                            |
| DBPointer                  | 12     | "dbPointer"           | Deprecated.                |
| JavaScript                 | 13     | "javascript"          |                            |
| Symbol                     | 14     | "symbol"              | Deprecated.                |
| JavaScript code with scope | 15     | "javascriptWithScope" | Deprecated in MongoDB 4.4. |
| 32-bit integer             | 16     | "int"                 |                            |
| Timestamp                  | 17     | "timestamp"           |                            |
| 64-bit integer             | 18     | "long"                |                            |
| Decimal128                 | 19     | "decimal"             |                            |
| Min key                    | -1     | "minKey"              |                            |
| Max key                    | 127    | "maxKey"              |                            |

- Оператор [`$type`](https://www.mongodb.com/docs/manual/reference/operator/query/type/#mongodb-query-op.-type) підтримує використання цих значень для запиту полів за допомогою їх тип BSON. [`$type`](https://www.mongodb.com/docs/manual/reference/operator/query/type/#mongodb-query-op.-type) також підтримує псевдонім `number`, який відповідає цілі, десяткові, подвійні та довгі типи BSON.
- Оператор агрегації [`$type`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/type/#mongodb-expression-exp.-type) повертає тип BSON свого аргументу .
- Оператор агрегації [`$isNumber`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isNumber/#mongodb-expression-exp.-isNumber) повертає значення `true`, якщо його аргумент є BSON цілим, десятковим, подвійним або довгим. *Нове у версії 4.4*

Щоб визначити тип поля, перегляньте [Перевірка типу.](https://www.mongodb.com/docs/mongodb-shell/reference/data-types/#std-label-check-types-in-shell)

Якщо ви конвертуєте BSON у JSON, перегляньте довідку [Розширений JSON](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/).

У наступних розділах описано особливі міркування щодо окремих типів BSON.

## Двійкові дані

Двійкове значення `binData` BSON є масивом байтів. Значення `binData` має підтип, який вказує, як інтерпретувати двійкові дані. У наступній таблиці показано підтипи.

| Number | Subtype                                          |
| ------ | ------------------------------------------------ |
| 0      | Generic binary subtype                           |
| 1      | Function data                                    |
| 2      | Binary (old)                                     |
| 3      | UUID (old)                                       |
| 4      | UUID                                             |
| 5      | MD5                                              |
| 6      | Encrypted BSON value                             |
| 7      | Compressed time series data*New in version 5.2*. |
| 128    | Custom data                                      |

## ObjectId 

ObjectId невеликі, ймовірно унікальні, швидко генеруються та впорядковані. Значення ObjectId мають довжину 12 байтів і складаються з:

- 4-байтова позначка часу, що представляє створення ObjectId, виміряна в секундах з епохи Unix.
- 5-байтове випадкове значення, яке генерується один раз на процес. Це випадкове значення є унікальним для машини та процесу.
- 3-байтовий інкрементний лічильник, ініціалізований до випадкового значення.

Для позначок часу та значень лічильника старші байти з’являються першими в послідовності байтів (старший байт). Це відрізняється від інших значень BSON, де молодші байти з’являються першими (little-endian).

Якщо для створення ObjectId використовується ціле число, ціле число замінює мітку timestamp.

У MongoDB для кожного документа, що зберігається в колекції, потрібне унікальне поле [_id](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id), яке діє як [первинний ключ](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary-key). Якщо у вставленому документі немає поля `_id`, драйвер MongoDB автоматично генерує [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) для поле `_id`.

Це також стосується документів, вставлених через операції оновлення з [upsert: true.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-parameter)

Клієнти MongoDB повинні додати поле `_id` з унікальним ObjectId. Використання ObjectIds для поля `_id` забезпечує такі додаткові переваги:

- у [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), ви можете отримати доступ до часу створення `ObjectId`, використовуючи [`ObjectId.getTimestamp()`](https://www.mongodb.com/docs/manual/reference/method/ObjectId.getTimestamp/#mongodb-method-ObjectId.getTimestamp).

- сортування за полем `_id`, яке зберігає значення `ObjectId`, приблизно еквівалентно сортуванню за часом створення.


Хоча значення [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) мають збільшуватися з часом, вони не обов’язково є монотонними. Це тому, що вони:

- Містить лише одну секунду тимчасової роздільності, тому значення [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid), створені протягом однієї секунди, не мають гарантоване замовлення, і
- Створюються клієнтами, які можуть мати різні системні годинники.

Використовуйте методи [`ObjectId()`](https://www.mongodb.com/docs/manual/reference/method/ObjectId/#mongodb-method-ObjectId), щоб установити та отримати значення ObjectId.

Починаючи з MongoDB 5.0, [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) замінює застарілу оболонку `mongo`. Методи `ObjectId()` працюють інакше в `mongosh`, ніж у застарілій оболонці `mongo`. Щоб отримати додаткові відомості про застарілі методи, перегляньте [Legacy mongo Shell.](https://www.mongodb.com/docs/manual/reference/mongo/#std-label-mongo)

## String 

Рядки BSON є UTF-8. Загалом драйвери для кожної мови програмування перетворюють рядковий формат мови на UTF-8 під час серіалізації та десеріалізації BSON. Це дає змогу легко зберігати більшість міжнародних символів у рядках BSON. Дані рядки з використанням наборів символів UTF-8, використовуючи [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) на рядки будуть досить правильними. Однак, оскільки внутрішньо [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) використовує C++ `strcmp` API , порядок сортування може неправильно обробляти деякі символи. Крім того, запити MongoDB [`$regex`](https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex) підтримують UTF-8 у рядок регулярного виразу.

## Timestamps 

BSON має спеціальний тип позначки часу timestamp  для *внутрішнього* використання MongoDB і **не** пов’язаний зі звичайною [датою](https://www.mongodb.com/docs/manual/reference/bson-types/#std- label-document-bson-type-date) типу. Цей тип внутрішньої позначки часу є 64-бітним значенням, де:

- старші 32 біти є значенням `time_t` (секунди з епохи Unix)
- молодші 32 біти є порядковим числом, що збільшується, для операцій протягом певної секунди.

У той час як формат BSON є порядковим порядком байтів, і тому спочатку зберігає молодші біти, [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary- екземпляр bin.mongod) завжди порівнює значення `time_t` перед значенням `ordinal` на всіх платформах, незалежно від порядку байтів.

У межах одного екземпляра [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) значення позначок часу завжди унікальні.

Під час реплікації [oplog](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-oplog) має поле `ts`. Значення в цьому полі відображають час операції, для якого використовується значення позначки часу BSON.

Тип позначки часу BSON призначений для *внутрішнього* використання MongoDB. У більшості випадків у розробці додатків ви захочете використовувати тип дати BSON. Див. [Дата](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-date) для отримання додаткової інформації.

Під час вставлення документа, який містить поля верхнього рівня з порожніми значеннями міток часу, MongoDB замінює порожні значення міток часу поточним значенням мітки часу, за наступним винятком. Якщо саме поле `_id` містить порожнє значення позначки часу, воно завжди вставлятиметься як є й не замінюватиметься.

Вставте документ із порожнім значенням мітки часу:

```
db.test.insertOne( { ts: new Timestamp() } );
```

Запуск [`db.test.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) тоді повернути документ, подібний до такого:

```
{ "_id" : ObjectId("542c2b97bac0595474108b48"), "ts" : Timestamp(1412180887, 1) }
```

Сервер замінив порожнє значення мітки часу для `ts` на значення мітки часу під час вставки.

## Date 

BSON Date is a 64-bit integer that represents the number of milliseconds since the Unix epoch (Jan 1, 1970). This results in a representable date range of about 290 million years into the past and future.

The [official BSON specification](http://bsonspec.org/#/specification) refers to the BSON Date type as the *UTC datetime*.

BSON Date type is signed. [[2\]](https://www.mongodb.com/docs/manual/reference/bson-types/#footnote-unsigned-date) Negative values represent dates before 1970.

Construct a Date using the `new Date()` constructor in [`mongosh`:](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

```
var mydate1 = new Date()
```

Construct a Date using the `ISODate()` constructor in [`mongosh`:](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)

```
var mydate2 = ISODate()
```

Return the Date value as string:

```
mydate1.toString()
```

Return the month portion of the Date value; months are zero-indexed, so that January is month `0`:

```
mydate1.getMonth()
```

Prior to version 2.0, `Date` values were incorrectly interpreted as *unsigned* integers, which affected sorts, range queries, and indexes on `Date` fields. Because indexes are not recreated when upgrading, please re-index if you created an index on `Date` values with an earlier version, and dates before 1970 are relevant to your application.