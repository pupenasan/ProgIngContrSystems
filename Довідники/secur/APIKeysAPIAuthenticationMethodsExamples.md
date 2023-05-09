# API Keys: API Authentication Methods & Examples

https://blog.stoplight.io/api-keys-best-practices-to-authenticate-apis

Danielle Gaither, December 21 2022

"Як я збираюся зберегти це в безпеці?" є ключовим питанням під час створення будь-якої частини програмного забезпечення. Це питання особливо критичне для API, які забезпечують програмний доступ до важливих систем. Зрештою, автентифікація не має бути запізнілою думкою, а натомість [вбудованою в саму структуру](https://blog.stoplight.io/where-security-fits-in-your-api-design-process) вашого API.

Простіше кажучи, автентифікація — це акт підтвердження того, що ви є тим, за кого себе видаєте. Думайте про це як про потребу ключа, щоб відкрити замкнений будинок. Замок приймає лише правильний ключ, і ключ надає вам доступ до того, що всередині. (Для більш детальної інформації про автентифікацію та авторизацію див. [цей посібник](https://blog.stoplight.io/align-your-api-teams-on-auth-basics).)

Існує багато методів автентифікації API, наприклад Basic Auth (ім’я користувача та пароль) і OAuth (стандарт для доступу до дозволів користувача без пароля). У цій публікації ми розглянемо старий улюблений ключ API та обговоримо, як автентифікувати API.

Багато ранніх API використовували ключі API. Хоча зараз вони можуть бути не найновішим стандартом безпеки, вони часто є покращенням у порівнянні з передачею інших облікових даних у коді API. У ключів API є недоліки, але вони також є простим способом захисту доступу. Звичайно, не всі згодні щодо того, як передавати ключі в API або як працюють автентифікація API та ключі. Ми розглянемо це, а також деякі приклади в цій публікації.

Але по-перше, чому ви хочете — або не хочете — вибирати автентифікацію ключа API? Давайте розглянемо деякі методи автентифікації та найкращі практики автентифікації API.

## Плюси та мінуси автентифікації ключів API

Ви знайдете різні думки щодо вибору автентифікації за допомогою ключа API над іншими методами автентифікації. Це залишається популярним методом, але розробники повинні знати про його компроміси. Дивимося глибше.

Однією з очевидних переваг автентифікації ключів API є її властива простота, найкраща практика автентифікації. У цьому методі використовується єдиний ключ автентифікації, який дозволяє вам автентифікуватися, просто включивши ключ. Ця простота також дозволяє користувачеві легко здійснювати виклики за допомогою cURL, інтерактивних документів або навіть у своєму браузері.

Ще однією перевагою є популярність автентифікації за ключем API. Розробники знайомі з ключами API, що означає, що їм не потрібно витрачати зайвий час на розуміння того, як вони працюють. Чим простіше та швидше буде автентифікуватися у вашому API, тим більша ймовірність успіху розробника. Незалежно від того, чи є цей розробник у вашій компанії чи зовнішньому партнері, ви хочете, щоб ваш API був простим у використанні.

З іншого боку, простота може викликати проблеми з безпекою. Що станеться, якщо хтось натрапить на чужий ключ API? У більшості випадків вони можуть використовувати ключ API з усіма привілеями законного власника. Залежно від API, вони можуть отримати всі дані, додати неправильний вміст або навіть видалити все.

Один із запобіжних заходів, який вживають деякі розробники API, полягає в тому, щоб використовувати ключі API лише для даних лише для читання. Для API, яким не потрібні дозволи на запис, це простий спосіб обробки автентифікації з обмеженням ризику. Однак цей підхід обмежує API, які можуть потребувати детальніших дозволів.

## How to Pass API Keys in Headers

If you determine that the simplicity of API keys makes sense for your use case, there are several places where API keys can be passed in your [API design](https://stoplight.io/api-design-guide/basics/). 

The most popular API key location for modern APIs is in headers. However, that’s not enough information: *where* in the headers should you include the API key? There are several methods that we’ll cover next.

Before that, an important note: as with all API requests, use HTTPS  (TLS, the successor to SSL) to ensure that data is encrypted in transit.

### x-api-key

The most popular choice for including API keys in headers, perhaps due to its usage by AWS API Gateway, ``x-api-key`` is a custom header convention for passing your API key. For more on API gateway authentication, [see this post about API gateways.](https://blog.stoplight.io/api-proxy-vs-api-gateway-c008c942a02d)

```vbnet
GET / HTTP/1.1
Host: example.com
X-API-KEY:  abcdef12345
```

### Basic Authentication

How long should an API key be? It depends. Earlier, we suggested  Basic Auth as an alternative to API keys. Basic Auth and API keys can  also be used together. You can pass the API key via Basic Auth as either the username or password. Most implementations pair the API key with a  blank value for the unused field (username or password).

```vbnet
GET / HTTP/1.1
Host: example.com
Authorization: Basic bWFnZ2llOnN1bW1lcnM=
```

You will need to base64-encode the ``username:password`` content, but most request libraries do this for you.

### Bearer Authentication

Some APIs use the ``Authorization`` header to handle the API key, usually with the Bearer keyword. This  method is also used for other tokens, such as those generated by OAuth.

The client must send this token in the `Authorization` header when making requests to protected resources:

```makefile
Authorization: Bearer abcdef12345
```

What about non-header locations for API keys? You can find them in query strings or even the data body.

## Other API Key Locations

Though the header has become the preferred location for API keys,  there are non-header methods still used by many APIs. As a developer  using APIs, you may spot these methods in the wild. As an API designer,  you’ll probably want to stick to the headers, as we’ll explain.

### Query String

A popular method for early APIs, passing an API key through a query  string in a URL is certainly easy. However, this method can risk API key exposure since, despite encryption, the parameters can be stored in web server logs.

```sql
curl -X GET "https://example.com/endpoint/?api_key=abcdef12345"
```

If you use the query string method, you’ll want to make sure that there’s a low risk of the API key being shared.

### Request Body Parameter

Another method we’ve seen, especially in older APIs, is to pass an API key in the POST body as JSON:

```cpp
curl -X POST
	`https://example.com/endpoint/’ \
	-H ‘content-type: application/json’ \
	-d ‘ {
		“api_key”: abcdef12345”
	}’
```

The most significant drawback to this method is that authentication  is mixed in with other data. It also encourages poor REST practices, as  simple reads from the API would need to be sent a POST request instead  of GET.

### JavaScript API

Finally, you may see API keys used with front-end JavaScript APIs,  which provide in-browser access to API functionality. In these cases,  the API key is passed one of two ways. Either the key is passed with the call to the script or in the JavaScript itself.

For example, Google Maps passes the key in the query string to the JavaScript:

```xml
 <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" type="text/javascript"></script>
```

Keen Dataviz, on the other hand, passes the API in a constructor:

```csharp
const client = new KeenAnalysis({
  projectId: 'YOUR_PROJECT_ID',
  readKey: 'YOUR_READ_KEY'
});
```

In both cases, the companies take additional steps to secure the API  calls. This is important because the API keys are essentially public, as they are easily discoverable if you view the source. Google Maps allows developers to restrict its usage on certain websites. Keen has separate read and write API keys.

##  API Key Authentication using OpenAPI

In addition to human-readable API documentation, an OpenAPI  definition is a must when designing APIs. You can describe your entire  API in a machine-readable file (YAML or JSON). The format is meant to  cover the many ways developers create RESTful APIs and supports security schemes, including API keys, so it is flexible enough for any of the  methods we’ve discussed. 

For example, here is the security section of Stripe’s OpenAPI  document, showing the two header approaches supported for its API keys:

```yaml
  securitySchemes:
    basicAuth:
      description: 'Basic HTTP authentication. Allowed headers-- Authorization: Basic
        <api_key> | Authorization: Basic <base64 hash of `api_key:`>'
      scheme: basic
      type: http
    bearerAuth:
      bearerFormat: auth-scheme
      description: 'Bearer HTTP authentication. Allowed headers-- Authorization: Bearer
        <api_key>'
      scheme: bearer
      type: http
```

A machine-readable API specification allows you to test the  implementation against the specification throughout your API development lifecycle without extensive effort.

This quick tour should be just enough to get you started with API key authentication, but see our longer series on [planning](https://blog.stoplight.io/plan-your-api-auth-strategy-with-careful-questions-auth-part-2) and [designing](https://blog.stoplight.io/design-first-auth-choose-a-strategy-that-works-auth-part-3) your API authentication strategy for a more comprehensive view.

[Stoplight Platform](https://docs.stoplight.io/docs/platform/52ab0a117eadd-welcome-to-the-stoplight-docs) makes it easy to design your API visually—including security  definitions around any authentication—with OpenAPI. We hope you enjoyed  these API authentication and authorization tips!