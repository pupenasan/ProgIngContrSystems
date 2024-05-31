# Table

https://docs.appsmith.com/reference/widgets/table

На цій сторінці надається інформація про використання віджета «Таблиця» для відображення даних у табличному форматі, ініціювання дій на основі взаємодії користувача та роботи з розбитими на сторінки наборами даних будь-якого розміру.

## Content properties

These properties are customizable options present in the property pane of the widget, allowing users to modify the widget according to their  preferences.

### Data

#### Table data `array<object>`

Дозволяє підключити віджет Table до джерела даних. Щоб підключити джерело даних до віджета Таблиця, натисніть **Connect dataі** та виберіть джерело даних або запит.

Якщо у вас немає запиту, ви можете вибрати джерело даних, вибрати потрібну таблицю чи колекцію та вказати властивість для пошуку. Appsmith автоматично створить для вас запит, увімкнувши такі функції, як розбиття сторінок на стороні сервера, можливість пошуку та можливість редагувати та додавати нові рядки в таблицю.

Крім того, ви можете використовувати JavaScript, натиснувши **JS**, щоб написати прив’язки для даних таблиці. Дані мають бути вказані як масив об’єктів, де кожен об’єкт у масиві представляє рядок, а властивості об’єкта представляють стовпці в таблиці. У наведеному прикладі формату таблиця має три стовпці: `крок`, `завдання` та `статус`.

*Expected data structure:*

```js
[
  {
    "step": "#1",
    "task": "Drop a table",
    "status": "approved"
  },
  {
    "step": "#2",
    "task": "Create a query fetch_users with the Mock DB",
    "status": "pending"
  },
  {
    "step": "#3",
    "task": "Bind the query using => fetch_users.data",
    "status": "pending"
  }
]
```

Ви можете **динамічно створити** таблицю, отримавши дані із запитів або функцій JavaScript і прив’язавши відповідь до властивості **Table Data**. Наприклад, якщо у вас є запит із назвою `fetchData`, ви можете прив’язати його відповідь за допомогою:

*Example:*

```js
{{fetchData.data}}
```

If the retrieved data is not in the desired format, you can use JavaScript to **transform** it before passing it to the Table widget, like:

*Example:*

```js
{{fetchData.data.users.map((user) => {
  return {
    name: user.name,
    email: user.email
    };
  });
}}
```

#### Columns `array`

The **Columns** property is automatically populated based on the **Table Data**. To access the column settings, you can click on the gear icon ⚙️ in the properties pane. This would enable you to edit existing column  properties, add new custom columns, rearrange the columns, and hide  columns.

Learn more about [Column](https://docs.appsmith.com/reference/widgets/table/column-settings).

#### Editable `boolean`

The **Editable** property, available within the **Columns** property, is a checkbox property that allows users to modify specific  fields or cells in the table. By enabling inline editing and marking  columns as editable, users can update the data directly from the UI by  double-clicking on the desired cell.

Learn more about [Inline editing](https://docs.appsmith.com/reference/widgets/table/inline-editing).

#### Update mode `string`

Determines how edited cells are saved in the table.

*Options:*

- **Single row**: Cells can be saved using the **Save/Discard** column buttons.
- **Multi row**: Cells can be saved by using an **onSubmit** event of the column or through an external button widget.

#### Primary key column `string`

Allows you to assign a unique column that helps maintain `selectedRows` and `triggeredRows` based on its value. This property also affects the performance of caching the dataset for quicker loading and access.

### Pagination

#### Show pagination `boolean`

Визначає, чи відображатиметься функція розбиття на сторінки в заголовку таблиці, дозволяючи користувачам переходити між різними сторінками таблиці.

#### Server side pagination `boolean`

Allows you to implement pagination by limiting the number of results fetched per query request.

Appsmith can handle query responses of up to 5 MB. To display large datasets and optimise performance, use server-side pagination. It can be implemented using Offset-based-pagination or Cursor-based pagination.

See how to guide on [Server-side Pagination](https://docs.appsmith.com/build-apps/how-to-guides/Server-side-pagination-in-table).

#### Total Records `number`

It is a number value that is displayed in the table header to inform the  user about the total number of records in the table. This property is  only visible when Server Side Pagination is enabled.

For instance, you can create a Count query to retrieve the total number of records  from your datasource. You can then call this query in the **Total Records** property using the, like:

*Example:*

```js
{{Total_record_query.data[0].count}}
```

#### onPageChange

Sets the [actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) that would be triggered whenever the user navigates to a different page of the table, either by clicking on the pagination buttons.

#### onPageSizeChange

Sets the [actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to be executed when the height of the table is changed. This event is  typically triggered by developers working on the app and not by end  users. It can be useful, for example, to dynamically set a limit in your query based on the new table height.

### Search & filters

#### Allow searching `boolean`

When enabled, the search bar is displayed, allowing users to search for specific data within the table.

#### Client side search `boolean`

Determines the search behavior of the search bar in the table header. When  enabled, the search bar would only search within the data that is  currently loaded in the table. If disabled, the search bar would search  across the entire data set.

#### Default search text `string`

Allows you to set the default search query for the search bar in the table header.

#### onSearchTextChanged

Allows you to specify the action to be executed when the user enters a search text in the table's search bar. Learn more about [Server-side searching](https://docs.appsmith.com/build-apps/how-to-guides/search-and-filter-table-data#using-search-text).

#### Allow filtering `boolean`

Controls the visibility of the **Filters** button, which is located in the table header. The button allows users to apply filters to the table data when enabled.

### Row selection

#### Default selected row `number/array`

Sets which rows are selected in the table by default. When **Enable multi-row selection** is turned on, this setting expects an array of numbers corresponding to the indices of the selected rows. Otherwise, it expects a single  number.

#### Enable multi-row selection `boolean`

Enables the selection of multiple rows in a table simultaneously. When enabled, the selected rows can be accessed through the `{{Table1.selectedRows}}` reference property.

#### onRowSelected

Sets the [action](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to be executed when the user selects one or more rows in the table.

### Sorting

#### Column sorting `boolean`

Controls whether the columns in the table can be sorted by the user. When  enabled, users can click on the column headers to sort the table rows  based on the values in that column. This feature is only available in *View mode*.

#### onSort

Allows you to specify the [action](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to be executed when the user sorts the data in the table.

### Adding a row

#### Allow adding a row `boolean`

Adds a button to the table that allows users to add new rows of data. Users  can input data in editable columns, and you can use the onSave event to  update the table's data source and save the changes made by the user.

Learn more about [Inline editing](https://docs.appsmith.com/reference/widgets/table/inline-editing).

#### onSave

Triggered when the user clicks the save button for a new or existing row in the table.

#### onDiscard

Triggered when the user clicks the discard button for a new or existing row in the table.

#### Default values `string`

Allows you to specify the values that would be automatically populated in a  new row when a user starts creating it. It expects an object with the  same keys as the columns in the existing table data.

### General

#### Visible `boolean`

Controls the visibility of the widget. If you turn off this property, the widget would not be visible in View Mode. Additionally, you can use JavaScript by clicking on **JS** next to the **Visible** property to conditionally control the widget's visibility.

For example, if you want to make the widget visible only when the user  selects "Yes" from a Select widget, you can use the following JavaScript expression:

```js
{{Select1.selectedOptionValue === "Yes"}}
```

#### Animate Loading `boolean`

This property controls whether the widget is displayed with a loading  animation. When enabled, the widget shows a skeletal animation during  the loading process. Additionally, you can control it through JavaScript by clicking on the `JS` next to the property.

#### Allow download `boolean`

Controls the visibility of the **Download** button in the table header. When enabled, users can download the table data as a `.csv` file or `Excel` file by clicking on the button.

#### Allow column freeze `boolean`

When enabled, a dropdown is displayed in the header cells of the columns,  allowing users to freeze or unfreeze columns as needed.

#### CSV separator `string`

Allows you to specify the separator character to use for formatting the downloaded `.csv` file. This property is applicable only when the **Allow Download** property is enabled. By default, the separator character is set to `,` *(comma)*.

## Style properties

Властивості стилю дозволяють змінювати зовнішній вигляд віджета.

### General

#### Default Row Height `string`

Sets the height of the row in the table.

*Options*:

- Short
- Default
- Tall

### Text formatting

#### Text Size `string`

Sets the size of the text. Additionally, the text size can be programmatically modified using JavaScript functions.

#### Emphasis `string`

Enables you to select a font style for the widget, such as bold or italic.  Additionally, the font style can be programmatically modified using  JavaScript functions.

#### Text Align `string`

Sets the horizontal alignment of the text within the cells.

*Options*:

- Left
- Center
- Right

#### Vertical alignment `string`

Sets the vertical alignment of the cell contents within the cells.

*Options*:

- Top
- Center
- Bottom

### Color

#### Cell Background Color `string`

Sets the background color of the table cells. Additionally, the cell color  can be programmatically modified using JavaScript functions.

For example, lets say you have a column named `status` that reflects `approved` and `pending` values. You can set the color for these values using the following expression in the **Cell Background** property:

```js
{{currentRow.status === "approved" ? "#22c55e" : "#facc15"}}
```

If you want to keep the same background color for an entire row, you can use the same custom style expression in each column **Cell Background** property.

#### Text Color `string`

Sets the color for the text in the table. Additionally, the text color can  be programmatically modified using JavaScript functions.

#### Background Color `string`

Sets the background color of the widget, specified as a [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color). It can also be manipulated programmatically using the JavaScript functions.

#### Border color `string`

Sets a color for the border, specified as a CSS color value. It can also be  manipulated programmatically using the JavaScript functions.

### Border and shadow

#### Cell Borders `string`

Sets the border configuration for the cells of the table.

*Options*:

- Default
- No borders
- Horizontal borders only

#### Border radius `string`

Applies rounded corners to the outer edge of the widget. If JavaScript is enabled, you can specify valid [CSS border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) to adjust the radius of the corners.

#### Box Shadow `string`

This property adds a drop shadow effect to the frame of the widget. If JavaScript is enabled, you can specify valid [CSS box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values to customize the appearance of the shadow.

#### Border color `string`

Sets the color of the widget's borders, specified as a [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color). Additionally, the border color  can be programmatically modified using JavaScript functions.

#### Border Width `number`

Sets the thickness of the borders of the widget.

## Reference properties

Довідкові властивості – це властивості, які недоступні на панелі властивостей, але доступ до яких можна отримати за допомогою оператора крапки в інших віджетах або функціях JavaScript. Вони надають додаткову інформацію або дозволяють програмно взаємодіяти з віджетом. Наприклад, щоб отримати статус видимості, ви можете використовувати `Table1.isVisible`.

#### selectedRow `object`

Contains the data of the row selected by the user. It's an empty object if no row is selected.

*Example*:

```js
//To access the entire selected row:
{{Table1.selectedRow}}

//To access a specific cell value, such as the email field:
{{Table1.selectedRow.email}}
```

#### selectedRows `array<object>`

Contains an array of rows selected by the user when multi-select is enabled. It's `[null]` if no row is selected.

*Example:*

```js
//To access the array of selected rows:
{{Table1.selectedRows}}

//To access a specific cell value in the selected rows, such as the email field of the first selected row:
{{Table1.selectedRows[0].email}}
```

#### triggeredRow `object`

When a user interacts with an actionable item *(like a button)* in a row, `triggeredRow` fetches the data of that column.

*Example:*

```js
//To access the entire triggered row:
{{Table1.triggeredRow}}

//To access a specific cell value, such as the email field:
{{Table1.triggeredRow.email}}
```

For example, when using Datepicker if the date is in `ISO` format and you want to display it in `DD/MM/YYYY` format, then you can achieve this by binding the Table data to the **Default date** and changing the display format through the **Date format** property.

#### isVisible `boolean`

Reflects whether the widget is visible or not.

*Example:*

```js
{{Table1.isVisible}}
```

#### sortOrder `object`

Reflects the current column sort criteria. For example, if table rows are being sorted by the value of column `id` in ascending order, this property contains `{"column": "id", "order": "asc"}`.

*Example:*

```js
{{Table1.sortOrder}}
```

#### tableData `array<object>`

Contains all the table data in JSON format.

*Example:*

```js
{{Table1.tableData}}
```

#### selectedRowIndex `number`

Contains the index of the row selected by the user. Not applicable when multiple rows are selected.

*Example:*

```js
{{Table1.selectedRowIndex}}
```

#### selectedRowIndices `array`

Contains an array of the index of the rows selected by the user. Not applicable when multi-row selection is turned off.

*Example:*

```js
{{Table1.selectedRowIndices}}
```

#### filteredTableData `array<object>`

Contains the data of the rows left after applying any selected filters, sort rule, or search terms.

*Example:*

```js
{{Table1.filteredTableData}}
```

#### pageNo `number`

Contains the current page number that the user is on. APIs can use it for pagination.

*Example:*

```js
{{Table1.pageNo}}
```

#### pageOffset `number`

Contains a calculated value to represent how many records to skip when using  Server-side pagination. Use this value in your query to fetch the  correct set of results.

*Example:*

```js
{{Table1.pageOffset}}
```

#### pageSize `number`

Contains the number of rows that can fit inside a page of the table. Changes  along with the height & row height of the table.

*Example:*

```js
{{Table1.pageSize}}
```

#### searchText `string`

Contains the search text entered by the user in the Table.

*Example:*

```js
{{Table1.searchText}}
```

#### isAddRowInProgress `boolean`

Indicates whether a new row is currently being added to the table.

*Example:*

```js
{{Table1.isAddRowInProgress}}
```

#### newRow `object`

Contains data related to the newly added row.

*Example:*

```js
{{Table1.newRow}}
```

#### nextPageVisited `boolean`

Indicates whether the next page of data has been visited by the user.

*Example:*

```js
{{Table1.nextPageVisited}}
```

#### previousPageVisited `boolean`

Indicates whether the previous page of data has been visited by the user.

*Example:*

```js
{{Table1.previousPageVisited}}
```

#### tableHeaders `array<object>`

Indicates whether the table headers are visible.

*Example:*

```js
{{Table1.tableHeaders}}
```

#### totalRecordsCount `number`

Indicates the number of pages in server-side pagination.

*Example:*

```js
{{Table1.totalRecordsCount}}
```

#### updatedRow `object`

Contains data related to the recently updated added row.

*Example:*

```js
{{Table1.updatedRow}}
```

#### updatedRows `array<object>`

Contains data related to updated rows.

*Example:*

```js
{{Table1.updatedRows}}
```

#### triggeredRowIndex `number`

An index property that indicates the row index of the table that has been triggered.

*Example:*

```js
{{Table1.triggeredRowIndex}}
```

#### updatedRowIndices `array`

Refers to an array of indices corresponding to the rows that have been updated.

*Example:*

```js
{{Table1.updatedRowIndices}}
```

## Methods

Widget property setters enables you to modify the values of widget properties  at runtime, eliminating the need to manually update properties in the  editor.

These methods are asynchronous and return a [Promise](https://docs.appsmith.com/core-concepts/writing-code/javascript-promises#using-promises-in-appsmith). You can use the `.then()` block to ensure execution and sequencing of subsequent lines of code in Appsmith.

#### setVisibility (param: boolean): Promise

Sets the visibility of the widget.

*Example*:

```js
Table1.setVisibility(true)
```

#### setData (param: array< object >): Promise

Sets the data to be displayed in the Table widget.

*Example*:

```js
Table1.setData([{ name: 'John', age: 36 }, { name: 'Jane', age: 28 }])
```

#### setSelectedRowIndex (param: number): Promise

Sets the selected row index of the table widget.

*Example*:

```js
Table1.setSelectedRowIndex(2)
```

