$("#submit-location").on("click", function(event) {
    event.preventDefault();
    initAutocomplete();
});

function initAutocomplete() {
    var zipCode = $("#input-location").val();
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=AIzaSyDC5VjVV78MqkJggO81SnzhUxDyF1HUfGI";
    console.log(zipCode);
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            console.log(response);
            var mapLocation = {
                lat: response.results[0].geometry.location.lat,
                lng: response.results[0].geometry.location.lng
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: mapLocation
            });
            var newMarker = new google.maps.Marker({
                position: mapLocation,
                map: map
            });


            var infowindow;
            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.textSearch({
                location: mapLocation,
                radius: 500,
                query: 'mexican'
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            // -------------Taco Icon---------------------------- 

            var icon = {
                url: "assets/images/tacomap.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // ---------------------------------------------------
            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    icon: icon,
                    position: place.geometry.location
                });
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name + "<br>" + "Address: " + place.formatted_address + "<br>" + "Rating: " + place.rating + "<br>" + "Open: " + place.opening_hours.open_now + "<br>" + "Price Level: " + place.price_level);
                    infowindow.open(map, this);
                    console.log(place);

                    // -------Display Results-------

                    var resultsDiv = $('<div>');
                    resultsDiv.attr('class', 'panel panel-primary')
                    var p = $("<p>").html(place.name + "<br>" + "Address: " + place.formatted_address + "<br>" + "Rating: " + place.rating);
                    resultsDiv.append(p);
                    $('#resultsView').append(resultsDiv);
                    

                    // _____________________________
                });
            };
        });
};