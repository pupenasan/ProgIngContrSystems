https://developer.tuya.com/en/docs/iot/MQTT_Topic?id=Kbt4ezpeko2rz

# MQTT Topics

Протокол Tuya MQTT надає різноманітні готові специфікації протоколу, які допоможуть вам швидко реалізувати необхідні функції, включаючи моделі пристроїв, надсилання та отримання даних у хмару та з хмари, топологію, оновлення OTA, таймер, віддалену конфігурацію, передачу файлів і мережевий протокол часу (NTP). Слідкуйте за новинами, щоб отримати більше можливостей.

Стандартні функції знижують планку розробки проектів IoT, підвищують ефективність і скорочують час виконання.

У цьому розділі описано теми публікації та підписки.

## Теми пулікації

Пристрій IoT може публікувати повідомлення в наступних темах для надсилання даних або запитів на платформу розробки Tuya IoT.

| Feature                              | Message type                                                 | Topic                                            |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| Get the model                        | Пристрій запитує означення моделі пристрою.                  | tylink/${deviceId}/thing/model/get               |
| Report property values               | Пристрій позитивно відгукується про свої властивості.        | tylink/${deviceId}/thing/property/report         |
| Send property values                 | Пристрій реагує на налаштування властивості.                 | tylink/${deviceId}/thing/property/set_response   |
| Report property values in bulk       | Пристрій порцією повідомляє про оновлення своїх властивостей або підпорядкованих пристроїв. | tylink/${deviceId}/thing/data/batch_report       |
| Report events                        | Пристрій повідомляє про повідомлення, викликані подією.      | tylink/${deviceId}/thing/event/trigger           |
| Perform actions                      | Пристрій повертає результат операції.                        | tylink/${deviceId}/thing/action/execute_response |
| Get online and offline               | Шлюз повідомляє про онлайн-статус підключених допоміжних пристроїв. | tylink/${deviceId}/device/sub/login              |
| Get online and offline               | Шлюз повідомляє про офлайн-статус підключених допоміжних пристроїв. | tylink/${deviceId}/device/sub/logout             |
| Bind sub-devices                     | Шлюз запитує активацію виявленого підпристрою та встановлення топологічного зв’язку. | tylink/${deviceId}/device/sub/bind               |
| Establish topological relationship   | Шлюз додає топологію пристрою.                               | tylink/${deviceId}/device/topo/add               |
| Delete topological relationship      | Шлюз видаляє топологію пристрою.                             | tylink/${deviceId}/device/topo/delete            |
| Query topological relationship       | Шлюз запитує топологічний зв’язок із хмари.                  | tylink/${deviceId}/device/topo/get               |
| Update firmware via OTA              | Пристрій повідомляє інформацію про версію прошивки.          | tylink/${deviceId}/ota/firmware/report           |
| Update firmware via OTA              | Пристрій запитує інформацію про тихі оновлення.              | tylink/${deviceId}/ota/get                       |
| Update firmware via OTA              | Пристрій повідомляє про стан і хід оновлення.                | tylink/${deviceId}/ota/progress/report           |
| Network time protocol (NTP) service  | Пристрій запитує синхронізацію часу з сервером NTP.          | tylink/${deviceId}/ext/time/request              |
| Daylight saving time (DST) service   | Пристрій запитує послугу літнього часу.                      | tylink/${deviceId}/ext/time/request              |
| Upload files                         | Пристрій запитує попередньо підписану URL-адресу для завантаження файлу. | tylink/${deviceId}/ext/file/upload/request       |
| Download files                       | Пристрій запитує URL-адресу для завантаження файлу.          | tylink/${deviceId}/ext/file/download/request     |
| Send the configuration file remotely | Пристрій отримує останній файл конфігурації.                 | tylink/${deviceId}/ext/config/get                |
| Report custom format data            | Пристрій надсилає дані спеціального формату в хмару.         | tylink/${deviceId}/channel/raw/up                |

## Теми підписки

Пристрій IoT може отримувати повідомлення або команди, які платформа розробки Tuya IoT публікує в наступних темах.

| Feature                              | Message type                                                 | Topic                                               |
| ------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| Get the model                        | Пристрій отримує означення моделі пристрою.                  | tylink/${deviceId}/thing/model/get_response         |
| Report property values               | Пристрій отримує відповідь на повідомлену властивість.       | tylink/${deviceId}/thing/property/report_response   |
| Send property values                 | Пристрій отримує значення властивостей із хмари.             | tylink/${deviceId}/thing/property/set               |
| Report property values in bulk       | Пристрій отримує масову відповідь на повідомлену властивість. | tylink/${deviceId}/thing/data/batch_report_response |
| Report events                        | Пристрій отримує відповідь на повідомлення про подію.        | tylink/${deviceId}/thing/event/trigger_response     |
| Perform actions                      | Пристрій отримує команду на виконання дії.                   | tylink/${deviceId}/thing/action/execute             |
| Bind sub-devices                     | Пристрій отримує відповідь на прив’язку допоміжного пристрою. Зауважте, що підпристрою не потрібно підписуватися на цю тему. | tylink/${deviceId}/device/sub/bind_response         |
| Establish topological relationship   | The device receives a response to topological relationship  establishment. Note that the sub-device does not need to subscribe to  this topic. | tylink/${deviceId}/device/topo/add_response         |
| Delete topological relationship      | The device receives a response to topological relationship deletion. Note that the sub-device does not need to subscribe to this topic. | tylink/${deviceId}/device/topo/delete_response      |
| Query topological relationship       | The device receives a response to a topological relationship query.  Note that the sub-device does not need to subscribe to this topic. | tylink/${deviceId}/device/topo/get_response         |
| Change topological relationship      | The device receives a topological relationship change.       | tylink/${deviceId}/device/topo/change               |
| Update firmware via OTA              | The device receives an OTA firmware update.                  | tylink/${deviceId}/ota/issue                        |
| Update firmware via OTA              | The device receives the information about silent updates.    | tylink/${deviceId}/ota/get_response                 |
| Network time protocol (NTP) service  | The device receives a response to the time sync request.     | tylink/${deviceId}/ext/time/response                |
| Daylight saving time (DST) service   | The device receives the DST information.                     | tylink/${deviceId}/ext/time/response                |
| Upload files                         | The device receives the presigned URL to upload a file.      | tylink/${deviceId}/ext/file/upload/response         |
| Download files                       | The device receives the URL to download a file.              | tylink/${deviceId}/ext/file/download/response       |
| Send the configuration file remotely | The device receives the configuration file.                  | tylink/${deviceId}/ext/config/get_response          |
| Send custom format data              | The device receives custom format data from the cloud.       | tylink/${deviceId}/channel/raw/down                 |