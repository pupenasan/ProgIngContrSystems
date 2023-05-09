# Створення системи відстеження цін на біткойни в реальному часі в Appsmith

https://dev.to/devikakulkarni/building-a-real-time-bitcoin-price-tracker-in-appsmith-3gap      

Нещодавно [Appsmith](https://www.appsmith.com/) представив функцію, яка дозволяє [опитувати дані в реальному часі](https://github.com/appsmithorg/appsmith/issues/3312) за допомогою таймерів JavaScript . Дані, що надходять від API та запитів, тепер можна періодично оновлювати за допомогою методу [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) JavaScript.

Метод setInterval() багаторазово виконує фрагмент коду з фіксованим інтервалом часу між викликами. Раніше в Appsmith користувач повинен був вручну натиснути кнопку оновлення, щоб оновити дані. Але тепер за допомогою таймера JavaScript можна зробити це програмно.

У цьому підручнику ми створимо додаток для відстеження цін на біткойн, як показано нижче, щоб продемонструвати опитування даних у реальному часі. Для цього ми будемо використовувати віджет Stats Box і нещодавно представлену функцію таймера.

![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--AACR7HOU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vdbl9wjw6ct45dr50271.gif)

Найважливішою вимогою для цього проекту є API, який би надавав нам ціни на біткойни в реальному часі. [Finnhub](https://finnhub.io/) — це один із таких веб-сайтів, який надає безкоштовні API для доступу до акцій, валют і криптовалют у реальному часі. Отже, перший крок — це створити обліковий запис на Finnhub, звідки ви отримаєте ключ для доступу до їхніх API.

Створивши обліковий запис на Finnhub, ви зможете отримати доступ до свого ключа API, як показано нижче.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--vtnMSvJI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hcdna2ocmjd7ukpgr8nw.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--vtnMSvJI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hcdna2ocmjd7ukpgr8nw.png)

Finnhub надає кілька API для отримання фінансових даних. Ми будемо використовувати Quote API для відстеження ціни біткойна, як показано нижче.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--VLc7z5VA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yw7dfwwh57b3eyly3j5g.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--VLc7z5VA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yw7dfwwh57b3eyly3j5g.png)

Далі створіть нову програму Appsmith. На панелі меню ліворуч натисніть Джерела даних і виберіть «Create new API». Перейменуйте цей новий API на `GetBitcoinPrice`. Увійдіть в Finnhub Quote API, щоб отримати ціни на біткойни, як показано нижче.

```
https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=YOUR_API_KEY
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--RDURslMo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpfe9bg3g7ap53olv5sr.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--RDURslMo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpfe9bg3g7ap53olv5sr.png)

Тепер на панелі меню клацніть, щоб відкрити розділ Віджети. Перетягніть вікно статистики та перемикач на полотно. Поле статистики — це складений віджет, який складається з кількох елементів, таких як текстові поля та значок. Перейменуйте віджет Stats Box на `StatBox`, а віджет Switch на `SwLive`

Виконайте наведені кроки, щоб налаштувати віджет Stats Box для відображення ціни біткойна, яку буде отримано з налаштованого вище API:

- Змініть текст у першому текстовому полі на «Bitcoin Price» і змініть колір тексту та розмір шрифту на потрібний.
- Перейменуйте друге текстове поле на `TxtPrice` і прив’яжіть його властивість Text до наведеного нижче коду. Цей код витягує поточну ціну біткойна з API GetBitcoinPrice і відображає її як текст у вікні статистики.

```
${{GetBitcoinPrice.data.c}}
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--rvTjH9gO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2weeampuorjbp3q9ylhi.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--rvTjH9gO--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2weeampuorjbp3q9ylhi.png)

Нижче наведено зразок відповіді, отриманої від API Finnhub, де `c` — поточна ціна, а `dp` — поточна зміна.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--Z872wW9m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wcxbfuudbr2nyb0i65nn.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Z872wW9m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wcxbfuudbr2nyb0i65nn.png)

- Перейменуйте третє текстове поле на `TxtChange` і зв’яжіть його властивість Text із таким кодом. Цей код витягує відсоткову зміну ціни біткойна з API GetBitcoinPrice.

```
{{GetBitcoinPrice.data.dp}}% change  
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--6Mbcj0HR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ysr4ir3okbtwov38jaan.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--6Mbcj0HR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ysr4ir3okbtwov38jaan.png)

- Тепер зв’яжіть властивість кольору тексту віджета `TxtChange` з наступним кодом. Цей код змінює колір тексту, що відображається, на червоний або зелений залежно від негативного чи позитивного значення відсоткової зміни, яку повертає API.

```
{{parseFloat(GetBitcoinPrice.data.dp)<0?"red":"green"}}
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--KG8qGvdA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/31kxm7bpiy6gxy0wv0fg.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--KG8qGvdA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/31kxm7bpiy6gxy0wv0fg.png)

- І нашим останнім кроком буде додавання нового віджета «Image » у вікно «Stats Box», щоб відображати стрілки вгору або вниз, як показано на наступному знімку екрана, залежно від негативного чи позитивного значення відсотка зміни, отриманого від API. Для цього виконайте наведені нижче дії.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--IZ5-rlyA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/thugkotgcrwrb0fzjtqp.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--IZ5-rlyA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/thugkotgcrwrb0fzjtqp.png)

a. Видаліть віджет Icon Button, який постачається разом із конфігурацією за замовчуванням віджета Stats Box.

b. Додайте новий віджет «Image » замість кнопки «Icon Button» (усередині віджета «Stats Box»).

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--9Ny9cRHh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qxds3tyk94eb29salfhe.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--9Ny9cRHh--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qxds3tyk94eb29salfhe.png)

в. Перейменуйте цей новий віджет «Image » на `ImgUpDown`.

d. Тепер ми будемо вставляти наступні два зображення у форматі Base64 у властивість Image `ImgUpDown`.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--eJZBUWxF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g7baxiqbpmg1eukjn96i.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--eJZBUWxF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g7baxiqbpmg1eukjn96i.png)

Щоб конвертувати зображення у формат Base64, можна використовувати онлайн-кодер зображень за допомогою подібної служби `https://elmah.io/tools/base64-image-encoder/`.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--SBITbO0l--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sr05tm2qwu7kwpa8uq2s.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--SBITbO0l--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sr05tm2qwu7kwpa8uq2s.png)

e. Отримавши еквіваленти зображень у Base64, прив’яжіть властивість Image віджета `ImgUpDown` до наступного коду. Зауважте, що якщо значення Percent Change від’ємне, ми повертаємо еквівалент Base64 зображення червоної стрілки вниз, а якщо воно додатне, повертаємо Base64 еквівалент зображення зеленої стрілки вгору.

```js
{{

parseFloat(GetBitcoinPrice.data.dp)<0? "iVBORw0KGgoAAAANSUhEUgAAADYAAWFQIBxKbwhMrV8283eqQVllVErPOTjOeSGfnaui364X7plY………….cKDu13Qa5mfTI+AVg00vCweFcJhk9mAyjPRYIx2QtFh3OkhpmQMw3rWgDu9S202qzgTgWckfDOee9J":"iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAABGdBTUEAALGPC/xhBQAAA4b………..WxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucy"

}}
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--Q816DF3t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pybvvgki6uf0hg18mm9i.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Q816DF3t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pybvvgki6uf0hg18mm9i.png)

Нарешті, ми налаштуємо таймер, який працює періодично. Він працюватиме залежно від того, чи ввімкнено віджет перемикання автоматичного оновлення (`SwLive`) чи ні. Якщо він увімкнений, ми запускаємо таймер, який запускатиме API GetBitcoinPrice щосекунди. А якщо він вимкнений, ми очищаємо таймер. Запишіть наступне прив’язування до події `onChange` `SwLive`.

```js
{ {

  (function(){

    if(SwLive.isSwitchedOn){
       setInterval(() => {
        GetBitcoinPrice.run()
        },1000,'timer1')
    }else{
        clearInterval('timer1')
    }

  })()

} }
```

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--iU6QhgS4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3bdsy9080llz3ghgnzrq.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--iU6QhgS4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3bdsy9080llz3ghgnzrq.png)

За замовчуванням ми не хочемо, щоб час починався під час завантаження сторінки, тому ми вимкнули властивість «Default Selected» віджета.

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--I38VzjZI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/35y6krugocf38s9ut3k8.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--I38VzjZI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/35y6krugocf38s9ut3k8.png)

Тепер ми готові опублікувати наш додаток. Натисніть «Розгорнути», щоб активувати свою програму!

[![Image description](https://res.cloudinary.com/practicaldev/image/fetch/s--Tx0dcfwn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6gg67s2v1x6bx1fugma2.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--Tx0dcfwn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6gg67s2v1x6bx1fugma2.png)

## 