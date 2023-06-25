# $limit (aggregation) 

https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/

`$limit` 

Обмежує кількість документів, що передаються на наступний етап у [конвеєрі.](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-pipeline)[`$limit` ](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) етап має таку форму прототипу:

`{ $limit: <positive 64-bit integer> }`

[`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) takes a positive integer that specifies the maximum number of documents to pass along.

## Behavior 

### Using $limit with Sorted Results 

If using the [`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) stage with any of:

- the [`$sort`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) aggregation stage,
- the [`sort()`](https://www.mongodb.com/docs/v6.0/reference/method/cursor.sort/#mongodb-method-cursor.sort) method, or
- the `sort` field to the [`findAndModify`](https://www.mongodb.com/docs/v6.0/reference/command/findAndModify/#mongodb-dbcommand-dbcmd.findAndModify) command or the [`findAndModify()`](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify) shell method,

be sure to include at least one field in your sort that contains unique values, before passing results to the [`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) stage.

Sorting on fields that contain duplicate values may return an inconsistent sort order for those duplicate fields over multiple executions, especially when the collection is actively receiving writes.

The easiest way to guarantee sort consistency is to include the `_id` field in your sort query.

See the following for more information on each:

- [Consistent sorting with $sort (aggregation)](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/sort/#std-label-sort-aggregation-consistent-sorting)
- [Consistent sorting with the sort() shell method](https://www.mongodb.com/docs/v6.0/reference/method/cursor.sort/#std-label-sort-cursor-consistent-sorting)
- [Consistent sorting with the findAndModify command](https://www.mongodb.com/docs/v6.0/reference/command/findAndModify/#std-label-findandmodify-command-consistent-sorting)
- [Consistent sorting with the findAndModify() shell method](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.findAndModify/#std-label-findandmodify-method-consistent-sorting)

## Example 

Consider the following example:

```
db.article.aggregate([
   { $limit : 5 }
]);
```

This operation returns only the first 5 documents passed to it by the pipeline. [`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) has no effect on the content of the documents it passes.

When a [`$sort`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) precedes a [`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) and there are no intervening stages that modify the number of documents, the optimizer can coalesce the [`$limit`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/limit/#mongodb-pipeline-pipe.-limit) into the [`$sort`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort). This allows the [`$sort`](https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/sort/#mongodb-pipeline-pipe.-sort) operation to only maintain the top `n` results as it progresses, where `n` is the specified limit, and ensures that MongoDB only needs to store `n` items in memory. This optimization still applies when `allowDiskUse` is `true` and the `n` items exceed the [aggregation memory limit.](https://www.mongodb.com/docs/v6.0/core/aggregation-pipeline-limits/#std-label-agg-memory-restrictions)