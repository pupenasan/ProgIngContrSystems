# XML Service

Ця служба дозволяє сценаріям аналізувати, навігацію та програмно створювати документи XML.

```js
// Зареєструйте заголовок і мітки для першої сторінки публікацій блогу
// Google's The Keyword blog.
function parseXml() {
  let url = 'https://blog.google/rss/';
  let xml = UrlFetchApp.fetch(url).getContentText();
  let document = XmlService.parse(xml);
  let root = document.getRootElement();

  let channel = root.getChild('channel');
  let items = channel.getChildren('item');
  items.forEach(item => {
    let title = item.getChild('title').getText();
    let categories = item.getChildren('category');
    let labels = categories.map(category => category.getText());
    console.log('%s (%s)', title, labels.join(', '));
  });
}

// Create and log an XML representation of first 10 threads in your Gmail inbox.
function createXml() {
  let root = XmlService.createElement('threads');
  let threads = GmailApp.getInboxThreads()
  threads = threads.slice(0,10); // Just the first 10
  threads.forEach(thread => {
    let child = XmlService.createElement('thread')
        .setAttribute('messageCount', thread.getMessageCount())
        .setAttribute('isUnread', thread.isUnread())
        .setText(thread.getFirstMessageSubject());
    root.addContent(child);
  });
  let document = XmlService.createDocument(root);
  let xml = XmlService.getPrettyFormat().format(document);
  console.log(xml);
}
```

## Classes

| Name                    | Brief description                                            |
| ----------------------- | ------------------------------------------------------------ |
| `Attribute`             | A representation of an XML attribute.                        |
| `Cdata`                 | A representation of an XML `CDATASection` node.              |
| `Comment`               | A representation of an XML `Comment` node.                   |
| `Content`               | A representation of a generic XML node.                      |
| `ContentType`           | An enumeration representing the types of XML content nodes.  |
| `DocType`               | A representation of an XML `DocumentType` node.              |
| `Document`              | Представлення документа XML.                                 |
| `Element`               | A representation of an XML `Element` node.                   |
| `EntityRef`             | A representation of an XML `EntityReference` node.           |
| `Format`                | A formatter for outputting an XML document, with three pre-defined formats that can be further customized. |
| `Namespace`             | A representation of an XML namespace.                        |
| `ProcessingInstruction` | A representation of an XML `ProcessingInstruction` node.     |
| `Text`                  | A representation of an XML `Text` node.                      |
| `XmlService`            | Ця служба дозволяє сценаріям аналізувати, переглядати та програмно створювати документи XML. |

## Class XmlService

Цей сервіс дозволяє сценаріям аналізувати, переглядати та програмно створювати документи XML.

| Property       | Type          | Description                                     |
| -------------- | ------------- | ----------------------------------------------- |
| `ContentTypes` | `ContentType` | Перелік, що представляє типи вузлів вмісту XML. |

### Створення змісту



| Method                                           | Return type | Brief description                                            |
| ------------------------------------------------ | ----------- | ------------------------------------------------------------ |
| `createCdata(text)`                              | `Cdata`     | Creates an unattached `CDATASection` node with the given value. |
| `createComment(text)`                            | `Comment`   | Creates an unattached `Comment` node with the given value.   |
| `createDocType(elementName)`                     | `DocType`   | Creates an unattached `DocumentType` node for the root `Element` node with the given name. |
| `createDocType(elementName, systemId)`           | `DocType`   | Creates an unattached `DocumentType` node for the root `Element` node with the given name, and the given system ID for the external subset data. |
| `createDocType(elementName, publicId, systemId)` | `DocType`   | Creates an unattached `DocumentType` node for the root `Element` node with the given name, and the given public ID and system ID for the external subset data. |
| `createDocument()`                               | `Document`  | Creates an empty XML document.                               |
| `createDocument(rootElement)`                    | `Document`  | Creates an XML document with the given root `Element` node.  |
| `createElement(name)`                            | `Element`   | Creates an unattached `Element` node with the given local name and no namespace. |
| `createElement(name, namespace)`                 | `Element`   | Creates an unattached `Element` node with the given local name and namespace. |
| `createText(text)`                               | `Text`      | Creates an unattached `Text` node with the given value.      |

### Отримання та аналіз змісту

| Method                      | Return type | Brief description                                            |
| --------------------------- | ----------- | ------------------------------------------------------------ |
| `getCompactFormat()`        | `Format`    | Creates a `Format` object for outputting a compact XML document. |
| `getNamespace(uri)`         | `Namespace` | Creates a `Namespace` with the given URI.                    |
| `getNamespace(prefix, uri)` | `Namespace` | Creates a `Namespace` with the given prefix and URI.         |
| `getNoNamespace()`          | `Namespace` | Creates a `Namespace` that represents the absence of a real namespace. |
| `getPrettyFormat()`         | `Format`    | Creates a `Format` object for outputting a human-readable XML document. |
| `getRawFormat()`            | `Format`    | Creates a `Format` object for outputting a raw XML document. |
| `getXmlNamespace()`         | `Namespace` | Creates a `Namespace` with the standard `xml` prefix.        |
| `parse(xml)`                | `Document`  | Створює  `Document`  із поданого XML без перевірки XML.      |

## Class Document

Представлення документа XML.

### Редагування документу

| Method                       | Return type | Brief description                                            |
| ---------------------------- | ----------- | ------------------------------------------------------------ |
| `addContent(content)`        | `Document`  | Appends the given node to the end of the document.           |
| `addContent(index, content)` | `Document`  | Inserts the given node at the given index among all nodes that are immediate children of the document. |
| `cloneContent()`             | `Content[]` | Creates unattached copies of all nodes that are immediate children of the document. |
| `detachRootElement()`        | `Element`   | Detaches and returns the document's root `Element` node.     |
| `removeContent()`            | `Content[]` | Removes all nodes that are immediate children of the document. |
| `removeContent(content)`     | `Boolean`   | Removes the given node, if the node is an immediate child of the document. |
| `removeContent(index)`       | `Content`   | Removes the node at the given index among all nodes that are immediate children of the document. |
| `setDocType(docType)`        | `Document`  | Sets the document's `DocType` declaration.                   |
| `setRootElement(element)`    | `Document`  | Sets the document's root `Element` node.                     |

### Отримання даних з документу

| Method              | Return type | Brief description                                            |
| ------------------- | ----------- | ------------------------------------------------------------ |
| `getAllContent()`   | `Content[]` | Отримує всі вузли, які є безпосередніми дочірніми елементами документа. |
| `getContent(index)` | `Content`   | Отримує вузол із заданим індексом серед усіх вузлів, які є безпосередніми дочірніми елементами документа. |
| `getContentSize()`  | `Integer`   | Отримує кількість вузлів, які є безпосередніми дочірніми елементами документа. |
| `getDescendants()`  | `Content[]` | Отримує всі вузли, які є прямими або опосередкованими дочірніми елементами документа, у тому порядку, в якому вони з’являються в документі. |
| `getDocType()`      | `DocType`   | Отримує декларацію `DocType` документа.                      |
| `getRootElement()`  | `Element`   | Отримує кореневий вузол `Element` документа.                 |
| `hasRootElement()`  | `Boolean`   | Визначає, чи має документ кореневий вузол `Element`.         |

## Class Element        

Представлення вузла XML `Element`.

```js
// Додає значення, перелічені у зразку документа XML, і додає новий елемент із загальною сумою.
var xml = '<things>'
    + '<plates>12</plates>'
    + '<bowls>18</bowls>'
    + '<cups>25</cups>'
    + '</things>';
var document = XmlService.parse(xml);
var root = document.getRootElement();
var items = root.getChildren();
var total = 0;
for (var i = 0; i < items.length; i++) {
  total += Number(items[i].getText());
}
var totalElement = XmlService.createElement('total').setText(total);
root.addContent(totalElement);
xml = XmlService.getPrettyFormat().format(document);
Logger.log(xml);
```

### Редагування

| Method                                      | Return type | Brief description                                            |
| ------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `addContent(content)`                       | `Element`   | Appends the given node as the last child of the `Element` node. |
| `addContent(index, content)`                | `Element`   | Inserts the given node at the given index among all nodes that are immediate children of the `Element` node. |
| `cloneContent()`                            | `Content[]` | Creates unattached copies of all nodes that are immediate children of the {@code Element} node. |
| `detach()`                                  | `Content`   | Detaches the node from its parent `Element` node.            |
| `removeAttribute(attribute)`                | `Boolean`   | Removes the given attribute for this `Element` node, if such an attribute exists. |
| `removeAttribute(attributeName)`            | `Boolean`   | Removes the attribute for this `Element` node with the given name and no namespace, if such an attribute exists. |
| `removeAttribute(attributeName, namespace)` | `Boolean`   | Removes the attribute for this `Element` node with the given name and namespace, if such an attribute exists. |
| `removeContent()`                           | `Content[]` | Removes all nodes that are immediate children of the {@code Element} node. |
| `removeContent(content)`                    | `Boolean`   | Removes the given node, if the node is an immediate child of the {@code Element} node. |
| `removeContent(index)`                      | `Content`   | Removes the node at the given index among all nodes that are immediate children of the {@code Element} node. |
| `setAttribute(attribute)`                   | `Element`   | Sets the given attribute for this `Element` node.            |
| `setAttribute(name, value)`                 | `Element`   | Sets the attribute for this `Element` node with the given name, value, and no namespace. |
| `setAttribute(name, value, namespace)`      | `Element`   | Sets the attribute for this `Element` node with the given name, value, and namespace. |
| `setName(name)`                             | `Element`   | Sets the local name of the `Element` node.                   |
| `setNamespace(namespace)`                   | `Element`   | Sets the namespace for the `Element` node.                   |
| `setText(text)`                             | `Element`   | Sets the text value of the `Element` node.                   |

### Перегляд

| Method                          | Return type   | Brief description                                            |
| ------------------------------- | ------------- | ------------------------------------------------------------ |
| `getAllContent()`               | `Content[]`   | Gets all nodes that are immediate children of the {@code Element} node. |
| `getAttribute(name)`            | `Attribute`   | Gets the attribute for this `Element` node with the given name and no namespace. |
| `getAttribute(name, namespace)` | `Attribute`   | Gets the attribute for this `Element` node with the given name and namespace. |
| `getAttributes()`               | `Attribute[]` | Gets all attributes for this `Element` node, in the order they appear in the document. |
| `getChild(name)`                | `Element`     | Gets the first `Element` node with the given name and no namespace that is an immediate child of this `Element` node. |
| `getChild(name, namespace)`     | `Element`     | Gets the first `Element` node with the given name and namespace that is an immediate child of this `Element` node. |
| `getChildText(name)`            | `String`      | Gets the text value of the node with the given name and no namespace, if the node is an immediate child of the `Element` node. |
| `getChildText(name, namespace)` | `String`      | Gets the text value of the node with the given name and namespace, if the node is an immediate child of the `Element` node. |
| `getChildren()`                 | `Element[]    | Отримує всі вузли `Element`, які є безпосередніми дочірніми елементами цього вузла `Element`, у тому порядку, в якому вони відображаються в документі. |
| `getChildren(name)`             | `Element[]`   | Отримує всі вузли `Element` із заданим іменем і без простору імен, які є безпосередніми дочірніми елементами цього вузла `Element`, у тому порядку, в якому вони відображаються в документі. |
| `getChildren(name, namespace)`  | `Element[]`   | Gets all `Element` nodes with the given name and namespace that are immediate children of this `Element` node, in the order they appear in the document. |
| `getContent(index)`             | `Content`     | Gets the node at the given index among all nodes that are immediate children of the {@code Element} node. |
| `getContentSize()`              | `Integer`     | Gets the number of nodes that are immediate children of the {@code Element} node. |
| `getDescendants()`              | `Content[]`   | Gets all nodes that are direct or indirect children of the {@code Element} node, in the order they appear in the document. |
| `getDocument()`                 | `Document`    | Gets the XML document that contains the {@code Element} node. |
| `getName()`                     | `String`      | Gets the local name of the `Element` node.                   |
| `getNamespace()`                | `Namespace`   | Gets the namespace for the `Element` node.                   |
| `getNamespace(prefix)`          | `Namespace`   | Gets the namespace with the given prefix for the `Element` node. |
| `getParentElement()`            | `Element`     | Gets the node's parent `Element` node.                       |
| `getQualifiedName()`            | `String`      | Gets the local name and namespace prefix of the `Element` node, in the form `[namespacePrefix]:[localName]`. |
| `getText()`                     | `String`      | Gets the text value of the `Element` node.                   |
| `getValue()`                    | `String`      | Отримує текстове значення всіх вузлів, які є прямими або опосередкованими дочірніми елементами вузла, у тому порядку, в якому вони відображаються в документі. |
| `isAncestorOf(other)`           | `Boolean`     | Determines whether this `Element` node is a direct or indirect parent of a given `Element` node. |
| `isRootElement()`               | `Boolean`     | Determines whether the `Element` node is the document's root node. |

## Interface Content

Представлення загального вузла XML.

| Name                    | Brief description                                        |
| ----------------------- | -------------------------------------------------------- |
| `Cdata`                 | A representation of an XML `CDATASection` node.          |
| `Comment`               | A representation of an XML `Comment` node.               |
| `DocType`               | A representation of an XML `DocumentType` node.          |
| `Element`               | A representation of an XML `Element` node.               |
| `EntityRef`             | A representation of an XML `EntityReference` node.       |
| `ProcessingInstruction` | A representation of an XML `ProcessingInstruction` node. |
| `Text`                  | A representation of an XML `Text` node.                  |



| Method                      | Return type             | Brief description                                            |
| --------------------------- | ----------------------- | ------------------------------------------------------------ |
| `asCdata()`                 | `Cdata`                 | Casts the node as a `CDATASection` node for the purposes of autocomplete. |
| `asComment()`               | `Comment`               | Casts the node as a `Comment` node for the purposes of autocomplete. |
| `asDocType()`               | `DocType`               | Casts the node as a `DocumentType` node for the purposes of autocomplete. |
| `asElement()`               | `Element`               | Casts the node as an `Element` node for the purposes of autocomplete. |
| `asEntityRef()`             | `EntityRef`             | Casts the node as a `EntityReference` node for the purposes of autocomplete. |
| `asProcessingInstruction()` | `ProcessingInstruction` | Casts the node as a `ProcessingInstruction` node for the purposes of autocomplete. |
| `asText()`                  | `Text`                  | Casts the node as a `Text` node for the purposes of autocomplete. |
| `detach()`                  | `Content`               | Detaches the node from its parent `Element` node.            |
| `getParentElement()`        | `Element`               | Gets the node's parent `Element` node.                       |
| `getType()`                 | `ContentType`           | Gets the node's content type.                                |
| `getValue()`                | `String`                | Gets the text value of all nodes that are direct or indirect children of the node, in the order they appear in the document. |

