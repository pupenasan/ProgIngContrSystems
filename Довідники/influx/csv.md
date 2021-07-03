# Write CSV data to InfluxDB

https://docs.influxdata.com/influxdb/v2.0/write-data/developer-tools/csv/



# Annotated CSV

https://docs.influxdata.com/influxdb/v2.0/reference/syntax/annotated-csv/

### Tables

A table may have the following rows and columns.

#### Rows

- **Annotation rows**: describe column properties.
- **Header row**: defines column labels (one header row per table).
- **Record row**: describes data in the table (one record per row).

##### Example

Encoding of a table with and without a header row.

```
result,table,_start,_stop,_time,region,host,_value
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,east,A,15.43
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,east,B,59.25
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,east,C,52.62
```

#### Columns

In addition to the data columns, a table may include the following columns:

- **Annotation column**: Only used in annotation rows. Always the first column. Displays the name of an annotation. Value can be empty or a supported [annotation](https://docs.influxdata.com/influxdb/v2.0/reference/syntax/annotated-csv/#annotations). You’ll notice a space for this column for the entire length of the table, so rows appear to start with `,`.
- **Result column**: Contains the name of the result specified by the query.
- **Table column**: Contains a unique ID for each table in a result.

### Multiple tables and results

If a file or data stream contains multiple tables or results, the following requirements must be met:

- A table column indicates which table a row belongs to.
- All rows in a table are contiguous.
- An empty row delimits a new table boundary in the following cases:
  - Between tables in the same result that do not share a common table schema.
  - Between concatenated CSV files.
- Each new table boundary starts with new annotation and header rows.

##### Example

Encoding of two tables in the same result with the same schema (header row) and different schema.

[Same schema](https://docs.influxdata.com/influxdb/v2.0/reference/syntax/annotated-csv/#) [Different schema](https://docs.influxdata.com/influxdb/v2.0/reference/syntax/annotated-csv/#)

```sh
result,table,_start,_stop,_time,region,host,_value
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,east,A,15.43
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,east,B,59.25
my-result,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,east,C,52.62
my-result,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,west,A,62.73
my-result,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,west,B,12.83
my-result,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,west,C,51.62
```

## [Annotated CSV in Flux](https://docs.influxdata.com/influxdb/v2.0/reference/syntax/annotated-csv/#annotated-csv-in-flux)

Flux requires all annotation and header rows in annotated CSV. The example below illustrates how to use the [`csv.from()` function](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/csv/from/) to read annotated CSV in Flux:

```js
import "csv"

csvData = "#datatype,string,long,dateTime:RFC3339,dateTime:RFC3339,dateTime:RFC3339,string,string,double
#group,false,false,false,false,false,false,false,false
#default,,,,,,,,
,result,table,_start,_stop,_time,region,host,_value
,,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,east,A,15.43
,,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,east,B,59.25
,,0,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,east,C,52.62
,,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,west,A,62.73
,,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,west,B,12.83
,,1,2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,west,C,51.62
"

csv.from(csv: csvData)
```

##### Query a raw CSV string

```js
import "csv"

csvData = "
_start,_stop,_time,region,host,_value
2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:00Z,east,A,15.43
2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:20Z,east,B,59.25
2018-05-08T20:50:00Z,2018-05-08T20:51:00Z,2018-05-08T20:50:40Z,east,C,52.62
"

csv.from(
  csv: csvData,
  mode: "raw"
)
```

