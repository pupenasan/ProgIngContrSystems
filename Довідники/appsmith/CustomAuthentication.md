# Спеціальна автентифікація

https://docs.appsmith.com/advanced-concepts/custom-authentication

[відео](https://youtu.be/5oPcF9dXZyU)

## Кроки для реалізації

### Налаштування

Для цього прикладу припустімо, що у вашій програмі є сторінка під назвою "**MainPage**", яку ви хочете захистити за допомогою процесу входу.

1. Почніть зі створення нової сторінки під назвою "**LoginPage**" у вашій програмі.
2. Створіть [Form widget](https://docs.appsmith.com/reference/widgets/form) і додайте [Віджети введення](https://docs.appsmith.com/reference/widgets/input) для обох ім’я користувача (під назвою «**UsernameInput**» у цьому посібнику) і пароль («**PasswordInput**»).

Вам знадобиться запит для обробки зв’язку з вашим API автентифікації:

Якщо вам потрібна кінцева точка для тестування вашої програми, ви можете використати приклад API автентифікації Appsmith із такими обліковими даними:

```text
url:          https://strapi-production-6391.up.railway.app/api/auth/local
request type: POST
identifier:   appsmith_user
password:     appsmith_password
```

1. Створіть [datasource](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication#creating-an-authenticated-api-datasource).
2. Створіть [API query](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis) (тут під назвою «**login_api**») з URI кінцевої точки автентифікації.
3. Помістіть текст віджетів введення в тіло запиту. Доступ до віджетів введення має виглядати приблизно так:

```javascript
// JSON in the query body field
{ {
  {
    identifier: UsernameInput.text,
    password: PasswordInput.text
  }
} }
```

У разі успішної відповіді ваш API автентифікації має повернути дійсний маркер доступу. У наведеному нижче прикладі ключ `jwt` — це маркер, який вказує на те, що користувача було автентифіковано. Успішна відповідь може виглядати так:

```javascript
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIyNzE1MTU0LCJleHAiOjE2MjUzMDcxNTR9.rqkR0bVR5g0k8awGTYDEQ0vr15H7401zxkTxpWp9Mc4",
  "user": {
    "id": 2,
    "username": "Vihar",
    "email": "vihar@appsmith.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "role": {
      "id": 1,
      "name": "Authenticated",
      "description": "Default role given to authenticated user.",
      "type": "authenticated"
    },
    "created_at": "2021-06-03T03:10:37.945Z",
    "updated_at": "2021-06-03T03:10:37.952Z"
  }
}
```

### Потік автентифікації

Повернувшись на полотно програми, налаштуйте кнопку форми входу для запуску запиту **login_api** за допомогою властивості **onClick** кнопки. Ось як працює потік:

1. Виконайте запит
2. Якщо відповідь містить дійсний `jwt`, збережіть його в [Appsmith store](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/store-value), а потім візьміть користувача на **MainPage**
3. Інакше, якщо немає дійсного `jwt`, [show an alert message](https://docs.appsmith.com/reference/appsmith-framework/widget-actions/show-alert), щоб повідомити користувачеві, що було помилка.

У коді кнопка **onClick** має виглядати так:

```javascript
{ {
    login_api.run(() => {
        const jwt = login_api?.data?.jwt;

        if (jwt) {
            storeValue('jwt', jwt);
            navigateTo('MainPage', {});
        } else {
            showAlert('Login failed!', 'error');
        }
    })
} }
```

Значення `jwt`, яке ви зберегли в магазині Appsmith, використовується, щоб підтвердити вашій програмі, що користувача розпізнано, і йому може бути надано основний вміст. Пізніше його можна використовувати в запитах вашої головної програми для ідентифікації та надання дозволів користувачеві, наприклад. `Authorization: Bearer {{appsmith.store.jwt}}`

### Контроль доступу до програми

Наразі настав час налаштувати вашу **MainPage**, щоб дозволити доступ користувачам, які ввійшли в систему, і переспрямувати неавторизованих.

1) На **MainPage** розмістіть вміст вашої програми у [Tabs widget](https://docs.appsmith.com/reference/widgets/tabs). У ньому має бути принаймні дві вкладки: одна для вашого захищеного вмісту (називається «**authorized**»), а друга — для використання як переспрямування для неавторизованих користувачів («**unauthorized**»).

2) У властивості «Default Tabs» віджета «Tabs » напишіть код для виконання запиту, який вимагає автентифікації користувача. У запиті має використовуватися попередній маркер доступу `jwt`, на який посилається `{{ appsmith.store.jwt }}`. Якщо він пройшов успішно, користувач може побачити вкладку «authorized»; у разі помилки користувач має побачити вкладку «unauthorized».

```javascript
{ {
  SecureQuery.data.status == "200 OK"? "authorized": "unauthorized"
} }
```

3) На вкладці **unauthorized** додайте повідомлення, щоб повідомити користувачеві, що він повинен увійти, і додайте кнопку «Login», яка використовує `navigateTo()`, щоб переслати користувача на **LoginPage**.

4) Вимкніть властивість **Show Tabs** віджета вкладок, щоб приховати вкладки у верхній частині сторінок і запобігти користувачам самостійно переходити між ними.

Після цих кроків будь-який користувач, який не ввійшов у систему за допомогою дійсного маркера `jwt`, зможе побачити лише вкладку **unauthorized**, яка перенаправляє їх назад на **LoginPageу**. Користувачі з дійсними маркерами потрапляють прямо на вкладку **authorized**.

Ваша програма готова до обробки входу користувачів.

### Розлогінювання

Надання користувачам можливості вийти з вашої програми після завершення може допомогти підвищити безпеку ваших даних.

У попередніх кроках ви використали маркер `jwt`, що зберігається в магазині Appsmith, у запиті, який показує, чи автентифікований користувач. Щоб позбавити їх можливості автентифікації та перегляду захищених даних, ви повинні очистити їхній маркер доступу `jwt` із магазину Appsmith, щоб їм потрібно було знову ввійти, якщо вони хочуть отримати новий.

Щоб видалити це значення зі сховища, встановіть для нього значення `undefined`. Потім перенаправте їх на **LoginPage** подалі від ваших захищених даних.

```javascript
// In a Button widget or other custom workflow
{ { 
  (() => {
    storeValue("jwt", undefined);
    navigateTo("LoginPage");
  })()
} }
```

Після натискання вашої кнопки, щоб вийти, вони переходять на **LoginPage**, де вони повинні увійти знову, щоб побачити ваш вміст **MainPage**.

## Спеціальні посібники OAuth

Ви можете використовувати сторонні служби OAuth для автентифікації користувачів вашої програми за допомогою SSO, як-от Google, GitHub, Twitter тощо. Для цього вам потрібно буде підключитися до служби, яка інтегрується з вашим потрібним постачальником OAuth. Вам можуть сподобатися ці відеоінструкції:

- [Custom Google authentication with Xano](https://www.youtube.com/watch?v=n3XSAA7q--I)
- [Custom Google authentication with Supabase](https://www.youtube.com/watch?v=mfhHUDNCkoQ)