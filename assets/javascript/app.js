

$("#submit-location").on("click", function(event){
event.preventDefault();
initMap();
});




function initMap() {
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
        var marker = new google.maps.Marker({
          position: ucIrvine,
          map: map
        });
      });
};








  






  




