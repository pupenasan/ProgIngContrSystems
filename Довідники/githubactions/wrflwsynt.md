# Синтаксис Workflow для GitHub Actions

Це вирізка, повна документація [тут](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions)

### `name`

Назва вашого робочого процесу. GitHub відображає назви ваших робочих процесів на сторінці дій вашого сховища. Якщо ви опустите `name` GitHub встановлює його до шляху файлу робочого процесу відносно кореня сховища.

### `on`

**Обов'язково** Назва події GitHub, яка запускає робочий процес. Ви можете надати одну подію `string`, масив (`array` ) подій, "масив" типів подій ( `array` of event `types`), або відображення конфігурації події (event configuration `map` ), яка планує робочий процес або обмежує виконання робочого процесу певними файлами, тегами або змінами гілки. Список доступних подій див "[Events that trigger workflows](https://help.github.com/en/articles/events-that-trigger-workflows)."

#### Приклад єдиної події 

```yaml
# Trigger on push
on: push
```

#### Приклад списку подій 

```yaml
# Trigger the workflow on push or pull request
on: [push, pull_request]
```

#### Приклад використання кількох подій з типом дій або конфігруацією 

Якщо вам потрібно вказати типи дій або конфігурацію події, потрібно налаштувати кожну подію окремо. Ви повинні додати двокрапку (`:`) до всіх подій, включаючи події без конфігурації.

```yaml
on:
  # Trigger the workflow on push or pull request,
  # but only for the master branch
  push:
    branches:
      - master
  pull_request:
    branches:
      - master
  # Also trigger on page_build, as well as release created events
  page_build:
  release:
    types: # This configuration does not affect the page_build event above
      - created
```

### `env`

Відображення `map` змінних середовищ, які доступні для всіх завдань і кроків робочого процесу. Ви також можете встановити змінні середовища, які доступні лише для завдання чи кроку. Для отримання додаткової інформації, див [`jobs..env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenv) і [`jobs..steps.env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

Коли більше однієї змінної середовища визначено з тим самим іменем, GitHub використовує найбільш конкретну змінну середовища. Наприклад, змінна середовища, означена на кроці, буде заміняти змінні завдання та робочого процесу з тим самим іменем, коли виконується крок. Змінна, означена для завдання, замінить змінну робочого процесу з тим самим іменем, коли завдання виконується.

#### Приклад 

```yaml
env:
  SERVER: production
```

### `jobs`

Запуск робочого процесу складається з одного або декількох завдань. Завдання виконуються паралельно за замовчуванням. Щоб послідовно виконувати завдання, ви можете визначити залежності від інших завдань за допомогою ключового слова `jobs.<job_id>.needs`.

Кожне завдання виконується в середовищі, означеному `runs-on`.

Ви можете виконувати необмежену кількість завдань, якщо ви знаходитесь в межах лімітів використання робочого процесу. Для отримання додаткової інформації, див. "[Usage limits](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#usage-limits)."

Якщо вам потрібно знайти унікальний ідентифікатор виконання завдання, виконаної в робочому процесі, ви можете скористатися GitHub API . Для отримання додаткової інформації див. "[Workflow Jobs](https://developer.github.com/v3/actions/workflow-jobs)"  в документації на GitHub Developer.

### `jobs.<job_id>`

Кожна робота повинна мати ідентифікатор, який асоціюється з роботою. Ключ `job_id` - це рядок, його значення - відображення даних конфігурації завдання. Ви повинні замінити `<job_id>` на рядок, унікальний для об'єкта `jobs.<job_id>` повинен починатися з літери або `_` і містити лише буквено-цифрові символи, ` -` або `_`.

#### Приклад

```yaml
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
```

### `jobs.<job_id>.name`

Назва завдання, що відображається на GitHub.

### `jobs.<job_id>.needs`

Визначає будь-які завдання, які повинні бути успішно виконані до запуску цього завдання. Це може бути рядок або масив рядків. Якщо завдання помилково завершується, усі завдання, які її потребують, пропускаються, якщо тільки завдання не використовують умовний вислів, який призводить до продовження роботи.

#### Приклад

```yaml
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

У цьому прикладі `job1` має успішно виконатись до того, як починається ` job2`, і `job3` чекає завершення як` job1`, так і `job2`.

Завдання в цьому прикладі виконують послідовно:

1. `job1`
2. `job2`
3. `job3`

### `jobs.<job_id>.runs-on`

**Обов'язкове** Тип машини, на якій слід виконувати завдання. Машина може бути або виконувачем, розміщеним у GitHub, або виконувачем, що влаштовується власноруч.

#### GitHub-hosted виконувачі

Якщо ви використовуєте виконувач, розміщений у GitHub, кожне завдання виконується у новому екземплярі віртуального середовища, означеного `runs-on`.

Доступними типами виконувачів, розміщених у GitHub, є:

| Віртуальне середоивще | мітка workflow YAML                |
| --------------------- | ---------------------------------- |
| Windows Server 2019   | `windows-latest` або`windows-2019` |
| Ubuntu 20.04          | `ubuntu-20.04`                     |
| Ubuntu 18.04          | `ubuntu-latest` або `ubuntu-18.04` |
| Ubuntu 16.04          | `ubuntu-16.04`                     |
| macOS Catalina 10.15  | `macos-latest` or `macos-10.15`    |

**Примітка:** Віртуальне середовище Ubuntu 20.04 наразі надається лише у вигляді попереднього перегляду. Мітка `ubuntu-latest` YAML робочого процесу все ще використовує віртуальне середовище Ubuntu 18.04.

##### Приклад

```yaml
runs-on: ubuntu-latest
```

Див "[Virtual environments for GitHub-hosted runners](https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners)."

#### Self-hosted виконувачі

Щоб вказати власний бігун для своєї роботи, конфігуруйте  `runs-on`у вашому файлі робочого процесу за допомогою власників міток виконувача.

Усі self-hosted виконувачі, мають мітку  `self-hosted`, і ви можете обрати будь-якого виконувача, що розміщує власність, надавши лише мітку `self-hosted`. Крім того, ви можете використовувати  `self-hosted`  у масиві з додатковими мітками, такими як мітки для певної операційної системи чи архітектури системи, щоб вибрати лише вказані вами типи бігунів.

##### Приклад

```yaml
runs-on: [self-hosted, linux]
```

Див "[About self-hosted runners](https://help.github.com/en/github/automating-your-workflow-with-github-actions/about-self-hosted-runners)" та"[Using self-hosted runners in a workflow](https://help.github.com/en/github/automating-your-workflow-with-github-actions/using-self-hosted-runners-in-a-workflow)."

### `jobs.<job_id>.outputs`

Відображення `map`  результатів для завдання. Виходи завдань доступні для всіх завдань що залежать від цієї роботи. Для отримання додаткової інформації про визначення залежностей від роботи,  див [`jobs..needs`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds).

Виходи завдання - це рядки, і виходи роботи містять вирази, які оцінюються на виконувачі в кінці кожного завдання. Виходи, що містять паролі, редагуються на виконувачі і не надсилаються в GitHub Actions.

Щоб використовувати результати завдання у залежному завданні, ви можете використовувати контекст `needs` . Для отримання додаткової інформації, див "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#needs-context)."

#### Приклад

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    # Map a step output to a job output
    outputs:
      output1: ${{ steps.step1.outputs.test }}
      output2: ${{ steps.step2.outputs.test }}
    steps:
    - id: step1
      run: echo "::set-output name=test::hello"
    - id: step2
      run: echo "::set-output name=test::world"
  job2:
    runs-on: ubuntu-latest
    needs: job1
    steps:
    - run: echo ${{needs.job1.outputs.output1}} ${{needs.job1.outputs.output2}}
```

### `jobs.<job_id>.env`

Відображення `map` змінних середовища, які доступні для всіх кроків завдання. Ви також можете встановити змінні середовища для всього робочого процесу або окремого кроку. Для отримання додаткової інформації див [`env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#env) and [`jobs..steps.env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsenv).

Коли більше однієї змінної середовища означено з тим самим іменем, GitHub використовує найбільш специфічну змінну середовища. Наприклад, змінна середовища, означена на кроці, буде заміняти змінні завдання та робочий процес з тим самим іменем, який крок виконує. Змінна, означена для завдання, замінить змінну робочого процесу з тим самим іменем, у той час як завдання виконується.

#### Приклад

```yaml
jobs:
  job1:
    env:
      FIRST_NAME: Mona
```

### `jobs.<job_id>.defaults`

Відображення `map` налаштувань за замовчуванням, яка застосовуватиметься до всіх кроків завдання. Ви також можете встановити параметри за замовчуванням для всього робочого процесу. Для отримання додаткової інформації, див [`defaults`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#defaults). 

Коли більше одного параметра за замовчуванням означено з тим самим іменем, GitHub використовує найбільш специфічні настройки за замовчуванням. Наприклад, параметр за замовчуванням, означений у роботі, замінить налаштування за замовчуванням, яке має те саме ім'я, означене в робочому процесі.

### `jobs.<job_id>.defaults.run`

Надайте стандартні `shell` та `working-directory` для всіх `run` кроків завдання. Контекст і вираз не дозволені в цьому розділі.

Ви можете надати параметри `shell` та `working-directory` для всіх кроків  [`run`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun) в завданні. Ви також можете встановити настройки за замовчуванням для 'run' для всього робочого процесу. Для отримання додаткової інформації, див  [`jobs.defaults.run`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#defaultsrun). У цьому ключовому слові ви не можете використовувати контексти чи вирази.

Коли більше одного параметра за замовчуванням означено з тим самим іменем, GitHub використовує найбільш специфічні настройки за замовчуванням. Наприклад, параметр за замовчуванням, означений у роботі, замінить налаштування за замовчуванням, яке має те саме ім'я, визначене в робочому процесі.

#### Приклад

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
        working-directory: scripts
```

### `jobs.<job_id>.if`

Ви можете використовувати умовний елемент `if` , щоб запобігти виконанню роботи, якщо умова не виконується. Ви можете використовувати будь-який підтримуваний контекст і вираз для створення умови.

Коли ви використовуєте вирази в умові `if`, ви можете опустити синтаксис вираження  (`${{ }}`), оскільки GitHub автоматично оцінює умовне ` if` як вираз. Для отримання додаткової інформації,  "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)."

### `jobs.<job_id>.steps`

Завдання містить послідовність задач, що називається `steps`. Кроки можуть запускати команди, виконувати завдання налаштування або виконувати дії у вашому сховищі, загальнодоступному сховищі або дії, опублікованих у реєстрі Docker. Не всі кроки виконують дії, але всі дії виконуються як крок. Кожен крок працює у своєму процесі в середовищі виконувача і має доступ до робочої області та файлової системи. Оскільки дії виконуються в їх власному процесі, зміни змінних оточуючих середовищ не зберігаються між кроками. GitHub пропонує вбудовані кроки для налаштування та завершення завдання.

Ви можете виконувати необмежену кількість кроків, поки ви знаходитесь в межах норм використання робочого процесу. Для отримання додаткової інформації, див. "[Usage limits](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#usage-limits)." 

#### Приклад

```yaml
name: Greeting from Mona

on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```

#### `jobs.<job_id>.steps.id`

Унікальний ідентифікатор кроку. Ви можете використовувати `id`  для посилання на крок у контекстах. Для отримання додаткової інформації, див "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)."

#### `jobs.<job_id>.steps.if`

Ви можете використовувати умовний елемент  `if` , щоб запобігти виконанню кроку, якщо умова не виконується. Ви можете використовувати будь-який підтримуваний контекст і вираз для створення умови.

Коли ви використовуєте вирази в умові `if`, ви можете опустити синтаксис вираження  (`${{ }}`) , оскільки GitHub автоматично оцінює умовне ` if` як вираз. Для отримання додаткової інформації, див "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)."

##### Приклад використанням контекст

Цей крок виконується лише тоді, коли тип події є  `pull_request` і дія події `unassigned`.

```yaml
steps:
 - name: My first step
   if: ${{ github.event_name == 'pull_request' && github.event.action == 'unassigned' }}
   run: echo This event is a pull request that had an assignee removed.
```

##### Приклад використання функції перевірки статусу

Крок  `my backup step` запускається лише тоді, коли попередній крок завдання закінчується. Для отримання додаткової інформації див "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions)."

```yaml
steps:
  - name: My first step
    uses: monacorp/action-name@master
  - name: My backup step
    if: ${{ failure() }}
    uses: actions/heroku@master
```

#### `jobs.<job_id>.steps.name`

Назва вашого кроку для відображення на GitHub.

#### `jobs.<job_id>.steps.uses`

Вибирає дію, яку потрібно виконати як частину кроку у вашому завданні. Дія (action ) - це одиниця коду для багаторазового використання. Ви можете використовувати дію, означену в тому ж сховищі, що і робочий процес, загальнодоступне сховище або [published Docker container image](https://hub.docker.com/).

Ми настійно рекомендуємо включити версію дії, яку ви використовуєте, вказавши номер тегу Git ref, SHA або Docker. Якщо не вказати версію, це може порушити ваші робочі процеси або викликати несподівану поведінку, коли власник дії публікує оновлення.

- Використання випущеної версії дій віддалення дії SHA є найбезпечнішим для стабільності та безпеки.

- Використання конкретної версії основної дії дозволяє отримувати критичні виправлення та виправлення безпеки, зберігаючи сумісність. Це також запевняє, що ваш робочий процес все одно повинен працювати.
- Використання гілки `master` дії може бути зручним, але якщо хтось випустить нову основну версію зі зміною перерви, ваш робочий процес може порушитися.

Деякі дії вимагають введення даних, які потрібно встановити за допомогою ключового слова [`with`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith) . Перегляньте файл README дії, щоб визначити необхідні введення.

Дії - це або файли JavaScript, або контейнери Docker. Якщо дія, яку ви використовуєте, є контейнером Docker, ви повинні запустити завдання в середовищі Linux. Докладніше див. У розділі [`runs-on`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on).

##### Приклад використання версійності дій 

```yaml
steps:    
  # Reference a specific commit
  - uses: actions/setup-node@74bc508
  # Reference the major version of a release
  - uses: actions/setup-node@v1
  # Reference a minor version of a release
  - uses: actions/setup-node@v1.2
  # Reference a branch
  - uses: actions/setup-node@master
```

##### Приклад використання публічних дій

```
{owner}/{repo}@{ref}
```

Ви можете вказати гілку, ref або SHA у загальнодоступному сховищі GitHub.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        # Uses the master branch of a public repository
        uses: actions/heroku@master
      - name: My second step
        # Uses a specific version tag of a public repository
        uses: actions/aws@v2.0.1
```

##### Приклад використання публічних дій через піддиректорію 

```
{owner}/{repo}/{path}@{ref}
```

Підкаталог у загальнодоступному сховищі GitHub у певній гілці, ref або SHA.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/aws/ec2@master
```

##### Приклад використання дій в тому самому репозиторію як workflow

```
./path/to/dir
```

Шлях до каталогу, який містить дії у сховищі вашого робочого процесу. Ви повинні перевірити сховище, перш ніж використовувати дію.

```yaml
jobs:
  my_first_job:
    steps:
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Use local my-action
        uses: ./.github/actions/my-action
```

##### Приклад використання дій Docker Hub 

```
docker://{image}:{tag}
```

Образ Docker опублікований на [Docker Hub](https://hub.docker.com/).

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: docker://alpine:3.8
```

##### Приклад використання дій Docker public registry 

```
docker://{host}/{image}:{tag}
```

Образ Docker у публічному репозитрію.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: docker://gcr.io/cloud-builders/gradle
```

#### `jobs.<job_id>.steps.run`

Запускає програми командного рядка, використовуючи оболонку операційної системи. Якщо ви не вкажете `name`, ім'я кроку за замовчуванням буде текстом, визначеним у команді `run` .

Команди виконуються за допомогою стандартних оболонок, які входять у систему. Ви можете вибрати іншу оболонку та налаштувати оболонку, яка використовується для виконання команд. Для отримання додаткової інформації, "[Using a specific shell](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell)."

Кожне ключове слово `run` представляє собою новий процес і оболонку в середовищі runner. Коли ви надаєте багаторядкові команди, кожен рядок працює в одній оболонці. Наприклад:

- Однорядкова команда: 

  ```yaml
  - name: Install Dependencies
    run: npm install
  ```

- Багаторядкова команда:

  ```yaml
  - name: Clean install dependencies and build
    run: |
      npm ci
      npm run build
  ```

Використовуючи ключове слово  `working-directory` , ви можете вказати робочий каталог, де запустити команду.

```yaml
- name: Clean temp directory
  run: rm -rf *
  working-directory: ./temp
```

##### Використання конкретної оболонки shell

Ви можете змінити параметри оболонки за замовчуванням в операційній системі виконувача за допомогою ключового слова `shell` Ви можете використовувати вбудовані ключові слова `shell` або ви можете означити набір параметрів оболонки.

| Підтримувані платформи | `shell` параметр | Опис                                                         | Command run internally                          |
| ---------------------- | ---------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| Усі                    | `bash`           | Оболонка за замовчуванням на платформах, що не є Windows, із відступом до `sh`. При означенні оболонки bash для Windows використовується оболонка bash, що входить до Git для Windows. | `bash --noprofile --norc -eo pipefail {0}`      |
| Усі                    | `pwsh`           | PowerShell Core. GitHub додає розширення `.ps1` до вашого імені сценарію. | `pwsh -command "& '{0}'"`                       |
| Усі                    | `python`         | Виконує команди python.                                      | `python {0}`                                    |
| Linux / macOS          | `sh`             | Резервна поведінка для платформ, які не є Windows, якщо не передбачено оболонки, а на шляху не знайдено `bash`. | `sh -e {0}`                                     |
| Windows                | `cmd`            | GitHub додає розширення `.cmd` до вашого імені сценарію та замінює ` {0} `. | `%ComSpec% /D /E:ON /V:OFF /S /C "CALL "{0}""`. |
| Windows                | `powershell`     | Це оболонка за замовчуванням, яка використовується в Windows. Настільний PowerShell. GitHub додає розширення `.ps1` до вашого імені сценарію. | `powershell -command "& '{0}'"`.                |

##### Приклад виконання скрипту з використанням bash

```yaml
steps:
  - name: Display the path
    run: echo $PATH
    shell: bash
```

##### Приклад виконання скрипту з використанням Windows `cmd`

```yaml
steps:
  - name: Display the path
    run: echo %PATH%
    shell: cmd
```

##### Приклад виконання скрипту з використанням PowerShell Core

```yaml
steps:
  - name: Display the path
    run: echo ${env:PATH}
    shell: pwsh
```

##### Приклад виконання python script

```yaml
steps:
  - name: Display the path
    run: |
      import os
      print(os.environ['PATH'])
    shell: python
```

##### Користувацький shell

Ви можете встановити значення `shell` на шаблонний рядок, використовуючи команду  `command […options] {0} [..more_options]`. GitHub інтерпретує перше слово рядка з обмеженим пробілом як команду та вставляє ім'я файлу для тимчасового скрипту на `{0}`.

##### Коди виходу та налаштування дії помилок 

Для вбудованих ключових слів оболонок ми надаємо наступні параметри за замовчуванням, які виконуються виконувачами, розміщеними у GitHub. Ви повинні використовувати ці вказівки під час запуску скриптів оболонки.

- `bash`/`sh`:
  - Fail-fast behavior using `set -e o pipefail`: Default for `bash` and built-in `shell`. It is also the default when you don't provide an option on non-Windows platforms.
  - You can opt out of fail-fast and take full control by providing a template string to the shell options. For example, `bash {0}`.
  - sh-like shells exit with the exit code of the last command executed  in a script, which is also the default behavior for actions. The runner  will report the status of the step as fail/succeed based on this exit  code.
- `powershell`/`pwsh`
  - Fail-fast behavior when possible. For `pwsh` and `powershell` built-in shell, we will prepend `$ErrorActionPreference = 'stop'` to script contents.
  - We append `if ((Test-Path -LiteralPath variable:\LASTEXITCODE)) { exit $LASTEXITCODE }` to powershell scripts so action statuses reflect the script's last exit code.
  - Users can always opt out by not using the built-in shell, and providing a custom shell option like: `pwsh -File {0}`, or `powershell -Command "& '{0}'"`, depending on need.
- `cmd`
  - There doesn't seem to be a way to fully opt into fail-fast behavior  other than writing your script to check each error code and respond  accordingly. Because we can't actually provide that behavior by default, you need to write this behavior into your script.
  - `cmd.exe` will exit with the error level of the last  program it executed, and it will and return the error code to the  runner. This behavior is internally consistent with the previous `sh` and `pwsh` default behavior and is the `cmd.exe` default, so this behavior remains intact.

#### `jobs.<job_id>.steps.with`

Відображення `map`  вхідних параметрів, означених дією. Кожен вхідний параметр - пара ключ / значення. Вхідні параметри встановлюються як змінні середовища. Змінна є префіксом `INPUT_` і перетворюється у верхній регістр.

##### Приклад

Означує три вхідні параметри (`first_name`, `middle_name`, та `last_name`), означені дією `hello_world` . Ці вхідні змінні будуть доступні для дії `hello_world`  як `INPUT_FIRST_NAME`,` INPUT_MIDDLE_NAME` і `INPUT_LAST_NAME` змінних середовища.

```yaml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/hello_world@master
        with:
          first_name: Mona
          middle_name: The
          last_name: Octocat      
```

#### `jobs.<job_id>.steps.with.args`

`string` , який означує входи для контейнера Docker. GitHub передає `args` в контейнер 'ENTRYPOINT', коли контейнер запускається. Цей параметр не підтримує `array of strings`.

##### Приклад

```yaml
steps:
  - name: Explain why this job ran
    uses: monacorp/action-name@master
    with:
      entrypoint: /bin/echo
      args: The ${{ github.event_name }} event triggered this step.
```

`args`  використовуються замість інструкції `CMD`  в `Dockerfile`. Якщо ви використовуєте `CMD` у своєму` Dockerfile`, використовуйте впорядковані налаштування:

1. Задокументуйте необхідні аргументи в README дії та пропустіть їх з інструкції `CMD`.

2. Використовуйте параметри за замовчуванням, які дозволяють використовувати дію, не вказуючи жодних `args`.
3. Якщо дія показує прапор `--help` або щось подібне, використовуйте це як за замовчуванням, щоб зробити свою дію самодокументуваною.

#### `jobs.<job_id>.steps.with.entrypoint`

Переміщує Докер `ENTRYPOINT`  у `Dockerfile` або встановлює його, якщо його ще не було вказано. На відміну від інструкції Docker `ENTRYPOINT`, яка має форму оболонки та виконувати, ключове слово ` entrypoint` приймає лише одну рядок, що означує виконуваний файл, який слід запустити.

##### Приклад

```yaml
steps:
  - name: Run a custom command
    uses: monacorp/action-name@master
    with:
      entrypoint: /a/different/executable
```

Ключове слово `entrypoint` призначене для використання з контейнерними діями Docker, але ви також можете використовувати його з діями JavaScript, які не означують жодних входів.

#### `jobs.<job_id>.steps.env`

Встановлює змінні середовища для кроків для використання в середовищі виконувача. Ви також можете встановити змінні середовища для всього робочого процесу або завдання. Докладніші відомості див. [`env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#env) and [`jobs..env`](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idenv).

Коли більше однієї змінної середовища визначено з тим самим іменем, GitHub використовує найбільш специфічну змінну середовища. Наприклад, змінна середовища, визначена на кроці, буде заміняти змінні завдання та робочий процес з тим самим іменем, а крок виконує. Змінна, визначена для завдання, замінить змінну робочого процесу з тим самим іменем, тоді як завдання виконується.

Public actions may specify expected environment variables in the  README file. If you are setting a secret in an environment variable, you must set secrets using the `secrets` context. For more information, see "[Using environment variables](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/using-environment-variables)" and "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)."

Загальнодоступні дії можуть визначати очікувані змінні середовища у файлі README. Якщо ви встановлюєте паролі у змінній оточення, вам слід встановити паролі, використовуючи контекст `secrets` . Для отримання додаткової інформації дивіться "[Using environment variables](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/using-environment-variables)" та "[Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)."

##### Приклад

```yaml
steps:
  - name: My first action
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      FIRST_NAME: Mona
      LAST_NAME: Octocat
```

#### `jobs.<job_id>.steps.continue-on-error`

 Запобігає відмови від роботи, коли крок не вдається. Установіть значення `true` , щоб дозволити роботу пройти, коли цей крок не вдався.

#### `jobs.<job_id>.steps.timeout-minutes`

Максимальна кількість хвилин, щоб виконати крок перед тим, як вбити процес.