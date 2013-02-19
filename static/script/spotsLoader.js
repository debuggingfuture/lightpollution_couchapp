/**
 * 
 */

var getAndMarkSpotsFromDB = function() {
		$.ajax({
		type : "GET",
		url : "http://127.0.0.1:5984/dev/_design/app/_view/all-spots",
		contentType : "application/json",
		success : function(data) {
		data = $.parseJSON(data);
		console.log(data);
		console.log(data["offset"]);
		$.each(data.rows, function() {
		console.log("hi" + this.id);

		console.log("mark spots" + this.value.x + ", " + this.value.y);

		for(i=0;i<data.rows.length;i++){
		spotList[i] = new google.maps.LatLng(22.300,114.181);

		}

		});
		}
		
		function createInfoWindowContent() {
			var numTiles = 1 << map.getZoom();

			return [
			'Chicago, IL',
			'LatLng: ' + chicago.lat() + ' , ' + chicago.lng()
			].join('<br>');
			}

			//
			var coordInfoWindow = new google.maps.InfoWindow();
			coordInfoWindow.setContent(createInfoWindowContent());
			coordInfoWindow.setPosition(chicago);
			coordInfoWindow.open(map);

			getAndMarkSpotsFromDB();

			}
