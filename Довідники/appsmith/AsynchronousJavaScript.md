# Asynchronous JavaScript

https://docs.appsmith.com/core-concepts/writing-code/javascript-promises

## JavaScript promises

[JavaScript Promises](https://javascript.info/promise-basics)  допомагає створити асинхронні робочі процеси, якими важко керувати за допомогою зворотних викликів. Appsmith надає вбудовану підтримку JavaScript, яка обіцяє полегшити роботу з асинхронними операціями.

Усі функції фреймворку Appsmith, такі як [showAlert()](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-alert), [showModal()](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-modal), [storeValue()](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value), і інші повертають promise, що робить реалізацію асинхронних робочих процесів легшою та зрозумілою.

### Callbacks vs promises

Щоб зрозуміти різницю між зворотними викликами та реалізацією promises, розглянемо приклад послідовного виконання трьох запитів API та відображення повідомлення, коли всі API успішно завершать роботу.

```javascript
// Using Callbacks
    MockApi.run(() => {
        MockApi1.run(() => {
            MockApi2.run(() => {
                showAlert('done') 
                })
        })   
    }) 
```

Використання promises для того самого прикладу робить реалізацію більш керованою та читабельною.

```javascript
    MockApi.run()
        .then(() => MockApi1.run())
        .then(() => MockApi2.run())
        .then(() => showAlert('done'))
```

### Promise methods

promises JavaScript мають кілька вбудованих методів.

Передаючи функцію в `.then()` або `.catch()`, завжди пам’ятайте, що її потрібно передавати як функцію [зворотного виклику](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) , як показано нижче:

```javascript
  (function() {
    ❌ MockApi.run().then(showAlert(`Success`))
    ✅ return MockApi.run().then(() => showAlert(`Success`))
      
   })()
```

#### Promise.any()

[Promise.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) приймає ітерацію промісів як вхідні дані та повертає одну промісу. Коли одна з промісів виконується вперше, вона повертає єдину промісу, яка розв’язується до значення виконаної проміси. Якщо ви бажаєте завершити лише одну дію/проміс для подальшого виконання, ви можете використати метод `Promise.any()`.

**Example**

```javascript
(function(){
    
  return Promise.any([
        MockApi.run({ name: 1 }), // if name:1 finished early
        MockApi.run({ name: 2 })
  ]).then((res) => {
    showAlert(`Winner: ${res.args.name}`) // Alert Message showns as "Winner: 1" 
  });
})()
```

In this example:

1. The function calls multiple API queries passes and parameters to each API call. 2.`Promise.any()` receives the returned promise.
2. An  alert message is displayed when any of the API calls complete first and  returns a fulfilled promise. The message contains the argument sent to  the API, which finishes execution and returns the promise first among  the API calls.

#### Promise.race()

It waits for the first settled promise, fulfilled, or rejected, to get its result. You can use `Promise.race()` when you want only one action/promise to finish the execution. 

**Example**

```javascript
(function(){
    return  Promise.race([
            MockApi.run({ name: 1 }),
            MockApi.run({ name: 2 })
    ]).then((res) => {
        showAlert(`Winner: ${res.args.name}`)
    });
})()
```

In the example:

1. The function calls multiple API queries passes and parameters to each API call. 
2. The returned Promise is passed to `Promise.race()`
3. An alert message is displayed when any of the API calls complete first and returns a fulfilled promise. The message contains the argument sent to  the API, which completes and returns the promise first among the API  calls.

#### Promise.all()

It takes an array of promises (technically any iterable but is usually an  array) and returns a new Promise. The array of results of the Promises  becomes the result of the new Promise. If one of the promises fails  (reject state), the new Promise immediately rejects and returns the same error. You can use `Promise.all()` when you want all the actions successfully finish execution.

**Example**

```javascript
(function(){
    let employeeNames = ["Employee 1","Employee 2"];
    // Start a bunch of calls running in parallel and store returned promise
    const calls = employeeNames.map(employeeName => MockApi.run({ name: employeeName }));
    
    // Wait for all to finish (or any to reject).
    return Promise.all(calls)
            .then(() => showAlert('Promise.all - All successful'))
            .catch(() => showAlert('Promise.all - Something went wrong'))
            .finally(() => showAlert('Promise.all - finished'))
})()
```

In the example:

1. The function runs the API with the employee names passed as parameters.
2. The `calls` array stores the returned promise for each API call.
3. An alert message appears according to the success or failure case in `Promise.all()`.

#### Promise.allSettled()

It waits for all the promises to settle, regardless of the result (resolved or rejected). You can use `Promise.allSettled()` when you want all the actions to finish first.

**Example**

```javascript
(function(){
  let employeeNames = ["Employee 1","Employee 2"];
  // Start a bunch of calls running in parallel and store returned promise
  const calls = employeeNames.map(employeeName => MockApi.run({ name: employeeName }));
  
  // Wait for all to resolve / reject.
  return Promise.allSettled(calls)
        .then(() => showAlert('Promise.allSettled - All successful'))
        .catch(() => showAlert('Promise.allSettled - Something went wrong'))
        .finally(() => showAlert('Promise.allSettled - finished'))
})()
```

In the example:

1. The function runs the API with the employee names passed as parameters.
2. The `calls` array stores the returned promise for each API call.
3. An alert message appears according to the success or failure case in `Promise.allSettled()`.

### Using Promises in Appsmith

Ось деякі загальні вказівки щодо використання Promises в Appsmith:

- Більшість тригерів дії в Appsmith повертають обіцянки, тому ви можете прикріпити `.then()` або `await`, щоб дочекатися дії перед продовженням.
- Усі тригери загорнуті в обіцянку, тому будь-яка пропущена помилка призводить до неперехопленої помилки обіцянки.
- Повернути обіцянку з прикріпленим до неї `.then()`, як показано нижче:

```javascript

  (function() {
        // the .then only runs if a promise is returned
        return MockApi.run()
            .then(() => showAlert('success'))
    })()

```

- Параметри більше не передаються в аргументі `.then()` `action.run()`. Передається лише відповідь, як показано нижче:

```javascript

  (function() {
        // define params on top so that you can use them in the later calls
        const params = { name: "Appsmith" }
        return MockApi.run(params)
            .then((response) => {
                showAlert(`${response.length} users found in `${params.name}`)
            })
    })()

```

## Async/Await

Ключові слова `async` і `await` дозволяють писати [асинхронний](https://docs.appsmith.com/core-concepts/writing-code/javascript-editor-beta#asynchronous) робочий процес у більш чистому стилі, уникнення необхідності явного налаштування ланцюжків обіцянок.

### Async

Додавання ключового слова `async` перед функцією завжди повертає обіцянку. Інші значення автоматично загортаються в дозволену обіцянку.

### Await

Ключове слово `await` змушує JavaScript чекати, доки ця Promise не завершиться і поверне свій результат.

**Example**

```javascript

    (async function(){ 
        const response = await MockApi.run({ name: 'Appsmith' }); 
        await storeValue( "name", response.args.name ); 
        await showAlert(appsmith.store.name); 
    })() 

```

У попередньому прикладі:

1. Запустіть запит `MockApi` з параметром `name` як 'Appsmith' і дочекайтеся відповіді.
2. Збережіть відповідь у магазині Appsmith за допомогою `storeValue()`, коли ви отримаєте відповідь.
3. Після успішного виконання `storeValue()` відобразити сповіщення з даними, збереженими в сховищі.