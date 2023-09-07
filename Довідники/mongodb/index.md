# Create an Atlas Search Index

https://www.mongodb.com/docs/atlas/atlas-search/create-index/

Atlas Search index is a data structure that categorizes data in an easily searchable format. It is a mapping between terms and the documents that contain those terms. Atlas Search indexes enable faster retrieval of documents using certain identifiers. You must configure an Atlas Search index to query data in your Atlas cluster using Atlas Search.

You can create an Atlas Search index on a single field or on multiple fields. We recommend that you index the fields that you regularly use to sort or filter your data in order to quickly retrieve the documents that contain the relevant data at query-time.

You can create an Atlas Search index for all collections except [time series](https://www.mongodb.com/docs/manual/core/timeseries-collections/) collections on your Atlas cluster through the Atlas UI, [API](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#operation/createAtlasSearchIndex), [Atlas CLI](https://www.mongodb.com/docs/atlas/cli/stable/command/atlas-clusters-search-indexes-create/), and [Terraform.](https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/search_index)

Індекс Atlas Search — це структура даних, яка класифікує дані у зручному для пошуку форматі. Це відображення між термінами та документами, які містять ці терміни. Індекси Atlas Search дозволяють швидше шукати документи за допомогою певних ідентифікаторів. Ви повинні налаштувати індекс Atlas Search для запиту даних у вашому кластері Atlas за допомогою Atlas Search.

Ви можете створити індекс Atlas Search для одного поля або кількох полів. Ми рекомендуємо вам індексувати поля, які ви регулярно використовуєте для сортування або фільтрації даних, щоб швидко отримати документи, які містять відповідні дані під час запиту.

Ви можете створити індекс Atlas Search для всіх колекцій, окрім колекцій [часових рядів](https://www.mongodb.com/docs/manual/core/timeseries-collections/) у своєму кластері Atlas за допомогою інтерфейсу користувача Atlas, [API](https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#operation/createAtlasSearchIndex), [Atlas CLI](https://www.mongodb.com/docs/atlas/ cli/stable/command/atlas-clusters-search-indexes-create/) і [Terraform.](https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/search_index)