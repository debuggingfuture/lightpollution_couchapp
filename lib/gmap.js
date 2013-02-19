//Server as REST URL

var map;
//protect it
var hongkong_center = new google.maps.LatLng(22.300, 114.181);

module.exports = {
    //TODO per mark
    //TODO refactor to another module
    createInfoWindowContent : function() {
        return ['Chicago, IL'].join('<br>');
    },
    //generate content on demand
    createInfoWindow : function(position) {
        var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(module.exports.createInfoWindowContent());
        coordInfoWindow.setPosition(new google.maps.LatLng(22.388, 114.000));
        return coordInfoWindow;
    },
    setupHK : function() {
        var marker = new google.maps.Marker({
            map : map,
            position : hongkong_center
        });

        google.maps.event.addListener(marker, 'click', function() {
           var  coordInfoWindow = module.exports.createInfoWindow(marker.getPosition())
            coordInfoWindow.open(map, marker);
        });
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
    }
};
