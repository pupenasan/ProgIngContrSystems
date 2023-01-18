# The OAuth 2.0 Authorization Framework

https://oauth.net/2/

https://www.rfc-editor.org/rfc/rfc6749.txt

## Abstract

The OAuth 2.0 authorization framework enables a third-party    application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner and the HTTP service, or by allowing the third-party application to obtain access on its own behalf.  This specification replaces and obsoletes the OAuth 1.0 protocol described in RFC 5849.

Платформа авторизації OAuth 2.0 дозволяє програмі третьої сторони отримувати обмежений доступ до служби HTTP від імені власника ресурсу, організовуючи взаємодію затвердження між власником ресурсу та службою HTTP, або дозволяючи програмі третьої сторони отримати доступ від свого імені. Ця специфікація замінює та застаріває протокол OAuth 1.0, описаний у RFC 5849.

### Status of This Memo

This is an Internet Standards Track document.

This document is a product of the Internet Engineering Task Force (IETF).  It represents the consensus of the IETF community.  It has received public review and has been approved for publication by the Internet Engineering Steering Group (IESG).  Further information on Internet Standards is available in Section 2 of RFC 5741.

Information about the current status of this document, any errata, and how to provide feedback on it may be obtained at http://www.rfc-editor.org/info/rfc6749.

### Copyright Notice

Copyright (c) 2012 IETF Trust and the persons identified as the document authors.  All rights reserved.

This document is subject to BCP 78 and the IETF Trust's Legal Provisions Relating to IETF Documents    (http://trustee.ietf.org/license-info) in effect on the date of publication of this document.  Please review these documents    carefully, as they describe your rights and restrictions with respect to this document.  Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.

## 1. Introduction

In the traditional client-server authentication model, the client requests an access-restricted resource (protected resource) on the server by authenticating with the server using the resource owner's credentials.  In order to provide third-party applications access to restricted resources, the resource owner shares its credentials with the third party.  This creates several problems and limitations:

У традиційній моделі автентифікації клієнт-сервер клієнт запитує ресурс з обмеженим доступом (захищений ресурс) на сервері шляхом автентифікації на сервері за допомогою облікових даних власника ресурсу. Щоб надати стороннім програмам доступ до обмежених ресурсів, власник ресурсу ділиться своїми обліковими даними з третьою стороною. Це створює кілька проблем і обмежень:

- Third-party applications are required to store the resource  owner's credentials for future use, typically a password in  clear-text.

- Servers are required to support password authentication, despite  the security weaknesses inherent in passwords.

- Third-party applications gain overly broad access to the resource  owner's protected resources, leaving resource owners without any  ability to restrict duration or access to a limited subset of resources.

- Resource owners cannot revoke access to an individual third party    without revoking access to all third parties, and must do so by    changing the third party's password.

- Compromise of any third-party application results in compromise of    the end-user's password and all of the data protected by that    password.



- Програми сторонніх розробників повинні зберігати облікові дані власника ресурсу для подальшого використання, як правило, пароль у відкритому вигляді.

- Сервери повинні підтримувати автентифікацію за паролем, незважаючи на недоліки безпеки, властиві паролям.

- Програми третіх сторін отримують надто широкий доступ до захищених ресурсів власника ресурсу, залишаючи власників ресурсів без будь-якої можливості обмежити тривалість або доступ до обмеженої підмножини ресурсів.

- Власники ресурсів не можуть скасувати доступ до окремої третьої сторони, не скасувавши доступ для всіх третіх сторін, і повинні зробити це, змінивши пароль третьої сторони.

- Компрометація будь-якої програми третьої сторони призводить до компрометації пароля кінцевого користувача та всіх даних, захищених цим паролем.

OAuth вирішує ці проблеми, запроваджуючи рівень авторизації та відокремлюючи роль клієнта від ролі власника ресурсу. У OAuth клієнт запитує доступ до ресурсів, які контролюються власником ресурсу та розміщені на сервері ресурсів, і отримує інший набір облікових даних, ніж у власника ресурсу.

Instead of using the resource owner's credentials to access protected resources, the client obtains an access token -- a string denoting a specific scope, lifetime, and other access attributes.  Access tokens are issued to third-party clients by an authorization server with the approval of the resource owner.  The client uses the access token to access the protected resources hosted by the resource server.

Замість того, щоб використовувати облікові дані власника ресурсу для доступу до захищених ресурсів, клієнт отримує маркер доступу — рядок, що позначає конкретну область, час життя та інші атрибути доступу. Маркери доступу видаються стороннім клієнтам сервером авторизації зі схвалення власника ресурсу. Клієнт використовує маркер доступу для доступу до захищених ресурсів, розміщених на сервері ресурсів.

For example, an end-user (resource owner) can grant a printing service (client) access to her protected photos stored at a photo-sharing service (resource server), without sharing her username and password with the printing service.  Instead, she authenticates directly with a server trusted by the photo-sharing service (authorization server), which issues the printing service delegation-specific credentials (access token).

Наприклад, кінцевий користувач (власник ресурсу) може надати службі друку (клієнту) доступ до своїх захищених фотографій, які зберігаються в службі обміну фотографіями (сервер ресурсу), не повідомляючи своє ім’я користувача та пароль службі друку. Натомість вона здійснює автентифікацію безпосередньо на сервері, якому довіряє служба обміну фотографіями (сервер авторизації), який видає облікові дані для делегування служби друку (токен доступу).

This specification is designed for use with HTTP ([RFC2616]).  The use of OAuth over any protocol other than HTTP is out of scope.

Ця специфікація розроблена для використання з HTTP ([RFC2616]). Використання OAuth через будь-який протокол, окрім HTTP, виходить за рамки.

The OAuth 1.0 protocol ([RFC5849]), published as an informational document, was the result  of a small ad hoc community effort.  This Standards Track specification builds on the OAuth 1.0 deployment experience, as well as additional use cases and extensibility requirements gathered from the wider IETF community.  The OAuth 2.0 protocol is not backward compatible with OAuth 1.0.  The two versions may co-exist on the network, and implementations may choose to support both.  However, it is the intention of this specification that new implementations support OAuth 2.0 as specified in this document and that OAuth 1.0 is used only to support existing deployments.  The OAuth 2.0 protocol shares very few implementation details with the OAuth 1.0 protocol.  Implementers familiar with OAuth 1.0 should approach this document without any assumptions as to its structure and details.

Протокол OAuth 1.0 ([RFC5849]), опублікований як інформаційний документ, став результатом невеликих спеціальних зусиль спільноти. Ця специфікація Standards Track базується на досвіді розгортання OAuth 1.0, а також на додаткових варіантах використання та вимогах щодо розширення, зібраних ширшою спільнотою IETF. Протокол OAuth 2.0 не сумісний із OAuth 1.0. Дві версії можуть співіснувати в мережі, а реалізації можуть вибрати підтримку обох. Однак мета цієї специфікації полягає в тому, щоб нові реалізації підтримували OAuth 2.0, як зазначено в цьому документі, і щоб OAuth 1.0 використовувався лише для підтримки існуючих розгортань. Протокол OAuth 2.0 має дуже мало спільних деталей реалізації з протоколом OAuth 1.0. Розробники, знайомі з OAuth 1.0, повинні підходити до цього документа без будь-яких припущень щодо його структури та деталей.

### 1.1.  Roles

OAuth defines four roles:

resource owner - An entity capable of granting access to a protected resource.    When the resource owner is a person, it is referred to as an    end-user.

resource server - The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.

client - An application making protected resource requests on behalf of the resource owner and with its authorization.  The term "client" does not imply any particular implementation characteristics (e.g., whether the application executes on a server, a desktop, or other devices).

authorization server - The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.

The interaction between the authorization server and resource server is beyond the scope of this specification.  The authorization server may be the same server as the resource server or a separate entity. A single authorization server may issue access tokens accepted by multiple resource servers.

OAuth означує чотири ролі:

**Власник ресурсу** (resource owner) - суб'єкт, здатний надати доступ до захищеного ресурсу. Якщо власником ресурсу є особа, її називають кінцевим користувачем.

**сервер ресурсів** (resource server) - сервер, на якому розміщені захищені ресурси, здатний приймати та відповідати на запити захищених ресурсів за допомогою маркерів доступу.

**клієнт** – додаток, що робить запити на захищений ресурс від імені власника ресурсу та з його авторизації. Термін «клієнт» не передбачає будь-яких конкретних характеристик реалізації (наприклад, чи виконується програма на сервері, робочому столі чи інших пристроях).

**сервер авторизації** - сервер, який видає маркери доступу клієнту після успішної автентифікації власника ресурсу та отримання авторизації.

Взаємодія між сервером авторизації та сервером ресурсів виходить за рамки цієї специфікації. Сервер авторизації може бути тим самим сервером, що й сервер ресурсів, або окремою сутністю. Один сервер авторизації може видавати маркери доступу, прийняті декількома серверами ресурсів.

### 1.2.  Protocol Flow

![image-20221120232443021](media/image-20221120232443021.png)


Figure 1: Abstract Protocol Flow

The abstract OAuth 2.0 flow illustrated in Figure 1 describes the interaction between the four roles and includes the following steps:

Абстрактний потік OAuth 2.0, показаний на малюнку 1, описує взаємодію між чотирма ролями та включає такі кроки:

(A)  The client requests authorization from the resource owner.  The   authorization request can be made directly to the resource owner   (as shown), or preferably indirectly via the authorization   server as an intermediary.

(A) Клієнт запитує авторизацію у власника ресурсу. Запит на авторизацію можна надіслати безпосередньо власнику ресурсу (як показано) або бажано опосередковано через сервер авторизації як посередника.

(B)  The client receives an authorization grant, which is a   credential representing the resource owner's authorization,   expressed using one of four grant types defined in this   specification or using an extension grant type.  The   authorization grant type depends on the method used by the   client to request authorization and the types supported by the   authorization server.

(B) Клієнт отримує дозвіл на авторизацію, який є обліковими даними, що представляють дозвіл власника ресурсу, виражений за допомогою одного з чотирьох типів дозволу, визначених у цій специфікації, або за допомогою типу надання розширення. Тип надання авторизації залежить від методу, який використовує клієнт для запиту авторизації, і типів, які підтримуються сервером авторизації.

(C)  The client requests an access token by authenticating with the   authorization server and presenting the authorization grant.

(C) Клієнт запитує маркер доступу шляхом автентифікації на сервері авторизації та надання дозволу на авторизацію.

(D)  The authorization server authenticates the client and validates   the authorization grant, and if valid, issues an access token.

(D) Сервер авторизації автентифікує клієнта та перевіряє надання авторизації, і якщо дійсне, видає маркер доступу.

(E)  The client requests the protected resource from the resource   server and authenticates by presenting the access token.

(E) Клієнт запитує захищений ресурс із сервера ресурсів і автентифікується, представляючи маркер доступу.

(F)  The resource server validates the access token, and if valid,   serves the request.

(F) Сервер ресурсів перевіряє маркер доступу і, якщо він дійсний, обслуговує запит.

The preferred method for the client to obtain an authorization grant from the resource owner (depicted in steps (A) and (B)) is to use the authorization server as an intermediary, which is illustrated in Figure 3 in Section 4.1.

Переважний спосіб для клієнта отримати дозвіл на авторизацію від власника ресурсу (зображеного в кроках (A) і (B)) полягає в тому, щоб використовувати сервер авторизації як посередника, що показано на малюнку 3 у розділі 4.1.

### 1.3.  Authorization Grant

An authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.  This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials -- as well as an extensibility mechanism for defining additional types.

Надання авторизації (authorization grant) — це облікові дані, що представляють авторизацію власника ресурсу (для доступу до його захищених ресурсів), що використовується клієнтом для отримання маркера доступу. Ця специфікація визначає чотири типи дозволів — код авторизації, неявні, облікові дані пароля власника ресурсу та облікові дані клієнта — а також механізм розширення для визначення додаткових типів.

#### 1.3.1.  Authorization Code

The authorization code is obtained by using an authorization server as an intermediary between the client and resource owner.  Instead of requesting authorization directly from the resource owner, the client directs the resource owner to an authorization server (via its user-agent as defined in [RFC2616]), which in turn directs the resource owner back to the client with the authorization code.

Код авторизації отримується за допомогою сервера авторизації як посередника між клієнтом і власником ресурсу. Замість того, щоб запитувати авторизацію безпосередньо у власника ресурсу, клієнт спрямовує власника ресурсу на сервер авторизації (через його агента користувача, як визначено в [RFC2616]), який, у свою чергу, спрямовує власника ресурсу назад до клієнта з кодом авторизації.

Before directing the resource owner back to the client with the authorization code, the authorization server authenticates the resource owner and obtains authorization.  Because the resource owner only authenticates with the authorization server, the resource owner's credentials are never shared with the client.

Перш ніж направити власника ресурсу назад до клієнта з кодом авторизації, сервер авторизації автентифікує власника ресурсу та отримує авторизацію. Оскільки власник ресурсу автентифікується лише на сервері авторизації, облікові дані власника ресурсу ніколи не передаються клієнту.

The authorization code provides a few important security benefits, such as the ability to authenticate the client, as well as the transmission of the access token directly to the client without passing it through the resource owner's user-agent and potentially exposing it to others, including the resource owner.

Код авторизації надає кілька важливих переваг безпеки, наприклад можливість автентифікації клієнта, а також передачу маркера доступу безпосередньо клієнту, не передаючи його через агент користувача власника ресурсу та потенційно відкриваючи його іншим, у тому числі власник ресурсу.

#### 1.3.2.  Implicit

The implicit grant is a simplified authorization code flow optimized for clients implemented in a browser using a scripting language such as JavaScript.  In the implicit flow, instead of issuing the client an authorization code, the client is issued an access token directly (as the result of the resource owner authorization).  The grant type is implicit, as no intermediate credentials (such as an authorization code) are issued (and later used to obtain an access token).

Неявне надання — це спрощений потік коду авторизації, оптимізований для клієнтів, реалізований у браузері за допомогою мови сценаріїв, наприклад JavaScript. У неявному потоці замість того, щоб видавати клієнту код авторизації, клієнту безпосередньо видається маркер доступу (як результат авторизації власника ресурсу). Тип дозволу є неявним, оскільки проміжні облікові дані (наприклад, код авторизації) не видаються (і пізніше використовуються для отримання маркера доступу).

When issuing an access token during the implicit grant flow, the authorization server does not authenticate the client.  In some cases, the client identity can be verified via the redirection URI used to deliver the access token to the client.  The access token may be exposed to the resource owner or other applications with access to the resource owner's user-agent.

Під час видачі маркера доступу під час неявного потоку надання, сервер авторизації не автентифікує клієнта. У деяких випадках особу клієнта можна перевірити за допомогою URI перенаправлення, який використовується для доставки маркера доступу клієнту. Маркер доступу може бути відкритий для власника ресурсу або інших програм, які мають доступ до агента користувача власника ресурсу.

Implicit grants improve the responsiveness and efficiency of some clients (such as a client implemented as an in-browser application), since it reduces the number of round trips required to obtain an access token.  However, this convenience should be weighed against the security implications of using implicit grants, such as those described in Sections 10.3 and 10.16, especially when the authorization code grant type is available.

Неявні гранти покращують швидкість реагування та ефективність деяких клієнтів (наприклад, клієнта, реалізованого як програма в браузері), оскільки це зменшує кількість двосторонніх переходів, необхідних для отримання маркера доступу. Однак цю зручність слід порівняти з наслідками для безпеки використання неявних дозволів, таких як описані в розділах 10.3 і 10.16, особливо коли доступний тип надання коду авторизації.

#### 1.3.3.  Resource Owner Password Credentials

The resource owner password credentials (i.e., username and password) can be used directly as an authorization grant to obtain an access token.  The credentials should only be used when there is a high degree of trust between the resource owner and the client (e.g., the client is part of the device operating system or a highly privileged application), and when other authorization grant types are not available (such as an authorization code).

Облікові дані власника ресурсу з паролем (тобто ім’я користувача та пароль) можна використовувати безпосередньо як надання авторизації для отримання маркера доступу. Облікові дані слід використовувати, лише якщо існує високий ступінь довіри між власником ресурсу та клієнтом (наприклад, клієнт є частиною операційної системи пристрою або високопривілейованою програмою), а також коли інші типи надання авторизації недоступні ( наприклад код авторизації).

Even though this grant type requires direct client access to the resource owner credentials, the resource owner credentials are used for a single request and are exchanged for an access token.  This grant type can eliminate the need for the client to store the resource owner credentials for future use, by exchanging the credentials with a long-lived access token or refresh token.

Незважаючи на те, що цей тип надання вимагає прямого доступу клієнта до облікових даних власника ресурсу, облікові дані власника ресурсу використовуються для одного запиту та обмінюються на маркер доступу. Цей тип надання може позбавити клієнта необхідності зберігати облікові дані власника ресурсу для майбутнього використання шляхом обміну обліковими даними з довгостроковим маркером доступу або маркером оновлення.

#### 1.3.4.  Client Credentials

The client credentials (or other forms of client authentication) can be used as an authorization grant when the authorization scope is limited to the protected resources under the control of the client, or to protected resources previously arranged with the authorization server.  Client credentials are used as an authorization grant typically when the client is acting on its own behalf (the client is also the resource owner) or is requesting access to protected resources based on an authorization previously arranged with the authorization server.

Облікові дані клієнта (або інші форми автентифікації клієнта) можна використовувати як дозвіл на авторизацію, коли область авторизації обмежена захищеними ресурсами під контролем клієнта або захищеними ресурсами, попередньо погодженими з сервером авторизації. Облікові дані клієнта зазвичай використовуються як дозвіл авторизації, коли клієнт діє від свого імені (клієнт також є власником ресурсу) або запитує доступ до захищених ресурсів на основі авторизації, попередньо узгодженої з сервером авторизації.

### 1.4.  Access Token

Access tokens are credentials used to access protected resources.  An access token is a string representing an authorization issued to the client.  The string is usually opaque to the client.  Tokens represent specific scopes and durations of access, granted by the resource owner, and enforced by the resource server and authorization server.

Маркери доступу – це облікові дані, які використовуються для доступу до захищених ресурсів. Маркер доступу — це рядок, який представляє авторизацію, надану клієнту. Рядок зазвичай непрозорий для клієнта. Маркери представляють конкретні області та тривалість доступу, надані власником ресурсу та примусові сервером ресурсів і сервером авторизації.

The token may denote an identifier used to retrieve the authorization information or may self-contain the authorization information in a verifiable manner (i.e., a token string consisting of some data and a signature).  Additional authentication credentials, which are beyond the scope of this specification, may be required in order for the client to use a token.

Маркер може позначати ідентифікатор, який використовується для отримання інформації авторизації, або може містити інформацію авторизації таким чином, який можна перевірити (тобто рядок маркера, що складається з деяких даних і підпису). Для того, щоб клієнт міг використовувати маркер, можуть знадобитися додаткові облікові дані автентифікації, які виходять за межі цієї специфікації.

The access token provides an abstraction layer, replacing different authorization constructs (e.g., username and password) with a single token understood by the resource server.  This abstraction enables issuing access tokens more restrictive than the authorization grant used to obtain them, as well as removing the resource server's need to understand a wide range of authentication methods.

Маркер доступу забезпечує рівень абстракції, замінюючи різні конструкції авторизації (наприклад, ім’я користувача та пароль) єдиним маркером, зрозумілим серверу ресурсів. Ця абстракція дозволяє видавати маркери доступу з більш обмежувальним рівнем, ніж дозвіл авторизації, який використовується для їх отримання, а також усуває потребу сервера ресурсів розуміти широкий спектр методів автентифікації.

Access tokens can have different formats, structures, and methods of utilization (e.g., cryptographic properties) based on the resource server security requirements.  Access token attributes and the methods used to access protected resources are beyond the scope of this specification and are defined by companion specifications such as [RFC6750].

Маркери доступу можуть мати різні формати, структури та методи використання (наприклад, криптографічні властивості) на основі вимог безпеки сервера ресурсів. Атрибути маркерів доступу та методи, що використовуються для доступу до захищених ресурсів, виходять за рамки цієї специфікації та визначені супутніми специфікаціями, такими як [RFC6750].

### 1.5.  Refresh Token

Refresh tokens are credentials used to obtain access tokens.  Refresh tokens are issued to the client by the authorization server and are used to obtain a new access token when the current access token becomes invalid or expires, or to obtain additional access tokens with identical or narrower scope (access tokens may have a shorter lifetime and fewer permissions than authorized by the resource owner).  Issuing a refresh token is optional at the discretion of the authorization server.  If the authorization server issues a refresh token, it is included when issuing an access token (i.e., step (D) in Figure 1).

Маркери оновлення – це облікові дані, які використовуються для отримання маркерів доступу. Маркери оновлення видаються клієнту сервером авторизації та використовуються для отримання нового маркера доступу, коли поточний маркер доступу стає недійсним або закінчується, або для отримання додаткових маркерів доступу з ідентичним або вужчим обсягом (токени доступу можуть мати коротший термін служби та менше дозволів, ніж авторизовано власником ресурсу). Видача маркера оновлення є необов’язковою на розсуд сервера авторизації. Якщо сервер авторизації видає маркер оновлення, він включається під час видачі маркера доступу (тобто крок (D) на малюнку 1).

A refresh token is a string representing the authorization granted to the client by the resource owner.  The string is usually opaque to the client.  The token denotes an identifier used to retrieve the authorization information.  Unlike access tokens, refresh tokens are intended for use only with authorization servers and are never sent to resource servers.

Маркер оновлення — це рядок, який представляє авторизацію, надану клієнту власником ресурсу. Рядок зазвичай непрозорий для клієнта. Маркер позначає ідентифікатор, який використовується для отримання інформації авторизації. На відміну від маркерів доступу, маркери оновлення призначені для використання лише з серверами авторизації та ніколи не надсилаються на сервери ресурсів.

![image-20221120232807395](media/image-20221120232807395.png)

Figure 2: Refreshing an Expired Access Token

The flow illustrated in Figure 2 includes the following steps:

Потік, зображений на малюнку 2, включає такі кроки:

(A)  The client requests an access token by authenticating with the   authorization server and presenting an authorization grant.

(A) Клієнт запитує маркер доступу шляхом автентифікації на сервері авторизації та надання дозволу на авторизацію.

(B)  The authorization server authenticates the client and validates   the authorization grant, and if valid, issues an access token   and a refresh token.

(B) Сервер авторизації автентифікує клієнта та підтверджує надання авторизації, і якщо дійсне, видає маркер доступу та маркер оновлення.

(C)  The client makes a protected resource request to the resource   server by presenting the access token.

(C) Клієнт робить запит на захищений ресурс до сервера ресурсів, представляючи маркер доступу.

(D)  The resource server validates the access token, and if valid,   serves the request.

(D) Сервер ресурсів перевіряє маркер доступу і, якщо він дійсний, обслуговує запит.

(E)  Steps (C) and (D) repeat until the access token expires.  If the   client knows the access token expired, it skips to step (G);   otherwise, it makes another protected resource request.

(E) Кроки (C) і (D) повторюються, доки не закінчиться термін дії маркера доступу. Якщо клієнт знає, що термін дії маркера доступу закінчився, він переходить до кроку (G); інакше він робить інший запит на захищений ресурс.

(F)  Since the access token is invalid, the resource server returns   an invalid token error.

(F) Оскільки маркер доступу недійсний, сервер ресурсів повертає помилку недійсного маркера.

(G)  The client requests a new access token by authenticating with   the authorization server and presenting the refresh token.  The   client authentication requirements are based on the client type   and on the authorization server policies.

(G) Клієнт запитує новий маркер доступу шляхом автентифікації на сервері авторизації та надання маркера оновлення. Вимоги до автентифікації клієнта залежать від типу клієнта та політик сервера авторизації.

(H)  The authorization server authenticates the client and validates   the refresh token, and if valid, issues a new access token (and,   optionally, a new refresh token).

(H) Сервер авторизації автентифікує клієнта та перевіряє токен оновлення, і якщо дійсний, видає новий токен доступу (і, необов’язково, новий токен оновлення).

Steps (C), (D), (E), and (F) are outside the scope of this specification, as described in Section 7.

Кроки (C), (D), (E) і (F) виходять за рамки цієї специфікації, як описано в Розділі 7.

### 1.6.  TLS Version

Whenever Transport Layer Security (TLS) is used by this specification, the appropriate version (or versions) of TLS will vary over time, based on the widespread deployment and known security vulnerabilities.  At the time of this writing, TLS version 1.2 [RFC5246] is the most recent version, but has a very limited deployment base and might not be readily available for implementation.  TLS version 1.0 [RFC2246] is the most widely deployed version and will provide the broadest interoperability.

Implementations MAY also support additional transport-layer security mechanisms that meet their security requirements.

Щоразу, коли в цій специфікації використовується захист транспортного рівня (TLS), відповідна версія (або версії) TLS змінюватиметься з часом залежно від широкого розгортання та відомих уразливостей безпеки. На момент написання цієї статті TLS версії 1.2 [RFC5246] є останньою версією, але має дуже обмежену базу для розгортання та може бути недоступною для реалізації. Версія TLS 1.0 [RFC2246] є найпоширенішою версією та забезпечить найширшу взаємодію.

Реалізації МОЖУТЬ також підтримувати додаткові механізми безпеки транспортного рівня, які відповідають їхнім вимогам безпеки.

### 1.7.  HTTP Redirections

This specification makes extensive use of HTTP redirections, in which the client or the authorization server directs the resource owner's user-agent to another destination.  While the examples in this specification show the use of the HTTP 302 status code, any other method available via the user-agent to accomplish this redirection is allowed and is considered to be an implementation detail.

У цій специфікації широко використовуються перенаправлення HTTP, у яких клієнт або сервер авторизації спрямовує агента користувача власника ресурсу до іншого пункту призначення. Хоча приклади в цій специфікації показують використання коду статусу HTTP 302, будь-який інший метод, доступний через агента користувача для виконання цього переспрямування, дозволений і вважається деталлю реалізації.

### 1.8.  Interoperability

OAuth 2.0 provides a rich authorization framework with well-defined security properties.  However, as a rich and highly extensible framework with many optional components, on its own, this specification is likely to produce a wide range of non-interoperable implementations.

OAuth 2.0 надає розширену структуру авторизації з чітко визначеними властивостями безпеки. Однак, будучи багатою і дуже розширюваною структурою з багатьма додатковими компонентами, сама по собі ця специфікація, ймовірно, створить широкий спектр несумісних реалізацій.

In addition, this specification leaves a few required components partially or fully undefined (e.g., client registration, authorization server capabilities, endpoint discovery).  Without these components, clients must be manually and specifically configured against a specific authorization server and resource server in order to interoperate.

Крім того, ця специфікація залишає кілька обов’язкових компонентів частково або повністю невизначеними (наприклад, реєстрація клієнта, можливості сервера авторизації, виявлення кінцевої точки). Без цих компонентів клієнти повинні бути вручну та спеціально налаштовані для певного сервера авторизації та сервера ресурсів для взаємодії.

This framework was designed with the clear expectation that future work will define prescriptive profiles and extensions necessary to achieve full web-scale interoperability.

Цей фреймворк був розроблений з чітким очікуванням, що майбутня робота визначатиме нормативні профілі та розширення, необхідні для досягнення повної сумісності веб-масштабу.

### 1.9.  Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119].

Ключові слова «МАЄ», «НЕ ПОВИНЕН», «ОБОВ’ЯЗКОВО», «ПОВИНЕН», «НЕ ПОВИНЕН», «СЛІД», «НЕ СЛІД», «РЕКОМЕНДОВАНО», «МОЖЕ» та «НЕОБОВ’ЯЗКОВО» в цій специфікації є інтерпретувати, як описано в [RFC2119].

This specification uses the Augmented Backus-Naur Form (ABNF) notation of [RFC5234].  Additionally, the rule URI-reference is included from "Uniform Resource Identifier (URI): Generic Syntax" [RFC3986].

У цій специфікації використовується нотація розширеної форми Бекуса-Наура (ABNF) [RFC5234]. Крім того, посилання на правило URI включено з «Уніфікованого ідентифікатора ресурсу (URI): загальний синтаксис» [RFC3986].

Certain security-related terms are to be understood in the sense defined in [RFC4949].  These terms include, but are not limited to, "attack", "authentication", "authorization", "certificate", "confidentiality", "credential", "encryption", "identity", "sign", "signature", "trust", "validate", and "verify".

Unless otherwise noted, all the protocol parameter names and values are case sensitive.

Деякі терміни, пов’язані з безпекою, слід розуміти в значенні, визначеному в [RFC4949]. Ці терміни включають, але не обмежуються цим, «атака», «автентифікація», «авторизація», «сертифікат», «конфіденційність», «облікові дані», «шифрування», «ідентичність», «знак», «підпис», "довіряти", "підтверджувати" та "перевіряти".

Якщо не зазначено інше, усі назви та значення параметрів протоколу чутливі до регістру.

## 2. Client Registration

Before initiating the protocol, the client registers with the authorization server.  The means through which the client registers with the authorization server are beyond the scope of this specification but typically involve end-user interaction with an HTML registration form.

Перед ініціюванням протоколу клієнт реєструється на сервері авторизації. Засоби, за допомогою яких клієнт реєструється на сервері авторизації, виходять за рамки цієї специфікації, але зазвичай передбачають взаємодію кінцевого користувача з реєстраційною формою HTML.

Client registration does not require a direct interaction between the client and the authorization server.  When supported by the authorization server, registration can rely on other means for establishing trust and obtaining the required client properties (e.g., redirection URI, client type).  For example, registration can be accomplished using a self-issued or third-party-issued assertion, or by the authorization server performing client discovery using a trusted channel.

Реєстрація клієнта не вимагає прямої взаємодії між клієнтом і сервером авторизації. Якщо реєстрація підтримується сервером авторизації, вона може покладатися на інші засоби для встановлення довіри та отримання необхідних властивостей клієнта (наприклад, URI перенаправлення, тип клієнта). Наприклад, реєстрація може бути здійснена за допомогою твердження, виданого самостійно або третьою стороною, або за допомогою сервера авторизації, який виконує виявлення клієнта за допомогою довіреного каналу.

When registering a client, the client developer SHALL:

- specify the client type as described in Section 2.1,
- provide its client redirection URIs as described in Section 3.1.2, and
- include any other information required by the authorization server (e.g., application name, website, description, logo image, the acceptance of legal terms).

Під час реєстрації клієнта розробник клієнта ПОВИНЕН:

- вказати тип клієнта, як описано в розділі 2.1,
- надавати URI перенаправлення клієнта, як описано в розділі 3.1.2, і
- включати будь-яку іншу інформацію, яку вимагає сервер авторизації (наприклад, назву програми, веб-сайт, опис, зображення логотипу, прийняття юридичних умов).

### 2.1.  Client Types

OAuth defines two client types, based on their ability to authenticate securely with the authorization server (i.e., ability to maintain the confidentiality of their client credentials):

confidential - Clients capable of maintaining the confidentiality of their credentials (e.g., client implemented on a secure server with restricted access to the client credentials), or capable of secure client authentication using other means.

public - Clients incapable of maintaining the confidentiality of their credentials (e.g., clients executing on the device used by the resource owner, such as an installed native application or a web browser-based application), and incapable of secure client authentication via any other means.

OAuth визначає два типи клієнтів на основі їх здатності безпечно автентифікуватися за допомогою сервера авторизації (тобто здатності підтримувати конфіденційність своїх облікових даних клієнта):

**confidential** (конфіденційний) — клієнти, здатні зберігати конфіденційність своїх облікових даних (наприклад, клієнт, реалізований на захищеному сервері з обмеженим доступом до облікових даних клієнта), або здатні безпечно автентифікувати клієнта за допомогою інших засобів.

**public** - клієнти, які не можуть зберігати конфіденційність своїх облікових даних (наприклад, клієнти, що виконуються на пристрої, який використовує власник ресурсу, наприклад, встановлена рідна програма або програма на основі веб-браузера), і нездатні безпечно автентифікувати клієнта за допомогою будь-яких інших засобів .

The client type designation is based on the authorization server's definition of secure authentication and its acceptable exposure levels of client credentials.  The authorization server SHOULD NOT make assumptions about the client type.

Позначення типу клієнта базується на визначенні безпечної автентифікації сервером авторизації та його прийнятних рівнях доступу до облікових даних клієнта. Сервер авторизації НЕ ПОВИНЕН робити припущення щодо типу клієнта.

A client may be implemented as a distributed set of components, each with a different client type and security context (e.g., a distributed client with both a confidential server-based component and a public browser-based component).  If the authorization server does not provide support for such clients or does not provide guidance with regard to their registration, the client SHOULD register each component as a separate client. This specification has been designed around the following client profiles:

Клієнт може бути реалізований як розподілений набір компонентів, кожен з яких має різний тип клієнта та контекст безпеки (наприклад, розподілений клієнт із конфіденційним компонентом на основі сервера та загальнодоступним компонентом на основі браузера). Якщо сервер авторизації не підтримує таких клієнтів або не надає вказівок щодо їх реєстрації, клієнт ПОВИНЕН зареєструвати кожен компонент як окремого клієнта. Ця специфікація розроблена навколо таких профілів клієнтів:

web application - A web application is a confidential client running on a web server.  Resource owners access the client via an HTML user interface rendered in a user-agent on the device used by the resource owner.  The client credentials as well as any access token issued to the client are stored on the web server and are not exposed to or accessible by the resource owner.

веб-програма - веб-програма є конфіденційним клієнтом, що працює на веб-сервері. Власники ресурсів отримують доступ до клієнта через користувальницький інтерфейс HTML, який відображається в агенті користувача на пристрої, яким користується власник ресурсу. Облікові дані клієнта, а також будь-який маркер доступу, виданий клієнту, зберігаються на веб-сервері та не піддаються чи не доступні для власника ресурсу.

user-agent-based application - A user-agent-based application is a public client in which the client code is downloaded from a web server and executes within a user-agent (e.g., web browser) on the device used by the resource owner.  Protocol data and credentials are easily accessible (and often visible) to the resource owner.  Since such applications reside within the user-agent, they can make seamless use of the user-agent capabilities when requesting authorization.

Програма на основі агента користувача - програма на основі агента користувача є загальнодоступним клієнтом, у якому код клієнта завантажується з веб-сервера та виконується в агенті користувача (наприклад, веб-браузер) на пристрої, який використовує власник ресурсу . Дані протоколу та облікові дані легко доступні (і часто видимі) для власника ресурсу. Оскільки такі програми містяться в агенті користувача, вони можуть безперешкодно використовувати можливості агента користувача під час запиту авторизації.

native application - A native application is a public client installed and executed on the device used by the resource owner.  Protocol data and credentials are accessible to the resource owner.  It is assumed that any client authentication credentials included in the application can be extracted.  On the other hand, dynamically issued credentials such as access tokens or refresh tokens can receive an acceptable level of protection.  At a minimum, these credentials are protected from hostile servers with which the application may interact.  On some platforms, these credentials might be protected from other applications residing on the same device.

нативна програма – нативна програма – це загальнодоступний клієнт, встановлений і запущений на пристрої, яким користується власник ресурсу. Дані протоколу та облікові дані доступні власнику ресурсу. Передбачається, що будь-які облікові дані автентифікації клієнта, включені в програму, можна отримати. З іншого боку, динамічно видані облікові дані, такі як маркери доступу або маркери оновлення, можуть отримати прийнятний рівень захисту. Як мінімум, ці облікові дані захищені від ворожих серверів, з якими може взаємодіяти програма. На деяких платформах ці облікові дані можуть бути захищені від інших програм, розташованих на тому самому пристрої.

### 2.2.  Client Identifier

The authorization server issues the registered client a client identifier -- a unique string representing the registration information provided by the client.  The client identifier is not a secret; it is exposed to the resource owner and MUST NOT be used alone for client authentication.  The client identifier is unique to the authorization server.

Сервер авторизації видає зареєстрованому клієнту ідентифікатор клієнта -- унікальний рядок, що представляє реєстраційну інформацію, надану клієнтом. Ідентифікатор клієнта не є секретом; він відкритий для власника ресурсу і НЕ ПОВИНЕН використовуватися окремо для автентифікації клієнта. Ідентифікатор клієнта є унікальним для сервера авторизації.

The client identifier string size is left undefined by this specification.  The client should avoid making assumptions about the identifier size.  The authorization server SHOULD document the size of any identifier it issues.

У цій специфікації розмір рядка ідентифікатора клієнта не визначений. Клієнту слід уникати припущень щодо розміру ідентифікатора. Сервер авторизації ПОВИНЕН документувати розмір будь-якого ідентифікатора, який він видає.

### 2.3.  Client Authentication

If the client type is confidential, the client and authorization server establish a client authentication method suitable for the security requirements of the authorization server.  The authorization server MAY accept any form of client authentication meeting its security requirements.

Якщо тип клієнта є конфіденційним, клієнт і сервер авторизації встановлюють метод автентифікації клієнта, який відповідає вимогам безпеки сервера авторизації. Сервер авторизації МОЖЕ прийняти будь-яку форму автентифікації клієнта, яка відповідає його вимогам безпеки.

Confidential clients are typically issued (or establish) a set of client credentials used for authenticating with the authorization server (e.g., password, public/private key pair).

Конфіденційним клієнтам зазвичай видається (або встановлюється) набір облікових даних клієнта, які використовуються для автентифікації на сервері авторизації (наприклад, пароль, пара відкритий/приватний ключ).

The authorization server MAY establish a client authentication method with public clients.  However, the authorization server MUST NOT rely on public client authentication for the purpose of identifying the client.

Сервер авторизації МОЖЕ встановити метод автентифікації клієнта з публічними клієнтами. Однак сервер авторизації НЕ ПОВИНЕН покладатися на публічну автентифікацію клієнта з метою ідентифікації клієнта.

The client MUST NOT use more than one authentication method in each request.

Клієнт НЕ ПОВИНЕН використовувати більше одного методу автентифікації в кожному запиті.

#### 2.3.1.  Client Password

Clients in possession of a client password MAY use the HTTP Basic authentication scheme as defined in [RFC2617] to authenticate with the authorization server.  The client identifier is encoded using the "application/x-www-form-urlencoded" encoding algorithm per Appendix B, and the encoded value is used as the username; the client password is encoded using the same algorithm and used as the password.  The authorization server MUST support the HTTP Basic authentication scheme for authenticating clients that were issued a client password.

Клієнти, які мають пароль клієнта, МОЖУТЬ використовувати базову схему автентифікації HTTP, як визначено в [RFC2617], для автентифікації на сервері авторизації. Ідентифікатор клієнта кодується за допомогою алгоритму кодування "application/x-www-form-urlencoded" згідно з Додатком Б, а закодоване значення використовується як ім’я користувача; пароль клієнта кодується за тим самим алгоритмом і використовується як пароль. Сервер авторизації ПОВИНЕН підтримувати базову схему автентифікації HTTP для автентифікації клієнтів, яким було видано пароль клієнта.

For example (with extra line breaks for display purposes only):

Наприклад (з додатковими розривами рядків лише для відображення):

```http
 Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
```

Alternatively, the authorization server MAY support including the client credentials in the request-body using the following parameters:

Крім того, сервер авторизації МОЖЕ підтримувати включення облікових даних клієнта в тіло запиту за допомогою таких параметрів:

client_id - REQUIRED.  The client identifier issued to the client during the registration process described by Section 2.2.

client_id - ОБОВ'ЯЗКОВО. Ідентифікатор клієнта, наданий клієнту під час процесу реєстрації, описаного в розділі 2.2.

client_secret - REQUIRED.  The client secret.  The client MAY omit the parameter if the client secret is an empty string. Including the client credentials in the request-body using the two parameters is NOT RECOMMENDED and SHOULD be limited to clients unable to directly utilize the HTTP Basic authentication scheme (or other password-based HTTP authentication schemes).  The parameters can only be transmitted in the request-body and MUST NOT be included in the request URI.

client_secret - ОБОВ'ЯЗКОВО. Секрет клієнта. Клієнт МОЖЕ опустити параметр, якщо секрет клієнта є порожнім рядком. Включати облікові дані клієнта в тіло запиту за допомогою двох параметрів НЕ РЕКОМЕНДУЄТЬСЯ, і СЛІД обмежуватись клієнтами, які не можуть безпосередньо використовувати базову схему автентифікації HTTP (або інші схеми автентифікації HTTP на основі пароля). Параметри можуть бути передані лише в тілі запиту та НЕ ПОВИННІ включатися в URI запиту.

For example, a request to refresh an access token (Section 6) using the body parameters (with extra line breaks for display purposes only):

Наприклад, запит на оновлення маркера доступу (розділ 6) за допомогою параметрів тіла (з додатковими розривами рядків лише для відображення):

```http
 POST /token HTTP/1.1
 Host: server.example.com
 Content-Type: application/x-www-form-urlencoded

 grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
 &client_id=s6BhdRkqt3&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw
```

The authorization server MUST require the use of TLS as described in  Section 1.6 when sending requests using password authentication.

Сервер авторизації ПОВИНЕН вимагати використання TLS, як описано в розділі 1.6, під час надсилання запитів із використанням автентифікації за паролем.

Since this client authentication method involves a password, the authorization server MUST protect any endpoint utilizing it against brute force attacks.

Оскільки цей метод автентифікації клієнта включає пароль, сервер авторизації ПОВИНЕН захистити будь-яку кінцеву точку, яка його використовує, від атак грубої сили.

#### 2.3.2.  Other Authentication Methods

The authorization server MAY support any suitable HTTP authentication scheme matching its security requirements.  When using other authentication methods, the authorization server MUST define a mapping between the client identifier (registration record) and authentication scheme.

Сервер авторизації МОЖЕ підтримувати будь-яку відповідну схему автентифікації HTTP, яка відповідає вимогам безпеки. При використанні інших методів автентифікації сервер авторизації ПОВИНЕН визначити відповідність між ідентифікатором клієнта (реєстраційним записом) і схемою автентифікації.

### 2.4.  Unregistered Clients

This specification does not exclude the use of unregistered clients. However, the use of such clients is beyond the scope of this specification and requires additional security analysis and review of its interoperability impact.

Ця специфікація не виключає використання незареєстрованих клієнтів. Однак використання таких клієнтів виходить за рамки цієї специфікації та потребує додаткового аналізу безпеки та аналізу його впливу на сумісність.

## 3. Protocol Endpoints

The authorization process utilizes two authorization server endpoints (HTTP resources):

- Authorization endpoint - used by the client to obtain authorization from the resource owner via user-agent redirection.

- Token endpoint - used by the client to exchange an authorization grant for an access token, typically with client authentication.

У процесі авторизації використовуються дві кінцеві точки сервера авторизації (HTTP-ресурси):

- Кінцева точка авторизації - використовується клієнтом для отримання авторизації від власника ресурсу через переспрямування агента користувача.

- Кінцева точка маркера – використовується клієнтом для обміну дозволу авторизації на маркер доступу, як правило, з автентифікацією клієнта.

As well as one client endpoint:

- Redirection endpoint - used by the authorization server to return responses containing authorization credentials to the client via the resource owner user-agent.


Not every authorization grant type utilizes both endpoints. Extension grant types MAY define additional endpoints as needed.

А також одну кінцеву точку клієнта:

- Кінцева точка перенаправлення – використовується сервером авторизації для повернення клієнту відповідей, що містять облікові дані авторизації, через агента користувача власника ресурсу.


Не кожен тип надання авторизації використовує обидві кінцеві точки. Типи надання розширення МОЖУТЬ визначати додаткові кінцеві точки за потреби.

### 3.1.  Authorization Endpoint

The authorization endpoint is used to interact with the resource owner and obtain an authorization grant.  The authorization server MUST first verify the identity of the resource owner.  The way in which the authorization server authenticates the resource owner (e.g., username and password login, session cookies) is beyond the scope of this specification.

Кінцева точка авторизації використовується для взаємодії з власником ресурсу та отримання дозволу на авторизацію. Сервер авторизації ПОВИНЕН спочатку перевірити особу власника ресурсу. Спосіб, у який сервер авторизації автентифікує власника ресурсу (наприклад, ім’я користувача та пароль для входу, файли cookie сеансу), виходить за рамки цієї специфікації.

The means through which the client obtains the location of the authorization endpoint are beyond the scope of this specification, but the location is typically provided in the service documentation.

Засоби, за допомогою яких клієнт отримує місцезнаходження кінцевої точки авторизації, виходять за рамки цієї специфікації, але місцезнаходження зазвичай надається в документації служби.

The endpoint URI MAY include an "application/x-www-form-urlencoded" formatted (per Appendix B) query component ([RFC3986] Section 3.4), which MUST be retained when adding additional query parameters.  The endpoint URI MUST NOT include a fragment component.

URI кінцевої точки МОЖЕ включати компонент запиту у форматі "application/x-www-form-urlencoded" (згідно з Додатком B) ([RFC3986] Розділ 3.4), який ПОВИНЕН зберігатися під час додавання додаткових параметрів запиту. URI кінцевої точки НЕ ПОВИНЕН містити компонент фрагмента.

Since requests to the authorization endpoint result in user authentication and the transmission of clear-text credentials (in the HTTP response), the authorization server MUST require the use of TLS as described in Section 1.6 when sending requests to the authorization endpoint.

Оскільки запити до кінцевої точки авторизації призводять до автентифікації користувача та передачі облікових даних у відкритому вигляді (у відповіді HTTP), сервер авторизації ПОВИНЕН вимагати використання TLS, як описано в розділі 1.6, під час надсилання запитів до кінцевої точки авторизації.

The authorization server MUST support the use of the HTTP "GET" method [RFC2616] for the authorization endpoint and MAY support the use of the "POST" method as well. Parameters sent without a value MUST be treated as if they were omitted from the request.  The authorization server MUST ignore unrecognized request parameters.  Request and response parameters MUST NOT be included more than once.

Сервер авторизації ПОВИНЕН підтримувати використання методу HTTP "GET" [RFC2616] для кінцевої точки авторизації, а також МОЖЕ підтримувати використання методу "POST". Параметри, надіслані без значення, ПОВИННІ розглядатися так, ніби вони були пропущені в запиті. Сервер авторизації ПОВИНЕН ігнорувати нерозпізнані параметри запиту. Параметри запиту та відповіді НЕ ПОВИННІ включатися більше одного разу.

#### 3.1.1.  Response Type

The authorization endpoint is used by the authorization code grant type and implicit grant type flows.  The client informs the authorization server of the desired grant type using the following parameter:

Кінцева точка авторизації використовується потоками типу надання коду авторизації та типу неявного надання. Клієнт інформує сервер авторизації про бажаний тип дозволу за допомогою наступного параметра:

response_type - REQUIRED.  The value MUST be one of "code" for requesting an authorization code as described by Section 4.1.1, "token" for requesting an access token (implicit grant) as described by Section 4.2.1, or a registered extension value as described by Section 8.4.

response_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО бути таким: «код» для запиту коду авторизації, як описано в Розділі 4.1.1, «токен» для запиту маркера доступу (неявне надання), як описано в Розділі 4.2.1, або значення зареєстрованого розширення, як описано в Розділ 8.4.

Extension response types MAY contain a space-delimited (%x20) list of values, where the order of values does not matter (e.g., response type "a b" is the same as "b a").  The meaning of such composite response types is defined by their respective specifications.

Типи відповідей розширення МОЖУТЬ містити список значень, розділених пробілами (%x20), де порядок значень не має значення (наприклад, тип відповіді "a b" такий самий, як "b a"). Значення таких складених типів відповідей визначається їх відповідними специфікаціями.

If an authorization request is missing the "response_type" parameter, or if the response type is not understood, the authorization server MUST return an error response as described in Section 4.1.2.1.

Якщо в запиті на авторизацію відсутній параметр «response_type» або якщо тип відповіді не зрозумілий, сервер авторизації ПОВИНЕН повернути відповідь про помилку, як описано в розділі 4.1.2.1.

#### 3.1.2.  Redirection Endpoint

After completing its interaction with the resource owner, the authorization server directs the resource owner's user-agent back to the client.  The authorization server redirects the user-agent to the client's redirection endpoint previously established with the authorization server during the client registration process or when making the authorization request.

Після завершення взаємодії з власником ресурсу сервер авторизації направляє агента користувача власника ресурсу назад до клієнта. Сервер авторизації перенаправляє агента користувача до кінцевої точки перенаправлення клієнта, попередньо встановленої на сервері авторизації під час процесу реєстрації клієнта або під час надсилання запиту авторизації.

The redirection endpoint URI MUST be an absolute URI as defined by [RFC3986] Section 4.3.  The endpoint URI MAY include an "application/x-www-form-urlencoded" formatted (per Appendix B) query component ([RFC3986] Section 3.4), which MUST be retained when adding additional query parameters.  The endpoint URI MUST NOT include a fragment component.

URI кінцевої точки перенаправлення ПОВИНЕН бути абсолютним URI, як визначено в розділі 4.3 [RFC3986]. URI кінцевої точки МОЖЕ включати компонент запиту у форматі "application/x-www-form-urlencoded" (згідно з Додатком B) ([RFC3986] Розділ 3.4), який ПОВИНЕН зберігатися під час додавання додаткових параметрів запиту. URI кінцевої точки НЕ ПОВИНЕН містити компонент фрагмента.

##### 3.1.2.1.  Endpoint Request Confidentiality

The redirection endpoint SHOULD require the use of TLS as described in Section 1.6 when the requested response type is "code" or "token", or when the redirection request will result in the transmission of sensitive credentials over an open network.  This specification does not mandate the use of TLS because at the time of this writing, requiring clients to deploy TLS is a significant hurdle for many client developers.  If TLS is not available, the authorization server SHOULD warn the resource owner about the insecure endpoint prior to redirection (e.g., display a message during the authorization request).

Кінцевій точці перенаправлення СЛІД вимагати використання TLS, як описано в Розділі 1.6, якщо запитуваний тип відповіді – «код» або «токен», або коли запит на перенаправлення призведе до передачі конфіденційних облікових даних через відкриту мережу. Ця специфікація не вимагає обов’язкового використання TLS, оскільки на момент написання цієї статті вимога до розгортання TLS від клієнтів є значною перешкодою для багатьох розробників клієнтів. Якщо TLS недоступний, сервер авторизації ПОВИНЕН попередити власника ресурсу про незахищену кінцеву точку перед перенаправленням (наприклад, відобразити повідомлення під час запиту авторизації).

Lack of transport-layer security can have a severe impact on the security of the client and the protected resources it is authorized to access.  The use of transport-layer security is particularly critical when the authorization process is used as a form of delegated end-user authentication by the client (e.g., third-party sign-in service).

Відсутність безпеки на транспортному рівні може серйозно вплинути на безпеку клієнта та захищених ресурсів, до яких він має доступ. Використання безпеки транспортного рівня є особливо критичним, коли процес авторизації використовується як форма делегованої автентифікації кінцевого користувача клієнтом (наприклад, служба входу третьої сторони).

##### 3.1.2.2.  Registration Requirements

The authorization server MUST require the following clients to register their redirection endpoint:

- Public clients.

- Confidential clients utilizing the implicit grant type.

Сервер авторизації ПОВИНЕН вимагати, щоб такі клієнти зареєстрували свою кінцеву точку перенаправлення:

- Публічні клієнти.

- Конфіденційні клієнти, які використовують тип неявного гранту.

The authorization server SHOULD require all clients to register their redirection endpoint prior to utilizing the authorization endpoint.

Сервер авторизації ПОВИНЕН вимагати від усіх клієнтів реєстрації своєї кінцевої точки перенаправлення перед використанням кінцевої точки авторизації.

The authorization server SHOULD require the client to provide the complete redirection URI (the client MAY use the "state" request parameter to achieve per-request customization).  If requiring the registration of the complete redirection URI is not possible, the authorization server SHOULD require the registration of the URI scheme, authority, and path (allowing the client to dynamically vary only the query component of the redirection URI when requesting authorization).

Сервер авторизації ПОВИНЕН вимагати від клієнта надання повного URI перенаправлення (клієнт МОЖЕ використовувати параметр запиту "state" для досягнення індивідуального налаштування запиту). Якщо запит на реєстрацію повного URI перенаправлення неможливий, сервер авторизації ПОВИНЕН вимагати реєстрації схеми URI, повноважень і шляху (що дозволяє клієнту динамічно змінювати лише компонент запиту URI перенаправлення під час запиту авторизації).

The authorization server MAY allow the client to register multiple redirection endpoints.

Сервер авторизації МОЖЕ дозволити клієнту зареєструвати кілька кінцевих точок перенаправлення.

Lack of a redirection URI registration requirement can enable an attacker to use the authorization endpoint as an open redirector as described in Section 10.15.

Відсутність вимоги щодо реєстрації URI перенаправлення може дозволити зловмиснику використовувати кінцеву точку авторизації як відкритий переспрямовувач, як описано в розділі 10.15.

##### 3.1.2.3.  Dynamic Configuration

If multiple redirection URIs have been registered, if only part of the redirection URI has been registered, or if no redirection URI has been registered, the client MUST include a redirection URI with the authorization request using the "redirect_uri" request parameter.

Якщо зареєстровано декілька URI перенаправлення, якщо зареєстровано лише частину URI перенаправлення або якщо URI перенаправлення не зареєстровано, клієнт ПОВИНЕН включити URI перенаправлення до запиту авторизації за допомогою параметра запиту "redirect_uri".

When a redirection URI is included in an authorization request, the authorization server MUST compare and match the value received against at least one of the registered redirection URIs (or URI components) as defined in [RFC3986] Section 6, if any redirection URIs were registered.  If the client registration included the full redirection URI, the authorization server MUST compare the two URIs using simple string comparison as defined in [RFC3986] Section 6.2.1.

Якщо URI перенаправлення включено до запиту авторизації, сервер авторизації ПОВИНЕН порівняти та зіставити отримане значення з принаймні одним із зареєстрованих URI перенаправлення (або компонентів URI), як визначено в розділі 6 [RFC3986], якщо будь-які URI перенаправлення були зареєстровані . Якщо реєстрація клієнта включала повний URI перенаправлення, сервер авторизації ПОВИНЕН порівняти два URI за допомогою простого порівняння рядків, як визначено в [RFC3986] Розділ 6.2.1.

##### 3.1.2.4.  Invalid Endpoint

If an authorization request fails validation due to a missing, invalid, or mismatching redirection URI, the authorization server SHOULD inform the resource owner of the error and MUST NOT automatically redirect the user-agent to the invalid redirection URI.

Якщо запит на авторизацію не проходить перевірку через відсутність, недійсність або невідповідність URI перенаправлення, сервер авторизації ПОВИНЕН повідомити власника ресурсу про помилку та НЕ ПОВИНЕН автоматично перенаправляти агента користувача на недійсний URI перенаправлення.

##### 3.1.2.5.  Endpoint Content

The redirection request to the client's endpoint typically results in an HTML document response, processed by the user-agent.  If the HTML response is served directly as the result of the redirection request, any script included in the HTML document will execute with full access to the redirection URI and the credentials it contains.

Запит на перенаправлення до кінцевої точки клієнта зазвичай призводить до відповіді HTML-документа, обробленого агентом користувача. Якщо HTML-відповідь подається безпосередньо як результат запиту на перенаправлення, будь-який сценарій, включений у документ HTML, виконуватиметься з повним доступом до URI перенаправлення та облікових даних, які він містить.

The client SHOULD NOT include any third-party scripts (e.g., third-party analytics, social plug-ins, ad networks) in the redirection endpoint response.  Instead, it SHOULD extract the credentials from the URI and redirect the user-agent again to another endpoint without exposing the credentials (in the URI or elsewhere).  If third-party scripts are included, the client MUST ensure that its own scripts (used to extract and remove the credentials from the URI) will execute first.

Клієнт НЕ ПОВИНЕН включати будь-які сценарії третіх сторін (наприклад, аналітику третіх сторін, соціальні плагіни, рекламні мережі) у відповідь кінцевої точки перенаправлення. Замість цього йому СЛІД витягнути облікові дані з URI та знову перенаправити агента користувача до іншої кінцевої точки, не розкриваючи облікові дані (в URI чи деінде). Якщо включено сценарії сторонніх розробників, клієнт ПОВИНЕН переконатися, що його власні сценарії (які використовуються для вилучення та видалення облікових даних з URI) будуть виконані першими.

### 3.2.  Token Endpoint

The token endpoint is used by the client to obtain an access token by presenting its authorization grant or refresh token.  The token endpoint is used with every authorization grant except for the implicit grant type (since an access token is issued directly).

Кінцева точка маркера використовується клієнтом для отримання маркера доступу шляхом представлення свого маркера надання авторизації або оновлення. Кінцева точка маркера використовується з кожним наданням авторизації, за винятком типу неявного надання (оскільки маркер доступу видається безпосередньо).

The means through which the client obtains the location of the token endpoint are beyond the scope of this specification, but the location is typically provided in the service documentation.

Засоби, за допомогою яких клієнт отримує місцезнаходження кінцевої точки маркера, виходять за рамки цієї специфікації, але місцезнаходження зазвичай надається в документації служби.

The endpoint URI MAY include an "application/x-www-form-urlencoded" formatted (per Appendix B) query component ([RFC3986] Section 3.4), which MUST be retained when adding additional query parameters.  The endpoint URI MUST NOT include a fragment component.

URI кінцевої точки МОЖЕ включати компонент запиту у форматі "application/x-www-form-urlencoded" (згідно з Додатком B) ([RFC3986] Розділ 3.4), який ПОВИНЕН зберігатися під час додавання додаткових параметрів запиту. URI кінцевої точки НЕ ПОВИНЕН містити компонент фрагмента.

Since requests to the token endpoint result in the transmission of clear-text credentials (in the HTTP request and response), the authorization server MUST require the use of TLS as described in Section 1.6 when sending requests to the token endpoint.

Оскільки запити до кінцевої точки маркера призводять до передачі облікових даних у відкритому вигляді (у HTTP-запиті та відповіді), сервер авторизації ПОВИНЕН вимагати використання TLS, як описано в розділі 1.6, під час надсилання запитів до кінцевої точки маркера.

The client MUST use the HTTP "POST" method when making access token requests.

Клієнт ПОВИНЕН використовувати метод HTTP "POST", коли надсилає запити маркерів доступу.

Parameters sent without a value MUST be treated as if they were omitted from the request.  The authorization server MUST ignore unrecognized request parameters.  Request and response parameters MUST NOT be included more than once.

Параметри, надіслані без значення, ПОВИННІ розглядатися так, ніби вони були пропущені в запиті. Сервер авторизації ПОВИНЕН ігнорувати нерозпізнані параметри запиту. Параметри запиту та відповіді НЕ ПОВИННІ включатися більше одного разу.

#### 3.2.1.  Client Authentication

Confidential clients or other clients issued client credentials MUST authenticate with the authorization server as described in Section 2.3 when making requests to the token endpoint.  Client authentication is used for:

Конфіденційні клієнти або інші клієнти, яким надано облікові дані ПОВИННІ пройти автентифікацію на сервері авторизації, як описано в Розділі 2.3 під час надсилання запитів до кінцевої точки маркера. Аутентифікація клієнта використовується для:

- Enforcing the binding of refresh tokens and authorization codes to the client they were issued to.  Client authentication is critical when an authorization code is transmitted to the redirection endpoint over an insecure channel or when the redirection URI has not been registered in full.

- Примусове прив’язування токенів оновлення та кодів авторизації до клієнта, якому вони були видані. Автентифікація клієнта є критичною, коли код авторизації передається до кінцевої точки перенаправлення через незахищений канал або коли URI перенаправлення зареєстровано не повністю.

- Recovering from a compromised client by disabling the client or changing its credentials, thus preventing an attacker from abusing stolen refresh tokens.  Changing a single set of client credentials is significantly faster than revoking an entire set of refresh tokens.

- Відновлення від скомпрометованого клієнта шляхом вимкнення клієнта або зміни його облікових даних, що запобігає зловживанню зловмисником викраденими маркерами оновлення. Змінити один набір облікових даних клієнта значно швидше, ніж відкликати цілий набір маркерів оновлення.

- Implementing authentication management best practices, which require periodic credential rotation.  Rotation of an entire set of refresh tokens can be challenging, while rotation of a single set of client credentials is significantly easier.

- Впровадження найкращих практик керування автентифікацією, які потребують періодичної ротації облікових даних. Ротація цілого набору токенів оновлення може бути складною, тоді як ротація одного набору облікових даних клієнта значно легша.


A client MAY use the "client_id" request parameter to identify itself when sending requests to the token endpoint.  In the "authorization_code" "grant_type" request to the token endpoint, an unauthenticated client MUST send its "client_id" to prevent itself from inadvertently accepting a code intended for a client with a different "client_id".  This protects the client from substitution of the authentication code.  (It provides no additional security for the protected resource.)

Клієнт МОЖЕ використовувати параметр запиту «client_id», щоб ідентифікувати себе під час надсилання запитів до кінцевої точки маркера. У запиті "grant_type" "authorization_code" до кінцевої точки маркера неавтентифікований клієнт ПОВИНЕН надіслати свій "client_id", щоб запобігти ненавмисному прийняттю коду, призначеного для клієнта з іншим "client_id". Це захищає клієнта від підміни коду автентифікації. (Це не забезпечує додаткової безпеки для захищеного ресурсу.)

### 3.3.  Access Token Scope

The authorization and token endpoints allow the client to specify the scope of the access request using the "scope" request parameter.  In turn, the authorization server uses the "scope" response parameter to inform the client of the scope of the access token issued.

Кінцеві точки авторизації та маркера дозволяють клієнту вказати область запиту доступу за допомогою параметра запиту "scope". У свою чергу, сервер авторизації використовує параметр відповіді "scope", щоб повідомити клієнту про область виданого маркера доступу.

The value of the scope parameter is expressed as a list of space-delimited, case-sensitive strings.  The strings are defined by the authorization server.  If the value contains multiple space-delimited strings, their order does not matter, and each string adds an additional access range to the requested scope.

Значення параметра scope виражається як список рядків, розділених пробілами, чутливих до регістру. Рядки визначаються сервером авторизації. Якщо значення містить кілька рядків, розділених пробілами, їх порядок не має значення, і кожен рядок додає додатковий діапазон доступу до запитаної області.

```http
 scope       = scope-token *( SP scope-token )
 scope-token = 1*( %x21 / %x23-5B / %x5D-7E )
```

The authorization server MAY fully or partially ignore the scope requested by the client, based on the authorization server policy or the resource owner's instructions.  If the issued access token scope is different from the one requested by the client, the authorization server MUST include the "scope" response parameter to inform the client of the actual scope granted.

Сервер авторизації МОЖЕ повністю або частково ігнорувати область, яку запитує клієнт, на основі політики сервера авторизації або вказівок власника ресурсу. Якщо область виданого маркера доступу відрізняється від тієї, яку запитує клієнт, сервер авторизації ПОВИНЕН включити параметр відповіді «scope», щоб повідомити клієнта про фактичну надану область.

If the client omits the scope parameter when requesting authorization, the authorization server MUST either process the request using a pre-defined default value or fail the request indicating an invalid scope.  The authorization server SHOULD document its scope requirements and default value (if defined).

Якщо клієнт пропускає параметр області під час запиту авторизації, сервер авторизації ПОВИНЕН або обробити запит, використовуючи попередньо визначене значення за замовчуванням, або відхилити запит, вказавши недійсну область. Сервер авторизації ПОВИНЕН задокументувати свої вимоги до області та значення за замовчуванням (якщо визначено).

## 4. Obtaining Authorization

To request an access token, the client obtains authorization from the resource owner.  The authorization is expressed in the form of an authorization grant, which the client uses to request the access token.  OAuth defines four grant types: authorization code, implicit, resource owner password credentials, and client credentials.  It also provides an extension mechanism for defining additional grant types.

Щоб запитати маркер доступу, клієнт отримує авторизацію від власника ресурсу. Авторизація виражається у формі надання авторизації, яку клієнт використовує для запиту маркера доступу. OAuth визначає чотири типи дозволів: код авторизації, неявний, облікові дані пароля власника ресурсу та облікові дані клієнта. Він також забезпечує механізм розширення для визначення додаткових типів грантів.

### 4.1.  Authorization Code Grant

The authorization code grant type is used to obtain both access tokens and refresh tokens and is optimized for confidential clients. Since this is a redirection-based flow, the client must be capable of interacting with the resource owner's user-agent (typically a web browser) and capable of receiving incoming requests (via redirection) from the authorization server.

Тип надання коду авторизації використовується для отримання як маркерів доступу, так і маркерів оновлення та оптимізований для конфіденційних клієнтів. Оскільки це потік на основі перенаправлення, клієнт повинен мати можливість взаємодіяти з агентом користувача власника ресурсу (зазвичай веб-браузером) і отримувати вхідні запити (через перенаправлення) від сервера авторизації.

![image-20221120234321177](media/image-20221120234321177.png)

Note: The lines illustrating steps (A), (B), and (C) are broken into two parts as they pass through the user-agent.

Примітка. Рядки, що ілюструють кроки (A), (B) і (C), розбиваються на дві частини, коли вони проходять через агент користувача.

Figure 3: Authorization Code Flow

The flow illustrated in Figure 3 includes the following steps:

Потік, показаний на малюнку 3, включає такі кроки:

(A)  The client initiates the flow by directing the resource owner's   user-agent to the authorization endpoint.  The client includes   its client identifier, requested scope, local state, and a   redirection URI to which the authorization server will send the   user-agent back once access is granted (or denied).

(A) Клієнт ініціює потік, направляючи агента користувача власника ресурсу до кінцевої точки авторизації. Клієнт включає свій ідентифікатор клієнта, запитану область, локальний стан і URI перенаправлення, на який сервер авторизації надішле агент користувача назад, коли доступ буде надано (або заборонено).

(B)  The authorization server authenticates the resource owner (via   the user-agent) and establishes whether the resource owner   grants or denies the client's access request.

(B) Сервер авторизації аутентифікує власника ресурсу (через агента користувача) і визначає, чи власник ресурсу надає або відхиляє запит клієнта на доступ.

(C)  Assuming the resource owner grants access, the authorization   server redirects the user-agent back to the client using the   redirection URI provided earlier (in the request or during   client registration).  The redirection URI includes an   authorization code and any local state provided by the client   earlier.

(C) Припускаючи, що власник ресурсу надає доступ, сервер авторизації перенаправляє агента користувача назад до клієнта, використовуючи URI перенаправлення, наданий раніше (у запиті або під час реєстрації клієнта). URI перенаправлення включає код авторизації та будь-який локальний стан, наданий клієнтом раніше.

(D)  The client requests an access token from the authorization   server's token endpoint by including the authorization code   received in the previous step.  When making the request, the   client authenticates with the authorization server.  The client   includes the redirection URI used to obtain the authorization   code for verification.

(D) Клієнт запитує маркер доступу від кінцевої точки маркера сервера авторизації, включаючи код авторизації, отриманий на попередньому кроці. Під час надсилання запиту клієнт проходить автентифікацію на сервері авторизації. Клієнт включає URI перенаправлення, який використовується для отримання коду авторизації для перевірки.

(E)  The authorization server authenticates the client, validates the   authorization code, and ensures that the redirection URI   received matches the URI used to redirect the client in   step (C).  If valid, the authorization server responds back with   an access token and, optionally, a refresh token.

(E) Сервер авторизації автентифікує клієнта, перевіряє код авторизації та гарантує, що отриманий URI перенаправлення відповідає URI, використаному для перенаправлення клієнта на кроці (C). Якщо дійсний, сервер авторизації відповідає маркером доступу та, за бажанням, маркером оновлення.

#### 4.1.1.  Authorization Request

The client constructs the request URI by adding the following parameters to the query component of the authorization endpoint URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Клієнт створює URI запиту, додаючи наступні параметри до компонента запиту URI кінцевої точки авторизації, використовуючи формат «application/x-www-form-urlencoded», згідно з Додатком B:

response_type - REQUIRED.  Value MUST be set to "code".

response_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "код".

client_id - REQUIRED.  The client identifier as described in Section 2.2.

client_id - ОБОВ'ЯЗКОВО. Ідентифікатор клієнта, як описано в розділі 2.2.

redirect_uri - OPTIONAL.  As described in Section 3.1.2. scope
OPTIONAL.  The scope of the access request as described by Section 3.3.

redirect_uri - НЕОБОВ'ЯЗКОВО. Як описано в розділі 3.1.2. сфера застосування
НЕОБОВ'ЯЗКОВО. Обсяг запиту на доступ, як описано в розділі 3.3.

state - RECOMMENDED.  An opaque value used by the client to maintain state between the request and callback.  The authorization server includes this value when redirecting the user-agent back to the client.  The parameter SHOULD be used for preventing cross-site request forgery as described in Section 10.12.

стан - РЕКОМЕНДОВАНО. Непрозоре значення, яке використовується клієнтом для підтримки стану між запитом і зворотним викликом. Сервер авторизації включає це значення під час перенаправлення агента користувача назад до клієнта. Параметр СЛІД використовувати для запобігання підробці міжсайтових запитів, як описано в розділі 10.12.

The client directs the resource owner to the constructed URI using an HTTP redirection response, or by other means available to it via the user-agent.

Клієнт спрямовує власника ресурсу до створеного URI за допомогою відповіді перенаправлення HTTP або іншими засобами, доступними йому через агента користувача.

For example, the client directs the user-agent to make the following HTTP request using TLS (with extra line breaks for display purposes only):

Наприклад, клієнт наказує агенту користувача зробити наступний HTTP-запит за допомогою TLS (з додатковими розривами рядків лише для відображення):

```http
GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz
    &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
Host: server.example.com
```

The authorization server validates the request to ensure that all required parameters are present and valid.  If the request is valid, the authorization server authenticates the resource owner and obtains an authorization decision (by asking the resource owner or by establishing approval via other means).

Сервер авторизації перевіряє запит, щоб переконатися, що всі необхідні параметри присутні та дійсні. Якщо запит дійсний, сервер авторизації автентифікує власника ресурсу та отримує рішення щодо авторизації (запитуючи власника ресурсу або встановлюючи схвалення іншим способом).

When a decision is established, the authorization server directs the user-agent to the provided client redirection URI using an HTTP redirection response, or by other means available to it via the user-agent.

Коли рішення прийнято, сервер авторизації спрямовує агента користувача до наданого URI перенаправлення клієнта за допомогою відповіді перенаправлення HTTP або іншими засобами, доступними йому через агента користувача.

#### 4.1.2.  Authorization Response

If the resource owner grants the access request, the authorization server issues an authorization code and delivers it to the client by adding the following parameters to the query component of the redirection URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Якщо власник ресурсу надає запит на доступ, сервер авторизації видає код авторизації та доставляє його клієнту, додаючи такі параметри до компонента запиту URI перенаправлення за допомогою формату «application/x-www-form-urlencoded», за Додатком B:

code - REQUIRED.  The authorization code generated by the authorization server.  The authorization code MUST expire shortly after it is issued to mitigate the risk of leaks.  A maximum authorization code lifetime of 10 minutes is RECOMMENDED.  The client MUST NOT use the authorization code more than once.  If an authorization code is used more than once, the authorization server MUST deny the request and SHOULD revoke (when possible) all tokens previously issued based on that authorization code.  The authorization code is bound to the client identifier and redirection URI.

код - ОБОВ'ЯЗКОВИЙ. Код авторизації, згенерований сервером авторизації. Термін дії коду авторизації ПОВИНЕН закінчитися незабаром після його видачі, щоб зменшити ризик витоку. РЕКОМЕНДОВАНО максимальний термін дії коду авторизації 10 хвилин. Клієнт НЕ ПОВИНЕН використовувати код авторизації більше одного разу. Якщо код авторизації використовується більше одного разу, сервер авторизації ПОВИНЕН відхилити запит і ПОВИНЕН відкликати (якщо можливо) усі маркери, видані раніше на основі цього коду авторизації. Код авторизації прив’язаний до ідентифікатора клієнта та URI перенаправлення.

state - REQUIRED if the "state" parameter was present in the client authorization request.  The exact value received from the client.

state - ОБОВ'ЯЗКОВО, якщо параметр "state" був присутній у запиті авторизації клієнта. Точна вартість отримана від клієнта.

For example, the authorization server redirects the user-agent by sending the following HTTP response:

Наприклад, сервер авторизації перенаправляє агента користувача, надсилаючи таку відповідь HTTP:

```http
 HTTP/1.1 302 Found
 Location: https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA
           &state=xyz
```

The client MUST ignore unrecognized response parameters.  The authorization code string size is left undefined by this specification.  The client should avoid making assumptions about code value sizes.  The authorization server SHOULD document the size of any value it issues.

Клієнт ПОВИНЕН ігнорувати нерозпізнані параметри відповіді. Ця специфікація не визначає розмір рядка коду авторизації. Клієнту слід уникати припущень щодо розмірів значень коду. Сервер авторизації ПОВИНЕН документувати розмір будь-якого значення, яке він видає.

##### 4.1.2.1.  Error Response

If the request fails due to a missing, invalid, or mismatching redirection URI, or if the client identifier is missing or invalid, the authorization server SHOULD inform the resource owner of the error and MUST NOT automatically redirect the user-agent to the invalid redirection URI.

Якщо запит завершується невдачею через відсутній, недійсний або невідповідний URI перенаправлення, або якщо ідентифікатор клієнта відсутній або недійсний, сервер авторизації ПОВИНЕН повідомити власника ресурсу про помилку та НЕ ПОВИНЕН автоматично перенаправляти агента користувача на недійсне перенаправлення URI.

If the resource owner denies the access request or if the request fails for reasons other than a missing or invalid redirection URI, the authorization server informs the client by adding the following parameters to the query component of the redirection URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Якщо власник ресурсу відхиляє запит на доступ або якщо запит не виконується з інших причин, ніж відсутній або недійсний URI перенаправлення, сервер авторизації інформує клієнта, додаючи такі параметри до компонента запиту URI перенаправлення за допомогою «application/x- Формат www-form-urlencoded згідно з Додатком B:

error - REQUIRED.  A single ASCII [USASCII] error code from the following:

помилка - ОБОВ'ЯЗКОВО. Один код помилки ASCII [USASCII] із наступного:

invalid_request - The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed. 

invalid_request – у запиті відсутній обов’язковий параметр, він містить недійсне значення параметра, містить параметр більше одного разу або має інший неправильний формат.

unauthorized_client - The client is not authorized to request an authorization code using this method.

unauthorized_client - клієнт не авторизований запитувати код авторизації за допомогою цього методу.

access_denied - The resource owner or authorization server denied the request.

access_denied – власник ресурсу або сервер авторизації відхилив запит.

unsupported_response_type - The authorization server does not support obtaining an authorization code using this method.

unsupported_response_type - сервер авторизації не підтримує отримання коду авторизації за допомогою цього методу.

invalid_scope - The requested scope is invalid, unknown, or malformed.

invalid_scope – запитувана область недійсна, невідома або неправильно сформована.

server_error - The authorization server encountered an unexpected condition that prevented it from fulfilling the request. (This error code is needed because a 500 Internal Server Error HTTP status code cannot be returned to the client via an HTTP redirect.)

server_error - Сервер авторизації зіткнувся з несподіваною умовою, яка завадила йому виконати запит. (Цей код помилки потрібен, оскільки код статусу HTTP 500 внутрішньої помилки сервера не можна повернути клієнту через переспрямування HTTP.)

temporarily_unavailable - The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.  (This error code is needed because a 503 Service Unavailable HTTP status code cannot be returned to the client via an HTTP redirect.)

temporarily_unavailable - сервер авторизації наразі не може обробити запит через тимчасове перевантаження або технічне обслуговування сервера. (Цей код помилки потрібен, оскільки код статусу HTTP 503 Service Unavailable неможливо повернути клієнту через перенаправлення HTTP.)

Values for the "error" parameter MUST NOT include characters outside the set %x20-21 / %x23-5B / %x5D-7E.

Значення параметра "помилка" НЕ ПОВИННІ містити символи поза набором %x20-21 / %x23-5B / %x5D-7E.

error_description- OPTIONAL.  Human-readable ASCII [USASCII] text providing additional information, used to assist the client developer in understanding the error that occurred. Values for the "error_description" parameter MUST NOT include characters outside the set %x20-21 / %x23-5B / %x5D-7E.

error_description - НЕОБОВ'ЯЗКОВО. Зрозумілий для людини текст ASCII [USASCII], що надає додаткову інформацію, яка використовується, щоб допомогти розробнику клієнта зрозуміти помилку, яка сталася. Значення параметра "error_description" НЕ ПОВИННІ містити символи за межами набору %x20-21 / %x23-5B / %x5D-7E.

error_uri - OPTIONAL.  A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error. Values for the "error_uri" parameter MUST conform to the URI-reference syntax and thus MUST NOT include characters outside the set %x21 / %x23-5B / %x5D-7E.

error_uri - НЕОБОВ'ЯЗКОВО. URI, що ідентифікує зрозумілу людині веб-сторінку з інформацією про помилку, яка використовується для надання розробнику клієнта додаткової інформації про помилку. Значення для параметра "error_uri" ПОВИННІ відповідати синтаксису посилання на URI і, отже, НЕ ПОВИННІ включати символи поза набором %x21 / %x23-5B / %x5D-7E.

state - REQUIRED if a "state" parameter was present in the client authorization request.  The exact value received from the client.

стан - ОБОВ'ЯЗКОВО, якщо параметр "стан" був присутній у запиті авторизації клієнта. Точна вартість отримана від клієнта.

For example, the authorization server redirects the user-agent by sending the following HTTP response:

Наприклад, сервер авторизації перенаправляє агента користувача, надсилаючи таку відповідь HTTP:

```http
   HTTP/1.1 302 Found
   Location: https://client.example.com/cb?error=access_denied&state=xyz
```



#### 4.1.3.  Access Token Request

The client makes a request to the token endpoint by sending the following parameters using the "application/x-www-form-urlencoded" format per Appendix B with a character encoding of UTF-8 in the HTTP request entity-body:

Клієнт робить запит до кінцевої точки маркера, надсилаючи такі параметри, використовуючи формат «application/x-www-form-urlencoded» відповідно до Додатку Б із кодуванням символів UTF-8 у тілі сутності HTTP-запиту:

grant_type - REQUIRED.  Value MUST be set to "authorization_code".

grant_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "authorization_code".

code - REQUIRED.  The authorization code received from the authorization server.

код - ОБОВ'ЯЗКОВИЙ. Код авторизації, отриманий від сервера авторизації.

redirect_uri - REQUIRED, if the "redirect_uri" parameter was included in the authorization request as described in Section 4.1.1, and their values MUST be identical.

redirect_uri - ОБОВ'ЯЗКОВО, якщо параметр "redirect_uri" було включено в запит на авторизацію, як описано в розділі 4.1.1, і їх значення ПОВИННІ бути ідентичними.

client_id - REQUIRED, if the client is not authenticating with the authorization server as described in Section 3.2.1.

client_id – ОБОВ’ЯЗКОВО, якщо клієнт не автентифікується на сервері авторизації, як описано в Розділі 3.2.1.

If the client type is confidential or the client was issued client credentials (or assigned other authentication requirements), the client MUST authenticate with the authorization server as described in Section 3.2.1. For example, the client makes the following HTTP request using TLS (with extra line breaks for display purposes only):

Якщо тип клієнта є конфіденційним або клієнту було видано облікові дані клієнта (або призначено інші вимоги автентифікації), клієнт ПОВИНЕН пройти автентифікацію на сервері авторизації, як описано в Розділі 3.2.1. Наприклад, клієнт робить такий запит HTTP за допомогою TLS (з додатковими розривами рядків лише для відображення):

```http
 POST /token HTTP/1.1
 Host: server.example.com
 Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
 Content-Type: application/x-www-form-urlencoded

 grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
 &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
```

The authorization server MUST:

- require client authentication for confidential clients or for any client that was issued client credentials (or with other authentication requirements),

- authenticate the client if client authentication is included,

- ensure that the authorization code was issued to the authenticated confidential client, or if the client is public, ensure that the code was issued to "client_id" in the request,

- verify that the authorization code is valid, and

- ensure that the "redirect_uri" parameter is present if the "redirect_uri" parameter was included in the initial authorization request as described in Section 4.1.1, and if included ensure that their values are identical.

Сервер авторизації ПОВИНЕН:

- вимагати автентифікації клієнта для конфіденційних клієнтів або для будь-якого клієнта, якому видано облікові дані клієнта (або з іншими вимогами автентифікації),

- автентифікувати клієнта, якщо автентифікація клієнта включена,

- переконайтеся, що код авторизації було видано автентифікованому конфіденційному клієнту, або, якщо клієнт публічний, переконайтеся, що код було видано "client_id" у запиті,

- переконайтеся, що код авторизації дійсний, і

- переконайтеся, що параметр "redirect_uri" присутній, якщо параметр "redirect_uri" був включений у початковий запит авторизації, як описано в Розділі 4.1.1, і якщо включено, переконайтеся, що їхні значення ідентичні.

#### 4.1.4.  Access Token Response

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token as described in Section 5.1.  If the request client authentication failed or is invalid, the authorization server returns an error response as described in Section 5.2.   An example successful response:

Якщо запит маркера доступу дійсний і авторизований, сервер авторизації видає маркер доступу та додатковий маркер оновлення, як описано в розділі 5.1. Якщо автентифікація клієнта запиту не вдається або є недійсною, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2. Приклад успішної відповіді:

```http
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache
    
     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }
```

### 4.2.  Implicit Grant

The implicit grant type is used to obtain access tokens (it does not support the issuance of refresh tokens) and is optimized for public clients known to operate a particular redirection URI.  These clients are typically implemented in a browser using a scripting language such as JavaScript.

Тип неявного надання використовується для отримання маркерів доступу (він не підтримує видачу маркерів оновлення) і оптимізований для загальнодоступних клієнтів, які, як відомо, керують певним URI перенаправлення. Ці клієнти зазвичай реалізуються у браузері за допомогою мови сценаріїв, наприклад JavaScript.

Since this is a redirection-based flow, the client must be capable of interacting with the resource owner's user-agent (typically a web browser) and capable of receiving incoming requests (via redirection) from the authorization server.

Оскільки це потік на основі перенаправлення, клієнт повинен мати можливість взаємодіяти з агентом користувача власника ресурсу (зазвичай веб-браузером) і отримувати вхідні запити (через перенаправлення) від сервера авторизації.

Unlike the authorization code grant type, in which the client makes separate requests for authorization and for an access token, the client receives the access token as the result of the authorization request.

На відміну від типу надання коду авторизації, у якому клієнт робить окремі запити на авторизацію та на маркер доступу, клієнт отримує маркер доступу в результаті запиту авторизації.

The implicit grant type does not include client authentication, and relies on the presence of the resource owner and the registration of the redirection URI.  Because the access token is encoded into the redirection URI, it may be exposed to the resource owner and other applications residing on the same device.

Тип неявного надання не включає автентифікацію клієнта та залежить від присутності власника ресурсу та реєстрації URI перенаправлення. Оскільки маркер доступу закодовано в URI перенаправлення, він може бути відкритий для власника ресурсу та інших програм, які знаходяться на тому самому пристрої.

![image-20221120234733280](media/image-20221120234733280.png)

Note: The lines illustrating steps (A) and (B) are broken into two parts as they pass through the user-agent. Примітка. Рядки, що ілюструють кроки (A) і (B), розбиваються на дві частини, коли вони проходять через агент користувача.

Figure 4: Implicit Grant Flow Рисунок 4: Неявний потік грантів

The flow illustrated in Figure 4 includes the following steps:  Потік, показаний на малюнку 4, включає такі кроки:

(A)  The client initiates the flow by directing the resource owner's   user-agent to the authorization endpoint.  The client includes   its client identifier, requested scope, local state, and a   redirection URI to which the authorization server will send the   user-agent back once access is granted (or denied).

(A) Клієнт ініціює потік, направляючи агента користувача власника ресурсу до кінцевої точки авторизації. Клієнт включає свій ідентифікатор клієнта, запитану область, локальний стан і URI перенаправлення, на який сервер авторизації надішле агент користувача назад, коли доступ буде надано (або заборонено).

(B)  The authorization server authenticates the resource owner (via   the user-agent) and establishes whether the resource owner   grants or denies the client's access request.

(B) Сервер авторизації аутентифікує власника ресурсу (через агента користувача) і визначає, чи власник ресурсу надає або відхиляє запит клієнта на доступ.

(C)  Assuming the resource owner grants access, the authorization   server redirects the user-agent back to the client using the   redirection URI provided earlier.  The redirection URI includes   the access token in the URI fragment.

(C) Припускаючи, що власник ресурсу надає доступ, сервер авторизації перенаправляє агента користувача назад до клієнта, використовуючи URI перенаправлення, наданий раніше. URI перенаправлення містить маркер доступу у фрагменті URI.

(D)  The user-agent follows the redirection instructions by making a   request to the web-hosted client resource (which does not   include the fragment per [RFC2616]).  The user-agent retains the   fragment information locally.

(D) Агент користувача виконує інструкції з перенаправлення, надсилаючи запит до веб-ресурсу клієнта (який не містить фрагмент відповідно до [RFC2616]). Агент користувача зберігає інформацію про фрагмент локально.

(E)  The web-hosted client resource returns a web page (typically an   HTML document with an embedded script) capable of accessing the   full redirection URI including the fragment retained by the   user-agent, and extracting the access token (and other   parameters) contained in the fragment.

(E) Веб-ресурс клієнта повертає веб-сторінку (зазвичай HTML-документ із вбудованим сценарієм), здатну отримати доступ до повного URI перенаправлення, включаючи фрагмент, збережений агентом користувача, і отримати маркер доступу (та інші параметри) міститься у фрагменті.

(F)  The user-agent executes the script provided by the web-hosted   client resource locally, which extracts the access token.

(F) Агент користувача локально виконує сценарій, наданий веб-ресурсом клієнта, який витягує маркер доступу.

(G)  The user-agent passes the access token to the client.

(G) Агент користувача передає маркер доступу клієнту.

See Sections 1.3.2 and 9 for background on using the implicit grant. See Sections 10.3 and 10.16 for important security considerations when using the implicit grant.

Дивіться розділи 1.3.2 і 9, щоб дізнатися про використання неявного надання. Дивіться розділи 10.3 і 10.16, щоб дізнатися про важливі міркування щодо безпеки під час використання неявного надання.

#### 4.2.1.  Authorization Request

The client constructs the request URI by adding the following parameters to the query component of the authorization endpoint URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Клієнт створює URI запиту, додаючи наступні параметри до компонента запиту URI кінцевої точки авторизації, використовуючи формат «application/x-www-form-urlencoded», згідно з Додатком B:

response_type - REQUIRED.  Value MUST be set to "token".

response_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "токен".

client_id - REQUIRED.  The client identifier as described in Section 2.2. 

client_id - ОБОВ'ЯЗКОВО. Ідентифікатор клієнта, як описано в розділі 2.2.

redirect_uri - OPTIONAL.  As described in Section 3.1.2.

redirect_uri - НЕОБОВ'ЯЗКОВО. Як описано в розділі 3.1.2.

scope - OPTIONAL.  The scope of the access request as described by Section 3.3.

сфера застосування - НЕОБОВ'ЯЗКОВО. Обсяг запиту на доступ, як описано в розділі 3.3.

state - RECOMMENDED.  An opaque value used by the client to maintain state between the request and callback.  The authorization server includes this value when redirecting the user-agent back to the client.  The parameter SHOULD be used for preventing cross-site request forgery as described in Section 10.12.

стан - РЕКОМЕНДОВАНО. Непрозоре значення, яке використовується клієнтом для підтримки стану між запитом і зворотним викликом. Сервер авторизації включає це значення під час перенаправлення агента користувача назад до клієнта. Параметр СЛІД використовувати для запобігання підробці міжсайтових запитів, як описано в розділі 10.12.

The client directs the resource owner to the constructed URI using an HTTP redirection response, or by other means available to it via the user-agent.

Клієнт спрямовує власника ресурсу до створеного URI за допомогою відповіді перенаправлення HTTP або іншими засобами, доступними йому через агента користувача.

For example, the client directs the user-agent to make the following HTTP request using TLS (with extra line breaks for display purposes only):

Наприклад, клієнт наказує агенту користувача зробити наступний HTTP-запит за допомогою TLS (з додатковими розривами рядків лише для відображення):

```http
    GET /authorize?response_type=token&client_id=s6BhdRkqt3&state=xyz
        &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
    Host: server.example.com
```

The authorization server validates the request to ensure that all required parameters are present and valid.  The authorization server MUST verify that the redirection URI to which it will redirect the access token matches a redirection URI registered by the client as described in Section 3.1.2.

Сервер авторизації перевіряє запит, щоб переконатися, що всі необхідні параметри присутні та дійсні. Сервер авторизації ПОВИНЕН перевірити, що URI перенаправлення, на який він перенаправлятиме маркер доступу, відповідає URI перенаправлення, зареєстрованому клієнтом, як описано в Розділі 3.1.2.

If the request is valid, the authorization server authenticates the resource owner and obtains an authorization decision (by asking the resource owner or by establishing approval via other means).

Якщо запит дійсний, сервер авторизації автентифікує власника ресурсу та отримує рішення щодо авторизації (запитуючи власника ресурсу або встановлюючи схвалення іншим способом).

When a decision is established, the authorization server directs the user-agent to the provided client redirection URI using an HTTP redirection response, or by other means available to it via the user-agent.

Коли рішення прийнято, сервер авторизації спрямовує агента користувача до наданого URI перенаправлення клієнта за допомогою відповіді перенаправлення HTTP або іншими засобами, доступними йому через агента користувача.

#### 4.2.2.  Access Token Response

If the resource owner grants the access request, the authorization server issues an access token and delivers it to the client by adding the following parameters to the fragment component of the redirection URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Якщо власник ресурсу надає запит на доступ, сервер авторизації видає маркер доступу та доставляє його клієнту, додаючи такі параметри до компонента фрагмента URI перенаправлення за допомогою формату «application/x-www-form-urlencoded», за Додатком B:

access_token - REQUIRED.  The access token issued by the authorization server.

access_token - ОБОВ'ЯЗКОВО. Маркер доступу, виданий сервером авторизації.

token_type - REQUIRED.  The type of the token issued as described in Section 7.1.  Value is case insensitive.

token_type - ОБОВ'ЯЗКОВО. Тип випущеного токена, як описано в розділі 7.1. Значення не залежить від регістру.

expires_in - RECOMMENDED.  The lifetime in seconds of the access token.  For example, the value "3600" denotes that the access token will expire in one hour from the time the response was generated. If omitted, the authorization server SHOULD provide the expiration time via other means or document the default value.

expires_in - РЕКОМЕНДОВАНО. Тривалість життя маркера доступу в секундах. Наприклад, значення «3600» вказує на те, що термін дії маркера доступу закінчиться через годину з моменту створення відповіді. Якщо опущено, сервер авторизації ПОВИНЕН надати час закінчення терміну дії іншим способом або задокументувати значення за замовчуванням.

scope - OPTIONAL, if identical to the scope requested by the client; otherwise, REQUIRED.  The scope of the access token as described by Section 3.3.

обсяг - НЕОБОВ'ЯЗКОВИЙ, якщо ідентичний обсягу, який запитує клієнт; інакше ОБОВ’ЯЗКОВО. Обсяг маркера доступу, як описано в розділі 3.3.

state - REQUIRED if the "state" parameter was present in the client authorization request.  The exact value received from the client.

state - ОБОВ'ЯЗКОВО, якщо параметр "state" був присутній у запиті авторизації клієнта. Точна вартість отримана від клієнта.

The authorization server MUST NOT issue a refresh token.

Сервер авторизації НЕ ПОВИНЕН видавати маркер оновлення.

For example, the authorization server redirects the user-agent by sending the following HTTP response (with extra line breaks for display purposes only):

Наприклад, сервер авторизації перенаправляє агента користувача, надсилаючи таку відповідь HTTP (з додатковими розривами рядків лише для відображення):

``` http
     HTTP/1.1 302 Found
     Location: http://example.com/cb#access_token=2YotnFZFEjr1zCsicMWpAA
               &state=xyz&token_type=example&expires_in=3600
```
Developers should note that some user-agents do not support the inclusion of a fragment component in the HTTP "Location" response header field.  Such clients will require using other methods for redirecting the client than a 3xx redirection response -- for example, returning an HTML page that includes a 'continue' button with an action linked to the redirection URI. The client MUST ignore unrecognized response parameters.  The access token string size is left undefined by this specification.  The client should avoid making assumptions about value sizes.  The authorization server SHOULD document the size of any value it issues.

Розробникам слід зауважити, що деякі користувальницькі агенти не підтримують включення компонента фрагмента в поле заголовка відповіді HTTP "Location". Такі клієнти вимагатимуть використання інших методів для перенаправлення клієнта, ніж відповідь на перенаправлення 3xx — наприклад, повернення HTML-сторінки, яка містить кнопку «продовжити» з дією, пов’язаною з URI перенаправлення. Клієнт ПОВИНЕН ігнорувати нерозпізнані параметри відповіді. Ця специфікація не визначає розмір рядка маркера доступу. Клієнту слід уникати припущень щодо розмірів вартості. Сервер авторизації ПОВИНЕН документувати розмір будь-якого значення, яке він видає.

##### 4.2.2.1.  Error Response

If the request fails due to a missing, invalid, or mismatching redirection URI, or if the client identifier is missing or invalid, the authorization server SHOULD inform the resource owner of the error and MUST NOT automatically redirect the user-agent to the invalid redirection URI.

Якщо запит завершується невдачею через відсутній, недійсний або невідповідний URI перенаправлення, або якщо ідентифікатор клієнта відсутній або недійсний, сервер авторизації ПОВИНЕН повідомити власника ресурсу про помилку та НЕ ПОВИНЕН автоматично перенаправляти агента користувача на недійсне перенаправлення URI.

If the resource owner denies the access request or if the request fails for reasons other than a missing or invalid redirection URI, the authorization server informs the client by adding the following parameters to the fragment component of the redirection URI using the "application/x-www-form-urlencoded" format, per Appendix B:

Якщо власник ресурсу відхиляє запит на доступ або якщо запит не виконується з інших причин, ніж відсутній або недійсний URI перенаправлення, сервер авторизації інформує клієнта, додаючи наступні параметри до компонента фрагмента URI перенаправлення за допомогою «application/x- Формат www-form-urlencoded згідно з Додатком B:

error - REQUIRED.  A single ASCII [USASCII] error code from the following:

помилка - ОБОВ'ЯЗКОВО. Один код помилки ASCII [USASCII] із наступного:

invalid_request - The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.

invalid_request – у запиті відсутній обов’язковий параметр, він містить недійсне значення параметра, містить параметр більше одного разу або має інший неправильний формат.

unauthorized_client - The client is not authorized to request an access token   using this method.

unauthorized_client – клієнт не авторизований запитувати маркер доступу за допомогою цього методу.

 access_denied -  The resource owner or authorization server denied the  request.

  access_denied – власник ресурсу або сервер авторизації відхилив запит.

 unsupported_response_type -  The authorization server does not support obtaining an  access token using this method.

  unsupported_response_type - сервер авторизації не підтримує отримання маркера доступу за допомогою цього методу.

 invalid_scope -  The requested scope is invalid, unknown, or malformed. 

invalid_scope – запитувана область недійсна, невідома або неправильно сформована.

 server_error -  The authorization server encountered an unexpected  condition that prevented it from fulfilling the request.  (This error code is needed because a 500 Internal Server  Error HTTP status code cannot be returned to the client  via an HTTP redirect.)

  server_error - Сервер авторизації зіткнувся з несподіваною умовою, яка завадила йому виконати запит. (Цей код помилки потрібен, оскільки код статусу HTTP 500 внутрішньої помилки сервера не можна повернути клієнту через переспрямування HTTP.)

 temporarily_unavailable -  The authorization server is currently unable to handle  the request due to a temporary overloading or maintenance  of the server.  (This error code is needed because a 503  Service Unavailable HTTP status code cannot be returned  to the client via an HTTP redirect.)

  temporarily_unavailable - сервер авторизації наразі не може обробити запит через тимчасове перевантаження або технічне обслуговування сервера. (Цей код помилки потрібен, оскільки код статусу HTTP 503 Service Unavailable неможливо повернути клієнту через перенаправлення HTTP.)

Values for the "error" parameter MUST NOT include characters  outside the set %x20-21 / %x23-5B / %x5D-7E.

Значення параметра "помилка" НЕ ПОВИННІ містити символи поза набором %x20-21 / %x23-5B / %x5D-7E.

error_description - OPTIONAL.  Human-readable ASCII [USASCII] text providing additional information, used to assist the client developer in understanding the error that occurred. Values for the "error_description" parameter MUST NOT include characters outside the set %x20-21 / %x23-5B / %x5D-7E.

error_description - НЕОБОВ'ЯЗКОВО. Зрозумілий для людини текст ASCII [USASCII], що надає додаткову інформацію, яка використовується, щоб допомогти розробнику клієнта зрозуміти помилку, яка сталася. Значення параметра "error_description" НЕ ПОВИННІ містити символи за межами набору %x20-21 / %x23-5B / %x5D-7E.

error_uri - OPTIONAL.  A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error. Values for the "error_uri" parameter MUST conform to the URI-reference syntax and thus MUST NOT include characters outside the set %x21 / %x23-5B / %x5D-7E.

error_uri - НЕОБОВ'ЯЗКОВО. URI, що ідентифікує зрозумілу людині веб-сторінку з інформацією про помилку, яка використовується для надання розробнику клієнта додаткової інформації про помилку. Значення для параметра "error_uri" ПОВИННІ відповідати синтаксису посилання на URI і, отже, НЕ ПОВИННІ включати символи поза набором %x21 / %x23-5B / %x5D-7E.

state - REQUIRED if a "state" parameter was present in the client authorization request.  The exact value received from the client.

стан - ОБОВ'ЯЗКОВО, якщо параметр "стан" був присутній у запиті авторизації клієнта. Точна вартість отримана від клієнта.

For example, the authorization server redirects the user-agent by sending the following HTTP response:

Наприклад, сервер авторизації перенаправляє агента користувача, надсилаючи таку відповідь HTTP:

``` http
   HTTP/1.1 302 Found
   Location: https://client.example.com/cb#error=access_denied&state=xyz
```

### 4.3.  Resource Owner Password Credentials Grant

The resource owner password credentials grant type is suitable in cases where the resource owner has a trust relationship with the client, such as the device operating system or a highly privileged application.  The authorization server should take special care when enabling this grant type and only allow it when other flows are not viable.

Тип надання облікових даних для пароля власника ресурсу підходить у випадках, коли власник ресурсу має довірчі стосунки з клієнтом, наприклад операційною системою пристрою або високопривілейованою програмою. Сервер авторизації має бути особливо уважним під час увімкнення цього типу дозволу та дозволяти його лише тоді, коли інші потоки нежиттєздатні.

This grant type is suitable for clients capable of obtaining the resource owner's credentials (username and password, typically using an interactive form).  It is also used to migrate existing clients using direct authentication schemes such as HTTP Basic or Digest authentication to OAuth by converting the stored credentials to an access token.

Цей тип дозволу підходить для клієнтів, які можуть отримати облікові дані власника ресурсу (ім’я користувача та пароль, зазвичай за допомогою інтерактивної форми). Він також використовується для перенесення наявних клієнтів за допомогою схем прямої автентифікації, таких як HTTP Basic або Digest автентифікація, на OAuth шляхом перетворення збережених облікових даних на маркер доступу.

![image-20221120235239529](media/image-20221120235239529.png)

Figure 5: Resource Owner Password Credentials Flow

Рисунок 5. Потік облікових даних пароля власника ресурсу

The flow illustrated in Figure 5 includes the following steps:

Потік, показаний на малюнку 5, включає наступні кроки:

(A)  The resource owner provides the client with its username and   password.

(A) Власник ресурсу надає клієнту своє ім’я користувача та пароль.

(B)  The client requests an access token from the authorization   server's token endpoint by including the credentials received   from the resource owner.  When making the request, the client   authenticates with the authorization server.

(B) Клієнт запитує маркер доступу від кінцевої точки маркера сервера авторизації, включаючи облікові дані, отримані від власника ресурсу. Під час надсилання запиту клієнт проходить автентифікацію на сервері авторизації.

(C)  The authorization server authenticates the client and validates   the resource owner credentials, and if valid, issues an access   token.

(C) Сервер авторизації автентифікує клієнта та перевіряє облікові дані власника ресурсу, і якщо дійсний, видає маркер доступу.

#### 4.3.1.  Authorization Request and Response

The method through which the client obtains the resource owner credentials is beyond the scope of this specification.  The client MUST discard the credentials once an access token has been obtained.

Метод, за допомогою якого клієнт отримує облікові дані власника ресурсу, виходить за рамки цієї специфікації. Клієнт ПОВИНЕН відмовитися від облікових даних після отримання маркера доступу.

#### 4.3.2.  Access Token Request

The client makes a request to the token endpoint by adding the following parameters using the "application/x-www-form-urlencoded" format per Appendix B with a character encoding of UTF-8 in the HTTP request entity-body:

Клієнт надсилає запит кінцевій точці маркера, додаючи такі параметри, використовуючи формат «application/x-www-form-urlencoded» відповідно до Додатку B із кодуванням символів UTF-8 у тілі сутності HTTP-запиту:

grant_type - REQUIRED.  Value MUST be set to "password".

grant_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "пароль".

username - REQUIRED.  The resource owner username.

ім'я користувача - ОБОВ'ЯЗКОВО. Ім'я користувача власника ресурсу.

password - REQUIRED.  The resource owner password.

пароль - ОБОВ'ЯЗКОВО. Пароль власника ресурсу.

scope - OPTIONAL.  The scope of the access request as described by Section 3.3.

сфера застосування - НЕОБОВ'ЯЗКОВО. Обсяг запиту на доступ, як описано в розділі 3.3.

If the client type is confidential or the client was issued client credentials (or assigned other authentication requirements), the client MUST authenticate with the authorization server as described in Section 3.2.1.

Якщо тип клієнта є конфіденційним або клієнту було видано облікові дані клієнта (або призначено інші вимоги автентифікації), клієнт ПОВИНЕН пройти автентифікацію на сервері авторизації, як описано в Розділі 3.2.1.

For example, the client makes the following HTTP request using transport-layer security (with extra line breaks for display purposes only):

Наприклад, клієнт робить наступний запит HTTP, використовуючи захист транспортного рівня (з додатковими розривами рядків лише для відображення):

``` http
     POST /token HTTP/1.1
     Host: server.example.com
     Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
     Content-Type: application/x-www-form-urlencoded
    
     grant_type=password&username=johndoe&password=A3ddj3w
```

The authorization server MUST:

- require client authentication for confidential clients or for any client that was issued client credentials (or with other authentication requirements),

- authenticate the client if client authentication is included, and

- validate the resource owner password credentials using its existing password validation algorithm.


Since this access token request utilizes the resource owner's password, the authorization server MUST protect the endpoint against brute force attacks (e.g., using rate-limitation or generating alerts).

Сервер авторизації ПОВИНЕН:

- вимагати автентифікації клієнта для конфіденційних клієнтів або для будь-якого клієнта, якому видано облікові дані клієнта (або з іншими вимогами автентифікації),

- автентифікувати клієнта, якщо автентифікація клієнта включена, і

- перевірити облікові дані власника ресурсу за допомогою існуючого алгоритму перевірки пароля.


Оскільки цей запит маркера доступу використовує пароль власника ресурсу, сервер авторизації ПОВИНЕН захистити кінцеву точку від атак грубої сили (наприклад, використовуючи обмеження швидкості або генеруючи сповіщення).

#### 4.3.3.  Access Token Response

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token as described in Section 5.1.  If the request failed client authentication or is invalid, the authorization server returns an error response as described in Section 5.2.

An example successful response:

Якщо запит маркера доступу дійсний і авторизований, сервер авторизації видає маркер доступу та додатковий маркер оновлення, як описано в розділі 5.1. Якщо запит не пройшов автентифікацію клієнта або є недійсним, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2.

Приклад успішної відповіді:

``` http
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache
    
     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }
```

### 4.4.  Client Credentials Grant

The client can request an access token using only its client credentials (or other supported means of authentication) when the client is requesting access to the protected resources under its control, or those of another resource owner that have been previously arranged with the authorization server (the method of which is beyond the scope of this specification). The client credentials grant type MUST only be used by confidential clients.  

Клієнт може запитувати маркер доступу, використовуючи лише свої облікові дані клієнта (або інші підтримувані засоби автентифікації), коли клієнт запитує доступ до захищених ресурсів, які знаходяться під його контролем, або ресурсів іншого власника ресурсу, які були попередньо домовлені з сервером авторизації ( метод якого виходить за межі цієї специфікації). Тип надання облікових даних ПОВИНЕН використовуватися лише конфіденційними клієнтами.

![image-20221120235513322](media/image-20221120235513322.png)

Figure 6: Client Credentials Flow

The flow illustrated in Figure 6 includes the following steps:

(A)  The client authenticates with the authorization server and   requests an access token from the token endpoint.

(B)  The authorization server authenticates the client, and if valid,   issues an access token.

Рисунок 6. Потік облікових даних клієнта

Потік, показаний на малюнку 6, включає наступні кроки:

(A) Клієнт автентифікується на сервері авторизації та запитує маркер доступу від кінцевої точки маркера.

(B) Сервер авторизації автентифікує клієнта та, якщо дійсний, видає маркер доступу.

#### 4.4.1.  Authorization Request and Response

Since the client authentication is used as the authorization grant, no additional authorization request is needed.

Оскільки автентифікація клієнта використовується як дозвіл авторизації, додатковий запит авторизації не потрібен.

#### 4.4.2.  Access Token Request

The client makes a request to the token endpoint by adding the following parameters using the "application/x-www-form-urlencoded" format per Appendix B with a character encoding of UTF-8 in the HTTP request entity-body:

grant_type - REQUIRED.  Value MUST be set to "client_credentials".

scope - OPTIONAL.  The scope of the access request as described by Section 3.3.

Клієнт надсилає запит кінцевій точці маркера, додаючи такі параметри, використовуючи формат «application/x-www-form-urlencoded» відповідно до Додатку B із кодуванням символів UTF-8 у тілі сутності HTTP-запиту:

grant_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "client_credentials".

сфера застосування - НЕОБОВ'ЯЗКОВО. Обсяг запиту на доступ, як описано в розділі 3.3.

The client MUST authenticate with the authorization server as described in Section 3.2.1. For example, the client makes the following HTTP request using transport-layer security (with extra line breaks for display purposes only):

Клієнт ПОВИНЕН пройти автентифікацію на сервері авторизації, як описано в розділі 3.2.1. Наприклад, клієнт робить наступний запит HTTP, використовуючи захист транспортного рівня (з додатковими розривами рядків лише для відображення):

``` http
     POST /token HTTP/1.1
     Host: server.example.com
     Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
     Content-Type: application/x-www-form-urlencoded
    
     grant_type=client_credentials
```

The authorization server MUST authenticate the client.

Сервер авторизації ПОВИНЕН аутентифікувати клієнта.

#### 4.4.3.  Access Token Response

If the access token request is valid and authorized, the authorization server issues an access token as described in Section 5.1.  A refresh token SHOULD NOT be included.  If the request failed client authentication or is invalid, the authorization server returns an error response as described in Section 5.2.

Якщо запит маркера доступу дійсний і авторизований, сервер авторизації видає маркер доступу, як описано в розділі 5.1. Маркер оновлення НЕ СЛІД включати. Якщо запит не пройшов автентифікацію клієнта або є недійсним, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2.

An example successful response:

Приклад успішної відповіді:

``` http
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache
    
     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "example_parameter":"example_value"
     }
```

### 4.5.  Extension Grants

The client uses an extension grant type by specifying the grant type using an absolute URI (defined by the authorization server) as the value of the "grant_type" parameter of the token endpoint, and by adding any additional parameters necessary. For example, to request an access token using a Security Assertion Markup Language (SAML) 2.0 assertion grant type as defined by [OAuth-SAML2], the client could make the following HTTP request using TLS (with extra line breaks for display purposes only):

Клієнт використовує тип надання розширення, вказуючи тип надання за допомогою абсолютного URI (визначеного сервером авторизації) як значення параметра "grant_type" кінцевої точки маркера та додаючи будь-які додаткові параметри. Наприклад, для запиту маркера доступу за допомогою типу дозволу твердження Security Assertion Markup Language (SAML) 2.0, як визначено [OAuth-SAML2], клієнт може зробити наступний запит HTTP за допомогою TLS (з додатковими розривами рядків лише для відображення) :

``` http
     POST /token HTTP/1.1
     Host: server.example.com
     Content-Type: application/x-www-form-urlencoded
    
     grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Asaml2-
     bearer&assertion=PEFzc2VydGlvbiBJc3N1ZUluc3RhbnQ9IjIwMTEtMDU
     [...omitted for brevity...]aG5TdGF0ZW1lbnQ-PC9Bc3NlcnRpb24-
```

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token as described in Section 5.1.  If the request failed client authentication or is invalid, the authorization server returns an error response as described in Section 5.2.

Якщо запит маркера доступу дійсний і авторизований, сервер авторизації видає маркер доступу та додатковий маркер оновлення, як описано в розділі 5.1. Якщо запит не пройшов автентифікацію клієнта або є недійсним, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2.

## 5. Issuing an Access Token

If the access token request is valid and authorized, the authorization server issues an access token and optional refresh token as described in Section 5.1.  If the request failed client authentication or is invalid, the authorization server returns an error response as described in Section 5.2.

Якщо запит маркера доступу дійсний і авторизований, сервер авторизації видає маркер доступу та додатковий маркер оновлення, як описано в розділі 5.1. Якщо запит не пройшов автентифікацію клієнта або є недійсним, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2.

### 5.1.  Successful Response

The authorization server issues an access token and optional refresh token, and constructs the response by adding the following parameters to the entity-body of the HTTP response with a 200 (OK) status code:

access_token - REQUIRED.  The access token issued by the authorization server.

token_type - REQUIRED.  The type of the token issued as described in Section 7.1.  Value is case insensitive.

expires_in - RECOMMENDED.  The lifetime in seconds of the access token.  For example, the value "3600" denotes that the access token will expire in one hour from the time the response was generated. If omitted, the authorization server SHOULD provide the expiration time via other means or document the default value.

refresh_token - OPTIONAL.  The refresh token, which can be used to obtain new access tokens using the same authorization grant as described in Section 6.

scope - OPTIONAL, if identical to the scope requested by the client; otherwise, REQUIRED.  The scope of the access token as described by Section 3.3.

Сервер авторизації видає маркер доступу та додатковий маркер оновлення та створює відповідь, додаючи наступні параметри до тіла сутності відповіді HTTP з кодом статусу 200 (OK):

access_token - ОБОВ'ЯЗКОВО. Маркер доступу, виданий сервером авторизації.

token_type - ОБОВ'ЯЗКОВО. Тип випущеного токена, як описано в розділі 7.1. Значення не залежить від регістру.

expires_in - РЕКОМЕНДОВАНО. Тривалість життя маркера доступу в секундах. Наприклад, значення «3600» вказує на те, що термін дії маркера доступу закінчиться через годину з моменту створення відповіді. Якщо опущено, сервер авторизації ПОВИНЕН надати час закінчення терміну дії іншим способом або задокументувати значення за замовчуванням.

refresh_token - НЕОБОВ'ЯЗКОВО. Маркер оновлення, який можна використовувати для отримання нових маркерів доступу, використовуючи той самий дозвіл авторизації, як описано в розділі 6.

обсяг - НЕОБОВ'ЯЗКОВИЙ, якщо ідентичний обсягу, який запитує клієнт; інакше ОБОВ’ЯЗКОВО. Обсяг маркера доступу, як описано в розділі 3.3.

The parameters are included in the entity-body of the HTTP response using the "application/json" media type as defined by [RFC4627].  The parameters are serialized into a JavaScript Object Notation (JSON) structure by adding each parameter at the highest structure level. Parameter names and string values are included as JSON strings. Numerical values are included as JSON numbers.  The order of parameters does not matter and can vary.

Параметри включаються в тіло відповіді HTTP з використанням типу медіа «application/json», як визначено [RFC4627]. Параметри серіалізуються в структуру JavaScript Object Notation (JSON) шляхом додавання кожного параметра на найвищому рівні структури. Імена параметрів і рядкові значення включені як рядки JSON. Числові значення включено як числа JSON. Порядок параметрів не має значення і може змінюватися.

The authorization server MUST include the HTTP "Cache-Control" response header field [RFC2616] with a value of "no-store" in any response containing tokens, credentials, or other sensitive information, as well as the "Pragma" response header field [RFC2616] with a value of "no-cache".

For example:

Сервер авторизації ПОВИНЕН містити поле заголовка відповіді HTTP "Cache-Control" [RFC2616] зі значенням "no-store" у будь-якій відповіді, що містить маркери, облікові дані чи іншу конфіденційну інформацію, а також поле заголовка відповіді "Pragma". [RFC2616] зі значенням "no-cache".

Наприклад:

``` http
     HTTP/1.1 200 OK
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache
    
     {
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"example",
       "expires_in":3600,
       "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
       "example_parameter":"example_value"
     }
```

The client MUST ignore unrecognized value names in the response.  The sizes of tokens and other values received from the authorization server are left undefined.  The client should avoid making assumptions about value sizes.  The authorization server SHOULD document the size of any value it issues.

Клієнт ПОВИНЕН ігнорувати нерозпізнані імена значень у відповіді. Розміри токенів та інші значення, отримані від сервера авторизації, залишаються невизначеними. Клієнту слід уникати припущень щодо розмірів вартості. Сервер авторизації ПОВИНЕН документувати розмір будь-якого значення, яке він видає.

### 5.2.  Error Response

The authorization server responds with an HTTP 400 (Bad Request) status code (unless specified otherwise) and includes the following parameters with the response:

Сервер авторизації відповідає кодом статусу HTTP 400 (неправильний запит) (якщо не вказано інше) і включає такі параметри у відповідь:

error - REQUIRED.  A single ASCII [USASCII] error code from the following:

помилка - ОБОВ'ЯЗКОВО. Один код помилки ASCII [USASCII] із наступного:

invalid_request -   The request is missing a required parameter, includes an   unsupported parameter value (other than grant type),   repeats a parameter, includes multiple credentials,   utilizes more than one mechanism for authenticating the   client, or is otherwise malformed.

invalid_request – у запиті відсутній обов’язковий параметр, він містить непідтримуване значення параметра (крім типу дозволу), повторює параметр, містить кілька облікових даних, використовує більше одного механізму для автентифікації клієнта або має інший неправильний формат.

invalid_client -  Client authentication failed (e.g., unknown client, no  client authentication included, or unsupported  authentication method).  The authorization server MAY  return an HTTP 401 (Unauthorized) status code to indicate  which HTTP authentication schemes are supported.  If the  client attempted to authenticate via the "Authorization"  request header field, the authorization server MUST  respond with an HTTP 401 (Unauthorized) status code and  include the "WWW-Authenticate" response header field  matching the authentication scheme used by the client.

invalid_client - помилка автентифікації клієнта (наприклад, невідомий клієнт, не включена автентифікація клієнта або непідтримуваний метод автентифікації). Сервер авторизації МОЖЕ повернути код статусу HTTP 401 (неавторизовано), щоб вказати, які схеми автентифікації HTTP підтримуються. Якщо клієнт спробував автентифікуватися за допомогою поля заголовка запиту «Авторизація», сервер авторизації ПОВИНЕН відповісти кодом статусу HTTP 401 (неавторизовано) і включити поле заголовка відповіді «WWW-автентифікація», що відповідає схемі автентифікації, яку використовує клієнт.

 invalid_grant -  The provided authorization grant (e.g., authorization  code, resource owner credentials) or refresh token is  invalid, expired, revoked, does not match the redirection  URI used in the authorization request, or was issued to  another client.

invalid_grant – наданий дозвіл авторизації (наприклад, код авторизації, облікові дані власника ресурсу) або маркер оновлення недійсний, прострочений, відкликаний, не відповідає URI перенаправлення, використаному в запиті авторизації, або був виданий іншому клієнту.

 unauthorized_client -  The authenticated client is not authorized to use this  authorization grant type.

unauthorized_client – автентифікований клієнт не авторизований для використання цього типу надання авторизації.

 unsupported_grant_type -   The authorization grant type is not supported by the  authorization server.

  unsupported_grant_type – тип дозволу авторизації не підтримується сервером авторизації.

 invalid_scope -  The requested scope is invalid, unknown, malformed, or  exceeds the scope granted by the resource owner.

  invalid_scope -   Запитаний обсяг недійсний, невідомий, неправильно сформований або перевищує обсяг, наданий власником ресурсу.

 Values for the "error" parameter MUST NOT include characters  outside the set %x20-21 / %x23-5B / %x5D-7E.

 Значення параметра "помилка" НЕ ПОВИННІ містити символи поза набором %x20-21 / %x23-5B / %x5D-7E.

error_description - OPTIONAL.  Human-readable ASCII [USASCII] text providing additional information, used to assist the client developer in understanding the error that occurred. Values for the "error_description" parameter MUST NOT include characters outside the set %x20-21 / %x23-5B / %x5D-7E.

error_description - НЕОБОВ'ЯЗКОВО. Зрозумілий для людини текст ASCII [USASCII], що надає додаткову інформацію, яка використовується, щоб допомогти розробнику клієнта зрозуміти помилку, яка сталася. Значення параметра "error_description" НЕ ПОВИННІ містити символи за межами набору %x20-21 / %x23-5B / %x5D-7E.

error_uri - OPTIONAL.  A URI identifying a human-readable web page with information about the error, used to provide the client developer with additional information about the error. Values for the "error_uri" parameter MUST conform to the URI-reference syntax and thus MUST NOT include characters outside the set %x21 / %x23-5B / %x5D-7E.

error_uri - НЕОБОВ'ЯЗКОВО. URI, що ідентифікує зрозумілу людині веб-сторінку з інформацією про помилку, яка використовується для надання розробнику клієнта додаткової інформації про помилку. Значення для параметра "error_uri" ПОВИННІ відповідати синтаксису посилання на URI і, отже, НЕ ПОВИННІ включати символи поза набором %x21 / %x23-5B / %x5D-7E.

The parameters are included in the entity-body of the HTTP response using the "application/json" media type as defined by [RFC4627].  The parameters are serialized into a JSON structure by adding each parameter at the highest structure level.  Parameter names and string values are included as JSON strings.  Numerical values are included as JSON numbers.  The order of parameters does not matter and can vary.

Параметри включаються в тіло відповіді HTTP з використанням типу медіа «application/json», як визначено [RFC4627]. Параметри серіалізуються в структуру JSON шляхом додавання кожного параметра на найвищому рівні структури. Імена параметрів і рядкові значення включені як рядки JSON. Числові значення включено як числа JSON. Порядок параметрів не має значення і може змінюватися.

For example:

``` http
     HTTP/1.1 400 Bad Request
     Content-Type: application/json;charset=UTF-8
     Cache-Control: no-store
     Pragma: no-cache
    
     {
       "error":"invalid_request"
     }
```

## 6. Refreshing an Access Token

If the authorization server issued a refresh token to the client, the client makes a refresh request to the token endpoint by adding the following parameters using the "application/x-www-form-urlencoded" format per Appendix B with a character encoding of UTF-8 in the HTTP request entity-body:

Якщо сервер авторизації видав клієнту маркер оновлення, клієнт надсилає запит на оновлення кінцевій точці маркера, додаючи наведені нижче параметри за допомогою формату «application/x-www-form-urlencoded» згідно з Додатком B із кодуванням символів UTF -8 у тілі сутності запиту HTTP:

grant_type - REQUIRED.  Value MUST be set to "refresh_token".

grant_type - ОБОВ'ЯЗКОВО. Значення ПОВИННО мати значення "refresh_token".

refresh_token - REQUIRED.  The refresh token issued to the client.

refresh_token - ОБОВ'ЯЗКОВО. Маркер оновлення, виданий клієнту.

scope - OPTIONAL.  The scope of the access request as described by Section 3.3.  The requested scope MUST NOT include any scope not originally granted by the resource owner, and if omitted is treated as equal to the scope originally granted by the resource owner.

сфера застосування - НЕОБОВ'ЯЗКОВО. Обсяг запиту на доступ, як описано в розділі 3.3. Запитувана область НЕ ПОВИННА включати будь-яку область, спочатку не надану власником ресурсу, і якщо вона пропущена, розглядається як рівна області, спочатку наданій власником ресурсу.

Because refresh tokens are typically long-lasting credentials used to request additional access tokens, the refresh token is bound to the client to which it was issued.  If the client type is confidential or the client was issued client credentials (or assigned other authentication requirements), the client MUST authenticate with the authorization server as described in Section 3.2.1.

Оскільки маркери оновлення зазвичай є довготривалими обліковими даними, які використовуються для запиту додаткових маркерів доступу, маркер оновлення прив’язаний до клієнта, якому його було видано. Якщо тип клієнта є конфіденційним або клієнту було видано облікові дані клієнта (або призначено інші вимоги автентифікації), клієнт ПОВИНЕН пройти автентифікацію на сервері авторизації, як описано в Розділі 3.2.1.

For example, the client makes the following HTTP request using transport-layer security (with extra line breaks for display purposes only):

Наприклад, клієнт робить наступний запит HTTP, використовуючи захист транспортного рівня (з додатковими розривами рядків лише для відображення):

``` http
  POST /token HTTP/1.1
  Host: server.example.com
  Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
  Content-Type: application/x-www-form-urlencoded

  grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
```

The authorization server MUST:

- require client authentication for confidential clients or for any client that was issued client credentials (or with other authentication requirements),

- authenticate the client if client authentication is included and ensure that the refresh token was issued to the authenticated client, and

- validate the refresh token.

Сервер авторизації ПОВИНЕН:

- вимагати автентифікації клієнта для конфіденційних клієнтів або для будь-якого клієнта, якому видано облікові дані клієнта (або з іншими вимогами автентифікації),

- автентифікувати клієнта, якщо автентифікація клієнта включена, і переконатися, що токен оновлення було видано автентифікованому клієнту, і

- підтвердити маркер оновлення.

If valid and authorized, the authorization server issues an access token as described in Section 5.1.  If the request failed verification or is invalid, the authorization server returns an error response as described in Section 5.2.

Якщо дійсний і авторизований, сервер авторизації видає маркер доступу, як описано в розділі 5.1. Якщо запит не пройшов перевірку або є недійсним, сервер авторизації повертає відповідь про помилку, як описано в розділі 5.2.

The authorization server MAY issue a new refresh token, in which case the client MUST discard the old refresh token and replace it with the new refresh token.  The authorization server MAY revoke the old refresh token after issuing a new refresh token to the client.  If a new refresh token is issued, the refresh token scope MUST be identical to that of the refresh token included by the client in the request.

Сервер авторизації МОЖЕ видати новий маркер оновлення, і в цьому випадку клієнт ПОВИНЕН відмовитися від старого маркера оновлення та замінити його новим маркером оновлення. Сервер авторизації МОЖЕ відкликати старий маркер оновлення після видачі нового маркера оновлення клієнту. Якщо видається новий маркер оновлення, область маркера оновлення ПОВИННА бути ідентичною маркеру оновлення, включеному клієнтом у запит.

## 7. Accessing Protected Resources

The client accesses protected resources by presenting the access token to the resource server.  The resource server MUST validate the access token and ensure that it has not expired and that its scope covers the requested resource.  The methods used by the resource server to validate the access token (as well as any error responses) are beyond the scope of this specification but generally involve an interaction or coordination between the resource server and the authorization server.

Клієнт отримує доступ до захищених ресурсів, надаючи маркер доступу серверу ресурсів. Сервер ресурсів ПОВИНЕН перевірити маркер доступу та переконатися, що термін його дії не минув, а його область охоплює запитуваний ресурс. Методи, які використовує сервер ресурсів для перевірки маркера доступу (а також будь-які відповіді на помилки), виходять за рамки цієї специфікації, але зазвичай передбачають взаємодію або координацію між сервером ресурсів і сервером авторизації.

The method in which the client utilizes the access token to authenticate with the resource server depends on the type of access token issued by the authorization server.  Typically, it involves using the HTTP "Authorization" request header field [RFC2617] with an authentication scheme defined by the specification of the access token type used, such as [RFC6750].

Метод, у якому клієнт використовує маркер доступу для автентифікації на сервері ресурсів, залежить від типу маркера доступу, виданого сервером авторизації. Як правило, це передбачає використання поля заголовка запиту HTTP "Авторизація" [RFC2617] зі схемою автентифікації, визначеною специфікацією використовуваного типу маркера доступу, наприклад [RFC6750].

### 7.1.  Access Token Types

The access token type provides the client with the information required to successfully utilize the access token to make a protected resource request (along with type-specific attributes).  The client MUST NOT use an access token if it does not understand the token type.

Тип маркера доступу надає клієнту інформацію, необхідну для успішного використання маркера доступу для здійснення запиту на захищений ресурс (разом із специфічними для типу атрибутами). Клієнт НЕ ПОВИНЕН використовувати маркер доступу, якщо він не розуміє тип маркера.

For example, the "bearer" token type defined in [RFC6750] is utilized by simply including the access token string in the request:

Наприклад, тип маркера «носій», визначений у [RFC6750], використовується простим додаванням рядка маркера доступу до запиту:

``` http
     GET /resource/1 HTTP/1.1
     Host: example.com
     Authorization: Bearer mF_9.B5f-4.1JqM
```

while the "mac" token type defined in [OAuth-HTTP-MAC] is utilized by issuing a Message Authentication Code (MAC) key together with the access token that is used to sign certain components of the HTTP requests:

тоді як тип маркера «mac», визначений у [OAuth-HTTP-MAC], використовується шляхом видачі ключа коду автентифікації повідомлення (MAC) разом із маркером доступу, який використовується для підпису певних компонентів HTTP-запитів:

``` http
     GET /resource/1 HTTP/1.1
     Host: example.com
     Authorization: MAC id="h480djs93hd8",
                        nonce="274312:dj83hs9s",
                        mac="kDZvddkndxvhGRXZhvuDjEWhGeE="
```

The above examples are provided for illustration purposes only. Developers are advised to consult the [RFC6750] and [OAuth-HTTP-MAC] specifications before use.

Each access token type definition specifies the additional attributes (if any) sent to the client together with the "access_token" response parameter.  It also defines the HTTP authentication method used to include the access token when making a protected resource request.

Наведені вище приклади наведені лише для ілюстрації. Перед використанням розробникам рекомендується ознайомитися зі специфікаціями [RFC6750] і [OAuth-HTTP-MAC].

Кожне визначення типу маркера доступу визначає додаткові атрибути (якщо такі є), які надсилаються клієнту разом із параметром відповіді "access_token". Він також визначає метод автентифікації HTTP, який використовується для включення маркера доступу під час виконання запиту на захищений ресурс.

### 7.2.  Error Response

If a resource access request fails, the resource server SHOULD inform the client of the error.  While the specifics of such error responses are beyond the scope of this specification, this document establishes a common registry in Section 11.4 for error values to be shared among OAuth token authentication schemes.

Якщо запит на доступ до ресурсу завершується невдачею, сервер ресурсів ПОВИНЕН повідомити клієнта про помилку. Хоча специфіка таких відповідей на помилки виходить за рамки цієї специфікації, цей документ встановлює загальний реєстр у Розділі 11.4 для значень помилок, які будуть спільно використовуватися між схемами автентифікації маркерів OAuth.

New authentication schemes designed primarily for OAuth token authentication SHOULD define a mechanism for providing an error status code to the client, in which the error values allowed are registered in the error registry established by this specification.

Нові схеми автентифікації, розроблені в основному для автентифікації маркерів OAuth, ПОВИННІ визначати механізм надання коду статусу помилки клієнту, у якому дозволені значення помилок реєструються в реєстрі помилок, встановленому цією специфікацією.

Such schemes MAY limit the set of valid error codes to a subset of the registered values.  If the error code is returned using a named parameter, the parameter name SHOULD be "error".

Такі схеми МОЖУТЬ обмежувати набір дійсних кодів помилок підмножиною зареєстрованих значень. Якщо код помилки повертається за допомогою іменованого параметра, назва параметра ПОВИННА бути "помилка".

Other schemes capable of being used for OAuth token authentication, but not primarily designed for that purpose, MAY bind their error values to the registry in the same manner.

Інші схеми, які можна використовувати для автентифікації маркерів OAuth, але не призначені для цієї мети, МОЖУТЬ прив’язувати свої значення помилок до реєстру таким же чином.

New authentication schemes MAY choose to also specify the use of the "error_description" and "error_uri" parameters to return error information in a manner parallel to their usage in this specification.

Нові схеми автентифікації МОЖУТЬ також вибрати використання параметрів "error_description" і "error_uri" для повернення інформації про помилку у спосіб, паралельний їх використанню в цій специфікації.

## 8. Extensibility

### 8.1.  Defining Access Token Types

Access token types can be defined in one of two ways: registered in the Access Token Types registry (following the procedures in Section 11.1), or by using a unique absolute URI as its name.

Типи маркерів доступу можна визначити одним із двох способів: зареєструвати в реєстрі типів маркерів доступу (дотримуючись процедур, наведених у Розділі 11.1), або використовуючи унікальний абсолютний URI як назву.

Types utilizing a URI name SHOULD be limited to vendor-specific implementations that are not commonly applicable, and are specific to the implementation details of the resource server where they are used.

Типи, які використовують ім’я URI, ПОВИННІ обмежуватися реалізаціями певного постачальника, які зазвичай не застосовуються, і є специфічними для деталей реалізації сервера ресурсів, де вони використовуються.

All other types MUST be registered.  Type names MUST conform to the type-name ABNF.  If the type definition includes a new HTTP authentication scheme, the type name SHOULD be identical to the HTTP authentication scheme name (as defined by [RFC2617]).  The token type "example" is reserved for use in examples.

Усі інші типи ПОВИННІ бути зареєстровані. Імена типів ПОВИННІ відповідати імені типу ABNF. Якщо визначення типу включає нову схему автентифікації HTTP, назва типу ПОВИННА бути ідентичною назві схеми автентифікації HTTP (як визначено [RFC2617]). Тип маркера "приклад" зарезервовано для використання в прикладах.

```http
 type-name  = 1*name-char
 name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

### 8.2.  Defining New Endpoint Parameters

New request or response parameters for use with the authorization endpoint or the token endpoint are defined and registered in the OAuth Parameters registry following the procedure in Section 11.2.

Нові параметри запиту або відповіді для використання з кінцевою точкою авторизації або кінцевою точкою маркера визначаються та реєструються в реєстрі параметрів OAuth відповідно до процедури, описаної в Розділі 11.2.

Parameter names MUST conform to the param-name ABNF, and parameter values syntax MUST be well-defined (e.g., using ABNF, or a reference to the syntax of an existing parameter).

Імена параметрів ПОВИННІ відповідати назві параметрів ABNF, а синтаксис значень параметрів ПОВИНЕН бути чітко визначеним (наприклад, використовувати ABNF або посилання на синтаксис існуючого параметра).

```http
 param-name  = 1*name-char
 name-char   = "-" / "." / "_" / DIGIT / ALPHA
```

Unregistered vendor-specific parameter extensions that are not commonly applicable and that are specific to the implementation details of the authorization server where they are used SHOULD utilize a vendor-specific prefix that is not likely to conflict with other registered values (e.g., begin with 'companyname_').

Незареєстровані розширення параметрів постачальника, які зазвичай не застосовуються та які є специфічними для деталей реалізації сервера авторизації, де вони використовуються, ПОВИННІ використовувати префікс постачальника, який не конфліктуватиме з іншими зареєстрованими значеннями (наприклад, починатися з ' Назва компанії_').

### 8.3.  Defining New Authorization Grant Types

New authorization grant types can be defined by assigning them a unique absolute URI for use with the "grant_type" parameter.  If the extension grant type requires additional token endpoint parameters, they MUST be registered in the OAuth Parameters registry as described by Section 11.2.

Нові типи надання авторизації можна визначити, призначивши їм унікальний абсолютний URI для використання з параметром "grant_type". Якщо для типу надання розширення потрібні додаткові параметри кінцевої точки маркера, їх ПОВИННО реєструвати в реєстрі параметрів OAuth, як описано в розділі 11.2.

### 8.4.  Defining New Authorization Endpoint Response Types

New response types for use with the authorization endpoint are defined and registered in the Authorization Endpoint Response Types registry following the procedure in Section 11.3.  Response type names MUST conform to the response-type ABNF.

Нові типи відповідей для використання з кінцевою точкою авторизації визначаються та реєструються в реєстрі типів відповідей кінцевої точки авторизації згідно з процедурою, наведеною в розділі 11.3. Назви типів відповідей ПОВИННІ відповідати типу відповіді ABNF.

``` http
     response-type  = response-name *( SP response-name )
     response-name  = 1*response-char
     response-char  = "_" / DIGIT / ALPHA
```

If a response type contains one or more space characters (%x20), it is compared as a space-delimited list of values in which the order of values does not matter.  Only one order of values can be registered, which covers all other arrangements of the same set of values.

Якщо тип відповіді містить один або кілька пробілів (%x20), він порівнюється як розділений пробілами список значень, у якому порядок значень не має значення. Можна зареєструвати лише один порядок значень, який охоплює всі інші розташування того самого набору значень.

For example, the response type "token code" is left undefined by this specification.  However, an extension can define and register the "token code" response type.  Once registered, the same combination cannot be registered as "code token", but both values can be used to denote the same response type.

Наприклад, тип відповіді «код маркера» не визначений цією специфікацією. Однак розширення може визначити та зареєструвати тип відповіді «код маркера». Після реєстрації ту саму комбінацію не можна зареєструвати як «токен коду», але обидва значення можна використовувати для позначення одного типу відповіді.

### 8.5.  Defining Additional Error Codes

In cases where protocol extensions (i.e., access token types, extension parameters, or extension grant types) require additional error codes to be used with the authorization code grant error response (Section 4.1.2.1), the implicit grant error response (Section 4.2.2.1), the token error response (Section 5.2), or the resource access  error response (Section 7.2), such error codes MAY be defined.

У випадках, коли розширення протоколу (тобто типи маркерів доступу, параметри розширення або типи надання розширення) вимагають використання додаткових кодів помилок із відповіддю на помилку надання коду авторизації (розділ 4.1.2.1), відповідь на помилку неявного надання (розділ 4.2. 2.1), відповідь на помилку маркера (Розділ 5.2) або відповідь на помилку доступу до ресурсу (Розділ 7.2), такі коди помилок МОЖУТЬ бути визначені.

Extension error codes MUST be registered (following the procedures in Section 11.4) if the extension they are used in conjunction with is a registered access token type, a registered endpoint parameter, or an extension grant type.  Error codes used with unregistered extensions MAY be registered.

Коди помилок розширення ПОВИННІ реєструватися (дотримуючись процедур, наведених у Розділі 11.4), якщо розширення, з яким вони використовуються разом, є зареєстрованим типом маркера доступу, зареєстрованим параметром кінцевої точки або типом надання розширення. Коди помилок, які використовуються з незареєстрованими розширеннями, МОЖУТЬ бути зареєстровані.

Error codes MUST conform to the error ABNF and SHOULD be prefixed by an identifying name when possible.  For example, an error identifying an invalid value set to the extension parameter "example" SHOULD be named "example_invalid".

Коди помилок ПОВИННІ відповідати помилці ABNF і МАЮТЬ мати префікс ідентифікаційної назви, коли це можливо. Наприклад, помилку, яка ідентифікує недійсне значення для параметра розширення "example", ПОВИННО мати назву "example_invalid".

``` http
     error      = 1*error-char
     error-char = %x20-21 / %x23-5B / %x5D-7E
```

## 9. Native Applications

Native applications are clients installed and executed on the device used by the resource owner (i.e., desktop application, native mobile application).  Native applications require special consideration related to security, platform capabilities, and overall end-user experience.

Власні програми — це клієнти, встановлені та запущені на пристрої, яким користується власник ресурсу (наприклад, настільна програма, рідна мобільна програма). Власні програми потребують особливої уваги щодо безпеки, можливостей платформи та загального досвіду кінцевого користувача.

The authorization endpoint requires interaction between the client and the resource owner's user-agent.  Native applications can invoke an external user-agent or embed a user-agent within the application. For example:

Кінцева точка авторизації вимагає взаємодії між клієнтом і агентом користувача власника ресурсу. Рідні програми можуть викликати зовнішній агент користувача або вбудовувати агента користувача в програму. Наприклад:

- External user-agent - the native application can capture the response from the authorization server using a redirection URI with a scheme registered with the operating system to invoke the client as the handler, manual copy-and-paste of the credentials, running a local web server, installing a user-agent extension, or by providing a redirection URI identifying a server-hosted resource under the client's control, which in turn makes the response available to the native application.

- Embedded user-agent - the native application obtains the response by directly communicating with the embedded user-agent by monitoring state changes emitted during the resource load, or accessing the user-agent's cookies storage.

- Зовнішній агент користувача - рідна програма може отримувати відповідь від сервера авторизації за допомогою URI перенаправлення зі схемою, зареєстрованою в операційній системі, щоб викликати клієнта як обробника, ручне копіювання та вставлення облікових даних, запуск локального веб-сервер, установивши розширення агента користувача або надаючи URI перенаправлення, що ідентифікує розміщений на сервері ресурс під контролем клієнта, що, у свою чергу, робить відповідь доступною для рідної програми.

- Вбудований агент користувача – власна програма отримує відповідь шляхом безпосереднього зв’язку з вбудованим агентом користувача, відстежуючи зміни стану, що видаються під час завантаження ресурсу, або звертаючись до сховища файлів cookie агента користувача.

When choosing between an external or embedded user-agent, developers should consider the following:

- An external user-agent may improve completion rate, as the resource owner may already have an active session with the authorization server, removing the need to re-authenticate.  It provides a familiar end-user experience and functionality.  The resource owner may also rely on user-agent features or extensions to assist with authentication (e.g., password manager, 2-factor device reader).

- An embedded user-agent may offer improved usability, as it removes the need to switch context and open new windows.

- An embedded user-agent poses a security challenge because resource owners are authenticating in an unidentified window without access to the visual protections found in most external user-agents.  An embedded user-agent educates end-users to trust unidentified requests for authentication (making phishing attacks easier to execute).

Вибираючи між зовнішнім або вбудованим агентом користувача, розробники повинні враховувати наступне:

- Зовнішній агент користувача може покращити швидкість завершення, оскільки власник ресурсу може вже мати активний сеанс із сервером авторизації, усуваючи необхідність повторної автентифікації. Він забезпечує знайомий кінцевому користувачеві досвід і функціональність. Власник ресурсу також може покладатися на функції або розширення користувача-агента для допомоги в автентифікації (наприклад, менеджер паролів, двофакторний зчитувач пристрою).

- Вбудований агент користувача може запропонувати покращену зручність використання, оскільки він усуває необхідність перемикати контекст і відкривати нові вікна.

- Вбудований агент користувача створює проблему безпеці, оскільки власники ресурсів проходять автентифікацію в неідентифікованому вікні без доступу до візуального захисту, наявного в більшості зовнішніх агентів користувача. Вбудований агент користувача навчає кінцевих користувачів довіряти неідентифікованим запитам на автентифікацію (полегшуючи виконання фішингових атак).

When choosing between the implicit grant type and the authorization code grant type, the following should be considered:

- Native applications that use the authorization code grant type SHOULD do so without using client credentials, due to the native application's inability to keep client credentials confidential.

- When using the implicit grant type flow, a refresh token is not returned, which requires repeating the authorization process once the access token expires.

Вибираючи між неявним типом надання та типом надання коду авторизації, слід враховувати наступне:

- Власні програми, які використовують тип надання коду авторизації, ПОВИННІ робити це без використання облікових даних клієнта, оскільки власна програма не здатна зберегти конфіденційність облікових даних клієнта.

- Під час використання потоку неявного типу надання маркер оновлення не повертається, що вимагає повторення процесу авторизації після закінчення терміну дії маркера доступу.

## 10. Security Considerations

As a flexible and extensible framework, OAuth's security considerations depend on many factors.  The following sections provide implementers with security guidelines focused on the three client profiles described in Section 2.1: web application, user-agent-based application, and native application.

A comprehensive OAuth security model and analysis, as well as background for the protocol design, is provided by [OAuth-THREATMODEL].

Оскільки OAuth є гнучкою та розширюваною структурою, питання безпеки залежать від багатьох факторів. У наступних розділах розробникам надано вказівки щодо безпеки, зосереджені на трьох профілях клієнтів, описаних у Розділі 2.1: веб-програма, програма на основі агента користувача та рідна програма.

[OAuth-THREATMODEL] надає комплексну модель безпеки OAuth і її аналіз, а також фон для розробки протоколу.

### 10.1.  Client Authentication

The authorization server establishes client credentials with web application clients for the purpose of client authentication.  The authorization server is encouraged to consider stronger client authentication means than a client password.  Web application clients MUST ensure confidentiality of client passwords and other client credentials.

Сервер авторизації встановлює облікові дані клієнта з клієнтами веб-додатків з метою автентифікації клієнта. Серверу авторизації рекомендується розглянути більш надійні засоби автентифікації клієнта, ніж пароль клієнта. Клієнти веб-додатків ПОВИННІ забезпечити конфіденційність паролів клієнта та інших облікових даних клієнта.

The authorization server MUST NOT issue client passwords or other client credentials to native application or user-agent-based application clients for the purpose of client authentication.  The authorization server MAY issue a client password or other credentials for a specific installation of a native application client on a specific device.

Сервер авторизації НЕ ПОВИНЕН видавати клієнтські паролі чи інші облікові дані клієнтам рідної програми або клієнтської програми на основі агента користувача з метою автентифікації клієнта. Сервер авторизації МОЖЕ видати пароль клієнта або інші облікові дані для конкретного встановлення клієнта рідної програми на певному пристрої.

When client authentication is not possible, the authorization server SHOULD employ other means to validate the client's identity -- for example, by requiring the registration of the client redirection URI or enlisting the resource owner to confirm identity.  A valid redirection URI is not sufficient to verify the client's identity when asking for resource owner authorization but can be used to prevent delivering credentials to a counterfeit client after obtaining resource owner authorization.

Якщо автентифікація клієнта неможлива, сервер авторизації ПОВИНЕН використовувати інші засоби для підтвердження ідентичності клієнта, наприклад, вимагаючи реєстрації URI перенаправлення клієнта або залучаючи власника ресурсу для підтвердження ідентичності. Дійсного URI перенаправлення недостатньо для перевірки особи клієнта під час запиту авторизації власника ресурсу, але його можна використовувати для запобігання доставці облікових даних підробленому клієнту після отримання авторизації власника ресурсу.

The authorization server must consider the security implications of interacting with unauthenticated clients and take measures to limit the potential exposure of other credentials (e.g., refresh tokens) issued to such clients.

Сервер авторизації повинен враховувати наслідки безпеки взаємодії з неавтентифікованими клієнтами та вживати заходів для обмеження потенційного впливу інших облікових даних (наприклад, маркерів оновлення), виданих таким клієнтам.

### 10.2.  Client Impersonation

A malicious client can impersonate another client and obtain access to protected resources if the impersonated client fails to, or is unable to, keep its client credentials confidential.

Зловмисний клієнт може видати себе за іншого клієнта та отримати доступ до захищених ресурсів, якщо імітований клієнт не зможе або не зможе зберегти конфіденційність своїх облікових даних клієнта.

The authorization server MUST authenticate the client whenever possible.  If the authorization server cannot authenticate the client due to the client's nature, the authorization server MUST require the registration of any redirection URI used for receiving authorization responses and SHOULD utilize other means to protect resource owners from such potentially malicious clients.  For example, the authorization server can engage the resource owner to assist in identifying the client and its origin.

Сервер авторизації ПОВИНЕН автентифікувати клієнта, коли це можливо. Якщо сервер авторизації не може автентифікувати клієнта через природу клієнта, сервер авторизації ПОВИНЕН вимагати реєстрації будь-якого URI перенаправлення, який використовується для отримання відповідей авторизації, і ПОВИНЕН використовувати інші засоби для захисту власників ресурсів від таких потенційно зловмисних клієнтів. Наприклад, сервер авторизації може залучати власника ресурсу для допомоги в ідентифікації клієнта та його походження.

The authorization server SHOULD enforce explicit resource owner authentication and provide the resource owner with information about the client and the requested authorization scope and lifetime.  It is up to the resource owner to review the information in the context of the current client and to authorize or deny the request.

Сервер авторизації ПОВИНЕН запроваджувати явну автентифікацію власника ресурсу та надавати власнику ресурсу інформацію про клієнта та запитаний обсяг авторизації та термін дії. Власник ресурсу має перевірити інформацію в контексті поточного клієнта та дозволити або відхилити запит.

The authorization server SHOULD NOT process repeated authorization requests automatically (without active resource owner interaction) without authenticating the client or relying on other measures to ensure that the repeated request comes from the original client and not an impersonator.

Сервер авторизації НЕ СЛІД обробляти повторні запити авторизації автоматично (без активної взаємодії власника ресурсу) без автентифікації клієнта або покладаючись на інші заходи, щоб переконатися, що повторний запит надходить від оригінального клієнта, а не від імітатора.

### 10.3.  Access Tokens

Access token credentials (as well as any confidential access token attributes) MUST be kept confidential in transit and storage, and only shared among the authorization server, the resource servers the access token is valid for, and the client to whom the access token is issued.  Access token credentials MUST only be transmitted using TLS as described in Section 1.6 with server authentication as defined by [RFC2818].

Облікові дані маркера доступу (а також будь-які конфіденційні атрибути маркера доступу) ПОВИННІ залишатися конфіденційними під час передачі та зберігання та надаватися лише між сервером авторизації, серверами ресурсів, для яких дійсний маркер доступу, і клієнтом, якому видано маркер доступу . Облікові дані маркера доступу ПОВИННІ передаватись лише за допомогою TLS, як описано в розділі 1.6, із автентифікацією сервера, як визначено [RFC2818].

When using the implicit grant type, the access token is transmitted in the URI fragment, which can expose it to unauthorized parties.

При використанні неявного типу надання маркер доступу передається у фрагменті URI, що може відкрити його для неавторизованих сторін.

The authorization server MUST ensure that access tokens cannot be generated, modified, or guessed to produce valid access tokens by unauthorized parties.

Сервер авторизації ПОВИНЕН гарантувати, що маркери доступу не можуть бути згенеровані, змінені або вгадані для створення дійсних маркерів доступу неавторизованими сторонами.

The client SHOULD request access tokens with the minimal scope necessary.  The authorization server SHOULD take the client identity into account when choosing how to honor the requested scope and MAY issue an access token with less rights than requested.

Клієнт СЛІД запросити маркери доступу з мінімально необхідним обсягом. Сервер авторизації СЛІД брати до уваги ідентифікаційну інформацію клієнта, вибираючи спосіб виконання запитуваної області, і МОЖЕ видати маркер доступу з меншими правами, ніж запитувано.

This specification does not provide any methods for the resource server to ensure that an access token presented to it by a given client was issued to that client by the authorization server.

Ця специфікація не надає жодних методів для сервера ресурсів, щоб гарантувати, що маркер доступу, представлений йому даним клієнтом, був виданий цьому клієнту сервером авторизації.

### 10.4.  Refresh Tokens

Authorization servers MAY issue refresh tokens to web application clients and native application clients.

Refresh tokens MUST be kept confidential in transit and storage, and shared only among the authorization server and the client to whom the refresh tokens were issued.  The authorization server MUST maintain the binding between a refresh token and the client to whom it was issued.  Refresh tokens MUST only be transmitted using TLS as described in Section 1.6 with server authentication as defined by [RFC2818].

Сервери авторизації МОЖУТЬ видавати маркери оновлення клієнтам веб-додатків і клієнтам власних додатків.

Маркери оновлення ПОВИННІ залишатися конфіденційними під час передачі та зберігання, а також надаватися лише між сервером авторизації та клієнтом, якому видано маркери оновлення. Сервер авторизації ПОВИНЕН підтримувати прив’язку між маркером оновлення та клієнтом, якому він був виданий. Маркери оновлення ПОВИННІ передаватись лише за допомогою TLS, як описано в розділі 1.6, із автентифікацією сервера, як визначено [RFC2818].

The authorization server MUST verify the binding between the refresh token and client identity whenever the client identity can be authenticated.  When client authentication is not possible, the authorization server SHOULD deploy other means to detect refresh token abuse.

Сервер авторизації ПОВИНЕН перевіряти зв’язок між маркером оновлення та ідентифікатором клієнта щоразу, коли ідентифікатор клієнта може бути автентифікований. Якщо автентифікація клієнта неможлива, сервер авторизації СЛІД розгорнути інші засоби для виявлення зловживання маркером оновлення.

For example, the authorization server could employ refresh token rotation in which a new refresh token is issued with every access token refresh response.  The previous refresh token is invalidated but retained by the authorization server.  If a refresh token is compromised and subsequently used by both the attacker and the legitimate client, one of them will present an invalidated refresh token, which will inform the authorization server of the breach.

Наприклад, сервер авторизації може використовувати чергування маркерів оновлення, при якому новий маркер оновлення видається з кожною відповіддю на оновлення маркера доступу. Попередній маркер оновлення стає недійсним, але зберігається сервером авторизації. Якщо токен оновлення скомпрометований і згодом використовується як зловмисником, так і законним клієнтом, один із них представить недійсний токен оновлення, який повідомить сервер авторизації про злом.

The authorization server MUST ensure that refresh tokens cannot be generated, modified, or guessed to produce valid refresh tokens by unauthorized parties.

Сервер авторизації ПОВИНЕН гарантувати, що маркери оновлення не можуть бути згенеровані, змінені або вгадані для створення дійсних маркерів оновлення неавторизованими сторонами.

### 10.5.  Authorization Codes

The transmission of authorization codes SHOULD be made over a secure channel, and the client SHOULD require the use of TLS with its redirection URI if the URI identifies a network resource.  Since authorization codes are transmitted via user-agent redirections, they could potentially be disclosed through user-agent history and HTTP referrer headers.

Передача кодів авторизації ПОВИННА здійснюватися через захищений канал, і клієнт ПОВИНЕН вимагати використання TLS з його URI перенаправлення, якщо URI ідентифікує мережевий ресурс. Оскільки коди авторизації передаються через переспрямування агента користувача, вони потенційно можуть бути розкриті через історію агента користувача та заголовки реферера HTTP.

Authorization codes operate as plaintext bearer credentials, used to verify that the resource owner who granted authorization at the authorization server is the same resource owner returning to the client to complete the process.  Therefore, if the client relies on the authorization code for its own resource owner authentication, the client redirection endpoint MUST require the use of TLS.

Коди авторизації працюють як облікові дані відкритого тексту, які використовуються для перевірки того, що власник ресурсу, який надав авторизацію на сервері авторизації, є тим самим власником ресурсу, який повертається до клієнта для завершення процесу. Таким чином, якщо клієнт покладається на код авторизації для власної автентифікації власника ресурсу, кінцева точка перенаправлення клієнта ПОВИННА вимагати використання TLS.

Authorization codes MUST be short lived and single-use.  If the authorization server observes multiple attempts to exchange an authorization code for an access token, the authorization server SHOULD attempt to revoke all access tokens already granted based on the compromised authorization code.

Коди авторизації ПОВИННІ бути короткостроковими та одноразовими. Якщо сервер авторизації спостерігає численні спроби обміну кодом авторизації на маркер доступу, сервер авторизації ПОВИНЕН спробувати відкликати всі вже надані маркери доступу на основі скомпрометованого коду авторизації.

If the client can be authenticated, the authorization servers MUST authenticate the client and ensure that the authorization code was issued to the same client.

Якщо клієнта можна автентифікувати, сервери авторизації ПОВИННІ автентифікувати клієнта та переконатися, що код авторизації було видано тому самому клієнту.

### 10.6.  Authorization Code Redirection URI Manipulation

When requesting authorization using the authorization code grant type, the client can specify a redirection URI via the "redirect_uri" parameter.  If an attacker can manipulate the value of the redirection URI, it can cause the authorization server to redirect the resource owner user-agent to a URI under the control of the attacker with the authorization code.

Під час запиту авторизації за допомогою типу надання коду авторизації клієнт може вказати URI перенаправлення за допомогою параметра "redirect_uri". Якщо зловмисник може маніпулювати значенням URI перенаправлення, це може призвести до того, що сервер авторизації перенаправить агента користувача власника ресурсу на URI під контролем зловмисника з кодом авторизації.

An attacker can create an account at a legitimate client and initiate the authorization flow.  When the attacker's user-agent is sent to the authorization server to grant access, the attacker grabs the authorization URI provided by the legitimate client and replaces the client's redirection URI with a URI under the control of the attacker.  The attacker then tricks the victim into following the manipulated link to authorize access to the legitimate client.

Зловмисник може створити обліковий запис у законного клієнта та розпочати процес авторизації. Коли агент користувача зловмисника надсилається на сервер авторизації для надання доступу, зловмисник отримує URI авторизації, наданий легітимним клієнтом, і замінює URI перенаправлення клієнта на URI під контролем зловмисника. Потім зловмисник обманом змушує жертву перейти за маніпульованим посиланням, щоб авторизувати доступ до законного клієнта.

Once at the authorization server, the victim is prompted with a normal, valid request on behalf of a legitimate and trusted client, and authorizes the request.  The victim is then redirected to an endpoint under the control of the attacker with the authorization code.  The attacker completes the authorization flow by sending the authorization code to the client using the original redirection URI provided by the client.  The client exchanges the authorization code with an access token and links it to the attacker's client account, which can now gain access to the protected resources authorized by the victim (via the client).

Опинившись на сервері авторизації, жертва отримує звичайний дійсний запит від імені законного та довіреного клієнта та авторизує запит. Потім жертва перенаправляється до кінцевої точки під контролем зловмисника з кодом авторизації. Зловмисник завершує процес авторизації, надсилаючи код авторизації клієнту за допомогою оригінального URI перенаправлення, наданого клієнтом. Клієнт обмінюється кодом авторизації з маркером доступу та пов’язує його з обліковим записом клієнта зловмисника, який тепер може отримати доступ до захищених ресурсів, авторизованих жертвою (через клієнта).

In order to prevent such an attack, the authorization server MUST ensure that the redirection URI used to obtain the authorization code is identical to the redirection URI provided when exchanging the authorization code for an access token.  The authorization server MUST require public clients and SHOULD require confidential clients to register their redirection URIs.  If a redirection URI is provided in the request, the authorization server MUST validate it against the registered value.

Щоб запобігти такій атаці, сервер авторизації ПОВИНЕН переконатися, що URI перенаправлення, який використовується для отримання коду авторизації, ідентичний URI перенаправлення, наданому під час обміну кодом авторизації на маркер доступу. Сервер авторизації ПОВИНЕН вимагати загальнодоступних клієнтів і ПОВИНЕН вимагати від конфіденційних клієнтів реєстрації своїх URI перенаправлення. Якщо URI перенаправлення надано в запиті, сервер авторизації ПОВИНЕН перевірити його на відповідність зареєстрованому значенню.

### 10.7.  Resource Owner Password Credentials

The resource owner password credentials grant type is often used for legacy or migration reasons.  It reduces the overall risk of storing usernames and passwords by the client but does not eliminate the need to expose highly privileged credentials to the client.

Тип надання облікових даних для пароля власника ресурсу часто використовується з причин успадкування або міграції. Це зменшує загальний ризик збереження імен користувачів і паролів клієнтом, але не позбавляє від необхідності надавати клієнту облікові дані з високим ступенем привілейованого доступу.

This grant type carries a higher risk than other grant types because it maintains the password anti-pattern this protocol seeks to avoid. The client could abuse the password, or the password could unintentionally be disclosed to an attacker (e.g., via log files or other records kept by the client).

Цей тип дозволу несе в собі більший ризик, ніж інші типи дозволу, оскільки він зберігає антишаблон пароля, якого цей протокол прагне уникнути. Клієнт може зловживати паролем або пароль може бути ненавмисно розкритий зловмиснику (наприклад, через файли журналу чи інші записи, які зберігає клієнт).

Additionally, because the resource owner does not have control over the authorization process (the resource owner's involvement ends when it hands over its credentials to the client), the client can obtain access tokens with a broader scope than desired by the resource owner.  The authorization server should consider the scope and lifetime of access tokens issued via this grant type.

Крім того, оскільки власник ресурсу не контролює процес авторизації (участь власника ресурсу закінчується, коли він передає свої облікові дані клієнту), клієнт може отримати маркери доступу з ширшим обсягом, ніж того хоче власник ресурсу. Сервер авторизації повинен враховувати обсяг і термін дії маркерів доступу, виданих через цей тип надання.

The authorization server and client SHOULD minimize use of this grant type and utilize other grant types whenever possible.

Сервер авторизації та клієнт СЛІД мінімізувати використання цього типу дозволу та використовувати інші типи дозволу, коли це можливо.

### 10.8.  Request Confidentiality

Access tokens, refresh tokens, resource owner passwords, and client credentials MUST NOT be transmitted in the clear.  Authorization codes SHOULD NOT be transmitted in the clear.

Маркери доступу, маркери оновлення, паролі власників ресурсів і облікові дані клієнта НЕ ПОВИННІ передаватись у відкритому вигляді. Коди авторизації НЕ СЛІД передавати у відкритому вигляді.

The "state" and "scope" parameters SHOULD NOT include sensitive client or resource owner information in plain text, as they can be transmitted over insecure channels or stored insecurely.

Параметри "state" і "scope" НЕ ПОВИННІ включати конфіденційну інформацію про клієнта або власника ресурсу у вигляді звичайного тексту, оскільки вони можуть передаватися через незахищені канали або зберігатися в незахищених умовах.

### 10.9.  Ensuring Endpoint Authenticity

In order to prevent man-in-the-middle attacks, the authorization server MUST require the use of TLS with server authentication as defined by [RFC2818] for any request sent to the authorization and token endpoints.  The client MUST validate the authorization server's TLS certificate as defined by [RFC6125] and in accordance with its requirements for server identity authentication.

Щоб запобігти атакам типу "людина посередині", сервер авторизації ПОВИНЕН вимагати використання TLS з автентифікацією сервера, як визначено [RFC2818] для будь-якого запиту, надісланого до кінцевих точок авторизації та маркерів. Клієнт ПОВИНЕН підтвердити сертифікат TLS сервера авторизації, як визначено в [RFC6125] і відповідно до його вимог щодо автентифікації сервера.

### 10.10.  Credentials-Guessing Attacks

The authorization server MUST prevent attackers from guessing access tokens, authorization codes, refresh tokens, resource owner passwords, and client credentials.

Сервер авторизації ПОВИНЕН перешкоджати зловмисникам вгадувати маркери доступу, коди авторизації, маркери оновлення, паролі власників ресурсів і облікові дані клієнта.

The probability of an attacker guessing generated tokens (and other credentials not intended for handling by end-users) MUST be less than or equal to 2^(-128) and SHOULD be less than or equal to 2^(-160).

Імовірність того, що зловмисник вгадає згенеровані токени (та інші облікові дані, не призначені для обробки кінцевими користувачами), ПОВИННА бути меншою або дорівнювати 2^(-128) і ПОВИННА бути меншою або дорівнювати 2^(-160).

The authorization server MUST utilize other means to protect credentials intended for end-user usage.

Сервер авторизації ПОВИНЕН використовувати інші засоби для захисту облікових даних, призначених для використання кінцевим користувачем.

### 10.11.  Phishing Attacks

Wide deployment of this and similar protocols may cause end-users to become inured to the practice of being redirected to websites where they are asked to enter their passwords.  If end-users are not careful to verify the authenticity of these websites before entering their credentials, it will be possible for attackers to exploit this practice to steal resource owners' passwords.

Широке розгортання цього та подібних протоколів може призвести до того, що кінцеві користувачі звикнуть до практики перенаправлення на веб-сайти, де їх просять ввести свої паролі. Якщо кінцеві користувачі не будуть ретельно перевіряти автентичність цих веб-сайтів перед введенням своїх облікових даних, зловмисники зможуть використати цю практику, щоб викрасти паролі власників ресурсів.

Service providers should attempt to educate end-users about the risks phishing attacks pose and should provide mechanisms that make it easy for end-users to confirm the authenticity of their sites.  Client developers should consider the security implications of how they interact with the user-agent (e.g., external, embedded), and the ability of the end-user to verify the authenticity of the authorization server.

Постачальники послуг повинні намагатися інформувати кінцевих користувачів про ризики фішингових атак і повинні надавати механізми, які полегшують кінцевим користувачам підтвердження автентичності їхніх сайтів. Розробники клієнта повинні враховувати наслідки для безпеки того, як вони взаємодіють із агентом користувача (наприклад, зовнішнім, вбудованим), і здатність кінцевого користувача перевірити автентичність сервера авторизації.

To reduce the risk of phishing attacks, the authorization servers MUST require the use of TLS on every endpoint used for end-user interaction.

Щоб зменшити ризик фішингових атак, сервери авторизації ПОВИННІ вимагати використання TLS на кожній кінцевій точці, яка використовується для взаємодії з кінцевим користувачем.

### 10.12.  Cross-Site Request Forgery

Cross-site request forgery (CSRF) is an exploit in which an attacker causes the user-agent of a victim end-user to follow a malicious URI (e.g., provided to the user-agent as a misleading link, image, or redirection) to a trusting server (usually established via the presence of a valid session cookie).

Підробка міжсайтового запиту (CSRF) — це експлойт, у якому зловмисник змушує агента користувача кінцевого користувача-жертви переходити за зловмисним URI (наприклад, наданим агенту користувача як оманливе посилання, зображення або переспрямування). на надійний сервер (зазвичай встановлюється через наявність дійсного файлу cookie сесії).

A CSRF attack against the client's redirection URI allows an attacker to inject its own authorization code or access token, which can result in the client using an access token associated with the attacker's protected resources rather than the victim's (e.g., save the victim's bank account information to a protected resource controlled by the attacker).

Атака CSRF на URI перенаправлення клієнта дозволяє зловмиснику впровадити власний код авторизації або маркер доступу, що може призвести до використання клієнтом маркера доступу, пов’язаного із захищеними ресурсами зловмисника, а не з ресурсами жертви (наприклад, зберегти інформацію про банківський рахунок жертви). на захищений ресурс, контрольований зловмисником).

The client MUST implement CSRF protection for its redirection URI. This is typically accomplished by requiring any request sent to the redirection URI endpoint to include a value that binds the request to the user-agent's authenticated state (e.g., a hash of the session cookie used to authenticate the user-agent).  The client SHOULD utilize the "state" request parameter to deliver this value to the authorization server when making an authorization request.

Клієнт ПОВИНЕН реалізувати захист CSRF для свого URI перенаправлення. Зазвичай це досягається шляхом вимоги до будь-якого запиту, надісланого до кінцевої точки URI перенаправлення, включати значення, яке прив’язує запит до автентифікованого стану агента користувача (наприклад, хеш файлу cookie сеансу, який використовується для автентифікації агента користувача). Клієнт СЛІД використовувати параметр запиту "state", щоб доставити це значення на сервер авторизації під час виконання запиту авторизації.

Once authorization has been obtained from the end-user, the authorization server redirects the end-user's user-agent back to the client with the required binding value contained in the "state" parameter.  The binding value enables the client to verify the validity of the request by matching the binding value to the user-agent's authenticated state.  The binding value used for CSRF protection MUST contain a non-guessable value (as described in Section 10.10), and the user-agent's authenticated state (e.g., session cookie, HTML5 local storage) MUST be kept in a location accessible only to the client and the user-agent (i.e., protected by same-origin policy).

Після отримання авторизації від кінцевого користувача сервер авторизації перенаправляє агента користувача кінцевого користувача назад до клієнта з необхідним значенням прив’язки, що міститься в параметрі «state». Значення прив’язки дозволяє клієнту перевірити дійсність запиту, зіставивши значення прив’язки до стану автентифікації агента користувача. Значення прив’язки, що використовується для захисту CSRF, ПОВИННО містити значення, яке неможливо вгадати (як описано в Розділі 10.10), а автентифікований стан агента користувача (наприклад, cookie сеансу, локальне сховище HTML5) ПОВИНЕН зберігатися в місці, доступному лише для клієнта. і агент користувача (тобто захищений політикою того самого походження).

A CSRF attack against the authorization server's authorization endpoint can result in an attacker obtaining end-user authorization for a malicious client without involving or alerting the end-user.

Атака CSRF на кінцеву точку авторизації сервера авторизації може призвести до того, що зловмисник отримає авторизацію кінцевого користувача для зловмисного клієнта без залучення або сповіщення кінцевого користувача.

The authorization server MUST implement CSRF protection for its authorization endpoint and ensure that a malicious client cannot obtain authorization without the awareness and explicit consent of the resource owner.

Сервер авторизації ПОВИНЕН реалізувати захист CSRF для своєї кінцевої точки авторизації та гарантувати, що зловмисний клієнт не зможе отримати авторизацію без відома та явної згоди власника ресурсу.

### 10.13.  Clickjacking

In a clickjacking attack, an attacker registers a legitimate client and then constructs a malicious site in which it loads the authorization server's authorization endpoint web page in a transparent iframe overlaid on top of a set of dummy buttons, which are carefully constructed to be placed directly under important buttons on the authorization page.  When an end-user clicks a misleading visible button, the end-user is actually clicking an invisible button on the authorization page (such as an "Authorize" button).  This allows an attacker to trick a resource owner into granting its client access without the end-user's knowledge.

Під час атаки клікджекінг зловмисник реєструє законного клієнта, а потім створює шкідливий сайт, на якому завантажує веб-сторінку кінцевої точки авторизації сервера авторизації в прозорому iframe, накладеному поверх набору фіктивних кнопок, ретельно розроблених для розміщення безпосередньо під важливими кнопками на сторінці авторизації. Коли кінцевий користувач натискає оманливу видиму кнопку, він насправді натискає невидиму кнопку на сторінці авторизації (наприклад, кнопку «Авторизувати»). Це дозволяє зловмиснику обманом змусити власника ресурсу надати клієнту доступ без відома кінцевого користувача.

To prevent this form of attack, native applications SHOULD use external browsers instead of embedding browsers within the application when requesting end-user authorization.  For most newer browsers, avoidance of iframes can be enforced by the authorization server using the (non-standard) "x-frame-options" header.  This header can have two values, "deny" and "sameorigin", which will block any framing, or framing by sites with a different origin, respectively.  For older browsers, JavaScript frame-busting techniques can be used but may not be effective in all browsers.

Щоб запобігти такій формі атаки, власним програмам СЛІД використовувати зовнішні браузери замість того, щоб вбудовувати браузери в програму, коли запитують авторизацію кінцевого користувача. Для більшості новіших браузерів уникнення iframes може бути виконано сервером авторизації за допомогою (нестандартного) заголовка "x-frame-options". Цей заголовок може мати два значення, "deny" і "sameorigin", які блокуватимуть будь-яке фреймування або фреймування сайтами з іншим походженням відповідно. Для старіших браузерів можна використовувати методи блокування фреймів JavaScript, але вони можуть бути ефективними не в усіх браузерах.

### 10.14.  Code Injection and Input Validation

A code injection attack occurs when an input or otherwise external variable is used by an application unsanitized and causes modification to the application logic.  This may allow an attacker to gain access to the application device or its data, cause denial of service, or introduce a wide range of malicious side-effects.

Атака з ін’єкцією коду відбувається, коли вхідна чи інша зовнішня змінна використовується програмою недезінфіковано та спричиняє модифікацію логіки програми. Це може дозволити зловмиснику отримати доступ до пристрою програми або його даних, спричинити відмову в обслуговуванні або створити широкий спектр шкідливих побічних ефектів.

The authorization server and client MUST sanitize (and validate when possible) any value received -- in particular, the value of the "state" and "redirect_uri" parameters.

Сервер авторизації та клієнт ПОВИННІ дезінфікувати (і перевіряти, якщо можливо) будь-яке отримане значення, зокрема значення параметрів «state» і «redirect_uri».

### 10.15.  Open Redirectors

The authorization server, authorization endpoint, and client redirection endpoint can be improperly configured and operate as open redirectors.  An open redirector is an endpoint using a parameter to automatically redirect a user-agent to the location specified by the parameter value without any validation.

Сервер авторизації, кінцева точка авторизації та кінцева точка перенаправлення клієнта можуть бути неправильно налаштовані та працювати як відкриті редиректори. Відкритий переспрямовувач — це кінцева точка, яка використовує параметр для автоматичного перенаправлення агента користувача до розташування, визначеного значенням параметра, без будь-якої перевірки.

Open redirectors can be used in phishing attacks, or by an attacker to get end-users to visit malicious sites by using the URI authority component of a familiar and trusted destination.  In addition, if the authorization server allows the client to register only part of the redirection URI, an attacker can use an open redirector operated by the client to construct a redirection URI that will pass the authorization server validation but will send the authorization code or access token to an endpoint under the control of the attacker.

Відкриті перенаправлячі можуть використовуватися під час фішингових атак або зловмисник, щоб змусити кінцевих користувачів відвідати шкідливі сайти за допомогою компонента авторитету URI знайомого та надійного місця призначення. Крім того, якщо сервер авторизації дозволяє клієнту зареєструвати лише частину URI перенаправлення, зловмисник може використовувати відкритий перенаправляч, керований клієнтом, щоб створити URI перенаправлення, який пройде перевірку сервера авторизації, але надішле код авторизації або доступ маркер до кінцевої точки під контролем зловмисника.

### 10.16.  Misuse of Access Token to Impersonate Resource Owner in Implicit Flow

For public clients using implicit flows, this specification does not provide any method for the client to determine what client an access token was issued to.

Для загальнодоступних клієнтів, які використовують неявні потоки, ця специфікація не надає жодного методу для клієнта визначити, якому клієнту було видано маркер доступу.

A resource owner may willingly delegate access to a resource by granting an access token to an attacker's malicious client.  This may be due to phishing or some other pretext.  An attacker may also steal a token via some other mechanism.  An attacker may then attempt to impersonate the resource owner by providing the access token to a legitimate public client.

Власник ресурсу може добровільно делегувати доступ до ресурсу, надавши маркер доступу зловмисному клієнту зловмисника. Це може бути через фішинг або інший привід. Зловмисник також може викрасти маркер за допомогою іншого механізму. Потім зловмисник може спробувати видати себе за власника ресурсу, надавши маркер доступу законному публічному клієнту.

In the implicit flow (response_type=token), the attacker can easily switch the token in the response from the authorization server, replacing the real access token with the one previously issued to the attacker.

У неявному потоці (response_type=token) зловмисник може легко змінити маркер у відповіді від сервера авторизації, замінивши справжній маркер доступу на той, який раніше був виданий зловмисникові.

Servers communicating with native applications that rely on being passed an access token in the back channel to identify the user of the client may be similarly compromised by an attacker creating a compromised application that can inject arbitrary stolen access tokens.

Сервери, які взаємодіють із власними програмами, які покладаються на передачу маркера доступу у зворотному каналі для ідентифікації користувача клієнта, можуть бути подібним чином скомпрометовані зловмисником, який створює скомпрометовану програму, яка може вводити довільні вкрадені маркери доступу.

Any public client that makes the assumption that only the resource owner can present it with a valid access token for the resource is vulnerable to this type of attack.

Будь-який загальнодоступний клієнт, який припускає, що лише власник ресурсу може надати йому дійсний маркер доступу до ресурсу, вразливий до цього типу атаки.

This type of attack may expose information about the resource owner at the legitimate client to the attacker (malicious client).  This will also allow the attacker to perform operations at the legitimate client with the same permissions as the resource owner who originally granted the access token or authorization code.

Цей тип атаки може надати зловмиснику (зловмисному клієнту) інформацію про власника ресурсу на законному клієнті. Це також дозволить зловмиснику виконувати операції на законному клієнті з тими ж дозволами, що й власник ресурсу, який спочатку надав маркер доступу або код авторизації.

Authenticating resource owners to clients is out of scope for this specification.  Any specification that uses the authorization process as a form of delegated end-user authentication to the client (e.g., third-party sign-in service) MUST NOT use the implicit flow without additional security mechanisms that would enable the client to determine if the access token was issued for its use (e.g., audience-restricting the access token).

Автентифікація власників ресурсів для клієнтів виходить за межі цієї специфікації. Будь-яка специфікація, яка використовує процес авторизації як форму делегованої автентифікації кінцевого користувача клієнту (наприклад, служба входу третьої сторони), НЕ ПОВИННА використовувати неявний потік без додаткових механізмів безпеки, які дозволять клієнту визначити, чи доступ токен був виданий для його використання (наприклад, маркер доступу, що обмежує аудиторію).

## 11. IANA Considerations

### 11.1.  OAuth Access Token Types Registry

This specification establishes the OAuth Access Token Types registry.

Ця специфікація встановлює реєстр типів маркерів доступу OAuth.

Access token types are registered with a Specification Required ([RFC5226]) after a two-week review period on the oauth-ext-review@ietf.org mailing list, on the advice of one or more Designated Experts.  However, to allow for the allocation of values prior to publication, the Designated Expert(s) may approve registration once they are satisfied that such a specification will be published.

Типи маркерів доступу реєструються в обов’язковій специфікації ([RFC5226]) після двотижневого періоду перевірки в списку розсилки oauth-ext-review@ietf.org за порадою одного або кількох призначених експертів. Однак, щоб дозволити розподіл значень до публікації, призначений експерт (експерти) може схвалити реєстрацію, коли переконається, що така специфікація буде опублікована.

Registration requests must be sent to the oauth-ext-review@ietf.org mailing list for review and comment, with an appropriate subject (e.g., "Request for access token type: example").

Запити на реєстрацію потрібно надсилати до списку розсилки oauth-ext-review@ietf.org для перегляду та коментарів із відповідною темою (наприклад, «Запит на тип маркера доступу: приклад»).

Within the review period, the Designated Expert(s) will either approve or deny the registration request, communicating this decision to the review list and IANA.  Denials should include an explanation and, if applicable, suggestions as to how to make the request successful.

Протягом періоду перегляду призначений(і) експерт(и) схвалює або відхиляє запит на реєстрацію, повідомляючи про це рішення списку перегляду та IANA. Відмови повинні містити пояснення та, якщо це можливо, пропозиції щодо того, як зробити запит успішним.

IANA must only accept registry updates from the Designated Expert(s) and should direct all requests for registration to the review mailing list.

IANA має приймати оновлення реєстру лише від призначеного(их) експерта(ів) і направляти всі запити на реєстрацію до списку розсилки для перегляду.

#### 11.1.1.  Registration Template

Type name: The name requested (e.g., "example").

Введіть ім’я: запитане ім’я (наприклад, «приклад»).

Additional Token Endpoint Response Parameters: Additional response parameters returned together with the "access_token" parameter.  New parameters MUST be separately registered in the OAuth Parameters registry as described by Section 11.2.

Додаткові параметри відповіді кінцевої точки маркера: додаткові параметри відповіді повертаються разом із параметром "access_token". Нові параметри ПОВИННІ бути окремо зареєстровані в реєстрі параметрів OAuth, як описано в розділі 11.2.

HTTP Authentication Scheme(s): The HTTP authentication scheme name(s), if any, used to authenticate protected resource requests using access tokens of this type.

Схеми автентифікації HTTP: назви схем автентифікації HTTP, якщо такі є, які використовуються для автентифікації запитів до захищених ресурсів за допомогою маркерів доступу цього типу.

Change controller: For Standards Track RFCs, state "IETF".  For others, give the name of the responsible party.  Other details (e.g., postal address, email address, home page URI) may also be included.

Змінити контролер: для стандартів Track RFC вкажіть «IETF». Для інших вкажіть назву відповідальної сторони. Також можуть бути включені інші відомості (наприклад, поштова адреса, адреса електронної пошти, URI домашньої сторінки).

Specification document(s): Reference to the document(s) that specify the parameter, preferably including a URI that can be used to retrieve a copy of the document(s).  An indication of the relevant sections may also be included but is not required.

Специфікаційний(і) документ(и): Посилання на документ(и), у якому визначено параметр, бажано включаючи URI, який можна використовувати для отримання копії документа(ів). Вказівка на відповідні розділи також може бути включена, але не є обов’язковою.

### 11.2.  OAuth Parameters Registry

This specification establishes the OAuth Parameters registry.

Ця специфікація встановлює реєстр параметрів OAuth.

Additional parameters for inclusion in the authorization endpoint request, the authorization endpoint response, the token endpoint request, or the token endpoint response are registered with a Specification Required ([RFC5226]) after a two-week review period on the oauth-ext-review@ietf.org mailing list, on the advice of one or more Designated Experts.  However, to allow for the allocation of values prior to publication, the Designated Expert(s) may approve registration once they are satisfied that such a specification will be published.

Додаткові параметри для включення до запиту кінцевої точки авторизації, відповіді кінцевої точки авторизації, запиту кінцевої точки маркера або відповіді кінцевої точки маркера реєструються в обов’язковій специфікації ([RFC5226]) після двотижневого періоду перевірки на oauth-ext-review Список розсилки @ietf.org за порадою одного або кількох призначених експертів. Однак, щоб дозволити розподіл значень до публікації, призначений експерт (експерти) може схвалити реєстрацію, коли переконається, що така специфікація буде опублікована.

Registration requests must be sent to the oauth-ext-review@ietf.org mailing list for review and comment, with an appropriate subject (e.g., "Request for parameter: example").

Запити на реєстрацію необхідно надсилати до списку розсилки oauth-ext-review@ietf.org для перегляду та коментарів із відповідною темою (наприклад, «Запит на параметр: приклад»).

Within the review period, the Designated Expert(s) will either approve or deny the registration request, communicating this decision to the review list and IANA.  Denials should include an explanation and, if applicable, suggestions as to how to make the request successful.

Протягом періоду перегляду призначений(і) експерт(и) схвалює або відхиляє запит на реєстрацію, повідомляючи про це рішення списку перегляду та IANA. Відмови повинні містити пояснення та, якщо це можливо, пропозиції щодо того, як зробити запит успішним.

IANA must only accept registry updates from the Designated Expert(s) and should direct all requests for registration to the review mailing list.

IANA має приймати оновлення реєстру лише від призначеного(их) експерта(ів) і направляти всі запити на реєстрацію до списку розсилки для перегляду.

#### 11.2.1.  Registration Template

Parameter name: The name requested (e.g., "example").

Ім’я параметра: запитане ім’я (наприклад, «приклад»).

Parameter usage location: The location(s) where parameter can be used.  The possible locations are authorization request, authorization response, token request, or token response.

Місце використання параметра: місце(я), де можна використовувати параметр. Можливими місцями є запит авторизації, відповідь авторизації, запит маркера або відповідь маркера.

Change controller: For Standards Track RFCs, state "IETF".  For others, give the name of the responsible party.  Other details (e.g., postal address, email address, home page URI) may also be included.

Змінити контролер: для стандартів Track RFC вкажіть «IETF». Для інших вкажіть назву відповідальної сторони. Також можуть бути включені інші відомості (наприклад, поштова адреса, адреса електронної пошти, URI домашньої сторінки).

Specification document(s): Reference to the document(s) that specify the parameter, preferably including a URI that can be used to retrieve a copy of the document(s).  An indication of the relevant sections may also be included but is not required.

Специфікаційний(і) документ(и): Посилання на документ(и), у якому визначено параметр, бажано включаючи URI, який можна використовувати для отримання копії документа(ів). Вказівка на відповідні розділи також може бути включена, але не є обов’язковою.

#### 11.2.2.  Initial Registry Contents

The OAuth Parameters registry's initial contents are:

o  Parameter name: client_id
o  Parameter usage location: authorization request, token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: client_secret
o  Parameter usage location: token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: response_type
o  Parameter usage location: authorization request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: redirect_uri
o  Parameter usage location: authorization request, token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: scope
o  Parameter usage location: authorization request, authorization
response, token request, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: state
o  Parameter usage location: authorization request, authorization
response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: code
o  Parameter usage location: authorization response, token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: error_description
o  Parameter usage location: authorization response, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: error_uri
o  Parameter usage location: authorization response, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: grant_type
o  Parameter usage location: token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: access_token
o  Parameter usage location: authorization response, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: token_type
o  Parameter usage location: authorization response, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: expires_in
o  Parameter usage location: authorization response, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: username
o  Parameter usage location: token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: password
o  Parameter usage location: token request
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Parameter name: refresh_token
o  Parameter usage location: token request, token response
o  Change controller: IETF
o  Specification document(s): RFC 6749

### 11.3.  OAuth Authorization Endpoint Response Types Registry

This specification establishes the OAuth Authorization Endpoint Response Types registry.

Additional response types for use with the authorization endpoint are registered with a Specification Required ([RFC5226]) after a two-week review period on the oauth-ext-review@ietf.org mailing list, on the advice of one or more Designated Experts.  However, to allow for the allocation of values prior to publication, the Designated Expert(s) may approve registration once they are satisfied that such a specification will be published.

Ця специфікація встановлює реєстр типів відповідей кінцевої точки авторизації OAuth.

Додаткові типи відповідей для використання з кінцевою точкою авторизації реєструються в обов’язковій специфікації ([RFC5226]) після двотижневого періоду перевірки в списку розсилки oauth-ext-review@ietf.org за порадою одного або кількох призначених експертів . Однак, щоб дозволити розподіл значень до публікації, призначений експерт (експерти) може схвалити реєстрацію, коли переконається, що така специфікація буде опублікована.

Registration requests must be sent to the oauth-ext-review@ietf.org mailing list for review and comment, with an appropriate subject (e.g., "Request for response type: example").

Запити на реєстрацію необхідно надсилати до списку розсилки oauth-ext-review@ietf.org для перегляду та коментарів із відповідною темою (наприклад, «Тип запиту на відповідь: приклад»).

Within the review period, the Designated Expert(s) will either approve or deny the registration request, communicating this decision to the review list and IANA.  Denials should include an explanation and, if applicable, suggestions as to how to make the request successful.

Протягом періоду перегляду призначений(і) експерт(и) схвалює або відхиляє запит на реєстрацію, повідомляючи про це рішення списку перегляду та IANA. Відмови повинні містити пояснення та, якщо це можливо, пропозиції щодо того, як зробити запит успішним.

IANA must only accept registry updates from the Designated Expert(s) and should direct all requests for registration to the review mailing list.

IANA має приймати оновлення реєстру лише від призначеного(их) експерта(ів) і направляти всі запити на реєстрацію до списку розсилки для перегляду.

#### 11.3.1.  Registration Template

Response type name: The name requested (e.g., "example").

Change controller: For Standards Track RFCs, state "IETF".  For others, give the name of the responsible party.  Other details (e.g., postal address, email address, home page URI) may also be included.

Specification document(s): Reference to the document(s) that specify the type, preferably including a URI that can be used to retrieve a copy of the document(s).  An indication of the relevant sections may also be included but is not required.

Назва типу відповіді: запитана назва (наприклад, «приклад»).

Змінити контролер: для стандартів Track RFC вкажіть «IETF». Для інших вкажіть назву відповідальної сторони. Також можуть бути включені інші відомості (наприклад, поштова адреса, адреса електронної пошти, URI домашньої сторінки).

Специфікаційний(і) документ(и): Посилання на документ(и), у якому визначено тип, бажано включаючи URI, який можна використовувати для отримання копії документа(ів). Вказівка на відповідні розділи також може бути включена, але не є обов’язковою.

#### 11.3.2.  Initial Registry Contents

The OAuth Authorization Endpoint Response Types registry's initial contents are:

o  Response type name: code
o  Change controller: IETF
o  Specification document(s): RFC 6749

o  Response type name: token
o  Change controller: IETF
o  Specification document(s): RFC 6749

### 11.4.  OAuth Extensions Error Registry

This specification establishes the OAuth Extensions Error registry.

Ця специфікація встановлює реєстр помилок розширень OAuth.

Additional error codes used together with other protocol extensions (i.e., extension grant types, access token types, or extension parameters) are registered with a Specification Required ([RFC5226]) after a two-week review period on the oauth-ext-review@ietf.org mailing list, on the advice of one or more Designated Experts. However, to allow for the allocation of values prior to publication, the Designated Expert(s) may approve registration once they are satisfied that such a specification will be published.

Додаткові коди помилок, які використовуються разом з іншими розширеннями протоколу (тобто типи надання розширення, типи маркерів доступу або параметри розширення), реєструються в обов’язковій специфікації ([RFC5226]) після двотижневого періоду перевірки на oauth-ext-review@ список розсилки ietf.org за порадою одного або кількох призначених експертів. Однак, щоб дозволити розподіл значень до публікації, призначений експерт (експерти) може схвалити реєстрацію, коли переконається, що така специфікація буде опублікована.

Registration requests must be sent to the oauth-ext-review@ietf.org mailing list for review and comment, with an appropriate subject (e.g., "Request for error code: example").

Запити на реєстрацію потрібно надсилати до списку розсилки oauth-ext-review@ietf.org для перегляду та коментарів із відповідною темою (наприклад, «Запит на код помилки: приклад»).

Within the review period, the Designated Expert(s) will either approve or deny the registration request, communicating this decision to the review list and IANA.  Denials should include an explanation and, if applicable, suggestions as to how to make the request successful.

Протягом періоду перегляду призначений(і) експерт(и) схвалює або відхиляє запит на реєстрацію, повідомляючи про це рішення списку перегляду та IANA. Відмови повинні містити пояснення та, якщо це можливо, пропозиції щодо того, як зробити запит успішним.

IANA must only accept registry updates from the Designated Expert(s) and should direct all requests for registration to the review mailing list.

IANA має приймати оновлення реєстру лише від призначеного(их) експерта(ів) і направляти всі запити на реєстрацію до списку розсилки для перегляду.

#### 11.4.1.  Registration Template

Error name: The name requested (e.g., "example").  Values for the error name MUST NOT include characters outside the set %x20-21 / %x23-5B /%x5D-7E.

Назва помилки: запитувана назва (наприклад, «приклад»). Значення для назви помилки НЕ ПОВИННІ містити символи поза набором %x20-21 / %x23-5B /%x5D-7E.

Error usage location: The location(s) where the error can be used.  The possible locations are authorization code grant error response (Section 4.1.2.1), implicit grant error response (Section 4.2.2.1), token error response (Section 5.2), or resource access error response (Section 7.2).

Місце використання помилки: місце(я), де можна використати помилку. Можливими місцями є відповідь на помилку надання коду авторизації (розділ 4.1.2.1), відповідь на помилку неявного надання (розділ 4.2.2.1), відповідь на помилку маркера (розділ 5.2) або відповідь на помилку доступу до ресурсу (розділ 7.2).

Related protocol extension: The name of the extension grant type, access token type, or extension parameter that the error code is used in conjunction with.

Розширення пов’язаного протоколу: назва типу надання розширення, типу маркера доступу або параметра розширення, з яким використовується код помилки.

Change controller: For Standards Track RFCs, state "IETF".  For others, give the name of the responsible party.  Other details (e.g., postal address, email address, home page URI) may also be included.

Змінити контролер: для стандартів Track RFC вкажіть «IETF». Для інших вкажіть назву відповідальної сторони. Також можуть бути включені інші відомості (наприклад, поштова адреса, адреса електронної пошти, URI домашньої сторінки).

Specification document(s): Reference to the document(s) that specify the error code, preferably including a URI that can be used to retrieve a copy of the document(s).  An indication of the relevant sections may also be included but is not required.

Специфікаційний(і) документ(и): Посилання на документ(и), у якому зазначено код помилки, бажано включаючи URI, який можна використовувати для отримання копії документа(ів). Вказівка на відповідні розділи також може бути включена, але не є обов’язковою.

## 12. References

### 12.1.  Normative References

[RFC2119]  Bradner, S., "Key words for use in RFCs to Indicate   Requirement Levels", BCP 14, RFC 2119, March 1997.

[RFC2246]  Dierks, T. and C. Allen, "The TLS Protocol Version 1.0",   RFC 2246, January 1999.

[RFC2616]  Fielding, R., Gettys, J., Mogul, J., Frystyk, H.,   Masinter, L., Leach, P., and T. Berners-Lee, "Hypertext   Transfer Protocol -- HTTP/1.1", RFC 2616, June 1999.

[RFC2617]  Franks, J., Hallam-Baker, P., Hostetler, J., Lawrence, S.,   Leach, P., Luotonen, A., and L. Stewart, "HTTP   Authentication: Basic and Digest Access Authentication",   RFC 2617, June 1999.

[RFC2818]  Rescorla, E., "HTTP Over TLS", RFC 2818, May 2000.

[RFC3629]  Yergeau, F., "UTF-8, a transformation format of   ISO 10646", STD 63, RFC 3629, November 2003.

[RFC3986]  Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform   Resource Identifier (URI): Generic Syntax", STD 66,   RFC 3986, January 2005.

[RFC4627]  Crockford, D., "The application/json Media Type for   JavaScript Object Notation (JSON)", RFC 4627, July 2006.

[RFC4949]  Shirey, R., "Internet Security Glossary, Version 2",   RFC 4949, August 2007.

[RFC5226]  Narten, T. and H. Alvestrand, "Guidelines for Writing an   IANA Considerations Section in RFCs", BCP 26, RFC 5226,   May 2008.

[RFC5234]  Crocker, D. and P. Overell, "Augmented BNF for Syntax   Specifications: ABNF", STD 68, RFC 5234, January 2008.

[RFC5246]  Dierks, T. and E. Rescorla, "The Transport Layer Security   (TLS) Protocol Version 1.2", RFC 5246, August 2008.

[RFC6125]  Saint-Andre, P. and J. Hodges, "Representation and   Verification of Domain-Based Application Service Identity   within Internet Public Key Infrastructure Using X.509   (PKIX) Certificates in the Context of Transport Layer   Security (TLS)", RFC 6125, March 2011.

[USASCII]  American National Standards Institute, "Coded Character   Set -- 7-bit American Standard Code for Information   Interchange", ANSI X3.4, 1986.

[W3C.REC-html401-19991224]   Raggett, D., Le Hors, A., and I. Jacobs, "HTML 4.01   Specification", World Wide Web Consortium   Recommendation REC-html401-19991224, December 1999,   <http://www.w3.org/TR/1999/REC-html401-19991224>.

[W3C.REC-xml-20081126]
  Bray, T., Paoli, J., Sperberg-McQueen, C., Maler, E.,   and F. Yergeau, "Extensible Markup Language (XML) 1.0   (Fifth Edition)", World Wide Web Consortium Recommendation REC-xml-20081126, November 2008,   <http://www.w3.org/TR/2008/REC-xml-20081126>.

### 12.2.  Informative References

[OAuth-HTTP-MAC]
  Hammer-Lahav, E., Ed., "HTTP Authentication: MAC Access   Authentication", Work in Progress, February 2012.

[OAuth-SAML2]
  Campbell, B. and C. Mortimore, "SAML 2.0 Bearer Assertion   Profiles for OAuth 2.0", Work in Progress, September 2012.

[OAuth-THREATMODEL]
  Lodderstedt, T., Ed., McGloin, M., and P. Hunt, "OAuth 2.0   Threat Model and Security Considerations", Work   in Progress, October 2012.

[OAuth-WRAP]
  Hardt, D., Ed., Tom, A., Eaton, B., and Y. Goland, "OAuth   Web Resource Authorization Profiles", Work in Progress,   January 2010.

[RFC5849]  Hammer-Lahav, E., "The OAuth 1.0 Protocol", RFC 5849,   April 2010.

[RFC6750]  Jones, M. and D. Hardt, "The OAuth 2.0 Authorization   Framework: Bearer Token Usage", RFC 6750, October 2012.

## Appendix A.  Augmented Backus-Naur Form (ABNF) Syntax

This section provides Augmented Backus-Naur Form (ABNF) syntax descriptions for the elements defined in this specification using the notation of [RFC5234].  The ABNF below is defined in terms of Unicode code points [W3C.REC-xml-20081126]; these characters are typically encoded in UTF-8.  Elements are presented in the order first defined.

Some of the definitions that follow use the "URI-reference" definition from [RFC3986].

Some of the definitions that follow use these common definitions:
``` http
  VSCHAR  = %x20-7E
  NQCHAR  = %x21 / %x23-5B / %x5D-7E
  NQSCHAR = %x20-21 / %x23-5B / %x5D-7E
  UNICODECHARNOCRLF = %x09 /%x20-7E / %x80-D7FF /
 %xE000-FFFD / %x10000-10FFFF
```

(The UNICODECHARNOCRLF definition is based upon the Char definition in Section 2.2 of [W3C.REC-xml-20081126], but omitting the Carriage Return and Linefeed characters.)

### A.1.  "client_id" Syntax

The "client_id" element is defined in Section 2.3.1:

```
  client-id  = *VSCHAR
```



### A.2.  "client_secret" Syntax

The "client_secret" element is defined in Section 2.3.1:

```
  client-secret = *VSCHAR
```



### A.3.  "response_type" Syntax

The "response_type" element is defined in Sections 3.1.1 and 8.4:

```
  response-type = response-name *( SP response-name )
  response-name = 1*response-char
  response-char = "_" / DIGIT / ALPHA
```



### A.4.  "scope" Syntax

The "scope" element is defined in Section 3.3:

```
  scope = scope-token *( SP scope-token )
  scope-token = 1*NQCHAR
```



### A.5.  "state" Syntax

The "state" element is defined in Sections 4.1.1, 4.1.2, 4.1.2.1,
4.2.1, 4.2.2, and 4.2.2.1:

```
  state= 1*VSCHAR
```



### A.6.  "redirect_uri" Syntax

The "redirect_uri" element is defined in Sections 4.1.1, 4.1.3,
and 4.2.1:

```
  redirect-uri= URI-reference
```



### A.7.  "error" Syntax

The "error" element is defined in Sections 4.1.2.1, 4.2.2.1, 5.2,
7.2, and 8.5:

```
  error = 1*NQSCHAR
```



### A.8.  "error_description" Syntax

The "error_description" element is defined in Sections 4.1.2.1,
4.2.2.1, 5.2, and 7.2:

```
  error-description = 1*NQSCHAR
```



### A.9.  "error_uri" Syntax

The "error_uri" element is defined in Sections 4.1.2.1, 4.2.2.1, 5.2,
and 7.2:

```
  error-uri= URI-reference
```



### A.10.  "grant_type" Syntax

The "grant_type" element is defined in Sections 4.1.3, 4.3.2, 4.4.2, 4.5, and 6:

```
  grant-type = grant-name / URI-reference
  grant-name = 1*name-char
  name-char  = "-" / "." / "_" / DIGIT / ALPHA
```



### A.11.  "code" Syntax

The "code" element is defined in Section 4.1.3:

```
  code = 1*VSCHAR
```



### A.12.  "access_token" Syntax

The "access_token" element is defined in Sections 4.2.2 and 5.1:

```
  access-token = 1*VSCHAR
```



### A.13.  "token_type" Syntax

The "token_type" element is defined in Sections 4.2.2, 5.1, and 8.1:

```
  token-type = type-name / URI-reference
  type-name  = 1*name-char
  name-char  = "-" / "." / "_" / DIGIT / ALPHA
```



### A.14.  "expires_in" Syntax

The "expires_in" element is defined in Sections 4.2.2 and 5.1:

```
  expires-in = 1*DIGIT
```



### A.15.  "username" Syntax

The "username" element is defined in Section 4.3.2:

```
  username = *UNICODECHARNOCRLF
```



### A.16.  "password" Syntax

The "password" element is defined in Section 4.3.2:

```
  password = *UNICODECHARNOCRLF
```



### A.17.  "refresh_token" Syntax

The "refresh_token" element is defined in Sections 5.1 and 6:

```
  refresh-token = 1*VSCHAR
```



### A.18.  Endpoint Parameter Syntax

The syntax for new endpoint parameters is defined in Section 8.2:

```
  param-name = 1*name-char
  name-char  = "-" / "." / "_" / DIGIT / ALPHA
```



## Appendix B.  Use of application/x-www-form-urlencoded Media Type

At the time of publication of this specification, the "application/x-www-form-urlencoded" media type was defined in Section 17.13.4 of [W3C.REC-html401-19991224] but not registered in the IANA MIME Media Types registry (<http://www.iana.org/assignments/media-types>).  Furthermore, that definition is incomplete, as it does not consider non-US-ASCII characters.

To address this shortcoming when generating payloads using this media type, names and values MUST be encoded using the UTF-8 character encoding scheme [RFC3629] first; the resulting octet sequence then needs to be further encoded using the escaping rules defined in [W3C.REC-html401-19991224].

When parsing data from a payload using this media type, the names and values resulting from reversing the name/value encoding consequently need to be treated as octet sequences, to be decoded using the UTF-8 character encoding scheme.

For example, the value consisting of the six Unicode code points
(1) U+0020 (SPACE), (2) U+0025 (PERCENT SIGN),
(3) U+0026 (AMPERSAND), (4) U+002B (PLUS SIGN),
(5) U+00A3 (POUND SIGN), and (6) U+20AC (EURO SIGN) would be encoded into the octet sequence below (using hexadecimal notation):

```
  20 25 26 2B C2 A3 E2 82 AC
```

and then represented in the payload as:

```
  +%25%26%2B%C2%A3%E2%82%AC
```



## Appendix C.  Acknowledgements

The initial OAuth 2.0 protocol specification was edited by David Recordon, based on two previous publications: the OAuth 1.0 community specification [RFC5849], and OAuth WRAP (OAuth Web Resource Authorization Profiles) [OAuth-WRAP].  Eran Hammer then edited many of the intermediate drafts that evolved into this RFC.  The Security Considerations section was drafted by Torsten Lodderstedt, Mark McGloin, Phil Hunt, Anthony Nadalin, and John Bradley.  The section on use of the "application/x-www-form-urlencoded" media type was drafted by Julian Reschke.  The ABNF section was drafted by Michael B. Jones.

The OAuth 1.0 community specification was edited by Eran Hammer and authored by Mark Atwood, Dirk Balfanz, Darren Bounds, Richard M. Conlan, Blaine Cook, Leah Culver, Breno de Medeiros, Brian Eaton, Kellan Elliott-McCrea, Larry Halff, Eran Hammer, Ben Laurie, Chris Messina, John Panzer, Sam Quigley, David Recordon, Eran Sandler, Jonathan Sergent, Todd Sieling, Brian Slesinsky, and Andy Smith.

The OAuth WRAP specification was edited by Dick Hardt and authored by Brian Eaton, Yaron Y. Goland, Dick Hardt, and Allen Tom.

This specification is the work of the OAuth Working Group, which includes dozens of active and dedicated participants.  In particular, the following individuals contributed ideas, feedback, and wording that shaped and formed the final specification:

Michael Adams, Amanda Anganes, Andrew Arnott, Dirk Balfanz, Aiden Bell, John Bradley, Marcos Caceres, Brian Campbell, Scott Cantor, Blaine Cook, Roger Crew, Leah Culver, Bill de hOra, Andre DeMarre, Brian Eaton, Wesley Eddy, Wolter Eldering, Brian Ellin, Igor Faynberg, George Fletcher, Tim Freeman, Luca Frosini, Evan Gilbert, Yaron Y. Goland, Brent Goldman, Kristoffer Gronowski, Eran Hammer, Dick Hardt, Justin Hart, Craig Heath, Phil Hunt, Michael B. Jones, Terry Jones, John Kemp, Mark Kent, Raffi Krikorian, Chasen Le Hara, Rasmus Lerdorf, Torsten Lodderstedt, Hui-Lan Lu, Casey Lucas, Paul Madsen, Alastair Mair, Eve  Maler, James Manger, Mark McGloin, Laurence Miao, William Mills, Chuck Mortimore, Anthony Nadalin, Julian Reschke, Justin Richer, Peter Saint-Andre, Nat Sakimura, Rob Sayre, Marius Scurtescu, Naitik Shah, Luke Shepard, Vlad Skvortsov, Justin Smith, Haibin Song, Niv Steingarten, Christian Stuebner, Jeremy Suriel, Paul Tarjan, Christopher Thomas, Henry S. Thompson, Allen Tom, Franklin Tse, Nick Walker, Shane Weeden, and Skylar Woodward.

This document was produced under the chairmanship of Blaine Cook, Peter Saint-Andre, Hannes Tschofenig, Barry Leiba, and Derek Atkins. The area directors included Lisa Dusseault, Peter Saint-Andre, and Stephen Farrell.

Author's Address

Dick Hardt (editor)
Microsoft

EMail: dick.hardt@gmail.com
URI:http://dickhardt.org/


# Додаткові ресурси



https://swagger.io/docs/specification/authentication/oauth2/

https://ucci-service.org/ua/develop/docs?page=22 

https://auth0.com/intro-to-iam/what-is-oauth-2



https://cloud.google.com/docs/authentication

https://habr.com/ru/post/491116/ 

https://www.digitalocean.com/community/tutorials/oauth-2-ru

https://docs.oracle.com/cd/E74890_01/books/RestAPI/RestAPI_Overview13.html

Для проб

https://swapi.dev/

https://jigsaw.w3.org/HTTP

https://demo.c2id.com/oidc-client/

https://developers.google.com/oauthplayground/