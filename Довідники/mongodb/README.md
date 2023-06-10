[На головну](../../README.md)

# MongoDB

https://www.mongodb.com/docs/manual/

Версія спільноти нашої розподіленої бази даних пропонує гнучку модель даних документів разом із підтримкою спеціальних запитів, вторинного індексування та агрегацій у реальному часі, щоб забезпечити ефективні способи доступу та аналізу ваших даних. https://www.mongodb.com/try/download/community

База даних також пропонується як повністю керована служба з [MongoDB Atlas](https://www.mongodb.com/atlas/database). Отримайте доступ до розширених функцій, таких як автоматичне масштабування, безсерверні екземпляри (у попередньому перегляді), повнотекстовий пошук і розподіл даних між регіонами та хмарами. Розгорніть за лічені хвилини в AWS, Google Cloud і/або Azure без завантажень.

У цьому розділі надається загальна інформація по MongoDB. Також Ви можете почитати про різні функції за наступними посиланнями в цьому репозиторії:

- [Пошук через find](collection_find.md)
- [Оновлення через update](collection_update.md)
- [Cloud MongoDB Atlas](cloudmongo.md)
- [Time Series - часові ряди](timeseries.md)
- [Query and Projection Operators](QueryandProjectionOperators.md)



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

MongoDB Query API підтримує [операції читання та запису (CRUD)](https://www.mongodb.com/docs/manual/crud/), а також: 

- [Агрегації даних](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Текстовий пошук](https://www.mongodb.com/docs/manual/text-search/) 
- [Геопросторові запити](https://www.mongodb.com/docs/manual/tutorial/geospatial-tutorial/)

Засіб реплікації MongoDB під назвою [набір реплік](https://www.mongodb.com/docs/manual/replication/) забезпечує:

- *автоматичне* відновлення після відмови
- дублювання даних

[Набір реплік](https://www.mongodb.com/docs/manual/replication/) — це група серверів MongoDB, які підтримують однаковий набір даних, забезпечуючи дублювання і підвищуючи доступність даних.

MongoDB забезпечує горизонтальну масштабованість як частину своєї *основної* функціональності:

- [Sharding](https://www.mongodb.com/docs/manual/sharding/#std-label-sharding-introduction) розподіляє дані між кластером машин.
- Починаючи з версії 3.4, MongoDB підтримує створення [зон](https://www.mongodb.com/docs/manual/core/zone-sharding/#std-label-zone-sharding) даних на основі [shard key](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-shard-key). У збалансованому кластері MongoDB спрямовує читання та запис, охоплені зоною, лише до сегментів усередині зони. Для отримання додаткової інформації перегляньте сторінку посібника [Зони](https://www.mongodb.com/docs/manual/core/zone-sharding/#std-label-zone-sharding).

MongoDB підтримує [кілька механізмів зберігання:](https://www.mongodb.com/docs/manual/core/storage-engines/)

- [WiredTiger Storage Engine](https://www.mongodb.com/docs/manual/core/wiredtiger/) (включаючи підтримку  [Encryption at Rest)](https://www.mongodb.com/docs/manual/core/security-encryption-at-rest/)
- [In-Memory Storage Engine.](https://www.mongodb.com/docs/manual/core/inmemory/)

Крім того, MongoDB надає підключаємий API механізму зберігання, який дозволяє третім сторонам розробляти механізми зберігання для MongoDB.

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

Документи MongoDB складаються з пар полів і значень і мають таку структуру:

```json
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}
```

Значення поля може бути будь-яким із [типів даних  BSON ](BSONTypes.md), включаючи інші документи, масиви та масиви документів. Наприклад, такий документ містить значення різних типів:

```json
var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
```

Наведені вище поля мають такі типи даних:

- `_id` містить [ObjectId.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid)
- `name` містить *вбудований документ*, який містить поля `first` та `last`.
- `birth` і `death` містять значення типу *Date*.
- `contribs` містить *масив рядків*.
- `views` містить значення типу *NumberLong*.

### Імена полів

Імена полів є рядками.

[Документи](https://www.mongodb.com/docs/manual/core/document/) мають такі обмеження щодо імен полів:

- Ім'я поля `_id` зарезервовано для використання в якості первинного ключа; його значення має бути унікальним у колекції, є незмінним і може бути будь-якого типу, крім масиву. Якщо `_id` містить підполя, назви підполів не можуть починатися з символу (`$`).

- Імена полів **не можуть** містити символ `null`.
- Сервер дозволяє зберігати назви полів, які містять крапки (`.`) і знаки долара (`$`).
— MongodB 5.0 додає покращену підтримку використання (`$`) і (`.`) у назвах полів. Є деякі обмеження. Додаткову інформацію див. у розділі [Зауваження щодо імен полів](https://www.mongodb.com/docs/manual/core/dot-dollar-considerations/#std-label-crud-concepts-dot-dollar-considerations).

Документи BSON можуть мати більше одного поля з однаковою назвою. Однак більшість [інтерфейсів MongoDB](https://www.mongodb.com/docs/drivers/) представляють MongoDB зі структурою (наприклад, хеш-таблицею), яка не підтримує повторювані імена полів. Якщо вам потрібно маніпулювати документами, які мають більше ніж одне поле з однаковою назвою, перегляньте [документацію драйвера](https://www.mongodb.com/docs/drivers/) для вашого драйвера.

Деякі документи, створені внутрішніми процесами MongoDB, можуть мати повторювані поля, але *жоден* процес MongoDB *ніколи* не додасть повторювані поля до існуючого документа користувача.

### Обмеження значення поля

- Версії MongoDB від 2.6 до MongoDB із [featureCompatibilityVersion](https://www.mongodb.com/docs/manual/reference/command/setFeatureCompatibilityVersion/#std-label-view-fcv) (fCV) зі значенням `"4.0"` або раніше. Для [індексованих колекцій](https://www.mongodb.com/docs/manual/indexes/) значення для індексованих полів мають [максимальну довжину ключа індексу](https://www.mongodb.com/docs /manual/reference/limits/#mongodb-limit-Index-Key-Limit). Докладніше див. у [Максимальній довжині ключа індексу](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Index-Key-Limit).


## Крапкова нотація

MongoDB використовує *крапкову нотацію* для доступу до елементів масиву та для доступу до полів вбудованого документа.

### Масиви

Щоб указати або отримати доступ до елемента масиву за позицією індексу від нуля, об’єднайте назву масиву з крапкою (`.`) і позицією індексу від нуля та візьміть у лапки:

```js
"<array>.<index>"
```

Наприклад, задано таке поле в документі:

```js
{
   ...
   contribs: [ "Turing machine", "Turing test", "Turingery" ],
   ...
}
```

Щоб указати третій елемент у масиві `contribs`, використовуйте позначення `"contribs.2"` із крапкою.

Приклади запитів до масивів див.:

- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

Дивись також:

- [`$[]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-all/#mongodb-update-up.---) всі позиційні оператори для операцій оновлення,
- [`$[<identifier>]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) відфільтрований позиційний оператор для операцій оновлення,
- [`$`](https://www.mongodb.com/docs/manual/reference/operator/update/positional/#mongodb-update-up.-) позиційний оператор для операцій оновлення,
- [`$`](https://www.mongodb.com/docs/manual/reference/operator/projection/positional/#mongodb-projection-proj.-) оператор проекції, коли позиція індексу масиву невідома
- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/#std-label-read-operations-arrays) для прикладів точкової нотації з масивами.

### Вбудовані документи

Щоб указати або отримати доступ до поля вбудованого документа за допомогою крапкової нотації, об’єднайте ім’я вбудованого документа з крапкою (`.`) і ім’ям поля та візьміть їх у лапки:

```js
"<embedded document>.<field>"
```

Наприклад, задано таке поле в документі:

```js
{
   ...
   name: { first: "Alan", last: "Turing" },
   contact: { phone: { type: "cell", number: "111-222-3333" } },
   ...
}
```

- Щоб указати поле з назвою `last` у полі `name`, використовуйте позначення з крапкою `"name.last"`.
- Щоб вказати `number` у документі `phone` у полі `contact`, використовуйте позначення з крапкою `"contact.phone.number"`.

Приклади запиту вбудованих документів див.

- [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

## Обмеження документів

Документи мають такі атрибути:

### Обмеження розміру документа

Максимальний розмір документа BSON становить 16 мегабайт.

Максимальний розмір документа допомагає гарантувати, що окремий документ не може використовувати надмірний обсяг оперативної пам’яті або, під час передачі, надмірну пропускну здатність. Щоб зберігати документи, розмір яких перевищує максимальний, MongoDB надає GridFS API. Перегляньте [`mongofiles`](https://www.mongodb.com/docs/database-tools/mongofiles/#mongodb-binary-bin.mongofiles) і документацію для вашого [драйвера](https://www.mongodb .com/docs/drivers/), щоб дізнатися більше про GridFS.

### Порядок полів документа

На відміну від об’єктів JavaScript, поля в документі BSON впорядковані.

#### Порядок полів у запитах

Для запитів порядок полів виглядає наступним чином:

- Під час порівняння документів упорядкування полів є важливим. Наприклад, при порівнянні документів із полями `a` і `b` у запиті:
   - `{a: 1, b: 1}` дорівнює `{a: 1, b: 1}`
   - `{a: 1, b: 1}` не дорівнює `{b: 1, a: 1}`
- Для ефективного виконання запиту система запитів може змінити порядок полів під час обробки запиту. Крім інших випадків, під час обробки цих операторів проекції може виникнути зміна порядку полів: [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe. -проект), [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields), [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set) і [`$unset`.](https://www.mongodb .com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset)
   - Зміна порядку полів може відбуватися як у проміжних результатах, так і в кінцевих результатах, які повертає запит.
   - Оскільки деякі операції можуть змінювати порядок полів, не слід покладатися на конкретне впорядкування полів у результатах, які повертає запит, який використовує оператори проекції, перелічені раніше.

#### Порядок полів в операціях запису

Для операцій запису MongoDB зберігає порядок полів документа *за винятком* таких випадків:

- Поле `_id` завжди є першим полем у документі.
- Оновлення, які включають [`перейменування`](https://www.mongodb.com/docs/manual/reference/operator/update/rename/#mongodb-update-up.-rename) імен полів, можуть призвести до зміни порядку полів у документі.

### Поле `_id`

У MongoDB для кожного документа, що зберігається в колекції, потрібне унікальне поле [_id](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-_id), яке діє як [первинний ключ](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-primary-key). Якщо у вставленому документі немає поля `_id`, драйвер MongoDB автоматично генерує [ObjectId](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid) для поля `_id`.

Це також стосується документів, вставлених через операції оновлення з [upsert: true.](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/#std-label-upsert-parameter)

Поле `_id` має таку поведінку та обмеження:

- За замовчуванням MongoDB створює унікальний індекс у полі `_id` під час створення колекції.

- Поле `_id` завжди є першим полем у документах. Якщо сервер спочатку отримує документ, у якому немає поля `_id`, тоді сервер перемістить поле на початок.

- Якщо `_id` містить підполя, імена підполів не можуть починатися із символом (`$`).

- Поле `_id` може містити значення будь-якого [типу даних BSON](https://www.mongodb.com/docs/manual/reference/bson-types/), крім `array`, `regex` або `undefined`.

**Увага**. Щоб забезпечити функціонування реплікації, не зберігайте у полі `_id` значення типу регулярного виразу BSON 

Нижче наведено загальні варіанти збереження значень для `_id`:

- використовуючи [ObjectId.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid)

- використовуючи природний унікальний ідентифікатор, якщо він є. Це економить місце та дозволяє уникнути додаткового індексу.

- Створенням автоматичного збільшення числа.

- Генеруванням UUID у коді програми. Для більш ефективного зберігання значень UUID у колекції та в індексі `_id` зберігайте UUID як значення типу BSON `BinData`.

   Ключі індексу типу "BinData" зберігаються в індексі ефективніше, якщо:

   - значення двійкового підтипу знаходиться в діапазоні 0-7 або 128-135, і
   - довжина байтового масиву: 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24 або 32.

- використовуючи засіб BSON UUID вашого драйвера для створення UUID. Майте на увазі, що реалізації драйверів можуть реалізовувати логіку серіалізації та десеріалізації UUID по-різному, що може бути не повністю сумісним з іншими драйверами. Перегляньте [документацію драйвера](https://api.mongodb.com/) для інформації щодо сумісності UUID.

Примітка. Більшість клієнтів драйверів MongoDB включають поле `_id` і генерують `ObjectId` перед надсиланням операції вставки в MongoDB; однак, якщо клієнт надсилає документ без поля `_id`, [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod ) додасть поле `_id` і згенерує `ObjectId`.

## Інше використання структури документа

На додаток до визначення записів даних, MongoDB використовує всю структуру документа, включаючи, але не обмежуючись: [фільтри запитів](https://www.mongodb.com/docs/manual/core/document/#std-label-document- query-filter), [документи специфікацій оновлення](https://www.mongodb.com/docs/manual/core/document/#std-label-document-update-specification) і [документи специфікацій індексу](https: //www.mongodb.com/docs/manual/core/document/#std-label-document-index-specification)

### Документи фільтра запитів

Документи фільтрів запитів визначають умови, які визначають, які записи вибрати для операцій читання, оновлення та видалення.

Ви можете використовувати вирази `<поле>:<значення>`, щоб указати умову рівності та вирази [оператора запиту](https://www.mongodb.com/docs/manual/reference/operator/query/).

```json
{
  <field1>: <value1>,
  <field2>: { <operator>: <value> },
  ...
}
```

Для прикладів див.

- [Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/)
- [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual/tutorial/query-embedded-documents/)
- [Query an Array](https://www.mongodb.com/docs/manual/tutorial/query-arrays/)
- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual/tutorial/query-array-of-documents/)

### Оновити специфікаційні документи

У документах специфікації оновлення використовуються [оператори оновлення](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators), щоб указати модифікації даних для певних полів під час операція оновлення.

```json
{
  <operator1>: { <field1>: <value1>, ... },
  <operator2>: { <field2>: <value2>, ... },
  ...
}
```

Для прикладів див [Update specifications.](https://www.mongodb.com/docs/manual/tutorial/update-documents/#std-label-update-documents-modifiers)

### Специфікаційні документи індексу

Документи специфікації індексу визначають поле для індексування та тип індексу:

```json
{ <field1>: <type1>, <field2>: <type2>, ...  }
```