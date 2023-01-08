# Class Sheet

Доступ і редагування аркушів електронних таблиць. Типовими операціями є перейменування аркуша та доступ до об’єктів діапазону з аркуша.

https://developers.google.com/apps-script/reference/spreadsheet/sheet

## Робота з комірками

### Вставлення рядків

`insertRows(rowIndex)` - Вставляє порожній рядок на аркуші у вказане місце `rowIndex`.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
// Shifts all rows down by one
sheet.insertRows(1);
```

`insertRows(rowIndex, numRows)` - Вставляє один або кілька `numRows` послідовних порожніх рядків на аркуші, починаючи з указаного місця `rowIndex`. 

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
// Shifts all rows down by three
sheet.insertRows(1, 3);
```

------

`insertRowsAfter(afterPosition, howMany)` - Вставляє кілька рядків `howMany` після вказаної позиції рядка `afterPosition`.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

// This inserts five rows after the first row
sheet.insertRowsAfter(1, 5);
```

------

`insertRowsBefore(beforePosition, howMany)` - Вставляє кілька рядків `howMany` перед заданою позицією `beforePosition` рядка . 

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

// This inserts five rows before the first row
sheet.insertRowsBefore(1, 5);
```

### Доступ до комірок

`getRange(row, column)` - Повертає діапазон із верхньою лівою клітинкою за заданими координатами `row` `column`.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
// Передача лише двох аргументів повертає "діапазон" з однією клітинкою.
var range = sheet.getRange(1, 1);
var values = range.getValues();
Logger.log(values[0][0]);
```

`getRange(row, column, numRows)` - Повертає діапазон із верхньою лівою клітинкою за заданими координатами та заданою кількістю рядків.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
// Коли використовується аргумент "numRows", повертається лише один стовпець даних.
var range = sheet.getRange(1, 1, 3);
var values = range.getValues();

// Друкує 3 значення з першого стовпця, починаючи з рядка 1.
for (var row in values) {
  for (var col in values[row]) {
    Logger.log(values[row][col]);
  }
}
```

`getRange(row, column, numRows, numColumns)` - Повертає діапазон із верхньою лівою коміркою в заданих координатах із заданою кількістю рядків і стовпців.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
var range = sheet.getRange(1, 1, 3, 3);
var values = range.getValues();

// Print values from a 3x3 box.
for (var row in values) {
  for (var col in values[row]) {
    Logger.log(values[row][col]);
  }
}
```

`getRange(a1Notation)` - Повертає діапазон, як зазначено в нотації A1 або R1C1.

```js
// Get a range A1:D4 on sheet titled "Invoices"
var ss = SpreadsheetApp.getActiveSpreadsheet();
var range = ss.getRange("Invoices!A1:D4");

// Get cell A1 on the first sheet
var sheet = ss.getSheets()[0];
var cell = sheet.getRange("A1");
```

`getRangeList(a1Notations)` - Повертає колекцію RangeList, яка представляє діапазони на тому самому аркуші, визначеному непорожнім списком нотацій A1 або R1C1.

```js
// Get a list of ranges A1:D4, F1:H4.
var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
var rangeList  = sheet.getRangeList(['A1:D4', 'F1:H4']);
```

`getActiveCell()`  `Range`  Returns the active cell in this sheet.

`getActiveRange()`  `Range`  Returns the selected range in the active sheet, or `null` if there is no active range.

`getActiveRangeList()`  `RangeList`  Returns the list of active ranges in the active sheet or `null` if there are no active ranges.

`getCurrentCell()`  `Range`  Returns the current cell in the active sheet or `null` if there is no current cell.

`getDataRange()`  `Range`  Returns a `Range` corresponding to the dimensions in which data is present.

`setActiveRange(range)`  `Range`  Sets the specified range as the `active range` in the active sheet, with the top left cell in the range as the `current cell`.

`setActiveSelection(range)`  `Range`  Sets the active selection region for this sheet.

`setActiveSelection(a1Notation)`  `Range`  Sets the active selection, as specified in A1 notation or R1C1 notation.

`setActiveRangeList(rangeList)`  `RangeList`  Sets the specified list of ranges as the `active ranges` in the active sheet.

`setCurrentCell(cell)`  `Range`  Sets the specified cell as the `current cell`.

## Інформація про лист

`getName()` Returns the name of the sheet.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];
Logger.log(sheet.getName());
```

## Усі методи

| Method                                                       | Return type                  | Brief description                                            |
| ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| `activate()`                                                 | `Sheet`                      | Activates this sheet.                                        |
| `addDeveloperMetadata(key)`                                  | `Sheet`                      | Adds developer metadata with the specified key to the sheet. |
| `addDeveloperMetadata(key, visibility)`                      | `Sheet`                      | Adds developer metadata with the specified key and visibility to the sheet. |
| `addDeveloperMetadata(key, value)`                           | `Sheet`                      | Adds developer metadata with the specified key and value to the sheet. |
| `addDeveloperMetadata(key, value, visibility)`               | `Sheet`                      | Adds developer metadata with the specified key, value, and visibility to the sheet. |
| `appendRow(rowContents)`                                     | `Sheet`                      | Appends a row to the bottom of the current data region in the sheet. |
| `asDataSourceSheet()`                                        | `DataSourceSheet`            | Returns the sheet as a `DataSourceSheet` if the sheet is of type `SheetType.DATASOURCE`, or `null` otherwise. |
| `autoResizeColumn(columnPosition)`                           | `Sheet`                      | Sets the width of the given column to fit its contents.      |
| `autoResizeColumns(startColumn, numColumns)`                 | `Sheet`                      | Sets the width of all columns starting at the given column position to fit their contents. |
| `autoResizeRows(startRow, numRows)`                          | `Sheet`                      | Sets the height of all rows starting at the given row position to fit their contents. |
| `clear()`                                                    | `Sheet`                      | Clears the sheet of content and formatting information.      |
| `clear(options)`                                             | `Sheet`                      | Clears the sheet of contents and/or format, as specified with the given advanced options. |
| `clearConditionalFormatRules()`                              | `void`                       | Removes all conditional format rules from the sheet.         |
| `clearContents()`                                            | `Sheet`                      | Clears the sheet of contents, while preserving formatting information. |
| `clearFormats()`                                             | `Sheet`                      | Clears the sheet of formatting, while preserving contents.   |
| `clearNotes()`                                               | `Sheet`                      | Clears the sheet of all notes.                               |
| `collapseAllColumnGroups()`                                  | `Sheet`                      | Collapses all column groups on the sheet.                    |
| `collapseAllRowGroups()`                                     | `Sheet`                      | Collapses all row groups on the sheet.                       |
| `copyTo(spreadsheet)`                                        | `Sheet`                      | Copies the sheet to a given spreadsheet, which can be the same spreadsheet as the source. |
| `createDeveloperMetadataFinder()`                            | `DeveloperMetadataFinder`    | Returns a `DeveloperMetadataFinder` for finding developer metadata within the scope of this sheet. |
| `createTextFinder(findText)`                                 | `TextFinder`                 | Creates a text finder for the sheet, which can find and replace text within the sheet. |
| `deleteColumn(columnPosition)`                               | `Sheet`                      | Deletes the column at the given column position.             |
| `deleteColumns(columnPosition, howMany)`                     | `void`                       | Deletes a number of columns starting at the given column position. |
| `deleteRow(rowPosition)`                                     | `Sheet`                      | Deletes the row at the given row position.                   |
| `deleteRows(rowPosition, howMany)`                           | `void`                       | Deletes a number of rows starting at the given row position. |
| `expandAllColumnGroups()`                                    | `Sheet`                      | Expands all column groups on the sheet.                      |
| `expandAllRowGroups()`                                       | `Sheet`                      | Expands all row groups on the sheet.                         |
| `expandColumnGroupsUpToDepth(groupDepth)`                    | `Sheet`                      | Expands all column groups up to the given depth, and collapses all others. |
| `expandRowGroupsUpToDepth(groupDepth)`                       | `Sheet`                      | Expands all row groups up to the given depth, and collapses all others. |
| `getBandings()`                                              | `Banding[]`                  | Returns all the bandings in this sheet.                      |
| `getCharts()`                                                | `EmbeddedChart[]`            | Returns an array of charts on this sheet.                    |
| `getColumnGroup(columnIndex, groupDepth)`                    | `Group`                      | Returns the column group at the given index and group depth. |
| `getColumnGroupControlPosition()`                            | `GroupControlTogglePosition` | Returns the `GroupControlTogglePosition` for all column groups on the sheet. |
| `getColumnGroupDepth(columnIndex)`                           | `Integer`                    | Returns the group depth of the column at the given index.    |
| `getColumnWidth(columnPosition)`                             | `Integer`                    | Gets the width in pixels of the given column.                |
| `getConditionalFormatRules()`                                | `ConditionalFormatRule[]`    | Get all conditional format rules in this sheet.              |
| `getDataSourceFormulas()`                                    | `DataSourceFormula[]`        | Gets all the data source formulas.                           |
| `getDataSourcePivotTables()`                                 | `DataSourcePivotTable[]`     | Gets all the data source pivot tables.                       |
| `getDataSourceTables()`                                      | `DataSourceTable[]`          | Gets all the data source tables.                             |
| `getDeveloperMetadata()`                                     | `DeveloperMetadata[]`        | Get all developer metadata associated with this sheet.       |
| `getDrawings()`                                              | `Drawing[]`                  | Returns an array of drawings on the sheet.                   |
| `getFilter()`                                                | `Filter`                     | Returns the filter in this sheet, or `null` if there is no filter. |
| `getFormUrl()`                                               | `String`                     | Returns the URL for the form that sends its responses to this sheet, or `null` if this sheet has no associated form. |
| `getFrozenColumns()`                                         | `Integer`                    | Returns the number of frozen columns.                        |
| `getFrozenRows()`                                            | `Integer`                    | Returns the number of frozen rows.                           |
| `getImages()`                                                | `OverGridImage[]`            | Returns all over-the-grid images on the sheet.               |
| `getIndex()`                                                 | `Integer`                    | Gets the position of the sheet in its parent spreadsheet.    |
| `getLastColumn()`                                            | `Integer`                    | Returns the position of the last column that has content.    |
| `getLastRow()`                                               | `Integer`                    | Returns the position of the last row that has content.       |
| `getMaxColumns()`                                            | `Integer`                    | Returns the current number of columns in the sheet, regardless of content. |
| `getMaxRows()`                                               | `Integer`                    | Returns the current number of rows in the sheet, regardless of content. |
| `getName()`                                                  | `String`                     | Returns the name of the sheet.                               |
| `getNamedRanges()`                                           | `NamedRange[]`               | Gets all the named ranges in this sheet.                     |
| `getParent()`                                                | `Spreadsheet`                | Returns the `Spreadsheet` that contains this sheet.          |
| `getPivotTables()`                                           | `PivotTable[]`               | Returns all the pivot tables on this sheet.                  |
| `getProtections(type)`                                       | `Protection[]`               | Gets an array of objects representing all protected ranges in the sheet, or a single-element array representing the protection on the sheet itself. |
| `getRowGroup(rowIndex, groupDepth)`                          | `Group`                      | Returns the row group at the given index and group depth.    |
| `getRowGroupControlPosition()`                               | `GroupControlTogglePosition` | Returns the `GroupControlTogglePosition` for all row groups on the sheet. |
| `getRowGroupDepth(rowIndex)`                                 | `Integer`                    | Returns the group depth of the row at the given index.       |
| `getRowHeight(rowPosition)`                                  | `Integer`                    | Gets the height in pixels of the given row.                  |
| `getSelection()`                                             | `Selection`                  | Returns the current `Selection` in the spreadsheet.          |
| `getSheetId()`                                               | `Integer`                    | Returns the ID of the sheet represented by this object.      |
| `getSheetName()`                                             | `String`                     | Returns the sheet name.                                      |
| `getSheetValues(startRow, startColumn, numRows, numColumns)` | `Object[][]`                 | Returns the rectangular grid of values for this range starting at the given coordinates. |
| `getSlicers()`                                               | `Slicer[]`                   | Returns an array of slicers on the sheet.                    |
| `getTabColorObject()`                                        | `Color`                      | Gets the sheet tab color, or `null` if the sheet tab has no color. |
| `getType()`                                                  | `SheetType`                  | Returns the type of the sheet.                               |
| `hasHiddenGridlines()`                                       | `Boolean`                    | Returns `true` if the sheet's gridlines are hidden; otherwise returns `false`. |
| `hideColumn(column)`                                         | `void`                       | Hides the column or columns in the given range.              |
| `hideColumns(columnIndex)`                                   | `void`                       | Hides a single column at the given index.                    |
| `hideColumns(columnIndex, numColumns)`                       | `void`                       | Hides one or more consecutive columns starting at the given index. |
| `hideRow(row)`                                               | `void`                       | Hides the rows in the given range.                           |
| `hideRows(rowIndex)`                                         | `void`                       | Hides the row at the given index.                            |
| `hideRows(rowIndex, numRows)`                                | `void`                       | Hides one or more consecutive rows starting at the given index. |
| `hideSheet()`                                                | `Sheet`                      | Hides this sheet.                                            |
| `insertChart(chart)`                                         | `void`                       | Adds a new chart to this sheet.                              |
| `insertColumnAfter(afterPosition)`                           | `Sheet`                      | Inserts a column after the given column position.            |
| `insertColumnBefore(beforePosition)`                         | `Sheet`                      | Inserts a column before the given column position.           |
| `insertColumns(columnIndex)`                                 | `void`                       | Inserts a blank column in a sheet at the specified location. |
| `insertColumns(columnIndex, numColumns)`                     | `void`                       | Inserts one or more consecutive blank columns in a sheet starting at the specified location. |
| `insertColumnsAfter(afterPosition, howMany)`                 | `Sheet`                      | Inserts a number of columns after the given column position. |
| `insertColumnsBefore(beforePosition, howMany)`               | `Sheet`                      | Inserts a number of columns before the given column position. |
| `insertImage(blobSource, column, row)`                       | `OverGridImage`              | Inserts a `BlobSource` as an image in the document at a given row and column. |
| `insertImage(blobSource, column, row, offsetX, offsetY)`     | `OverGridImage`              | Inserts a `BlobSource` as an image in the document at a given row and column, with a pixel offset. |
| `insertImage(url, column, row)`                              | `OverGridImage`              | Inserts an image in the document at a given row and column.  |
| `insertImage(url, column, row, offsetX, offsetY)`            | `OverGridImage`              | Inserts an image in the document at a given row and column, with a pixel offset. |
| `insertRowAfter(afterPosition)`                              | `Sheet`                      | Inserts a row after the given row position.                  |
| `insertRowBefore(beforePosition)`                            | `Sheet`                      | Inserts a row before the given row position.                 |
| `insertRows(rowIndex)`                                       | `void`                       | Inserts a blank row in a sheet at the specified location.    |
| `insertRows(rowIndex, numRows)`                              | `void`                       | Inserts one or more consecutive blank rows in a sheet starting at the specified location. |
| `insertRowsAfter(afterPosition, howMany)`                    | `Sheet`                      | Inserts a number of rows after the given row position.       |
| `insertRowsBefore(beforePosition, howMany)`                  | `Sheet`                      | Inserts a number of rows before the given row position.      |
| `insertSlicer(range, anchorRowPos, anchorColPos)`            | `Slicer`                     | Adds a new slicer to this sheet.                             |
| `insertSlicer(range, anchorRowPos, anchorColPos, offsetX, offsetY)` | `Slicer`                     | Adds a new slicer to this sheet.                             |
| `isColumnHiddenByUser(columnPosition)`                       | `Boolean`                    | Returns whether the given column is hidden by the user.      |
| `isRightToLeft()`                                            | `Boolean`                    | Returns `true` if this sheet layout is right-to-left.        |
| `isRowHiddenByFilter(rowPosition)`                           | `Boolean`                    | Returns whether the given row is hidden by a filter (not a filter view). |
| `isRowHiddenByUser(rowPosition)`                             | `Boolean`                    | Returns whether the given row is hidden by the user.         |
| `isSheetHidden()`                                            | `Boolean`                    | Returns `true` if the sheet is currently hidden.             |
| `moveColumns(columnSpec, destinationIndex)`                  | `void`                       | Moves the columns selected by the given range to the position indicated by the `destinationIndex`. |
| `moveRows(rowSpec, destinationIndex)`                        | `void`                       | Moves the rows selected by the given range to the position indicated by the `destinationIndex`. |
| `newChart()`                                                 | `EmbeddedChartBuilder`       | Returns a builder to create a new chart for this sheet.      |
| `protect()`                                                  | `Protection`                 | Creates an object that can protect the sheet from being edited except by users who have permission. |
| `removeChart(chart)`                                         | `void`                       | Removes a chart from the parent sheet.                       |
| `setColumnGroupControlPosition(position)`                    | `Sheet`                      | Sets the position of the column group control toggle on the sheet. |
| `setColumnWidth(columnPosition, width)`                      | `Sheet`                      | Sets the width of the given column in pixels.                |
| `setColumnWidths(startColumn, numColumns, width)`            | `Sheet`                      | Sets the width of the given columns in pixels.               |
| `setConditionalFormatRules(rules)`                           | `void`                       | Replaces all currently existing conditional format rules in the sheet with the input rules. |
| `setFrozenColumns(columns)`                                  | `void`                       | Freezes the given number of columns.                         |
| `setFrozenRows(rows)`                                        | `void`                       | Freezes the given number of rows.                            |
| `setHiddenGridlines(hideGridlines)`                          | `Sheet`                      | Hides or reveals the sheet gridlines.                        |
| `setName(name)`                                              | `Sheet`                      | Sets the sheet name.                                         |
| `setRightToLeft(rightToLeft)`                                | `Sheet`                      | Sets or unsets the sheet layout to right-to-left.            |
| `setRowGroupControlPosition(position)`                       | `Sheet`                      | Sets the position of the row group control toggle on the sheet. |
| `setRowHeight(rowPosition, height)`                          | `Sheet`                      | Sets the row height of the given row in pixels.              |
| `setRowHeights(startRow, numRows, height)`                   | `Sheet`                      | Sets the height of the given rows in pixels.                 |
| `setRowHeightsForced(startRow, numRows, height)`             | `Sheet`                      | Sets the height of the given rows in pixels.                 |
| `setTabColor(color)`                                         | `Sheet`                      | Sets the sheet tab color.                                    |
| `setTabColorObject(color)`                                   | `Sheet`                      | Sets the sheet tab color.                                    |
| `showColumns(columnIndex)`                                   | `void`                       | Unhides the column at the given index.                       |
| `showColumns(columnIndex, numColumns)`                       | `void`                       | Unhides one or more consecutive columns starting at the given index. |
| `showRows(rowIndex)`                                         | `void`                       | Unhides the row at the given index.                          |
| `showRows(rowIndex, numRows)`                                | `void`                       | Unhides one or more consecutive rows starting at the given index. |
| `showSheet()`                                                | `Sheet`                      | Makes the sheet visible.                                     |
| `sort(columnPosition)`                                       | `Sheet`                      | Sorts a sheet by column, ascending.                          |
| `sort(columnPosition, ascending)`                            | `Sheet`                      | Sorts a sheet by column.                                     |
| `unhideColumn(column)`                                       | `void`                       | Unhides the column in the given range.                       |
| `unhideRow(row)`                                             | `void`                       | Unhides the row in the given range.                          |
| `updateChart(chart)`                                         | `void`                       | Updates the chart on this sheet.                             |

