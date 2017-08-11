function initMap() {
        var ucIrvine = {lat: 33.6405 , lng: -117.8443};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: ucIrvine
        });
        var marker = new google.maps.Marker({
          position: ucIrvine,
          map: map
        });
      }
