# Switch

https://docs.appsmith.com/reference/widgets/switch

Switch — це простий віджет інтерфейсу користувача, який можна використовувати, коли ви хочете, щоб користувачі зробили двійковий вибір.

<iframe style="width:100%;height:auto;aspect-ratio:16/9;border-radius:0.5rem;overflow:hidden" src="https://youtube.com/embed/5kNWJ9mtlOw?autoplay=1" srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:100px;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.25em gray}</style><a href=https://youtube.com/embed/5kNWJ9mtlOw?autoplay=1><img src=https://img.youtube.com/vi/5kNWJ9mtlOw/maxresdefault.jpg alt='How to use Switch Widget'><span><svg width=&quot;100px&quot; height=&quot;100px&quot; viewBox=&quot;0 0 463 462&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><circle opacity=&quot;0.5&quot; cx=&quot;231.742&quot; cy=&quot;230.999&quot; r=&quot;231&quot; fill=&quot;#FE5011&quot;></circle><path d=&quot;M181.703 165.53C181.703 156.392 191.812 150.873 199.499 155.814L301.34 221.283C308.412 225.83 308.412 236.168 301.34 240.715L199.499 306.184C191.812 311.125 181.703 305.606 181.703 296.468V165.53Z&quot; fill=&quot;#FFFFFF&quot;></path></svg></span></a>" allowfullscreen="" title="How to use Switch Widget" loading="lazy" allow="autoplay; picture-in-picture" frameborder="0"></iframe>

*How to use Switch Widget*

## Властивості

Властивості дозволяють редагувати віджет, з’єднувати його з іншими віджетами та налаштовувати дії користувача.

### Властивості віджетів

Ці властивості дозволяють редагувати віджет. Усі ці властивості присутні на панелі властивостей віджета. У наведеній нижче таблиці перераховано всі властивості віджетів.

| Property                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Default Selected**                                         | This value is a boolean that is set to true if the switch is turned on. |
| **Visible**                                                  | Control widget's visibility on the page. When turned off, the widget isn't visible when the app is published |
| **Disabled**                                                 | Disables input/selection to the widget. The widget remains visible to the user but user input/selection is not allowed. |
| **Animate Loading**                                          | Allows you to control a widget’s animation on the page load. |
| [**Height**](https://docs.appsmith.com/reference/widgets#height) | It configures how a widget’s height reacts to content changes. It has three possible configurations: **Fixed**: The height of the widget remains as set using drag and resize. **Auto Height**: The height of the widget reacts to content changes.   **Auto Height with limits**: Same as Auto height, with a configurable option to set the minimum and  maximum number of rows that can be occupied by the widget. |

### Властивості зв'язування

Ці властивості допомагають обмінюватися значеннями між віджетами, а також дозволяють легко отримати доступ до властивості віджета в Запитах або функції JS

| Property         | Description                                                  | Code Snippet                   |
| ---------------- | ------------------------------------------------------------ | ------------------------------ |
| **isDisabled**   | This value is a boolean that is set to true if the switch is disabled. | `{{widget_name.isDisabled}}`   |
| **isSwitchedOn** | This value is a boolean that is set to true if the switch is turned on. | `{{widget_name.isSwitchedOn}}` |
| **isVisible**    | This value is a boolean that is set to true if the switch is set as visible. | `{{widget_name.isVisible}}`    |

### Events

They are a set of actions that you can perform on the widget. The following table lists the actions:

| Events       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| **onChange** | Sets the action to be run when the user toggles the switch. See a list of [supported actions](https://docs.appsmith.com/reference/appsmith-framework/widget-actions) |

### Label

The property hosts a group of configurations that you can use to associate a display name and define a placement for the widget. These properties  are usually useful when you want to design forms that follow a defined  alignment for your form fields and give a professional look to your  forms. Below are the properties that you can use:

| Label         | Description                            |
| ------------- | -------------------------------------- |
| **Label**     | Sets the label of the switch.          |
| **Position**  | Sets the label position of the widget. |
| **Alignment** | Sets the alignment of the widget.      |

| Label Style          | Description                                         |
| -------------------- | --------------------------------------------------- |
| **Text Color**       | Allows you to set text color for the label.         |
| **Text Size**        | Allows you to set the size of the label.            |
| **Label Font Style** | Allows you to choose a font style (bold or italic). |

### Styles

Style properties allow you to change the look and feel of the widget.

| Style            |                                          |
| ---------------- | ---------------------------------------- |
| **Accent color** | Sets the background color of the widget. |