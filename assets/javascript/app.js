// ___________________New Search Feature: Andrew________________________
$(document).ready(function() {
var input = document.getElementById('pac-input');
input.value = "mexican";
setTimeout(function() {
       google.maps.event.trigger(input, 'focus')
        google.maps.event.trigger(input, 'keydown', {
            keyCode: 13
        });

}, 200);

})
function initAutocomplete() {
 var zipCode = $("#input-location").val();
var queryURL =  "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zipCode+"&key=AIzaSyDC5VjVV78MqkJggO81SnzhUxDyF1HUfGI";

     console.log(zipCode) ;
$.ajax({
  url: queryURL,
  method: "GET"
})
.done(function(response) {

console.log(response);


        var ucIrvine = {lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: ucIrvine
        });
        var newMark = new google.maps.Marker({
          position: ucIrvine,
          map: map
        });
      });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  console.log(input)

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(markers)

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: "assets/images/tacomap.png",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

//=== viet's code

$("#submit-location").on("click", function(event){
event.preventDefault();
initAutocomplete();
});










  




