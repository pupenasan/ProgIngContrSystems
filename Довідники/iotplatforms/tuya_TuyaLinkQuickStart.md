https://developer.tuya.com/en/docs/iot/TuyaLink_quick?id=Kbt4bg04091jl

# TuyaLink Quick Start

У цьому підручнику ви дізнаєтеся про використання TuyaLink для підключення інтелектуальних пристроїв до платформи розробки Tuya IoT. Демо-проект на Java доступний на GitHub. Ви можете запустити демонстрацію в IntelliJ IDEA та спробувати надсилати команди та отримувати дані від смарт-комутатора.

## Необхідна умова

Створіть обліковий запис [Tuya IoT Development Platform](https://auth.tuya.com/), щоб створювати підключені пристрої та керувати ними.

## Крок 1: Увімкніть підключення TuyaLink

### Створити продукт

Продукт описує абстрактне представлення колекції фізичних пристроїв, яке використовується для керування пристроями з однаковими можливостями. Наприклад, якщо ви хочете, щоб ваша бігова доріжка Bluetooth була підключена до платформи розробки Tuya IoT для моніторингу пристрою, ви можете визначити її як **розумну бігову доріжку**. У цьому розділі описано, як створити продукт за допомогою **TuyaLink**.

1. Увійдіть на [платформу розробки Tuya IoT](https://iot.tuya.com/pmg/solution).
2. Визначте категорію товару для ваших пристроїв. Наприклад, **Електрика** > **Вимикач**.
3. Виберіть **TuyaLink** для **smart mode**.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16598746136bfad808217.png)

4) **TuyaLink Solution** вибрано за замовчуванням.

5) Заповніть основну інформацію про товар

### Означення функцій

На вкладці **Означення функції** додайте функції на основі функцій ваших пристроїв.

1. Натисніть **Add** та виберіть функцію, наприклад перемикач 1.
2. Натисніть **OK**, щоб додати вибрану функцію.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/165987474450c225c861f.png)

### Розробіть пристрій і перевірте підключення

1. На вкладці **Device Development** виберіть **Open Protocol** і натисніть **Next**.
2. Ознайомтеся з посібником із розробки та означте ресурси, за допомогою яких ви хочете розробляти, або **Tuya MQTT Standard Protocol**, або **Tuya IoT Core SDK**. У цьому розділі для опису процесу використовується **стандартний протокол Tuya MQTT**.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/165987480102905b9519f.png)

3) Ви можете запросити безкоштовні ліцензії або придбати ліцензію, щоб активувати свій пристрій. У прикладі ми вибрали **Free to receive authorization code**.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659874841498d40ff8e2.png)

4) Отримавши ліцензію, натисніть **Register Device**, щоб створити пристрій для налагодження та перевірки.

5) У діалоговому вікні **Register Device** виберіть метод реєстрації та натисніть **ОК**, щоб створити сертифікат пристрою.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659874914d9d0289ba79.png)

6) На сторінці **Activation & Verification** відображаються згенеровані сертифікати пристрою.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659874964900a17953f7.png)

| Identifier     | Example                |
| -------------- | ---------------------- |
| RegistrationID | nFUDM2LnPFuL5jTrW***   |
| ProductID      | gmabzdwevsvlt***       |
| DeviceID       | 6cc87b39369b6fb754i*** |
| DeviceSecret   | *****************      |

- Значення у наведеному вище фрагменті коду лише для демонстрації. Замініть їх своїми.

- Інформація про ідентифікацію пристрою є унікальним обліковим даним для автентифікації доступу до платформи розробки Tuya IoT. Зберігайте його в безпеці.

За допомогою `ProductID`, `DeviceID` і `DeviceSecret` пристрій може надсилати дані в хмару через MQTT.

Message Queuing Telemetry Transport (MQTT) — це легкий протокол обміну повідомленнями для публікації/підписки на основі TCP/IP. Це дозволяє двом віддаленим пристроям обмінюватися повідомленнями асинхронно з невеликим кодом і мінімальною пропускною здатністю мережі. Сьогодні MQTT використовується в різноманітних сценаріях, таких як Інтернет речей і мобільні програми.

## Step 2: Download and edit demo

У цьому розділі описано, як використовувати код Java для підключення пристрою до платформи розробки Tuya IoT і впровадження обміну повідомленнями з пристрою в хмару. Код Java виконується на фізичному хості, який може представляти реальний пристрій.

1. [Download TuyaLink Demo](https://github.com/tuya/tuyalink-java-demo) from GitHub.

2. Unzip the downloaded file and import it to IntelliJ IDEA.

3. Open `TuyaMQTT3ClientDemo`.


....

Далі вирізано з оригіналу, так як через Java не цікаво. Див альтернативний спосіб нижче.



## Step 3: Device reports data to the cloud

### Report device properties

`Topic`: **tylink/${deviceId}/thing/property/report**

```json
{
    "msgId":"45lkj3551234***",
    "time":1626197189638,
    "data":{
        "switch_led_1":{
            "value":true,
            "time": 1626197189638
        }
    }
}
```

**Parameter**

| Parameter         | Type   | Description                                       | Required | Notes                                                        |
| ----------------- | ------ | ------------------------------------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId}       | String | Device ID                                         | Yes      | The device that requests the device model.                   |
| version           | String | Protocol version                                  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId             | String | Message ID                                        | Yes      | A string up to 32 characters in length. A message ID is used to correlate responses and requests. |
| time              | Number | Message timestamp                                 | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| data              | Object | A collection of property values reported          | Yes      | `key` represents the property code.   `value` represents the property value and the timestamp when the property value is changed. |
| data.${key}       | Object | The property object                               | Yes      | `key` represents the property code.                          |
| data.${key}.time  | Number | The timestamp when the property value is changed. | Yes      | The Unix timestamp, in seconds (10-digit value) or milliseconds (13-digit value). |
| data.${key}.value | Object | The property value reported                       | Yes      | The specific property value.                                 |

Значення поля властивості в коді має бути ідентичним визначеному на платформі розробки Tuya IoT.

![TuyaLink Quick Start](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659875071c4a1adbbe96.png)

### Debug online

1. When your code is ready to go, open the Tuya IoT Development Platform and choose **Online Debugging** in the development process.


![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659875115e4ff9dc12b3.png)

(Optional) You can click the **[Online Debugging](https://iot.tuya.com/pmg/deviceDebugging)** tab to directly navigate to the destination.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659875154eb6bc8cdbad.png)

2) Select a device for debugging. You can search for the device you configured in the code by `DeviceID`.

3) The connection status will appear. You can click **Manual Refresh** to get the latest status.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/165987522931f80a679f4.png)

4) Right-click the `TuyaMQTT3ClientDemo` file and choose **Run** to run the code.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659410133930fc131bfe.png)

5) The output window shows successful data reporting to the cloud.

![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/165941014629e3c8eae59.png)

6) Navigate to [**Device Debugging**](https://iot.tuya.com/pmg/deviceDebugging) on the Tuya IoT Development Platform and check the data reported from the device.

## Step 4: Send messages to the device

This section describes how to send a message to the device.

1. Open the [Tuya IoT Development Platform](https://iot.tuya.com/).

2. Navigate to the page of [**Device Debugging**](https://iot.tuya.com/pmg/deviceDebugging).

3. Select the target device.

4. In **Property Debugging**, enter or change the value of a property and click **Set**. The cloud will send the desired property value to the device. The content sent to the device is printed in the log.

5. If the code runs correctly, the output in the IntelliJ IDEA should look like this.


![](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1659410422b6db026da8e.png)

## Next steps

The sample Java code simulates the bidirectional commutation between  the device and the cloud, which can help you quickly verify use cases.

You can practice what you have learned by starting with [Create Product](https://developer.tuya.com/en/docs/iot/create-product?id=Kb4qev8yb5oum).

# Альтернативний шлях перевірки підключення через MQTT.fx

https://developer.tuya.com/en/docs/iot/Protocol-Access?id=Kb3kq5nl2291v

## Отримайте необхідні параметри 

Увійдіть на [платформу розробки Tuya IoT](https://iot.tuya.com/) і створіть продукт, щоб отримати такі параметри. Щоб отримати додаткові відомості про детальні процеси створення продукту, перегляньте [Створення продуктів](https://developer.tuya.com/en/docs/iot/create-product?id=Kb4qev8yb5oum).

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163890245822ba87c75cc.png)

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163920781314c8faa9f66.png)

| Parameter name | Parameter description                                        |
| :------------- | :----------------------------------------------------------- |
| ProductID      | PID продукту, який ви створюєте.                             |
| DeviceID       | Ідентифікатор пристрою, який використовується для хмарної автентифікації та зв’язку. |
| DeviceSecret   | Секрет пристрою, який використовується для хмарної автентифікації та спілкування. |

## MQTT.fx configuration

1. Завантажте програмне забезпечення MQTT.fx з  [official website](https://mqttfx.jensd.de/index.php/download?spm=a2c4g.11186623.0.0.3d1b4503JE0lan).
2. Відкрийте MQTT.fx. Натисніть **Extras** і виберіть **Edit Connection Profiles**.

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1639668914b037191087c.png)

3) Заповніть необхідну інформацію на сторінці **Edit Connection Profiles**.

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163714332805502b5a926.png)

| Parameter name | Parameter description                                        |
| :------------- | :----------------------------------------------------------- |
| Profile Name   | Введіть власну назву.                                        |
| Profile Type   | Виберіть **MQTT Broker** як режим підключення.               |
| Broker Address | Введіть кінцеву точку, указану в протоколі MQTT. Наприклад, `m1.tuyacn.com` показано на скріншоті. |
| Broker Port    | Введіть номер порту. Встановіть для цього параметра значення `8883`. |
| Client ID      | Введіть значення у форматі `tuyalink_{$deviceid}`. `deviceid` вказано в протоколі MQTT. |
| General        | Використовуйте значення за умовчанням.                       |

1. Заповніть необхідну інформацію на сторінці **User Credentials**.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163714369588682b6a58f.png)

   | Parameter name | Parameter description                                        |
   | :------------- | :----------------------------------------------------------- |
   | User Name      | `${deviceId}|signMethod=hmacSha256,timestamp=${10-digit timestamp},secureMode=1,accessType=1`   For example, `6c828cba434ff40c074wF2|signMethod=hmacSha256,timestamp=1607837283,secureMode=1,accessType=1` |
   | Password       | `hmacSha256(content, deviceSecret)`  The plaintext of `content` is a string concatenated with `deviceId`, `timestamp`, `secureMode`, and `accessType` in sequence.  For example, `content` is made of `deviceId=6c828cba434ff40c074wF2,timestamp=1607635284,secureMode=1,accessType=1`.   The password is a 64-bit hexadecimal value. Pad the left-most bits with zero if necessary. |

   **DeviceID** і **DeviceSercet** генеруються після реєстрації пристрою. Для отримання додаткової інформації див [Get the required parameters](https://developer.tuya.com/en/docs/iot/Protocol-Access?id=Kb3kq5nl2291v#setupEnvironment). 

   - Змініть `deviceId` на `DeviceID` вашого зареєстрованого пристрою.

   - Встановіть секретний ключ `DeviceSecret` вашого зареєстрованого пристрою.

     ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1639669808b5e8f0f8a14.png)

2. Натисніть **SSL/TLS**, виберіть **Enable  SSL/TLS** і встановіть для **Protocol** значення **TLSv1.2**. Натисніть **ОК** у нижньому правому куті.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163714382471a58635b8b.png)

3. Натисніть **Connect**.   Якщо індикатор з правого боку стає зеленим, з’єднання MQTT встановлено.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16371439723eeef59aa54.png)

## Test communication

### Device-to-cloud communication

1. In the **Publish** field, enter the topic and the payload and then click **Publish**. We use the topic`tylink/6c855a6e81c40a91e9k5gx/thing/model/get` as an example to describe the process.

## Перевірте підключення

### Зв'язок між пристроєм і хмарою

1. У полі **Publish** введіть тему та корисне навантаження, а потім натисніть **Publish**. Ми використовуємо topic `tylink/6c855a6e81c40a91e9k5gx/thing/model/get` як приклад для опису процесу.

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1637637931b16085a28ef.png)

![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1637637964ea3afc28ee7.png)

2) Перевірте [Device Logs](https://iot.tuya.com/device/log) на платформі розробки Tuya IoT. Введіть **DeviceID**. Якщо відображається опубліковане повідомлення, вихідний зв’язок успішний.

### Cloud-to-device communication

1. In the **Subscribe** field, enter the topic and then click **Subscribe**. A subscription message will be displayed on the client. We use the `tylink/6c855a6e81c40a91e9k5gx/thing/property/get_response` as an example to describe the process.

2. У полі **Subscribe** введіть тему та натисніть **Subscribe**. На клієнті відобразиться повідомлення про підписку. Ми використовуємо `tylink/6c855a6e81c40a91e9k5gx/thing/property/get_response` як приклад для опису процесу.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1637639032aff329fb88f.png)

3. У полі **Publish** введіть тему, на яку ви підписалися, а потім натисніть **Publish**.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1637639092eea57a2928f.png)

4. Натисніть вкладку **Subscribe**. Якщо тема, на яку ви підписалися, отримує повідомлення з хмари, низхідний зв’язок успішний.

   ![Device Connection Using MQTT.fx](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1637639127c33b22e20d6.png)