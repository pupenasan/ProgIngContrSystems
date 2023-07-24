# `$project` Stage

## Intro

У вас є база даних під назвою `bird_data` з колекцією спостережень. У кожному документі є багато даних, але ми хочемо повернути лише список часу спостереження та загальну назву птаха, який був помічений.

## Інструкції

Тепер ви підключені до кластера Atlas і до бази даних `bird_data`. Використовуйте колекцію `sightings`  у цій лабораторії.

1. Створіть конвеєр агрегації для колекції `sightings`. (Забули команду або етапи агрегації? Перегляньте підказку нижче!)
2. Створіть стадію `$project`, яка лише покаже нам поле "date" і "species_common". Вилучіть з проекту поле "_id".
3. Запустіть конвеєр агрегації та перегляньте список спостережень!
4. Після виконання цієї лабораторної роботи порівняйте свою відповідь із правильною відповіддю в розділі «Перегляд і розв’язаний код», а потім виберіть «Далі».

## Поради

- Пам’ятайте, що конвеєр агрегації має починатися з `db.<collection>.aggregate([])` в оболонці MongoDB.

- Етап агрегації буде етапом `$project`, який показує лише вказані поля, щоб полегшити перегляд даних.

## Мій код

```js
db.sightings.aggregate([
    {
        $project: {
        	date:1, 
        	species_common:1,
        	_id:0
    	}
    }
])
```

# `$set` Stage

## Intro

У вас є база даних під назвою `bird_data` з колекцією інформації про види птахів. У майбутньому ми додамо нових тварин до бази та колекції. Перш ніж ми це зробимо, нам потрібно додати поле `class` і встановити для цього поля значення `bird` в усіх існуючих документах колекції

## Інструкції

Тепер ви підключені до кластера Atlas і до бази даних `bird_data`. Використовуйте колекцію `birds` в цій лабораторії.

1. Створіть конвеєр агрегації для колекції `birds`. *(Забули команду або етапи агрегації? Перегляньте підказку нижче!)*
2. Створіть нове поле під назвою `class`, заповнене класом кожної з цих тварин, птахів.
3. Запустіть конвеєр агрегації та переконайтеся, що поле `class` було додано та встановлено на «bird».
4. Після виконання цієї лабораторної роботи порівняйте свою відповідь із правильною відповіддю в розділі «Перегляд і розв’язаний код», а потім виберіть «Далі».

## Поради

- Пам’ятайте, що конвеєр агрегації має починатися з `db.<collection>.aggregate([])` в оболонці MongoDB.
- Використовуйте етап `$set`, щоб додати нове поле зі значенням до кожного документа.

## Мій код

```js
db.birds.aggregate([
{
    $set: {
        class: 'bird'
     }
  }
])    
```



# `$count` stage

## Intro

You have a database called `bird_data` with a collection of sightings. We want to see the total number of sightings of Eastern Bluebirds in 2022.

## Інструкції

You are now connected to an Atlas cluster and to the `bird_data` database. Use the `sightings` collection in this lab.

1. Create an aggregation pipeline on the `sightings` collection. *(Forgot the command or aggregation stages? Check the hint below!)*
2. Create a stage that finds matches where `species_common` is "Eastern Bluebird" and where the `date` field is a value between January 1, 2022 0:00, and January 1, 2023 0:00.
3. Create a stage to count how many sightings that includes.
4. Run your aggregation pipeline, and see how many sightings of Eastern Bluebirds took place in 2022.
5. Once you complete this lab, compare your answer to the correct answer in the Review and Solved Code section, then select Next.

## Поради

- Пам’ятайте, що конвеєр агрегації має починатися з `db.<collection>.aggregate([])` в оболонці MongoDB.

- Використовуйте етап `$match`, щоб знайти певні документи.

   `$match` приймає запит, де ви повинні:

   - Укажіть дати після першого дня 2022 року за допомогою `$gt: ISODate("2022-01-01T00:00:00.0Z")`
   - Укажіть дати до першого дня 2023 року за допомогою `$lt: ISODate("2023-01-01T00:00:00.0Z")`
   - Укажіть `species_common` як "Eastern Bluebird".

- Використовуйте етап `$count`, щоб показати, скільки спостережень Bluebird було в полі під назвою "Bluebird_sightings_2022"

## Мій код

```js
db.sightings.aggregate([
    {	$match: { 
      		species_common: "Eastern Bluebird",
      		date: { $gt: ISODate("2022-01-01T00:00:00.0Z"),
      			$lt: ISODate("2023-01-01T00:00:00.0Z")
             }
    }},
    {
        $count: "Bluebird_sightings_2022" 
    }
])  
```

