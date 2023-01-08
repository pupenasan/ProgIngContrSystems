# NumPy 

https://www.w3schools.com/python/numpy/default.asp

NumPy (Numerical Python) — це бібліотека Python для роботи з масивами. Він також має функції для роботи в області лінійної алгебри, перетворення Фур’є та матриць.

NumPy має на меті надати об’єкт масиву, який у 50 разів швидший за традиційні списки Python.

## Основи

Об’єкт масиву в NumPy називається `ndarray`, він надає багато допоміжних функцій, які роблять роботу з `ndarray` дуже легкою. Масиви дуже часто використовуються в науці про дані, де швидкість і ресурси дуже важливі.

Масиви NumPy зберігаються в одному безперервному місці в пам’яті, на відміну від списків, тому процеси можуть отримувати до них доступ і маніпулювати ними дуже ефективно. Така поведінка в інформатиці називається локальністю посилання. Це головна причина, чому NumPy швидше, ніж списки. Крім того, він оптимізований для роботи з останніми архітектурами ЦП. NumPy — це бібліотека Python, яка частково написана на Python, але більшість частин, які потребують швидкого обчислення, написані на C або C++.

Перевірити версію встановленого пакунку:

```bash
py -m pip show numpy
```

Встановити пакунок:

```bash
py -m pip install numpy
```

NumPy зазвичай імпортується під псевдонімом `np`.

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr) #[1 2 3 4 5]
print(type(arr)) #<class 'numpy.ndarray'>
```

Щоб створити масив `ndarray`, ми можемо передати список, кортеж або будь-який об’єкт, схожий на масив, у метод `array()`, і він буде перетворений у масив `ndarray`:

```python
arr = np.array((1, 2, 3, 4, 5)) 
```

## Розмірність

Розмірність масивів задається аналогічно як в списках. Для перевірки розмірності викоистовується метод `ndim`

```python
import numpy as np
arr0 = np.array(42) # 0-вимірний
arr1 = np.array([1, 2, 3, 4, 5]) # 1-вимірний
arr2 = np.array([[1, 2, 3], [4, 5, 6]]) # 2-вимірний
print('2nd element on 1st row: ', arr2[0, 1]) #2
arr3 = np.array([[[1, 2, 3], [4, 5, 6]], [[1, 2, 3], [4, 5, 6]]]) # 3-вимірний
print(arr0.ndim) # 0
print(arr1.ndim) # 1
print(arr2.ndim) # 2
print(arr3.ndim) # 3
```

NumPy має цілий підмодуль, присвячений матричним операціям під назвою `numpy.mat`,

Масив може мати будь-яку кількість розмірів. Після створення масиву ви можете визначити кількість вимірів за допомогою аргументу `ndmin`.

```python
import numpy as np
arr = np.array([1, 2, 3, 4], ndmin=5)
print(arr) # [[[[[1 2 3 4]]]]]
print('number of dimensions :', arr.ndim) # number of dimensions : 5 
```

У цьому масиві внутрішній розмір (5-й dim) має 4 елементи, 4-й dim має 1 елемент, який є вектором, 3-й dim має 1 елемент, який є матрицею з вектором, 2-й dim має 1 елемент, який є 3D-масивом, і 1-й dim має 1 елемент, який є 4D-масивом.

## Варіанти створення масивів

https://personal.math.ubc.ca/~pwalls/math-python/scipy/numpy/

`numpy.array(a)` - створення n-вимірного масиву NumPy із послідовності `a`
`numpy.linspace(a,b,N)` - cтворення одновимірного масиву NumPy із `N` рівновіддалених значень від `a` до `b` (включно)
`numpy.arange(a,b,step)` - створення одновимірний масив NumPy зі значеннями від `a` до `b` (невключно), збільшеними на `step`
`numpy.zeros(N)` - створення одновимірного масиву NumPy з нулів довжиною `N`
`numpy.zeros((n,m))` -  створення двовимірного масиву з нулів NumPy із `n` рядками та `m` стовпцями
`numpy.ones(N)`  - Створіть одновимірний масив NumPy з одиниць довжини  `N` 
`numpy.ones((n,m))`  - створення двовимірного масиву з одиниць NumPy із `n` рядками та `m` стовпцями
`numpy.eye(N)` - Створіть двовимірний масив NumPy із `n`  рядками та  `m`  стовпцями з одиницями по діагоналі (тобто одинична матриця розміру )



## Slicing 

Нарізання (Slicing)  в Python означає перенесення елементів з одного даного індексу в інший заданий індекс. Ми передаємо фрагмент замість індексу таким чином: `[початок:кінець]`. Ми також можемо визначити крок таким чином: `[початок:кінець:крок]`. Якщо ми не вказуємо `start`, це вважається 0. Якщо ми не передаємо `end`, то береться за основу довжина масиву в цьому вимірі. Якщо ми не вказуємо крок, він вважається 1.

```python
import numpy as np
arr = np.array(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
print(arr[1:5:2]) #['b' 'd']
print(arr[::2]) #['a' 'c' 'e' 'g']
print(arr[4:]) #['e' 'f' 'g']
print(arr[:4]) #['a' 'b' 'c' 'd']
print(arr[-3:-1]) #['e' 'f']
```



```python
import numpy as np
arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print(arr[1, 1:4]) #[7 8 9]
print(arr[0:2, 1:4]) #[[2 3 4] [7 8 9]]
```

## Типи даних

NumPy має деякі додаткові типи даних і посилається на типи даних з одним символом, як-от `i` для цілих чисел, `u` для беззнакових цілих чисел тощо. Нижче наведено список усіх типів даних у NumPy та символів, які використовуються для їх представлення.

- `i` - integer
- `b` - boolean
- `u` - unsigned integer
- `f` - float
- `c` - complex float
- `m` - timedelta
- `M` - datetime
- `O` - object
- `S` - string
- `U` - unicode string
- `V` - fixed chunk of memory for other type ( void )

Об’єкт масиву NumPy має властивість `dtype`, яка повертає тип даних масиву:

```python
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr.dtype) # int32
arr1 = np.array(['apple', 'banana', 'cherry'])
print(arr1.dtype) # <U6
```

Ми використовуємо функцію `array()` для створення масивів, ця функція може приймати необов’язковий аргумент: `dtype`, який дозволяє нам означити очікуваний тип даних для елементів масиву:

```python
import numpy as np
arr = np.array([1, 2, 3, 4], dtype='i4')
print(arr.dtype) # int32
```

Якщо вказано тип, елементи якого не можуть бути приведені, NumPy викличе ValueError.

Найкращий спосіб змінити тип даних існуючого масиву – це зробити копію масиву за допомогою методу `astype()`. Функція `astype()` створює копію масиву та дозволяє вказати тип даних як параметр. Тип даних можна вказати за допомогою рядка, як-от `f` для числа з плаваючою точкою, `i` для цілого числа тощо, або ви можете використовувати тип даних безпосередньо як `float` для числа з плаваючою точкою та `int` для цілого числа.

```python
import numpy as np
arr = np.array([1.1, 2.1, 3.1])
newarr = arr.astype(int)
print(newarr) # [1 2 3]
print(newarr.dtype) # int32
```

## Copy та View

Основна відмінність між копією (Copy) та поданням (View) масиву полягає в тому, що копія є новим масивом, а подання — це лише подання вихідного масиву. Копія володіє даними, і будь-які зміни, внесені до копії, не вплинуть на вихідний масив, а будь-які зміни, внесені до вихідного масиву, не вплинуть на копію. Подання не володіє даними, і будь-які зміни, внесені до подання, вплинуть на вихідний масив, а будь-які зміни, внесені до вихідного масиву, вплинуть на подання.

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
# copy
cp = arr.copy()
arr[0] = 42 
print(arr) # [42  2  3  4  5]
print(cp) # [1 2 3 4 5]
# view
vw = arr.view()
arr[0] = 36
print(arr) # [36  2  3  4  5]
print(vw)  # [36  2  3  4  5]
```

Як згадувалося вище, копії володіють даними, а перегляди не володіють даними, але як ми можемо це перевірити? Кожен масив NumPy має атрибут `base`, який повертає `None`, якщо дані належать масиву. В іншому випадку атрибут  `base`  посилається на вихідний об’єкт.

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
x = arr.copy()
y = arr.view()
print(x.base) # None
print(y.base) # [1 2 3 4 5]
```

## Визначення `shape` та зміна `reshape` форми масиву

Форма масиву — це кількість елементів у кожному вимірі.

Масиви NumPy мають атрибут під назвою `shape`, який повертає кортеж із кожним індексом, що має кількість відповідних елементів.

```python
import numpy as np
arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
print(arr.shape) # (2, 4)
```

Цілі числа в кожному індексі говорять про кількість елементів, які має відповідний розмір.

Змінюючи форму, ми можемо додавати або видаляти розміри або змінювати кількість елементів у кожному вимірі. Для цього використовується `reshape` .

Перетворіть наведений нижче одновимірний масив із 12 елементів у двовимірний масив. Зовнішній розмір матиме 4 масиви, кожен з яких містить 3 елементи:

```python
import numpy as np
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
newarr = arr.reshape(4, 3)
print(newarr) 
'''
[[ 1  2  3]
 [ 4  5  6]
 [ 7  8  9]
 [10 11 12]]
 '''
```

## linspace

https://numpy.org/doc/stable/reference/generated/numpy.linspace.html

```python
numpy.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None, axis=0)
```

Return evenly spaced numbers over a specified interval.

Returns *num* evenly spaced samples, calculated over the interval [*start*, *stop*].

The endpoint of the interval can optionally be excluded.

- **start**array_like

  The starting value of the sequence.

- **stop**array_like

  The end value of the sequence, unless *endpoint* is set to False. In that case, the sequence consists of all but the last of `num + 1` evenly spaced samples, so that *stop* is excluded.  Note that the step size changes when *endpoint* is False.

- **num**int, optional

  Number of samples to generate. Default is 50. Must be non-negative.

- **endpoint**bool, optional

  If True, *stop* is the last sample. Otherwise, it is not included. Default is True.

- **retstep**bool, optional

  If True, return (*samples*, *step*), where *step* is the spacing between samples.

- **dtype**dtype, optional

  The type of the output array.  If [`dtype`](https://numpy.org/doc/stable/reference/generated/numpy.dtype.html#numpy.dtype) is not given, the data type is inferred from *start* and *stop*. The inferred dtype will never be an integer; [`float`](https://docs.python.org/3/library/functions.html#float) is chosen even if the arguments would produce an array of integers. New in version 1.9.0.

- **axis**int, optional

  The axis in the result to store the samples.  Relevant only if start or stop are array-like.  By default (0), the samples will be along a new axis inserted at the beginning. Use -1 to get an axis at the end. New in version 1.16.0.

Повертає:

- **samples**ndarray

  There are *num* equally spaced samples in the closed interval `[start, stop]` or the half-open interval `[start, stop)` (depending on whether *endpoint* is True or False).

- **step**float, optional

  Only returned if *retstep* is True Size of spacing between samples.

https://www.w3schools.com/python/numpy/numpy_array_reshape.asp



