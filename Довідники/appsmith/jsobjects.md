# JS Objects

Написання великого коду без повноцінного редактора може бути складним завданням. Редактор JavaScript (бета-версія) в Appsmith дозволяє створювати багаторазовий набір функцій JavaScript, які можна викликати в межах прив’язок JavaScript у компоненті сторінки, щоб легко писати складний код. В Appsmith це називається  `JS Objects`.

**How to Create a JS Object?**

Об’єкт JS – це сутність, що складається з кількох функцій і змінних. Це повторно використовуваний компонент, на який можна посилатися в інших об’єктах JS, що дозволяє створювати організований набір ієрархій. Ви можете створювати нові об’єкти JS з Entity Explorer.

На екрані нижче показано об’єкт JS, доданий до сторінки. Шаблон коду за замовчуванням, який підтримує [export default](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

1. Дайте значущу назву JSObject
2. Редактор коду, де можна писати код JavaScript
3. Налаштування доступні лише для [асинхронних функцій](https://docs.appsmith.com/core-concepts/writing-code/#asynchronous).
4. Дайте визначення змінним
5. Дайте визначення функцій
6. Використовуйте редактор для виконання кількох завдань, зокрема:
    1. Напишіть свій код
    2. Виклик вбудованих або визначених користувачем функцій
    3. Виклики API
    4. Виконання запиту до бази даних
7. Додайте кілька функцій до об’єкта JS
8. Отримайте доступ до об’єктів JS із Explorer, доступного в групі JS Objects Group

Підтримка названого [експорту](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) недоступна для функцій експорту. Однак ви можете розкрити функції, які є частиною об’єкта JS, використовуючи експорт **default**.

## Calling a JS Object function

Ви можете викликати функції, визначені в об’єкті JS, використовуючи нотацію `{{ JS_OBJECT_NAME.Function_Name }}`, вбудовану в знак вуса, як показано на малюнку нижче:

Визначені об’єкти JS доступні в API, запитах або інших об’єктах JS, визначених для **конкретної сторінки**, мають **доступ на рівні сторінки** і **не** доступні **на інших сторінках** .

## Типи функцій JS

Ви можете писати різні типи функцій в об’єкті JS, які можуть бути синхронними або асинхронними.

### Синхронний

Як випливає з назви, синхронний означає бути в послідовності, це означає, що кожен оператор коду виконується один за іншим. Таким чином, оператор повинен чекати завершення виконання попереднього оператора. Наприклад, наведений нижче фрагмент коду показує фільтр даних:

```js
Api.data.filter(() => {}); // filtering data 
```

Тут фільтрація даних — це процес вибору підмножини даних, які ви хочете вибрати для перегляду чи аналізу. Щоб відфільтрувати дані, ви повинні оглянути весь набір даних один за одним і відокремити його, якщо він відповідає критеріям фільтра. Таким чином, вам потрібно синхронне виконання.

### Асинхронний

Слово асинхронний означає, що не відбувається одночасно. Іноді вам може знадобитися отримати дані з сервера або виконати функцію із затримкою, чого ви не очікуєте в поточний момент.

Наприклад, `Promises`, `Api.run()`, `Query.Run()`, функції платформи Appsmith (наприклад, `showModal`). По суті, це дозволяє відкласти виконання коду, вбудованого в асинхронну функцію, і виконується за потреби.

Ви можете [налаштувати додаткові параметри для асинхронної функції](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta/asynchronous-javascript-function-settings) і покращити взаємодію з користувачем (див нижче).

## Working with JavaScript editor

Редактор JavaScript — це розширений редактор, який надає додаткові функції під час написання коду. Ви можете зробити багато з ним, наприклад:

| **What do you get?** | **Description**                                              |
| -------------------- | ------------------------------------------------------------ |
| **Response Tab**     | Виконайте кожну функцію під час розробки та перегляньте результати на вкладці Response |
| **Linting Errors**   | Виявляйте помилки лінтингу прямо в редакторі                 |
| **Errors Tab**       | Перевірте наявність синтаксичних помилок на вкладці «Errors ». |
| **Logs Tab**         | Перевірте журнал виконання функції на вкладці Logs           |
| **Snippets**         | Вставте готові до використання фрагменти                     |
| **Debugging**        | Використовуйте оператори налагоджувача, щоб призупинити виконання, або `console.log()`, щоб надрукувати повідомлення про налагодження |

To understand how JavaScript Editor works, let’s create a **Hello World JS Object**.

- Navigate to **Explorer** >> Click **(+)** for **Queries/JS** >> Select **New JS Object.**
- You’ll see the default code template. Add the below code snippet:

```text
export default {
   hello: () => {
      return “Hello World”;
   }
}
```

### Вкладка response

Вкладка відповіді відображає **output**, створений функціями, визначеними в об’єкті JS.

#### Виконати функцію

Ви можете натиснути **Execute ** у верхньому правому куті, щоб виконати функцію JS. Якщо ваш об’єкт JS має лише одну визначену функцію, редактор за замовчуванням використовує назву функції. Але якщо у вашому об’єкті JS визначено більше однієї функції, ви можете вибрати функцію, яку хочете виконати, а потім натиснути **Run**.

Якщо ваш код містить синтаксичні помилки, кнопка **Run** вимикається та блокує виконання. Ви можете усунути помилки, а потім виконати функцію за допомогою **Run**.

Ви можете перевірити відповідь, згенеровану `hello()` на вкладці Відповідь, як показано на знімку екрана.

Ви можете виконати функцію, натиснувши кнопку **RUN** або використовуючи комбінацію клавіш (**CMD+ENTER** або **CTRL + ENTER**)

### Помилки лінтингу

Редактор JavaScript автоматично перевіряє вихідний код на наявність програмних помилок. Якщо код програмно неправильний, помилка виділяється за допомогою червоного волокна під помилковим кодом. Наприклад, синтаксична помилка, коли `return` неправильно написана як `retu`, також фіксується лінтом.



Ви можете детально перевірити `error` на вкладці **Errors**.

### Вкладка Errors 

На вкладці помилок відображаються всі типи помилок, спричинених виконанням коду. Помилки можуть складатися з **Syntax Errors**, **Run time errors**, таких як **Parsing Errors** тощо.

### Вкладка журналів

Вкладка «Журнали» показує виконання функцій із міткою часу. Ви також можете відкрити вкладку «Журнали», натиснувши піктограму налагодження в правій нижній частині консолі (як показано на знімку екрана нижче).

Вкладка «Журнали» дає вам можливість фільтрувати журнали, записуючи ключові слова в **Filter box** або вибираючи **type of log** зі **dropdown**.

### Фрагменти

У правій верхній частині редактора ви побачите кнопку «Snippets ». Натисніть на нього, щоб відкрити бібліотеку фрагментів Appsmith.

#### Бібліотека фрагментів Appsmith

Ви можете шукати та копіювати фрагменти з бібліотеки фрагментів Appsmith і використовувати їх у редакторі JavaScript. Потім ви можете створювати фрагмент коду, щоб додати свій код або використовувати його як є.

Appsmith активно працює над розширенням **Snippets Library**. Будь ласка, зверніться до [ Discord](https://discord.com/invite/rBTTVJp) або [Форми спільноти](https://community.appsmith.com/), якщо ви хочете зробити внесок у бібліотеку.

### Debugging

Ви можете використовувати оператори відладчика або `console.log()`, щоб налагодити свій код і перевірити його в консолі браузера відповідно. Це дає змогу перевірити стан вашого коду на цьому етапі та пройти через нього рядок за рядком, щоб допомогти визначити та виправити будь-які помилки.

Ви повинні відкрити консоль браузера, щоб побачити роботу налагоджувача.

#### Помилки налагодження за допомогою оператора налагоджувача

Щоб викликати налагоджувач, просто вставте ключове слово `debugger` у свій код там, де ви хочете призупинити його, а потім запустіть програму. Коли досягається оператор налагоджувача, виконання вашого коду призупиняється, це працює як `breakpoint`. Потім ви можете використовувати інструменти налагоджувача, щоб покроково проходити код, перевіряти змінні та бачити, як виконується ваш код.

**Syntax**

```text
debugger;
```

Щоб дізнатися, як використовувати оператори налагоджувача, перегляньте відео `How to use Debugger`.

Наприклад, ви повертаєте інформацію про користувача, отриману з userDetailsAPI у функції JS, і хочете побачити значення, повернуте API під час виконання. Щоб це запрацювало, ви можете використати оператор налагоджувача, як показано нижче:

```js
export default {
    getUserDetails: async () => {
        const userInfo = await userDetailsAPI.run();
        debugger; // the execution will be paused at this point 
        // and you can check the value of the userInfo variable
        console.log(“user information: “+userInfo); // the logs will be 
        // printed in the browser 
        // console.
        return userInfo;
    }
}
```

#### Debugging errors with console.log()

Окрім використання оператора відладчика, ви також можете використовувати `console.log()` для друку інформації про ваш код на консолі браузера. Це може бути корисним для перевірки значень змінних або стану вашої програми на різних етапах виконання вашого коду.

**Syntax**

```text
console.log(<VARIABLE_NAME>);
```

When you run your code, the value of `<VARIABLE_NAME>` is printed to the browser's console, allowing you to inspect it and see if it's what you expected. 

To learn how to use `console.log()` watch the video `How to Debug using console.log()`.

## Writing complex code

When you build applications, it’s often more than just a CRUD operation from a single datasource. You might integrate with multiple API or want to  have the dataset created by querying multiple tables, which leads to  traversing data, filtering, or manipulating the response by calling  different API. You can write complex logic with ease using JavaScript  Editor.

To understand it further, let’s look at a use case and build different workflows.

### Use case

You want to create a developer task tracker dashboard, update developer  information, and add some permissions like making sure only admins can  access the dashboard.

#### Code workflow

Let’s create a task tracker dashboard that gives you an overview of progress on tasks. You have a query called “*developers*,” which fetches the developers’ information like name, email, etc. You have an API `getAllDeveloperTaskStatus` that gives you a task list with the status for each developer.

**Task Tracker**

You want to display the developer details in a tabular format so that you  can choose a table widget. You would want to show a total number of  tasks like total tasks, no of completed tasks, no of to-do tasks, and no of in-progress tasks. You can achieve this by adding a JS Object and  creating one function in it, “*getTaskList*.” Let’s write the code for this function using the JavaScript Editor.

- In the **Explorer** tab, >> click **(+)** next to `JS Objects` >> Select `New JS Object`.
- It’ll open a JS Editor. Rename the JS Object to `Utils`
- Add the below code snippet in the **Code** tab.

```text
export default {
    getAllDeveloperTaskStatus: () => {
    return developers.data.map((developer) => {
     const developerId = developer.id;
     const taskList = developerTaskStatus.data.filter((alltask) => alltask.userId === String(developerId)); // fetch all the tasks for the given developer
     const completedTaskList = taskList.filter((task) => task.status === "Completed"); // fetch tasks that are completed by the developer
     const todoTaskList = taskList.filter((task) => task.status === "To-Do"); // fetch tasks that aren't yet started by the developer
     const inProgressTaskList = taskList.filter((task) => task.completed === "In-Progress"); // fetch tasks that are in progress by the developer
     return {
       "Id": developer.id,
       "Name": developer.name,
       "Email": developer.email,
       "Total Tasks": taskList.length,
       "To-Do Tasks": todoTaskList.length,
       "In Progress Tasks": inProgressTaskList.length,
       "Completed Tasks": completedTaskList.length
     };
    })
 }
}
```

The `getAllDeveloperTaskStatus` function does the following:

- Reads all the developers’ data

- Iterates for each developer record

  - Scans the 

    ```
    tasklist
    ```

     to fetch the developer-related tasks

    - Based on task status (TO-DO, In-Progress, and Completed)

  - Generate a response that gives a cumulative task breakup for each task status for each developer

To display the response generated by`getAllDeveloperTaskStatus` we'll bind it to a widget.

- Navigate to `Page` >> Select [`Table`](https://docs.appsmith.com/reference/widgets/table) widget in Widgets Tab >> Drag it onto the canvas.
- Select the `Table` Widget on the canvas
- In the `Property Pane` on right side add the code `{{Utils.getAllDeveloperTaskStatus()}}` in `Table Data` property.

The [table widget](https://docs.appsmith.com/reference/widgets/table) shows the data as shown in the below screenshot.

![Display data in a table widget](https://docs.appsmith.com/assets/images/JavaScript_Editor__Write_Complex_Code__Bind_JS_Function_Response_to_Table_Widget-c58e5766b5010a495c66660ec12e6276.png)

**Update Developer Information**

Let’s add another function where you’ll be able to select a developer record and update the information.

To achieve this, add a new column to the [table widget](https://docs.appsmith.com/reference/widgets/table) and select the `Column Type` as an `icon button` type that opens a modal window.

Now that the `Edit` column is added to the table let’s add a modal to fetch the `developer` information like `Name` and `Email`.

Navigate to Explorer >> Select `Utils` >> Add the code snippet for `updateUserData()` after `getAllDeveloperTaskStatus()`.

```text
export default {
    getAllDeveloperTaskStatus: () => {
        ...// code block for getAllDeveloperTaskStatus
    }, 
    updateUserData: () => {
        // Construct new user's data
        const newUserData = {
            ...Table1.selectedRow,
            name: devName.text,
            email: devEmail.text,
        }
        // Run updateDeveloperDetails query     
        updateDeveloperDetails.run(
            // on successful execution of updateDeveloperDetails run developers to fetch updated data 
            async () => {
                    await developers.run();
                    closeModal("editModal");
                    showAlert("Developer Details are updated successfully!");
                },
                // On Error, close the modal and show an error toast            
                (e) => {
                    closeModal("editModal")
                    showAlert("An error occurred while updating the developer details!");
                    if (e.statusCode === 401) {
                        navigateTo("Page1");
                    }
                },
                // Params Object    
                newUserData)
    }
}
```

The `updateUserData` function does the following:

- Create the dynamic data that's updated by the user in `editModal` in `newUserData` JSON

- Executes query 

  ```
  updateDeveloperDetails
  ```

  - On successful execution of the query:
    - Calls `developers` query to fetch the updated developer details
    - Shows a success toast to the user
    - Closes the `editModal`
  - On error or failed execution of the query
    - Shows an error toast to the user
    - Closes the `editModal`

Rename the `Confirm` button to `Update` and bind the function `updateUserData` to its `onClick()` event. You can bind the function call by using `{{Utils.updateUserData()}}`.

![How to bind function call to an `onClick` event?](https://docs.appsmith.com/assets/images/JavaScript_Editor__Edit_Modal__Bind_UpdateUser_Function_Call_on_Update_Button-b5d07e19f20a820891cf615dd19a58e9.png)

When you'll hit the `Update` button, the `updateUserData` function gets executed that updates the developer information and  refreshes the developer table to fetch the updated information.

**Add Permissions**

As you want only the admins to access the Dashboard, let’s create another  function for access control. The function contains a list of users’  emails who have access to update data in the table. Let’s call this  function `isAdmin`.

Add the code snippet for `isAdmin()` and `adminsList` to the `Utils` JS Object.

```text
export default {
    adminsList: ["admin1@yourdomain.com", "admin2@yourdomain.com", "admin3@yourdomain.com"],
    getAllDeveloperTaskStatus() => {
        ... // code block for getAllDeveloperTaskStatus
    },
    updateUsersData() => {
        ... // code block for updateUserData
    },
    isAdmin: (email) => {
        if (this.adminList.indexOf(appsmith.user.email) > -1) { // check if the logged in user is an admin
            return true;
        }
        return false;
    }
}
```

The final function looks like below:

```text
export default {
    //the allowed list of admin's email
    adminsList: ["admin1@yourdomain.com", "admin2@yourdomain.com", "admin3@yourdomain.com"],
    getAllDeveloperTaskStatus: () => {
        return developers.data.map((developer) => {
            const developerId = developer.id;
            const taskList = developerTaskStatus.data.filter((alltask) => alltask.userId === String(developerId)); // fetch all the tasks for the given developer
            const completedTaskList = taskList.filter((task) => task.status === "Completed"); // fetch tasks that are completed by the developer
            const todoTaskList = taskList.filter((task) => task.status === "To-Do"); // fetch tasks that aren't yet started by the developer
            const inProgressTaskList = taskList.filter((task) => task.completed === "In-Progress"); // fetch tasks that are in progress by the developer
            return {
                "Id": developer.id,
                "Name": developer.name,
                "Email": developer.email,
                "Total Tasks": taskList.length,
                "To-Do Tasks": todoTaskList.length,
                "In Progress Tasks": inProgressTaskList.length,
                "Completed Tasks": completedTaskList.length
            };
        })
    },
    updateUserData: () => {
        // Construct new user's data
        const newUserData = {
            ...Table1.selectedRow,
            name: devName.text,
            email: devEmail.text,
        }
        // Run updateDeveloperDetails query     
        updateDeveloperDetails.run(
            // on successful execution of updateDeveloperDetails run developers to fetch updated data  
            async () => {
                    await developers.run();
                    closeModal("editModal");
                    showAlert("Developer Details are updated successfully!");
                },
                // On Error, close the modal and show an error toast        
                (e) => {
                    closeModal("editModal")
                    showAlert("An error occurred while updating the developer details!");
                    if (e.statusCode === 401) {
                        navigateTo("Page1");
                    }
                },
                // Params Object    
                newUserData)

    },
    isAdmin: async () => {
        if (this.adminsList.indexOf(appsmith.user.email) > -1) {
            return true;
        }
        navigateTo("Page2");
        return false;
    }
}
```

Only the users with email added to the `adminList` will be able to access the dashboard and do the updates.

With the [Async function settings](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta/asynchronous-javascript-function-settings), you can bind the `isAdmin` function to `RUN ON PAGE LOAD`. The execution of `IsAdmin` on Page load ensures the validation of the user’s email against the `adminList` for the logged-in user should happen on the page load. If the logged-in user's email is present in the `adminsList`, the user can access the Dashboard. If not, the user navigates to the access denied page that shows a message:

You don't have permission to access the Dashboard.

## Current limitations

As the JavaScript Editor is in its BETA, there are a few limitations:

- At the moment, you can't use `JS Objects` across pages. You can subscribe to[ the issue](https://github.com/appsmithorg/appsmith/issues/1911) and follow the progress.
- You can't define variables and functions outside of export default { }. In  future iterations, you can write and export only selected  variables/functions from a `JS Object`.

![Async Function](https://docs.appsmith.com/assets/images/JS_editor_async_function-0a80a6b89ba5862904e4d7cf6d1b09c6.png)

If a function is async, it means that if it returns a promise, it can't be called on the fields incompatible with the return type, such as the  default text property of the [text](https://docs.appsmith.com/reference/widgets/text) widget. For example, in the screenshot `executeQuery` returns `Api1.run()` promise and hence is an [async function](https://docs.appsmith.com/core-concepts/writing-code/#asynchronous). You can call `executeQuery` or similar functions only from `trigger` or `event` properties such as `OnClick`.

# Asynchronous JavaScript Function Settings

Асинхронна функція дозволяє вам вибрати, коли ви хочете виконати код. Наприклад, ви можете відкласти виконання запиту або отримати дані на вимогу.

## Як означити асинхронну функцію в Appsmith?

У середовищі Appsmith функція називається **async**, якщо ви виконуєте одну з наведених нижче дій:

- У вас є ключове слово (async), яке позначає асинхронне виконання функції.

  ```text
  export default{
      functionName: async() => {
         //use async-await or promises
      }
  }
  ```

Ви маєте будь-які вбудовані функції Appsmith, такі як `showModal(), showAlert()` тощо, додані у функціональний блок.

Ви хочете виконати запит або викликати API під час виконання. Наприклад, у вас є API `GetUsersList`, і ви хочете викликати цей API під час виконання, тобто щоразу, коли виконується функція об’єкта JS `callAPI()`. Ваша функція може виглядати так:

```text
export default {
   callAPI: () => {
      GetUsersList.run();
   }
 }
```

Рядок коду `GetUsersList.run()` позначає функцію `callAPI()` для асинхронного виконання, тому функція `callAPI` вважається асинхронною.

Редактор JavaScript в Appsmith надає деякі додаткові налаштування для асинхронних функцій, які допомагають додати більше конфігурацій.

Ви можете вказати параметри на вкладці **Settings** у Appsmith JS Editor.

## Settings

Ви побачите вкладку **Settings** поруч із **Code** щоразу, коли ви додасте **асинхронну функцію** до об’єкта JS. Перейдіть на вкладку **Settings** та натисніть її, щоб відкрити додаткові конфігурації.

Давайте швидко заглибимося в ці конфігурації, щоб зрозуміти, як вони допомагають покращити поведінку програми.

Перейдіть до **JS Object** —> Ви побачите **Settings** поруч із **Code**

![How to navigate to JS Object Settings for an asynchronous function?](https://docs.appsmith.com/assets/images/JSObject-Settings-Tab-af31929ea3b7e74a8169d41c4bda70c3.png)

Click **Settings** to reveal configurations.

![Configurations available for asynchronous functions](https://docs.appsmith.com/assets/images/Settings-Configurations-a91098bbfc0c1d1cc3717977b1561f4f.png)

Ви отримуєте два параметри для налаштування асинхронних функцій:

- RUN ON PAGE LOAD
- CONFIRM BEFORE CALLING

Налаштування доступні на функціональному рівні. Для **кожної** означеної асинхронної функції ви матимете відповідну конфігурацію, доступну для запуску під час завантаження сторінки, і підтвердьте її перед викликом. Зверніться до знімка екрана нижче, де ви можете побачити, що функції - **myFun2** і **`showData`** мають доступні конфігурації, які ви можете визначити для них окремо.

![The asynchronous function configurations are available for each async function defined in a JS Object.](https://docs.appsmith.com/assets/images/Async-Setting-Function-Level-94ddd518e5560516c7017f92383307f9.png)

### RUN ON PAGE LOAD

Як випливає з назви, ви можете використовувати конфігурацію, щоб позначити, що ваша функція виконується кожного разу, коли завантажується сторінка. Наприклад, у вас є сторінка `User Listing` і ви додали об’єкт JS із функцією `GetUserRole`, яка отримує роль користувача. Ви хочете, щоб запит виконувався під час завантаження сторінки, щоб користувач, який увійшов у систему, міг бачити список користувачів. Щоб це запрацювало, вам потрібно встановити конфігурацію **RUN ON PAGE LOAD** як **YES** для функції `GetUserRole`. Після встановлення конфігурації функція `GetUserRole` виконується щоразу, коли програма завантажується, а згенерована нею відповідь відображається на сторінці.

За замовчуванням **RUN ON PAGE LOAD** ON(вибрано **Yes**) для функцій, які відображають дані у віджеті. Тобто віджет прив’язується до відповіді, згенерованої **`JSObjectName.asynFunctionName.data`**. У цьому випадку для завантаження сторінки автоматично встановлюється значення true. Ви можете явно змінити цей параметр відповідно до вашої логіки на вкладці **Settings**.

Якщо ви бажаєте відкласти виклик функції на вимогу, виберіть **No**. Це вказує на те, що функція не викликається під час завантаження сторінки, а виконання відкладено до виклику на вимогу шляхом виклику функції.

#### Configure run on page load

На Appsmith ви можете прив’язати виконання об’єктів JS до завантаження сторінки одним із двох способів:

**Bind Response to Widget**

Щоразу, коли ви зв’язуєте [query](https://docs.appsmith.com/core-concepts/data-access-and-binding/querying-a-database) або [API](https://docs.appsmith.com /core-concepts/connecting-to-data-sources/authentication) відповідь на [widget](https://docs.appsmith.com/reference/widgets), Appsmith автоматично встановлює виконання відповідного API або запиту на сторінці навантаження. Наприклад, у вас є віджет, який посилається на властивість даних асинхронної функції JavaScript, додаючи `{{JSObject.myFun.data}}`, у цей час Appsmith позначає виконання цього запиту/API під час завантаження сторінки. Ви можете змінити те саме, перейшовши до **JSObject** → **Settings** → **RUN ON PAGE LOAD** → Виберіть **No**.

Ось короткий знімок того, як Appsmith запускає запит або виконання API під час завантаження сторінки:

- Add a [table](https://docs.appsmith.com/reference/widgets/table) widget (*Table1*), and add a function in `JSObject5` that calls an API *`getUsers`*. The *`getUsers`* API call is embedded in the *`showData`* function and generates a user listing.

![Call a getUsers API in the `showData` JS function](https://docs.appsmith.com/assets/images/Bind-Response-to-widget_(1)-ef6bd213d86ef4c188077b48611b14d7.png)

-  Прив’яжіть відповідь, згенеровану `showData`, до віджета таблиці `Table1`, додавши наведений нижче код у властивість `Table Data`, доступну на панелі властивостей [Table](https://docs.appsmith.com/reference/widgets /table#table-data) віджет.

```text
{{JSObject5.showData.data}} // behind the scenes Appsmith 
                           // marks execution of showData on page load                      
                          // to get the response and bind it to the table data 
```

![`showData` function called on page load](https://docs.appsmith.com/assets/images/Show-Data-Called-OnPageLoad-a7476122ec70e326c17d101147253cef.png)

**Asynchronous Function Setting**

Especially for [asynchronous functions](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta/asynchronous-javascript-function-settings#how-to-define-asynchronous-function-in-appsmith), you can explicitly mark the execution of an async function on page load for the corresponding JS Object.

Navigate to **JS Object** —> Click **Settings** —> Select **Yes** for **RUN ON PAGE LOAD** next to the JS function. You are all set. Appsmith takes care of executing the async function on page load for you.

![How to set run on page load for async function?](https://docs.appsmith.com/assets/images/Async_Function_Setting_-_On_Page_Load-22a0760b124f18034cce36a687d234b9.png)

As shown in the screenshot below, you can see that the `showData` function is called **on page load**, and `Table1` displays the data.

![Data displayed in the table widget](https://docs.appsmith.com/assets/images/Show-Data-Data-Displayed-InTable-2bd2c8f9c8ae4139f657c9faa26afaf6.png)

### CONFIRM BEFORE CALLING

За допомогою цього параметра ви можете створити спливаюче вікно з підтвердженням і прийняти дані користувача для виконання функції. Наприклад, об’єкт JS має функцію `deletePermission`, яка викликає API, який видаляє дозвіл бази даних. Ви хочете переконатися, що користувач бажає видалити дозвіл, і в цьому випадку ви хочете показати діалогове вікно підтвердження. Діалог підтвердження гарантує, що користувач хоче виконати дію видалення. Користувач може вибрати **Так** для видалення або може відмовитися від цього, вибравши **Ні**. Таким чином, `Confirm Before Calling`  стає в нагоді для захисту від випадкового запуску користувачами деструктивних операцій.

![A confirmation dialog is shown to the user before execution on myFun2](https://docs.appsmith.com/assets/images/Confirmation_Dialog-89d71f762dc1cda22dab9cfbbbe1c2af.png)

#### Configure confirm before calling

Confirmation is like a nudge given to the user before executing a function. It  ensures that the user is aware of the action that would be performed,  and the same is not triggered by chance. A confirmation setting can only be defined explicitly from the Settings tab.

Navigate to **JS Object** —> Click **Settings** —> Select **Yes** for **CONFIRM BEFORE CALLING** next to the JS function. You are all set. Appsmith takes care of  executing and showing the confirmation dialog to the user whenever the  action is triggered.

![Configurations for CONFIRM BEFORE CALLING](https://docs.appsmith.com/assets/images/Async_Function_Settings-Confirm-Before-Calling_(1)-c79491b8d3ab4acf645823db529a6146.png)

## When to use Asynchronous settings

Asynchronous function settings enable users to create complex workflows by executing functions before the application loads, allowing the data manipulation  logic to run and make the desired outcome— secure function execution  with a confirmation before you want application users to execute any  critical operations.

Let’s understand the settings deeper with examples.

For example, you would want to apply restrictions in your application based on the user’s domain. That is, anonymous users (users who are not a  part of your domain) cannot access certain application pages. You can  quickly implement this by creating a function that uses the asynchronous function setting- Run on page load.

Here’s a quick snapshot of steps that you can take to create this logic:

- Create an application and add two pages.

  - First Page (UserListingForAppsmithUsers)- Add a table, and rename it to `UserListing` which displays the data generated by the `showUserListing` function of the `DataLoader` JS object. The function generates a list of users.
  - Second Page (AnonymousUser) - Displays a message to the user.

- Create a JS object 

  ```
  DataLoader
  ```

   and add a function 

  ```
  showUserListing
  ```

  that checks whether the user is logged in or not

  ._ The function verifies the below logic:

  - If the user is logged in, then the `GetUserList` API is called, and the response is generated
  - If the user is not logged in or is not an Appsmith user, redirect the user to the `AnonymousUser` page.

- Mark function `showUserListing` of JS Object - DataLoader to run on page load by selecting **Yes**.

**UserListingForAppsmithUsers** - DataLoader JS object Code. You can see that a function `showUserListing` is marked for asynchronous execution by defining the `async` keyword.

```text
export default {
    showUserListing: async () => {
        //use async-await or promises
        if(appsmith.user.isAnonymous) {
              navigateTo("AnonymousUser");
        }
        //verify if the logged-in user is from appsmith
        if(appsmith.user.email.match("appsmith")){
          return GetUserList.run();
        }else{
          navigateTo("AnonymousUser");
        }       
    }
}
```

For logged-in appsmith users, a user listing is shown as the`GetUserList` API is executed:

![The user listing is displayed to logged-in appsmith users](https://docs.appsmith.com/assets/images/LoggedIn-Appsmith-Users-User-Listing-Shown-8ebffaeac022d0e4bea376e26db55af4.png)

**Anonymous users -** Whenever the application renders, the `showUserListing` function is executed. The function determines whether the user is anonymous. You can use the property of a user object `isAnonymous` to check the user's logged-in status.

```text
appsmith.user.isAnonymous
```

![An anonymous user is shown the page with an unauthorized message](https://docs.appsmith.com/assets/images/Anonymous-Users-66d67f01404b3efd3b1177cee190a4de.png)

Suppose the user is **not** logged in, then `appsmith.user.isAnonymous` *returns `true`  **and redirects** the user to the `AnonymousUser` page and displays the message.*

You are not authorized to view user data.

If the user is **logged in** `appsmith.user.isAnonymous` returns `false` and the logic is executed to verify if the logged-in user is an Appsmith user. If the user is an Appsmith user, `GetUserList` API is called to fetch the user listing. The execution is completed, and the response is generated, displayed in the `UserListing` table.

You can use authentication and authorization using the Async function settings. To get started; [view and fork the authentication application](https://app.appsmith.com/app/custom-auth-google-sso/login-62a99de284b91337251a7dd3), [view and fork the authorization application](https://app.appsmith.com/applications/62a069e0e56c5566a628df0a/pages/62a069e0e56c5566a628df0d).

You can do authentication and authorization using the Async function  settings. To get started, you can use one of the below applications:

1. [View and fork the authentication application](https://app.appsmith.com/app/custom-auth-google-sso/login-62a99de284b91337251a7dd3)
2. [View and fork the authorization application](https://app.appsmith.com/applications/62a069e0e56c5566a628df0a/pages/62a069e0e56c5566a628df0d)

With the out-of-the-box settings provided for async functions, you can  manage the execution of your asynchronous functions and create a better  user experience.