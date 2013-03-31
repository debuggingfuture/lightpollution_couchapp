var reverseGeocomplete = {};
reverseGeocomplete.removeReverseGeocodeSuggestions = function() {
    // console.log("Removed RevSuggestions");
    reverseGeocomplete.getContainer().children(".reverse-gecode-suggested").remove();
}
//container Not yet exist during init
reverseGeocomplete.getContainer = function() {

    reverseGeocomplete.container = reverseGeocomplete.container || $(".pac-container");
    console.log(reverseGeocomplete.container);
    console.log($(".pac-container"));

    return reverseGeocomplete.container
}
reverseGeocomplete.reverseGeo = function(latLng, cb) {
    geocoder.geocode({
        'latLng' : latLng
    }, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results) {
                cb(results)
            } else {
                console.log("no address")
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });
}

reverseGeocomplete.addSuggestions = function(results, suggestionClickCallback) {
    $.each(results, function(index, result) {
        var MAX_SUGGESTIONS = 5;
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
            $("#geocomplete").val(result.formatted_address);
            //hide all reverse-geocode-suggested
            reverseGeocomplete.removeReverseGeocodeSuggestions();
            reverseGeocomplete.getContainer().hide();
            return suggestionClickCallback(result);
        }
        resultItem.click(clickCb);
        reverseGeocomplete.getContainer().prepend(resultItem);

    });
};

module.exports = reverseGeocomplete;
