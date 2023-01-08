## Scripting language manual

https://wiki.mikrotik.com/wiki/Manual:Scripting

У цьому посібнику представлено введення у вбудовану потужну мову сценаріїв RouterOS. Хост сценаріїв надає спосіб автоматизувати деякі завдання обслуговування маршрутизатора за допомогою виконання визначених користувачем сценаріїв, прив’язаних до певної події. Сценарії можна зберігати в [сховищі сценаріїв](https://wiki.mikrotik.com/wiki/Manual:Scripting#Script_repository) або записувати безпосередньо на [консоль](https://wiki.mikrotik.com/wiki/ Керівництво: консоль). Події, які використовуються для ініціювання виконання сценарію, включають, але не обмежуються [Системним планувальником](https://wiki.mikrotik.com/wiki/Manual:System/Scheduler), [Інструментом моніторингу трафіку](https:// wiki.mikrotik.com/wiki/Manual:Tools/Traffic_Monitor) і [Netwatch Tool](https://wiki.mikrotik.com/wiki/Manual:Tools/Netwatch) згенеровані події.

Якщо ви вже знайомі зі сценаріями в RouterOS, ви можете переглянути наші [Поради та підказки](https://wiki.mikrotik.com/wiki/Manual:Scripting_Tips_and_Tricks).

### Line structure

Сценарій RouterOS розділений на кілька командних рядків. Командні рядки виконуються один за одним до кінця сценарію або до появи помилки під час виконання.

#### Command line

Консоль RouterOS використовує наступний синтаксис команд:

```bash
[prefix] [path] command [uparam] [param=[value]] .. [param=[value]]
```

- [prefix] - Символ `:` або `/`, який вказує, чи це є команда [ICE](https://wiki.mikrotik.com/wiki/Manual:Scripting#Commands) чи шлях. Може бути потрібним або не обов’язковим.
- [path] - відносний шлях до потрібного рівня меню. Може бути потрібним або не обов’язковим.
- command - одна з [команд](https://wiki.mikrotik.com/wiki/Manual:Scripting#Commands), доступна на зазначеному рівні меню.
- [uparam] - безіменний параметр, необхідно вказати, якщо цього вимагає команда.
- [params] - іменовані параметри, за якими йдуть відповідні значення

Кінець командного рядка позначається маркером `;` або `NEWLINE`. Іноді `;` або `NEWLINE` не потрібні для завершення командного рядка. 

Одна команда всередині `(), [] або {}` не потребує символу кінця команди. Кінець команди визначається вмістом усього сценарію

```bash
:if ( true ) do={ :put "lala" }
```

Кожен командний рядок усередині іншого командного рядка починається та закінчується квадратними дужками `[ ]` [(об’єднання команд)](https://wiki.mikrotik.com/wiki/Manual:Scripting#Other_Operators).

```bash
:put [/ip route get [find gateway=1.1.1.1]];  
```

Зверніть увагу, що код вище містить три командні рядки:

- `:put` 
- `/ip route get`
-  `find gateway=1.1.1.1`

Командний рядок можна створити з кількох фізичних рядків, дотримуючись [правил з’єднання рядків](https://wiki.mikrotik.com/wiki/Manual:Scripting#Line_joining).

#### Physical Line

Фізичний рядок — це послідовність символів, що завершується послідовністю кінця рядка (EOL). Можна використовувати будь-яку зі стандартних послідовностей завершення лінії платформи:

- **unix** – ASCII LF;
- **windows** – ASCII CR LF;
- **mac** – ASCII CR;

Можна використовувати стандартні угоди C для символів нового рядка (символ `\n`).

#### Comments

Коментар починається з символу решітки (`#`) і закінчується в кінці фізичного рядка. Пробіли або будь-які інші символи не допускаються перед символом решетки. Коментарі ігноруються синтаксисом. Якщо в рядку з’являється символ (`#`), це не вважається коментарем. Приклад:

```bash
# this is a comment
 # bad comment
:global a; # bad comment

:global myStr "lala # this is not a comment"
```

#### Правила з'єднання рядків

Два або більше фізичних рядка можна об’єднати в логічні рядки за допомогою символу зворотної косої риски (`\`). Рядок, який закінчується зворотною скісною рискою, не може містити коментаря. Зворотна коса риска не продовжує коментар. Зворотний слеш не продовжує лексему, за винятком рядкових літералів. Зворотний слеш неприпустимий в іншому місці рядка за межами рядкового літералу. Приклад:

```bash
:if ($a = true \
      and $b=false) do={ :put “$a $b”; }

:if ($a = true \      # bad comment
      and $b=false) do={ :put “$a $b”; }

# comment \
    continued – invalid  (syntax error)
```

#### Пробіли між маркерами

Для розділення токенів можна використовувати пробіли. Пробіл необхідний між двома лексемами лише в тому випадку, якщо їх конкатенація може бути інтерпретована як інша лексема. приклад:

```bash
{ 
   :local a true; :local b false;	
# whitespace is not required	
   :put (a&&b); 
# whitespace is required
   :put (a and b); 	
}
```

Пробіли заборонені

- між`<parameter>=`
- між `from=` `to=` `step=` `in=` `do=` `else=`

Приклад:

```bash
#incorrect:
:for i from = 1 to = 2 do = { :put $i }
#correct syntax:
:for i from=1 to=2 do={ :put $i }
:for i from= 1 to= 2 do={ :put $i }	

#incorrect
/ip route add gateway = 3.3.3.3
#correct
/ip route add gateway=3.3.3.3
```

#### Scopes

Змінні можна використовувати лише в певних областях сценарію. Ці регіони називаються областями. Область визначає видимість змінної. Існує два типи областей – глобальна та локальна. Змінна, оголошена в блоці, доступна лише в цьому блоці та блоках, що входять до нього, і лише після точки оголошення.

##### Global scope

Глобальна або коренева область є областю сценарію за замовчуванням. Він створюється автоматично і не може бути відключений.

##### Local scope

Користувач може визначити власні групи для блокування доступу до певних змінних, ці області називаються локальними областями. Кожна локальна область береться у фігурні дужки (`{ }`).

```bash
{
   :local a 3;
   {
      :local b 4;
      :put ($a+$b);
   }
#line below will show variable b in light red color since it is not defined in scope
   :put ($a+$b);
}
```

У наведеному вище коді змінна b має локальну область і не буде доступна після закритої фігурної дужки.

**Примітка:** Кожен рядок, написаний у терміналі, розглядається як локальна область
Так, наприклад, визначена локальна змінна не буде видимою в наступному командному рядку та спричинить синтаксичну помилку

```bash
[admin@MikroTik] > :local myVar a;
[admin@MikroTik] > :put $myVar
syntax error (line 1 column 7)
```

**Попередження:** **Не визначайте глобальні змінні в локальних областях.**

Зауважте, що навіть змінну можна визначити як глобальну, вона буде доступна лише з її області, якщо вона ще не визначена.

```bash
{
   :local a 3;
   {
       :global b 4;
   }
   :put ($a+$b);
}
```

Код вище створить помилку.

#### Keywords

Наступні слова є ключовими словами і не можуть використовуватися як імена змінних і функцій:

```bash
and       or       in
```

#### Delimiters

Наступні лексеми служать роздільниками в граматиці:

```bash
()  []  {}  :   ;   $   / 
```

### Data types

Мова сценаріїв RouterOS має такі типи даних:

| Type                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **num (number)**     | - 64bit signed integer, possible hexadecimal input;          |
| **bool (boolean)**   | - values can bee `true` or `false`;                          |
| **str (string)**     | - character sequence;                                        |
| **ip**               | - IP address;                                                |
| **ip-prefix**        | - IP prefix;                                                 |
| **ip6**              | - IPv6 address                                               |
| **ip6-prefix**       | - IPv6 prefix                                                |
| **id (internal ID)** | - hexadecimal value prefixed by '*' sign. Each menu item has assigned unique number - internal ID; |
| **time**             | - date and time value;                                       |
| **array**            | - sequence of values organized in an array;                  |
| **nil**              | - default variable type if no value is assigned;             |

#### Constant Escape Sequences

Наступні керуючі послідовності можна використовувати для визначення певного спеціального символу в рядку:

| **\"**  | Insert double quote                                          |
| ------- | ------------------------------------------------------------ |
| **\\**  | Insert backslash                                             |
| **\n**  | Insert newline                                               |
| **\r**  | Insert carriage return                                       |
| **\t**  | Insert horizontal tab                                        |
| **\$**  | Output $ character. Otherwise $ is used to link variable.    |
| **\?**  | Output ? character. Otherwise ? is used to print "help" in console. |
| **\_**  | - space                                                      |
| **\a**  | - BEL (0x07)                                                 |
| **\b**  | - backspace (0x08)                                           |
| **\f**  | - form feed (0xFF)                                           |
| **\v**  | Insert vertical tab                                          |
| **\xx** | Print character from hex value. Hex number should use capital letters. |

```bash
:put "\48\45\4C\4C\4F\r\nThis\r\nis\r\na\r\ntest";
```

який буде показано на дисплеї
 ` HELLO This is a test `

### Operators

#### Arithmetic Operators

У мові сценаріїв RouterOS підтримуються звичайні арифметичні оператори

| Operator | Description           | Example                        |
| -------- | --------------------- | ------------------------------ |
| **"+"**  | binary addition       | `:put (3+4);`                  |
| **"-"**  | binary subtraction    | `:put (1-6);`                  |
| **"\*"** | binary multiplication | `:put (4*5);`                  |
| **"/"**  | binary division       | `:put (10 / 2); :put ((10)/2)` |
| **"%"**  | modulo operation      | `:put (5 % 3);`                |
| **"-"**  | unary negation        | `{ :local a 1; :put (-a); }`   |

**Примітка:** щоб ділення працювало, ви повинні використовувати дужки або пробіли навколо ділення, щоб його не прийняти за IP-адресу

#### Relational Operators

| Operator | Description      | Example       |
| -------- | ---------------- | ------------- |
| **"<"**  | less             | `:put (3<4);` |
| **">"**  | greater          | `:put (3>4);` |
| **"="**  | equal            | `:put (2=2);` |
| **"<="** | less or equal    |               |
| **">="** | greater or equal |               |
| **"!="** | not equal        |               |

#### Logical Operators

| Operator          | Description | Example                           |
| ----------------- | ----------- | --------------------------------- |
| **“!”**           | logical NOT | `:put (!true);`                   |
| **“&&” , “and”**  | logical AND | `:put (true&&true)`               |
| **“\|\|” , “or”** | logical OR  | `:put (true||false);`             |
| **“in”**          |             | `:put (1.1.1.1/32 in 1.0.0.0/8);` |

#### Bitwise Operators

Побітові оператори працюють над номерами, IP та адресами IPv6 [типами даних](https://wiki.mikrotik.com/wiki/Manual:Scripting#Data_types).

| Operator | Description                                                  | Example                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **“~”**  | bit inversion                                                | `:put (~0.0.0.0)` `:put (~::ffff)`                           |
| **“\|”** | bitwise OR. Performs logical OR operation on each pair of  corresponding bits. In each pair the result is “1” if one of bits or  both bits are “1”, otherwise the result is “0”. | `:put (192.168.88.0|0.0.0.255)` `:put (2001::1|::ffff)`      |
| **“^”**  | bitwise XOR. The same as OR, but the result in each position is “1” if two bits are not equal, and “0” if bits are equal. | `:put (1.1.1.1^255.255.0.0)` `:put (2001::ffff:1^::ffff:0)`  |
| **“&”**  | bitwise AND. In each pair the result is “1” if first and second bit is “1”. Otherwise the result is “0”. | `:put (192.168.88.77&255.255.255.0)` `:put (2001::1111&ffff::)` |
| **“<<”** | left shift by given amount of bits, not supported for IPv6 address data type | `:put (192.168.88.77<<8)`                                    |
| **“>>”** | right shift by given amount of bits, not supported for IPv6 address data type | `:put (192.168.88.77>>24)`                                   |

Обчисліть адресу підмережі на основі заданої IP-адреси та маски мережі CIDR за допомогою оператора "&":

```bash
{
:local IP 192.168.88.77;
:local CIDRnetmask 255.255.255.0;
:put ($IP&$CIDRnetmask);
}
```

Get last 8 bits from given IP addresses:

```bash
:put (192.168.88.77&0.0.0.255);
```

Use "|" operator and inverted CIDR mask to calculate the broadcast address:

```bash
{
:local IP 192.168.88.77;
:local Network 192.168.88.0;
:local CIDRnetmask 255.255.255.0;
:local InvertedCIDR (~$CIDRnetmask);
:put ($Network|$InvertedCIDR)
}
```

#### Concatenation Operators

| Operator | Description                                      | Example                                  |
| -------- | ------------------------------------------------ | ---------------------------------------- |
| `.`      | concatenates two strings                         | `:put (“concatenate” . “ “ . “string”);` |
| `,`      | concatenates two arrays or adds element to array | `:put ({1;2;3} , 5 );`                   |

 It is possible to add variable values to strings without concatenation operator:

```bash
:global myVar "world";

:put ("Hello " . $myVar);
# next line does the same as above
:put "Hello $myVar";
```

By using $[] and $() in string it is possible to add expressions inside strings:

```bash
:local a 5;
:local b 6;
:put " 5x6 = $($a * $b)";

:put " We have $[ :len [/ip route find] ] routes";
```

#### Other Operators

| Operator | Description                                                  | Example                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **“[]”** | command substitution. Can contain only single command line   | `:put [ :len "my test string"; ];`                           |
| **“()”** | sub expression or grouping operator                          | `:put ( "value is " . (4+5));`                               |
| **“$”**  | substitution operator                                        | `:global a 5; :put $a;`                                      |
| **“~”**  | binary operator that matches value against POSIX extended regular expression | Print all routes which gateway ends with 202  `/ip route print where gateway~"^[0-9 \\.]*202\$"` |
| **“->”** | Get an array element by key                                  | `[admin@x86] >:global aaa {a=1;b=2} [admin@x86] > :put ($aaa->"a") 1 [admin@x86] > :put ($aaa->"b") 2` |

### Variables

Мова сценаріїв має два типи змінних:

-  global - accessible from all scripts created by current user, defined by [global](https://wiki.mikrotik.com/wiki/Manual:Scripting#Global_commands) keyword;
-  local - accessible only within the current [scope](https://wiki.mikrotik.com/wiki/Manual:Scripting#Scopes), defined by [local](https://wiki.mikrotik.com/wiki/Manual:Scripting#Global_commands) keyword. 

**Примітка:** Починаючи з версії 6.2 можуть бути невизначені змінні. Якщо змінна не визначена, синтаксичний аналізатор намагатиметься знайти змінні, встановлені, наприклад, сценарієм оренди [ DHCP](https://wiki.mikrotik.com/wiki/Manual:IP/DHCP_Server) або [Hotspot](https:/ /wiki.mikrotik.com/wiki/Hotspot) під час входу

**Примітка.** Розмір значення змінної обмежено 4096 байтами

Кожна змінна, за винятком вбудованих змінних RouterOS, повинна бути оголошена перед використанням локальними або глобальними ключовими словами. Невизначені змінні будуть позначені як невизначені, що призведе до помилки компіляції. приклад:

```bash
# following code will result in compilation error, because myVar is used without declaration
:set myVar "my value";
:put $myVar
```

Correct code:

```bash
:local myVar;
:set myVar "my value";
:put $myVar;
```

Винятком є використання змінних, встановлених, наприклад, сценарієм оренди DHCP

```bash
/system script
add name=myLeaseScript policy=\
    ftp,reboot,read,write,policy,test,winbox,password,sniff,sensitive,api \
    source=":log info \$leaseActIP\r\
    \n:log info \$leaseActMAC\r\
    \n:log info \$leaseServerName\r\
    \n:log info \$leaseBound"

/ip dhcp-server set  myServer lease-script=myLeaseScript
```

Valid characters in variable names are letters and digits. If  variable name contains any other character, then variable name should be put in double quotes. Example:

```bash
#valid variable name
:local myVar;  
#invalid variable name
:local my-var; 
#valid because double quoted
:global "my-var"; 
```

Якщо змінна спочатку визначена без значення, тоді [тип даних змінної](https://wiki.mikrotik.com/wiki/Manual:Scripting#Data_types) встановлюється на *nil*, інакше тип даних визначається автоматично механізмом сценаріїв. Іноді потрібне перетворення одного типу даних в інший. Це можна досягти за допомогою [команд перетворення даних](https://wiki.mikrotik.com/wiki/Manual:Scripting#Global_commands). приклад:

```bash
#convert string to array
:local myStr "1,2,3,4,5";
:put [:typeof $myStr];
:local myArr [:toarray $myStr];
:put [:typeof $myArr]
```

Імена змінних чутливі до регістру.

```bash
:local myVar "hello"
# following line will generate error, because variable myVAr is not defined
:put $myVAr
# correct code
:put $myVar
```

Команда Set без значення скасує визначення змінної (вилучити з середовища, нове у v6.2)

```bash
#remove variable from environment
:global myVar "myValue"
:set myVar;
```

#### Reserved variable names

Усі вбудовані властивості RouterOS є зарезервованими змінними. Змінні, які будуть визначені так само, як вбудовані властивості RouterOS, можуть викликати помилки. Щоб уникнути таких помилок, використовуйте власні позначення.

Наприклад, такий сценарій не працюватиме:

```bash
{
:local type "ether1";
/interface print where name=$type;
} 
```

Але працюватиме з іншою визначеною змінною:

```bash
{
:local customname "ether1";
/interface print where name=$customname;
} 
```

### Commands

#### Global commands

Кожна глобальна команда має починатися з маркера *":"*, інакше вона розглядатиметься як змінна.

| Command         | Syntax                       | Description                                                  | Example                                                      |
| --------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **/**           |                              | go to root menu                                              |                                                              |
| **..**          |                              | go back by one menu level                                    |                                                              |
| **?**           |                              | list all available menu commands and brief descriptions      |                                                              |
| **global**      | `:global <var> [<value>]`    | define global variable                                       | `:global myVar "something"; :put $myVar;`                    |
| **local**       | `:local <var> [<value>]`     | define local variable                                        | `{ :local myLocalVar "I am local"; :put $myVar; }`           |
| **beep**        | `:beep <freq> <length>`      | beep built in speaker                                        | ``                                                           |
| **delay**       | `:delay <time>`              | do nothing for a given period of time                        | ``                                                           |
| **put**         | `:put <expression>`          | помістити наданий аргумент на консоль                        | ``                                                           |
| **len**         | `:len <expression>`          | return string length or array element count                  | `:put [:len "length=8"];`                                    |
| **typeof**      | `:typeof <var>`              | return data type of variable                                 | `:put [:typeof 4];`                                          |
| **pick**        | `:pick <var> <start>[<end>]` | return range of elements or substring. If end position is not specified, will return only one element from an array. | `:put [:pick "abcde" 1 3]`                                   |
| **log**         | `:log <topic> <message>`     | write message to [ system log](https://wiki.mikrotik.com/wiki/Log). Available topics are `"debug, error, info and warning"` | `:log info "Hello from script";`                             |
| **time**        | `:time <expression>`         | return interval of time needed to execute command            | `:put [:time {:for i from=1 to=10 do={ :delay 100ms }}];`    |
| **set**         | `:set <var> [<value>]`       | присвоїти значення оголошеній змінній.                       | `:global a; :set a true;`                                    |
| **find**        | `:find <arg> <arg> <start>`  | return position of substring or array element                | `:put [:find "abc" "a" -1];`                                 |
| **environment** | `:environment print <start>` | print initialized variable information                       | `:global myVar true; :environment print;`                    |
| **terminal**    | ``                           | terminal related commands                                    | ``                                                           |
| **error**       | `:error <output> `           | Generate console error and stop executing the script         | ``                                                           |
| **execute**     | `:execute <expression> `     | Виконує сценарій у фоновому режимі. Результат можна записати у файл, встановивши параметр file. | `{ :local j [:execute {/interface print follow where [:log info ~Sname~]}]; :delay 10s; :do { /system script job remove $j } on-error={} }` |
| **parse**       | `:parse <expression> `       | parse string and return parsed console commands. Can be used as function. | `:global myFunc [:parse ":put hello!"];  $myFunc;`           |
| **resolve**     | `:resolve <arg> `            | return IP address of given DNS name                          | `:put [:resolve "www.mikrotik.com"];`                        |
| **toarray**     | `:toarray <var> `            | convert variable to array                                    | ``                                                           |
| **tobool**      | `:tobool <var> `             | convert variable to boolean                                  | ``                                                           |
| **toid**        | `:toid <var> `               | convert variable to internal ID                              | ``                                                           |
| **toip**        | `:toip <var> `               | convert variable to IP address                               | ``                                                           |
| **toip6**       | `:toip6 <var> `              | convert variable to IPv6 address                             | ``                                                           |
| **tonum**       | `:tonum <var> `              | convert variable to integer                                  | ``                                                           |
| **tostr**       | `:tostr <var> `              | convert variable to string                                   | ``                                                           |
| **totime**      | `:totime <var> `             | convert variable to time                                     | ``                                                           |

#### Menu specific commands

##### Common commands

У більшості підменю доступні такі команди:

| Command     | Syntax                                       | Description                                                  |
| ----------- | -------------------------------------------- | ------------------------------------------------------------ |
| **add**     | ` add <param>=<value>..<param>=<value>`      | add new item                                                 |
| **remove**  | ` remove <id>`                               | remove selected item                                         |
| **enable**  | ` enable <id>`                               | enable selected item                                         |
| **disable** | ` disable <id>`                              | disable selected item                                        |
| **set**     | ` set <id> <param>=<value>..<param>=<value>` | change selected items parameter, more than one parameter can be  specified at the time. Parameter can be unset by specifying '!' before  parameter.   Example:   `/ip firewall filter add chain=blah action=accept protocol=tcp port=123 nth=4,2  print  set 0 !port chain=blah2 !nth protocol=udp `` ` |
| **get**     | ` get <id> <param>=<value>`                  | get selected items parameter value                           |
| **print**   | ` print <param><param>=[<value>]`            | print menu items. Output depends on print parameters specified. Most common print parameters are described [here](https://wiki.mikrotik.com/wiki/Manual:Scripting#print_parameters) |
| **export**  | ` export [file=<value>]`                     | export configuration from current menu and its sub-menus (if  present). If file parameter is specified output will be written to file  with extension '.rsc', otherwise output will be printed to console.  Exported commands can be imported by [import command](https://wiki.mikrotik.com/wiki/Manual:Scripting#import) |
| **edit**    | ` edit <id> <param>`                         | edit selected items property in built-in [text editor](https://wiki.mikrotik.com/index.php?title=Text_editor&action=edit&redlink=1) |
| **find**    | ` find <expression>`                         | Returns list of internal numbers for items that are matched by given expression. For example: ` :put [/interface find name~"ether"]` |

##### import

Команда імпорту доступна з кореневого меню та використовується для імпорту конфігурації з файлів, створених командою [export](https://wiki.mikrotik.com/wiki/Manual:Scripting#Common_commands) або написаних вручну вручну.

##### print parameters

Several parameters are available for print command:

| Parameter          | Description                                                  | Example                                    |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| **append**         |                                                              | ``                                         |
| **as-value**       | print output as an array of parameters and its values        | `:put [/ip address print as-value]`        |
| **brief**          | print brief description                                      | ``                                         |
| **detail**         | print detailed description, output is not as readable as brief output, but may be useful to view all parameters | ``                                         |
| **count-only**     | print only count of menu items                               | ``                                         |
| **file**           | print output to file                                         | ``                                         |
| **follow**         | print all current entries and track new entries until ctrl-c is pressed, very useful when viewing log entries | `/log print follow`                        |
| **follow-only**    | print and track only new entries until ctrl-c is pressed, very useful when viewing log entries | `/log print follow-only`                   |
| **from**           | print parameters only from specified item                    | `/user print from=admin`                   |
| **interval**       | continuously print output in selected time interval, useful to track down changes where `follow` is not acceptable | `/interface print interval=2`              |
| **terse**          | show details in compact and machine friendly format          | ``                                         |
| **value-list**     | show values one per line (good for parsing purposes)         | ``                                         |
| **without-paging** | If output do not fit in console screen then do not stop, print all information in one piece | ``                                         |
| **where**          | expressions followed by where parameter can be used to filter out matched entries | `/ip route print where interface="ether1"` |

More than one parameter can be specified at a time, for example, ` /ip route print count-only interval=1 where interface="ether1" `

### Loops and conditional statements

#### Loops

| Command       | Syntax                                                       | Description                                        |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| **do..while** | `:do { <commands> } while=( <conditions> ); :while ( <conditions> ) do={ <commands> };` | execute commands until given condition is met.     |
| **for**       | `:for <var> from=<int> to=<int> step=<int> do={ <commands> }` | execute commands over a given number of iterations |
| **foreach**   | `:foreach <var> in=<array> do={ <commands> };`               | execute commands for each element in a list        |

#### Conditional statement

| Command | Syntax                                                       | Description                                                  |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **if**  | `:if(<condition>) do={<commands>} else={<commands>} <expression>` | If a given condition is `true` then execute commands in the `do` block, otherwise execute commands in the `else` block if specified. |

Example:

```bash
{
   :local myBool true;
   :if ($myBool = false) do={ :put "value is false" } else={ :put "value is true" }
}
```

### Functions

Мова сценаріїв не дозволяє створювати функції безпосередньо, однак ви можете використати команду `:parse` як обхідний шлях. Починаючи з версії 6.2 додається новий синтаксис, щоб легше визначати такі функції та навіть передавати параметри. Також можна повернути значення функції за допомогою команди **:return**. Дивіться приклади нижче:

```bash
#define function and run it
:global myFunc do={:put "hello from function"}
$myFunc

output:
hello from function
#pass arguments to the function
:global myFunc do={:put "arg a=$a"; :put "arg '1'=$1"} 
$myFunc a="this is arg a value"  "this is arg1 value"

output:
arg a=this is arg a value
arg '1'=this is arg1 value
```

Зауважте, що є два способи передачі аргументів:

- передати аргумент із конкретним ім'ям ("a" у нашому прикладі)
- передати значення без назви аргументу, у такому випадку використовується аргумент "1", "2" .. "n".

```bash
:global myFunc do={ :return ($a + $b)}
:put [$myFunc a=6 b=2]

output:
8
```

Ви навіть можете клонувати існуючий сценарій із середовища сценаріїв і використовувати його як функцію.

```bash
#add script
 /system script add name=myScript source=":put \"Hello $myVar !\""
:global myFunc [:parse [/system script get myScript source]]
$myFunc myVar=world

output:
Hello world !
```

**Попередження:** Якщо функція містить визначену глобальну змінну, ім’я якої збігається з назвою переданого параметра, тоді глобально визначена змінна ігнорується для сумісності зі сценаріями, написаними для старіших версій. Ця функція може змінитися в наступних версіях. **Уникайте використання параметрів із тим самим іменем, що й глобальні змінні.**

Наприклад:

```bash
:global my2 "123"

:global myFunc do={ :global my2; :put $my2; :set my2 "lala"; :put $my2 }
$myFunc my2=1234
:put "global value $my2"
```

Вихід буде:

```bash
1234
lala
global value 123
```

**Приклад вкладеної функції**

**Примітка:** щоб викликати іншу функцію, її ім’я має бути оголошено (так само, як і для змінних)

```bash
:global funcA do={ :return 5 }
:global funcB do={ 
  :global funcA;
  :return ([$funcA] + 4)
}
:put [$funcB]


Output:
9 
```

### Catch run-time errors

Starting from v6.2 scripting has ability to catch run-time errors.

For example, [code]:reslove[/code] command if failed will throw an error and break the script.

```bash
[admin@MikroTik] > { :put [:resolve www.example.com]; :put "lala";}
failure: dns name does not exist
```

Now we want to catch this error and proceed with our script:

```bash
:do {
      :put [:resolve www.example.com];
} on-error={ :put "resolver failed"};
:put "lala" 

output:

resolver failed
lala
```

### Operations with Arrays

**Warning:**  Key name in array contains any character other than lowercase character, it should be put in quotes

For example:

```bash
[admin@ce0] > {:local a { "aX"=1 ; ay=2 }; :put ($a->"aX")}

1
```


 **Loop through keys and values**

```bash
[admin@ce0] > :foreach k,v in={2; "aX"=1 ; y=2; 5} do={:put ("$k=$v")}

0=2
1=5
aX=1
y=2
```



```bash
[admin@ce0] > :foreach k in={2; "aX"=1 ; y=2; 5} do={:put ("$k")}

2
5
1
2
```

**Note:**  If array  element has key then these elements are sorted in alphabetical order,  elements without keys are moved before elements with keys and their  order is not changed (see example above). 
 **Change the value of single array element**

```bash
[admin@MikroTik] > :global a {x=1; y=2}
[admin@MikroTik] > :set ($a->"x") 5 
[admin@MikroTik] > :environment print 
a={x=5; y=2}
```

## Script repository

**Sub-menu level:** `/system script`

Містить усі сценарії, створені користувачем. Сценарії можна виконувати кількома різними способами:

- **on event** - скрипти виконуються автоматично під час деяких подій об’єкта ([планувальник](https://wiki.mikrotik.com/wiki/Manual:System/Scheduler), [ netwatch](https://wiki. mikrotik.com/wiki/Manual:Tools/Netwatch), [ VRRP](https://wiki.mikrotik.com/wiki/Manual:Interface/VRRP))
- **іншим сценарієм** - дозволяється запуск сценарію в сценарії
- **вручну** - з консолі, виконавши команду [run](https://wiki.mikrotik.com/wiki/Manual:Scripting#run) або в winbox

**Примітка.** Лише сценарії (зокрема планувальники, netwatch тощо) з однаковими або вищими правами дозволу можуть виконувати інші сценарії.

| Property                                                  | Description                                                  |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| **comment** (*string*; Default: )                         | Descriptive comment for the script                           |
| **dont-require-permissions** (*yes \| no*; Default: *no*) | Bypass permissions check when script is being executed, useful  when scripts are being executed from services that have limited  permissions, such as [ Netwatch](https://wiki.mikrotik.com/wiki/Manual:Tools/Netwatch) |
| **name** (*string*; Default: *"Script[num]"*)             | name of the script                                           |
| **policy** (*string*; Default: )                          | list of applicable policies:  **ftp** - can log on remotely via ftp and send and retrieve files from the router **password** - change passwords **policy** - manage user policies, add and remove user **read** - can retrieve the configuration  **reboot** - can reboot the router **sensitive** - allows to change "hide sensitive" parameter **sniff** - can run sniffer, torch etc **test** - can run ping, traceroute, bandwidth test  **write** - can change the configuration  Read more detailed policy descriptions [ here](https://wiki.mikrotik.com/wiki/Manual:Router_AAA#Properties) |
| **source** (*string*;)                                    | Вихідний код сценарію                                        |

 Read only status properties:

| Property                  | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| **last-started** (*date*) | Date and time when the script was last invoked.             |
| **owner** (*string*)      | User who created the script                                 |
| **run-count** (*integer*) | Counter that counts how many times script has been executed |

 Menu specific commands

| Command                    | Description                            |
| -------------------------- | -------------------------------------- |
| **run** (*run [id\|name]*) | Execute specified script by ID or name |



### Environment

**Sub-menu level:**

- `/system script environment`
- `/environment`

Contains all user defined variables and their assigned values.

```bash
[admin@MikroTik] > :global example;
[admin@MikroTik] > :set example 123
[admin@MikroTik] > /environment print  
"example"=123
```


 Read only status properties:

| Property            | Description                |
| ------------------- | -------------------------- |
| **name** (*string*) | Variable name              |
| **user** (*string*) | User who defined variable  |
| **value** ()        | Value assigned to variable |

### Job

**Sub-menu level:** `/system script job`

Містить список усіх запущених сценаріїв.
Властивості статусу лише для читання:

| Property             | Description                                 |
| -------------------- | ------------------------------------------- |
| **owner** (*string*) | User who is running script                  |
| **policy** (*array*) | List of all policies applied to script      |
| **started** (*date*) | Local date and time when script was started |

