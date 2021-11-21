var inputs_value = [0, 0, 0, 0];
var global_data;

ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myPlacemark, myMap = new ymaps.Map("map", {



        center: [53.21268092272585, 26.97198642737419],
        zoom: 16, color: "#f652a0",
        type: 'yandex#satellite',
        controls: []
    });

    $(document).ready(function () {

        $(".button_main").click(function () {
            let id = $(this).attr("id");

            // console.log(id);
            // console.log($(this))

            if (id == "button1") {
                let field_name;
                field_name = $(this).find("#text_poly").html();
                console.log(field_name);
                let data_from_back;
                $.get("http://20.120.103.10:9999/fields?field_name=" + field_name, function (data, status) {
                    data_from_back = data;
                    console.log(data_from_back);
                    myMap.setCenter([53.212734163138784, 26.972068548202515], 16);
                    perimetr_map(data_from_back.arr);
                }, "json");
            }

            else if (id == "button2") {
                let field_name;
                field_name = $(this).find("#text_poly").html();
                console.log(field_name);
                let data_from_back;
                $.get("http://20.120.103.10:9999/fields?field_name=" + field_name, function (data, status) {
                    data_from_back = data;
                    console.log(data_from_back);
                    myMap.setCenter([53.2605025616762, 27.375474125146866], 15);
                    perimetr_map(data_from_back.arr);
                }, "json");

            }

            else if (id == "button3") {
                let field_name;
                field_name = $(this).find("#text_poly").html();
                console.log(field_name);
                let data_from_back;
                $.get("http://20.120.103.10:9999/fields?field_name=" + field_name, function (data, status) {
                    data_from_back = data;
                    console.log(data);
                    myMap.setCenter([59.18315110901265, 37.85521745681763], 15);
                    perimetr_map(data_from_back.arr);
                }, "json");

            }

            else if (id == "button4") {

                let field_name;
                field_name = $(this).find("#text_poly").html();
                console.log(field_name);
                let data_from_back;
                $.get("http://20.120.103.10:9999/fields?field_name=" + field_name, function (data, status) {
                    data_from_back = data;
                    console.log(data);
                    myMap.setCenter([55.837689974599186, 37.55972921848297], 17);
                    perimetr_map(data_from_back.arr);
                }, "json");

            }
        })
    })


    function perimetr_map(arr_per) {
        // var myGeoObject = new ymaps.GeoObject({
        //     // Описываем геометрию геообъекта.
        //     geometry: {
        //         // Тип геометрии - "Ломаная линия".
        //         type: "LineString",
        //         // Указываем координаты вершин ломаной.
        //         coordinates: app_per
        //     },
        //     // Описываем свойства геообъекта.
        //     properties: {
        //         // Содержимое хинта.
        //         hintContent: "Я геообъект",
        //         // Содержимое балуна.
        //         balloonContent: "Меня можно перетащить"
        //     }
        // }, {
        //     // Задаем опции геообъекта.
        //     // Включаем возможность перетаскивания ломаной.
        //     draggable: true,
        //     // Цвет линии.
        //     strokeColor: "#FFFF00",
        //     // Ширина линии.
        //     strokeWidth: 5
        // });

        // Создаем ломаную с помощью вспомогательного класса Polyline.
        var myPolyline = new ymaps.Polyline(arr_per, {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            balloonContent: "Ломаная линия"
        }, {
            // Задаем опции геообъекта.
            // Отключаем кнопку закрытия балуна.
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#000000",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        });

        // Добавляем линии на карту.
        myMap.geoObjects
            // .add(myGeoObject)
            .add(myPolyline);
    }



    function first_map(arr1, arr2) {
        var firstAnimatedLine = new ymaps.AnimatedLine(arr1, {}, {
            // Задаем цвет.
            strokeColor: "#ED4543",
            // Задаем ширину линии.
            strokeWidth: 5,
            // Задаем длительность анимации.
            animationTime: 4000
        });
        var secondAnimatedLine = new ymaps.AnimatedLine(arr2, {}, {
            strokeColor: "#1E98FF",
            strokeWidth: 5,
            animationTime: 4000
        });
        // Добавляем линии на карту.
        myMap.geoObjects.add(secondAnimatedLine);
        myMap.geoObjects.add(firstAnimatedLine);
        // Создаем метки.
        var firstPoint = new ymaps.Placemark([55.7602953585417, 37.57705113964169], {}, {
            preset: 'islands#redRapidTransitCircleIcon'
        });
        var secondPoint = new ymaps.Placemark([55.76127880650197, 37.57839413202077], {}, {
            preset: 'islands#blueMoneyCircleIcon'
        });
        var thirdPoint = new ymaps.Placemark([55.763105418792314, 37.57724573612205], {}, {
            preset: 'islands#blackZooIcon'
        });
        // Функция анимации пути.
        function playAnimation() {
            // Убираем вторую линию.
            secondAnimatedLine.reset();
            // Добавляем первую метку на карту.
            myMap.geoObjects.add(firstPoint);
            // Анимируем первую линию.
            firstAnimatedLine.animate()
                // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
                .then(function () {
                    myMap.geoObjects.add(secondPoint);
                    return secondAnimatedLine.animate();
                })
                // После окончания анимации второй линии добавляем третью метку на карту.
                .then(function () {
                    myMap.geoObjects.add(thirdPoint);
                    // Добавляем паузу после анимации.
                    return ymaps.vow.delay(null, 2000);
                })
                // После паузы перезапускаем анимацию.
                .then(function () {
                    // Удаляем метки с карты.
                    myMap.geoObjects.remove(firstPoint);
                    myMap.geoObjects.remove(secondPoint);
                    myMap.geoObjects.remove(thirdPoint);
                    // Убираем вторую линию.
                    secondAnimatedLine.reset();
                    // Перезапускаем анимацию.
                    playAnimation();
                });
        }
        // Запускаем анимацию пути.
        playAnimation();
    }




    // Создадим собственный макет выпадающего списка.
    // ListBoxLayout = ymaps.templateLayoutFactory.createClass(
    //     "<button id='my-listbox-header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
    //     "{{data.title}} <span class='caret'></span>" +
    //     "</button>" +
    //     // Этот элемент будет служить контейнером для элементов списка.
    //     // В зависимости от того, свернут или развернут список, этот контейнер будет
    //     // скрываться или показываться вместе с дочерними элементами.
    //     "<ul id='my-listbox'" +
    //     " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
    //     " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

    //     build: function () {
    //         // Вызываем метод build родительского класса перед выполнением
    //         // дополнительных действий.
    //         ListBoxLayout.superclass.build.call(this);

    //         this.childContainerElement = $('#my-listbox').get(0);
    //         // Генерируем специальное событие, оповещающее элемент управления
    //         // о смене контейнера дочерних элементов.
    //         this.events.fire('childcontainerchange', {
    //             newChildContainerElement: this.childContainerElement,
    //             oldChildContainerElement: null
    //         });
    //     },

    //     // Переопределяем интерфейсный метод, возвращающий ссылку на
    //     // контейнер дочерних элементов.
    //     getChildContainerElement: function () {
    //         return this.childContainerElement;
    //     },

    //     clear: function () {
    //         // Заставим элемент управления перед очисткой макета
    //         // откреплять дочерние элементы от родительского.
    //         // Это защитит нас от неожиданных ошибок,
    //         // связанных с уничтожением dom-элементов в ранних версиях ie.
    //         this.events.fire('childcontainerchange', {
    //             newChildContainerElement: null,
    //             oldChildContainerElement: this.childContainerElement
    //         });
    //         this.childContainerElement = null;
    //         // Вызываем метод clear родительского класса после выполнения
    //         // дополнительных действий.
    //         ListBoxLayout.superclass.clear.call(this);
    //     }
    // }),

    //     // Также создадим макет для отдельного элемента списка.
    //     ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
    //         "<li><a>{{data.content}}</a></li>"
    //     ),

    //     // Создадим 2 пункта выпадающего списка
    //     listBoxItems = [
    //         new ymaps.control.ListBoxItem({
    //             data: {
    //                 content: 'AGROCODE',
    //                 center: [53.212734163138784, 26.972068548202515],
    //                 zoom: 15
    //             }
    //         }),
    //         new ymaps.control.ListBoxItem({
    //             data: {
    //                 content: 'Cherepovets',
    //                 center: [59.18349737628452, 37.855249643325806],
    //                 zoom: 15
    //             }
    //         })
    //     ],

    //     // Теперь создадим список, содержащий 2 пункта.
    //     listBox = new ymaps.control.ListBox({
    //         items: listBoxItems,
    //         data: {
    //             title: 'Выберите пункт'
    //         },
    //         options: {
    //             // С помощью опций можно задать как макет непосредственно для списка,
    //             layout: ListBoxLayout,
    //             // так и макет для дочерних элементов списка. Для задания опций дочерних
    //             // элементов через родительский элемент необходимо добавлять префикс
    //             // 'item' к названиям опций.
    //             itemLayout: ListBoxItemLayout
    //         }
    //     });

    // listBox.events.add('click', function (e) {
    //     // Получаем ссылку на объект, по которому кликнули.
    //     // События элементов списка пропагируются
    //     // и их можно слушать на родительском элементе.
    //     var item = e.get('target');
    //     // Клик на заголовке выпадающего списка обрабатывать не надо.
    //     if (item != listBox) {
    //         myMap.setCenter(
    //             item.data.get('center'),
    //             item.data.get('zoom')
    //         );
    //     }
    // });

    // myMap.controls.add(listBox, { float: 'left' });






    // let counter = 0;
    // var coords = [[0, 0], [0, 0]];



    //var input2 = document.getElementById("1");
    //alert(input2);

    // Слушаем клик на карте.
    // myMap.events.add('click', function (e) {
    //     coords[counter] = e.get('coords');
    //     counter += 1;



    //     // alert(unputs_value[0])
    //     if (counter == 1) {

    //         for (let i = 0; i < global_data.length; i++) {

    //             animatedLine = new ymaps.AnimatedLine(global_data[i]["path"], {}, {});

    //             animatedLine.reset();
    //         }

    //         var firstPoint = new ymaps.Placemark(coords[0], { iconContent: 'start' }, {
    //             preset: 'islands#blueStretchyIcon'
    //         });
    //         myMap.geoObjects.add(firstPoint);
    //     }


    //     // Если метка уже создана – просто передвигаем ее.
    //     if (myPlacemark) {
    //         myPlacemark.geometry.setCoordinates(coords[counter]);
    //     }
    //     // Если нет – создаем.
    //     else {
    //         myPlacemark = createPlacemark(coords[counter]);
    //         myMap.geoObjects.add(myPlacemark);
    //         // Слушаем событие окончания перетаскивания на метке.
    //         myPlacemark.events.add('dragend', function () {
    //             getAddress(myPlacemark.geometry.getCoordinates());
    //         });
    //     }
    //     getAddress(coords[counter]);


    //     if (counter == 2) {

    //         var secPoint = new ymaps.Placemark(coords[1], { iconContent: 'finish' }, {
    //             preset: 'islands#blueStretchyIcon'
    //         });
    //         myMap.geoObjects.add(secPoint);

    //         fetch("https://itam.misis.ru:9996/get_path", {
    //             method: 'POST', headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 "start_lat": coords[0][0],
    //                 "start_lon": coords[0][1],
    //                 "end_lat": coords[1][0],
    //                 "end_lon": coords[1][1]
    //             })
    //         }).then((response) => {
    //             return response.json();
    //         }).then((data) => {
    //             global_data = data;
    //             //console.log(data[0]["path"]);
    //             generate_lines(data);

    //             if (inputs_value[1] == 1 && inputs_value[3] == 1) { //[0,1,0,1]
    //                 map_print(data, 0);
    //             }

    //             if (inputs_value[1] == 1 && inputs_value[2] == 1) { //[0,1,1,0]
    //                 map_print(data, 1);
    //             }

    //             if (inputs_value[1] == 0 && inputs_value[3] == 1) { //[0,0,0,1]
    //                 map_print(data, 2);
    //             }

    //             if (inputs_value[1] == 1 && inputs_value[2] == 0) { //[0,1,0,0]
    //                 map_print(data, 3);
    //             }

    //             if (inputs_value[0] == 1 && inputs_value[1] == 0) { //[1,0,0,0]
    //                 map_print(data, 4);
    //             }

    //             if (inputs_value[1] == 0 && inputs_value[2] == 1) { //[0,0,1,0]
    //                 map_print(data, 5);
    //             }

    //             if (inputs_value[0] == 1 && inputs_value[1] == 1) { //[1,1,0,0]
    //                 map_print(data, 6);
    //             }

    //             inputs_value = [0, 0, 0, 0];

    //         });


    //         counter = 0;
    //         coords = [[0, 0], [0, 0]];

    //     }
    // });


    // //alert(coords);

    // function generate_lines(data) {


    //     var colors = ["#3EEAD6", "#88E067", "#EDD35F", "#D99571", "#F881DA", "#8189E3", "#4C4047"];

    //     for (let i = 0; i < data.length; i++) {

    //         animatedLine = new ymaps.AnimatedLine(data[i]["path"], {}, {
    //             // Задаем цвет.
    //             strokeColor: colors[i],
    //             // Задаем ширину линии.
    //             strokeWidth: 5,
    //             // Задаем длительность анимации.
    //             animationTime: 5
    //         });

    //         myMap.geoObjects.add(animatedLine);
    //         animatedLine.animate()
    //     }
    // }



    // function createPlacemark(coords) {
    //     return new ymaps.Placemark(coords, {
    //         iconCaption: 'поиск...'
    //     }, {
    //         preset: 'islands#blueMoneyCircleIcon',

    //     });
    // }

    // function getAddress(coords) {
    //     myPlacemark.properties.set('iconCaption', 'поиск...');
    //     ymaps.geocode(coords).then(function (res) {
    //         var firstGeoObject = res.geoObjects.get(0);

    //         myPlacemark.properties
    //             .set({
    //                 // Формируем строку с данными об объекте.
    //                 iconCaption: [
    //                     // Название населенного пункта или вышестоящее административно-территориальное образование.
    //                     firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
    //                     // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
    //                     firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
    //                 ].filter(Boolean).join(', '),
    //                 // В качестве контента балуна задаем строку с адресом объекта.
    //                 balloonContent: firstGeoObject.getAddressLine()
    //             });
    //     });
    // }

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            console.log(coords[0], coords[1]);
            document.getElementById("email").value = coords;
            console.log(firstGeoObject.getAddressLine());

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getAddressLine()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }



    function map_print(data, map_num) {
        //alert("test button pushed");  
        var colors = ["#3EEAD6", "#88E067", "#EDD35F", "#D99571", "#F881DA", "#8189E3", "#4C4047"];

        //for(let i=0; i<data.length; i++){

        animatedLine = new ymaps.AnimatedLine(data[map_num]["path"], {}, {
            // Задаем цвет.
            strokeColor: colors[map_num],
            // Задаем ширину линии.
            strokeWidth: 10,
            // Задаем длительность анимации.
            animationTime: 5
        });

        myMap.geoObjects.add(animatedLine);
        animatedLine.animate()

    }
}


$(document).ready(function () {
    $(".my").change(function () {
        if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
        else $(this).prev().text('Выберите файлы');
    });
});





// ПОЛЗУНКИ
function fun1() {
    var rng1 = document.getElementById('r1'); //rng - это Input
    var p1 = document.getElementById('one'); // p - абзац
    p1.innerHTML = rng1.value;
}
function fun2() {
    var rng2 = document.getElementById('r2'); //rng - это Input
    var p2 = document.getElementById('two'); // p - абзац
    p2.innerHTML = rng2.value;
}
function fun3() {
    var rng3 = document.getElementById('r3'); //rng - это Input
    var p3 = document.getElementById('three'); // p - абзац
    p3.innerHTML = rng3.value;
}
function fun4() {
    var rng4 = document.getElementById('r4'); //rng - это Input
    var p4 = document.getElementById('four'); // p - абзац
    p4.innerHTML = rng4.value;
}