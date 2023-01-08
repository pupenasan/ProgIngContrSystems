# SciPy

https://www.w3schools.com/python/scipy/index.php

https://docs.scipy.org/doc/scipy/tutorial/general.html

SciPy — це наукова бібліотека обчислень, яка використовує NumPy. SciPy розшифровується як Scientific Python.

## Основи

Бібліотека надає більше корисних функцій для оптимізації, статистики та обробки сигналів. Як і NumPy, SciPy є відкритим кодом, тому ми можемо використовувати його вільно. SciPy був створений творцем NumPy Тревісом Олліфантом.

SciPy оптимізував і додав функції, які часто використовуються в NumPy і Data Science.

Перевірити версію встановленого пакунку:

```bash
py -m pip show scipy
```

Встановити пакунок:

```bash
py -m pip install scipy
```

Після встановлення SciPy імпортуйте модулі SciPy, які ви хочете використовувати у своїх програмах, додавши оператор `from scipy import module`:

```python
from scipy import constants 
print(constants.liter) # 0.001 - скільки м3 в літрі
```

## Константи (Constants)

https://www.w3schools.com/python/scipy/scipy_constants.php

Категорії констант:

- Metric
- Binary
- Mass
- Angle
- Time
- Length
- Pressure
- Volume
- Speed
- Temperature
- Energy
- Power
- Force

## Integration and ODEs

### quad - визначений інтеграл



```python
scipy.integrate.quad (func, a, b, args=(), full_output=0, epsabs=1.49e-08, epsrel=1.49e-08, limit=50, points=None, weight=None, wvar=None, wopts=None, maxp1=50, limlst=50)
```

`func` - функція або метод Python для інтеграції. Якщо функція приймає багато аргументів, вона інтегрується вздовж осі, що відповідає першому аргументу. 

`a` (float) - Нижня межа інтеграції (використовуйте `-numpy.inf` для +нескінченності).

`b` (float) - Верхня межа інтеграції (використовуйте `+numpy.inf` для +нескінченності).

`args`(tuple, optional) -  Додаткові аргументи для передачі *func*.

`full_output` (int, optional) -  Ненульове, щоб повернути словник інтеграційної інформації. Якщо значення не нульове, попереджувальні повідомлення також пригнічуються, і повідомлення додається до вихідного кортежу.

Інші вхідні параметри також є необовзяковими, деталі [тут](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.quad.html#scipy.integrate.quad)

Повертає коретеж з:

`y` (float) - Інтеграл функції від *a* до *b*.

`abserr` (float) - Оцінка абсолютної похибки результату.

`infodict` (dict) - Словник, що містить додаткову інформацію, повертається тільки в тому випадку, якщо `full_output` у вхідному аргументі не нуль.

`message`  - Повідомлення конвергенції, якщо `full_output` у вхідному аргументі не нуль.

`explain` - Доданий лише з вагою «cos» або «sin» і нескінченними межами інтеграції, він містить пояснення кодів у `infodict[‘ierlst’]`, якщо `full_output` у вхідному аргументі не нуль.

```python
from scipy import integrate
x2 = lambda x: x**2
rez = integrate.quad(x2, 0, 4) 
print (rez) # (21.333333333333332, 2.3684757858670003e-13)
```

