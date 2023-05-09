## [Про Actions (дії)](https://help.github.com/en/actions/building-actions/about-actions#about-actions)

**Actions** (**дії**) - це індивідуальні завдання, які можна комбінувати для створення робіт та налаштування робочого процесу (workflow). Ви можете створювати власні дії, а також використовувати та налаштовувати дії, якими ділиться спільнота GitHub.

Ви можете створювати дії, записуючи власний код, який взаємодіє з вашим сховищем будь-яким способом, включаючи інтеграцію з GitHub API та будь-яким стороннім доступним стороннім API. Наприклад, дія може публікувати npm-модулі, надсилати SMS-сповіщення, коли створюються нагальні питання (issues), або розгортати готовий до виробництва код.

Дії можуть виконуватися безпосередньо на машині або в контейнері Docker. Ви можете визначити вхідні, вихідні змінні та змінні середовища для дії.

### Типи дій

Ви можете створити контейнер Docker та дії JavaScript. Для дій потрібен файл метаданих для означення входів, виходів та основної точки входу для вашої дії. Ім'я файлу метаданих має бути або  `action.yml` , або `action.yaml`. Для отримання додаткової інформації див. "[Синтаксис метаданих для дій GitHub](https://help.github.com/en/articles/metadata-syntax-for-github-actions)."

| Тип              | Операційна система    |
| ---------------- | --------------------- |
| Docker container | Linux                 |
| JavaScript       | Linux, MacOS, Windows |

#### Docker container actions

Докер-контейнери пакують середовище кодом GitHub Actions. Це створює більш послідовну та надійну одиницю роботи, оскільки споживачеві дії не потрібно турбуватися про інструменти чи залежності. Дії контейнерів Docker можуть виконуватися лише в середовищі Linux, розміщеної GitHub.

Контейнер Docker дозволяють використовувати конкретні версії операційної системи, залежності, інструменти та код. Для дій, які повинні виконуватись у певній конфігурації середовища, Docker - ідеальний варіант, оскільки ви можете налаштувати операційну систему та інструменти. Через затримку для складання та отримання контейнера дії Docker-контейнера відбувається повільніше, ніж дії JavaScript.

Самостійно розміщені виконувачі (runners) повинні використовувати операційну систему Linux та встановити Docker для запуску дій контейнерів Docker. Для отримання додаткової інформації про вимоги самостійно розміщуваних виконувачів, див. "[About self-hosted runners](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#requirements-for-self-hosted-runner-machines)."

#### JavaScript actions

Дії JavaScript можуть виконуватись безпосередньо на машині виконувача та відокремлювати код дії від середовища, яке використовується для запуску коду. Використання дії JavaScript спрощує код дії та виконується швидше, ніж дія контейнера Docker.

Для того, щоб ваші дії JavaScript були сумісні з усіма виконувачами, розміщеними на GitHub (Ubuntu, Windows та macOS), упакований код JavaScript повинен бути чистим JavaScript, а не покладатися на інші бінарні файли. Дії JavaScript виконуються безпосередньо на виконувачі та використовують бінарні файли, які вже існують у віртуальному середовищі.

Для запуску дій JavaScript повинен бути встановлений Node.js для власників хостингу. Для отримання додаткової інформації про вимоги самостійно розміщуваних виконувачів, див. "[About self-hosted runners](https://help.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners#requirements-for-self-hosted-runner-machines)."

Якщо ви розробляєте проект Node.js, інструментарій дій GitHub надає пакети, які ви можете використовувати у своєму проекті для прискорення розгортання. Для отримання додаткової інформації дивіться сховище [actions/toolkit](https://github.com/actions/toolkit) 

### Вибір розміщення дій

Якщо ви розробляєте дію для використання іншими людьми, радимо зберігати дію у власному сховищі, а не зв'язувати її з іншим кодом програми. Це дозволяє вам керувати версіями, відстежувати та випускати дії, як і будь-яке інше програмне забезпечення.

Зберігання дії у власному сховищі полегшує співтовариству GitHub виявлення дії, звужує область кодової бази для розробників, що виправляють проблеми та розширюють дію, і відриває версію дії від версії іншого коду програми.

Якщо ви будуєте дію, яку ви не плануєте надавати загальнодоступній, ви можете зберігати файли дії в будь-якому місці вашого сховища. Якщо ви плануєте поєднувати дії, робочий процес та код програми в одному сховищі, радимо зберігати дії в каталозі `.github`. Наприклад, `.github/actions/action-a` та `.github/actions/action-b`.

### Керування версіями дій

Робочі процеси (Workflows) можуть посилатись на конкретні версії дій, використовуючи SHA-фіксацію, гілку чи тег.

```yaml
steps:    
  - uses: actions/setup-node@74bc508 # Reference a specific commit
  - uses: actions/setup-node@v1.0    # Reference the major version of a release   
  - uses: actions/setup-node@master  # Reference a branch
```

GitHub рекомендує використовувати семантичне версіювання під час створення дій, щоб забезпечити людям стабільний досвід. Для отримання додаткової інформації див. "[Semantic versioning](http://semver.org/)."

1. Створіть випуск за допомогою семантичної версії (v1.0.9). Для отримання додаткової інформації див. "[Creating releases](https://help.github.com/en/articles/creating-releases)."

2. Перемістіть тег основної версії (v1, v2 тощо), щоб вказати на Git ref поточного випуску. Для отримання додаткової інформації дивіться "[Git basics - tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)."
3. Введіть новий основний тег версії (v2) для порушення змін, які порушать існуючі робочі процеси. Наприклад, зміна вхідних даних може бути суттєвою.

### Створення файлу README для дії

Якщо ви плануєте публічно ділитися своєю дією, радимо створити файл README, щоб люди могли навчитися використовувати вашу дію. Ви можете включити цю інформацію до свого `README.md`:

- Детальний опис того, що робить дія

- Необхідні аргументи введення та виведення
- Необов'язкові аргументи введення та виведення
- Секрети використання дій
- змінні середовища, які використовує дія
- Приклад того, як використовувати свою дію в робочому процесі

## Синтаксис метаданих для Git Hub Actions

[Metadata syntax for GitHub Actions](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)

Ви можете створювати дії для виконання завдань у своєму сховищі. Для дій потрібен файл метаданих, який використовує синтаксис YAML.

Для дій Docker та JavaScript потрібен файл метаданих. Ім'я файлу метаданих має бути або `action.yml`, або `action.yaml`. Дані у файлі метаданих означують входи, виходи та основну точку входу для вашої дії. Файл метаданих для дій використовує синтаксис YAML.  Про мову опису YAML Ви можете прочитати [тут](yaml.md).

### `name`

**Обов'язково** імя дії. GitHub відображає ім'я `name` на закладці **Actions**  для допомоги при візуальній ідентифікації дії для кожного завдання.

### `author`

**Optional** Ім'я автора дії.

### `description`

**Required** Короткий опис дії 

### `inputs`

**Optional** Вхідні параметри дозволяють вказати дані, які дія очікує для використання під час виконання. GitHub зберігає вхідні параметри як змінні середовища. Вхідні ідентифікатори з великими літерами під час виконання перетворюються на малі літери. Ми рекомендуємо використовувати вхідні ідентифікатори з малими літерами.

#### Приклад

Цей приклад конфігурує два входи: numOctocats та octocatEyeColor. Введення numOctocats не обов'язкове та буде мати за замовчуванням значення "1". Введення octocatEyeColor обов'язкове і не має значення за замовчуванням. Файли Workflow, які використовують цю дію, повинні використовувати ключове слово `with` для встановлення вхідного значення для octocatEyeColor. Для отримання додаткової інформації про синтаксис `with`  див "[Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions/#jobsjob_idstepswith)."

```yaml
inputs:
  numOctocats:
    description: 'Number of Octocats'
    required: false
    default: '1'
  octocatEyeColor:
    description: 'Eye color of the Octocats'
    required: true
```

Коли ви вказуєте вхідні дані до дії у файлі робочого процесу або використовуєте значення вводу за замовчуванням, GitHub створює змінну середовища для введення з назвою `INPUT_<VARIABLE_NAME>`. Створена змінна середовища перетворює вхідні імена на великі літери та замінює пробіли символами `_`.

Наприклад, якщо робочий процес означав входи numOctocats та octocatEyeColor, код дії може читати значення входів, використовуючи змінні середовища `INPUT_NUMOCTOCATS` та ` INPUT_OCTOCATEYECOLOR`.

#### `inputs.<input_id>`

**Required**  Ідентифікатор типу`string` що асоціюється з входом. Значення `<input_id>` відображається на вхідні метадані. `<input_id>` повинен бути унікальним ідентифікатором в об'єкті `inputs` . `<input_id>` повинен починатися з літери або `_` і містити цифро-буквені символи, `-`, або `_`.

#### `inputs..description`

**Required** A `string` description of the input parameter.

#### `inputs..required`

**Required** A `boolean` to indicate whether the action requires the input parameter. Set to `true` when the parameter is required.

#### `inputs..default`

**Optional** A `string` representing the default value. The default value is used when an input parameter isn't specified in a workflow file.

### `outputs`

**Optional** Вихідні параметри дозволяють оголошувати дані, які встановлює дія. Дії, які виконуються пізніше в робочому процесі, можуть використовувати набір вихідних даних у раніше виконаних діях. Наприклад, якщо у вас була дія, яка виконувала додавання двох входів (x + y = z), дія може вивести суму (z) для інших дій, що використовуються як вхідні дані.

Якщо ви не оголосили вихід у файлі метаданих дії, ви все одно можете встановити виходи та використовувати їх у робочому процесі. Для отримання додаткової інформації про налаштування виходів у дії, див "[Workflow commands for GitHub Actions](https://help.github.com/en/actions/reference/workflow-commands-for-github-actions/#setting-an-output-parameter)."

#### Приклад 

```yaml
outputs:
  sum: # id of the output
    description: 'The sum of the inputs'
```

#### `outputs.<output_id>`

**Required** A `string` identifier to associate with the output. The value of `<output_id>` is a map of the output's metadata. The `<output_id>` must be a unique identifier within the `outputs` object. The `<output_id>` must start with a letter or `_` and contain only alphanumeric characters, `-`, or `_`.

#### `outputs..description`

**Required** A `string` description of the output parameter.

### `runs` for JavaScript actions

**Required** Налаштовує шлях до коду дії та програми, що використовується для виконання коду 

#### Приклад використовуючи Node.js

```yaml
runs:
  using: 'node12'
  main: 'main.js'
```

#### `runs.using`

**Required** The application used to execute the code specified in [`main`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsmain).

#### `runs.main`

**Required** The file that contains your action code. The application specified in [`using`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing) executes this file.

#### `pre`

**Optional** Allows you to run a script at the start of a job, before the `main:` action begins. For example, you can use `pre:` to run a prerequisite setup script. The application specified with the [`using`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing) syntax will execute this file. The `pre:` action always runs by default but you can override this using [`pre-if`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#pre-if).

In this example, the `pre:` action runs a script called `setup.js`:

```yaml
runs:
  using: 'node12'
  pre: 'setup.js'
  main: 'index.js'
  post: 'cleanup.js'
```

#### `pre-if`

**Optional** Allows you to define conditions for the `pre:` action execution. The `pre:` action will only run if the conditions in `pre-if` are met. If not set, then `pre-if` defaults to `always()`. Note that the `step` context is unavailable, as no steps have run yet. 

In this example, `cleanup.js` only runs on Linux-based runners:

```yaml
  pre: 'cleanup.js'
  pre-if: 'runner.os == linux'
```

#### `post`

**Optional** Allows you to run a script at the end of a job, once the `main:` action has completed. For example, you can use `post:` to terminate certain processes or remove unneeded files. The application specified with the [`using`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing) syntax will execute this file.

In this example, the `post:` action runs a script called `cleanup.js`:

```yaml
runs:
  using: 'node12'
  main: 'index.js'
  post: 'cleanup.js'
```

The `post:` action always runs by default but you can override this using `post-if`.

#### `post-if`

**Optional** Allows you to define conditions for the `post:` action execution. The `post:` action will only run if the conditions in `post-if` are met. If not set, then `post-if` defaults to `always()`.

For example, this `cleanup.js` will only run on Linux-based runners:

```yaml
  post: 'cleanup.js'
  post-if: 'runner.os == linux'
```

### `runs` для дій Docker

**Required** Налаштування образу, яке використовується для дії Docker.

#### Приклад використання Dockerfile у репозиторії 

```yaml
runs: 
  using: 'docker'
  image: 'Dockerfile'
```

#### Приклад використання публічно зареєстрованого контейнеру Docker registry container

```yaml
runs: 
  using: 'docker'
  image: 'docker://debian:stetch-slim'
```

#### `runs.using`

**Required** Повинно стояти значення `'docker'`.

#### `pre-entrypoint`

**Optional** Allows you to run a script before the `entrypoint` action begins. For example, you can use `pre-entrypoint:` to run a prerequisite setup script. GitHub Actions uses `docker run` to launch this action, and runs the script inside a new container that  uses the same base image. This means that the runtime state is different from the main `entrypoint` container, and any states you require must be accessed in either the workspace, `HOME`, or as a `STATE_` variable. The `pre-entrypoint:` action always runs by default but you can override this using [`pre-if`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#pre-if).

The application specified with the [`using`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing) syntax will execute this file.

In this example, the `pre-entrypoint:` action runs a script called `setup.sh`:

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
  - 'bzz'
  pre-entrypoint: 'setup.sh'
  entrypoint: 'main.sh'
```

#### `runs.image`

**Required**  Образ Докера, який використовується як контейнер для запуску дії. Значенням може бути ім'я базового образу Docker, локальний `Dockerfile` у вашому сховищі або загальнодоступний образ в Docker Hub або іншому реєстрі. Для посилання на локальний файл Dockerfile до вашого сховища використовуйте шлях відносно файлу метаданих вашої дії. Застосунок `docker` виконає цей файл.

#### `runs.env`

**Optional** Вказує відображення ключа/значення змінних середовища, які слід встановити в середовищі контейнера.

#### `runs.entrypoint`

**Optional** Перезаписує Docker  `ENTRYPOINT`  значенням `Dockerfile` або встановлює його, якщо його ще не було вказано. Використовуйте `entrypoint` , коли в `Dockerfile` не вказаний `ENTRYPOINT`  або ви хочете змінити інструкцію `ENTRYPOINT` . Якщо ви опустите `entrypoint`, виконаються команди, вказані в інструкції Docker` ENTRYPOINT`. Інструкція Docker `ENTRYPOINT` має форму *shell* та *exec*. Документація `ENTRYPOINT` рекомендує використовувати форму *exec* інструкції ` ENTRYPOINT`.

For more information about how the `entrypoint` executes, see "[Dockerfile support for GitHub Actions](https://help.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions/#entrypoint)."

#### `post-entrypoint`

**Optional**  Allows you to run a cleanup script once the `runs.entrypoint` action has completed. GitHub Actions uses `docker run` to launch this action. Because  GitHub Actions runs the script inside a new container using the same base image, the runtime state is different from the main `entrypoint` container. You can access any state you need in either the workspace, `HOME`, or as a `STATE_` variable. The `post-entrypoint:` action always runs by default but you can override this using [`post-if`](https://help.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#post-if).

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
  - 'bzz'
  entrypoint: 'main.sh'
  post-entrypoint: 'cleanup.sh'
```

#### `runs.args`

**Optional** Масив рядків, що означують входи для контейнера Docker. Вхідні дані можуть містити hardcoded strings. GitHub передає `args` в контейнер `ENTRYPOINT` , коли контейнер запускається.

`args`  використовуються замість інструкції `CMD`  в `Dockerfile`. Якщо ви використовуєте `CMD` у своєму ` Dockerfile`, використовуйте впорядковані налаштування:

1. Задокументуйте необхідні аргументи в README дії та пропустіть їх з інструкції `CMD`.
2. Використовуйте параметри за замовчуванням, які дозволяють використовувати дію, не вказуючи жодних `args`.
3. Якщо дія відкриває прапор `--help` або щось подібне, використовуйте це, щоб зробити свою дію самодокументуванням.

Якщо вам потрібно передати змінні середовища в дію, переконайтеся, що ваша дія виконує командну оболонку для виконання підстановки змінної. Наприклад, якщо для вашого атрибута `entrypoint` встановлено значення ` "sh -c" `, ` args` буде запущено в командній оболонці. Крім того, якщо ваш `Dockerfile` використовує` ENTRYPOINT` для запуску тієї самої команди (`"sh -c"`), `args` буде виконуватися в командній оболонці.

For more information about using the `CMD` instruction with GitHub Actions, see "[Dockerfile support for GitHub Actions](https://help.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions/#cmd)."

##### Приклад 

```yaml
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - ${{ inputs.greeting }}
    - 'foo'
    - 'bar'
```

### `branding`

You can use a color and [Feather](https://feathericons.com/) icon to create a badge to personalize and distinguish your action. Badges are shown next to your action name in [GitHub Marketplace](https://github.com/marketplace?type=actions).

#### Example

```yaml
branding:
  icon: 'award'  
  color: 'green'
```

#### `branding.color`

The background color of the badge. Can be one of: `white`, `yellow`, `blue`, `green`, `orange`, `red`, `purple`, or `gray-dark`.

#### `branding.icon`

The name of the [Feather](https://feathericons.com/) icon to use.


