https://docs.appsmith.com/reference/widgets/filepicker

# Filepicker

У цьому документі пояснюється, як використовувати віджет вибору даних для запису дати й часу, введених користувачами.

## Завантаження файлів

Щоб завантажити файл або кілька файлів, ви можете перетягнути їх у віджет Filepicker або вибрати файли з локальної машини. Appsmith підтримує різні типи файлів і формати даних, зокрема:

- **Двійковий**: двійкові файли зберігають дані у формі безперервних байтів без визначеного методу читання. Щоб завантажити двійковий файл, виберіть формат даних як двійковий і завантажте файл.
- **Текст**: текстові файли зберігають дані як зрозумілі людині символи.
- **Base64**: Base64 – це схема кодування двійкового коду в текст, яка представляє двійкові дані у форматі рядка ASCII.
- **Масив (CSV)**: файли CSV зберігають табличні дані як звичайний текст, кожен рядок розділений розривом рядка, а кожне значення розділене комою.

- Будь-який файл, розмір якого перевищує 5 МБ, буде збережено як URL-адресу blob, а верхня межа розміру файлу становить 100 МБ.
- Під час використання даних у запиті вони завантажуються у вибраному форматі, незважаючи на те, що вони з’являються у форматі URL-адреси blob під час реєстрації даних.

Щоб отримати доступ до даних завантаженого файлу, ви можете використовувати наступний код у запиті або коді JS.

```js
{{ FilePicker1.files[0].data }}

//here [0] represents index of the file.
```

## Надсилання даних файлів із запитами API

Щоб завантажити файл через API, виконайте такі дії:

- Натисніть піктограму `+` поруч із Queries/JS і створіть новий пустий API.
- Як приклад розглянемо використання [Cloudinary API](https://cloudinary.com/documentation/image_upload_api_reference): `https://api.cloudinary.com/v1_1/{cloud_name}/image/upload`, де ` {cloud_name}` представляє ваше ім’я користувача Cloudinary. Ви можете отримати свої `cloud_name` і `upload_preset` з інформаційної панелі Cloudinary.
- Додайте URL-адресу Cloudinary API і встановіть заголовок у конфігурації джерела даних API.
- Налаштуйте тіло запиту в багатокомпонентну структуру, включаючи дані файлу зображення та будь-які додаткові метадані.

![Admin Settings option is available in the left sidebar](media/api-filepicker.png)

Обов’язково виберіть `File`  у спадному списку типу даних. Якщо ви хочете надіслати кілька файлів в одному ключі запиту, ви можете використати `{{ FilePicker1.files }}`, щоб включити весь вміст віджета Filepicker.

- Тепер оновіть властивість `onFilesSelected`, щоб RUN API.

Якщо ви маєте намір завантажувати файли значного розміру, відкоригуйте параметри часу очікування в конфігурації API.

Щоб дізнатися більше, перегляньте [як використовувати віджет Filepicker](https://www.appsmith.com/blog/upload-and-manage-files-on-cloudinary-with-the-filepicker-widget) для завантаження або керування файли на Cloudinary.

## Відобразити дані CSV у таблиці

Щоб відобразити дані CSV у [віджеті таблиці](https://docs.appsmith.com/reference/widgets/text), використовуйте формат даних Array. Цей формат дозволяє безпосередньо розбирати дані CSV у масив або масив об’єктів, на які можна посилатися на всій платформі. Щоб досягти цього, виконайте такі дії:

- Виберіть параметр **Array(Only CSV)**.
- Завантажте файл **CSV** за допомогою віджета Filepicker
- У властивості віджета Table додайте наступний код:

```js
{{FilePicker1.files[0].data}}
```

Це відображає дані CSV у форматі таблиці.

Так само ви можете використовувати [віджет зображення](https://docs.appsmith.com/reference/widgets/image) для відображення зображень із кодуванням base64, а також [текстовий віджет](https://docs.appsmith. com/reference/widgets/text), щоб відображати текстові файли з розширенням `.txt`.

Наразі підтримуються лише дані CSV; XLS або інші формати не підтримуються.

## Властивості

Властивості дозволяють налаштовувати віджет, підключати його до інших віджетів і запускати події під час дій користувача.

### Властивості віджетів

Ці властивості присутні на панелі властивостей віджета. У наведеній нижче таблиці перераховано всі властивості віджетів.

| Property                      | Data Type | Description                                                  |
| ----------------------------- | --------- | ------------------------------------------------------------ |
| **Label**                     | String    | Sets the text displayed within the widget.                   |
| **Maximum No. of files**      | Number    | Sets the maximum number of files allowed to be uploaded by a user. |
| **Maximum File Size**         | Number    | Sets the maximum allowed size of each file that a user can upload. |
| **Allowed File Types**        | Array     | Controls which types of files a user is allowed to upload. Accepts an array of  wildcards image/, exact mime types image/jpeg, or file extensions e.g.:  '.jpg', '.jpeg', '.png', '.gif']. The following file types are  supported: Images, Videos, Audio, Text, MS Word, JPEG, and PNG. |
| **Data Format**               | String    | Determines the data format of the files uploaded. You can choose from Base64, Binary, , Text, and Array(CSV). |
| **Infer data-types from CSV** | Boolean   | Enables or disables the automatic inference of data types from CSV files. |
| **Required**                  | Boolean   | Makes input to the widget mandatory.                         |
| **Visible**                   | Boolean   | Controls widget's visibility on the page.                    |
| **Disabled**                  | Boolean   | Makes the widget un-clickable or unusable. The widget remains visible to the user but user interaction won't be allowed. |
| **Animate Loading**           | Boolean   | Allows you to control a widget’s animation on the page load. |

### Довідкові властивості

На ці властивості можна посилатися в інших віджетах, запитах або функціях JS за допомогою оператора крапки. Наприклад, щоб перевірити налаштування видимості віджета, ви можете скористатися `FilePicker1.isVisible`.

| Property       | Data Type | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| **files**      | Array     | An array of file objects that have been selected by the user. Each file  object contains the file data, which can be accessed through its `data` property. |
| **isVisible**  | Boolean   | Indicates the state of the widget's Visible setting.         |
| **isDisabled** | Boolean   | Indicates the state of the widget's Disabled setting.        |
| **isDirty**    | Boolean   | Indicates whether the file picker has been used by the end user during their session. |
| **isValid**    | Boolean   | Indicates whether the file type selected by the user is considered valid for the widget. |

### Styles

Style properties allow you to change the look and feel of the widget.

| Property          | Data Type | Description                                                  |
| ----------------- | --------- | ------------------------------------------------------------ |
| **Button Color**  | String    | Sets the color of the widget's button. Accepts valid CSS [`color` ](https://developer.mozilla.org/en-US/docs/Web/CSS/color)values. |
| **Border Radius** | String    | Rounds the corners of the widget's outer edge. With JS enabled, this accepts valid CSS [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) values. |
| **Box Shadow**    | String    | Casts a drop shadow from the frame of the widget. With JS enabled, this accepts valid CSS [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) values. |

## Events

These are functions that are called when event listeners are triggered in the widget. Use [actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) to execute tasks based on user events.

| Event               | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| **onFilesSelected** | The onFilesSelected event is triggered when a user selects a file through the widget, allowing you to define a specific action. |