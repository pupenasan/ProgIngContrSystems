# Конектор збереження даних для Cloudant NoSQL DB

[джерело опису Data store connector for Cloudant NoSQL DB](https://www.ibm.com/support/knowledgecenter/SSQP8H/iot/platform/reference/dsc/cloudant.html)

Використовуйте DB® Cloudant® NoSQL DB для IBM Cloud для зберігання та доступу до даних вашого пристрою в щоденних, тижневих або щомісячних базах даних, встановлених у вибраному інтервалі bucket. Коли ви використовуєте Cloudant NoSQL DB для зберігання даних пристроїв за допомогою платформи IBM Watson IoT, створюються автоматично три бази даних:

- Поточна база даних інтервалу bucket .
- База даних для наступного інтервалу. Після досягнення кінця інтервалу дані пристрою зберігаються в базі даних bucket для нового інтервалу і створюється нова база даних для наступного інтервалу.
- Конфігураційна база даних. Документи проектування, які ви додаєте до бази даних конфігурації, копіюються в нові бази даних по мірі їх створення.

## Схема найменування бази даних 

Конфігурація пункту призначення означує, як IBM Watson IoT Platform керує базами даних у вашому обліковому записі Cloudant NoSQL DB.

Схема іменування баз даних така: `{destinationName}_{bucketName}`, де `{bucketName}` означується вашим вибором `bucketInterval`, коли ви [налаштовуєте призначення Cloudant NoSQL DB](https://www.ibm.com/support/knowledgecenter/SSQP8H/iot/platform/reference/dsc/cloudant.html?view=kc#destination):

| Bucket interval | {bucketName} format                                          |
| --------------- | ------------------------------------------------------------ |
| `day`           | `yyyy-mm-dd`  Наприклад: `2019-07-06` для подій 6 липня 2019. |
| `week`          | `yyyy-'w'ww`  Де `'w'ww` показує номер тижня. Наприклад: `2019-w03` для подій в третьому тижні 2019. |
| `month`         | `yyyy-mm` Наприклад: `2019-07` для подій в липні 2019.       |

## Схема документа

Дані пристрою зберігаються в базі даних або як JSON, або як base64, залежно від типу даних.

Якщо дані є валідними JSON і формат події пристрою встановлено на `json`, дані пристрою зберігаються у такому форматі:

```json
{
  "_id": "78bf4380-3311-11e6-a747-d7b140d1a70a",
  "_rev": "2-d13912b7c089f060a4ba7369fa86e46f",
  "typeId": "t",
  "deviceType": "0",
  "eventType": "json_payload",
  "format": "json",
  "timestamp": "2016-06-15T16:54:41.464+01",
  "data": {
    "a": 22
  }
}
```

Якщо дані про пристрій, не валідні JSON, або для формату яких не встановлено значення `json`, зберігаються як рядки, закодовані base64, у полі `payload` у такому форматі:

```json
{
  "_id": "80f1ce10-3311-11e6-a747-d7b140d1a70a",
  "_rev": "1-bfcbf1e74389fe4188a9425c0cd2575a",
  "payload": "eHh4eHg=",
  "typeId": "t",
  "deviceType": "0",
  "eventType": "non_json_payload",
  "format": "notjson",
  "timestamp": "2016-06-15T16:54:55.217+01"
}
```

## Конфігурування

Використовуючи пакет SDK Python, ви можете встановити прив'язку (binding ) БД Cloudant NoSQL використовуючи лише декілька рядків коду. Для отримання додаткової інформації про те, як передати свої дані IoT в DB Cloud Cloudant NoSQL, див  [Python SDK documentation for DSC](https://www.ibm.com/links?url=https%3A%2F%2Fibm-watson-iot.github.io%2Fiot-python%2Fapplication%2Fapi%2Fdsc%2F). 

Ви також можете використовувати наступний зразок коду, щоб налаштувати два пункти призначення та правила переадресації, щоб забезпечити пересилання всіх подій та всіх станів.

```python
import wiotp.sdk.application

options = wiotp.sdk.application.parseEnvVars()
appClient = wiotp.sdk.application.ApplicationClient(options)

# Configure the binding
serviceBinding = {
  "name": "mycloudant",  "type": "cloudant", 
  "credentials": { 
    "host": "hostname", 
    "port": 443, 
    "username": "username", 
    "password": "password"
  }
}
service = appClient.serviceBindings.create(serviceBinding)
# Set up the connector
connector = self.appClient.dsc.create(name="connector1", serviceId=service.id)
# Set up destinations
connector.destinations.create(name="events", bucketInterval="MONTH")
connector.destinations.create(name="state", bucketInterval="MONTH")
# Set up rules
rule1 = connector.rules.createEventRule(name="allevents", destinationName="events", typeId="*", eventId="*")
rule2 = connector.rules.createStateRule(name="allstate", destinationName="state", logicalInterfaceId="*")
```

Наступні розділи пояснюють більш докладно, як можна налаштувати функцію Cloudant NoSQL DB historian за допомогою API платформи IBM Watson IoT Platform.

### Крок 1: Налаштування прив'язки сервісів 

Для налаштування привязування до сервісу Cloudant NoSQL DB (service binding), необхідно наступна іфнормація про Cloudant:

- `username`
- `password`
- `host`
- `port`

Якщо прив'язка завершилася - повертається `serviceId`. Цей унікальний 36-символьний необхідний для встановлення connector.

**Важливо:** API потребує додаткового поля `url` . Це поле складається з інформації, що збирається з полів у такий вигляд: `https://{username}:{password}@{host}:{port}`

### Крок 2: Налаштування connector

Для конфігурування connector, ви маєте наступну інформацію:

- `serviceId` зі створеного прив'язування сервісів.
- Ім'я `name` та опційний `description` для connector
- Опційна `timezone` щоб змінити перетворення за замовчуванням всіх відміток часу на загальний координований час.

**Порада:** Ви можете ввімкнути connector або створити його в відключеному стані, щоб його було ввімкнено пізніше.

### Крок 3: Налаштування destination

Третім кроком є встановлення пункту призначення шляхом налаштування політики для щоденного, щотижневого або щомісячного зберігання та означення схеми імен баз даних для використання з обліковим записом Cloudant NoSQL DB account.

### Крок 4: Встановлення правил пересилання 

Останнім кроком є налаштування даних для переадресації до місця призначення DB Cloud Cloudant NoSQL, який ви встановили на кроці 3.

Налаштуйте правило, щоб переслати події (events), або стан (state) до місця призначення (destination):

- Для пересилання подій.          
  1. Встановити`type` в значення `event`. 
  2. Надати селектор (selector) за допомогою  `typeId` та `deviceId`. Пристрої, ідентифіковані селектором, передають свої події. `*` - будь які події
- Для пересилання стану.          
  1. Встановіть`type` в значення `state`. 
  2. Надайте селектор (selector) використовуючи `logicalInterfaceId`. Пристрої, що реалізують логічний інтерфейс, пересилають свої стани.  `*` - будь які стани

# Historical Data Storage Extension APIs 

[джерело опису API](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Services/get_s2s_services)

## Services 

### Get /s2s/services (Get all services)

Платформа Watson IoT  з метою зберігання різних типів даних може підключатися до інших сервісів IBM. Перш, ніж платформа Watson IoT зможе підключитися до сервісу, він повинен бути зареєстрований на платформі. Кінцева точка **services** повертає список усіх сервісів, які були зареєстровані на платформі Watson IoT.

Під час реєстрації сервісу на платформі Watson IoT ви повинні вказати тип сервісу, до якого ви підключаєтеся, та надати необхідні облікові дані для підключення до сервісу. Підтримуються наступні сервіси:

- IBM Cloudant NoSQL DB for IBM Cloud 
- IBM Event Streams for IBM Cloud 
- IBM DB2 Warehouse for IBM Cloud 
- IBM Cloud Databases for PostgreSQL

Наприклад, запит:

![](iotmedia/10.png)

```http
curl -X GET "https://f4oj8s.internetofthings.ibmcloud.com/api/v0002/s2s/services" -H  "accept: application/json"
```

Відповідь:

```json
{
  "results": [
    {
      "id": "e156d788-82b3-422a-a971-c47ccf7d3ef3",
      "name": "eventstreams-building-temp-events",
      "type": "eventstreams",
      "bindingMode": "manual",
      "bound": true,
      "created": "2016-09-16T13:59:22Z",
      "createdBy": "john.doe@us.ibm.com",
      "updated": "2016-09-16T15:26:12Z",
      "updatedBy": "fred.bloggs@uk.ibm.com"
    },
    {
      "id": "1081b3cc-6016-47b4-860b-5f387e770c15",
      "name": "wiotp-rules-cloudantNoSQLDB",
      "type": "cloudant",
      "bindingMode": "manual",
      "bound": true,
      "created": "2016-09-16T13:59:22Z",
      "createdBy": "john.doe@us.ibm.com",
      "updated": "2016-09-16T15:26:12Z",
      "updatedBy": "fred.bloggs@uk.ibm.com"
    },
    {
      "id": "5ac3d540-b22e-4908-b8ae-ba16b0478c8e",
      "name": "db2_0",
      "type": "db2",
      "bindingMode": "manual",
      "bound": true,
      "created": "2016-09-16T13:59:22Z",
      "createdBy": "john.doe@us.ibm.com",
      "updated": "2016-09-16T15:26:12Z",
      "updatedBy": "fred.bloggs@uk.ibm.com"
    },
    {
      "id": "21a9e203-5799-4bca-94cd-2bc8f007863a",
      "name": "PostgreSQL_0",
      "type": "postgres",
      "bindingMode": "manual",
      "bound": true,
      "created": "2016-09-16T13:59:22Z",
      "createdBy": "john.doe@us.ibm.com",
      "updated": "2016-09-16T15:26:12Z",
      "updatedBy": "fred.bloggs@uk.ibm.com"
    }
  ]
}
```



### Put /s2s/services (Register a service)

Запити `POST /s2s/services` реєструє сервіс на платформі Watson IoT. Сервіс повинен містити всі деталі, необхідні для підключення до цільового сервісу та аутентифікації з ним. Це вказується у властивості **credentials** . Структура властивості **credentials** залежать від типу цільового сервісу.

Якщо цільовий сервіс Cloudant, структура властивості **credentials** має бути наступною: 

```json
  {
    "username": "username",
    "password": "password",
    "host": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee-bluemix.cloudant.com",
    "port": 443,
    "url": "https://username:password@aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee-bluemix.cloudant.com"
  }
```



GET [/s2s/services/{serviceUuid}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Services/get_s2s_services__serviceUuid_) Get the details of a service

PUT [/s2s/services/{serviceUuid}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Services/put_s2s_services__serviceUuid_) Update a service

DELETE [/s2s/services/{serviceUuid}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Services/delete_s2s_services__serviceUuid_) Delete a service



## HistorianConnectors

### GET[/historianconnectors](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/HistorianConnectors/get_historianconnectors) (Get all historian connectors)

Конектори Historian використовуються для налаштування платформи Watson IoT для зберігання історичних даних (часових рядів) в інших службах IBM, які були зареєстровані на платформі. Для зберігання історичних даних можна використовувати наступні сервіси:

- Cloudant 
- Event Streams 
- DB2 
- PostgreSQL 

Конектор Historian включає в себе всю конфігурацію, необхідну для запису в цільовий сервіс. Це включає:

- Destinations (Місце призначення) 
- Forwarding Rules (Правила пересилання)

Місце призначення використовується для налаштування конкретного місця, в яке слід записувати на цільовому сервісі. Наприклад, якщо цільовим сервісом є Event  Streams (Потоки подій), місце призначення може використовуватися для налаштування окремої теми для запису даних. Правила пересилання  дозволяють вам вказати, на які призначення записуються конкретні події чи стан. Кінцева точка **Historicconnectors** повертає список усіх конекторів Historian , які були налаштовані для організації на платформі Watson IoT.

### POST[/historianconnectors](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/HistorianConnectors/post_historianconnectors) (Create a connector)

Створює historian connector для організації на Watson IoT Platform. Historian connector повинен посилатися на цільовий сервіс, на якому платформа Watson IoT буде зберігати дані IoT. **ПРИМІТКА**. Якщо тип створеного historian connector - **db2** або **postgres**, тут можна вказати ім'я схеми бази даних, яка буде використовуватися для розміщення пунктів призначення (таблиць) для connector. Якщо схема баз даних не вказана, пункти призначення (таблиці) будуть розміщені у схемі за замовчуванням, яка пов'язана з обліковими записами користувачів, які використовуються для підключення до цільового сервісу БД. Для того, щоб вказати ім'я схеми під час створення historian connector, потрібно вказати необов'язкове властивість **configuration**, що містить властивість **schemaName** , наприклад:

```
  "configuration": {"schemaName": "WIOTP_DEMO"}
```

GET[/historianconnectors/{connectorId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/HistorianConnectors/get_historianconnectors__connectorId_) (Get a historian connector)

PUT[/historianconnectors/{connectorId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/HistorianConnectors/put_historianconnectors__connectorId_) (Update a historian) connector

DELETE[/historianconnectors/{connectorId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/HistorianConnectors/delete_historianconnectors__connectorId_) (Delete a historian connector)

## Destinations

#### GET[/historianconnectors/{connectorId}/destinations](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Destinations/get_historianconnectors__connectorId__destinations) (Get all destinations for a historian connector)

Місце призначення використовується для налаштування конкретного місця, в яке слід записати на цільовому сервісі для historian connector. Наприклад, якщо цільовим сервісом на конекторі історика є Event Streams, призначення може використовуватися для налаштування окремої теми для запису даних. Кінцева точка **destinations** повертає список усіх місць призначення, які були налаштовані для historian connector.

#### POST[/historianconnectors/{connectorId}/destinations](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Destinations/post_historianconnectors__connectorId__destinations) Create a destination for a historian connector

Create a destination for the historian connector. The structure of the **configuration** property will depend on the type of the target service. See **EventStreamsDestinationConfiguration**, **CloudantDestinationConfiguration**, **DB2DestinationConfiguration** and **PostgresDestinationConfiguration** for the type specific configurations.

If the target service is Cloudant, the structure of the destination object should be as follows: 

```json
  {
    "type": "cloudant",
    "name": "default",
    "configuration": {
      "bucketInterval": "WEEK"
    }
  }
```

an optional retentionDays configuration parameter will trigger deletion of old, expired data buckets:

```json
  {
    "type": "cloudant",
    "name": "default",
    "configuration": {
      "bucketInterval": "WEEK",
      "retentionDays": 14
    }
  }
```



GET[/historianconnectors/{connectorId}/destinations/{destinationName}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Destinations/get_historianconnectors__connectorId__destinations__destinationName_) Get a destination for a historian connector

Retrieve the destination with the specified name.

DELETE[/historianconnectors/{connectorId}/destinations/{destinationName}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Destinations/delete_historianconnectors__connectorId__destinations__destinationName_) Delete a destination for a historian connector

## Forwarding Rules

#### GET[/historianconnectors/{connectorId}/forwardingrules](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Forwarding Rules/get_historianconnectors__connectorId__forwardingrules) (Get all of the forwarding rules for a historian connector)

Правило пересилання (Forwarding Rules) використовується для налаштування того, які дані (події або дані стану) записуються в які напрямки. Кінцева точка **forwardingrules** повертає список усіх правил переадресації, які були налаштовані для historian connector.



#### POST[/historianconnectors/{connectorId}/forwardingrules](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Forwarding Rules/post_historianconnectors__connectorId__forwardingrules) (Create a forwarding rule for a historian connector)

Create a forwarding rule for the historian connector. The structure of the **selector** property will depend on the type of the forwarding rule. For example, if the type is **event**, the structure of the forwarding rule should be as follows:

Створює правило пересилання для historian connector. Структура властивості **selector**  залежатиме від типу правила пересилання. Наприклад, якщо тип - **event**, структура правила переадресації повинна бути такою:

```json
{
    "name": "mh rule 1",
    "destinationName": "iotp_y9v8so_events",
    "type": "event",
    "selector": {
      "deviceType": "AcmeTempSensor",
      "eventId": "tempevt"
    }
  }
```

Якщо ж типом є **state**, структура правила переадресації повинна бути такою:

```json
  {
    "name": "LI rule 1",
    "destinationName": "all_li_events",
    "type": "state",
    "selector": {
      "logicalInterfaceId": "*"
    }
  }
```

**ПРИМІТКА**: Якщо тип historian connector, на якому створюється правило пересилання, є **db2** або **postgres**, необхідно також вказати, як відображатимуться дані зі стану стовпці, означені в цільовій таблиці. Для того, щоб вказати відображення стовпців під час створення правила перезапису, вам потрібно вказати властивість **configuration** , що містить властивість **columnMappings** , наприклад:

```json
  "configuration": {
    "columnMappings": {
      "TYPE": "$event.type",
      "TYPEID": "$event.typeId",
      "INSTANCEID": "$event.instanceId",
      "TIMESTAMP": "$event.timestamp",
      "TOTALSPACES": "$event.state.totalSpaces",
      "FREESPACES": "$event.state.freeSpaces",
      "OCCUPIEDSPACES": "$event.state.occupiedSpaces"
    }
  }
```

GET[/historianconnectors/{connectorId}/forwardingrules/{forwardingRuleId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Forwarding Rules/get_historianconnectors__connectorId__forwardingrules__forwardingRuleId_) Get a forwarding rule for a historian connector

PUT[/historianconnectors/{connectorId}/forwardingrules/{forwardingRuleId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Forwarding Rules/put_historianconnectors__connectorId__forwardingrules__forwardingRuleId_) Update a forwarding rule for a historian connector

#### DELETE[/historianconnectors/{connectorId}/forwardingrules/{forwardingRuleId}](https://f4oj8s.internetofthings.ibmcloud.com/docs/v0002/historian-connector.html#/Forwarding Rules/delete_historianconnectors__connectorId__forwardingrules__forwardingRuleId_) (Delete a forwarding rule for a historian connector)

Видаляє правило пересилки (forwarding rule) з вказаним `RuleId` для `ConnectorId`.  

```http
curl -X DELETE "https://f4oj8s.internetofthings.ibmcloud.com/api/v0002/historianconnectors/5e90a942e188f000087db213/forwardingrules/5e90b493e188f000087db214" -H  "accept: application/json"
```

