# Встановлення Telegraf

https://docs.influxdata.com/telegraf/v1.17/introduction/installation/

## Встановлення та налаштування на Windows

Завантажте архів Telegraf ZIP для Windows з [InfluxData downloads page](https://portal.influxdata.com/downloads).

Витягніть вміст ZIP-архіву до `C:\Program Files\InfluxData\Telegraf`. Перевірте цілісність завантаженого двійкового файлу Telegraf (необов’язково). Щоб отримати хеш SHA256 для завантаження Windows Telegraf, використовуйте таку команду PowerShell: 

```powershell
CertUtil -hashfile <path to your download>/telegraf-1.17_windows_amd64.zip SHA256
```

Порівняйте результати цієї команди з хешем, переліченим на сторінці завантажень, щоб забезпечити цілісність завантаження.

### Налаштування вхідних плагінів

Архів Telegraf ZIP містить файл конфігурації за замовчуванням (`telegraf.conf`). У цьому файлі вже активований вхідний плагін для вимірювання базових метрик [Windows system metrics](https://docs.influxdata.com/telegraf/v1.17/plugins/#win_perf_counters). З цим плагіном Telegraf моніторить наступні об'єкти  Windows Operating System:

- Processor
- LogicalDisk
- PhysicalDisk
- Network Interface
- System
- Memory
- Paging File

Telegraf може збирати метрики та журналювати інформацію з найрізноманітніших джерел. Детальнішу інформацію про конфігурацію див. У [конфігураційній документації](https://docs.influxdata.com/telegraf/v1.17/administration/configuration/).

### Конфігурування вихідних плагінів

Перш ніж запустити агент Telegraf, налаштуйте вихідний плагін для надсилання даних на InfluxDB. Виберіть відповідний плагін на основі версії InfluxDB, яку ви використовуєте.

Файл `telegraf.conf`, що входить до архіву ZIP, містить розділи для налаштування як [InfluxDB v1](https://docs.influxdata.com/telegraf/v1.17/plugins/#influxdb), так і [InfluxDB v2](https://docs.influxdata.com/telegraf/v1.17/plugins/#influxdb_v2) вихідні плагіни.

#### Запис даних в InfluxDB 1.x

Відкрийте `telegraf.conf` у текстовому редакторі та заповніть поле ` database` у розділі `[[outputs.influxdb]]`.

#### Запис даних в InfluxDB 2.0

Відкрийте `telegraf.conf` у текстовому редакторі та закоментуйте плагін InfluxDB v1, поставивши `#` перед `[[outputs.influxdb]]`. Потім видаліть `#` перед `[[outputs.influxdb_v2]]`.

Детальні вказівки щодо налаштування Telegraf для запису на InfluxDB 2.0 див [Enable and configure the InfluxDB v2 output plugin](https://docs.influxdata.com/influxdb/v2.0/write-data/use-telegraf/manual-config/#enable-and-configure-the-influxdb-v2-output-plugin).

### Запуск агента

Після налаштування запустіть такі команди в PowerShell, щоб розпочати надсилання метрик за допомогою Telegraf:

```powershell
> cd C:\Program Files\InfluxData\Telegraf        # path to extracted Telegraf directory
> .\telegraf.exe -config <path_to_telegraf.conf>
```

## Встановлення Telegraf як Windows Service

Див [Running Telegraf as a Windows service](https://docs.influxdata.com/telegraf/v1.17/administration/windows_service).

# Плагіни Telegraf

https://docs.influxdata.com/telegraf/v1.17/plugins/

Telegraf - це агент, керований плагінами, який збирає, обробляє, агрегує та пише метрики. Він підтримує чотири категорії плагінів, включаючи вхідні, вихідні, агрегатори та процесори.

### Modbus

https://docs.influxdata.com/telegraf/v1.17/plugins/#modbus

https://github.com/influxdata/telegraf/blob/release-1.17/plugins/inputs/modbus/README.md

Plugin ID: `inputs.modbus`
Telegraf 1.14.0+

Вхідний модуль Modbus збирає `diskret_inputs`,` coils`, `input_registers` та` hold_registers` через Modbus TCP або Modbus RTU / ASCII.

#### Конфігурація

```ini
[[inputs.modbus]]
  ## Connection Configuration
  ##
  ## The plugin supports connections to PLCs via MODBUS/TCP or
  ## via serial line communication in binary (RTU) or readable (ASCII) encoding
  ##
  ## Device name
  name = "Device"

  ## Slave ID - addresses a MODBUS device on the bus
  ## Range: 0 - 255 [0 = broadcast; 248 - 255 = reserved]
  slave_id = 1

  ## Timeout for each request
  timeout = "1s"

  ## Maximum number of retries and the time to wait between retries
  ## when a slave-device is busy.
  # busy_retries = 0
  # busy_retries_wait = "100ms"

  # TCP - connect via Modbus/TCP
  controller = "tcp://localhost:502"

  ## Serial (RS485; RS232)
  # controller = "file:///dev/ttyUSB0"
  # baud_rate = 9600
  # data_bits = 8
  # parity = "N"
  # stop_bits = 1
  # transmission_mode = "RTU"


  ## Measurements
  ##

  ## Digital Variables, Discrete Inputs and Coils
  ## measurement - the (optional) measurement name, defaults to "modbus"
  ## name        - the variable name
  ## address     - variable address

  discrete_inputs = [
    { name = "start",          address = [0]},
    { name = "stop",           address = [1]},
    { name = "reset",          address = [2]},
    { name = "emergency_stop", address = [3]},
  ]
  coils = [
    { name = "motor1_run",     address = [0]},
    { name = "motor1_jog",     address = [1]},
    { name = "motor1_stop",    address = [2]},
  ]

  ## Analog Variables, Input Registers and Holding Registers
  ## measurement - the (optional) measurement name, defaults to "modbus"
  ## name        - the variable name
  ## byte_order  - the ordering of bytes
  ##  |---AB, ABCD   - Big Endian
  ##  |---BA, DCBA   - Little Endian
  ##  |---BADC       - Mid-Big Endian
  ##  |---CDAB       - Mid-Little Endian
  ## data_type  - INT16, UINT16, INT32, UINT32, INT64, UINT64, FLOAT32-IEEE, FLOAT64-IEEE (the IEEE 754 binary representation)
  ##              FLOAT32 (deprecated), FIXED, UFIXED (fixed-point representation on input)
  ## scale      - the final numeric variable representation
  ## address    - variable address

  holding_registers = [
    { name = "power_factor", byte_order = "AB",   data_type = "FIXED", scale=0.01,  address = [8]},
    { name = "voltage",      byte_order = "AB",   data_type = "FIXED", scale=0.1,   address = [0]},
    { name = "energy",       byte_order = "ABCD", data_type = "FIXED", scale=0.001, address = [5,6]},
    { name = "current",      byte_order = "ABCD", data_type = "FIXED", scale=0.001, address = [1,2]},
    { name = "frequency",    byte_order = "AB",   data_type = "UFIXED", scale=0.1,  address = [7]},
    { name = "power",        byte_order = "ABCD", data_type = "UFIXED", scale=0.1,  address = [3,4]},
  ]
  input_registers = [
    { name = "tank_level",   byte_order = "AB",   data_type = "INT16",   scale=1.0,     address = [0]},
    { name = "tank_ph",      byte_order = "AB",   data_type = "INT16",   scale=1.0,     address = [1]},
    { name = "pump1_speed",  byte_order = "ABCD", data_type = "INT32",   scale=1.0,     address = [3,4]},
  ]
```

#### Метрики

Метрики налаштовуються за допомогою параметрів `diskret_inputs`, ` coils`, `holding_register` та ` input_registers`.

#### Використання `data_type`

Поле `data_type` означує представлення значення даних на вході з регістрів modbus. Потім вхідні значення перетворюються із заданого `data_type` у тип, який підходить під час надсилання значення у вихідний плагін. Ці типи виводу, як правило, мають string, integer  або floating-point-number. Розмір вихідного типу вважається досить великим для всіх підтримуваних типів введення. Зіставлення від типу вводу до типу виводу є фіксованим і не може бути налаштовано.

##### Integers: `INT16`, `UINT16`, `INT32`, `UINT32`, `INT64`, `UINT64`

Ці типи використовуються для цілочисельних вхідних значень. Виберіть той, який відповідає вашому джерелу даних modbus.

##### Floating Point: `FLOAT32-IEEE`, `FLOAT64-IEEE`

Використовуйте ці типи, якщо ваші регістри modbus містять значення, кодоване у цьому форматі. Ці типи завжди включають знак, і тому інших варіантів не існує.

##### Fixed Point: `FIXED`, `UFIXED` (`FLOAT32`)

Ці типи обробляються як цілочисельний тип на вході, але перетворюються на представлення з плаваючою точкою для подальшої обробки (наприклад, масштабування). Використовуйте один із цих типів, коли вхідним значенням є десяткове подання з фіксованою крапкою нецілого значення.

Виберіть тип `UFIXED` , коли тип вводу оголошено, що містить цілі цілі без знака, які не можуть бути від'ємними. У документації вашого пристрою Modbus це повинно бути зазначено таким терміном, як "uint16, що містить подання з фіксованою точкою з N знаками після коми".

Виберіть тип `FIXED`, коли для типу вводу оголошено, що він містить цілі числа зі знаком. У вашій документації пристрою modbus це повинно бути вказано таким терміном, як 'int32 containing fixed-point representation with N decimal places'.

(FLOAT32 застарілий і більше не повинен використовуватися. UFIXED забезпечує те саме перетворення з беззнакових значень).

#### Приклад Output

```bash
$ ./telegraf -config telegraf.conf -input-filter modbus -test
modbus.InputRegisters,host=orangepizero Current=0,Energy=0,Frecuency=60,Power=0,PowerFactor=0,Voltage=123.9000015258789 1554079521000000000
```

# Конфігурування Telegraf

https://docs.influxdata.com/telegraf/v1.17/administration/configuration/

У файлі конфігурації Telegraf (`telegraf.conf`) перераховані всі доступні плагіни Telegraf. Дивіться поточну версію тут: [telegraf.conf](https://github.com/influxdata/telegraf/blob/master/etc/telegraf.conf).

## Генерування конфігураційного файлу

Файл конфігурації Telegraf за замовчуванням може бути автоматично згенерований Telegraf:

```
telegraf config > telegraf.conf
```

Для створення файлу конфігурації з вказаними входами та виходами ви можете використовувати прапори `--input-filter` та ` --output-filter`:

```
telegraf --input-filter cpu:mem:net:swap --output-filter influxdb:kafka config > telegraf.conf
```

## Розміщення конфігураційних файлів

Використовуйте прапор `--config`, щоб вказати розташування файлу конфігурації:

- шлях до файлу, наприклад: `--config /etc/default/telegraf`
- URL віддаленої кінцевої точки , наприклад: `--config "http://remote-URL-endpoint"`

Використовуйте прапорець `--config-directory` для включення файлів, що закінчуються  на `.conf` у вказаній директорії в конфігурації Telegraf.

У більшості систем типовими розташуваннями є `/etc/telegraf/telegraf.conf`  для основного конфігураційного файлу та`/etc/telegraf/telegraf.d` для каталогу конфігураційних файлів.

## Встановлення змінних середовища

Додайте змінні середовища де завгодно у файлі конфігурації, додавши до них `$`. Для strings змінні повинні бути в лапках (наприклад, `"$STR_VAR"`). Для чисел і булевих значень змінні не повинні містити лапок (наприклад, `$INT_VAR`,` $BOOL_VAR`).

Ви також можете встановити змінні середовища за допомогою команди Linux `export`:` export password = mypassword`

> **Примітка:** Ми рекомендуємо використовувати змінні середовища для конфіденційної інформації.

**Приклад**. У файлі змінних середовища Telegraf  (`/etc/default/telegraf`):

```sh
USER="alice"
INFLUX_URL="https://us-west-2-1.aws.cloud2.influxdata.com"
INFLUX_SKIP_DATABASE_CREATION="true"
INFLUX_PASSWORD="monkey123"
```

У Telegraf файлі конфігурації (`/etc/telegraf.conf`):

```sh
[global_tags]
  user = "${USER}"

[[inputs.mem]]

[[outputs.influxdb]]
  urls = ["${INFLUX_URL}"]
  skip_database_creation = ${INFLUX_SKIP_DATABASE_CREATION}
  password = "${INFLUX_PASSWORD}"
```

Наведені вище змінні середовища додають наступні налаштування конфігурації до Telegraf:

```sh
[global_tags]
  user = "alice"

[[outputs.influxdb]]
  urls = "https://us-west-2-1.aws.cloud2.influxdata.com"
  skip_database_creation = true
  password = "monkey123"
```

# Глобальні теги

Глобальні теги можна вказати в розділі `[global_tags]` конфігураційного файлу у форматі `key ="value"`. Усі показники, що збираються на цьому хості, будуть позначені тегами, вказаними тут.

## Конфігурування агента

Telegraf має кілька опцій, які ви можете налаштувати в розділі `[agent]` конфігурації.

- **interval**:  Інтервал збору даних за замовчуванням для всіх входів
- **round_interval**: Округлює інтервал збору для `interval`. Наприклад, якщо для `interval` встановлено значення 10 с, то завжди збирати на :00, :10, :20 тощо.
- **metric_batch_size**: Telegraf надсилатиме метрики для виведення в пакетному режимі щонайбільше `metric_batch_size`.
- **metric_buffer_limit**: Telegraf буде кешувати метрики `metric_buffer_limit` для кожного виводу і буде змивати цей буфер під час успішного запису. Це має бути кратне значення `metric_batch_size` і не може бути менше 2 разів ` metric_batch_size`.
- **collection_jitter**: Collection jitter is used to jitter the collection by a random amount. Each plugin will sleep for a random time within jitter before collecting. This can be used to avoid many plugins querying things like sysfs at the same time, which can have a measurable effect on the system. 
- **flush_interval**: Default data flushing interval for all outputs. You should not set this below `interval`. Maximum `flush_interval` will be `flush_interval` + `flush_jitter`
- **flush_jitter**: Jitter the flush interval by a random amount. This is primarily to avoid large write spikes for users running a large number of Telegraf instances. For example, a `flush_jitter` of 5s and `flush_interval` of 10s means flushes will happen every 10-15s.
- **precision**: By default, precision will be set to the same timestamp order as the collection interval, with the maximum being 1s. Precision will NOT be used for service inputs, such as `logparser` and `statsd`. Valid values are `ns`, `us` (or `µs`), `ms`, and `s`.
- **logfile**: Specify the log file name. The empty string means to log to `stderr`.
- **debug**: Run Telegraf in debug mode.
- **quiet**: Run Telegraf in quiet mode (error messages only).
- **hostname**: Override default hostname, if empty use `os.Hostname()`.
- **omit_hostname**: If true, do no set the `host` tag in the Telegraf agent.

## Input configuration

Наступні параметри конфігурації доступні для всіх входів:

- **interval**: Як часто збирати цю метрику. Звичайні плагіни використовують єдиний глобальний інтервал, але якщо один конкретний вхід слід запускати рідше або частіше, ви можете налаштувати його тут.
- **name_override**: Замінює базову назву вимірювання (measurement ). (За замовчуванням називається назва input).
- **name_prefix**: Вказує префікс, який слід додати до назви вимірювання (measurement ).
- **name_suffix**: Означує суфікс, який слід додати до назви вимірювання.
- **tags**:  Карта тегів, яка застосовується до вимірювань конкретного входу.

## Output configuration

Не існує загальних параметрів конфігурації для всіх результатів.

## Aggregator configuration

Наступні параметри конфігурації доступні для всіх агрегаторів:

- **period**: The period on which to flush & clear each aggregator. All metrics that are sent with timestamps outside of this period will be ignored by the aggregator.
- **delay**: The delay before each aggregator is flushed. This is to control how long for aggregators to wait before receiving metrics from input plugins, in the case that aggregators are flushing and inputs are gathering on the same interval.
- **drop_original**: If true, the original metric will be dropped by the aggregator and will not get sent to the output plugins.
- **name_override**: Override the base name of the measurement. (Default is the name of the input).
- **name_prefix**: Specifies a prefix to attach to the measurement name.
- **name_suffix**: Specifies a suffix to attach to the measurement name.
- **tags**: A map of tags to apply to a specific input’s measurements.

## Processor configuration

Для всіх процесорів доступні такі параметри конфігурації:

- **order**: This is the order in which processors are executed. If this is not specified, then processor execution order will be random.

#### Measurement filtering

Фільтри можна налаштувати на вхід, вихід, процесор або агрегатор, див. Приклади нижче.

- **namepass**: An array of glob pattern strings. Only points whose measurement name matches a pattern in this list are emitted.
- **namedrop**: The inverse of `namepass`. If a match is found the point is discarded. This is tested on points after they have passed the `namepass` test.
- **fieldpass**: An array of glob pattern strings. Only fields whose field key matches a pattern in this list are emitted.
- **fielddrop**: The inverse of `fieldpass`. Fields with a field key matching one of the patterns will be discarded from the point.
- **tagpass**: A table mapping tag keys to arrays of glob pattern strings. Only points that contain a tag key in the table and a tag value matching one of its patterns is emitted.
- **tagdrop**: The inverse of `tagpass`. If a match is found the point is discarded. This is tested on points after they have passed the `tagpass` test.
- **taginclude**: An array of glob pattern strings. Only tags with a tag key matching one of the patterns are emitted. In contrast to `tagpass`, which will pass an entire point based on its tag, `taginclude` removes all non matching tags from the point. This filter can be used on both inputs & outputs, but it is *recommended* to be used on inputs, as it is more efficient to filter out tags at the ingestion point.
- **tagexclude**: The inverse of `taginclude`. Tags with a tag key matching one of the patterns will be discarded from the point.

**NOTE** Due to the way TOML is parsed, `tagpass` and `tagdrop` parameters must be defined at the *end* of the plugin definition, otherwise subsequent plugin config options will be interpreted as part of the tagpass/tagdrop tables.

#### Input configuration examples

This is a full working config that will output CPU data to an InfluxDB instance at `192.168.59.103:8086`, tagging measurements with `dc="denver-1"`. It will output measurements at a 10s interval and will collect per-cpu data, dropping any fields which begin with `time_`.

```toml
[global_tags]
  dc = "denver-1"

[agent]
  interval = "10s"

# OUTPUTS
[[outputs.influxdb]]
  url = "http://192.168.59.103:8086" # required.
  database = "telegraf" # required.
  precision = "s"

# INPUTS
[[inputs.cpu]]
  percpu = true
  totalcpu = false
  # filter all fields beginning with 'time_'
  fielddrop = ["time_*"]
```

#### Input Config: `tagpass` and `tagdrop`

**NOTE** `tagpass` and `tagdrop` parameters must be defined at the *end* of the plugin definition, otherwise subsequent plugin config options will be interpreted as part of the tagpass/tagdrop map.

```toml
[[inputs.cpu]]
  percpu = true
  totalcpu = false
  fielddrop = ["cpu_time"]
  # Don't collect CPU data for cpu6 & cpu7
  [inputs.cpu.tagdrop]
    cpu = [ "cpu6", "cpu7" ]

[[inputs.disk]]
  [inputs.disk.tagpass]
    # tagpass conditions are OR, not AND.
    # If the (filesystem is ext4 or xfs) OR (the path is /opt or /home)
    # then the metric passes
    fstype = [ "ext4", "xfs" ]
    # Globs can also be used on the tag values
    path = [ "/opt", "/home*" ]
```

#### Input Config: `fieldpass` and `fielddrop`

```toml
# Drop all metrics for guest & steal CPU usage
[[inputs.cpu]]
  percpu = false
  totalcpu = true
  fielddrop = ["usage_guest", "usage_steal"]

# Only store inode related metrics for disks
[[inputs.disk]]
  fieldpass = ["inodes*"]
```

#### Input Config: `namepass` and `namedrop`

```toml
# Drop all metrics about containers for kubelet
[[inputs.prometheus]]
  urls = ["http://kube-node-1:4194/metrics"]
  namedrop = ["container_*"]

# Only store rest client related metrics for kubelet
[[inputs.prometheus]]
  urls = ["http://kube-node-1:4194/metrics"]
  namepass = ["rest_client_*"]
```

#### Input Config: `taginclude` and `tagexclude`

```toml
# Only include the "cpu" tag in the measurements for the cpu plugin.
[[inputs.cpu]]
  percpu = true
  totalcpu = true
  taginclude = ["cpu"]

# Exclude the `fstype` tag from the measurements for the disk plugin.
[[inputs.disk]]
  tagexclude = ["fstype"]
```

#### Input config: `prefix`, `suffix`, and `override`

This plugin will emit measurements with the name `cpu_total`.

```toml
[[inputs.cpu]]
  name_suffix = "_total"
  percpu = false
  totalcpu = true
```

This will emit measurements with the name `foobar`.

```toml
[[inputs.cpu]]
  name_override = "foobar"
  percpu = false
  totalcpu = true
```

#### Input config: tags

This plugin will emit measurements with two additional tags: `tag1=foo` and `tag2=bar`.

NOTE: Order matters, the `[inputs.cpu.tags]` table must be at the *end* of the plugin definition.

```toml
[[inputs.cpu]]
  percpu = false
  totalcpu = true
  [inputs.cpu.tags]
    tag1 = "foo"
    tag2 = "bar"
```

#### Multiple inputs of the same type

Additional inputs (or outputs) of the same type can be specified by defining these instances in the configuration file. To avoid measurement collisions,  use the `name_override`, `name_prefix`, or `name_suffix` config options:

```toml
[[inputs.cpu]]
  percpu = false
  totalcpu = true

[[inputs.cpu]]
  percpu = true
  totalcpu = false
  name_override = "percpu_usage"
  fielddrop = ["cpu_time*"]
```

#### Output configuration examples:

```toml
[[outputs.influxdb]]
  urls = [ "https://us-west-2-1.aws.cloud2.influxdata.com" ]
  database = "telegraf"
  precision = "s"
  # Drop all measurements that start with "aerospike"
  namedrop = ["aerospike*"]

[[outputs.influxdb]]
  urls = [ "https://us-west-2-1.aws.cloud2.influxdata.com" ]
  database = "telegraf-aerospike-data"
  precision = "s"
  # Only accept aerospike data:
  namepass = ["aerospike*"]

[[outputs.influxdb]]
  urls = [ "https://us-west-2-1.aws.cloud2.influxdata.com" ]
  database = "telegraf-cpu0-data"
  precision = "s"
  # Only store measurements where the tag "cpu" matches the value "cpu0"
  [outputs.influxdb.tagpass]
    cpu = ["cpu0"]
```

[InfluxDB Cloud or OSS?](https://docs.influxdata.com/telegraf/v1.17/administration/configuration/#)

#### Aggregator Configuration Examples:

This will collect and emit the min/max of the system load1 metric every 30s, dropping the originals.

```toml
[[inputs.system]]
  fieldpass = ["load1"] # collects system load1 metric.

[[aggregators.minmax]]
  period = "30s"        # send & clear the aggregate every 30s.
  drop_original = true  # drop the original metrics.

[[outputs.file]]
  files = ["stdout"]
```

This will collect and emit the min/max of the swap metrics every 30s, dropping the originals. The aggregator will not be applied to the system load metrics due to the `namepass` parameter.

```toml
[[inputs.swap]]

[[inputs.system]]
  fieldpass = ["load1"] # collects system load1 metric.

[[aggregators.minmax]]
  period = "30s"        # send & clear the aggregate every 30s.
  drop_original = true  # drop the original metrics.
  namepass = ["swap"]   # only "pass" swap metrics through the aggregator.

[[outputs.file]]
  files = ["stdout"]
```

# Using Telegraf on Windows

https://www.influxdata.com/blog/using-telegraf-on-windows/

Telegraf is an agent that runs on your operating system of choice,  schedules gathering metrics and events from various sources and then  sends them to one or more sinks, such as InfluxDB or Kafka. For  InfluxDB, version 1.x, 2.0 as well as [InfluxDB Cloud](https://cloud2.influxdata.com/) are supported. Telegraf can collect information from multiple inputs  and currently includes over 200 plugins for retrieving information from  multiple types of applications. It can also retrieve information about  hardware and software from the OS.

One of the questions that gets asked often is: What is the best way to run Telegraf on Windows machines? Our [GitHub repository](https://github.com/influxdata/telegraf) provides documentation on [Running Telegraf as a Windows Service](https://github.com/influxdata/telegraf/blob/master/docs/WINDOWS_SERVICE.md). However, in this post, we’re going to go through a step-by-step setup  of Telegraf on Windows, including how to securely configure it with  credentials for pushing data to various InfluxDB solutions.

We will be doing our installation using an elevated PowerShell process.

In order to run an elevated session of PowerShell, open the Start Menu, find PowerShell, right-click on it and choose the **Run as administrator** option.

Now, let’s download Windows binaries of Telegraf. Those are available from the https://portal.influxdata.com/downloads/ URL. The example below uses the wget command from the website:

```powershell
PS> cd ~\Downloads
PS> wget https://dl.influxdata.com/telegraf/releases/telegraf-1.12.5_windows_amd64.zipCopy
```

Next, let’s extract the archive into Program Files folder, which will create C:\Program Files\telegraf folder:

```powershell
PS> Expand-Archive .\telegraf-1.12.5_windows_amd64.zip 'C:\Program Files\'

Copy
```

Then create a **conf** subdirectory and copy the **telegraf.conf** as **conf\inputs.conf**:

```powershell
PS> mkdir 'C:\Program Files\telegraf\conf'
PS> cd 'C:\Program Files\telegraf\conf'
PS> copy ..\telegraf.conf inputs.confCopy
```

Copy the **telegraf.conf** as **conf\inputs.conf**.

We’re going to separate the outputs section of the file and configure sending data to InfluxDB Cloud specifically. We’ll remove the outputs  section from **inputs.conf**. Edit the file and remove all  of the content before the inputs section, leaving the content of the  file starting with and including the below lines:

```markup
###############################################################################
#                                  INPUTS                                     #
###############################################################################Copy
```

For editing files, it’s recommended that you start your editor from  the elevated PowerShell session — the editor started from an elevated  process will have access to write the files.

Now, create **conf\outputs.conf** file that specifies where the data should be sent.

In my case, I want the output to go to my InfluxDB Cloud account, so the file will contain:

```ini
[[outputs.influxdb_v2]]
  # URL to InfluxDB cloud or your own instance of InfluxDB 2.0
  urls = ["https://us-west-2-1.aws.cloud2.influxdata.com"]
  ## Token for authentication.
  token = "$INFLUX_TOKEN"
  ## Organization is the name of the organization you wish to write to; must exist.
  organization = "$INFLUX_ORG"
  bucket = "$INFLUX_BUCKET"
Copy
```

For sending data to other instances and/or versions of InfluxDB, the  outputs section may differ. Also note that Telegraf can send data to  more than one destination, such as InfluxDB 1.x and InfluxDB 2.0.

We recommend that **$INFLUX_TOKEN**, **$INFLUX_ORG** and **$INFLUX_BUCKET** as well as any other connectivity information are replaced with your  access token, organization name, the name of the InfluxDB bucket to  write data to and any other connectivity information.

At this point it is a good idea to test that Telegraf works correctly:

```powershell
PS> .\telegraf --config-directory 'C:\Program Files\telegraf\conf' --test

Copy
```

This should output logs indicating telegraf has started, followed by  multiple lines of data retrieved from all of the input plugins.

Next, let’s ensure that only the Local System user account can read the **outputs.conf** file to prevent unauthorized users from retrieving our access token for InfluxDB.

```powershell
PS> icacls outputs.conf /reset
PS> icacls outputs.conf /inheritance:r /grant system:rCopy
```

The icacls command is a built-in tool for managing access control  lists (ACLs) for objects in Microsoft Windows and is described in more  detail [here](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/icacls).

The first command removes all ACLs and only inherits permissions from the parent object — in our case the **C:\Program Files\telegraf\conf** directory. The second command does multiple things — the **/reset** flag disables inheritance, effectively removing any ACLs for the file.  At this point no user can access the file. The second flag and its value — **/grant system:r** — allows the **Local System** built-in account to read the file.

This way only the Telegraf service will be able to read the configuration on where the data is sent, including the token.

**NOTE:** All users with administrator access to the  Windows machine will be able to change the permissions of the file and  read it. However, this prevents non-admin users from retrieving the  information.

We can now install Telegraf as a Windows service so that it starts automatically along with our system. To do this, simply run:

```powershell
PS> cd 'C:\Program Files'
PS> .\telegraf --service install --config-directory 'C:\Program Files\telegraf\conf'
PS> net startCopy
```

This will create a Telegraf service and start it. The output should include the following message:

```bash
The Telegraf Data Collector Service service is starting.
The Telegraf Data Collector Service service was started successfully.Copy
```

At this point our Telegraf is now ready to run and we have applied  best practices for storing and accessing the credentials for sending  data to InfluxDB.

**NOTE:** As part of security best practices, the token  created for Telegraf should also have its scope limited — only being  able to write data to the specified bucket where it should be sent.

As an alternative, it’s also possible to keep **$INFLUX_TOKEN**, **$INFLUX_ORG** and **$INFLUX_BUCKET** in your configuration file. Those values will get read and replaced with environment variables by the Telegraf service.

By default, Windows services use all of the environment variables set by Microsoft Windows as well as system-wide environment variables. It’s also possible to pass environment variables specific to a service by  setting them in registry key related to that service.

In order to pass additional environment variables to Telegraf service, run [registry editor](https://support.microsoft.com/en-us/help/4027573/windows-10-open-registry-editor) and go to **HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\telegraf** key after setting Telegraf as a system service. This is where Windows  maintains all of the information for this specific service.

Create a Multi-String Value registry with the name Environment:

![Nulti-String Value Registry - Telegraf](G:\san\AKIT\ДИСЦИП\I40\GitVersion\довідн\influx\telegraph\multi-string-value-registry-telegraf.png)

Next, edit the values for the registry, setting each line to a **Key=Value** format, where **Key** is environment variable name and **Value** is its value — such as:

![Edit registry values - Telegraf](G:\san\AKIT\ДИСЦИП\I40\GitVersion\довідн\influx\telegraph\edit-registry-values-telegraf.png)

After that the Telegraf service will have the required environment variables set.

The downside of using Environment registry is that it is harder to  manage ACLs and prevent unauthorized users from reading the value.  Therefore, if possible, we recommend writing credentials in the file  system and using ACL for the configuration file — as ACLs for files can  also be inspected using tools such as Windows Explorer.

At this point, our Windows server, desktop or laptop is now sending  its performance metrics and other monitoring data to our InfluxDB  database(s) and can be viewed from the [Data Explorer](https://v2.docs.influxdata.com/v2.0/visualize-data/explore-metrics/). InfluxDB can also show any information using [Dashboards](https://v2.docs.influxdata.com/v2.0/visualize-data/dashboards/).