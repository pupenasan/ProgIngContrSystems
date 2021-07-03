# Підключення по MQTT

Русурс [How to connect a device](https://docs.kaaiot.io/KAA/docs/v1.2.0/Tutorials/connect-device-to-iot-platform/?_ga=2.104485952.175941070.1594793132-2049732900.1594793132)

## Огляд

Kaa platform за замовченням використовує **MQTT-based transport**: [Kaa Protocol (1/KP)](https://github.com/kaaproject/kaa-rfcs/blob/master/0001/README.md). 1/KP діє як мультиплекосваний протокол і дозволяє запускати протоколи вищого рівня (розширення) поверх нього. Протоколи розширення (Extension protocols) дозволяють обмінюватися даними між кінцевими точками та розширеннями: мікросервісами, які реалізують різні аспекти функціональності на сервері, такі як **синхронізація метаданих** ([EPMX](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Device-management/EPMX/)),  **збір даних** ([DCX](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/DCX/)), **управління конфігурацією** ([CMX](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Configuration-management/CMX/)) тощо.

Керовані пристрої представлені у формі [endpoints](https://docs.kaaiot.io/KAA/docs/v1.2.0/Kaa-concepts/#endpoints) на платформі Kaa. Протокол `1/KP` використовує маркери кінцевих точок (буквено-цифрові рядки) для ідентифікації з'єднаних кінцевих точок. Кожен керований пристрій повинен мати **окремий маркер кінцевої точки** (**separate endpoint token**) для спілкування з платформою.

Кожне розширення визначає свою власну **MQTT path та корисне навантаження**, яке слід використовувати кінцевими точками. 

## Налаштування брокера MQTT

HOST = "mqtt.cloud.kaaiot.com"  

PORT = 1883 

## Порядок підключення

### Загальний формат обміну по MQTT. 

Resource Path розділено на дві частини. Перша частина спільна для всіх розширень, наступна залежить від розширення. Це дозволяє роширенню означувати свої валсні шляхи до ресурсів.  Цей RFC описує лише першу частину та надає вимоги та рекомендації до другої.

Перша загальначастина resource_path виглядить [наступним чином](https://github.com/kaaproject/kaa-rfcs/blob/master/0001/README.md):

```json
kp1/{appversion_name}/{extension_instance_name}
```

де

- `{appversion_name}` це унікальне ім'я, яке ідентифікує програму та її версію на сервері
- `{extension_instance_name}` це ім'я, яке однозначно ідентифікує екземпляр розширення в затосунку. 

Специфічний для роширення шлях ресурсу повинен почиантися з [endpoint token](https://github.com/kaaproject/kaa-rfcs/blob/master/0001/README.md#language). Таким чином, шлях ресурсу для них починається з 

```json
kp1/{appversion_name}/{extension_instance_name}/{endpoint_token}
```

### Синхронізація метаданих

Спочатку пристрій реєструється в системі з використанням сервісу **синхронізація метаданих** ([EPMX](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Device-management/EPMX/)). Для цього використовується наступний формат теми (topic) повідомлення MQTT, який описується розширенням [EPMP](https://github.com/kaaproject/kaa-rfcs/blob/master/0010/README.md):

```json
kp1/{appversion_name}/{extension_instance_name}/{endpoint_token}/update/keys
```

де 

- `extension_instance_name` =  "epmx"

Completing a partial metadata update request will update or create only  the endpoint metadata key-value pairs present in the request payload. Compared with the [full metadata update](https://github.com/kaaproject/kaa-rfcs/blob/master/0010/README.md#full-metadata-update), this request does not remove the existing EP metadata keys that are not present in the request payload.

Виконання запиту на часткове оновлення метаданих оновить або створить лише пари метаданих кінцевих точок кінцевої точки, присутні в корисному навантаженні запиту. Порівняно з  [full metadata update](https://github.com/kaaproject/kaa-rfcs/blob/master/0010/README.md#full-metadata-update), цей запит не видаляє існуючі ключі метаданих EP які відсутні в корисному навантаженні запиту.

Для оримання списку імен EP metadata keys

```json
kp1/{appversion_name}/{extension_instance_name}/{endpoint_token}/get/keys
```

Корисне навантаження (paeload)  відправляються в форматі JSON `key`:`value`:

Наприклад оновлення (добавлення даних по пристрою)

```json
payload =  {
  "model": "MySmartMeter A300",
  "mac": "00-14-22-01-23-45"
}
```



## Сервіс DCX

Data Collection Extension service (DCX) extends the communication capability of [Kaa Protocol (1/KP)](https://github.com/kaaproject/kaa-rfcs/blob/master/0001/README.md) by implementing [Data Collection Protocol (2/DCP)](https://github.com/kaaproject/kaa-rfcs/blob/master/0002/README.md). DCX supports this extension protocol to receive endpoint data from a communication service and send it to *data receiver services* for storage and/or processing.

DCX supports a number of interfaces to perform its functional role. The key supported interfaces are summarized in the following diagram.

![DCX interfaces diagram](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/DCX/attach/dcx.svg)

For inter-service communication, Kaa services mainly use REST APIs and messaging protocols that run over [NATS](https://www.nats.io/) messaging system.

2/DCP follows client-initiated request/response pattern defined in [1/KP](https://github.com/kaaproject/kaa-rfcs/blob/master/0001/README.md#requestresponse-pattern).

### Data collection Protocol

#### REQUEST

The client MUST send data collection requests to the following extension-specific resource path:

```
/<endpoint_token>/json
```

The request payload MUST be a UTF-8 encoded JSON object with the following [JSON schema](http://json-schema.org/) ([0002-request.schema.json](https://github.com/kaaproject/kaa-rfcs/blob/master/0002/0002-request.schema.json)):

```
{
    "$schema":"http://json-schema.org/schema#",
    "title":"2/DCP request schema",

    "type":"array"
}
```

where each element of the array represents a single data sample. Data samples can be of any valid JSON type.

Example:

```
[
    {
        "key":"value"
    },
    15,
    [
        "an",
        "array",
        13
    ]
]
```

#### Response

A successful processing confirmation response MUST have zero-length payload.

A successful response indicates the batch was successfully delivered and processed.

### Extension service protocol

DCX implements [2/DCP](https://github.com/kaaproject/kaa-rfcs/blob/master/0002/README.md) extension. It uses [4/ESP](https://github.com/kaaproject/kaa-rfcs/blob/master/0004/README.md) over NATS to exchange messages with endpoints via communication service.

DCX does not respond to communication service, unless:

- request processing status is requested by setting non-empty `requestID` in the [Client Data message](https://github.com/kaaproject/kaa-rfcs/blob/master/0004/README.md#client-data-transfer-to-extension-services);
- DCX encounters a message processing error.

### Data sample transmission protocol

DCX acts as a *data transmitter service* in line with [13/DSTP](https://github.com/kaaproject/kaa-rfcs/blob/master/0013/README.md). All received data samples are transferred to the configured *data receiver services* using 13/DSTP.

Examples of data receiver services in Kaa: [Endpoint Time Series service](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/EPTS/), [Kafka Data Collection Adapter](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/KDCA/), [MongoDB Data Collection Adapter](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/MDCA/).

You can configure Kaa to simultaneously send data to multiple receivers, including your custom ones.

DCX supports receiving acknowledgements from reliable receivers. When such receivers are [configured](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#reliable-data-receivers), DCX waits for each of them to confirm a successful receipt of endpoint  data before responding back to the communication service.

#### Enriching data samples with endpoint metadata

DCX can enrich received data samples with a corresponding [endpoint metadata](https://docs.kaaiot.io/KAA/docs/v1.2.0/Kaa-concepts/#endpoint-metadata). To find out how to enable this function, see the [configuration](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#endpoint-metadata-enrichment).

Let’s consider an example.

1.DCX receives the following [Client Data message](https://github.com/kaaproject/kaa-rfcs/blob/master/0004/README.md#client-data-transfer-to-extension-services) with two [data samples](https://docs.kaaiot.io/KAA/docs/v1.2.0/Kaa-concepts/#data-sample):

```
[
  {
    "temperature":23,
    "humidity":60,
    "co2":870,
    "timestamp":1583422087639
  },
  {
    "temperature":23,
    "humidity":61,
    "co2":865,
    "timestamp":1583422147639
  }
]
```

2.Endpoint metadata stored in the [Endpoint Register](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Device-management/EPR/) looks like this:

```
{
  "c02_sensor":{
    "model":"Senseair S8 LP 004-0-0053",
    "accuracy":"± 40 ppm ± 3% of reading"
  },
  "temperature_humidity_sensor":{
    "model":"BME280"
  },
  "location":"kitchen"
}
```

3.The output data samples enriched with EP metadata using the [default configuration](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#endpoint-metadata-enrichment) will look like this:

```
[
  {
    "temperature":23,
    "humidity":60,
    "co2":870,
    "timestamp":1583422087639,
    "~ep-metadata":{
      "c02_sensor":{
        "model":"Senseair S8 LP 004-0-0053",
        "accuracy":"± 40 ppm ± 3% of reading"
```

> **NOTE:** Only data samples that are JSON objects can be enriched with an EP metadata.

### Endpoint Metadata Management Protocol

DCX acts as an *endpoint metadata management client* in line with the [19/EPMMP](https://github.com/kaaproject/kaa-rfcs/blob/master/0019/README.md). This interface is used for retrieving EP metadata when the [endpoint metadata enrichment feature](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/DCX/#enriching-data-samples-with-endpoint-metadata) is enabled. DCX caches endpoint metadata in [Redis](https://redis.io).

### Endpoint Metadata Events

DCX listens to [15/EME](https://github.com/kaaproject/kaa-rfcs/blob/master/0015/README.md) protocol events to refresh endpoint metadata cached in Redis.

### Tekton integration

DCX is integrated with the [Kaa Tekton](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Infrastructure/TEKTON/) for centralized [application configuration](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#kaa-applications) management. It receives configuration update messages from Tekton over [17/SCMP](https://github.com/kaaproject/kaa-rfcs/blob/master/0017/README.md) and uses [Tekton REST API](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Infrastructure/TEKTON/REST-API/) to retrieve current configs.

See [configuration](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#tekton) for more information.

### Kaa Tenant Manager integration

DCX supports multi-tenancy with each tenant using a separate [OAuth 2.0](https://tools.ietf.org/html/rfc6749) issuer for authentication, authorization, and resource management. The list of the existing tenants is managed by [the Kaa Tenant  Manager][Tenant Manager], which provides REST API for retrieving tenant  security configs.

See the [security configuration](https://docs.kaaiot.io/KAA/docs/v1.2.0/Features/Data-collection/Configuration/#authentication-authorization-and-multi-tenancy) for more details on how to enable multi-tenancy in DCX.

### Management interface

DCX exposes an HTTP-based management interface with the following endpoints:

- `GET /health` returns 200 OK if the service is up and running properly, and 500 Internal Server Error otherwise. In case of errors, the response payload contains their human-redable descriptions. This endpoint can be used by Kubernetes for liveness and readiness probing.
- `GET /metrics` provides service metrics in [Prometheus text-based format](https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format).

https://docs.kaaiot.io/KAA/docs/v1.2.0/Tutorials/iot-data-collection/