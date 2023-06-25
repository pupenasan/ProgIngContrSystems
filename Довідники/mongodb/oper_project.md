# $project (aggregation) 

https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project

- `$project` 

Передає документи із запитаними полями до наступного етапу конвеєра. Зазначені поля можуть бути існуючими полями з вхідних документів або нещодавно обчисленими полями. [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline -pipe.-project) етап має такий вигляд прототипу:

`{ $project: { <specification(s)> } }`

## Міркування

### Включити існуючі поля

- Поле `_id` за замовчуванням включено до вихідних документів. Щоб включити будь-які інші поля з вхідних документів у вихідні документи, ви повинні явно вказати включення в [`$project`.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project /#mongodb-pipeline-pipe.-project)
- Якщо ви вкажете включення поля, якого немає в документі, [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline -pipe.-project) ігнорує це включення поля та не додає поле до документа.

### Приховати поле `_id`

За замовчуванням поле `_id` включено до вихідних документів. Щоб виключити поле `_id` із вихідних документів, ви повинні явно вказати придушення поля `_id` у [`$project`.](https://www.mongodb.com/docs/manual/reference/operator /aggregation/project/#mongodb-pipeline-pipe.-project)

### Виключити поля

Якщо ви вкажете виключення поля або полів, усі інші поля повертаються у вихідних документах.

```js
{ $project: { 
    "<field1>": 0, 
    "<field2>": 0, ... 
} } // Return all but the specified fields
```

Якщо ви вкажете виключення поля, відмінного від `_id`, ви не зможете використовувати будь-який інший [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb -pipeline-pipe.-project) форми специфікації: тобто якщо ви виключаєте поля, ви також не можете вказати включення полів, скинути значення існуючих полів або додати нові поля. Це обмеження не стосується умовного виключення поля за допомогою змінної [`REMOVE`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.REMOVE).

Перегляньте також етап [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset), щоб виключити поля.

Ви можете використовувати змінну [`REMOVE`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.REMOVE) у виразах агрегації, щоб умовно приховати поле. Для прикладу див. [Умовно виключити поля.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#std-label-remove-example)

### Додати нові поля або скинути наявні поля

MongoDB також надає [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields), щоб додати нові поля до документів.

Щоб додати нове поле або скинути значення існуючого поля, вкажіть ім’я поля та встановіть для його значення певний вираз. Щоб отримати додаткові відомості про вирази, перегляньте [Вирази.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions)

Щоб установити значення поля безпосередньо на числовий або логічний літерал, на відміну від встановлення поля на вираз, який перетворюється на літерал, використовуйте [`$literal`](https://www.mongodb.com/docs/manual /reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) оператор. В іншому випадку [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) розглядає числовий або логічний літерал як позначку для включення або виключення поля.

Вказавши нове поле та встановивши його значення для шляху до наявного поля, можна ефективно перейменувати поле.

Етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) підтримує використання квадратних дужок `[]` для безпосереднього створення нових полів масиву. Якщо ви вказуєте поля масиву, які не існують у документі, операція замінює `null` як значення для цього поля. Для прикладу див. [Проектувати нові поля масиву.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#std-label-example-project-new-array-fields)

Ви не можете використовувати індекс масиву зі стадією [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project). Див. [Індекси масивів не підтримуються.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#std-label-example-project-array-indexes)

### Вбудовані поля документа

Під час проектування або додавання/скидання поля у вбудованому документі ви можете використовувати [точкове позначення](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-dot-notation), а саме

```
"contact.address.country": <1 or 0 or expression>
```

Або ви можете вкладати поля:

```
contact: { address: { country: <1 or 0 or expression> } }
```

Під час вкладення полів ви *не можете* використовувати крапкову нотацію всередині вбудованого документа для визначення поля, наприклад. `contact: { "address.country": <1 або 0 або вираз> }` є *недійсним*.

#### Path Collision Errors in Embedded Fields 

You cannot specify both an embedded document and a field within that embedded document in the same projection.

The following [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage fails with a `Path collision` error because it attempts to project both the embedded `contact` document and the `contact.address.country` field:

```js
{ $project: { 
    contact: 1, 
    "contact.address.country": 1 
} }
```

The error occurs regardless of the order in which the parent document and embedded field are specified. The following [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) fails with the same error:

```js
{ $project: { "contact.address.country": 1, contact: 1 } }
```

### `$project` Stage Placement 

When you use a `$project` stage it should typically be the last stage in your pipeline, used to specify which fields to return to the client.

Using a `$project` stage at the beginning or middle of a pipeline to reduce the number of fields passed to subsequent pipeline stages is unlikely to improve performance, as the database performs this optimization automatically.

### Restrictions 

An error is returned if the [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) specification is an empty document.

You cannot use an array index with the [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage. See [Array Indexes are Unsupported.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#std-label-example-project-array-indexes)

## Приклади

### Включіть певні поля у вихідні документи

Розглянемо колекцію `books`  із таким документом:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}
```

Наступний етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) включає лише `_id`, ` title` і поля `author` у вихідних документах:

```js
db.books.aggregate( 
    [ 
        { $project : {
            title : 1 , 
            author : 1 
        } } 
    ] )
```

Результатом операції є такий документ:

```js
{"_id" : 1, 
 "title" : "abc123", 
 "author" : { "last" : "zzz", "first" : "aaa" } }
```

### Приховати поле `_id` у вихідних документах

Поле `_id` завжди включено за замовчуванням. Щоб виключити поле `_id` із вихідних документів [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.- проект), вкажіть виключення поля `_id`, встановивши для нього значення `0` в проектному документі.

Розглянемо колекцію `books`  із таким документом:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}
```

Наступний етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) виключає поле `_id`, але включає поля `title` і `author` у вихідних документах:

```js
db.books.aggregate( [ { $project : { _id: 0, title : 1 , author : 1 } } ] )
```

Результатом операції є такий документ:

```js
{ "title" : "abc123", "author" : { "last" : "zzz", "first" : "aaa" } }
```

### Виключити поля з вихідних документів

Розглянемо колекцію `books` із таким документом:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}
```

The following [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage excludes the `lastModified` field from the output:

```js
db.books.aggregate( [ { $project : { "lastModified": 0 } } ] )
```

See also the [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset) stage to exclude fields.

### Виключити поля з вбудованих документів

Розглянемо колекцію `books` із таким документом:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}
```

Наступний етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) виключає `author.first` і Поля `lastModified` з результату:

```js
db.books.aggregate( [ 
    { $project : 
     { "author.first" : 0, 
      "lastModified" : 0 } 
    } ] )
```

Alternatively, you can nest the exclusion specification in a document:

```js
db.bookmarks.aggregate( [ { $project: { "author": { "first": 0}, "lastModified" : 0 } } ] )
```

Both specifications result in the same output:

```js
{
   "_id" : 1,
   "title" : "abc123",
   "isbn" : "0001122223334",
   "author" : {
      "last" : "zzz"
   },
   "copies" : 5,
}
```

See also the [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/#mongodb-pipeline-pipe.-unset) stage to exclude fields.

### Conditionally Exclude Fields 

You can use the variable [`REMOVE`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.REMOVE) in aggregation expressions to conditionally suppress a field.

Consider a `books` collection with the following document:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}
{
  "_id" : 2,
  title: "Baked Goods",
  isbn: "9999999999999",
  author: { last: "xyz", first: "abc", middle: "" },
  copies: 2,
  lastModified: "2017-07-21"
}
{
  "_id" : 3,
  title: "Ice Cream Cakes",
  isbn: "8888888888888",
  author: { last: "xyz", first: "abc", middle: "mmm" },
  copies: 5,
  lastModified: "2017-07-22"
}
```

The following [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage uses the [`REMOVE`](https://www.mongodb.com/docs/manual/reference/aggregation-variables/#mongodb-variable-variable.REMOVE) variable to excludes the `author.middle` field only if it equals `""`:

```js
db.books.aggregate( [
   {
      $project: {
         title: 1,
         "author.first": 1,
         "author.last" : 1,
         "author.middle": {
            $cond: {
               if: { $eq: [ "", "$author.middle" ] },
               then: "$$REMOVE",
               else: "$author.middle"
            }
         }
      }
   }
] )
```

The aggregation operation results in the following output:

```js
{ "_id" : 1, "title" : "abc123", "author" : { "last" : "zzz", "first" : "aaa" } }
{ "_id" : 2, "title" : "Baked Goods", "author" : { "last" : "xyz", "first" : "abc" } }
{ "_id" : 3, "title" : "Ice Cream Cakes", "author" : { "last" : "xyz", "first" : "abc", "middle" : "mmm" } }
```

### Include Specific Fields from Embedded Documents 

Consider a `bookmarks` collection with the following documents:

```js
{ _id: 1, user: "1234", stop: { title: "book1", author: "xyz", page: 32 } }
{ _id: 2, user: "7890", stop: [ { title: "book2", author: "abc", page: 5 }, { title: "book3", author: "ijk", page: 100 } ] }
```

To include only the `title` field in the embedded document in the `stop` field, you can use  the [dot notation:](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-dot-notation)

```js
db.bookmarks.aggregate( [ { $project: { "stop.title": 1 } } ] )
```

Or, you can nest the inclusion specification in a document:

```js
db.bookmarks.aggregate( [ { $project: { stop: { title: 1 } } } ] )
```

Both specifications result in the following documents:

```js
{ "_id" : 1, "stop" : { "title" : "book1" } }
{ "_id" : 2, "stop" : [ { "title" : "book2" }, { "title" : "book3" } ] }
```

### Включити обчислені поля

Розглянемо колекцію `books` із таким документом:

```js
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}
```

Наступний етап [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) додає нові поля `isbn`, `lastName` і `copiesSold`:

```js
db.books.aggregate(
   [
      {
         $project: {
            title: 1,
            isbn: {
               prefix: { $substr: [ "$isbn", 0, 3 ] },
               group: { $substr: [ "$isbn", 3, 2 ] },
               publisher: { $substr: [ "$isbn", 5, 4 ] },
               title: { $substr: [ "$isbn", 9, 3 ] },
               checkDigit: { $substr: [ "$isbn", 12, 1] }
            },
            lastName: "$author.last",
            copiesSold: "$copies"
         }
      }
   ]
)
```

Результатом операції є такий документ:

```js
{
   "_id" : 1,
   "title" : "abc123",
   "isbn" : {
      "prefix" : "000",
      "group" : "11",
      "publisher" : "2222",
      "title" : "333",
      "checkDigit" : "4"
   },
   "lastName" : "zzz",
   "copiesSold" : 5
}
```

### Project New Array Fields 

For example, if a collection includes the following document:

```js
{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "x" : 1, "y" : 1 }
```

The following operation projects the fields `x` and `y` as elements in a new field `myArray`:

```js
db.collection.aggregate( [ { $project: { myArray: [ "$x", "$y" ] } } ] )
```

The operation returns the following document:

```js
{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "myArray" : [ 1, 1 ] }
```

If array specification includes fields that are non-existent in a document, the operation substitutes `null` as the value for that field.

For example, given the same document as above, the following operation projects the fields `x`, `y`, and a non-existing field `$someField` as elements in a new field `myArray`:

```js
db.collection.aggregate( [ { $project: { myArray: [ "$x", "$y", "$someField" ] } } ] )
```

The operation returns the following document:

```js
{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "myArray" : [ 1, 1, null ] }
```



### Array Indexes are Unsupported 

You cannot use an array index with the [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage. This section shows an example.

Create the following `pizzas` collection:

```js
db.pizzas.insert( [
   { _id: 0, name: [ 'Pepperoni' ] },
] )
```

The following example returns the pizza:

```js
db.pizzas.aggregate( [
   { $project: { x: '$name', _id: 0 } },
] )
```

The pizza is returned in the example output:

```js
[ { x: [ 'Pepperoni' ] } ]
```

The following example uses an array index (`$name.0`) to attempt to return the pizza:

```js
db.pizzas.aggregate( [
   { $project: { x: '$name.0', _id: 0 } },
] )
```

The pizza is not returned in the example output:

```js
[ { x: [] } ]
```