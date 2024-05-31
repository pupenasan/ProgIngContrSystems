# A practical introduction to Docker containers

https://developers.redhat.com/blog/2014/05/15/practical-introduction-to-docker-containers#

## Background

### Чому

Про [Docker](https://www.docker.io/) сьогодні чимало галасу, оскільки він полегшує багато речей, які були складними з віртуальними машинами.

Контейнери Docker дозволяють розробникам, системним адміністраторам, архітекторам, консультантам та іншим швидко тестувати частину програмного забезпечення в [контейнері](https://linuxcontainers.org/); набагато швидше, ніж віртуальна машина, і використовує менше ресурсів. Середня команда в Docker виконується менше секунди.

```
[root@keith]# time docker run fedora cat /etc/redhat-release
Fedora release 20 (Heisenbug)
real 0m0.715s
user 0m0.004s
sys 0m0.004s
```

### Що

#### Прості випадки використання

- Мені потрібно переглянути сторінку довідки з певної версії [RHEL](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux), [CentOS](http://www. centos.org/) або [Fedora](https://fedoraproject.org/)
- Мені потрібно швидко перевірити параметри командного рядка програми
- Мені потрібно перевірити працездатність певної версії програмного забезпечення
- Мені потрібен pad, який НЕ є моєю системою
- Мені потрібен один запущений демон, і мені байдуже, на якому дистрибутиві Linux він працює (див. реєстр нижче) 

#### Складні випадки використання

Контейнери Docker виконують один процес під час запуску, але можна виконувати складні інсталяції програмного забезпечення, які потребують одночасної роботи кількох демонов (RHEV-M, Satellite тощо). Однак вони потребують додаткової інженерної роботи з використанням сценаріїв Bash або запуску SystemD у контейнері.

### Production vs. Development

Інструменти Docker досягли версії 1.0 у червні 2014 року, і [з деякими застереженнями](http://crunchtools.com/docker-in-production/) можна використовувати у Production. Є над чим подумати під час розгортання production, і я пропоную підготувати [Architecting Containers](http://rhelblog.redhat.com/2015/07/29/architecting-containers-part-1-user-space-vs-kernel-space/), якщо ви серйозно розглядаєте production розгортання.

### CentOS and Red Hat Enterprise Linux

This tutorial will focus on integration with [Red Hat technologies](https://www.redhat.com/en/about/our-community-contributions) including [CentOS](http://www.centos.org/) and [Red Hat Enterprise Linux](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux). The Docker tooling (daemon and client) is available in Red Hat  Enterprise Linux, CentOS, and Fedora. Also, base Docker images are  available for [Red Hat Enterprise Linux](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) (6 and 7), [CentOS](https://hub.docker.com/_/centos/) and [Fedora](https://hub.docker.com/_/fedora/).

## Architecture

Однією з ключових переваг використання Docker є централізований сервер керування зображеннями, який називається [Registry Server](https://github.com/dotcloud/docker-registry). Проект Docker підтримує сервер публічного реєстру, на якому розміщені зображення, які вони зберігають, а також зображення, створені спільнотою. Користуватися цією службою реєстру можна безкоштовно, доки зображення є загальнодоступними.

Оскільки зображення створюються, вони складаються з шарів (layers). Ці шари спільно використовуються в тому, що називається репозиторієм (repository). Користувачі реєстру можуть спільно використовувати кілька сховищ.

Docker має офіційні репозиторії CentOS і Fedora, які вони підтримують:

- [centos](https://hub.docker.com/_/centos/)
- [fedora](https://hub.docker.com/_/fedora/)

У цьому підручнику використовуватимуться загальнодоступні репозиторії CentOS Fedora, але ви також можете пройти цей підручник за допомогою Red Hat Enterprise Linux:

- [rhel](https://access.redhat.com/search/#/container-images?q=rhel&p=1&sort=relevant&rows=12&srch=any&documentKind=ImageRepository)

### OS Virtualization vs. Application Virtualization

Навіщо розділяти RPM для кожної основної версії Red Hat Enterprise Linux або CentOS у різні репозиторії YUM? Це було свідоме рішення, оскільки ми працюємо з повним корпоративним дистрибутивом Linux, а не з окремою програмою. Історично найкращою практикою було встановлення нової копії під час оновлення основних версій Red Hat Enterprise Linux або CentOS. Хоча можна оновити на місці та надати спільний доступ до кількох версій в одному репозиторії, це не є кращим методом для операційної системи підприємства.

Однак під час віртуалізації окремих програм може бути дуже доречним оновити на місці та надати спільний доступ до всіх версій в одному сховищі (див. розділ: Налаштування сервера реєстру). Кожна версія буде позначена на місці, і її легко оновити або знизити атомарно.

## Registry Servers

Після прочитання цього посібника ви, можливо, захочете налаштувати власний сервер реєстру (registry server). Це легко зробити, але є деякі застереження, тому подумайте, чи варто просто використовувати розміщений сервер реєстру. Якщо ви хочете розгорнути локальний сервер реєстру, є кілька варіантів:

- [Integrated OpenShiftRegistry Server](https://docs.openshift.com/enterprise/3.0/architecture/infrastructure_components/image_registry.html): The OpenShift integrated registry provides authentication and tight  integration with OpenShift, but can also be used as a stand alone  registry server.
- [Atomic Registry](https://access.redhat.com/products/red-hat-openshift-container-platform): This is the same registry server provided in OpenShift
- [Red Hat Satellite with Docker Plugin](https://access.redhat.com/blogs/1169563/posts/1448083): Provides Docker compatible repository management. Has the ability to  authenticate who can save image layers, and do version control.
- [docker-distribution.x86_64](https://github.com/docker/distribution): Docker toolset to pack, ship, store, and deliver content. An RPM for this package is included in RHEL7.
- [docker-registry.x86_64](https://github.com/docker/docker-registry): Registry server for Docker. An RPM for this package is included in RHEL7.

## Основні операції

Зараз ми розглянемо деякі основні операції, які допоможуть вам почати працювати.

### Встановити Docker

У CentOS 7 це вимагає встановлення інструментів простору користувача та демона з RPM. У Red Hat Enterprise Linux цей RPM міститься в каналі rhel-7-server-extras-rpms/x86_64.

```
yum install docker
systemctl enable docker.service
systemctl start docker.service
```

### Test Docker

Це автоматично витягне останній образ CentOS 4 із віддаленого репозиторію та кешує його локально.

```
docker run -it centos cat /etc/redhat-release
```

### Витягніть зображення

Це призведе до отримання останнього образу CentOS 5 із віддаленого сховища та кешування його в локальному індексі. Якщо зображення, яке ви витягуєте, складається з шарів, усі шари буде витягнуто.

```
docker pull centos
```

### Список образів

Це призведе до списку всіх образів у локальному покажчику та відображення того, як вони пов’язані одне з одним. Кожного разу, коли з образу (image) створюється новий контейнер, він створюватиме ще одну копію образу для запису, щоб також зберегти зміни. Деревоподібна структура допоможе прояснити речі.

Оскільки в [Docker 1.7 немає вбудованих інструментів для перевірки шарів образів](https://www.google.com/url?q=https://github.com/docker/docker/pull/5001&sa=D&ust=1452618511750000&usg=AFQjCNGk5LDKF2fzsU48tOrvoJpAj6xRmg) у локальному кеші, але за допомогою інструменту під назвою dockviz ви можете швидко перевірити всі шари в локальному сховищі. Наступна команда повертає скорочені версії UUID, які зазвичай достатньо унікальні для роботи на одній машині. Якщо вам потрібен повний UUID, скористайтеся опцією --no-trunc.

```
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock nate/dockviz images -t
```

Tag an Image

It makes it easier to deal with images if they are tagged with simple names.

```
docker tag fatherlinux/centos5-base centos5-base
```

### Запустіть контейнер

Зверніть увагу, як легко перевірити команду в CentOS 4

```
docker run -i -t -rm centos man rsync
```

### Log in to the Hosted Docker Registry

To create repositories on the public Docker Registry, it is necessary to sign up at:

```
https://www.docker.io/account/signup/
```

Once you have created an account, you will need to login from the command line

```
docker login index.docker.io
```

If login is successful.

```
Username: fatherlinux
Password:
Email: smccarty@redhat.com
Login Succeeded
```

### Dockerfile: коміт образу

Після входу в публічний реєстр Docker можна створювати нові образи та комітити їх за допомогою коду за допомогою Dockerfile. Це дозволяє адміністратору швидко й легко автоматично відновлювати завідомо справну вихідну точку. Рекомендується завжди починати з образу, означеного Dockerfile.

У цьому Dockerfile є кілька важливих речей, на які слід звернути увагу. По-перше, директива FROM означує *centos* як базовий образ. Це призведе до отримання останнього образу зі сховища centos на DockerHub. У цьому прикладі я надав вам сховище вихідних кодів. По-друге, єдина зміна, яку ми вказали у файлі Docker, це оновлення CentOS до останніх доступних пакетів. Нарешті, зверніть увагу, що ми маємо закоментований ENTRYPOINT у кінці файлу. Пограйте з цією опцією, щоб відчути її під час створення з цього файлу Docker.

```
vi Dockerfile
```

```
#
# Version 1

# Pull from CentOS RPM Build Image
FROM centos

MAINTAINER Scott McCarty smccarty@redhat.com

# Update the image
RUN yum update -y

# Output
# ENTRYPOINT tail /var/log/yum.log
```

### Build and tag the image

Execute the following command in same directory as the Dockerfile.

```
docker build -t centos-updated .
```

### Inspect the new image

This will list all of the layers in an image

```
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock nate/dockviz images -t
└─60e65a8e4030 Virtual Size: 196.6 MB Tags: docker.io/centos:latest
  └─6d8919b62698 Virtual Size: 196.6 MB
    └─05192ebc2b2d Virtual Size: 264.0 MB Tags: centos-updated:latest
```

Notice that the new image is now available for deployment.

## Manually: Commit an Image

Once a container has changes made locally, they can be committed to  the local index. This allows you to check point and continue. It also  allows you to create new images based off of this modified container.

```
docker run -it centos bash 
```

### Modify the image

Make some changes inside the container. In this example, create a test file and exit

```
echo test file > /etc/test.cfg
exit
```

Commit the container

First, get a list of containers. Notice that every container has a *CONTAINTER ID* and a *STATUS*. A status of *Up* means the container is currently running, while a status of *Exit* indicates that the container has been stopped. Think of the *CONTAINER ID* as a branch from the base image that contains all of the changes that  were made to the container while it was running. By default this data is saved even after the container is shut down.

```
docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                     PORTS               NAMES
c65fe9f4194b        centos              "bash"                   About a minute ago   Exited (0) 3 seconds ago                       condescending_galileo
620e24fc14c2        centos-updated      "tail /var/log/yum.lo"   6 minutes ago        Exited (0) 6 minutes ago                       determined_perlman
...
```

Now, commit the container back as a branch of it's base image

```
docker commit c65fe9f4194b
```

Notice that the image is now available in the tree output. Also,  notice that the newly created image layer (6d8919b62698) is a branch of  the root *centos:latest* image, not the *centos-updated:latest* image, which we previously built with a Dockerfile.

```
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock nate/dockviz images -t
└─60e65a8e4030 Virtual Size: 196.6 MB Tags: docker.io/centos:latest
  ├─5b6001fad9a6 Virtual Size: 196.6 MB
  └─6d8919b62698 Virtual Size: 196.6 MB
    └─05192ebc2b2d Virtual Size: 264.0 MB Tags: centos-updated:latest
```

Tag the new image with something meaningful

```
docker tag 5b6001fad9a6 centos-test
```

Push a Container

Once a container is committed locally, it can be pushed back to the  registry server to be shared. The changes will be pushed as a layered  image. Notice how quickly it is able to push only the differences  between your modified image and the base image. This is a big part of  the value.

```
docker tag centos-test fatherlinux/centos-test
docker push fatherlinux/centos-test
The push refers to a repository [fatherlinux/centos-test] (len: 1)
Sending image list
Pushing repository fatherlinux/centos-test (1 tags)
e39724bc32b2: Image already pushed, skipping
c9bfb69481a8: Image successfully pushed
Pushing tag for rev [c9bfb69481a8] on {https://registry-1.docker.io/v1/repositories/fatherlinux/centos6-base-hostname/tags/latest}
```

## Advanced Operations

### Pull All Standard Images

These repositories (images) are publicly available from DockerHub and the Red Hat Registry.

```
docker pull centos
docker pull fedora
docker pull registry.access.redhat.com/rhel
```

### Create Base Image

This method was developed with guidance from [this script](https://github.com/dotcloud/docker/blob/master/contrib/mkimage-yum.sh). This example is based on CentOS 6.

Create a tar file of the system

```
tar --numeric-owner --exclude=/proc --exclude=/sys -cvf centos6-base.tar /
```

Copy the tar file to where the consuming system and Import the image

```
cat centos6-base.tar | docker import - centos6-base 
```

Test

```
docker run -i -t centos6-base cat /etc/redhat-release 
```

### Set Up a Registry Server

Notice that the entire application is packaged up and ran from inside of a docker container. This has the interesting consequence that we are not even concerned with what operating system is hosting this registry  application. Also, notice that port 5000 in the docker container is  mapped to port 5000 on the hosting virtual machine, which makes the  application running in the container transparently appear to be running  on the virtual machine.

```
docker run -p 5000:5000 registry
```

### Search Private Registry

List all images in the repository

```
http://registry.example.com:5000/v1/search?
```

Search for all repositories with the word "rhel" in their name

```
http://registry.example.com:5000/v1/search?q=rhel
```

### Remove Old Docker Containers

By default, Docker keeps changes for every container which is  instantiated. When testing, this can be undesirable. Be careful because  this will remove all branches/data. Any containers which have not been  committed will have all data deleted:

```
docker rm `docker ps --no-trunc -a -q`
```

## Links

- [A Practical Introduction to Docker Container Teminology](https://developers.redhat.com/blog/2016/01/13/a-practical-introduction-to-docker-container-terminology/)
- [Architecting Containers Part 1: Why Understanding User Space vs. Kernel Space Matters](http://rhelblog.redhat.com/2015/07/29/architecting-containers-part-1-user-space-vs-kernel-space/)
- [Red Hat Enterprise Linux Atomic Host 7 Getting Started Guide](https://access.redhat.com/documentation/en/red-hat-enterprise-linux-atomic-host/version-7/getting-started-guide/)
- [Running systemd within a docker container](https://developers.redhat.com/blog/2014/05/05/running-systemd-within-docker-container)