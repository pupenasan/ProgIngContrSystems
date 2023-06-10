https://www.mongodb.com/docs/manual/reference/operator/update/

# Update Operators

Наступні модифікатори доступні для використання в операціях оновлення, наприклад, у [`db.collection.updateMany()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany) and [`db.collection.findAndModify()`.](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify)

Вкажіть операторний вираз у документі виду:

```json
{
   <operator1>: { <field1>: <value1>, ... },
   <operator2>: { <field2>: <value2>, ... },
   ...
}
```

### Поведінка

Починаючи з MongoDB 5.0, оператори оновлення обробляють поля документа з іменами на основі рядків у лексикографічному порядку. Поля з числовими іменами обробляються в порядку чисел. У MongoDB 4.4 і раніших версіях оператори оновлення обробляють усі поля документа в лексикографічному порядку.

Розглянемо цю команду [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set):

```json
{ $set: { "a.2": <new value>, "a.10": <new value>, } }
```

У MongoDB 5.0 і пізніших версіях `"a.2"` обробляється перед `"a.10"`, тому що `2` стоїть перед `10` у числовому порядку. У MongoDB 4.4 і раніших версіях `"a.10"` обробляється перед `"a.2"`, оскільки `"10"` стоїть перед `"2"` у лексикографічному порядку.

### Поля

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) | Встановлює значення поля на поточну дату, або як Date , або як Timestamp. |
| [`$inc`](https://www.mongodb.com/docs/manual/reference/operator/update/inc/#mongodb-update-up.-inc) | Збільшує значення поля на вказане значення.                  |
| [`$min`](https://www.mongodb.com/docs/manual/reference/operator/update/min/#mongodb-update-up.-min) | Оновлює поле, лише якщо вказане значення менше за наявне значення поля. |
| [`$max`](https://www.mongodb.com/docs/manual/reference/operator/update/max/#mongodb-update-up.-max) | Оновлює поле, лише якщо вказане значення перевищує наявне значення поля. |
| [`$mul`](https://www.mongodb.com/docs/manual/reference/operator/update/mul/#mongodb-update-up.-mul) | Множить значення поля на вказане значення.                   |
| [`$rename`](https://www.mongodb.com/docs/manual/reference/operator/update/rename/#mongodb-update-up.-rename) | Перейменовує поле.                                           |
| [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) | Встановлює значення поля в документі.                        |
| [`$setOnInsert`](https://www.mongodb.com/docs/manual/reference/operator/update/setOnInsert/#mongodb-update-up.-setOnInsert) | Встановлює значення поля, якщо оновлення призводить до вставки документа. Не впливає на операції оновлення, які змінюють існуючі документи. |
| [`$unset`](https://www.mongodb.com/docs/manual/reference/operator/update/unset/#mongodb-update-up.-unset) | Видаляє вказане поле з документа.                            |

### Масив

#### Оператори

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$`](https://www.mongodb.com/docs/manual/reference/operator/update/positional/#mongodb-update-up.-) | Діє як заповнювач для оновлення першого елемента, який відповідає умові запиту. |
| [`$[<identifier>]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-all/#mongodb-update-up.---) | Діє як заповнювач для оновлення всіх елементів у масиві для документів, які відповідають умові запиту. |
| [`$[\]`](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#mongodb-update-up.---identifier--) | Діє як заповнювач для оновлення всіх елементів, які відповідають умові `arrayFilters` для документів, які відповідають умові запиту. |
| [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) | Додає елементи до масиву, лише якщо вони ще не існують у наборі. |
| [`$pop`](https://www.mongodb.com/docs/manual/reference/operator/update/pop/#mongodb-update-up.-pop) | Видаляє перший або останній елемент масиву.                  |
| [`$pull`](https://www.mongodb.com/docs/manual/reference/operator/update/pull/#mongodb-update-up.-pull) | Видаляє всі елементи масиву, які відповідають заданому запиту. |
| [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) | Додає елемент до масиву.                                     |
| [`$pullAll`](https://www.mongodb.com/docs/manual/reference/operator/update/pullAll/#mongodb-update-up.-pullAll) | Видаляє всі відповідні значення з масиву.                    |

#### Модифікатори

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$each`](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) | Змінює [`$push`](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) і [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) для додавання кількох елементів для оновлення масиву. |
| [`$position`](https://www.mongodb.com/docs/manual/reference/operator/update/position/#mongodb-update-up.-position) | Modifies the `$push` operator to specify the position in the array to add elements. Змінює оператор `$push`, щоб указати позицію в масиві для додавання елементів. |
| [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/update/slice/#mongodb-update-up.-slice) | Змінює оператор `$push`, щоб обмежити розмір оновлених масивів. |
| [`$sort`](https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort) | Змінює оператор `$push`, щоб змінити порядок документів, що зберігаються в масиві. |

### Bitwise

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$bit`](https://www.mongodb.com/docs/manual/reference/operator/update/bit/#mongodb-update-up.-bit) | Виконує порозрядне оновлення цілочисельних значень операторами «І», «АБО» та «XOR». |