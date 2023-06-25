# $match (aggregation) 

https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/

- `$match` 

Фільтрує документи, щоб передати на наступний етап конвеєра лише ті документи, які відповідають зазначеним умовам. [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/ aggregation/match/#mongodb-pipeline-pipe.-match) етап має таку форму прототипу:

`{ $match: { <query> } }`

## Поведінка

### Оптимізація конвеєра

- Розмістіть [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) якомога раніше в агрегації [ pipeline](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-pipeline), наскільки це можливо. Оскільки [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) обмежує загальну кількість документів у конвеєр агрегації, попередні операції [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) мінімізують кількість обробка вниз по трубі.
- Якщо ви розмістите [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) на самому початку конвеєра, запит може використовувати переваги [індексів](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-index), як і будь-який інший [`db.collection. find()`](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.find/#mongodb-method-db.collection.find) або [`db.collection. findOne()`.](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.findOne/#mongodb-method-db.collection.findOne)

### Обмеження

- Синтаксис запиту [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) ідентичний до [read operation query](https://www.mongodb.com/docs/v6.0/tutorial/query-documents/#std-label-read-operations-query-argument) синтаксис; тобто [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) не приймає [необроблені вирази агрегування](https://www.mongodb.com/docs/v6.0/meta/aggregation-quick-reference/#std-label-aggregation-expressions). Щоб включити вираз агрегації в [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match), використовуйте [ `$expr`](https://www.mongodb.com/docs/v6.0/reference/operator/query/expr/#mongodb-query-op.-expr) вираз запиту:

  ```
  { $match: { $expr: { <aggregation expression> } } }
  ```

- You cannot use [`$where`](https://www.mongodb.com/docs/v6.0/reference/operator/query/where/#mongodb-query-op.-where) in [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) queries as part of the aggregation pipeline.

- You cannot use [`$near`](https://www.mongodb.com/docs/v6.0/reference/operator/query/near/#mongodb-query-op.-near) or [`$nearSphere`](https://www.mongodb.com/docs/v6.0/reference/operator/query/nearSphere/#mongodb-query-op.-nearSphere) in [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) queries as part of the aggregation pipeline. As an alternative, you can either:

  - Use [`$geoNear`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/geoNear/#mongodb-pipeline-pipe.-geoNear) stage instead of the [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) stage.
  - Use [`$geoWithin`](https://www.mongodb.com/docs/v6.0/reference/operator/query/geoWithin/#mongodb-query-op.-geoWithin) query operator with [`$center`](https://www.mongodb.com/docs/v6.0/reference/operator/query/center/#mongodb-query-op.-center) or [`$centerSphere`](https://www.mongodb.com/docs/v6.0/reference/operator/query/centerSphere/#mongodb-query-op.-centerSphere) in the [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) stage.

- To use [`$text`](https://www.mongodb.com/docs/v6.0/reference/operator/query/text/#mongodb-query-op.-text) in the [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) stage, the [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) stage has to be the first stage of the pipeline.

  [Views](https://www.mongodb.com/docs/v6.0/core/views/) do not support text search.

## Приклади

The examples use a collection named `articles` with the following documents:

```js
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "author" : "ahn", "score" : 60, "views" : 1000 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b258"), "author" : "li", "score" : 55, "views" : 5000 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b259"), "author" : "annT", "score" : 60, "views" : 50 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25a"), "author" : "li", "score" : 94, "views" : 999 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25b"), "author" : "ty", "score" : 95, "views" : 1000 }
```

### Equality Match 

The following operation uses [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) to perform a simple equality match:

```js
db.articles.aggregate(
    [ { $match : { author : "dave" } } ]
);
```

The [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) selects the documents where the `author` field equals `dave`, and the aggregation returns the following:

```js
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 }
```

### Perform a Count 

The following example selects documents to process using the [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) pipeline operator and then pipes the results to the [`$group`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) pipeline operator to compute a count of the documents:

```js
db.articles.aggregate( [
  { $match: { $or: [ { score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } } ] } },
  { $group: { _id: null, count: { $sum: 1 } } }
] );
```

In the aggregation pipeline, [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) selects the documents where either the `score` is greater than `70` and less than `90` or the `views` is greater than or equal to `1000`. These documents are then piped to the [`$group`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) to perform a count. The aggregation returns the following:

```js
{ "_id" : null, "count" : 5 }
```

## Additional Information 

Refer to the following pages for more information and use cases on aggregation.

### Filter Data on Atlas Using Atlas Search 

For your [`$search`](https://www.mongodb.com/docs/atlas/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search) queries against data on your [Atlas](https://www.mongodb.com/docs/atlas/) cluster, you can use the [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/) [compound](https://www.mongodb.com/docs/atlas/atlas-search/compound/#std-label-compound-ref) operator `filter` option to match or filter documents. Running [`$match`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/match/#mongodb-pipeline-pipe.-match) after [`$search`](https://www.mongodb.com/docs/atlas/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search) is less performant than running [`$search`](https://www.mongodb.com/docs/atlas/atlas-search/query-syntax/#mongodb-pipeline-pipe.-search) with the [compound](https://www.mongodb.com/docs/atlas/atlas-search/compound/#std-label-compound-ref) operator `filter` option. To learn more about the `filter` option, see [compound.](https://www.mongodb.com/docs/atlas/atlas-search/compound/#std-label-compound-ref)