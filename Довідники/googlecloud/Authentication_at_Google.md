# Автентифікація в Google

https://cloud.google.com/docs/authentication

Цей документ допоможе вам зрозуміти деякі ключові концепції автентифікації та де отримати допомогу щодо впровадження або усунення несправностей автентифікації. Основна увага в документації щодо автентифікації стосується служб Google Cloud, але список [випадків використання автентифікації](https://cloud.google.com/docs/authentication/use-cases) і вступний матеріал на цій сторінці включає випадки використання для інших продуктів Google.

## Вступ

Автентифікація – це процес підтвердження вашої особи за допомогою певного типу [облікових даних](https://cloud.google.com/docs/authentication#credentials). Автентифікація – це підтвердження того, що ви є тим, за кого себе видаєте.

Google надає багато API і служб, доступ до яких вимагає автентифікації. Google також надає ряд послуг, які розміщують програми, написані нашими клієнтами; ці програми також повинні означувати ідентичність своїх користувачів.

## Як отримати допомогу з автентифікацією

| Я хочу...                                                    | Інформація                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Автентифікуватись у службі Google Cloud із моєї програми за допомогою мови програмування високого рівня. | [Set up Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc), and then use one of the [Cloud Client Libraries](https://cloud.google.com/docs/authentication/client-libraries). |
| Пройти автентифікацію в програмі, яка працює в Cloud Run або Cloud Functions. | [Get an OpenID Connect (OIDC) ID token](https://cloud.google.com/docs/authentication/get-id-token) and provide it with your request. |
| Реалізувати автентифікацію користувача для програми, яка отримує доступ до служб і ресурсів Google або Google Cloud. | See [Authenticate application users](https://cloud.google.com/docs/authentication/use-cases#app-users) for a comparison of options. |
| Спробуйвати деякі команди `gcloud` або виклики Google Cloud REST API у моєму локальному середовищі розробки. | [Set up Application Default Credentials](https://cloud.google.com/docs/authentication/provide-credentials-adc) with your login credentials. You can then use a command-line tool such as `curl` to [call the REST API](https://cloud.google.com/docs/authentication/rest). |
| Отримати допомогу щодо іншого випадку використання автентифікації. | See the [Authentication use cases](https://cloud.google.com/docs/authentication/use-cases) page. |
| Переглянути список продуктів, які Google надає в області керування ідентифікацією та доступом. | See the [Google identity and access management products](https://cloud.google.com/docs/authentication/identity-products) page. |

## Типи автентифікації

Автентифікація потрібна для доступу до більшості ресурсів і програм. Ця документація допомагає фахівцям-практикам створювати код програми з однією з таких цілей:

- [Автентифікація в службах і ресурсах Google](https://cloud.google.com/docs/authentication/use-cases#google-apis)
- [Автентифікація в програмах і функціях, розміщених у службах Google Cloud, як-от Cloud Run і Cloud Functions](https://cloud.google.com/docs/authentication/use-cases#run-functions)
- [Автентифікація кінцевих користувачів у програмі](https://cloud.google.com/docs/authentication/use-cases#app-users)

## OAuth 2.0

API Google реалізують і розширюють [платформу OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749). Структура OAuth 2.0 описує різні «потоки» автентифікації або підходи до автентифікації. Загалом програма надає облікові дані, які представляють принципала (або обліковий запис користувача, або обліковий запис служби), проміжному модулю, який називається *сервером авторизації*. Сервер авторизації відповідає [маркером (токеном)](https://cloud.google.com/docs/authentication#token), який програма може використовувати для автентифікації в службі та доступу до ресурсів. Маркер включає одну або кілька *областей*, які відображають, який доступ має надавати програма. Потім програма надає маркер серверу ресурсів, щоб отримати доступ до ресурсів.

## Авторизація для служб Google Cloud

Служби Google Cloud для автентифікації використовують [Ідентифікацію та керування доступом (IAM)](https://cloud.google.com/iam/docs/overview). IAM пропонує детальний контроль за принципалом і за ресурсом. Коли ви проходите автентифікацію в службах Google Cloud, ви зазвичай використовуєте область, яка включає всі служби Google Cloud (`https://www.googleapis.com/auth/cloud-platform`).

Області OAuth 2.0 можуть забезпечити другий рівень захисту, який корисний, якщо ваш код працює в середовищі, де безпека маркерів є проблемою, наприклад у мобільному додатку. У цьому сценарії ви можете використовувати [точніші області дії](https://developers.google.com/identity/protocols/oauth2/scopes), щоб зменшити ризик у разі скомпрометованого маркера. Області OAuth 2.0 також використовуються для [авторизації доступу до даних користувача](https://developers.google.com/identity/protocols/oauth2/web-server).

## Application Default Credentials (ADC)

ADC — це стратегія, яка використовується [Cloud Client Libraries і Google API Client Libraries](https://cloud.google.com/apis/docs/client-libraries-explained) для автоматичного пошуку облікових даних на основі середовища програми та їх використання облікові дані для автентифікації в Google Cloud API. Коли ви налаштовуєте ADC і використовуєте клієнтську бібліотеку, ваш код може працювати як у середовищі розробки, так і в робочому середовищі, не змінюючи спосіб автентифікації програми в службах Google Cloud і API.

Якщо ви пишете код, який потребує використання служб Google Cloud, вам слід використовувати ADC, коли це можливо. Використання ADC може спростити процес розробки, оскільки дозволяє використовувати той самий код автентифікації в різних середовищах.

Ви налаштовуєте ADC, надаючи свої облікові дані залежно від того, де ви хочете запускати код. Після того як ви [надасте свої облікові дані в ADC](https://cloud.google.com/docs/authentication/provide-credentials-adc), ADC [автоматично знаходить облікові дані](https://cloud.google.com/docs/ authentication/application-default-credentials) і отримує маркер у фоновому режимі, що дозволяє виконувати ваш код автентифікації в різних середовищах без змін. Наприклад, одна і та сама версія вашого коду може автентифікуватися за допомогою Google Cloud API під час роботи на робочій станції розробки або на Compute Engine.

## Terminology

Під час обговорення автентифікації та авторизації важливо розуміти наступні терміни.

Автентифікація - це процес визначення особи принципала, який намагається отримати доступ до ресурсу.

Авторизація. Авторизація — це процес визначення того, чи авторизовано принципал або додаток, які намагаються отримати доступ до ресурсу, для цього рівня доступу.

Облікові дані (Credentials). Для автентифікації облікові дані є цифровим об’єктом, який забезпечує підтвердження особи. Паролі, PIN-коди та біометричні дані можна використовувати як облікові дані залежно від вимог програми. Наприклад, коли ви входите у свій обліковий запис Google, ви вводите свій пароль і задовольняєте будь-яку вимогу двофакторної автентифікації як доказ того, що обліковий запис справді належить вам і вас не підманює зловмисник.

[Токени](https://cloud.google.com/docs/authentication#token) іноді називають обліковими даними, але в цій документації вони натомість називаються цифровим об’єктом, який доводить, що абонент надав правильні облікові дані, але вони самі по собі не є обліковими даними.

Тип облікових даних, який потрібно надати, залежить від того, на чому ви автентифікуєтесь. У консолі Google Cloud можна створити такі типи облікових даних:

- Ключі API. На відміну від інших облікових даних, ключі API не ідентифікують [принципала](https://cloud.google.com/docs/authentication#principal). Ключі API забезпечують проект Google Cloud для виставлення рахунків і квот. Багато API Google не приймають ключі API. Щоб дізнатися більше про ключі API, перегляньте [Ключі API](https://cloud.google.com/docs/authentication/api-keys).
- Ідентифікатори клієнтів OAuth. Ідентифікатори клієнта OAuth використовуються для ідентифікації програми в Google. Це необхідно, якщо ви хочете отримати доступ до ресурсів, які належать вашим кінцевим користувачам, також називають тристороннім OAuth (3LO). Щоб дізнатися більше про те, як отримати та використовувати ідентифікатор клієнта OAuth, перегляньте [Налаштування OAuth 2.0](https://support.google.com/cloud/answer/6158849).

### Principal

Принципал — це особа, якій можна надати доступ до ресурсу. Для автентифікації API Google підтримують два типи принципалів: [user accounts](https://cloud.google.com/docs/authentication#user-accounts) і [service accounts](https://cloud.google.com/docs/authentication#service-accounts).

Чи використовуєте ви обліковий запис користувача чи обліковий запис служби для автентифікації, залежить від вашого випадку використання. Ви можете використовувати обидва, кожен на різних етапах вашого проекту або в різних середовищах розробки.

#### User accounts

Облікові записи користувачів представляють розробника, адміністратора або будь-яку іншу особу, яка взаємодіє з API і службами Google. Облікові записи користувачів керуються як [Облікові записи Google](https://accounts.google.com/), або за допомогою [Google Workspace](https://workspace.google.com/) або [Cloud Identity](https://cloud.google.com/identity). Це також можуть бути облікові записи користувачів, які керуються стороннім постачальником ідентифікаційної інформації та об’єднані з [workforce identity federation](https://cloud.google.com/iam/docs/workforce-identity-federation). За допомогою облікового запису користувача ви можете автентифікуватися в API та службах Google такими способами:

- Use the gcloud CLI to [set up Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-user-cred).
- Use the gcloud CLI to [generate access tokens](https://cloud.google.com/docs/authentication/rest).
- Use your user credentials to [impersonate a service account](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct#permissions-user).
- Use your user credentials to [log in to the Google Cloud CLI](https://cloud.google.com/sdk/docs/authorizing), then use the tool to access Google Cloud services.

#### Service accounts

[Сервісні облікові записи](https://cloud.google.com/iam/docs/service-accounts) – це облікові записи, які не представляють користувача. Вони надають спосіб керування автентифікацією та авторизацією, коли людина не бере безпосередньої участі, наприклад, коли програмі потрібен доступ до ресурсів Google Cloud. Службовими обліковими записами керує IAM.

У наведеному нижче списку наведено деякі методи використання облікового запису служби для автентифікації в API та службах Google у порядку від найбезпечнішого до найменш безпечного.

- [Attach a user-managed service account to the resource](https://cloud.google.com/docs/authentication/provide-credentials-adc#attached-sa) and [use ADC to authenticate](https://cloud.google.com/docs/authentication/client-libraries). Це рекомендований спосіб автентифікації робочого коду, що працює в Google Cloud.
- [Use a service account to impersonate another service account](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct#permissions-sa). Уособлення службового облікового запису дає змогу тимчасово надати додаткові привілеї обліковому запису служби. Надання додаткових привілеїв на тимчасовій основі дає змогу цьому обліковому запису служби здійснювати необхідний доступ без необхідності постійного отримання додаткових привілеїв.
- Use the [default service account](https://cloud.google.com/iam/docs/service-accounts#default). Використовувати обліковий запис служби за умовчанням не рекомендується, оскільки за замовчуванням обліковий запис служби за замовчуванням має високий рівень привілеїв, що порушує [принцип найменших привілеїв](https://cloud.google.com/iam/docs/using-iam-securely# найменший_привілей).
- [Use a service account key](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-key). Ключі облікового запису служби створюють непотрібний ризик, тому їх слід уникати, коли це можливо.

### Token

Для автентифікації та авторизації маркер — це цифровий об’єкт, який показує, що абонент надав належні облікові дані, які були обміняні на цей маркер. Маркер містить інформацію про особу принципала, який надсилає запит, і тип доступу, який він має право здійснювати.

Маркери можна розглядати як ключі від готелю. Коли ви заселяєтеся в готель і подаєте відповідну документацію на стійку реєстрації готелю, ви отримуєте ключ, який надає вам доступ до певних ресурсів готелю. Наприклад, ключ може дати вам доступ до вашої кімнати та гостьового ліфта, але не дасть доступу до будь-якої іншої кімнати чи службового ліфта.

За винятком ключів API, API Google не підтримують облікові дані безпосередньо. Ваша програма має отримати або згенерувати маркер і надати його API. Існує кілька різних типів маркерів. Щоб дізнатися більше, перегляньте [Типи маркерів](https://cloud.google.com/docs/authentication/token-types).

### Workload та workforce

Ідентифікація та продукти доступу Google Cloud забезпечують доступ до служб і ресурсів Google як для програмного доступу, так і для користувачів. Google використовує терміни ***workload*** для програмного доступу та ***workforce*** для доступу користувачів.

[Workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation) дає змогу надавати доступ до робочих навантажень, які виконуються за межами Google, без необхідності створювати та керувати ключами облікових записів служби.

[Workforce identity federation](https://cloud.google.com/iam/docs/workforce-identity-federation) дає змогу використовувати зовнішнього постачальника ідентифікаційних даних для автентифікації та авторизації робочої сили — групи користувачів, як-от співробітники, партнери і підрядники — за допомогою IAM, щоб користувачі могли отримати доступ до служб Google Cloud.