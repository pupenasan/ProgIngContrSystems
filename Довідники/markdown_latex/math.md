# Записування математичних виразів

https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions

GitHub's math rendering capability uses MathJax; an open source,  JavaScript-based display engine. MathJax supports a wide range of LaTeX  macros, and several useful accessibility extensions. For more  information, see [the MathJax documentation](http://docs.mathjax.org/en/latest/input/tex/index.html#tex-and-latex-support) and [the MathJax Accessibility Extensions Documentation](https://mathjax.github.io/MathJax-a11y/docs/#reader-guide).

Використовуйте Markdown для відображення математичних виразів на GitHub.

Щоб забезпечити чітку передачу математичних виразів у Markdown GitHub підтримує математику в форматі LaTeX . Для отримання додаткової інформації див. [LaTeX/Mathematics](latexmath.md).

Для можливості математичного візуалізації GitHub використовує MathJax - рушій відображення на основі JavaScript з відкритим кодом. MathJax підтримує широкий спектр макросів LaTeX і кілька корисних розширень доступності. Для отримання додаткової інформації дивіться [документацію MathJax](http://docs.mathjax.org/en/latest/input/tex/index.html#tex-and-latex-support) і [документацію MathJax Accessibility Extensions Documentation]( https://mathjax.github.io/MathJax-a11y/docs/#reader-guide).

## Написання вбудованих виразів

Щоб включити математичний вираз до тексту, розмежуйте вираз символом долара `$`.

```
This sentence uses `$` delimiters to show math inline:  $\sqrt{3x-1}+(1+x)^2$
```

![Inline math markdown rendering](media/inline-math-markdown-rendering.png)

## Написання виразів у вигляді блоків

Щоб додати математичний вираз як блок, почніть новий рядок і розмежуйте вираз двома символами долара `$$`.

```
**The Cauchy-Schwarz Inequality**

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$
```

![Math expression as a block rendering](media/math-expression-as-a-block-rendering.png)

## Написання знаків долара відповідно до математичних виразів і всередині них 

Щоб відобразити знак долара як символ у тому ж рядку, що й математичний вираз, вам потрібно відмінити роздільник `$`, щоб забезпечити, щоб рядок відображався правильно.

- У математичний вираз додайте символ `\` перед `$`.

  ```
  This expression uses `\$` to display a dollar sign: $\sqrt{\$4}$
  ```

  ![Dollar sign within math expression](media/dollar-sign-within-math-expression.png)

- Поза математичним виразом, але в тому ж рядку, використовуйте теги `<span>` навколо  `$`.

  ```
  To split <span>$</span>100 in half, we calculate $100/2$
  ```

  ![Dollar sign inline math expression](media/dollar-sign-inline-math-expression.png)