# JS_SENSOR_DATA_VISUALISATION

### RESULT

<img src='/documentation/sample_result.png' />

### SMAPLE HTML
```html
<div  data-pv="2556"></div>
```
If you place this snipped in your HTML-Code, the instrument with the id 2556 will be rendered there.
The id must match with the `id` in the `avariable_instruments.instrument_data[].id`.
Its possible to place the same instrument, multible times on a page. Simply insert the div again.

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



## FUNCTIONS

There are some function you can use to insert,update instruments on the page:

* `pv_scan_page_for_pv_instruments();` - scans the dom for instrument-divs. You have to do it once the page is loaded or after modification of the dom.

* `pv_update_all_instruments();`- update all instruments according the data in `avariable_instruments`



```js
            //SCAN HTML FOR INSTRUMENT TAGS
            pv_scan_page_for_pv_instruments();
            //UPDATE avariable_instruments variable -- or use websockets
            setInterval(() => {
                $.getJSON(enpoint_url, function (data) { // fetch the config from server
                    console.log(data);
                    //CHECK FOR VALID JSON ARRAY
                    if (data == null || !isArray(data)) {
                        console.log(data);
                        console.log("-- INVALID avariable_instruments.instrument_data ---");
                    }
                    //UPDATE ALL INSTRUMENTS
                    avariable_instruments.instrument_data = data;
                    pv_update_all_instruments();
                });
            }, 1000);
```
