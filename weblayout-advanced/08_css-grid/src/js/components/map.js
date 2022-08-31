
    ymaps.ready(init);
    function init() {
        let myMap = new ymaps.Map("map", {
            controls: [],
            center: [55.758456, 37.626942],
            zoom: 13.495
        });

        // // Создание метки.
        // var myGeoObject = new ymaps.GeoObject({
        //     geometry: {
        //         type: "Point", // тип геометрии - точка
        //         coordinates: [55.76, 37.63] // координаты точки
        //         // coordinates: [48.872185073737896, 2.354223999999991] // координаты точки
        //     }
        // });

        let myPlacemark = new ymaps.Placemark([55.769535, 37.639985], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map.svg',
            
            // iconImageHref: '../',
            iconImageSize: [12, 12],
            //iconImageOffset: [0, 0]
        });

        myMap.geoObjects.add(myPlacemark);
        myPlacemark.events.add('click', function () {
            let adress    =     document.querySelector('.adress')
            adress.classList.add('open')
        });
    }

