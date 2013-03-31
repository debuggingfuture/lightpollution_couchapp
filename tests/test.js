var updates = require('lib/update');
require('lib/googlemapapiv3');

var reverseGeocomplete = require('lib/revgeocomplete');
// var shows = require('lib/shows/shows');

exports['test for nodeunit working'] = function(test) {
    test.ok(true, 'everything is ok');
    test.done();
};

exports['test for add form'] = function(test) {
    // var req={form:{a:"b"}};
    var req = {
        form : {
            "title" : "a",
            "locationDesc" : "b"
        }
    };
    //coupling with form logic
    //possible: req also generated using the form
    //fill using "addForm"
    test.equal(updates.update_my_form(null, req), 'hello bar');
    test.done();
};

exports['test for geocoding'] = function(test) {
    var latLng = new google.maps.LatLng(22.300, 114.181);
    //
    var cb = function(results) {
        console.log('results in cb');
        console.log(results);
        test.equals(5,results.length);
        test.expect(1);
        test.done();
        //assert inside cb?
    }
    reverseGeocomplete.reverseGeo(latLng, cb)

    // // shows

};

//need fixtures to test

