# Lab: Using `$match` and `$group` Stages in a MongoDB Aggregation Pipeline

## Етапи `$match` і `$group`

У вас є база даних під назвою `bird_data` з колекцією спостережень. Ми хочемо використати ці дані, щоб дізнатися, куди нам варто поїхати, щоб побачити нашого улюбленого птаха, східного синього птаха Eastern Bluebirds. Ми використовуватимемо координати розташування (широту та довготу) і кількість спостережень у кожному місці, щоб визначити найкращі місця для огляду східних синіх птахів.

## Інструкції

Тепер ви підключені до кластера Atlas і до бази даних `bird_data`. Використовуйте колекцію `sightings` у цій лабораторії.

1. Спочатку створіть конвеєр агрегації, який буде містити два етапи. (Забули метод агрегації? Перегляньте підказку нижче!)
2. Створіть етап `$match`, який фільтрує документи про нашого цільового птаха зі значенням `species_common`, "Eastern Bluebird"
3. Створіть етап `$group`, який групує документи на основі широти та довготи спостереження, що зберігається в полі `location.coordinates`.
4. У групах створіть поле для відображення `$count` кількості документів у кожній групі, яке називається "number_of_sightings".
5. Запустіть свій конвеєр агрегації та дізнайтеся, де шукати Eastern Bluebirds!
6. Після виконання цієї лабораторної роботи порівняйте свою відповідь із правильною відповіддю в розділі «Review and Solved Code section», а потім виберіть «Далі».

## Підказки

- Пам’ятайте, що конвеєр агрегації має починатися з `db.<collection>.aggregate([])` в оболонці MongoDB.
- Перший етап буде етапом `$match`, який виконує запит для пошуку конкретних документів.
- Другий етап буде етапом `$group`, який вимагатиме:
  - `_id`, поле, яке використовується для групування документів
  - `$count`, оператор накопичувача, який використовується для підрахунку кількості документів у кожній групі
- Схема для документів у колекції `sightings` використовує масив координат для відстеження `location` місця спостереження за птахом, перший елемент (0) — це довгота, а другий елемент (1) — широта, `{ location: { coordinates: [x, y] } }`.

## Моє рішення

```js
db.sightings.aggregate([
{   
   $match: { 
      species_common: "Eastern Bluebird"
    }
},
{
   $group: {
      _id: "$location.coordinates",
      number_of_sightings: { $count : { } }
   }
}
])
```

відповідь

```
[
  { _id: [ 40, -74 ], number_of_sightings: 3 },
  { _id: [ 41, -74 ], number_of_sightings: 1 },
  { _id: [ 40, -73 ], number_of_sightings: 1 }
]
```

## Їх рішення

You can access the collection you want to use with dot notation:

```
db.sightings
```

Use the `aggregate` method to set up the aggregation pipeline.

The first stage will be `$match` which accepts a simple query to filter for specific documents. In this case, we use the `species_common`field to query for our favorite bird, the Eastern Bluebird.

```
db.sightings.aggregate([
  {
    $match: {
        species_common: 'Eastern Bluebird'
    }
  }
])
```

Then we want to see how many sightings occured at each location, so  we can go to the place where we are most likely to see an Eastern  Bluebird. To do this, we will use `$group` and set the required `_id` field to be the location coordinates, and create a field for the number of sightings, using `$count` to total the number of records at each of the coordinate points.

```
db.sightings.aggregate([
  {
    $match: {
        species_common: 'Eastern Bluebird'
    }
  }, {
    $group: {
        _id: '$location.coordinates',
        number_of_sightings: { $count: {} }
    }
  }
])
```

### Solved Code

```
db.sightings.aggregate([
  {
    $match: {
        species_common: 'Eastern Bluebird'
    }
  }, {
    $group: {
        _id: '$location.coordinates',
        number_of_sightings: {
            $count: {}
        }
    }
  }
])
```