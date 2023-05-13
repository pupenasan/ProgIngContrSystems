# Як створити електронний лист із підтвердженням реєстрації за допомогою Node.js

https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a

[Mariana Vargas](https://marianamv.medium.com/?source=post_page-----c2fea602872a--------------------------------)

Image by [vectorjuice](https://br.freepik.com/vetores-gratis/email-marketing-chat-na-internet-suporte-24-horas-entre-em-contato-inicie-contato-fale-conosco-feedback-formulario-online-fale-com-o-conceito-de-clientes_10780041.htm#page=1&query=mail vectorjuice&position=0) available on [Freepik](http://freepik.com)

Електронні листи з підтвердженням реєстрації користувачів є важливим кроком як для маркетингу, так і для безпеки. З точки зору маркетингу, електронні листи з підтвердженням встановлюють перше спілкування з клієнтом, гарантуючи надсилання важливої інформації до завершення процесу реєстрації, дотримання [положень GDPR](https://www.mailigen.com/blog/gdpr/) і гарантує, що наступні листи не потраплять до спаму.

З точки зору безпеки, ці електронні листи гарантують, що користувач не реєструється за допомогою підробленої електронної пошти.

У цьому підручнику я розповім вам про впровадження електронних листів із підтвердженням функції реєстрації за допомогою React і Node.js.

## Для кого цей посібник?

Цей підручник призначений для тих, хто вже має базові знання веб-розробки за допомогою фреймворків JavaScript. Я пропоную вам інтегрувати нові функції в уже існуючий процес автентифікації.

Я дам вам увесь необхідний код, якщо ви захочете використовувати цей підручник як вправу з програмування. Однак якщо у вас уже є веб-програма, і ви хочете лише додати власний електронний лист із підтвердженням реєстрації, ви зможете виконати кожен крок цього посібника, щоб зробити це самостійно, навіть якщо ви використовуєте різні фреймворки JavaScript.

## Як налаштувати електронний лист із підтвердженням реєстрації

Для цього підручника я використовував програму Node.js із базою даних Mongo DB, яку можна клонувати [тут](https://github.com/bezkoder/node-js-jwt-auth-mongodb).

Для інтерфейсу я використовував реєстраційну форму React з автентифікацією JWT, яку можна знайти [за посиланням](https://github.com/bezkoder/react-hooks-jwt-auth).

## Крок 1 — Підготуйте модель користувача

Якщо ви використовуєте початковий код, про який я згадував у попередньому розділі, ви можете знайти модель користувача у файлі `models/user.model.js`. Поточна модель містить три поля:`username`, `email`,  та `password`. Потрібно додати ще два:

- `status`: кожен новий користувач повинен бути створений зі статусом "Pending" (Очікує на розгляд) за умовчанням. Після реєстрації він отримає лист-підтвердження з посиланням для активації. Якщо натиснути на нього, його статус буде оновлено до «Active».
- `confirmationCode`: унікальний маркер для кожного користувача.

```js
// models/user.model.js 
// Модель користувача
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
```

## Крок 2 — Змініть процедури входу

Лише користувачі зі статусом «Active» мають мати змогу ввійти, тому ми повинні включити повідомлення про помилку в метод `signin`, яке відображатиметься, коли користувач зі статусом «Pending» спробує ввійти. Цей метод можна знайти в `controllers/auth.controller.js`:

```js
// controllers/auth.controller.js 
// Повідомлення про помилку, яке буде включено в метод signing().
if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }
```

## Крок 3 — Змініть процедури реєстрації

Метод `signup` знаходиться у файлі `controllers/auth.controller.js`. Його потрібно оновити, щоб створити `confirmationCode` і додати до об’єкта користувача, який буде зберігатися в базі даних.

`confirmationCode` можна створити кількома способами. Я пропоную два:

1. Обчисліть свій власний унікальний маркер за допомогою функції `Math.random()`:

```js
// controllers/auth.controller.js
// Код підтвердження реєстрації, створений за допомогою функції Math.random().
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let token = '';
for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length )];
}
```

2. Використовуйте відповідний пакет npm. Вам є з чого вибрати. Для цього підручника я використав [jwt-encode](https://www.npmjs.com/package/jwt-encode), який створює веб-токени JSON за допомогою секрету та функції `sign()`.

```js
// Код підтвердження реєстрації, створений за допомогою пакета jwt-encode
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

  const token = jwt.sign({email: req.body.email}, config.secret)

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: token
  });
```

Зауважте, що для функції `sign()` я використав константу з назвою `secret`, яка вже визначена у файлі `config/auth.config.js`.

## Крок 4 — Надішліть електронний лист із підтвердженням

`nodemailer` — ідеальний пакет npm для надсилання електронних листів. Якщо ви ще цього не зробили, встановіть цей пакет:

```
npm install nodemailer
```

Потім вам потрібно включити облікові дані відправника, а саме його адресу електронної пошти та пароль, у файл конфігурації програми. Для цього підручника я спеціально створив обліковий запис електронної пошти, і я настійно рекомендую не використовувати особисту електронну адресу для цієї вправи, якщо ви не маєте глибокого розуміння питань безпеки.

***Важливо:*** *Щоб використовувати Gmail із nodemailer,* [*потрібно ввімкнути доступ для менш безпечних програм*](https://www.google.com/settings/security/lesssecureapps)* , інакше він не надсилатиме жодних електронних листів.*

З метою узгодженості (будь ласка, пам’ятайте, що я не використовую власний код як відправну точку для цього підручника), я зберіг облікові дані у файлі `configs/auth.config.js`. Однак я наполегливо рекомендую вам зберігати цю інформацію у файлі `.env` і включити її у свій файл `.gitignore`.

```js
// configs/auth.config.js
// Облікові дані для автентифікації електронної пошти зберігаються 
module.exports = {
  secret: "bezkoder-secret-key",
  user: "mediumtutorial2021@gmail.com", 
  pass: "medium2021t", 
};
```

Після цього нам потрібно додати новий файл у папку `config`, щоб налаштувати службу електронної пошти. Я створив `nodemailer.config.js`. Щоб налаштувати SMTP-з’єднання, нам потрібно створити об’єкт транспортера, викликавши функцію createTransport у nodemailer. Ми також маємо передати йому облікові дані відправника разом із вибраною службою електронної пошти.

```js
// nodemailer.config.js
// Налаштування служби електронної пошти
const nodemailer = require("nodemailer");
const config = require("../config/auth.config");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
```

Наступним кроком є створення самого електронного листа за допомогою методу `sendEmail()`, викликаного через `transporter`. Є [багато додаткових полів, які можна додати до електронного повідомлення](https://nodemailer.com/message/). Для цього підручника я використав:

- `from` — адреса електронної пошти відправника.
- `to` — електронні адреси одержувачів.
- `subject` — тема електронного листа.
- `html `— HTML-версія повідомлення електронної пошти, щоб служба електронної пошти могла його відкрити.

Електронне повідомлення має містити URL-адресу з `confirmationCode`. Це необхідно для порівняння з відповідним полем `confirmationCode` користувача, що зберігається в базі даних.

```js
// Email configuration
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};
```

Нарешті, щоб надіслати електронний лист із підтвердженням після створення нового користувача, ми можемо викликати `sendEmail()` всередині методу `signup`.

```js
// Уривок методу реєстрації, включаючи виклик sendEmail().
user.save((err) => {
     if (err) {
       res.status(500).send({ message: err });
            return;
         }
        res.send({
            message:
              "User was registered successfully! Please check your email",
         });

       nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          user.confirmationCode
   );
});
```



## Крок 5— Створіть маршрут підтвердження

Нам потрібно налаштувати маршрут для зміни статусу користувача з «Pending» на «Active». Тому я включив новий маршрут у файл `auth.rotes.js` і налаштував новий контролер для обробки процедури. Контролер `verifyUser` шукає в базі даних користувача з `confirmationCode`, отриманим в URL-адресі, і виконує відповідне оновлення статусу.

```js
app.get("/api/auth/confirm/:confirmationCode", controller.verifyUser)
```

Кінцева точка, визначена для процесу перевірки користувача

```js
// Метод VerifyUser() запитує колекцію користувачів за вказаним кодом підтвердження та оновлює його статус із «Pending» на «Active», якщо знайдено збіг.
exports.verifyUser = (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};
```



## Крок 6 — Створіть сторінку привітання

У цей момент, якщо користувач клацне посилання для підтвердження в електронному листі, він побачить порожню сторінку та все одно не зможе ввійти. Тому нам потрібно внести деякі зміни в інтерфейс, щоб завершити процедуру реєстрації.

Нам потрібно додати новий метод у `src/components/services/auth.service.js` для виклику кінцевої точки, визначеної на останньому кроці.

```js
// Додайте метод verifyUser() до auth.service.js, 
// щоб встановити з’єднання з серверною частиною
const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};
```

Після цього ми маємо створити новий компонент, який відображатиметься під час натискання URL-адреси підтвердження. Не забудьте включити відповідний маршрут у файл `App`!

```js
// Вітальний компонент
import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/login"}">
        Please Login
      </Link>
    </div>
  );
};

export default Welcome;
```

Frontend route to exhibit Welcome Component when the confirmation link is clicked

```html
<Route path="/confirm/:confirmationCode" component={Welcome} />
```

## Крок 7 — Перевіримо!

Давайте зберемо все разом і перевіримо, чи працює наш додаток.

### 1. Створіть новий обліковий запис користувача

![img](https://miro.medium.com/v2/resize:fit:700/1*lL15G29J2FcpBzFIXFbrIQ.png)

Це повідомлення, яке ви можете побачити:

![img](https://miro.medium.com/v2/resize:fit:700/1*MA_MeGCWOGPnteJjmwtLAw.png)

І якщо ви спробуєте ввійти, ви побачите ось цю помилку:

![img](https://miro.medium.com/v2/resize:fit:700/1*QjRhPYfdWZQvrQoMAppiTQ.png)

### 2. Перевірте свою поштову скриньку

Можливо, ви отримали такий електронний лист, як мій:

![img](https://miro.medium.com/v2/resize:fit:700/1*JsTW2Sgr-fU2YIF7pBfssQ.png)

Натисніть на посилання та підтвердьте, що це веб-сторінка, на яку ви перенаправлені:

![img](https://miro.medium.com/v2/resize:fit:700/1*nMc3jKDn3hoX56VAYtNfKA.png)

Тепер, якщо ви спробуєте ввійти знову, ви будете автоматично перенаправлені на сторінку свого профілю.

![img](https://miro.medium.com/v2/resize:fit:700/1*_QGLVZizT6ESucTMUa64zQ.png)

Оскільки ви завершили цей підручник, ви навчилися створювати електронний лист із підтвердженням реєстрації за допомогою Node.js і тепер можете створювати надійну функцію реєстрації. Щиро вітаю!

Ви можете знайти повне рішення, розроблене в цьому посібнику, у цьому [репозиторії GitHub](https://github.com/marianamv112/signup-confirmation-email). Щасливого кодування!