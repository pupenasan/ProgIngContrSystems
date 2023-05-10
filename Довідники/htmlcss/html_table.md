[До розділу](README.md)

# Робота з таблицями

https://www.w3schools.com/html/html_tables.asp

HTML tables allow web developers to arrange data into rows and  columns.

## Define an HTML Table

A table in HTML consists of table cells inside rows and columns. A simple HTML table:

```html
<table>
    <tr>    
    	<th>Company</th>     
    	<th>Contact</th>     
    	<th>Country</th>   
    </tr>
    <tr>    
        <td>Alfreds Futterkiste</td>
        <td>Maria    Anders</td>
        <td>Germany</td>
    </tr>  
    <tr>    
        <td>Centro    comercial Moctezuma</td>
        <td>Francisco    Chang</td>
        <td>Mexico</td>
    </tr>
</table>  
```



<table>  <tr>    <th>Company</th>     <th>Contact</th>     <th>Country</th>   </tr>  <tr>    <td>Alfreds Futterkiste</td>     <td>Maria    Anders</td>     <td>Germany</td>   </tr>  <tr>    <td>Centro    comercial Moctezuma</td>     <td>Francisco    Chang</td>     <td>Mexico</td>   </tr></table>  

------

## Table Cells

Each table cell is defined by a `<td>` and a `</td>` tag.

`td`  stands for table data.

Everything between `<td>` and `</td>` are the content of the table cell.

<table>  <tr>    <td>Emil</td>     <td>Tobias</td>     <td>Linus</td>   </tr></table>  

**Note:** A table cell can contain  all sorts of HTML elements: text, images, lists, links, other tables, etc.

## Table Rows

Each table row starts with a  `<tr>` and ends with a `</tr>` tag.

`tr`  stands for table row.

### Example

<table>  <tr>    <td>Emil</td>     <td>Tobias</td>     <td>Linus</td>   </tr>  <tr>    <td>16</td>     <td>14</td>     <td>10</td>   </tr></table>  

You can have as many rows as you like in a table; just make sure that the number of cells are the same in each row.

**Note:** There are times when a row can have less or more cells than another. You will learn about that in a later chapter.

## Table Headers

Sometimes you want your cells to be table header cells. In those cases use the `<th>` tag instead of the `<td>` tag:

`th`  stands for table header.

Let the first row be table header cells:

<table>  <tr>    <th>Person 1</th>     <th>Person 2</th>     <th>Person    3</th>   </tr>  <tr>    <td>Emil</td>     <td>Tobias</td>     <td>Linus</td>   </tr>  <tr>    <td>16</td>     <td>14</td>     <td>10</td>   </tr></table>  

By default, the text in `<th>` elements  are bold and centered, but you can change that with CSS. 

## HTML Table Tags

| Tag     | Description                                                  |
| ------- | ------------------------------------------------------------ |
| <table> | Defines a table                                              |
|         | Defines a header cell in a table                             |
|         | Defines a row in a table                                     |
|         | Defines a cell in a table                                    |
|         | Defines a table caption                                      |
|         | Specifies a group of one or more columns in a table for formatting |
|         | Specifies column properties for each column within a <colgroup> element |
|         | Groups the header content in a table                         |
|         | Groups the body content in a table                           |
|         | Groups the footer content in a table                         |



