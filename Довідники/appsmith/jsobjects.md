# JS Objects

Написання великого коду без повноцінного редактора може бути складним завданням. Редактор JavaScript (бета-версія) в Appsmith дозволяє створювати багаторазовий набір функцій JavaScript, які можна викликати в межах прив’язок JavaScript у компоненті сторінки, щоб легко писати складний код. В Appsmith це називається  `JS Objects`.

**How to Create a JS Object?**

Об’єкт JS – це сутність, що складається з кількох функцій і змінних. Це повторно використовуваний компонент, на який можна посилатися в інших об’єктах JS, що дозволяє створювати організований набір ієрархій. Ви можете створювати нові об’єкти JS з Entity Explorer.

На екрані нижче показано об’єкт JS, доданий до сторінки. Шаблон коду за замовчуванням, який підтримує [export default](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)

![When you add a new JS Object](https://docs.appsmith.com/assets/images/JavaScript_Editor__New_JS_Object-1f2fa4590005410fd50df382b907d29f.png)

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

![How to call a function defined in a JS Object?](https://docs.appsmith.com/assets/images/call_JS_object-14c7623c117c761fe81ec7385f225388.png)

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

Ви можете [налаштувати додаткові параметри для асинхронної функції](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta/asynchronous-javascript-function-settings) і покращити взаємодію з користувачем.

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

![Response Tab](https://docs.appsmith.com/assets/images/JavaScript_Editor__Response_Tab-c6645b49fcc3a6467b45793536ad832f.png)

Якщо ваш код містить синтаксичні помилки, кнопка **Run** вимикається та блокує виконання. Ви можете усунути помилки, а потім виконати функцію за допомогою **Run**.

Ви можете перевірити відповідь, згенеровану `hello()` на вкладці Відповідь, як показано на знімку екрана.

Ви можете виконати функцію, натиснувши кнопку **RUN** або використовуючи комбінацію клавіш (**CMD+ENTER** або **CTRL + ENTER**)

### Помилки лінтингу

Редактор JavaScript автоматично перевіряє вихідний код на наявність програмних помилок. Якщо код програмно неправильний, помилка виділяється за допомогою червоного волокна під помилковим кодом. Наприклад, синтаксична помилка, коли `return` неправильно написана як `retu`, також фіксується лінтом.

![Linting also captures the Syntax error and highlights it with a red line below it.](https://docs.appsmith.com/assets/images/JavaScript_Editor__Linting_Errors-65e09ec0a2677f092195b4eaa105924a.png)

Ви можете детально перевірити `error` на вкладці **Errors**.

### Вкладка Errors 

На вкладці помилок відображаються всі типи помилок, спричинених виконанням коду. Помилки можуть складатися з **Syntax Errors**, **Run time errors**, таких як **Parsing Errors** тощо.

![Errors Tab](https://docs.appsmith.com/assets/images/JavaScript_Editor__Error_Tab-d1521301e8fee336ed46e3f35c7589ed.png)

### Вкладка журналів

Вкладка «Журнали» показує виконання функцій із міткою часу. Ви також можете відкрити вкладку «Журнали», натиснувши піктограму налагодження в правій нижній частині консолі (як показано на знімку екрана нижче).

![Logs Tab](https://docs.appsmith.com/assets/images/JavaScript_Editor__Logs_Tab-55eda51e1f7aef43816b367da8cac82f.png)

Вкладка «Журнали» дає вам можливість фільтрувати журнали, записуючи ключові слова в **Filter box** або вибираючи **type of log** зі **dropdown**.

### Фрагменти

У правій верхній частині редактора ви побачите кнопку «Snippets ». Натисніть на нього, щоб відкрити бібліотеку фрагментів Appsmith.

![Snippets Button](https://docs.appsmith.com/assets/images/JavaScript_Editor__Snippets-bd53f96db7a3b7e1f613694a2b17beaf.png)

#### Бібліотека фрагментів Appsmith

Ви можете шукати та копіювати фрагменти з бібліотеки фрагментів Appsmith і використовувати їх у редакторі JavaScript. Потім ви можете створювати фрагмент коду, щоб додати свій код або використовувати його як є.

![Appsmith snippet library](https://docs.appsmith.com/assets/images/JavaScript_Editor__Snippets__Appsmith_Snippet_Library-2fc528b884f484e19f511da59fd8992c.png)

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