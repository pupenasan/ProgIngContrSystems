https://developers.google.com/apps-script/guides/menus

## Custom menus in Google Docs, Sheets, Slides, or Forms

![img](https://developers.google.com/static/apps-script/images/menus.png)

Apps Script can add new menus in Google Docs, Sheets, Slides, or Forms, with each menu item tied to a function in a script. (In Google Forms, custom menus are visible only to an editor who opens the form to modify it, not to a user who opens the form to respond.)

A script can only create a menu if it is [bound](https://developers.google.com/apps-script/scripts_containers) to the document, spreadsheet, or form. To display the menu when the user opens a file, write the menu code within an [`onOpen()`](https://developers.google.com/apps-script/understanding_triggers) function.

The example below shows how to add a [menu](https://developers.google.com/apps-script/reference/base/menu) with one item, followed by a [visual separator](https://developers.google.com/apps-script/reference/base/menu#addSeparator()), then a [sub-menu](https://developers.google.com/apps-script/reference/base/menu#addSubMenu(Menu)) that contains another item. (Note that in Google Sheets, unless you're using the [new version](https://support.google.com/drive/answer/3541068), you must use the [`addMenu()`](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#addMenu(String,Object)) syntax instead, and sub-menus are not possible.) When the user selects either menu item, a corresponding function opens an [alert](https://developers.google.com/apps-script/reference/base/ui#alert(String)) dialog. For more information on the types of dialogs you can open, see the [guide to dialogs and sidebars](https://developers.google.com/apps-script/guides/dialogs).

```
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Custom Menu')
      .addItem('First item', 'menuItem1')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Second item', 'menuItem2'))
      .addToUi();
}

function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the first menu item!');
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked the second menu item!');
}
```

A document, spreadsheet, presentation, or form can only contain one menu with a given name. If the same script or another script adds a menu with the same name, the new menu replaces the old. Menus cannot be removed while the file is open, although you can write your `onOpen()` function to skip the menu in the future if a certain [property](https://developers.google.com/apps-script/guides/properties) is set.

**Note:** [Editor add-ons](https://developers.google.com/workspace/add-ons/concepts/types#editor_add-ons) can have menu items as well, but use [special rules](https://developers.google.com/workspace/add-ons/concepts/menus) they are defined.

## Clickable images and drawings in Google Sheets

![img](https://developers.google.com/static/apps-script/images/drawing.png)

You can also assign an Apps Script function to an image or drawing in Google Sheets, so long as the script is [bound](https://developers.google.com/apps-script/scripts_containers) to the spreadsheet. The example below shows how to set this up.

1. In Google Sheets, select the menu item **Extensions** > **Apps Script** to create a script that is bound to the spreadsheet.
2. Delete any code in the script editor and paste in the code below.

```
function showMessageBox() {
Browser.msgBox('You clicked it!');
}
```

Return to Sheets and insert an image or drawing by selecting **Insert > Image** or **Insert > Drawing**.

After inserting the image or drawing, click it. A small drop-down menu selector will appear in the top right-hand corner. Click it and choose **Assign script**.

In the dialog box that appears, type the name of the Apps Script function that you want to run, without parentheses — in this case, `showMessageBox`. Click **OK**.

Click the image or drawing again. The function will now execute.