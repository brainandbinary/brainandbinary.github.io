// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', init);

function init() {

    // Basic options for a simple Google Map
    // The latitude and longitude to center the map (always required)
    var center = new google.maps.LatLng(48.856614, 2.352222);
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var isDraggable = $(document).width() > 1024 ? true : false; // If document (your website) is wider than 1024px, isDraggable = true, else isDraggable = false

    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        backgroundColor: "rgba(32,35,45,1)", // for example
        zoom: 3,
        scrollwheel: false,
        draggable: isDraggable,
        center: center,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,

        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },

        mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 0
            },
            {
                "color": "#a5a5a5"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#323a45"
            },
            {
                "lightness": 0
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#20232D"
            },
            {
                "lightness": 0
            }
        ]
    }
]
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions, center);

    var locations = [
        [51.507351, -0.127758, 1], // LONDON
        [48.856614, 2.352222, 2], // PARIS
        [41.902783, 12.496366, 3], // ROME
        [-33.868820, 151.209296, 4], // SYDNEY
        [40.712784, -74.005941, 5], // NEW YORK
        [18.017874, -76.809904, 6], // KINGSTON
        [52.520007, 13.404954, 7], // BERLIN
        [34.052234, -118.243685, 8], // LOS ANGELES
        [35.689487, 139.691706, 9], // TOKYO
        [55.755826, 37.617300, 10], // MOSCOW
        [25.285447, 51.531040, 11] //DOHA
    ];

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    var mapIcon = {    
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3,
        fillOpacity: 1,  
    };

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            map: map,
            icon: mapIcon
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i));

        marker.addListener('mouseover', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            };
        })(marker, i));
    }

    // google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.open(map, marker);
    // });
    
}