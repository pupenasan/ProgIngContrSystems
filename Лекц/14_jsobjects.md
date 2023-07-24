**Програмна інженерія в системах управління. Лекції.** Автор і лектор: Олександр Пупена 

| [<- до лекцій](README.md) | [на основну сторінку курсу](../README.md) |
| ------------------------- | ----------------------------------------- |
|                           |                                           |

# 14. Функції та об'єкти в JavaScript та Node-RED

## 14.1. Функції

### Функції-стрілки `=>`

На минулій лекції розглянуто два синтаксиса створення функцій - шляхом оголошення та за допомогою функціонального виразу. Ще одним синтаксисом створення функцій подібно до функціонального виразу є «функції-стрілки» або «стрілочні функції» (arrow functions).  

```javascript
let sum1 = (a, b) => a + b;				//стрілочна функція
let sum2 = function(a, b) {return a + b};//аналогічна форма через функціональний вираз
console.log(sum1(1, 2) ); // 3
console.log(sum2(1, 2) ); // 3
```

При використанні одного аргументу, запис буде ще коротше:                  

```javascript
let double1 = function(n) { return n * 2 }
let double2 = n => n * 2; //анаогічний попередньому
```

Якщо немає аргументів, це матиме вигляд:

```javascript
let sayHi = () => console.log("Hello!");
```

Такі функції зручні для простих однорядкових дій.  Однак вони мають додаткові можливості, які наразі розглядати не будемо.       

### Залишкові параметри та `arguments`

Якщо кількість аргументів може варіюватися, тобто якісь з аргументів не є обов'язковими, можна скористатися залишковими параметрами. ***Залишкові параметри*** (rest parameters) - це представлення усіх фактичних параметрів при виклику функції у вигляді одного масиву. При означенні функції, ці параметри вказуються після `...` і якщо використовуються, повинні бути в кінці списку параметрів. Після залишкових параметрів не можна вказувати інші.  

```javascript
function showName(firstName, lastName, ...titles) { //titles - масив залишкових параметрів
  console.log( firstName + ' ' + lastName ); // Юлій Цезарь
  // Інші параметри підуть в масив
  // titles = ["Консул", "Імператор"]
  console.log( titles[0] ); // Консул
  console.log( titles[1] ); // Імператор
  console.log( titles.length ); // 2
}
showName("Юлій", "Цезарь", "Консул", "Імператор");
```

Усі аргументи функції знаходяться в псевдо-масиві `arguments` під своїми порядковими номерами. Зрештою, при оголошенні функції, аргументи можна взагалі не вказувати і перебирати їх через  `arguments`.

```javascript
function showName() { //формальні параметри не вказуються
  console.log (arguments.length); //4
  for (let arg of arguments)
  { 
  console.log(arg); // послідовно буде виводити усі аргументи
  }
}
showName("Юлій", "Цезарь", "Консул", "Імператор");
```

### Функції зворотного виклику та асинхронність

Багато функцій JavaScript та його середовищ виконання одразу повертають результат, ще до того як вона виконала цільову дію. Це корисно тоді, коли завершення обробки функції займає багато часу, яке при очікуванні буде гальмувати виконання програми. 

Наприклад, функція `setTimeout` повинна виконати якусь дію через вказаний інтервал часу. Для того щоб вказати цю дію, вона записується як інструкції в функції, яка буде викликатися через цей інтервал. Наприклад: 

```javascript
let fn = function () {console.log ("пройшло 2 секунди")};
console.log ("Запускаємо таймер");
setTimeout(fn, 2000);
console.log ("Таймер запущено, чекаємо...");
```

У даному прикладі, функція `fn` містить інструкцію, яку необхідно виконати через 2 секунди. При виклику `setTimeout` ця функція передається в якості аргументу разом з інтервалом (задається в мілісекундах). Замість того, щоб чекати 2 секунди, функція `setTimeout` одразу обробляється і передає керування наступній інструкції, що йде за нею. У цей час десь на рівні ОС запускається окремий програмний потік, задача якого відслідкувати спрацювання таймеру. Однак цей потік не зупиняє виконання програми JavaScript, вона виконується далі. Коли системний потік з таймером виявить, що час пройшов, він викличе функцію `fn`. 

Таким чином наведена вище програма спочатку виведе повідомлення "Запускаємо таймер", потім "Таймер запущено, чекаємо..." і через 2 секунди "пройшло 2 секунди". Така функція, яка запускається на виконання, одразу віддає керування потоку, що її визвав, ще до завершення результату називається ***асинхронною***. Функція, яка передається в якості аргументу для її виклику називається ***функцією зворотного виклику*** (колбек, callback). У наведеному вище прикладі функція `setTimeout` є асинхронною, а  `fn` - функцією зворотного виклику.

Наведений вище код з використанням функцій стрілок може виглядіти наступним чином:

```javascript
console.log ("Запускаємо таймер");
setTimeout(() => console.log ("пройшло 2 секунди"), 2000);
console.log ("Таймер запущено, чекаємо...");
```

Асинхронно також працює функція `setInterval`, яка запускає функцію, з вказаною періодичністю: 

```javascript
let fn = function () {console.log ("пройшло 2 секунди")};
console.log ("Запускаємо таймер");
setInterval(fn, 2000);
console.log ("Таймер запущено, чекаємо...");
```

Асинхронність є дуже корисною характеристикою тих функцій, які працюють з зовнішніми засобами. Якщо дані необхідно кудись записати, скільки це займе часу. Нижче наведений приклад, де показані в тактах ЦПУ час, що потребується для цього (числа умовні, але порядок буде такий самий).   

Таблиця 14.1. Порівняльна таблиця часу, який необхідний для виконання різних операцій.

| **Операція запису в** | **Кількість тактів CPU (приблизно)** |
| --------------------- | ------------------------------------ |
| CPU Registers         | 3 такти                              |
| L1 Cache              | 8 тактів                             |
| L2 Cache              | 12 тактів                            |
| RAM                   | 150 тактів                           |
| Диск                  | 30,000,000 тактів                    |
| Мережа                | 250,000,000 тактів                   |

Якщо б операції доступу (читання/запису) по мережі до даних реалізовувалися через синхронні функції, програмний потік JavaScript просто б постійно зависав. Замість цього асинхронна функція запускається з передачею функції зворотного виклику і програма далі працює. У цей час ОС виконує необхідну операцію. Як тільки вона буде оброблена, буде викликана функція зворотного виклику.

### Створення тіла функції через New

Конструктор `Function` створює новий об'єкт `Function`. Прямий виклик конструктора може створювати функції динамічно, але має проблеми з безпекою та схожі з [`eval`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/eval) (але менш значні) проблеми з продуктивністю. Однак, на відміну  від `eval`, конструктор `Function` створює функції, які виконуються тільки у глобальній області видимості.

```javascript
new Function (arg1, arg2, ...argN,functionBody)
```

- `arg1, arg2, ... argN`- імена, які будуть використані функцією в якості імен формальних  аргументів. Кожне ім'я має бути рядком, який представляє ідентифікатор  JavaScript, або списком таких рядків, розділених комою; наприклад, "`x`", "`theValue`" або "`a,b`".
- `functionBody`- рядок, що містить інструкції JavaScript, які складають означення цієї функції.

```javascript
//у змінній strfn знаходиться код функції
let strfn = "let y = a+b+c; console.log ('Значення суми = ' + y + '!')";
let fno = new Function ("a","b","c", strfn);
fno (100,10,1);    //Значення суми = 111!
```

Додатково про це можна прочитати [за цим](https://learn.javascript.ru/new-function) або [за цим](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Function) посиланням.

Додатково про властивості і методи функцій як об'єктів наведено нижче. 

## 14.2. Об'єкти 

На минулій лекції були коротко розглянуті призначення об'єктів, їх створення через літерал та робота з властивостями та методами. Тут продовжимо розглядати об'єкти та їх призначення.  

### Методи об'єктів 

Окрім властивостей об'єктів, які надають можливість доступитися до певного його параметру, можна користуватися певними діями, які може робити об'єкт. Такі дії в JavaScript  представлені властивостями-функціями об'єкта.                          

```javascript
let user = {
  name: "Джон",
  age: 30
};
user.sayHi = function() {
  console.log("Привіт!");
};
user.sayHi(); // Привіт!
```

У наведеному вище прикладі властивості  `user.sayHi` об'єкта був присвоєний функціональний вираз (Function Expression). Тепер цю властивість можна використовувати для виклику функції. Властивості-функції об'єкту називають ***методом*** цього об'єкту.  

Альтернативний спосіб через оголошення функції матиме вигляд:                

```javascript
let user = {
  name: "Джон",
  age: 30
};
// спочатку оголошуємо
function sayHi() {
  console.log("Привіт!");
};
// потім добалвяємо в якості метода
user.sayHi = sayHi;
user.sayHi(); // Привіт!
```

Існують також короткі синтаксиси для методів при створенні об'єктів через літерал:

```javascript
let user1 = {
  sayHi: function() { 		//метод створюється при створенні об'єкту 
    console.log("Привіт!");
  }
};
let user2 = {
  sayHi() { 				// те саме, що і "sayHi: function()"
    console.log("Привіт!");
  }
};
user1.sayHi();user2.sayHi();
```

До методів об'єктів також можна доступатися не тільки через крапку, але і через прямокутні дужки, адже це також властивості. Це дає можливість вказувати метод через змінну, наприклад:

```javascript
let user = {
  sayHi() {console.log("Привіт!")}
};
let method = "sayHi";
user[method]();
```

Слід звернути увагу, що звернення до методу без дужок, значить звернення до самої функції, а не її виклик, наприклад.

```javascript
let user = {
  sayHi() {console.log("Привіт!")}
};
let method = user.sayHi; //назначаємо змінній функцію 
method(); 				//викликаємо функцію  - Привіт!
console.log (user.sayHi);//sayHi() { … }
console.log (method);	//sayHi() { … }
```

### Ключове слово `this` 

Як правило, методу об'єкта необхідний доступ до інформації, яка зберігається в об'єкті, щоб виконати з нею які-небудь дії (у відповідності з призначенням методу). Наприклад, коду в об'єкті необхідний доступ до інформації, яка зберігається в тому ж об'єкті, щоб виконати з нею які-небудь дії (у відповідності з призначенням методу).  Наприклад, коду всередині `user.sayHi()` може знадобитися ім'я користувача, яке також зберігається в цьому об'єкті.     

Для того щоб звернутися до свого ж об'єкту, використовується ключове слово **`this`**. Наприклад,           

```javascript
let user = {
  name: "Джон",
  age: 30,
  sayHi() {
    // this - це "плинний об'єкт"
    console.log("Привіт, мене звати " + this.name + " !");
  }
};
user.sayHi(); // Привіт, мене звати Джон !
```

Тут під час виконання  `user.sayHi()` значенням`this` буде `user` (посилання на об'єкт `user`). Можна також звертатися безпосередньо до об'єкту `user`, але назва об'єкту може бути різною, а нас цікавить саме цей об'єкт, в якому викликається метод.       

Значення `this` розраховується під час виконання і залежить від контексту. 

### Конструктори об'єктів

Літеральний синтаксис `{...}` дозволяє створювати один унікальний об'єкт. Але часто необхідно створити багато однотипних об'єктів. Це можна робити з використанням функції-конструктора і ключового слова `new`. 

***Функції-конструктори*** призначені для побудови об'єктів. До них є певні вимоги:

- ім'я функції-конструктора повинно починатися з великої букви (не обов'язково, але є гарним тоном);
- вона повинна викликатися за допомогою оператора `new`     

 Коли функція викликається як `new User(...)`, відбувається наступне:

1. Створюється новий порожній об'єкт, який присвоюється `this`
2. Виконується код функції. Зазвичай він модифікує `this`, добавляє туди нові властивості
3. Повертається значення `this`     

Іншими словами, виклик `new User(...)` робить приблизно наступне:        

```javascript
function User(name) {
  // this = {};  (неявно)
  // добавлення властивостей, методів і додаткові дії інціалізації і т.п.  
  this.name = name;
  this.isAdmin = false;
  // return this;  (неявно)  
}
let user = new User("Вася");
console.log(user.name); // Вася
console.log(user.isAdmin); // false
```

Таким чином, результат виклику `new User("Вася")` буде той самий об'єкт, що і  

```javascript
let user = {
  name: "Вася",
  isAdmin: false
};
```

Однак, на відміну від літерального способу, створення об'єктів з такими самими властивостями тепер зводиться до виклику функції-конструктора, а не до повторення літералів.

```javascript
// літеральний
let user1 = {name: "Вася",isAdmin: false};// для кожного користувача повний перелік властивостей
let user2 = {name: "Міша", isAdmin: false};

//через конструктор 
function User(name) { this.name = name; this.isAdmin = false} // один конструктор
let user3 = new User("Вася");//створення властивостей для кожного користувача через виклик конструктору 
let user4 = new User("Міша");
```

Не важко помітити, що коли кількість властивостей та об'єктів зростає, використання конструктору значно спрощує створення однотипних об'єктів.  Функція-конструктор призначена і використовується саме для створення об'єктів.       

Якщо в функції-конструкторі повертається значення через `return` це повинно бути об'єктною змінною, інакше буде повернено `this`.

У конструкторі можна також створювати методи.                 

```javascript
function User(name) {
  this.name = name;
  this.sayHi = function() {console.log( "Мене звати " + this.name )};
}
let user1 = new User("Вася");
user1.sayHi(); // Мене звати: Вася
```

Для складних об'єктів є ще один синтаксис - класи, які у даному курсі не будуть розглядатися.

### Object

Об'єкт `Object` є вбудованим типом даних у JavaScript, який дозволяє зберігати дані у вигляді пар ключ-значення. Він має багато методів та властивостей, які можуть бути використані для роботи з об'єктами. Ось кілька найбільш вживаних методів та властивостей об'єкта:

1. `Object.keys(obj)`: Повертає масив, що містить всі ключі (властивості) об'єкта `obj`.
2. `Object.values(obj)`: Повертає масив, що містить всі значення властивостей об'єкта `obj`.
3. `Object.entries(obj)`: Повертає масив, що містить всі пари ключ-значення властивостей об'єкта `obj`.
4. `Object.assign(target, source)`: Копіює властивості з одного або кількох джерел (`source`) до цільового об'єкта (`target`), повертаючи змінений цільовий об'єкт.
5. `Object.hasOwnProperty(prop)`: Перевіряє, чи має об'єкт властивість з ім'ям `prop`. Повертає `true`, якщо така властивість існує безпосередньо в об'єкті, і `false` - в іншому випадку.
6. `Object.create(proto)`: Створює новий об'єкт з вказаним прототипом `proto`.
7. `Object.defineProperty(obj, prop, descriptor)`: Додає або змінює властивість `prop` об'єкта `obj`, використовуючи вказаний дескриптор `descriptor`.
8. `Object.freeze(obj)`: Заморожує об'єкт `obj`, що робить його властивості недоступними для зміни або видалення.
9. `Object.seal(obj)`: Запечатує об'єкт `obj`, що дозволяє змінювати значення властивостей, але не дозволяє додавати нові або видаляти існуючі властивості.
10. `Object.getPrototypeOf(obj)`: Повертає прототип об'єкта `obj`.

Функція `Object.values(x)` використовується для отримання масиву, що містить значення властивостей об'єкта `x`. Вона повертає новий масив, який містить значення у тому ж порядку, в якому вони перераховані в об'єкті.

Наприклад, розглянемо наступний об'єкт:

```js
const person = {
  name: 'John',
  age: 30,
  profession: 'Engineer'
};
const values = Object.values(person);
console.log(values);
// Вивід: ['John', 30, 'Engineer']
```



## 14.3. Вбудовані об'єкти JavaScript

У JavaScript є багато вбудованих об'єктів. У цьому розділі розглянемо кілька з них. 

### Об'єкт Number 

Вбудований об'єкт [`Number`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Number) представляє об'єкт-обгортку для змінних та констант однойменного типу. Будь які змінні та літерали можна використовувати як об'єкт  `Number`. Наприклад, можна звернутися до методу `toString` літералу:

```javascript
console.log ((255).toString(16)); // ff - 16-ковий формат
console.log ((0xFF).toString()); // 255 - 10-ковий формат
```

Об'єкт вміщує ряд властивостей, такі як масимальне числове  значення, не-число(NaN) та безкінечність (infinity) та інші. У таблиці нижче деякі з них:  

Таблиця 14.2. Властивості об'єкту Number 

| Властивість                                                  | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Number.NaN`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) | Спеціальне значення "не-число"                               |
| [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY) | Спеціальне від'ємне безкінечне число; повертається при переповненні |
| [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) | Спеціальне додатне безкінечне число; повертається при переповненні |

Ви не можете  змінювати значення цих властивостей, але можете використовувати їх для читання.

Об'єкт Number також надає множину методів для роботи з числами, зокрема: 

Таблиця 14.3. Методи об'єкту Number

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Number.parseFloat()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat) | Приймає рядок в якості аргументу та повертає число з плаваючою комою, яке вдалося розпізнати.     Аналог глобальній функції [`parseFloat()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/parseFloat). |
| [`Number.parseInt()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) | Приймає рядок в якості аргументу та поверає ціле число в заданій системі числення, якщо аргумент вдалося розпізнати.     Аналог глобальній функції [`parseInt()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/parseInt). |
| [`Number.isFinite()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) | Визначає, чи передане значення є кінцевим числом.            |
| [`Number.isInteger()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) | Визначає, чи передане число є цілим.                         |
| [`Number.isNaN()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) | Визначає, чи передане число є [`NaN`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/NaN). Більш надійніша версія оригінальної глобальної функції [`isNaN()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/isNaN). |
| [`Number.isSafeInteger()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) | Визначає, чи передане значення є числом, що є безпечним цілим. |
| [Nuber.toString(radix)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) | Вертає рядкове предствлення числа у вказаній у дужках (`radix`) системі числення |

```javascript
let a=0xF; //16-ковий формат
console.log (a.toString()); // 15 - 10-ковий формат
console.log (a.toString(2)); // 1111 - двійковий формат
console.log (a.toString(16)); // f - 16-ковий формат
```

Прототип `Number` надає методи для отримання інформації з об'єкту `Number` в різноманітних форматах. Наступній таблиці представлені методи з `Number.prototype`.

Таблиця 14.4. Методи об'єкту Number.prototype. 

| Методи                                                       | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`toExponential(fractionDigits)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) | Повертає рядок, що представляє число в експоненціальній нотації з `fractionDigits` цифр після коми |
| [`toFixed(digits)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) | Повертає рядок, що представляє число з плаваючою комою з `digits` цифр після коми |
| [`toPrecision(precision)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) | Повертає рядок, що представляє число із заданою точністю у позначені плаваючої коми з `precision` кількістю цифр. |

```javascript
let numObj = 77.1234;
console.log(numObj.toExponential());  //'7.71234e+1'
console.log(numObj.toExponential(2)); //'7.71e+1'
console.log(numObj.toFixed());       // '77'
console.log(numObj.toFixed(1));      // '77.1'
console.log(numObj.toPrecision())    // '77.1234'
console.log(numObj.toPrecision(5))   // '77.123'
console.log(numObj.toPrecision(2))   // '77'
console.log(numObj.toPrecision(1))   // '8e+1'
```

### Об'єкт Math

Вбудований об'єкт [`Math`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math) має властивості та методи для математичних констант та функцій. 

На відміну від інших глобальних об'єктів, `Math()` не є конструктором. Тобто необхідно використовувати безпосередньо методи об'єкту `Math`. 

```javascript
let a = new Number();//так можна робити
console.log (a.toString());//0
let b = new Math(); // помилка Math is not a constructor
```

Всі поля і методи `Math` статичні. Тобто до сталої Пі потрібно звертатись `Math.PI`, а функцію синуса викликати через `Math.sin(x)`, де `x` є аргументом статичного методу. Всі константи задані із максимальною для дійсних чисел у JavaScript точністю.

Нижче наведені кілька властивостей та методів, усі інші можна подивитися у [довіднику](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math) Через властивості доступні деякі константи, зокрема, які наведені в таб.14.5.

Таблиця 14.5. Константи Math.

| Властивість                                                  | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Math.E`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/E) | Стала Ейлера, основа натуральних логарифмів. Приблизно дорівнює 2.718. |
| [`Math.PI`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) | Значення відношення довжини кола до його діаметру, наближено дорівнює 3.14159. |
| [`Math.SQRT2`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2) | Значення квадратного кореня від 2, наближено 1.414.          |

```javascript
let a = Math.E;
console.log (a);	//2.718281828459045
```

Математичні функції представлені через методи, які наведені у таблиці 14.6:

Таблиця 14.6. Методи об'єкту Math.

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Math.asin(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/asin) | Повертає арксинус числа.                                     |
| [`Math.sin(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/sin) | Повертає значення синуса аргументу. Через аналогічні методи доступні усі тригонометричні функції |
| [`Math.abs(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) | Повертає абсолютне значення (модуль) числа.                  |
| [`Math.sqrt(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt) | Повертає додатне значення квадратного кореня від аргументу.  |
| [`Math.cbrt(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt) | Повертає кубічний корінь числа.                              |
| [`Math.pow(x, y)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) | Повертає результат піднесення `x` до степеня `y`.            |
| [`Math.ceil(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) | Повертає число, округлене "до більшого".                     |
| [`Math.floor(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) | Повертає результат округлення "до меншого", тобто відкидує дробову частину. |
| [`Math.round(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/round) | Повертає значення аргументу, округлене до найближчого цілого. |
| [`Math.trunc(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) | Повертає цілу частину аргументу, відкидаючи всю дробову частину. |
| [`Math.log10(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/log10) | Повертає логарифм за основою 10 від аргументу.               |
| [`Math.random()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/random) | Повертає псевдовипадкове число з-поміж 0.0 і 1.0.            |
| [`Math.sign(x)`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) | Повертає знак поданого числа. Визначає, чи являється аргумент додатним числом (вертає 1), від'ємним (вертає -1), чи дорівнює 0 (вертає 0). |

Варто зазначити, що тригонометричні функції (sin(), asin() ..) очікують або повертають значення у радіанах. Для конвертації достатньо пам'ятати, що 1 кутовий градус - це (Math.PI / 180) радіан. 

```javascript
console.log (Math.random());        //випадкове число від 0 до 1
console.log (Math.sin(Math.PI/10));//0.3090169943749474
console.log (Math.sign(-15.34));    //-1
```

### Об'єкт Date

JavaScript не має окремого типу даних для збереження дат. Тим не менше, для роботи з датою та часом можна використовувати об'єкт [`Date`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date) та його методи . Він має велику кількість методів для встановлення, отримання та маніпулювання датами, але не має жодних властивостей.

JavaScript зберігають дату, як кількість мілісекунд, що минули з 00:00:00 1 січня 1970 року. Значення в часу в мілісекундах також називається ***TimeStamp***. 

Об'єкт `Date` має окремі методи для підтримки UTC (всесвітній час) та місцевого часу. UTC (узгоджений всесвітній час)  означає час встановлений світовим стандартом. Натомість місцевий час —  це час того комп'ютера, на якому виконується код JavaScript.

Для того, щоб створити власний екземпляр об'єкту `Date` можна викликати однойменний конструктор:

```javascript
let dateObjectName = new Date([parameters]);
```

де `dateObjectName` ім'я змінної в яку присвоюється створене значення з типом `Date`; це може бути як  новий об'єкт, або як властивість існуючого об'єкту.

`parameters` (в наведеному вище синтаксисі) може бути представлений одним з наступних значень:

```javascript
new Date();//Пусто: створюється сьогоднішня дата та час. 
new Date(value);//кількість мілісекунд з 1970 - TimeStamp 
new Date(dateString);//Набір цілих значень для року, місяця і дня
new Date(year, month[, day[, hours[, minutes[, seconds[, milliseconds]]]]]); //Набір цілих значень для року, місяця, дня, години, хвилини та секунди.
```

`value` --- ціле число, що вказує кількість мілісекунд з 1 січня 1970 року 00:00:00 за UTC без врахування високосних секунд. Це те саме, що *час Unix*, але зважайте на те, що більшість функцій часу й дати Unix рахують у секундах.

`dateString` --- Рядок, що вказує дату й час. Має бути у форматі, що розпізнається методом [`Date.parse()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) ([IETF-compliant RFC 2822 timestamps](http://tools.ietf.org/html/rfc2822#page-14), і також [різновид ISO8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15)).

Зверніть увагу, що `month` задається від `0` (січень) до `11` (грудень)

Приклад:

```javascript
let DT1 = new Date(); //теперішня дата
let DT2 = new Date(1587227373000);//TimeStamp  
console.log (DT2);  //Sat Apr 18 2020 19:29:33 GMT+0300 (GMT+03:00)
let DT3 = new Date("2020, 4, 18 19:29:33");  
console.log (DT3);  //Sat Apr 18 2020 19:29:33 GMT+0300 (GMT+03:00)
let DT4 = new Date(2020, 3, 18, 19, 29, 33); // 3 - Квітень, бо 0 - січень  
console.log (DT4);  //Sat Apr 18 2020 19:29:33 GMT+0300 (GMT+03:00)
```

Виклик `Date` як функції, тобто без оператора `new`, повертає теперішню дату та час як рядок (string).

```javascript
console.log (Date());	//виведе плинну дату та час
```

Наступні методи працюють для глобального об'єкту `Date`, але не для об'єктів створених за допомогою конструктора `Date`.  

Таблиця 14.7. Методи об'єкту  `Date`.

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Date.now()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date/now) | Вертає ціле число, що позначає поточний час — кількість мілісекунд  від 00:00:00 за UTC 1 січня 1970 року без врахування високосних секунд. |
| [`Date.parse()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) | Розбирає текстовий запис (рядок) із датою (часом) та повертає кількість  мілісекунд між 00:00:00 за UTC 1 січня 1970 та зазначеною миттю у часі.  Високосні секунди не враховуються. |
| [`Date.UTC()`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC) | Приймає ті самі параметри, що й найдовша форма конструктора (від 2  до 7), та вертає кількість мілісекунд між 00:00:00 1 січня 1970  року за UTC та зазначеною миттю у часі без врахування високосних секунд. |

```javascript
tsDT1 = Date.now();
console.log (tsDT1);         //1587225137339 
tsDT2 = Date.parse("2020, 4, 18 19:29:33");
console.log(tsDT2);          //1587227373000
tsDT3 = Date.UTC(2020, 3, 18, 19, 29, 33);
console.log (tsDT3);         //1587238173000
console.log ((tsDT3-tsDT2)/(60*60*1000));//3 - години різниці
```

Методи об'єкта `Date` для роботи з датами та часом діляться на наступні категорії::

- `set` методи, для встановлення дати та часу в об'єкт `Date`.
- `get` методи, для отримання дати та часу з об'єкту `Date`.
- `to` методи, для отримання значення об'єкта `Date` в рядковому вигляді. 

За допомогою методів групи `get` та `set` можна встановлювати  секунди, хвилини, години, дні місяця, дні тижнів, місяці та роки окремо. Слід звернути увагу на метод `getDay`, який повертає день тижня, але не існує відповідного методу `setDay`, оскільки день тижня встановлюється(вираховується) автоматично. Всі ці  методи використовують цілі числа для представлення відповідних даних, як показано нижче:

- Мілісекунди: `0` до `9999`
- Секунди та хвилини: `0` до `59`
- Години: `0` до `23`
- День: `0` (Неділя) до `6` (Субота)
- Дата: від `1` до `31` (день місяця)
- Місяці: від `0` (Січень) до `11` (Грудень)
- Роки: з `1900`

Методи `get` наведені в наступній таблиці:

Таблиця 14.8. Методи get об'єкту Date.

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear), [`getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth), [`getDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate),  [`getDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay), [`getHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [`getMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes), [`getSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds), [`getMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds) | отримання відповідно року, місяця, дати, дня тижня, години, хвилини, секунди, мілісекунди |
| [`getTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime) | отримання TimeStamp                                          |
| getUTC                                                       | те саме що і `get` тільки для часу UTC                       |
| [`getTimezoneOffset()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) | зміщення в хвилинах місцевої часової зони, що налаштована в пристрої (ПК) відносно UTC |

```javascript
let DT1 = new Date("2020, 4, 18 19:29:33");
console.log (DT1.getFullYear());//2020
console.log (DT1.getMonth());   //3 - квітень, бо 0 -січень
console.log (DT1.getDate());    //18
console.log (DT1.getDay());     //6 - субота (0 - неділя)
console.log (DT1.getTime());    //1587227373000 - TimeStamp
console.log (DT1.getHours());   //19
console.log (DT1.getMinutes()); //29
console.log (DT1.getSeconds()); //33
console.log (DT1.getTimezoneOffset());//-180 - 3 години до UTC
```

Методи `set` наведені в наступній таблиці

Таблиця 14.9. Методи set об'єкту Date.

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`setFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear), [`setMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth), [`setDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) , [`setHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours), [`setMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes), [`setSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds), [`setMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds) | встановлення відповідно року, місяця, дати, години, хвилини, секунди, мілісекунди |
| [`setTime()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) | встановлення часу через мілісекунди (TimeStamp)              |
| Date.prototype.setUTC                                        | те саме що і `set` але для часу UTC                          |

```javascript
let DT1 = new Date(0); console.log (DT1);  //Jan 01 1970 03:00:00
DT1.setFullYear (2020);//можна DT1.setFullYear (2020, 3, 18) щоб задати повністю дату
DT1.setMonth(3);//3 - квітень, бо 0-січень;можна DT1.setMonth(3, 18), щоб задати ще і дату
DT1.setDate(18); 
DT1.setHours(19);//години, можна DT1.setHours(19,29,33) щоб задати повінстю час 
DT1.setMinutes(29);//хвилини, можна DT1.setMinutes(29,33) щоб задати ще хвилини
DT1.setSeconds(33);//секунди, можна DT1.setSeconds(33,500), щоб задати мс 
console.log (DT1);                          //Apr 18 2020 19:29:33
DT1.setTime(1000);                          //1587227373000 - TimeStamp
console.log (DT1);                          //Jan 01 1970 03:00:01
```

Наступні методи перетворюють дату в один з форматів:  

Таблиця 14.10. Методи to об'єкту Date.

| Метод                                                        | Опис                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString) | перетворює в строкове представлення дати та часу в форматі ECMA-262 |
| [`toDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString), [`toTimeString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString) | перетворює в строкове представлення відповідно дати та часу в форматі перетворює в строкове представлення дати та часу в форматі ECMA-262 |
| [`toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) | перетворює в строкове представлення дати та часу в форматі [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) |
| [`toJSON()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON) | перетворює в строкове представлення дати та часу аналогічно попередньому |
| [`toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) | перетворює в строкове представлення дати та часу відповідно до національних налаштувань (задаються в аргументах) |
| [`toLocaleTimeString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString), [`toLocaleDateString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) | перетворює в строкове представлення відповідно дату та час до національних налаштувань (задаються в аргументах) |
| [`toUTCString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString) | перетворює в строкове представлення UTC                      |
| [`valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf) | перетворення в примітивний тип, тобто в TimeStamp            |

```javascript
let DT1 = new Date("2020, 4, 18 19:29:33");
console.log (DT1.toString());       //Sat Apr 18 2020 19:29:33 GMT+0300 (GMT+03:00)
console.log (DT1.toDateString());   //Sat Apr 18 2020
console.log (DT1.toTimeString());   //19:29:33 GMT+0300 (GMT+03:00)
console.log (DT1.toLocaleString("en-US")); //4/18/2020, 7:29:33 PM
console.log (DT1.toLocaleString()); //2020-4-18 19:29:33
console.log (DT1.toLocaleDateString());//2020-4-18
console.log (DT1.toLocaleTimeString());//19:29:33
console.log (DT1.toISOString());    //2020-04-18T16:29:33.000Z
console.log (DT1.toUTCString());    //Sat, 18 Apr 2020 16:29:33 GMT 
console.log (DT1.toJSON());         //2020-04-18T16:29:33.000Z
console.log (DT1.valueOf());        //1587227373000
```

Враховуючи, що дата по суті представлена в числовому форматі, з ними можна проводити операції, як з числами.

```javascript
let DT1 = new Date("2020, 4, 18 19:29:33");
let DT2 = new Date("2019, 4, 18 19:29:33");
console.log (DT2>DT1); //false 
console.log (DT2<DT1); //true
console.log (DT1-DT2); //31622400000 мс
console.log ((DT1-DT2)/(24*60*60*1000)); //366 днів
```

### Об'єкт JSON 

Об'єкт **`JSON`**  містить методи розбору (parsing) [JavaScript Object Notation](https://json.org/) ([JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON)) та навпаки - перетворення значень у JSON. Він не має конструкторів

Таким чином він має всього два методи.

- `JSON.stringify` для перетворення об'єктів та примітивів в JSON.
- `JSON.parse` для перетворення JSON в об'єкти або примітиви

Ці методи JSON працюють з об'єктами, масивами, рядками, числами, булевими значеннями.

Метод `JSON.stringify(student)` перетворює об'єкт `student` у рядок. Отриманий рядок  `json` називається *JSON-форматованим* або ***серіалізованим*** об'єктом. Ми можемо відправити його по мережі або помістити у сховище даних (БД).

Об'єкт у форматі JSON має кілька важливих відмінностей  від об'єктного літералу:

- рядки використовуються подвійні лапки, тобто одинарні і зворотні лапки в JSON не підтримуються. Так `'John'` перетворюється в `"John"`.
- імена властивостей також беруться у подвійні лапки, це обов'язково. Так `age:30` стає`"age":30`.

```javascript
console.log( JSON.stringify('test') ) // "test" рядок в подвійних лапках
console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]

let meetup = {
  title: "Conference",
  room: {number: 23, participants: ["john", "ann"]}
};
console.log ( JSON.stringify(meetup) );
/* вийде рядок:
{"title":"Conference","room":{"number":23,"participants":["john","ann"]}}
*/
```

JSON є незалежною від мови специфікацією для даних, тому `JSON.stringify` пропускає деякі специфічні властивості об'єктів JavaScript, а саме:

- Властивості-функції (методи).
- властивості типу Symbol.
- властивості зі значенням `undefined`.

Однак це обмеження можна обійти через використання `replacer`.

Якщо необхідно налаштувати які саме властивості необхідно кодувати та вказати відступи можна використати повний синтаксис `JSON.stringify`:

```javascript
let json = JSON.stringify(value[, replacer, space])
```

- `value` - значення для кодування.
- `replacer` - масив властивостей для кодування або функція відповідності `function(key, value)`.
- `space` - додатковий простір (відступи), що використовується для форматування 

[JSON.parse](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) розбирає (парсить) рядок із JSON, створюючи відповідне до його вмісту значення чи об'єкт. Якщо при виклику в параметрі `reviver` (другий необов'язковий параметр) вказати функцію, то її буде використано для перетворення створеного об'єкта та його властивостей перед поверненням.

Синтаксис:

```javascript
let value = JSON.parse(text[, reviver]);
```

- `text` - рядок, що його має бути розібрано, як JSON. Докладні відомості про синтаксис JSON наведено в статті про об'єкт [`JSON`](https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/JSON).


- `reviver` (не обов'язковий) - якщо вказано функцію, її буде використано для перетворення отриманих значень перед поверненням.

Наприклад:

```javascript
let txt = "[0, 1, 2, 3]"; //текст, що вміщує масив в форматі JSON
numbers = JSON.parse(txt);
console.log (numbers[1] ); // 1
let txt2 = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user = JSON.parse(txt2);
console.log ( user.friends[1] ); // 1
```

Параметр `reviver` можна використати для керування розбором. Наприклад, необхідно отримати об'єкт `meetup` , який передається у вигляді рядку JSON. При цьому об'єкт містить об'єкт Date.  При перетворенні в об'єкт, вийде наступний результат:

```javascript
//на вузлі відправника
let meetupsend= {title:"Conference", date:new Date("2020-11-30T12:00:00.000Z")};
console.log(meetupsend.date.getDate()); //30
let str = JSON.stringify (meetupsend);
console.log (str);//{"title":"Conference","date":"2020-11-30T12:00:00.000Z"}

//на вузлі отримувача
let meetup = JSON.parse(str);
console.log(meetup.date.getDate()); // TypeError: meetup.date.getDate is not a function
```

Виникає помилка, бо значенням  `meetup.date` є рядок, а не об'єкт `Date`, тому що  `JSON.parse` не міг знати який саме тип було використано при перетворенні в JSON. У цьому випадку можна скористатися параметром `reviver` , який буде викликати функцію для перетворення кожного ключа. 

```javascript
let str = '{"title":"Conference","date":"2020-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
console.log( meetup.date.getDate() ); // 30 
```

### Об'єкт Function

У JavaScript функції - це також об'єкти, які мають властивості і методи.

```javascript
let fno = function fn1(a,b,c){console.log (a+b+c);}
console.log (fno.name);     //fn1 - ім'я функції
console.log (fno.length);   //3 - кількість параметрів
console.log (fno.toString());//повертає першокод функції, вивід буде наступний   
//function fn1(a,b,c){console.log (a+b+c);}
fno.call (this, 100,10,1);    //111, викликає фукнкцію, this передається для контекста
```

### Об'єкт Buffer

Буфер - область пам'яті, яка використовується для тимчасового збереження бінарних даних (I/O, файли, мережа …). Для роботи з буфером використовується глобальний клас Buffer, який надає для цього ряд методів. 

```js
let buf1 = Buffer.alloc(8,0xFF); // виділити буфер на 8 байт і заповнити
buf1.write('ABC', 2);//записати 65,66,67 с 2-го байта
let buf2 = Buffer.from('DEF'); //отримати буфер з рядку => 68 69 70
let buf3 = Buffer.from([1,2]); //отримати буфер з масиву
let buf4 = Buffer.concat([buf1,buf3,buf2],buf1.length + buf2.length + buf3.length); 
console.log (buf4.length); //24
console.log (buf4.toJSON().data);//виведе масив значень байтів буферу
```

Буфер можна вважати байтовою послідовністю. Для інтерпретації цієї послідовності як даних певного типу, є різноманітні методи, наприклад `readInt16BE(offset)` інтерпретує 16-біт буферу починаючи з `offset` як 16-бітний Integer в форматі `Big Endian`. Ось кілька прикладів:

```js
const buf = Buffer.from([1, 2, 3, 4, 0, 5]);
console.log(buf.readInt16BE(4)); //виведе 5 0x0005
console.log(buf.readInt16LE(4)); //виведе 1280 0x0500
buf.writeFloatBE(36.5, 0); //запише 36.5 в форматі BigEndian
console.log(buf.readFloatBE(0)); //виведе 36.5
console.log(buf.readFloatLE(0)); //виведе 6.549669022254195e-42
```

 Усі методи наведені в [документації](https://nodejs.org/api/buffer.html)    

## Додаткові посилання

- [Асинхронний JS](asyncjs.md)

## Запитання для самоперевірки

1. Що таке стрілочні функції? 
2. Розкажіть про функції зворотного виклику та асинхронність.
3. Розкажіть як в середині об'єкта звертатися до власних методів та властивостей.
4. Розкажіть про конструктори об'єктів. 
5. Назвіть кілька властивостей і методів об'єкту Number.
6. Назвіть кілька властивостей і методів об'єкту Math. 
7. Назвіть кілька властивостей і методів об'єкту Date. 
8. Яке призначення об'єкту JSON?
9. Назвіть кілька властивостей і методів об'єкту Function.   

| [<- до лекцій](README.md)         | [на основну сторінку курсу](../README.md) |
| --------------------------------- | ----------------------------------------- |
| [<-до попередньої](javascript.md) |                                           |