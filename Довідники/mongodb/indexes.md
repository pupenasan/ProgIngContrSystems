# Індекси

https://www.mongodb.com/docs/manual/indexes/

Індекси підтримують ефективне виконання запитів у MongoDB. Без індексів MongoDB має сканувати кожен документ у колекції, щоб повернути результати запиту. Якщо для запиту існує відповідний індекс, MongoDB використовує індекс, щоб обмежити кількість документів, які він повинен сканувати.

Хоча індекси покращують продуктивність запитів, додавання індексу негативно впливає на продуктивність операцій запису. Для колекцій із високим співвідношенням запису до читання індекси дорогі, оскільки кожна вставка також повинна оновлювати будь-які індекси.

Якщо ваша програма постійно виконує запити до тих самих полів, ви можете створити індекс для цих полів, щоб покращити продуктивність. Наприклад, розглянемо такі сценарії:

| Сценарій                                                     | Тип індексу                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Відділу кадрів часто доводиться шукати співробітників за ідентифікатором працівника. Ви можете створити індекс у полі ID працівника, щоб покращити продуктивність запитів. | [Single Field Index](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-single/#std-label-indexes-single-field) |
| Продавцю часто потрібно шукати інформацію про клієнта за місцезнаходженням. Місцезнаходження зберігається у вбудованому об’єкті з такими полями, як `state`, `city`, and `zipcode`. Ви можете створити індекс для об’єкта `location`, щоб покращити продуктивність для запитів до цього об’єкта. Коли ви створюєте індекс для вбудованого документа, лише запити, які вказують увесь вбудований документ, використовують індекс. Запити в певному полі документа не використовують індекс. | [Single Field Index](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-single/#std-label-indexes-single-field) on an embedded document |
| Менеджеру продуктового магазину часто доводиться шукати товарні запаси за назвою та кількістю, щоб визначити, яких товарів бракує. Ви можете створити єдиний індекс для обох полів `item` і `quantity` для покращення продуктивності запиту. | [Compound Index](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/#std-label-index-type-compound) |

Індекси — це спеціальні структури даних, які зберігають невелику частину набору даних колекції у формі, зручній для перегляду. Індекси MongoDB використовують структуру даних [B-tree](https://en.wikipedia.org/wiki/B-tree)

Індекс зберігає значення певного поля або набору полів, упорядкованих за значенням поля. Упорядкування записів індексу підтримує ефективні збіги рівності та операції запитів на основі діапазону. Крім того, MongoDB може повертати відсортовані результати за допомогою порядку в індексі.

До індексів застосовуються певні обмеження, наприклад довжина ключів індексів або кількість індексів на колекцію. Докладніше див. у [Обмеження індексу.](https://www.mongodb.com/docs/manual/reference/limits/#std-label-index-limitations)

MongoDB створює [унікальний індекс](https://www.mongodb.com/docs/manual/core/index-unique/#std-label-index-type-unique) на [_id](https://www .mongodb.com/docs/manual/core/document/#std-label-document-id-field) під час створення колекції. Індекс `_id` не дозволяє клієнтам вставляти два документи з однаковим значенням поля `_id`. Ви не можете скинути цей індекс.

У [шардерних кластерах](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-sharded-cluster), якщо ви *не* використовуєте поле `_id` як [шард ключ](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-shard-key), то ваша програма **має** забезпечити унікальність значень у `_id` поле. Це можна зробити за допомогою поля з автоматично згенерованим [ObjectId.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-ObjectId)

### Назви індексів

Назва за замовчуванням для індексу — це конкатенація проіндексованих ключів і напрямок кожного ключа в індексі ("1" або "-1") із використанням підкреслення як розділювача. Наприклад, індекс, створений на `{ item : 1, quantity: -1 }`, має назву `item_1_quantity_-1`.

Ви не можете перейменувати створений індекс. Натомість ви повинні [скинути](https://www.mongodb.com/docs/manual/core/indexes/drop-index/#std-label-drop-an-index) і повторно створити індекс із новою назвою.

Щоб дізнатися, як вказати ім’я для індексу, див. -label-specify-index-name)

# Індекси JS

https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/

Індекси — це структури даних, які підтримують ефективне виконання запитів у MongoDB. Вони містять копії частин даних у документах, щоб зробити запити ефективнішими.

Без індексів MongoDB має сканувати *кожен* документ у колекції, щоб знайти документи, які відповідають кожному запиту. Ці сканування колекції повільні та можуть негативно вплинути на продуктивність вашої програми. Використовуючи індекс для обмеження кількості документів, які сканує MongoDB, запити можуть бути ефективнішими, а тому повертатися швидше.

### Покриття запиту та продуктивність

When you execute a query against MongoDB, your query can include three parts:

- Query criteria that specify one or more fields and values that you are looking for
- Options that affect the query's execution, such as read concern
- Projection criteria to specify the fields you want MongoDB to return (optional)

When all the fields specified in the query criteria and projection of a query are indexed, MongoDB returns results directly from the index without scanning any documents in the collection or loading them into memory.

For more information on how to ensure your index covers your query criteria and projection, see the MongoDB manual articles on [query coverage](https://www.mongodb.com/docs/manual/core/query-optimization/#read-operations-covered-query) and [index intersection.](https://www.mongodb.com/docs/manual/core/index-intersection/)

Коли ви виконуєте запит до MongoDB, ваш запит може включати три частини:

- Критерії запиту, які означують одне або кілька полів і значень, які ви шукаєте
- Параметри, які впливають на виконання запиту, наприклад read concern
- Критерії проекції для означення полів, які MongoDB має повертати (необов’язково)

Коли всі поля, вказані в критеріях запиту та проекції запиту, проіндексовані, MongoDB повертає результати безпосередньо з індексу, не скануючи будь-які документи в колекції та не завантажуючи їх у пам’ять.

Щоб дізнатися більше про те, як переконатися, що ваш індекс охоплює ваші критерії запиту та проекцію, перегляньте статті посібника MongoDB про [покриття запитів](https://www.mongodb.com/docs/manual/core/query-optimization/#read- operations-covered-query) і [index intersection.](https://www.mongodb.com/docs/manual/core/index-intersection/)

### Operational Considerations

To improve query performance, build indexes on fields that appear often in your application's queries and operations that return sorted results. Each index that you add consumes disk space and memory when active, so it might be necessary to track index memory and disk usage for capacity planning. In addition, when a write operation updates an indexed field, MongoDB also updates the related index.

For more information on designing your data model and choosing indexes appropriate for your application, see the MongoDB Server documentation on [Indexing Strategies](https://www.mongodb.com/docs/manual/applications/indexes/) and [Data Modeling and Indexes.](https://www.mongodb.com/docs/manual/core/data-model-operations/#data-model-indexes)

### List Indexes

### 

You can use the `listIndexes()` method to list all the indexes for a collection. The [listIndexes()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#listIndexes)

 method takes an optional [ListIndexesOptions](https://mongodb.github.io/node-mongodb-native/6.10/interfaces/ListIndexesOptions.html) parameter. The `listIndexes()` method returns an object of type [ListIndexesCursor.](https://mongodb.github.io/node-mongodb-native/6.10/classes/ListIndexesCursor.html)

The following code uses the `listIndexes()` method to list all the indexes in a collection:

```
// List the indexes on the collection and output them as an array
const result = await collection.listIndexes().toArray();

// Print the list of indexes
console.log("Existing indexes:\n");
for(const doc in result){
    console.log(doc);
}
```

## Index Types

## 

MongoDB supports several different index types to support querying your data. The following sections describe the most common index types and provide sample code for creating each index type.

### Single Field Indexes

### 

**Single field indexes** are indexes that improve performance for queries that specify ascending or descending sort order on a single field of a document.

The following example uses the `createIndex()` method to create an ascending order index on the `title` field in the `movies` collection in the `sample_mflix` database.

```
const database = client.db("sample_mflix");
const movies = database.collection("movies");

// Create an ascending index on the "title" field in the
// "movies" collection.
const result = await movies.createIndex({ title: 1 });
console.log(`Index created: ${result}`);
```

The following is an example of a query that is covered by the index created above.

```
// Define the query parameters
const query = { title: "Batman" }
const sort = { title: 1 };
const projection = { _id: 0, title: 1 };
// Execute the query using the defined parameters
const cursor = movies
  .find(query)
  .sort(sort)
  .project(projection);
```

To learn more, see  [Single Field Indexes.](https://www.mongodb.com/docs/manual/core/index-single/)

### Compound Indexes

### 

**Compound indexes** are indexes that improve performance for queries that specify ascending or descending sort order for *multiple* fields of a document. You must specify the direction (ascending or descending) for each field in the index.

The following example uses the `createIndex()` method to create a compound index on the `type` and `genre` fields in the `movies` collection in the `sample_mflix` database.

```
// Connect to the "sample_mflix" database
const database = client.db("sample_mflix");
// Access the database's "movies" collection
const movies = database.collection("movies");

// Create an ascending index on the "type" and "genre" fields
// in the "movies" collection.
const result = await movies.createIndex({ type: 1, genre: 1 });
console.log(`Index created: ${result}`);
```

The following is an example of a query that is covered by the index created above.

```
// Define a query to find movies in the "Drama" genre
const query = { type: "movie", genre: "Drama" };
// Define sorting criteria for the query results
const sort = { type: 1, genre: 1 };
// Include only the type and genre fields in the query results
const projection = { _id: 0, type: 1, genre: 1 };

// Execute the query using the defined criteria and projection
const cursor = movies
  .find(query)
  .sort(sort)
  .project(projection);
```

To learn more, see  [Compound Indexes.](https://www.mongodb.com/docs/manual/core/index-compound/)

### Multikey Indexes (Indexes on Array Fields)

### 

**Multikey indexes** are indexes that improve the performance of queries on fields that contain array values.

You can create a multikey index on a field with an array value by calling the `createIndex()` method. The following code creates an ascending index on the `cast` field in the `movies` collection of the `sample_mflix` database:

```
const database = client.db("sample_mflix");
const movies = database.collection("movies");

// Create a multikey index on the "cast" field in the "movies" collection
const result = await movies.createIndex({ cast: 1 });
```

The following code queries the multikey index to find documents in which the `cast` field value contains `"Viola Davis"`:

```
const query = { cast: "Viola Davis" };
const projection = { _id: 0, cast: 1 , title: 1 };

// Perform a find operation with the preceding filter and projection
const cursor = movies
  .find(query)
  .project(projection);
```

Multikey indexes behave differently from non-multikey indexes in terms of query coverage, index bound computation, and sort behavior. For a full explanation of multikey indexes, including a discussion of their behavior and limitations, see the [Multikey Indexes page](https://www.mongodb.com/docs/manual/core/index-multikey/) in the MongoDB Server manual.

### Clustered Indexes

### 

**Clustered indexes** are indexes that improve the performance of insert, update, and delete operations on **clustered collections**. Clustered collections store documents ordered by the clustered index key value.

To create a clustered index, specify the `clusteredIndex` option in the `CollectionOption`. The `clusteredIndex` option must specify the `_id` field as the key and the unique field as `true`.

The following example uses the `createCollection()` method to create a clustered index on the `_id` field in the `vendors` collection of the `tea` database.

```
const db = client.db('tea');
await db.createCollection('ratings', {
  clusteredIndex: {
    key: { _id: 1 },
    unique: true
  }
});
```

To learn more, see [Clustered Indexes](https://www.mongodb.com/docs/v6.0/reference/method/db.createCollection/#std-label-db.createCollection.clusteredIndex) and [Clustered Collections.](https://www.mongodb.com/docs/v6.0/core/clustered-collections/)



### Text Indexes

### 

**Text indexes** support text search queries on string content. These indexes can include any field whose value is a string or an array of string elements.

MongoDB supports text search for various languages, so you can specify the default language as an option when creating the index. You can also specify a weight option to prioritize certain text fields in your index. These weights denote the significance of fields relative to the other indexed fields.

To learn more about text searches, see our guide on [text search queries.](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/text/#std-label-node-fundamentals-text)

The following example uses the `createIndex()` method to perform the following actions:

- Create a `text` index on the `title` and `body` fields in the `blogPosts` collection
- Specify `english` as the default language
- Set the field weight of `body` to `10` and `title` to `3`

```
// Get the database and collection on which to create the index 
const myDB = client.db("testDB");
const myColl = myDB.collection("blogPosts");

// Create a text index on the "title" and "body" fields
const result = await myColl.createIndex(
  { title: "text", body: "text" },
  { default_language: "english" },
  { weights: { body: 10, title: 3 } }
);
```

The following query uses the text index created in the preceding code:

```
// Query for documents where body or title contain "life ahead"
const query = { $text: { $search: "life ahead" } };

// Show only the title field
const projection = { _id: 0, title: 1 };

// Execute the find operation
const cursor = myColl.find(query).project(projection);
```

To learn more about text indexes, see [Text Indexes](https://www.mongodb.com/docs/manual/core/index-text/) in the Server manual.

### Geospatial Indexes

### 

MongoDB supports queries of geospatial coordinate data using **2dsphere indexes**. With a 2dsphere index, you can query the geospatial data for inclusion, intersection, and proximity. For more information on querying geospatial data with the MongoDB Node.js driver, read our [Search Geospatial](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/geo/) guide.

To create a 2dsphere index, you must specify a field that contains only **GeoJSON objects**. For more details on this type, see the MongoDB Server manual page on [GeoJSON objects.](https://www.mongodb.com/docs/manual/reference/geojson/)

The `location.geo` field in following sample document from the `theaters` collection in the `sample_mflix` database is a GeoJSON Point object that describes the coordinates of the theater:

```
{
   "_id" : ObjectId("59a47286cfa9a3a73e51e75c"),
   "theaterId" : 104,
   "location" : {
      "address" : {
         "street1" : "5000 W 147th St",
         "city" : "Hawthorne",
         "state" : "CA",
         "zipcode" : "90250"
      },
      "geo" : {
         "type" : "Point",
         "coordinates" : [
            -118.36559,
            33.897167
         ]
      }
   }
}
```

The following example uses the `createIndexes()` method to create a `2dsphere` index on the `location.geo` field in the `theaters` collection in the `sample_mflix` database to enable geospatial searches.

```
const database = client.db("sample_mflix");
const movies = database.collection("movies");

/* Create a 2dsphere index on the "location.geo" field in the
"movies" collection */
const result = await movies.createIndex({ "location.geo": "2dsphere" });

// Print the result of the index creation
console.log(`Index created: ${result}`);
```

MongoDB also supports `2d` indexes for calculating distances on a Euclidean plane and for working with the "legacy coordinate pairs" syntax used in MongoDB 2.2 and earlier. To learn more, see [Geospatial Queries.](https://www.mongodb.com/docs/manual/geospatial-queries/)

### Unique Indexes

### 

**Unique indexes** ensure that the indexed fields do not store duplicate values. By default, MongoDB creates a unique index on the `_id` field during the creation of a collection. To create a unique index, specify the field or combination of fields that you want to prevent duplication on and set the `unique` option to `true`.

The following example uses the `createIndex()` method to create a unique index on the `theaterId` field in the `theaters` collection of the `sample_mflix` database.

```
const database = client.db("sample_mflix");
const movies = database.collection("movies");

// Create a unique index on the "theaterId" field in the "theaters" collection.
const result = await movies.createIndex({ theaterId: 1 }, { unique: true });
console.log(`Index created: ${result}`);
```

If you attempt to perform a write operation that stores a duplicate value that violates the unique index, MongoDB will throw an error that resembles the following:

```
E11000 duplicate key error index
```

To learn more, see [Unique Indexes.](https://www.mongodb.com/docs/manual/core/index-unique/)



## Search Indexes

## 

Atlas Search is a feature that allows you to perform full-text searches. To learn more, see the [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/#std-label-fts-top-ref) documentation.

Before you can perform a search on an Atlas collection, you must first create an Atlas Search index on the collection. An Atlas Search index is a data structure that categorizes data in a searchable format.

You can use the following methods to manage your Search indexes:

- `createSearchIndex()`
- `createSearchIndexes()`
- `listSearchIndexes()`
- `updateSearchIndex()`
- `dropSearchIndex()`

The following sections provide code samples that use each of the preceding methods to manage Search indexes.

### Create a Search Index

### 

You can use the [createSearchIndex()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#createSearchIndex)

 and [createSearchIndexes()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#createSearchIndexes)

methods to create new Search indexes.

The following code shows how to use the `createSearchIndex()` method to create an index called `search1`:

```
// Create a search index
const index1 = {
    name: "search1",
    definition: {
        "mappings": {
            "dynamic": true
        }
    }
}
await collection.createSearchIndex(index1);
```

When connecting to MongoDB Server v6.0.11 and later v6 versions, or v7.0.2 and later v7 versions, you can use the driver to create an Atlas Vector Search index on a collection. Learn more about this feature in the [Atlas Vector Search documentation.](https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/)

The following code shows how to use the `createSearchIndex()` method to create a search index in which the `type` field is `vectorSearch`:

```
// Create a Vector Search index
const vectorSearchIdx = {
    name: "vsidx1",
    type: "vectorSearch",
    definition: {
        fields: [{
            type: "vector",
            numDimensions: 384,
            path: "summary",
            similarity: "dotProduct"
        }]
    }
}

await collection.createSearchIndex(vectorSearchIdx);
```

### List Search Indexes

### 

You can use the [listSearchIndexes()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#listSearchIndexes)

method to return a cursor that contains the Search indexes of a given collection. The `listSearchIndexes()` method takes an optional string parameter, `name`, to return only the indexes with matching names. It also takes an optional [aggregateOptions](https://mongodb.github.io/node-mongodb-native/6.10/interfaces/AggregateOptions.html)

 parameter.

The following code uses the `listSearchIndexes()` method to list the Search indexes in a collection:

```
// List search indexes
const result = await collection.listSearchIndexes().toArray();
console.log("Existing search indexes:\n");
for (const doc in result) {
    console.log(doc);
}
```

### Update a Search Index

### 

You can use the [updateSearchIndex()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#updateSearchIndex)

 method to update a Search index.

The following code shows how to use the `updateSearchIndex()` method to update an index called `search1` to specify a string type for the `description` field:

```
// Update a search index
const index2 = {
    "mappings": {
        "dynamic": true,
        "fields": {
            "description": {
                "type": "string"
            }
        }
    }
}
await collection.updateSearchIndex("search1", index2);
```

### Drop a Search Index

### 

You can use the [dropSearchIndex()](https://mongodb.github.io/node-mongodb-native/6.10/classes/Collection.html#dropSearchIndex)

 method to remove a Search index.

The following code shows how to use the `dropSearchIndex()` method to remove an index called `search1`:

```
// Dropping (deleting) a search index
await collection.dropSearchIndex("search1");
```

