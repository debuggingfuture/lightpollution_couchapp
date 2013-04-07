//to be run by node
var http = require("http");
//var db = require("../packages/db/db")
//not able to require db as it has its deps at that folder
var $ = require("jquery");
var options = {
    host : 'localhost',
    port : 5984,
    path : '/light/_all_docs',
    method : 'GET'

};

var deleteOptions = {

    host : 'localhost',
    port : 5984,
    path : '/light',
    method : 'DELETE'
}
var parseResponseToId = function(response) {
    ;

}
var deleteDocBulk = function(idList) {
    $.each(idList, function(index, data) {
        deleteDoc(data.id, data.rev);
    });

}
var deleteDoc = function(id, rev) {
    var options = $.extend({}, deleteOptions);
    options.path += '/' + id + '?rev=' + rev;
    console.log(options);
    var delReq = http.request(options, function(res) {
        res.on('data', function(chunk) {
            console.log(chunk);
        });
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        // res.setEncoding('utf8');
        res.on('end', function() {
            console.log("End");
        });
    });

    delReq.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    delReq.end();
}
var req = http.request(options, function(res) {

    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('end', function() {
        var response = JSON.parse(body)
        console.log("Got response: " + response);

        var toDelList = [];
        $.each(response.rows, function(index, data) {
            // console.log('print id');
            // console.log(data.id);
            toDelList.push({
                id : data.id,
                rev : data.value.rev
            });
        })
        deleteDocBulk(toDelList);
    });

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.end();
