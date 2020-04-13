[Node.js v13.12.0 Documentation](https://nodejs.org/api/console.html)

# Console

Модуль `console` забезпечує просту консоль налагодження, схожу з механізмом консолі JavaScript, який надаються веб-браузерами.

Модуль експортує два конкретні компоненти:

- Клас `Console` з такими методами, як `console.log () `,` console.error() ` та ` console.warn() `, який можна використовувати для запису до будь-якого потоку Node.js.
- Глобальний екземпляр `консолі`, налаштований для запису в `process.stdout`та `process.stderr`. Глобальну консоль можна використовувати без виклику `require('console')`.

***Попередження***: Методи об’єкта глобальної консолі не є ні послідовно синхронними, як API-адреси браузера, на які вони нагадують, ні послідовно асинхронні, як і всі інші потоки Node.js. Див. [Примітку про введення / виведення процесу](https://nodejs.org/api/process.html#process_a_note_on_process_i_o) для отримання додаткової інформації.

Приклади використання глобальної консолі `console`:

```js
console.log('hello world');
// Prints: hello world, to stdout
console.log('hello %s', 'world');
// Prints: hello world, to stdout
console.error(new Error('Whoops, something bad happened'));
// Prints: [Error: Whoops, something bad happened], to stderr

const name = 'Will Robinson';
console.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to stderr
```

Приклад використання класу `Console` :

```js
const out = getStreamSomehow();
const err = getStreamSomehow();
const myConsole = new console.Console(out, err);

myConsole.log('hello world');
// Prints: hello world, to out
myConsole.log('hello %s', 'world');
// Prints: hello world, to out
myConsole.error(new Error('Whoops, something bad happened'));
// Prints: [Error: Whoops, something bad happened], to err

const name = 'Will Robinson';
myConsole.warn(`Danger ${name}! Danger!`);
// Prints: Danger Will Robinson! Danger!, to err
```

## Class: `Console`

Клас `Console` може бути використаний для створення простого реєстратора (логера) з налаштованими потоками вихідних даних, до нього можна отримати доступ, використовуючи  `require('console').Console` , або `console.Console` (або їх деструктуровані аналоги):

```js
const { Console } = require('console');
const { Console } = console;
```

### new Console

Створює нову `Console` з одним або двома екземплярами потоку, що можна записати. `stdout` - це потік для друку журналу чи виходу інформації. `stderr` використовується для виводу попередження або помилки. Якщо `stderr` не передбачено, для `stderr` використовується `stdout`.

```js
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// Custom simple logger
const logger = new Console({ stdout: output, stderr: errorOutput });
// use it like console
const count = 5;
logger.log('count: %d', count);
// In stdout.log: count 5
```

Глобальна `console` - це спеціальна консоль, вихід якої надсилається до `process.stdout`та ` process.stderr`. Це рівнозначно виклику:

```js
new Console({stdout: process.stdout, stderr: process.stderr});
```

### console.assert

Простий тест твердження, який перевіряє, чи є знаення `value` істиною. Якщо це не так, реєструється `Assertion failed` . Якщо надано, поідомлення про помилку `message` , воно форматується за допомогою `util.format () `, передаючи всі аргументи повідомлення. Вихід використовується як повідомлення про помилку.

```js
console.assert(true, 'does nothing');
// OK
console.assert(false, 'Whoops %s work', 'didn\'t');
// Assertion failed: Whoops didn't work
```

Calling `console.assert()` with a falsy assertion will only cause the `message` to be printed to the console without interrupting execution of subsequent code.

### console.clear

When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY. When `stdout` is not a TTY, this method does nothing.

The specific operation of `console.clear()` can vary across operating systems and terminal types. For most Linux operating systems, `console.clear()` operates similarly to the `clear` shell command. On Windows, `console.clear()` will clear only the output in the current terminal viewport for the Node.js binary.

### console.count

Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.

```js
> console.count()
default: 1
undefined
> console.count('default')
default: 2
undefined
> console.count('abc')
abc: 1
undefined
> console.count('xyz')
xyz: 1
undefined
> console.count('abc')
abc: 2
undefined
> console.count()
default: 3
undefined
>
```

### console.countReset

Resets the internal counter specific to `label`.

```js
> console.count('abc');
abc: 1
undefined
> console.countReset('abc');
undefined
> console.count('abc');
abc: 1
undefined
>
```

### console.debug

The `console.debug()` function is an alias for [`console.log()`](https://nodejs.org/api/console.html#console_console_log_data_args).

### console.dir

Uses [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options) on `obj` and prints the resulting string to `stdout`. This function bypasses any custom `inspect()` function defined on `obj`.

### console.dirxml

This method calls `console.log()` passing it the arguments received. This method does not produce any XML formatting.

### console.error

Prints to `stderr` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format_args)).

```js
const code = 5;
console.error('error #%d', code);
// Prints: error #5, to stderr
console.error('error', code);
// Prints: error 5, to stderr
```

If formatting elements (e.g. `%d`) are not found in the first string then [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options) is called on each argument and the resulting string values are concatenated. See [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format_args) for more information.

### console.group

Increases indentation of subsequent lines by two spaces.

If one or more `label`s are provided, those are printed first without the additional indentation.

### console.groupCollapsed

An alias for [`console.group()`](https://nodejs.org/api/console.html#console_console_group_label).

### console.groupEnd()

Decreases indentation of subsequent lines by two spaces.

### console.info

The `console.info()` function is an alias for [`console.log()`](https://nodejs.org/api/console.html#console_console_log_data_args).

### console.log 

Prints to `stdout` with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format_args)).

```js
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdout
```

See [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format_args) for more information.

### console.table

Try to construct a table with the columns of the properties of `tabularData` (or use `properties`) and rows of `tabularData` and log it. Falls back to just logging the argument if it can’t be parsed as tabular.

```js
// These can't be parsed as tabular data
console.table(Symbol());
// Symbol()

console.table(undefined);
// undefined

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
// ┌─────────┬─────┬─────┐
// │ (index) │  a  │  b  │
// ├─────────┼─────┼─────┤
// │    0    │  1  │ 'Y' │
// │    1    │ 'Z' │  2  │
// └─────────┴─────┴─────┘

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);
// ┌─────────┬─────┐
// │ (index) │  a  │
// ├─────────┼─────┤
// │    0    │  1  │
// │    1    │ 'Z' │
// └─────────┴─────┘
```

### console.time

Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`. Use the same `label` when calling [`console.timeEnd()`](https://nodejs.org/api/console.html#console_console_timeend_label) to stop the timer and output the elapsed time in milliseconds to `stdout`. Timer durations are accurate to the sub-millisecond.

### console.timeEnd

Stops a timer that was previously started by calling [`console.time()`](https://nodejs.org/api/console.html#console_console_time_label) and prints the result to `stdout`:

```js
console.time('100-elements');
for (let i = 0; i < 100; i++) {}
console.timeEnd('100-elements');
// prints 100-elements: 225.438ms
```

### console.timeLog

For a timer that was previously started by calling [`console.time()`](https://nodejs.org/api/console.html#console_console_time_label), prints the elapsed time and other `data` arguments to `stdout`:

```js
console.time('process');
const value = expensiveProcess1(); // Returns 42
console.timeLog('process', value);
// Prints "process: 365.227ms 42".
doExpensiveProcess2(value);
console.timeEnd('process');
```

### console.trace

Prints to `stderr` the string `'Trace: '`, followed by the [`util.format()`](https://nodejs.org/api/util.html#util_util_format_format_args) formatted message and stack trace to the current position in the code.

```js
console.trace('Show me');
// Prints: (stack trace will vary based on where trace is called)
//  Trace: Show me
//    at repl:2:9
//    at REPLServer.defaultEval (repl.js:248:27)
//    at bound (domain.js:287:14)
//    at REPLServer.runBound [as eval] (domain.js:300:12)
//    at REPLServer.<anonymous> (repl.js:412:12)
//    at emitOne (events.js:82:20)
//    at REPLServer.emit (events.js:169:7)
//    at REPLServer.Interface._onLine (readline.js:210:10)
//    at REPLServer.Interface._line (readline.js:549:8)
//    at REPLServer.Interface._ttyWrite (readline.js:826:14)
```

### console.warn

The `console.warn()` function is an alias for [`console.error()`](https://nodejs.org/api/console.html#console_console_error_data_args).

## Inspector only methods

The following methods are exposed by the V8 engine in the general API but do not display anything unless used in conjunction with the [inspector](https://nodejs.org/api/debugger.html) (`--inspect` flag).

### console.profile

This method does not display anything unless used in the inspector. The `console.profile()` method starts a JavaScript CPU profile with an optional label until [`console.profileEnd()`](https://nodejs.org/api/console.html#console_console_profileend_label) is called. The profile is then added to the **Profile** panel of the inspector.

```js
console.profile('MyLabel');
// Some code
console.profileEnd('MyLabel');
// Adds the profile 'MyLabel' to the Profiles panel of the inspector.
```

### console.profileEnd

This method does not display anything unless used in the inspector. Stops the current JavaScript CPU profiling session if one has been started and prints the report to the **Profiles** panel of the inspector. See [`console.profile()`](https://nodejs.org/api/console.html#console_console_profile_label) for an example.

If this method is called without a label, the most recently started profile is stopped.

### console.timeStamp

This method does not display anything unless used in the inspector. The `console.timeStamp()` method adds an event with the label `'label'` to the **Timeline** panel of the inspector.