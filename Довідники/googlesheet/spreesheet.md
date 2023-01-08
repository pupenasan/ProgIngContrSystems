# Class Spreadsheet

Доступ і редагування файлів Google Таблиць. Типовими операціями є додавання нових аркушів і додавання співавторів.

https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet

## Metadata

`addDeveloperMetadata(key)`  `Spreadsheet`  Adds developer metadata with the specified key to the top-level spreadsheet.

`addDeveloperMetadata(key, visibility)`  `Spreadsheet`  Adds developer metadata with the specified key and visibility to the spreadsheet.

`addDeveloperMetadata(key, value)`  `Spreadsheet`  Adds developer metadata with the specified key and value to the spreadsheet.

`addDeveloperMetadata(key, value, visibility)`  `Spreadsheet`  Adds developer metadata with the specified key, value, and visibility to the spreadsheet.

`addEditor(emailAddress)`  `Spreadsheet`  Adds the given user to the list of editors for the `Spreadsheet`.

`addEditor(user)`  `Spreadsheet`  Adds the given user to the list of editors for the `Spreadsheet`.

`addEditors(emailAddresses)`  `Spreadsheet`  Adds the given array of users to the list of editors for the `Spreadsheet`.

`addViewer(emailAddress)`  `Spreadsheet`  Adds the given user to the list of viewers for the `Spreadsheet`.

`addViewer(user)`  `Spreadsheet`  Adds the given user to the list of viewers for the `Spreadsheet`.

`addViewers(emailAddresses)`  `Spreadsheet`  Adds the given array of users to the list of viewers for the `Spreadsheet`.

`createDeveloperMetadataFinder()`  `DeveloperMetadataFinder`  Returns a `DeveloperMetadataFinder` for finding developer metadata within the scope of this spreadsheet.

`getDeveloperMetadata()`  `DeveloperMetadata[]`  Get the developer metadata associated with the top-level spreadsheet.

`getEditors()`  `User[]`  Gets the list of editors for this `Spreadsheet`.

`getOwner()`  `User`  Returns the owner of the document, or `null` for a document in a shared drive.

## Menu

`addMenu(name, subMenus)`  `void`  Creates a new menu in the Spreadsheet UI.

## Sheets

`deleteActiveSheet()`  `Sheet`  Deletes the currently active sheet.

`deleteSheet(sheet)`  `void`  Deletes the specified sheet.

`duplicateActiveSheet()`  `Sheet`  Duplicates the active sheet and makes it the active sheet.

`getActiveSheet()`  `Sheet`  Gets the active sheet in a spreadsheet.

`getDataSourceSheets()`  `DataSourceSheet[]`  Returns all the data source sheets in the spreadsheet.

## Зміст листів

`appendRow(rowContents)`  `Sheet`  Appends a row to the bottom of the current data region in the sheet.

`deleteColumn(columnPosition)`  `Sheet`  Deletes the column at the given column position.

`deleteColumns(columnPosition, howMany)`  `void`  Deletes a number of columns starting at the given column position.

`deleteRow(rowPosition)`  `Sheet`  Deletes the row at the given row position.

`deleteRows(rowPosition, howMany)`  `void`  Deletes a number of rows starting at the given row position.

`getActiveCell()`  `Range`  Returns the active cell in this sheet.

`getActiveRange()`  `Range`  Returns the selected range in the active sheet, or `null` if there is no active range.

`getActiveRangeList()`  `RangeList`  Returns the list of active ranges in the active sheet or `null` if there are no active ranges.

`getAs(contentType)`  `Blob`  Return the data inside this object as a blob converted to the specified content type.

`getBlob()`  `Blob`  Return the data inside this object as a blob.

`getCurrentCell()`  `Range`  Returns the current cell in the active sheet or `null` if there is no current cell.

`getDataRange()`  `Range`  Returns a `Range` corresponding to the dimensions in which data is present.

`getDataSourceFormulas()`  `DataSourceFormula[]`  Gets all the data source formulas.

`getDataSourceTables()`  `DataSourceTable[]`  Gets all the data source tables.

`getDataSources()`  `DataSource[]`  Returns all the data sources in the spreadsheet.

`getFrozenColumns()`  `Integer`  Returns the number of frozen columns.

`getFrozenRows()`  `Integer`  Returns the number of frozen rows.

`getImages()`  `OverGridImage[]`  Returns all over-the-grid images on the sheet.

`getIterativeCalculationConvergenceThreshold()`  `Number`  Returns the threshold value used during iterative calculation.

`getLastColumn()`  `Integer`  Returns the position of the last column that has content.

`getLastRow()`  `Integer`  Returns the position of the last row that has content.

`getNamedRanges()`  `NamedRange[]`  Gets all the named ranges in this spreadsheet.

`getRange(a1Notation)`  `Range`  Returns the range as specified in A1 notation or R1C1 notation.

`getRangeByName(name)`  `Range`  Returns a named range, or `null` if no range with the given name is found.

`getRangeList(a1Notations)`  `RangeList`  Returns the `RangeList` collection representing the ranges in the same sheet specified by a non-empty list of A1 notations or R1C1 notations.

`getSelection()`  `Selection`  Returns the current `Selection` in the spreadsheet.

## Розмір та форматування

`autoResizeColumn(columnPosition)`  `Sheet`  Sets the width of the given column to fit its contents.

`getColumnWidth(columnPosition)`  `Integer`  Gets the width in pixels of the given column.

`getRowHeight(rowPosition)`  `Integer`  Gets the height in pixels of the given row.

## Робота з документом вцілому

`copy(name)`  `Spreadsheet`  Copies the spreadsheet and returns the new one.

`createTextFinder(findText)`  `TextFinder`  Creates a text finder for the spreadsheet, which can be used to find and replace text within the spreadsheet.

`getDataSourceRefreshSchedules()`  `DataSourceRefreshSchedule[]`  Gets the refresh schedules of this spreadsheet.

`getFormUrl()`  `String`  Returns the URL for the form that sends its responses to this spreadsheet, or `null` if this spreadsheet has no associated form.

`getId()`  `String`  Gets a unique identifier for this spreadsheet.

`getMaxIterativeCalculationCycles()`  `Integer`  Returns the maximum number of iterations to use during iterative calculation.

`getName()`  `String`  Gets the name of the document.

`getNumSheets()`  `Integer`  Returns the number of sheets in this spreadsheet.

`getPredefinedSpreadsheetThemes()`  `SpreadsheetTheme[]`  Returns the list of predefined themes.

`getProtections(type)`  `Protection[]`  Gets an array of objects representing all protected ranges or sheets in the spreadsheet.

`getRecalculationInterval()`  `RecalculationInterval`  Returns the calculation interval for this spreadsheet.

## Banding

`getBandings()`  `Banding[]`  Returns all the bandings in this spreadsheet.

## Pivot

`getDataSourcePivotTables()`  `DataSourcePivotTable[]`  Gets all the data source pivot tables.

## Інші

### Methods

| Method                                                       | Return type        | Brief description                                            |
| ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| `getSheetByName(name)`                                       | `Sheet`            | Returns a sheet with the given name.                         |
| `getSheetId()`                                               | `Integer`          | Returns the ID of the sheet represented by this object.      |
| `getSheetName()`                                             | `String`           | Returns the sheet name.                                      |
| `getSheetValues(startRow, startColumn, numRows, numColumns)` | `Object[][]`       | Returns the rectangular grid of values for this range starting at the given coordinates. |
| `getSheets()`                                                | `Sheet[]`          | Gets all the sheets in this spreadsheet.                     |
| `getSpreadsheetLocale()`                                     | `String`           | Gets the spreadsheet locale.                                 |
| `getSpreadsheetTheme()`                                      | `SpreadsheetTheme` | Returns the current theme of the spreadsheet, or `null` if no theme is applied. |
| `getSpreadsheetTimeZone()`                                   | `String`           | Gets the time zone for the spreadsheet.                      |
| `getUrl()`                                                   | `String`           | Returns the URL for the given spreadsheet.                   |
| `getViewers()`                                               | `User[]`           | Gets the list of viewers and commenters for this `Spreadsheet`. |
| `hideColumn(column)`                                         | `void`             | Hides the column or columns in the given range.              |
| `hideRow(row)`                                               | `void`             | Hides the rows in the given range.                           |
| `insertColumnAfter(afterPosition)`                           | `Sheet`            | Inserts a column after the given column position.            |
| `insertColumnBefore(beforePosition)`                         | `Sheet`            | Inserts a column before the given column position.           |
| `insertColumnsAfter(afterPosition, howMany)`                 | `Sheet`            | Inserts a number of columns after the given column position. |
| `insertColumnsBefore(beforePosition, howMany)`               | `Sheet`            | Inserts a number of columns before the given column position. |
| `insertDataSourceSheet(spec)`                                | `DataSourceSheet`  | Inserts a new `DataSourceSheet` in the spreadsheet and starts data execution. |
| `insertImage(blobSource, column, row)`                       | `OverGridImage`    | Inserts a `Spreadsheet` as an image in the document at a given row and column. |
| `insertImage(blobSource, column, row, offsetX, offsetY)`     | `OverGridImage`    | Inserts a `Spreadsheet` as an image in the document at a given row and column, with a pixel offset. |
| `insertImage(url, column, row)`                              | `OverGridImage`    | Inserts an image in the document at a given row and column.  |
| `insertImage(url, column, row, offsetX, offsetY)`            | `OverGridImage`    | Inserts an image in the document at a given row and column, with a pixel offset. |
| `insertRowAfter(afterPosition)`                              | `Sheet`            | Inserts a row after the given row position.                  |
| `insertRowBefore(beforePosition)`                            | `Sheet`            | Inserts a row before the given row position.                 |
| `insertRowsAfter(afterPosition, howMany)`                    | `Sheet`            | Inserts a number of rows after the given row position.       |
| `insertRowsBefore(beforePosition, howMany)`                  | `Sheet`            | Inserts a number of rows before the given row position.      |
| `insertSheet()`                                              | `Sheet`            | Inserts a new sheet into the spreadsheet, using a default sheet name. |
| `insertSheet(sheetIndex)`                                    | `Sheet`            | Inserts a new sheet into the spreadsheet at the given index. |
| `insertSheet(sheetIndex, options)`                           | `Sheet`            | Inserts a new sheet into the spreadsheet at the given index and uses optional advanced arguments. |
| `insertSheet(options)`                                       | `Sheet`            | Inserts a new sheet into the spreadsheet, using a default sheet name and optional advanced arguments. |
| `insertSheet(sheetName)`                                     | `Sheet`            | Inserts a new sheet into the spreadsheet with the given name. |
| `insertSheet(sheetName, sheetIndex)`                         | `Sheet`            | Inserts a new sheet into the spreadsheet with the given name at the given index. |
| `insertSheet(sheetName, sheetIndex, options)`                | `Sheet`            | Inserts a new sheet into the spreadsheet with the given name at the given index and uses optional advanced arguments. |
| `insertSheet(sheetName, options)`                            | `Sheet`            | Inserts a new sheet into the spreadsheet with the given name and uses optional advanced arguments. |
| `insertSheetWithDataSourceTable(spec)`                       | `Sheet`            | Inserts a new sheet in the spreadsheet, creates a `DataSourceTable` spanning the entire sheet with the given data source specification, and starts data execution. |
| `isColumnHiddenByUser(columnPosition)`                       | `Boolean`          | Returns whether the given column is hidden by the user.      |
| `isIterativeCalculationEnabled()`                            | `Boolean`          | Returns whether iterative calculation is enabled in this spreadsheet. |
| `isRowHiddenByFilter(rowPosition)`                           | `Boolean`          | Returns whether the given row is hidden by a filter (not a filter view). |
| `isRowHiddenByUser(rowPosition)`                             | `Boolean`          | Returns whether the given row is hidden by the user.         |
| `moveActiveSheet(pos)`                                       | `void`             | Moves the active sheet to the given position in the list of sheets. |
| `moveChartToObjectSheet(chart)`                              | `Sheet`            | Creates a new `SheetType.OBJECT` sheet and moves the provided chart to it. |
| `refreshAllDataSources()`                                    | `void`             | Refreshes all supported data sources and their linked data source objects, skipping invalid data source objects. |
| `removeEditor(emailAddress)`                                 | `Spreadsheet`      | Removes the given user from the list of editors for the `Spreadsheet`. |
| `removeEditor(user)`                                         | `Spreadsheet`      | Removes the given user from the list of editors for the `Spreadsheet`. |
| `removeMenu(name)`                                           | `void`             | Removes a menu that was added by `addMenu(name, subMenus)`.  |
| `removeNamedRange(name)`                                     | `void`             | Deletes a named range with the given name.                   |
| `removeViewer(emailAddress)`                                 | `Spreadsheet`      | Removes the given user from the list of viewers and commenters for the `Spreadsheet`. |
| `removeViewer(user)`                                         | `Spreadsheet`      | Removes the given user from the list of viewers and commenters for the `Spreadsheet`. |
| `rename(newName)`                                            | `void`             | Renames the document.                                        |
| `renameActiveSheet(newName)`                                 | `void`             | Renames the current active sheet to the given new name.      |
| `resetSpreadsheetTheme()`                                    | `SpreadsheetTheme` | Removes the applied theme and sets the default theme on the spreadsheet. |
| `setActiveRange(range)`                                      | `Range`            | Sets the specified range as the `active range` in the active sheet, with the top left cell in the range as the `current cell`. |
| `setActiveRangeList(rangeList)`                              | `RangeList`        | Sets the specified list of ranges as the `active ranges` in the active sheet. |
| `setActiveSelection(range)`                                  | `Range`            | Sets the active selection region for this sheet.             |
| `setActiveSelection(a1Notation)`                             | `Range`            | Sets the active selection, as specified in A1 notation or R1C1 notation. |
| `setActiveSheet(sheet)`                                      | `Sheet`            | Sets the given sheet to be the active sheet in the spreadsheet. |
| `setActiveSheet(sheet, restoreSelection)`                    | `Sheet`            | Sets the given sheet to be the active sheet in the spreadsheet, with an option to restore the most recent selection within that sheet. |
| `setColumnWidth(columnPosition, width)`                      | `Sheet`            | Sets the width of the given column in pixels.                |
| `setCurrentCell(cell)`                                       | `Range`            | Sets the specified cell as the `current cell`.               |
| `setFrozenColumns(columns)`                                  | `void`             | Freezes the given number of columns.                         |
| `setFrozenRows(rows)`                                        | `void`             | Freezes the given number of rows.                            |
| `setIterativeCalculationConvergenceThreshold(minThreshold)`  | `Spreadsheet`      | Sets the minimum threshold value for iterative calculation.  |
| `setIterativeCalculationEnabled(isEnabled)`                  | `Spreadsheet`      | Sets whether iterative calculation is enabled in this spreadsheet. |
| `setMaxIterativeCalculationCycles(maxIterations)`            | `Spreadsheet`      | Sets the maximum number of calculation iterations that should be performed during iterative calculation. |
| `setNamedRange(name, range)`                                 | `void`             | Names a range.                                               |
| `setRecalculationInterval(recalculationInterval)`            | `Spreadsheet`      | Sets how often this spreadsheet should recalculate.          |
| `setRowHeight(rowPosition, height)`                          | `Sheet`            | Sets the row height of the given row in pixels.              |
| `setSpreadsheetLocale(locale)`                               | `void`             | Sets the spreadsheet locale.                                 |
| `setSpreadsheetTheme(theme)`                                 | `SpreadsheetTheme` | Sets a theme on the spreadsheet.                             |
| `setSpreadsheetTimeZone(timezone)`                           | `void`             | Sets the time zone for the spreadsheet.                      |
| `show(userInterface)`                                        | `void`             | Displays a custom user interface component in a dialog centered in the user's browser's viewport. |
| `sort(columnPosition)`                                       | `Sheet`            | Sorts a sheet by column, ascending.                          |
| `sort(columnPosition, ascending)`                            | `Sheet`            | Sorts a sheet by column.                                     |
| `toast(msg)`                                                 | `void`             | Shows a popup window in the lower right corner of the spreadsheet with the given message. |
| `toast(msg, title)`                                          | `void`             | Shows a popup window in the lower right corner of the spreadsheet with the given message and title. |
| `toast(msg, title, timeoutSeconds)`                          | `void`             | Shows a popup window in the lower right corner of the spreadsheet with the given title and message, that stays visible for a certain length of time. |
| `unhideColumn(column)`                                       | `void`             | Unhides the column in the given range.                       |
| `unhideRow(row)`                                             | `void`             | Unhides the row in the given range.                          |
| `updateMenu(name, subMenus)`                                 | `void`             | Updates a menu that was added by `addMenu(name, subMenus)`.  |
| `waitForAllDataExecutionsCompletion(timeoutInSeconds)`       | `void`             | Waits until all the current executions in the spreadsheet complete, timing out after the provided number of seconds. |