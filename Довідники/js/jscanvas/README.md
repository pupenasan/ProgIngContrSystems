# node-canvas

https://github.com/Automattic/node-canvas

## Документація

Цей проект є реалізацією API Web Canvas і реалізує цей API якомога ближче. Щоб отримати документацію щодо API, відвідайте [Mozilla Web Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). (Див. [Статус сумісності](https://github.com/Automattic/node-canvas/wiki/Compatibility-Status) щодо поточної відповідності API.) Усі методи утиліти та нестандартні API описані нижче.

### Utility methods

- [createCanvas()](https://github.com/Automattic/node-canvas#createcanvas)
- [createImageData()](https://github.com/Automattic/node-canvas#createimagedata)
- [loadImage()](https://github.com/Automattic/node-canvas#loadimage)
- [registerFont()](https://github.com/Automattic/node-canvas#registerfont)

### Non-standard APIs

- [Image#src](https://github.com/Automattic/node-canvas#imagesrc)
- [Image#dataMode](https://github.com/Automattic/node-canvas#imagedatamode)
- [Canvas#toBuffer()](https://github.com/Automattic/node-canvas#canvastobuffer)
- [Canvas#createPNGStream()](https://github.com/Automattic/node-canvas#canvascreatepngstream)
- [Canvas#createJPEGStream()](https://github.com/Automattic/node-canvas#canvascreatejpegstream)
- [Canvas#createPDFStream()](https://github.com/Automattic/node-canvas#canvascreatepdfstream)
- [Canvas#toDataURL()](https://github.com/Automattic/node-canvas#canvastodataurl)
- [CanvasRenderingContext2D#patternQuality](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dpatternquality)
- [CanvasRenderingContext2D#quality](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dquality)
- [CanvasRenderingContext2D#textDrawingMode](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dtextdrawingmode)
- [CanvasRenderingContext2D#globalCompositeOperator = 'saturate'](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dglobalcompositeoperator--saturate)
- [CanvasRenderingContext2D#antialias](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dantialias)

### createCanvas()

> ```js
> createCanvas(width: number, height: number, type?: 'PDF'|'SVG') => Canvas
> ```

Створює екземпляр Canvas. Цей метод працює як у Node.js, так і у веб-браузерах, де немає конструктора Canvas. (Див. `browser.js` щодо реалізації, яка працює у браузерах.)

```js
const { createCanvas } = require('canvas')
const mycanvas = createCanvas(200, 200)
const myPDFcanvas = createCanvas(600, 800, 'pdf') // see "PDF Support" section
```

### createImageData()

> ```js
> createImageData(width: number, height: number) => ImageData
> createImageData(data: Uint8ClampedArray, width: number, height?: number) => ImageData
> // for alternative pixel formats:
> createImageData(data: Uint16Array, width: number, height?: number) => ImageData
> ```

Створює екземпляр ImageData. Цей метод працює як у Node.js, так і у веб-браузерах.

```js
const { createImageData } = require('canvas')
const width = 20, height = 20
const arraySize = width * height * 4
const mydata = createImageData(new Uint8ClampedArray(arraySize), width)
```

### loadImage()

> ```js
> loadImage() => Promise<Image>
> ```

Зручний спосіб завантаження зображень. Цей метод працює як у Node.js, так і у веб-браузерах.

```js
const { loadImage } = require('canvas')
const myimg = loadImage('http://server.com/image.png')

myimg.then(() => {
  // do something with image
}).catch(err => {
  console.log('oh no!', err)
})

// or with async/await:
const myimg = await loadImage('http://server.com/image.png')
// do something with image
```

### registerFont()

> ```js
> registerFont(path: string, { family: string, weight?: string, style?: string }) => void
> ```

Щоб використовувати файл шрифту, який не встановлений як системний шрифт, використовуйте `registerFont()`, щоб зареєструвати шрифт у Canvas. *Це потрібно зробити перед створенням Canvas*

```js
const { registerFont, createCanvas } = require('canvas')
registerFont('comicsans.ttf', { family: 'Comic Sans' })

const canvas = createCanvas(500, 500)
const ctx = canvas.getContext('2d')

ctx.font = '12px "Comic Sans"'
ctx.fillText('Everyone hates this font :(', 250, 10)
```

Другий аргумент - це об'єкт із властивостями, які нагадують властивості CSS, зазначені в правилах `@font-face`. Ви повинні вказати принаймні  `family`. `weight`, та `style`  не є обов'язковими та за замовчуванням мають значення `'normal'`

### Image#src

> ```js
> img.src: string|Buffer
> ```

Як і в браузерах, для `img.src` можна встановити значення ` data: ` URI або віддалену URL-адресу. Крім того, node-canvas дозволяє встановити для `src` локальний шлях до файлу або екземпляр ` Buffer`.

```js
const { Image } = require('canvas')

// From a buffer:
fs.readFile('images/squid.png', (err, squid) => {
  if (err) throw err
  const img = new Image()
  img.onload = () => ctx.drawImage(img, 0, 0)
  img.onerror = err => { throw err }
  img.src = squid
})

// From a local file path:
const img = new Image()
img.onload = () => ctx.drawImage(img, 0, 0)
img.onerror = err => { throw err }
img.src = 'images/squid.png'

// From a remote URL:
img.src = 'http://picsum.photos/200/300'
// ... as above

// From a `data:` URI:
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
// ... as above
```

*Примітка: У деяких випадках `img.src =` наразі є синхронним. Однак ви завжди повинні використовувати `img.onload` та` img.onerror`, оскільки ми маємо намір зробити `img.src =` завжди асинхронним, як у браузерах. Див. Https://github.com/Automattic/node-canvas/issues/1007.*

### Image#dataMode

> ```
> img.dataMode: number
> ```

Applies to JPEG images drawn to PDF canvases only.

Застосовується лише до зображень JPEG, намальованих на полотнах PDF.

Встановлення `img.dataMode = Image.MODE_MIME` або ` Image.MODE_MIME | Image.MODE_IMAGE` дозволяє відстежувати дані MIME зображень. Коли дані MIME відстежуються, полотна PDF можуть вбудовувати JPEG безпосередньо у вихідні дані, а не перекодувати їх у PNG. Це може суттєво зменшити розмір файлу та пришвидшити візуалізацію.

```js
const { Image, createCanvas } = require('canvas')
const canvas = createCanvas(w, h, 'pdf')
const img = new Image()
img.dataMode = Image.MODE_IMAGE // Only image data tracked
img.dataMode = Image.MODE_MIME // Only mime data tracked
img.dataMode = Image.MODE_MIME | Image.MODE_IMAGE // Both are tracked
```

При роботі з полотном, яке не є PDF, дані зображення повинні відстежуватися; інакше результат буде непотрібним.

Увімкнення відстеження даних mime не має ніяких переваг (лише сповільнення), якщо ви не створюєте PDF-файл.

### Canvas#toBuffer()

> ```js
> canvas.toBuffer((err: Error|null, result: Buffer) => void, mimeType?: string, config?: any) => void
> canvas.toBuffer(mimeType?: string, config?: any) => Buffer
> ```

Створює об’єкт [`Buffer`](https://nodejs.org/api/buffer.html) , що представляє зображення, що міститься на полотні.

- **callback** якщо передбачено, буфер буде наданий у зворотному виклику, а не повертається функцією. Викликається з помилкою як першим аргументом, якщо кодування не вдалося, або отриманим буфером як другим аргументом, якщо це вдалося. Не підтримується для mimeType `raw` або для полотен PDF або SVG.

- **mimeType** Рядок із зазначенням формату зображення. Допустимими параметрами є  `image/png`, `image/jpeg` (якщо node-canvas був побудований з підтримкою JPEG), `raw`(некодовані дані в порядку BGRA на мало-ендіанських (більшості) системах, ARGB на великих-ендіанських системах ; зверху вниз), `application/pdf` (для полотен PDF) та`image/svg+xml`(для полотен SVG). За замовчуванням значення  `image/png` для полотен зображень або відповідний тип для полотна PDF або SVG.

- **config**

  - For `image/jpeg`, an object specifying the quality (0 to  1), if progressive compression should be used and/or if chroma  subsampling should be used: `{quality: 0.75, progressive: false, chromaSubsampling: true}`. All properties are optional.

  - For `image/png`, an object specifying the ZLIB compression level (between 0 and 9), the compression filter(s), the palette  (indexed PNGs only), the the background palette index (indexed PNGs  only) and/or the resolution (ppi): `{compressionLevel: 6, filters: canvas.PNG_ALL_FILTERS, palette: undefined, backgroundIndex: 0, resolution: undefined}`. All properties are optional.

    Note that the PNG format encodes the resolution in pixels per meter, so if you specify `96`, the file will encode 3780 ppm (~96.01 ppi). The resolution is undefined by default to match common browser behavior.

  - For `application/pdf`, an object specifying optional document metadata: `{title: string, author: string, subject: string, keywords: string, creator: string, creationDate: Date, modDate: Date}`. All properties are optional and default to `undefined`, except for `creationDate`, which defaults to the current date. *Adding metadata requires Cairo 1.16.0 or later.*

    For a description of these properties, see page 550 of [PDF 32000-1:2008](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDF32000_2008.pdf).

    Note that there is no standard separator for `keywords`. A space is recommended because it is in common use by other applications, and Cairo will enclose the list of keywords in quotes if a comma or  semicolon is used.

**Return value**

If no callback is provided, a [`Buffer`](https://nodejs.org/api/buffer.html). If a callback is provided, none.

#### Examples

```js
// Default: buf contains a PNG-encoded image
const buf = canvas.toBuffer()

// PNG-encoded, zlib compression level 3 for faster compression but bigger files, no filtering
const buf2 = canvas.toBuffer('image/png', { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE })

// JPEG-encoded, 50% quality
const buf3 = canvas.toBuffer('image/jpeg', { quality: 0.5 })

// Asynchronous PNG
canvas.toBuffer((err, buf) => {
  if (err) throw err // encoding failed
  // buf is PNG-encoded image
})

canvas.toBuffer((err, buf) => {
  if (err) throw err // encoding failed
  // buf is JPEG-encoded image at 95% quality
}, 'image/jpeg', { quality: 0.95 })

// BGRA pixel values, native-endian
const buf4 = canvas.toBuffer('raw')
const { stride, width } = canvas
// In memory, this is `canvas.height * canvas.stride` bytes long.
// The top row of pixels, in BGRA order on little-endian hardware,
// left-to-right, is:
const topPixelsBGRALeftToRight = buf4.slice(0, width * 4)
// And the third row is:
const row3 = buf4.slice(2 * stride, 2 * stride + width * 4)

// SVG and PDF canvases
const myCanvas = createCanvas(w, h, 'pdf')
myCanvas.toBuffer() // returns a buffer containing a PDF-encoded canvas
// With optional metadata:
myCanvas.toBuffer('application/pdf', {
  title: 'my picture',
  keywords: 'node.js demo cairo',
  creationDate: new Date()
})
```

### Canvas#createPNGStream()

> ```js
> canvas.createPNGStream(config?: any) => ReadableStream
> ```

Creates a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) that emits PNG-encoded data.

- `config` An object specifying the ZLIB compression level  (between 0 and 9), the compression filter(s), the palette (indexed PNGs  only) and/or the background palette index (indexed PNGs only): `{compressionLevel: 6, filters: canvas.PNG_ALL_FILTERS, palette: undefined, backgroundIndex: 0, resolution: undefined}`. All properties are optional.

#### Examples

```
const fs = require('fs')
const out = fs.createWriteStream(__dirname + '/test.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))
```

To encode indexed PNGs from canvases with `pixelFormat: 'A8'` or `'A1'`, provide an options object:

```js
const palette = new Uint8ClampedArray([
  //r    g    b    a
    0,  50,  50, 255, // index 1
   10,  90,  90, 255, // index 2
  127, 127, 255, 255
  // ...
])
canvas.createPNGStream({
  palette: palette,
  backgroundIndex: 0 // optional, defaults to 0
})
```

### Canvas#createJPEGStream()

> ```
> canvas.createJPEGStream(config?: any) => ReadableStream
> ```

Creates a [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) that emits JPEG-encoded data.

*Note: At the moment, `createJPEGStream()` is synchronous under the hood. That is, it runs in the main thread, not in the libuv threadpool.*

- `config` an object specifying the quality (0 to 1), if  progressive compression should be used and/or if chroma subsampling  should be used: `{quality: 0.75, progressive: false, chromaSubsampling: true}`. All properties are optional.

#### Examples

```js
const fs = require('fs')
const out = fs.createWriteStream(__dirname + '/test.jpeg')
const stream = canvas.createJPEGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The JPEG file was created.'))

// Disable 2x2 chromaSubsampling for deeper colors and use a higher quality
const stream = canvas.createJPEGStream({
  quality: 0.95,
  chromaSubsampling: false
})
```

### Canvas#createPDFStream()

> ```
> canvas.createPDFStream(config?: any) => ReadableStream
> ```

- `config` an object specifying optional document metadata: `{title: string, author: string, subject: string, keywords: string, creator: string, creationDate: Date, modDate: Date}`. See `toBuffer()` for more information. *Adding metadata requires Cairo 1.16.0 or later.*

Застосовується лише до полотен PDF. Створює  [`ReadableStream`](https://nodejs.org/api/stream.html#stream_class_stream_readable) , який видає закодований PDF. `canvas.toBuffer()` також створює закодований PDF, але `createPDFStream()` можна використовувати для зменшення використання пам'яті.

### Canvas#toDataURL()

This is a standard API, but several non-standard calls are supported. The full list of supported calls is:

```js
dataUrl = canvas.toDataURL() // defaults to PNG
dataUrl = canvas.toDataURL('image/png')
dataUrl = canvas.toDataURL('image/jpeg')
dataUrl = canvas.toDataURL('image/jpeg', quality) // quality from 0 to 1
canvas.toDataURL((err, png) => { }) // defaults to PNG
canvas.toDataURL('image/png', (err, png) => { })
canvas.toDataURL('image/jpeg', (err, jpeg) => { }) // sync JPEG is not supported
canvas.toDataURL('image/jpeg', {...opts}, (err, jpeg) => { }) // see Canvas#createJPEGStream for valid options
canvas.toDataURL('image/jpeg', quality, (err, jpeg) => { }) // spec-following; quality from 0 to 1
```

### CanvasRenderingContext2D#patternQuality

> ```
> context.patternQuality: 'fast'|'good'|'best'|'nearest'|'bilinear'
> ```

Defaults to `'good'`. Affects pattern (gradient, image, etc.) rendering quality.

### CanvasRenderingContext2D#quality

> ```
> context.quality: 'fast'|'good'|'best'|'nearest'|'bilinear'
> ```

Defaults to `'good'`. Like `patternQuality`, but applies to transformations affecting more than just patterns.

### CanvasRenderingContext2D#textDrawingMode

> ```
> context.textDrawingMode: 'path'|'glyph'
> ```

Defaults to `'path'`. The effect depends on the canvas type:

- **Standard (image)** `glyph` and `path` both result in rasterized text. Glyph mode is faster than `path`, but may result in lower-quality text, especially when rotated or translated.
- **PDF** `glyph` will embed text instead of  paths into the PDF. This is faster to encode, faster to open with PDF  viewers, yields a smaller file size and makes the text selectable. The  subset of the font needed to render the glyphs will be embedded in the  PDF. This is usually the mode you want to use with PDF canvases.
- **SVG** `glyph` does *not* cause `<text>` elements to be produced as one might expect ([cairo bug](https://gitlab.freedesktop.org/cairo/cairo/issues/253)). Rather, `glyph` will create a `<defs>` section with a `<symbol>` for each glyph, then those glyphs be reused via `<use>` elements. `path` mode creates a `<path>` element for each text string. `glyph` mode is faster and yields a smaller file size.

In `glyph` mode, `ctx.strokeText()` and `ctx.fillText()` behave the same (aside from using the stroke and fill style, respectively).

This property is tracked as part of the canvas state in save/restore.

### CanvasRenderingContext2D#globalCompositeOperation = 'saturate'

In addition to all of the standard global composite operations defined by the Canvas specification, the ['saturate'](https://www.cairographics.org/operators/#saturate) operation is also available.

### CanvasRenderingContext2D#antialias

> ```js
> context.antialias: 'default'|'none'|'gray'|'subpixel'
> ```

Sets the anti-aliasing mode.

## PDF Output Support

node-canvas може створювати документи PDF замість зображень. Тип полотна повинен бути встановлений під час створення полотна наступним чином:

```js
const canvas = createCanvas(200, 500, 'pdf')
```

Потім доступний додатковий метод `.addPage()` для створення багатосторінкових PDF-файлів:

```js
// On first page
ctx.font = '22px Helvetica'
ctx.fillText('Hello World', 50, 80)

ctx.addPage()
// Now on second page
ctx.font = '22px Helvetica'
ctx.fillText('Hello World 2', 50, 80)

canvas.toBuffer() // returns a PDF file
canvas.createPDFStream() // returns a ReadableStream that emits a PDF
// With optional document metadata (requires Cairo 1.16.0):
canvas.toBuffer('application/pdf', {
  title: 'my picture',
  keywords: 'node.js demo cairo',
  creationDate: new Date()
})
```

Також можна створювати сторінки з різними розмірами, передаючи `width` і ` height` методу `.addPage()`:

```js
ctx.font = '22px Helvetica'
ctx.fillText('Hello World', 50, 80)
ctx.addPage(400, 800)

ctx.fillText('Hello World 2', 50, 80)
```

See also:

- [Image#dataMode](https://github.com/Automattic/node-canvas#imagedatamode) for embedding JPEGs in PDFs
- [Canvas#createPDFStream()](https://github.com/Automattic/node-canvas#canvascreatepdfstream) for creating PDF streams
- [CanvasRenderingContext2D#textDrawingMode](https://github.com/Automattic/node-canvas#canvasrenderingcontext2dtextdrawingmode) for embedding text instead of paths

## SVG Output Support

node-canvas can create SVG documents instead of images. The canvas type must be set when creating the canvas as follows:

```js
const canvas = createCanvas(200, 500, 'svg')
// Use the normal primitives.
fs.writeFileSync('out.svg', canvas.toBuffer())
```

## SVG Image Support

Якщо librsvg доступний, коли встановлено node-canvas, node-canvas може візуалізувати зображення SVG у ваш контекст полотна. На даний момент це працює шляхом растеризації зображення SVG (тобто малювання зображення SVG на полотні SVG не збереже дані SVG).

```js
const img = new Image()
img.onload = () => ctx.drawImage(img, 0, 0)
img.onerror = err => { throw err }
img.src = './example.svg'
```

## Image pixel formats (experimental)

node-canvas has experimental support for additional pixel formats, roughly following the [Canvas color space proposal](https://github.com/WICG/canvas-color-space/blob/master/CanvasColorSpaceProposal.md).

```js
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d', { pixelFormat: 'A8' })
```

By default, canvases are created in the `RGBA32` format,  which corresponds to the native HTML Canvas behavior. Each pixel is 32  bits. The JavaScript APIs that involve pixel data (`getImageData`, `putImageData`) store the colors in the order {red, green, blue, alpha} without alpha  pre-multiplication. (The C++ API stores the colors in the order {alpha,  red, green, blue} in native-[endian](https://en.wikipedia.org/wiki/Endianness) ordering, with alpha pre-multiplication.)

These additional pixel formats have experimental support:

- `RGB24` Like `RGBA32`, but the 8 alpha bits are always opaque. This format is always used if the `alpha` context attribute is set to false (i.e. `canvas.getContext('2d', {alpha: false})`). This format can be faster than `RGBA32` because transparency does not need to be calculated.
- `A8` Each pixel is 8 bits. This format can either be used for creating grayscale images (treating each byte as an alpha value),  or for creating indexed PNGs (treating each byte as a palette index)  (see [the example using alpha values with `fillStyle`](https://github.com/Automattic/node-canvas/blob/master/examples/indexed-png-alpha.js) and [the example using `imageData`](https://github.com/Automattic/node-canvas/blob/master/examples/indexed-png-image-data.js)).
- `RGB16_565` Each pixel is 16 bits, with red in the upper 5 bits, green in the middle 6 bits, and blue in the lower 5 bits, in  native platform endianness. Some hardware devices and frame buffers use  this format. Note that PNG does not support this format; when creating a PNG, the image will be converted to 24-bit RGB. This format is thus  suboptimal for generating PNGs. `ImageData` instances for this mode use a `Uint16Array` instead of a `Uint8ClampedArray`.
- `A1` Each pixel is 1 bit, and pixels are packed together  into 32-bit quantities. The ordering of the bits matches the endianness  of the platform: on a little-endian machine, the first pixel is the  least-significant bit. This format can be used for creating single-color images. *Support for this format is incomplete, see note below.*
- `RGB30` Each pixel is 30 bits, with red in the upper 10,  green in the middle 10, and blue in the lower 10. (Requires Cairo 1.12  or later.) *Support for this format is incomplete, see note below.*

Notes and caveats:

- Using a non-default format can affect the behavior of APIs that involve pixel data:
  - `context2d.createImageData` The size of the array  returned depends on the number of bit per pixel for the underlying image data format, per the above descriptions.
  - `context2d.getImageData` The format of the array returned depends on the underlying image mode, per the above descriptions. Be  aware of platform endianness, which can be determined using node.js's [`os.endianness()`](https://nodejs.org/api/os.html#os_os_endianness) function.
  - `context2d.putImageData` As above.
- `A1` and `RGB30` do not yet support `getImageData` or `putImageData`. Have a use case and/or opinion on working with these formats? Open an issue and let us know! (See #935.)
- `A1`, `A8`, `RGB30` and `RGB16_565` with shadow blurs may crash or not render properly.
- The `ImageData(width, height)` and `ImageData(Uint8ClampedArray, width)` constructors assume 4 bytes per pixel. To create an `ImageData` instance with a different number of bytes per pixel, use `new ImageData(new Uint8ClampedArray(size), width, height)` or `new ImageData(new Uint16ClampedArray(size), width, height)`.

## Testing

First make sure you've built the latest version. Get all the deps you need (see [compiling](https://github.com/Automattic/node-canvas#compiling) above), and run:

```js
npm install --build-from-source
```

For visual tests: `npm run test-server` and point your browser to http://localhost:4000.

For unit tests: `npm run test`.

## Benchmarks

Benchmarks live in the `benchmarks` directory.

## Examples

Examples line in the `examples` directory. Most produce a png image of the same name, and others such as *live-clock.js* launch an HTTP server to be viewed in the browser.

