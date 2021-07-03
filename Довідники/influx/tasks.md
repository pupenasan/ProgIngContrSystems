# Get started with InfluxDB tasks

https://docs.influxdata.com/influxdb/cloud/process-data/get-started/

**Завдання InfluxDB** - це запланований сценарій Flux, який бере потік вхідних даних, певним чином їх модифікує або аналізує, потім зберігає змінені дані в новому bucket або виконує інші дії.

У цій статті описано основне завдання InfluxDB, яке зменшує вибірку даних і зберігає їх у новому bucket .

## Components of a task

Кожне завдання InfluxDB потребує наступних чотирьох компонентів. Їх форма та порядок можуть відрізнятися, але всі вони є важливими частинами завдання.

- Task options
- A data source
- Data processing or transformation
- A destination

## Define task options

Параметри завдання означують конкретну інформацію про завдання. Наведений нижче приклад ілюструє, як параметри завдань означуються у вашому сценарії Flux:

```js
option task = {
    name: "cqinterval15m",
    every: 1h,
    offset: 0m,
    concurrency: 1,
}
```

*Див[Task configuration options](https://docs.influxdata.com/influxdb/cloud/process-data/task-options) для детальної інформації про кожну опцію.*

При створенні завдання в інтерфейсі користувача InfluxDB (UI) параметри завдань визначаються у полях форми.

## Define a data source

Визначте джерело даних, використовуючи функцію Flux’s  [`from()` function](https://docs.influxdata.com/influxdb/cloud/reference/flux/stdlib/built-in/inputs/from/)  або будь-яку іншу [Flux input functions](https://docs.influxdata.com/influxdb/cloud/reference/flux/stdlib/built-in/inputs/).

Для зручності розгляньте можливість створення змінної, яка включає дані джерела з необхідним діапазоном часу та усі відповідні фільтри.

```js
data = from(bucket: "example-bucket")
  |> range(start: -task.every)
  |> filter(fn: (r) =>
    r._measurement == "mem" and
    r.host == "myHost"
  )
```

#### Using task options in your Flux script

Параметри завдання передаються як частина запису опції `task` , на них можна посилатися у вашому сценарії Flux. У наведеному вище прикладі діапазон часу визначається як `-task.every`.

`task.every` - це крапкове позначення, яке посилається на властивість` every` запису опції `task`. `every`  визначається як `1h`, тому `-task.every` дорівнює  `-1h`.

Використання параметрів завдання для визначення значень у вашому сценарії Flux може спростити повторне використання вашого завдання.

## Process or transform your data

Метою завдань є обробка чи перетворення даних якимось чином. Що саме відбудеться і в якій формі прийматимуться вихідні дані, залежить від вас та вашого конкретного випадку використання.

#### Account for latent data with an offset

Щоб врахувати латентність даних (наприклад, передачу даних із ваших крайніх пристроїв), використовуйте зсув у своєму завданні. Наприклад, якщо ви встановите інтервал завдання на годину з параметрами `every: 1h` і ` offset: 5m`, завдання виконується через 5 хвилин після інтервалу завдання, але запит [`now()`](https://docs.influxdata.com/influxdb/cloud/reference/flux/stdlib/built-in/misc/now/) буде вказувати час вказаний за точною годиною.

Наведений нижче приклад ілюструє завдання, яке зменшує вибірку даних шляхом обчислення середнього значення встановлених інтервалів. В якості джерела даних використовується змінна `data`, визначена [вище](https://docs.influxdata.com/influxdb/cloud/process-data/get-started/#define-a-data-source). Потім він переглядає дані з інтервалом у 5 хвилин і обчислює середнє значення кожного вікна, використовуючи функцію [`aggregateWindow()` function](https://docs.influxdata.com/influxdb/cloud/reference/flux/stdlib/built-in/transformations/aggregates/aggregatewindow/).

```js
data
  |> aggregateWindow(
    every: 5m,
    fn: mean
  )
```

*See [Common tasks](https://docs.influxdata.com/influxdb/cloud/process-data/common-tasks) for examples of tasks commonly used with InfluxDB.*

## Define a destination

У переважній більшості випадків використання завдань, як тільки дані трансформуються, їх потрібно кудись відправити та зберегти. Це може бути окреме bucket або інший measurement.

У наведеному нижче прикладі використовується функція  [`to()` function](https://docs.influxdata.com/influxdb/cloud/reference/flux/stdlib/built-in/outputs/to)  для передачі перетворених даних в інший сегмент :

```js
// ...
|> to(bucket: "example-downsampled", org: "my-org")
```

Для того, щоб записати дані в InfluxDB, ви повинні мати стовпці `_time`,` _measurement`, `_field` і ` _value`.

## Full example task script

Нижче наведено сценарій завдання, який поєднує всі компоненти, описані вище:

```js
// Task options
option task = {
    name: "cqinterval15m",
    every: 1h,
    offset: 0m,
    concurrency: 1,
}

// Data source
data = from(bucket: "example-bucket")
  |> range(start: -task.every)
  |> filter(fn: (r) =>
    r._measurement == "mem" and
    r.host == "myHost"
  )

data
  // Data transformation
  |> aggregateWindow(
    every: 5m,
    fn: mean
  )
  // Data destination
  |> to(bucket: "example-downsampled")
```