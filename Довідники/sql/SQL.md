# Мова SQL (Довідник)

https://www.w3schools.com/sql/sql_ref_keywords.asp

## Загальні команди SQL

###### Виставити контекст на вказану базу даних (USE)

Використовує вказану базу даних як за замовченням в межах сесії

```sql
USE {database_name} 
```

```sql
USE db1;
SELECT COUNT(*) FROM mytable;   # вибірка з db1.mytable
USE db2;
SELECT COUNT(*) FROM mytable;   # вибірка з db2.mytable
```

###### Вибірка даних (SELECT)

На практиці частіше всього приходиться робити вибірку даних, для якого використовується оператор SELECT. Спрощена його конструкція має вигляд:

```sql
SELECT список_стовпчиків
FROM список_таблиць
[WHERE умови]
```

де слова в квадратних дужках [] – не обов’язкові.

У списку стовпчиків (полів записів) вказуються ті поля таблиці, які повертаються після обробки запиту. Список таблиць означує з яких таблиць необхідно проводити вибірку, а в умовах вказують умови для вибірки рядків. 

Розглянемо приклад, в якому необхідно зробити запит для вибірки даних з поля (колонки) «Value» таблиці «Group_1_1» бази даних «Difuzija_1», які були записані після 19 вересня 2018 року. Дата запису знаходиться в полі «Group_1_1.TDate». Запит матиме вигляд:

```sql
SELECT Value   
FROM  Difuzija_1.Group_1_1 
WHERE Group_1_1.TDate>'2018-09-19 00:00:00'
```

Якщо необхідно вибрати усі поля 

```sql
SELECT *   
FROM  Difuzija_1.Group_1_1 
WHERE Group_1_1.TDate>'2018-09-19 00:00:00'
```

Повний синтаксис оператора SELECT має наступний вигляд:

```sql
SELECT [ALL|DISTINCT] список_стовпчиків
[INTO нова_таблиця]
FROM {таблиця | курсор}[,{таблиця | курсор}…] 
[WHERE умови]
[GROUP BY стовпчик [, стовпчик…]]
[HEAVING умови]
[ORDER BY {ім’я_стовпчика | список_вибору}[ASC|DESC] ... ]
```

У списку SELECT вказуються ті поля (стовпчики), які необхідно повернути запитом. Є можливість зробити деякі операції над полями перед відображенням: +,-,*, /. 

Ключове слово INTO вказує на необхідність створення нової таблиці з вказаним іменем. 

Умови в WHERE задаються операторами порівняння (=,<,>, >=, <=, != або <>), логічними (AND, OR, NOT), визначення діапазону (BETWEEN і NOT BETWEEN),  символьному порівнянню за шаблоном (LIKE) та ін.

Ключове слово ORDER BY дозволяє упорядковувати знайдені записи по вказаному стовпчику по зростанню ASC, або по спаданню DESC.

###### Створення нового запису (INSERT)

Для створення нового запису в таблиці БД, використовується оператор INSERT. Короткий синтаксис оператору:

```sql
INSERT INTO таблиця (стовпчик [, стовпчик…]) VALUES (значення1, [значення2, ...]) 
```

###### Модифікація існуючого запису (UPDATE)

Для модифікації існуючих записів в таблиці використовується оператор UPDATE, кий має наступний синтаксис: 

```sql
UPDATE [top(x)] <об'єкт>
SET <присвоєння1 [, присвоєння2, ...]>
[WHERE <умова>]
[OPTION <хінт1 [, хінт2, ...]>]
```

 де top (x) — команда виконається тільки х разів, <об'єкт> — об'єкт, над яким виконується дія (таблиця або подання (views)), <присвоювання> — присвоєння, яке буде виконуватися при кожному виконанні умови <умова>, або для кожного запису, якщо відсутній розділ WHERE, <умова> — умова виконання команди, <хінт> — інструкція програмі як виконати запит.

###### Створення бази даних (CREATE DATABASE)

```sql
CREATE DATABASE testDB;
```

###### Створення таблиці даних (CREATE TABLE)

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

Приклад:

```sql
CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
```

###### Добавлення індексу при створенні тбалиці(PRIMARY KEY).  

Наступний код SQL створить PRIMARY KEY для поля "ID" в таблиці "Persons" яка створюється:

Для MySQL:

```sql
CREATE TABLE Persons (
   ID int NOT NULL,
   LastName varchar(255) NOT NULL,
   FirstName varchar(255),
   Age int,
   PRIMARY KEY (ID)
 ); 
```

Для MS SQL Server/Oracle/MS Access:

```sql
CREATE TABLE Persons (
   ID int NOT NULL PRIMARY KEY,
   LastName varchar(255) NOT NULL,
   FirstName varchar(255),
   Age int
 ); 
```

Для складеного ключа PRIMARY KEY використовується наступний синтаксис SQL  syntax (MySQL/SQL Server/Oracle/MS Access):

```sql
CREATE TABLE Persons (
   ID int NOT NULL,
   LastName varchar(255) NOT NULL,
   FirstName varchar(255),
   Age int,
   CONSTRAINT PK_Person PRIMARY KEY (ID,LastName)
 ); 
```

У цьому прикладі тільки один первинний ключ ONE PRIMARY KEY (PK_Person), але його значення  створюється з двох колонок (ID + LastName).

###### Добавлення, видалення та модифікація колонок в таблиці (ALTER TABLE)

Команда `ALTER TABLE` добавляє, видаляє або модифікує колонки в таблиці.
Вона також добавляє та видаляє різні обмеження в таблиці.
У наступному прикладі добавиться колонка "Email" в таблицю "Customers":

```sql
ALTER TABLE Customers
ADD Email varchar(255); 
```

Наступна команда SQL видалить колонку "Email" з таблиці "Customers":

```sql
ALTER TABLE Customers
DROP COLUMN Email;
```

###### Зміна типу колонки в таблиці (ALTER COLUMN)

Команда `ALTER COLUMN` використовується для зміни типу даних колонки в таблиці.
Наступна команда SQL змінить тип даних колонки з іменем "BirthDate" в таблиці "Employees" на тип `year`:

```sql
ALTER TABLE Employees
ALTER COLUMN BirthDate year;
```

To create a PRIMARY KEY constraint on the "ID" column when the table is already created, use the following SQL (MySQL / SQL Server / Oracle / MS Access):

```sql
ALTER TABLE Persons
 ADD PRIMARY KEY (ID); 
```

To allow naming of a PRIMARY KEY constraint, and for defining a  PRIMARY KEY constraint on multiplcolumns, use the following SQL  syntax (MySQL / SQL Server / Oracle / MS Access):

```sql
ALTER TABLE Persons
 ADD CONSTRAINT PK_Person PRIMARY KEY (ID,LastName); 
```

**Note:** If you use the ALTER TABLE statement to add a primary key, the primary key column(s) must already have been declared to not contain NULL values (when the table was first created).

---

## Загальні оператори SQL

[w3schools](https://www.w3schools.com/sql/sql_operators.asp)

###### SQL Arithmetic Operators

| Operator | Description | Example |
| -------- | ----------- | ------- |
| +        | Add         |         |

| -    | Subtract |      |
| ---- | -------- | ---- |
| *    | Multiply |      |
| /    | Divide   |      |
| %    | Modulo   |      |

###### SQL Bitwise Operators

| Operator | Description          |
| -------- | -------------------- |
| &        | Bitwise AND          |
| \|       | Bitwise OR           |
| ^        | Bitwise exclusive OR |

###### SQL Comparison Operators

| Operator | Description | Example |
| -------- | ----------- | ------- |
| =        | Equal to    |         |

| >    | Greater than             |      |
| ---- | ------------------------ | ---- |
| <    | Less than                |      |
| >=   | Greater than or equal to |      |
| <=   | Less than or equal to    |      |
| <>   | Not equal to             |      |

###### SQL Compound Operators

| Operator | Description              |
| -------- | ------------------------ |
| +=       | Add equals               |
| -=       | Subtract equals          |
| *=       | Multiply equals          |
| /=       | Divide equals            |
| %=       | Modulo equals            |
| &=       | Bitwise AND equals       |
| ^-=      | Bitwise exclusive equals |
| \|*=     | Bitwise OR equals        |

###### SQL Logical Operators

| Operator | Description                                           | Example |
| -------- | ----------------------------------------------------- | ------- |
| ALL      | TRUE if all of the subquery values meet the condition |         |

| AND     | TRUE if all the conditions separated by AND is TRUE          |      |
| ------- | ------------------------------------------------------------ | ---- |
| ANY     | TRUE if any of the subquery values meet the condition        |      |
| BETWEEN | TRUE if the operand is within the range of comparisons       |      |
| EXISTS  | TRUE if the subquery returns one or more records             |      |
| IN      | TRUE if the operand is equal to one of a list of expressions |      |
| LIKE    | TRUE if the operand matches a pattern                        |      |
| NOT     | Displays a record if the condition(s) is NOT TRUE            |      |
| OR      | TRUE if any of the conditions separated by OR is TRUE        |      |
| SOME    | TRUE if any of the subquery values meet the condition        |      |

---

## Загальні функії SQL



---

## Діалект SQL MySQL/MariaDB

[MySQL doc](https://dev.mysql.com/doc/)

[MariaDB doc](https://mariadb.com/kb/en/sql-statements-structure/)

### Команди SQL 

###### Показати список БД (SHOW DATABASES) 

```sql
SHOW {DATABASES | SCHEMAS}
    [LIKE 'pattern' | WHERE expr]
```

[`SHOW DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html) lists the        databases on the MySQL server host.        [`SHOW         SCHEMAS`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html) is a synonym for [`SHOW         DATABASES`](https://dev.mysql.com/doc/refman/8.0/en/show-databases.html). The [`LIKE`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like)        clause, if present, indicates which database names to match. The        `WHERE` clause can be given to select rows        using more general conditions, as discussed in        [Section 25.49, “Extensions to SHOW Statements”](https://dev.mysql.com/doc/refman/8.0/en/extended-show.html).      

### Функції

[DATE_ADD](https://www.w3schools.com/sql/func_mysql_date_add.asp)

The DATE_ADD() function adds a time/date interval to a date and then returns the date.

```sql
DATE_ADD(date, INTERVAL *value addunit*)
```



| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| *date*    | Дата яку необхідно модифікуватя                              |
| *value*   | Значення інтервалу часу / дати, який потрібно додати. Дозволені як позитивні, так і негативні значення |
| *addunit* | Тип інтервалу для добавлення. Доступні значення:          MICROSECOND      SECOND      MINUTE      HOUR      DAY      WEEK      MONTH      QUARTER      YEAR      SECOND_MICROSECOND      MINUTE_MICROSECOND      MINUTE_SECOND      HOUR_MICROSECOND      HOUR_SECOND      HOUR_MINUTE      DAY_MICROSECOND      DAY_SECOND      DAY_MINUTE      DAY_HOUR      YEAR_MONTH |

## Technical Details

| Works in: | From MySQL 4.0 |
| --------- | -------------- |
|           |                |

------

## More Examples

### Example

Add 15 minutes to a date and return the date:

SELECT DATE_ADD("2017-06-15 09:34:21", INTERVAL 15 MINUTE); 
