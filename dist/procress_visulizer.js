//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------



/*
HEADER:
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

BODY:
<div data-pv="1337"></div>


JS:
var avariable_instruments = {
            config_enpoint_base_url: "127.0.0.1/pv/",
            config_icons_base_url: 'file:///Users/marcelochsendorf/Desktop/process_widget/src/pv_ressources/pv_icons/',
            instrument_data: [
                {
                    visible_name: "HL PRESSURE",
                    icon_file: "pressure.png",
                    id: "2556",
                    value: "7.5",
                    unit: "Bar",
                    location: "HL_DG_FRONT",
                    additional_attr: [{ key: "last service", value: "14.10.2019" }],
                    user_interactables: [
                        { type: "button", name: "COSE", action_endpoint: "btn1close" },
                        { type: "button", name: "OPEN", action_endpoint: "btn1open" }
                    ],
                    bg_color: "#cdd"
                },
                {
                    visible_name: "DG FRONT TEMP",
                    icon_file: "temp.png",
                    id: "1337",
                    value: "27.5",
                    unit: "&deg;",
                    location: "DG_FRONT",
                    additional_attr: [{ key: "sensor type", value: "IRF2312" }],
                    user_interactables: [],
                    bg_color: "#ddc"
                }

            ]

        }

//UPDATE TAGS------------ MODIFY IT------------------
//SCAN HTML FOR INSTRUMENT TAGS
        pv_scan_page_for_pv_instruments();
        //UPDATE INSTRUMENTS -- or use websockets
        setInterval(() => {
            $.getJSON(enpoint_url, function (data) {
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



*/


//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------

//FIND ALL  ELEMENTS WITH data-pv ATTRIBUTE
var pv_ids_on_page = [];
function pv_scan_page_for_pv_instruments() {
    var arr = $("body").find('*').filter(function () {
        var attrs = this.attributes; //get the attributes of the element
        return ($.grep(attrs, function (o) {
            return /data-pv/.test(o.name); //return the attributes that has name to be matched
        }).length); //return the elements that has at least one of the matched attributes
    }).get();

    //FIND ID OF THE ELEMENT
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(element);
        var id = element.dataset['pv']; //data-pv attribute
        if (id != undefined && id != null) {
            pv_ids_on_page.push({ id: id, element: element });
        }
    }
    //GENERATE HTML ELEMENT FOR EACH FOUND ELEMENT
    for (let index = 0; index < pv_ids_on_page.length; index++) {
        const pv_element = pv_ids_on_page[index];
        pv_generate_html_from_id(pv_element)
    }
}

//HANDLES BUTTON CLICKS ON INSTRUMENT BUTTONS
function pv_button_onclick_event(_id, _action_endpoint) {
    var enpoint_url = avariable_instruments.config_enpoint_base_url + _id + "/" + _action_endpoint;
    //MAKE A REQUEST OR SEND OVER WEBSOCKET
    // $.getJSON(enpoint_url, function (data) {
    //      alert(data);
    //  });
    pv_update_instrument(_id); //UPDATE INSTRUMENT
    alert(enpoint_url);
}

//UPDATE AN INSTRUMENT WITH GIVEN ID
function pv_update_instrument(_id) {
    var instrument = null;
    for (let index = 0; index < pv_ids_on_page.length; index++) {
        const element = pv_ids_on_page[index];
        if (element.id == _id) {
            instrument = element;
            break;
        }
    }
    if (instrument != null) {
        pv_generate_html_from_id(instrument);
    }
}

//UPDATES ALL INSTRUMENTS
function pv_update_all_instruments() {
    for (let index = 0; index < pv_ids_on_page.length; index++) {
        pv_generate_html_from_id(pv_ids_on_page[index]);
    }
}
//GENERATES A HTML STRING OF THE INSTRUMENT
function pv_generate_html_from_id(_pv_element) {
    var instrument_data = null;
    //FIND INSTRUMENT DATA IN JSON ARRAY
    for (let index = 0; index < avariable_instruments.instrument_data.length; index++) {
        if (_pv_element.id == avariable_instruments.instrument_data[index].id) {
            instrument_data = avariable_instruments.instrument_data[index];
            break;
        }
    }
    if (instrument_data == null) {
        console.log("pv_generate_html_from_id - NO INTRUMENT DATA FOUND FOR GIVEN ID");
        return;
    }
    var html = "";
    //ADD CONTAINER
    html += '<div class="container-fluid" style="background: ' + instrument_data.bg_color + ';">';
    //ADD HEADLINE
    html += '<div class="row">';
    //ADD INSTRUMENT ICON
    html += '<div class="col-4" align="center">';
    //ADD INSTRUMENT VALUE UNDER ICON USING A TABLE
    html += '<table class="table"><tbody>';
    html += '<tr><td><img src="' + avariable_instruments.config_icons_base_url + '/' + instrument_data.icon_file + '" alt="intrument icon"/></td></tr>';
    html += '<tr><td style="text-align: center; "><b>' + instrument_data.value + ' ' + instrument_data.unit + '</b></td></tr>';
    html += '</tbody></table>';
    html += '</div >';
    //ADD INFORMATION TABLE
    html += '<div class="col-8" align="center">';
    html += '<div class="row">';
    html += '<div class="col" align="center">';
    html += '<table class="table"><tbody>';
    //ADD NAME AND LOCATION
    html += '<tr><td>Name</td><td><b>' + instrument_data.visible_name + '</b></td></tr>';
    html += '<tr><td>Location</td><td>' + instrument_data.location + '</td></tr>';
    //ADD ADDITIONAL ATTRIBUTES
    for (let index = 0; index < instrument_data.additional_attr.length; index++) {
        html += '<tr><td>' + instrument_data.additional_attr[index].key + '</td><td><b>' + instrument_data.additional_attr[index].value + '</b></td></tr>';
    }
    html += '</tbody></table>';
    html += '</div >';
    html += '</div >';
    html += '</div >';
    html += '</div >';
    // html+='<b>'+instrument_data.visible_name+'</b>';
    //ADD USER INTERACTABLES
    html += '<div class="row">';
    for (let index = 0; index < instrument_data.user_interactables.length; index++) {
        const uie = instrument_data.user_interactables[index];
        html += '<div class="col" align="center">';
        //UI BUTTON
        if (uie.type == 'button') {
            html += '<button type="button" class="btn btn-primary" onclick="pv_button_onclick_event(\'' + instrument_data.id + '\',\'' + uie.action_endpoint + '\')">' + uie.name + '</button>';
        }
        html += '</div >';
    }
    html += '</div >'; //end user interactable
    html += '</div >'; //end container div
    $(_pv_element.element).html(html);
}
//JSON ARRAY CHECK HELPER  https://stackoverflow.com/questions/951483/how-to-check-if-a-json-response-element-is-an-array
function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------
