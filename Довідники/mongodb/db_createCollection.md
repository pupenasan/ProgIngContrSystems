# db.createCollection() 

https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection

## Definition

`db.createCollection(name, options)` 

Створює нову колекцію або [перегляд](https://www.mongodb.com/docs/manual/core/views/). Для переглядів див. також [`db.createView()`.](https://www.mongodb.com/docs/manual/reference/method/db.createView/#mongodb-method-db.createView)Оскільки MongoDB створює колекція неявно, коли колекція вперше посилається в команді, цей метод використовується в основному для створення нових колекцій, які використовують певні параметри. Наприклад, для створення:

- [Capped collection.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-capped-collection)
- [Clustered collection.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-clustered-collection)
- New collection that uses [document validation.](https://www.mongodb.com/docs/manual/core/schema-validation/) [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) є обгорткою навколо команди бази даних [` create`.](https://www.mongodb.com/docs/manual/reference/command/create/#mongodb-dbcommand-dbcmd.create) [`db.createCollection()`](https://www .mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) метод має таку форму прототипу:

```js
db.createCollection( <name>,
   {
     capped: <boolean>,
     timeseries: {                  // Added in MongoDB 5.0
        timeField: <string>,        // required for time series collections
        metaField: <string>,
        granularity: <string>
     },
     expireAfterSeconds: <number>,
     clusteredIndex: <document>,    // Added in MongoDB 5.3
     changeStreamPreAndPostImages: <document>,  // Added in MongoDB 6.0
     size: <number>,
     max: <number>,
     storageEngine: <document>,
     validator: <document>,
     validationLevel: <string>,
     validationAction: <string>,
     indexOptionDefaults: <document>,
     viewOn: <string>,
     pipeline: <pipeline>,
     collation: <document>,
     writeConcern: <document>
   }
)
```



Метод [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) має такі параметри:

| Parameter | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `name`    | string   | The name of the collection to create. See [Naming Restrictions.](https://www.mongodb.com/docs/manual/reference/limits/#std-label-restrictions-on-db-names) |
| `options` | document | Optional. Configuration options for creating a:Capped collectionCustered collectionView |

The `options` document contains the following fields:

| Field                                                        | Type     | Description                                                  |
| ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| `capped`                                                     | boolean  | Optional. To create a [capped collection](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-capped-collection), specify `true`. If you specify `true`, you must also set a maximum size in the `size` field. |
| `timeseries.timeField`                                       | string   | Required when creating a [time series collection](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-time-series-collection). The name of the field which contains the date in each time series document. Documents in a time series collection must have a valid BSON date as the value for the `timeField`. |
| `timeseries.metaField`                                       | string   | Optional. The name of the field which contains metadata in each time series document. The metadata in the specified field should be data that is used to label a unique series of documents. The metadata should rarely, if ever, change.The name of the specified field may not be `_id` or the same as the `timeseries.timeField`. The field can be of any type except array. |
| `timeseries.granularity`                                     | string   | Optional. Possible values are `"seconds"` (default), `"minutes"`, and `"hours"`. Set the granularity to the value that is the closest match to the time span between consecutive incoming measurements. Setting the `granularity` parameter improves performance by optimizing how data in the time series collection is stored internally. |
| [expireAfterSeconds](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.expireAfterSeconds) | number   | Optional. Specifies the seconds after which documents in a [time series collection](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-time-series-collection) or [clustered collection](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-clustered-collection) expire. MongoDB deletes expired documents automatically.For clustered collections, the documents are deleted automatically based on the clustered index key `_id` and the values must be date types. See [TTL Indexes.](https://www.mongodb.com/docs/manual/core/index-ttl/#std-label-index-feature-ttl) |
| [clusteredIndex](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.clusteredIndex) | document | Starting in MongoDB 5.3, you can create a collection with a [clustered index](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.clusteredIndex). Collections created with a clustered index are called clustered collections.See [Clustered Collections.](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections)`clusteredIndex` has the following syntax:`clusteredIndex: {   key: { <string> },   unique: <boolean>,   name: <string>}`FieldDescription`key`Required. The clustered index key field. Must be set to `{ _id: 1 }`. The default value for the `_id` field is an automatically generated unique [object identifier](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid), but you can set your own [clustered index key values.](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections-clustered-index-key-values)`unique`Required. Must be set to `true`. A unique index indicates the collection will not accept inserted or updated documents where the clustered index key value matches an existing value in the index.`name`Optional. A name that uniquely identifies the clustered index.*New in version 5.3*. |
| [changeStreamPreAndPostImages](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.changeStreamPreAndPostImages) | document | Optional.Starting in MongoDB 6.0, you can use [change stream events](https://www.mongodb.com/docs/manual/reference/change-events/#std-label-change-stream-output) to output the version of a document before and after changes (the document pre- and post-images):The pre-image is the document before it was replaced, updated, or deleted. There is no pre-image for an inserted document.The post-image is the document after it was inserted, replaced, or updated. There is no post-image for a deleted document.Enable `changeStreamPreAndPostImages` for a collection using [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection), [`create`](https://www.mongodb.com/docs/manual/reference/command/create/#mongodb-dbcommand-dbcmd.create), or [`collMod`.](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod)`changeStreamPreAndPostImages` has the following syntax:`changeStreamPreAndPostImages: {   enabled: <boolean>}``enabled`Description`true`Enables change stream pre- and post-images for a collection.`false`Disables change stream pre- and post-images for a collection.For complete examples with the change stream output, see [Change Streams with Document Pre- and Post-Images.](https://www.mongodb.com/docs/manual/reference/method/db.collection.watch/#std-label-db.collection.watch-change-streams-pre-and-post-images-example)For a [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) example on this page, see [Create a Collection with Change Stream Pre- and Post-Images for Documents.](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-createCollection-change-stream-pre-and-post-images-example)*New in version 6.0*. |
| `size`                                                       | number   | Optional. Specify a maximum size in bytes for a capped collection. Once a capped collection reaches its maximum size, MongoDB removes the older documents to make space for the new documents. The `size` field is required for capped collections and ignored for other collections. |
| `max`                                                        | number   | Optional. The maximum number of documents allowed in the capped collection. The `size` limit takes precedence over this limit. If a capped collection reaches the `size` limit before it reaches the maximum number of documents, MongoDB removes old documents. If you prefer to use the `max` limit, ensure that the `size` limit, which is required for a capped collection, is sufficient to contain the maximum number of documents. |
| `storageEngine`                                              | document | Optional. Available for the WiredTiger storage engine only.Allows users to specify configuration to the storage engine on a per-collection basis when creating a collection. The value of the `storageEngine` option should take the following form:`{ <storage-engine-name>: <options> }` TipSee also: [Specify Storage Engine Options](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-create-collection-storage-engine-options) |

Storage engine configuration specified when creating collections are validated and logged to the [oplog](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-oplog) during replication to support replica sets with members that use different storage engines.

|                    |          |                                                              |
| ------------------ | -------- | ------------------------------------------------------------ |
| `validator`        | document | Optional. Allows users to specify [validation rules or expressions](https://www.mongodb.com/docs/manual/core/schema-validation/) for the collection. For more information, see [Schema Validation.](https://www.mongodb.com/docs/manual/core/schema-validation/)The `validator` option takes a document that specifies the validation rules or expressions. You can specify the expressions using the same operators as the [query operators](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors) with the exception of [`$near`](https://www.mongodb.com/docs/manual/reference/operator/query/near/#mongodb-query-op.-near), [`$nearSphere`](https://www.mongodb.com/docs/manual/reference/operator/query/nearSphere/#mongodb-query-op.-nearSphere), [`$text`](https://www.mongodb.com/docs/manual/reference/operator/query/text/#mongodb-query-op.-text), and [`$where`.](https://www.mongodb.com/docs/manual/reference/operator/query/where/#mongodb-query-op.-where)To learn how to create a collection with schema validation, see [Specify JSON Schema Validation.](https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#std-label-schema-validation-json) |
| `validationLevel`  | string   | Optional. Determines how strictly MongoDB applies the validation rules to existing documents during an update.`validationLevel`Description`"off"`No validation for inserts or updates.`"strict"`**Default** Apply validation rules to all inserts and all updates.`"moderate"`Apply validation rules to inserts and to updates on existing *valid* documents. Do not apply rules to updates on existing *invalid* documents.To see an example that uses `validationLevel`, see [Specify Validation Level for Existing Documents.](https://www.mongodb.com/docs/manual/core/schema-validation/specify-validation-level/#std-label-schema-specify-validation-level) |
| `validationAction` | string   | Optional. Determines whether to `error` on invalid documents or just `warn` about the violations but allow invalid documents to be inserted. ImportantValidation of documents only applies to those documents as determined by the `validationLevel`.To see an example that uses `validationAction`, see [Choose How to Handle Invalid Documents.](https://www.mongodb.com/docs/manual/core/schema-validation/handle-invalid-documents/#std-label-schema-validation-handle-invalid-docs) |

|                       |          |                                                              |
| --------------------- | -------- | ------------------------------------------------------------ |
| `indexOptionDefaults` | document | Optional. Allows users to specify a default configuration for indexes when creating a collection.The `indexOptionDefaults` option accepts a `storageEngine` document, which should take the following form:`{ <storage-engine-name>: <options> }` Storage engine configuration specified when creating indexes are validated and logged to the [oplog](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-oplog) during replication to support replica sets with members that use different storage engines. |

|             |          |                                                              |
| ----------- | -------- | ------------------------------------------------------------ |
| `viewOn`    | string   | The name of the source collection or view from which to create the view. The name is not the full namespace of the collection or view; i.e. does not include the database name and implies the same database as the view to create. You must create views in the same database as the source collection.See also [`db.createView()`.](https://www.mongodb.com/docs/manual/reference/method/db.createView/#mongodb-method-db.createView) |
| `pipeline`  | array    | An array that consists of the [aggregation pipeline stage(s)](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline).  [`db.createView()`](https://www.mongodb.com/docs/manual/reference/method/db.createView/#mongodb-method-db.createView) creates the view by applying the specified `pipeline` to the `viewOn` collection or view.A view definition `pipeline` cannot include the [`$out`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) or the [`$merge`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) stage. This restriction also applies to embedded pipelines, such as pipelines used in [`$lookup`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup) or [`$facet`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/#mongodb-pipeline-pipe.-facet) stages.The view definition is public; i.e. [`db.getCollectionInfos()`](https://www.mongodb.com/docs/manual/reference/method/db.getCollectionInfos/#mongodb-method-db.getCollectionInfos) and `explain` operations on the view will include the pipeline that defines the view. As such, avoid referring directly to sensitive fields and values in view definitions.See also [`db.createView()`.](https://www.mongodb.com/docs/manual/reference/method/db.createView/#mongodb-method-db.createView) |
| `collation` | document | Specifies the default [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) for the collection.[Collation](https://www.mongodb.com/docs/manual/reference/collation/) allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.The collation option has the following syntax:`collation: {   locale: <string>,   caseLevel: <boolean>,   caseFirst: <string>,   strength: <int>,   numericOrdering: <boolean>,   alternate: <string>,   maxVariable: <string>,   backwards: <boolean>}` |



## Access Control 

If the deployment enforces [authentication/authorization](https://www.mongodb.com/docs/manual/core/authentication/#std-label-authentication), [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) requires the following privileges:

| Task                                                         | Required Privileges                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Create a non-capped collection                               | [`createCollection`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-createCollection) on the database, **or**[`insert`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-insert) on the collection to create |
| Create a [capped collection](https://www.mongodb.com/docs/manual/core/capped-collections/#std-label-manual-capped-collection) | [`convertToCapped`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-convertToCapped) for the collection[`createCollection`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-createCollection) on the database |
| Create a [view](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page) | [`createCollection`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-createCollection) on the database.However, if the user has the [`createCollection`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-createCollection) on the database *and* [`find`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-find) on the view to create, the user must *also* have the following additional permissions:[`find`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-find) on the source collection or view.[`find`](https://www.mongodb.com/docs/manual/reference/privilege-actions/#mongodb-authaction-find) on any other collections or views referenced in the `pipeline`, if any. |

A user with the [`readWrite`](https://www.mongodb.com/docs/manual/reference/built-in-roles/#mongodb-authrole-readWrite) built in role on the database has the required privileges to run the listed operations. Either [create a user](https://www.mongodb.com/docs/manual/tutorial/create-users/) with the required role or [grant the role to an existing user.](https://www.mongodb.com/docs/manual/tutorial/manage-users-and-roles/#std-label-modify-existing-user-access)

## Behavior 

### Resource Locking 

*Changed in version 4.2*.

[`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) obtains an exclusive lock on the specified collection or view for the duration of the operation. All subsequent operations on the collection must wait until [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) releases the lock. [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) typically holds this lock for a short time.

Creating a view requires obtaining an additional exclusive lock on the `system.views` collection in the database. This lock blocks creation or modification of views in the database until the command completes.

### Transactions 

*Changed in version 4.4*.

Starting in MongoDB 4.4, you can create collections and indexes inside a [multi-document transaction](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions-create-collections-indexes) if the transaction is **not** a cross-shard write transaction.

To use [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) in a transaction, the transaction must use read concern [`"local"`](https://www.mongodb.com/docs/manual/reference/read-concern-local/#mongodb-readconcern-readconcern.-local-). If you specify a read concern level other than [`"local"`](https://www.mongodb.com/docs/manual/reference/read-concern-local/#mongodb-readconcern-readconcern.-local-), the transaction fails.

## Examples 

### Create a Capped Collection 

Capped collections have maximum size or document counts that prevent them from growing beyond maximum thresholds. All capped collections must specify a maximum size and may also specify a maximum document count. MongoDB removes older documents if a collection reaches the maximum size limit before it reaches the maximum document count. Consider the following example:

```
db.createCollection("log", { capped : true, size : 5242880, max : 5000 } )
```

This command creates a collection named `log` with a maximum size of 5 megabytes and a maximum of 5000 documents.

See [Capped Collections](https://www.mongodb.com/docs/manual/core/capped-collections/) for more information about capped collections.

### Create a Time Series Collection 

To create a [time series collection](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-time-series-collection) that captures weather data for the past 24 hours, issue this command:

```
db.createCollection(
    "weather24h",
    {
       timeseries: {
          timeField: "timestamp",
          metaField: "data",
          granularity: "hours"
       },
       expireAfterSeconds: 86400
    }
)
```

### Create a Clustered Collection 

The following [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection) example adds a [clustered collection](https://www.mongodb.com/docs/manual/core/clustered-collections/#std-label-clustered-collections) named `stocks`:

```
db.createCollection(
   "stocks",
   { clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "stocks clustered key" } }
)
```

In the example, [clusteredIndex](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.clusteredIndex) specifies:

- `"key": { _id: 1 }`, which sets the clustered index key to the `_id` field.
- `"unique": true`, which indicates the clustered index key value must be unique.
- `"name": "stocks clustered key"`, which sets the clustered index name.



### Create a Collection with Change Stream Pre- and Post-Images for Documents 

Starting in MongoDB 6.0, you can use [change stream events](https://www.mongodb.com/docs/manual/reference/change-events/#std-label-change-stream-output) to output the version of a document before and after changes (the document pre- and post-images):

- The pre-image is the document before it was replaced, updated, or deleted. There is no pre-image for an inserted document.
- The post-image is the document after it was inserted, replaced, or updated. There is no post-image for a deleted document.
- Enable `changeStreamPreAndPostImages` for a collection using [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection), [`create`](https://www.mongodb.com/docs/manual/reference/command/create/#mongodb-dbcommand-dbcmd.create), or [`collMod`.](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod)

The following example creates a collection that has [changeStreamPreAndPostImages](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#std-label-db.createCollection.changeStreamPreAndPostImages) enabled:

```
db.createCollection(
   "temperatureSensor",
   { changeStreamPreAndPostImages: { enabled: true } }
);
```

Pre- and post-images are not available for a [change stream event](https://www.mongodb.com/docs/manual/reference/change-events/#std-label-change-stream-output) if the images were:

- Not enabled on the collection at the time of a document update or delete operation.

- Removed after the pre- and post-image retention time set in `expireAfterSeconds`.

  - The following example sets `expireAfterSeconds` to `100` seconds:

    ```
    use admin
    db.runCommand( {
       setClusterParameter:
          { changeStreamOptions: { preAndPostImages: { expireAfterSeconds: 100 } } }
    } )
    ```

The following example returns the current `changeStreamOptions` settings, including `expireAfterSeconds`:

```
db.adminCommand( { getClusterParameter: "changeStreamOptions" } )
```

- - Setting `expireAfterSeconds` to `off` uses the default retention policy: pre- and post-images are retained until the corresponding change stream events are removed from the [oplog.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-oplog)
  - If a change stream event is removed from the oplog, then the corresponding pre- and post-images are also deleted regardless of the `expireAfterSeconds` pre- and post-image retention time.

Additional considerations:

- Enabling pre- and post-images consumes storage space and adds processing time. Only enable pre- and post-images if you need them.
- Limit the change stream event size to less than 16 megabytes. To limit the event size, you can:
  - Limit the document size to 8 megabytes. You can request pre- and post-images simultaneously in the [change stream output](https://www.mongodb.com/docs/manual/reference/change-events/#std-label-change-stream-output) if other change stream event fields like `updateDescription` are not large.
  - Request only post-images in the change stream output for documents up to 16 megabytes if other change stream event fields like `updateDescription` are not large.
  - Request only pre-images in the change stream output for documents up to 16 megabytes if:
    - document updates affect only a small fraction of the document structure or content, *and*
    - do not cause a `replace` change event. A `replace` event always includes the post-image.
- To request a pre-image, you set `fullDocumentBeforeChange` to `required` or `whenAvailable` in [`db.collection.watch()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.watch/#mongodb-method-db.collection.watch). To request a post-image, you set `fullDocument` using the same method.
- Pre-images are written to the `config.system.preimages` collection.
  - The `config.system.preimages` collection may become large. To limit the collection size, you can set `expireAfterSeconds` time for the pre-images as shown earlier.
  - Pre-images are removed asynchronously by a background process.



## Important

### Backward-Incompatible Feature

Starting in MongoDB 6.0, if you are using document pre- and post-images for [change streams](https://www.mongodb.com/docs/manual/reference/change-events/#std-label-change-stream-output), you must disable [changeStreamPreAndPostImages](https://www.mongodb.com/docs/manual/reference/command/collMod/#std-label-collMod-change-stream-pre-and-post-images) for each collection using the [`collMod`](https://www.mongodb.com/docs/manual/reference/command/collMod/#mongodb-dbcommand-dbcmd.collMod) command before you can downgrade to an earlier MongoDB version.

### Specify Collation 

[Collation](https://www.mongodb.com/docs/manual/reference/collation/) allows users to specify language-specific rules for string comparison, such as rules for lettercase and accent marks.

You can specify [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) at the collection or [view](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page) level. For example, the following operation creates a collection, specifying a collation for the collection (See [Collation Document](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation-document-fields) for descriptions of the collation fields):

```
db.createCollection( "myColl", { collation: { locale: "fr" } } );
```

This collation will be used by indexes and operations that support collation unless they explicitly specify a different collation. For example, insert the following documents into `myColl`:

```
{ _id: 1, category: "café" }
{ _id: 2, category: "cafe" }
{ _id: 3, category: "cafE" }
```

The following operation uses the collection's collation:

```
db.myColl.find().sort( { category: 1 } )
```

The operation returns documents in the following order:

```
{ "_id" : 2, "category" : "cafe" }
{ "_id" : 3, "category" : "cafE" }
{ "_id" : 1, "category" : "café" }
```

The same operation on a collection that uses simple binary collation (i.e. no specific collation set) returns documents in the following order:

```
{ "_id" : 3, "category" : "cafE" }
{ "_id" : 2, "category" : "cafe" }
{ "_id" : 1, "category" : "café" }
```

### Specify Storage Engine Options 

You can specify collection-specific storage engine configuration options when you create a collection with [`db.createCollection()`](https://www.mongodb.com/docs/manual/reference/method/db.createCollection/#mongodb-method-db.createCollection). Consider the following operation:

```
db.createCollection(
   "users",
   { storageEngine: { wiredTiger: { configString: "<option>=<setting>" } } }
)
```

This operation creates a new collection named `users` with a specific configuration string that MongoDB will pass to the `wiredTiger` storage engine. See the [WiredTiger documentation of collection level options](http://source.wiredtiger.com/mongodb-5.0/struct_w_t___s_e_s_s_i_o_n.html) for specific `wiredTiger` options.