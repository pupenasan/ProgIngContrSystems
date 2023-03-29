# Appsmith

https://docs.appsmith.com/

Appsmith — це лоу-код інструмент розробника з відкритим вихідним кодом, який допомагає швидко створювати внутрішні застосунки.

Ви можете перетягувати та скидати попередньо створені віджети, щоб створити інтерфейс користувача на полотні у стилі сітки. Appsmith спрощує зовнішню та бек-енд інтеграцію між інтерфейсом користувача та джерелом даних для оптимізації створення застосунків. Appsmith підтримує JavaScript у віджетах, запитах і майже в будь-якому іншому компоненті для додавання логіки, перетворення даних і визначення складних робочих процесів.

## Чому Appsmith

- **Підключити джерело даних**: інтеграція з джерелом даних, таким як база даних або API. Appsmith має підтримку Plug and Play для багатьох баз даних та інтерфейс RESTful API для безпроблемного підключення до більшості інструментів.
- **Створення інтерфейсу користувача**: використовуйте настроювані вбудовані віджети для створення макета застосунку.
- **Доступ до даних**: підключіть інтерфейс користувача до джерела даних, написавши запити та прив’язавши дані до віджетів. Керуйте всім за допомогою JavaScript.
- **Співпраця, розгортання, спільний доступ**: Appsmith також підтримує контроль версій за допомогою Git для відстеження змін, створення відкатів і співпраці за допомогою гілок git. Розгорніть програму та поділіться нею з іншими користувачами.

За допомогою цих простих кроків ви можете створювати будь-що: від простих програм CRUD до складних багатоетапних робочих процесів. Appsmith дозволяє легко створювати інтерфейс користувача, який спілкується з будь-яким джерелом даних.

Є два способи використання Appsmith:

- [Appsmith Cloud](https://app.appsmith.com/): спробуйте Appsmith у хмарному середовищі. (Додаткову інформацію див. у [data security](https://docs.appsmith.com/product/security)).
- [Self-Host Appsmith](https://docs.appsmith.com/getting-started/setup):  розгорніть Appsmith і керуйте ним на локальній машині чи приватному сервері.

# Створіть свій перший застосунок

У цьому короткому посібнику ви навчитеся:

- Створювати новий застосунок
- Підключатися до бази даних
- Створювати інтерфейс користувача, перетягуючи віджети на полотно
- Писати запити для отримання даних з бази даних
- Прив'язувати дані до віджетів
- Розгортати застосунок та ділитися ним

Перш ніж почати, вам потрібно буде створити обліковий запис на [Appsmith Cloud](https://app.appsmith.com/), або ви можете [самостійно розмістити Appsmith](https://docs.appsmith.com/ початок/налаштування) локально або на платформі хостингу за вашим вибором.

## Створення нового застосунку

- Під час створення нового [облікового запису Appsmith](https://app.appsmith.com/) програма під назвою «**Моя перша програма**» автоматично додається під **Робочу область** за умовчанням. Ви можете використовувати цю програму, щоб створити свою першу програму або створити нову, натиснувши кнопку **+ New ** під робочою областю.
- Для цього підручника ми будемо використовувати програму за замовчуванням. Наведіть курсор на картку «My first application» та натисніть кнопку **Edit **, щоб відкрити програму.

![Creating a new application on Appsmith](https://docs.appsmith.com/assets/images/Screenshot_2022-07-21_at_11.49.02_AM-f3c1f9a25a9471beca3ee8aa072c900d.png)

- Ви потрапите до редактора Appsmith. Виберіть опцію `Build with drag & drop`, щоб почати з нуля та створити власний інтерфейс користувача.
- "**Page 1**" є сторінкою за замовчуванням у програмі. Щоб перейменувати сторінку, клацніть меню Kebab (три вертикальні точки) і виберіть **Edit Name**. Позначте сторінку «**User Information**».

## Підключення бази даних

Ми будемо використовувати макет бази даних PostgreSQL під назвою «**users**», доступну на Appsmith.

- На вкладці **Explorer** натисніть знак **+** поруч із **DATASOURCES**. У розділі **Sample Databases** виберіть **users.**
- Базу даних «**користувачів**» буде додано на вкладку **Explorer** -> **DATASOURCES**.

![Creating a new datasource](https://docs.appsmith.com/assets/images/Add_Datasource-7e571e2141b791ee2862c39de8493408.png)

## Створення інтерфейсу користувача

- Перейдіть до **PAGES** → **User Information**. Перетягніть віджет [**Table**] на полотно. На **Property Pane** праворуч перейменуйте таблицю на «**usersTable**».
- Перетягніть віджет [**Container**] праворуч від віджета Таблиця. Давайте додамо кілька віджетів для відображення інформації про користувача з вибраного рядка в таблиці. Додайте мітку під назвою "**User Details**".
- Додайте віджети [**Input**](https://docs.appsmith.com/reference/widgets/input) для імені (*nameInput*), електронної пошти (*emailInput*) і телефону (*phoneInput*), [**Datepicker**](https://docs.appsmith.com/reference/widgets/datepicker) віджет для DOB (*dobInput*), [**Image**](https://docs.appsmith. com/reference/widgets/image) для зображення та, нарешті, віджет [**Button**](https://docs.appsmith.com/reference/widgets/button) з позначкою «**Update**».

![Build UI by laying out widgets on the canvas](https://docs.appsmith.com/assets/images/Screenshot_2022-06-28_at_10.50.31_PM-f4aa3daf8c7204a79e24edba86f476e2.png)

## Створення запитів та прив’язка даних до віджетів

- На вкладці **Explorer** перейдіть до бази даних у розділі **DATASOURCES** → **users**
- Натисніть кнопку **Новий запит +** поруч із джерелом даних.

![Creating a new query on the datasource](https://docs.appsmith.com/assets/images/New_Query_(1)-a72e9443f54fa7cde440e5a627f85756.png)

- Перейменуйте запит на "**getUsers**"
- Напишіть наведений нижче запит, щоб отримати десять записів із таблиці «**users**» в базі даних.

```text
SELECT * FROM users ORDER BY id LIMIT 10;
```

![Writing query to fetch data in the Query Editor](https://docs.appsmith.com/assets/images/Screenshot_2022-07-12_at_22.38.19-76d65138dad56bde2698468dcdc27976.png)

- Click the **Run** button on the right of the Query Editor to confirm that the query returns data.
- Navigate to **PAGES** → **User Information**. Hover over the table and click on the table name 'usersTable' to open the property pane. On the [**Table Data**](https://docs.appsmith.com/reference/widgets/table#table-data) property write this JS snippet **`{{getUsers.data}}`** to display the results from the '**getUsers**' query on the table.

- Натисніть кнопку **Run** праворуч від редактора запитів, щоб підтвердити, що запит повертає дані.
- Перейдіть до **PAGES** → **User Information**. Наведіть курсор на таблицю та клацніть назву таблиці «usersTable», щоб відкрити панель властивостей. У властивості [**Table Data**](https://docs.appsmith.com/reference/widgets/table#table-data) запишіть цей фрагмент JS **`{{getUsers.data}}`** до відобразити результати запиту "**getUsers**" у таблиці.

Для написання JS у віджетах і запитів використовується Шаблон `{{mustache}}` .

![Bind the data from the query to the table widget](https://docs.appsmith.com/assets/images/Screenshot_2022-07-12_at_22.40.59-9581a425fbb5502bf564e2aec0b9f075.png)

- Подібним чином, щоб відобразити інформацію з вибраного рядка в таблиці, зверніться до наведеного нижче способу зв’язати відповідні дані з віджетами всередині Контейнера.

| Widget | Name       | Property     | Value                              |
| ------ | ---------- | ------------ | ---------------------------------- |
| Image  | -          | Image        | `{{usersTable.selectedRow.image}}` |
| Name   | nameInput  | Default Text | `{{usersTable.selectedRow.name}}`  |
| Email  | emailInput | Default Text | `{{usersTable.selectedRow.email}}` |
| DOB    | dobInput   | Default Date | `{{usersTable.selectedRow.dob}}`   |
| Phone  | phoneInput | Default Text | `{{usersTable.selectedRow.phone}}` |

Увімкніть перемикач **JS**, щоб зв’язати дані для властивості **Default Date**

- Створіть ще один запит до бази даних «**users**» і перейменуйте його на «**updateUsers**». Використовуйте наведену нижче команду оновлення, щоб записати будь-які змінені дані про віджети назад до бази даних.

```sql
UPDATE users SET name = '{{nameInput.text}}', email = '{{emailInput.text}}', dob = '{{dobInput.selectedDate}}', phone = '{{phoneInput.text}}' WHERE id = {{usersTable.selectedRow.id}} 
```

- На панелі властивостей кнопки **Update** виконайте цей запит для події [**onClick**](https://docs.appsmith.com/reference/widgets/button#events). Після успішного виконання запиту на оновлення запустіть запит «**getusers**», щоб заповнити таблицю оновленими даними.

![Bind query execution to the button&#39;s  onClick event ](https://docs.appsmith.com/assets/images/Screenshot_2022-06-28_at_11.36.28_PM-c6394f1be8b661ab8d317bc5bcdc6fbd.png)

- Перевірте кнопку «**Update**», змінивши номер телефону користувача.

> Ви створили свою першу програму, яка може відображати інформацію з бази даних і оновлювати дані, і все це всього за кілька хвилин.

## Розгорніть та діліться

- Натисніть кнопку **Deploy** у верхньому правому куті редактора Appsmith, щоб розгорнути програму та протестувати її як **App Viewer.**

- Після розгортання ви можете поділитися своєю програмою з користувачами. Натисніть на Share у верхньому правому куті редактора Appsmith.

   - Запрошуйте певних користувачів, використовуючи їхні ідентифікатори електронної пошти
  - Виберіть відповідну роль для користувача
     - Поділіться URL-адресою програми з користувачем
- Ви також можете зробити застосунок **публічним**. У цьому випадку будь-хто, хто має URL-адресу застосунку, може переглядати програму без входу. Ви можете прочитати більше про **керування доступом** [**тут**](https://docs.appsmith.com/advanced-concepts/ управління доступом).

Тепер, коли ви створили свою першу програму Appsmith, вам може бути цікаво, що вивчити далі. Швидкий старт охоплює лише основні поняття. Є ще багато чого для вивчення, тож переходьте до [**наступних кроків**](https://docs.appsmith.com/#advanced-users).