# Атрибути

<https://developer.mozilla.org/ru/docs/Web/SVG/Attribute>

## Глобальні атрибути

### style

Атрибут `style`  дозволяє стилізувати елемент за допомогою оголошень [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS). Він функціонує ідентично до [атрибуту`style` в HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style).

```html
<svg viewbox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="80"  height="40" x="10" y="10" style="fill: skyblue; stroke: cadetblue; stroke-width: 2;"/>
</svg>
```

### class

Присвоение класса или набора классов элементу. Вы можете присвоить  одинаковые классы/наборы классов любому количеству элементов. Если вы  указываете(присваиваете) несколько имён классов, они должны быть  разделены символом "пробел".

Класс элемента имеет 2 ключевые роли:

- Селектор таблицы стилей, для использования когда автор желает стилизировать набор(несколько) элементов.
- Для общих целей Броузера.

Класс может быть использован для стилизации SVG содержимого используя CSS.

### transform

https://developer.mozilla.org/ru/docs/Web/SVG/Attribute/transform

В атрибуте `transform` перечисляются описания  преобразований, применяемых как к самому элементу, так и к его  последователям. Описания в списке разделяются пробелами или запятыми и  применяются в порядке слева направо.

**matrix**(`<a> <b> <c> <d> <e> <f>`)

Преобразование с использованием матрицы из шести элементов.

**translate**(`<x> [<y>]`)

Перенос по осям `x` и `y`. Равнозначно `matrix(1 0 0 1 x y)`. Если значение `y` опущено, оно принимается равным нулю.

**scale**(`<x> [<y>]`)

Масштабирование по осям `x` и `y`. Равнозначно `matrix(x 0 0 y 0 0)`. Если значение `y` опущено, оно принимается равным `x`.

**rotate**(`<a> [<x> <y>]`)

Поворот на `a` градусов вокруг указанной точки. Если необязательные параметры `x` и `y` опущены, поворот будет осуществляться вокруг начала координат текущей пользовательской системы координат.

**skewX**(`<a>`)

Наклон относительно оси `x` на `a` градусов.

**skewY**(`<a>`)

Наклон относительно оси `y` на `a` градусов. 

### [Атрибуты событий анимации](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_событий_анимации)

```
`onbegin`, `onend`, `onload`, `onrepeat
```

### [Целевые атрибуты анимации](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#animationattributetarget)

```
attributeType`, `attributeName
```

### [Атрибуты времени анимации](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_времени_анимации)

```
begin (en-US)`, `dur`, `end`, `min (en-US)`, `max (en-US)`, `restart (en-US)`, `repeatCount`, `repeatDur (en-US)`, `fill
```

### [Атрибуты значений анимации](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_значений_анимации)

```
calcMode (en-US)`, `values`, `keyTimes`, `keySplines (en-US)`, `from (en-US)`, `to (en-US)`, `by (en-US)
```

### [Атрибуты добавления анимации](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_добавления_анимации)

```
additive`, `accumulate (en-US)
```

### [Атрибуты условий](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_условий)

`requiredExtensions`, `requiredFeatures (en-US)`, `systemLanguage (en-US)`.

### [Атрибуты ядра](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_ядра)

```
id`, `xml:base (en-US)`, `xml:lang (en-US)`, `xml:space
```

### [Атрибуты событий документа](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_событий_документа)

```
onabort`, `onerror`, `onresize`, `onscroll`, `onunload`, `onzoom
```

### [Атрибуты простых фильтров](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_простых_фильтров)

```
height (en-US)`, `result (en-US)`, `width`, `x`, `y
```

### Атрибути графічних подій

<https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_графических_событий>

```
onactivate`, `onclick (en-US)`, `onfocusin`, `onfocusout`, `onload`, `onmousedown`, `onmousemove`, `onmouseout`, `onmouseover`, `onmouseup
```

#### onclick

<https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/onclick>

Атрибут **`onclick`** визначає якийсь скрипт для запуску при натисканні на елемент.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" onclick="alert('You have clicked the circle.')" />
</svg>
```



### [Атрибуты представления](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_представления)

Заметьте, что все атрибуты представления SVG можно использовать как CSS-свойства.

```
alignment-baseline (en-US)`, `baseline-shift (en-US)`, `clip (en-US)`, `clip-path (en-US)`, `clip-rule (en-US)`, `color (en-US)`, `color-interpolation (en-US)`, `color-interpolation-filters (en-US)`, `color-profile (en-US)`, `color-rendering (en-US)`, `cursor (en-US)`, `direction (en-US)`, `display (en-US)`, `dominant-baseline (en-US)`, `enable-background (en-US)`, `fill`, `fill-opacity`, `fill-rule`, `filter (en-US)`, `flood-color (en-US)`, `flood-opacity (en-US)`, `font-family (en-US)`, `font-size (en-US)`, `font-size-adjust (en-US)`, `font-stretch (en-US)`, `font-style (en-US)`, `font-variant (en-US)`, `font-weight`, `glyph-orientation-horizontal (en-US)`, `glyph-orientation-vertical (en-US)`, `image-rendering (en-US)`, `kerning (en-US)`, `letter-spacing`, `lighting-color`, `marker-end (en-US)`, `marker-mid (en-US)`, `marker-start (en-US)`, `mask (en-US)`, `opacity (en-US)`, `overflow`, `pointer-events (en-US)`, `shape-rendering`, `stop-color`, `stop-opacity (en-US)`, `stroke`, `stroke-dasharray (en-US)`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin (en-US)`, `stroke-miterlimit (en-US)`, `stroke-opacity (en-US)`, `stroke-width`, `text-anchor`, `text-decoration (en-US)`, `text-rendering`, `unicode-bidi (en-US)`, `visibility (en-US)`, `word-spacing (en-US)`, `writing-mode (en-US)
```

### [Атрибуты передаточных функций](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#атрибуты_передаточных_функций)

```
type (en-US)`, `tableValues (en-US)`, `slope (en-US)`, `intercept (en-US)`, `amplitude (en-US)`, `exponent (en-US)`, `offset
```

### [XLink атрибуты](https://developer.mozilla.org/ru/docs/Web/SVG/Attribute#xlink_атрибуты)

```
xlink:href (en-US)`, `xlink:type (en-US)`, `xlink:role`, `xlink:arcrole (en-US)`, `xlink:title (en-US)`, `xlink:show (en-US)`, `xlink:actuate
```