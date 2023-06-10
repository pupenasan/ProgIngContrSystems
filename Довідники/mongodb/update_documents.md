# Update Documents

https://www.mongodb.com/docs/manual/tutorial/update-documents/

Ця сторінка використовує такі методи [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh):

- [`db.collection.updateOne(, , )`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne)
- [`db.collection.updateMany(, , )`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/#mongodb-method-db.collection.updateMany)
- [`db.collection.replaceOne(, , )`](https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne/#mongodb-method-db.collection.replaceOne)

У прикладах на цій сторінці використовується колекція `inventory`. Підключіться до тестової бази даних у своєму екземплярі MongoDB, а потім створіть колекцію `inventory`:

```
db.inventory.insertMany( [
   { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
   { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
] );
```

## Update Documents in a Collection

Щоб оновити документ, MongoDB надає [оператори оновлення](QueryUpdateOperators.md), наприклад [`$set`](https://www.mongodb .com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set), щоб змінити значення полів.

Щоб використовувати оператори оновлення, передайте методам оновлення документ оновлення форми:

```
{
  <update operator>: { <field1>: <value1>, ... },
  <update operator>: { <field2>: <value2>, ... },
  ...
}
```

Деякі оператори оновлення, наприклад [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set), створять поле якщо поле не існує. Додаткову інформацію можна знайти в окремому довіднику [оператора оновлення](QueryUpdateOperators.md).

Починаючи з MongoDB 4.2, MongoDB може прийняти конвеєр агрегації, щоб указати зміни, які потрібно внести замість документа оновлення. Перегляньте довідкову сторінку методу, щоб дізнатися більше.

### Update a Single Document

У наступному прикладі використовується [`db.collection.updateOne()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection. updateOne) у колекції `inventory` для оновлення *першого* документа, де `item` дорівнює `"paper"`:

```
db.inventory.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

Операція оновлення:

- використовує оператор [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) для оновлення значення ` поле size.uom` на `"cm"`, а значення поля `status` на `"P"`,
- використовує оператор [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) для оновлення значення ` lastModified` до поточної дати. Якщо поле `lastModified` не існує, [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) створить поле. Див. [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate), щоб дізнатися більше.

```
db.inventory.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
)
```

Операція оновлення:

- використовує оператор [`$set`](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) для оновлення значення ` поле size.uom` на `"in"`, а значення поля `status` на `"P"`,
- використовує оператор [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) для оновлення значення ` lastModified` до поточної дати. Якщо поле `lastModified` не існує, [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate) створить поле. Див. [`$currentDate`](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/#mongodb-update-up.-currentDate), щоб дізнатися більше.

```
db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)
```

## Поведінка

### Атомність

Усі операції запису в MongoDB є атомарними на рівні одного документа. Щоб отримати додаткові відомості про MongoDB і атомарність, перегляньте [Атомарність і транзакції.](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/)

### Поле `_id`

Після встановлення ви не зможете оновити значення поля `_id`, а також не зможете замінити наявний документ документом на заміну, який має інше значення поля `_id`.

### Порядок полів

Для операцій запису MongoDB зберігає порядок полів документа *за винятком* таких випадків:

- Поле `_id` завжди є першим полем у документі.
- Оновлення, які включають [`перейменування`](https://www.mongodb.com/docs/manual/reference/operator/update/rename/#mongodb-update-up.-rename) імен полів, можуть призвести до зміни порядку полів у документі.

### Напишіть підтвердження

У разі проблем із записом ви можете вказати рівень підтвердження, запитуваний у MongoDB для операцій запису. Щоб отримати докладнішу інформацію, див.