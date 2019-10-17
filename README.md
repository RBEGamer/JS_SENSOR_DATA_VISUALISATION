# JS_SENSOR_DATA_VISUALISATION

### RESULT

<img src='/documentation/sample_result.png' />

### SMAPLE HTML
```html
<div  data-pv="2556"></div>
```

### SAMPLE SENSOR DATA SOURCE
The datasource for the elements is a json object whicht contains the general config and descriptor for each instrument to display. The global variable is called `avariable_instruments = `. There is a example configuration for two instruments below:

```json
{
            "config_enpoint_base_url": "127.0.0.1/pv/",
            "config_icons_base_url": "./src/pv_ressources/pv_icons/",
            "instrument_data": [
                {
                    "visible_name": "HL PRESSURE",
                    "icon_file": "pressure.png",
                    "id": "2556",
                    "value": "7.5",
                    "unit": "Bar",
                    "location": "HL_DG_FRONT",
                    "additional_attr": [{ "key": "last service", "value": "14.10.2019" }],
                    "user_interactables": [
                        { "type": "button", "name": "COSE", "action_endpoint": "btn1close" },
                        { "type": "button", "name": "OPEN", "action_endpoint": "btn1open" }
                    ],
                    "bg_color": "#cdd"
                },
                {
                    "visible_name": "DG FRONT TEMP",
                    "icon_file": "temp.png",
                    "id": "1337",
                    "value": "27.5",
                    "unit": "&deg;",
                    "location": "DG_FRONT",
                    "additional_attr": [{ "key": "sensor type", "value": "IRF2312" }],
                    "user_interactables": [],
                    "bg_color": "#ddc"
                }
            ]
        }
```

