# Appsmith Framework

https://docs.appsmith.com/reference/appsmith-framework

Платформа Appsmith розроблена, щоб полегшити розробникам створення динамічних додатків, керованих даними, які реагують на взаємодії користувача в режимі реального часу. Він надає низку службових функцій і об’єктів, які дозволяють розробникам отримувати доступ до важливої інформації, такої як поточна URL-адреса програми або автентифікований користувач тощо. Це спрощує створення програм, які знають поточний контекст і можуть реагувати на зміни в реальному часі.

Однією з ключових особливостей структури Appsmith є її вбудовані функції, такі як зберігання значень у локальному сховищі. Зберігання значень у локальному сховищі можна використовувати для зберігання такої інформації, як налаштування користувача, дані сеансу або тимчасові дані, які потрібно передавати між сторінками. Це дозволяє розробникам зберігати та отримувати дані, які стосуються поточного користувача чи сеансу, не турбуючись про керування сховищем самостійно. Додаткову інформацію див. у [storeValue](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value).

Він також надає інші функції, такі як навігація до сторінки, відображення повідомлень користувачам і багато іншого. Додаткову інформацію див. у розділі [Actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions)

Крім того, Appsmith пропонує різноманітні вбудовані глобальні об’єкти, такі як Query Object, Context Object і Console Object, які дають змогу розробникам виконувати запити до бази даних, обмінюватися даними між різними сторінками за допомогою параметрів, отримувати інформацію про поточну статус програми та допомогу в налагодженні коду відповідно.

# Context Object

Context об’єкт Appsmith надає інформацію про поточний стан програми

## Properties

The Appsmith context object contains the following properties:

```javascript
{
   store: object,
   URL: object,
   user: object,
   geolocation: object,
   mode: enum
}
```

### Store

Цей об’єкт містить пари ключ-значення локального сховища програми. Значення для сховища можна оновити за допомогою [функції storeValue](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value). Значення зі сховища можна отримати за допомогою їх ключа.

```javascript
{{ appsmith.store.key }}
```

### URL

Цей об’єкт містить усі значення, пов’язані з поточною URL-адресою, на якій перебуває користувач. Об’єкт queryParams цього поля можна використовувати для читання даних, надісланих з інших сторінок на цю сторінку за допомогою [функції navigateTo](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/navigate-to) . Значення з URL-адреси можна отримати за допомогою:

```javascript
{{ appsmith.URL }}
{
  host: string,
  hostName: string,
  fullPath: string,
  pathName: string,
  port: string,
  protocol: string,
  hash: string,
  queryParams: object
}
```

#### host

The host property of the URL interface is a string that includes the hostname, and then, a `:`, followed by the port of the URL(if the [port](https://docs.appsmith.com/reference/appsmith-framework/context-object#port) is available).

Example:

```js
//{{appsmith.URL.host}}
host:"app.appsmith.com:111"
```

#### hostName

The hostname property of the URL is a string that holds the **domain of the URL**. In simple words, hostname is the [host](https://docs.appsmith.com/reference/appsmith-framework/context-object#host) name (without the port number).

Example:

```js
//{{appsmith.URL.hostname}}
hostName:"app.appsmith.com"
```

#### fullPath

A full-path URL designates an EXACT location (such as a page, app, file,  etc.). In addition to the Domain and Top Level Domain(TLD), a full-path  URL needs to include the protocol, subdomain (such as "app," "support,"  etc.), path/destination, and possibly a file extension as well as query  parameters. A full-path can include:

- Protocol
- Subdomain
- Domain Name
- Top Level Domain (TLD)
- Path
- Parameters

Example:

```js
//{{appsmith.URL.fullPath}}
fullPath:"https://app.appsmith.com/app/demo-app/page1-6324031aa"
```

У попередньому прикладі `6324031aa` представляє **id** сторінки під назвою `page1`. Поточний слаг сторінки в URL-адресі створюється комбінуванням `$pageName-$pageId`. Кожна сторінка має унікальний ідентифікатор сторінки, який їй присвоюється.

#### pathName

Це рядок, що складається з набору сегментів шляху, перед кожним з яких є символ `/`. Порожній рядок буде значенням властивості pathname, якщо URL-адреса не має сегментів шляху.

Example:

```js
//{{appsmith.URL.pathname}}
pathName:"/app/demo-app/page1-6324031aa"
```

#### port

The port property of the URL is a string that contains the port number of the URL.

Example:

```js
//{{appsmith.URL.port}}
port:"3000"
```

#### protocol

The protocol property of the URL is a string that represents the protocol scheme of the URL, including the `:`.

> The resource name and the protocol identification are separated from one another by a colon and two forward slashes.

Example:

```js
//{{appsmith.URL.protocol}}
protocol:"https:"
```

#### hash

The `appsmith.URL.hash` value is the string after the hashtag (**including `#`**). The URL fragment identification is followed by a hash symbol (#), which is the hash property of the URL interface.

Example:

```js
//{{appsmith.URL.hash}}
hash:"#n912xhego"
```

#### queryParams

Параметри запиту – це попередньо означений набір параметрів, які означують певний вміст або дії на основі даних, що доставляються. URL-адреса містить усі параметри запиту, додані в кінці роздільником `?`.

приклад:

```js
//{{appsmith.URL.queryParams}}
queryParams:"?name=value&variable=value"
```

### User

Цей об’єкт містить дані поточного автентифікованого користувача.

```javascript
{
  email: string
  username: string
  name: string
  isEnabled: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  isAnonymous: boolean
}
```

### Geolocation

This object contains functions to request the current user location and the coordinates received from this request https://developer.mozilla.org/en-US/docs/Web/API/Geolocation\_API .

```javascript
{
 canBeRequested: boolean,
 getCurrentPosition: Function,
 watchPosition: Function,
 clearWatch: Function,
 currentPosition: {
   coords: {
      accuracy: number,
      altitude: number | null,
      altitudeAccuracy: number | null,
      heading: number | null,
      latitude: number,
      longitude: number,
      speed: number | mull,
   },
   timestamp: number,
 }
}
```

**getCurrentPosition**

Signature:

```javascript
(
 onSuccessCallback?,
 onErrorCallback?,
 options?: { maximumAge?: number, timeout?: number, enableHighAccuracy?: boolean } 
) -> void
```

Almost similar to the original browser API, apart from the fact that you don't need to pass the success callback. On success, the location would  automatically be stored at `appsmith.geolocation.currentPosition.coords`. If onSuccessCallback is passed, it would be called with the location information received.

**watchPosition**

Signature:

```javascript
(
  onSuccessCallback?,
  onErrorCallback?,
  options?: { maximumAge?: number, timeout?: number, enableHighAccuracy?: boolean } 
) -> void
```

Almost similar to the original browser API, apart from the fact that you don't need to pass the success callback. On success, the location would  automatically be stored at `appsmith.geolocation.currentPosition.coords` with the `appsmith.geolocation.currentPosition.timestamp` updated whenever the position was last updated. The callbacks, if  provided, gets executed automatically when the location has changed. No  watchId is returned as well as the platform only allow for a single `watchPosition`

**clearWatch**

Signature: `() -> Promise`

Almost similar to the original browser API, apart from the fact that you don't have to pass the watchId. If a watch is active, you must clear it  before starting a new one.

### Mode

This field is an enum that contains whether the app is currently running in  view mode or edit mode. It takes the values VIEW|EDIT

# Console Object

[Об’єкт консолі](https://developer.mozilla.org/en-US/docs/Web/API/Console_API) забезпечує простий спосіб надсилання повідомлень журналу з веб-переглядача на консоль розробки або відображення повідомлень у веб-переглядачі коли виникає помилка. За замовчуванням вихід консолі відображатиметься на вкладці консолі веб-переглядача, яку можна переглянути, викликавши інструменти розробника вашого веб-переглядача.

Консоль є невід’ємною частиною інструментарію будь-якого розробника – вона дозволяє відстежувати, що робить ваша програма, реєструючи повідомлення, помилки та попередження, щойно вони виникають. Ці інформативні журнали значно полегшують налагодження коду та визначення джерела помилок і неочікуваної поведінки.

Appsmith надає глобальний об’єкт консолі для реєстрації інформації про ваш [API](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication), [Queries](https://docs.appsmith.com/core-concepts/data-access-and-binding/querying-a-database) і [Widgets properties](https://docs.appsmith.com/reference/widgets) у вашому коді JavaScript. Викличте консольний об’єкт за допомогою подвійних фігурних дужок (вусів \{\{ \}\}) у властивостях віджета або [безпосередньо у вашому коді](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#use -корпус).

Журнали консолі **не** зберігаються і доступні **лише** для **поточного сеансу.**

## Methods

A console method is a function executed on a console object that logs  different types of messages. The following methods are available to you  for logging messages:

- log
- error
- warn

info

The console object **only** supports **log**, **error**, and **warn** methods. You can also use the **info** and **debug** methods. However, these methods offer the same feature as the **log** method.

For example, you are building an app and integrating external API to get  input. Your app code behaves differently depending on the type of  response generated from the API.

Here's a code snippet of [JS Object ](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#code-workflow)where you're calling an external API(`getTaskList`), and depending on the generated response, you return the desired output. You either send an email to notify the user or alert the administrator  that no action is needed.

```javascript
export default {
    notifyUserIfTaskIsIncomplete: async () => {
        let isTaskIncomplete = false;
        const taskList = getTaskList.data.record;
        for (const task of taskList) {
            if(task.ownerId == Table1.selectedRow.ownerId && task.endDate < Date() && task.status != "Completed") {
                isTaskIncomplete = true;
                break;
            }
        }
        if (isTaskIncomplete){
            sendEmailToNotifyUser.sendEmail();
            return;
        } 
        showAlert("No action is needed");
}
```

The API generates the correct response when executed standalone, and your  app code works as expected. However, the code fails during integration  because the API response either is not generated or isn't as expected.

To troubleshoot the error, you would want to log some messages: at the start of the API call, the parameters you are [building and passing to the API](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis#passing-data-parameters-to-api-calls), the response you get from the API, and the result. Here, the console  object comes in handy. You can use different methods such as [`log`](https://docs.appsmith.com/reference/appsmith-framework/console-object#log) to log the start of the method, parameters, and result, [`error`](https://docs.appsmith.com/reference/appsmith-framework/console-object#error) to log the error messages returned by the API, and [`warn`](https://docs.appsmith.com/reference/appsmith-framework/console-object#warn) to log the warnings returned by API.

### Log

The `console.log()` method outputs a message to the logs tab. The message could be a single string value, multiple string values, or JavaScript object.

note

Console methods **don’t** support **string substitutions**.

For outputting the entry-level messages, parameter values, and end result, you can add the console.log messages as below:

```javascript
export default {
    notifyUserIfTaskIsIncomplete: async () => {
        console.log("Entered method- notifyUserIfTaskIsCompleted");
        let isTaskIncomplete = false;
        console.log("Selected Owner Id: " + Table1.selectedRow.ownerId);
        const taskList = getTaskList.data.record;
        for (const task of taskList) {
            if(task.ownerId == Table1.selectedRow.ownerId && task.endDate < Date() && task.status != "Completed") {
                isTaskIncomplete = true;
                break;
            }
        }
        if (isTaskIncomplete){
            sendEmailToNotifyUser.sendEmail();
            return;
        } 
        showAlert("No action is needed");
        console.log("Exitted method- notifyUserIfTaskIsCompleted");
    }
}
```

The method entry, exit, and parameter supplied to the method can be logged and viewed in the [logs tab](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#logs-tab).

For logging a single string, multiple strings, or JavaScript objects, use  the code snippet in the for loop to print the task object as below:

```javascript
console.log("Current from the tasklist response: " , task);
```

You can examine the task object and its attributes that are part of the  response to evaluate the conditions and fix the code if necessary.

### Error

The `console.error()` method outputs an error message to the [logs tab](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#logs-tab). It can log a string, written as-is - with a custom error object, - or  with a function that returns either a string or prints a custom object.

note

Console methods **don't** support **string substitutions.**

After reviewing the entry, parameters, and exit messages printed in the logs  tab, you aren't sure what's breaking the code. To troubleshoot further,  you should enclose the API call and the method logic within a `try-catch` block. You could have a custom function that evaluates all the types of errors the API can throw, outputs the appropriate message, and can use  the console.error() method to print the returned message.

```javascript
printErrorMessages: (errorCode) => {
    if (errorCode == "403 Forbidden") {
        return "Access Denied!";
    } else if (errorCode == "503 Service Unavailable") {
        return "The server is either not available or shut down.";
    }
}
```

Use the `console.error()` method in the catch block in the `notifyUserIfTaskIsIncomplete` method to print the error messages returned by the `printErrorMessages` method.

```javascript
export default {
    notifyUserIfTaskIsIncomplete: async () => {
        console.log("Entered method- notifyUserIfTaskIsCompleted");
        let isTaskIncomplete = false;
        console.log("Selected Owner Id: " + Table1.selectedRow.ownerId);
        try{
                const taskList = getTaskList.data.record;
                for (const task of taskList) {
                console.log("iterableTask from the tasklist response: " , task);
                if(task.ownerId == Table1.selectedRow.ownerId && task.endDate < Date() && task.status != "Completed") {
                    isTaskIncomplete = true;
                    break;
                }
            }
                if (isTaskIncomplete){
                    sendEmailToNotifyUser.sendEmail();
                    return;
                } 
                showAlert("No action is needed");
                console.log("Exitted method- notifyUserIfTaskIsCompleted");
        }catch (err) {
            console.error(this.printErrorMessages(err.name));
        }
    },
    printErrorMessages: (errorCode) => {
        if (errorCode == "401 Unauthorized") {
            return "Access Denied!";
        }
    }
}
```

The error messages can be logged and viewed in the logs tab.

![img](https://docs.appsmith.com/assets/images/Appsmith_Framework__Console_Object__Console.error_messages-535ef3c38389cc0993aea2f958cd7c5b.png)

Having reviewed the error messages and correcting the code, you want to be  sure that the code shouldn't raise any warnings that could halt the  processing. To accomplish this, use the `console.warn()` method.

### Warn

The `console.warn()` method logs a warning message in the [logs tab](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#logs-tab). Like `console.log()` and `console.error()`, you can log strings and JavaScript objects as warning messages.



note

Console methods **don’t** support **string substitutions**.

Warnings indicate cases where something may go wrong at runtime, so they shouldn't be ignored and can be logged using the `console.warn()` method.

```javascript
console.warn(this.printWarningMessages()); 
```

The `printWarningMessages` method is a custom method that returns the warning messages and logs them in the [logs tab](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#logs-tab).

![img](https://docs.appsmith.com/assets/images/Appsmith_Framework__Console_Object__Console.warn_messages-4f1596a248c31e471eb202878477dce1.png)

You can review the warning message, `API.errorCode(Number1) is deprecated.`, and fix the code as necessary.

When using the console methods: `log`, `error`, and `warn`, you can debug the complex execution logic and fix the problem.

## Benefits of using console

The console object facilitates fast debugging and locates the root cause of the issue. It's easy to use and doesn't require developer tools.

- **Ease**: The console object is useful for logging the runtime context of an app. You can log messages in a particular context by using `console.log()`, `console.error()`, or `console.warn()`.
- **Available in the Appsmith Editor**: Messages are logged in the logs tab and can be accessed in the Appsmith editor without invoking the browser's developer tools.

## Viewing the logged messages

The [logs tab](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#logs-tab) displays the logged messages. It shows system and user-generated  messages(the console object's log, error, and warn methods are used for  logging user-generated messages). Users can distinguish between them  using the icon prefixed to the timestamp. A system-generated message has a desktop icon, whereas the user-generated message has a user icon  prefixed.

It also displays the message origin ([JS Object](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta)/[Widget](https://docs.appsmith.com/reference/widgets)), so you can navigate to the [widget](https://docs.appsmith.com/reference/widgets) or [JS Object](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta).

![img](https://docs.appsmith.com/assets/images/Appsmith_Framework__Console_Object__Viewing_logged_messages-13ee44cc82cf219de3a24cab1b34b3fd.png)



info

When you're in the logs tab, you can filter them by console logs which are user-generated messages.

![img](https://docs.appsmith.com/assets/images/Appsmith_Framework__Console_Object__Viewing_logged_messages_Filter-1a1cb34c72de1da4873ec0e24e55e642.png)

Debugging with the console object is more efficient, faster, and easier than  using a debugger directly in the Appsmith Editor. There is no need to  worry if you have complex API logic, multiple [JS Objects](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta), or complicated queries to debug.



info

If you're experiencing issues, please go through the [JS Errors](https://docs.appsmith.com/help-and-support/troubleshooting-guide/js-errors)/[Action Errors](https://docs.appsmith.com/help-and-support/troubleshooting-guide/action-errors) [troubleshooting guide ](https://docs.appsmith.com/help-and-support/troubleshooting-guide)or raise your queries via [Discord](https://discord.com/invite/rBTTVJp) or the [Community Forum.](https://community.appsmith.com/)

# Query Object

На цій сторінці описано, як використовувати об’єкт Query для виконання запитів і доступу до даних із відповіді.

## run()

Виклик функції `run()` запиту виконує цей запит. `run()` є асинхронним і повертає обіцянку, тому ви можете використовувати його з асинхронним синтаксисом, таким як ланцюжки `.then()` і `async/await`. Його не можна використовувати в [synchronous fields](https://docs.appsmith.com/core-concepts/writing-code/workflows#display-data-from-async-js-function)

### Signature

```text
run(params: Object): Promise
```

| Argument   | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| **params** | Об’єкт, що містить пари ключ-значення для передачі в запит. Доступ за допомогою `{{ this.params.key }}`. |

Ця функція повертає **promise** JavaScript, яку можна використовувати для послідовної обробки асинхронних дій. Використовуйте `.then()` і `.catch()`, щоб написати код, який буде виконано, коли запит повертається успішно або помилково відповідно. Або використовуйте синтаксис `async/await`.

```js
// Using promise syntax to chain actions in sequence
    Query1.run(params)
        .then(() => {...}) // run after the query is successful
        .catch(() => {...}) // run if the query encounters any errors
```

Щоб дізнатися більше про з’єднання дій для створення складних робочих процесів, див  [complex workflows](https://docs.appsmith.com/core-concepts/writing-code/workflows#complex-workflows). 

### Передайте параметри в run()

Більшість запитів зчитують значення безпосередньо з сутностей як глобальні змінні. У деяких випадках, як-от виконання запиту в циклі, може знадобитися передати параметри в запит зі значеннями, що залежать від контексту виконання.

Для цього використовуйте аргумент `params`, щоб передати об’єкт пар ключ-значення у свій запит. Ви можете отримати доступ до цих значень у запиті за допомогою `{{ this.params.key }}`.

#### Example

Уявіть, що вам потрібно отримати конкретних користувачів із бази даних на основі їхнього значення `id`. У цьому прикладі ви побачите, як налаштувати запит і допоміжну функцію для отримання масиву ідентифікаторів і виконання запиту для кожного з них.

**Setup**

На полотні ви повинні мати [Table widget](https://docs.appsmith.com/reference/widgets/table)  і [Button widget](https://docs.appsmith.com/reference/widgets/button).

Використовуйте імітаційну базу даних Postgres  `user` Appsmith для створення запиту під назвою `GetUserById`. Додайте такий оператор SQL до запиту:

```sql
SELECT * FROM users WHERE id = {{ this.params.id }};
```

Цей оператор очікує, що параметр буде передано функцією `run()` для використання як значення `id`.

Створіть об’єкт JS і назвіть його `utils`. Тут ви пишете свою допоміжну функцію, яка викликає запит і обробляє відповіді на нього. Наведений нижче фрагмент коду запускає запит один раз для кожного `id` у його масиві `ids`, очікує на відповідь бази даних і зберігає отримані записи таблиці в [Appsmith store](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value).

- Promise chains
- async/await

```javascript
// function in the utils JS Object
getByIds: async (ids) => {
    const queries = ids.map(id => {
        return GetUserById.run({"id": id})
    })
    
    Promise.allSettled(queries)
        .then(queryResponses => queryResponses.map(res => res.value[0]))
        .then(records => storeValue("records", records))
}
```

Тепер, коли функція `utils.getByIds()` запускається з масивом ідентифікаторів, ваші результуючі записи будуть доступні в магазині Appsmith. Прив’яжіть це значення до властивості **Table Data** вашого віджета Table:

```javascript
// Table Data property of the Table widget
{{ appsmith.store.records }}
```

Нарешті, щоб виконати запит, установіть подію **onClick** (в подвійних фігурних дужках) віджета Button для виконання вашої допоміжної функції:

```javascript
// Button widget's onClick
utils.getByIds([1, 4, 8, 34, 16])
```

Коли ви натискаєте цю кнопку, вона запускає вашу допоміжну функцію, яка запитує базу даних для кожного з потрібних вам користувачів.

## Properties

These properties are used to reference and control data related to your query.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **data**                                                     | Contains the response body from the last successful execution of this query. If  this property is referenced in a widget's property field, the query is  automatically run on page load. |
| **responseMeta**                                             | Contains metadata from the last response to this query's execution. |
| **clear()**                                                  | Empties all data from the query's **`data`** property.       |
| [**run()**](https://docs.appsmith.com/reference/appsmith-framework/query-object#signature) | Executes the query when called. Can't be called in sync fields; see [sync vs. async fields](https://docs.appsmith.com/core-concepts/writing-code/workflows#display-data-from-async-js-function). |

# Actions

The Appsmith framework allows triggering actions for widget events and inside JS  Objects. There are functions to navigate to another page, show alert  messages, open/close modals, and store data in local storage.

Browse this section to learn about the different actions you can trigger on Appsmith.

[actions](actions.md)