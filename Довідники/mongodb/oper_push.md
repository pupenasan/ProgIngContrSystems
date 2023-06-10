# $push 

https://www.mongodb.com/docs/manual/reference/operator/update/push/

## Definition 

- `$push` 

  Оператор [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) додає вказане значення до масиву. Оператор [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) має вигляд:

```
{ $push: { <field1>: <value1>, ... } }
```

## Поведінка

Починаючи з MongoDB 5.0, оператори оновлення обробляють поля документа з іменами на основі рядків у лексикографічному порядку. Поля з числовими іменами обробляються в порядку чисел. Перегляньте [Поведінка операторів оновлення](https://www.mongodb.com/docs/manual/reference/operator/update/#std-label-update-operators-processing-order) для отримання додаткової інформації.

Якщо поле для оновлення відсутнє в документі, [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) додає поле масиву зі значенням як його елемент.

Якщо поле **не** є масивом, операція не вдасться.

Якщо значення є масивом, [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) додає весь масив як *окремий* елемент. Щоб додати кожен елемент значення окремо, використовуйте [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) модифікатор із [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push). Для прикладу див. [Додавання значення до масивів у кількох документах](https://www.mongodb.com/docs/manual/reference/operator/update/push/#std-label-example-push-each). Список модифікаторів, доступних для [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push), див. [Modifiers.](https://www.mongodb.com/docs/manual/reference/operator/update/push/#std-label-push-modifiers)

Починаючи з MongoDB 5.0, [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) більше не викликає помилку під час використання оновлення такий оператор, як [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) з порожнім виразом операнда ( `{ } ` ). Порожнє оновлення не призводить до змін і не створюється запис [oplog](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-oplog) (це означає, що операція не є op).

## Modifiers 

Ви можете використовувати оператор [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) із такими модифікаторами:

| Modifier                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) | Додає кілька значень до поля масиву.                         |
| [`$slice`](oper_slice.md)                                    | Обмежує кількість елементів масиву. Вимагає використання модифікатора [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each). |
| [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort) | Упорядковує елементи масиву. Вимагає використання модифікатора [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each). |
| [`$position`](https://www.mongodb.com/docs/manual/reference/operator/update/position/#mongodb-update-up.-position) | Означує розташування в масиві, куди потрібно вставити нові елементи. Вимагає використання модифікатора [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each). Без модифікатора [`$position`](https://www.mongodb.com/docs/manual/reference/operator/update/position/#mongodb-update-up.-position) [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) додає елементи в кінець масиву. |

При використанні з модифікаторами оператор [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) має вигляд:

```
{ $push: { <field1>: { <modifier1>: <value1>, ... }, ... } }
```

Обробка операції [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) з модифікаторами відбувається наступним чином порядку, незалежно від порядку, в якому з'являються модифікатори:

1. Оновіть масив, щоб додати елементи в правильну позицію.
2. Застосувати сортування, якщо вказано.
3. Розділіть масив, якщо вказано.
4. Збережіть масив.

## Приклади

Create the `students` collection:

```
db.students.insertOne( { _id: 1, scores: [ 44, 78, 38, 80 ] } )
```

### Додавання значення до масиву

У наступному прикладі до масиву `scores` додається `89`:

```
db.students.updateOne(
   { _id: 1 },
   { $push: { scores: 89 } }
)
```

Приклад результату:

```
{ _id: 1, scores: [ 44, 78, 38, 80, 89 ] }
```

### Додайте значення до масивів у кількох документах

Додайте такі документи до колекції `students`:

```
db.students.insertMany( [
   { _id: 2, scores: [ 45, 78, 38, 80, 89 ] } ,
   { _id: 3, scores: [ 46, 78, 38, 80, 89 ] } ,
   { _id: 4, scores: [ 47, 78, 38, 80, 89 ] }
] )
```

Наступна операція [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) додає `95` до масиву `scores` у кожному документі:

```
db.students.updateMany(
   { },
   { $push: { scores: 95 } }
)
```

Щоб підтвердити, що кожен масив `scores` містить `95`, виконайте таку операцію:

```
db.students.find()
```

Операція повертає такі результати:

```
[
   { _id: 1, scores: [ 44, 78, 38, 80, 89, 95 ] },
   { _id: 2, scores: [ 45, 78, 38, 80, 89, 95 ] },
   { _id: 3, scores: [ 46, 78, 38, 80, 89, 95 ] },
   { _id: 4, scores: [ 47, 78, 38, 80, 89, 95 ] }
]
```

### Додавання кількох значень до масиву

Використовуйте [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) з [`$each`](https ://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) модифікатор для додавання кількох значень до поля масиву.

У наведеному нижче прикладі кожен елемент `[ 90, 92, 85 ]` додається до масиву `scores` для документа, де поле `name` дорівнює `joe`:

```
db.students.updateOne(
   { name: "joe" },
   { $push: { scores: { $each: [ 90, 92, 85 ] } } }
)
```

### Use `$push` Operator with Multiple Modifiers 

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

- модифікатор [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) для додавання кількох документів до масиву `quizzes`,
- модифікатор [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort) для сортування всіх елементів зміненого масив `quizzes` за полем `score` в порядку спадання та
- модифікатор [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice), щоб зберегти лише **перші** три відсортовані елементи масиву `quizzes`.

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