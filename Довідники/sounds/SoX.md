# SoX

https://sox.sourceforge.net/Docs/Documentation

https://sox.sourceforge.net/sox.html

https://sox.sourceforge.net/sox.pdf

SoX − Sound eXchange, швейцарський армійський ніж для аудіоманіпуляції

## Встановлення

https://sourceforge.net/projects/sox/files/sox/14.4.1/

```
sudo apt-get install sox
```

## Синтаксис виклику

Загальна команда:

```
sox [global-options] [format-options] infile1
		[[format-options] infile2] ... [format-options] outfile
		[effect [effect-options]] ...
```



Відправити файл на звуковий пристрій:

```
play [global-options] [format-options] infile1
	[[format-options] infile2] ... [format-options]
	[effect [effect-options]] ...
```

Запис з аудіовходу:

```
rec [global-options] [format-options] outfile
	[effect [effect-options]] ...
```

## Вступ

SoX читає та записує аудіофайли в найпопулярніших форматах і за бажанням може застосовувати до них ефекти. Він може поєднувати кілька джерел вхідного сигналу, синтезувати аудіо та, у багатьох системах, діяти як аудіопрогравач загального призначення або багатодоріжковий аудіозаписувач. Він також має обмежену можливість розділити вхідні дані на кілька вихідних файлів.

Усі функції SoX доступні лише за допомогою команди **sox**. Щоб спростити відтворення та запис аудіо, якщо SoX викликається як **play**, звуковим пристроєм за замовчуванням автоматично встановлюється вихідний файл, а якщо викликається як **rec**, як вхідне джерело використовується звуковий пристрій за замовчуванням. Крім того, команда **soxi**(1) забезпечує зручний спосіб просто запитувати інформацію заголовка аудіофайлу.

Серцем SoX є бібліотека libSoX. Тим, хто зацікавлений у розширенні SoX або використанні його в інших програмах, слід звернутися до сторінки посібника libSoX: **libsox**(3).

SoX — це інструмент командного рядка для обробки аудіо, який особливо підходить для швидкого, простого редагування та пакетної обробки. Якщо вам потрібен інтерактивний графічний аудіоредактор, використовуйте **audacity**(1).

Загальний ланцюжок обробки SoX можна підсумувати таким чином:

```
Input(s) → Combiner → Effects → Output(s)
```

Однак зауважте, що в командному рядку SoX позиції виходу(Output) і ефектів(Effects ) міняються місцями. щойно показаний логічний потік. Зауважте також, що в той час як параметри, що стосуються файлів, розміщуються перед їхніми відповідними назвами файлів, протилежне вірно для ефектів. Щоб показати, як це працює на практиці, ось добірка прикладів того, як можна використовувати SoX. Простий

```
   sox recital.au recital.wav
```

перетворює аудіофайл у форматі Sun AU у файл Microsoft WAV, а також

```
   sox recital.au −b 16 recital.wav channels 1 rate 16k fade 3 norm
```

виконує трансляцію того самого формату, але також застосовує чотири ефекти (змішування до одного каналу, зміна частоти дискретизації, плавне затухання, нормалізація) і зберігає результат із бітовою глибиною 16.

```
   sox −r 16k −e signed −b 8 −c 1 voice-memo.raw voice-memo.wav
```

перетворює «необроблений» (він же «без заголовків») аудіо у формат файлу з самоописом,

```
   sox slow.aiff fixed.aiff speed 1.027
```

регулює швидкість звуку,

```
   sox short.wav long.wav longer.wav
```

об’єднує два аудіофайли та

```
   sox −m music.mp3 voice.wav mixed.flac
```

змішує два аудіофайли.

```
   play "The Moonbeams/Greatest/*.ogg" bass +3
```

відтворює колекцію аудіофайлів із застосуванням ефекту посилення басів,

```
   play −n −c1 synth sin %−12 sin %−9 sin %−5 sin %−2 fade h 0.1 1 0.1
```

грає синтезований акорд «ля мінорний септаккорд» зі звуком органа,

```
   rec −c 2 radio.aiff trim 0 30:00
```

записує півгодини стереозвуку та

```
   play −q take1.aiff & rec −M take1.aiff take1−dub.aiff
```

(з оболонкою POSIX і там, де підтримується апаратним забезпеченням) записує нову доріжку в багатодоріжковий запис.Нарешті,

```
   rec −r 44100 −b 16 −e signed-integer −p \
     silence 1 0.50 0.1% 1 10:00 0.1% | \
     sox −p song.ogg silence 1 0.50 0.1% 1 2.0 0.1% : \
     newfile : restart
```

записує потік аудіо, наприклад платівку/касету, і розбиває його на кілька аудіофайлів у точках з 2 секундами тиші. Крім того, він не починає запис, доки не виявить відтворення аудіо, і зупиняється після 10 хвилин тиші.

N.B. Вище наведено лише огляд можливостей SoX; докладні пояснення щодо використання *всіх* параметрів, форматів файлів і ефектів SoX можна знайти нижче в цьому посібнику, у **soxformat**(7) і **soxi**(1).

Команда **soxi**(1) може бути використана для відображення інформації із заголовків аудіофайлів.

## Типи форматів файлів

SoX може працювати з аудіофайлами «самоопису» та «необробленими» аудіофайлами. Формати «самоопису» (наприклад, WAV, FLAC, MP3) мають заголовок, який повністю описує сигнал і атрибути кодування наступних аудіоданих. Формати «raw» або «headerless» не містять цієї інформації, тому звукові характеристики для них мають бути описані в командному рядку SoX або виведені з характеристик вхідного файлу.

Наступні чотири характеристики використовуються для опису формату аудіоданих, які можуть бути оброблені за допомогою SoX:

- `sample rate` - Частота дискретизації в вибірках за секунду («Герц» або «Гц»). Цифрова телефонія традиційно використовує частоту дискретизації 8000 Гц (8 кГц), хоча сьогодні все більш поширеними стають 16 і навіть 32 кГц. Аудіокомпакт-диски використовують 44100 Гц (44,1 кГц). Цифрова звукова стрічка та багато комп’ютерних систем використовують 48 кГц. Професійні аудіосистеми часто використовують 96 кГц.

- `sample size` - Кількість бітів, які використовуються для зберігання кожного зразка. Сьогодні широко використовується 16-біт. 8-біт був популярний на початку розвитку комп’ютерного звуку. 24-розрядний використовується в професійній аудіосфері. Також використовуються інші розміри.

- `data encoding` - Спосіб представлення (або «закодування») кожного зразка аудіо. Деякі кодування мають варіанти з іншим порядком байтів або бітів. Деякі стискають аудіодані таким чином, що збережені аудіодані займають менше місця (тобто місця на диску або пропускної здатності передачі), ніж інші параметри формату та кількість зразків. До поширених типів кодування входять кодування з плаваючою точкою, μ-закон, ADPCM, ціле число зі знаком PCM, MP3 і FLAC.

- `channels` - Кількість аудіоканалів, які містяться у файлі. Один («моно») і два («стерео») широко використовуються. Аудіо «Об’ємний звук» зазвичай містить шість або більше каналів.

Термін «бітрейт» (bit-rate) є мірою обсягу пам’яті, який займає закодований аудіосигнал за одиницю часу. Це може залежати від усього вищезазначеного та зазвичай позначається як кількість кілобіт на секунду (кбіт/с). Телефонний сигнал A-law має швидкість передачі даних 64 Кбіт/с. MP3-кодована стереомузика зазвичай має бітрейт 128–196 кбіт/с. FLAC-кодована стереомузика зазвичай має бітрейт 550–760 кбіт/с.

Більшість форматів із самоописом також дозволяють вставляти у файл текстові «коментарі», які можна використовувати для певного опису аудіо, напр. для музики, назва, автор тощо.

Одним із важливих способів використання коментарів до аудіофайлів є передача інформації про «посилення відтворення». SoX підтримує застосування інформації про посилення відтворення (лише для певних форматів вхідних файлів; наразі принаймні FLAC і Ogg Vorbis), але не генерує її. Зауважте, що за замовчуванням SoX копіює коментарі вхідного файлу у вихідні файли, які підтримують коментарі, тому вихідні файли можуть містити інформацію про посилення відтворення, якщо така була у вхідному файлі. У цьому випадку, якщо було виконано щось інше, окрім простого перетворення формату, інформація про посилення відтворення вихідного файлу, ймовірно, буде неправильною, тому її слід перерахувати за допомогою інструменту, який підтримує це (не SoX).

## Визначення та встановлення формату файлу

There are several mechanisms available for SoX to use to determine or set the format characteristics of an audio file. Depending on the circumstances, individual characteristics may be determined or set using different mechanisms.

Є кілька механізмів, доступних для використання SoX для визначення або встановлення характеристик формату аудіофайлу. Залежно від обставин індивідуальні характеристики можуть визначатися або встановлюватися за допомогою різних механізмів.

Щоб визначити формат вхідного файлу, SoX використовуватиме, у порядку пріоритету та як задано чи доступно:

1. Параметри формату командного рядка.
2. Вміст заголовка файлу.
3. Розширення імені файлу.

Щоб установити формат вихідного файлу, SoX використовуватиме, у порядку пріоритету та за наявністю:

1. Параметри формату командного рядка.
2. Розширення імені файлу.
3. Характеристики формату вхідного файлу або найближчий, який підтримується типом вихідного файлу.

Для всіх файлів SoX завершить роботу з помилкою, якщо не вдається визначити тип файлу. Можливо, для вирішення проблеми потрібно буде додати або змінити параметри формату командного рядка.

## Відтворення та запис аудіо

Команди **play** і **rec** надаються, щоб базове відтворення та запис було таким же простим, як

```
   play existing-file.wav
```

та

```
   rec new-file.wav
```

Ці дві команди функціонально еквівалентні

```
   sox existing-file.wav −d
```

та

```
   sox −d new-file.wav
```

Звичайно, інші параметри та ефекти (як описано нижче) можна додати до команд у будь-якій формі.

Деякі системи забезпечують більше одного типу (сумісного з SoX) аудіодрайвера, напр. ALSA & OSS або SUNAU & AO. Системи також можуть мати більше ніж один аудіопристрій (так званий «звукова карта»). Якщо в SoX вбудовано більше ніж один аудіодрайвер, а SoX під час запису чи відтворення вибрано за замовчуванням не те, що потрібно, тоді, щоб замінити значення за замовчуванням можна використати змінну середовища **AUDIODRIVER** . Наприклад (у багатьох системах):

```
   set AUDIODRIVER=oss
   play ...
```

Змінну середовища **AUDIODEV** можна використовувати для заміни аудіопристрою за замовчуванням, наприклад.

```
   set AUDIODEV=/dev/dsp2
   play ...
   sox ... −t oss
```

або

```
   set AUDIODEV=hw:soundwave,1,2
   play ...
   sox ... −t alsa
```

Зауважте, що спосіб встановлення змінних середовища відрізняється від системи до системи – для деяких конкретних прикладів див. «SOX_OPTS» нижче.

Під час відтворення файлу з частотою дискретизації, яка не підтримується пристроєм виводу аудіо, SoX автоматично викличе ефект **rate** для виконання необхідного перетворення частоти дискретизації. Для сумісності зі старим обладнанням стандартний рівень якості **rate** встановлено на «низький». Це можна змінити, явно вказавши ефект **rate** з іншим рівнем якості, напр.

```
   play ... rate −m
```

або за допомогою параметра **−−play−rate−arg** (див. нижче).



У деяких системах SoX дозволяє регулювати гучність відтворення звуку під час використання **play**. Якщо це підтримується, це досягається натисканням клавіш «v» і «V» під час відтворення.

Щоб допомогти встановити відповідний рівень запису, SoX включає вимірювач пікового рівня, який можна викликати (перед тим, як здійснювати фактичний запис), наступним чином:

```
   rec −n
```

Рівень запису має бути налаштований (за допомогою наданої системою програми мікшера, а не SoX) так, щоб лічильник *найчастіше* був на повній шкалі, і ніколи не був «червоним» (показано знак оклику). Дивіться також **−S** нижче.

## Точність

Багато форматів файлів, які стискають аудіо, при цьому відкидають частину інформації про аудіосигнал. Перетворення в такий формат, а потім повторне перетворення не призведе до отримання точної копії оригінального аудіо. Це стосується багатьох форматів, що використовуються в телефонії (наприклад, A-law, GSM), де низька пропускна здатність сигналу важливіша за високу точність аудіо, а також багатьох форматів, що використовуються в портативних музичних програвачах (наприклад, MP3, Vorbis), де адекватна точність може бути зберігається навіть із високим коефіцієнтом стиснення, необхідним для практичних портативних плеєрів.

Формати, які відкидають інформацію про аудіосигнал, називаються «з втратами». Формати, які цього не роблять, називаються «без втрат». Термін «якість» використовується як міра того, наскільки точно оригінальний аудіосигнал може бути відтворений при використанні формату з втратами.

Перетворення аудіофайлів за допомогою SoX відбувається без втрат, коли це можливо, тобто коли не використовується стиснення з втратами, коли не зменшується частота дискретизації чи кількість каналів і коли кількість бітів, що використовуються у форматі призначення, не менша, ніж у вихідному форматі. наприклад конвертація з 8-бітного формату PCM у 16-бітний формат PCM виконується без втрат, а конвертація з 8-бітного формату PCM у (8-бітний) A-law — ні.

**Примітка** SoX перетворює всі аудіофайли у внутрішній нестиснений формат перед виконанням будь-якої обробки аудіо. Це означає, що маніпуляції з файлом, який зберігається у форматі з втратами, можуть призвести до подальших втрат точності звуку. наприклад з

```
   sox long.mp3 short.mp3 trim 10
```

SoX спочатку розпаковує вхідний MP3-файл, потім застосовує ефект **обрізання** і, нарешті, створює вихідний MP3-файл шляхом повторного стиснення аудіо – з можливим зниженням точності вище того, що мало місце під час створення вхідного файлу. Отже, якщо те, що в кінцевому підсумку бажано, — це аудіо, стиснуте з втратами, настійно рекомендується виконувати всю обробку аудіо, використовуючи формати файлів без втрат, а потім перетворювати у формат із втратами лише на завершальному етапі.

**Примітка.** Застосування кількох ефектів за допомогою одного виклику SoX, як правило, дасть більш точні результати, ніж ті, що отримані за допомогою кількох викликів SoX.

## Змішування 

Змішування (Dithering) — це техніка, яка використовується для максимізації динамічного діапазону аудіо, що зберігається з певною бітовою глибиною. Будь-яке спотворення, внесене квантуванням, декорелюється шляхом додавання до сигналу невеликої кількості білого шуму. У більшості випадків SoX може визначити, чи вимагає вибрана обробка змішування, і, якщо це необхідно, додасть його під час форматування виводу.

Зокрема, за замовчуванням SoX автоматично додає змішування TPDF, якщо бітова глибина виходу менше 24 і виконується будь-яке з наведеного нижче:

- bit-depth reduction has been specified explicitly using a command-line option
- the output file format supports only bit-depths lower than that of the input file format
- an effect has increased effective bit-depth within the internal processing chain

Наприклад, регулювання гучності за допомогою **volum 0,25** потребує двох додаткових бітів, у яких можна без втрат зберігати результати (оскільки 0,25 десяткової дорівнює 0,01 у двійковій системі). Отже, якщо бітова глибина вхідного файлу становить 16, тоді внутрішнє представлення SoX використовуватиме 18 біт після обробки цієї зміни обсягу. Щоб зберегти вихідні дані на тій самій глибині, що й вхідні, для видалення додаткових бітів використовується дизерінг.

Use the **−V** option to see what processing SoX has automatically added. The **−D** option may be given to override automatic dithering. To invoke dithering manually (e.g. to select a noise-shaping curve), see the **dither** effect.

**Clipping** 
 Clipping is distortion that occurs when an audio signal level (or ‘volume’) exceeds the range of the chosen representation. In most cases, clipping is undesirable and so should be corrected by adjusting the level prior to the point (in the processing chain) at which it occurs.

In SoX, clipping could occur, as you might expect, when using the **vol** or **gain** effects to increase the audio volume. Clipping could also occur with many other effects, when converting one format to another, and even when simply playing the audio.

Playing an audio file often involves resampling, and processing by analogue components can introduce a small DC offset and/or amplification, all of which can produce distortion if the audio signal level was initially too close to the clipping point.

For these reasons, it is usual to make sure that an audio file’s signal level has some ‘headroom’, i.e. it does not exceed a particular level below the maximum possible level for the given representation. Some standards bodies recommend as much as 9dB headroom, but in most cases, 3dB (≈ 70% linear) is enough. Note that this wisdom seems to have been lost in modern music production; in fact, many CDs, MP3s, etc. are now mastered at levels *above* 0dBFS i.e. the audio is clipped as delivered.

SoX’s **stat** and **stats** effects can assist in determining the signal level in an audio file. The **gain** or **vol** effect can be used to prevent clipping, e.g.

```
   sox dull.wav bright.wav gain −6 treble +6
```

guarantees that the treble boost will not clip.

If clipping occurs at any point during processing, SoX will display a warning message to that effect.

See also **−G** and the **gain** and **norm** effects.

**Input File Combining** 
 SoX’s input combiner can be configured (see OPTIONS below) to combine multiple files using any of the following methods: ‘concatenate’, ‘sequence’, ‘mix’, ‘mix-power’, ‘merge’, or ‘multiply’. The default method is ‘sequence’ for **play**, and ‘concatenate’ for **rec** and **sox**.

For all methods other than ‘sequence’, multiple input files must have the same sampling rate. If necessary, separate SoX invocations can be used to make sampling rate adjustments prior to combining.

If the ‘concatenate’ combining method is selected (usually, this will be by default) then the input files must also have the same number of channels. The audio from each input will be concatenated in the order given to form the output file.

The ‘sequence’ combining method is selected automatically for **play**. It is similar to ‘concatenate’ in that the audio from each input file is sent serially to the output file. However, here the output file may be closed and reopened at the corresponding transition between input files. This may be just what is needed when sending different types of audio to an output device, but is not generally useful when the output is a normal file.

If either the ‘mix’ or ‘mix-power’ combining method is selected then two or more input files must be given and will be mixed together to form the output file. The number of channels in each input file need not be the same, but SoX will issue a warning if they are not and some channels in the output file will not contain audio from every input file. A mixed audio file cannot be un-mixed without reference to the original input files.

If the ‘merge’ combining method is selected then two or more input files must be given and will be merged together to form the output file. The number of channels in each input file need not be the same. A merged audio file comprises all of the channels from all of the input files. Un-merging is possible using multiple invocations of SoX with the **remix** effect. For example, two mono files could be merged to form one stereo file. The first and second mono files would become the left and right channels of the stereo file.

The ‘multiply’ combining method multiplies the sample values of corresponding channels (treated as numbers in the interval −1 to +1). If the number of channels in the input files is not the same, the missing channels are considered to contain all zero.

When combining input files, SoX applies any specified effects (including, for example, the **vol** volume adjustment effect) after the audio has been combined. However, it is often useful to be able to set the volume of (i.e. ‘balance’) the inputs individually, before combining takes place.

For all combining methods, input file volume adjustments can be made manually using the **−v** option (below) which can be given for one or more input files. If it is given for only some of the input files then the others receive no volume adjustment. In some circumstances, automatic volume adjustments may be applied (see below).

The **−V** option (below) can be used to show the input file volume adjustments that have been selected (either manually or automatically).

There are some special considerations that need to made when mixing input files:

Unlike the other methods, ‘mix’ combining has the potential to cause clipping in the combiner if no balancing is performed. In this case, if manual volume adjustments are not given, SoX will try to ensure that clipping does not occur by automatically adjusting the volume (amplitude) of each input signal by a factor of ¹/ n , where n is the number of input files. If this results in audio that is too quiet or otherwise unbalanced then the input file volumes can be set manually as described above. Using the **norm** effect on the mix is another alternative.

If mixed audio seems loud enough at some points but too quiet in others then dynamic range compression should be applied to correct this - see the **compand** effect.

With the ‘mix-power’ combine method, the mixed volume is approximately equal to that of one of the input signals. This is achieved by balancing using a factor of ¹/ √n instead of ¹/ n . Note that this balancing factor does not guarantee that clipping will not occur, but the number of clips will usually be low and the resultant distortion is generally imperceptible.

## Вихідні файли

Поведінка SoX за замовчуванням полягає в тому, щоб взяти один або кілька вхідних файлів і записати їх в один вихідний файл.

Цю поведінку можна змінити, вказавши псевдоефект «новий файл» у списку ефектів. Тоді SoX увійде в режим багаторазового виведення.

У режимі багаторазового виведення новий файл створюється, коли ефекти перед «новим файлом» вказують, що вони виконані. Потім запускається ланцюжок ефектів, указаний після «нового файлу», і його результат зберігається в новому файлі.

У режимі багаторазового виведення унікальний номер буде автоматично додано до кінця всіх імен файлів. Якщо ім'я файлу має розширення, то номер вставляється перед розширенням. Цю поведінку можна налаштувати, розмістивши %n у будь-якому місці імені файлу, де має бути замінено число. Додаткове число можна розмістити після %, щоб вказати мінімальну фіксовану ширину числа.

Режим множинного виводу не дуже корисний, якщо перед «новим файлом» не вказано ефект, який зупинить ланцюжок ефектів раніше. Якщо кінець файлу досягнуто до того, як ланцюжок ефектів зупиниться, новий файл не буде створено, оскільки він буде порожнім.

Нижче наведено приклад поділу перших 60 секунд вхідного файлу на два файли по 30 секунд і ігнорування решти.

```
   sox song.wav ringtone%1n.wav trim 0 30 : newfile : trim 0 30
```

## Зупинка SoX 

Зазвичай SoX завершує свою обробку та вийде автоматично, коли прочитає всі доступні аудіодані з вхідних файлів.

Якщо потрібно, його можна завершити раніше, надіславши процесу сигнал переривання (зазвичай, натиснувши клавішу переривання на клавіатурі, якою зазвичай є Ctrl-C). Це природна вимога за деяких обставин, напр. під час використання SoX для запису. Зауважте, що під час використання SoX для відтворення кількох файлів Ctrl-C поводиться дещо інакше: одноразове натискання змушує SoX перейти до наступного файлу; швидке натискання двічі поспіль призводить до виходу SoX.

Ще один варіант передчасного припинення обробки — це використання ефекту, який має період часу або вибірку для визначення точки зупинки. Прикладом цього є ефект обрізки. Коли всі ланцюги ефектів зупиняться, SoX також зупиниться.