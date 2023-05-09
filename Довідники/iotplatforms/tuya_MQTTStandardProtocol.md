# Tuya MQTT Standard Protocol

https://developer.tuya.com/en/docs/iot/MQTT-protocol?id=Kb65nphxrj8f1

Протокол TuyaLink — це стандарт обміну даними в JSON для розробки IoT. Це забезпечує ефективний двонаправлений зв’язок між пристроями та платформою розробки Tuya IoT.

TuyaLink підтримує різноманітні технології підключення, включаючи бездротові технології, такі як Bluetooth Low Energy (LE), Zigbee, Bluetooth mesh і 433 МГц, дротові технології, такі як RS-485, RS-232 і Ethernet, а також промислові протоколи. Технології підключення створюють канали передачі даних. Протоколи передачі даних визначають, як працює обмін даними. Це можуть бути промислові протоколи зв’язку, такі як Open Charge Point Protocol (OCPP) і Modbus, або власні протоколи.

У цій темі описано стандартний протокол Tuya MQTT, базовий протокол зв’язку, прийнятий платформою розробки Tuya IoT. Цей протокол можна інтегрувати в будь-який пристрій, дозволяючи розробляти вбудоване програмне забезпечення за потреби.

## Типи пристроїв

### Безпосередньо підключений пристрій

Пристрої, які можуть безпосередньо підключатися до хмари через Інтернет без пристрою-посередника, який пересилає дані. Ці пристрої використовують такі технології підключення, як Wi-Fi, Ethernet і стільниковий зв’язок.

### Шлюз

Шлюз — це фізичний пристрій або програмне забезпечення, яке служить посередником між хмарою та кінцевими пристроями. Це також пристрій з прямим підключенням. Шлюз у широкому розумінні — це пристрій, який може спілкуватися з дочірніми пристроями та передавати дані.

### Граничний шлюз

Окрім звичайного шлюзу, граничний шлюз забезпечує обчислювальну потужність на межі мережі для виконання локальної аналітики та статистики даних, кешування даних і локальної автоматизації.

### Підпристрій шлюзу

Пристрої, які не мають прямого доступу до Інтернету, можуть підключатися до хмари через шлюз. Ці пристрої називаються допоміжними пристроями шлюзу, як-от пристрої Zigbee і пристрої Bluetooth.

![Tuya MQTT Standard Protocol](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16607001373feec03edd3.png)

## Що таке MQTT?

Message Queuing Telemetry Transport (MQTT) — це **легкий** клієнт-серверний протокол публікації/підписки на основі TCP/IP, розроблений IBM у 1999 році.

Він простий у впровадженні, не залежить від даних, економить смугу пропускання та підтримує QoS. Ці характеристики роблять його ідеальним для обмежених пристроїв і мереж з низькою пропускною здатністю.

Пристрій, який діє як клієнт, може підписуватися та публікувати теми MQTT, щоб надсилати та отримувати повідомлення з платформи розробки Tuya IoT. Завдяки своїм сильним сторонам MQTT широко використовується в IoT.

### How MQTT works

![Tuya MQTT Standard Protocol](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/166070013786fe003ecd2.png)

### Support for MQTT

- Quality of Service (QoS) in MQTT messaging is an agreement between  the sender and the receiver on the guarantee of delivering a message.  There are three levels of QoS, namely QoS 0, QoS 1, and QoS 2. Only QoS 0 and QoS 1 are supported.

  | Quality of service (QoS) | Description                                                  | Support |
  | ------------------------ | ------------------------------------------------------------ | ------- |
  | QoS 0                    | The message is delivered at most once. The message might be lost if the client is disconnected. | Yes     |
  | QoS 1 (Recommended)      | The message is always delivered at least once.               | Yes     |
  | QoS 2                    | The message is always delivered exactly once.                | No      |

- There are three MQTT versions, MQTT 3.1, MQTT 3.1.1, and MQTT 5. MQTT 3.1.1 is widely used in IoT environments. Tuya IoT Development Platform supports MQTT 3.1.1 only.

### Кінцеві точки MQTT

Платформа розробки Tuya IoT може підключатися до пристроїв, розгорнутих у всьому світі. Виберіть кінцеву точку залежно від місця розгортання пристроїв.

Кінцеві точки MQTT розподілені в шести глобальних центрах обробки даних.

| Data center                 | MQTT endpoint      | Port number |
| --------------------------- | ------------------ | ----------- |
| China Data Center           | m1.tuyacn.com      | 8883        |
| Central Europe Data Center  | m1.tuyaeu.com      | 8883        |
| Western America Data Center | m1.tuyaus.com      | 8883        |
| Eastern America Data Center | m1-ueaz.tuyaus.com | 8883        |
| Western Europe Data Center  | m1-weaz.tuyaeu.com | 8883        |
| India Data Center           | m1.tuyain.com      | 8883        |

Якщо ваш продукт продається по всьому світу, переконайтеся, що ви вибрали правильну кінцеву точку, щоб відповідати вимогам відповідності країн призначення.

## Аутентифікація пристрою

Перш ніж зануритися в деталі автентифікації пристрою, ви можете ознайомитися з підключенням і керуванням пристроєм. Для отримання додаткової інформації див. [Швидкий старт](https://developer.tuya.com/en/docs/iot/TuyaLink_quick?id=Kbt4bg04091jl).

Коли пристрій запитує підключення MQTT до платформи розробки Tuya IoT, він передає свою ідентифікаційну інформацію для автентифікації на платформі. Якщо пристрій не пройшов автентифікацію, його запит буде відхилено.

### Аутентифікація безпосередньо підключеного пристрою

#### Механізм автентифікації "один пристрій - один ключ".

Попередньо вставте унікальний сертифікат (`ProductID`, `DeviceID` і `DeviceSecre`) на пристрій. Коли пристрій підключається до платформи розробки Tuya IoT, платформа шифрує інформацію сертифіката, що передається пристроєм, і автентифікує особу пристрою за допомогою  `username/password`.

![Tuya MQTT Standard Protocol](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1660703526fd3465606a8.png)

На сторінці **Активація та перевірка** ви можете отримати сертифікат пристрою, який складається з трьох елементів.

| Parameter name | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| ProductID      | PID продукту, який ви створюєте.                             |
| DeviceID       | Ідентифікатор пристрою, який використовується для хмарної автентифікації та зв’язку. |
| DeviceSecret   | Секрет пристрою, який використовується для хмарної автентифікації та спілкування. |

У наведеній нижче таблиці описано, як отримують `username` та `password`.

| Parameter name | Description                                                  | Example                                                      |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| user name      | `${DeviceID}|signMethod=hmacSha256,timestamp=${10-digit current timestamp},secureMode=1,accessType=1` | For example, `6c828cba434ff40c074wF2|signMethod=hmacSha256,timestamp=1607837283,secureMode=1,accessType=1` |
| password       | `hmacSha256(content, DeviceSecret)`   `content` format: `deviceId=${DeviceID},timestamp=${10-digit current timestamp},secureMode=1,accessType=1`.   The plaintext of `content` is a string concatenated with `deviceId`, `timestamp`, `secureMode`, and `accessType` in sequence. The password is a 64-character hexadecimal value. Pad the left-most bits with zero if necessary. | For example, if the `content` is `deviceId=6c828cba434ff40c074wF2,timestamp=1607635284,secureMode=1,accessType=1` and the `DeviceSecret` is `ffad8eb66ae8c717`, the `password` would be `9088f1608df4744e2a933ff905ffdde58dc7213510f25ad786a89896a5ea1104`. |

`content` = `deviceId=${DeviceID},timestamp=${10-digit current timestamp},secureMode=1,accessType=1`. 



Enter a value in the format `tuyalink_{$deviceid}`. `deviceid` is specified in the MQTT protocol. https://developer.tuya.com/en/docs/iot/Protocol-Access?id=Kb3kq5nl2291v



Ми рекомендуємо вам увімкнути автоматичне повторне підключення, коли виконується автентифікація «один пристрій — один ключ». Якщо пристрій від’єднано через тремтіння мережі, він буде автоматично повторно підключений після відновлення мережі.

- Один сертифікат пристрою можна використовувати лише для одного з’єднання MQTT. Якщо кілька фізичних пристроїв використовують один сертифікат пристрою для підключення до платформи розробки Tuya IoT, вони вважаються одним пристроєм. Один пристрій, який під’єднається до Інтернету, призведе до вимкнення поточного під’єднаного пристрою. Якщо ввімкнути автоматичне повторне підключення, пристрій буде постійно перемикатися в автономний режим, а потім стане недоступним.
- Зберігайте сертифікат пристрою в безпеці та не перепрошивайте один сертифікат пристрою на декілька пристроїв.

#### Аутентифікація сертифіката X.509

Ця функція зараз недоступна для всіх. Якщо вас це цікавить, надішліть сервісний квиток.

#### Механізм автентифікації "одна модель - один ключ (One-model-one-key)".

Ця функція зараз недоступна для всіх. Якщо вас це цікавить, надішліть сервісний квиток.

### Gateway sub-device authentication

Допоміжний пристрій (sub-device) має бути підключено до шлюзу, перш ніж він автентифікується за допомогою платформи розробки Tuya IoT.

Шлюз — це фізичний пристрій або програмне забезпечення. В основному існує два типи шлюзів: звичайні шлюзи, а також розумні пристрої з вбудованою можливістю шлюзу, такі як розумні колонки, телевізори та розетки.

Шлюз може дозволити обмін повідомленнями у двох напрямках:

- Обмін повідомленнями між шлюзом і хмарою: шлюз може безпосередньо підключатися до платформи розробки Tuya IoT.
- Обмін повідомленнями між шлюзом і підпристроєм: шлюз може перекладати дані, надіслані допоміжним пристроєм, і пересилати ці дані на платформу розробки Tuya IoT.

Щоб допомогти вам працювати з різними випадками використання, доступні три методи автентифікації підпристроїв. Для отримання додаткової інформації див. [Керування топологією](https://developer.tuya.com/en/docs/iot/tuopu?id=Kbt4pnt9trdy6).

### MQTT keep-alive

MQTT keep-alive does not apply to sub-devices because the connection status  of sub-devices is determined by the keep-alive mechanism between the  gateway and the sub-device.

MQTT keep-alive — це максимальний інтервал часу, який може пройти між моментом, коли клієнт завершує передачу контрольного пакета, і моментом, коли він починає надсилати наступний пакет. Він використовується, щоб визначити, чи з’єднання все ще встановлено.

Ви можете встановити інтервал підтримки активності на 60 секунд. Інтервал менше 60 секунд не рекомендується. Таймер запускається, коли пристрій надсилає пакет `CONNECT`. Коли платформа розробки Tuya IoT отримує повідомлення PING, таймер скидається. Якщо Платформа не отримає повідомлення протягом 2,5-кратного інтервалу підтримки активності, вона закриє з’єднання та оголосить пристрій офлайн.

Наприклад, якщо для інтервалу підтримки встановлено 60 секунд, пристрій оголошується офлайн, якщо він недоступний протягом 150 секунд.

MQTT Keep-alive не застосовується до підпорядкованих пристроїв, оскільки стан з’єднання підпорядкованих пристроїв визначається механізмом підтримки активності між шлюзом і допоміжним пристроєм.

### Безпечне з'єднання

TLS 1.2 використовується для безпечного зв’язку між платформою розробки Tuya IoT та пристроями. SDK поставляється з реалізацією TLS. Однак пристрої з обмеженими ресурсами можуть не запускати комплект TLS, навіть якщо вони підтримують Ethernet. У цьому випадку ви можете підключити їх до платформи розробки Tuya IoT як допоміжний пристрій до шлюзу.

Якщо ви хочете запровадити протокол TLS самостійно, вам потрібно [завантажити кореневий сертифікат](https://images.tuyacn.com/tuyalink/cert/Go Daddy Root Certificate Authority - G2.cer). Щоб отримати додаткові відомості про використання кореневого сертифіката, перегляньте [Демо для C](https://github.com/tuya/tuya-iot-core-sdk) і [Демо для Java](https://github.com /tuya/tuyalink-java-demo).

### MQTT standard protocol

У наступній таблиці наведено розділи MQTT за функціями. Для отримання додаткової інформації перегляньте [Огляд тем MQTT](https://developer.tuya.com/en/docs/iot/MQTT_Topic?id=Kbt4ezpeko2rz).

| Feature                   | Topic                                                        |
| ------------------------- | ------------------------------------------------------------ |
| Messaging                 | [Properties, Actions, and Events](https://developer.tuya.com/en/docs/iot/device_model?id=Kbt4gcmizz8f4) |
| Device Connectivity       | [Topology Management](https://developer.tuya.com/en/docs/iot/tuopu?id=Kbt4pnt9trdy6) [Sub-Device Goes Online or Offline](https://developer.tuya.com/en/docs/iot/sub_device_status?id=Kbt4vqainfdak) |
| Device Management         | [OTA Firmware Update](https://developer.tuya.com/en/docs/iot/OTA_FIRMWARE?id=Kbt4xp0kr2u57) |
| Monitoring and Operations | [Remote Configuration](https://developer.tuya.com/en/docs/iot/online_config?id=Kbt4yly10b7tu) |