# markdown-it

https://github.com/markdown-it/markdown-it#readme

[API Documnetation](https://markdown-it.github.io/markdown-it/)

## Приклади використання

- [API documentation](https://markdown-it.github.io/markdown-it/) - for more info and examples.

### Простий

```js
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// node.js, the same, but with sugar:
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
var md = window.markdownit();
var result = md.render('# markdown-it rulezz!');
```

Однорядкова візуалізація, без обгортання абзацу:

```js
var md = require('markdown-it')();
var result = md.renderInline('__markdown-it__ rulezz!');
```

### Ініціалізація з уставками та опціями 

(*) уставки визначають комбінації активних правил та опцій. Може бути `"commonmark"`, `"zero"` або`"default"`  (якщо пропущено). Детальніше див. У [Документи API](https://markdown-it.github.io/markdown-it/#MarkdownIt.new).

```js
// commonmark mode
var md = require('markdown-it')('commonmark');

// default mode
var md = require('markdown-it')();

// enable everything
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

// full options list (defaults)
var md = require('markdown-it')({
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      false,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) { return ''; }
});
```

### Plugins load

```js
var md = require('markdown-it')()
            .use(plugin1)
            .use(plugin2, opts, ...)
            .use(plugin3);
```

### Syntax highlighting

Apply syntax highlighting to fenced code blocks with the `highlight` option:

```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
```

Or with full wrapper override (if you need assign class to `<pre>`):

```js
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});
```

### Linkify

`linkify: true` uses [linkify-it](https://github.com/markdown-it/linkify-it). To configure linkify-it, access the linkify instance through `md.linkify`:

```js
md.linkify.set({ fuzzyEmail: false });  // disables converting email to link
```

### Syntax extensions

Embedded (enabled by default):

- [Tables](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

Via plugins:

- [subscript](https://github.com/markdown-it/markdown-it-sub)
- [superscript](https://github.com/markdown-it/markdown-it-sup)
- [footnote](https://github.com/markdown-it/markdown-it-footnote)
- [definition list](https://github.com/markdown-it/markdown-it-deflist)
- [abbreviation](https://github.com/markdown-it/markdown-it-abbr)
- [emoji](https://github.com/markdown-it/markdown-it-emoji)
- [custom container](https://github.com/markdown-it/markdown-it-container)
- [insert](https://github.com/markdown-it/markdown-it-ins)
- [mark](https://github.com/markdown-it/markdown-it-mark)
- ... and [others](https://www.npmjs.org/browse/keyword/markdown-it-plugin)

#### Manage rules

За замовчуванням усі правила ввімкнено, але їх можна обмежити параметрами. При завантаженні плагіна всі його правила вмикаються автоматично.

```js
// Activate/deactivate rules, with curring
var md = require('markdown-it')()
            .disable([ 'link', 'image' ])
            .enable([ 'link' ])
            .enable('image');

// Enable everything
md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});
```

You can find all rules in sources: [parser_core.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js), [parser_block](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js), [parser_inline](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js).

# markdown-it design principles

## Data flow

Вхідні дані аналізуються за допомогою вкладених ланцюжків правил. Є 3 вкладені ланцюжки  - `core`, `block` & `inline`:

```
core
    core.rule1 (normalize)
    ...
    core.ruleX

    block
        block.rule1 (blockquote)
        ...
        block.ruleX

    core.ruleX1 (intermediate rule that applies on block tokens, nothing yet)
    ...
    core.ruleXX

    inline (applied to each block token with "inline" type)
        inline.rule1 (text)
        ...
        inline.ruleX

    core.ruleYY (applies to all tokens)
    ... (abbreviation, footnote, typographer, linkifier)
```

Результатом синтаксичного аналізу є *список токенів*, який буде передано `renderer` для генерації HTML-вмісту.

Ці маркери можна повторно проаналізувати знову, щоб сформувати більше маркерів (наприклад: `list token` можна розділити на кілька `inline tokens`).

Поряд із маркерами можна використовувати пісочницю `env` , щоб вводити зовнішні змінні для ваших аналізаторів та рендерів.

Кожен ланцюжок (core / block / inline) при аналізі даних використовує незалежний об'єкт `state`, так що кожна операція синтаксичного аналізу є незалежною і може бути відключена на льоту.

## Token stream

Замість традиційного AST ми використовуємо більш низькорівневе представлення даних - *токени*. Різниця проста:

- Токени - це проста послідовність (масив).
- Відкриваючі та закриваючі теги окремі.
- Існують спеціальні об'єкти токенів, "inline containers", що мають вкладені токени - послідовності з вбудованою розміткою (жирний, курсив, текст, ...).

Детальніше про вміст кожного маркера див. [token class](https://github.com/markdown-it/markdown-it/blob/master/lib/token.js) 

Загалом потік токенів:

- На верхньому рівні - масив парних або одинарних "блокових" токенів

  - відкрити / закрити для заголовків, списків, цитат, абзаців, ...
  - коди, огороджені блоки, горизонтальні правила, html-блоки, вбудовані контейнери

- Кожен inline token має 

  ```
  .children
  ```

  властивість із вкладеним потоком токенів для вбудованого вмісту:

  - відкрити / закрити для сильних, em, посилання, коду, ..
  - text, line breaks

Чому не AST? Тому що це не потрібно для наших завдань. Ми дотримуємося принципу KISS. За бажанням - ви можете викликати парсер без візуалізації та перетворити потік маркерів на AST.

## Rules

Правила - це функції, які роблять "магію" за допомогою об'єктів  `state`  аналізатора. Правило асоціюється з одним або кількома *ланцюжками* (chains) і є унікальним. Наприклад, маркер `blockquote` асоціюється з ланцюжками ` blockquote`, `paragraph`,` heading` і `list`.

Правила управляються іменами за допомогою екземплярів [Ruler](https://markdown-it.github.io/markdown-it/#Ruler) і можуть бути `увімкненими`/` вимкненими` з методів [MarkdownIt](https://markdown-it.github.io/markdown-it/#MarkdownIt) 

Ви можете зауважити, що деякі правила мають  `validation mode` - у цьому режимі правила не змінюють потік маркера, а лише очікують на кінець маркера. Це один із важливих принципів проектування - потік маркерів - це "лише запис" на етапах блочного та вбудованого аналізу.

Парсери призначені для дотримання правил незалежних один від одного. Ви можете безпечно їх увімкнути/вимкнути або додати нові. Не існує універсальних рецептів створення нових правил - розробка розподілених автоматів з хорошою ізоляцією даних - це складна справа. Але ви можете дослідити існуючі правила та плагіни, щоб побачити можливі підходи.

Крім того, у складних випадках ви можете спробувати звернутися за допомогою до трекера. Умова дуже проста - з квитка має бути зрозуміло, що ви вивчали документи, джерела та намагалися щось зробити самостійно. Ми ніколи не відмовляємо за допомогою реальним розробникам.

## Renderer

Після генерування потоку маркерів він передається [renderer](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js). Потім він відтворює всі маркери, передаючи кожен правилу з тим самим іменем, що і тип маркера.

Правила візуалізації знаходяться в `md.renderer.rules[name]` і являють собою прості функції з однаковим підписом:

```
function (tokens, idx, options, env, renderer) {
  //...
  return htmlResult;
}
```

У багатьох випадках це дозволяє легко змінювати вихідні дані навіть без втручання парсера. Наприклад, давайте замінимо зображення на посилання vimeo на iframe гравця:

```js
var md = require('markdown-it')();

var defaultRender = md.renderer.rules.image,
    vimeoRE       = /^https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  var token = tokens[idx],
      aIndex = token.attrIndex('src');

  if (vimeoRE.test(token.attrs[aIndex][1])) {

    var id = token.attrs[aIndex][1].match(vimeoRE)[2];

    return '<div class="embed-responsive embed-responsive-16by9">\n' +
           '  <iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + id + '"></iframe>\n' +
           '</div>\n';
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
```

Ось ще один приклад, як додати `target=" _ blank"` до всіх посилань:

```js
// Remember old renderer, if overridden, or proxy to default renderer
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  var aIndex = tokens[idx].attrIndex('target');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};
```

Зверніть увагу: якщо вам потрібно додати атрибути, ви можете робити щось без заміни візуалізації. Наприклад, ви можете оновити маркери в ланцюжку `core`. Це повільніше, ніж перевизначення прямого візуалізації, але може бути і простішим. Давайте використаємо плагін  [markdown-for-inline](https://github.com/markdown-it/markdown-it-for-inline) , щоб зробити те саме, що і в попередньому прикладі:

```js
var iterator = require('markdown-it-for-inline');

var md = require('markdown-it')()
            .use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
              var aIndex = tokens[idx].attrIndex('target');

              if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']);
              } else {
                tokens[idx].attrs[aIndex][1] = '_blank';
              }
            });
```

Ви також можете написати власний візуалізатор, щоб генерувати інші формати, окрім HTML, такі як JSON/XML ... Ви навіть можете використовувати його для створення AST.

## Summary

Про це згадувалось у [Data flow](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#data-flow), але давайте повторимо послідовність ще раз:

1. Блоки аналізуються, і верхній рівень потоку токенів заповнюється блочними токенами.
2. Вміст у вбудованих контейнерах аналізується, заповнюючи властивості  `.children` .
3. Відбувається візуалізація (Rendering ).

І десь між ними можна застосувати додаткові перетворення :). Повний вміст кожного ланцюжка можна побачити у верхній частині файлів  [parser_core.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js), [parser_block.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js) and [parser_inline.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js) .

Також ви можете змінити результат безпосередньо у [renderer](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js) для багатьох простих випадків.

# API

[API documentation](https://markdown-it.github.io/markdown-it/) 

## Core

Виконавець правил верхнього рівня. Зклеює block/inline парсери та виконують проміжні перетворення.

**Constructor**

- [new Core](https://markdown-it.github.io/markdown-it/#Core.new)

**Class methods**

- [process](https://markdown-it.github.io/markdown-it/#Core.process) - Executes core chain rules.

**Instance properties**

- [ruler](https://markdown-it.github.io/markdown-it/#Core.prototype.ruler) - [Ruler](https://markdown-it.github.io/markdown-it/#Ruler) instance. Keep configuration of core rules.

## MarkdownIt

Main parser/renderer class.

**Constructor**

- [new MarkdownIt](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) - Creates parser instanse with given config. Can be called without `new`.

**Class methods**

- [configure](https://markdown-it.github.io/markdown-it/#MarkdownIt.configure) - Batch load of all options and compenent settings. This is internal method, and you probably will not need it. But if you will - see available presets and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets) We strongly recommend to use presets instead of direct config loads. That will give better compatibility with next versions.
- [disable](https://markdown-it.github.io/markdown-it/#MarkdownIt.disable) - The same as [MarkdownIt.enable](https://markdown-it.github.io/markdown-it/#MarkdownIt.enable), but turn specified rules off.
- [enable](https://markdown-it.github.io/markdown-it/#MarkdownIt.enable) - Enable list or rules. It will automatically find appropriate components, containing rules with given names. If rule not found, and `ignoreInvalid` not set - throws exception.
- [parse](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse) - Парсить вхідний рядок та повертає список  block tokens (спеціальний тип маркера "inline" міститиме список вбудованих маркерів). Ви не повинні викликати цей метод безпосередньо, поки не напишете власний візуалізатор (наприклад, для створення AST).
- [parseInline](https://markdown-it.github.io/markdown-it/#MarkdownIt.parseInline) - The same as [MarkdownIt.parse](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse) but skip all block rules. It returns the block tokens list with the single `inline` element, containing parsed inline tokens in `children` property. Also updates `env` object.
- [render](https://markdown-it.github.io/markdown-it/#MarkdownIt.render) - Рендерить markdown в html Це робить для вас всю магію :). `env` можна використовувати для введення додаткових метаданих (` {} `за замовчуванням). Але це вам не знадобиться з великою ймовірністю. Див. Також коментар у [MarkdownIt.parse](https://markdown-it.github.io/markdown-it/#MarkdownIt.parse). 
- [renderInline](https://markdown-it.github.io/markdown-it/#MarkdownIt.renderInline) - Similar to [MarkdownIt.render](https://markdown-it.github.io/markdown-it/#MarkdownIt.render) but for single paragraph content. Result will NOT be wrapped into `<p>` tags.
- [set](https://markdown-it.github.io/markdown-it/#MarkdownIt.set) - Set parser options (in the same format as in constructor). Probably, you will never need it, but you can change options after constructor call.
- [use](https://markdown-it.github.io/markdown-it/#MarkdownIt.use) - Load specified plugin with given params into current parser instance. It's just a sugar to call `plugin(md, params)` with curring.

**Instance methods**

- [normalizeLink](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.normalizeLink)
- [normalizeLinkText](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.normalizeLinkText)
- [validateLink](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.validateLink)

**Instance properties**

- [block](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.block) -  Екземпляр [ParserBlock](https://markdown-it.github.io/markdown-it/#ParserBlock). Він може знадобитися для додавання нових правил під час написання плагінів. For simple rules control use [MarkdownIt.disable](https://markdown-it.github.io/markdown-it/#MarkdownIt.disable) and [MarkdownIt.enable](https://markdown-it.github.io/markdown-it/#MarkdownIt.enable).
- [core](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.core)
- [helpers](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.helpers)
- [inline](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.inline)
- [linkify](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.linkify)
- [renderer](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.renderer)
- [utils](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.utils)

### parse

```js
MarkdownIt.parse(src, env)
```

- src (String) - source string
- env (Object) - environment sandbox

Парсить вхідний рядок та повертає список  block tokens (спеціальний тип маркера "inline" міститиме список вбудованих маркерів). Ви не повинні викликати цей метод безпосередньо, поки не напишете власний візуалізатор (наприклад, для створення AST).

env використовується для передачі даних між "розподіленими" правилами та повернення додаткових метаданих, таких як довідкова інформація, необхідних для візуалізації. Він також може використовуватися для введення даних у конкретних випадках. Зазвичай ви можете передати {}, а потім передати оновлений об’єкт у візуалізатор.

## ParserBlock

Токенізатор на рівні блоку.

**Constructor**

- [new ParserBlock](https://markdown-it.github.io/markdown-it/#ParserBlock.new)

**Class methods**

- [parse](https://markdown-it.github.io/markdown-it/#ParserBlock.parse) - Process input string and push block tokens into `outTokens`

**Instance properties**

- [ruler](https://markdown-it.github.io/markdown-it/#ParserBlock.prototype.ruler)

## ParserInline

Tokenizes paragraph content.

**Constructor**

- [new ParserInline](https://markdown-it.github.io/markdown-it/#ParserInline.new)

**Class methods**

- [parse](https://markdown-it.github.io/markdown-it/#ParserInline.parse)

**Instance properties**

- [ruler](https://markdown-it.github.io/markdown-it/#ParserInline.prototype.ruler)
- [ruler2](https://markdown-it.github.io/markdown-it/#ParserInline.prototype.ruler2)

## Renderer

Generates HTML from parsed token stream. Each instance has independent copy of rules. Those can be rewritten with ease. Also, you can add new rules if you create plugin and adds new token types.

**Constructor**

- [new Renderer](https://markdown-it.github.io/markdown-it/#Renderer.new)

**Class methods**

- [render](https://markdown-it.github.io/markdown-it/#Renderer.render)
- [renderAttrs](https://markdown-it.github.io/markdown-it/#Renderer.renderAttrs)
- [renderInline](https://markdown-it.github.io/markdown-it/#Renderer.renderInline)
- [renderInlineAsText](https://markdown-it.github.io/markdown-it/#Renderer.renderInlineAsText)
- [renderToken](https://markdown-it.github.io/markdown-it/#Renderer.renderToken)

**Instance properties**

- [rules](https://markdown-it.github.io/markdown-it/#Renderer.prototype.rules)

## Token

**Constructor**

- [new Token](https://markdown-it.github.io/markdown-it/#Token.new)

**Class methods**

- [attrGet](https://markdown-it.github.io/markdown-it/#Token.attrGet)
- [attrIndex](https://markdown-it.github.io/markdown-it/#Token.attrIndex)
- [attrJoin](https://markdown-it.github.io/markdown-it/#Token.attrJoin)
- [attrPush](https://markdown-it.github.io/markdown-it/#Token.attrPush)
- [attrSet](https://markdown-it.github.io/markdown-it/#Token.attrSet)

**Instance properties**

- [attrs](https://markdown-it.github.io/markdown-it/#Token.prototype.attrs) - Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
- [block](https://markdown-it.github.io/markdown-it/#Token.prototype.block) - Істина для маркерів рівня блоку, false для inline маркерів. Використовується в засобі візуалізації для обчислення розривів рядків
- [children](https://markdown-it.github.io/markdown-it/#Token.prototype.children) - An array of child nodes (inline and img tokens)
- [content](https://markdown-it.github.io/markdown-it/#Token.prototype.content) - In a case of self-closing tag (code, html, fence, etc.), it has contents of this tag.
- [hidden](https://markdown-it.github.io/markdown-it/#Token.prototype.hidden) - If it's true, ignore this element when rendering. Used for tight lists to hide paragraphs.
- [info](https://markdown-it.github.io/markdown-it/#Token.prototype.info) - Info string for "fence" tokens; The value "auto" for autolink "link_open" and "link_close" tokens
- [level](https://markdown-it.github.io/markdown-it/#Token.prototype.level) - nesting level, the same as `state.level`
- [map](https://markdown-it.github.io/markdown-it/#Token.prototype.map) - Source map info. Format: `[ line_begin, line_end ]`
- [markup](https://markdown-it.github.io/markdown-it/#Token.prototype.markup) - '*' or '_' for emphasis, fence string for fence, etc.
- [meta](https://markdown-it.github.io/markdown-it/#Token.prototype.meta) - A place for plugins to store an arbitrary data
- [nesting](https://markdown-it.github.io/markdown-it/#Token.prototype.nesting) - Level change (number in {-1, 0, 1} set), where:
  - `1` means the tag is opening
  - `0` means the tag is self-closing
  - `-1` means the tag is closing
- [tag](https://markdown-it.github.io/markdown-it/#Token.prototype.tag) - html tag name, e.g. "p"
- [type](https://markdown-it.github.io/markdown-it/#Token.prototype.type) - Type of the token (string, e.g. "paragraph_open")

