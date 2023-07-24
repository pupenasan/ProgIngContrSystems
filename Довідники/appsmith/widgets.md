# Widgets

https://docs.appsmith.com/reference/widgets

[Віджети](https://docs.appsmith.com/reference/) допомагають користувачеві створити макет програми. Користувачі можуть [зберігати дані](https://docs.appsmith.com/core-concepts/data-access-and-binding/capturing-data-write) із [бази даних](https://docs.appsmith.com /reference/datasources) або [API](https://docs.appsmith.com/core-concepts/connecting-to-data-sources/authentication/connect-to-apis) виклик, [активні події](https: //docs.appsmith.com/reference/appsmith-framework/widget-actions) тощо.

Віджети можна перетягувати з панелі віджетів, розміщувати на полотні та змінювати розмір відповідно до даних, які вони повинні відображати. Вони також постачаються з властивостями, які можна візуально редагувати, щоб налаштувати їхні дані, змінити їхні стилі та ініціювати дії з них.

## Назви віджета

Віджет повинен мати унікальне ім’я, яке виконує роль ідентифікатора на сторінці. Він використовується для доступу до властивостей віджета всюди в програмі. У цьому сенсі ім’я схоже на змінну в мові програмування.

Зауважте, що [ключові слова JavaScript](https://www.w3schools.com/js/js_reserved.asp) і [методи та властивості об’єкта вікна](https://www.w3schools.com/jsref/obj_window.asp) не недійсні як імена віджетів.

Ви можете отримати доступ до різних властивостей віджета за допомогою імені віджета.

```javascript
{{ Table1.selectedRow.id }}
```

## Групування віджетів

Appsmith підтримує групування віджетів. Коли ви групуєте віджети, вони поміщаються в контейнер і їх можна переміщувати разом. Зробити це -

- Виберіть кілька віджетів за допомогою Ctrl + клацання лівою кнопкою миші
- Тепер клацніть піктограму квадрата з пунктиром або натисніть Ctrl + G

## Загальні властивості

Наступні властивості є загальними для багатьох віджетів Appsmith. Ви можете знайти їх, вибравши свій віджет і перевіривши його панель властивостей, і ви можете використовувати їх, щоб налаштувати деталі та поведінку вашої програми.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [**Height**](https://docs.appsmith.com/reference/widgets#height) | It configures how a widget’s height reacts to content changes. It has three possible configurations: **[Fixed](https://docs.appsmith.com/reference/widgets#fixed)**: The height of the widget remains as set using drag and resize. **[Auto Height](https://docs.appsmith.com/reference/widgets#auto-height)**: The height of the widget reacts to content changes.   **[Auto Height with limits](https://docs.appsmith.com/reference/widgets#auto-height-with-limits)**: Same as Auto height, with a configurable option to set the minimum and  maximum number of rows that can be occupied by the widget. |
| **[Disabled](https://docs.appsmith.com/reference/widgets#disabled)** | Makes the widget un-clickable or unusable. The widget remains visible to the user but user interaction won't be allowed. |
| **[Error Message](https://docs.appsmith.com/reference/widgets#error-message)** | Sets the text of the error message to display if user input is considered invalid. |
| **[Tooltip](https://docs.appsmith.com/reference/widgets#tooltip)** | Sets a tooltip for the widget. You can add hints or extra information about the required input from the user. |
| **[Regex](https://docs.appsmith.com/reference/widgets#regex)** | Used to add custom regular expression validation to perform on user input.  When the input doesn't match the regular expression, the input is  considered invalid. |
| **[Placeholder](https://docs.appsmith.com/reference/widgets#placeholder)** | Sets the placeholder text within the input box. Use to show a hint or example value to the user. |
| **[Required](https://docs.appsmith.com/reference/widgets#required)** | Sets whether the input field is a mandatory field. When the input widget is  within a Form widget, that Form's submit button is automatically turned  off until a user adds input to the field. |
| **[Valid](https://docs.appsmith.com/reference/widgets#valid)** | Sets an expression to decide whether the user's input is considered valid. When the expression evaluates to `false`, the input is considered invalid and the widget shows its **Error Message**. |
| **[Visible](https://docs.appsmith.com/reference/widgets#visible)** | Controls widget's visibility on the page. When turned off: The widget won't be  visible when the app is published. It appears translucent when in Edit  mode. |
| **Animate Loading**                                          | When turned off, the widget loads without any skeletal animation. You can use a toggle switch to turn it on/off. |

Lets understand these properties in detail.

## Height

The Height property configures how a widget’s height reacts to content  changes. This is a configurable property. The configuration to this  property can be found in the property pane under the section `General`, with the property name `Height`. It has three possible configurations:

- Fixed
- Auto Height
- Auto Height with limits

### Fixed

When you choose the Height as fixed, The height of the widget remains as set during drag and resize. The widget doesn't change or adapt to any  content changes,i.e, you have to adjust the height manually.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/265AWQkqZAM" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/265AWQkqZAM><img src=https://img.youtube.com/vi/265AWQkqZAM/maxresdefault.jpg alt='Fixed Height'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Fixed Height" loading="lazy" frameborder="0"></iframe>

*Fixed Height*

### Auto height

Auto height is a capability in widgets to change height in response to  content changes. While using Auto Height, there is no limit to how much a widget can grow in height. However, the minimum height possible for any widget is 4 rows. 

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/JF9zeUDKnl0" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/JF9zeUDKnl0><img src=https://img.youtube.com/vi/JF9zeUDKnl0/maxresdefault.jpg alt='Auto height In Action'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Auto height In Action" loading="lazy" frameborder="0"></iframe>

*Auto height In Action*

When a widget changes height, the layout adjusts to maintain the distance  between the widget undergoing a height change and the sibling widgets  below this widget occupying one or more of the same columns.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/xjQqHrswZLM" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/xjQqHrswZLM><img src=https://img.youtube.com/vi/xjQqHrswZLM/maxresdefault.jpg alt='Layout changes based on auto height'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Layout changes based on auto height" loading="lazy" frameborder="0"></iframe>

*Layout changes based on Auto Height*

Widgets which have auto height enabled, and are invisible in view and preview  mode, let go of their occupied space, allowing widgets below to move up  and occupy the now free space.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/JdkAGFpxvxY" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/JdkAGFpxvxY><img src=https://img.youtube.com/vi/JdkAGFpxvxY/maxresdefault.jpg alt='Layout changes due to invisible widgets'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Layout changes due to invisible widgets" loading="lazy" frameborder="0"></iframe>

*Layout changes due to invisible widgets*

### Auto height with limits

Appsmith provides an option to set the limits to which a widget can grow or  shrink in height. This can be configured to be enabled by selecting `Auto height with limits` from the `Height` property in the `General` section of the property pane. Once enabled, select the widget, to find  two handles which also work as the values for the minimum and maximum  height a widget can occupy on the canvas. These handles can be dragged  to configure the minimum and maximum height limits for the widget.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/yADpUJ3Y8v8" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/yADpUJ3Y8v8><img src=https://img.youtube.com/vi/yADpUJ3Y8v8/maxresdefault.jpg alt='Auto Height with limits'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Auto Height with limits" loading="lazy" frameborder="0"></iframe>

*Auto Height with limits*

- Container and Form widgets have a minimum height of 10 rows by default, which can be changed by choosing auto height with limits.
- The minimum height possible for any widget is 4 rows.

## Disabled

Він забороняє користувачеві вводити значення у віджет введення. Віджет видимий (якщо ввімкнено Visible), але введення користувачами буде заборонено. Ви також можете написати код JS, щоб зв’язати функції Disabled із діями користувача. Натисніть `JS` поруч із `Disabled`, щоб написати код JavaScript.

Наприклад, перетягніть віджет прапорця `Checkbox1` на полотно та прив’яжіть його до властивості `Disabled`. Щоб увімкнути `Вимкнено`, коли користувач ставить прапорець, додайте наступний код JavaScript:

```текст
{{Checkbox1.isChecked}}
```

Коли ви встановлюєте прапорець, це вмикає властивість Disabled і запобігає взаємодії з полем введення.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/JEARavnq0vQ" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/JEARavnq0vQ><img src=https://img.youtube.com/vi/JEARavnq0vQ/maxresdefault.jpg alt='Disable'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Disable" loading="lazy" frameborder="0"></iframe>

*Disable*

## Error message

If a user enters an incorrect value, the input widget shows a message "invalid input." You can change this message by using the `Error message` property to provide better feedback on the input given by the user.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/oeUHJhM4zyU" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/oeUHJhM4zyU><img src=https://img.youtube.com/vi/oeUHJhM4zyU/maxresdefault.jpg alt='Error Message'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Error Message" loading="lazy" frameborder="0"></iframe>

*Error Message*

## Tooltip

Tooltips are often used to show the user extra information about an element on  the page, or to give them extra hints on how to use something. They're  usually hidden until a certain condition is met, such as the user's  mouse cursor hovering over the element.

The Tooltip property in  Appsmith is used to set the text that appears within a floating box near the widget when the user mouses over it. In some cases (such as the  Input widget), the tooltip is applied to a small question mark icon set  within the widget, and appears when the user's cursor is placed over the icon.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/UZ3MBVfNSzk" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/UZ3MBVfNSzk><img src=https://img.youtube.com/vi/UZ3MBVfNSzk/maxresdefault.jpg alt='Tooltip'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Tooltip" loading="lazy" frameborder="0"></iframe>

*Tooltip*

## Заповнювач

Ви можете встановити проксі-текст/значення всередині поля введення за допомогою властивості `placeholder`. Це може бути будь-яке повідомлення або підказка щодо очікуваного введення.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/576Bfo8htf0" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/576Bfo8htf0><img src=https://img.youtube.com/vi/576Bfo8htf0/maxresdefault.jpg alt='Placeholder'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Placeholder" loading="lazy" frameborder="0"></iframe>

*Placeholder*

## Регулярний вираз

Використовуючи властивість `Regex` або регулярний вираз, ви можете встановити певні обмеження на вхідні дані, які очікуєте від користувача.

Наприклад, додайте регулярний вираз для введення імені. Ім'я може містити лише букви та пробіли між ім'ям та прізвищем.

```текст
/^[a-z -]+$/i
```

Якщо ви введете значення, відмінне від букви або пробілу (кількість спеціальних символів), віджет покаже повідомлення про помилку «недійсне введення».

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/n6VUQN-wv9U" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/n6VUQN-wv9U><img src=https://img.youtube.com/vi/n6VUQN-wv9U/maxresdefault.jpg alt='Regular Expression(Regex)'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Regular Expression(Regex)" loading="lazy" frameborder="0"></iframe>

*Regular Expression(Regex)*

## Required

Entering a value in the input box is mandatory when the required property is  enabled. You can also write a JS code to link this property to a user  action. Click on `JS` next to the `Required` to write JavaScript code.

For example, drag a checkbox widget `Checkbox1` onto the canvas and bind it to the `Required` property. To enable the `Required` when the user checks the checkbox, add the following JavaScript code in the Required property:

```text
{{Checkbox1.isChecked}}
```

When you tick the checkbox, it enables the Required property, and the input  box shows an error message "This field is required" if you haven't  entered any input.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/2hqT02HCah8" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/2hqT02HCah8><img src=https://img.youtube.com/vi/2hqT02HCah8/maxresdefault.jpg alt='Required'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Required" loading="lazy" frameborder="0"></iframe>

*Required*

## Valid

The `Valid` property can be used to set a condition or expression that the user's  input must meet in order for the widget to accept it. If the given  condition isn't met, the widget shows a tooltip that contains the text  that has been set within its **Error Message** property (or "Invalid input" if the property isn't set). Forms can also be  configured such that they're not able to be submitted if one of their  child widgets has user input that's considered invalid.

To see how the Valid property works, drag an Input widget onto the canvas and set the `Valid` property to the following:

```text
{{Input1.text.length >= 3}}
```

Now when the field has fewer than three characters entered, a tooltip appears with the widget's **Error Message**, or the text "Invalid input."

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/rk3yzSoe6aw" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/rk3yzSoe6aw><img src=https://img.youtube.com/vi/rk3yzSoe6aw/maxresdefault.jpg alt='Valid'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Valid" loading="lazy" frameborder="0"></iframe>

*Valid*

## Visible

`Visible` controls the widget's visibility on the app's page. The widget won't be visible on the published app if you turn off this property. You can  also write a JS code to link Visible's functionality to a user action.  Click on `JS` next to the `Visible` to write JavaScript code.

For example, drag a checkbox widget `checkbox1` onto the canvas and bind it to the `Visible` property. To enable the `Visible` when the user checks the checkbox, add the following JavaScript code:

```text
{{Checkbox1.isChecked}}
```

When you tick the checkbox, it enables the Visible property, and the input box will be visible in the app.

<iframe style="width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 0.5rem; overflow: hidden;" src="https://youtube.com/embed/Jb5bNVhFoRE" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/Jb5bNVhFoRE><img src=https://img.youtube.com/vi/Jb5bNVhFoRE/maxresdefault.jpg alt='Visible'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="Visible" loading="lazy" frameborder="0"></iframe>

*Visible*

# Усі віджети 

Плюсом вказані ті, що є в Ubos

## Контейнери та оформлення

- [Container](https://docs.appsmith.com/reference/widgets/container) +
- [Divider](https://docs.appsmith.com/reference/widgets/divider) +
- [Iframe](https://docs.appsmith.com/reference/widgets/iframe) +
- [Modal](https://docs.appsmith.com/reference/widgets/modal) +
- [Tabs](https://docs.appsmith.com/reference/widgets/tabs) + 

## Діаграми

- [Chart](https://docs.appsmith.com/reference/widgets/chart) +

## Таблиці, списки, форми

- [Form](https://docs.appsmith.com/reference/widgets/form) +
- [List](https://docs.appsmith.com/reference/widgets/list) +
- [Table](https://docs.appsmith.com/reference/widgets/table) + 
- [Treeselect](https://docs.appsmith.com/reference/widgets/tree-select) +
- [Multi-tree-select](https://docs.appsmith.com/reference/widgets/multi-tree-select) +

## Інтерактивні елементи та відображення

- [Button](https://docs.appsmith.com/reference/widgets/button) +
- [Button Group](https://docs.appsmith.com/reference/widgets/button-group) +
- [Checkbox](https://docs.appsmith.com/reference/widgets/checkbox) +
- [Checkbox Group](https://docs.appsmith.com/reference/widgets/checkbox-group) +
- [Currency Input](https://docs.appsmith.com/reference/widgets/currency-input) +
- [Datepicker](https://docs.appsmith.com/reference/widgets/datepicker) +
- [Icon Button](https://docs.appsmith.com/reference/widgets/icon-button) +
- [Image](https://docs.appsmith.com/reference/widgets/image) +
- [Input](https://docs.appsmith.com/reference/widgets/input) +
- [JSON Form](https://docs.appsmith.com/reference/widgets/json-form) +
- [Menu Button](https://docs.appsmith.com/reference/widgets/menu-button) +
- [Multiselect](https://docs.appsmith.com/reference/widgets/multiselect) +
- [Phone Input](https://docs.appsmith.com/reference/widgets/phone-input) +
- [Progress](https://docs.appsmith.com/reference/widgets/progress) + 
- [Radio Group](https://docs.appsmith.com/reference/widgets/radio-group) +
- [Rating](https://docs.appsmith.com/reference/widgets/rating) +
- [Rich Text Editor](https://docs.appsmith.com/reference/widgets/rich-text-editor) +
- [Select](https://docs.appsmith.com/reference/widgets/select) + 
- [Sliders](https://docs.appsmith.com/reference/widgets/sliders) +
- [Stats Box](https://docs.appsmith.com/reference/widgets/stat-box) + 
- [Switch](https://docs.appsmith.com/reference/widgets/switch) + 
- [Switch Group](https://docs.appsmith.com/reference/widgets/switch-group) +
- [Text](https://docs.appsmith.com/reference/widgets/text) + 

## Аудіо та відео

- [Audio](https://docs.appsmith.com/reference/widgets/audio) +
- [Audio Recorder](https://docs.appsmith.com/reference/widgets/audio-recorder) +
- [Camera](https://docs.appsmith.com/reference/widgets/camera) +
- [Video](https://docs.appsmith.com/reference/widgets/video) +

## Взаємодія з зовнішніми засобами та файлами

- [Code Scanner](https://docs.appsmith.com/reference/widgets/code-scanner) - 
- [Document Viewer](https://docs.appsmith.com/reference/widgets/document-viewer) +
- [Filepicker](https://docs.appsmith.com/reference/widgets/filepicker) +
- [Map](https://docs.appsmith.com/reference/widgets/maps) +
- [Map Chart](https://docs.appsmith.com/reference/widgets/map-chart) + 