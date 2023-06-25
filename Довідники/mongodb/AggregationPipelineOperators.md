# Aggregation Pipeline Operators 

https://www.mongodb.com/docs/manual/reference/operator/aggregation/

For details on a specific operator, including syntax and examples, click on the link to the operator's reference page.

## Expression Operators 

These expression operators are available to construct [expressions](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) for use in the [aggregation pipeline stages.](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)

Operator expressions are similar to functions that take arguments. In general, these expressions take an array of arguments and have the following form:

```
{ <operator>: [ <argument1>, <argument2> ... ] }
```

If operator accepts a single argument, you can omit the outer array designating the argument list:

```
{ <operator>: <argument> }
```

To avoid parsing ambiguity if the argument is a literal array, you must wrap the literal array in a [`$literal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) expression or keep the outer array that designates the argument list.

### Arithmetic Expression Operators 

Arithmetic expressions perform mathematic operations on numbers. Some arithmetic expressions can also support date arithmetic.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$abs`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/abs/#mongodb-expression-exp.-abs) | Returns the absolute value of a number.                      |
| [`$add`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/#mongodb-expression-exp.-add) | Adds numbers to return the sum, or adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date. |
| [`$ceil`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ceil/#mongodb-expression-exp.-ceil) | Returns the smallest integer greater than or equal to the specified number. |
| [`$divide`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/divide/#mongodb-expression-exp.-divide) | Returns the result of dividing the first number by the second. Accepts two argument expressions. |
| [`$exp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/exp/#mongodb-expression-exp.-exp) | Raises *e* to the specified exponent.                        |
| [`$floor`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/floor/#mongodb-expression-exp.-floor) | Returns the largest integer less than or equal to the specified number. |
| [`$ln`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ln/#mongodb-expression-exp.-ln) | Calculates the natural log of a number.                      |
| [`$log`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/log/#mongodb-expression-exp.-log) | Calculates the log of a number in the specified base.        |
| [`$log10`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/log10/#mongodb-expression-exp.-log10) | Calculates the log base 10 of a number.                      |
| [`$mod`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mod/#mongodb-expression-exp.-mod) | Returns the remainder of the first number divided by the second. Accepts two argument expressions. |
| [`$multiply`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/multiply/#mongodb-expression-exp.-multiply) | Multiplies numbers to return the product. Accepts any number of argument expressions. |
| [`$pow`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/pow/#mongodb-expression-exp.-pow) | Raises a number to the specified exponent.                   |
| [`$round`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/round/#mongodb-expression-exp.-round) | Rounds a number to to a whole integer *or* to a specified decimal place. |
| [`$sqrt`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sqrt/#mongodb-expression-exp.-sqrt) | Calculates the square root.                                  |
| [`$subtract`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/subtract/#mongodb-expression-exp.-subtract) | Returns the result of subtracting the second value from the first. If the two values are numbers, return the difference. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number. |
| [`$trunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/trunc/#mongodb-expression-exp.-trunc) | Truncates a number to a whole integer *or* to a specified decimal place. |

### Array Expression Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$arrayElemAt`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayElemAt/#mongodb-expression-exp.-arrayElemAt) | Returns the element at the specified array index.            |
| [`$arrayToObject`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/arrayToObject/#mongodb-expression-exp.-arrayToObject) | Converts an array of key value pairs to a document.          |
| [`$concatArrays`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concatArrays/#mongodb-expression-exp.-concatArrays) | Concatenates arrays to return the concatenated array.        |
| [`$filter`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/filter/#mongodb-expression-exp.-filter) | Selects a subset of the array to return an array with only the elements that match the filter condition. |
| [`$first`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/first-array-element/#mongodb-expression-exp.-first) | Returns the first array element. Distinct from [`$first`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/first/#mongodb-group-grp.-first) accumulator. |
| [`$firstN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN-array-element/#mongodb-expression-exp.-firstN) | Returns a specified number of elements from the beginning of an array. Distinct from the [`$firstN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN/#mongodb-group-grp.-firstN) accumulator. |
| [`$in`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/in/#mongodb-expression-exp.-in) | Returns a boolean indicating whether a specified value is in an array. |
| [`$indexOfArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexOfArray/#mongodb-expression-exp.-indexOfArray) | Searches an array for an occurrence of a specified value and returns the array index of the first occurrence. If the substring is not found, returns `-1`. |
| [`$isArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isArray/#mongodb-expression-exp.-isArray) | Determines if the operand is an array. Returns a boolean.    |
| [`$last`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/last-array-element/#mongodb-expression-exp.-last) | Returns the last array element. Distinct from [`$last`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/last/#mongodb-group-grp.-last) accumulator. |
| [`$lastN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN-array-element/#mongodb-expression-exp.-lastN) | Returns a specified number of elements from the end of an array. Distinct from the [`$lastN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN/#mongodb-group-grp.-lastN) accumulator. |
| [`$map`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/map/#mongodb-expression-exp.-map) | Applies a subexpression to each element of an array and returns the array of resulting values in order. Accepts named parameters. |
| [`$maxN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN-array-element/#mongodb-expression-exp.-maxN) | Returns the `n` largest values in an array. Distinct from the [`$maxN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN/#mongodb-group-grp.-maxN) accumulator. |
| [`$minN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN-array-element/#mongodb-expression-exp.-minN) | Returns the `n` smallest values in an array. Distinct from the [`$minN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN/#mongodb-group-grp.-minN) accumulator. |
| [`$objectToArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/objectToArray/#mongodb-expression-exp.-objectToArray) | Converts a document to an array of documents representing key-value pairs. |
| [`$range`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/range/#mongodb-expression-exp.-range) | Outputs an array containing a sequence of integers according to user-defined inputs. |
| [`$reduce`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/reduce/#mongodb-expression-exp.-reduce) | Applies an expression to each element in an array and combines them into a single value. |
| [`$reverseArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/reverseArray/#mongodb-expression-exp.-reverseArray) | Returns an array with the elements in reverse order.         |
| [`$size`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/#mongodb-expression-exp.-size) | Returns the number of elements in the array. Accepts a single expression as argument. |
| [`$slice`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/slice/#mongodb-expression-exp.-slice) | Returns a subset of an array.                                |
| [`$sortArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sortArray/#mongodb-expression-exp.-sortArray) | Sorts the elements of an array.                              |
| [`$zip`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/zip/#mongodb-expression-exp.-zip) | Merge two arrays together.                                   |

### Boolean Expression Operators 

Boolean expressions evaluate their argument expressions as booleans and return a boolean as the result.

In addition to the `false` boolean value, Boolean expression evaluates as `false` the following: `null`, `0`, and `undefined` values. The Boolean expression evaluates all other values as `true`, including non-zero numeric values and arrays.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$and`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/and/#mongodb-expression-exp.-and) | Returns `true` only when *all* its expressions evaluate to `true`. Accepts any number of argument expressions. |
| [`$not`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/not/#mongodb-expression-exp.-not) | Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression. |
| [`$or`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/or/#mongodb-expression-exp.-or) | Returns `true` when *any* of its expressions evaluates to `true`. Accepts any number of argument expressions. |

### Comparison Expression Operators 

Comparison expressions return a boolean except for [`$cmp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cmp/#mongodb-expression-exp.-cmp) which returns a number.

The comparison expressions take two argument expressions and compare both value and type, using the [specified BSON comparison order](https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/#std-label-bson-types-comparison-order) for values of different types.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$cmp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cmp/#mongodb-expression-exp.-cmp) | Returns `0` if the two values are equivalent, `1` if the first value is greater than the second, and `-1` if the first value is less than the second. |
| [`$eq`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/eq/#mongodb-expression-exp.-eq) | Returns `true` if the values are equivalent.                 |
| [`$gt`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/gt/#mongodb-expression-exp.-gt) | Returns `true` if the first value is greater than the second. |
| [`$gte`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/gte/#mongodb-expression-exp.-gte) | Returns `true` if the first value is greater than or equal to the second. |
| [`$lt`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lt/#mongodb-expression-exp.-lt) | Returns `true` if the first value is less than the second.   |
| [`$lte`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lte/#mongodb-expression-exp.-lte) | Returns `true` if the first value is less than or equal to the second. |
| [`$ne`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ne/#mongodb-expression-exp.-ne) | Returns `true` if the values are *not* equivalent.           |



### Conditional Expression Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$cond`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cond/#mongodb-expression-exp.-cond) | A ternary operator that evaluates one expression, and depending on the result, returns the value of one of the other two expressions. Accepts either three expressions in an ordered list or three named parameters. |
| [`$ifNull`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ifNull/#mongodb-expression-exp.-ifNull) | Returns either the non-null result of the first expression or the result of the second expression if the first expression results in a null result. Null result encompasses instances of undefined values or missing fields. Accepts two expressions as arguments. The result of the second expression can be null. |
| [`$switch`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/switch/#mongodb-expression-exp.-switch) | Evaluates a series of case expressions. When it finds an expression which evaluates to `true`, `$switch` executes a specified expression and breaks out of the control flow. |

### Custom Aggregation Expression Operators 

| Name                                                         | Description                                                 |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [`$accumulator`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/#mongodb-group-grp.-accumulator) | Defines a custom accumulator function.*New in version 4.4*. |
| [`$function`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/#mongodb-expression-exp.-function) | Defines a custom function.*New in version 4.4*.             |

### Data Size Operators 

The following operators return the size of a data element:

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$binarySize`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/binarySize/#mongodb-expression-exp.-binarySize) | Returns the size of a given string or binary data value's content in bytes. |
| [`$bsonSize`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bsonSize/#mongodb-expression-exp.-bsonSize) | Returns the size in bytes of a given document (i.e. bsontype `Object`) when encoded as [BSON.](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-BSON) |

### Date Expression Operators 

The following operators returns date objects or components of a date object:

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$dateAdd`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateAdd/#mongodb-expression-exp.-dateAdd) | Adds a number of time units to a date object.                |
| [`$dateDiff`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateDiff/#mongodb-expression-exp.-dateDiff) | Returns the difference between two dates.                    |
| [`$dateFromParts`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateFromParts/#mongodb-expression-exp.-dateFromParts) | Constructs a BSON Date object given the date's constituent parts. |
| [`$dateFromString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateFromString/#mongodb-expression-exp.-dateFromString) | Converts a date/time string to a date object.                |
| [`$dateSubtract`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateSubtract/#mongodb-expression-exp.-dateSubtract) | Subtracts a number of time units from a date object.         |
| [`$dateToParts`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToParts/#mongodb-expression-exp.-dateToParts) | Returns a document containing the constituent parts of a date. |
| [`$dateToString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/#mongodb-expression-exp.-dateToString) | Returns the date as a formatted string.                      |
| [`$dateTrunc`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateTrunc/#mongodb-expression-exp.-dateTrunc) | Truncates a date.                                            |
| [`$dayOfMonth`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfMonth/#mongodb-expression-exp.-dayOfMonth) | Returns the day of the month for a date as a number between 1 and 31. |
| [`$dayOfWeek`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfWeek/#mongodb-expression-exp.-dayOfWeek) | Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday). |
| [`$dayOfYear`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dayOfYear/#mongodb-expression-exp.-dayOfYear) | Returns the day of the year for a date as a number between 1 and 366 (leap year). |
| [`$hour`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/hour/#mongodb-expression-exp.-hour) | Returns the hour for a date as a number between 0 and 23.    |
| [`$isoDayOfWeek`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isoDayOfWeek/#mongodb-expression-exp.-isoDayOfWeek) | Returns the weekday number in ISO 8601 format, ranging from `1` (for Monday) to `7` (for Sunday). |
| [`$isoWeek`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isoWeek/#mongodb-expression-exp.-isoWeek) | Returns the week number in ISO 8601 format, ranging from `1` to `53`. Week numbers start at `1` with the week (Monday through Sunday) that contains the year's first Thursday. |
| [`$isoWeekYear`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isoWeekYear/#mongodb-expression-exp.-isoWeekYear) | Returns the year number in ISO 8601 format. The year starts with the Monday of week 1 (ISO 8601) and ends with the Sunday of the last week (ISO 8601). |
| [`$millisecond`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/millisecond/#mongodb-expression-exp.-millisecond) | Returns the milliseconds of a date as a number between 0 and 999. |
| [`$minute`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minute/#mongodb-expression-exp.-minute) | Returns the minute for a date as a number between 0 and 59.  |
| [`$month`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/month/#mongodb-expression-exp.-month) | Returns the month for a date as a number between 1 (January) and 12 (December). |
| [`$second`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/second/#mongodb-expression-exp.-second) | Returns the seconds for a date as a number between 0 and 60 (leap seconds). |
| [`$toDate`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toDate/#mongodb-expression-exp.-toDate) | Converts value to a Date.*New in version 4.0*.               |
| [`$week`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/week/#mongodb-expression-exp.-week) | Returns the week number for a date as a number between 0 (the partial week that precedes the first Sunday of the year) and 53 (leap year). |
| [`$year`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/year/#mongodb-expression-exp.-year) | Returns the year for a date as a number (e.g. 2014).         |

The following arithmetic operators can take date operands:

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$add`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/add/#mongodb-expression-exp.-add) | Adds numbers and a date to return a new date. If adding numbers and a date, treats the numbers as milliseconds. Accepts any number of argument expressions, but at most, one expression can resolve to a date. |
| [`$subtract`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/subtract/#mongodb-expression-exp.-subtract) | Returns the result of subtracting the second value from the first. If the two values are dates, return the difference in milliseconds. If the two values are a date and a number in milliseconds, return the resulting date. Accepts two argument expressions. If the two values are a date and a number, specify the date argument first as it is not meaningful to subtract a date from a number. |

### Literal Expression Operator 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$literal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) | Return a value without parsing. Use for values that the aggregation pipeline may interpret as an expression. For example, use a [`$literal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) expression to a string that starts with a  dollar sign (`$`) to avoid parsing as a field path. |

### Miscellaneous Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$getField`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/#mongodb-expression-exp.-getField) | Returns the value of a specified field from a document. You can use [`$getField`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/getField/#mongodb-expression-exp.-getField) to retrieve the value of fields with names that contain periods (`.`) or start with dollar signs (`$`).*New in version 5.0*. |
| [`$rand`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/rand/#mongodb-expression-exp.-rand) | Returns a random float between 0 and 1                       |
| [`$sampleRate`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sampleRate/#mongodb-expression-exp.-sampleRate) | Randomly select documents at a given rate. Although the exact number of documents selected varies on each run, the quantity chosen approximates the sample rate expressed as a percentage of the total number of documents. |

### Object Expression Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$mergeObjects`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mergeObjects/#mongodb-expression-exp.-mergeObjects) | Combines multiple documents into a single document.          |
| [`$objectToArray`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/objectToArray/#mongodb-expression-exp.-objectToArray) | Converts a document to an array of documents representing key-value pairs. |
| [`$setField`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setField/#mongodb-expression-exp.-setField) | Adds, updates, or removes a specified field in a document. You can use [`$setField`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setField/#mongodb-expression-exp.-setField) to add, update, or remove fields with names that contain periods (`.`) or start with dollar signs (`$`).*New in version 5.0*. |

### Set Expression Operators 

Set expressions performs set operation on arrays, treating arrays as sets. Set expressions ignores the duplicate entries in each input array and the order of the elements.

If the set operation returns a set, the operation filters out duplicates in the result to output an array that contains only unique entries. The order of the elements in the output array is unspecified.

If a set contains a nested array element, the set expression does *not* descend into the nested array but evaluates the array at top-level.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$allElementsTrue`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/allElementsTrue/#mongodb-expression-exp.-allElementsTrue) | Returns `true` if *no* element of a set evaluates to `false`, otherwise, returns `false`. Accepts a single argument expression. |
| [`$anyElementTrue`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/anyElementTrue/#mongodb-expression-exp.-anyElementTrue) | Returns `true` if *any* elements of a set evaluate to `true`; otherwise, returns `false`. Accepts a single argument expression. |
| [`$setDifference`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setDifference/#mongodb-expression-exp.-setDifference) | Returns a set with elements that appear in the first set but not in the second set; i.e. performs a [relative complement](http://en.wikipedia.org/wiki/Complement_(set_theory)) |

| of the second set relative to the first. Accepts exactly two argument expressions. |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$setEquals`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setEquals/#mongodb-expression-exp.-setEquals) | Returns `true` if the input sets have the same distinct elements. Accepts two or more argument expressions. |
| [`$setIntersection`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setIntersection/#mongodb-expression-exp.-setIntersection) | Returns a set with elements that appear in *all* of the input sets. Accepts any number of argument expressions. |
| [`$setIsSubset`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setIsSubset/#mongodb-expression-exp.-setIsSubset) | Returns `true` if all elements of the first set appear in the second set, including when the first set equals the second set; i.e. not a [strict subset](http://en.wikipedia.org/wiki/Subset) |

| . Accepts exactly two argument expressions.                  |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$setUnion`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setUnion/#mongodb-expression-exp.-setUnion) | Returns a set with elements that appear in *any* of the input sets. |

### String Expression Operators 

String expressions, with the exception of [`$concat`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/#mongodb-expression-exp.-concat), only have a well-defined behavior for strings of ASCII characters.

[`$concat`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/#mongodb-expression-exp.-concat) behavior is well-defined regardless of the characters used.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$concat`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/#mongodb-expression-exp.-concat) | Concatenates any number of strings.                          |
| [`$dateFromString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateFromString/#mongodb-expression-exp.-dateFromString) | Converts a date/time string to a date object.                |
| [`$dateToString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/dateToString/#mongodb-expression-exp.-dateToString) | Returns the date as a formatted string.                      |
| [`$indexOfBytes`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexOfBytes/#mongodb-expression-exp.-indexOfBytes) | Searches a string for an occurrence of a substring and returns the UTF-8 byte index of the first occurrence. If the substring is not found, returns `-1`. |
| [`$indexOfCP`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/indexOfCP/#mongodb-expression-exp.-indexOfCP) | Searches a string for an occurrence of a substring and returns the UTF-8 code point index of the first occurrence. If the substring is not found, returns `-1` |
| [`$ltrim`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/ltrim/#mongodb-expression-exp.-ltrim) | Removes whitespace or the specified characters from the beginning of a string.*New in version 4.0*. |
| [`$regexFind`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/regexFind/#mongodb-expression-exp.-regexFind) | Applies a regular expression (regex) to a string and returns information on the *first* matched substring.*New in version 4.2*. |
| [`$regexFindAll`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/regexFindAll/#mongodb-expression-exp.-regexFindAll) | Applies a regular expression (regex) to a string and returns information on the all matched substrings.*New in version 4.2*. |
| [`$regexMatch`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/regexMatch/#mongodb-expression-exp.-regexMatch) | Applies a regular expression (regex) to a string and returns a boolean that indicates if a match is found or not.*New in version 4.2*. |
| [`$replaceOne`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceOne/#mongodb-expression-exp.-replaceOne) | Replaces the first instance of a matched string in a given input.*New in version 4.4*. |
| [`$replaceAll`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceAll/#mongodb-expression-exp.-replaceAll) | Replaces all instances of a matched string in a given input.*New in version 4.4*. |
| [`$rtrim`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/rtrim/#mongodb-expression-exp.-rtrim) | Removes whitespace or the specified characters from the end of a string.*New in version 4.0*. |
| [`$split`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/split/#mongodb-expression-exp.-split) | Splits a string into substrings based on a delimiter. Returns an array of substrings. If the delimiter is not found within the string, returns an array containing the original string. |
| [`$strLenBytes`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/strLenBytes/#mongodb-expression-exp.-strLenBytes) | Returns the number of UTF-8 encoded bytes in a string.       |
| [`$strLenCP`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/strLenCP/#mongodb-expression-exp.-strLenCP) | Returns the number of UTF-8 [code points](http://www.unicode.org/glossary/#code_point) |

| in a string.                                                 |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$strcasecmp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/strcasecmp/#mongodb-expression-exp.-strcasecmp) | Performs case-insensitive string comparison and returns: `0` if two strings are equivalent, `1` if the first string is greater than the second, and `-1` if the first string is less than the second. |
| [`$substr`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substr/#mongodb-expression-exp.-substr) | Deprecated. Use [`$substrBytes`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substrBytes/#mongodb-expression-exp.-substrBytes) or [`$substrCP`.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substrCP/#mongodb-expression-exp.-substrCP) |
| [`$substrBytes`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substrBytes/#mongodb-expression-exp.-substrBytes) | Returns the substring of a string. Starts with the character at the specified UTF-8 byte index (zero-based) in the string and continues for the specified number of bytes. |
| [`$substrCP`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substrCP/#mongodb-expression-exp.-substrCP) | Returns the substring of a string. Starts with the character at the specified UTF-8 [code point (CP)](http://www.unicode.org/glossary/#code_point) |

| index (zero-based) in the string and continues for the number of code points specified. |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$toLower`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toLower/#mongodb-expression-exp.-toLower) | Converts a string to lowercase. Accepts a single argument expression. |
| [`$toString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toString/#mongodb-expression-exp.-toString) | Converts value to a string.*New in version 4.0*.             |
| [`$trim`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/trim/#mongodb-expression-exp.-trim) | Removes whitespace or the specified characters from the beginning and end of a string.*New in version 4.0*. |
| [`$toUpper`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toUpper/#mongodb-expression-exp.-toUpper) | Converts a string to uppercase. Accepts a single argument expression. |

### Text Expression Operator 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$meta`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/meta/#mongodb-expression-exp.-meta) | Access available per-document metadata related to the aggregation operation. |

### Timestamp Expression Operators 

Timestamp expression operators return values from a [timestamp.](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp)

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$tsIncrement`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/tsIncrement/#mongodb-expression-exp.-tsIncrement) | Returns the incrementing ordinal from a [timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp) as a [`long`.](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json-v1/#mongodb-bsontype-data_numberlong)*New in version 5.1*. |
| [`$tsSecond`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/tsSecond/#mongodb-expression-exp.-tsSecond) | Returns the seconds from a [timestamp](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-document-bson-type-timestamp) as a [`long`.](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json-v1/#mongodb-bsontype-data_numberlong)*New in version 5.1*. |

### Trigonometry Expression Operators 

Trigonometry expressions perform trigonometric operations on numbers. Values that represent angles are always input or output in  radians. Use [`$degreesToRadians`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/degreesToRadians/#mongodb-expression-exp.-degreesToRadians) and [`$radiansToDegrees`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/radiansToDegrees/#mongodb-expression-exp.-radiansToDegrees) to convert between degree and radian measurements.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$sin`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sin/#mongodb-expression-exp.-sin) | Returns the sine of a value that is measured in radians.     |
| [`$cos`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cos/#mongodb-expression-exp.-cos) | Returns the cosine of a value that is measured in radians.   |
| [`$tan`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/tan/#mongodb-expression-exp.-tan) | Returns the tangent of a value that is measured in radians.  |
| [`$asin`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/asin/#mongodb-expression-exp.-asin) | Returns the inverse sin (arc sine) of a value in radians.    |
| [`$acos`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/acos/#mongodb-expression-exp.-acos) | Returns the inverse cosine (arc cosine) of a value in radians. |
| [`$atan`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atan/#mongodb-expression-exp.-atan) | Returns the inverse tangent (arc tangent) of a value in radians. |
| [`$atan2`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atan2/#mongodb-expression-exp.-atan2) | Returns the inverse tangent (arc tangent) of `y / x` in radians, where `y` and `x` are the first and second values passed to the expression respectively. |
| [`$asinh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/asinh/#mongodb-expression-exp.-asinh) | Returns the inverse hyperbolic sine (hyperbolic arc sine) of a value in radians. |
| [`$acosh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/acosh/#mongodb-expression-exp.-acosh) | Returns the inverse hyperbolic cosine (hyperbolic arc cosine) of a value in radians. |
| [`$atanh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/atanh/#mongodb-expression-exp.-atanh) | Returns the inverse hyperbolic tangent (hyperbolic arc tangent) of a value in radians. |
| [`$sinh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sinh/#mongodb-expression-exp.-sinh) | Returns the hyperbolic sine of a value that is measured in radians. |
| [`$cosh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/cosh/#mongodb-expression-exp.-cosh) | Returns the hyperbolic cosine of a value that is measured in radians. |
| [`$tanh`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/tanh/#mongodb-expression-exp.-tanh) | Returns the hyperbolic tangent of a value that is measured in radians. |
| [`$degreesToRadians`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/degreesToRadians/#mongodb-expression-exp.-degreesToRadians) | Converts a value from degrees to radians.                    |
| [`$radiansToDegrees`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/radiansToDegrees/#mongodb-expression-exp.-radiansToDegrees) | Converts a value from radians to degrees.                    |

### Type Expression Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$convert`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/convert/#mongodb-expression-exp.-convert) | Converts a value to a specified type.*New in version 4.0*.   |
| [`$isNumber`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/isNumber/#mongodb-expression-exp.-isNumber) | Returns boolean `true` if the specified expression resolves to an [`integer`](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Int32), [`decimal`](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Decimal128), [`double`](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Double), or [`long`.](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Int64)Returns boolean `false` if the expression resolves to any other [BSON type](https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/), `null`, or a missing field.*New in version 4.4*. |
| [`$toBool`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toBool/#mongodb-expression-exp.-toBool) | Converts value to a boolean.*New in version 4.0*.            |
| [`$toDate`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toDate/#mongodb-expression-exp.-toDate) | Converts value to a Date.*New in version 4.0*.               |
| [`$toDecimal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toDecimal/#mongodb-expression-exp.-toDecimal) | Converts value to a Decimal128.*New in version 4.0*.         |
| [`$toDouble`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toDouble/#mongodb-expression-exp.-toDouble) | Converts value to a double.*New in version 4.0*.             |
| [`$toInt`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toInt/#mongodb-expression-exp.-toInt) | Converts value to an integer.*New in version 4.0*.           |
| [`$toLong`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toLong/#mongodb-expression-exp.-toLong) | Converts value to a long.*New in version 4.0*.               |
| [`$toObjectId`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toObjectId/#mongodb-expression-exp.-toObjectId) | Converts value to an ObjectId.*New in version 4.0*.          |
| [`$toString`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toString/#mongodb-expression-exp.-toString) | Converts value to a string.*New in version 4.0*.             |
| [`$type`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/type/#mongodb-expression-exp.-type) | Return the BSON data type of the field.                      |



### Accumulators (`$group, $bucket, $bucketAuto, $setWindowFields`) 

Aggregation accumulator operators:

- Maintain their state as documents progress through the aggregation pipeline.
- Return totals, maxima, minima, and other values.
- Can be used in these aggregation pipeline stages:
  - [`$bucket`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/#mongodb-pipeline-pipe.-bucket)
  - [`$bucketAuto`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/#mongodb-pipeline-pipe.-bucketAuto)
  - [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group)
  - [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) starting in MongoDB 5.0 (except when you are using the [`$accumulator`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/#mongodb-group-grp.-accumulator) or [`$mergeObjects`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mergeObjects/#mongodb-expression-exp.-mergeObjects) operators, which cannot be used with [`$setWindowFields`)](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields)

*Changed in version 5.0*.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$accumulator`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/accumulator/#mongodb-group-grp.-accumulator) | Returns the result of a user-defined accumulator function.   |
| [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addToSet/#mongodb-group-grp.-addToSet) | Returns an array of *unique* expression values for each group. Order of the array elements is undefined.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$avg`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg) | Returns an average of numerical values. Ignores non-numeric values.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$bottom`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottom/#mongodb-group-grp.-bottom) | Returns the bottom element within a group according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$bottomN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottomN/#mongodb-group-grp.-bottomN) | Returns an aggregation of the bottom `n` fields within a group, according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$count`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count) | Returns the number of documents in a group.Distinct from the [`$count`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count) pipeline stage.*New in version 5.0*: Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$first`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/first/#mongodb-group-grp.-first) | Returns a value from the first document for each group. Order is only defined if the documents are sorted.Distinct from the [`$first`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/first-array-element/#mongodb-expression-exp.-first) array operator.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$firstN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN/#mongodb-group-grp.-firstN) | Returns an aggregation of the first `n` elements within a group. Only meaningful when documents are in a defined order. Distinct from the [`$firstN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/firstN-array-element/#mongodb-expression-exp.-firstN) array operator.*New in version 5.2*: Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group), [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$last`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/last/#mongodb-group-grp.-last) | Returns a value from the last document for each group. Order is only defined if the documents are sorted.Distinct from the [`$last`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/last-array-element/#mongodb-expression-exp.-last) array operator.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$lastN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN/#mongodb-group-grp.-lastN) | Returns an aggregation of the last `n` elements within a group. Only meaningful when documents are in a defined order. Distinct from the [`$lastN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lastN-array-element/#mongodb-expression-exp.-lastN) array operator.*New in version 5.2*: Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group), [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$max`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/max/#mongodb-group-grp.-max) | Returns the highest expression value for each group.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$maxN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN/#mongodb-group-grp.-maxN) | Returns an aggregation of the `n` maximum valued elements in a group. Distinct from the [`$maxN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/maxN-array-element/#mongodb-expression-exp.-maxN) array operator.*New in version 5.2*.Available in [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group), [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) and as an [expression.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) |
| [`$mergeObjects`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/mergeObjects/#mongodb-expression-exp.-mergeObjects) | Returns a document created by combining the input documents for each group. |
| [`$min`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/min/#mongodb-group-grp.-min) | Returns the lowest expression value for each group.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$push`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/push/#mongodb-group-grp.-push) | Returns an array of expression values for documents in each group.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$stdDevPop`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevPop/#mongodb-group-grp.-stdDevPop) | Returns the population standard deviation of the input values.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$stdDevSamp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevSamp/#mongodb-group-grp.-stdDevSamp) | Returns the sample standard deviation of the input values.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$sum`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum) | Returns a sum of numerical values. Ignores non-numeric values.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$top`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/top/#mongodb-group-grp.-top) | Returns the top element within a group according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$topN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/topN/#mongodb-group-grp.-topN) | Returns an aggregation of the top `n` fields within a group, according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |

### Accumulators (in Other Stages)

Some operators that are available as accumulators for the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) stage are also available for use in other stages but not as accumulators. When used in these other stages, these operators do not maintain their state and can take as input either a single argument or multiple arguments. For details, refer to the specific operator page.

*Changed in version 5.0*.

The following accumulator operators are also available in the [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project), [`$addFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/#mongodb-pipeline-pipe.-addFields), [`$set`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/#mongodb-pipeline-pipe.-set), and, starting in MongoDB 5.0, the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$avg`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg) | Returns an average of the specified expression or list of expressions for each document. Ignores non-numeric values. |
| [`$max`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/max/#mongodb-group-grp.-max) | Returns the maximum of the specified expression or list of expressions for each document |
| [`$min`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/min/#mongodb-group-grp.-min) | Returns the minimum of the specified expression or list of expressions for each document |
| [`$stdDevPop`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevPop/#mongodb-group-grp.-stdDevPop) | Returns the population standard deviation of the input values. |
| [`$stdDevSamp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevSamp/#mongodb-group-grp.-stdDevSamp) | Returns the sample standard deviation of the input values.   |
| [`$sum`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum) | Returns a sum of numerical values. Ignores non-numeric values. |

### Variable Expression Operators 

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$let`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/let/#mongodb-expression-exp.-let) | Defines variables for use within the scope of a subexpression and returns the result of the subexpression. Accepts named parameters.Accepts any number of argument expressions. |

### Window Operators

*New in version 5.0*.

Window operators return values from a defined span of documents from a collection, known as a *window*. A [window](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window) is defined in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage, available starting in MongoDB 5.0.

The following window operators are available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage.

| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$addToSet`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/addToSet/#mongodb-group-grp.-addToSet) | Returns an array of all unique values that results from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$avg`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/avg/#mongodb-group-grp.-avg) | Returns the average for the specified [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions). Ignores non-numeric values.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$bottom`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottom/#mongodb-group-grp.-bottom) | Returns the bottom element within a group according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$bottomN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bottomN/#mongodb-group-grp.-bottomN) | Returns an aggregation of the bottom `n` fields within a group, according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$count`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count-accumulator/#mongodb-group-grp.-count) | Returns the number of documents in the group or window.Distinct from the [`$count`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/#mongodb-pipeline-pipe.-count) pipeline stage.*New in version 5.0*. |
| [`$covariancePop`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/covariancePop/#mongodb-group-grp.-covariancePop) | Returns the population covariance of two numeric [expressions.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions)*New in version 5.0*. |
| [`$covarianceSamp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/covarianceSamp/#mongodb-group-grp.-covarianceSamp) | Returns the sample covariance of two numeric [expressions.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions)*New in version 5.0*. |
| [`$denseRank`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/denseRank/#mongodb-group-grp.-denseRank) | Returns the document position (known as the rank) relative to other documents in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage [partition](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-partitionBy). There are no gaps in the ranks. Ties receive the same rank.*New in version 5.0*. |
| [`$derivative`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/derivative/#mongodb-group-grp.-derivative) | Returns the average rate of change within the specified [window.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window)*New in version 5.0*. |
| [`$documentNumber`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/documentNumber/#mongodb-group-grp.-documentNumber) | Returns the position of a document (known as the document number) in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage [partition](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-partitionBy). Ties result in different adjacent document numbers.*New in version 5.0*. |
| [`$expMovingAvg`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/expMovingAvg/#mongodb-group-grp.-expMovingAvg) | Returns the exponential moving average for the numeric [expression.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions)*New in version 5.0*. |
| [`$first`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/first/#mongodb-group-grp.-first) | Returns the value that results from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to the first document in a group or [window.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window)*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$integral`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/integral/#mongodb-group-grp.-integral) | Returns the approximation of the area under a curve.*New in version 5.0*. |
| [`$last`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/last/#mongodb-group-grp.-last) | Returns the value that results from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to the last document in a group or [window.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window)*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$linearFill`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/linearFill/#mongodb-group-grp.-linearFill) | Fills `null` and missing fields in a [window](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window) using [linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation) |

| based on surrounding field values.Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage.*New in version 5.3*. |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$locf`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/locf/#mongodb-group-grp.-locf) | Last observation carried forward. Sets values for `null` and missing fields in a [window](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-window) to the last non-null value for the field.Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage.*New in version 5.2*. |
| [`$max`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/max/#mongodb-group-grp.-max) | Returns the maximum value that results from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$min`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/min/#mongodb-group-grp.-min) | Returns the minimum value that results from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$minN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN/#mongodb-group-grp.-minN) | Returns an aggregation of the `n` minimum valued elements in a group. Distinct from the [`$minN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/minN-array-element/#mongodb-expression-exp.-minN) array operator.*New in version 5.2*.Available in [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group), [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) and as an [expression.](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) |
| [`$push`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/push/#mongodb-group-grp.-push) | Returns an array of values that result from applying an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$rank`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/rank/#mongodb-group-grp.-rank) | Returns the document position (known as the rank) relative to other documents in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage [partition.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-partitionBy)*New in version 5.0*. |
| [`$shift`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/shift/#mongodb-group-grp.-shift) | Returns the value from an [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) applied to a document in a specified position relative to the current document in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage [partition.](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#std-label-setWindowFields-partitionBy)*New in version 5.0*. |
| [`$stdDevPop`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevPop/#mongodb-group-grp.-stdDevPop) | Returns the population standard deviation that results from applying a numeric [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$stdDevSamp`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/stdDevSamp/#mongodb-group-grp.-stdDevSamp) | Returns the sample standard deviation that results from applying a numeric [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$sum`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/#mongodb-group-grp.-sum) | Returns the sum that results from applying a numeric [expression](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions) to each document.*Changed in version 5.0*: Available in the [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stage. |
| [`$top`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/top/#mongodb-group-grp.-top) | Returns the top element within a group according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |
| [`$topN`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/topN/#mongodb-group-grp.-topN) | Returns an aggregation of the top `n` fields within a group, according to the specified sort order.*New in version 5.2*.Available in the [`$group`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#mongodb-pipeline-pipe.-group) and [`$setWindowFields`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/setWindowFields/#mongodb-pipeline-pipe.-setWindowFields) stages. |