https://developer.tuya.com/en/docs/iot/Function-Definition?id=Kb4qgfeeshz58

# Function Definition

У цій темі описано, як визначити функції для продукту на основі TuyaLink.

## Поняття

### Модель пристрою

Конструкція моделі пристрою описує абстракцію фізичних пристроїв. Він визначає характеристики та поведінку типу пристрою, який підключається до [Tuya IoT Development Platform](https://iot.tuya.com).

Модель пристрою означує абстрактне представлення пристрою як набору властивостей, дій і подій, що означує, як підключений фізичний пристрій взаємодіє з хмарними програмами.

| Type     | Description                                                  |
| :------- | :----------------------------------------------------------- |
| Property | Тип властивості використовується для означення безперервних і запитуваних станів пристрою, які можуть представляти один або кілька параметрів функції. Для оновлення даних і запитів властивість може бути доступною для читання й запису або лише для читання. Коли оновлюється певний параметр функції, пристрій може відповідним чином оновлювати властивість. Наприклад, лампочка може мати такі властивості, як стан живлення та яскравість. |
| Action   | Тип дії використовується для виконання складних завдань. Команда дії не призначена для зміни властивостей пристрою, а наказує пристрою повернути відповідь. Наприклад, розпізнавання обличчя та передача зображення. |
| Event    | Тип події використовується для означення сповіщення в реальному часі, яке надсилає пристрій, яке потребує зовнішнього вимірювання та обробки. Події працюють із механізмами підписки на повідомлення або правилами, щоб відповідати відповідно до попередньо означеної логіки. Наприклад, сповіщення про перегрівання та сповіщення про несправності. |

### Стандартна та спеціальна функція

- **Стандартна функція**: відноситься до бібліотеки шаблонів стандартних точок даних (DP,  standard data points). Він містить означення загальних ознак для більш ніж 1000 категорій продуктів.
- **Користувацька функція**: підтримує різні типи функцій і типи даних, щоб допомогти вам означити спеціальні функції за потреби.

## Передумови

Ви створили принаймні один продукт на основі TuyaLink.

## Процедура

### Крок 1: Перейдіть до означення функції

1. Увійдіть на [Tuya IoT Development Platform](https://iot.tuya.com/pmg/list). Виберіть створений продукт і натисніть **Продовжити розробку**.

2. Натисніть вкладку **Function Definition**.

   ![Function Definition](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1639161146d569c61f4b7.png)

### Крок 2: Додайте стандартні функції

Виберіть потрібні функції та додайте їх.

![Function Definition](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1639161183bf96ca96a64.png)

![Function Definition](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/16391612490732327d2c4.png)

### Крок 3: Додайте спеціальні функції

Якщо стандартні функції не можуть задовольнити ваші потреби, ви можете створити спеціальні функції.

Доступні три типи функцій: property, event та action. Виберіть типи, які відповідають характеристикам вашого продукту, щоб створити спеціальні функції.

Натисніть **Add** у розділі **Custom Functions**.

![Function Definition](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1639161280343e16d9ad8.png)

![Function Definition](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/163916130196c36e72b3f.png)

Виберіть тип функції та заповніть необхідні поля, щоб створити спеціальну функцію. Необхідна інформація залежить від типу функції. Див. наступний вступ до полів щодо кожного типу функції.

- Property type
   The property type is used to define the continuous and queryable states  of a device, which can represent one or several feature parameters. For  example, a light bulb might have properties like power state and  brightness.
  - **DP Name**: назва спеціальної функції.
  - **Identifier**: унікальний ідентифікатор спеціальної функції.
  - **Data Type**: тип даних властивості. Доступно дев’ять типів даних, а саме значення, рядок, дата, логічний вираз, перелік, необроблений, структура, масив і помилка.

- Property type - Property type використовується для означення безперервних і запитуваних станів пристрою, які можуть представляти один або кілька параметрів функції. Наприклад, лампочка може мати такі властивості, як стан живлення та яскравість.

**Приклад означення властивості**

| Data type | Example                                                      |
| --------- | ------------------------------------------------------------ |
| Value     | Візьмемо для прикладу температуру від 1°C до 100°C. Якщо звітні дані становлять 36,6°C, визначення таке: Data type: Value Value Range: від 1 до 1000 Крок: 1. Крок визначає різницю між суміжними значеннями. Наприклад, якщо крок дорівнює 1, дійсними значеннями будуть 0, 1, 2… Якщо крок дорівнює 3, дійсними значеннями будуть 0, 3, 6… Шкала: 1Одиниця вимірювання: °C Шкала використовується для перетворення дані з цілого числа в десяткову, наприклад перетворення `1` на `0,1`. На практиці функції на приладах керують шкалою. Тут лише для визначення параметрів. |
| String    | Візьміть URL-адресу зображення як приклад. Визначення таке: Тип даних: Рядок Максимальна довжина: 50 байт |
| Date      | Take the product update time as an example. The device data is  reported and parsed by the timestamp. The definition is as follows: Data type: DateUpdate time: If the update time is defined as `1638853568`, the time can be parsed as `2021-12-07 13:06:08`. |
| Bool      | Take the switch as an example. The switch has two statuses: on and off. The definition is as follows: Data type: Bool True: on False: off |
| Enum      | Take the run mode as an example. It includes sports mode, personal mode, and team mode. The definition is as follows: Data Type: EnumEnum values: `Sport_mode/Personal_mode/Team_mode` |
| RAW       | Take the binary code as an example. It cannot be transmitted in plaintext. Data type: RAW  The platform directly transmits the data to the device without any processing. |
| Struct    | Take geolocation as an example. It is in multiple data types. Data type: struct Add parameter: Add the data type as needed.Longitude: ValueLatitude: ValueHeight: Value Coordinate system: Enum  You can add parameters to define all components of geolocation. |
| Array     | Take the color of lights as an example. The color depends on the data. Data type: Array Element type: Select the element type as needed, such as a value type Maximum elements: 3  The color is usually expressed by the RGB values. You can change the RGB values to show different colors. |
| Fault     | Take the alert as an example. You can report the specified information according to predefined conditions. Data type: Fault Barrier values: a high temperature, a low temperature, and temperature alerts |

- Event type
  Тип події використовується для надсилання сповіщень пристрою в реальному часі в хмару. Повідомлені дані можуть включати один або більше вихідних параметрів. Наприклад, сповіщення про перегрівання та сповіщення про несправності.

- Action type
    Тип дії застосовується до складних завдань, які потрібні для повернення результату в хмару. Вхідні та вихідні параметри повинні бути вказані завдяки цьому механізму запит-відповідь. Наприклад, після того, як двері розблоковано, розумний замок поверне мобільному додатку повідомлення про те, що двері розблоковано.

За допомогою трьох типів функцій ви можете створити хмарну модель із повним набором функцій, які ви хочете застосувати до фізичного пристрою. Це відокремлює фізичний пристрій від моделі пристрою, щоб апаратне забезпечення та розробка додатків могли виконуватися паралельно для швидкого циклу розробки.