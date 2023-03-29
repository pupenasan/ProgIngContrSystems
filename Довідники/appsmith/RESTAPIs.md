# REST APIs

https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication

За допомогою Appsmith ви можете підключитися до широкого спектру інструментів і платформ. Якщо ви хочете підключитися до API або якщо на Appsmith немає вбудованої інтеграції з джерелом даних, ви можете підключитися через інтерфейс REST API.

Якщо API захищено механізмом автентифікації, який вимагає стандартного набору заголовків або параметрів, які потрібно надсилати з кожним запитом, ви можете зберегти їх у загальному джерелі даних, яке можна повторно використовувати з кожним запитом, відомим як Authenticated  API datasources.

Appsmith шифрує всі ваші облікові дані джерела даних і надійно зберігає їх. Appsmith також не зберігає дані, отримані з ваших джерел даних, і діє лише як проксі-рівень для організації виконання запитів. Оскільки Appsmith є фреймворком із відкритим кодом, ви можете [розгорнути його локально](https://docs.appsmith.com/getting-started/setup) і перевірити його, щоб переконатися, що жодні ваші дані не залишають ваш VPC. Додаткову інформацію див. у розділі [Безпека](https://docs.appsmith.com/product/security#security-measures-within-appsmith).

## Підключення до REST API

Щоб підключитися до REST API, перейдіть на вкладку **Explorer**, натисніть значок **+** поруч із **Datasources** і виберіть **REST API**.

Ви можете надати URL-адресу та додаткову інформацію, як-от Headers,  Params, Body, and Pagination. Після додавання деталей запиту ви можете безпосередньо запустити запит API та прив’язати його до віджетів для відображення результатів в інтерфейсі користувача. Щоб дізнатися більше про налаштування деталей запиту API, перегляньте документацію про [налаштування API](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis ).

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/IptCmvKdbog" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/IptCmvKdbog><img src=https://img.youtube.com/vi/IptCmvKdbog/maxresdefault.jpg alt='Connect to REST API'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Connect to REST API" loading="lazy" frameborder="0"></iframe>

### Зразок API

Appsmith надає приклад API `https://mock-api.appsmith.com`, щоб допомогти вам навчитися створювати та змінювати запити за допомогою [панелі REST API](https://docs.appsmith.com/core-concepts/connecting -to-data-sources/authentication/connect-to-apis).

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/DWLF0pNjjuI" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/DWLF0pNjjuI><img src=https://img.youtube.com/vi/DWLF0pNjjuI/maxresdefault.jpg alt='Using A Sample API '><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Using A Sample API " loading="lazy" frameborder="0"></iframe>

*How to use sample API*

Щоб використовувати зразки API:

1) Перейдіть на вкладку **Explorer**, клацніть значок **+** біля **Datasources**.

2) Виберіть **REST API**

3) Щоб отримати дані користувачів із цього API, виберіть метод `GET` і введіть таку URL-адресу:

```js
https://mock-api.appsmith.com/users?page=1
```

4) Натисніть кнопку **RUN**, щоб виконати запит API та переглянути відповідь.

## Створення автентифікованого джерела даних API

Коли ви створюєте автентифіковане джерело даних API, вам потрібно налаштувати заголовки та параметри запиту лише один раз, а потім не потрібно налаштовувати їх для кожного запиту API. Крім того, для забезпечення авторизованого доступу та безпечної передачі даних можуть бути реалізовані різні механізми автентифікації, такі як OAuth 2.0, заголовки підпису, самопідписані сертифікати, автентифікація на основі маркера носія та автентифікація на основі ключа API.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/Uy7ZDviGbtM" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/Uy7ZDviGbtM><img src=https://img.youtube.com/vi/Uy7ZDviGbtM/maxresdefault.jpg alt='Creating an authenticated API '><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Creating an authenticated API " loading="lazy" frameborder="0"></iframe>

*Створення автентифікованого джерела даних API*

To create an authenticated API datasource:

1. On the **Explorer** tab, click the **+** icon next to **Datasources**
2. Select **Authenticated API**.
3. Click on the edit pencil icon next to the default name to rename the datasource.
4. Provide the configuration details required to connect to your API.
   - [**Name**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#name):		Specify a name for the API datasource.
   - [**Method**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#method):	Select the method for the API request.
   - [**URL**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#url):		Specify the URL for the API endpoint.
   - [**Headers**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#headers):		Set the required HTTP headers for the API request.
   - [**Query parameters**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#params):		Provide the query parameters for the API request, if necessary.
   - [**Authentication type**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/authentication-type): Define an authentication type for REST APIs by using the protocols available on Appsmith.
   - [**Send appsmith signature header**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#send-appsmith-signature-header): Ensure that the incoming requests originate from Appsmith.
   - [**Use self-signed certificate**](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/self-signed-certificates):  These certificates can be configured as part of the Advanced Settings. 
5. **Save** the datasource. The configuration details aren't saved/updated until  the Save button is clicked. When the datasource has been added  successfully, a success message appears at the top of the app window.

If you want to connect to an API that's not publicly available on the internet, you can use a service like [ngrok](https://ngrok.com/) to expose it. For more information, see [How to work with local APIs on Appsmith](https://docs.appsmith.com/advanced-concepts/more/how-to-work-with-local-apis-on-appsmith).

## Імпорт команд cURL

cURL — це інструмент командного рядка, який можна використовувати для надсилання HTTP-запитів до сервера. Ви можете використовувати cURL для надсилання HTTP-запитів, таких як GET, POST, PUT і DELETE, на сервер для отримання або обробки даних. Appsmith дозволяє легко імпортувати ваші API у вашу програму за допомогою команд cURL.

To import cURL commands into your application:

1. On the **Explorer** tab, click the **+** icon next to **Datasources**
2. Select **cURL Import**.
3. Add your cURL command, for example:

```js
curl -X GET https://example.com/resource
```

1. Click the **Import** button.

![img](https://docs.appsmith.com/assets/images/import_curl_(1)-69569bd36b5168c966e933df5e68e811.gif)

## Native API datasources

- [GraphQL](https://docs.appsmith.com/reference/datasources/graphql)
- [Google Sheets](https://docs.appsmith.com/reference/datasources/querying-google-sheets)
- [Airtable](https://docs.appsmith.com/reference/datasources/airtable)
- [Twilio](https://docs.appsmith.com/reference/datasources/twilio)
- [HubSpot](https://docs.appsmith.com/reference/datasources/hubspot)

Appsmith can also seamlessly connect with most other tools through the RESTful API plugin. For more information, see [Integrations](https://docs.appsmith.com/learning-and-resources/integrations)

## Passing parameters to API requests

There are three ways to pass parameters to API calls on Appsmith as shown in the video below:

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/znaaDiQbAS8" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/znaaDiQbAS8><img src=https://img.youtube.com/vi/znaaDiQbAS8/maxresdefault.jpg alt='How to pass parameters to an API call'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="How to pass parameters to an API call" loading="lazy" frameborder="0"></iframe>

*How to pass parameters to an API call*

## Send body data with API requests

Appsmith supports a variety of encoding types for sending data in API queries. The encoding type can be selected via the **Body** dropdown on the API editor. Selecting **NONE** omits a body from the request.

### URL-encoded form data

Selecting the value **FORM_URLENCODED** (for `application/x-www-form-urlencoded`) automatically encodes your key/value pairs to be sent in the body field.

### Multipart/Form-data

Multipart requests can include several different types of data within them, such  as a file along with some other related metadata. To set up your query  to send with `multipart/form-data` encoding, navigate to its query editor screen, click the **Body** tab, and find the **MULTIPART_FORM_DATA** tab beneath it.

![Use multipart form encoding in your API request](https://docs.appsmith.com/assets/images/multipart_editor-f4274ebd8341689d84bd296484d66634.png)

To submit a file as a multipart input, use a [Filepicker widget](https://docs.appsmith.com/reference/widgets/filepicker) to upload a file to your application. Once it has been uploaded, you can bind `{{ FilePicker1.files[0] }}` as a value in your API's multipart request body. Be sure to select  "File" in the datatype dropdown. If you would like to submit multiple  files in the same request key, you can alternatively use `{{ FilePicker1.files }}` to include the entire contents of the Filepicker widget.

The file data from the Filepicker widget can be in any data format (base64  or binary) according to the requirements of the endpoint that you're  connecting to.

You can also pass plain text values in your  multipart request by selecting the "Text" option in the datatype  dropdown. If you wish to pass multiple plain text values under the same  key, be sure to use the "Array" option instead.

![Use &quot;File,&quot; &quot;Array,&quot; and &quot;Text&quot; data types in your multipart-encoded request.](https://docs.appsmith.com/assets/images/multipart_fields-b42d46e76bd162961ea475ce36ee50db.png)

```javascript
// type: Text
{{ Text1.text }}
// type: Array
{{[ Text1.text, Text2.text, "hello, world"]}}
```

### Raw data

If your endpoint can't accept multipart-encoded data and requires raw body binary instead, choose the **RAW** tab under the query **Body** tab instead of MULTIPART_FORM_DATA. In this case, you would pass the `data` property of your file to the query instead of the file object itself, because the endpoint expects only raw binary data:

```javascript
// Binary data in the RAW format
{{ Filepicker1.files[0]?.data }}
```

The preceding example uses [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) using the `?` operator. This way, if the `files[0]` doesn't exist, attempting to access `data` returns `undefined` instead of raising an error.

Be sure to turn off the **JSON Smart Substitution** setting for this query in the query settings. This option is useful for helping to cast data into the correct JSON formats, however it can be  problematic when used with RAW body binary encoding.

## Troubleshooting

Are you having trouble? check out the [API response troubleshooting guide](https://docs.appsmith.com/help-and-support/troubleshooting-guide/query-errors) or reach out on[ Discord](https://discord.com/invite/rBTTVJp) to get support or ask questions on the [community forum](https://community.appsmith.com/).