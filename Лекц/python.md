**Програмна інженерія в системах управління. Лекції.** Автор і лектор: Олександр Пупена 

[до лекцій](README.md)    --> [Частина 2](python_p2.md)

# Основи Python

Конспект зроблений за матеріалами: 

- https://www.w3schools.com/python/default.asp
- https://pythonguide.rozh2sch.org.ua/


Додаткові матеріали по Python в цьому репозиторії розміщені за [цим посиланням](..\Довідники\python\README.md)

## Основні поняття

Python — об’єктно-орієнтована, інтерпретована та інтерактивна мова програмування. Він був створений Гвідо ван Россумом і випущений у 1991 році.

Використовується для:   

- веб-розробка (на стороні сервера)
- розробка програмного забезпечення
- математика
- системний сценарій

Python може:

- на сервері виконуватися як веб-застосунок 
- використовуватися разом із програмним забезпеченням для створення робочих процесів
- підключатися до систем баз даних
- читати та змінювати файли
- обробляти великі дані і виконувати складну математику
- швидко створювати прототипи або розробляти готове ПЗ 

## Основні конструкції Python

Для перевірки коду можете скористатися <https://colab.research.google.com> .

### Побудова коду програми

Все в Python чутливе до регістру. 

Відступ відноситься до пробілів на початку рядка коду. Якщо в інших мовах програмування відступи в коді призначені лише для зручності читання, у Python відступи дуже важливі, він використовує їх для позначення блоку коду. Наприклад у цьому коді перед інструкцією `print` чотири пробіли, або один `tab`:

```python
if 5 > 2:
  print("5 більше ніж 2!")
```

Python видасть вам помилку, якщо ви пропустите відступ, наприклад наступний код видасть помилку:

```python
if 5 > 2:
print("5 більше ніж 2!")
```

Кількість пробілів повинна бути не менше одного, але Ви повинні використовувати однакову кількість пробілів в одному блоці коду, інакше Python видасть вам помилку, приклад помилкового запису:

```python
if 5 > 2:
 print("Five is greater than two!")
        print("Five is greater than two!") 
```

Приклади використання коментарів в коді:

```python
# Це коментар
print("Hello, World!") # Це коментар
```

Мультирядкового коментарю немає, але можна скористатися синтаксисом запису багаторядковий літерал. Оскільки Python ігноруватиме рядкові літерали, які не назначені змінній, ви можете додати багаторядковий рядок (потрійні лапки) у свій код і розмістити в ньому свій коментар:

```python
"""
This is a comment
written in
more than just one line
"""
print("Hello, World!") 
```

У стилі Python передбачається що кожна інструкція починається з нового рядку. Тим не менше, якщо у деяких випадках все ж потребується написати кілька інструкцій в одному рядку, для їх розділення можна використовувати крапку з комою. Це варто робити тільки в деяких випадках, наприклад за необхідності запуску частини коду Python в командному рядку, на кшталт наступного:

```python
py -c "import os, sys; print(os.path.dirname(sys.executable) + '\Scripts')" 
```

Чому не варто використовувати крапку з комою в інших випадках, написано [тут](https://towardsdatascience.com/stop-using-semicolons-in-python-fd3ce4ff1086). 

### Змінні та константи

Немає окремих інструкцій для об'явлення змінних, вони створюються коли їм щось присвоюється

```python
x = 5
y = "Hello, World!"
```

Ім'я змінної має починатися з літери або символу підкреслення, може містити лише буквено-цифрові символи та підкреслення. Імена змінних чутливі до регістру як і усе інше в Python.

```python
a = 4
A = "Sally"
# A не перезапише a
```

Python дозволяє призначати значення декільком змінним в одному рядку:

```python
x, y, z = "Orange", "Banana", "Cherry"
print(x) #Orange
print(y) #Banana
print(z) #Cherry
```

І ви можете призначити те саме значення кільком змінним в одному рядку:

```python
x = y = z = "Orange"
print(x) #Orange
print(y) #Orange
print(z) #Orange
```

Якщо у вас є набір значень у списку, кортежі тощо, Python дозволяє видобувати значення у змінні. Це називається розпакуванням (*unpacking*).

```python
fruits = ["apple", "banana", "cherry"]
x, y, z = fruits # розпакування
print(x) #apple
print(y) #banana
print(z) #cherry
```

### Області видимості

Змінні в основному коді (не в середині функцій) є глобальними, до них можна звертатися з будь якої частини коду, в тому числі з середини функцій. Всередині функцій можуть використовуватися локальні змінні, якщо їм там присвоюються значення. Ці змінні не видимі за її межами. Таким чином при однаковій назві в глобальній і локальній області видимості, будуть існувати дві змінні.

```python
x = "чудовий"
def myfunc():
  x = "фантастичний"
  print("Python " + x)
myfunc() #Python фантастичний
print("Python " + x) #Python чудовий  
```

Для створення глобальних змінних, які будуть видимі за будь яких обставин, та до звернення до них можна скористатися ключовим словом `global`

```python
x = "чудовий"
def myfunc():
  global x 
  x = "фантастичний"
  print("Python " + x)
myfunc() #Python фантастичний
print("Python " + x) #Python фантастичний
```



### Ведення та виведення значення змінних `input/print`

Функція Python `print()` часто використовується для виведення змінних.  Можна вивести кілька змінних, або використовувати оператори, зокрема конкатенацію `+`

```python
x = "Python"
y = "просто"
z = "супер"
print(x, y, z + " - це точно!") # Python просто супер - це точно!

```

Для введення значення з клавіатури використовується функція `input`

```python
x = input("Введіть ваше ім'я:") # зявиться поле для вводу
# після Enter значення запише в x та виконає наступний рядок
print("Привіт, " + x)
```



## Прості типи даних та оператори

Використовується динамічна типізація, тобто змінні отримують той тип, значення якого в них записане. З різними типами даних не можна робити операції, треба явно перетворювати.

Ви можете отримати тип даних змінної за допомогою функції `type()`.

```python
x = 5
y = "John"
print(type(x)) # <class 'int'>
print(type(y)) # <class 'str'>
```

За замовчуванням Python має вбудовані наступні типи даних у категоріях:

| Категорія       | Типи                               |
| --------------- | ---------------------------------- |
| Text Type:      | `str`                              |
| Numeric Types:  | `int`, `float`,  `complex`         |
| Sequence Types: | `list`, `tuple`, `range`           |
| Mapping Type:   | `dict`                             |
| Set Types:      | `set`, `frozenset`                 |
| Boolean Type:   | `bool`                             |
| Binary Types:   | `bytes`, `bytearray`, `memoryview` |
| None Type:      | `NoneType`                         |

У Python тип даних встановлюється, коли ви присвоюєте значення змінній:

| Приклад присвоєння                           | Тип змінної |
| -------------------------------------------- | ----------- |
| x = "Hello World"                            | str         |
| x = 20                                       | int         |
| x = 20.5                                     | float       |
| x = 1j                                       | complex     |
| x = ["apple", "banana", "cherry"]            | list        |
| x = ("apple", "banana", "cherry")            | tuple       |
| x = range(6)                                 | range       |
| x = {"name" : "John", "age" : 36}            | dict        |
| x = {"apple", "banana", "cherry"}            | set         |
| x = frozenset({"apple", "banana", "cherry"}) | frozenset   |
| x = True                                     | bool        |
| x = b"Hello"                                 | bytes       |
| x = bytearray(5)                             | bytearray   |
| x = memoryview(bytes(5))                     | memoryview  |
| x = None                                     | NoneType    |

Якщо ви хочете вказати тип даних змінної, це можна зробити за допомогою приведення. 

```python
x = str(3)    # x буде '3' типу tring
y = int(3)    # y буде 3
z = float(3)  # z буде 3.0 
```

| Приклад присвоєння                           | Тип змінної |
| -------------------------------------------- | ----------- |
| x = str("Hello World")                       | str         |
| x = int(20)                                  | int         |
| x = float(20.5)                              | float       |
| x = complex(1j)                              | complex     |
| x = list(("apple", "banana", "cherry"))      | list        |
| x = tuple(("apple", "banana", "cherry"))     | tuple       |
| x = range(6)                                 | range       |
| x = dict(name="John", age=36)                | dict        |
| x = set(("apple", "banana", "cherry"))       | set         |
| x = frozenset(("apple", "banana", "cherry")) | frozenset   |
| x = bool(5)                                  | bool        |
| x = bytes(5)                                 | bytes       |
| x = bytearray(5)                             | bytearray   |
| x = memoryview(bytes(5))                     | memoryview  |

### Числові типи

У Python існує три типи чисел:

- `int`
- `float`
- `complex` - для роботи з комплексними числами що мають дійсну і уявну частину

```python
x = 1 #int
y = 35656222554887711 #int
z = -3255522 #int
x = 1.10 #float
y = 1.0 #float
z = -35.59 #float
x = 35e3 #float
y = 12E4 #float 
z = -87.7e100 #float
x = 3+5j #complex
y = 5j #complex
z = -5j #complex
```

Змінні можна переводити з одного типу в інший:

```python
x = 1    # int
y = 2.8  # float
z = 1j   # complex
a = float(x) #convert from int to float
b = int(y) #convert from float to int
c = complex(x) #convert from int to complex

print(a) #1.0
print(b) #2
print(c) #(1+0j)
```

Ви не можете перетворити комплексні числа в інший тип чисел.

Цілочисельні літерали типу `int` можна виразити у різних формах. Це задається першою літерою літералу: 

- без літери - для 10-кової, 
- `0o` - вісімкової , 
- `0x` - 16-кової, 
- `0b` - для 2-кової. 

```python
print(-345) #-345
print(-0o77) #-63
print(-0xF1A7) #-61863
print(-0b11) #-3
```

Для роботи з числами використовуються різноманітні оператори, зокрема арифметичні та присвоєння (розглянуті нижче), вбудовані функції а також функції різноманітних вбудованих модулів.

### Арифметичні оператори

Арифметичний оператор приймає числові значення (літерали чи змінні) в якості операндів та повертає єдине числове  значення. Стандартними арифметичними операторами є додавання (`+`), віднімання (`-`), множення (`*`) та ділення (`/`). Ці оператори працюють так само, як і в більшості інших  мов програмування, при використанні з числами з рухомою комою. Робота з іншими арифметичними операторами показана у прикладі  нижче:

```python
x=3
print (x + 5.1) #8.1
print (x * 2 - 0.1) #5.9
print (x ** 4 ** (1/2)) #9.0 зведення в степінь
print (x / 2) # 1.5
print (x // 2) # 1 оругялє до цілого
print (x % 2) #1 остача від ділення
print (x / 0.0) # помилка division by zero
```

Більшість з цих операторів можна використовувати для комплексних чисел:

```python
x=3 + 3j
print (x + 5.1) #(8.1+3j)
print (x * 2 - 0.1) #(5.9+6j)
print (x ** 4 ** (1/2)) #18j зведення в степінь
print (x / 2) # (1.5+1.5j)
```

### Оператори присвоєння

Оператори присвоєння використовуються для присвоєння значень змінним. Є багато варіантів присвоєння:

| Оператор | Приклад | Аналогічна дія |
| -------- | ------- | -------------- |
| =        | x = 5   | x = 5          |
| +=       | x += 3  | x = x + 3      |
| -=       | x -= 3  | x = x - 3      |
| *=       | x *= 3  | x = x * 3      |
| /=       | x /= 3  | x = x / 3      |
| %=       | x %= 3  | x = x % 3      |
| //=      | x //= 3 | x = x // 3     |
| **=      | x **= 3 | x = x ** 3     |
| &=       | x &= 3  | x = x & 3      |
| \|=      | x \|= 3 | x = x \| 3     |
| ^=       | x ^= 3  | x = x ^ 3      |
| >>=      | x >>= 3 | x = x >> 3     |
| <<=      | x <<= 3 | x = x << 3     |

### Вбудовані функції для роботи з числовими типами

Python має багато вбудованих функцій, які можна подивитися за [цим посиланням](https://www.w3schools.com/python/python_ref_functions.asp). Нижче наведені приклади використання деяких з них, призначених для роботи з числами.

```python
print (abs(-7.25)) # 7.25 - модуль
print (complex('3+5j')) # (3+5j) - комплексне число з string
print (complex(3,5)) # (3+5j) - комплексне число з дійсної і уявної частини
print (float("3.500")) # 3.5 
print (bin(255)) #0b11111111 - двійкове представлення числа типу int 
print (hex(255)) #0xff
print (oct(255)) #0o377
print (format(255, 'x')) # ff - шістнадцяткове представлення числа
print (format(255, 'X')) # FF - шістнадцяткове представлення числа у верхньому регістрі
print (format(255, 'o')) # 377 - 8-кове представлення числа
print (format(255, 'b')) # 11111111 - двійкове представлення числа
print (format(3.251e2, 'f')) #325.100000
print (format(325.1, 'e')) #3.251000e+02
print (pow(4, 1/2)) #2.0 - піднести в степінь
print (int("F", 16)) #15 - взяти аргумент як 16-кове число і перетворити в int
print (int(23.7)) #23 - перетворити в int
print (round(5.76543, 2)) #5.77 - округлив до 2-х знаків після коми
```

Також є ряд вбудованих модулів для роботи з числами, зокрема:

- [Random](https://www.w3schools.com/python/module_random.asp) - для генерування випадкових чисел
- [statistics](https://www.w3schools.com/python/module_statistics.asp) - для розрахунку математичної статистики
- [math](https://www.w3schools.com/python/module_math.asp) - для математичних задач зі звичайними числами
- [cmath](https://www.w3schools.com/python/module_cmath.asp) - для математичних задач з комплексними числами

```python
import random #імпортувати модуль для роботи з випадковими числами
r = random.randrange(1, 10) #функція генерує ціле значення від 1 до 9
```

### Функція `Print`

https://www.w3schools.com/python/ref_func_print.asp

Функція `print()` друкує вказане повідомлення на екрані або іншому стандартному пристрої виводу. Повідомлення може бути рядком або будь-яким іншим об’єктом, об’єкт буде перетворено в рядок перед виведенням на екран.

```python
print(object(s), sep=separator, end=end, file=file, flush=flush)
```

| Параметри         |                                                              |
| ----------------- | ------------------------------------------------------------ |
| *object(s)*       | Перелік об'єктів через кому, які виводяться                  |
| sep='*separator*' | Optional. Вказує як розділити об’єкти, якщо їх більше одного. Типовим є пробіл |
| end='*end*'       | Optional. Вказує що друкувати в кінці. Типовим є `\n` (переведення рядка) |
| *file*            | Optional. Об’єкт куди виводиться. Типовим є `sys.stdout`     |
| *flush*           | Optional. Логічне значення, яке вказує, чи скидається вихід (True) чи буферизується (False). Типовим значенням є False |

```python
print("Hello", "how are you?", sep="---") # Hello---how are you?
```

### Булеві змінні та оператори 

Булеві змінні приймають значення `True` або `False`. Нижче наведені булеві вирази:

```python
a = 200
b = 33
print (a>b) #True
print(bool("Hello")) #True
print(bool(0.0)) #False
print(bool(0.1)) #True

x = False
y = True
print (x and y) #False
print (x or y) #True
print (not x) #True
print (x or 5) #5 
print (y and 5.0) #5.0
z = FALSE #помилка name 'FALSE' is not defined, бо регістр має значення
```

### Оператори порівняння

| Оператор |                     | Приклад |      |      |
| -------- | ------------------- | ------- | ---- | ---- |
| ==       | рівне               | x == y  |      |      |
| !=       | нерівне             | x != y  |      |      |
| >        | більше              | x > y   |      |      |
| <        | менше               | x < y   |      |      |
| >=       | більше або дорівнює | x >= y  |      |      |
| <=       | менше або дорівнює  | x <= y  |      |      |

### Бітові оператори

```python
a = 0b1101 & 0b1000 
print (format(a, 'b')) #1000, побітове І

a = 0b1101 | 0b1010 
print (format(a, 'b')) #1111, побітове АБО

a = 0b1101 ^ 0b0001 
print (format(a, 'b')) #1100, побітове виключне АБО, повертає 0 там де біти однакові

a = ~ 0 
print (a) #-1, інвертує біти

# при зсуві усі біти на краю куди зсовують "випадають", а звідки - заповнюються нулями 
a = 0b0011 << 3 
print (format(a, 'b')) #11000, зсуває на три біти ліворуч
a = 0b11100 >> 4 
print (format(a, 'b')) #1, зсуває на 4 біти праворуч, 
a = 0x0080_0000 >> 16 
print (format(a, 'X')) #80, зсуває на 16 біт праворуч 
```

### Змінні `string`

Рядкові змінні можна оголошувати за допомогою одинарних або подвійних лапок:

```python
x = "John"
# те саме що і
x = 'John'
```

Використовуючи потрійні лапки (подвійні або одинарні) можна писати мультирядкові тексти 

```python
a = """Це є
мультирядковим
текстом"""
print(a) 
```

Як і в багатьох інших популярних мовах програмування, рядки в Python є масивами байтів, що представляють символи Unicode. Однак Python не має символьного типу даних, окремий символ є просто рядком довжиною 1. Квадратні дужки можна використовувати для доступу до елементів рядка.

```python
a = "Hello, World!"
print(a[1]) # e
```

Наступний код виведе кожен символ в окремому рядку

```python
for i in "banana":
  print(i)
```

Зі змінними даного типу використовуються ряд вбудованих функцій, які можна подивитися за [цим посиланням](https://www.w3schools.com/python/python_ref_functions.asp). Нижче наведені приклади використання деяких з них.

```python
x = ascii("Це кирилиця but it is not") #Екранування символів, які не є ASCII
print(x) #'\u0426\u0435 \u043a\u0438\u0440\u0438\u043b\u0438\u0446\u044f but it is not'
print(chr(97)) #'a - отримує символ, який представляє вказане значення Юнікод
print(len("Привіт світ!")) #12 - довжина символів в рядку
print(str(3.5) + "21") #3.521
```

### Умовні інструкції 

Умовні конструкції записується за допомогою ключового слова if.

```python
a = 33
b = 200
if b > a:
  print("b is greater than a")
if b > a: print("a is greater than b") # альтернативний спосіб
```

Не забувайте про пробіли. Конструкція з кількома альтернативами

```python
a = 33
b = 33
if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
```

З інакше:

```python
a = 200
b = 33
if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
else:
  print("a is greater than b")
```

Є ще одна коротка форма, яка відома як "тернарні оператори" або "умовні вирази".

```python
a = 2
b = 330
print("A") if a > b else print("B") 
print("A") if a > b else print("=") if a == b else print("B") 
```

Вкладення `if`

```python
x = 41
if x > 10:
  print("Above ten,")
  if x > 20:
    print("and also above 20!")
  else:
    print("but not above 20.") 
```

### Цикли 

Python має два примітива для циклів: `while` та `for` 

```python
i = 1
while i < 6:
  print(i)
  i += 1
```

За допомогою оператора `break` ми можемо зупинити цикл, навіть якщо умова `while` виконується:

```python
i = 1
while i < 6:
  print(i)
  if i == 3:
    break
  i += 1 
```

Цикл for використовується для повторення послідовності, тобто списку(list), кортежу(tuple), словника (dictionary), набору(set) або рядка(set)). Це менше схоже на ключове слово `for` в інших мовах програмування, а працює більше як метод ітератора, який є в інших мовах об’єктно-орієнтованого програмування. За допомогою циклу `for` ми можемо виконати набір операторів один раз для кожного елемента в списку, кортежі, наборі тощо.

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
```

```python
for x in "banana":
  print(x)
```

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
  if x == "banana":
    break
```

### Оператор `pass`

Оператори `if` ,`for` та ряд інших не можуть бути порожніми, але якщо з якоїсь причини у вас є оператор `if` без вмісту, додайте оператор `pass`, щоб уникнути помилки.

```python
a = 33
b = 200
if b > a:
  pass
```

## Колекції

У мові програмування Python є чотири типи даних колекції:

- List (Список) - це колекція, яка є впорядкованою та змінною. Дозволяє дублювати учасників.
- Tuple (Кортеж) - це колекція, яка є впорядкованою та незмінною. Дозволяє дублювати учасників.
- Set (Набір) — це невпорядкована, незмінна (елементи змінювати не можна, але можна видаляти або добавляти) та неіндексована колекція. Немає дублікатів учасників.
- Dictionary (Словник) – збірник, який є впорядкованим і змінним. Немає дублікатів учасників.

Це перечислювальні об'єкти, тобто вони мають елементи, які можна перебирати з використанням оператора `for` або спеціальних методів. До перечислювальних типів також належить `string`.

### Тип List (список)

**List** (списки) використовуються для зберігання кількох елементів в одній змінній. Це один із 4 вбудованих типів даних у Python, які використовуються для зберігання колекцій даних, інші 3 — це кортеж, набір і словник, усі з різними якостями та використанням.

Списки створюються за допомогою квадратних дужок і можуть містити елементи різного типу. Також можна використовувати конструктор `list()` під час створення нового списку.

```python
thislist = ["abc", 34, True, 40, "male"]
print(thislist)
print(type(thislist)) # <class 'list'>
thislist = list(("apple", "banana", "cherry")) # зверніть увагу на подвійні круглі дужки
print(thislist)
```

Елементи списку впорядковані, змінювані (можна добавляти, видаляти елементи після створення) та допускають дублювання значень. Елементи списку індексуються: перший елемент має індекс [0], другий пункт має індекс [1] і т.д.

Для списків можна робити розпаковку (unpacking)

```python
fruits = ["apple", "banana", "cherry"]
[green, yellow, red] = fruits
print(green) #apple
```

Коли ми говоримо, що списки впорядковані, це означає, що елементи мають визначений порядок, і цей порядок не зміниться. Якщо ви додаєте нові елементи до списку, нові елементи будуть розміщені в кінці списку. Існують деякі методи списку, які змінюють порядок.

```python
thislist = ["apple", "banana", "cherry"]
print(len(thislist)) # 3 - кількість елементів списку
```

Доступ до елементу йде по індексу: з 0-го якщо з лівого боку, від'ємний вказує на номер елементу з кінця списку (з правого боку)

```python
thislist = ["apple", "banana", "cherry"]
print(thislist[1]) # banana
thislist[2] = "blackcurrant"
print(thislist[-1]) # blackcurrant - перший з кінця списку
for x in thislist:
  print(x) 
```

Використовуйте функції `range()` і `len()`, щоб створити відповідну ітерацію.

```python
thislist = ["apple", "banana", "cherry"]
for i in range(len(thislist)):
  print(thislist[i]) 
```

Ви можете вказати діапазон індексів, вказавши, де починати і де закінчувати діапазон. Якщо вказати діапазон, значенням, що повертається, буде новий список із зазначеними елементами.

```python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
otherlist = thislist[2:5] # з 2-го включно по 5-й не включно (тобто 4-й
print(otherlist) # ['cherry', 'orange', 'kiwi']
```

Можна не вказувати номер початкового або кінцевого елементу, якщо вони співпадають з початком або кінцем списку.

```python
thislist = ["яблуко", "банан", "вишня", "апельсин", "ківі", "диня", "манго"]
print(thislist[:4]) #['яблуко', 'банан', 'вишня', 'апельсин']
print(thislist[2:]) #['вишня', 'апельсин', 'ківі', 'диня', 'манго']
print(thislist[-4:-1]) #['апельсин', 'ківі', 'диня']
```

Щоб визначити, чи присутній певний елемент у списку, використовуйте ключове слово `in`:

```python
thislist = ["apple", "banana", "cherry"]
if "apple" in thislist:
  print("Yes, 'apple' is in the fruits list") 
```

Можна змінювати діапазон елементів а також замінювати менший діапазон більшим або навпаки, тим самим змінюючи довжину списку:

```python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]
thislist[1:3] = ["blackcurrant", "watermelon"]
print(thislist) #['apple', 'blackcurrant', 'watermelon', 'orange', 'kiwi', 'mango']
thislist[1:2] = ["blackcurrant", "watermelon"]
print(thislist) #['apple', 'blackcurrant', 'watermelon', 'watermelon', 'orange', 'kiwi', 'mango']
```

У списків існує кілька методів, деякі з них вже були розглянуті, інші наводяться нижче

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [append()](https://www.w3schools.com/python/ref_list_append.asp) | Adds an element at   the end of the list                     |
| [clear()](https://www.w3schools.com/python/ref_list_clear.asp) | Removes all the   elements from the list                     |
| [copy()](https://www.w3schools.com/python/ref_list_copy.asp) | Returns a copy of the   list                                 |
| [count()](https://www.w3schools.com/python/ref_list_count.asp) | Returns the number of   elements with the specified value    |
| [extend()](https://www.w3schools.com/python/ref_list_extend.asp) | Add the elements of a   list (or any iterable), to the end of the current list |
| [index()](https://www.w3schools.com/python/ref_list_index.asp) | Returns the index of   the first element with the specified value |
| [insert()](https://www.w3schools.com/python/ref_list_insert.asp) | Adds an element at   the specified position                  |
| [pop()](https://www.w3schools.com/python/ref_list_pop.asp)   | Removes the element at the   specified position              |
| [remove()](https://www.w3schools.com/python/ref_list_remove.asp) | Removes the    item with the specified value                 |
| [reverse()](https://www.w3schools.com/python/ref_list_reverse.asp) | Reverses the order   of the list                             |
| [sort()](https://www.w3schools.com/python/ref_list_sort.asp) | Sorts the list                                               |

#### Методи добавлення та видалення елементів

Список має ряд методів.

Щоб вставити новий елемент списку, не замінюючи жодного з існуючих значень, ми можемо використати метод `insert()`, який вставляє елемент за вказаним індексом:

```python
thislist = ["apple", "banana", "cherry"]
thislist.insert(2, "watermelon")
print(thislist) # ['apple', 'banana', 'watermelon', 'cherry']
```

Щоб додати елемент у кінець списку, використовуйте метод `append()`:

```python
thislist = ["apple", "banana", "cherry"]
thislist.append("orange")
print(thislist) #['apple', 'banana', 'cherry', 'orange']
```

Метод `extend()` не потребує додавання списків, ви можете додати будь-який ітерований об’єкт (кортежі, набори, словники тощо).

```python
thislist = ["apple", "banana", "cherry"]
thistuple = ("kiwi", "orange")
thislist.extend(thistuple)
print(thislist) # ['apple', 'banana', 'cherry', 'kiwi', 'orange']
```

Метод `remove()` видаляє вказаний елемент.

```python
thislist = ["apple", "banana", "cherry"]
thislist.remove("banana")
print(thislist) #['apple', 'cherry']
```

Метод `pop()` видаляє вказаний індекс.

```python
thislist = ["apple", "banana", "cherry"]
thislist.pop(1)
print(thislist) #['apple', 'cherry']
thislist.pop() # видаляє останній
print(thislist) # ['apple']
```

Ключове слово `del` також може видаляти вказаний елемент або повністю видалити список.

```python
thislist = ["apple", "banana", "cherry"]
del thislist[0]
print(thislist) #['banana', 'cherry']
del thislist # видаляє весь список 
```

Метод `clear()` очищає список.

```python
thislist = ["apple", "banana", "cherry"]
thislist.clear()
print(thislist) #[]
```

#### Сортування

Об’єкти списку мають метод `sort()`, який за замовчуванням сортує список алфавітно-цифровим способом за зростанням. Щоб відсортувати за спаданням, використовуйте аргумент ключового слова `reverse = True`. 

```python
thislist = ["orange", "mango", "kiwi", "pineapple", "banana"]
thislist.sort()
print(thislist) #['banana', 'kiwi', 'mango', 'orange', 'pineapple']
thislist.sort(reverse = True)
print(thislist) #['pineapple', 'orange', 'mango', 'kiwi', 'banana']
thislist = [100, 50, 65, 82, 23]
thislist.sort()
print(thislist) #[23, 50, 65, 82, 100]

```

Ви також можете налаштувати власну функцію за допомогою ключового аргументу `key =  function`. Функція поверне число, яке буде використано для сортування списку (найменше число спочатку).

```python
def myfunc(n): #обявлення функції сортування
  return abs(n - 50)

thislist = [100, 50, 65, 82, 23]
thislist.sort(key = myfunc)
print(thislist) #[50, 65, 23, 82, 100]
```

За замовчуванням метод чутливий до регістру, в результаті чого всі великі літери сортуються перед малими. Використовуючи аргумент `key` можна вказувати функцію, яка буде робити усі елементи для сортування нечутливими до регістру `key   = str.lower`

```python
thislist = ["banana", "Orange", "Kiwi", "cherry"]
thislist.sort(key = str.lower)
```

Можна розвернути список, використовуючи метод `reverse`

```python
thislist = ["banana", "Orange", "Kiwi", "cherry"]
thislist.reverse() # ['cherry', 'Kiwi', 'Orange', 'banana']
print(thislist)
```

#### Копіювання

Скопіюйте список за допомогою методу списку `copy()` або конструктору `list()`.

```python
thislist = ["apple", "banana", "cherry"]
mylist = thislist.copy()
mylist1 = list(thislist)
```

#### Об'єднання

Можна використовувати `+`

```python
list1 = ["a", "b", "c"]
list2 = [1, 2, 3]
list3 = list1 + list2
print(list3) #['a', 'b', 'c', 1, 2, 3]
```

або метод `extend`

```python
list1 = ["a", "b" , "c"]
list2 = [1, 2, 3]
list1.extend(list2)
print(list1) # ['a', 'b', 'c', 1, 2, 3]
```



### List Comprehension (Включення списків)

Є [короткий синтаксис](https://www.w3schools.com/python/python_lists_comprehension.asp) за яким можна створювати нові списки на основі дії над елементами інших списків. 

```python
newlist = [expression for item in iterable if condition == True]
```

Наприклад, треба створити список зі слів іншого списку, які включать літеру `a`. Класичний синтаксис буде такий:

```python
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
newlist = [] #порожній список
for x in fruits: #перебираємо кожне слово в списку fruits
  if "a" in x: #якщо в слові є літера a
    newlist.append(x) #добавляємо цей елемент
print(newlist) 
```

Альтернативний варіант має вигляд:

```python
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
newlist = [x for x in fruits if "a" in x]
print(newlist) 
```

### Тип Tuple (кортеж)

Кортежі (Tuple) використовуються для зберігання кількох елементів в одній змінній, як впорядкований і незмінний набір. Користування кортежем дуже схоже не списки, але на відміну від останніх, кортежі не передбачають змін, займають менше пам'яті і потребують менше часу на операції. Кортежі записуються в круглих дужках.

```python
mytuple = ("apple", "banana", "cherry")
print(mytuple[1]) #banana
```

Якщо у вас є дані, які не призначені для змін, вам слід вибрати тип даних кортежу замість списків. Але якщо ви знаєте, що дані будуть збільшуватися та зменшуватися під час виконання програми, вам потрібно вибрати тип даних списку.

Якщо ж все таки потрібно змінити кортеж, можн спочатку його перетворити в список, обробити, а потім знову в кортеж через конструктор `tuple`.

```python
x = ("apple", "banana", "cherry")
y = list(x)
y[1] = "kiwi"
x = tuple(y)
print(x) #('apple', 'kiwi', 'cherry')
```

Для кортежів так само можна робити розпаковку (unpacking). Якщо кількість змінних менша за кількість значень, ви можете додати `*` до імені змінної, і значення буде призначено змінній у вигляді списку:

```python
fruits = ("apple", "banana", "cherry")
(green, yellow, red) = fruits
print(green) #apple
fruits = ("apple", "banana", "cherry", "strawberry", "raspberry")
(green, yellow, *red) = fruits
print(red) #['cherry', 'strawberry', 'raspberry']
(green, *tropic, red) = fruits 
print(tropic) #['banana', 'cherry', 'strawberry']
```

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [count()](https://www.w3schools.com/python/ref_tuple_count.asp) | Returns the number of times a specified value occurs in a tuple |
| [index()](https://www.w3schools.com/python/ref_tuple_index.asp) | Searches the tuple for a specified value and returns the position of where it was found |

### Тип Dictionary (Словник)

Словники використовуються для зберігання значень даних у парах `ключ:значення`. Словник – це колекція, яка є впорядкованою, змінюваною та не допускає дублікатів. Починаючи з версії Python 3.7, словники впорядковані. До елементі словника звертаються за ключем вказуючи в квдратних дужках або через метод `get`. Кількість елементів можна дізнатися через функцію `len`. Добавляються елементи простим зверненням присвоєння до неіснуючого ключа або через виклик методу `update` з неіснуючим ключем. Елементи можна змінювати різними способами - через запис у властивість або метод `update`

```python
thisdict =	{"brand": "Ford","model": "Mustang","year": 1964}
print(thisdict) #{'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
print(thisdict["brand"]) #Ford
print(thisdict.get("model")) #Mustang
print(len(thisdict))#3
print(type(thisdict)) # <class 'dict'> 
print(thisdict.keys()) #dict_keys(['brand', 'model', 'year'])
thisdict["color"] = "white"
print(thisdict) #{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'white'}
thisdict["year"] = 2018
thisdict.update({"year": 2020}) 
```

Коли ми говоримо, що словники впорядковані, це означає, що елементи мають означений порядок, і цей порядок не зміниться. 

Видалення елементів проводиться з використанням методів `pop`,  `popitem`, функції `del`. Метод `clear` повністю очищає словник.

```python
thisdict =	{"brand": "Ford","model": "Mustang","year": 1964, 'color': 'white'}
thisdict.pop("model")
print(thisdict) # {'brand': 'Ford', 'year': 1964, 'color': 'white'}
thisdict.popitem()
print(thisdict) # {'brand': 'Ford', 'year': 1964}
del thisdict["year"]
print(thisdict) #{'brand': 'Ford'}
thisdict.clear()
print(thisdict) #{}
```

Робота з операторами циклів схожа до списків, перебираються усі елементи. Але тут можна перебирати ключі, а можна значення, а можна і ключі і значення.

```python
thisdict =	{"brand": "Ford","model": "Mustang","year": 1964, 'color': 'white'}
for x in thisdict: #перебір ключів
  print(x) # brand .. color
for x in thisdict.keys(): #також перебір ключів 
  print(x) # brand .. color
for x in thisdict.values(): #перебір значень
  print(x) # Ford .. white
for x, y in thisdict.items(): #перебір ключів і значень
  print(x, y) # brand Ford ..  color white 
```

Копіювання словнику можна робити через `copy` або `dict`

```python
mydict1 = thisdict.copy()
mydict2 = dict(thisdict)
```

У якості елементів дозволяються будь які типи.

```python
a = (1 , 2)
b = [1,2,3]
c = {"elm":a, "elm2": b}
d = {"a": c, "b": c}
print (d) #{'a': {'elm': (1, 2), 'elm2': [1, 2, 3]}, 'b': {'elm': (1, 2), 'elm2': [1, 2, 3]}}
```

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [clear()](https://www.w3schools.com/python/ref_dictionary_clear.asp) | Removes all the elements from the dictionary                 |
| [copy()](https://www.w3schools.com/python/ref_dictionary_copy.asp) | Returns a copy of the dictionary                             |
| [fromkeys()](https://www.w3schools.com/python/ref_dictionary_fromkeys.asp) | Returns a dictionary with the specified keys and value       |
| [get()](https://www.w3schools.com/python/ref_dictionary_get.asp) | Returns the value of the specified key                       |
| [items()](https://www.w3schools.com/python/ref_dictionary_items.asp) | Returns a list containing a tuple for each key value pair    |
| [keys()](https://www.w3schools.com/python/ref_dictionary_keys.asp) | Returns a list containing the dictionary's keys              |
| [pop()](https://www.w3schools.com/python/ref_dictionary_pop.asp) | Removes the element with the specified key                   |
| [popitem()](https://www.w3schools.com/python/ref_dictionary_popitem.asp) | Removes the last   inserted key-value pair                   |
| [setdefault()](https://www.w3schools.com/python/ref_dictionary_setdefault.asp) | Returns the value of the specified key. If the key does not exist: insert the key, with the specified value |
| [update()](https://www.w3schools.com/python/ref_dictionary_update.asp) | Updates the dictionary with the specified key-value pairs    |
| [values()](https://www.w3schools.com/python/ref_dictionary_values.asp) | Returns a list of all the values in the dictionary           |



### Тип Set (Множина)

Набори (Set) використовуються для зберігання кількох елементів в одній змінній, які невпорядковані і не мають індексу та не можуть дублюватися. Цілі числа, числа з плаваючою крапкою, рядки і кортежі можуть бути елементами множини, а списки, словники і самі множини - ні. Множини часто використовуються для двох цілей: для видалення дублікатів елементів і для перевірки належності множині.

```python
thisset = {"apple", "banana", "cherry"}
print("banana" in thisset) # True
```

Після створення не можна змінювати елементи але можна добавляти нові через метод `add`, або `update` , який може добавляти в множину інші множини, списки, словники, кортежі. Щоб видалити елемент із набору, використовуйте метод `remove()` (видає помилку якщо елементу немає) або `discard()` (не видає помилку якщо елементу немає).

```python
thisset = {"apple", "banana", "cherry"}
thisset.add("orange")
print(thisset) #{'apple', 'banana', 'orange', 'cherry'}
tropical = {"pineapple", "mango"} # ще одна множина
thisset.update(tropical)
print(thisset) #{'orange', 'apple', 'banana', 'cherry', 'mango', 'pineapple'}
mylist = ["kiwi", "orange"] #список
thisset.update(mylist)
print(thisset) # {'apple', 'cherry', 'pineapple', 'mango', 'kiwi', 'banana', 'orange'}
thisset.remove("banana")
print(thisset) # {'mango', 'pineapple', 'orange', 'cherry', 'apple', 'kiwi'}
thisset.discard("mango") 
print(thisset) # {'pineapple', 'orange', 'cherry', 'apple', 'kiwi'}

```

Зверніть увагу що дублювання елементів в множинах немає.

Метод `pop` видаляє останній елемент з множини, але враховуючи що множина не є впорядкованою, який саме елемент видалиться не можна вказати. Метод `clear()` очищає всю множину, `del` - видаляє.

Перебрати кожен елемент можна через `for`

```python
thisset = {"apple", "banana", "cherry"}
for x in thisset:
  print(x) 
```

#### Робота з множинами

Множини можна об'єднувати, як в [теорії множин](https://uk.wikipedia.org/wiki/%D0%9E%D0%B1%27%D1%94%D0%B4%D0%BD%D0%B0%D0%BD%D0%BD%D1%8F_%D0%BC%D0%BD%D0%BE%D0%B6%D0%B8%D0%BD).

```python
set1 = {"a", "b" , "c"}
set2 = {1, 2, 3}
set3 = set1.union(set2)
print(set3) #{1, 2, 3, 'b', 'c', 'a'}
set3.update({3,4,5})
print(set3) # {1, 2, 3, 'c', 4, 5, 'b', 'a'}
```

Множини можна отримувати шляхом [перетину множин](https://uk.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D1%82%D0%B8%D0%BD_%D0%BC%D0%BD%D0%BE%D0%B6%D0%B8%D0%BD). Метод `intersection_update()` зберігатиме лише ті елементи, які присутні в обох наборах, а метод `intersection()` поверне новий набір, який містить лише елементи, присутні в обох наборах.

```python
x = {"apple", "banana", "cherry"}
y = {"google", "microsoft", "apple"}
z = x.intersection(y)
x.intersection_update(y)
print(x) #{'apple'}
print(z) #{'apple'}
```

Доступні операції [симетричної різниці множин](https://uk.wikipedia.org/wiki/%D0%A1%D0%B8%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%87%D0%BD%D0%B0_%D1%80%D1%96%D0%B7%D0%BD%D0%B8%D1%86%D1%8F_%D0%BC%D0%BD%D0%BE%D0%B6%D0%B8%D0%BD). Метод `symmetric_difference_update()` зберігатиме лише ті елементи, які НЕ присутні в обох наборах, а `symmetric_difference()` поверне новий набір, який містить лише елементи, які НЕ присутні в обох наборах.

```python
x = {"apple", "banana", "cherry"}
y = {"google", "microsoft", "apple"}
z = x.symmetric_difference(y)
x.symmetric_difference_update(y)
print(x) #{'banana', 'google', 'microsoft', 'cherry'}
print(z) #{'banana', 'google', 'microsoft', 'cherry'}
```

Усі методи множин:

| Method                                                       | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [add()](https://www.w3schools.com/python/ref_set_add.asp)    | Adds an element to the   set                                 |
| [clear()](https://www.w3schools.com/python/ref_set_clear.asp) | Removes all the   elements from the set                      |
| [copy()](https://www.w3schools.com/python/ref_set_copy.asp)  | Returns a copy of the set                                    |
| [difference()](https://www.w3schools.com/python/ref_set_difference.asp) | Returns a set     containing the difference between two or more sets |
| [difference_update()](https://www.w3schools.com/python/ref_set_difference_update.asp) | Removes the     items in this set that are also included in another, specified set |
| [discard()](https://www.w3schools.com/python/ref_set_discard.asp) | Remove the specified   item                                  |
| [intersection()](https://www.w3schools.com/python/ref_set_intersection.asp) | Returns a set,     that is the intersection of two other sets |
| [intersection_update()](https://www.w3schools.com/python/ref_set_intersection_update.asp) | Removes the items in this set that are not present in other, specified set(s) |
| [isdisjoint()](https://www.w3schools.com/python/ref_set_isdisjoint.asp) | Returns whether     two sets have a intersection or not      |
| [issubset()](https://www.w3schools.com/python/ref_set_issubset.asp) | Returns whether     another set contains this set or not     |
| [issuperset()](https://www.w3schools.com/python/ref_set_issuperset.asp) | Returns whether   this set contains another set or not       |
| [pop()](https://www.w3schools.com/python/ref_set_pop.asp)    | Removes an element from the   set                            |
| [remove()](https://www.w3schools.com/python/ref_set_remove.asp) | Removes the specified element                                |
| [symmetric_difference()](https://www.w3schools.com/python/ref_set_symmetric_difference.asp) | Returns     a set with the symmetric differences of two sets |
| [symmetric_difference_update()](https://www.w3schools.com/python/ref_set_symmetric_difference_update.asp) | inserts the symmetric differences from this set and another  |
| [union()](https://www.w3schools.com/python/ref_set_union.asp) | Return a set containing     the union of sets                |
| [update()](https://www.w3schools.com/python/ref_set_update.asp) | Update the set with the   union of this set and others       |

------

### Стандартні функції для ітераторів

#### zip

Функція `zip()` повертає об’єкт `zip`, який є ітератором кортежів, де перший елемент у кожному переданому ітераторі поєднується разом, а потім другий елемент у кожному переданому ітераторі об’єднується разом тощо.

```python
zip(iterator1, iterator2, iterator3 ...) 
```

Якщо передані ітератори мають різну довжину, ітератор із найменшою кількістю елементів визначає довжину нового ітератора.

```python
a = ("John", "Charles", "Mike")
b = ("Jenny", "Christy", "Monica")

x = zip(a, b)
print (tuple(x)) # (('John', 'Jenny'), ('Charles', 'Christy'), ('Mike', 'Monica'))
```



## Основи роботи з функціями

### Оголошення та виклик

У Python функція означується за допомогою ключового слова `def`. Інформацію можна передати у функції як аргументи.

```python
def my_function(fname):
  print(fname + " Refsnes")
my_function("Emil") #Emil Refsnes
my_function("Tobias") #Tobias Refsnes
```

У термінах Python те що вказується в дужках (наприклад `fanme`) в означенні функції називається параметром функції, а те що передається замість нього при виклику - аргументом (наприклад `"Emil"`).

Змінні в коді (не в середині функцій) є глобальними, до них можна звертатися з будь якої частини коду, в тому числі з середини функцій. Всередині функцій можуть використовуватися локальні змінні, якщо їм там присвоюються значення 

Якщо ви не знаєте, скільки аргументів буде передано у вашу функцію, додайте `*` перед назвою параметра у означенні функції. Таким чином функція отримає кортеж аргументів і зможе отримати відповідний доступ до елементів.

```python
def my_function(*kids):
  print("The youngest child is " + kids[2])
my_function("Emil", "Tobias", "Linus") 
```

Ви також можете надсилати аргументи за допомогою синтаксису `ключ = значення`. Таким чином порядок аргументів не має значення.

```python
def my_function(child3, child2, child1):
  print("The youngest child is " + child3)
my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus") 
```

Якщо ви не знаєте, скільки ключових аргументів буде передано у вашу функцію, додайте дві зірочки: `**` перед назвою параметра у означенні функції. Таким чином функція отримає словник аргументів і матиме відповідний доступ до елементів:

```python
def my_function(**kid):
  print("His last name is " + kid["lname"])
my_function(fname = "Tobias", lname = "Refsnes") 
```

У наступному прикладі показано, як використовувати значення параметра за замовчуванням. Якщо ми викликаємо функцію без аргументу, вона використовує значення за замовчуванням:

```python
def my_function(country = "Norway"):
  print("I am from " + country)
my_function("Sweden") # I am from Sweden
my_function() # I am from Norway
```

Ви можете надіслати будь-які типи даних аргументу до функції (рядок, число, список, словник тощо), і він буде розглядатися як той самий тип даних у функції.

Щоб дозволити функції повертати значення, використовуйте оператор `return`:

```python
def my_function(x):
  return 5 * x
print(my_function(3))
```

Означення функції не можуть бути порожніми, але якщо у вас з якоїсь причини є визначення функції без вмісту, введіть оператор `pass`, щоб уникнути помилки.

```python
def myfunction():
  pass
```

Python також приймає рекурсію функцій, що означає, що означена функція може викликати саму себе.

### Lamda функції

Лямбда-функція — це невелика анонімна функція, яка може приймати будь-яку кількість аргументів, але може мати лише один вираз.

```python
lambda arguments : expression
```

```python
x = lambda a, b, c : a + b + c
print(x(5, 6, 2)) 
```

Часто такі маленькі функції потрібно передавати іншим функціям. У таких випадках великі функції зазвичай не потрібні, і було б  незручно визначати функцію десь окремо від місця її виконання. Анонімну функцію не обов’язково присвоювати змінній

```python
print((lambda x, y: x + y)(5, 12))
```

Дуже часто, лямбда-функції використовують для написання коротких функцій для сортування об’єктів за *альтернативним* ключем:

```python
months = [(1, 'January'), (9, 'September'), (7, 'July'), (4, 'March')]
print(sorted(months, key=lambda x: x[1])) #[(1, 'January'), (7, 'July'), (4, 'March'), (9, 'September')]
print(sorted(months)) #[(1, 'January'), (4, 'March'), (7, 'July'), (9, 'September')]
```

У наведеному вище прикладі ми сортуємо список кортежів по другому ([1]) значенню в кожному кортежі. В даному випадку лямбда-функція забезпечує  швидкий спосіб зміни порядку сортування.

Потужність лямбда краще видно, якщо ви використовуєте їх як анонімну функцію всередині іншої функції. Скажімо, у вас є означення функції, яка приймає один аргумент, і цей аргумент буде помножено на невідоме число:

```python
def myfunc(n):
  return lambda a : a * n 
```

Використовуйте це визначення функції, щоб створити функцію, яка завжди подвоює число, яке ви надсилаєте:

```python
def myfunc(n):
  return lambda a : a * n
mydoubler = myfunc(2)
print(mydoubler(11)) # 22
```

[до лекцій](README.md)    --> [Частина 2](python_p2.md)




## Запитання для самоперевірки
