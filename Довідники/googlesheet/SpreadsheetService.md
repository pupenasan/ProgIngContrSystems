# Class SpreadsheetApp  та Spreadsheet Service

https://developers.google.com/apps-script/reference/spreadsheet

## Робота з застосунком

`flush()`  `void`  Застосовує всі незавершені зміни електронної таблиці.

`getUi()`  `Ui`  Повертає екземпляр середовища інтерфейсу користувача електронної таблиці, що дозволяє сценарію додавати такі функції, як меню, діалогові вікна та бічні панелі.

## Робота з таблицями та файлами таблиць

### getActive

`getActive()` -  Повертає поточну активну електронну таблицю або `null`, якщо такої немає. Функції, які виконуються в контексті електронної таблиці, можуть отримати посилання на відповідний об’єкт `Spreadsheet`, викликавши цю функцію.

```js
// The code below logs the URL for the active spreadsheet.
Logger.log(SpreadsheetApp.getActive().getUrl());
```

### getActiveSpreadsheet

`getActiveSpreadsheet()` - Отримує активний аркуш в електронній таблиці.

Повертає поточну активну електронну таблицю або `null`, якщо такої немає. Функції, які виконуються в контексті електронної таблиці, можуть отримати посилання на відповідний об’єкт `Spreadsheet`, викликавши цю функцію.

```js
// The code below logs the URL for the active spreadsheet.
Logger.log(SpreadsheetApp.getActiveSpreadsheet().getUrl());
```

### open

`open(file)` - Відкриває електронну таблицю, яка відповідає заданому об’єкту [File](https://developers.google.com/apps-script/reference/drive/file.html), повертає обєкт `Spreadsheet`

```js
// Get any starred spreadsheets from Google Drive, then open the spreadsheets and log the name of the first sheet within each spreadsheet.
	var files = DriveApp.searchFiles(
    	'starred = true and mimeType = "' + MimeType.GOOGLE_SHEETS + '"');
		while (files.hasNext()) {
  			var spreadsheet = SpreadsheetApp.open(files.next());
  			var sheet = spreadsheet.getSheets()[0];
  			Logger.log(sheet.getName());
		}
```

### openById

`openById(id)` - Відкриває електронну таблицю `Spreadsheet`  з указаним ідентифікатором. Ідентифікатор електронної таблиці можна отримати з її URL-адреси. Наприклад, ідентифікатор електронної таблиці в URL-адресі 

`https://docs.google.com/spreadsheets/d/abc1234567/edit#gid=0` є `abc1234567`.

```js
// The code below opens a spreadsheet using its ID and logs the name for it.
// Note that the spreadsheet is NOT physically opened on the client side.
// It is opened on the server only (for modification by the script).
var ss = SpreadsheetApp.openById("abc1234567");
Logger.log(ss.getName());
```

### openByUrl

`openByUrl(url)` - Відкриває електронну таблицю  `Spreadsheet`   з указаною URL-адресою. Створює виняток сценарію, якщо URL-адреса не існує або користувач не має дозволу на доступ до неї. 

```js
// The code below opens a spreadsheet using its id and logs the name for it.
// Note that the spreadsheet is NOT physically opened on the client side.
// It is opened on the server only (for modification by the script).
	var ss = SpreadsheetApp.openByUrl(
    'https://docs.google.com/spreadsheets/d/abc1234567/edit');
	Logger.log(ss.getName());
```

### create

`create(name)` - Створює нову електронну таблицю з заданим іменем і повертає на неї посилання  `Spreadsheet`. 

```js
// The code below creates a new spreadsheet "Finances" and logs the URL for it
var ssNew = SpreadsheetApp.create("Finances");
Logger.log(ssNew.getUrl());
```

`create(name, rows, columns)` - Створює нову електронну таблицю з заданим іменем `name` і вказаною кількістю рядків і стовпців. 

```js
// The code below creates a new spreadsheet "Finances" with 50 rows and 5 columns and logs the URL for it
var ssNew = SpreadsheetApp.create("Finances", 50, 5);
Logger.log(ssNew.getUrl());
```

## Робота з листами таблиць

### getActiveSheet

`getActiveSheet()` - Повертає поточну активну електронну таблицю або `null`, якщо такої немає. Активний аркуш в електронній таблиці – це аркуш, який відображається в інтерфейсі користувача електронної таблиці.

```js
// The code below logs the name of the active sheet.
Logger.log(SpreadsheetApp.getActiveSheet().getName());
```

### setActiveSheet

`setActiveSheet(sheet)` -  Встановлює активний аркуш [Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet) в електронній таблиці. Інтерфейс Google Таблиць відображає вибраний аркуш, якщо він не належить до іншої електронної таблиці.

```js
// The code below makes the 2nd sheet active in the active spreadsheet.
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[1]);
```

`setActiveSheet(sheet, restoreSelection)` -  Встановлює активний аркуш  [Sheet](https://developers.google.com/apps-script/reference/spreadsheet/sheet)  в електронній таблиці з можливістю відновлення останнього вибору `restoreSelection = true` на цьому аркуші. Інтерфейс Google Таблиць відображає вибраний аркуш, якщо він не належить до іншої електронної таблиці.

```js
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var firstSheet = spreadsheet.getSheets()[0];
var secondSheet = spreadsheet.getSheets()[1];
// Set the first sheet as the active sheet and select the range D4:F4.
spreadsheet.setActiveSheet(firstSheet).getRange('D4:F4').activate();

// Switch to the second sheet to do some work.
spreadsheet.setActiveSheet(secondSheet);
// Switch back to first sheet, and restore its selection.
spreadsheet.setActiveSheet(firstSheet, true);

// The selection of first sheet is restored, and it logs D4:F4
var range = spreadsheet.getActiveSheet().getSelection().getActiveRange();
Logger.log(range.getA1Notation());
```

## Доступ до комірок

### get|set ActiveRange

`getActiveRange()`  (повертає `Range`)  Повертає вибраний діапазон на активному аркуші або `null`, якщо активного діапазону немає. Зазвичай це означає діапазон, який користувач вибрав на активному аркуші, але в користувацькій функції це стосується комірки, яка активно перераховується.

```js
// Наведений нижче код реєструє фоновий колір для активного діапазону.
var colorObject = SpreadsheetApp.getActiveRange().getBackgroundObject();
// Припустимо, що колір має ColorType.RGB.
Logger.log(colorObject.asRgbColor().asHexString());
```

`setActiveRange(range)`  `Range`  Встановлює вказаний діапазон як `active range`, а верхню ліву клітинку в діапазоні як `current cell`. Інтерфейс електронної таблиці відображає аркуш, який містить вибраний діапазон, і вибирає комірки, визначені у вибраному діапазоні.

```js
// Наведений нижче код встановлює діапазон C1:D4 на першому аркуші як активний діапазон. 
var range = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange('C1:D4');
SpreadsheetApp.setActiveRange(range);

var selection = SpreadsheetApp.getSelection();
// Current cell: C1
var currentCell = selection.getCurrentCell();
// Active Range: C1:D4
var activeRange = selection.getActiveRange();
```

### get|set ActiveRangeList

`getActiveRangeList()`  `RangeList`  Повертає список активних діапазонів на активному аркуші або `null`, якщо діапазонів не вибрано.

`setActiveRangeList (rangeList)`  `RangeList`  Sets the specified list of ranges as the `active ranges`.

### get|set CurrentCell

`getCurrentCell()`  `Range`  Повертає поточну (виділену) комірку, вибрану в одному з активних діапазонів на активному аркуші, або `null`, якщо поточної комірки немає.

`setCurrentCell(cell)`  `Range`  Sets the specified cell as the `current cell`.

### getSelection

`getSelection()`  `Selection`   Повертає поточний `Selection` в електронній таблиці.



## Усі властивості

| Property                        | Type                            | Description                                                  |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------ |
| `AutoFillSeries`                | `AutoFillSeries`                | An enumeration of the types of series used to calculate auto-filled values. |
| `BandingTheme`                  | `BandingTheme`                  | An enumeration of the possible banding themes.               |
| `BooleanCriteria`               | `BooleanCriteria`               | An enumeration of conditional formatting boolean criteria.   |
| `BorderStyle`                   | `BorderStyle`                   | An enumeration of the valid styles for setting borders on a `Range`. |
| `ColorType`                     | `ColorType`                     | An enumeration of possible color types.                      |
| `CopyPasteType`                 | `CopyPasteType`                 | An enumeration of the possible paste types.                  |
| `DataExecutionErrorCode`        | `DataExecutionErrorCode`        | An enumeration of the possible data execution error codes.   |
| `DataExecutionState`            | `DataExecutionState`            | An enumeration of the possible data execution states.        |
| `DataSourceParameterType`       | `DataSourceParameterType`       | An enumeration of the possible data source parameter types.  |
| `DataSourceRefreshScope`        | `DataSourceRefreshScope`        | An enumeration of possible data source refresh scopes.       |
| `DataSourceType`                | `DataSourceType`                | An enumeration of the possible data source types.            |
| `DataValidationCriteria`        | `DataValidationCriteria`        | An enumeration representing the data validation criteria that can be set on a range. |
| `DateTimeGroupingRuleType`      | `DateTimeGroupingRuleType`      | An enumeration of date time grouping rule.                   |
| `DeveloperMetadataLocationType` | `DeveloperMetadataLocationType` | An enumeration of possible developer metadata location types. |
| `DeveloperMetadataVisibility`   | `DeveloperMetadataVisibility`   | An enumeration of the possible developer metadata visibilities. |
| `Dimension`                     | `Dimension`                     | An enumeration of the possible dimensions of a spreadsheet.  |
| `Direction`                     | `Direction`                     | A enumeration of the possible directions that one can move within a spreadsheet using the arrow keys. |
| `FrequencyType`                 | `FrequencyType`                 | An enumeration of possible frequency types.                  |
| `GroupControlTogglePosition`    | `GroupControlTogglePosition`    | An enumeration of the positions that the group control toggle can be in. |
| `InterpolationType`             | `InterpolationType`             | An enumeration of conditional format gradient interpolation types. |
| `PivotTableSummarizeFunction`   | `PivotTableSummarizeFunction`   | An enumeration of the functions that may be used to summarize values in a pivot table. |
| `PivotValueDisplayType`         | `PivotValueDisplayType`         | An enumeration of the ways that a pivot value may be displayed. |
| `ProtectionType`                | `ProtectionType`                | An enumeration representing the parts of a spreadsheet that can be protected from edits. |
| `RecalculationInterval`         | `RecalculationInterval`         | An enumeration of the possible intervals that can be used in spreadsheet recalculation. |
| `RelativeDate`                  | `RelativeDate`                  | An enumeration of relative date options for calculating a value to be used in date-based `BooleanCriteria`. |
| `SheetType`                     | `SheetType`                     | An enumeration of the different types of sheets that can exist in a spreadsheet. |
| `SortOrder`                     | `SortOrder`                     | An enumeration of sort order.                                |
| `TextDirection`                 | `TextDirection`                 | An enumeration of valid text directions.                     |
| `TextToColumnsDelimiter`        | `TextToColumnsDelimiter`        | An enumeration of the preset delimiters for split text to columns. |
| `ThemeColorType`                | `ThemeColorType`                | An enumeration of possible theme color types.                |
| `ValueType`                     | `ValueType`                     | An enumeration of value types returned by `Range.getValue()` and `Range.getValues()` from the Range class of the Spreadsheet service. The enumeration values listed below are in addition to `Number`, `Boolean`, `Date`, or `String`. |
| `WrapStrategy`                  | `WrapStrategy`                  | An enumeration of the strategies used for wrapping cells.    |

## Усі методи

| Method                            | Return type                    | Brief description                                     |
| --------------------------------- | ------------------------------ | ----------------------------------------------------- |
| `enableAllDataSourcesExecution()` | `void`                         | Дозволяє виконання даних для всіх типів джерел даних. |
| `enableBigQueryExecution()`       | `void`                         | Вмикає виконання даних для джерела даних BigQuery.    |
|                                   |                                |                                                       |
| `newCellImage()`                  | `CellImageBuilder`             | Creates a builder for a `CellImage`.                  |
| `newColor()`                      | `ColorBuilder`                 | Creates a builder for a `Color`.                      |
| `newConditionalFormatRule()`      | `ConditionalFormatRuleBuilder` | Creates a builder for a conditional formatting rule.  |
| `newDataSourceSpec()`             | `DataSourceSpecBuilder`        | Creates a builder for a `DataSourceSpec`.             |
| `newDataValidation()`             | `DataValidationBuilder`        | Creates a builder for a data validation rule.         |
| `newFilterCriteria()`             | `FilterCriteriaBuilder`        | Creates a builder for a `FilterCriteria`.             |
| `newRichTextValue()`              | `RichTextValueBuilder`         | Creates a builder for a Rich Text value.              |
| `newTextStyle()`                  | `TextStyleBuilder`             | Creates a builder for a text style.                   |

## Spreadsheet Service

https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet

Цей сервіс дозволяє сценаріям створювати, отримувати доступ і змінювати файли Google Sheets. Іноді операції з електронними таблицями об’єднуються разом, щоб покращити продуктивність, наприклад, під час кількох викликів методу. Якщо ви хочете переконатися, що всі незавершені зміни внесено негайно, наприклад, щоб показати користувачам інформацію під час виконання сценарію, викличте [`SpreadsheetApp.flush()`](https://developers.google.com/apps- script/reference/spreadsheet/spreadsheet-app#flush).  

Отримуйте доступ до файлів Google Таблиць і створюйте їх. Цей клас є батьківським для [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet). [Деталі](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)

### Загальні

`AutoFillSeries`  An enumeration of the types of series used to calculate auto-filled values.

`BooleanCondition`  Access boolean conditions in `ConditionalFormatRules`.

`Color`  A representation for a color.

`ColorBuilder`  The builder for `ColorBuilder`.

`BorderStyle`  Styles that can be set on a range using `Range.setBorder(top, left, bottom, right, vertical, horizontal, color, style)`.

`BooleanCriteria`  An enumeration representing the boolean criteria that can be used in conditional format or filter.

`ContainerInfo`  Access the chart's position within a sheet.

### Banding

`Banding`  Access and modify bandings, the color patterns applied to rows or columns of a range.

`BandingTheme`  An enumeration of banding themes.

### BigQuery

`BigQueryDataSourceSpec`  Access the existing BigQuery data source specification.

`BigQueryDataSourceSpecBuilder`  The builder for `BigQueryDataSourceSpecBuilder`.

### Range

`CellImage`  Represents an image to add to a cell.

`CellImageBuilder`  Builder for `CellImage`.

### Format

`ConditionalFormatRule`  Access conditional formatting rules.

`ConditionalFormatRuleBuilder`  Builder for conditional format rules.

### Data

`DataExecutionErrorCode`  An enumeration of data execution error codes.

`DataExecutionState`  An enumeration of data execution states.

`DataExecutionStatus`  The data execution status.

`DataSource`  Access and modify existing data source.

`DataSourceColumn`  Access and modify a data source column.

`DataSourceFormula`  Access and modify existing data source formulas.

`DataSourceParameter`  Access existing data source parameters.

`DataSourceParameterType`  An enumeration of data source parameter types.

`DataSourcePivotTable`  Access and modify existing data source pivot table.

`DataSourceRefreshSchedule`  Access and modify an existing refresh schedule.

`DataSourceRefreshScheduleFrequency`  Access a refresh schedule's frequency, which specifies how often and when to refresh.

`DataSourceRefreshScope`  An enumeration of scopes for refreshes.

`DataSourceSheet`  Access and modify existing data source sheet.

`DataSourceSheetFilter`  Access and modify an existing data source sheet filter.

`DataSourceSpec`  Access the general settings of an existing data source spec.

`DataSourceSpecBuilder`  The builder for `DataSourceSpec`.

`DataSourceTable`  Access and modify existing data source table.

`DataSourceTableColumn`  Access and modify an existing column in a `DataSourceTable`.

`DataSourceTableFilter`  Access and modify an existing data source table filter.

`DataSourceType`  An enumeration of data source types.

`DataValidation`  Access data validation rules.

`DataValidationBuilder`  Builder for data validation rules.

`DataValidationCriteria`  An enumeration representing the data validation criteria that can be set on a range.

### Metadata

`DeveloperMetadata`  Access and modify developer metadata.

`DeveloperMetadataFinder`  Search for developer metadata in a spreadsheet.

`DeveloperMetadataLocation`  Access developer metadata location information.

`DeveloperMetadataLocationType`  An enumeration of the types of developer metadata location types.

`DeveloperMetadataVisibility`  An enumeration of the types of developer metadata visibility.

### Embeded

`DataSourceChart`  Access and modify an existing data source chart.

`EmbeddedAreaChartBuilder`  Builder for area charts.

`EmbeddedBarChartBuilder`  Builder for bar charts.

`EmbeddedChart`  Represents a chart that has been embedded into a spreadsheet.

`EmbeddedChartBuilder`  Builder used to edit an `EmbeddedChart`.

| `EmbeddedColumnChartBuilder`    | Builder for column charts.    |
| ------------------------------- | ----------------------------- |
| `EmbeddedComboChartBuilder`     | Builder for combo charts.     |
| `EmbeddedHistogramChartBuilder` | Builder for histogram charts. |
| `EmbeddedLineChartBuilder`      | Builder for line charts.      |
| `EmbeddedPieChartBuilder`       | Builder for pie charts.       |
| `EmbeddedScatterChartBuilder`   | Builder for scatter charts.   |
| `EmbeddedTableChartBuilder`     | Builder for table charts.     |

### Pivot

| `PivotFilter`                 | Access and modify pivot table filters.                       |
| ----------------------------- | ------------------------------------------------------------ |
| `PivotGroup`                  | Access and modify pivot table breakout groups.               |
| `PivotGroupLimit`             | Access and modify pivot table group limit.                   |
| `PivotTable`                  | Access and modify pivot tables.                              |
| `PivotTableSummarizeFunction` | An enumeration of functions that summarize pivot table data. |
| `PivotValue`                  | Access and modify value groups in pivot tables.              |
| `PivotValueDisplayType`       | An enumeration of ways to display a pivot value as a function of another value. |



| Name                         | Brief description                                            |
| ---------------------------- | ------------------------------------------------------------ |
| `CopyPasteType`              | An enumeration of possible special paste types.              |
|                              |                                                              |
| `DateTimeGroupingRule`       | Access an existing date-time grouping rule.                  |
| `DateTimeGroupingRuleType`   | The types of date-time grouping rule.                        |
|                              |                                                              |
| `Dimension`                  | An enumeration of possible directions along which data can be stored in a spreadsheet. |
| `Direction`                  | An enumeration representing the possible directions that one can move within a spreadsheet using the arrow keys. |
| `Drawing`                    | Represents a drawing over a sheet in a spreadsheet.          |
| `Filter`                     | Use this class to modify existing filters on `Grid` sheets, the default type of sheet. |
| `FilterCriteria`             | Use this class to get information about or copy the criteria on existing filters. |
| `FilterCriteriaBuilder`      | To add criteria to a filter, you must do the following: Create the criteria builder using `SpreadsheetApp.newFilterCriteria()`. Add settings to the builder using the methods from this class. Use `build()` to assemble the criteria with your specified settings. |
| `FrequencyType`              | An enumeration of frequency types.                           |
| `GradientCondition`          | Access gradient (color) conditions in `ConditionalFormatRuleApis`. |
| `Group`                      | Access and modify spreadsheet groups.                        |
| `GroupControlTogglePosition` | An enumeration representing the possible positions that a group control toggle can have. |
| `InterpolationType`          | An enumeration representing the interpolation options for calculating a value to be used in a `GradientCondition` in a `ConditionalFormatRule`. |
| `NamedRange`                 | Create, access and modify named ranges in a spreadsheet.     |
| `OverGridImage`              | Represents an image over the grid in a spreadsheet.          |
| `PageProtection`             | Access and modify protected sheets in the older version of Google Sheets. |
| `Protection`                 | Access and modify protected ranges and sheets.               |
| `ProtectionType`             | An enumeration representing the parts of a spreadsheet that can be protected from edits. |
| `Range`                      | Access and modify spreadsheet ranges.                        |
| `RangeList`                  | A collection of one or more `Range` instances in the same sheet. |
| `RecalculationInterval`      | An enumeration representing the possible intervals used in spreadsheet recalculation. |
| `RelativeDate`               | An enumeration representing the relative date options for calculating a value to be used in date-based `BooleanCriteria`. |
| `RichTextValue`              | A stylized text string used to represent cell text.          |
| `RichTextValueBuilder`       | A builder for Rich Text values.                              |
| `Selection`                  | Access the current active selection in the active sheet.     |
| `Sheet`                      | Access and modify spreadsheet sheets.                        |
| `SheetType`                  | The different types of sheets that can exist in a spreadsheet. |
| `Slicer`                     | Represents a [slicer](https://support.google.com/docs/answer/9245556), which is used to filter ranges, charts and pivot tables in a non-collaborative manner. |
| `SortOrder`                  | An enumeration representing the sort order.                  |
| `SortSpec`                   | The sorting specification.                                   |
| `Spreadsheet`                | Access and modify Google Sheets files.                       |
| `SpreadsheetApp`             | Access and create Google Sheets files.                       |
| `SpreadsheetTheme`           | Access and modify existing themes.                           |
| `TextDirection`              | An enumerations of text directions.                          |
| `TextFinder`                 | Find or replace text within a range, sheet or spreadsheet.   |
| `TextRotation`               | Access the text rotation settings for a cell.                |
| `TextStyle`                  | The rendered style of text in a cell.                        |
| `TextStyleBuilder`           | A builder for text styles.                                   |
| `TextToColumnsDelimiter`     | An enumeration of the types of preset delimiters that can split a column of text into multiple columns. |
| `ThemeColor`                 | A representation for a theme color.                          |
| `ThemeColorType`             | An enum which describes various color entries supported in themes. |
| `ValueType`                  | An enumeration of value types returned by `Range.getValue()` and `Range.getValues()` from the Range class of the Spreadsheet service. |
| `WrapStrategy`               | An enumeration of the strategies used to handle cell text wrapping. |

