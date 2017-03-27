function initMap() {
  MCDONNELL = new google.maps.LatLng(40.345342, -74.652485);
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#ff0000" } });
  
  var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        // The latitude and longitude to center the map (always required)
        center: MCDONNELL,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": 10
            },
            {
                "lightness": 30
            },
            {
                "gamma": 0.5
            },
            {
                "hue": "#435158"
            }
        ]
    }
]
    };
  
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  geocoder = new google.maps.Geocoder;
  var place_id = document.getElementById('end').value;
  geocoder.geocode({'placeId': place_id}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      directionsService.route({
        origin: MCDONNELL,
        destination: results[0].geometry.location,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          var duration = response.routes[0].legs[0].duration.text;
          $("#directions-duration").html(duration);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
    })
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

var button = document.getElementById('directionsButton'); // Assumes element with id='button'

button.onclick = function() {
    var div = document.getElementById('directionsPanel');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};