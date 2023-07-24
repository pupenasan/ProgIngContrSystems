# Aggregation

# Introduction to MongoDB Aggregation

This section contains key definitions for this lesson, as well as the code for an aggregation pipeline.

## Definitions

- **Aggregation**: Collection and summary of data
- **Stage**: One of the built-in methods that can be completed on the data, but does not permanently alter it
- **Aggregation pipeline**: A series of stages completed on the data in order

## Structure of an Aggregation Pipeline

```js
db.collection.aggregate([
    {
        $stage1: {
            { expression1 },
            { expression2 }...
        },
        $stage2: {
            { expression1 }...
        }
    }
])
```

# Using `$match` and `$group` Stages in a MongoDB Aggregation Pipeline

Перегляньте наступні розділи, у яких показано код для етапів агрегації `$match` і `$group`.

## `$match`

Етап `$match` фільтрує документи, які відповідають заданим умовам. Ось код для `$match`:

```
{
  $match: {
     "field_name": "value"
  }
}
```

## `$group`

Етап `$group` групує документи за ключем групи.

```
{
  $group:
    {
      _id: <expression>, // Group key
      <field>: { <accumulator> : <expression> }
    }
 }
```

## `$match` and `$group` in an Aggregation Pipeline

Наступний конвеєр агрегації знаходить документи з полем під назвою «state», яке відповідає значенню «CA», а потім групує ці документи за ключем групи «$city» і показує загальну кількість поштових індексів у штаті California.

```
db.zips.aggregate([
{   
   $match: { 
      state: "CA"
    }
},
{
   $group: {
      _id: "$city",
      totalZips: { $count : { } }
   }
}
])
```

# Using `$sort` and `$limit` Stages in a MongoDB Aggregation Pipeline

Перегляньте наступні розділи, у яких показано код для етапів агрегації `$sort` і `$limit`.

## `$sort`

Етап `$sort` сортує всі вхідні документи та повертає їх у конвеєр у відсортованому порядку. Ми використовуємо `1` для представлення порядку зростання, а `-1` для представлення порядку спадання.

```
{
    $sort: {
        "field_name": 1
    }
}
```



## `$limit`

Етап `$limit` повертає лише вказану кількість записів.

```
{
  $limit: 5
}
```



## `$sort` and `$limit` in an Aggregation Pipeline

Наступний конвеєр агрегації сортує документи в порядку спадання, тому документи з найбільшим значенням `pop` з'являються першими, і обмежує вихід лише першими п'ятьма документами після сортування.

```
db.zips.aggregate([
{
  $sort: {
    pop: -1
  }
},
{
  $limit:  5
}
])
```

# Using `$project`, `$count`, and `$set` Stages in a MongoDB Aggregation Pipeline

Перегляньте наступні розділи, у яких показано код для етапів агрегації `$project`, `$set` і `$count`.

## `$project`

Етап `$project` визначає поля вихідних документів. 1 означає, що поле має бути включено, а 0 означає, що поле має бути приховане. Полю також можна призначити нове значення.

```
{
    $project: {
        state:1, 
        zip:1,
        population:"$pop",
        _id:0
    }
}
```

## `$set`

Етап `$set` створює нові поля або змінює значення існуючих полів, а потім виводить документи з новими полями.

```
{
    $set: {
        place: {
            $concat:["$city",",","$state"]
        },
        pop:10000
     }
  }
```

## `$count`

На етапі `$count` створюється новий документ із кількістю документів на цьому етапі в конвеєрі агрегації, призначених вказаному імені поля.

```
{
  $count: "total_zips"
}
```



# MongoDB Aggregation Summary

In this unit, you learned how to use aggregation in  MongoDB and create an aggregation pipeline. You also learned how to use  several of the most common aggregation stages, including:

- `$match`
- `$group`
- `$sort`
- `$limit`
- `$project`
- `$count`
- `$set`
- `$out`

## Resources

Use the following resources to learn more about inserting and finding documents in MongoDB:

### Lesson 01: Introduction to MongoDB Aggregation

- [MongoDB Docs: Aggregation Operations](https://www.mongodb.com/docs/manual/aggregation/?_ga=2.22334523.1428255275.1687942654-1864661043.1675940701)
- [MongoDB Docs: Aggregation Pipelines](https://www.mongodb.com/docs/manual/aggregation/#std-label-aggregation-pipeline-intro)

### Lesson 02: Using `$match` and `$group` Stages in a MongoDB Aggregation Pipeline

- [MongoDB Docs: `$match`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
- [MongoDB Docs: `$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)

### Lesson 03: Using `$sort` and `$limit` Stages in a MongoDB Aggregation Pipeline

- [MongoDB Docs: `$sort`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)
- [MongoDB Docs: `$limit`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit)

### Lesson 04: Using `$project`, `$count`, and `$set` Stages in a MongoDB Aggregation Pipeline

- [MongoDB Docs: `$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)
- [MongoDB Docs: `$count`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/)
- [MongoDB Docs: `$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/)

### Lesson 05: Using `$out` Stage in a MongoDB Aggregation Pipeline

- [MongoDB Docs: `$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/)