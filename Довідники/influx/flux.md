# Get started with Flux

Стаття перекладена з настпуного джерела: [Get started with Flux](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/)

Flux - це функціональна мова сценаріїв даних InfluxData, призначена для запитів, аналізу та дії на дані.

Цей багаточастинний посібник із початку роботи розглядає важливі концепції, пов’язані з Flux. Він охоплює запити даних про часові ряди з InfluxDB за допомогою Flux та вводить синтаксис та функції Flux.

## Принципи розробки Flux

Flux розроблений для того, щоб бути придатним для читання, гнучким, складовим, перевіряним, можливим для спільного використання. Його синтаксис значною мірою натхненний найпопулярнішою мовою сценаріїв 2018 року, Javascript, і має функціональний підхід до дослідження та обробки даних.

Наступний приклад ілюструє запит даних, збережених за останню годину, фільтрування за допомогою вимірювання `cpu` і тегу ` cpu=cpu-total`, перегляд даних через інтервали в 1 хвилину та обчислення середнього значення кожного вікна:

```js
from(bucket:"example-bucket")
  |> range(start:-1h)
  |> filter(fn:(r) =>
    r._measurement == "cpu" and
    r.cpu == "cpu-total"
  )
  |> aggregateWindow(every: 1m, fn: mean)
```

## Ключові концепції

Flux представляє важливі нові концепції, які ви повинні зрозуміти, починаючи роботу.

### Pipe-forward operator

Flux широко використовує оператори прямої передачі (`|>`) для об'єднання операцій. Після кожної функції або операції Flux повертає таблицю або колекцію таблиць, що містять дані. Оператор прямої передачі передає ці таблиці в наступну функцію або операцію, де вони обробляються або маніпулюють ними. Це полегшує зв’язування функцій для побудови складних запитів.

### Таблиці

Flux структурує всі дані в таблицях. Коли дані передаються з джерел даних, Flux форматує їх як анотовані значення, розділені комами (CSV), що представляють таблиці. Потім функції маніпулють або обробляють їх і виводять нові таблиці.

#### Group keys

Кожна таблиця має **груповий ключ (group key)**, який описує вміст таблиці. Це список стовпців, для яких кожен рядок у таблиці матиме однакове значення. Стовпці з унікальними значеннями в кожному рядку **не** є частиною групового ключа.

Оскільки функції обробляють і перетворюють дані, кожна змінює групові ключі вихідних таблиць. Розуміння того, як функції та таблиці та групові ключі модифікуються, є ключовим фактором для правильного формування даних для бажаного виводу.

###### Приклад групового ключа

```js
Group key: [_start, _stop, _field]
                   _start:time                      _stop:time           _field:string                      _time:time                  _value:float
------------------------------  ------------------------------  ----------------------  ------------------------------  ----------------------------
2019-04-25T17:33:55.196959000Z  2019-04-25T17:34:55.196959000Z            used_percent  2019-04-25T17:33:56.000000000Z             65.55318832397461
2019-04-25T17:33:55.196959000Z  2019-04-25T17:34:55.196959000Z            used_percent  2019-04-25T17:34:06.000000000Z             65.52391052246094
2019-04-25T17:33:55.196959000Z  2019-04-25T17:34:55.196959000Z            used_percent  2019-04-25T17:34:16.000000000Z             65.49603939056396
2019-04-25T17:33:55.196959000Z  2019-04-25T17:34:55.196959000Z            used_percent  2019-04-25T17:34:26.000000000Z             65.51754474639893
2019-04-25T17:33:55.196959000Z  2019-04-25T17:34:55.196959000Z            used_percent  2019-04-25T17:34:36.000000000Z              65.536737442016
```

Зверніть увагу, що `_time` та ` _value` виключаються з прикладу групового ключа, оскільки вони є унікальними для кожного рядка.

## Інструменти для роботи з Flux

Посібник [Виконання запитів](https://docs.influxdata.com/influxdb/v2.0/query-data/execute-queries) описує різні інструменти, доступні для запитів InfluxDB за допомогою Flux.

# Запити до InfluxDB з використанням Flux

Цей посібник описує основи використання Flux для запиту даних із InfluxDB. Кожен запит Flux потребує наступного:

1. [A data source](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/query-influxdb/#1-define-your-data-source)
2. [A time range](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/query-influxdb/#2-specify-a-time-range)
3. [Data filters](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/query-influxdb/#3-filter-your-data)

## 1. Означте джерело даних

Функція Flux [`from()`](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/inputs/from) означує джерело даних InfluxDB. Для цього потрібен параметр [`bucket`](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/inputs/from#bucket). У наступних прикладах використовується `example-bucket` як назва bucket.

```js
from(bucket:"example-bucket")
```

## 2. Означте часовий діапазон

Flux вимагає діапазону часу при запиті даних часових рядів. “Необмежені” запити дуже ресурсомісткі, і як захисний захід Flux не буде запитувати базу даних без зазначеного діапазону.

Використовуйте оператор pipe-forward (`|>`) для передачі даних із вашого джерела даних у [`range()`](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/range), яка визначає діапазон часу для вашого запиту. Вона приймає два параметри: `start` і `stop`. Діапазони можуть бути **відносними**, використовуючи від’ємні [тривалості](https://docs.influxdata.com/influxdb/v2.0/reference/flux/language/lexical-elements#duration-literals) або **абсолютними** використовуючи  [timestamps](https://docs.influxdata.com/influxdb/v2.0/reference/flux/language/lexical-elements#date-and-time-literals).

###### Приклад відносного діапазону

```js
// Відносний діапазон часу тільки для старту. Зупинка за замовчуванням - плинний час.
from(bucket:"example-bucket")
  |> range(start: -1h)

// Відносний діапазон часу для запуску та зупинки
from(bucket:"example-bucket")
  |> range(start: -1h, stop: -10m)
```

Відносні діапазони відносно "зараз".

###### Приклад абсолютного часового діапазону

```js
from(bucket:"example-bucket")
  |> range(start: 2018-11-05T23:30:00Z, stop: 2018-11-06T00:00:00Z)
```

#### Використовуйте наступне:

У цьому посібнику використовуйте відносний часовий діапазон, `-15m`, щоб обмежити результати запиту даними за останні 15 хвилин:

```js
from(bucket:"example-bucket")
  |> range(start: -15m)
```

## 3. Фільтрація даних

Передайте дані з діапазоном у функцію `filter()`, щоб звузити результати на основі атрибутів даних або стовпців. Функція `filter()` має один параметр, `fn`, який очікує анонімну функцію з логікою, яка фільтрує дані на основі стовпців або атрибутів.

Анонімний синтаксис функції Flux подібний до синтаксису Javascript. Записи або рядки передаються у функцію `filter()` як запис (`r`). Анонімна функція бере запис і оцінює його, щоб перевірити, чи відповідає він визначеним фільтрам. Використовуйте реляційний оператор `and` для ланцюжка кількох фільтрів.

```js
// Pattern
(r) => (r.recordProperty comparisonOperator comparisonExpression)

// Example with single filter
(r) => (r._measurement == "cpu")

// Example with multiple filters
(r) => (r._measurement == "cpu") and (r._field != "usage_system" )
```

#### Використовуйте наступне:

У цьому прикладі відфільтруйте за виміром `cpu`, поле ` use_system` і значення тегу `cpu-total`:

```js
from(bucket:"example-bucket")
  |> range(start: -15m)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
```

## 4. Надайте свої запитувані дані

Функція Flux `yield()` видає відфільтровані таблиці як результат запиту.

```js
from(bucket:"example-bucket")
  |> range(start: -15m)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> yield()
```

Flux автоматично приймає функцію `yield()` в кінці кожного сценарію для виведення та візуалізації даних. Явний виклик `yield()` необхідний лише при включенні декількох запитів в один і той же запит Flux. Кожен набір повернутих даних потрібно називати за допомогою функції `yield()`.

# Перетворюйте дані за допомогою Flux

Під час запиту даних із InfluxDB вам часто потрібно певним чином перетворити ці дані. Поширені приклади - агрегування даних у середні показники, дані про вибірку тощо.

Цей посібник демонструє використання функцій Flux  для перетворення ваших даних. Він проходить через створення сценарію Flux, який розділяє дані на вікна часу, усереднює значення `_value` у кожному вікні та виводить середні значення як нову таблицю. (Пам'ятайте, Flux структурує всі дані у таблицях)

Важливо зрозуміти, як змінюється «форма» ваших даних під час кожної з цих операцій.

## Query data

Використовуйте запит, побудований вище, але оновіть діапазон, щоб витягнути дані за останню годину:

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
```

## Flux functions

Flux надає ряд функцій, які виконують певні операції (operations), перетворення(transformations) та завдання(tasks). Ви також можете створити власні функції у своїх запитах Flux. *Функції детально описані в документації [Flux functions](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib).*

Поширеним типом функції, яка використовується при перетворенні даних, що запитуються з InfluxDB, є функції агрегації. Функції агрегації беруть набір `_value` в таблиці, агрегують їх і перетворюють у нове значення.

Цей приклад використовує функцію [`mean ()'](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/aggregates/mean) для усереднення значень у кожному вікно часу.

```js
from(bucket:"example-bucket")
  |> filter(fn: (r) =>
    r._measurement == "mem" and
    r._field == "used_percent")
  |> range(start:-12h)
  |> window(every:10m)
  |> mean()
```

Наступний приклад проходить кроки, необхідні для вікна та агрегування даних, але є допоміжна функція [`aggregateWindow()` helper function](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/transform-data/#helper-functions) , який робить це за вас. Просто добре розуміти кроки процесу.

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> aggregateWindow(every: 5m, fn: mean)
```

## Window your data

Flux’s [`window()` function](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/window)  розділює записи на основі значення часу. Використовуйте параметр `every`, щоб визначити тривалість кожного вікна.

```js
window(
  every: 5m,
  period: 5m,
  offset: 12h,
  timeColumn: "_time",
  startColumn: "_start",
  stopColumn: "_stop",
  createEmpty: false
)
```

#### Calendar months and years

`every` підтримує усі [правильні одиниці тривалості](https://docs.influxdata.com/influxdb/v2.0/reference/flux/language/types/#duration-types), включаючи **календарний місяць (`1mo`)** та **роки (`1y`)**.

У цьому прикладі дані вікна задані в 5-хвилинному інтервалі (`5m`).

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> window(every: 5m)
```

Оскільки дані збираються у вікна часу, кожне вікно виводиться як власна таблиця. При візуалізації кожній таблиці присвоюється унікальний колір.

![Windowed data tables](flux/windowed-data.png)

## Aggregate windowed data

Функції Flux aggregate беруть значення `_value` у кожній таблиці та певним чином агрегують їх. Використовуйте функцію [`mean()` function](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/aggregates/mean)  для усереднення значень `_value` кожної таблиці.

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> window(every: 5m)
  |> mean()
```

Оскільки рядки в кожному вікні агрегуються, їх вихідна таблиця містить лише один рядок із сукупним значенням. Усі віконні таблиці все ще окремі, і при візуалізації відображатимуться як одиничні, не пов’язані між собою точки.

![Windowed aggregate data](flux/windowed-aggregates.png)

## Добавлення відміток часу до агрегованих значень

Оскільки значення агрегуються, отримані таблиці не мають стовпця `_time`, оскільки всі записи, що використовуються для агрегування, мають різні позначки часу. Функції агрегатування не визначають, який час слід використовувати для агрегованого значення. Тому стовпець `_time` опускається.

У [наступній операції](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/transform-data/#unwindow-aggregate-tables) потрібен стовпець `_time`. Щоб додати його, використовуйте функцію [`duplicate()` ](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/duplicate) , щоб продублювати стовпець `_stop `  як стовпець ` _time` для кожної віконної таблиці.

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> window(every: 5m)
  |> mean()
  |> duplicate(column: "_stop", as: "_time")
```

## Unwindow aggregate tables

Використовуйте функцію `window()` з параметром `every: inf` щоб зібрати всі точки в одне нескінченне вікно. 

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> window(every: 5m)
  |> mean()
  |> duplicate(column: "_stop", as: "_time")
  |> window(every: inf)
```

Після розгрупування та об’єднання в єдину таблицю сукупні точки даних з’являться пов’язаними у вашій візуалізації.

![Unwindowed aggregate data](flux/windowed-aggregates-ungrouped.png)

## Helper functions

Це може здатися великим кодуванням лише для побудови запиту, який узагальнює дані, проте проходження процесу допомагає зрозуміти, як дані змінюються у формі, коли вони передаються через кожну функцію.

Flux надає (і дозволяє вам створювати) «допоміжні» функції, які абстрагують багато з цих кроків. Ту саму операцію, виконану в цьому посібнику, можна виконати за допомогою функції [`aggregateWindow()` function](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/built-in/transformations/aggregates/aggregatewindow).

```js
from(bucket:"example-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) =>
    r._measurement == "cpu" and
    r._field == "usage_system" and
    r.cpu == "cpu-total"
  )
  |> aggregateWindow(every: 5m, fn: mean)
```

# Flux syntax basics

Flux за своєю суттю - це мова сценаріїв, розроблена спеціально для роботи з даними. У цьому посібнику ви знайдете декілька простих виразів та те, як з ними поводиться у Flux.

## Використання Flux REPL

Використовуйте [Flux REPL](https://docs.influxdata.com/influxdb/v2.0/tools/repl/) для відкриття інтерактивної Read-Eval-Print Loop (REPL). Запустіть команди, наведені в цьому посібнику, у REPL.

Зовнішнє посилання [How to Use the CLI Locally to Access the Flux REPL and Write a Regular CSV to InfluxDB Cloud](https://www.influxdata.com/blog/tldr-tech-tips-how-to-use-cli-locally-to-access-flux-repl-write-regular-csv-to-influxdb-cloud/)

##### Запуск Flux REPL

```bash
./flux repl
```

## Basic Flux syntax

У наведених нижче кодових блоках подаються команди, що ілюструють основний синтаксис Flux. Запустіть ці команди в REPL.

### Прості вирази

Flux - це мова сценаріїв, яка підтримує основні вирази. Наприклад, просте додавання:

```js
> 1 + 1
2
```

### Змінні

Призначте вираз змінній за допомогою оператора присвоєння `=`.

```js
> s = "this is a string"
> i = 1 // an integer
> f = 2.0 // a floating point number
```

Введіть ім'я змінної, щоб надрукувати її значення:

```js
> s
this is a string
> i
1
> f
2
```

### Records

Flux також підтримує записи, колекції пар ключ-значення. Кожен ключ повинен бути рядком. Значення можуть бути різних типів даних.

```js
> o = {name:"Jim", age: 42, "favorite color": "red"}
```

Використовуйте **крапку** для доступу до властивостей запису:

```js
> o.name
Jim
> o.age
42
```

Або нотацію **квадратних дужок**

```js
> o["name"]
Jim
> o["age"]
42
> o["favorite color"]
red
```

Використовуйте нотацію в дужках для посилання на властивості запису зі спеціальними символами або пробілами в ключі властивості.

### Масиви

Flux підтримує масиви. Усі значення в масиві мають бути одного типу.

```js
> n = 4
> l = [1,2,3,n]
> l
[1, 2, 3, 4]
```

Використовуйте **нотацію квадратних дужок**, щоб отримати доступ до значення за певним індексом у масиві:

```js
> a = ["foo","bar","baz","quz"]
> a[0]
foo
```

### Dictionaries

Flux підтримує словники, колекції пар значень і ключів, де ключі можуть бути будь-якого типу, але всі ключі повинні бути одного типу. Усі значення у словнику мають бути одного типу.

```js
> d = [1: "foo", 2: "bar"]
```

Використовуйте [`dict.get()` function](https://docs.influxdata.com/influxdb/v2.0/reference/flux/stdlib/dict/get/) для доступу до властивості в словнику:

```js
> import "dict"
> dict.get(dict: d, key: "1", default: "")
foo
```

### Функції

Flux використовує функції для більшої частини свого важкого підйому. Нижче наведено просту функцію, яка взовадить число  `n` в квадрат 

```js
> square = (n) => n * n
> square(n:3)
9
```

Flux не підтримує позиційні аргументи або параметри. Параметри завжди повинні називатися під час виклику функції.

### Pipe-forward operator

Flux широко використовує оператор прямої передачі (`|>`) для об'єднання операцій. Після кожної функції або операції Flux повертає таблицю або колекцію таблиць, що містять дані. Оператор прямої передачі передає ці таблиці в наступну функцію, де вони обробляються далі або маніпулюють ними.

```js
data |> someFunction() |> anotherFunction()
```

## Real-world application of basic syntax

Це, мабуть, здається вам знайомим, якщо ви вже пройшли інші [посібники з початку роботи](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started). Синтаксис Flux натхненний Javascript та іншими функціональними мовами сценаріїв. Коли ви почнете застосовувати ці основні принципи в реальних випадках використання, таких як створення змінних потоку даних, користувацьких функцій тощо, потужність Flux та його здатність запитувати та обробляти дані стануть очевидними.

Наведені нижче приклади містять як багаторядкову, так і однорядкову версії кожної команди введення. Повернення каретки в Flux не є необхідним, але допомагає у читанні. Як одно-, так і багаторядкові команди можна скопіювати та вставити в `influx` CLI, що працює в режимі Flux.

### Означення data stream variables

Типовим випадком використання призначень змінних у Flux є створення змінних для одного або декількох вхідних потоків даних.

[Multi-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#) [Single-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#)

```js
timeRange = -1h

cpuUsageUser =
  from(bucket:"example-bucket")
    |> range(start: timeRange)
    |> filter(fn: (r) =>
      r._measurement == "cpu" and
      r._field == "usage_user" and
      r.cpu == "cpu-total"
    )

memUsagePercent =
  from(bucket:"example-bucket")
    |> range(start: timeRange)
    |> filter(fn: (r) =>
      r._measurement == "mem" and
      r._field == "used_percent"
    )
```

Ці змінні можна використовувати в інших функціях, таких як `join()`, зберігаючи синтаксис мінімальним та гнучким.

### Означення своїх functions

Створіть функцію, яка повертає `N` числових рядків у вхідному потоці з найбільшими значеннями ` _value`. Для цього передайте вхідний потік (`tables`) та кількість результатів, які потрібно повернути (` n`), у спеціальну функцію. Потім за допомогою функцій Flux (`sort ()` і ` limit ()` знайдіть найвищі ` n` результатів у наборі даних.

[Multi-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#) [Single-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#)

```js
topN = (tables=<-, n) =>
  tables
    |> sort(desc: true)
    |> limit(n: n)
```

Використовуючи цю нову спеціальну функцію `topN` та змінну потоку даних ` cpuUsageUser`, визначену вище, ми можемо знайти перші п’ять точок даних і отримати результати.

[Multi-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#) [Single-line](https://docs.influxdata.com/influxdb/v2.0/query-data/get-started/syntax-basics/#)

```js
cpuUsageUser
  |> topN(n:5)
  |> yield()
```

Цей запит поверне п’ять точок даних із найбільшим використанням ЦП користувача за останню годину.

## Flux query guides

- [Query fields and tags](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#query-fields-and-tags)
- [Group](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#group)
- [Sort and limit](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#sort-and-limit)
- [Window & aggregate](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#window-aggregate)
- [Explore your schema](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#explore-your-schema)
- [Transform data with math](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#transform-data-with-math)
- [Calculate percentages](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#calculate-percentages)
- [Increase](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#increase)
- [Moving Average](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#moving-average)
- [Rate](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#rate)
- [Histograms](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#histograms)
- [Fill](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#fill)
- [Median](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#median)
- [Percentile & quantile](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#percentile-quantile)
- [Join](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#join)
- [Cumulative sum](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#cumulative-sum)
- [First and last](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#first-and-last)
- [Exists](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#exists)
- [Custom functions](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#custom-functions)
- [Extract scalar values](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#extract-scalar-values)
- [Manipulate timestamps](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#manipulate-timestamps)
- [Monitor states](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#monitor-states)
- [Query SQL data](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#query-sql-data)
- [Conditional logic](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#conditional-logic)
- [Regular expressions](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#regular-expressions)
- [Geo-temporal data](https://docs.influxdata.com/influxdb/cloud/query-data/flux/#geo-temporal-data)

## Команди FLUX

### delete

https://docs.influxdata.com/influxdb/v2.0/reference/cli/influx/delete/

```js
influx delete \
  --bucket example-bucket \
  --start 1970-01-01T00:00:00Z \
  --stop $(date +"%Y-%m-%dT%H:%M:%SZ") \
  --predicate '_measurement="example-measurement"
```

