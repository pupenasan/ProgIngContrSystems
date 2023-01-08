# Класи

https://developers.google.com/apps-script/reference/spreadsheet

### Banding      

[Banding.md](Banding.md)

Для перемінних кольорів (через один рядок різний колір).

## BigQuery

### BigQueryDataSourceSpec

Access the existing BigQuery data source specification. To create a new data source specification, use `SpreadsheetApp.newDataSourceSpec()`.

### BigQueryDataSourceSpecBuilder

The builder for `BigQueryDataSourceSpecBuilder`.

## ConditionalFormatRules

[ConditionalFormatRules.md](ConditionalFormatRules.md)

### ConditionalFormatRule

Access conditional formatting rules. To create a new rule, use `SpreadsheetApp.newConditionalFormatRule()` and `ConditionalFormatRuleBuilder`. You can use `Sheet.setConditionalFormatRules(rules)` to set the rules for a given sheet.

### ConditionalFormatRuleBuilder

Builder for conditional format rules.

```
// Adds a conditional format rule to a sheet that causes cells in range A1:B3 to turn red if
// they contain a number between 1 and 10.
var sheet = SpreadsheetApp.getActiveSheet();
var range = sheet.getRange("A1:B3");
var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberBetween(1, 10)
    .setBackground("#FF0000")
    .setRanges([range])
    .build();
var rules = sheet.getConditionalFormatRules();
rules.push(rule);
sheet.setConditionalFormatRules(rules);
```

### BooleanCondition

Access boolean conditions in `ConditionalFormatRules`. Each conditional format rule may contain a single boolean condition. The boolean condition itself contains a boolean criteria (with values) and formatting settings. The criteria is evaluated against the content of a cell resulting in either a `true` or `false` value. If the criteria evaluates to `true`, the condition's formatting settings are applied to the cell.

Доступ до логічних умов у `ConditionalFormatRules`. Кожне правило умовного форматування може містити одну логічну умову. Сама логічна умова містить логічні критерії (зі значеннями) і параметри форматування. Критерії оцінюються щодо вмісту комірки, що призводить до значення «true» або «false». Якщо критерій має значення "true", параметри форматування умови застосовуються до клітинки.

### GradientCondition

Access gradient (color) conditions in `ConditionalFormatRuleApis`. Each conditional format rule may contain a single gradient condition. A gradient condition is defined by three points along a number scale (min, mid, and max), each of which has a color, a value, and a `InterpolationType`. The content of a cell is compared to the values in the number scale and the color applied to the cell is interpolated based on the cell content's proximity to the gradient condition min, mid, and max points.

```
// Logs all the information inside gradient conditional format rules on a sheet.
// The below snippet assumes all colors have ColorType.RGB.
var sheet = SpreadsheetApp.getActiveSheet();
var rules = sheet.getConditionalFormatRules();
for (int i = 0; i < rules.length; i++) {
  var gradient = rules[i].getGradientCondition();
  Logger.log("The conditional format gradient information for rule %d:\n
    MinColor %s, MinType %s, MinValue %s, \n
    MidColor %s, MidType %s, MidValue %s, \n
    MaxColor %s, MaxType %s, MaxValue %s \n", i,
    gradient.getMinColorObject().asRgbColor().asHexString(),
    gradient.getMinType(), gradient.getMinValue(),
    gradient.getMidColorObject().asRgbColor().asHexString(),
    gradient.getMidType(), gradient.getMidValue(),
    gradient.getMaxColorObject().asRgbColor().asHexString(),
    gradient.getMaxType(), gradient.getMaxValue());
}
```



## Image

### CellImage

Represents an image to add to a cell. To add an image to a cell, you must create a new image value for the image using `SpreadsheetApp.newCellImage()` and `CellImageBuilder`. Then you can use `Range.setValue(value)` or `Range.setValues(values)` to add the image value to the cell.

### CellImageBuilder

Builder for `CellImage`. This builder creates the image value needed to add an image to a cell.

### OverGridImage

Represents an image over the grid in a spreadsheet.

## Color

### Color

https://developers.google.com/apps-script/reference/spreadsheet/color

A representation for a color.

### ColorBuilder

The builder for `ColorBuilder`. To create a new builder, use `SpreadsheetApp.newColor()`.

## Container

### ContainerInfo

Access the chart's position within a sheet. Can be updated using the `EmbeddedChart.modify()` function.

```
chart = chart.modify().setPosition(5, 5, 0, 0).build();
sheet.updateChart(chart);
```

### EmbeddedAreaChartBuilder

Builder for area charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/areachart.html).

### EmbeddedBarChartBuilder

Builder for bar charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/barchart.html).

### EmbeddedChart

Represents a chart that has been embedded into a spreadsheet.

This example shows how to modify an existing chart:

### EmbeddedChartBuilder

Builder used to edit an `EmbeddedChart`. Changes made to the chart are not saved until `Sheet.updateChart(chart)` is called on the rebuilt chart.

### EmbeddedColumnChartBuilder

Builder for column charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/columnchart.html).

### EmbeddedComboChartBuilder

Builder for combo charts. For more details, see the [Google Visualization documentation](https://developers.google.com/chart/interactive/docs/gallery/combochart).

### EmbeddedHistogramChartBuilder

Builder for histogram charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/histogram.html).

### EmbeddedLineChartBuilder

Builder for line charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/linechart.html).

### EmbeddedPieChartBuilder

Builder for pie charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/piechart.html).

### EmbeddedScatterChartBuilder

Builder for scatter charts. For more details, see the Gviz [ documentation](http://code.google.com/apis/visualization/documentation/gallery/scatterchart.html).

### EmbeddedTableChartBuilder

Builder for table charts. For more details, see the Gviz [documentation](http://developers.google.com/chart/interactive/docs/gallery/table.html).



## Data

### DataExecutionStatus

The data execution status.

### DataSource

Access and modify existing data source. To create a data source table with new data source, see `DataSourceTable`.

**Only use this class with data that's connected to a database.**

### DataValidation

Access data validation rules. To create a new rule, use `SpreadsheetApp.newDataValidation()` and `DataValidationBuilder`. You can use `Range.setDataValidation(rule)` to set the validation rule for a range.

### DataValidationBuilder

Builder for data validation rules.

```
// Set the data validation for cell A1 to require a value from B1:B10.
var cell = SpreadsheetApp.getActive().getRange('A1');
var range = SpreadsheetApp.getActive().getRange('B1:B10');
var rule = SpreadsheetApp.newDataValidation().requireValueInRange(range).build();
cell.setDataValidation(rule);
```

## Pivot

[pivot.md](pivot.md)

Робота зі зведеними таблицями

DateTimeGroupingRule - Доступ до існуючого правила групування дати й часу.

PivotFilter -  Доступ і зміна фільтрів зведеної таблиці.

PivotGroup - Отримання доступу до груп розбивки зведеної таблиці та зміни її.

PivotGroupLimit - Access and modify pivot table group limit.

PivotTable - Доступ і зміна зведених таблиць.

PivotValue - Доступ і зміна груп значень у зведених таблицях.

## Metadata

### DeveloperMetadata

Access and modify developer metadata. To create new developer metadata use `Range.addDeveloperMetadata(key)`, `Sheet.addDeveloperMetadata(key)`, or `Spreadsheet.addDeveloperMetadata(key)`.

### DeveloperMetadataFinder

Search for developer metadata in a spreadsheet. To create new developer metadata finder use `Range.createDeveloperMetadataFinder()`, `Sheet.createDeveloperMetadataFinder()`, or `Spreadsheet.createDeveloperMetadataFinder()`.

### DeveloperMetadataLocation

Access developer metadata location information.



## Drawing

### Drawing

Represents a drawing over a sheet in a spreadsheet.



## Filter

### Filter

Use this class to modify existing filters on `Grid` sheets, the default type of sheet. Grid sheets are regular sheets with data that aren't connected to a database.

If a filter doesn’t exist on the sheet yet, create one using `Range.createFilter()`.

To use this class, you must first access the grid sheet filter using `Range.getFilter()` or `Sheet.getFilter()`.

### FilterCriteria

Use this class to get information about or copy the criteria on existing filters.

### FilterCriteriaBuilder

To add criteria to a filter, you must do the following:

1. Create the criteria builder using `SpreadsheetApp.newFilterCriteria()`.
2. Add settings to the builder using the methods from this class.
3. Use `build()` to assemble the criteria with your specified settings.



## Group

### Group

Access and modify spreadsheet groups. Groups are an association between an interval of contiguous rows or columns that can be expanded or collapsed as a unit to hide/show the rows or columns. Each group has a *control toggle* on the row or column directly before or after the group (depending on settings) that can expand or collapse the group as a whole.

The *depth* of a group refers to the nested position of the group and how many larger groups contain the group. The *collapsed state* of a group refers to whether the group should remain collapsed or expanded after a parent group has been expanded. Additionally, at the time that a group is collapsed or expanded, the rows or columns within the group are hidden or set visible, though individual rows or columns can be hidden or set visible irrespective of the collapsed state.

## Range

[Range.md](Range.md)

NamedRange - Створення, доступ і зміна іменованих діапазонів в електронній таблиці. Іменовані діапазони – це діапазони, які мають пов’язані псевдоніми рядків. Їх можна переглядати та редагувати в інтерфейсі користувача Таблиць у меню **Дані > Іменовані діапазони...**.

Protection - Доступ і зміна захищених діапазонів і аркушів. Захищений діапазон може захищати або статичний діапазон клітинок, або іменований діапазон. Захищений аркуш може містити незахищені області. Для електронних таблиць, створених за допомогою старішої версії Google Таблиць, замість цього використовуйте клас `PageProtection`.

Range - Доступ і зміна діапазонів електронних таблиць. Діапазоном може бути одна клітинка на аркуші або група суміжних клітинок на аркуші.

RangeList - Колекція одного чи кількох екземплярів `Діапазону` на одному аркуші. Ви можете використовувати цей клас для застосування операцій до колекцій несуміжних діапазонів або клітинок.

## Selection

### Selection

Access the current active selection in the active sheet. A selection is the set of cells the user has highlighted in the sheet, which can be non-adjacent ranges. One cell in the selection is the *current cell*, where the user's current focus is. The current cell is highlighted with a darker border in the Google Sheets UI.

```
var activeSheet = SpreadsheetApp.getActiveSheet();
var rangeList = activeSheet.getRangeList(['A1:B4', 'D1:E4']);
rangeList.activate();

var selection = activeSheet.getSelection();
// Current Cell: D1
Logger.log('Current Cell: ' + selection.getCurrentCell().getA1Notation());
// Active Range: D1:E4
Logger.log('Active Range: ' + selection.getActiveRange().getA1Notation());
// Active Ranges: A1:B4, D1:E4
var ranges =  selection.getActiveRangeList().getRanges();
for (var i = 0; i < ranges.length; i++) {
  Logger.log('Active Ranges: ' + ranges[i].getA1Notation());
}
Logger.log('Active Sheet: ' + selection.getActiveSheet().getName())
```

## Sheet

### Sheet

Access and modify spreadsheet sheets. Common operations are renaming a sheet and accessing range objects from the sheet.

## Slicer

### Slicer

Represents a [slicer](https://support.google.com/docs/answer/9245556), which is used to filter ranges, charts and pivot tables in a non-collaborative manner. This class contains methods to access and modify existing slicers. To create a new slicer, use `Sheet.insertSlicer(range, anchorRowPos, anchorColPos)`.



## Other

### SortSpec

The sorting specification.

### TextFinder

Find or replace text within a range, sheet or spreadsheet. Can also specify search options.

## Spreadsheet

### Spreadsheet

Access and modify Google Sheets files. Common operations are adding new sheets and adding collaborators.

### SpreadsheetTheme

Access and modify existing themes. To set a theme on a spreadsheet, use `Spreadsheet.setSpreadsheetTheme(theme)`.

## Format

### RichTextValue

A stylized text string used to represent cell text. Substrings of the text can have different text styles.

A *run* is the longest unbroken substring having the same text style. For example, the sentence "This **kid** *has two* apples." has four runs: ["This ", "kid ", "has two ", "apples."].

### RichTextValueBuilder

A builder for Rich Text values.

### TextRotation

Access the text rotation settings for a cell.

### TextStyle

The rendered style of text in a cell.

Text styles can have a corresponding `RichTextValue`. If the `RichTextValue` spans multiple text runs that have different values for a given text style read method, the method returns `null`. To avoid this, query for text styles using the Rich Text values returned by the `RichTextValue.getRuns()` method.

###  TextStyleBuilder

A builder for text styles.

### ThemeColor

A representation for a theme color.