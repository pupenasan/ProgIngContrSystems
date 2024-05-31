## Огляд Docker Compose

https://docs.docker.com/compose/

Docker Compose — це інструмент для означення та запуску багатоконтейнерних програм. Це ключ до розблокування спрощеної та ефективної розробки та розгортання.

Compose спрощує керування всім стеком програм, що полегшує керування службами, мережами та томами в одному зрозумілому файлі конфігурації YAML. Потім за допомогою однієї команди ви створюєте та запускаєте всі служби з файлу конфігурації.

Compose працює в усіх середовищах; виробництво, постановка, розробка, тестування, а також робочі процеси CI. Він також містить команди для керування всім життєвим циклом вашої програми:

- Start, stop, and rebuild services
- View the status of running services
- Stream the log output of running services
- Run a one-off command on a service

## Як працює Compose

https://docs.docker.com/compose/compose-application-model/

Docker Compose покладається на файл конфігурації YAML, який зазвичай має назву `compose.yaml`.

Файл `compose.yaml` відповідає правилам, наданим у [специфікації Compose](https://docs.docker.com/compose/compose-file/) щодо означення багатоконтейнерних програм. Це реалізація Docker Compose формальної [специфікації Compose](https://github.com/compose-spec/compose-spec)

You then interact with your Compose application through the [Compose CLI](https://docs.docker.com/compose/reference/). Commands such as `docker compose up` are used to start the application, while `docker compose down` stops and removes the containers.

Потім ви взаємодієте зі своїм додатком Compose через [Compose CLI](https://docs.docker.com/compose/reference/). Такі команди, як `docker compose up`, використовуються для запуску програми, тоді як `docker compose down` зупиняє та видаляє контейнери.

### Compose файл

Шлях за замовчуванням до файлу Compose — `compose.yaml` (бажано) або `compose.yml`, який розміщується в робочому каталозі. Compose також підтримує `docker-compose.yaml` і `docker-compose.yml` для зворотної сумісності з попередніми версіями. Якщо існують обидва файли, Compose віддає перевагу канонічному `compose.yaml`.

Ви можете використовувати [фрагменти](https://docs.docker.com/compose/compose-file/10-fragments/) і [розширення](https://docs.docker.com/compose/compose-file/11-extension/), щоб ваш файл Compose був ефективним і простим у обслуговуванні.

Кілька файлів Compose можна [об’єднати](https://docs.docker.com/compose/compose-file/13-merge/), щоб означити модель програми. Поєднання файлів YAML реалізується шляхом додавання або заміни елементів YAML на основі встановленого вами порядку створення файлів. Прості атрибути та карти замінюються файлом Compose найвищого порядку, списки об’єднуються шляхом додавання. Відносні шляхи вирішуються на основі батьківської папки першого файлу Compose, щоразу, коли додаткові файли, які об’єднуються, розміщуються в інших папках. Оскільки деякі елементи файлу Compose можна виразити як окремі рядки, так і складні об’єкти, об’єднання застосовуються до розгорнутої форми. Щоб отримати додаткові відомості, перегляньте [Робота з кількома файлами Compose](https://docs.docker.com/compose/multiple-compose-files/)

Якщо ви хочете повторно використовувати інші файли Compose або розділити частини моделі програми на окремі файли Compose, ви також можете використати [`include`](https://docs.docker.com/compose/compose-file/14-include/). Це корисно, якщо ваша програма Compose залежить від іншої програми, якою керує інша команда, або до неї потрібно надати доступ іншим.

### Приклад

Наступний приклад ілюструє описані вище концепції Compose. Приклад ненормативний.

Розглянемо програму, розділену на зовнішню веб-програму та серверну службу.

Інтерфейс налаштовується під час виконання за допомогою файлу конфігурації HTTP, який керується інфраструктурою, надає ім’я зовнішнього домену та сертифікат сервера HTTPS, який впроваджується захищеним секретним сховищем платформи.

Сервер зберігає дані в постійному томі.

Обидві служби спілкуються одна з одною в ізольованій мережі заднього рівня, тоді як інтерфейс також підключений до мережі переднього рівня та надає порт 443 для зовнішнього використання.

![Compose application example](media/compose-application.webp)

Приклад програми складається з таких частин:

- 2 services, backed by Docker images: `webapp` and `database`
- 1 secret (HTTPS certificate), injected into the frontend
- 1 configuration (HTTP), injected into the frontend
- 1 persistent volume, attached to the backend
- 2 networks

```yml
services:
  frontend:
    image: example/webapp
    ports:
      - "443:8043"
    networks:
      - front-tier
      - back-tier
    configs:
      - httpd-config
    secrets:
      - server-certificate

  backend:
    image: example/database
    volumes:
      - db-data:/etc/data
    networks:
      - back-tier

volumes:
  db-data:
    driver: flocker
    driver_opts:
      size: "10GiB"

configs:
  httpd-config:
    external: true

secrets:
  server-certificate:
    external: true

networks:
  # The presence of these objects is sufficient to define them
  front-tier: {}
  back-tier: {}
```

## Специфікація Compose

https://docs.docker.com/compose/compose-file/

### Version top-level element (optional)

Властивість `version` верхнього рівня визначається специфікацією Compose для зворотної сумісності. Він лише інформативний. Compose не використовує `version` для вибору точної схеми для перевірки файлу Compose, але надає перевагу найновішій схемі, коли її реалізовано. Compose перевіряє, чи може він повністю проаналізувати файл Compose. Якщо деякі поля невідомі, як правило, через те, що файл Compose було створено з полями, визначеними новішою версією специфікації, ви отримаєте попередження.

### Name top-level element

Властивість `name` верхнього рівня визначається специфікацією як назва проекту, яка буде використовуватися, якщо ви не встановите її явно. Compose пропонує вам спосіб змінити це ім’я та встановлює назву проекту за замовчуванням, яка буде використовуватися, якщо елемент `name` верхнього рівня не встановлено.

Щоразу, коли ім’я проекту визначається `name`  верхнього рівня або якимось спеціальним механізмом, воно доступне для [інтерполяції](https://docs.docker.com/compose/compose-file/12-interpolation/) та видима через змінну середовища як `COMPOSE_PROJECT_NAME`

```yml
name: myapp

services:
  foo:
    image: busybox
    command: echo "I'm running ${COMPOSE_PROJECT_NAME}"
```

### Services top-level elements

Сервіс — це абстрактне визначення обчислювального ресурсу в програмі, який можна масштабувати або замінювати незалежно від інших компонентів. Сервіси підтримуються набором контейнерів, керованих платформою відповідно до вимог реплікації та обмежень розміщення. Оскільки сервіси підтримуються контейнерами, вони означуються образом Docker і набором аргументів часу виконання. Усі контейнери в сервісі створюються однаково з цими аргументами.

Файл Compose має оголошувати елемент верхнього рівня `services` як відображення (map), ключі якої є рядковими представленнями назв сервісів, а значення – означеннями сервісів. Означення сервісу містить конфігурацію, яка застосовується до кожного контейнера сервісу.

Кожен сервіс також може включати розділ `build`, який означує, як створити образ Docker для сервісу. За допомогою цього означення серісу Compose підтримує створення образів докерів. Якщо не використовувати розділ `build` він ігнорується, а файл Compose все ще вважається валідним. Підтримка Build є необов’язковим аспектом специфікації Compose і детально описана в документації [Специфікація збірки Compose](https://docs.docker.com/compose/compose-file/build/).

Кожен сервіс означує обмеження часу виконання (runtime) та вимоги до запуску своїх контейнерів. Розділ `deploy` групує ці обмеження та дозволяє платформі налаштувати стратегію розгортання, щоб найкраще відповідати потребам контейнерів із доступними ресурсами. Підтримка розгортання є необов’язковим аспектом специфікації Compose і детально описана в документації [Специфікація розгортання Compose](https://docs.docker.com/compose/compose-file/deploy/). Якщо не реалізовано, розділ `deploy` ігнорується, а файл Compose усе ще вважається валідним.

Опис усіх усіх розділів доступний [за посиланням](https://docs.docker.com/compose/compose-file/05-services/) 

#### image

`image` вказує образ для запуску контейнера. `image` повинні дотримуватися Open Container Specification [addressable image format](https://github.com/opencontainers/org/blob/master/docs/docs/introduction/digests.md), як `[<registry>/][<project>/]<image>[:<tag>|@<digest>]`.

```yml
    image: redis
    image: redis:5
    image: redis@sha256:0ed5d5928d4737458944eb604cc8509e245c3e19d02ad83935398bc4b991aac7
    image: library/redis
    image: docker.io/library/redis
    image: my_private.registry:5000/redis
```

Якщо образу не існує на платформі, Compose намагається отримати його на основі  `pull_policy`. Якщо ви використовуєте [Специфікацію збірки Compose](https://docs.docker.com/compose/compose-file/build/), існують також альтернативні варіанти керування пріоритетом витягування над створенням образу з джерела, проте витягування образу є типовою поведінкою. `image`  можна опустити у файлі Compose, якщо оголошено розділ `build`. Якщо ви не використовуєте Compose Build Specification, Compose не працюватиме, якщо у файлі Compose відсутнє `image`.

#### ports

Відкриває контейнерні порти.

Зіставлення портів (Port mapping) не можна використовувати з `network_mode: host`, інакше виникає помилка виконання.

##### Short syntax

Короткий синтаксис — це розділений двокрапкою рядок для встановлення IP-адреси хоста, порту хоста та порту контейнера у формі:

`[HOST:]CONTAINER[/PROTOCOL]` where:

- `HOST` is `[IP:](port | range)`
- `CONTAINER` is `port | range`
- `PROTOCOL`  щоб обмежити порт вказаним протоколом. Значення `tcp` і `udp` означені специфікацією, Compose пропонує підтримку імен протоколів, що стосуються певної платформи. 

Якщо IP хоста не встановлено, він прив’язується до всіх мережевих інтерфейсів. Порти можуть бути як одним значенням, так і діапазоном. Хост і контейнер повинні використовувати еквівалентні діапазони.

Або вкажіть обидва порти (`HOST:CONTAINER`), або лише порт контейнера. В останньому випадку середовище виконання контейнера автоматично виділяє будь-який непризначений порт хоста.

`HOST:CONTAINER` слід завжди вказувати як рядок (у лапках), щоб уникнути конфліктів з [yaml base-60 float](https://yaml.org/type/float.html)

Приклади:

```yml
ports:
  - "3000"
  - "3000-3005"
  - "8000:8000"
  - "9090-9091:8080-8081"
  - "49100:22"
  - "8000-9000:80"
  - "127.0.0.1:8001:8001"
  - "127.0.0.1:5000-5010:5000-5010"
  - "6060:6060/udp"
```

> **Примітка**
>
> Якщо зіставлення IP-адреси хоста не підтримується системою контейнерів, Compose відхиляє файл Compose та ігнорує вказану IP-адресу хоста.

##### Long syntax

Синтаксис довгої форми дозволяє конфігурувати додаткові поля, які не можна виразити в короткій формі.

- `target`: Контейнерний порт
- `published`: Публічний порт. Він означується як рядок і може бути встановлений як діапазон за допомогою синтаксису `start-end`. Це означає, що фактичному порту призначається залишок доступного порту в межах встановленого діапазону.
- `host_ip`: Це означає, що фактичному порту призначається залишок доступного порту в межах встановленого діапазону. Відображення IP-адреси хоста, якщо не означене, означає всі мережеві інтерфейси (`0.0.0.0`).
- `protocol`: The port protocol (`tcp` or `udp`). Defaults to `tcp`.
- `mode`: `host`: Для публікації порту хоста на кожному вузлі, або `ingress` щоб порт був збалансованим. За замовчуванням `ingress`.
- `name`: Зрозуміла назва порту, яка використовується для документування його використання в сервісі. 

```yml
ports:
  - name: http
    target: 80
    host_ip: 127.0.0.1
    published: "8080"
    protocol: tcp
    mode: host

  - name: https
    target: 443
    host_ip: 127.0.0.1
    published: "8083-9000"
    protocol: tcp
    mode: host
```

#### networks

`networks` означує мережі, до яких приєднані контейнери сервісів, посилаючись на записи під  [top-level `networks` key](https://docs.docker.com/compose/compose-file/06-networks/).

```yml
services:
  some-service:
    networks:
      - some-network
      - other-network
```

#### configs

Конфігурації дозволяють сервісам адаптувати свою поведінку без необхідності перебудувати образ Docker. Сервіси можуть отримати доступ до конфігурацій лише тоді, коли їм явно надано атрибут `configs`. Підтримуються два різних варіанти синтаксису.  Compose повідомляє про помилку, якщо `config` не існує на платформі або не означено в [`configs` елементі верхнього рівня](https://docs.docker.com/compose/compose-file/08-configs/) у файлі Compose. Для конфігурацій визначено два синтаксиси: короткий синтаксис і довгий синтаксис. Ви можете надати сервісу доступ до кількох конфігурацій, а також можете комбінувати довгий і короткий синтаксис.

##### Short syntax

Варіант короткого синтаксису вказує лише назву конфігурації. Це надає контейнеру доступ до конфігурації та монтує його як файли у файлову систему контейнера сервісу. Розташування точки монтування всередині контейнера за замовчуванням `/<config_name>` в контейнерах Linux і `C:\<config-name>` в контейнерах Windows.

У наступному прикладі використовується короткий синтаксис для надання сервісу redis доступу до конфігурацій `my_config` і `my_other_config`. Значення `my_config` встановлюється як вміст файлу `./my_config.txt`, а `my_other_config` визначається як зовнішній ресурс, що означає, що він уже визначений на платформі. Якщо зовнішньої конфігурації не існує, розгортання не вдається.

```yml
services:
  redis:
    image: redis:latest
    configs:
      - my_config
      - my_other_config
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true
```

##### Long syntax

The long syntax provides more granularity in how the config is created within the service's task containers.

- `source`: The name of the config as it exists in the platform.
- `target`: The path and name of the file to be mounted in the service's task containers. Defaults to `/<source>` if not specified.
- `uid` and `gid`: The numeric UID or GID that owns the mounted config file within the service's task containers. Default value when not specified is USER running container.
- `mode`: The [permissions](https://wintelguy.com/permissions-calc.pl)

-  for the file that is mounted within the service's task containers, in octal notation. Default value is world-readable (`0444`). Writable bit must be ignored. The executable bit can be set.

The following example sets the name of `my_config` to `redis_config` within the container, sets the mode to `0440` (group-readable) and sets the user and group to `103`. The `redis` service does not have access to the `my_other_config` config.

```yml
services:
  redis:
    image: redis:latest
    configs:
      - source: my_config
        target: /redis_config
        uid: "103"
        gid: "103"
        mode: 0440
configs:
  my_config:
    external: true
  my_other_config:
    external: true
```

#### secrets

`secrets` надає доступ до конфіденційних даних, означених [secrets](https://docs.docker.com/compose/compose-file/09-secrets/) для кожного сервісу. Підтримуються два різних варіанти синтаксису; короткий синтаксис і довгий синтаксис. Compose повідомляє про помилку, якщо секрет не існує на платформі або не означено в розділі [`secrets`](https://docs.docker.com/compose/compose-file/09-secrets/) файл Compose. Сервісам можна надати доступ до кількох секретів. Довгий і короткий синтаксис для секретів можна використовувати в одному файлі Compose. Визначення секрету в `secrets` верхнього рівня не повинно означати надання доступу будь-якій службі до нього. Таке надання має бути чітко вказано в специфікації служби як елемент служби [secrets](https://docs.docker.com/compose/compose-file/09-secrets/).

##### Short syntax

Варіант короткого синтаксису вказує лише секретне ім’я. Це надає контейнеру доступ до секрету та монтує його як доступний лише для читання до `/run/secrets/<secret_name>` всередині контейнера. Ім’я джерела та точка монтування призначення мають секретне ім’я. У наступному прикладі використовується короткий синтаксис для надання доступу службі `frontend` до секрету `server-certificate`. Значення `server-certificate` встановлюється на вміст файлу `./server.cert`.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - server-certificate
secrets:
  server-certificate:
    file: ./server.cert
```

##### Long syntax

The long syntax provides more granularity in how the secret is created within the service's containers.

- `source`: The name of the secret as it exists on the platform.
- `target`: The name of the file to be mounted in `/run/secrets/` in the service's task container, or absolute path of the file if an alternate location is required. Defaults to `source` if not specified.
- `uid` and `gid`: The numeric UID or GID that owns the file within `/run/secrets/` in the service's task containers. Default value is USER running container.
- `mode`: The [permissions](https://wintelguy.com/permissions-calc.pl)

-  for the file to be mounted in `/run/secrets/` in the service's task containers, in octal notation. The default value is world-readable permissions (mode `0444`). The writable bit must be ignored if set. The executable bit may be set.

The following example sets the name of the `server-certificate` secret file to `server.crt` within the container, sets the mode to `0440` (group-readable), and sets the user and group to `103`. The value of `server-certificate` secret is provided by the platform through a lookup and the secret's lifecycle is not directly managed by Compose.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - source: server-certificate
        target: server.cert
        uid: "103"
        gid: "103"
        mode: 0440
secrets:
  server-certificate:
    external: true
```

#### volumes

`volumes` означують шляхи хостів монтування або іменовані томи, які доступні контейнерам сервісу. Ви можете використовувати `volumes` для означення кількох типів монтувань; `volume`, `bind`, `tmpfs` або `npipe`. Якщо монтування є шляхом до хоста і використовується лише одним сервісом, його можна оголосити як частину означення служби. Щоб повторно використовувати том у кількох сервісах, іменований том має бути оголошено в [ключі томів верхнього рівня](https://docs.docker.com/compose/compose-file/07-volumes/). У наступному прикладі показано іменований том (`db-data`), який використовується службою `backend`, і монтування прив’язки, визначене для однієї служби.

```yml
services:
  backend:
    image: example/backend
    volumes:
      - type: volume
        source: db-data
        target: /data
        volume:
          nocopy: true
      - type: bind
        source: /var/run/postgres/postgres.sock
        target: /var/run/postgres/postgres.sock

volumes:
  db-data:
```

##### Short syntax

У короткому синтаксисі використовується один рядок із значеннями, розділеними двокрапками, для вказівки монтування тому (`VOLUME:CONTAINER_PATH`) або режиму доступу (`VOLUME:CONTAINER_PATH:ACCESS_MODE`).

- `VOLUME`: Може бути або шлях до хоста на платформі, що містить контейнери (підключення), або ім’я тому.
- `CONTAINER_PATH`: Шлях у контейнері, де змонтовано том.
- `ACCESS_MODE`: Список параметрів, розділених комами:
  - `rw`: Read and write access. This is the default if none is specified.
  - `ro`: Read-only access.
  - `z`: SELinux option indicating that the bind mount host content is shared among multiple containers.
  - `Z`: SELinux option indicating that the bind mount host content is private and unshared for other containers.

> **Note**
>
> Опція монтування прив’язки перемітки SELinux ігнорується на платформах без SELinux.

> **Note** Relative host paths are only supported by Compose that deploy to a local container runtime. This is because the relative path is resolved from the Compose file’s parent directory which is only applicable in the local case. When Compose deploys to a non-local platform it rejects Compose files which use relative host paths with an error. To avoid ambiguities with named volumes, relative paths should always begin with `.` or `..`. Compose підтримує лише ті відносні шляхи хостів, які розгортаються в локальному середовищі виконання контейнера. Це тому, що відносний шлях вирішується з батьківського каталогу файлу Compose, який застосовний лише в локальному випадку. Коли Compose розгортається на нелокальній платформі, він відхиляє файли Compose, які використовують відносні шляхи хостів, із помилкою. Щоб уникнути неоднозначності з іменованими томами, відносні шляхи завжди мають починатися з `.` або `..`.

##### Long syntax

The long form syntax allows the configuration of additional fields that can't be expressed in the short form.

- `type`: The mount type. Either `volume`, `bind`, `tmpfs`, `npipe`, or `cluster`
- `source`: The source of the mount, a path on the host for a bind mount, or the name of a volume defined in the [top-level `volumes` key](https://docs.docker.com/compose/compose-file/07-volumes/). Not applicable for a tmpfs mount.
- `target`: The path in the container where the volume is mounted.
- `read_only`: Flag to set the volume as read-only.
- `bind` : Used to configure additional bind options:
  - `propagation`: The propagation mode used for the bind.
  - `create_host_path`: Creates a directory at the source path on host if there is nothing present. Compose does nothing if there is something present at the path. This is automatically implied by short syntax for backward compatibility with `docker-compose` legacy.
  - `selinux`: The SELinux re-labeling option `z` (shared) or `Z` (private)
- `volume` : Configures additional volume options:
  - `nocopy`: Flag to disable copying of data from a container when a volume is created.
- `tmpfs` : Configures additional tmpfs options:
  - `size`: The size for the tmpfs mount in bytes (either numeric or as bytes unit).
  - `mode`: The file mode for the tmpfs mount as Unix permission bits as an octal number.
- `consistency`: The consistency requirements of the mount. Available values are platform specific.

#### restart

`restart` означує політику, яку платформа застосовує до завершення контейнера.

- `no`: Стандартна політика перезапуску. Він не перезапускає контейнер ні за яких обставин.
- `always`: Політика завжди перезапускає контейнер до його видалення.
- `on-failure[:max-retries]`: Політика перезапускає контейнер, якщо код виходу вказує на помилку. За бажанням обмежте кількість спроб перезапуску демона Docker.
- `unless-stopped`: Політика перезапускає контейнер незалежно від коду виходу, але припиняє перезапуск, коли службу зупинено або видалено.

```yml
    restart: "no"
    restart: always
    restart: on-failure
    restart: on-failure:3
    restart: unless-stopped
```

Ви можете знайти докладнішу інформацію про правила перезапуску в розділі [Правила перезапуску (--restart)](https://docs.docker.com/engine/reference/run/#restart-policies---restart) Docker запустити довідкову сторінку.

#### shm_size

`shm_size` налаштовує розмір спільної пам’яті (розділ `/dev/shm` у Linux), дозволений контейнером сервісу. Воно вказується як  [byte value](https://docs.docker.com/compose/compose-file/11-extension/#specifying-byte-values).

#### depends_on

`depends_on`  виражає залежності запуску та завершення між сервісами.

##### Short syntax

Варіант короткого синтаксису вказує лише назви залежностей сервісів. Залежності сервісів спричиняють такі дії:

- Compose створює служби в порядку залежностей. У наступному прикладі `db` і `redis` створюються перед `web`.
- Compose видаляє служби в порядку залежностей. У наступному прикладі `web` видалено перед `db` і `redis`.

Простий приклад:

```yml
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```

Compose гарантує, що служби залежностей було запущено перед запуском залежної служби. Compose очікує, поки служби залежностей будуть «готові» перед запуском залежної служби.

##### Long syntax

The long form syntax enables the configuration of additional fields that can't be expressed in the short form.

- `restart`: When set to `true` Compose restarts this service after it updates the dependency service. This applies to an explicit restart controlled by a Compose operation, and excludes automated restart by the container runtime after the container dies.
- `condition`: Sets the condition under which dependency is considered satisfied
  - `service_started`: An equivalent of the short syntax described above
  - `service_healthy`: Specifies that a dependency is expected to be "healthy" (as indicated by [healthcheck](https://docs.docker.com/compose/compose-file/05-services/#healthcheck)) before starting a dependent service.
  - `service_completed_successfully`: Specifies that a dependency is expected to run to successful completion before starting a dependent service.
- `required`: When set to `false` Compose only warns you when the dependency service isn't started or available. If it's not defined the default value of `required` is `true`.

Service dependencies cause the following behaviors:

- Compose creates services in dependency order. In the following example, `db` and `redis` are created before `web`.
- Compose waits for healthchecks to pass on dependencies marked with `service_healthy`. In the following example, `db` is expected to be "healthy" before `web` is created.
- Compose removes services in dependency order. In the following example, `web` is removed before `db` and `redis`.

```yml
services:
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy
        restart: true
      redis:
        condition: service_started
  redis:
    image: redis
  db:
    image: postgres
```

Compose guarantees dependency services are started before starting a dependent service. Compose guarantees dependency services marked with `service_healthy` are "healthy" before starting a dependent service.

#### environment



### Networks top-level elements

https://docs.docker.com/compose/compose-file/06-networks/

Мережі — це рівень, який дозволяє сервісам спілкуватися один з одним.

Елемент `networks` верхнього рівня дозволяє налаштовувати іменовані мережі, які можна повторно використовувати в кількох сервісах. Щоб використовувати мережу для кількох сервісів, ви повинні явно надати доступ кожному сервісу за допомогою атрибута [networks](https://docs.docker.com/compose/compose-file/05-services/) у верхньо-вівневому елементі `services` . Елемент верхнього рівня `networks` має додатковий синтаксис, який забезпечує більш детальне керування.

У наступному прикладі під час виконання створюються мережі `front-tier` і `back-tier`, а сервіс `frontend` підключається до мереж `front-tier` і `back-tier`.

```yml
services:
  frontend:
    image: example/webapp
    networks:
      - front-tier
      - back-tier

networks:
  front-tier:
  back-tier:
```

Розширений приклад показує файл Compose, який означує дві власні мережі. Сервіс `proxy` ізольований від сервісу `db`, оскільки вони не мають спільної мережі. Тільки `app` може спілкуватися з обома.

```yml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres
    networks:
      - backend

networks:
  frontend:
    # Use a custom driver
    driver: custom-driver-1
  backend:
    # Use a custom driver which takes special options
    driver: custom-driver-2
    driver_opts:
      foo: "1"
      bar: "2"
```

#### driver

`driver` вказує, який драйвер слід використовувати для цієї мережі. Compose повертає помилку, якщо драйвер недоступний на платформі.

```yml
networks:
  db-data:
    driver: bridge
```

Додаткову інформацію про драйвери та доступні опції див [Network drivers](https://docs.docker.com/network/drivers/).

Мережева підсистема Docker підключається за допомогою драйверів. Кілька драйверів існують за замовчуванням і забезпечують основні мережеві функції:

- `bridge`: Стандартний мережевий драйвер. Якщо ви не вкажете драйвер, це тип мережі, який ви створюєте. Мережі-мости зазвичай використовуються, коли ваша програма працює в контейнері, якому необхідно обмінюватися даними з іншими контейнерами на тому самому хості. See [Bridge network driver](https://docs.docker.com/network/drivers/bridge/).
- `host`: Видаліть мережеву ізоляцію між контейнером і хостом Docker і використовуйте мережу хоста безпосередньо.  See [Host network driver](https://docs.docker.com/network/drivers/host/).
- `overlay`: Накладені мережі з’єднують разом кілька демонов Docker і дозволяють сервісам і контейнерам Swarm обмінюватися даними між вузлами. Ця стратегія усуває необхідність виконувати маршрутизацію на рівні ОС. See [Overlay network driver](https://docs.docker.com/network/drivers/overlay/).
- `ipvlan`: IPvlan networks give users total control over both IPv4 and IPv6 addressing. The VLAN driver builds on top of that in giving operators complete control of layer 2 VLAN tagging and even IPvlan L3 routing for users interested in underlay network integration. See [IPvlan network driver](https://docs.docker.com/network/drivers/ipvlan/).
- `macvlan`: Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network. The Docker daemon routes traffic to containers by their MAC addresses. Using the `macvlan` driver is sometimes the best choice when dealing with legacy applications that expect to be directly connected to the physical network, rather than routed through the Docker host's network stack. See [Macvlan network driver](https://docs.docker.com/network/drivers/macvlan/).
- `none`: Completely isolate a container from the host and other containers. `none` is not available for Swarm services. See [None network driver](https://docs.docker.com/network/drivers/none/).
- [Network plugins](https://docs.docker.com/engine/extend/plugins_services/): You can install and use third-party network plugins with Docker.

#### driver_opts

`driver_opts` означує список параметрів як пари ключ-значення для передачі драйверу. Ці параметри залежать від драйвера. Для отримання додаткової інформації зверніться до документації драйвера.

```yml
networks:
  db-data:
    driver_opts:
      foo: "bar"
      baz: 1
```

#### attachable

Якщо для `attachable` встановлено значення `true`, то автономні контейнери повинні мати можливість приєднуватися до цієї мережі на додаток до сервісів. Якщо автономний контейнер підключається до мережі, він може обмінюватися даними з сервісами та іншими автономними контейнерами, які також підключені до мережі.

```yml
networks:
  mynet1:
    driver: overlay
    attachable: true
```

#### enable_ipv6

`enable_ipv6` enables IPv6 networking. For an example, see step four of [Create an IPv6 network](https://docs.docker.com/config/daemon/ipv6/).

#### external

Якщо встановлено в `true`:

- `external`  вказує, що життєвий цикл цієї мережі підтримується поза життєвим циклом програми. Compose не намагається створити ці мережі та повертає помилку, якщо їх не існує.
- Усі інші атрибути, окрім імені, не мають значення. Якщо Compose виявляє будь-який інший атрибут, він відхиляє файл Compose як невалідний.

У наведеному нижче прикладі `proxy` є шлюзом до зовнішнього світу. Замість того, щоб намагатися створити мережу, Compose запитує платформу для наявної мережі, яку просто називають `outside`, і підключає до неї контейнери сервісів `proxy`.

```yml
services:
  proxy:
    image: example/proxy
    networks:
      - outside
      - default
  app:
    image: example/app
    networks:
      - default

networks:
  outside:
    external: true
```

#### ipam

`ipam` означує спеціальну конфігурацію IPAM. Це об’єкт із кількома властивостями, кожна з яких необов’язкова:

- `driver`: Custom IPAM driver, instead of the default.
- `config`: A list with zero or more configuration elements, each containing a:
  - `subnet`: Subnet in CIDR format that represents a network segment
  - `ip_range`: Range of IPs from which to allocate container IPs
  - `gateway`: IPv4 or IPv6 gateway for the master subnet
  - `aux_addresses`: Auxiliary IPv4 or IPv6 addresses used by Network driver, as a mapping from hostname to IP
- `options`: Driver-specific options as a key-value mapping.

```yml
networks:
  mynet1:
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16
          ip_range: 172.28.5.0/24
          gateway: 172.28.5.254
          aux_addresses:
            host1: 172.28.1.5
            host2: 172.28.1.6
            host3: 172.28.1.7
      options:
        foo: bar
        baz: "0"
```

#### internal

За умовчанням Compose забезпечує зовнішнє підключення до мереж. `internal`, якщо встановлено значення `true`, дозволяє створити зовні ізольовану мережу.

#### labels

Додайте метадані до контейнерів за допомогою `labels`. Ви можете використовувати або масив, або словник. Рекомендується використовувати зворотну нотацію DNS, щоб запобігти конфлікту міток із тими, що використовуються іншим програмним забезпеченням.

```yml
networks:
  mynet1:
    labels:
      com.example.description: "Financial transaction network"
      com.example.department: "Finance"
      com.example.label-with-empty-value: ""
```

```yml
networks:
  mynet1:
    labels:
      - "com.example.description=Financial transaction network"
      - "com.example.department=Finance"
      - "com.example.label-with-empty-value"
```

Compose sets `com.docker.compose.project` and `com.docker.compose.network` labels.

#### name

`name` встановлює спеціальну назву для мережі. Поле імені можна використовувати для посилання на мережі, які містять спеціальні символи. Ім'я використовується як є і не пов'язане з назвою проекту.

```yml
networks:
  network1:
    name: my-app-net
```

Його також можна використовувати в поєднанні з властивістю `external` для визначення мережі платформи, яку Compose має отримати, зазвичай за допомогою параметра, щоб файл Compose не потребував жорсткого кодування певних значень під час виконання:

```yml
networks:
  network1:
    external: true
    name: "${NETWORK_ID}"
```

# Мережі

## Bridge

https://docs.docker.com/network/drivers/bridge/

З точки зору мережі, мережа-міст — це пристрій канального рівня, який пересилає трафік між сегментами мережі. Міст може бути апаратним пристроєм або програмним пристроєм, що працює в ядрі хост-машини.

З точки зору Docker, мостова мережа використовує програмний міст, який дозволяє контейнерам, підключеним до однієї мостової мережі, обмінюватися даними, водночас забезпечуючи ізоляцію від контейнерів, які не підключені до цієї мостової мережі. Драйвер мосту Docker автоматично встановлює правила на головній машині, щоб контейнери в різних мережах мосту не могли безпосередньо спілкуватися один з одним.

Містові мережі застосовуються до контейнерів, що працюють на одному хості демона Docker. Для зв’язку між контейнерами, які працюють на різних хостах демона Docker, ви можете керувати маршрутизацією на рівні ОС або використовувати [мережу накладання](https://docs.docker.com/network/drivers/overlay/).

Коли ви запускаєте Docker, автоматично створюється [мережа моста за замовчуванням](https://docs.docker.com/network/drivers/bridge/#use-the-default-bridge-network) (також називається `міст`), і нещодавно запущені контейнери підключаються до нього, якщо не вказано інше. Ви також можете створювати користувальницькі мостові мережі. **Визначені користувачем мостові мережі є кращими за типову мережу мостів.**

### Відмінності між визначеними користувачем мостами та типовим мостом

- **Визначені користувачем мости забезпечують автоматичне вирішення DNS між контейнерами**.

Containers on the default bridge network can only access each other by IP addresses, unless you use the [`--link` option](https://docs.docker.com/network/links/), which is considered legacy. On a user-defined bridge network, containers can resolve each other by name or alias.

Imagine an application with a web front-end and a database back-end. If you call your containers `web` and `db`, the web container can connect to the db container at `db`, no matter which Docker host the application stack is running on.

If you run the same application stack on the default bridge network, you need to manually create links between the containers (using the legacy `--link` flag). These links need to be created in both directions, so you can see this gets complex with more than two containers which need to communicate. Alternatively, you can manipulate the `/etc/hosts` files within the containers, but this creates problems that are difficult to debug.

- **User-defined bridges provide better isolation**.

  Усі контейнери, у яких не вказано `--network`, приєднуються до мережі мосту за умовчанням. Це може бути ризиком, оскільки непов’язані стеки/сервіси/контейнери можуть обмінюватися даними.

  Використання мережі, визначеної користувачем, забезпечує мережу з обмеженою областю, у якій можуть спілкуватися лише контейнери, приєднані до цієї мережі.

- **Containers can be attached and detached from user-defined networks on the fly**.

  Протягом усього терміну служби контейнера ви можете підключати або відключати його від визначених користувачем мереж на льоту. Щоб видалити контейнер із мостової мережі за замовчуванням, потрібно зупинити контейнер і створити його заново з іншими параметрами мережі.

- **Each user-defined network creates a configurable bridge**.

  Якщо ваші контейнери використовують мостову мережу за замовчуванням, ви можете налаштувати її, але всі контейнери використовують однакові параметри, наприклад правила MTU та `iptables`. Крім того, налаштування мостової мережі за замовчуванням відбувається поза межами самого Docker і потребує перезапуску Docker.

  Визначені користувачем мережі мостів створюються та налаштовуються за допомогою `docker network create`. Якщо різні групи програм мають різні вимоги до мережі, ви можете налаштувати кожен визначений користувачем міст окремо під час його створення.

- **Linked containers on the default bridge network share environment variables**.

  Originally, the only way to share environment variables between two containers was to link them using the [`--link` flag](https://docs.docker.com/network/links/). This type of variable sharing isn't possible with user-defined networks. However, there are superior ways to share environment variables. A few ideas:

  - Multiple containers can mount a file or directory containing the shared information, using a Docker volume.
  - Multiple containers can be started together using `docker-compose` and the compose file can define the shared variables.
  - You can use swarm services instead of standalone containers, and take advantage of shared [secrets](https://docs.docker.com/engine/swarm/secrets/) and [configs](https://docs.docker.com/engine/swarm/configs/).

Containers connected to the same user-defined bridge network effectively expose all ports to each other. For a port to be accessible to containers or non-Docker hosts on different networks, that port must be *published* using the `-p` or `--publish` flag.

### Options

The following table describes the driver-specific options that you can pass to `--option` when creating a custom network using the `bridge` driver.

| Option                                           | Default        | Description                                                 |
| ------------------------------------------------ | -------------- | ----------------------------------------------------------- |
| `com.docker.network.bridge.name`                 |                | Interface name to use when creating the Linux bridge.       |
| `com.docker.network.bridge.enable_ip_masquerade` | `true`         | Enable IP masquerading.                                     |
| `com.docker.network.bridge.enable_icc`           | `true`         | Enable or Disable inter-container connectivity.             |
| `com.docker.network.bridge.host_binding_ipv4`    |                | Default IP when binding container ports.                    |
| `com.docker.network.driver.mtu`                  | `0` (no limit) | Set the containers network Maximum Transmission Unit (MTU). |
| `com.docker.network.container_iface_prefix`      | `eth`          | Set a custom prefix for container interfaces.               |

Some of these options are also available as flags to the `dockerd` CLI, and you can use them to configure the default `docker0` bridge when starting the Docker daemon. The following table shows which options have equivalent flags in the `dockerd` CLI.

| Option                                           | Flag        |
| ------------------------------------------------ | ----------- |
| `com.docker.network.bridge.name`                 | -           |
| `com.docker.network.bridge.enable_ip_masquerade` | `--ip-masq` |
| `com.docker.network.bridge.enable_icc`           | `--icc`     |
| `com.docker.network.bridge.host_binding_ipv4`    | `--ip`      |
| `com.docker.network.driver.mtu`                  | `--mtu`     |
| `com.docker.network.container_iface_prefix`      | -           |

The Docker daemon supports a `--bridge` flag, which you can use to define your own `docker0` bridge. Use this option if you want to run multiple daemon instances on the same host. For details, see [Run multiple daemons](https://docs.docker.com/reference/cli/dockerd/#run-multiple-daemons).

### Manage a user-defined bridge

Use the `docker network create` command to create a user-defined bridge network.

```console
 docker network create my-net
```

You can specify the subnet, the IP address range, the gateway, and other options. See the [docker network create](https://docs.docker.com/reference/cli/docker/network/create/#specify-advanced-options) reference or the output of `docker network create --help` for details.

Use the `docker network rm` command to remove a user-defined bridge network. If containers are currently connected to the network, [disconnect them](https://docs.docker.com/network/drivers/bridge/#disconnect-a-container-from-a-user-defined-bridge) first.

```console
 docker network rm my-net
```

> **What's really happening?**
>
> When you create or remove a user-defined bridge or connect or disconnect a container from a user-defined bridge, Docker uses tools specific to the operating system to manage the underlying network infrastructure (such as adding or removing bridge devices or configuring `iptables` rules on Linux). These details should be considered implementation details. Let Docker manage your user-defined networks for you.

### Connect a container to a user-defined bridge

Коли ви створюєте новий контейнер, ви можете вказати один або кілька прапорців `--network`. Цей приклад підключає контейнер Nginx до мережі `my-net`. Він також публікує порт 80 у контейнері до порту 8080 на хості Docker, щоб зовнішні клієнти могли отримати доступ до цього порту. Будь-який інший контейнер, підключений до мережі `my-net`, має доступ до всіх портів контейнера `my-nginx`, і навпаки.

```console
 docker create --name my-nginx \
  --network my-net \
  --publish 8080:80 \
  nginx:latest
```

To connect a **running** container to an existing user-defined bridge, use the `docker network connect` command. The following command connects an already-running `my-nginx` container to an already-existing `my-net` network:

```console
 docker network connect my-net my-nginx
```

### Disconnect a container from a user-defined bridge

To disconnect a running container from a user-defined bridge, use the `docker network disconnect` command. The following command disconnects the `my-nginx` container from the `my-net` network.

```console
 docker network disconnect my-net my-nginx
```

### Use IPv6

If you need IPv6 support for Docker containers, you need to [enable the option](https://docs.docker.com/config/daemon/ipv6/) on the Docker daemon and reload its configuration, before creating any IPv6 networks or assigning containers IPv6 addresses.

When you create your network, you can specify the `--ipv6` flag to enable IPv6. You can't selectively disable IPv6 support on the default `bridge` network.

### Use the default bridge network

The default `bridge` network is considered a legacy detail of Docker and is not recommended for production use. Configuring it is a manual operation, and it has [technical shortcomings](https://docs.docker.com/network/drivers/bridge/#differences-between-user-defined-bridges-and-the-default-bridge).

#### Connect a container to the default bridge network

If you do not specify a network using the `--network` flag, and you do specify a network driver, your container is connected to the default `bridge` network by default. Containers connected to the default `bridge` network can communicate, but only by IP address, unless they're linked using the [legacy `--link` flag](https://docs.docker.com/network/links/).

#### Configure the default bridge network

To configure the default `bridge` network, you specify options in `daemon.json`. Here is an example `daemon.json` with several options specified. Only specify the settings you need to customize.

```json
{
  "bip": "192.168.1.1/24",
  "fixed-cidr": "192.168.1.0/25",
  "fixed-cidr-v6": "2001:db8::/64",
  "mtu": 1500,
  "default-gateway": "192.168.1.254",
  "default-gateway-v6": "2001:db8:abcd::89",
  "dns": ["10.20.1.2","10.20.1.3"]
}
```

Restart Docker for the changes to take effect.

#### Use IPv6 with the default bridge network

If you configure Docker for IPv6 support (see [Use IPv6](https://docs.docker.com/network/drivers/bridge/#use-ipv6)), the default bridge network is also configured for IPv6 automatically. Unlike user-defined bridges, you can't selectively disable IPv6 on the default bridge.

### Connection limit for bridge networks

Due to limitations set by the Linux kernel, bridge networks become unstable and inter-container communications may break when 1000 containers or more connect to a single network.

For more information about this limitation, see [moby/moby#44973](https://github.com/moby/moby/issues/44973#issuecomment-1543747718)

##### Використовувати мережу мосту за умовчанням

У цьому прикладі ви запускаєте два різні контейнери `alpine` на одному хості Docker і виконуєте деякі тести, щоб зрозуміти, як вони взаємодіють один з одним. Вам потрібно встановити та запустити Docker.

1) Відкрийте вікно терміналу. Перерахуйте поточні мережі, перш ніж робити щось інше. Ось що вам слід побачити, якщо ви ніколи не додавали мережу чи не ініціалізували рій на цьому демоні Docker. Ви можете бачити різні мережі, але ви повинні бачити принаймні ці (ідентифікатори мереж будуть різними):

```
docker network ls

NETWORK ID          NAME                DRIVER              SCOPE
17e324f45964        bridge              bridge              local
6ed54d316334        host                host                local
7092879f2cc8        none                null                local
```

У списку вказано типову мережу `bridge` разом із `host` і `none`. Дві останні не є повноцінними мережами, але використовуються для запуску контейнера, підключеного безпосередньо до мережевого стека хоста демона Docker, або для запуску контейнера без мережевих пристроїв. Нижче буде з’єднано два контейнери в мережу `bridge`.

2) Запустіть два контейнери `alpine`, запустивши `ash`, який є типовою оболонкою Alpine, а не `bash`. Прапорці `-dit` означають запуск контейнера відокремленим (у фоновому режимі), інтерактивним (з можливістю введення в нього тексту) і з TTY (щоб ви могли бачити введення та виведення). Оскільки ви запускаєте його відокремлено, ви не підключитесь до контейнера одразу. Натомість буде надруковано ідентифікатор контейнера. Оскільки ви не вказали жодного прапорця `--network`, контейнери підключаються до мережі `bridge` за умовчанням.

```console
 docker run -dit --name alpine1 alpine ash
 docker run -dit --name alpine2 alpine ash
```

Перевірте, чи запущено обидва контейнери:	

```console
docker container ls

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
602dbf1edc81        alpine              "ash"               4 seconds ago       Up 3 seconds                            alpine2
da33b7aa74b0        alpine              "ash"               17 seconds ago      Up 16 seconds                           alpine1
```

3) Огляньте мережу `bridge`, щоб побачити, які контейнери до неї підключені.

```json
docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "17e324f459648a9baaea32b248d3884da102dde19396c25b30ec800068ce6b10",
        "Created": "2017-06-22T20:27:43.826654485Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {
            "602dbf1edc81813304b6cf0a647e65333dc6fe6ee6ed572dc0f686a3307c6a2c": {
                "Name": "alpine2",
                "EndpointID": "03b6aafb7ca4d7e531e292901b43719c0e34cc7eef565b38a6bf84acf50f38cd",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "da33b7aa74b0bf3bda3ebd502d404320ca112a268aafe05b4851d1e3312ed168": {
                "Name": "alpine1",
                "EndpointID": "46c044a645d6afc42ddd7857d19e9dcfb89ad790afb5c239a35ac0af5e8a5bc5",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

У верхній частині вказано інформацію про мережу `bridge`, включаючи IP-адресу шлюзу між хостом Docker і мережею `bridge` (`172.17.0.1`). У розділі `Containers` перераховано кожен підключений контейнер разом із інформацією про його IP-адресу (`172.17.0.2` для `alpine1` і `172.17.0.3` для `alpine2`). 

4) Контейнери працюють у фоновому режимі. Використовуйте команду `docker attach` для підключення до `alpine1`.

```console
 docker attach alpine1

/ #
```

Підказка змінюється на `#`, щоб вказати, що ви є `root` користувачем у контейнері. Використовуйте команду `ip addr show`, щоб показати мережеві інтерфейси для `alpine1` так, як вони виглядають із контейнера:

```console
 ip addr show

1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
27: eth0@if28: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe11:2/64 scope link
       valid_lft forever preferred_lft forever
```

Перший інтерфейс – це пристрій петлі. Ігноруйте це поки що. Зауважте, що другий інтерфейс має IP-адресу `172.17.0.2`, яка є тією ж адресою, що була показана для `alpine1` у попередньому кроці.

5) У `alpine1` переконайтеся, що ви можете підключитися до Інтернету, виконавши ping `google.com`. Прапорець `-c 2` обмежує команду двома спробами `ping`.

```console
 ping -c 2 google.com

PING google.com (172.217.3.174): 56 data bytes
64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.841 ms
64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.897 ms

--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 9.841/9.869/9.897 ms
```

6) Тепер спробуйте пінгувати другий контейнер. Спочатку перевірте його за IP-адресою `172.17.0.3`:

```console
 ping -c 2 172.17.0.3

PING 172.17.0.3 (172.17.0.3): 56 data bytes
64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.086 ms
64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.094 ms

--- 172.17.0.3 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.086/0.090/0.094 ms
```

Це вдається. Далі спробуйте перевірити контейнер `alpine2` за назвою контейнера. Це не вдасться.

```console
 ping -c 2 alpine2

ping: bad address 'alpine2'
```

7) Від’єднайтеся від `alpine1`, не зупиняючи його, використовуючи послідовність від’єднання `CTRL` + `p` `CTRL` + `q` (утримуючи `CTRL` і введіть `p`, а потім `q`). Якщо бажаєте, приєднайте до `alpine2` і повторіть там кроки 4, 5 і 6, замінивши `alpine1` на `alpine2`. 
8) Зупиніть та вийміть обидва контейнери.

```console
 docker container stop alpine1 alpine2
 docker container rm alpine1 alpine2
```

Remember, the default `bridge` network is not recommended for production. To learn about user-defined bridge networks, continue to the [next tutorial](https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks).

Пам’ятайте, що типова мережа `bridge` не рекомендована для виробництва. Щоб дізнатися про визначені користувачем мостові мережі, перейдіть до наступного прикладу.

##### Використовуйте визначені користувачем мостові мережі

У цьому прикладі ми знову запускаємо два контейнери `alpine`, але приєднуємо їх до визначеної користувачем мережі під назвою `alpine-net`, яку ми вже створили. Ці контейнери взагалі не підключені до стандартної мережі `bridge`. Потім ми запускаємо третій контейнер `alpine`, який підключений до мережі `bridge`, але не підключений до `alpine-net`, і четвертий контейнер `alpine`, який підключений до обох мереж.

1) Створіть мережу `alpine-net`. Вам не потрібен прапорець `--driver bridge`, оскільки він є типовим, але цей приклад показує, як його вказати.

```console
 docker network create --driver bridge alpine-net
```

2) Список мереж Docker:

```console
 docker network ls

NETWORK ID          NAME                DRIVER              SCOPE
e9261a8c9a19        alpine-net          bridge              local
17e324f45964        bridge              bridge              local
6ed54d316334        host                host                local
7092879f2cc8        none                null                local
```

Огляньте мережу `alpine-net`. Це показує його IP-адресу та той факт, що до нього не підключено жодного контейнера:

```console
 docker network inspect alpine-net

[
    {
        "Name": "alpine-net",
        "Id": "e9261a8c9a19eabf2bf1488bf5f208b99b1608f330cff585c273d39481c9b0ec",
        "Created": "2017-09-25T21:38:12.620046142Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
```

Зверніть увагу, що шлюзом цієї мережі є `172.18.0.1`, на відміну від мережі мосту за замовчуванням, чий шлюз `172.17.0.1`. Точна IP-адреса може відрізнятися у вашій системі.

Створіть свої чотири контейнери. Зверніть увагу на прапорці `--network`. Ви можете підключитися лише до однієї мережі під час виконання команди `docker run`, тому вам потрібно використовувати `docker network connect` після цього, щоб також підключити `alpine4` до мережі `bridge`.

```console
 docker run -dit --name alpine1 --network alpine-net alpine ash
 docker run -dit --name alpine2 --network alpine-net alpine ash
 docker run -dit --name alpine3 alpine ash
 docker run -dit --name alpine4 --network alpine-net alpine ash
 docker network connect bridge alpine4
```

Переконайтеся, що всі контейнери запущені:

```console
 docker container ls

CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
156849ccd902        alpine              "ash"               41 seconds ago       Up 41 seconds                           alpine4
fa1340b8d83e        alpine              "ash"               51 seconds ago       Up 51 seconds                           alpine3
a535d969081e        alpine              "ash"               About a minute ago   Up About a minute                       alpine2
0a02c449a6e9        alpine              "ash"               About a minute ago   Up About a minute                       alpine1
```

Ще раз перевірте мережу `bridge` і мережу `alpine-net`:

```console
 docker network inspect bridge

[
    {
        "Name": "bridge",
        "Id": "17e324f459648a9baaea32b248d3884da102dde19396c25b30ec800068ce6b10",
        "Created": "2017-06-22T20:27:43.826654485Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {
            "156849ccd902b812b7d17f05d2d81532ccebe5bf788c9a79de63e12bb92fc621": {
                "Name": "alpine4",
                "EndpointID": "7277c5183f0da5148b33d05f329371fce7befc5282d2619cfb23690b2adf467d",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "fa1340b8d83eef5497166951184ad3691eb48678a3664608ec448a687b047c53": {
                "Name": "alpine3",
                "EndpointID": "5ae767367dcbebc712c02d49556285e888819d4da6b69d88cd1b0d52a83af95f",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

Containers `alpine3` and `alpine4` are connected to the `bridge` network.

```console
 docker network inspect alpine-net

[
    {
        "Name": "alpine-net",
        "Id": "e9261a8c9a19eabf2bf1488bf5f208b99b1608f330cff585c273d39481c9b0ec",
        "Created": "2017-09-25T21:38:12.620046142Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {
            "0a02c449a6e9a15113c51ab2681d72749548fb9f78fae4493e3b2e4e74199c4a": {
                "Name": "alpine1",
                "EndpointID": "c83621678eff9628f4e2d52baf82c49f974c36c05cba152db4c131e8e7a64673",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "156849ccd902b812b7d17f05d2d81532ccebe5bf788c9a79de63e12bb92fc621": {
                "Name": "alpine4",
                "EndpointID": "058bc6a5e9272b532ef9a6ea6d7f3db4c37527ae2625d1cd1421580fd0731954",
                "MacAddress": "02:42:ac:12:00:04",
                "IPv4Address": "172.18.0.4/16",
                "IPv6Address": ""
            },
            "a535d969081e003a149be8917631215616d9401edcb4d35d53f00e75ea1db653": {
                "Name": "alpine2",
                "EndpointID": "198f3141ccf2e7dba67bce358d7b71a07c5488e3867d8b7ad55a4c695ebb8740",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

Containers `alpine1`, `alpine2`, and `alpine4` are connected to the `alpine-net` network.

У визначених користувачем мережах, таких як `alpine-net`, контейнери можуть не лише спілкуватися через IP-адресу, але також можуть перетворювати назву контейнера в IP-адресу. Ця можливість називається автоматичним виявленням сервісу. Давайте підключимося до `alpine1` і перевіримо це. `alpine1` повинен мати можливість розпізнавати `alpine2` і `alpine4` (і сам `alpine1`) в IP-адреси.

> **Note**
>
> Автоматичне виявлення служб може розпізнавати лише спеціальні імена контейнерів, а не автоматично згенеровані за замовчуванням імена контейнерів,

```console
 docker container attach alpine1
 ping -c 2 alpine2

PING alpine2 (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.085 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.090 ms

--- alpine2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.085/0.087/0.090 ms
 ping -c 2 alpine4

PING alpine4 (172.18.0.4): 56 data bytes
64 bytes from 172.18.0.4: seq=0 ttl=64 time=0.076 ms
64 bytes from 172.18.0.4: seq=1 ttl=64 time=0.091 ms

--- alpine4 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.076/0.083/0.091 ms
 ping -c 2 alpine1

PING alpine1 (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.026 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.054 ms

--- alpine1 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.026/0.040/0.054 ms
```

З `alpine1` ви взагалі не зможете підключитися до `alpine3`, оскільки він не в мережі `alpine-net`.

```console
 ping -c 2 alpine3

ping: bad address 'alpine3'
```

Not only that, but you can't connect to `alpine3` from `alpine1` by its IP address either. Look back at the `docker network inspect` output for the `bridge` network and find `alpine3`'s IP address: `172.17.0.2` Try to ping it.

```console
 ping -c 2 172.17.0.2

PING 172.17.0.2 (172.17.0.2): 56 data bytes

--- 172.17.0.2 ping statistics ---
2 packets transmitted, 0 packets received, 100% packet loss
```

Detach from `alpine1` using detach sequence, `CTRL` + `p` `CTRL` + `q` (hold down `CTRL` and type `p` followed by `q`).

Remember that `alpine4` is connected to both the default `bridge` network and `alpine-net`. It should be able to reach all of the other containers. However, you will need to address `alpine3` by its IP address. Attach to it and run the tests.

```console
 docker container attach alpine4
 ping -c 2 alpine1

PING alpine1 (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.074 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.082 ms

--- alpine1 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.074/0.078/0.082 ms
 ping -c 2 alpine2

PING alpine2 (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.075 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.080 ms

--- alpine2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.075/0.077/0.080 ms
 ping -c 2 alpine3
ping: bad address 'alpine3'
 ping -c 2 172.17.0.2

PING 172.17.0.2 (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.089 ms
64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.075 ms

--- 172.17.0.2 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.075/0.082/0.089 ms
 ping -c 2 alpine4

PING alpine4 (172.18.0.4): 56 data bytes
64 bytes from 172.18.0.4: seq=0 ttl=64 time=0.033 ms
64 bytes from 172.18.0.4: seq=1 ttl=64 time=0.064 ms

--- alpine4 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.033/0.048/0.064 ms
```

As a final test, make sure your containers can all connect to the internet by pinging `google.com`. You are already attached to `alpine4` so start by trying from there. Next, detach from `alpine4` and connect to `alpine3` (which is only attached to the `bridge` network) and try again. Finally, connect to `alpine1` (which is only connected to the `alpine-net` network) and try again.

```console
 ping -c 2 google.com

PING google.com (172.217.3.174): 56 data bytes
64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.778 ms
64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.634 ms

--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 9.634/9.706/9.778 ms

CTRL+p CTRL+q
 docker container attach alpine3
 ping -c 2 google.com

PING google.com (172.217.3.174): 56 data bytes
64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.706 ms
64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.851 ms

--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 9.706/9.778/9.851 ms

CTRL+p CTRL+q
 docker container attach alpine1
 ping -c 2 google.com

PING google.com (172.217.3.174): 56 data bytes
64 bytes from 172.217.3.174: seq=0 ttl=41 time=9.606 ms
64 bytes from 172.217.3.174: seq=1 ttl=41 time=9.603 ms

--- google.com ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 9.603/9.604/9.606 ms

CTRL+p CTRL+q
```

Stop and remove all containers and the `alpine-net` network.

```console
 docker container stop alpine1 alpine2 alpine3 alpine4
 docker container rm alpine1 alpine2 alpine3 alpine
 4docker network rm alpine-net
```

#### 