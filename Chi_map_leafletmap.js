window.onload = function () {
    var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
   
    // lines 6-9 are optional for Mapbox layer
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2Rlcm9zZSIsImEiOiJjajc1MjVqMHExNTZlMzJwOGhrMXQ4bXB6In0.e8XlrmKw9bAJS77PGgh-6g';
    var basemap = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="https://www.mapbox.com/tos/">Mapbox</a>'
      });

    $.getJSON("Chimap.geojson", function(data) {

    var geojson = L.geoJson(data, {

      // lines 17-26 are optional for custom icons
      pointToLayer: function (feature, latlng) {
      var smallIcon = L.icon({
          iconSize: [27, 27],
          iconAnchor: [13, 27],
          popupAnchor:  [1, -24],
          iconUrl: 'cart.png'
          });

         return L.marker(latlng, {icon: smallIcon});
        },

      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.STORE_NAME + '<p><b>City Ward: ' + feature.properties.WARD);
      }
    });


    var map = L.map('my-map')
    .fitBounds(geojson.getBounds());
    // .setView([51.505,-0.09], 9);

    basemap.addTo(map);
    geojson.addTo(map);
  });

};

