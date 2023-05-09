# Створення інтерфейсу користувача

Appsmith має полотно у стилі сітки, де ви можете перетягувати настроювані віджети, щоб швидко створити інтерфейс програми. 

## Розробка програми

Appsmith надає інтуїтивно зрозумілий інтерфейс перетягування, який дає змогу створювати програму за допомогою [віджетів](https://docs.appsmith.com/reference/widgets), розміщуючи їх на полотні відповідно до ваших вимог. Він також поставляється з попередньо створеними [шаблонами](https://www.appsmith.com/templates), які ви можете налаштувати відповідно до своїх потреб.

Під час створення програми вам може знадобитися кілька елементів інтерфейсу користувача для таких цілей, як зберігання даних, ініціювання дії тощо. Віджети — це попередньо створені компоненти інтерфейсу користувача, які можна додати до програми будь-де на полотні.

Щоб додати віджет на полотно, виберіть «віджет» на вкладці «Віджети» в провіднику об’єктів ліворуч від екрана, перетягніть його на полотно та опустіть.

Під час роботи над програмою додавати та розміщувати кілька віджетів легко та інтуїтивно зрозуміло за допомогою жестів перетягування в Appsmith. Коли ви додаєте новий віджет, віджети, які вже є на полотні, відсуваються вбік і звільняють місце для вхідного віджета. Ви можете перетягнути віджет у потрібне місце, а інші віджети в тій самій області на полотні автоматично перемістяться або змінять розмір відповідно до вхідного віджета.

![Arrange widgets](https://docs.appsmith.com/assets/images/arrange-widgets-ae5de106bb015ef4cc14f71a9fa4df63.gif)

Коли віджет досягає межі свого контейнера, він починає змінювати розміри, щоб забезпечити більше місця для вхідного віджета. Співвідношення сторін зберігається навіть при зміні розміру. Ви можете налаштувати розмір віджета, вибравши його та перетягнувши маркер зміни розміру.

Appsmith надає функцію [автоматичної висоти](https://docs.appsmith.com/reference/widgets#auto-height) для деяких віджетів, яка дозволяє віджету автоматично регулювати свою висоту у відповідь на зміни у своєму вмісті. Ця можливість дозволяє віджетам рости у висоту без будь-яких обмежень, забезпечуючи більш динамічний інтерфейс користувача.

![auto height](https://docs.appsmith.com/assets/images/auto-height-c1d5cdb54848a86f71af23ee621e1db5.gif)

Коли віджет змінює висоту, макет налаштовується, щоб підтримувати відстань між віджетом, висота якого змінюється, і однотипними віджетами під цим віджетом, які займають один або кілька однакових стовпців

Щоб значно заощадити час і зусилля під час створення складних макетів або форм, ви можете створити кілька копій одного віджета. Щоб скопіювати віджет, виділіть його та скопіюйте та вставте віджет у те місце, де ви хочете його розмістити. Окрім копіювання окремих віджетів, ви також можете скопіювати **кілька віджетів одночасно**, вибравши їх курсором.

Одна з переваг дублювання віджетів полягає в тому, що скопійовані віджети мають таку саму конфігурацію, як і оригінал, включно з будь-якими властивостями чи налаштуваннями, які до нього було застосовано. Це означає, що вам не потрібно вручну повторно створювати віджет і знову застосовувати ті самі налаштування.

**Групування віджетів**

Ви можете групувати віджети, щоб керувати їхнім розташуванням, підтримувати їхнє положення на екрані або застосовувати правила видимості та дії до групи віджетів одночасно. Групування віджетів також корисно, щоб обмежити їх рух і запобігти їх розширенню в непотрібні області. Щоб згрупувати віджети, ви можете вибрати їх за допомогою курсора, а потім клацнути піктограму «Згрупувати» або скористатися комбінацією клавіш, щоб згрупувати віджети разом.

![Group widgets](https://docs.appsmith.com/assets/images/group-widgets-445a6b659f2ab805434a6f0a7416ac9e.gif)

**Переміщення віджетів між контейнерами**

Віджет може переміщатися між контейнерами. Контейнером може бути полотно (canvas) або віджет макета layout. Віджети макета – це ті, які можуть містити інші віджети, наприклад - віджет [Контейнер](https://docs.appsmith.com/reference/widgets/container) , [Список](https://docs.appsmith.com/reference /widgets/list), віджет [Tabs](https://docs.appsmith.com/reference/widgets/tabs) тощо. Ви можете перемістити віджет у новий контейнер, перетягнувши курсор.

![Moving Across Containers](https://docs.appsmith.com/assets/images/move-widgets-cdbefb261575d5524e37e71c56282266.gif)

**Стилізація віджетів**

Стилі дозволяють налаштувати зовнішній вигляд ваших віджетів. За допомогою властивостей стилю на панелі властивостей ви можете змінити колір, положення, шрифт тощо, щоб змінити зовнішній вигляд ваших віджетів. Кожен віджет може мати унікальні параметри стилю або атрибути, що відповідають його типу та призначенню.

![Moving Across Containers](https://docs.appsmith.com/assets/images/style-widgets-2-c1b4a1af4aa107b4daa307f13370fe96.gif)

### Теми 

Тема додатка дає змогу стилізувати сторінки та [віджети](https://docs.appsmith.com/reference/widgets) за допомогою глобальних елементів керування, що дозволяє легко змінювати візуальний макет одним клацанням миші.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/v6Lc3p6lv7o" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/v6Lc3p6lv7o><img src=https://img.youtube.com/vi/v6Lc3p6lv7o/maxresdefault.jpg alt='How to use App themes'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="How to use App themes" loading="lazy" frameborder="0"></iframe>

Теми — це стилі прикладного рівня, які застосовуються до всіх віджетів, пов’язаних із властивостями теми.

Усі програми підтримують створення тем, але для старіших програм зміна теми або налаштування теми може не оновити програму повністю. Це зроблено для того, щоб запобігти заміні будь-яких змін, які ви вже внесли за допомогою стилізації ваших віджетів. Якщо ви все ще бажаєте використовувати теми у своїй існуючій програмі, скиньте стилі свого віджета.

У програмах теми можна змінювати та налаштовувати за допомогою «Властивостей теми» на панелі властивостей під час відкриття програми або коли не вибрано жодного віджета.

Кожен додаток має прикладну тему, яку можна змінювати. Ви можете змінити застосовану тему двома способами:

1. **Changing the theme** - Ви можете змінити тему зі збереженого списку тем або тем за замовчуванням.
2. **Customizing the theme**. Тему можна налаштувати далі на основі параметрів налаштування, доступних у властивостях теми.

You can browse the default themes or your saved themes by clicking the **Change Theme** button. Once you select the preferred theme, it is applied  automatically. After the theme is applied, you can go back and customize it further.

You can choose to undo the applied theme if you don't like it.

Once applied, you can customize the theme further by updating the following items:

1. **App font:** It changes the font family used in the app.
2. Colors:
   1. Primary Color - It applies to all the components/widgets in your app.
   2. Background Color - It changes the app's background color (canvas).
3. **App border radius:** It changes the default border-radius across all widgets. Currently, we support three different border radii by default.
4. **App box-shadow:** It changes the default box shadow for layout widgets like containers, forms ,and lists.

All changes made to the applied theme are auto-saved. However, you can save themes for re-using them later. Think of this as checkpointing a theme; it will help keep a safe version of the theme if you want to keep  customizing your current theme.

You can view these themes from the theme list and choose to apply them when you wish to. You can also  choose to delete a saved theme, which will have no impact on your  application.

When you apply a theme from the themes section and customize it, we create a copy and apply it to the app. It ensures that default themes are never  overridden.

All apps support theming, but apps created before the new theme options  might still be using the older styles, because we do not want to break  any of the style settings you have made.

To update your older apps to use theming, you will need to use the **Reset widget styles** button from the menu in the **Theme Properties** pane.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/6W-EIPKCNK8" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/6W-EIPKCNK8><img src=https://img.youtube.com/vi/6W-EIPKCNK8/maxresdefault.jpg alt='Reset all Widget Styles'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Reset all Widget Styles" loading="lazy" frameborder="0"></iframe>

*Reset all Widget Styles*

1. Click an empty spot on the canvas so that no widgets are selected.
2. Find the **Theme Properties** settings on the right of the page, and click the three dots (⋯) button.
3. Click the **Reset widget styles** button.

All of the widgets which previously did not support theming will now be ready for new styles.

Within each widget's style properties, there are some properties that the  theme can control. When you drag a new widget to the canvas, it will  automatically sync with the theme values.

You can choose to  override the values from the widget, and once you do, there is an  indication with an "Orange dot" that the value has changed from the  theme's value. You can go back to the theme's value using the "Reset  value" icon present on the right end of the property.

### Макет програми

Макет програми можна вибрати так, щоб її розмір відповідав пристрою, для якого він призначений. Розмітка робочого столу встановлена за замовчуванням для програми.

Для макета програми, який має мінімально-максимальне обмеження ширини, програма заповнює ширину браузера, доки ширина браузера не перевищить максимальну ширину вибраного макета. Коли вона перевищує максимальну ширину макета, додаткова ширина заповнюється пробілами. Програма не буде стискатися нижче мінімальної ширини вибраного макета та показуватиме сувої, якщо ширина браузера менша за мінімальну ширину вибраного макета.

У випадку `Fluid` додаток заповнює ширину браузера.

У будь-який момент часу, щоб змінити макет програми, клацніть елемент керування макетом у верхній частині полотна та виберіть макет для використання.

![img](https://docs.appsmith.com/assets/images/layout-4c5975b33a017bd60ab4531c6816d809.gif)

Changing layout for an application will change the layout of all pages of the application.

**Supported Layouts**

- Desktop (Application width would resize in between 1280px - 1160px)
- Tablet L (Application width would resize in between 1080px - 960px)
- Tablet (Application width would resize in between 800px - 650px)
- Mobile Device (Application width would resize in between 450px - 350px)
- Fluid (Application fills up to the Browser Width)

## Створення динамічного інтерфейсу користувача

У цьому документі передбачається, що ви розумієте основи [Displaying Data](https://docs.appsmith.com/core-concepts/data-access-and-binding/displaying-data-read) і [Capturing Data](https:/ /docs.appsmith.com/core-concepts/data-access-and-binding/capturing-data-write) і розширює концепцію побудови динамічного інтерфейсу користувача, який реагує на дані користувача та системні дані

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/vlx8TEuep5I" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/vlx8TEuep5I><img src=https://img.youtube.com/vi/vlx8TEuep5I/maxresdefault.jpg alt='Dynamically Update Widget Properties'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Dynamically Update Widget Properties" loading="lazy" frameborder="0"></iframe>

**Dynamic Properties**

Кожну властивість віджета можна динамічно описати за допомогою JavaScript всередині панелей керування `{{}}`. Властивості, які не мають вхідних даних для написання JavaScript, можна зробити динамічними, натиснувши кнопку JS поруч із ними. Це перетворює властивість на поле введення, яке можна використовувати для написання коду.

![img](https://docs.appsmith.com/assets/images/convert_js-2991250d60cb9f32395531fbe569f56a.gif)

**Оновлення даних віджета**

Розглянемо приклад [таблиці, що відображає](https://docs.appsmith.com/reference/widgets/table#table-data) список продуктів. Коли користувач вибирає продукт у таблиці, ми можемо забажати оновити інформацію про продукт у формі, щоб користувач міг оновити продукт.

![Click to expand](https://docs.appsmith.com/assets/images/table_form-13bff8259d43adca2143555b62c969ae.gif)

Щоб досягти цього, ми можемо заповнити значення за замовчуванням кожного з віджетів форми відповідним значенням, вибраним у таблиці. Ми можемо посилатися на [таблиці](https://docs.appsmith.com/reference/widgets/table#binding-properties) [`selectedRows`](https://docs.appsmith.com/reference/widgets/table# selectedrows), використовуючи його назву всередині **`{{ }}`**

Отримати введення назви продукту (властивість Text за замовчуванням)

```javascript
{{ Table1.selectedRow.productName }}
```

Отримати MRP Input (властивість Default Text)

```javascript
{{ Table1.selectedRow.mrp }}
```

Get Category Dropdown (Default Option property)

```javascript
{{ Table1.selectedRow.category }}
```

Here Table1 is the name of the widget

![Click to expand](https://docs.appsmith.com/assets/images/form_-_table-e5e831e1c69b7d6753ed2ea5d1e3df41.gif)

**Встановлення висоти віджета**

Ви можете встановити висоту віджета за допомогою властивості Height. Він налаштовує, як висота віджета реагує на зміни вмісту в програмі. Щоб створити динамічний інтерфейс користувача, ви можете використовувати автоматичну висоту, яка надає віджету можливість змінювати висоту у відповідь на зміни вмісту. Автоматична висота позбавляє вас від завдання визначення висоти віджета вручну. Щоб отримати додаткові відомості, перегляньте властивість [Автоматична висота](https://docs.appsmith.com/reference/widgets#auto-height) віджетів.

### Керування видимістю віджетів

Властивість видимості зазвичай є перемикачем на панелі властивостей кожного віджета. Цю властивість можна зробити динамічною, натиснувши кнопку JS поруч із властивістю, яка перетворить її на текстове поле. Всередині тексту значення видимості можна умовно встановити за допомогою javascript.

Контролюйте видимість за допомогою інших віджетів

У наведеному нижче прикладі видимість таблиці є умовним значенням на основі вибраного значення RadioGroup

```javascript
{{RadioGroup1.selectedOptionValue === "Visible"}}
```

The Visible property expects the expression to evaluate to a boolean value

![img](https://docs.appsmith.com/assets/images/control_visibility-9ffde065000fabdfe11d149fc0d89dcd.gif)

**Control Visibility with Query responses**

Similar to the above example, we can tie the visibility of a widget to the response of a Query.

```javascript
{{ API1.data.value === "trueValue" }}
```

**Dynamic Forms**

There are some cases that require form fields to dynamically change based on the user input. This can be achieved using a [Tab](https://docs.appsmith.com/reference/widgets/tabs) widget inside the form and conditionally updating the selected tab value based on the inputs of the [form](https://docs.appsmith.com/reference/widgets/form)

![img](https://docs.appsmith.com/assets/images/dynamic_forms-47b89e0e5d02cb6331e9668f40110505.gif)

Hide the tabs in the tab widget to make it look like the views are changing in place.