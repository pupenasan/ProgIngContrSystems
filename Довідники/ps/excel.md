https://community.spiceworks.com/how_to/137203-create-an-excel-file-from-within-powershell

https://maliyaablog.wordpress.com/2017/10/02/how-to-createwrite-and-save-excel-using-powershell/

```powershell
$excel = New-Object -ComObject excel.application # Create an excel file 
$workbook = $excel.Workbooks.Add() # Add a workbook to your excel file
$excel.visible = $True 
$workbook.Worksheets.Item(3).Delete() # Removing unwanted worksheets
$uregwksht= $workbook.Worksheets.Item(1) # Get worksheet 
$uregwksht.Name = 'The name you choose' # Give a name to the worksheet

# Create a title for the table in the worksheet of your choice
$row = 1 
$Column = 1 
$uregwksht.Cells.Item($row,$column)= 'Title'

# Merging cells
$MergeCells = $uregwksht.Range(A1:G1) 
$MergeCells.Select() 
$MergeCells.MergeCells = $true 
$uregwksht.Cells(1, 1).HorizontalAlignment = -4108

# Formatting the title and make it look nicer
$uregwksht.Cells.Item(1,1).Font.Size = 18 
$uregwksht.Cells.Item(1,1).Font.Bold=$True 
$uregwksht.Cells.Item(1,1).Font.Name = Cambria $uregwksht.Cells.Item(1,1).Font.ThemeFont = 1 $uregwksht.Cells.Item(1,1).Font.ThemeColor = 4 $uregwksht.Cells.Item(1,1).Font.ColorIndex = 55 
$uregwksht.Cells.Item(1,1).Font.Color = 8210719

# Creating column headers
$uregwksht.Cells.Item(3,1) = 'Date' 
$uregwksht.Cells.Item(3,2) = 'Hour' 
$uregwksht.Cells.Item(3,3) = 'Name'

# Import data from a csv file
$records = Import-Csv -Path $sourcepath
foreach($record in $records) { 
	$excel.cells.item($i,1) = $record.date 
	$excel.cells.item($i,2) = $record.hour 
	$excel.cells.item($i,3) = $record.name $i++ 
}

# Autosizing the columns
$usedRange = $uregwksht.UsedRange
$usedRange.EntireColumn.AutoFit() | Out-Null

# Saving the file and closing excel
$workbook.SaveAs($outputpath) 
$excel.Quit()
```

