# **Відео-няня(для сну)**

Чорний Ілля

**Загальний опис проектованої системи.**

Система повинна розпізнавати жести(рухи) дитини та відправляти повідомлення на Тelegram-bot батькам, також вести відображення в реальному часі самої дитини. З можливістю онлайн, віддаленого контролю та керування запускати колискові для дитини, .

**Вимоги до функцій та задач.**

Система повинна передбачати виконання наступних функцій:

```
1.     Неперервне відстеження жестів(рухів) дитини з періодичність не більше ніж 2 секунди з моменту запуску пристрою. За допомогою вбудованого інфрачервоного світлодіода і оптичного об'єктива у датчику жестів.
```

\2.   Сканування жестів(рухів) дитини на відстані не більше 10-15 см для точності розрахунку.

\3.   Неперервна відео фіксація дитини, навіть якщо веб-додаток закритий у користувача. Можливість нічної відео зйомки.

\4.   Моментальний запуск веб-ресурсу, на якому трансляція зображення у реальному часі, та повідомлення у Тelegram-bot, при зафіксованим жестам дитини.

\5.   Запуск колискової користувачем через Веб-ресурс.

\6.   Формування звітів на Веб-сайті раз/годину або за запитом з відображенням:

·    у табличному та графічному вигляді розпізнанні жести та час, коли були зафіксовані для аналітики сну дитини

·    з якого по який час дитина була активною

\7.   Формування тих самих звітів у формі трендів:

o  локальному ВЕБ-інтерфейсі

o  мобільному застосунку

o  Google Worksheet

\8.   Постійне архівування даних(звітів і трендів) в локальну базу даних.

 

**Вимоги до видів забезпечення.**

Вимого до апаратного забезпечення:

ü Raspberry PI3 (або RPI4), або аналогічний

ü Датчик жестів PAJ7620U2 WAVESHARE або (інфрачервоний датчик руху HC-SR501)

ü Наявне підключення RPI до мережі Internet через мережу WiFi або Ethernet

ü Смартфон або планшет з Android > V5

ü Прототип буде знаходитись на відстані не більше 10-15 см

ü Міні-колонка(аудіо) для підключення через порт аудіо аналоговий: 3,5 мм jack (4 pin)

ü Камера RASPBERRY PI WAVESHARE (TYPE F)(йде одразу з можливістю нічної зйомки)

 

Програмні засоби та Інтернет-сервіси:

§ Node-RED як база для розробки ПЗ + dashboard для локального веб-інтерфейсу

§ система керування базами даних, розгорнута на RPI (MariaDB)

§ хмарний застосунок Google Sheets для аналітики

§ веб-сайт для онлайн доступу для звітів на базі Google Sites

§ Telegram-бот для віддаленого контролю та керування

§ IoT MQTT Panel для віддаленого контролю та керування

 

*На далі можливе доопрацювання відео-няні не тільки для сну, а і для наглядом за дитиною будь-якого часу. Та розробка дистанційного виклику служб екстреної допомоги через Телеграм-бот.

 