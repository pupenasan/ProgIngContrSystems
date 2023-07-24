https://github.com/lalalic/docx4js

```js
const docx4js = require ("docx4js");

docx4js.Document.load("1.docx").then(docx=>{
	console.log (docx);
})
```

## Властивості docx4js

https://github.com/lalalic/docx4js/blob/master/lib/index.js

```js
[        
  'docx',
  'pptx',
  'xlsx',
  'drawml',
  'Part',
  'Document',
  'OfficeDocument',
  'default'
]
```

## Властивості Document

https://github.com/lalalic/docx4js/blob/master/lib/openxml/document.js

```js
length -
name -
prototype - 
OfficeDocument -  
```

## Властивості Part/OfficeDocument

https://github.com/lalalic/docx4js/blob/master/lib/openxml/part.js



## Властивості docx

https://github.com/lalalic/docx4js/blob/master/lib/openxml/docx/document.js

```
OfficeDocument =  require("./officeDocument");
ext  = "docx";
mime "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
```

