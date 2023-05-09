# Actions

Фреймворк Appsmith дозволяє запускати дії для подій віджетів і всередині об’єктів JS. Є функції для переходу на іншу сторінку, показу сповіщень, відкриття/закриття режимів і збереження даних у локальному сховищі. Перегляньте цей розділ, щоб дізнатися про різні дії, які можна активувати в Appsmith.

- [Store Value](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value)
- [Navigate To](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/navigate-to)
- [Show Alert](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-alert)
- [Open Modal](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-modal)
- [Close Modal](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/close-modal)
- [Download](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/download)
- [Copy to Clipboard](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/copy-to-clipboard)
- [Reset Widget](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/reset-widget)
- [Set Interval](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/intervals-time-events#setinterval)
- [Clear Interval](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/intervals-time-events#clearinterval)
- [Cross-origin communication](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/post-message)

# Store Value

Функція storeValue() зберігає дані у браузері як пари ключ-значення, і пізніше до них можна отримати доступ будь-де в програмі.

*How to use the StoreValue Function*

## Save value

Ви можете зберегти значення в магазині Appsmith за допомогою функції storeValue(), передавши параметри, показані в підписі.

### Signature

Нижче наведено синтаксис функції storeValue:

```javascript
storeValue(key: string, value: any, persist? = true): Promise
```

#### Arguments

| Argument Name | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| **key**       | Name of the key.                                             |
| **value**     | The data you want to save using storeValue(). You can save any data type in the Appsmith store. |
| **persist**   | Defaults to **true**. **True** persists the key-value pair in the browser's local storage, and you can use it between sessions. A **false** doesn't persist the value and removes the key once the page refreshes or is closed. |

**Example 1:** if you want to store the text of an input widget, you can use the storeValue() as shown below:

```javascript
{{storeValue('email',input1.text)}}
```

Here, `email` is the key where the value is stored and `input1.text` is the value in the input widget that's saved in the storage object.

**Example 2**:  You can save any data type with storeValue(). The example below shows  how to store employees' basic information using a function inside a  JSObject. 

```javascript
export default {
    writeToStore: () => {
        storeValue("isActive", true). // Boolean
        storeValue("name", "Robert") // String 
        storeValue("pin", 9929) // Number
    
    }
}
```

## Access value

You can access the values from the store by referencing the key inside the store object.

```javascript
{{ appsmith.store.key }}
```

**Example**: in the example, you stored the value of `input1.text`. You can access this value anywhere in the application by referencing the key `email`:

```javascript
{{appsmith.store.email}}
```

## Modify value

You can update the saved value in the store, by overwriting the data using its key. 

**Example**: you can update the boolean value  from `True` to `False` using its key `isActive` as shown below:

```javascript
export default {
    updateStore: () => {
        if(appsmith.store.isActive === true)
            storeValue("isActive", false) 
    }
}
```

## Remove stored values

removeValue() function clears the value of the specified key in the store.

**Example**: refer to the code below to remove the value with key `isActive` using a JSObject:

```javascript
export default {
    deleteStore: () => {
        // Delete value for a particular key
        removeValue("isActive")
            }
}
```

## Clear store

clearStore() function clears all the stored data in the Appsmith store.

```javascript
clearStore()
```

## Store multiple values

If you need to store many values, instead of making multiple calls to the `storeValue` function, it's recommended to use an object array to store the values. All values can be assigned in a single `storeValue()` function as shown below:

```javascript
//employee data
storeValue("user", { "name": "Bar Crouch", "email": "bar@appsmith.com", "pin": "9984"}) 
```

The below example shows how to access the name of the employee that you have stored:

```javascript
//Access store using a JSobject
    export default {
    userName: () => {
        let user = appsmith.store.user.name
        return user
    }
}
//Text binding

{{appsmith.store.user.name}}
```

You can update the saved employee data in the storage as shown below:

```javascript
//updating employee data
export default {
    complexUpdate: () => {
        let user = appsmith.store.user // { "name": "Bar Crouch", "email": "bar@appsmith.com"}
        user.email = "barty.crouch@appsmith.com"
        user.city = "Bangalore"
        storeValue("user", user)
    }
}
```

## Storage states

Функція storeValue() від Appsmith складається з двох станів зберігання: постійного та сеансового.

#### Persistent state

Якщо ви зберігаєте значення в persistent стані, воно залишається в сховищі протягом різних сеансів/сторінок, і значення зберігається, навіть якщо сторінку перезавантажується. За замовчуванням аргумент `persist` має значення **true** у storeValue(), тому дані зберігаються в persistent стані.

**Приклад**: якщо ви не визначили значення для аргументу persist, значення за умовчанням зберігається в постійному стані.

```text
{{storeValue('one',Input1.text)}}
```

Постійний стан очищається, коли користувач виходить із системи.

#### Session state

Ви можете використовувати стан сеансу для збереження значення, яке ви хочете зберегти, доки сторінка не перезавантажиться або користувач не закриє вікно. Щоб зберегти дані таким чином, додайте `false` до аргументу `persist` у функції storeValue().

```javascript
{{storeValue('two',Input2.text, false)}}
```

Стан сеансу (`persist=false`) доступний, лише доки користувач не вийде з програми або не оновить сторінку. Якщо **однаковий ключ** доступний у сеансі та збережених станах, значення **сеансу** отримує перевагу.

Перегляньте зразок програми, щоб дізнатися більше про [постійні та сеансові стани](https://app.appsmith.com/app/appsmith-store/page1-627b8afe0b47255c28137dca).

## Asynchronous behaviour of store value

storeValue() є асинхронним, тому його виконання не залежить від іншої функції чи завдання. Щоб впоратися з цим сценарієм, вам доведеться використовувати async/await для керування виконанням.

**Приклад**: припустімо, що існує функція JS, яка викликає API, що повертає унікальний ідентифікатор, і ви хочете зберегти значення, повернуте за допомогою `storeValue()`.

```javascript
export default {
    getUniqueValue: () => {
        GetUniqueNameAPI.run()
        storeValue("uniqueEmail", GetUniqueNameAPI.data.uniqueName);
        showAlert("Success! Store value set: " + appsmith.store.uniqueEmail);
    }
}
```

Коли ви запускаєте функцію, ви очікуєте сповіщення про успішне виконання зі значенням, збереженим у ключі `uniqueEmail`, але відображається `undefined`. Оскільки storeValue() є асинхронним, він може виконуватися під час виклику API, а значення не зберігається в сховищі, що призводить до значення `undefined`.

Щоб впоратися з таким сценарієм, ви можете використовувати **async/await**, щоб гарантувати, що функція storeValue() очікує завершення виконання виклику API. **Приклад**: змініть код, щоб використовувати async/await, як показано нижче:

```javascript
export default {
     getUniqueValue: async () => {
         await GetUniqueNameAPI.run()
         await storeValue("uniqueEmail", GetUniqueNameAPI.data.uniqueName);
         showAlert("Success, Store value set: " + appsmith.store.uniqueEmail);
    }
}
```

Функція `getUniqueValue` викликає `GetUniqueNameAPI.run()`, щоб отримати дані з API. Префікс `await` до виклику `GetUniqueNameAPI` гарантує, що елемент керування очікує завершення виконання API, а потім переходить до наступного рядка. Префікс `await` до `storeValue()` гарантує, що значення буде додано до сховища для заданого ключа перед виконанням `showAlert` у наступному рядку.