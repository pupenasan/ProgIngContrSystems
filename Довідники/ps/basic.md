

```powershell
# Виводить рядок на консоль
"Привіт світ!" # Привіт світ!
$a = "Давайте вчити "
$a += "PowerShell"
$a # Давайте вчитиPowerShell
```



```powershell
cls # очистити - це псевдонім командлета Clear-Host
[int]$TestVar = 100 # змінна типу int 
If ($TestVar -eq 100){ # умова якщо TestVar = 100
	Write-Host "Змінна TestVar = 100"
} else {
	Write-Host "Змінна TestVar <> 100" 
}
```

