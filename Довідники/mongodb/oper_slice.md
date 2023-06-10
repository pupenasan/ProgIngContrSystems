# $slice 

https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice

- `$slice` 

  Модифікатор [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice) обмежує кількість елементів масиву під час [ `$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push). Щоб спроектувати або повернути вказану кількість елементів масиву з операції читання, перегляньте [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/projection/slice/#mongodb -projection-proj.-slice) замість оператора проекції.

  Щоб використовувати модифікатор [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice), він **повинен** відображаються з модифікатором [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each). Ви можете передати порожній масив `[]` до [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each ).

```
{
  $push: {
     <field>: {
       $each: [ <value1>, <value2>, ... ],
       $slice: <num>
     }
  }
}
```

Починаючи з MongoDB 5.0, оператори оновлення обробляють поля документа з іменами на основі рядків у лексикографічному порядку. Поля з числовими іменами обробляються в порядку чисел. Перегляньте [Поведінка операторів оновлення](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators-processing-order) для отримання додаткової інформації.

Порядок, у якому з’являються модифікатори, не має значення. Попередні версії вимагали, щоб модифікатор [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) з’являвся як перший модифікатор якщо використовується в поєднанні з [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice). Список модифікаторів, доступних для [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push), див. [Modifiers.](https://www.mongodb.com/docs/manual/reference/operator/update/push/#std-label-push-modifiers)

Спроба використати модифікатор [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice) без [`$each `](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) модифікатор призводить до помилки.

### Вирізати з кінця масиву

Колекція `students` містить такий документ:

```
{ "_id" : 1, "scores" : [ 40, 50, 60 ] }
```

Наступна операція додає нові елементи до масиву `scores`, а потім використовує [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update -up.-slice) модифікатор для обрізання масиву до останніх п’яти елементів:

```
db.students.updateOne(
   { _id: 1 },
   {
     $push: {
       scores: {
         $each: [ 80, 78, 86 ],
         $slice: -5
       }
     }
   }
)
```

Результатом операції є розрізання елементів оновленого масиву `scores` до останніх п'яти елементів:

```
{ "_id" : 1, "scores" : [  50,  60,  80,  78,  86 ] }
```

### Фрагмент з передньої частини масиву

Колекція `students` містить такий документ:

```
{ "_id" : 2, "scores" : [ 89, 90 ] }
```

Наступна операція додає нові елементи до масиву `scores`, а потім використовує [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update -up.-slice) модифікатор для обрізання масиву до перших трьох елементів.

```
db.students.updateOne(
   { _id: 2 },
   {
     $push: {
       scores: {
         $each: [ 100, 20 ],
         $slice: 3
       }
     }
   }
)
```

Результатом операції є розділення елементів оновленого масиву `scores` на перші три елементи:

```
{ "_id" : 2, "scores" : [  89,  90,  100 ] }
```

### Оновити масив лише за допомогою Slice 

Колекція `students` містить такий документ:

```
{ "_id" : 3, "scores" : [  89,  70,  100,  20 ] }
```

Щоб оновити поле `scores` лише з ефектами [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.- slice) модифікатор, вкажіть кількість елементів, які потрібно розділити (наприклад, `-3`) для [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/# mongodb-update-up.-slice) і порожній масив `[]` для [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/# mongodb-update-up.-each), як показано нижче:

```
db.students.updateOne(
  { _id: 3 },
  {
    $push: {
      scores: {
         $each: [ ],
         $slice: -3
      }
    }
  }
)
```

Результатом операції є розділення елементів масиву `scores` на останні три елементи:

```
{ "_id" : 3, "scores" : [  70,  100,  20 ] }
```

### Use `$slice` with Other `$push` Modifiers 

Додайте такий документ до колекції `students`:

```
db.students.insertOne(
   {
      "_id" : 5,
      "quizzes" : [
         { "wk": 1, "score" : 10 },
         { "wk": 2, "score" : 8 },
         { "wk": 3, "score" : 5 },
         { "wk": 4, "score" : 6 }
      ]
   }
)
```

Наступна операція [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) використовує:

- модифікатор [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) для додавання кількох документів до тестів `quizzes` масив,
- модифікатор [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort) для сортування всіх елементів зміненого масив `quizzes` за полем `score` в порядку спадання та
- модифікатор [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice), щоб зберегти лише **перший** три відсортовані елементи масиву `quizzes`.

```
db.students.updateOne(
   { _id: 5 },
   {
     $push: {
       quizzes: {
          $each: [ { wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 } ],
          $sort: { score: -1 },
          $slice: 3
       }
     }
   }
)
```

Після операції лише три тести з найвищими балами знаходяться в масиві:

```
{
  "_id" : 5,
  "quizzes" : [
     { "wk" : 1, "score" : 10 },
     { "wk" : 2, "score" : 8 },
     { "wk" : 5, "score" : 8 }
  ]
}
```

Порядок модифікаторів не має значення для порядку обробки модифікаторів. Див. [Модифікатори](https://www.mongodb.com/docs/manual/reference/operator/update/push/#std-label-push-modifiers), щоб дізнатися більше.