# Елементи SVG

## Тег SVG

https://developer.mozilla.org/ru/docs/Web/SVG/Element/svg

Элемент `svg` является контейнером, который определяет новую систему координат и [область просмотра](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox). Он используется, как самый внешний элемент документов SVG, но также  может использоваться для встраивания фрагмента SVG в документ SVG или  HTML. 

Примечание. Атрибут `xmlns` требуется только для самого внешнего элемента `svg` документов SVG. Это не нужно для внутренних элементов `svg` или внутри документов HTML.

```html
<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="grey">
  <circle cx="50" cy="50" r="40" />
  <circle cx="150" cy="50" r="4" />

  <svg viewBox="0 0 10 10" x="200" width="100">
    <circle cx="5" cy="5" r="4" />
  </svg>
</svg>
```

### viewBox

`Аттрибут viewBox` определяет расположение и размеры окна отображения SVG.

Значение атрибута `viewBox` — это набор четырёх чисел: `min-x`, `min-y`, `width` и `height`, — разделённых пробелами и/или запятой, которые задают прямоугольник в  пользовательском пространстве, стороны которого определяют границы окна  отображения элемента SVG (не [браузера](https://developer.mozilla.org/ru/docs/Glossary/Viewport)).

Для элемента [`<svg>`](https://developer.mozilla.org/ru/docs/Web/SVG/Element/svg), `viewBox` определяет расположение и размеры содержимого элемента `<svg>`.

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- С относительными единицами, такими как проценты, размер квадрата не меняется в зависимости от значения viewBox -->
  <rect x="0" y="0" width="100%" height="100%"/>
  <!-- При больших значениях viewBox круг получается маленьким, потому что его радиус указан в абсолютных единицах: расстояние 4 получается маленьким относительно размера окна 100, указанного во viewBox -->
  <circle cx="50%" cy="50%" r="4" fill="white"/>
</svg>

<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Также не зависит от viewBox, как и в предыдущем примере -->
  <rect x="0" y="0" width="100%" height="100%"/>
  <!-- С маленьким значением размера viewBox круг получается большим, потому что радиус 4 намного больше, если размер области отображения равен 10, чем если он равен 100 -->
  <circle cx="50%" cy="50%" r="4" fill="white"/>
</svg>

<svg viewBox="-5 -5 10 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Точка с координатами (0, 0) теперь является центром области отображения. 100% всё ещё приравнивается к полному размеру области отображения (10 на 10), поэтому квадрат выглядит сдвинутым в правый нижний угол -->
  <rect x="0" y="0" width="100%" height="100%"/>

  <!-- Так как точка (0, 0) находится в центре, а координаты круга, равные 50%, относительно размера области отображения (10 на 10) принимаются равными 5, круг оказывается с центром в правом нижнем углу -->
  <circle cx="50%" cy="50%" r="4" fill="white"/>
</svg>
```

### height

​    Отображаемая высота прямоугольной области просмотра. (Не высота его системы координат.)

### width

​    Отображаемая ширина прямоугольной области просмотра. (Не ширина его системы координат.)
​    Value type: <length>|<percentage> ; Default value: auto; Animatable: yes

### x

​    The displayed x coordinate of the svg container. No effect on outermost svg elements.
​    Value type: <length>|<percentage> ; Default value: 0; Animatable: yes

### y

​    The displayed y coordinate of the svg container. No effect on outermost svg elements.

## Прямокутник (rect) 

https://developer.mozilla.org/ru/docs/Web/SVG/Element/rect

`<rect>` - это базовая SVG фигура, используется для  отрисовки прямоугольников по координатам угла, длины и  высоты прямоугольника. Также может использоваться для отрисовки  прямоугольников со скруглёнными углами.

```html
<?xml version="1.0"?>
<svg width="120" height="120"
     viewBox="0 0 120 120"
     xmlns="http://www.w3.org/2000/svg">

  <rect x="10" y="10" width="100" height="100"/>
  <rect x="10" y="10" width="100" height="100" rx="15" ry="15"/>
</svg>
```

### [Глобальные атрибуты](https://developer.mozilla.org/ru/docs/Web/SVG/Element/rect#глобальные_атрибуты)

- [Атрибуты условной обработки](https://developer.mozilla.org/en-US/SVG/Attribute#conditionalproccessing) »
- [Атрибуты ядра](https://developer.mozilla.org/en-US/SVG/Attribute#core) »
- [Атрибуты графических собы](https://developer.mozilla.org/en-US/SVG/Attribute#graphicalevent)тий »
- [Атрибуты представления](https://developer.mozilla.org/en-US/SVG/Attribute#presentation) »
- `class`
- `style (en-US)`
- `externalResourcesRequired`
- `transform`

### [Специальные атрибуты](https://developer.mozilla.org/ru/docs/Web/SVG/Element/rect#специальные_атрибуты)

- `x`
- `y`
- `width`
- `height (en-US)`
- `rx`
- `ry`

## Група (g)

[SVG: группировка и переиспользование элементов](http://css.yoksel.ru/svg-groups-use/)

Элемент `g` используется для группировки других SVG элементов. Любые преобразования применяемые к `g` элементу наследуются его дочерними  элементами. Также `g` используется для группировки различных элементов,  чтобы позднее можно было сослаться на них с помощью [`use`](https://developer.mozilla.org/ru/docs/Web/SVG/Element/use).

```html
<svg viewBox="0 0 95 50"
     xmlns="http://www.w3.org/2000/svg">
   <g stroke="green" fill="white" stroke-width="5">
     <circle cx="25" cy="25" r="15"/>
     <circle cx="40" cy="25" r="15"/>
     <circle cx="55" cy="25" r="15"/>
     <circle cx="70" cy="25" r="15"/>
   </g>
</svg>
```

Группы работают не как вложенные элементы в HTML, а скорее как группировка элементов в графических редакторах.

Группы никак не проявляют себя визуально, но могут быть использованы  для групповых операций над своим содержимым: можно применять  трансформации сразу для группы элементов, без необходимости двигать их  по одному, можно задать визуальное оформление всей группе сразу, и его  унаследуют все элементы внутри группы. При этом свойства группы добавляются внутренним элементам, не  переопределяя существующие. Например, если у элемента заливка красная, а у группы зеленая, — заливка элемента останется красной.

Чтобы элемент мог унаследовать визуальное оформление группы, у него не должно быть своего оформления.

## Означення (defs)

SVG позволяет задавать графические объекты для последующего  использования. Рекомендуется там, где это возможно, объявлять подобные  элементы внутри элемента **`<defs>`**. Объекты, созданные внутри элемента `<defs>` не отображаются немедленно; рассматривайте их, как шаблоны или макросы, созданные для будущего использования.

Создание подобных элементов внутри элемента `<defs>` способствует лучшему пониманию содержимого SVG и поэтому способствует также доступности. Вы можете использовать элемент [`use`](https://developer.mozilla.org/ru/docs/Web/SVG/Element/use). чтобы отрисовать данные элементы в любом месте области просмотра.

`<defs>` также можно использовать для создания градиентов; в качестве иллюстрации можно посмотреть пример для атрибута `x1`.

Тег `defs` служит библиотекой элементов и эффектов, которые будут использоваться позже. Содержимое тега не отображается на странице.

```html
<svg width="200" height="200">
  <!-- Скрытый контейнер для эффектов и фигур -->
  <defs>
    <!-- Группа градиентов -->
    <g>
      <linearGradient id="g1" x1="0%" y1="0%" x2="90%" y2="90%">
        <stop stop-color="crimson" offset="0%"/>
        <stop stop-color="gold" offset="100%"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="90%" y2="90%">
        <stop stop-color="yellowgreen" offset="0%"/>
        <stop stop-color="green" offset="100%"/>
      </linearGradient>
    </g>

    <!-- Группа фигур. Она не отображается на странице -->
    <g>
      <circle fill="url(#g1)" r="50" id="sun"/>
      <rect width="200" height="70" id="rect" fill="url(#g2)"/>
    </g>
  </defs>

  <!-- Использование фигур -->
  <use xlink:href="#sun" x="120" y="60"/>
  <use xlink:href="#rect" x="0" y="110" transform="rotate(10 100 110)"/>
</svg>
```

## Символ (symbol)

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol

Елемент **`<symbol> `** використовується для визначення об'єктів графічного шаблону, які можна створити за допомогою [` use`](https://developer.mozilla.org/en-US/docs/Web/SVG/ Element/use) елемент.

Використання елементів `<символ> 'для графіки, які використовуються кілька разів в одному документі, додає структуру та семантику. Багаті за структурою документи можуть бути відображені графічно, як мова або шрифтом Брайля, і таким чином сприяти доступності.

Символ — это группа фигур, представляющая собой единое целое. Так же, как и `defs`, не отображается на странице, и так же, как `g`, может быть использована ещё раз. Внутри символа действует своя система координат.

```html
<svg width="240" height="170">
  <defs>
    <g>
      <circle fill="gold" r="30" id="yellowball"/>
    </g>

    <!-- Описание символа -->
    <symbol id="mouth">
      <polyline points="15 15 5 10 15 5"
        stroke="crimson" fill="none" stroke-width="3"/>
    </symbol>

    <!-- Описание символа -->
    <symbol id="bird">
      <g stroke="brown">
        <polyline points="0 0 0 25" stroke-width="3"
          transform="translate(25 100)"/>
        <polyline points="0 0 0 25" stroke-width="3"
          transform="translate(45 100)"/>
        <polyline points="0 0 12 0" stroke-width="3"
          transform="translate(19 125)"/>
        <polyline points="0 0 12 0" stroke-width="3"
          transform="translate(40 125)"/>
      </g>

      <use xlink:href="#mouth" x="83" y="35"/>
      <use xlink:href="#yellowball" x="90" y="55"
        transform="scale(.75)"/>
      <use xlink:href="#yellowball" x="35" y="75" width="100"/>

      <polyline points="55 70 45 90 20 80"
        stroke="orange" stroke-width="3"
        fill="none"/>

      <circle fill="black" r="5" cx="75" cy="35"/>
      <circle fill="gray" r="1" cx="77" cy="35"/>
    </symbol>
  </defs>

  <!-- Использование символа -->
  <use xlink:href="#bird" x="15" y="15"/>
  <!-- Ещё раз используем символ, повернув его по горизонтали -->
  <use xlink:href="#bird" x="0" y="35" transform="translate(225 -20) scale(-1,1)"/>
</svg>
```

## Дублювання (use)

Элемент **`<use>`** берёт элементы из SVG-документа и дублирует их где-то ещё.

Эффект такой же, как если бы элементы были полностью склонированы в DOM, а затем расположены в месте, где находится элемент `use`, подобно элементам `<template>` в HTML 5.

Большинство атрибутов `use` **не** переопределяют те, что уже заданы у элемента, на который `use` ссылается. (Это отличается от того, как атрибуты CSS-стилей, переопределяют те, что были заданы раньше в каскаде). **Только** атрибуты `x`, `y`, `width`, `height (en-US)` и `href (en-US)` элемента `use` будут переопределять те, что были заданы у элемента, на который `use` ссылается. Однако к элементу `use` будут применены любые другие атрибуты, не заданные у элемента, на который `use` ссылается.

Поскольку клонированные элементы не отображаются, нужно соблюдать осторожность при использовании [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) для стилизации элемента `use` и его клонированных потомков. Нет гарантии, что CSS-свойства будут  унаследованы клонированным DOM, пока вы явно не зададите  им использование [CSS-наследования](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance).

 По соображениям безопасности, браузеры могут применять [правило ограничения домена](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) для элементов `use` и могут отказаться загружать URL другого источника в атрибуте `href (en-US)`.

**Атрибути**

[href](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/href) - Ссылка на элемент/фрагмент, который нужно продублировать.

## href

The **`href`** attribute defines a link to a resource as a reference [URL](https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#url). The exact meaning of that link depends on the context of each element using it.

