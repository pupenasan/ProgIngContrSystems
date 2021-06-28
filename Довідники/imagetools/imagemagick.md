# ImageMagick

http://www.imagemagick.org/script/command-line-processing.php

# Anatomy of the Command-line

Командний рядок ImageMagick це [інструменти](http://www.imagemagick.org/script/command-line-tools.php) які можуть бути такими простими:

- ```
  magick image.jpg image.png 
  ```

Або це може бути складним з безліччю [options](http://www.imagemagick.org/script/command-line-processing.php#option), як у наступному:

- ```
  magick label.gif +matte \
    \( +clone  -shade 110x90 -normalize -negate +clone  -compose Plus -composite \) \
    \( -clone 0 -shade 110x50 -normalize -channel BG -fx 0 +channel -matte \) \
    -delete 0 +swap  -compose Multiply -composite  button.gif");
  ```

Цей приклад команди досить довгий, щоб команда мала бути записана через кілька рядків, тому ми відформатували її для ясності, вставивши зворотні скісні риски (`\`). Зворотна коса риса є символом продовження рядка Linux. У оболонці Windows використовуйте символ карата (`^`) для продовження рядка. На цих веб-сторінках ми використовуємо стиль Linux, як зазначено вище. Однак іноді рядки обгортаються вашим браузером, якщо вікно браузера досить маленьке, але командні рядки, показані білим кольором, все-таки призначені для введення як один рядок. Символи продовження рядка вводити не потрібно. Дужки, які екрановані вище за допомогою зворотної косої риски, у Windows не екрановані. Існують деякі інші відмінності між Windows та Linux (зокрема, зокрема, із лапками), але деякі з цих питань ми обговоримо пізніше, коли вони виникнуть.

Не знаючи багато про командний рядок ImageMagick, ви, мабуть, можете припустити, що перша команда вище перетворює зображення у форматі JPEG на таке у форматі PNG. Однак дуже мало хто може усвідомити другу, більш складну команду, що дає плоскому двовимірному ярлику тривимірний вигляд із насиченими текстурами та імітованою глибиною:

  ![label](media/label.gif) ![==>](http://www.imagemagick.org/image/right.gif)     ![button](media/button.gif)

Тут ми показуємо відсоток виконання завдання як затінений циліндр:

  ![Shaded Cylinder](media/cylinder_shaded.png)

Враховуючи складність візуалізації, ви можете бути здивовані, що це відбувається за допомогою одного командного рядка:

- ```bash
  magick -size 320x90 canvas:none -stroke snow4 -size 1x90 -tile gradient:white-snow4 \
    -draw 'roundrectangle 16, 5, 304, 85 20,40' +tile -fill snow \
    -draw 'roundrectangle 264, 5, 304, 85  20,40' -tile gradient:chartreuse-green \
    -draw 'roundrectangle 16,  5, 180, 85  20,40' -tile gradient:chartreuse1-chartreuse3 \
    -draw 'roundrectangle 140, 5, 180, 85  20,40' +tile -fill none \
    -draw 'roundrectangle 264, 5, 304, 85 20,40' -strokewidth 2 \
    -draw 'roundrectangle 16, 5, 304, 85 20,40' \( +clone -background snow4 \
    -shadow 80x3+3+3 \) +swap -background none -layers merge \( +size -pointsize 90 \
    -strokewidth 1 -fill red label:'50 %' -trim +repage \( +clone -background firebrick3 \
    -shadow 80x3+3+3 \) +swap -background none -layers merge \) -insert 0 -gravity center \
    -append -background white -gravity center -extent 320x200 cylinder_shaded.png
  ```

У наступних розділах ми розбираємо анатомію командного рядка ImageMagick. Сподіваємось, після ретельного прочитання та кращого розуміння того, як працює командний рядок, ви зможете виконувати складні завдання з обробки зображень, не вдаючись до іноді лякаючих [program interfaces](http://www.imagemagick.org/script/develop.php).

Дивіться [Приклади використання ImageMagick](https://legacy.imagemagick.org/Usage/) для отримання додаткової допомоги при використанні ImageMagick з командного рядка.

## Анатомія командного рядку

Командний рядок ImageMagick складається з

1. одне або кілька обов’язкових імен вхідних файлів.
2. нуль, один або більше параметрів зображення.
3. нуль, один або більше операторів зображення.
4. нуль, один або більше операторів послідовності зображень.
5. нуль, один або більше стеків зображень.
6. нуль або одне ім'я файлу вихідного зображення (потрібно  [magick](http://www.imagemagick.org/script/magick.php), [convert](http://www.imagemagick.org/script/convert.php), [composite](http://www.imagemagick.org/script/composite.php), [montage](http://www.imagemagick.org/script/montage.php), [compare](http://www.imagemagick.org/script/compare.php), [import](http://www.imagemagick.org/script/import.php), [conjure](http://www.imagemagick.org/script/conjure.php)).

Ви можете знайти детальне пояснення кожної із складових частин командного рядка у наступних розділах.

## Input Filename

ImageMagick розширює концепцію імені вхідного файлу, включаючи:

- ім'я файлу globbing
- чіткий формат зображення
- використання вбудованих зображень та паттернів
- STDIN, STDOUT та дескриптори файлів
- вибір певних кадрів із зображення
- вибір області зображення
- примусовий розмір вбудованого зображення
- примушування вбудованого обрізання зображення
- за допомогою посилань на імена файлів

Ці розширення пояснюються в наступних кількох параграфах.

##### Filename Globbing

У оболонках Linux певні символи, такі як зірочка (`*`) та знак запитання (`?`) автоматично призводять до створення списків імен файлів на основі збігів шаблонів. Ця особливість відома як глобалізація (Globbing). ImageMagick підтримує глобалізацію імен файлів для систем, таких як Windows, які не підтримують його. Наприклад, припустимо, ви хочете конвертувати `1.jpg`,` 2.jpg`, `3.jpg`,` 4.jpg` і `5.jpg` у поточному каталозі у анімацію GIF. Ви можете зручно звернутися до всіх файлів JPEG за допомогою цієї команди:

- ```
  magick *.jpg images.gif
  ```

##### Explicit Image Format

Зображення зберігаються у безлічі форматів зображень, включаючи більш відомі JPEG, PNG, TIFF та інші. ImageMagick повинен знати формат зображення, перш ніж його можна буде прочитати та обробити. Більшість форматів мають підпис на зображенні, який однозначно ідентифікує формат. Якщо цього не вдається, ImageMagick використовує розширення імені файлу для визначення формату. Наприклад, `image.jpg` або ` image.JPG` повідомляє ImageMagick, що він читає зображення у форматі JPEG.

У деяких випадках зображення може не містити підпису та/або назву файлу не ідентифікує формат зображення. У цих випадках потрібно вказати явний формат зображення. Наприклад, припустимо, наше зображення має назву `image` і містить необроблені значення інтенсивності червоного, зеленого та синього кольорів. ImageMagick не має можливості автоматично визначити формат зображення, тому ми явно встановили його:

- ```
  magick -size 640x480 -depth 8 rgb:image image.png
  ```

##### Built-in Images and Patterns

ImageMagick має ряд вбудованих [зображень](http://www.imagemagick.org/script/formats.php#builtin-images) та [шаблонів](http://www.imagemagick.org/script/formats .php # вбудовані візерунки). Наприклад, щоб використовувати шаблон шашки, використовуйте:

- ```
  magick -size 640x480 pattern:checkerboard checkerboard.png
  ```

##### STDIN, STDOUT, and file descriptors

Linux та Windows дозволяють вихід однієї команди переводити на вхід іншої. ImageMagick дозволяє читати та записувати дані зображень із [стандартних потоків](http://en.wikipedia.org/wiki/Standard_streams) STDIN (стандартний вхід) та STDOUT (стандартний вихід), відповідно, використовуючи псевдо-ім'я файлу `-`. У цьому прикладі ми передаємо вихід [magick](http://www.imagemagick.org/script/magick.php) до [дисплея](http://www.imagemagick.org/script/display.php) програма:

- ```
  magick logo: gif:- | magick display gif:-
  ```

The second explicit format "`gif:`" is optional in the preceding example.  The GIF image format has a unique signature within the image so ImageMagick's [display](http://www.imagemagick.org/script/display.php) command can readily recognize the format as GIF.  The [magick](http://www.imagemagick.org/script/magick.php) program also accepts STDIN as input in this way:

Другий явний формат "` gif: `" є необов'язковим у попередньому прикладі. Формат зображення GIF має унікальний підпис в зображенні, тому команда  [display](http://www.imagemagick.org/script/display.php) ImageMagick може легко розпізнати формат як GIF. Програма  [magick](http://www.imagemagick.org/script/magick.php)  також приймає STDIN як вхідні дані таким чином:

- ```
  magick rose: gif:- | magick - -resize "200%" bigrose.jpg'
  ```

До інших каналів можна отримати доступ за допомогою дескрипторів файлів (станом на версію 6.4.9-3). Дескриптори файлів 0, 1 та 2 зарезервовані для стандартних потоків STDIN, STDOUT та STDERR відповідно, але до труби, пов'язаної з номером дескриптора файлу N> 2, можна отримати доступ за допомогою псевдоніма `fd:` N. (Псевдоніми `fd: 0` і` fd: 1` можна використовувати для STDIN і STDOUT.) Наступний приклад показує, як додати дані зображення, передані з файлів з дескрипторами 3 і 4, і направити результат до файлу з номером дескриптора 5.

- ```
  magick fd:3 fd:4 -append fd:5
  ```

За потреби можна вказати явні формати зображень, як уже згадувалося раніше, як і нижче.

- ```
  magick gif:fd:3 jpg:fd:4 -append tif:fd:5
  ```

##### Selecting Frames

Деякі формати зображень містять більше одного кадру зображення. Можливо, вам потрібне лише перше зображення, або останнє, або деяка кількість зображень посередині. Ви можете вказати, які кадри зображень читати, додаючи ім'я файлу зображення до діапазону кадрів, укладених у дужки. Тут наше зображення (анімований GIF) містить більше одного кадру, але ми хочемо лише перший:

- ```
  magick 'images.gif[0]' image.png
  ```

Linux shells generally interpret brackets so we  enclosed the filename in quotes above. In a Windows command shell the brackets are not interpreted but using  quotes doesn't hurt. However, in most cases the roles of single-quotes  and double-quotes are reversed with respect to Linux and Windows, so  Windows users should usually try double-quotes where we display  single-quotes, and vice versa.

You can read more than one image from a sequence with a frame range.  For example, you can extract the first four frames of an image  sequence:

- ```
  magick 'images.gif[0-3]' images.mng
  ```

The default is to step one frame at a time so frames 0, 1, 2, and 3 are returned.  Set the step to 2 with `-define frames:step=2` and we instead get frames 0 and 2.

Finally, you can read more than one image from a sequence,  out-of-order. The next command gets the third image in the sequence,  followed by the second, and then the fourth:

- ```
  magick 'images.gif[3,2,4]' images.mng
  ```

Notice that in the last two commands, a single image is written. The  output in this case, where the image type is MNG, is a multi-frame file  because the MNG format supports multiple frames. Had the output format  been JPG, which only supports single frames, the output would have  consisted of separate frames. More about that below, in the section  about the [Output Filename](http://www.imagemagick.org/script/command-line-processing.php#output).

##### Selecting an Image Region

Сирі зображення - це послідовність інтенсивності кольорів без додаткової метаінформації, такої як ширина, висота або підпис зображення. У необроблених форматах зображень потрібно вказати ширину та висоту зображення, але також можна вказати область зображення для читання. У нашому прикладі зображення має вихідний 8-бітовий формат RGB і має ширину 6000 пікселів і висоту 4000 пікселів. Однак нам потрібна область лише 600 на 400 поблизу центру зображення:

- ```
  magick -size 6000x4000 -depth 8 'rgb:image[600x400+1900+2900]' image.jpg
  ```

Ви можете отримати ті самі результати за допомогою опції [-extract](http://www.imagemagick.org/script/command-line-options.php#extract) :

- ```
  magick -size 6000x4000 -depth 8 -extract 600x400+1900+2900 rgb:image image.jpg
  ```

##### Inline Image Resize

Іноді зручно змінювати розмір зображення під час читання. Припустимо, у вас є сотні великих зображень JPEG, які ви хочете перетворити на послідовність значків PNG:

- ```
  magick '*.jpg' -resize 120x120 thumbnail%03d.png
  ```

Тут усі зображення читаються та згодом змінюються. Змінювати розмір кожного зображення під час читання швидше та менш ресурсомірно:

- ```
  magick '*.jpg[120x120]' thumbnail%03d.png
  ```

##### Inline Image Crop

Іноді зручно обрізати зображення під час читання. Припустимо, у вас є сотні великих зображень JPEG, які ви хочете перетворити на послідовність значків PNG:

- ```
  magick '*.jpg' -crop 120x120+10+5 thumbnail%03d.png
  ```

Тут усі зображення читаються і згодом обрізаються. Обрізати кожне зображення під час читання швидше та менш ресурсомістко:

- ```
  magick '*.jpg[120x120+10+5]' thumbnail%03d.png
  ```

##### Filename References

Існує два методи використання імені файлу для посилання на інші імена файлів зображень. Перший - з '`@`' , який читає імена файлів зображень, відокремлених пробілами від зазначеного файлу. Припустимо, файл `myimages.txt` складається зі списку імен файлів, приблизно так:

- ```
  frame001.jpg
  frame002.jpg
  frame003.jpg
  ```

Потім ми очікуємо цієї команди:

- ```
  magick @myimages.txt mymovie.gif
  ```

читати зображення `frame001.jpg`,` frame002.jpg` та `frame003.jpg` та перетворювати їх у послідовність зображень GIF.

Якщо шлях до зображення містить один або кілька пробілів, додайте шлях у лапки:

- ```
  'my title.jpg'
  ```

Деякі командні рядки [options](http://www.imagemagick.org/script/command-line-options.php)  ImageMagick можуть перевищувати можливості вашого процесора командного рядка. Наприклад, Windows обмежує командні рядки 8192 символами. Якщо, наприклад, у вас є варіант малювання з точками багатокутника, які перевищують обмеження довжини командного рядка, помістіть замість цього варіант у файл і посилайтеся на файл із символом `@` (наприклад, `@ mypoly.txt`).

Іншим методом посилання на інші файли зображень є вбудовування символу форматування в ім'я файлу з діапазоном сцен. Розгляньте ім'я файлу `image-% d.jpg [1-5]`. Команда

- ```
  magick image-%d.jpg[1-5]
  ```

змушує ImageMagick намагатися читати зображення з цими іменами файлів:

- ```
  image-1.jpg
  image-2.jpg
  image-3.jpg
  image-4.jpg
  image-5.jpg
  ```

##### Stream Buffering

За замовчуванням вхідний потік буферизується. Щоб інформація про вихідний файл або термінал зчитувалась, як тільки вона стане доступною, встановіть розмір буфера на 0:

- ```
  magick logo: gif:- | magick display -define stream:buffer-size=0 gif:-
  ```

## Command-line Options

You can direct the behavior of ImageMagick utilities with these command-line [options](http://www.imagemagick.org/script/command-line-options.php).  The behavior of an option falls into one of these categories:

- [Image Setting](http://www.imagemagick.org/script/command-line-processing.php#setting)
- [Image Operator](http://www.imagemagick.org/script/command-line-processing.php#operator)
- [Image Channel Operator](http://www.imagemagick.org/script/command-line-processing.php#channel)
- [Image Sequence Operator](http://www.imagemagick.org/script/command-line-processing.php#sequence)
- [Image Geometry](http://www.imagemagick.org/script/command-line-processing.php#geometry)
- [Image Stack](http://www.imagemagick.org/script/command-line-processing.php#stack)

##### Image Setting

An image setting persists as it appears on the command-line and may affect subsequent processing such as reading an image, an image operator, or when writing an image as appropriate.  An image setting stays in effect until it is reset or the command-line terminates.  The image settings include:

[-adjoin](http://www.imagemagick.org/script/command-line-options.php#adjoin)  • [-affine](http://www.imagemagick.org/script/command-line-options.php#affine)  • [-alpha](http://www.imagemagick.org/script/command-line-options.php#alpha)  • [-antialias](http://www.imagemagick.org/script/command-line-options.php#antialias)  • [-authenticate](http://www.imagemagick.org/script/command-line-options.php#authenticate)  • [-background](http://www.imagemagick.org/script/command-line-options.php#background)  • [-bias](http://www.imagemagick.org/script/command-line-options.php#bias)  • [-black-point-compensation](http://www.imagemagick.org/script/command-line-options.php#black-point-compensation)  • [-blue-primary](http://www.imagemagick.org/script/command-line-options.php#blue-primary)  • [-bordercolor](http://www.imagemagick.org/script/command-line-options.php#bordercolor)  • [-caption](http://www.imagemagick.org/script/command-line-options.php#caption)  • [-channel](http://www.imagemagick.org/script/command-line-options.php#channel)  • [-comment](http://www.imagemagick.org/script/command-line-options.php#comment)  • [-compress](http://www.imagemagick.org/script/command-line-options.php#compress)  • [-debug](http://www.imagemagick.org/script/command-line-options.php#debug)  • [-define](http://www.imagemagick.org/script/command-line-options.php#define)  • [-delay](http://www.imagemagick.org/script/command-line-options.php#delay)  • [-density](http://www.imagemagick.org/script/command-line-options.php#density)  • [-depth](http://www.imagemagick.org/script/command-line-options.php#depth)  • [-direction](http://www.imagemagick.org/script/command-line-options.php#direction)  • [-display](http://www.imagemagick.org/script/command-line-options.php#display)  • [-dispose](http://www.imagemagick.org/script/command-line-options.php#dispose)  • [-dither](http://www.imagemagick.org/script/command-line-options.php#dither)  • [-encoding](http://www.imagemagick.org/script/command-line-options.php#encoding)  • [-endian](http://www.imagemagick.org/script/command-line-options.php#endian)  • [-extract](http://www.imagemagick.org/script/command-line-options.php#extract)  • [-family](http://www.imagemagick.org/script/command-line-options.php#family)  • [-fill](http://www.imagemagick.org/script/command-line-options.php#fill)  • [-filter](http://www.imagemagick.org/script/command-line-options.php#filter)  • [-font](http://www.imagemagick.org/script/command-line-options.php#font)  • [-format](http://www.imagemagick.org/script/command-line-options.php#format)  • [-fuzz](http://www.imagemagick.org/script/command-line-options.php#fuzz)  • [-geometry](http://www.imagemagick.org/script/command-line-options.php#geometry)  • [-gravity](http://www.imagemagick.org/script/command-line-options.php#gravity)  • [-green-primary](http://www.imagemagick.org/script/command-line-options.php#green-primary)  • [-interlace](http://www.imagemagick.org/script/command-line-options.php#interlace)  • [-intent](http://www.imagemagick.org/script/command-line-options.php#intent)  • [-interpolate](http://www.imagemagick.org/script/command-line-options.php#interpolate)  • [-label](http://www.imagemagick.org/script/command-line-options.php#label)  • [-limit](http://www.imagemagick.org/script/command-line-options.php#limit)  • [-linewidth](http://www.imagemagick.org/script/command-line-options.php#linewidth)  • [-log](http://www.imagemagick.org/script/command-line-options.php#log)  • [-loop](http://www.imagemagick.org/script/command-line-options.php#loop)  • [-mattecolor](http://www.imagemagick.org/script/command-line-options.php#mattecolor)  • [-monitor](http://www.imagemagick.org/script/command-line-options.php#monitor)  • [-orient](http://www.imagemagick.org/script/command-line-options.php#orient)  • [-page](http://www.imagemagick.org/script/command-line-options.php#page)  • [-pointsize](http://www.imagemagick.org/script/command-line-options.php#pointsize)  • [-preview](http://www.imagemagick.org/script/command-line-options.php#preview)  • [-quality](http://www.imagemagick.org/script/command-line-options.php#quality)  • [-quiet](http://www.imagemagick.org/script/command-line-options.php#quiet)  • [-read-mask](http://www.imagemagick.org/script/command-line-options.php#read-mask)  • [-red-primary](http://www.imagemagick.org/script/command-line-options.php#red-primary)  • [-region](http://www.imagemagick.org/script/command-line-options.php#region)  • [-render](http://www.imagemagick.org/script/command-line-options.php#render)  • [-repage](http://www.imagemagick.org/script/command-line-options.php#repage)  • [-sampling-factor](http://www.imagemagick.org/script/command-line-options.php#sampling-factor)  • [-scene](http://www.imagemagick.org/script/command-line-options.php#scene)  • [-seed](http://www.imagemagick.org/script/command-line-options.php#seed)  • [-size](http://www.imagemagick.org/script/command-line-options.php#size)  • [-stretch](http://www.imagemagick.org/script/command-line-options.php#stretch)  • [-stroke](http://www.imagemagick.org/script/command-line-options.php#stroke)  • [-strokewidth](http://www.imagemagick.org/script/command-line-options.php#strokewidth)  • [-style](http://www.imagemagick.org/script/command-line-options.php#style)  • [-texture](http://www.imagemagick.org/script/command-line-options.php#texture)  • [-tile](http://www.imagemagick.org/script/command-line-options.php#tile)  • [-transparent-color](http://www.imagemagick.org/script/command-line-options.php#transparent-color)  • [-treedepth](http://www.imagemagick.org/script/command-line-options.php#treedepth)  • [-type](http://www.imagemagick.org/script/command-line-options.php#type)  • [-undercolor](http://www.imagemagick.org/script/command-line-options.php#undercolor)  • [-units](http://www.imagemagick.org/script/command-line-options.php#units)  • [-verbose](http://www.imagemagick.org/script/command-line-options.php#verbose)  • [-virtual-pixel](http://www.imagemagick.org/script/command-line-options.php#virtual-pixel)  • [-weight](http://www.imagemagick.org/script/command-line-options.php#weight)  • [-write-mask](http://www.imagemagick.org/script/command-line-options.php#write-mask) 

In this example, -channel applies to each of the images, since, as we mentioned, settings persist:

- ```
  magick -channel RGB wand.png wizard.png images.png
  ```

###### -size width \[xheight][+offset]

http://www.imagemagick.org/script/command-line-options.php#size

Встановіть ширину та висоту зображення.

Використовуйте цей параметр, щоб вказати ширину та висоту вхідних зображень (raw images), розміри яких невідомі, наприклад `GRAY`,` RGB` або `CMYK`. На додаток до ширини та висоти, використовуйте [-size](http://www.imagemagick.org/script/command-line-options.php#size) зі зміщенням, щоб пропустити будь-яку інформацію заголовка на зображенні або вказати номер кольорів у файлі зображення `MAP` (наприклад, -розмір 640x512 + 256).

Для зображень із CD виберіть один із таких розмірів:

- ```
  192x128
  384x256
  768x512
  1536x1024
  3072x2048
  ```

###### -extract geometry

http://www.imagemagick.org/script/command-line-options.php#extract

Витягніть із зображення вказану область.

Цей параметр є найбільш корисним для вилучення субрегіону дуже великого вихідного зображення. Зверніть увагу, що ці дві команди еквівалентні:

- ```
  magick -size 16000x16000 -depth 8 -extract 640x480+1280+960 \
    image.rgb image.png",
  convert -size 16000x16000 -depth 8 'image.rgb[640x480+1280+960]' \
    image.rgb image.png"
  ```

Якщо ви опустите зміщення, як у

- ```
  magick -size 16000x16000 -depth 8 -extract 640x480 \
    image.rgb image.png
  ```

зображення замість цього змінюється до вказаних розмірів, еквівалентних:

- ```
  magick -size 16000x16000 -depth 8 -resize 640x480 image.rgb image.png
  ```

See [Image Geometry](http://www.imagemagick.org/script/command-line-processing.php#geometry) for complete details about the *geometry* argument.

###### -depth value

http://www.imagemagick.org/script/command-line-options.php#depth

Глибина зображення.

Це кількість бітів у зразку кольору в межах пікселя. Використовуйте цей параметр, щоб вказати глибину вихідних зображень, глибина яких невідома, таких як СІРИЙ, RGB або CMYK, або змінити глибину будь-якого зображення після його прочитання.

Використовуйте [+depth](http://www.imagemagick.org/script/command-line-options.php#depth), щоб повернути глибину до значення за замовчуванням.

##### Image Operator

An image operator differs from a setting in that it affects the image immediately as it appears on the command-line.  An operator is any command-line [option](http://www.imagemagick.org/script/command-line-options.php) not listed as a [image setting](http://www.imagemagick.org/script/command-line-processing.php#setting) or [image sequence operator](http://www.imagemagick.org/script/command-line-processing.php#sequence).  Unlike an image setting, which persists until the command-line terminates, an operator is applied to the current image set and forgotten.  The image operators include:

[-annotate](http://www.imagemagick.org/script/command-line-options.php#annotate)  • [-black-threshold](http://www.imagemagick.org/script/command-line-options.php#black-threshold)  • [-blur](http://www.imagemagick.org/script/command-line-options.php#blur)  • [-border](http://www.imagemagick.org/script/command-line-options.php#border)  • [-charcoal](http://www.imagemagick.org/script/command-line-options.php#charcoal)  • [-chop](http://www.imagemagick.org/script/command-line-options.php#chop)  • [-clip](http://www.imagemagick.org/script/command-line-options.php#clip)  • [-clip-path](http://www.imagemagick.org/script/command-line-options.php#clip-path)  • [-clip-mask](http://www.imagemagick.org/script/command-line-options.php#clip-mask)  • [-colors](http://www.imagemagick.org/script/command-line-options.php#colors)  • [-colorize](http://www.imagemagick.org/script/command-line-options.php#colorize)  • [-colorspace](http://www.imagemagick.org/script/command-line-options.php#colorspace)  • [-color-threshold](http://www.imagemagick.org/script/command-line-options.php#color-threshold)  • [-compose](http://www.imagemagick.org/script/command-line-options.php#compose)  • [-contrast](http://www.imagemagick.org/script/command-line-options.php#contrast)  • [-convolve](http://www.imagemagick.org/script/command-line-options.php#convolve)  • [-crop](http://www.imagemagick.org/script/command-line-options.php#crop)  • [-cycle](http://www.imagemagick.org/script/command-line-options.php#cycle)  • [-despeckle](http://www.imagemagick.org/script/command-line-options.php#despeckle)  • [-draw](http://www.imagemagick.org/script/command-line-options.php#draw)  • [-edge](http://www.imagemagick.org/script/command-line-options.php#edge)  • [-emboss](http://www.imagemagick.org/script/command-line-options.php#emboss)  • [-enhance](http://www.imagemagick.org/script/command-line-options.php#enhance)  • [-equalize](http://www.imagemagick.org/script/command-line-options.php#equalize)  • [-evaluate](http://www.imagemagick.org/script/command-line-options.php#evaluate)  • [-extent](http://www.imagemagick.org/script/command-line-options.php#extent)  • [-flip](http://www.imagemagick.org/script/command-line-options.php#flip)  • [-flop](http://www.imagemagick.org/script/command-line-options.php#flop)  • [-floodfill](http://www.imagemagick.org/script/command-line-options.php#floodfill)  • [-frame](http://www.imagemagick.org/script/command-line-options.php#frame)  • [-gamma](http://www.imagemagick.org/script/command-line-options.php#gamma)  • [-gaussian-blur](http://www.imagemagick.org/script/command-line-options.php#gaussian-blur)  • [-grayscale](http://www.imagemagick.org/script/command-line-options.php#grayscale)  • [-implode](http://www.imagemagick.org/script/command-line-options.php#implode)  • [-kmeans](http://www.imagemagick.org/script/command-line-options.php#kmeans)  • [-lat](http://www.imagemagick.org/script/command-line-options.php#lat)  • [-level](http://www.imagemagick.org/script/command-line-options.php#level)  • [-map](http://www.imagemagick.org/script/command-line-options.php#map)  • [-median](http://www.imagemagick.org/script/command-line-options.php#median)  • [-modulate](http://www.imagemagick.org/script/command-line-options.php#modulate)  • [-monochrome](http://www.imagemagick.org/script/command-line-options.php#monochrome)  • [-negate](http://www.imagemagick.org/script/command-line-options.php#negate)  • [-noise](http://www.imagemagick.org/script/command-line-options.php#noise)  • [-normalize](http://www.imagemagick.org/script/command-line-options.php#normalize)  • [-opaque](http://www.imagemagick.org/script/command-line-options.php#opaque)  • [-ordered-dither](http://www.imagemagick.org/script/command-line-options.php#ordered-dither)  • [-paint](http://www.imagemagick.org/script/command-line-options.php#paint)  • [-posterize](http://www.imagemagick.org/script/command-line-options.php#posterize)  • [-raise](http://www.imagemagick.org/script/command-line-options.php#raise)  • [-profile](http://www.imagemagick.org/script/command-line-options.php#profile)  • [-radial-blur](http://www.imagemagick.org/script/command-line-options.php#radial-blur)  • [-raise](http://www.imagemagick.org/script/command-line-options.php#raise)  • [-random-threshold](http://www.imagemagick.org/script/command-line-options.php#random-threshold)  • [-resample](http://www.imagemagick.org/script/command-line-options.php#resample)  • [-resize](http://www.imagemagick.org/script/command-line-options.php#resize)  • [-roll](http://www.imagemagick.org/script/command-line-options.php#roll)  • [-rotate](http://www.imagemagick.org/script/command-line-options.php#rotate)  • [-sample](http://www.imagemagick.org/script/command-line-options.php#sample)  • [-scale](http://www.imagemagick.org/script/command-line-options.php#scale)  • [-sepia-tone](http://www.imagemagick.org/script/command-line-options.php#sepia-tone)  • [-segment](http://www.imagemagick.org/script/command-line-options.php#segment)  • [-shade](http://www.imagemagick.org/script/command-line-options.php#shade)  • [-shadow](http://www.imagemagick.org/script/command-line-options.php#shadow)  • [-sharpen](http://www.imagemagick.org/script/command-line-options.php#sharpen)  • [-shave](http://www.imagemagick.org/script/command-line-options.php#shave)  • [-shear](http://www.imagemagick.org/script/command-line-options.php#shear)  • [-sigmoidal-contrast](http://www.imagemagick.org/script/command-line-options.php#sigmoidal-contrast)  • [-solarize](http://www.imagemagick.org/script/command-line-options.php#solarize)  • [-splice](http://www.imagemagick.org/script/command-line-options.php#splice)  • [-spread](http://www.imagemagick.org/script/command-line-options.php#spread)  • [-strip](http://www.imagemagick.org/script/command-line-options.php#strip)  • [-swirl](http://www.imagemagick.org/script/command-line-options.php#swirl)  • [-threshold](http://www.imagemagick.org/script/command-line-options.php#threshold)  • [-transparent](http://www.imagemagick.org/script/command-line-options.php#transparent)  • [-thumbnail](http://www.imagemagick.org/script/command-line-options.php#thumbnail)  • [-tint](http://www.imagemagick.org/script/command-line-options.php#tint)  • [-transform](http://www.imagemagick.org/script/command-line-options.php#transform)  • [-trim](http://www.imagemagick.org/script/command-line-options.php#trim)  • [-unsharp](http://www.imagemagick.org/script/command-line-options.php#unsharp)  • [-version](http://www.imagemagick.org/script/command-line-options.php#version)  • [-wave](http://www.imagemagick.org/script/command-line-options.php#wave)  • [-white-balance](http://www.imagemagick.org/script/command-line-options.php#white-balance)  • [-white-point](http://www.imagemagick.org/script/command-line-options.php#white-point)  • [-white-threshold](http://www.imagemagick.org/script/command-line-options.php#white-threshold) 

In this example, -negate negates the wand image but not the wizard:

- ```
  magick wand.png -negate wizard.png images.png
  ```

Note that an image operator will be applied to each images in an image sequence. For example, if you use [-resize](http://www.imagemagick.org/script/command-line-options.php#resize) option to resize a GIF image, each frames will be resized to the given size. However, some frames may be smaller than the whole image and resizing all the frames into the same size may result in an unexpected output. In such a case, [-coalesce](http://www.imagemagick.org/script/command-line-options.php#coalesce) should be used to prepare those frames.

##### Image Channel Operator

Operate directly on image channels:

[-channel-fx](http://www.imagemagick.org/script/command-line-options.php#channel-fx)  • [-separate](http://www.imagemagick.org/script/command-line-options.php#separate) 

##### Image Sequence Operator

An image sequence operator differs from a setting in that it affects an image sequence immediately as it appears on the command-line.  Choose from these image sequence operators:

[-append](http://www.imagemagick.org/script/command-line-options.php#append)  • [-affinity](http://www.imagemagick.org/script/command-line-options.php#affinity)  • [-average](http://www.imagemagick.org/script/command-line-options.php#average)  • [-clut](http://www.imagemagick.org/script/command-line-options.php#clut)  • [-coalesce](http://www.imagemagick.org/script/command-line-options.php#coalesce)  • [-combine](http://www.imagemagick.org/script/command-line-options.php#combine)  • [-compare](http://www.imagemagick.org/script/command-line-options.php#compare)  • [-complex](http://www.imagemagick.org/script/command-line-options.php#complex)  • [-composite](http://www.imagemagick.org/script/command-line-options.php#composite)  • [-copy](http://www.imagemagick.org/script/command-line-options.php#copy)  • [-crop](http://www.imagemagick.org/script/command-line-options.php#crop)  • [-debug](http://www.imagemagick.org/script/command-line-options.php#debug)  • [-deconstruct](http://www.imagemagick.org/script/command-line-options.php#deconstruct)  • [-delete](http://www.imagemagick.org/script/command-line-options.php#delete)  • [-evaluate-sequence](http://www.imagemagick.org/script/command-line-options.php#evaluate-sequence)  • [-fft](http://www.imagemagick.org/script/command-line-options.php#fft)  • [-flatten](http://www.imagemagick.org/script/command-line-options.php#flatten)  • [-fx](http://www.imagemagick.org/script/command-line-options.php#fx)  • [-hald-clut](http://www.imagemagick.org/script/command-line-options.php#hald-clut)  • [-ift](http://www.imagemagick.org/script/command-line-options.php#ift)  • [-identify](http://www.imagemagick.org/script/command-line-options.php#identify)  • [-insert](http://www.imagemagick.org/script/command-line-options.php#insert)  • [-layers](http://www.imagemagick.org/script/command-line-options.php#layers)  • [-limit](http://www.imagemagick.org/script/command-line-options.php#limit)  • [-map](http://www.imagemagick.org/script/command-line-options.php#map)  • [-maximum](http://www.imagemagick.org/script/command-line-options.php#maximum)  • [-minimum](http://www.imagemagick.org/script/command-line-options.php#minimum)  • [-morph](http://www.imagemagick.org/script/command-line-options.php#morph)  • [-mosaic](http://www.imagemagick.org/script/command-line-options.php#mosaic)  • [-optimize](http://www.imagemagick.org/script/command-line-options.php#optimize)  • [-print](http://www.imagemagick.org/script/command-line-options.php#print)  • [-process](http://www.imagemagick.org/script/command-line-options.php#process)  • [-quiet](http://www.imagemagick.org/script/command-line-options.php#quiet)  • [-swap](http://www.imagemagick.org/script/command-line-options.php#swap)  • [-write](http://www.imagemagick.org/script/command-line-options.php#write) 

In this example, -append appends three images into one:

- ```
  magick mikayla.png picnic.png beach.png -append vacation.png
  ```

##### Image Geometry

Багато [options](http://www.imagemagick.org/script/command-line-options.php)  командних рядків беруть аргумент геометрії, щоб вказати такі речі, як бажана ширина та висота зображення та інші розмірні величини. Оскільки користувачі хочуть так багато варіацій отриманих ромірностей, розмірів та положень зображень (і оскільки ImageMagick хоче їх надати), аргумент геометрії може приймати різні форми. Ми описуємо багато з них у цьому розділі.

Параметри зображення та параметри, які приймають певну форму аргументу геометрії, включають наступне. Майте на увазі, що деякі з них аналізують свої аргументи дещо інакше. Детальніше див. У документації до окремого варіанту або налаштування.

[-adaptive-resize](http://www.imagemagick.org/script/command-line-options.php#adaptive-resize)  • [-border](http://www.imagemagick.org/script/command-line-options.php#border)  • [-borderwidth](http://www.imagemagick.org/script/command-line-options.php#borderwidth)  • [-chop](http://www.imagemagick.org/script/command-line-options.php#chop)  • [-crop](http://www.imagemagick.org/script/command-line-options.php#crop)  • [-density](http://www.imagemagick.org/script/command-line-options.php#density)  • [-extent](http://www.imagemagick.org/script/command-line-options.php#extent)  • [-extract](http://www.imagemagick.org/script/command-line-options.php#extract)  • [-frame](http://www.imagemagick.org/script/command-line-options.php#frame)  • [-geometry](http://www.imagemagick.org/script/command-line-options.php#geometry)  • [-iconGeometry](http://www.imagemagick.org/script/command-line-options.php#iconGeometry)  • [-liquid-rescale](http://www.imagemagick.org/script/command-line-options.php#liquid-rescale)  • [-page](http://www.imagemagick.org/script/command-line-options.php#page)  • [-region](http://www.imagemagick.org/script/command-line-options.php#region)  • [-repage](http://www.imagemagick.org/script/command-line-options.php#repage)  • [-resize](http://www.imagemagick.org/script/command-line-options.php#resize)  • [-sample](http://www.imagemagick.org/script/command-line-options.php#sample)  • [-scale](http://www.imagemagick.org/script/command-line-options.php#scale)  • [-shave](http://www.imagemagick.org/script/command-line-options.php#shave)  • [-splice](http://www.imagemagick.org/script/command-line-options.php#splice)  • [-thumbnail](http://www.imagemagick.org/script/command-line-options.php#thumbnail)  • [-window](http://www.imagemagick.org/script/command-line-options.php#window) 

Аргумент геометрії може мати будь-яку з форм, перелічених у таблиці нижче. Вони будуть описані більш докладно в підрозділах наступної таблиці. Звичайна форма - size[offset], тобто size необхідний, а offset- необов’язковий. Іноді можливе [size]offset. Ні в якому разі не допускаються пробіли в аргументі геометрії.

|       size        | General description (actual behavior can vary for different options and settings) |
| :---------------: | ------------------------------------------------------------ |
|      scale%       | Висота та ширина масштабуються на вказаний відсоток.         |
| scale-x%xscale-y% | Height and width individually scaled by specified percentages. (Only one % symbol needed.) |
|       width       | Width given, height automagically selected to preserve aspect ratio. |
|      xheight      | Height given, width automagically selected to preserve aspect ratio. |
|   widthxheight    | Maximum values of height and width given, aspect ratio preserved. |
|   widthxheight^   | Minimum values of width and height given, aspect ratio preserved. |
|   widthxheight!   | Width and height emphatically given, original aspect ratio ignored. |
|   widthxheight>   | Shrinks an image with dimension(s) **larger** than the corresponding width and/or height argument(s). |
|   widthxheight<   | Enlarges an image with dimension(s) **smaller** than the corresponding width and/or height argument(s). |
|       area@       | Resize image to have specified area in pixels. Aspect ratio is preserved. |
|        x:y        | Here x and y denotes an aspect ratio (e.g. 3:2 = 1.5).       |
|  {size}{offset}   | Specifying the offset (default is `+0+0`). Below, {size} refers to any of the forms above. |
| {size}{+-}x{+-}y  | Horizontal and vertical offsets x and y, specified in pixels. Signs are required for both. Offsets are affected by [-gravity](http://www.imagemagick.org/script/command-line-options.php#gravity) setting. Offsets are not affected by `%` or other size operators. Note that positive X and Y offsets are in the inward direction towards the center of the image for all [-gravity](http://www.imagemagick.org/script/command-line-options.php#gravity) options, except 'center'. For East, +X is left. For South, +Y is up.  For SouthEast, +X is left and +Y is up. For center, the normal X and Y  directional convention is used (+X is right and +Y is down). |

###### Basic adjustments to width and height; the operators `%`, `^`, and `!` 

Тут, трохи нижче, є кілька простих прикладів геометрії, що показують, як її можна використовувати як аргумент для [-resize](http://www.imagemagick.org/script/command-line-options.php#resize) option. Ми використаємо внутрішнє зображення `logo:` для вхідного зображення. Це чудове зображення має 640 пікселів у ширину та 480 пікселів у висоту. Ми говоримо, що його розміри становлять 640x480. Коли ми даємо розміри зображення, ширина (горизонтальний розмір) завжди передує висоті (вертикальний розмір). Це буде вірно, коли ми говоримо про координати або зміщення зображення, яке завжди матиме значення x –, за яким слід y. Подумайте лише про свої класи алгебри у середній школі та про площину xy. (Ну, майже: наша вісь y завжди буде рухатися вниз!)

- ```
  magick logo: -resize '200%' bigWiz.png
  magick logo: -resize '200x50%' longShortWiz.png
  magick logo: -resize '100x200' notThinWiz.png
  magick logo: -resize '100x200^' biggerNotThinWiz.png
  magick logo: -resize '100x200!' dochThinWiz.png
  ```

Перша з чотирьох команд проста - вона розширює як ширину, так і висоту вхідного зображення на `200%` у кожному напрямку; це збільшує все це в два рази. Друга команда визначає різні відсотки для кожного напрямку, розтягуючи ширину до `200`% і стискаючи висоту до` 50% `. Отримане зображення (у цьому прикладі) має розміри 1280x240. Зверніть увагу, що символ відсотків не потрібно повторювати; наступні еквіваленти: `200x50%`, `200% x50`,` 200% x50% `.

By default, the width and height given in a geometry argument are maximum values unless a percentage is specified. That is, the image is expanded or contracted to fit the specified width and height value while  maintaining the aspect ratio (the ratio of its height to its width) of the image. For instance, the third command above "tries" to set the dimensions to `100x200`. Imagine gradually shrinking the original image (which is 640x480),  keeping is aspect ratio constant, until it just fits into a 100x200  rectangle. Since the image is longer than it is tall, it will fit when  its width shrinks to 100 pixels. To preserve the aspect ratio, the  height will therefore have to be (480/640)×100 pixels=75 pixels, so the  final dimensions will be 100x75.

 Notice that in the previous example, at least one of the specified  dimensions will be attained (in this case, the width, 100 pixels). The  resulting image fits snugly within the original. One can do just the  opposite of this by invoking the `^` operator, as in the fourth example above. In that case, when `100x200^` is given as the argument, again at least one of the dimensions will be  attained, but in this case the resulting image can snugly contain the  original. Here the geometry argument gives minimum values. In our example, the height will become 200 and the width will  be scaled to preserve the aspect ratio, becoming (640/480)×200  pixels=267 pixels. With the `^` operator, one of those  dimensions will match the requested size, but the image will likely  overflow the dimensions requested to preserve its aspect ratio. (The `^` feature is new as of IM 6.3.8-2.)

We see that ImageMagick is very good about preserving aspect ratios  of images, to prevent distortion of your favorite photos and images. But you might really want the dimensions to be `100x200`,  thereby stretching the image. In this case just tell ImageMagick you  really mean it (!) by appending an exclamation operator to the geometry. This will force the image size to exactly what you specify. So, for  example, if you specify `100x200!` the dimensions will become exactly 100x200 (giving a small, vertically elongated wizard).

###### Bounding the width, height, and area; the operators `>`, `<`, and `@` 

Here are a few more examples:

- ```
  magick logo: -resize '100' wiz1.png
  magick logo: -resize 'x200' wiz2.png
  magick logo: -resize '100x200>' wiz3.png
  magick logo: -resize '100x200<' wiz4.png
  ```

If only one dimension is given it is taken to be the width. When only the width is specified, as in the first example above, the width is  accepted as given and the height is chosen to maintain the aspect ratio  of the input image. Similarly, if only the height is specified, as in  the second example above, the height is accepted and the width is chosen to maintain the aspect ratio.

Use `>` to shrink an image only if its dimension(s) are **larger** than the corresponding width and/or height arguments. Use `<` to enlarge an image only if its dimension(s) are **smaller** than the corresponding width and/or height arguments.  In either case, if a change is made, the result is as if the `>` or `<` operator was not present. So, in the third example above, we specified `100x200>` and the original image size is 640x480, so the image size is reduced as if we had specified `100x200`. However, in the fourth example above, there will be no change to its size.

Finally, use `@` to specify the maximum area in pixels of  an image, again while attempting to preserve aspect ratio. (Pixels take  only integer values, so some approximation is always at work.) In the  following example, an area of 10000 pixels is requested. The resulting  file has dimensions 115x86, which has 9890 pixels. 

- ```
  magick logo: -resize '10000@' wiz10000.png
  ```

In all the examples above and below, we have enclosed the geometry arguments  within quotation marks. Doing so is optional in many cases, but not always. We must enclose the geometry specifications in quotation marks when using `<` or `>` to prevent these characters from being interpreted by the shell as file redirection. On Windows systems, the carat `^`  needs to be within quotes, else it is ignored. To be safe, one should probably maintain a habit of enclosing all geometry arguments in quotes, as we have here.

###### Offsets in geometry

Ось кілька прикладів, що ілюструють використання зсувів у аргументах геометрії. Типовим використанням компенсацій є паралельно з опцією [-region](http://www.imagemagick.org/script/command-line-options.php#region). Цей параметр дозволяє багатьом іншим параметрам змінювати пікселі в межах вказаного прямокутного субрегіону зображення. Таким чином, йому потрібно надати ширину та висоту цієї області, а також зміщення в зображенні, яке являє собою пару координат, що вказують розташування області в межах більшого зображення. Нижче, у першому прикладі, ми вказуємо область розміром `100x200`, яка повинна бути розташована за координатами xy – x = 10, y = 20. Для зручності скористаємось звичайними алгебраїчними позначеннями (x, y) = (10,20).

- ```
  magick logo: -region '100x200+10+20' -negate wizNeg1.png
  magick logo: -region '100x200-10+20' -negate wizNeg2.png
  magick logo: -gravity center -region '100x200-10+20' -negate wizNeg3.png
  ```

Зверніть увагу, що для зсувів завжди потрібні знаки +/−. Зсув насправді не є справжнім місцем на зображенні; його координати потрібно додати до іншого місця. Позначимо це як поточне місцезнаходження. У перших двох прикладах вище, однак, це місце - лівий верхній кут зображення, який має координати (0,0). (Це ситуація за замовчуванням, коли немає інших вказівок для її зміни.) Перший приклад вище ставить власний верхній лівий кут прямокутника `100x200` на (10,20).

Негативний зсув може мати сенс у багатьох випадках. У другому прикладі вище, зміщення дорівнює (-10,20), зазначеному `-10 + 20`. У такому випадку можна заперечити лише ту частину (віртуального) прямокутника, яка лежить всередині зображення; тут це еквівалентно зазначенню геометрії як `90x200 + 0 + 20`.

У третьому прикладі вище параметр [-gravity](http://www.imagemagick.org/script/command-line-options.php#gravity) передує іншим і встановлює поточне місце розташування на зображенні в самому центрі зображення. У цьому випадку це піксель (320 240), оскільки розмір зображення становить 640x480. Це означає, що зміщення застосовуються до того місця, яке таким чином переміщується, в даному випадку до (320-10 240 + 20) = (310 260). Але на область «100x200» впливає параметр [-gravity](http://www.imagemagick.org/script/command-line-options.php#gravity), тому замість того, щоб впливати на її верхній лівий кут, визначається власний центр регіону (на (+ 50, + 100) усередині нього). Тому центр прямокутника `100x200` переміщується до (310260). Верхній лівий кут запереченого прямокутника тепер дорівнює (310-50,260-100) = (260,160).

##### Image Stack

In school, your teacher probably permitted you to work on problems on a scrap of paper and then copy the results to your test paper.  An  image stack is similar.  It permits you to work on an image or image  sequence in isolation and subsequently introduce the results back into  the command-line.  The image stack is delineated with parenthesis.   Image operators only affect images in the current stack.  For example,  we can limit the image rotation to just the wizard image like this:

- ```
  magick wand.gif \( wizard.gif -rotate 30 \) +append images.gif
  ```

Notice again that the  parentheses are escaped by preceding them with backslashes.  This is required under Linux, where parentheses are special shell characters.  The backslash tells the shell not to interpret these characters, but to pass them directly to the command being executed. Do not escape the parentheses under Windows. Each parenthesis (or escaped parenthesis) must have spaces on either side, as in the example shown above.

In addition to the image operators already discussed, the following  image operators are most useful when processing images in an image  stack:

[-clone](http://www.imagemagick.org/script/command-line-options.php#clone)  • [-delete](http://www.imagemagick.org/script/command-line-options.php#delete)  • [-insert](http://www.imagemagick.org/script/command-line-options.php#insert)  • [-swap](http://www.imagemagick.org/script/command-line-options.php#swap) 

The arguments to these operators are indexes into the image sequence  by number, starting with zero, for the first image, and so on. However  if you give a negative index, the images are indexed from the end (last  image added). That is, an index of -1 is the last image in the current  image sequence, -2 gives the second-to-last, and so on.

## Output Filename

ImageMagick розширює концепцію імені вихідного файлу, включаючи:

1. чіткий формат зображення
2. написати в стандартний вихід
3. посилання на імена файлів

Кожне з цих розширень пояснюється у кількох наступних параграфах.

##### Explicit Image Format

Зображення можуть зберігатися у безлічі форматів зображень, включаючи більш відомі JPEG, PNG, TIFF та інші. ImageMagick повинен знати бажаний формат зображення, перш ніж воно буде записане. ImageMagick використовує розширення імені файлу для визначення формату. Наприклад, `image.jpg` повідомляє ImageMagick написати зображення у форматі JPEG. У деяких випадках ім'я файлу не ідентифікує формат зображення. У цих випадках зображення записується у тому форматі, в якому воно було прочитане спочатку, якщо не вказано явний формат зображення. Наприклад, припустимо, що ми хочемо записати своє зображення в ім'я файлу `image` у необробленому форматі інтенсивності червоного, зеленого та синього:

- ```
  magick image.jpg rgb:image
  ```

##### Standard Out

Linux permits the output of one command to be piped to another.   ImageMagick permits piping one command to another with a filename of `-`.  In this example we pipe the output of [magick](http://www.imagemagick.org/script/magick.php) to the [display](http://www.imagemagick.org/script/display.php) program:  

- ```
  magick logo: gif:- | magick display gif:-
  ```

Here the explicit format is optional.  The GIF image format has a  signature that uniquely identifies it so ImageMagick can readily  recognize the format as GIF.

##### Filename References

Optionally, use an embedded formatting character to write a sequential image list.  Suppose our output filename is `image-%d.jpg` and our image list includes 3 images.  You can expect these images files to be written:

- ```
  image-0.jpg
  image-1.jpg
  image-2.jpg
  ```

Or retrieve image properties to modify the image filename.  For example, the command

- ```
  magick rose: -set filename:area '%wx%h' 'rose-%[filename:area].png'
  ```

writes an image with this filename:

- ```
  rose-70x46.png
  ```

Finally to convert multiple JPEG images to individual PDF pages, use:

- ```
  magick *.jpg +adjoin page-%d.pdf
  ```

Use `-define filename:literal=true` to bypass interpretting embedded formatting characters and instead use the filename literally.

##### Stream Buffering

By default, the output stream is buffered.  To ensure information  appears on the destination file or terminal as soon as written, set the  buffer size to 0:

- ```
  magick -define stream:buffer-size=0 logo: gif:- | magick display gif:-
  ```

