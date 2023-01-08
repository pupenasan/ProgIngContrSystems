# Розроблення в Google Workspace

https://developers.google.com/workspace/guides/get-started

Google Workspace offers a wide range of developer products and tools that let you connect your service with Google Workspace or extend Google Workspace apps like Gmail, Google Drive, and Google Chat. Each Google Workspace app or integration has its own Google Cloud project where you configure APIs, set up authentication, and manage deployments.

In the Google Cloud console, the [Google Workspace API Overview](https://console.cloud.google.com/workspace-api/overview)  shows many common Google Workspace API tasks that you can complete elsewhere in the Google Cloud console. The Google Workspace APIs are gathered all in one place so that you can conveniently manage these APIs.

Google Workspace пропонує широкий спектр продуктів і інструментів для розробників, які дозволяють підключити ваш сервіс до Google Workspace або розширити програми Google Workspace, такі як Gmail, Google Диск і Google Chat. Кожен додаток або інтеграція Google Workspace має власний проект Google Cloud, де ви налаштовуєте API, налаштовуєте автентифікацію та керуєте розгортанням.

На консолі Google Cloud [Огляд API Google Workspace](https://console.cloud.google.com/workspace-api/overview) показано багато поширених завдань API Google Workspace, які можна виконувати в інших місцях консолі Google Cloud. Усі API Google Workspace зібрані в одному місці, тож ви можете зручно керувати цими API.

5 кроків для початку:

1. [Створіть проект Google Cloud](https://developers.google.com/workspace/guides/create-project) для програми Google Workspace, розширення або інтеграції.
2. [Активуйте API, які ви хочете використовувати](https://developers.google.com/workspace/guides/enable-apis) у своєму проекті Google Cloud.
3. [Дізнайтеся, як працює автентифікація та авторизація](https://developers.google.com/workspace/guides/auth-overview) під час розробки для Google Workspace.
4. [Налаштуйте згоду OAuth](https://developers.google.com/workspace/guides/configure-oauth-consent), щоб переконатися, що користувачі можуть зрозуміти та схвалити доступ вашої програми до їхніх даних.
5. [Створіть облікові дані доступу](https://developers.google.com/workspace/guides/create-credentials), щоб автентифікувати кінцевих користувачів вашої програми або облікові записи служби.

## Створення проекту Google Cloud

Щоб використовувати API Google Workspace і створювати додатки чи додатки Google Workspace, потрібен проект Google Cloud. Цей проект є основою для створення, увімкнення та використання всіх служб Google Cloud, включаючи керування API, увімкнення виставлення рахунків, додавання та видалення співавторів і керування дозволами.

Щоб створити проект Google Cloud:

1) У консолі Google Cloud перейдіть до Меню 

menu\>IAM & Admin\>Create a Project

[Перейти до створення Project](https://console.cloud.google.com/projectcreate)

2) У полі «Project Name» введіть описову назву проекту.  

3) У полі **Location** натисніть **Browse**, щоб відобразити потенційні місця для вашого проекту. Потім натисніть **Select**.

 **Увага: не можете знайти свою організацію Google Workspace?** Це означає, що ви не ввійшли в обліковий запис Google Workspace. Деякі функції, описані в документації для розробників Google Workspace, доступні лише для проектів, пов’язаних з організацією.

4) Натисніть **Створити**. Консоль переходить на сторінку інформаційної панелі, і ваш проект створюється протягом кількох хвилин.

Додаткову інформацію про проекти Google Cloud див. у статті [Створення проектів і керування ними](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

## АктиваціяAPI

Перш ніж використовувати API Google, їх потрібно ввімкнути в проекті Google Cloud. Ви можете ввімкнути один або кілька API в одному проекті Google Cloud.

Щоб увімкнути API у вашому хмарному проекті:

1. У консолі Google Cloud перейдіть до Меню

   menu \> More products \> Google Workspace \> Product Library

   [Перейти до Product Library](https://console.cloud.google.com/workspace-api/api-list)

2. Виберіть API, який потрібно ввімкнути.

3. Натисніть **Enable**.

4. Зобіть те саме з іншими APIs.

## Автентифікація та авторизація

## Налаштування OAuth

## Створення облікових даних для доступу