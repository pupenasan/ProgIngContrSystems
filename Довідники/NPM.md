# Що таке npm

**npm** (Node Package Manager) - це [менеджер пакунків](https://uk.wikipedia.org/wiki/Система_керування_пакунками) для мови програмування [JavaScript](https://uk.wikipedia.org/wiki/JavaScript). Для середовища виконання [Node.js](https://uk.wikipedia.org/wiki/Node.js) це менеджер пакунків за замовчуванням. Включає в себе клієнт [командного рядка](https://uk.wikipedia.org/wiki/Інтерфейс_командного_рядка), який також називається npm, а також онлайн-базу даних публічних та  приватних пакунків, яка називається реєстром npm. Реєстр доступний через клієнт, а доступні пакунки можна переглядати та шукати через веб-сайт  npm. Менеджер пакунків та реєстр керуються npm, Inc.

npm включено як рекомендовану функцію в [Node.js](https://uk.wikipedia.org/wiki/Node.js) інсталяторі. npm складається з клієнта командного рядка, який взаємодіє з віддаленим  реєстром. Це дозволяє користувачам користуватися модулями JavaScript та  розповсюджувати їх. Пакунки в реєстрі знаходяться у форматі [CommonJS](https://uk.wikipedia.org/wiki/CommonJS) і включають в себе файли метаданих у форматі [JSON](https://uk.wikipedia.org/wiki/JSON) В головному реєстрі npm доступно понад 477 000 пакунків. Реєстр не має процедури перевірки, а це означає, що знайдені там пакунки можуть бути низькоякісними або небезпечними.  Натомість npm спирається на звіти користувачів, щоб видаляти пакунки,  якщо вони порушують політику безпеки (є незахищеними, зловмисними або  низькоякісними). npm показує статистику, включаючи кількість завантажень та кількість  пакунків, щоб допомогти розробникам оцінювати якість пакетів.

npm може управляти пакунками, які є локальними залежностями певного  проекту, а також глобально інстальованими інструментами JavaScript.[[10\]](https://uk.wikipedia.org/wiki/Npm#cite_note-Ellingwood16-10) При використанні npm як менеджера залежності для локального проекту,  можна встановити одною командою всі залежності проекту через файл  package.json.[[11\]](https://uk.wikipedia.org/wiki/Npm#cite_note-npm-install-docs-11)  У файлі package.json кожна залежність може визначати діапазон дійсних [версій](https://uk.wikipedia.org/wiki/Нумерація_версій_програмного_забезпечення), використовуючи схему семантичної версії, що дозволяє розробникам  автоматично оновлювати свої пакети, одночасно уникаючи небажаних змін.[[12\]](https://uk.wikipedia.org/wiki/Npm#cite_note-npm-semver-docs-12)

## Установка

Установка пакунка проводиться за допомогою команди:

```
npm install <packagename>
```

Всі доступні для установки пакунки та їх короткий опис:

```
npm search
```



# Основні команди npm 

https://docs.npmjs.com/about-npm/

https://docs.npmjs.com/cli-documentation/

###### допомога (help)

```bash
npm help
Usage: npm <command>
where <command> is one of:
    access, adduser, audit, bin, bugs, c, cache, ci, cit,
    clean-install, clean-install-test, completion, config,
    create, ddp, dedupe, deprecate, dist-tag, docs, doctor,
    edit, explore, fund, get, help, help-search, hook, i, init,
    install, install-ci-test, install-test, it, link, list, ln,
    login, logout, ls, org, outdated, owner, pack, ping, prefix,
    profile, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, team, test, token, tst, un,
    uninstall, unpublish, unstar, up, update, v, version, view,
    whoami

npm <command> -h  коротка допомога по <command>
npm -l            відображає повну інформацію по командам
npm help <term>   шукає допомогу по <term> в довідниковій системі
npm help npm      викликає довідникову систему
```



###### Оновлення npm до останньої версії

[Посилання](https://docs.npmjs.com/try-the-latest-stable-version-of-npm) 

Для *nix систем:

```bash
sudo npm install -g npm@latest
```

Для Windows:

Завантажити нову версію і запустити інсталяцію для оновлення https://nodejs.org/en/download/current/

###### Встановлення пакетів (install)

https://docs.npmjs.com/cli-commands/install.html

```bash
  npm install sax
  npm install githubname/reponame
  npm install @myorg/privatepackage
  npm install node-tap --save-dev
  npm install dtrace-provider --save-optional
  npm install readable-stream --save-exact
  npm install ansi-regex --save-bundle
  npm install sax@latest
  npm install @myorg/mypackage@latest
  npm install sax@0.1.1
  npm install @myorg/privatepackage@1.5.0
```

###### Виведення списку пакетів (list, ls) 

```bash
npm ls
```

###### Виведення інформації про застарівші пакети (outdated)

```bash
npm outdated
```

###### Оновлення пакетів (update)

https://docs.npmjs.com/cli-commands/update.html

```bash
npm update [-g] [<pkg>...]
aliases: up, upgrade
```

This command will update all the packages listed to the latest version (specified by the `tag` config), respecting semver.

It will also install missing packages. As with all commands that install packages, the `--dev` flag will cause `devDependencies` to be processed as well.

If the `-g` flag is specified, this command will update globally installed packages.

If no package name is specified, all packages in the specified location (global or local) will be updated.

As of `npm@2.6.1`, the `npm update` will only inspect top-level packages. Prior versions of `npm` would also recursively inspect all dependencies. To get the old behavior, use `npm --depth 9999 update`.

As of `npm@5.0.0`, the `npm update` will change `package.json` to save the  new version as the minimum required dependency. To get the old behavior,  use `npm update --no-save`.



`npm update -g` will apply the `update` action to each globally installed package that is `outdated` – that is, has a version that is different from `latest`.

NOTE: If a package has been upgraded to a version newer than `latest`, it will be *downgraded*.

###### Сканування (audit)

Сканує проект на предмет вразливості та автоматично встановлює усі сумісні оновлення на вразливі залежності:

```
npm audit
```

## [npm config](https://docs.npmjs.com/misc/config)

http://prgssr.ru/development/vvedenie-v-paketnyj-menedzher-npm-dlya-nachinayushih.html



 