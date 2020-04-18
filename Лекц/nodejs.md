**Програмна інженерія в системах управління. Лекції.** Автор і лектор: Олександр Пупена 

| [<- до лекцій](README.md) | [на основну сторінку курсу](../README.md) |
| ------------------------- | ----------------------------------------- |
|                           |                                           |

![](jsmedia/node.png)

# Node.js

**Node.js** — платформа з відкритим кодом для виконання високопродуктивних мережних застосунків, написаних мовою JavaScript. Засновником платформи є *[Раян Дал](https://uk.wikipedia.org/wiki/Раян_Дал)* (Ryan Dahl). Якщо раніше Javascript застосовувався для обробки даних в браузері користувача, то *node.js* надав можливість виконувати JavaScript-скрипти на сервері та відправляти користувачеві результат їх виконання. Платформа *Node.js* перетворила JavaScript на мову загального використання з великою спільнотою розробників.

В платформі використовується розроблений компанією [Google](https://uk.wikipedia.org/wiki/Google) [рушій](https://uk.wikipedia.org/wiki/Рушій_JavaScript) [V8](https://uk.wikipedia.org/wiki/V8_(рушій_JavaScript)).

Node.js - середовище виконання JavaScript, побудоване на рушії [V8](https://uk.wikipedia.org/wiki/V8_(рушій_JavaScript)). Node.js використовує **подійно-орієнтовану модель з неблокуючим введеням/виведенням**, що робить його легким і ефективним.

https://www.youtube.com/watch?v=3aGSqasVPsI

що таке рантайм

що таке движок

node -v

node enter

help

.exit

закінчення сессії

новий проект

запуск файлу індекс.жс з терміналу

npm -v

npm init

- назва пакету
- опис, версія
- головний файл (ентрі поінт 0 індекс.жс)

package.gson

npm i щоб встановити потрібні пакети

require

кожен модуль обгортається у функцію

системні змінні

вбудовані модулі (є доки на сайті)

- path.js 









## Основи асинхронного програмування

колбек

### Потоки

https://www.youtube.com/watch?time_continue=33&v=8cV4ZvHXQL4&feature=emb_logo

https://habr.com/ru/post/337528/

https://proglib.io/p/asynchrony/



## Модулі

https://www.w3schools.com/nodejs/nodejs_modules.asp

Consider modules to be the same as JavaScript libraries.

A set of functions you want to include in your application.

Node.js has a set of built-in modules which you can use without any further  installation.

Look at our [Built-in Modules Reference](https://www.w3schools.com/nodejs/ref_modules.asp) for a  complete list of modules.

## Include Modules

To include a module, use the `require()`  function with the name of the module:

  var http = require('http'); 

Now your application has access to the HTTP module, and is able to create a server:

  http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.end('Hello World!');
}).listen(8080); 

------

## Create Your Own Modules

You can create your own modules, and easily include them in your applications.

The following example creates a module that returns a date and time object:

### Example

Create a module that returns the current date and time:

  exports.myDateTime = function () {
 return Date();
}; 

Use the `exports` keyword to make properties and methods available outside the module file.

Save the code above in a file called "myfirstmodule.js"

Для забезпечення обробки великої кількості паралельних запитів у Node.js використовується асинхронна модель запуску коду, заснована на обробці  подій в неблокуючому режимі та визначенні обробників зворотніх викликів  (callback). 



## Include Your Own Module

Now you can include and use the module in any of your Node.js files.

### Example

Use the module "myfirstmodule" in a Node.js file:

  var http = require('http');
  **var dt = require('./myfirstmodule');
**
  http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write("The date and time are currently: " + **dt.myDateTime()**);
      res.end();
  }).listen(8080); 

Notice that we use `./` to locate the module, that means that the  module is located in the same folder as the Node.js file.

Save the code above in a file called "demo_module.js", and initiate the file:

Initiate demo_module.js:

C:\Users\*Your Name*>node demo_module.js

If you have followed the same steps on your computer, you will see the same result as the example: http://localhost:8080

У січні 2010 року для середовища Node.js був введений [менеджер пакунків](https://uk.wikipedia.org/wiki/Менеджер_пакунків) під назвою [npm](https://uk.wikipedia.org/wiki/Npm).[[13\]](https://uk.wikipedia.org/wiki/Node.js#cite_note-13) Менеджер пакунків полегшує програмістам публікацію та обмін [сирцевим кодом](https://uk.wikipedia.org/wiki/Сирцевий_код) бібліотек Node.js і призначений для спрощення встановлення, оновлення та видалення [бібліотек](https://uk.wikipedia.org/wiki/Бібліотека_програм).[[12\]](https://uk.wikipedia.org/wiki/Node.js#cite_note-b1-12)



https://www.w3schools.com/nodejs/nodejs_intro.asp

https://nodejs.org/uk/docs/

https://habr.com/ru/post/460661/

https://medium.com/devschacht/node-hero-6a07ef8d822d 

### Тип даних Символ

Тип `symbol` (символ) наряду з типом `string` використовується для створення ідентифікаторів властивостей об'єктів. Однак символи є унікальними ідентифікаторами.  Створюються такі ідентифікатори через однойменну функцію (конструктор `Symbol`). При створені об'єктів через літерали, символи включаються через синтаксис квадратних дужок, що вказує на те, що це нам необхідний символ в якості ключа.  

```javascript
// Створюємо новий символ id
let id = Symbol();
let user = {
  name: "Вася",
  age: 30,
  [id]: 123
};
console.log (user[id]);
```

Є також глобальні символи, системні символи доступні через глобальний об'єкт `Symbol`. 

При створенні символу можна дати опис (також називається ім'я), яке в основному використовується для відлагодження коду.  Але навіть якщо створити кілька символів з однаковим описом, вони все одно будуть ункікальними.                                                      

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log (id1 == id2); // false
```

### К

Програмна інженерія в системах управління. Лекції.** Автор і лектор: Олександр Пупена 

| [<- до лекцій](README.md) | [на основну сторінку курсу](../README.md) |
| ------------------------- | ----------------------------------------- |
|                           |                                           |