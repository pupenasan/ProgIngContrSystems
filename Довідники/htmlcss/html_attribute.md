[До розділу](README.md)

# Атрибути тегів

## Универсальные атрибуты

<http://htmlbook.ru/html/attr/common>

Универсальные атрибуты применяются практически ко всем тегам, поэтому выделены в  отдельную группу, чтобы не повторять их для всех тегов.

### [accesskey](http://htmlbook.ru/html/attr/accesskey)

Позволяет получить доступ к элементу с помощью заданного сочетания клавиш.

### [class](http://htmlbook.ru/html/attr/class)

Определяет имя класса, которое позволяет связать тег со стилевым  оформлением.

### [contenteditable](http://htmlbook.ru/html/attr/contenteditable)

Сообщает, что элемент доступен для редактирования пользователем.

### [contextmenu](http://htmlbook.ru/html/attr/contextmenu)

Устанавливает контекстное меню для элемента.

### [dir](http://htmlbook.ru/html/attr/dir)

Задает  направление и отображение текста — слева направо или справа налево.

### [hidden](http://htmlbook.ru/html/attr/hidden)

Скрывает содержимое элемента от просмотра.

### [id](http://htmlbook.ru/html/attr/id)

Указывает имя стилевого идентификатора.

### [lang](http://htmlbook.ru/html/attr/lang)

Браузер использует значение параметра для правильного отображения некоторых национальных символов.

### [spellcheck](http://htmlbook.ru/html/attr/spellcheck)

Указывает браузеру проверять или нет правописание и грамматику в тексте.

### style

http://htmlbook.ru/html/attr/style

Применяется для определения стиля элемента с  помощью правил CSS.

Атрибут style применяется для определения стиля элемента с  помощью правил CSS. 

```html
style="правила описания стилей"
```

```html
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Атрибут style</title>
 </head> 
<body>

  <p><span style="color: red; font-size: 2em">L</span>orem ipsum dolor 
  sit amet, consectetuer adipiscing elit, sed diem nonummy nibh euismod tincidunt 
  ut lacreet dolore magna aliguam erat volutpat.</p>
  <p><span style="color: red; font-size: 2em">U</span>t wisis enim ad 
  minim veniam, quis nostrud exerci tution ullamcorper suscipit lobortis nisl 
  ut aliquip ex ea commodo consequat.</p>

 </body>
</html>
```

### Значения

В качестве значений указываются стилевые правила: вначале  следует имя  стилевого свойства, затем через двоеточие его значение. Стилевые   свойства разделяются между собой точкой с запятой. 

### [tabindex](http://htmlbook.ru/html/attr/tabindex)

Устанавливает порядок получения фокуса при переходе между элементами с помощью клавиши Tab.

### [title](http://htmlbook.ru/html/attr/title)

Описывает содержимое элемента в виде всплывающей подсказки.

### [xml:lang](http://htmlbook.ru/html/attr/xml-lang)

Этот атрибут по своему действию похож на lang, но применяется только в  XHTML-документах и указывает язык всего текста или его фрагмента. 

## События

### [onblur](http://htmlbook.ru/html/attr/onblur)

Потеря фокуса.

### [onchange](http://htmlbook.ru/html/attr/onchange)

Изменение значения элемента формы.

### [onclick](http://htmlbook.ru/html/attr/onclick)

Щелчок левой кнопкой мыши на элементе.

### [ondblclick](http://htmlbook.ru/html/attr/ondblclick)

Двойной щелчок левой кнопкой мыши на элементе.

### [onfocus](http://htmlbook.ru/html/attr/onfocus)

Получение фокуса

### [onkeydown](http://htmlbook.ru/html/attr/onkeydown)

Клавиша нажата, но не отпущена.

### [onkeypress](http://htmlbook.ru/html/attr/onkeypress)

Клавиша нажата и отпущена.

### [onkeyup](http://htmlbook.ru/html/attr/onkeyup)

Клавиша отпущена.

### [onload](http://htmlbook.ru/html/attr/onload)

Документ загружен.

### [onmousedown](http://htmlbook.ru/html/attr/onmousedown)

Нажата левая кнопка мыши.

### [onmousemove](http://htmlbook.ru/html/attr/onmousemove)

Перемещение курсора мыши.

### [onmouseout](http://htmlbook.ru/html/attr/onmouseout)

Курсор покидает элемент.

### [onmouseover](http://htmlbook.ru/html/attr/onmouseover)

Курсор наводится на элемент.

### [onmouseup](http://htmlbook.ru/html/attr/onmouseup)

Левая кнопка мыши отпущена.

### [onreset](http://htmlbook.ru/html/attr/onreset)

Форма очищена.

### [onselect](http://htmlbook.ru/html/attr/onselect)

Выделен текст в поле формы.

### [onsubmit](http://htmlbook.ru/html/attr/onsubmit)

Форма отправлена.

### [onunload](http://htmlbook.ru/html/attr/onunload)

Закрытие окна.