# `$out` Stage

You have a database called `bird_data` with a collection of  sightings. We're starting to put together our end-of-the-year report on  how many birds were seen. We want to put the sightings records in their  own collection so that we can manipulate the data later. To do that,  you'll use the aggregation stage `$out` to create a new collection.

Тепер ви підключені до кластера Atlas і до бази даних `bird_data`. Використовуйте колекцію `sightings` у цій лабораторії.

1. Спочатку створіть конвеєр агрегації, який буде містити два етапи. (Забули метод агрегації? Перегляньте підказку нижче!)
2. Створіть етап, який фільтрує, *зіставляючи* записи про спостереження, які відбулися у 2022 році.
3. Додайте етап, який виводить відфільтровані дані до нової колекції з назвою 'sightings_2022'.
4. Запустіть конвеєр агрегації.
5. Запустіть `db.sightings_2022.findOne()`, щоб побачити, чи створено нову колекцію!
6. Після виконання цієї лабораторної роботи порівняйте свою відповідь із правильною відповіддю в розділі «Перегляд і розв’язаний код», а потім виберіть «Далі».



- Remember that an aggregation pipeline must start with `db.<collection>.aggregate([])` in the MongoDB shell.
- Use the `$match`  stage to find specific documents. `$match` takes a query, where you should:
  - Specify dates after the first day of 2022 using `$gt: ISODate("2022-01-01T00:00:00.0Z")`
  - Specify dates before the first day of 2023 using `$lt: ISODate("2023-01-01T00:00:00.0Z")`
- Use an `$out` stage, which requires a string that will be the name of the new collection.

## Мій код

```js
db.sightings.aggregate([
    {	$match: { 
      		date: { $gt: ISODate("2022-01-01T00:00:00.0Z"),
      				$lt: ISODate("2023-01-01T00:00:00.0Z")
             }
    }},
    {
        $out: "sightings_2022" 
    }
])  
```

