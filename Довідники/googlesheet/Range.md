# Класи Range

Доступ і зміна діапазонів електронних таблиць. Діапазоном може бути одна клітинка на аркуші або група суміжних клітинок на аркуші.

## NamedRange

Створення, доступ і зміна іменованих діапазонів в електронній таблиці. Іменовані діапазони – це діапазони, які мають пов’язані псевдоніми рядків. Їх можна переглядати та редагувати в інтерфейсі користувача Таблиць у меню **Дані > Іменовані діапазони...**.

## Protection

Доступ і зміна захищених діапазонів і аркушів. Захищений діапазон може захищати або статичний діапазон клітинок, або іменований діапазон. Захищений аркуш може містити незахищені області. Для електронних таблиць, створених за допомогою старішої версії Google Таблиць, замість цього використовуйте клас `PageProtection`.



## RangeList

Колекція одного чи кількох екземплярів `Діапазону` на одному аркуші. Ви можете використовувати цей клас для застосування операцій до колекцій несуміжних діапазонів або клітинок.

## Range

Доступ і зміна діапазонів електронних таблиць. Діапазоном може бути одна клітинка на аркуші або група суміжних клітинок на аркуші.

https://developers.google.com/apps-script/reference/spreadsheet/range

### Доступ до діапазону

`getCell(row, column)` (повертає Range) - Повертає задану клітинку в діапазоні.

`getDataRegion()` (повертає Range) - Повертає копію діапазону, розширеного в чотирьох основних напрямках, щоб охопити всі суміжні клітинки з даними в них.

`getDataRegion(dimension)` (повертає Range) - Повертає копію розгорнутого діапазону `Direction.UP` і `Direction.DOWN`, якщо вказаний розмір — `Dimension.ROWS`, або `Direction.NEXT` і `Direction.PREVIOUS`, якщо розміром є `Dimension.COLUMNS`.

`getNextDataCell(direction)` (повертає Range) -  Починаючи з клітинки в першому стовпці та рядку діапазону, повертає наступну клітинку в заданому напрямку, яка є краєм безперервного діапазону клітинок із даними в них або клітинку на краю електронної таблиці в цьому напрямку.

`offset(rowOffset, columnOffset)` (повертає Range) - Returns a new range that is offset from this range by the given number of rows and columns (which can be negative).

`offset(rowOffset, columnOffset, numRows)` (повертає Range) - Returns a new range that is relative to the current range, whose upper left point is offset from the current range by the given rows and columns, and with the given height in cells.

`offset(rowOffset, columnOffset, numRows, numColumns)` (повертає Range) - Returns a new range that is relative to the current range, whose upper left point is offset from the current range by the given rows and columns, and with the given height and width in cells.

`randomize()` (повертає Range) - Randomizes the order of the rows in the given range.

### Читання/запис значень комірок

`getValue()` - Повертає значення `Object` верхньої лівої клітинки в діапазоні. Значення може бути типу  `Number`, `Boolean`, `Date`, або `String` залежно від значення клітинки. Порожні клітинки повертають порожній рядок.

`getValues()` - Повертає двовимірний масив значень `Object[][]`, проіндексованих рядком, а потім стовпцем. Значення можуть бути типу `Number`, `Boolean`, `Date`, або`String` залежно від значення комірки. Порожні клітинки представлені порожнім рядком у масиві. Пам’ятайте, що хоча індекс діапазону починається з `1, 1`, масив JavaScript індексується з `[0][0]`.

```js
// The code below gets the values for the range C2:G8
// in the active spreadsheet.  Note that this is a JavaScript array.
var values = SpreadsheetApp.getActiveSheet().getRange(2, 3, 6, 4).getValues();
Logger.log(values[0][0]);
```

У веб-програмах значення `Date`  не є допустимим параметром. `getValues()` не повертає дані веб-програмі, якщо діапазон містить клітинку зі значенням `Date`. Натомість перетворіть усі значення, отримані з аркуша, у підтримуваний примітив JavaScript, як-от `Number`, `Boolean` або `String`.

`setValue(value)` - Встановлює значення діапазону і пвоертає `Range`. Значення може бути ч `Number`, `Boolean`, `Date`, або `String` . Якщо воно починається з `'='` , то інтерпретується як формула.

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

var cell = sheet.getRange("B2");
cell.setValue(100);
```

`setValues(values)` - Встановлює прямокутну сітку значень `Object[][]` (має відповідати розмірам цього діапазону).

```js
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

// The size of the two-dimensional array must match the size of the range.
var values = [
  [ "2.000", "1,000,000", "$2.99" ]
];

var range = sheet.getRange("B2:D2");
range.setValues(values);
```

`getDisplayValue()` (повертає String) - Повертає відображене значення верхньої лівої клітинки в діапазоні.

`getDisplayValues()` (повертає `String[][]`) - Повертає прямокутну таблицю значень для цього діапазону.

`check()` (повертає Range) - Змінює стан прапорців у діапазоні на `вибрано`.

`isChecked()` (повертає Boolean) - Returns whether all cells in the range have their checkbox state as 'checked'.

`isBlank()` (повертає Boolean) - Returns true if the range is totally blank.

`setRichTextValue(value)` (повертає Range) - Sets the Rich Text value for the cells in the range.

`setRichTextValues(values)` (повертає Range) - Sets a rectangular grid of Rich Text values.

`uncheck()` (повертає Range) - Changes the state of the checkboxes in the range to “unchecked”.

`trimWhitespace()`(повертає Range) - Trims the whitespace (such as spaces, tabs, or new lines) in every cell in this range.



### Виділення, копіювання, вставка комірок

`activate()` (повертає Range) - Встановлює вказаний діапазон як активний діапазон із верхньою лівою клітинкою діапазону як поточною клітинкою.

`activateAsCurrentCell()` (повертає Range) - Встановлює вказану клітинку як поточну.

`copyFormatToRange(gridId, column, columnEnd, row, rowEnd)` Копіює форматування діапазону в указане місце.

`copyFormatToRange(sheet, column, columnEnd, row, rowEnd)`	Копіює форматування діапазону в указане місце.

`copyTo(destination, copyPasteType, transposed)` - Копіює дані з діапазону комірок в інший діапазон комірок. `copyPasteType` та `transposed` не є обов'язковими 

`copyTo(destination, options)` - Копіює дані з діапазону комірок в інший діапазон комірок.

`copyValuesToRange(gridId, column, columnEnd, row, rowEnd)` - Скопіюйте вміст діапазону в указане розташування.

`copyValuesToRange(sheet, column, columnEnd, row, rowEnd)` - Скопіюйте вміст діапазону в указане розташування.

`insertCells(shiftDimension)` (повертає Range) - Inserts empty cells into this range.

`insertCheckboxes()` (повертає Range) - Inserts checkboxes into each cell in the range, configured with true for checked and false for unchecked.

`insertCheckboxes(checkedValue)` (повертає Range) - Inserts checkboxes into each cell in the range, configured with a custom value for checked and the empty string for unchecked.

`insertCheckboxes(checkedValue, uncheckedValue)` (повертає Range) - Inserts checkboxes into each cell in the range, configured with custom values for the checked and unchecked states.

`moveTo(target)` - Cut and paste (both format and values) from this range to the target range.

### Налаштування та отримання інформації про комірки

`addDeveloperMetadata(key, visibility)` (повертає Range) - Додає метадані розробника з указаним ключем і видимістю (необов'язкове) в діапазон.

`addDeveloperMetadata(key, value, visibility)` (повертає Range) - Додає до діапазону метадані розробника з указаним ключем, значенням і видимістю  (необов'язкове) . 

`getA1Notation()` (повертає String) - Повертає рядковий опис діапазону в нотації A1.

`getColumn()` (повертає Integer) - Повертає початкову позицію стовпця для цього діапазону.

`getDataSourceFormula()` (повертає DataSourceFormula) - Повертає DataSourceFormula для першої клітинки в діапазоні або null, якщо клітинка не містить формули джерела даних.

`getDataSourceFormulas()`	DataSourceFormula[]	Returns the DataSourceFormulas for the cells in the range.

`getDataSourcePivotTables()`	DataSourcePivotTable[]	Gets all the data source pivot tables intersecting with the range.

`getDataSourceTables()`	DataSourceTable[]	Gets all the data source tables intersecting with the range.

`getDataSourceUrl()` (повертає	String) - Returns a URL for the data in this range, which can be used to create charts and queries.

`getDataTable()`	DataTable	Return the data inside this object as a DataTable.

`getDataTable(firstRowIsHeader)`	DataTable	Return the data inside this range as a DataTable.

`getDataValidation()`	DataValidation	Returns the data validation rule for the top-left cell in the range.

`getDataValidations()`	DataValidation[][]	Returns the data validation rules for all cells in the range.

`getDeveloperMetadata()`	DeveloperMetadata[]	Get the developer metadata associated with this range.

`getFilter()`	Filter	Returns the filter on the sheet this range belongs to, or null if there is no filter on the sheet.

`getFormula()` (повертає	String) - Returns the formula (A1 notation) for the top-left cell of the range, or an empty string if the cell is empty or doesn't contain a formula.

`getFormulaR1C1()` (повертає	String) - Returns the formula (R1C1 notation) for a given cell, or null if none.

`getFormulas()` (повертає	`String[][]`) - Returns the formulas (A1 notation) for the cells in the range.

`getFormulasR1C1()` (повертає	`String[][]`) - Returns the formulas (R1C1 notation) for the cells in the range.

`getGridId()` (повертає Integer) - Returns the grid ID of the range's parent sheet.

`getHeight()` (повертає Integer) - Returns the height of the range.

`getLastColumn()` (повертає Integer) - Returns the end column position.

`getLastRow()` (повертає Integer) - Returns the end row position.

`getNote()` (повертає	String) - Returns the note associated with the given range.

`getNotes()` (повертає	`String[][]`) - Returns the notes associated with the cells in the range.

`getNumColumns()` (повертає Integer) - Returns the number of columns in this range.

`getNumRows()` (повертає Integer) - Returns the number of rows in this range.

`getNumberFormat()` (повертає	String) - Get the number or date formatting of the top-left cell of the given range.

`getNumberFormats()` (повертає	`String[][]`) - Returns the number or date formats for the cells in the range.

`getRichTextValue()`	RichTextValue	Returns the Rich Text value for the top left cell of the range, or null if the cell value is not text.

`getRichTextValues()`	RichTextValue[][]	Returns the Rich Text values for the cells in the range.

`getRow()` (повертає Integer) - Returns the row position for this range.

`getRowIndex()` (повертає Integer) - Returns the row position for this range.

`getSheet()`	Sheet	Returns the sheet this range belongs to.

#### Formula

`setFormula(formula)` (повертає Range) - Updates the formula for this range.

`setFormulaR1C1(formula)` (повертає Range) - Updates the formula for this range.

`setFormulas(formulas)` (повертає Range) - Sets a rectangular grid of formulas (must match dimensions of this range).

`setFormulasR1C1(formulas)` (повертає Range) - Sets a rectangular grid of formulas (must match dimensions of this range).

#### Коментарі

`setNote(note)` (повертає Range) - Sets the note to the given value.

`setNotes(notes)` (повертає Range) - Sets a rectangular grid of notes (must match dimensions of this range).

### Banding

`applyColumnBanding()` (повертає Banding) - Застосовує тему смуги стовпців за замовчуванням до діапазону. 

`applyColumnBanding(bandingTheme)` (повертає Banding) - Applies a specified column banding theme to the range.

`applyColumnBanding(bandingTheme, showHeader, showFooter)` (повертає Banding) - Applies a specified column banding theme to the range with specified header and footer settings.

`applyRowBanding()` (повертає Banding) - Applies a default row banding theme to the range.

`applyRowBanding(bandingTheme)` (повертає Banding) - Applies a specified row banding theme to the range.

`applyRowBanding(bandingTheme, showHeader, showFooter)` (повертає Banding) - Applies a specified row banding theme to the range with specified header and footer settings.

`getBandings()` (повертає `Banding[]`)	Повертає всі смуги, застосовані до будь-яких комірок у цьому діапазоні.

### Візуальна обробка та форматування

`autoFill(destination, series)` - Fills the destinationRange with data based on the data in this range.

`autoFillToNeighbor(series)` - Calculates a range to fill with new data based on neighboring cells and automatically fills that range with new values based on the data contained in this range.

`getBackground()` (повертає String) - Повертає колір фону верхньої лівої клітинки в діапазоні (наприклад, `#ffffff`).

`getBackgroundObject()` (повертає `Color`) - Повертає колір фону верхньої лівої комірки в діапазоні.

`getBackgroundObjects()` (повертає `Color[][]`) - Повертає фонові кольори комірок у діапазоні.

`getBackgrounds()` (повертає `String[][]`) - Повертає фонові кольори комірок у діапазоні (наприклад, `#ffffff`).

`getFontColorObject()` (повертає	`Color`) - Returns the font color of the cell in the top-left corner of the range.

`getFontColorObjects()` (повертає	`Color[][]`) - Returns the font colors of the cells in the range.

`getFontFamilies()` (повертає	`String[][]`) - Returns the font families of the cells in the range.

`getFontFamily()` (повертає	String) - Returns the font family of the cell in the top-left corner of the range.

`getFontLine()` (повертає	String) - Gets the line style of the cell in the top-left corner of the range ('underline', 'line-through', or 'none').

`getFontLines()` (повертає	`String[][]`) - Gets the line style of the cells in the range ('underline', 'line-through', or 'none').

`getFontSize()` (повертає Integer) - Returns the font size in point size of the cell in the top-left corner of the range.

`getFontSizes()`	Integer[][]	Returns the font sizes of the cells in the range.

`getFontStyle()` (повертає	String) - Returns the font style ('italic' or 'normal') of the cell in the top-left corner of the range.

`getFontStyles()` (повертає	`String[][]`) - Returns the font styles of the cells in the range.

`getFontWeight()` (повертає	String) - Returns the font weight (normal/bold) of the cell in the top-left corner of the range.

`getFontWeights()` (повертає	`String[][]`) - Returns the font weights of the cells in the range.

`getHorizontalAlignment()` (повертає	String) - Returns the horizontal alignment of the text (left/center/right) of the cell in the top-left corner of the range.

`getHorizontalAlignments()` (повертає	`String[][]`) - Returns the horizontal alignments of the cells in the range.

`getTextDirection()`	TextDirection	Returns the text direction for the top left cell of the range.

`getTextDirections()`	TextDirection[][]	Returns the text directions for the cells in the range.

`getTextRotation()`	TextRotation	Returns the text rotation settings for the top left cell of the range.

`getTextRotations()`	TextRotation[][]	Returns the text rotation settings for the cells in the range.

`getTextStyle()`	TextStyle	Returns the text style for the top left cell of the range.

`getTextStyles()`	TextStyle[][]	Returns the text styles for the cells in the range.

`getVerticalAlignment()` (повертає	String) - Returns the vertical alignment (top/middle/bottom) of the cell in the top-left corner of the range.

`getVerticalAlignments()` (повертає	`String[][]`) - Returns the vertical alignments of the cells in the range.

`getWidth()` (повертає Integer) - Returns the width of the range in columns.

`isEndColumnBounded()` (повертає Boolean) - Determines whether the end of the range is bound to a particular column.

`isEndRowBounded()` (повертає Boolean) - Determines whether the end of the range is bound to a particular row.

`isStartColumnBounded()` (повертає Boolean) - Determines whether the start of the range is bound to a particular column.

`isStartRowBounded()` (повертає Boolean) - Determines whether the start of the range is bound to a particular row.

`setBackground(color`) (повертає Range) - Sets the background color of all cells in the range in CSS notation (such as '#ffffff' or 'white').

`setBackgroundObject(color)` (повертає Range) - Sets the background color of all cells in the range.

`setBackgroundObjects(color)` (повертає Range) - Sets a rectangular grid of background colors (must match dimensions of this range).

`setBackgroundRGB(red, green, blue)` (повертає Range) - Sets the background to the given color using RGB values (integers between 0 and 255 inclusive).

`setBackgrounds(color)` (повертає Range) - Sets a rectangular grid of background colors (must match dimensions of this range).

`setBorder(top, left, bottom, right, vertical, horizontal)` (повертає Range) - Sets the border property.

`setBorder(top, left, bottom, right, vertical, horizontal, color, style)` (повертає Range) - Sets the border property with color and/or style.

#### Font

- `setFontColor(color)` (повертає Range) - Sets the font color in CSS notation (such as '#ffffff' or 'white').

- `setFontColorObject(color)` (повертає Range) - Sets the font color of the given range.
- `setFontColorObjects(colors)` (повертає Range) - Sets a rectangular grid of font colors (must match dimensions of this range).
- `setFontColors(colors)` (повертає Range) - Sets a rectangular grid of font colors (must match dimensions of this range).
- `setFontFamilies(fontFamilies)` (повертає Range) - Sets a rectangular grid of font families (must match dimensions of this range).
- `setFontFamily(fontFamily)` (повертає Range) - Sets the font family, such as "Arial" or "Helvetica".
- `setFontLine(fontLine)` (повертає Range) - Sets the font line style of the given range ('underline', 'line-through', or 'none').
- `setFontLines(fontLines)` (повертає Range) - Sets a rectangular grid of line styles (must match dimensions of this range).
- `setFontSize(size)` (повертає Range) - Sets the font size, with the size being the point size to use.
- `setFontSizes(sizes)` (повертає Range) - Sets a rectangular grid of font sizes (must match dimensions of this range).
- `setFontStyle(fontStyle)` (повертає Range) - Set the font style for the given range ('italic' or 'normal').
- `setFontStyles(fontStyles)` (повертає Range) - Sets a rectangular grid of font styles (must match dimensions of this range).
- `setFontWeight(fontWeight)` (повертає Range) - Set the font weight for the given range (normal/bold).
- `setFontWeights(fontWeights)` (повертає Range) - Sets a rectangular grid of font weights (must match dimensions of this range).

- `setVerticalAlignment(alignment)` (повертає Range) - Set the vertical (top to bottom) alignment for the given range (top/middle/bottom).
- `setVerticalAlignments(alignments)` (повертає Range) - Sets a rectangular grid of vertical alignments (must match dimensions of this range).
- `setVerticalText(isVertical)` (повертає Range) - Sets whether or not to stack the text for the cells in the range.

#### Позиція тексту

`setHorizontalAlignment(alignment)` (повертає Range) - Set the horizontal (left to right) alignment for the given range (left/center/right).

`setHorizontalAlignments(alignments)` (повертає Range) - Sets a rectangular grid of horizontal alignments.

`setTextDirection(direction)` (повертає Range) - Sets the text direction for the cells in the range.

`setTextDirections(directions)` (повертає Range) - Sets a rectangular grid of text directions.

`setTextRotation(degrees)` (повертає Range) - Sets the text rotation settings for the cells in the range.

`setTextRotation(rotation)` (повертає Range) - Sets the text rotation settings for the cells in the range.

`setTextRotations(rotations)` (повертає Range) - Sets a rectangular grid of text rotations.

`setTextStyle(style)` (повертає Range) - Sets the text style for the cells in the range.

`setTextStyles(styles)` (повертає Range) - Sets a rectangular grid of text styles.

#### Формати

`setNumberFormat(numberFormat)` (повертає Range) - Sets the number or date format to the given formatting string.

`setNumberFormats(numberFormats)` (повертає Range) - Sets a rectangular grid of number or date formats (must match dimensions of this range).

`setShowHyperlink(showHyperlink)` (повертає Range) - Sets whether or not the range should show hyperlinks.

### Очищення та видалення

`clear(options)` (повертає Range) - Clears the range of contents, format, data validation rules, and/or comments, as specified with the given advanced options. Очищає діапазон вмісту, формат, правила перевірки даних та/або коментарі, як зазначено в наданих додаткових параметрах. Якщо `options`  не задано повністю очищає вміст та формат.

`clearContent()` (повертає Range) - Очищає вміст діапазону, залишаючи без змін форматування.

`clearDataValidations()` (повертає Range) - Очищає правила перевірки даних для діапазону.

`clearFormat()` (повертає Range) - Очищає форматування для цього діапазону.

`clearNote()` (повертає Range) - Очищає нотатку у вказаній комірці або комірках.

`deleteCells(shiftDimension)` - Видаляє цей діапазон клітинок.

`removeCheckboxes()` (повертає Range) - Removes all checkboxes from the range.

`removeDuplicates()` (повертає Range) - Removes rows within this range that contain values that are duplicates of values in any previous row.

`removeDuplicates(columnsToCompare)` (повертає Range) - Removes rows within this range that contain values in the specified columns that are duplicates of values any previous row.

### Групування, об'єднання та розбиття комірок 

`breakApart() (повертає Range)` - Break any multi-column cells in the range into individual cells again. Розбивання будь-які клітинки з кількома стовпцями в діапазоні на окремі клітинки.

`collapseGroups()` (повертає Range) - Згортає всі групи, які повністю містяться в діапазоні.

`expandGroups()` (повертає Range) - Розгортає згорнуті групи, чий діапазон або перемикач керування перетинає цей діапазон.

`getMergedRanges()`	Range[]	Returns an array of Range objects representing merged cells that either are fully within the current range, or contain at least one cell in the current range.

`merge()` (повертає Range) - Merges the cells in the range together into a single block.

`mergeAcross()` (повертає Range) - Merge the cells in the range across the columns of the range.

`mergeVertically()` (повертає Range) - Merges the cells in the range together.

`isPartOfMerge()` (повертає Boolean) - Returns true if the cells in the current range overlap any merged cells.

`shiftColumnGroupDepth(delta)` (повертає Range) - Changes the column grouping depth of the range by the specified amount.

`shiftRowGroupDepth(delta)` (повертає Range) - Changes the row grouping depth of the range by the specified amount.

`sort(sortSpecObj)` (повертає Range) - Sorts the cells in the given range, by column and order specified.

`splitTextToColumns()` - Splits a column of text into multiple columns based on an auto-detected delimiter.

`splitTextToColumns(delimiter)` - Splits a column of text into multiple columns using the specified string as a custom delimiter.

`splitTextToColumns(delimiter)` - Splits a column of text into multiple columns based on the specified delimiter.

### Захист та дозволи

`canEdit()` (повертає Boolean) - Determines whether the user has permission to edit every cell in the range.

`protect()`	Protection	Creates an object that can protect the range from being edited except by users who have permission.

### Wrap

`getWrap()` (повертає Boolean) - Returns whether the text in the cell wraps.

`getWrapStrategies()`	WrapStrategy[][]	Returns the text wrapping strategies for the cells in the range.

`getWrapStrategy()`	WrapStrategy	Returns the text wrapping strategy for the top left cell of the range.

`getWraps()`	Boolean[][]	Returns whether the text in the cells wrap.

`setWrap(isWrapEnabled)` (повертає Range) - Set the cell wrap of the given range.

`setWrapStrategies(strategies)` (повертає Range) - Sets a rectangular grid of wrap strategies.

`setWrapStrategy(strategy)` (повертає Range) - Sets the text wrapping strategy for the cells in the range.

`setWraps(isWrapEnabled)` (повертає Range) - Sets a rectangular grid of word wrap policies (must match dimensions of this range).

### Data

`createDataSourcePivotTable(dataSource)` (повертає	DataSourcePivotTable	) - Створює порожню зведену таблицю джерела даних із джерела даних, прив’язану до першої клітинки в цьому діапазоні.

`createDataSourceTable(dataSource)`(повертає DataSourceTable) - Створює порожню таблицю джерела даних із джерела даних, прив’язану до першої клітинки в цьому діапазоні.

`createDeveloperMetadataFinder()` (повертає DeveloperMetadataFinder) - Повертає DeveloperMetadataFinderApi для пошуку метаданих розробника в межах цього діапазону.

`createFilter()` (повертає Filter) - Створює фільтр і застосовує його до вказаного діапазону на аркуші.

`createPivotTable (sourceData)` (повертає PivotTable) - Створює порожню зведену таблицю з указаних вихідних даних, прив’язаних до першої клітинки в цьому діапазоні.

`createTextFinder(findText)` (повертає TextFinder) Створює засіб пошуку тексту для діапазону, який може знаходити та замінювати текст у цьому діапазоні.

`setDataValidation(rule)` (повертає Range) - Sets one data validation rule for all cells in the range.

`setDataValidations(rules)` (повертає Range) - Sets the data validation rules for all cells in the range.

### Інші методи

