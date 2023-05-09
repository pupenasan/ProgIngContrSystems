# Properties, Actions, and Events

https://developer.tuya.com/en/docs/iot/device_model?id=Kbt4gcmizz8f4

Хмарна модель даних речей описує функції, визначені для конкретного пристрою в термінах властивості, дії та події.

У цій темі описано, як пристрій і хмара обмінюються даними щодо цих трьох моделей взаємодії, а також теми та структури даних, які використовуються. Щоб отримати додаткові відомості, перегляньте [означення функції](https://developer.tuya.com/en/docs/iot/Function-Definition?id=Kb4qgfeeshz58).

## Звіт про значення властивості

### Діаграма взаємодії

![Properties, Actions, and Events](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/166020066516c2e937318.png)

### Пристрій надсилає повідомлення

Пристрій завчасно повідомляє про значення своєї властивості в хмару.

**Topic: tylink/${deviceId}/thing/property/report**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
	"data":{
    	"color":{
        	"value":"red",
          	"time": 1626197189638  
        },
        "brightness":{
              "value":80,
              "time": 1626197189638
        }
	}
}
```

**Description**

| Parameters        | Type   | Description                                       | Required | Notes                                                        |
| ----------------- | ------ | ------------------------------------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId}       | string | The device ID.                                    | Yes      | Ідентифікатор пристрою, який повідомляє дані.                |
| version           | string | Protocol version                                  | No       | Версія протоколу за замовчуванням 1.0, це єдине дійсне значення на даний момент. |
| msgId             | string | Message ID                                        | Yes      | Рядок довжиною до 32 символів. Запит і відповідь пов’язані з msgId. |
| time              | number | Message timestamp                                 | Yes      | Позначка часу Unix, коли надсилається повідомлення, у секундах (10-значне значення) або мілісекундах (13-значне значення). |
| sys               | object | System parameters                                 | No       | Операція системи над повідомленнями.                         |
| sys.ack           | number | Response to property reporting                    | No       | За замовчуванням хмара не відповідає на повідомлення про властивості. Ви можете встановити параметр `ack`, щоб увімкнути підтвердження.`0`: підтвердження не повертається. Це значення за умовчанням. `1`: підтвердження повернуто. |
| data              | object | A collection of property values reported          | Yes      | `key` представляє код властивості. `value` представляє значення властивості та мітку часу, коли значення властивості змінюється. |
| data.${key}       | object | The property object                               | Yes      | `key` представляє код властивості.                           |
| data.${key}.time  | number | The timestamp when the property value is changed. | Yes      | Позначка часу Unix у секундах (10-значне значення) або мілісекундах (13-значне значення). |
| data.${key}.value | object | The property value reported                       | Yes      | The specific property value. Конкретна значення властивості. |

### Пристрій отримує повідомлення

За замовчуванням хмара не повертає відповідь після обробки повідомленого значення властивості, якщо `ack` не має значення `1`.

**Тема: tylink/${deviceId}/thing/property/report_response**

```
{
	"msgId":"45lkj3551234***",
    "time":1626197189640,
	"code":0
}
```

**Description**

| Parameters  | Type   | Description       | Required | Notes                                                        |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.    | Yes      | The ID of the device that reports data.                      |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of reporting property values. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0`: Success, which is the default value.Other values: Failure |

**The description of status codes**

| Status code | Description                                             |
| ----------- | ------------------------------------------------------- |
| 0           | The default status, indicating success.                 |
| 1003        | Data format error.                                      |
| 1004        | Device does not exist.                                  |
| 2002        | The model associated with the device is not defined.    |
| 2003        | The property associated with the device is not defined. |
| 2006        | Incorrect data check.                                   |

## Надсилання значення властивостей

### Діаграма взаємодії

![Properties, Actions, and Events](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1660200802fdcdad0eb38.png)

### Пристрій отримує повідомлення

Пристрій отримує оновлення властивостей із хмари.

**Topic: tylink/${deviceId}/thing/property/set**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
	"data":{
    	"color":"green",
        "brightness":50
	}
}
```

**Description**

| Parameters  | Type   | Description                                        | Required | Notes                                                        |
| ----------- | ------ | -------------------------------------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.                                     | Yes      | The ID of the target device.                                 |
| version     | string | Protocol version                                   | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID                                         | Yes      | A string up to 32 characters in length. The request and response are associated with a message ID. |
| time        | number | Message timestamp                                  | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| sys         | object | System parameters                                  | No       | A system operation on messaging.                             |
| sys.ack     | number | Response to the received message                   | No       | By default, the device does not respond to a property update. You can set the `ack` parameter to enable acknowledgment.`0`: No acknowledgment returned. This is the default value. `1`: Acknowledgment returned. |
| data        | object | A collection of property values sent to the device | Yes      | `key` represents the property code.   `value` represents the property value. |

### Device sends messages

By default, the device does not return a response after it processes the received property update unless the `ack` is set to `1`.

**Topic: tylink/${deviceId}/thing/property/set_response**

```
{
	"msgId":"45lkj3551234***",
    "time":1626197189640,
	"code":0
}
```

**Description**

| Parameters  | Type   | Description       | Required | Notes                                                        |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.    | Yes      | The ID of the target device.                                 |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of receiving property update. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0`: Success, which is the default value.Other values: Failure |

## Виконання дій

### Діаграма взаємодії

![Properties, Actions, and Events](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1660201148b7ab9d8d600.png)

### Device receives messages

The device receives a message about performing an action from the cloud.

**Topic: tylink/${deviceId}/thing/action/execute**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
	"data":{
      	"actionCode": "testAction",
      	"inputParams": {
          "inputParam1":"value1",
          "inputParam2":"value2"
    	}
	}
}
```

**Description**

| Parameters       | Type   | Description           | Required | Notes                                                        |
| ---------------- | ------ | --------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId}      | string | The device ID.        | Yes      | The ID of the target device that performs the specified action. |
| version          | string | Protocol version      | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId            | string | Message ID            | Yes      | A string up to 32 characters in length. The request and response are associated with a message ID. |
| time             | number | Message timestamp     | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| data             | object | The action parameters | Yes      | The data includes action code and execution parameters.      |
| data.actionCode  | string | Action code           | Yes      | The action code defined by the device model.                 |
| data.inputParams | object | Input parameters      | No       | `key` represents the parameter code.   `value` represents the property value. |

### Device sends messages

The device responds to the cloud with the result after it performs the specified action.

**Topic: tylink/${deviceId}/thing/action/execute_response**

```
{
	"msgId":"45lkj3551234***",
    "time":1626197189640,
	"code":0,
  	"data":{
      	"actionCode": "testAction",
      	"outputParams": {
          "outputParam1":"value1",
          "outputParam2":"value2"
    	}
    }
}
```

**Description**

| Parameters        | Type   | Description                        | Required | Notes                                                        |
| ----------------- | ------ | ---------------------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId}       | string | The device ID.                     | Yes      | The ID of the target device that performs the specified action. |
| version           | string | Protocol version                   | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId             | string | Message ID                         | Yes      | The value of this parameter must be the same as the `msgId` of performing an action. |
| time              | number | Message timestamp                  | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code              | number | Status code                        | No       | `0`: Success, which is the default value.Other values: Failure |
| data              | object | The result of performing an action | No       | The data includes action code and a collection of output parameters. |
| data.actionCode   | string | Action code                        | No       | The action code defined by the device model.                 |
| data.outputParams | object | Output parameters                  | No       | `key` represents the parameter code.   `value` represents the property value. |

## Report events

### Interaction diagram

![Properties, Actions, and Events](https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/content-platform/hestia/1660202315167a658eb38.png)

### Device sends messages

The device proactively reports the event-triggered message to the cloud.

**Topic: tylink/${deviceId}/thing/event/trigger**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
	"data":{
      	"eventCode":"testEvent",
      	"eventTime":1626197189630,   // The event timestamp in seconds or milliseconds.
      	"outputParams": {			// The output parameters.
          "outputParam1":"value1",
          "outputParam2":"value2"
    	}
	}
}
```

**Description**

| Parameters        | Type   | Description          | Required | Notes                                                        |
| ----------------- | ------ | -------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId}       | string | The device ID.       | Yes      | The ID of the device that triggers the event.                |
| version           | string | Protocol version     | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId             | string | Message ID           | Yes      | A string up to 32 characters in length. The request and response are associated with a message ID. |
| time              | number | Message timestamp    | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| sys               | object | System parameters    | No       | A system operation on messaging.                             |
| sys.ack           | number | Response to an event | No       | By default, the cloud does not respond to an event message. You can set the `ack` parameter to enable acknowledgment.`0`: No acknowledgment returned. This is the default value. `1`: Acknowledgment returned. |
| data              | object | Event parameters     | Yes      | The data includes event code and output parameters.          |
| data.eventCode    | string | Event code           | Yes      | The event code defined by the device model.                  |
| data.outputParams | object | Output parameters    | No       | `key` represents the parameter code.   `value` represents the property value. |

### Device receives messages

By default, the cloud does not return a response after it receives an event message unless the `ack` is set to `1`.

**Topic: tylink/${deviceId}/thing/event/trigger_response**

```
{
	"msgId":"45lkj3551234***",
    "time":1626197189640,
	"code":0
}
```

**Description**

| Parameters  | Type   | Description       | Required | Notes                                                        |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.    | Yes      | The ID of the device that triggers the event.                |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of reporting an event-triggered message. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0`: Success, which is the default value.Other values: Failure |

**The description of status codes**

| Status code | Description                                          |
| ----------- | ---------------------------------------------------- |
| 0           | The default status, indicating success.              |
| 1003        | Data format error.                                   |
| 1004        | Device does not exist.                               |
| 2002        | The model associated with the device is not defined. |
| 2004        | The event associated with the device is not defined. |
| 2006        | Incorrect data check.                                |

## Report data in bulk

This feature allows a device to report multiple events or properties  in one go. For a gateway device, it can report data of multiple  sub-devices at the same time. This way, transfer efficiency is  increased.

Limitations:

- A gateway device can report data of up to 20 sub-devices in one go.
- Due to the limitation of the MQTT gateway, the payload size of a message cannot exceed 64 KB.
- If some data fails to be verified or processed, the code 2121 is  returned. If all the data fails to be processed, the code 2122 is  returned. For more information about errors, see the description of  status codes.

### Device sends messages

The device reports properties or events to the cloud in bulk, or the gateway device reports data of multiple sub-devices.

**Topic: tylink/${deviceId}/thing/data/batch_report**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
	"data":{
      "properties":{
    	"color":{
        	"value":"red",
          	"time": 1626197189638
        }
      },
       "events":{
          "event1":{
                      "outputParams": {
                        "outputParam1":"value1",
                        "outputParam2":"value2"
                      },
                      "eventTime":1626197189001
              		},
          "event2":{
                      "outputParams": {
                        "outputParam1":"value1",
                        "outputParam2":"value2"
                      },
                      "eventTime":1626197189001
                    }
      },
      "subDevices":[
    		{
              "deviceId":"asd453452***",
              "properties":{
                "color":{
                    "value":"red",
                    "time": 1626197189638
                },
                "brightness":{
                      "value":80,
                      "time": 1626197189638
                }
              },
               "events":{
                  "event1":{
                              "outputParams": {
                                "outputParam1":"value1",
                                "outputParam2":"value2"
                              },
                              "eventTime":1626197189001
                           }
              		}
            }
	]
	}
  	
}
```

**Description**

| Parameters                      | Type   | Description                                                  | Required | Notes                                                        |
| ------------------------------- | ------ | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| ${deviceId}                     | string | The device ID.                                               | Yes      | The ID of the device that reports data in bulk.              |
| version                         | string | Protocol version                                             | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId                           | string | Message ID                                                   | Yes      | A string up to 32 characters in length. The request and response are associated with a message ID. |
| time                            | number | Message timestamp                                            | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| sys                             | object | System parameters                                            | No       | A system operation on messaging.                             |
| sys.ack                         | number | Response to bulk reporting                                   | No       | By default, the cloud does not respond to bulk data reporting. You can set the `ack` parameter to enable acknowledgment.`0`: No acknowledgment returned. This is the default value. `1`: Acknowledgment returned. |
| data                            | object | A collection of data reported                                | Yes      | The data includes the device data and its sub-device data.   |
| data.properties                 | object | A collection of properties for bulk reporting                | No       | `key` represents the property code.   `value` represents the property value and the timestamp when the property value is changed. |
| data.properties.${key}          | object | The property object                                          | Yes      | `key` represents the property code.                          |
| data.properties.${key}.time     | number | The timestamp when the property value is changed.            | Yes      | The Unix timestamp, in seconds (10-digit value) or milliseconds (13-digit value). |
| data.properties.${key}.value    | object | The property value reported                                  | Yes      | The specific property value.                                 |
| data.events                     | object | A collection of events for bulk reporting                    | No       | `key` represents the event code.   `value` represents the event value and the timestamp when the event occurs. |
| data.events.${key}              | object | The event object                                             | Yes      | `code` represents the event code.                            |
| data.events.${key}.eventTime    | number | The timestamp when the event occurs.                         | Yes      | The Unix timestamp, in seconds (10-digit value) or milliseconds (13-digit value). |
| data.events.${key}.outputParams | object | Output parameters                                            | Yes      | A collection of output parameters.                           |
| data.subDevices                 | array  | Data of sub-devices to be reported. Up to 20 sub-devices can be reported in one go. | No       | If the device is a gateway, it can report the data of its connected  sub-devices in bulk. Each element represents the data of one sub-device. |
| data.subDevices[]               | object | The sub-device data                                          | Yes      | Each element represents the data of one sub-device.          |
| data.subDevices[].deviceId      | string | Sub-device ID                                                | Yes      | The ID of the sub-device whose data is reported.             |
| data.subDevices[].properties    | object | A collection of properties of sub-devices to be reported in bulk | No       | The structure definition is similar to `data.properties`.    |
| data.subDevices[].events        | object | A collection of events of sub-devices to be reported in bulk | No       | The structure definition is similar to `data.events`.        |

### Device receives messages

By default, the cloud does not return a response after it processes the data reported in bulk unless the `ack` is set to `1`.

**Topic: tylink/${deviceId}/thing/data/batch_report_response**

**Description**

| Parameters  | Type   | Description       | Required | Notes                                                        |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.    | Yes      | The ID of the device that reports data in bulk.              |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of reporting data in bulk. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0`: Success, which is the default value.Other values: Failure |

**The description of status codes**

| Status code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 0           | The default status, indicating success.                      |
| 1003        | Data format error.                                           |
| 2121        | Some of the data reported in bulk fails to be processed.     |
| 2122        | All the data reported in bulk fails to be processed.         |
| 2123        | The number of sub-devices to be reported in bulk exceeds the limit of 20. |

## Report historical data

The device reports historical data to the cloud in bulk, or the gateway device reports the historical data of sub-devices.

### Scenarios

- When a device has a lot of data to report within a short time period, it can report them in one request for better efficiency.
- A device reports data periodically or reports the stranded data in  case of device offline, while retaining the historical data. The device  can stage the historical process data in the local storage and report  the staged data to the cloud in bulk.

### Limitations

- A gateway device can report data of up to 20 sub-devices in one go.
- Due to the limitation of the MQTT gateway, the payload size of a message cannot exceed 64 KB.
- Up to 500 pieces of historical data can be reported in one request.  That is, the size of property arrays + the size of event arrays + the  size of sub-devices (the size of property arrays + the size of event  arrays) must be less than 500.
- If some data fails to be verified or processed, the code 2121 is  returned. If all the data fails to be processed, the code 2122 is  returned. For more information about errors, see the description of  status codes.

### Things to note

- The historical data is stored in a property or event array in ascending order by time.
- The cloud traverses the property or event arrays in order and then processes data.
- In the same request, the latest status of a property or event  prevails. The timestamp should be included in the historical data if  possible.

### Device sends messages

The device reports historical data to the cloud in bulk, or the gateway device reports the historical data of sub-devices.

**topic: tylink/${deviceId}/thing/data/history_report**

```
{
    "msgId":"45lkj3551234001",
    "time":1626197189638,
    "data":{
        "properties":[
            {
                "color":{
                    "value":"red",
                    "time":1626197190000
                },
                "brightness":{
                    "value":80,
                    "time":1626197190000
                }
            },
            {
                "color":{
                    "value":"blue",
                    "time":1626197189000
                },
                "brightness":{
                    "value":79,
                    "time":1626197189000
                }
            }
        ],
        "events":[
            {
                "event1":{
                    "outputParams":{
                        "outputParam1":"value11",
                        "outputParam2":"value21"
                    },
                    "eventTime":1626197190000
                },
                "event2":{
                    "outputParams":{
                        "outputParam1":"value11",
                        "outputParam2":"value21"
                    },
                    "eventTime":1626197190000
                }
            },
            {
                "event1":{
                    "outputParams":{
                        "outputParam1":"value10",
                        "outputParam2":"value20"
                    },
                    "eventTime":1626197189000
                },
                "event2":{
                    "outputParams":{
                        "outputParam1":"value10",
                        "outputParam2":"value20"
                    },
                    "eventTime":1626197189000
                }
            }
        ],
        "subDevices":[
            {
                "deviceId":"asd453452444",
                "properties":[
                    {
                        "color":{
                            "value":"red",
                            "time":1626197190000
                        },
                        "brightness":{
                            "value":80,
                            "time":1626197190000
                        }
                    },
                    {
                        "color":{
                            "value":"blue",
                            "time":1626197189000
                        },
                        "brightness":{
                            "value":79,
                            "time":1626197189000
                        }
                    }
                ],
                "events":[
                    {
                        "event1":{
                            "outputParams":{
                                "outputParam1":"value11",
                                "outputParam2":"value21"
                            },
                            "eventTime":1626197190000
                        },
                        "event2":{
                            "outputParams":{
                                "outputParam1":"value11",
                                "outputParam2":"value21"
                            },
                            "eventTime":1626197190000
                        }
                    },
                    {
                        "event1":{
                            "outputParams":{
                                "outputParam1":"value10",
                                "outputParam2":"value20"
                            },
                            "eventTime":1626197189000
                        },
                        "event2":{
                            "outputParams":{
                                "outputParam1":"value10",
                                "outputParam2":"value20"
                            },
                            "eventTime":1626197189000
                        }
                    }
                ]
            }
        ]
    }
}
```

**Description**

| Parameter                         | Type   | Description                                                  | Required | Remark                                                       |
| --------------------------------- | ------ | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| ${deviceId}                       | string | Device ID                                                    | Yes      | The ID of the device that requests deleting the desired property. |
| version                           | string | Protocol version                                             | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId                             | string | Message ID                                                   | Yes      | A string up to 32 characters in length. A message ID is used to correlate responses and requests. |
| time                              | number | Message timestamp                                            | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| data                              | object | A collection of historical data for bulk reporting           | Yes      | The historical data can come from both the device itself and sub-devices. |
| data.properties                   | array  | A collection of historical properties for bulk reporting     | No       | /                                                            |
| data.properties[]                 | object | A collection of properties for bulk reporting                | Yes      | The array is stored in ascending order by update time of property.  `key` represents the property code.  `value` represents the property value and the timestamp when the property value is updated. |
| data.properties[].${key}          | object | The property object                                          | Yes      | `key` represents the property code.                          |
| data.properties[].${key}.time     | object | The timestamp when the property value is changed.            | No       | The Unix timestamp, in seconds (10-digit value) or milliseconds (13-digit value). |
| data.properties[].${key}.value    | object | The property value reported                                  | Yes      | The specific property value.                                 |
| data.events                       | array  | A collection of historical events for bulk reporting         | No       | /                                                            |
| data.events[]                     | object | A collection of events for bulk reporting                    | Yes      | The array is stored in ascending order by occurrence time of event.  `key` represents the event code.  `value` represents the event parameter and occurrence time. |
| data.events[].${key}              | object | The event object                                             | Yes      | `code` represents the event code.                            |
| data.events[].${key}.time         | object | The timestamp when the event occurs.                         | No       | The Unix timestamp, in seconds (10-digit value) or milliseconds (13-digit value). |
| data.events[].${key}.outputParams | object | Output parameters                                            | Yes      | A collection of output parameters.                           |
| data.subDevices                   | array  | The list of sub-device data                                  | No       | If the device is a gateway, it can report the data of its connected  sub-devices in bulk. Each list element represents the data of one  sub-device. |
| data.subDevices[]                 | object | The sub-device data                                          | Yes      | Each element represents the data of one sub-device.          |
| data.subDevices[].deviceId        | string | Sub-device ID                                                | Yes      | The ID of the sub-device whose data is reported.             |
| data.subDevices[].properties      | array  | A collection of historical properties of sub-devices for bulk reporting | No       | The structure definition is similar to `data.properties`.    |
| data.subDevices[].events          | array  | A collection of historical events of sub-devices for bulk reporting | No       | The structure definition is similar to `data.events`.        |

### Device receives messages

By default, the cloud does not return a response after it processes the data unless the `ack` is set to `1`.

**topic: tylink/${deviceId}/thing/data/history_report_response**

```
{
	"msgId":"45lkj3551234001",
    "time":1626197189640,
	"code":0
}
```

**Description**

| Parameter   | Type   | Description       | Required | Remark                                                       |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | Device ID         | Yes      | The ID of the device that reports the historical data.       |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of reporting the historical data. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0` means success, the default value. Other values mean failure. |

**The description of status codes**

| Status code | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 0           | The default status, indicating success.                      |
| 1003        | Data format error.                                           |
| 2121        | Some of the reported historical data fails to be processed.  |
| 2122        | All the reported historical data fails to be processed.      |
| 2123        | The number of sub-devices to be reported exceeds the limit of 20. |
| 2124        | The size of historical data exceeds the limit of 500.        |

## Get the model

### Device sends messages

The device requests the device model from the cloud.

**Topic: tylink/${deviceId}/thing/model/get**

```
{
	"msgId":"45lkj3551234***",
  	"time":1626197189638,
  	"data":{
    	"format":"simple"
    }
}
```

**Description**

| Parameters  | Type   | Description                         | Required | Notes                                                        |
| ----------- | ------ | ----------------------------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.                      | Yes      | The device that requests the device model.                   |
| version     | string | Protocol version                    | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID                          | Yes      | A string up to 32 characters in length. The request and response are associated with a message ID. |
| time        | number | Message timestamp                   | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| data        | object | Parameters requested                | No       | -                                                            |
| data.format | string | The data format of the device model | No       | `simple` (default): the lightweight data format information with the fields irrelevant to the device operation excluded such as `name` and `description`. `complete`: the complete data format information. |

### Device receives messages

The device gets the device model from the response message.
 The following code snippet shows the lightweight data structure of the  device model, with the fields irrelevant to the device operation  excluded such as `name` and `description`.

**Topic: tylink/${deviceId}/thing/model/get_response**

```
{
	"msgId":"45lkj3551234***",
    "time":1626197189640,
	"code":0,
    "data":{
      "modelId":"0000001***",
      "services":[
          {
              "code":"",
              "properties":[
                  {
                      "abilityId":1,
                      "code":"foodRemaining",
                      "accessMode":"ro",
                      "typeSpec":{
                          "type":"value",
                          "min":0,
                          "max":2000,
                          "step":1,
                          "unit":"g",
                          "scale":0
                      }
                  }
              ],
              "events":[
                  {
                      "abilityId":101,
                      "code":"feedEvent",
                      "outputParams":[
                          {
                              "code":"time",
                              "typeSpec":{
                                  "type":"date"
                              }
                          },
                          {
                              "code":"quantity",
                              "typeSpec":{
                                  "type":"value",
                                  "min":0,
                                  "max":2000,
                                  "step":1,
                                  "unit":"g",
                        		  "scale":0
                              }
                          }
                      ]
                  }
              ],
              "actions":[
                  {
                     "abilityId":101,
                      "code":"feed",
                  }
              ]
          }
      ]
	}
}
```

**Description**

| Parameters  | Type   | Description       | Required | Notes                                                        |
| ----------- | ------ | ----------------- | -------- | ------------------------------------------------------------ |
| ${deviceId} | string | The device ID.    | Yes      | The device that requests the device model.                   |
| version     | string | Protocol version  | No       | The protocol version defaults to 1.0, which is the only valid value currently. |
| msgId       | string | Message ID        | Yes      | The value of this parameter must be the same as the `msgId` of requesting the device model. |
| time        | number | Message timestamp | Yes      | The Unix timestamp when a message is sent, in seconds (10-digit value) or milliseconds (13-digit value). |
| code        | number | Status code       | No       | `0`: Success, which is the default value.Other values: Failure |
| data        | object | Result            | No       | The data structure of the device model in JSON.              |

**The description of status codes**

| Status code | Description                             |
| ----------- | --------------------------------------- |
| 0           | The default status, indicating success. |
| 1001        | Service exception.                      |
| 1002        | Invalid parameter.                      |
| 1003        | Incorrect message format.               |
| 1004        | Device does not exist.                  |