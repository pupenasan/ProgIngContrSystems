# pdfjs-dist

https://github.com/MeiKatz/pdfjs-docs

https://github.com/mozilla/pdfjs-dist

https://github.com/mozilla/pdf.js/blob/master/src/display/api.js

https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib.html

https://mozilla.github.io/pdf.js/examples/index.html#interactive-examples

https://mozilla.github.io/pdf.js/getting_started/

## Модуль pdfjsLib

Класи:

- [PDFDataRangeTransport](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDataRangeTransport.html)
- [PDFDocumentLoadingTask](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentLoadingTask.html)
- [PDFDocumentProxy](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentProxy.html)
- [PDFObjects](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFObjects.html)
- [PDFPageProxy](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFPageProxy.html)
- [PDFWorker](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFWorker.html)
- [RenderTask](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-RenderTask.html)

### Метод getDocument

```
getDocument(src)
```

Це основна точка входу для завантаження PDF-файлу та взаємодії з ним. ПРИМІТКА. Якщо для отримання PDF-даних використовується URL-адреса, використовується стандартний виклик Fetch API (або XHR як запасний), що означає, що він має відповідати тим самим правилам походження, напр. жодних міждоменних запитів без CORS.

| Name  | Type                                                         | Description                                                  |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `src` | string \| URL \| TypedArray \| ArrayBuffer \| DocumentInitParameters | Це може бути URL-адреса, за якою знаходиться файл PDF, введений масив (Uint8Array), уже заповнений даними, або об’єкт параметра. |

Повертає PDFDocumentLoadingTask     

```js
var loadingTask = pdfjsLib.getDocument('helloworld.pdf');
loadingTask.promise.then(function(pdf) {
  // далі використовуати *pdf* як PDFDocumentProxy
});
```



## Class: PDFDocumentLoadingTask

Завдання завантаження контролює операції, необхідні для завантаження PDF-документа (наприклад, мережеві запити), і забезпечує спосіб прослуховування завершення, після чого окремі сторінки можуть бути відтворені. У результаті завантаження доступний PDFDocumentProxy

## Class: PDFDocumentProxy

### Властивості

| Властивість       | Тип                             | Опис                                                         |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| allXfaHtml        | Object/null                     | This is (mostly) intended to support printing of XFA forms.  |
| annotationStorage | AnnotationStorage               | Storage for annotation data in forms.                        |
| filterFactory     | Object                          | The filter factory instance.                                 |
| fingerprints      | Array:.<string:, (string:null:) | A (not guaranteed to be) unique ID to  identify the PDF document.   NOTE: The first element will always be defined for all PDF documents,   whereas the second element is only defined for *modified* PDF documents. |
| isPureXfa         | boolean                         | True if only XFA form.                                       |
| loadingParams     | DocumentInitParameters          | A subset of the current  {DocumentInitParameters}, which are needed in the viewer. |
| loadingTask       | PDFDocumentLoadingTask          | The loadingTask for the current document.                    |
| numPages          | number                          | Total number of pages in the PDF file.                       |
|                   |                                 |                                                              |

### Methods

#### cleanup

```
cleanup(keepLoadedFontsopt) → {Promise}
```

​    Cleans up resources allocated by the document on both the main and worker threads. NOTE: Do not, under any circumstances, call this method when rendering is currently ongoing since that may lead to rendering errors.

| Name              | Type    | Attributes | Default | Description                                                  |
| ----------------- | ------- | ---------- | ------- | ------------------------------------------------------------ |
| `keepLoadedFonts` | boolean | <optional> | false   | Let fonts remain attached to the DOM.  NOTE: This will increase persistent memory usage, hence don't use this  option unless absolutely necessary. The default value is `false`. |

Returns:

​    A promise that is resolved when clean-up has finished.

- ​        Type    

  ​         Promise     

#### destroy

```
destroy()
```

Destroys the current document instance and terminates the worker.

#### getAttachments

```
getAttachments() → {Promise:.<any:>}
```

Returns:

​    A promise that is resolved with a lookup table  for mapping named attachments to their content.

- ​        Type    

  ​         Promise:.<any:>     

#### getCalculationOrderIds

```
getCalculationOrderIds() → {Promise:.<(Array:.<string:>|null:)>}
```

Returns:

​    A promise that is resolved with an  {Array} containing IDs of annotations that have a calculation  action, or `null` when no such annotations are present in the PDF file.

- ​        Type    

  ​         Promise:.<(Array:.<string:>|null:)>     

#### getData

```
getData() → {Promise:.<Uint8Array:>}
```

Returns:

​    A promise that is resolved with a  {Uint8Array} containing the raw data of the PDF document.

- ​        Type    

  ​         Promise:.<Uint8Array:>     

#### getDestination

```
getDestination(id) → {Promise:.<(Array:.<any:>|null:)>}
```

Parameters:

| Name | Type   | Description                   |
| ---- | ------ | ----------------------------- |
| `id` | string | The named destination to get. |

Returns:

​    A promise that is resolved with all  information of the given named destination, or `null` when the named  destination is not present in the PDF file.

- ​        Type    

  ​         Promise:.<(Array:.<any:>|null:)>     

#### getDestinations

```
getDestinations() → {Promise:.<Object:.<string:, Array:.<any:>>>} 
```

Returns:

​    A promise that is resolved  with a mapping from named destinations to references. This can be slow for large documents. Use `getDestination` instead.

- ​        Type    

  ​         Promise:.<Object:.<string:, Array:.<any:>>>     

#### getDownloadInfo

```
getDownloadInfo() → {Promise:.<{length:: number:}>}
```

Returns:

​    A promise that is resolved when the  document's data is loaded. It is resolved with an {Object} that contains  the `length` property that indicates size of the PDF data in bytes.

- ​        Type    

  ​         Promise:.<{length:: number:}>     

#### getFieldObjects

```
getFieldObjects() → {Promise:.<(Object:.<string:, Array:.<Object:>>|null:)>}
```

Returns:

​    A promise that is  resolved with an {Object} containing /AcroForm field data for the JS  sandbox, or `null` when no field data is present in the PDF file.

- ​        Type    

  ​         Promise:.<(Object:.<string:, Array:.<Object:>>|null:)>     

#### getJSActions

```
getJSActions() → {Promise:.<(Object:|null:)>}  
```

Returns:

​    A promise that is resolved with  an {Object} with the JavaScript actions:    - from the name tree (like getJavaScript);    - from A or AA entries in the catalog dictionary.  , or `null` if no JavaScript exists.

- ​        Type    

  ​         Promise:.<(Object:|null:)>     

#### getJavaScript

```
getJavaScript() → {Promise:.<(Array:.<string:>|null:)>}
```

Returns:

​    A promise that is resolved with  an {Array} of all the JavaScript strings in the name tree, or `null`  if no JavaScript exists.

- ​        Type    

  ​         Promise:.<(Array:.<string:>|null:)>     

#### getMarkInfo

```
getMarkInfo() → {Promise:.<(MarkInfo:|null:)>}
```

Returns:

​    A promise that is resolved with  a {MarkInfo} object that contains the MarkInfo flags for the PDF  document, or `null` when no MarkInfo values are present in the PDF file.

- ​        Type    

  ​         Promise:.<(MarkInfo:|null:)>     

#### getMetadata

```
getMetadata() → {Promise:.<{info:: Object:, metadata:: Metadata:}>}   
```

Returns:

​    A promise that is  resolved with an {Object} that has `info` and `metadata` properties.  `info` is an {Object} filled with anything available in the information  dictionary and similarly `metadata` is a {Metadata} object with  information from the metadata section of the PDF.

- ​        Type    

  ​         Promise:.<{info:: Object:, metadata:: Metadata:}>     

#### getOpenAction

```
getOpenAction() → {Promise:.<(any:|null:)>} 
```

Returns:

​    A promise that is resolved with an {Array}  containing the destination, or `null` when no open action is present  in the PDF.

- ​        Type    

  ​         Promise:.<(any:|null:)>     

#### getOptionalContentConfig

```
getOptionalContentConfig() → {Promise:.<OptionalContentConfig:>}
```

Returns:

​    A promise that is resolved with  an OptionalContentConfig that contains all the optional content  groups (assuming that the document has any).

- ​        Type    

  ​         Promise:.<OptionalContentConfig:>     

#### getOutline

```
getOutline() → {Promise:.<Array:.<OutlineNode:>>} 
```

Returns:

​    A promise that is resolved with an  {Array} that is a tree outline (if it has one) of the PDF file.

- ​        Type    

  ​         Promise:.<Array:.<OutlineNode:>>     

#### getPage

```
getPage(pageNumber) → {Promise:.<PDFPageProxy:>}
```

Parameters:

| Name         | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| `pageNumber` | number | The page number to get. The first page is 1. |

Returns:

​    A promise that is resolved with  a PDFPageProxy object.

- ​        Type    

  ​         Promise:.<PDFPageProxy:>     

```js
  const pdf = await pdfjs.getDocument(data).promise;
  const page = await pdf.getPage(19);
```



#### getPageIndex

```
getPageIndex(ref) → {Promise:.<number:>}
```

Parameters:

| Name  | Type     | Description         |
| ----- | -------- | ------------------- |
| `ref` | RefProxy | The page reference. |

Returns:

​    A promise that is resolved with the page index,  starting from zero, that is associated with the reference.

- ​        Type    

  ​         Promise:.<number:>     

#### getPageLabels

```
getPageLabels() → {Promise:.<(Array:.<string:>|null:)>}
```

Returns:

​    A promise that is resolved with  an {Array} containing the page labels that correspond to the page  indexes, or `null` when no page labels are present in the PDF file.

- ​        Type    

  ​         Promise:.<(Array:.<string:>|null:)>     

#### getPageLayout

```
getPageLayout() → {Promise:.<string:>}
```

Returns:

​    A promise that is resolved with a {string}  containing the page layout name.

- ​        Type    

  ​         Promise:.<string:>     

#### getPageMode

```
getPageMode() → {Promise:.<string:>}
```

Returns:

​    A promise that is resolved with a {string}  containing the page mode name.

- ​        Type    

  ​         Promise:.<string:>     

#### getPermissions

```
getPermissions() → {Promise:.<(Array:.<number:>|null:)>}
```

Returns:

​    A promise that is resolved with  an {Array} that contains the permission flags for the PDF document, or  `null` when no permissions are present in the PDF file.

- ​        Type    

  ​         Promise:.<(Array:.<number:>|null:)>     

#### getViewerPreferences   

```
getViewerPreferences() → {Promise:.<(Object:|null:)>}   
```

Returns:

​    A promise that is resolved with an  {Object} containing the viewer preferences, or `null` when no viewer  preferences are present in the PDF file.

- ​        Type    

  ​         Promise:.<(Object:|null:)>     

#### hasJSActions

```
hasJSActions() → {Promise:.<boolean:>}
```

Returns:

​    A promise that is resolved with `true`  if some /AcroForm fields have JavaScript actions.

- ​        Type    

  ​         Promise:.<boolean:>     

#### saveDocument 

```
saveDocument() → {Promise:.<Uint8Array:>} 
```

Returns:

​    A promise that is resolved with a  {Uint8Array} containing the full data of the saved document.

- ​        Type    

  ​         Promise:.<Uint8Array:>     

## Class: PDFPageProxy

Proxy to a `PDFPage` in the worker thread.

```
new PDFPageProxy() 
```

### Members

| Властивість   | Тип              | Опис                                                         |
| ------------- | ---------------- | ------------------------------------------------------------ |
| commonObjs    | PDFObjects       |                                                              |
| filterFactory | Object           | The filter factory instance.                                 |
| isPureXfa     | boolean          | True if only XFA form.                                       |
| pageNumber    | number           | Page number of the page. First page is 1.                    |
| ref           | RefProxy/null    | The reference that points to this page.                      |
| rotate        | number           | The number of degrees the page is rotated clockwise.         |
| stats         | StatTimer\|null  | Returns page stats, if enabled; returns `null`  otherwise.   |
| userUnit      | number           | The default size of units in 1/72nds of an inch.             |
| view          | Array:.<number:> | An array of the visible portion of the PDF page in  user space units [x1, y1, x2, y2]. |
|               |                  |                                                              |

### Властивості 

-   `_pageIndex`,
-   `_pageInfo`,
-   `_transport`,
-   `_stats`,
-   `_pdfBug`,
-   `commonObjs`,
- `objs` - доступ до обєктів [PDFObjects](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFObjects.html)
- `_maybeCleanupAfterRender`,
-   `_intentStates`,
-   `destroyed`

### Властивості прототипу

  'constructor',        'pageNumber',
  'rotate',             'ref',
  'userUnit',           'view',
  'getViewport',        'getAnnotations',
  'getJSActions',       'filterFactory',
  'isPureXfa',          'getXfa',
  'render',             'getOperatorList',
  'streamTextContent',  'getTextContent',
  'getStructTree',      '_destroy',
  'cleanup',            '_startRenderPage',
  '_renderPageChunk',   '_pumpOperatorList',
  '_abortOperatorList', 'stats'

### Methods

#### (delayedopt)

```
(delayedopt) → {boolean}
```

Attempts to clean up if rendering is in a state where that's possible.

Parameters:

| Name      | Type    | Attributes | Default | Description                                                  |
| --------- | ------- | ---------- | ------- | ------------------------------------------------------------ |
| `delayed` | boolean | <optional> | false   | Delay the cleanup, to e.g. improve zooming  performance in documents with large images.  The default value is `false`. |

Returns:

​    Indicates if clean-up was successfully run.

- ​        Type    

  ​         boolean     

#### cleanup

```
cleanup(resetStatsopt) → {boolean}
```

​    Cleans up resources allocated by the page.

Parameters:

| Name         | Type    | Attributes | Default | Description                                                  |
| ------------ | ------- | ---------- | ------- | ------------------------------------------------------------ |
| `resetStats` | boolean | <optional> | false   | Reset page stats, if enabled.  The default value is `false`. |

Returns:

​    Indicates if clean-up was successfully run.

- ​        Type    

  ​         boolean     

#### getAnnotations

```
getAnnotations(params) → {Promise:.<Array:.<any:>>}
```

Parameters:

| Name     | Type                     | Description            |
| -------- | ------------------------ | ---------------------- |
| `params` | GetAnnotationsParameters | Annotation parameters. |

Returns:

​    A promise that is resolved with an  {Array} of the annotation objects.

- ​        Type    

  ​         Promise:.<Array:.<any:>>     

#### getJSActions

```
getJSActions() → {Promise:.<Object:>}
```

Returns:

​    A promise that is resolved with an  {Object} with JS actions.

- ​        Type    

  ​         Promise:.<Object:>     

#### getOperatorList

```
getOperatorList(params) → {Promise:.<PDFOperatorList:>}
```

Parameters:

| Name     | Type                      | Description                       |
| -------- | ------------------------- | --------------------------------- |
| `params` | GetOperatorListParameters | Page getOperatorList  parameters. |

Returns:

A promise resolved with an  PDFOperatorList object that represents the page's operator list.

- ​        Type    

  ​         Promise:.<PDFOperatorList:>     

#### getStructTree

```
getStructTree() → {Promise:.<StructTreeNode:>}
```

Returns:

​    A promise that is resolved with a  StructTreeNode object that represents the page's structure tree,  or `null` when no structure tree is present for the current page.

- ​        Type    

  ​         Promise:.<StructTreeNode:>     

#### getTextContent

```
getTextContent(params) → {Promise:.<TextContent:>}
```

ПРИМІТКА. Усі випадки пробілів буде замінено стандартними пробілами (0x20).

Parameters:

| Name     | Type                     | Description                |
| -------- | ------------------------ | -------------------------- |
| `params` | getTextContentParameters | getTextContent parameters. |

Returns:

​    A promise that is resolved with a TextContent object that represents the page's text content.

- ​        Type    

  ​         Promise:.<TextContent:>     

#### getViewport

```
getViewport(params) → {PageViewport}
```

Parameters:

| Name     | Type                  | Description          |
| -------- | --------------------- | -------------------- |
| `params` | GetViewportParameters | Viewport parameters. |

Returns:

​    Contains 'width' and 'height' properties  along with transforms required for rendering.

- ​        Type    

  ​         PageViewport     

#### (async) getXfa

```
(async) getXfa() → {Promise:.<(Object:|null:)>}
```

Returns:

A promise that is resolved with  an {Object} with a fake DOM object (a tree structure where elements  are {Object} with a name, attributes (class, style, ...), value and  children, very similar to a HTML DOM tree), or `null` if no XFA exists.

- ​        Type    

  ​         Promise:.<(Object:|null:)>     

#### render

```
render(params) → {RenderTask}
```

Begins the process of rendering a page to the desired context.

Parameters:

| Name     | Type             | Description             |
| -------- | ---------------- | ----------------------- |
| `params` | RenderParameters | Page render parameters. |

Returns:

​    An object that contains a promise that is  resolved when the page finishes rendering.

- ​        Type    

  ​         RenderTask     

#### streamTextContent

```
streamTextContent(params) → {ReadableStream}
```

NOTE: All occurrences of whitespace will be replaced by standard spaces (0x20).

Parameters:

| Name     | Type                     | Description                |
| -------- | ------------------------ | -------------------------- |
| `params` | getTextContentParameters | getTextContent parameters. |

Returns:

​    Stream for reading text content chunks.

- ​        Type    

  ​         ReadableStream     

## PDFOperatorList

Оператори на сторінці

| Властивість    | Тип  | Опис                                                         |
| -------------- | ---- | ------------------------------------------------------------ |
| fnArray        |      | масив [типів операторів](https://github.com/MeiKatz/pdfjs-docs#66-paintxobject-do) |
| argsArray      |      | масив аргументів операторів                                  |
| lastChunk      |      |                                                              |
| separateAnnots |      |                                                              |

Перілк типів операторів тут -  https://github.com/MeiKatz/pdfjs-docs#66-paintxobject-do

```
const OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91
};
```



## PDFObjects

### Methods

#### (objId) 

```
(objId) → {Object}
```

​    Ensures there is an object defined for `objId`.

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| `objId` | string |             |

Returns:

- ​        Type    

  ​         Object     

#### get

```
get(objId, callbackopt) → {any}
```

Якщо викликати *без* зворотного виклику, це повертає дані `objId`, але об’єкт потрібно розв’язати. Якщо ні, цей метод викидає. Якщо викликається *з* зворотним викликом, зворотний виклик викликається з даними об’єкта, коли об’єкт розпізнається. Це означає, що якщо ви викликаєте цей метод, а об’єкт уже вирішено, зворотний виклик викликається негайно.

Parameters:

| Name       | Type     | Attributes   | Default | Description |
| ---------- | -------- | ------------ | ------- | ----------- |
| `objId`    | string   |              |         |             |
| `callback` | function | `<optional>` | null    |             |

 Returns:

- ​        Type    

  ​         any     

#### has

```
has(objId) → {boolean}
```

Parameters:

| Name    | Type   | Description |
| ------- | ------ | ----------- |
| `objId` | string |             |

Returns:

- ​        Type    

  ​         boolean     

#### resolve

```
resolve(objId, dataopt)
```

Resolves the object `objId` with optional `data`.

##### Parameters:

| Name    | Type   | Attributes | Default | Description |
| ------- | ------ | ---------- | ------- | ----------- |
| `objId` | string |            |         |             |
| `data`  | any    | <optional> | null    |             |

## pdf.js Exports

#### CanvasGraphics



#### AbortException

```
 enumerable: true,
 get: function () {
  return _util.AbortException;
 }
```



#### AnnotationEditorLayer

```
 enumerable: true,
 get: function () {
  return _annotation_editor_layer.AnnotationEditorLayer;
 }
```



#### AnnotationEditorParamsType

 enumerable: true,

 get: function () {

  return _util.AnnotationEditorParamsType;

 }



#### AnnotationEditorType

 enumerable: true,

 get: function () {

  return _util.AnnotationEditorType;

 }



#### AnnotationEditorUIManager

 enumerable: true,

 get: function () {

  return _tools.AnnotationEditorUIManager;

 }



#### AnnotationLayer

 enumerable: true,

 get: function () {

  return _annotation_layer.AnnotationLayer;

 }



#### AnnotationMode

 enumerable: true,

 get: function () {

  return _util.AnnotationMode;

 }



#### CMapCompressionType

 enumerable: true,

 get: function () {

  return _util.CMapCompressionType;

 }



#### FeatureTest

 enumerable: true,

 get: function () {

  return _util.FeatureTest;

 }



#### GlobalWorkerOptions

 enumerable: true,

 get: function () {

  return _worker_options.GlobalWorkerOptions;

 }



#### ImageKind

```
 enumerable: true,
 get: function () {
  return _util.ImageKind;
 }
```



#### InvalidPDFException

 enumerable: true,

 get: function () {

  return _util.InvalidPDFException;

 }



#### MissingPDFException

 enumerable: true,

 get: function () {

  return _util.MissingPDFException;

 }



#### OPS

 enumerable: true,

 get: function () {

  return _util.OPS;

 }



#### PDFDataRangeTransport

 enumerable: true,

 get: function () {

  return _api.PDFDataRangeTransport;

 }



#### PDFDateString

 enumerable: true,

 get: function () {

  return _display_utils.PDFDateString;

 }



#### PDFWorker

 enumerable: true,

 get: function () {

  return _api.PDFWorker;

 }



#### PasswordResponses

 enumerable: true,

 get: function () {

  return _util.PasswordResponses;

 }



#### PermissionFlag

 enumerable: true,

 get: function () {

  return _util.PermissionFlag;

 }



#### PixelsPerInch

 enumerable: true,

 get: function () {

  return _display_utils.PixelsPerInch;

 }



#### PromiseCapability

 enumerable: true,

 get: function () {

  return _util.PromiseCapability;

 }



#### RenderingCancelledException

 enumerable: true,

 get: function () {

  return _display_utils.RenderingCancelledException;

 }

exports.SVGGraphics = void 0;

#### UnexpectedResponseException

 enumerable: true,

 get: function () {

  return _util.UnexpectedResponseException;

 }



#### Util

 enumerable: true,

 get: function () {

  return _util.Util;

 }



#### VerbosityLevel

 enumerable: true,

 get: function () {

  return _util.VerbosityLevel;

 }



#### XfaLayer

 enumerable: true,

 get: function () {

  return _xfa_layer.XfaLayer;

 }



#### build

 enumerable: true,

 get: function () {

  return _api.build;

 }



#### createValidAbsoluteUrl

 enumerable: true,

 get: function () {

  return _util.createValidAbsoluteUrl;

 }



#### getDocument

```
 enumerable: true,
 get: function () {
  return _api.getDocument;
 }
```

#### getFilenameFromUrl

```
 enumerable: true,
 get: function () {
  return _display_utils.getFilenameFromUrl;
 }
```



#### getPdfFilenameFromUrl

 enumerable: true,

 get: function () {

  return _display_utils.getPdfFilenameFromUrl;

 }



#### getXfaPageViewport

 enumerable: true,

 get: function () {

  return _display_utils.getXfaPageViewport;

 }



#### isDataScheme

 enumerable: true,

 get: function () {

  return _display_utils.isDataScheme;

 }



#### isPdfFile

 enumerable: true,

 get: function () {

  return _display_utils.isPdfFile;

 }



#### loadScript

 enumerable: true,

 get: function () {

  return _display_utils.loadScript;

 }



#### normalizeUnicode

 enumerable: true,

 get: function () {

  return _util.normalizeUnicode;

 }



#### renderTextLayer

 enumerable: true,

 get: function () {

  return _text_layer.renderTextLayer;

 }



#### setLayerDimensions

 enumerable: true,

 get: function () {

  return _display_utils.setLayerDimensions;

 }



#### shadow

 enumerable: true,

 get: function () {

  return _util.shadow;

 }



#### updateTextLayer

 enumerable: true,

 get: function () {

  return _text_layer.updateTextLayer;

 }



#### version

 enumerable: true,

 get: function () {

  return _api.version;

 }



var _util = __w_pdfjs_require__(1);

var _api = __w_pdfjs_require__(2);

var _display_utils = __w_pdfjs_require__(6);

var _text_layer = __w_pdfjs_require__(26);

var _annotation_editor_layer = __w_pdfjs_require__(27);

var _tools = __w_pdfjs_require__(5);

var _annotation_layer = __w_pdfjs_require__(29);

var _worker_options = __w_pdfjs_require__(14);

var _xfa_layer = __w_pdfjs_require__(31);

const pdfjsVersion = '3.8.162';

const pdfjsBuild = '2c74323e3';

const SVGGraphics = (__w_pdfjs_require__(34).SVGGraphics);

exports.SVGGraphics = SVGGraphics;

})();

## Вибірка рисунків

https://stackoverflow.com/questions/18680261/extract-images-from-pdf-file-with-javascript
