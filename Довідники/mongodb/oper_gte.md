https://www.mongodb.com/docs/v6.0/reference/operator/query/gte/

# $gte 

## Definition 

`$gte` 

*Syntax*: `{ field: { $gte: value } }`[`$gte`](https://www.mongodb.com/docs/v6.0/reference/operator/query/gte/#mongodb-query-op.-gte) selects the documents where the value of the `field` is greater than or equal to (i.e. `>=`) a specified value (e.g. `value`.)For most data types, [comparison operators](https://www.mongodb.com/docs/v6.0/reference/operator/query-comparison/) only perform comparisons on fields where the [BSON type](https://www.mongodb.com/docs/v6.0/reference/bson-types/) matches the query value's type. MongoDB supports limited cross-BSON comparison through [Type Bracketing.](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.find/#std-label-type-bracketing)

## Examples 

The following examples use the `inventory` collection. Create the collection:

```
db.inventory.insertMany( [
   {
      "item": "nuts", "quantity": 30,
      "carrier": { "name": "Shipit", "fee": 3 }
   },
   {
      "item": "bolts", "quantity": 50,
      "carrier": { "name": "Shipit", "fee": 4 }
   },
   {
      "item": "washers", "quantity": 10,
      "carrier": { "name": "Shipit", "fee": 1 }
   }
] )
```

### Match Document Fields

Select all documents in the `inventory` collection where `quantity` is greater than or equal to `20`:

```
db.inventory.find( { quantity: { $gte: 20 } } )
```

Example output:

```
 {
   _id: ObjectId("61bb51211b83c864e3bbe037"),
   item: 'nuts',
   quantity: 30,
   carrier: { name: 'Shipit', fee: 3 }
 },
 {
   _id: ObjectId("61bb51211b83c864e3bbe038"),
   item: 'bolts',
   quantity: 50,
   carrier: { name: 'Shipit', fee: 4 }
}
```

### Perform an Update Based on Embedded Document Fields

The following example sets the `price` field based on a [`$gte`](https://www.mongodb.com/docs/v6.0/reference/operator/query/gte/#mongodb-query-op.-gte) comparison against a field in an embedded document.

```
db.inventory.updateMany(
   { "carrier.fee": { $gte: 2 } }, { $set: { "price": 9.99 } }
)
```

Example output:

```
{
  _id: ObjectId("61bb51211b83c864e3bbe037"),
  item: 'nuts',
  quantity: 30,
  carrier: { name: 'Shipit', fee: 3 },
  price: 9.99
},
{
  _id: ObjectId("61bb51211b83c864e3bbe038"),
  item: 'bolts',
  quantity: 50,
  carrier: { name: 'Shipit', fee: 4 },
  price: 9.99
}
```

This [`updateOne()`](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne) operation searches for an embedded document, `carrier`, with a subfield named `fee`. It sets `{ price: 9.99 }` in each document where `fee` has a value greater than or equal to 2.

To set the value of the `price` field in only the first document where `carrier.fee` is greater than 2, use [`updateOne()`.](https://www.mongodb.com/docs/v6.0/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne)