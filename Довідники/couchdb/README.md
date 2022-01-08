## Intro

https://docs.couchdb.org/en/stable/intro/overview.html

https://docs.couchdb.org/en/stable/intro/tour.html?highlight=query#

## Running a Mango Query

https://docs.couchdb.org/en/stable/intro/tour.html?highlight=query#

Now that we have stored documents successfully, we want to be able to query them. The easiest way to do this in CouchDB is running a Mango Query. There are always two parts to a Mango Query: the index and the selector.

The index specifies which fields we want to be able to query on, and the selector includes the actual query parameters that define what we are looking for exactly.

Indexes are stored as rows that are kept sorted by the fields you specify. This makes retrieving data from a range of keys efficient even when there are thousands or millions of rows.

Before we can run an example query, we’ll need some data to run it on. We’ll create documents with information about movies. Let’s create documents for three movies. (Allow CouchDB to generate the `_id` and `_rev` fields.) Use Fauxton to create documents that have a final JSON structure that look like this:

```json
{
    "_id": "00a271787f89c0ef2e10e88a0c0001f4",
    "type": "movie",
    "title": "My Neighbour Totoro",
    "year": 1988,
    "director": "miyazaki",
    "rating": 8.2
}
{
    "_id": "00a271787f89c0ef2e10e88a0c0003f0",
    "type": "movie",
    "title": "Kikis Delivery Service",
    "year": 1989,
    "director": "miyazaki",
    "rating": 7.8
}
{
    "_id": "00a271787f89c0ef2e10e88a0c00048b",
    "type": "movie",
    "title": "Princess Mononoke",
    "year": 1997,
    "director": "miyazaki",
    "rating": 8.4
}
```

Now we want to be able to find a movie by its release year, we need to create a Mango Index. To do this, go to “Run A Query with Mango” in the Database overview. Then click on “manage indexes”, and change the index field on the left to look like this:

```json
{
   "index": {
      "fields": [
         "year"
      ]
   },
   "name": "year-json-index",
   "type": "json"
}
```

This defines an index on the field `year` and allows us to send queries for documents from a specific year.

Next, click on “edit query” and change the Mango Query to look like this:

```json
{
   "selector": {
      "year": {
         "$eq": 1988
      }
   }
}
```

Then click on ”Run Query”.

The result should be a single result, the movie “My Neighbour Totoro” which has the year value of 1988. `$eq` here stands for “equal”.

Note

Note that if you skip adding the index, the query will still return the correct results, although you will see a warning about not using a pre-existing index. Not using an index will work fine on small databases and is acceptable for testing out queries in development or training, but we very strongly discourage doing this in any other case, since an index is absolutely vital to good query performance.

You can also query for all movies during the 1980s, with this selector:

```json
{
   "selector": {
      "year": {
         "$lt": 1990,
         "$gte": 1980
      }
   }
}
```

The result are the two movies from 1988 and 1989. `$lt` here means “lower than”, and `$gte` means “greater than or equal to”. The latter currently doesn’t have any effect, given that all of our movies are more recent than 1980, but this makes the query future-proof and allows us to add older movies later.