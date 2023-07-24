# Lab: Using `$sort` and `$limit` Stages in a MongoDB Aggregation Pipeline

### Integrated Developer Environment

No need to install anything. Launch our in-browser Integrated Development Environment to complete this exercise.

## Intro

`$sort` and `$limit` Stages

У вас є база даних під назвою `bird_data` з колекцією спостережень. Ми хочемо використати ці дані, щоб знайти птахів, яких можна побачити найдалі на північ.

## Інструкції

Тепер ви підключені до кластера Atlas і до бази даних `bird_data`. Використовуйте колекцію "спостережень" у цій лабораторії.

1. Створіть конвеєр агрегації. (Забули команду або етапи агрегації? Перегляньте підказку нижче!)
2. Використовуйте етап `$sort`, щоб відсортувати дані з півночі на південь. Для цього скористайтеся `location.coordinates.1`, звернувши увагу на схему `{ location: { coordinates: [x, y] } }`, де найвище значення широти є найдальшою на північ. Літера  `y`  у схемі позначає широту.
3. Використовуйте етап `$limit`, щоб обмежити кількість документів, щоб вам відображалися перші 4 документи.
4. Запустіть свій конвеєр агрегації та дізнайтеся, яких птахів помітили далеко на північ!
5. Після виконання цієї лабораторної роботи порівняйте свою відповідь із правильною відповіддю в розділі «Review and Solved Code section», а потім виберіть «Далі».

## Підказки

- Remember that an aggregation pipeline must start with `db.<collection>.aggregate([])` in the MongoDB shell.
- Use `$sort` for the first stage, which takes:
  - A field
  - A sort value, either:
    - -1, to indicate a sort from the highest value to the lowest value
    - 1, to indicate a sort from the lowest value to the highest value
- Use a `$limit` stage, which simply takes the number of documents that you would like to have returned at one time.

## Мій код

```js
db.sightings.aggregate([
{
  $sort: {"location.coordinates.1": -1}
},
{
  $limit:  4
}
])
```

