# `mongosh` Methods

https://www.mongodb.com/docs/v6.0/reference/method/

## Object Constructors and Methods 

https://www.mongodb.com/docs/v6.0/reference/method/js-constructor/

For details on a specific method, including syntax and examples, click on the link to the method's reference page.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`BinData()`](https://www.mongodb.com/docs/v6.0/reference/method/BinData/#mongodb-method-BinData) | Returns a [binary data object.](https://www.mongodb.com/docs/v6.0/reference/bson-types/#std-label-document-bson-type-binary-data) |
| [`BulkWriteResult()`](https://www.mongodb.com/docs/v6.0/reference/method/BulkWriteResult/#mongodb-method-BulkWriteResult) | Wrapper around the result set from [`Bulk.execute()`.](https://www.mongodb.com/docs/v6.0/reference/method/Bulk.execute/#mongodb-method-Bulk.execute) |
| [`Date()`](https://www.mongodb.com/docs/v6.0/reference/method/Date/#mongodb-method-Date) | Creates a date object. By default creates a date object including the current date. |
| [`ObjectId()`](https://www.mongodb.com/docs/v6.0/reference/method/ObjectId/#mongodb-method-ObjectId) | Returns an [ObjectId.](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-ObjectId) |
| [`ObjectId.getTimestamp()`](https://www.mongodb.com/docs/v6.0/reference/method/ObjectId.getTimestamp/#mongodb-method-ObjectId.getTimestamp) | Returns the timestamp portion of an [ObjectId.](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-ObjectId) |
| [`ObjectId.toString()`](https://www.mongodb.com/docs/v6.0/reference/method/ObjectId.toString/#mongodb-method-ObjectId.toString) | Displays the string representation of an [ObjectId.](https://www.mongodb.com/docs/v6.0/reference/glossary/#std-term-ObjectId) |
| [`ObjectId.valueOf()`](https://www.mongodb.com/docs/v6.0/reference/method/ObjectId.valueOf/#mongodb-method-ObjectId.valueOf) | Displays the `str` attribute of an ObjectId as a hexadecimal string. |
| [UUID()](https://www.mongodb.com/docs/v6.0/reference/method/UUID/) | Converts a 32-byte hexadecimal string to the UUID BSON subtype. |
| [`WriteResult()`](https://www.mongodb.com/docs/v6.0/reference/method/WriteResult/#mongodb-method-WriteResult) | Wrapper around the result set from write methods.            |
| [`WriteResult.hasWriteError()`](https://www.mongodb.com/docs/v6.0/reference/method/WriteResult.hasWriteError/#mongodb-method-WriteResult.hasWriteError) | Returns a boolean specifying whether the results include [`WriteResult.writeError`.](https://www.mongodb.com/docs/v6.0/reference/method/WriteResult/#mongodb-data-WriteResult.writeError) |
| [`WriteResult.hasWriteConcernError()`](https://www.mongodb.com/docs/v6.0/reference/method/WriteResult.hasWriteConcernError/#mongodb-method-WriteResult.hasWriteConcernError) | Returns a boolean specifying whether whether the results include [`WriteResult.writeConcernError`.](https://www.mongodb.com/docs/v6.0/reference/method/WriteResult/#mongodb-data-WriteResult.writeConcernError) |