// // var google={}
// require('lib/googlemapapiv3');
// // for testing
// google.maps.Load();

//TODO: put here will failed to load google api   var geocoder = new google.maps.Geocoder();
var MAX_SUGGESTIONS = 5;

exports.removeReverseGeocodeSuggestions = function() {
    // console.log("Removed RevSuggestions");
    exports.getContainer().children(".reverse-gecode-suggested").remove();
}
//TODO should group into inits
//container load async , Not yet exist
exports.getContainer = function() {
    exports.container = exports.container || $(".pac-container");
    return exports.container;
}

exports.getInput= function() {
    exports.input = exports.input || $("#id_locationDesc");
    return exports.input;
}

exports.renderSuggestions = function(results, suggestionClickCallback) {
    //hide original suggestions. remove will cause original stopped working since google try to remove them. No issue if we only prepennd
    exports.getContainer().children().hide();
    //remove previous reverseGeocode suggestions as user keep dragging
    exports.removeReverseGeocodeSuggestions();
    exports.addSuggestions(results, suggestionClickCallback);
    exports.getContainer().children("pac-item reverse-gecode-suggested").show();
    exports.getContainer().show();

}
exports.reverseGeo = function(latLng, cb) {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng' : latLng
    }, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results) {
                return cb(results)
            } else {
                console.log("no address")
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

exports.addSuggestions = function(results, suggestionClickCallback) {
    $.each(results, function(index, result) {

        if(index > MAX_SUGGESTIONS) {
            return;
        }
        var resultItem = $(document.createElement('div')).attr("class", "pac-item reverse-gecode-suggested");
        resultItem.append(result.formatted_address);
        //pass arg

        //TODO how to simplify this
        //didnt use .click( [eventData ], handler(eventObject) )  to make api simpler
        var clickCb = function() {
            //populate field, remove suggestsions
            //while trigger another round of gecode should be decoupled
            //allow register additional events to this suggestion click
            exports.getInput().val(result.formatted_address);
            //hide all reverse-geocode-suggested
            exports.removeReverseGeocodeSuggestions();
            exports.getContainer().hide();
            suggestionClickCallback(result);
            //not working as relocation happens after this
            // var map = exports.getInput().geocomplete("map");
            // map.setZoom(17);
        }
        resultItem.click(clickCb);
        exports.getContainer().prepend(resultItem);

    });
};

//potential: add a X button to dismiss suggestions

//dont expect the marker change again after move marker?

// module.exports = exports;
