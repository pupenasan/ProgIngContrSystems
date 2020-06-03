# YAML

[Learn YAML in five minutes!](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes)

[YAML™ Specification Index](https://yaml.org/spec/)

[YAML Syntax](https://learn.getgrav.org/16/advanced/yaml)

[YAML](https://uk.wikipedia.org/wiki/YAML) — зручний для читання людиною формат серіалізаціі даних, концептуально близький до мов розмітки, але орієнтований на зручність введення-виведення типових структур даних багатьох мов програмування. YAML в основному використовується як формат для файлів конфігурації. 

- файли YAML мають розширення `.yaml`  або `.yml`
- YAML є чутливим до регістру.
- YAML не дозволяє використовувати табуляцію, натомість використовуються пробіли.

Коментарі починаються з октоторпа (його також називають "хеш", "гострий", "фунт" або "знак числа" - `#`).

Означення початку та кінця документа необов'язково. Початок документа позначається  '`---`' , що розміщується з самого зверху, а кінець -  '`...`'.

## Базові типи даних

YAML має базові типи **відображення (mappings)** (хеші/словники), **послідовності (sequences)** (масиви / списки) та **скаляри** (рядки/числа). Хоча його можна використовувати з більшістю мов програмування, він найкраще працює з мовами, побудованими навколо цих типів структури даних. Сюди входять: PHP, Python, Perl, JavaScript та Ruby.

### Скаляри (Scalars)

Скаляри часто називають змінними в програмуванні. Скаляри представляють собою рядки та числа, які складають дані на сторінці. Скаляр може бути:

- булевою властивістю, наприклад `Так`, 
- цілим (числом), наприклад `5`, 
- або рядком тексту, наприклад речення чи назва веб-сайту.

Більшість скалярів не беруться в лапки, але якщо ви вводите рядок, який використовує пунктуацію та інші елементи, які можна переплутати з синтаксисом YAML (тире, колонки тощо), ви можете процитувати ці дані за допомогою одинарних (`''` )або подвійних (`""` ) лапок. Подвійні лапки дозволяють використовувати escapings для представлення символів ASCII та Unicode.

```yaml
integer: 25
string: "25"
float: 25.0
boolean: Yes
```

## [Block Scalars](https://yaml-multiline.info/)

A block scalar header has three parts:

**Block Style Indicator**: The *[block style](https://yaml.org/spec/1.2/spec.html#id2795688)* indicates how newlines inside the block should behave. If you would like them to be kept as newlines, use the **literal** style, indicated by a pipe (`|`). If instead you want them to be replaced by spaces, use the **folded** style, indicated by a right angle bracket (`>`). (To get a newline using the folded style, leave a blank line by putting *two* newlines in. Lines with extra indentation are also not folded.)

**Block Chomping Indicator**: The *[chomping indicator](https://yaml.org/spec/1.2/spec.html#id2794534)* controls what should happen with newlines at the *end* of the string. The default, **clip**, puts a single newline at the end of the string. To remove all newlines, **strip** them by putting a minus sign (`-`) after the style indicator. Both clip and strip ignore how many newlines are actually at the end of the block; to **keep** them all put a plus sign (`+`) after the style indicator.

**Indentation Indicator**: Ordinarily, the number of spaces you're using to indent a block will be automatically guessed from its first line. You may need a *[block indentation indicator](https://yaml.org/spec/1.2/spec.html#id2793979)* if the first line of the block starts with extra spaces. In this case, simply put the number of spaces used for indentation (between 1 and 9) at the end of the header.



### Послідовності (Sequences)

Це базовий список з кожним елементом у списку, розміщеним у його власному рядку. Це аналог масиву в інших мовах. Блок послідовностей позначають кожен запис з тире та пробілом (`- `). 

```yaml
- Cat
- Dog
- Goldfish
```

Ця послідовність розміщує кожен елемент у списку на одному рівні. Якщо ви хочете створити вкладену послідовність з елементами та підпунктами, це можна зробити, розмістивши перед кожним тире в підпунктах один пробіл. YAML використовує для відступу пробіли, **НЕ** табуляцію. Приклад цього ви можете побачити нижче. 

```yaml
-
 - Cat
 - Dog
 - Goldfish
-
 - Python
 - Lion
 - Tiger
```

Це аналогічно 2-мірному масиву в інших мовах. Якщо ви хочете вкласти свої послідовності ще глибше, вам просто потрібно додати більше рівнів.

```yaml
-
 -
  - Cat
  - Dog
  - Goldfish
```

Послідовності можуть бути додані до інших типів структури даних, таких як відображення чи скаляри.

### Відображення (Mappings)

Відображення дає можливість перелічити ключі з їх значеннями. Це аналог асоційованого масиву. Для відображення використовується двокрапка та пробіл (`: ` ) для позначення кожної пари ключ : значення. 

```yaml
animal: pets
```

Цей приклад відображає значення `pets`  до ключа `animal` . 

Використовуючи спільно з послідовністю, ви можете побачити, що ви починаєте складати список `pets`. У наступному прикладі тире, яке використовується для позначення кожного елемента, починається з відступу (пробілу), що робить лінію елементів дочірніми, в відображаючи лінію `pets`  - батьківською.

```yaml
pets:
 - Cat
 - Dog
 - Goldfish
```

YAML також має стилі потоку, використовуючи явні показники, а не відступи для позначення області. Послідовність потоку записується як розділений комою список у квадратних дужках. Аналогічним чином у потоці відображень (flow mapping) використовуються фігурні дужки.

```yaml
# Sequence of Sequences
- [name        , hr, avg  ]
- [Mark McGwire, 65, 0.278]
- [Sammy Sosa  , 63, 0.288]
# Mapping of Mappings
Mark McGwire: {hr: 65, avg: 0.278}
Sammy Sosa: {
    hr: 63,
    avg: 0.288
  }
```

## Використання якорів (Anchors)

Будь-який вузол YAML може бути закріплений і посилатися в іншому місці як псевдонім. Щоб закріпити певне значення або набір значень, використовуйте  `&name of anchor`. Для посилання на нього використовується  `*name of anchor`

```yaml
item:
  - method: UPDATE
    where: &FREE_ITEMS
      - Portable Hole
      - Light Feather
    SellPrice: 0
    BuyPrice: 0

npc:
  - method: MERGE
    merge-from: {name: General Goods Vendor}
    items: *FREE_ITEMS
```

## Колекції (Collections)

Блокові колекції AML використовують відступи для сфери застосування та починають кожен запис у своєму власному рядку. 

```yaml
# Sequence of Scalars
- Mark McGwire
- Sammy Sosa
- Ken Griffey
# Mapping Scalars to Scalars
hr: 65    # Home runs
avg: 0.278 # Batting average
rbi: 147   # Runs Batted In
# Mapping Scalars to Sequences
american:
  - Boston Red Sox
  - Detroit Tigers
  - New York Yankees
national:
  - New York Mets
  - Chicago Cubs
  - Atlanta Braves
#  Sequence of Mappings
-
  name: Mark McGwire
  hr: 65
  avg: 0.278
-
  name: Sammy Sosa
  hr:   63
  avg:  0.288
```

