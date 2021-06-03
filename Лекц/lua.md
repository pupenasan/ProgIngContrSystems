# Мова Lua

Робоча чернетка.

[Learn Lua in 15 Minutes](http://tylerneylon.com/a/learn-lua/ )

[wiki](https://uk.wikipedia.org/wiki/Lua)

[Lua 5.0 Reference Manual](https://www.lua.org/manual/5.0/)

[Programming in Lua (first edition)](https://www.lua.org/pil/contents.html)

[CronosPRO — Lua](https://www.cronos.ru/kb-cronospro-lua.html)

## Вступ

Lua ([лу́а], порт. місяць) — швидка і компактна скриптова мова програмування, розроблена підрозділом Tecgraf Католицького університету Ріо-де-Жанейро (Computer Graphics Technology Group of Pontifical Catholic University of Rio de Janeiro in Brazil). Є вільно-поширюваною, з відкритим сирцевим кодом на мові Сі.

За можливостями, ідеологією і реалізацією, мова найближча до JavaScript, проте Lua відрізняється могутнішими і набагато гнучкішими конструкціями, спроектованими з метою «не плодити сутності понад необхідне». Хоча Lua не містить поняття класу і об'єкта в явному вигляді, механізми об'єктно-орієнтованого програмування з підтримкою прототипів (включаючи множинне успадкування) легко реалізуються з використанням метатаблиць, які також дозволяють перевантаження операцій, тощо. Реалізована модель ООП (як і в JavaScript) — прототипна.

Lua отримала велике поширення в ролі вбудованої в інші проекти мови сценаріїв (наприклад, для визначення конфігурації або для написання розширень). Lua комбінує простий процедурний синтаксис з потужними можливостями опису даних через використання асоціативних масивів і розширюваної семантики мови. У Lua використовується динамічна типізація, мовні конструкції перетворюються на байт-код, який виконується поверх регістрової віртуальної машини з автоматичним збирачем сміття. Сам інтерпретатор оформлений у вигляді бібліотеки, легко інтегрованої в проекти на мовах Сі та Сі++. Код інтерпретатора Lua написаний на мові Сі і розповсюджується під ліцензією MIT. 

Як і багато інтерпретованих мов програмування, реалізація Lua має окремо компілятор з сирцевого коду у виконуваний байт-код і віртуальну машину для виконання згенерованого байт-коду. Особливістю є те, що байт-код — це команди не стекової машини, команди віртуального регістрового процесора, який більше відповідає реальним ЦПУ. Таке архітектурне рішення майже прямо транслюється на команди сучасних CPU. Це суттєво зменшує операції з перетворення. За рахунок зменшення технологічних операцій перетворення, зростає ефективність виконання Lua-скриптів. Стандартна віртуальна машина Lua використовує розподіл пам'яті із прибиранням сміття (аналогічно Java або .NET). 

```lua
print("Вітаю, світе!") -- дві риски для однолінійного коментаря
--[[
    Добавляючи дві квадратні дужки [ і ] з рисками  
	створюються мультирядкові коментарі 
--]]
```

## Типи даних, літерали та функція `type`

Lua is a *dynamically typed language*. That means that variables do not have types; only values do. There are no type definitions in the language. All values carry their own type.

Lua - це *динамічно типізована мова*. 

Тут є вісім базових типів: *nil*, *boolean*, *number*, *string*, *function*, *userdata*, *thread*, та *table*. *Nil* це тип значення **nil**, головна властивість якого відрізнятися від будь-якого іншого значення; зазвичай це представляє собою відсутність корисного значення. *Boolean* це тип значень **false** та **true**. В Lua, обивда значення **nil** та **false** повертають при порівнянні false; будь які інші значення повертають true. *Number* пердставляє чсила real (двойної точності floating-point). Легко побудувати інтерпретаторів Lua, які використовують інші внутрішні представлення для чисел, наприклад, числа з плаваючою комою одинарної точності або повдійні цілі числа. 64-бітні double мають 52 біти зберігання точних значень int; точність машини є не проблема для ints, яким потрібно <52 біт. *String* представлений масивом символів. Lua базується на 8-бітному представленні симовлів у тому числі з 0-м значенням (`'\0'`) (див [2.1](https://www.lua.org/manual/5.0/manual.html#lexical)).

Функції - це *першокласні значення* в Lua. Це означає, що функції можуть зберігатися у змінних, передаватися як аргументи іншим функціям та повертатися як результати. Lua може викликати (і маніпулювати) функціями, написаними в Lua, і функціями, написаними на C  (див [2.5.7](https://www.lua.org/manual/5.0/manual.html#functioncall)).

Тип *userdata* надається, щоб дозволити збереження довільних даних C у змінних Lua. Цей тип відповідає блоку необмеженої пам'яті і не має заздалегідь означених операцій у Lua, за винятком assignment (присвоєння) та тестування ідентичності (identity test). Однак, використовуючи *metatables*, програміст може означити операції для значень даних користувачів (див. [2.8](https://www.lua.org/manual/5.0/manual.html#metatable)). Значення Userdata не можна створювати або змінювати в Lua, лише через C API. Це гарантує цілісність даних, що належать хост-програмі.

Тип *thread* представляє собою незалежні потоки виконання, і він використовується для реалізації співпрограми (coroutines).

Тип *table* (таблиця) реалізує асоціативні масиви, тобто масиви, які можна індексувати не тільки цифрами, але і будь-яким значенням (крім **nil**). Більше того, таблиці можуть бути *heterogeneous* (неоднорідними), тобто вони можуть містити значення всіх типів (крім **nil**). Таблиці - єдиний механізм структурування даних в Lua; їх можна використовувати для представлення звичайних масивів, таблиць символів, наборів, записів, графіків, дерев тощо. Для подання записів Lua використовує назву поля як індекс. Мова підтримує це подання, надаючи `a.name` як синтаксичний цукор для ` a ["name"] `. У Луа є кілька зручних способів створення таблиць (див. [2.5.6](https://www.lua.org/manual/5.0/manual.html#tableconstructor)).

Як і індекси, значення таблиці таблиці може бути будь-якого типу (крім **nil**). Зокрема, оскільки функції - це значення першого класу, поля таблиці можуть містити функції. Таким чином, таблиці також можуть містити *методи* (див. [2.5.8](https://www.lua.org/manual/5.0/manual.html#func-def)).

Таблиці, функції та значення userdata - це *об’єкти*: змінні насправді не містять цих значень, лише *посилання* на них. Призначення, передача параметрів і повернення функції завжди маніпулюють посиланнями на такі значення; ці операції не передбачають жодного копіювання.

Бібліотечна функція `type` повертає рядок з описом типу вказаного значення (див [5.1](https://www.lua.org/manual/5.0/manual.html#pdf-type)).

```lua
print (type (nil)) 				--> nil
print (type (true)) 			--> boolean
print (type ("рядок")) 			--> string
print (type (4.5)) 				--> number
print (type ({"це таблиця"})) 	--> table
print (type(io.stdin)) 			--> userdata
print (type(print)) 			--> function
```

## Змінні 

У Lua є три види змінних: глобальні змінні, локальні змінні та поля таблиці. Змінні вважаються глобальними, якщо не оголошені локальними (`local`). Локальні змінні охоплені лексичним колом: до локальних змінних можна вільно дістатися за допомогою функцій, означених всередині їхньої області. 

Перед першим назначенням змінної її значення дорівнює **nil**.

```lua
num = 42
local f = 23.4
s = 'walternate'  -- для strings одинарні лапки
t = "подвійні лапки теж норм"
u = [[ Подвійні квадратні дужки 
       починають і завершують
      мультирядковий string]]
t = nil  -- неозначений t; Lua має збірщика сміття.
```

## Кусок (Chunk) та блоки

Частина програми, що компілюється як єдиний блок називається куском `Chunk`. 

У одному рядку інстуркції можуть розділятися `; `

```lua
a =10; b=12 -- кілька інструкцій через ;
```

Явне виділення куска з коду проводиться блоком, який обмежується операторами`do` `end`. Локальні змінні мають область видимості в межах блоків.

```lua
a = 1
do
    local a = 2 
    print(a) -- 2
end
print(a) -- 1
```

## Вирази

Lua підтримує звичайні арифметичні оператори:  `+` (додавання),` -` (віднімання), `*` (множення),` /` (ділення) та унарне `-` (заперечення). Усі вони працюють з реальними числами.

Lua також пропонує часткову підтримку `^` (експоненція). Однією з дизайнерських цілей Lua є створення крихітного стрижня. Операція експоненціації (реалізована через функцію pow у C) означала б, що нам завжди потрібно зв’язувати Lua з математичною бібліотекою C. Щоб уникнути цієї потреби, ядро Lua пропонує лише синтаксис бінарного оператора `^`, який має більшу перевагу серед усіх операцій. Математична бібліотека (яка є стандартною, але не є частиною ядра Луа) надає цьому оператору очікуване значення.

Порівняння: 

```
 <   >   <=  >=  ==  ~=
```



## If

```lua
-- If clauses:
if num > 40 then
  print('over 40')
elseif s ~= 'walternate' then  -- ~= не дорівнює
  -- перевірка на рівність == подібно JS; ok for strs.
  io.write('not over 40\n')  -- за замовченням виводить в stdout
else
  -- змінні глобальні за замовченням 
  thisIsGlobal = 5  -- поишрений Верблюжий регістр (кілька слів в одному без пробілів з Великої літери)

  -- як створити змінну локальною:
  local line = io.read()  -- зчитує наступний рядок з stdin

  -- конкатенація рядків робиться через оператор .. :
  print('Winter is coming, ' .. line)
end
```
```lua
-- неозначені змінні повертають nil
-- це не є помилкою:
foo = anUnknownVariable  -- тепер foo = nil
```
```lua
aBoolValue = false
```
```lua
-- тільки nil та false є хибними; 0 та '' є істинне!
if not aBoolValue then print('twas false') end
```
```lua
-- 'or' та 'and' є коротко-замкненими
-- Це подібно до оператору a?b:c в C/js:
ans = aBoolValue and 'так' or 'ні'  --> 'ні'
```
## Цикли

```lua
t = {t1 = 23.4, t2 = "45"}
for key, val in pairs(t)  do
    print ("Значення " .. key .. " = " .. val)  
end
--[[ виведе:
Значення t2 = 45
Значення t1 = 234
--]]
```

```lua
karlSum = 0
for i = 1, 100 do  -- діапазон включає обидва кінця 
  karlSum = karlSum + i
end
```
```lua
-- використовуйте "100, 1, -1" як діапазон для підрахунку вниз:
fredSum = 0
for j = 100, 1, -1 do fredSum = fredSum + j end
```
```lua
-- в загальному, діапазон задається begin, end[, step]
```
```lua
-- інша конструкція циклу:
repeat
  print('the way of the future')
  num = num - 1
until num == 0
```

## Функції

Функції в Lua є значеннями першого класу, що означає, що функції можна передавати до інших функцій, повертати з них та використовувати замикання. Функції можуть повертати будь-яку кількість значень. Також функцію можна викликати з будь-якою кількістю параметрів: зайві будуть ігноруватись, а тим, яких не вистачає, буде присвоєно значення nil. 

```lua
function fib(n)
  if n < 2 then return 1 end
  return fib(n - 2) + fib(n - 1)
end

-- Closures and anonymous functions are ok:
function adder(x)
  -- The returned function is created when adder is
  -- called, and remembers the value of x:
  return function (y) return x + y end
end
a1 = adder(9)
a2 = adder(36)
print(a1(16))  --> 25
print(a2(64))  --> 100

-- Повернення, виклики функцій та назнчення виконуються у всіх списках
-- які можуть відповідати довжині
-- невідповідні приймачі нульові;
-- несумісні відправники відкидаються.

x, y, z = 1, 2, 3, 4
-- тепер x = 1, y = 2, z = 3, а 4 викдиається

function bar(a, b, c)
  print(a, b, c)
  return 4, 8, 15, 16, 23, 42
end

x, y = bar('zaphod')  --> друкує "zaphod  nil nil"
-- Now x = 4, y = 8, values 15..42 are discarded.

-- Functions are first-class, may be local/global.
-- These are the same:
function f(x) return x * x end
f = function (x) return x * x end

-- And so are these:
local function g(x) return math.sin(x) end
local g; g  = function (x) return math.sin(x) end
-- the 'local g' decl makes g-self-references ok.

-- Trig funcs work in radians, by the way.

-- Calls with one string param don't need parens:
print 'hello'  -- Works fine.
```

### Базові функції

[5.1 – Basic Functions](https://www.lua.org/manual/5.0/manual.html#5.1)

###### `tonumber (e [, base])`

An optional argument specifies the base to interpret the numeral. The base may be any integer between 2 and 36, inclusive. In bases above 10, the letter ``A`´ (in either upper or lower case) represents 10, ``B`´ represents 11, and so forth, with ``Z`´ representing 35. In base 10 (the default), the number may have a decimal part, as well as an optional exponent part (see [2.2.1](https://www.lua.org/manual/5.0/manual.html#coercion)). In other bases, only unsigned integers are accepted.

Намагається перетворити його аргумент в число. Якщо аргументом є вже число або рядок, конвертований у число, то `tonumber` повертає це число; в іншому випадку він повертає **nil**.

Необов’язковий аргумент вказує основу для інтерпретації числа. Основою може бути будь-яке ціле число між 2 і 36 включно. У прикладі вище 10 буква "A" (у верхньому або нижньому регістрі) являє собою 10, `B` являє собою 11 і так далі, а` `Z`` представляє 35. У базі 10 (за замовчуванням ), число може містити десяткову частину, а також необов'язкову частину експонента (див. [2.2.1](https://www.lua.org/manual/5.0/manual.html#coercion)). В інших базах приймаються лише непідписані цілі числа.

### Математині функції

[5.5 – Mathematical Functions](https://www.lua.org/manual/5.0/manual.html#5.5)

### Функції для роботи зі string

[5.3 – String Manipulation](https://www.lua.org/manual/5.0/manual.html#5.3)

###### `string.sub (s, i [, j])`

Returns the substring of `s` that starts at `i` and continues until `j`; `i` and `j` may be negative. If `j` is absent, then it is assumed to be equal to *-1* (which is the same as the string length). In particular, the call `string.sub(s,1,j)` returns a prefix of `s` with length `j`, and `string.sub(s, -i)` returns a suffix of `s` with length `i`.

###### `string.find (s, pattern [, init [, plain]])`

Looks for the first *match* of `pattern` in the string `s`. If it finds one, then `find` returns the indices of `s` where this occurrence starts and ends; otherwise, it returns **nil**. If the pattern specifies captures (see `string.gsub` below), the captured strings are returned as extra results. A third, optional numerical argument `init` specifies where to start the search; it may be negative and its default value is 1. A value of **true** as a fourth, optional argument `plain` turns off the pattern matching facilities, so the function does a plain "find substring" operation, with no characters in `pattern` being considered "magic". Note that if `plain` is given, then `init` must be given too.

###### Patterns

A *character class* is used to represent a set of characters. The following combinations are allowed in describing a character class:

- ***x\*** (where *x* is not one of the magic characters `^$()%.[]*+-?`) --- represents the character *x* itself.

- **`.`** --- (a dot) represents all characters.

- **`%a`** --- represents all letters.

- **`%c`** --- represents all control characters.

- **`%d`** --- represents all digits.

- **`%l`** --- represents all lowercase letters.

- **`%p`** --- represents all punctuation characters.

- **`%s`** --- represents all space characters.

- **`%u`** --- represents all uppercase letters.

- **`%w`** --- represents all alphanumeric characters.

- **`%x`** --- represents all hexadecimal digits.

- **`%z`** --- represents the character with representation 0.

- `%*x*`

   (where 

  x

   is any non-alphanumeric character)  --- represents the character 

  x

  . This is the standard way to escape the magic characters. Any punctuation character (even the non magic) can be preceded by a `

  ```
  %
  ```

  ´ when used to represent itself in a pattern.

  

- `[*set*]`

   --- represents the class which is the union of all characters in 

  set

  . A range of characters may be specified by separating the end characters of the range with a `

  ```
  -
  ```

  ´. All classes 

  ```
  %
  ```

  x

   described above may also be used as components in 

  set

  . All other characters in 

  set

   represent themselves. For example, 

  ```
  [%w_]
  ```

   (or 

  ```
  [_%w]
  ```

  ) represents all alphanumeric characters plus the underscore,

  ```
  [0-7]
  ```

   represents the octal digits, and 

  ```
  [0-7%l%-]
  ```

   represents the octal digits plus the lowercase letters plus the `

  ```
  -
  ```

  ´ character.

  The interaction between ranges and classes is not defined. Therefore, patterns like `[%a-z]` or `[a-%%]` have no meaning.

  

- **`[^\*set\*]`** --- represents the complement of *set*, where *set* is interpreted as above.

For all classes represented by single letters (`%a`, `%c`, etc.), the corresponding uppercase letter represents the complement of the class. For instance, `%S` represents all non-space characters.

The definitions of letter, space, and other character groups depend on the current locale. In particular, the class `[a-z]` may not be equivalent to `%l`. The second form should be preferred for portability.

A *pattern item* may be

-   a single character class, which matches any single character in the class;
-   a single character class followed by ``*`´, which matches 0 or more repetitions of characters in the class. These repetition items will always match the longest possible sequence;
-   a single character class followed by ``+`´, which matches 1 or more repetitions of characters in the class. These repetition items will always match the longest possible sequence;
-   a single character class followed by ``-`´, which also matches 0 or more repetitions of characters in the class. Unlike ``*`´, these repetition items will always match the *shortest* possible sequence;
-   a single character class followed by ``?`´, which matches 0 or 1 occurrence of a character in the class;
-   `%*n*`, for *n* between 1 and 9; such item matches a substring equal to the *n*-th captured string (see below);
-   `%b*xy*`, where *x* and *y* are two distinct characters; such item matches strings that start with *x*, end with *y*, and where the *x* and *y* are *balanced*. This means that, if one reads the string from left to right, counting *+1* for an *x* and *-1* for a *y*, the ending *y* is the first *y* where the count reaches 0. For instance, the item `%b()` matches expressions with balanced parentheses.



A *pattern* is a sequence of pattern items. A ``^`´ at the beginning of a pattern anchors the match at the beginning of the subject string. A ``$`´ at the end of a pattern anchors the match at the end of the subject string. At other positions, ``^`´ and ``$`´ have no special meaning and represent themselves.



A pattern may contain sub-patterns enclosed in parentheses; they describe *captures*. When a match succeeds, the substrings of the subject string that match captures are stored (*captured*) for future use. Captures are numbered according to their left parentheses. For instance, in the pattern `"(a*(.)%w(%s*))"`, the part of the string matching `"a*(.)%w(%s*)"` is stored as the first capture (and therefore has number 1); the character matching `.` is captured with number 2, and the part matching `%s*` has number 3.

As a special case, the empty capture `()` captures the current string position (a number). For instance, if we apply the pattern `"()aa()"` on the string `"flaaap"`, there will be two captures: 3 and 5.

A pattern cannot contain embedded zeros.  Use `%z` instead.

### Функції IO 

https://www.lua.org/manual/5.0/manual.html#5.6

###### `io.input ([file])`

При виклику з ім'ям файлу він відкриває вказаний файл (у текстовому режимі) та встановлює його обробку як вхідний файл за замовчуванням. При виклику з файловим дескриптором він просто встановлює цей дескриптор як файл вводу за замовчуванням. При виклику без параметрів він повертає поточний файл вводу за замовчуванням.

У разі помилок ця функція викликає помилку замість повернення коду помилки.

###### `io.open (filename [, mode])`

Ця функція відкриває файл у режимі, означеному у рядку `mode`. Він повертає новий дескриптор файлу, або, у випадку помилок,  **nil**  плюс повідомлення про помилку.

Режими `mode` може бути одним із наступних:

- **"r"** read mode (the default);
- **"w"** write mode;
- **"a"** append mode;
- **"r+"** update mode, all previous data is preserved;
- **"w+"** update mode, all previous data is erased;
- **"a+"** append update mode, previous data is preserved,  writing is only allowed at the end of file.

Рядок `mode` може також мати в кінці `b`,  який потрібен в деяких системах для відкриття файлу в бінарному режимі. Цей рядок є таким саме, що використовується у стандартній функції C `fopen` . 

###### `file:read (format1, ...)`

Читає файл з дескриптором `file`, відповідно до заданих форматів, які вказують, що читати. Для кожного формату функція повертає рядок (або число) з прочитаними символами, або **nil**, якщо вона не може прочитати дані у визначеному форматі. Коли викликається без форматів, він використовує формат за замовчуванням, який читає весь наступний рядок (див. Нижче).

Доступні настпуні формати:

- **"\*n"** reads a number; this is the only format that returns a number instead of a string.
- **"\*a"** читає весь файл, починаючи з поточного положення. Після закінчення файлу він повертає порожній рядок.
- **"\*l"** reads the next line (skipping the end of line), returning **nil** on end of file. This is the default format.
- ***number\*** reads a string with up to that number of characters, returning **nil** on end of file. If number is zero, it reads nothing and returns an empty string, or **nil** on end of file.

## Таблиці

Таблиці є найважливішим типом даних в Lua і є основою для типів даних користувача, таких як структури, масиви, списки, множини. Таблиця в Lua являє собою набір пар -- (Ключ, Значення). Ключем може бути будь-яке значення окрім nil.

Таблиці не мають фіксованого розміру. Тому можна додавати скільки завгодно елементів в таблицю динамічно. 

```lua
t = { } -- пуста таблиця
t['k'] = 10 -- Ключ k, значення 10
t[20] = " super " -- Ключ 20, значення " super "
t.IP = '192.168.0.1' -- Ключ IP, значення 192.168.0.1 
```

Розмірність списку (одномірного масиву) можна перевірити за допомогою #

```lua
t = {"A", 1}
print (#t) -- виведе 2
```

Таблиці можна використовувати і як звичайні масиви. Для цього варто скористатись записом `t = {'a', 'b', 'c', 'd', 'e'}`, після чого до елементів можна звертатись за індексом: `print(t[2]) --виведе b`. Зверніть увагу, що створені таким чином масиви, починаються з одиниці, а не з нуля, як в більшості інших мов.

```lua
t = {key1 = 'value1', key2 = false}
print(t.key1)  -- Prints 'value1'.
t.newKey = {}  -- добавляє нову пару key/value
t.key2 = nil   -- видалити key2 з таблиці
-- Literal notation for any (non-nil) value as key:
u = {['@!#'] = 'qbert', [{}] = 1729, [6.28] = 'tau'}
print(u[6.28])  -- prints "tau"
a = u['@!#']  -- тепер a = 'qbert'.
b = u[{}]     -- Ми можемо очікувати 1729, але тут буде nil:
[[ b = nil since the lookup fails. It fails
because the key we used is not the same object
as the one used to store the original value. So
strings & numbers are more portable keys.]]

-- Виклик функції однієї таблиці-парам не потребує паронів
function h(x) print(x.key1) end
h{key1 = 'Sonmi~451'}  -- Prints 'Sonmi~451'.
```
Для виводу пар -- (Ключ, Значення) з таблиці на екран скористайтесь циклом `for`, базовою функцією `pairs()`  та функцією `print()`:  

```lua
for key, val in pairs(t)  do
    print(key, val)
end
```

В результаті отримаємо пари: 

```lua
20   super
k   10
IP   192.168.0.1
```

Таблиці можна використовувати і як звичайні масиви. Для цього варто скористатись записом `t = {'a', 'b', 'c', 'd', 'e'}`, після чого до елементів можна звертатись за індексом:

```lua
t = {'a', 'b', 'c', 'd', 'e'}
print(t[2]) --виведе b`
```

Зверніть увагу, що створені таким чином масиви, починаються з одиниці, а не з нуля, як в більшості інших мов.

```lua
for key, val in pairs(u) do  -- Table iteration.
  print(key, val)
end
```
```lua
-- _G is a special table of all globals.
print(_G['_G'] == _G)  -- Prints 'true'.
```
```lua
-- Використання таблиць як списків / масивів:
-- Список літералів неявно налаштованих ключів int:
v = {'value1', 'value2', 1.21, 'gigawatts'}
for i = 1, #v do  -- #v is the size of v for lists.
  print(v[i])  -- починаючи з 1
end
-- "Список" не є реальним типом. v - просто таблиця
-- із послідовними цілими ключами, які трактуються як список.
```

### Функції для роботи з таблицями

[Table Manipulation](https://www.lua.org/manual/5.3/manual.html#6.6)

This library provides generic functions for table manipulation. It provides all its functions inside the table `table`.

Remember that, whenever an operation needs the length of a table, all caveats about the length operator apply (see [§3.4.7](https://www.lua.org/manual/5.3/manual.html#3.4.7)). All functions ignore non-numeric keys in the tables given as arguments.

###### `table.concat (list [, sep [, i [, j]]])`

Given a list where all elements are strings or numbers, returns the string `list[i]..sep..list[i+1] ··· sep..list[j]`. The default value for `sep` is the empty string, the default for `i` is 1, and the default for `j` is `#list`. If `i` is greater than `j`, returns the empty string.

###### `table.insert (list, [pos,] value)`

Inserts element `value` at position `pos` in `list`, shifting up the elements `list[pos], list[pos+1], ···, list[#list]`. The default value for `pos` is `#list+1`, so that a call `table.insert(t,x)` inserts `x` at the end of list `t`.

###### `table.move (a1, f, e, t [,a2])`

Moves elements from table `a1` to table `a2`, performing the equivalent to the following multiple assignment: `a2[t],··· = a1[f],···,a1[e]`. The default for `a2` is `a1`. The destination range can overlap with the source range. The number of elements to be moved must fit in a Lua integer.

Returns the destination table `a2`.

###### `table.pack (···)`

Returns a new table with all arguments stored into keys 1, 2, etc. and with a field "`n`" with the total number of arguments. Note that the resulting table may not be a sequence.

###### `table.remove (list [, pos])`

Removes from `list` the element at position `pos`, returning the value of the removed element. When `pos` is an integer between 1 and `#list`, it shifts down the elements `list[pos+1], list[pos+2], ···, list[#list]` and erases element `list[#list]`; The index `pos` can also be 0 when `#list` is 0, or `#list + 1`; in those cases, the function erases the element `list[pos]`.

The default value for `pos` is `#list`, so that a call `table.remove(l)` removes the last element of list `l`.

###### `table.sort (list [, comp])`

Sorts list elements in a given order, *in-place*, from `list[1]` to `list[#list]`. If `comp` is given, then it must be a function that receives two list elements and returns true when the first element must come before the second in the final order (so that, after the sort, `i < j` implies `not comp(list[j],list[i])`). If `comp` is not given, then the standard Lua operator `<` is used instead.

Note that the `comp` function must define a strict partial order over the elements in the list; that is, it must be asymmetric and transitive. Otherwise, no valid sort may be possible.

The sort algorithm is not stable: elements considered equal by the given order may have their relative positions changed by the sort.

###### `table.unpack (list [, i [, j]])`

Returns the elements from the given list. This function is equivalent to

```
return list[i], list[i+1], ···, list[j]
```

By default, `i` is 1 and `j` is `#list`.



### Metatables and metamethods.

```lua
-- Таблиця може мати метатаблицю, яка дає таблицю
-- поведінка з перевантаженням оператора. Пізніше ми побачимо
-- як метатаблиці підтримують поведінку прототипів js.

f1 = {a = 1, b = 2}  -- Represents the fraction a/b.
f2 = {a = 2, b = 3}

-- This would fail:
-- s = f1 + f2

metafraction = {}
function metafraction.__add(f1, f2)
  sum = {}
  sum.b = f1.b * f2.b
  sum.a = f1.a * f2.b + f2.a * f1.b
  return sum
end

setmetatable(f1, metafraction)
setmetatable(f2, metafraction)

s = f1 + f2  -- call __add(f1, f2) on f1's metatable

-- f1, f2 have no key for their metatable, unlike
-- prototypes in js, so you must retrieve it as in
-- getmetatable(f1). The metatable is a normal table
-- with keys that Lua knows about, like __add.

-- But the next line fails since s has no metatable:
-- t = s + s
-- Class-like patterns given below would fix this.

-- An __index on a metatable overloads dot lookups:
defaultFavs = {animal = 'gru', food = 'donuts'}
myFavs = {food = 'pizza'}
setmetatable(myFavs, {__index = defaultFavs})
eatenBy = myFavs.animal  -- works! thanks, metatable

-- Direct table lookups that fail will retry using
-- the metatable's __index value, and this recurses.

-- An __index value can also be a function(tbl, key)
-- for more customized lookups.

-- Values of __index,add, .. are called metamethods.
-- Full list. Here a is a table with the metamethod.

-- __add(a, b)                     for a + b
-- __sub(a, b)                     for a - b
-- __mul(a, b)                     for a * b
-- __div(a, b)                     for a / b
-- __mod(a, b)                     for a % b
-- __pow(a, b)                     for a ^ b
-- __unm(a)                        for -a
-- __concat(a, b)                  for a .. b
-- __len(a)                        for #a
-- __eq(a, b)                      for a == b
-- __lt(a, b)                      for a < b
-- __le(a, b)                      for a <= b
-- __index(a, b)  <fn or a table>  for a.b
-- __newindex(a, b, c)             for a.b = c
-- __call(a, ...)                  for a(...)
```

### Class-like tables and inheritance.

```lua
-- Classes aren't built in; there are different ways
-- to make them using tables and metatables.

-- Explanation for this example is below it.

Dog = {}                                   -- 1.

function Dog:new()                         -- 2.
  newObj = {sound = 'woof'}                -- 3.
  self.__index = self                      -- 4.
  return setmetatable(newObj, self)        -- 5.
end

function Dog:makeSound()                   -- 6.
  print('I say ' .. self.sound)
end

mrDog = Dog:new()                          -- 7.
mrDog:makeSound()  -- 'I say woof'         -- 8.

-- 1. Dog acts like a class; it's really a table.
-- 2. function tablename:fn(...) is the same as
--    function tablename.fn(self, ...)
--    The : just adds a first arg called self.
--    Read 7 & 8 below for how self gets its value.
-- 3. newObj will be an instance of class Dog.
-- 4. self = the class being instantiated. Often
--    self = Dog, but inheritance can change it.
--    newObj gets self's functions when we set both
--    newObj's metatable and self's __index to self.
-- 5. Reminder: setmetatable returns its first arg.
-- 6. The : works as in 2, but this time we expect
--    self to be an instance instead of a class.
-- 7. Same as Dog.new(Dog), so self = Dog in new().
-- 8. Same as mrDog.makeSound(mrDog); self = mrDog.

----------------------------------------------------

-- Inheritance example:

LoudDog = Dog:new()                           -- 1.

function LoudDog:makeSound()
  s = self.sound .. ' '                       -- 2.
  print(s .. s .. s)
end

seymour = LoudDog:new()                       -- 3.
seymour:makeSound()  -- 'woof woof woof'      -- 4.

-- 1. LoudDog gets Dog's methods and variables.
-- 2. self has a 'sound' key from new(), see 3.
-- 3. Same as LoudDog.new(LoudDog), and converted to
--    Dog.new(LoudDog) as LoudDog has no 'new' key,
--    but does have __index = Dog on its metatable.
--    Result: seymour's metatable is LoudDog, and
--    LoudDog.__index = LoudDog. So seymour.key will
--    = seymour.key, LoudDog.key, Dog.key, whichever
--    table is the first with the given key.
-- 4. The 'makeSound' key is found in LoudDog; this
--    is the same as LoudDog.makeSound(seymour).

-- If needed, a subclass's new() is like the base's:
function LoudDog:new()
  newObj = {}
  -- set up newObj
  self.__index = self
  return setmetatable(newObj, self)
end
```

## 4. Modules.

```lua
--[[ I'm commenting out this section so the rest of
--   this script remains runnable.

-- Suppose the file mod.lua looks like this:
local M = {}

local function sayMyName()
  print('Hrunkner')
end

function M.sayHello()
  print('Why hello there')
  sayMyName()
end

return M

-- Another file can use mod.lua's functionality:
local mod = require('mod')  -- Run the file mod.lua.

-- require is the standard way to include modules.
-- require acts like:     (if not cached; see below)
local mod = (function ()
  <contents of mod.lua>
end)()
-- It's like mod.lua is a function body, so that
-- locals inside mod.lua are invisible outside it.

-- This works because mod here = M in mod.lua:
mod.sayHello()  -- Says hello to Hrunkner.

-- This is wrong; sayMyName only exists in mod.lua:
mod.sayMyName()  -- error

-- require's return values are cached so a file is
-- run at most once, even when require'd many times.

-- Suppose mod2.lua contains "print('Hi!')".
local a = require('mod2')  -- Prints Hi!
local b = require('mod2')  -- Doesn't print; a=b.

-- dofile is like require without caching:
dofile('mod2.lua')  --> Hi!
dofile('mod2.lua')  --> Hi! (runs it again)

-- loadfile loads a lua file but doesn't run it yet.
f = loadfile('mod2.lua')  -- Call f() to run it.

-- loadstring is loadfile for strings.
g = loadstring('print(343)')  -- Returns a function.
g()  -- Prints out 343; nothing printed before now.

--]]
```

## 5.References

```lua
--[[

I was excited to learn Lua so I could make games
with the Löve 2D game engine. That's the why.

I started with BlackBulletIV's Lua for programmers.
Next I read the official Programming in Lua book.
That's the how.

It might be helpful to check out the Lua short
reference on lua-users.org.

The main topics not covered are standard libraries:
 * string library
 * table library
 * math library
 * io library
 * os library

By the way, this entire file is valid Lua; save it
as learn.lua and run it with "lua learn.lua" !

This was first written for tylerneylon.com. It's
also available as a github gist. Tutorials for other
languages, in the same style as this one, are here:

http://learnxinyminutes.com/

Have fun with Lua!

--]]
```

