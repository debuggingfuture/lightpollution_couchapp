//Server as REST URL
var dutils = require('duality/utils');

var map;
//protect it
var hongkong_center = new google.maps.LatLng(22.300, 114.181);

var baseUrl = dutils.getBaseURL();

module.exports = {
    //TODO per mark
    //TODO refactor to another module
    createInfoWindowContent : function(content) {
        return content.join('<br>');
    },
    //generate content on demand
    createInfoWindow : function(latLng, content) {
        var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(module.exports.createInfoWindowContent(content));
        coordInfoWindow.setPosition(latLng);
        return coordInfoWindow;
    },
    setupHK : function() {
        // var marker = new google.maps.Marker({
            // map : map,
            // position : hongkong_center
        // });

    },
    //should use gmap.initizlize() instead?
    //add methods to the object?

    initialize : function(canvasId) {
        var spotList = {}
        var mapOptions = {
            center : new google.maps.LatLng(22.388, 114.181),
            zoom : 11,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById(canvasId), mapOptions);

        // return map;
    },
    addWindowToMarker : function(marker, content) {
        google.maps.event.addListener(marker, 'click', function() {
            var coordInfoWindow = module.exports.createInfoWindow(marker.getPosition(),content);
            coordInfoWindow.open(map, marker);
        });

    },
    fetchAndMarkAllSpots : function() {

        //url should be baseUrl
        $.ajax({
            url : baseUrl + "/spots_json",
            context : document.body
        }).done(function(data) {
            // $(this).addClass("done");
            log("fetch done");
            log(data);

            var addSpotMarker = function(index, spot) {
                // log(index);
                if(spot.value) {
                    var spotLatLng = new google.maps.LatLng(spot.value.locationLat, spot.value.locationLng);
                    var marker = new google.maps.Marker({
                        map : map,
                        position : spotLatLng
                    });
//TODO back to json
                    var content = [spot.value.locationDesc, spot.value.title,spot.value.description,];
                    module.exports.addWindowToMarker(marker,content);

                }
            };
            
            $.each(data, addSpotMarker);
        });
    }
};
