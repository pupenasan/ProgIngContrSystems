### sendMessage

<https://core.telegram.org/bots/api#sendmessage>

Використовуйте цей метод для надсилання текстових повідомлень. У разі успіху повертається надіслане [повідомлення](https://core.telegram.org/bots/api#message).



| Parameter                   | Type                                                         | Required | Description                                                  |
| --------------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| chat_id                     | Integer or String                                            | Yes      | Унікальний ідентифікатор цільового чату або ім’я користувача цільового каналу (у форматі `@Channelusername`) |
| text                        | String                                                       | Yes      | Текст повідомлення для надсилання, 1-4096 символів після розбору сутностей |
| parse_mode                  | String                                                       | Optional | Режим парсингу сутностей у тексті повідомлення. Докладніше див. нижче [Параметри форматування](https://core.telegram.org/bots/api#formatting-options). |
| entities                    | Array of [MessageEntity](https://core.telegram.org/bots/api#messageentity) | Optional | JSON-серіалізований список спеціальних сутностей, що з'являються в тексті повідомлення, який можна вказати замість *parse_mode* |
| disable_web_page_preview    | Boolean                                                      | Optional | Вимкнути попередній перегляд посилань для посилань у цьому повідомленні |
| disable_notification        | Boolean                                                      | Optional | Надсилає повідомлення [мовчки](https://telegram.org/blog/channels-2-0#silent-messages). Користувачі отримають сповіщення без звуку. |
| reply_to_message_id         | Integer                                                      | Optional | Якщо повідомлення є відповіддю, ідентифікатор вихідного повідомлення |
| allow_sending_without_reply | Boolean                                                      | Optional | Передайте *True*, якщо повідомлення слід надіслати, навіть якщо вказане повідомлення з відповіддю не знайдено |
| reply_markup                | [InlineKeyboardMarkup](https://core.telegram.org/bots/api#inlinekeyboardmarkup) or [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) or [ReplyKeyboardRemove](https://core.telegram.org/bots/api#replykeyboardremove) or [ForceReply](https://core.telegram.org/bots/api#forcereply) | Optional | Додаткові параметри інтерфейсу. Об'єкт, серіалізований JSON для [вбудованої клавіатури](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating), [спеціальна клавіатура відповідей](https://core.telegram.org/bots#keyboards), інструкції щодо видалення клавіатури відповідей або примусової відповіді від користувача. |

### Formatting options

<https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating>

API Bot підтримує базове форматування повідомлень. Ви можете використовувати жирний, курсивний, підкреслений і закреслений текст, а також вбудовані посилання та попередньо відформатований код у повідомленнях своїх ботів. Клієнти Telegram нададуть їх відповідно. Ви можете скористатися форматуванням markdown-style або стилем HTML.

Зауважте, що клієнти Telegram покажуть користувачеві **попередження** перед відкриттям вбудованого посилання ('Відкрити це посилання?' Разом із повною URL -адресою).

Сутності повідомлень можуть бути вкладеними за умови дотримання таких обмежень:

- Якщо дві сутності мають загальні символи, то одна з них повністю міститься в іншій.
- *жирний*, *курсив*, *підкреслений*та *закреслений* сутності можуть містити та міститись у будь-яких інших сутностях, крім *pre* та *code*.
- Усі інші сутності не можуть містити один одного.

Посилання `tg://user?Id=<user_id>` можна використовувати для згадування користувача за його ідентифікатором без використання імені користувача. Будь ласка, запиши:

- Ці посилання працюватимуть **лише**, якщо вони використовуються всередині inline link. Наприклад, вони не працюватимуть, якщо вони використовуються у вбудованій кнопці клавіатури або у тексті повідомлення.
- Ці згадки гарантовано спрацюють, лише якщо користувач раніше звертався до бота, надіслав боту запит зворотного дзвінка за допомогою вбудованої кнопки або є учасником групи, де він був згаданий.

###### MarkdownV2 style

Щоб скористатися цим режимом, передайте *MarkdownV2* у поле *parse_mode*. Використовуйте у своєму повідомленні такий синтаксис:

~~~markdown
*bold \*text*
_italic \*text_
__underline__
~strikethrough~
*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
```
pre-formatted fixed-width code block
```
```python
pre-formatted fixed-width code block written in the Python programming language
```
~~~

Please note:

- Any character with code between 1 and 126 inclusively can be escaped anywhere with a preceding '\' character, in which case it is treated as an ordinary character and not a part of the markup. This implies that  '\' character usually must be escaped with a preceding '\' character.
- Inside `pre` and `code` entities, all '`' and '\' characters must be escaped with a preceding '\' character.
- Inside `(...)` part of inline link definition, all ')' and '\' must be escaped with a preceding '\' character.
- In all other places characters '_', '*', '[', ']', '(', ')', '~',  '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.
- In case of ambiguity between `italic` and `underline` entities `__` is always greadily treated from left to right as beginning or end of `underline` entity, so instead of `___italic underline___` use `___italic underline_\r__`, where `\r` is a character with code 13, which will be ignored.

###### HTML style

To use this mode, pass *HTML* in the *parse_mode* field. The following tags are currently supported:

```
<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<b>bold <i>italic bold <s>italic bold strikethrough</s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
```

Please note:

- Only the tags mentioned above are currently supported.
- All `<`, `>` and `&` symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (`<` with `<`, `>` with `>` and `&` with `&`).
- All numerical HTML entities are supported.
- The API currently supports only the following named HTML entities: `<`, `>`, `&` and `"`.
- Use nested `pre` and `code` tags, to define programming language for `pre` entity.
- Programming language can't be specified for standalone `code` tags.

###### Markdown style

This is a legacy mode, retained for backward compatibility. To use this mode, pass *Markdown* in the *parse_mode* field. Use the following syntax in your message:

~~~markdown
*bold text*
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
```
pre-formatted fixed-width code block
```
```python
pre-formatted fixed-width code block written in the Python programming language
```
~~~

Будь ласка, запиши:

- Сутності не повинні бути вкладеними, натомість використовуйте режим аналізу [MarkdownV2](https://core.telegram.org/bots/api#markdownv2-style).
- Неможливо вказати підкреслені та закреслені сутності, замість цього використовуйте режим аналізу [MarkdownV2](https://core.telegram.org/bots/api#markdownv2-style).
- Щоб уникнути символів '_', '*', '' ',' ['за межами сутності, додайте символи ' \ ' перед ними.
- Вихід всередину сутностей заборонено, тому сутність потрібно спочатку закрити та знову відкрити: використовуйте `_snake _ \ __ case_` для курсиву` snake_case` та `*2*\ ** 2 = 4*` для жирного `2*2 = 4 `.

